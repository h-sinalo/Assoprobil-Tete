"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from "@/lib/supabase"
import type { GalleryItem } from "@/lib/supabase"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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

const gallerySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  category: z.string().min(1, "A categoria é obrigatória"),
  type: z.enum(["photo", "video"]),
  image_url: z.string().min(1, "A imagem é obrigatória"),
})

type FormData = z.infer<typeof gallerySchema>

const emptyValues: FormData = {
  title: "",
  category: "campeonatos",
  type: "photo",
  image_url: "",
}

const categoryLabels: Record<string, string> = {
  campeonatos: "Campeonatos",
  eventos: "Eventos",
  comunidade: "Comunidade",
  treinos: "Treinos",
}

export default function AdminGaleriaPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  const form = useForm<FormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: emptyValues,
  })

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from("categories")
      .select("name")
      .eq("type", "gallery")
      .order("name", { ascending: true })
    setCategories(data ?? [])
  }, [])

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchItems()
    fetchCategories()
  }, [fetchItems, fetchCategories])

  const openCreate = () => {
    form.reset(emptyValues)
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const { error } = await supabase.from("gallery").insert(data)
      if (error) throw error

      toast.success("Item adicionado à galeria!")
      setDialogOpen(false)
      fetchItems()
    } catch (error: any) {
      console.error("Error saving gallery item:", error)
      const errorMsg = error.message || error.details || "Tente novamente"
      const errorHint = error.hint ? ` (${error.hint})` : ""
      toast.error("Erro ao guardar: " + errorMsg + errorHint)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    await supabase.from("gallery").delete().eq("id", deletingId)
    setDeleteDialogOpen(false)
    setDeletingId(null)
    fetchItems()
  }

  const filtered = activeFilter === "all" ? items : items.filter((i) => i.category === activeFilter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Galeria</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerir fotos e vídeos da galeria</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Adicionar Item
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ value: "all", label: "Todos" }, { value: "campeonatos", label: "Campeonatos" }, { value: "eventos", label: "Eventos" }, { value: "comunidade", label: "Comunidade" }, { value: "treinos", label: "Treinos" }].map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${activeFilter === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-20">A carregar…</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/10">
                    <ImageIcon className="size-10 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{categoryLabels[item.category]}</Badge>
                  <Badge variant="outline" className="text-xs">{item.type === "photo" ? "Foto" : "Vídeo"}</Badge>
                </div>
              </div>
              <button
                onClick={() => { setDeletingId(item.id); setDeleteDialogOpen(true) }}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <ImageIcon className="size-5 text-primary" />
              Adicionar Item à Galeria
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="photo">Foto</SelectItem>
                          <SelectItem value="video">Vídeo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ficheiro *</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        folder="gallery"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "A guardar…" : "Adicionar"}
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
            <AlertDialogDescription>O item será removido da galeria permanentemente.</AlertDialogDescription>
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
