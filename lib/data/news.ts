export type NewsArticle = {
  slug: string
  title: string
  description: string
  content: string
  date: string
  category: string
}

export const news: NewsArticle[] = [
  {
    slug: "assoprobil-prepara-campeonato-2025",
    title: "ASSOPROBIL prepara o Campeonato Provincial de 2025",
    description:
      "A associacao ja iniciou os preparativos para a maior competicao de bilhar da provincia, prevista para Marco de 2025.",
    content:
      "A ASSOPROBIL Tete esta em plena fase de preparacao para o Campeonato Provincial de Bilhar 2025, que promete ser a edicao mais ambiciosa de sempre. Com inscricoes abertas para jogadores de todos os distritos da provincia, a organizacao espera atrair mais de 48 participantes este ano.\n\nOs preparativos incluem a renovacao das mesas de bilhar no Clube Recreativo de Tete, a formacao de arbitros certificados e a criacao de um sistema de classificacao digital para acompanhar os resultados em tempo real.\n\nA associacao tambem esta em negociacoes com patrocinadores locais e nacionais para garantir premios mais atractivos e melhor cobertura mediatica do evento. O presidente da ASSOPROBIL afirmou que o campeonato de 2025 sera um marco na consolidacao do bilhar como desporto de referencia em Tete.",
    date: "10 de Janeiro, 2025",
    category: "Campeonatos",
  },
  {
    slug: "parceria-governo-provincial",
    title: "ASSOPROBIL firma parceria com o Governo Provincial",
    description:
      "Nova parceria visa promover o desporto de bilhar como ferramenta de inclusao social e desenvolvimento juvenil.",
    content:
      "A ASSOPROBIL Tete assinou um protocolo de cooperacao com o Governo Provincial de Tete, marcando um passo significativo no reconhecimento do bilhar como desporto de interesse publico na regiao.\n\nO acordo preve o apoio governamental para a realizacao de torneios provinciais, a construcao de espacos dedicados ao bilhar em centros comunitarios, e a implementacao de programas de formacao desportiva para jovens em situacao de vulnerabilidade.\n\nO Governador Provincial destacou a importancia do desporto como factor de coesao social e elogiou o trabalho da ASSOPROBIL na promocao de actividades desportivas que contribuem para o desenvolvimento da provincia.",
    date: "5 de Dezembro, 2024",
    category: "Institucional",
  },
  {
    slug: "formacao-arbitros-2024",
    title: "Curso de formacao de arbitros de bilhar realizado com sucesso",
    description:
      "Quinze novos arbitros foram certificados apos completarem o programa de formacao da associacao.",
    content:
      "A ASSOPROBIL realizou com sucesso o seu segundo curso de formacao de arbitros de bilhar, certificando 15 novos profissionais que poderao oficiar em competicoes provinciais e nacionais.\n\nO curso, que decorreu ao longo de duas semanas, cobriu temas como regras oficiais do bilhar, gestao de competicoes, etica desportiva e resolucao de conflitos. Os participantes foram avaliados tanto teoricamente como na pratica, arbitrando jogos simulados.\n\nEsta iniciativa da ASSOPROBIL visa elevar o padrao das competicoes de bilhar em Tete, garantindo que todos os eventos oficiais sejam arbitrados por profissionais qualificados e imparciais.",
    date: "18 de Outubro, 2024",
    category: "Formacao",
  },
  {
    slug: "torneio-amizade-resultados",
    title: "Carlos Manhica vence o Torneio da Amizade 2024",
    description:
      "O jogador de Tete cidade sagrou-se campeao num evento que reuniu 32 atletas de seis clubes diferentes.",
    content:
      "Carlos Manhica conquistou o titulo do Torneio da Amizade 2024, demonstrando uma performance excepcional ao longo de cinco dias de competicao intensa. Na final, Manhica derrotou Joao Sitoe por 4-2, selando a vitoria com uma serie impressionante de carambolagens.\n\nO torneio, realizado no Salao Desportivo Municipal, reuniu 32 jogadores de seis clubes da provincia de Tete, promovendo o espirito de camaradagem e fair play que caracteriza a comunidade de bilhar local.\n\nO evento incluiu ainda workshops de tecnica avancada conduzidos por jogadores experientes e um jantar de confraternizacao que reuniu atletas, dirigentes e amantes do bilhar.",
    date: "25 de Novembro, 2024",
    category: "Campeonatos",
  },
  {
    slug: "projecto-bilhar-nas-escolas",
    title: "Lancado o projecto Bilhar nas Escolas",
    description:
      "Iniciativa pioneira levara o ensino do bilhar a cinco escolas secundarias da cidade de Tete.",
    content:
      "A ASSOPROBIL lancou oficialmente o projecto Bilhar nas Escolas, uma iniciativa inovadora que visa introduzir o desporto de bilhar no contexto educativo. O programa, que arranca com cinco escolas secundarias da cidade de Tete, oferecera aulas semanais de bilhar como actividade extracurricular.\n\nO projecto tem como objectivos nao apenas formar novos praticantes da modalidade, mas tambem utilizar o bilhar como ferramenta educativa para desenvolver competencias como concentracao, pensamento estrategico e disciplina.\n\nAs escolas participantes receberao mesas de bilhar e material didactico, e os professores de educacao fisica beneficiarao de formacao especifica para orientar os alunos na pratica da modalidade.",
    date: "1 de Setembro, 2024",
    category: "Responsabilidade Social",
  },
  {
    slug: "reconhecimento-nacional-assoprobil",
    title: "ASSOPROBIL recebe reconhecimento a nivel nacional",
    description:
      "A Federacao Nacional de Bilhar de Mocambique reconheceu a ASSOPROBIL como a associacao provincial mais activa do pais.",
    content:
      "A ASSOPROBIL Tete recebeu o premio de Associacao Provincial Mais Activa de 2024, atribuido pela Federacao Nacional de Bilhar de Mocambique. O reconhecimento destaca o trabalho excepcional da associacao na promocao e desenvolvimento do bilhar na provincia de Tete.\n\nO premio foi entregue durante a gala anual da Federacao, em Maputo, e reconhece o volume e qualidade dos eventos organizados, o crescimento do numero de praticantes, e as iniciativas de responsabilidade social implementadas pela ASSOPROBIL ao longo do ano.\n\nO presidente da associacao dedicou o premio a todos os membros, voluntarios e parceiros que contribuem diariamente para o sucesso da ASSOPROBIL.",
    date: "15 de Dezembro, 2024",
    category: "Institucional",
  },
]

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug)
}

export function getLatestNews(count: number = 3): NewsArticle[] {
  return news.slice(0, count)
}
