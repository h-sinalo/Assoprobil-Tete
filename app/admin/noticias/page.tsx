"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from "@/lib/supabase"
import type { News } from "@/lib/supabase"
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
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const newsSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  slug: z.string().min(1, "O slug é obrigatório"),
  description: z.string().min(1, "A descrição curta é obrigatória"),
  content: z.string().optional(),
  date: z.string().min(1, "A data é obrigatória"),
  category: z.string().min(1, "A categoria é obrigatória"),
  published: z.boolean().default(true),
  image_url: z.string().optional(),
  images: z.array(z.string()).default([]),
})

type FormData = z.infer<typeof newsSchema>

const emptyValues: FormData = {
  title: "",
  slug: "",
  description: "",
  content: "",
  date: "",
  category: "",
  published: true,
  image_url: "",
  images: [],
}

export default function AdminNoticiasPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<News | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: emptyValues,
  })

  const fetchNews = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
    setNews(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchNews() }, [fetchNews])

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

  const openEdit = (item: News) => {
    setEditingItem(item)
    form.reset({
      title: item.title,
      slug: item.slug,
      description: item.description,
      content: item.content ?? "",
      date: item.date,
      category: item.category,
      published: item.published,
      image_url: item.image_url ?? "",
      images: item.images ?? [],
    })
    setDialogOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      const { error } = editingItem
        ? await supabase.from("news").update(data).eq("id", editingItem.id)
        : await supabase.from("news").insert(data)

      if (error) throw error

      toast.success(editingItem ? "Notícia actualizada!" : "Notícia criada!")
      setDialogOpen(false)
      fetchNews()
    } catch (error: any) {
      console.error("Error saving news:", error)
      toast.error("Erro ao guardar: " + (error.message || "Tente novamente"))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    await supabase.from("news").delete().eq("id", deletingId)
    setDeleteDialogOpen(false)
    fetchNews()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Notícias</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerir artigos e actualizações institucionais</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nova Notícia
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-20">A carregar…</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Título</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Categoria</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Data</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Publicado</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Acções</th>
              </tr>
            </thead>
            <tbody>
              {news.map((article) => (
                <tr key={article.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{article.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{article.description}</p>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <Badge variant="secondary">{article.category}</Badge>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{article.date}</td>
                  <td className="px-4 py-3">
                    <Badge className={article.published ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}>
                      {article.published ? "Sim" : "Não"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(article)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => { setDeletingId(article.id); setDeleteDialogOpen(true) }}
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
              <Newspaper className="size-5 text-primary" />
              {editingItem ? "Editar Notícia" : "Nova Notícia"}
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
                      <Input placeholder="Título da notícia" {...field} />
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
                        <Textarea placeholder="Breve resumo..." rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo completo</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Conteúdo detalhado..." rows={6} {...field} />
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
                      <FormLabel>Imagem de Destaque</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          folder="news/thumbnails"
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
                          folder="news/gallery"
                        />
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
                      <FormLabel>Data *</FormLabel>
                      <FormControl>
                        <Input placeholder="10 de Janeiro, 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <FormControl>
                        <Input placeholder="Institucional, Desporto..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Publicar notícia</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

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
