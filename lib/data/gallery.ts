export type GalleryItem = {
  id: string
  title: string
  category: "campeonatos" | "eventos" | "comunidade" | "treinos"
  description: string
}

export const gallery: GalleryItem[] = [
  {
    id: "1",
    title: "Final do Campeonato Provincial 2024",
    category: "campeonatos",
    description: "Momento decisivo da final entre Joao Sitoe e Carlos Manhica",
  },
  {
    id: "2",
    title: "Cerimonia de abertura 2024",
    category: "campeonatos",
    description: "Cerimonia oficial de abertura do Campeonato Provincial",
  },
  {
    id: "3",
    title: "Entrega de premios",
    category: "campeonatos",
    description: "Os vencedores do Campeonato Provincial recebem os seus trofeus",
  },
  {
    id: "4",
    title: "Torneio da Amizade",
    category: "eventos",
    description: "Jogadores de diferentes clubes confraternizam durante o torneio",
  },
  {
    id: "5",
    title: "Gala anual ASSOPROBIL",
    category: "eventos",
    description: "Membros da associacao durante a gala anual de celebracao",
  },
  {
    id: "6",
    title: "Torneio Solidario 2024",
    category: "eventos",
    description: "Participantes do torneio solidario em prol da educacao",
  },
  {
    id: "7",
    title: "Formacao de jovens",
    category: "comunidade",
    description: "Jovens aprendendo as bases do bilhar no programa comunitario",
  },
  {
    id: "8",
    title: "Bilhar nas Escolas",
    category: "comunidade",
    description: "Alunos participando no projecto Bilhar nas Escolas",
  },
  {
    id: "9",
    title: "Inclusao social",
    category: "comunidade",
    description: "Sessao inclusiva com participantes de diferentes capacidades",
  },
  {
    id: "10",
    title: "Treino da seleccao provincial",
    category: "treinos",
    description: "A seleccao de Tete prepara-se para o campeonato nacional",
  },
  {
    id: "11",
    title: "Sessao de tecnica avancada",
    category: "treinos",
    description: "Workshop de tecnica avancada com jogadores experientes",
  },
  {
    id: "12",
    title: "Treino individual",
    category: "treinos",
    description: "Jogador aperfeicoando a sua tecnica de tacada",
  },
]

export function getGalleryByCategory(category: string): GalleryItem[] {
  return gallery.filter((item) => item.category === category)
}
