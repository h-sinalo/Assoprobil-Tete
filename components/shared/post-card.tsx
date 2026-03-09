import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PostCardProps {
  title: string
  description: string
  date: string
  href: string
  image?: string
  location?: string
  category?: string
  status?: "upcoming" | "ongoing" | "completed"
  variant?: "default" | "featured"
}

const statusConfig = {
  upcoming: { label: "Proximo", className: "bg-secondary text-secondary-foreground" },
  ongoing: { label: "Em Curso", className: "bg-primary text-primary-foreground" },
  completed: { label: "Concluido", className: "bg-muted text-muted-foreground" },
}

export function PostCard({
  title,
  description,
  date,
  href,
  image,
  location,
  category,
  status,
  variant = "default",
}: PostCardProps) {
  return (
    <Link href={href} className="group block">
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
          variant === "featured" && "lg:flex-row"
        )}
      >
        {/* Image placeholder */}
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-muted",
            variant === "featured" && "lg:aspect-auto lg:w-2/5"
          )}
        >
          {image ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="h-12 w-12 rounded-full border-2 border-primary/30" />
            </div>
          )}
          {/* Status badge */}
          {status && (
            <div className="absolute top-3 left-3">
              <Badge className={statusConfig[status].className}>
                {statusConfig[status].label}
              </Badge>
            </div>
          )}
          {/* Category badge */}
          {category && !status && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary">{category}</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {date}
            </span>
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {location}
              </span>
            )}
          </div>

          <h3 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary text-balance">
            {title}
          </h3>

          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
            Ler mais
            <ArrowRight className="size-4" />
          </span>
        </div>
      </article>
    </Link>
  )
}
