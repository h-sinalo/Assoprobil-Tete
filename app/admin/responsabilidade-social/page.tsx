"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Pencil, Trash2, Heart } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { SocialResponsibility } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

type FormData = {
  title: string
  slug: string
  description: string
  content: string
  date: string
  category: string
  published: boolean
  images: string[]
}

const emptyForm: FormData = {
  title: "",
  slug: "",
  description: "",
  content: "",
  date: "",
  category: "",
  published: true,
  images: [],
}

export default function AdminResponsabilidadeSocialPage() {
  const [posts, setPosts] = useState<SocialResponsibility[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<SocialResponsibility | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("social_responsibility")
      .select("*")
      .order("created_at", { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const openCreate = () => { setEditingItem(null); setForm(emptyForm); setDialogOpen(true) }
  const openEdit = (item: SocialResponsibility) => {
    setEditingItem(item)
    setForm({
      title: item.title, slug: item.slug, description: item.description,
      content: item.content ?? "", date: item.date, category: item.category,
      published: item.published,
      images: item.images ?? [],
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    if (editingItem) {
      await supabase.from("social_responsibility").update(form).eq("id", editingItem.id)
    } else {
      await supabase.from("social_responsibility").insert(form)
    }
    setSaving(false)
    setDialogOpen(false)
    fetchPosts()
  }

  const handleDelete = async () => {
    if (!deletingId) return
    await supabase.from("social_responsibility").delete().eq("id", deletingId)
    setDeleteDialogOpen(false)
    fetchPosts()
  }

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Responsabilidade Social</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerir iniciativas e projectos comunitários</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" /> Nova Iniciativa
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
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Publicado</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Acções</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{post.title}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{post.date}</p>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <Badge variant="secondary">{post.category}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={post.published ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}>
                      {post.published ? "Sim" : "Não"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
                        onClick={() => { setDeletingId(post.id); setDeleteDialogOpen(true) }}>
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
              <Heart className="size-5 text-primary" />
              {editingItem ? "Editar Iniciativa" : "Nova Iniciativa"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Título *</label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({
                ...f, title: e.target.value, slug: editingItem ? f.slug : slugify(e.target.value),
              }))} />
            </div>
            {/* <div className="grid gap-2">
              <label className="text-sm font-medium">Slug (URL) *</label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            </div> */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Descrição curta *</label>
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Conteúdo completo</label>
              <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={5} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Imagens (URLs separadas por vírgula)</label>
              <Textarea
                placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
                value={form.images?.join(", ") || ""}
                onChange={(e) => setForm((f) => ({ ...f, images: e.target.value.split(",").map(i => i.trim()).filter(Boolean) }))}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Data *</label>
                <Input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Categoria *</label>
                <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Formação, Solidariedade…" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} id="pub" />
              <label htmlFor="pub" className="text-sm font-medium">Publicar iniciativa</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.slug}>
              {saving ? "A guardar…" : editingItem ? "Actualizar" : "Criar"}
            </Button>
          </DialogFooter>
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
