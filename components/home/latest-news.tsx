import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PostCard } from "@/components/shared/post-card"
import { getLatestNews } from "@/lib/data/news"

export function LatestNews() {
  const latestNews = getLatestNews(3)

  return (
    <section className="border-t border-border/30 bg-card/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Ultimas Noticias
            </h2>
            <p className="mt-2 text-muted-foreground">
              Acompanhe as novidades da ASSOPROBIL
            </p>
            <div className="mt-3 h-1 w-12 rounded-full bg-secondary" />
          </div>
          <Link
            href="/noticias"
            className="group flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
          >
            Todas as noticias
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  )
}
