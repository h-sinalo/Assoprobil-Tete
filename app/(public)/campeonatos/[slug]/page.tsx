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
    .select("title, description")
    .eq("slug", slug)
    .single()
  if (!data) return { title: "Campeonato | ASSOPROBIL Tete" }
  return { title: data.title, description: data.description }
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
          <Link
            href="/campeonatos"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Voltar aos Campeonatos
          </Link>

          <div className="flex flex-wrap gap-2 mb-8">
            <Badge className={statusConfig[status].className}>
              {statusConfig[status].label}
            </Badge>
            <Badge variant="outline">{champ.year}</Badge>
          </div>

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
              {champ.long_description || champ.description}
            </p>
          </div>

          {/* Results */}
          {champ.results && champ.results.length > 0 && (
            <div className="mt-10">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="size-5 text-primary" />
                Resultados Finais
              </h2>
              <div className="overflow-hidden rounded-lg border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="w-16 text-center">#</TableHead>
                      <TableHead>Jogador</TableHead>
                      <TableHead className="text-center">Pontos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {champ.results.map(
                      (r: { position: number; player: string; points: number }) => (
                        <TableRow key={r.position} className="hover:bg-muted/30">
                          <TableCell className="text-center">
                            {r.position <= 3 ? (
                              <Badge
                                className={
                                  r.position === 1
                                    ? "bg-secondary text-secondary-foreground"
                                    : r.position === 2
                                      ? "bg-muted-foreground/40 text-foreground"
                                      : "bg-secondary/40 text-secondary-foreground"
                                }
                              >
                                {r.position}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">{r.position}</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{r.player}</TableCell>
                          <TableCell className="text-center font-semibold text-primary">
                            {r.points}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
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
        </div>
      </section>
    </>
  )
}
