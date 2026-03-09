import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/shared/post-card"
import { supabase } from "@/lib/supabase"

async function getHomeData() {
  const [champResult, newsResult, socialResult] = await Promise.all([
    supabase
      .from("championships")
      .select("*")
      .in("status", ["upcoming", "ongoing"])
      .order("date", { ascending: true })
      .limit(3),
    supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("social_responsibility")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(2),
  ])
  return {
    upcomingChampionships: champResult.data ?? [],
    latestNews: newsResult.data ?? [],
    socialHighlights: socialResult.data ?? [],
  }
}

export const metadata: Metadata = {
  title: "ASSOPROBIL Tete - Associação Provincial de Bilhar de Tete",
  description:
    "Associação Provincial de Bilhar de Tete, Moçambique. Campeonatos, notícias, responsabilidade social e desenvolvimento do desporto de bilhar na província de Tete.",
}

export const revalidate = 60

export default async function HomePage() {
  const { upcomingChampionships, latestNews, socialHighlights } = await getHomeData()

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[75vh] items-center overflow-hidden lg:min-h-[85vh]">
        <Image
          src="/images/hero-bilhar.jpg"
          alt="Mesa de bilhar elegante ASSOPROBIL Tete"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5">
              <Trophy className="size-4 text-secondary" />
              <span className="text-xs font-medium uppercase tracking-wider text-secondary">
                Fundada em 2021
              </span>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
              Associação Provincial de{" "}
              <span className="text-primary">Bilhar</span> de Tete
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Promovemos o bilhar como modalidade desportiva de alta precisão,
              organizando competições e formando novos talentos num ambiente
              saudável, inclusivo e livre de substâncias.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/campeonatos">
                  Ver Campeonatos
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sobre">Sobre a Associação</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { val: "5+", label: "Anos de Actividade" },
                { val: "180+", label: "Atletas Registados" },
                { val: "10+", label: "Campeonatos Realizados" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-secondary">{s.val}</span>
                  <span className="text-sm text-white/70">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Championships */}
      {upcomingChampionships.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
                  Próximos Campeonatos
                </h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-secondary" />
              </div>
              <Link
                href="/campeonatos"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                Ver todos <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingChampionships.map((champ) => (
                <PostCard
                  key={champ.slug}
                  title={champ.title}
                  description={champ.description}
                  date={champ.date}
                  href={`/campeonatos/${champ.slug}`}
                  location={champ.location}
                  status={champ.status}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="border-t border-border/30 bg-card/40 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
                  Últimas Notícias
                </h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-secondary" />
              </div>
              <Link
                href="/noticias"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                Ver todas <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((article) => (
                <PostCard
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  date={article.date}
                  href={`/noticias/${article.slug}`}
                  category={article.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Responsibility Highlights */}
      {socialHighlights.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                  Responsabilidade Social
                </span>
                <h2 className="mt-3 font-serif text-2xl font-bold text-foreground lg:text-3xl text-balance">
                  O Bilhar como Ferramenta de{" "}
                  <span className="text-primary">Transformação Social</span>
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Além da competição, a ASSOPROBIL compromete-se com o
                  desenvolvimento da comunidade, utilizando o bilhar para
                  promover inclusão, disciplina e valores saudáveis entre os
                  jovens da província de Tete.
                </p>
                <Button asChild className="mt-6 gap-2">
                  <Link href="/responsabilidade-social">
                    Conheça as Iniciativas <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4">
                {socialHighlights.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/responsabilidade-social/${post.slug}`}
                    className="group flex gap-4 rounded-lg border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Trophy className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      <section className="border-t border-border/30 bg-card/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Parceiros e Apoiantes
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {[
              "Governo Provincial de Tete",
              "Dir. Juventude, Desporto e Emprego",
              "Clube Recreativo de Tete",
              "Federação Moçambicana de Bilhar",
            ].map((partner) => (
              <div
                key={partner}
                className="rounded-md border border-border/50 bg-muted/30 px-5 py-3 text-sm font-medium text-muted-foreground"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
