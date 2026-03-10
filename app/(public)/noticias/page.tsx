import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { PostCard } from "@/components/shared/post-card"
import { supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Últimas notícias e novidades da ASSOPROBIL Tete. Acompanhe os eventos, parcerias e conquistas da associação.",
}

export const revalidate = 60

export default async function NoticiasPage() {
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <>
      <PageHeader
        title="Notícias"
        description="Acompanhe as últimas novidades, eventos e conquistas da ASSOPROBIL Tete."
        breadcrumbs={[{ label: "Notícias" }]}
      />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(news ?? []).map((article) => (
              <PostCard
                key={article.slug}
                title={article.title}
                description={article.content ? article.content.substring(0, 160) + "..." : ""}
                date={article.date}
                image={article.image_url}
                href={`/noticias/${article.slug}`}
                category={article.category}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
