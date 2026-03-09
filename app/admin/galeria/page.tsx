"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, ImageIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { GalleryItem } from "@/lib/supabase"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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
  description: string
  category: "campeonatos" | "eventos" | "comunidade" | "treinos"
  type: "photo" | "video"
  image_url: string
}

const emptyForm: FormData = {
  title: "",
  description: "",
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
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  const fetchItems = useCallback(async () => {
    setLoading(true)
    const query = supabase.from("gallery").select("*").order("created_at", { ascending: false })
    const { data } = await query
    setItems(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems])

  const handleSave = async () => {
    setSaving(true)
    await supabase.from("gallery").insert(form)
    setSaving(false)
    setDialogOpen(false)
    fetchItems()
  }

  const handleDelete = async () => {
    if (!deletingId) return
    await supabase.from("gallery").delete().eq("id", deletingId)
    setDeleteDialogOpen(false)
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
        <Button onClick={() => { setForm(emptyForm); setDialogOpen(true) }} className="gap-2">
          <Plus className="size-4" /> Adicionar Item
        </Button>
      </div>

      {/* Filter tabs */}
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
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Título *</label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Categoria *</label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v as FormData["category"] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campeonatos">Campeonatos</SelectItem>
                    <SelectItem value="eventos">Eventos</SelectItem>
                    <SelectItem value="comunidade">Comunidade</SelectItem>
                    <SelectItem value="treinos">Treinos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tipo *</label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as FormData["type"] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Foto</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Ficheiro *</label>
              <ImageUpload
                value={form.image_url}
                onChange={(url) => setForm((f) => ({ ...f, image_url: url as string }))}
                folder="gallery"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving || !form.title}>
              {saving ? "A guardar…" : "Adicionar"}
            </Button>
          </DialogFooter>
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
