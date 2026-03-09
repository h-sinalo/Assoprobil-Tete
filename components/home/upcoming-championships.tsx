import Link from "next/link"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { championships } from "@/lib/data/championships"

const statusConfig = {
  upcoming: { label: "Proximo", className: "bg-secondary text-secondary-foreground" },
  ongoing: { label: "Em Curso", className: "bg-primary text-primary-foreground" },
  completed: { label: "Concluido", className: "bg-muted text-muted-foreground" },
}

export function UpcomingChampionships() {
  const items = championships.slice(0, 3)

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Campeonatos
            </h2>
            <p className="mt-2 text-muted-foreground">
              Proximos eventos e resultados recentes
            </p>
            <div className="mt-3 h-1 w-12 rounded-full bg-secondary" />
          </div>
          <Link
            href="/campeonatos"
            className="group flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
          >
            Ver todos
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((champ) => (
            <Link
              key={champ.slug}
              href={`/campeonatos/${champ.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10">
                    <span className="font-serif text-lg font-bold text-primary">
                      {champ.year}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className={statusConfig[champ.status].className}>
                    {statusConfig[champ.status].label}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {champ.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {champ.location}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary text-balance">
                  {champ.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {champ.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-xs text-muted-foreground">
                    {champ.participants} participantes
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    Detalhes
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
