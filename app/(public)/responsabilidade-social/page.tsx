import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { PostCard } from "@/components/shared/post-card"
import { supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Responsabilidade Social",
  description:
    "Iniciativas de responsabilidade social da ASSOPROBIL Tete. Formação de jovens, torneios solidários, projectos comunitários e inclusão social.",
}

export const revalidate = 60

export default async function ResponsabilidadeSocialPage() {
  const { data: posts } = await supabase
    .from("social_responsibility")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <>
      <PageHeader
        title="Responsabilidade Social"
        description="Comprometidos com o desenvolvimento comunitário e a inclusão social. Conheça as nossas iniciativas que utilizam o bilhar como ferramenta de transformação."
        breadcrumbs={[{ label: "Responsabilidade Social" }]}
      />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {(posts ?? []).map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                description={post.content ? post.content.substring(0, 160) + "..." : ""}
                date={post.date}
                image={post.image_url}
                href={`/responsabilidade-social/${post.slug}`}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
