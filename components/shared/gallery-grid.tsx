"use client"

import { useState } from "react"
import { gallery, type GalleryItem } from "@/lib/data/gallery"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Camera } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "Todas" },
  { value: "campeonatos", label: "Campeonatos" },
  { value: "eventos", label: "Eventos" },
  { value: "comunidade", label: "Comunidade" },
  { value: "treinos", label: "Treinos" },
]

// Generate deterministic gradient colors based on gallery item
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

  const filteredItems =
    activeTab === "all"
      ? gallery
      : gallery.filter((item) => item.category === activeTab)

  return (
    <>
      {/* Category Tabs */}
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

      {/* Photo Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                gradients[i % gradients.length]
              )}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
              <Camera className="size-8 text-foreground/30" />
              <span className="text-center text-xs font-medium text-foreground/60">
                {item.title}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        {selectedItem && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">{selectedItem.title}</DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  gradients[
                    gallery.findIndex((g) => g.id === selectedItem.id) %
                      gradients.length
                  ]
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="size-12 text-foreground/20" />
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
