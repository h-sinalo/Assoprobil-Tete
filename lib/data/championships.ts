export type Championship = {
  slug: string
  title: string
  description: string
  longDescription: string
  date: string
  endDate?: string
  location: string
  participants: number
  status: "upcoming" | "ongoing" | "completed"
  year: number
  results?: { position: number; player: string; points: number }[]
}

export const championships: Championship[] = [
  {
    slug: "campeonato-provincial-2025",
    title: "Campeonato Provincial de Bilhar 2025",
    description:
      "O maior evento de bilhar da provincia de Tete, reunindo os melhores jogadores para competir pelo titulo provincial.",
    longDescription:
      "O Campeonato Provincial de Bilhar 2025 promete ser a edicao mais competitiva de sempre. Com a participacao de jogadores de todos os distritos da provincia de Tete, o evento decorrera ao longo de duas semanas, com fases eliminatorias, semifinais e a grande final. Este ano, o campeonato contara com categorias de singulares e pares, oferecendo mais oportunidades para os atletas demonstrarem o seu talento. Os vencedores representarao Tete no Campeonato Nacional de Bilhar.",
    date: "15 de Marco, 2025",
    endDate: "30 de Marco, 2025",
    location: "Clube Recreativo de Tete",
    participants: 48,
    status: "upcoming",
    year: 2025,
  },
  {
    slug: "torneio-amizade-2024",
    title: "Torneio da Amizade 2024",
    description:
      "Torneio especial que celebra a camaradagem e o espirito desportivo entre jogadores de diferentes clubes da regiao.",
    longDescription:
      "O Torneio da Amizade 2024 foi um evento memoravel que reuniu jogadores de seis clubes diferentes da provincia de Tete. Realizado no espirito de uniao e fair play, o torneio promoveu nao apenas a competicao saudavel mas tambem o fortalecimento dos lacos entre as comunidades desportivas. O evento incluiu workshops de tecnica, demonstracoes de jogadores experientes e um jantar de confraternizacao para todos os participantes.",
    date: "20 de Novembro, 2024",
    endDate: "24 de Novembro, 2024",
    location: "Salao Desportivo Municipal",
    participants: 32,
    status: "completed",
    year: 2024,
    results: [
      { position: 1, player: "Carlos Manhica", points: 250 },
      { position: 2, player: "Joao Sitoe", points: 220 },
      { position: 3, player: "Alberto Cossa", points: 195 },
      { position: 4, player: "Manuel Tembe", points: 180 },
    ],
  },
  {
    slug: "campeonato-provincial-2024",
    title: "Campeonato Provincial de Bilhar 2024",
    description:
      "A segunda edicao do campeonato provincial que consolidou o bilhar como modalidade de referencia em Tete.",
    longDescription:
      "O Campeonato Provincial de 2024 marcou um marco na historia do bilhar em Tete, com um numero recorde de participantes e cobertura mediatica sem precedentes. O evento decorreu durante tres semanas no Clube Recreativo de Tete, com jogos eliminatorios todas as tardes e finais ao fim de semana. A qualidade tecnica dos jogadores demonstrou a evolucao significativa da modalidade na provincia, resultado directo dos programas de formacao implementados pela ASSOPROBIL.",
    date: "1 de Julho, 2024",
    endDate: "21 de Julho, 2024",
    location: "Clube Recreativo de Tete",
    participants: 40,
    status: "completed",
    year: 2024,
    results: [
      { position: 1, player: "Joao Sitoe", points: 280 },
      { position: 2, player: "Carlos Manhica", points: 260 },
      { position: 3, player: "Fernando Macamo", points: 230 },
      { position: 4, player: "Pedro Nhambirre", points: 210 },
    ],
  },
  {
    slug: "open-tete-2023",
    title: "Open de Tete 2023",
    description:
      "Primeiro torneio aberto da provincia, convidando jogadores de outras provincias para competir em Tete.",
    longDescription:
      "O Open de Tete 2023 foi um evento historico que abriu as portas do bilhar tetense para jogadores de todo o pais. Com participantes de Maputo, Beira, Nampula e Zambezia, o torneio proporcionou um intercambio desportivo valioso e elevou o nivel competitivo local. O evento contou com o apoio de diversas entidades locais e foi considerado um sucesso organizativo que colocou Tete no mapa nacional do bilhar.",
    date: "10 de Setembro, 2023",
    endDate: "17 de Setembro, 2023",
    location: "Centro Desportivo Provincial",
    participants: 36,
    status: "completed",
    year: 2023,
    results: [
      { position: 1, player: "Roberto Silva", points: 300 },
      { position: 2, player: "Carlos Manhica", points: 275 },
      { position: 3, player: "Antonio Guebuza", points: 240 },
      { position: 4, player: "Joao Sitoe", points: 225 },
    ],
  },
  {
    slug: "campeonato-inaugural-2022",
    title: "Campeonato Inaugural 2022",
    description:
      "O primeiro campeonato oficial organizado pela ASSOPROBIL, marcando o inicio de uma nova era para o bilhar em Tete.",
    longDescription:
      "O Campeonato Inaugural de 2022 foi o momento que definiu a ASSOPROBIL como a forca motriz do bilhar em Tete. Apesar de ser a primeira edicao, o evento atraiu 24 jogadores entusiastas de toda a provincia. A organizacao impecavel e o espirito competitivo demonstrado abriram caminho para eventos maiores e mais ambiciosos nos anos seguintes. Este campeonato estabeleceu os padroes de qualidade que a associacao mantem ate hoje.",
    date: "15 de Maio, 2022",
    endDate: "22 de Maio, 2022",
    location: "Clube Recreativo de Tete",
    participants: 24,
    status: "completed",
    year: 2022,
    results: [
      { position: 1, player: "Fernando Macamo", points: 220 },
      { position: 2, player: "Alberto Cossa", points: 200 },
      { position: 3, player: "Carlos Manhica", points: 185 },
      { position: 4, player: "Manuel Tembe", points: 170 },
    ],
  },
]

export function getChampionshipBySlug(slug: string): Championship | undefined {
  return championships.find((c) => c.slug === slug)
}

export function getChampionshipsByYear(year: number): Championship[] {
  return championships.filter((c) => c.year === year)
}

export function getUpcomingChampionships(): Championship[] {
  return championships.filter((c) => c.status === "upcoming")
}
