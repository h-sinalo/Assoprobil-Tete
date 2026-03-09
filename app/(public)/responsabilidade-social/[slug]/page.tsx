import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { supabase } from "@/lib/supabase"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from("social_responsibility")
    .select("title, description")
    .eq("slug", slug)
    .single()
  if (!data) return { title: "Responsabilidade Social | ASSOPROBIL Tete" }
  return { title: data.title, description: data.description }
}

export default async function SocialDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { data: post } = await supabase
    .from("social_responsibility")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!post) notFound()

  return (
    <>
      <PageHeader
        title={post.title}
        description={post.description}
        breadcrumbs={[
          { label: "Responsabilidade Social", href: "/responsabilidade-social" },
          { label: post.title },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/responsabilidade-social"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Voltar à Responsabilidade Social
          </Link>

          <div className="flex flex-wrap gap-3 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-primary" />
              {post.date}
            </span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="size-3" />
              {post.category}
            </Badge>
          </div>

          <div className="prose prose-invert max-w-none leading-relaxed text-muted-foreground">
            {(post.content || post.description)
              .split("\n")
              .map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
