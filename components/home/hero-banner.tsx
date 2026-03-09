import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden lg:min-h-[80vh]">
      {/* Background Image */}
      <Image
        src="/images/hero-bilhar.jpg"
        alt="Mesa de bilhar em ambiente elegante"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5">
            <Trophy className="size-4 text-secondary" />
            <span className="text-xs font-medium uppercase tracking-wider text-secondary">
              Desde 2021
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Associacao Provincial de{" "}
            <span className="text-primary">Bilhar</span> de Tete
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Promovendo a excelencia desportiva, o desenvolvimento comunitario e a
            inclusao social atraves do bilhar na provincia de Tete, Mocambique.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/campeonatos">
                Ver Campeonatos
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/sobre">Sobre a Associacao</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-secondary">
                5+
              </span>
              <span className="text-sm text-muted-foreground">Campeonatos</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-secondary">
                180+
              </span>
              <span className="text-sm text-muted-foreground">Participantes</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold text-secondary">
                120+
              </span>
              <span className="text-sm text-muted-foreground">Jovens Formados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
