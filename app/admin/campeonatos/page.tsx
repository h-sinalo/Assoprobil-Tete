"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Pencil, Trash2, Trophy } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from "@/lib/supabase"
import type { Championship } from "@/lib/supabase"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const championshipSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  slug: z.string().min(1, "O slug é obrigatório"),
  description: z.string().min(1, "A descrição curta é obrigatória"),
  long_description: z.string().optional(),
  date: z.string().min(1, "A data de início é obrigatória"),
  end_date: z.string().optional(),
  location: z.string().min(1, "O local é obrigatório"),
  participants: z.string().transform((v) => parseInt(v) || 0),
  status: z.enum(["upcoming", "ongoing", "completed"]),
  year: z.string().transform((v) => parseInt(v) || new Date().getFullYear()),
  image_url: z.string().optional(),
  images: z.array(z.string()).default([]),
})

type FormData = z.input<typeof championshipSchema>

const emptyValues: FormData = {
  title: "",
  slug: "",
  description: "",
  long_description: "",
  date: "",
  end_date: "",
  location: "",
  participants: "0",
  status: "upcoming",
  year: new Date().getFullYear().toString(),
  image_url: "",
  images: [],
}

const statusConfig = {
  upcoming: "bg-secondary text-secondary-foreground",
  ongoing: "bg-primary text-primary-foreground",
  completed: "bg-muted text-muted-foreground",
}

const statusLabels = { upcoming: "Próximo", ongoing: "Em Curso", completed: "Concluído" }

export default function AdminCampeonatosPage() {
  const [championships, setChampionships] = useState<Championship[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Championship | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(championshipSchema),
    defaultValues: emptyValues,
  })

  const fetchChampionships = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("championships")
      .select("*")
      .order("year", { ascending: false })
    setChampionships(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchChampionships() }, [fetchChampionships])

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title" && !editingItem) {
        form.setValue("slug", slugify(value.title || ""), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [form, editingItem])

  const openCreate = () => {
    setEditingItem(null)
    form.reset(emptyValues)
    setDialogOpen(true)
  }

  const openEdit = (item: Championship) => {
    setEditingItem(item)
    form.reset({
      title: item.title,
      slug: item.slug,
      description: item.description,
      long_description: item.long_description ?? "",
      date: item.date,
      end_date: item.end_date ?? "",
      location: item.location,
      participants: String(item.participants),
      status: item.status,
      year: String(item.year),
      image_url: item.image_url ?? "",
      images: item.images ?? [],
    })
    setDialogOpen(true)
  }

  const onSubmit = async (values: FormData) => {
    setSaving(true)
    try {
      // transform values via schema
      const payload = championshipSchema.parse(values)

      const { error } = editingItem
        ? await supabase.from("championships").update(payload).eq("id", editingItem.id)
        : await supabase.from("championships").insert(payload)

      if (error) throw error

      toast.success(editingItem ? "Campeonato actualizado!" : "Campeonato criado!")
      setDialogOpen(false)
      fetchChampionships()
    } catch (error: any) {
      console.error("Error saving championship:", error)
      toast.error("Erro ao guardar: " + (error.message || "Tente novamente"))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    await supabase.from("championships").delete().eq("id", deletingId)
    setDeleteDialogOpen(false)
    setDeletingId(null)
    fetchChampionships()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Campeonatos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerir todos os campeonatos e torneios</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Novo Campeonato
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-20">A carregar…</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Titulo</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Data</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Participantes</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Estado</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Acções</th>
              </tr>
            </thead>
            <tbody>
              {championships.map((champ) => (
                <tr key={champ.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{champ.title}</p>
                    <p className="text-xs text-muted-foreground">{champ.location}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{champ.date}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{champ.participants}</td>
                  <td className="px-4 py-3">
                    <Badge className={statusConfig[champ.status]}>
                      {statusLabels[champ.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(champ)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => { setDeletingId(champ.id); setDeleteDialogOpen(true) }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <Trophy className="size-5 text-primary" />
              {editingItem ? "Editar Campeonato" : "Novo Campeonato"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Campeonato Provincial 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição curta *</FormLabel>
                      <FormControl>
                        <Textarea rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="long_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição completa</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data início *</FormLabel>
                      <FormControl>
                        <Input placeholder="15 de Março, 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data fim</FormLabel>
                      <FormControl>
                        <Input placeholder="30 de Março, 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem de Capa</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          folder="championships/covers"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Galeria de Imagens</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          multiple
                          folder="championships/gallery"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local *</FormLabel>
                    <FormControl>
                      <Input placeholder="Clube Recreativo de Tete" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="participants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participantes</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ano</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upcoming">Próximo</SelectItem>
                          <SelectItem value="ongoing">Em Curso</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "A guardar…" : editingItem ? "Actualizar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminação</AlertDialogTitle>
            <AlertDialogDescription>Esta acção é irreversível.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
