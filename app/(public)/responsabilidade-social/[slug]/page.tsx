import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { supabase } from "@/lib/supabase"
import { Calendar, Tag, ArrowLeft, Image as ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from("social_responsibility")
    .select("title, content")
    .eq("slug", slug)
    .single()
  if (!data) return { title: "Responsabilidade Social | ASSOPROBIL Tete" }
  return { title: data.title, description: data.content?.substring(0, 160) }
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
        description=""
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

          <div className="flex flex-wrap gap-3 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-primary" />
              {post.date}
            </span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="size-3" />
              {post.category}
            </Badge>
          </div>


          <div className="prose prose-invert max-w-none leading-relaxed text-muted-foreground mb-12">
            {(post.content || "")
              .split("\n")
              .map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>

          {post.image_url && (
            <div className="relative aspect-video w-full mb-12 overflow-hidden rounded-xl border border-border/50 shadow-xl">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {post.images && post.images.length > 0 && (
            <div className="mt-12 pt-12 border-t border-border/30">
              <h3 className="text-xl font-semibold mb-6 font-serif text-foreground flex items-center gap-2">
                <ImageIcon className="size-5 text-primary" />
                Galeria do Projecto
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {post.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted">
                    <Image
                      src={img}
                      alt={`${post.title} - ${idx + 1}`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
