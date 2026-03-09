"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Pencil, Trash2, Trophy } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Championship } from "@/lib/supabase"
import { ImageUpload } from "@/components/admin/image-upload"
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

type FormData = {
  title: string
  slug: string
  description: string
  long_description: string
  date: string
  end_date: string
  location: string
  participants: string
  status: "upcoming" | "ongoing" | "completed"
  year: string
  image_url: string
  images: string[]
}

const emptyForm: FormData = {
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
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)

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

  const openCreate = () => {
    setEditingItem(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  const openEdit = (item: Championship) => {
    setEditingItem(item)
    setForm({
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

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      ...form,
      participants: parseInt(form.participants),
      year: parseInt(form.year),
    }
    if (editingItem) {
      await supabase.from("championships").update(payload).eq("id", editingItem.id)
    } else {
      await supabase.from("championships").insert(payload)
    }
    setSaving(false)
    setDialogOpen(false)
    fetchChampionships()
  }

  const handleDelete = async () => {
    if (!deletingId) return
    await supabase.from("championships").delete().eq("id", deletingId)
    setDeleteDialogOpen(false)
    setDeletingId(null)
    fetchChampionships()
  }

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Campeonatos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerir todos os campeonatos e torneios
          </p>
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

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <Trophy className="size-5 text-primary" />
              {editingItem ? "Editar Campeonato" : "Novo Campeonato"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Título *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({
                  ...f,
                  title: e.target.value,
                  slug: editingItem ? f.slug : slugify(e.target.value),
                }))}
                placeholder="Ex: Campeonato Provincial 2025"
              />
            </div>
            {/* <div className="grid gap-2">
              <label className="text-sm font-medium">Slug (URL) *</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="campeonato-provincial-2025"
              />
            </div> */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Descrição curta *</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Descrição completa</label>
              <Textarea
                value={form.long_description}
                onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Data início *</label>
                <Input
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  placeholder="15 de Março, 2025"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Data fim</label>
                <Input
                  value={form.end_date}
                  onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
                  placeholder="30 de Março, 2025"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Imagem de Capa</label>
              <ImageUpload
                value={form.image_url}
                onChange={(url) => setForm((f) => ({ ...f, image_url: url as string }))}
                folder="championships/covers"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Galeria de Imagens</label>
              <ImageUpload
                value={form.images}
                onChange={(urls) => setForm((f) => ({ ...f, images: urls as string[] }))}
                multiple
                folder="championships/gallery"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Local *</label>
              <Input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="Clube Recreativo de Tete"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Participantes</label>
                <Input
                  type="number"
                  value={form.participants}
                  onChange={(e) => setForm((f) => ({ ...f, participants: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Ano</label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Estado *</label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v as FormData["status"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Próximo</SelectItem>
                    <SelectItem value="ongoing">Em Curso</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.title || !form.slug}>
              {saving ? "A guardar…" : editingItem ? "Actualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar eliminação</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acção é irreversível. O campeonato será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
