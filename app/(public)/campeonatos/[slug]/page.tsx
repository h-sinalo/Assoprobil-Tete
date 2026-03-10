import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { supabase } from "@/lib/supabase"
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from("championships")
    .select("title, long_description")
    .eq("slug", slug)
    .single()
  if (!data) return { title: "Campeonato | ASSOPROBIL Tete" }
  return { title: data.title, description: data.long_description?.substring(0, 160) }
}

const statusConfig = {
  upcoming: { label: "Próximo", className: "bg-secondary text-secondary-foreground" },
  ongoing: { label: "Em Curso", className: "bg-primary text-primary-foreground" },
  completed: { label: "Concluído", className: "bg-muted text-muted-foreground" },
}

export default async function CampeonatoDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { data: champ } = await supabase
    .from("championships")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!champ) notFound()

  const status = champ.status as "upcoming" | "ongoing" | "completed"

  return (
    <>
      <PageHeader
        title={champ.title}
        description={`${champ.date}${champ.end_date ? ` — ${champ.end_date}` : ""} · ${champ.location}`}
        breadcrumbs={[
          { label: "Campeonatos", href: "/campeonatos" },
          { label: champ.title },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {champ.image_url && (
            <div className="relative aspect-video w-full mb-12 overflow-hidden rounded-xl border border-border/50 shadow-xl">
              <Image
                src={champ.image_url}
                alt={champ.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
            {[
              { icon: Calendar, label: "Data", value: champ.date },
              { icon: MapPin, label: "Local", value: champ.location },
              { icon: Users, label: "Participantes", value: `${champ.participants} atletas` },
              {
                icon: Trophy,
                label: "Estado",
                value: statusConfig[status].label,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card p-4"
              >
                <Icon className="size-4 text-primary" />
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Sobre o Campeonato
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {champ.long_description || ""}
            </p>
          </div>

          {/* Results */}
          {champ.results && champ.results.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="size-5 text-primary" />
                Resultados Finais
              </h2>
            </div>
          )}

          {/* Additional Images */}
          {champ.images && champ.images.length > 0 && (
            <div className="mt-12">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <ImageIcon className="size-5 text-primary" />
                Galeria do Evento
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {champ.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted">
                    <Image
                      src={img}
                      alt={`${champ.title} - ${idx + 1}`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-12 border-t border-border/30">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                <Badge className={statusConfig[status].className}>
                  {statusConfig[status].label}
                </Badge>
                <Badge variant="outline">{champ.year}</Badge>
              </div>

              <Link
                href="/campeonatos"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="size-4" /> Voltar aos Campeonatos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
