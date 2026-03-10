"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import type { GalleryItem } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Camera, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const categories = [
  { value: "all", label: "Todas" },
  { value: "campeonatos", label: "Campeonatos" },
  { value: "eventos", label: "Eventos" },
  { value: "comunidade", label: "Comunidade" },
  { value: "treinos", label: "Treinos" },
]

const gradients = [
  "from-primary/30 to-accent/20",
  "from-secondary/30 to-primary/20",
  "from-accent/30 to-secondary/20",
  "from-primary/20 to-secondary/30",
  "from-secondary/20 to-accent/30",
  "from-accent/20 to-primary/30",
]

export function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

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
  }, [fetchItems])

  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.category === activeTab)

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveTab(cat.value)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-20 text-center text-muted-foreground">A carregar galeria...</div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-muted">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className={cn(
                    "flex h-full items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                    gradients[i % gradients.length]
                  )}>
                    <Camera className="size-8 text-foreground/30" />
                  </div>
                )}
              </div>

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        {selectedItem && (
          <DialogContent className="sm:max-w-2xl px-0 py-0 overflow-hidden bg-background/95 backdrop-blur">
            <div className="relative aspect-[4/3] w-full">
              {selectedItem.image_url ? (
                <Image
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <Camera className="size-16 text-muted-foreground/20" />
                </div>
              )}
            </div>
            <div className="p-6">
              <DialogTitle className="font-serif text-xl">{selectedItem.title}</DialogTitle>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
