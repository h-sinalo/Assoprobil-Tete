import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { PostCard } from "@/components/shared/post-card"
import { supabase } from "@/lib/supabase"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Campeonatos",
  description:
    "Campeonatos e torneios de bilhar organizados pela ASSOPROBIL Tete. Consulte resultados, datas e detalhes dos eventos.",
}

export const revalidate = 60

export default async function CampeonatosPage() {
  const [{ data: championships }, { data: players }] = await Promise.all([
    supabase.from("championships").select("*").order("year", { ascending: false }),
    supabase.from("players").select("*").order("rank", { ascending: true }).limit(10),
  ])

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

      {/* Player Rankings */}
      <section className="border-t border-border/30 bg-card/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Ranking Provincial
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Classificação dos melhores jogadores da província de Tete
            </p>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-secondary" />
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead className="hidden sm:table-cell">Clube</TableHead>
                  <TableHead className="text-center">Pts</TableHead>
                  <TableHead className="hidden text-center md:table-cell">V</TableHead>
                  <TableHead className="hidden text-center md:table-cell">J</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(players ?? []).map((player) => (
                  <TableRow key={player.rank} className="hover:bg-muted/30">
                    <TableCell className="text-center">
                      {player.rank <= 3 ? (
                        <Badge
                          className={
                            player.rank === 1
                              ? "bg-secondary text-secondary-foreground"
                              : player.rank === 2
                                ? "bg-muted-foreground/30 text-foreground"
                                : "bg-secondary/40 text-secondary-foreground"
                          }
                        >
                          {player.rank}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">{player.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                      {player.club}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-primary">
                      {player.points}
                    </TableCell>
                    <TableCell className="hidden text-center text-muted-foreground md:table-cell">
                      {player.wins}
                    </TableCell>
                    <TableCell className="hidden text-center text-muted-foreground md:table-cell">
                      {player.matches}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Pts = Pontos | V = Vitórias | J = Jogos Disputados
          </p>
        </div>
      </section>
    </>
  )
}
