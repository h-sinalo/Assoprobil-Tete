import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/shared/post-card"
import { supabase } from "@/lib/supabase"

async function getHomeData() {
  const [champResult, newsResult, socialResult, settingsResult] = await Promise.all([
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
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["stat_anos", "stat_atletas", "stat_campeonatos"]),
  ])
  const settingsMap = Object.fromEntries(
    (settingsResult.data ?? []).map((r: any) => [r.key, r.value])
  )
  return {
    upcomingChampionships: champResult.data ?? [],
    latestNews: newsResult.data ?? [],
    socialHighlights: socialResult.data ?? [],
    statAnos: settingsMap.stat_anos ?? "5+",
    statAtletas: settingsMap.stat_atletas ?? "50+",
    statCampeonatos: settingsMap.stat_campeonatos ?? "10+",
  }
}

export const metadata: Metadata = {
  title: "ASSOPROBIL Tete - Associação Provincial de Bilhar de Tete",
  description:
    "Associação Provincial de Bilhar de Tete, Moçambique. Campeonatos, notícias, responsabilidade social e desenvolvimento do desporto de bilhar na província de Tete.",
}

export const revalidate = 60

export default async function HomePage() {
  const { upcomingChampionships, latestNews, socialHighlights, statAnos, statAtletas, statCampeonatos } = await getHomeData()

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
                { val: statAnos, label: "Anos de Actividade" },
                { val: statAtletas, label: "Atletas Registados" },
                { val: statCampeonatos, label: "Campeonatos Realizados" },
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
                  image={champ.image_url}
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
                  image={article.image_url}
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary relative">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Trophy className="size-6" />
                      )}
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

      {/* Facebook Section */}
      <section className="border-t border-border/30 bg-card/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Siga-nos nas Redes Sociais
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-foreground lg:text-3xl text-balance">
                Acompanhe a ASSOPROBIL{" "}
                <span className="text-primary">no Facebook</span>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Siga a nossa página para ficar a par das últimas novidades, resultados de campeonatos e
                iniciativas sociais da Associação Provincial de Bilhar de Tete.
              </p>
              <a
                href="https://www.facebook.com/assoprobiltete"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1877F2]/90"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Seguir no Facebook
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="overflow-hidden rounded-xl border border-border/50 shadow-lg bg-background w-full max-w-sm">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fassoprobiltete&tabs=timeline&width=380&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="380"
                  height="500"
                  className="w-full"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="ASSOPROBIL Tete no Facebook"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
