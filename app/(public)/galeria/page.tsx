import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { GalleryGrid } from "@/components/shared/gallery-grid"

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria de fotos da ASSOPROBIL Tete. Campeonatos, eventos, comunidade e treinos em imagens.",
}

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        title="Galeria"
        description="Reviva os momentos marcantes dos nossos campeonatos, eventos comunitarios e sessoes de treino."
        breadcrumbs={[{ label: "Galeria" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </>
  )
}
