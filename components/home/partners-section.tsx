import { partners } from "@/lib/data/partners"
import { Building2, Landmark, Radio } from "lucide-react"

const typeIcons: Record<string, React.ReactNode> = {
  institutional: <Landmark className="size-4 text-primary" />,
  corporate: <Building2 className="size-4 text-secondary" />,
  media: <Radio className="size-4 text-muted-foreground" />,
}

export function PartnersSection() {
  return (
    <section className="border-t border-border/30 bg-card/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
            Parceiros e Apoios
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Entidades que acreditam no poder do desporto para transformar
            comunidades
          </p>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-secondary" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-card px-5 py-3 transition-colors hover:border-primary/30"
            >
              {typeIcons[partner.type]}
              <span className="text-sm font-medium text-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
