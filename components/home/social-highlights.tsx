import Link from "next/link"
import { ArrowRight, Heart, Users, GraduationCap, Handshake } from "lucide-react"
import { socialResponsibility } from "@/lib/data/social-responsibility"

const iconMap: Record<string, React.ReactNode> = {
  "Formacao de Jovens": <GraduationCap className="size-6" />,
  "Torneios Solidarios": <Heart className="size-6" />,
  "Projectos Comunitarios": <Handshake className="size-6" />,
  "Inclusao Social": <Users className="size-6" />,
}

export function SocialHighlights() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
            Responsabilidade Social
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Comprometidos com o desenvolvimento comunitario e a inclusao social
            atraves do desporto
          </p>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-secondary" />
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socialResponsibility.map((item) => (
            <Link
              key={item.slug}
              href={`/responsabilidade-social/${item.slug}`}
              className="group flex flex-col items-center gap-4 rounded-lg border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                {iconMap[item.category] || <Heart className="size-6" />}
              </div>
              <h3 className="font-serif text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                {item.category}
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.impact && (
                <span className="mt-auto rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                  {item.impact}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/responsabilidade-social"
            className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
          >
            Saiba mais sobre o nosso impacto
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
