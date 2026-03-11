import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { PostCard } from "@/components/shared/post-card"
import { supabase } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Campeonatos",
  description:
    "Campeonatos e torneios de bilhar organizados pela ASSOPROBIL Tete. Consulte resultados, datas e detalhes dos eventos.",
}

export const revalidate = 60

export default async function CampeonatosPage() {
  const { data: championships } = await supabase
    .from("championships")
    .select("*")
    .order("year", { ascending: false })

  return (
    <>
      <PageHeader
        title="Campeonatos"
        description="Todos os campeonatos e torneios organizados pela ASSOPROBIL Tete. Acompanhe os próximos eventos e consulte os resultados anteriores."
        breadcrumbs={[{ label: "Campeonatos" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(championships ?? []).map((champ) => (
              <PostCard
                key={champ.slug}
                title={champ.title}
                description={champ.long_description ? champ.long_description.substring(0, 160) + "..." : ""}
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
    </>
  )
}
