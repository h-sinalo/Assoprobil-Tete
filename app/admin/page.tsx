import type { Metadata } from "next"
import { Trophy, Newspaper, Heart, ImageIcon, Users, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase-server"

export const metadata: Metadata = {
  title: "Dashboard | Admin ASSOPROBIL",
}

export const revalidate = 60

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: champCount },
    { count: newsCount },
    { count: socialCount },
    { count: galleryCount },
    { count: playerCount },
    { count: messageCount },
    { data: recentChamp },
    { data: recentNews },
  ] = await Promise.all([
    supabase.from("championships").select("*", { count: "exact", head: true }),
    supabase.from("news").select("*", { count: "exact", head: true }),
    supabase.from("social_responsibility").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase.from("players").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
    supabase.from("championships").select("*").order("created_at", { ascending: false }).limit(4),
    supabase.from("news").select("*").order("created_at", { ascending: false }).limit(4),
  ])

  const stats = [
    { label: "Campeonatos", value: champCount ?? 0, icon: Trophy, change: "total de eventos" },
    { label: "Notícias", value: newsCount ?? 0, icon: Newspaper, change: "publicadas" },
    { label: "Projectos Sociais", value: socialCount ?? 0, icon: Heart, change: "activos" },
    { label: "Imagens na Galeria", value: galleryCount ?? 0, icon: ImageIcon, change: "4 categorias" },
    { label: "Jogadores Registados", value: playerCount ?? 0, icon: Users, change: "no ranking" },
    { label: "Mensagens Não Lidas", value: messageCount ?? 0, icon: TrendingUp, change: "de contacto" },
  ]

  const statusLabels = { upcoming: "Próximo", ongoing: "Em Curso", completed: "Concluído" }
  const statusStyles = {
    upcoming: "bg-secondary/15 text-secondary",
    ongoing: "bg-primary/15 text-primary",
    completed: "bg-muted text-muted-foreground",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão geral do sistema ASSOPROBIL Tete</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <Trophy className="size-4 text-primary" /> Campeonatos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(recentChamp ?? []).map((champ) => (
                <div key={champ.id} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{champ.title}</p>
                    <p className="text-xs text-muted-foreground">{champ.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[champ.status as keyof typeof statusStyles]}`}>
                    {statusLabels[champ.status as keyof typeof statusLabels]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <Newspaper className="size-4 text-primary" /> Notícias Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(recentNews ?? []).map((article) => (
                <div key={article.id} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{article.title}</p>
                    <p className="text-xs text-muted-foreground">{article.date}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {article.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
