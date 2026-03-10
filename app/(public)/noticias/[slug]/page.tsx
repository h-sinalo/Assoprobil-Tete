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
    .from("news")
    .select("title, content")
    .eq("slug", slug)
    .single()
  if (!data) return { title: "Notícia | ASSOPROBIL Tete" }
  return { title: data.title, description: data.content?.substring(0, 160) }
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { data: article } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!article) notFound()

  return (
    <>
      <PageHeader
        title={article.title}
        description=""
        breadcrumbs={[
          { label: "Notícias", href: "/noticias" },
          { label: article.title },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/noticias"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Voltar às Notícias
          </Link>

          <div className="flex flex-wrap gap-3 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-primary" />
              {article.date}
            </span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="size-3" />
              {article.category}
            </Badge>
          </div>

          {article.image_url && (
            <div className="relative aspect-video w-full mb-12 overflow-hidden rounded-xl border border-border/50 shadow-xl">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}


          <div className="prose prose-invert max-w-none leading-relaxed text-muted-foreground mb-12">
            {(article.content || "")
              .split("\n")
              .map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>

          {article.images && article.images.length > 0 && (
            <div className="pt-12 border-t border-border/30">
              <h3 className="text-xl font-semibold mb-6 font-serif text-foreground">Galeria da Notícia</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {article.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted group">
                    <Image
                      src={img}
                      alt={`${article.title} - ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
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
