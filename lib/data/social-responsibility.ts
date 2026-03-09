export type SocialResponsibilityPost = {
  slug: string
  title: string
  description: string
  content: string
  date: string
  category: string
  impact?: string
}

export const socialResponsibility: SocialResponsibilityPost[] = [
  {
    slug: "formacao-jovens-tete",
    title: "Programa de Formacao de Jovens Jogadores",
    description:
      "Formacao gratuita de bilhar para jovens dos 14 aos 21 anos, proporcionando competencias desportivas e valores sociais.",
    content:
      "O Programa de Formacao de Jovens Jogadores e a iniciativa embandeirada da ASSOPROBIL em materia de responsabilidade social. Lancado em 2022, o programa oferece formacao gratuita de bilhar a jovens entre os 14 e os 21 anos, com especial enfoque em jovens de comunidades vulneraveis.\n\nAlem do ensino da tecnica do bilhar, o programa integra componentes de desenvolvimento pessoal, incluindo workshops sobre disciplina, trabalho em equipa, gestao emocional e lideranca. Os jovens participantes beneficiam tambem de mentoria por parte de jogadores experientes da associacao.\n\nAte a data, mais de 120 jovens ja participaram no programa, com muitos deles a integrarem as competicoes oficiais da provincia. O programa funciona aos sabados de manha, em tres centros comunitarios da cidade de Tete.",
    date: "15 de Marco, 2024",
    category: "Formacao de Jovens",
    impact: "120 jovens formados desde 2022",
  },
  {
    slug: "torneios-solidarios",
    title: "Torneios Solidarios Anuais",
    description:
      "Competicoes beneficentes cujas receitas revertem para causas sociais na provincia de Tete.",
    content:
      "Os Torneios Solidarios da ASSOPROBIL sao eventos anuais que combinam a paixao pelo bilhar com a solidariedade social. Em cada torneio, as taxas de inscricao e as receitas da bilheteira sao integralmente revertidas para causas sociais previamente identificadas.\n\nEm 2024, o Torneio Solidario angariou fundos para a renovacao de uma sala de aula na Escola Primaria de Moatize. No ano anterior, os fundos apoiaram a aquisicao de material escolar para 200 criancas carenciadas.\n\nOs torneios solidarios atraem nao apenas jogadores de bilhar, mas toda a comunidade, que participa com entusiasmo sabendo que a sua presenca contribui directamente para o bem-estar social. A ASSOPROBIL compromete-se a manter e expandir esta tradicao nos proximos anos.",
    date: "20 de Junho, 2024",
    category: "Torneios Solidarios",
    impact: "Mais de 500.000 MT angariados em 3 edicoes",
  },
  {
    slug: "projectos-comunitarios",
    title: "Projectos de Desenvolvimento Comunitario",
    description:
      "Iniciativas que utilizam o bilhar como catalisador para o desenvolvimento das comunidades locais.",
    content:
      "A ASSOPROBIL acredita que o desporto pode ser um poderoso catalisador para o desenvolvimento comunitario. Neste espirito, a associacao desenvolve varios projectos que visam fortalecer o tecido social das comunidades da provincia de Tete.\n\nEntre os projectos activos destacam-se a instalacao de mesas de bilhar em centros comunitarios, permitindo que os residentes tenham acesso gratuito ao desporto; a organizacao de torneios inter-bairros que promovem a interaccao entre comunidades; e o programa de voluntariado que envolve jogadores de bilhar em actividades de limpeza e manutencao de espacos publicos.\n\nEstes projectos demonstram o compromisso da ASSOPROBIL em ir alem da competicao desportiva, contribuindo activamente para a melhoria da qualidade de vida das comunidades que serve.",
    date: "10 de Agosto, 2024",
    category: "Projectos Comunitarios",
    impact: "5 centros comunitarios equipados",
  },
  {
    slug: "inclusao-social-desporto",
    title: "Bilhar como Ferramenta de Inclusao Social",
    description:
      "Programa dedicado a promover a participacao de pessoas com deficiencia e grupos marginalizados no bilhar.",
    content:
      "O programa de Inclusao Social atraves do Bilhar e uma iniciativa pioneira da ASSOPROBIL que visa garantir que o desporto de bilhar seja acessivel a todos, independentemente das suas condicoes fisicas ou sociais.\n\nO programa inclui adaptacoes nas mesas e equipamentos para jogadores com mobilidade reduzida, sessoes de treino dedicadas para pessoas com deficiencia, e a criacao de uma categoria especial nas competicoes oficiais que permite a participacao plena destes atletas.\n\nAlem disso, a ASSOPROBIL trabalha com organizacoes locais que apoiam populacoes marginalizadas, oferecendo o bilhar como uma actividade recreativa e terapeutica. O desporto tem demonstrado beneficios significativos na melhoria da autoestima, concentracao e integracao social dos participantes.",
    date: "5 de Novembro, 2024",
    category: "Inclusao Social",
    impact: "30 participantes com necessidades especiais integrados",
  },
]

export function getSocialResponsibilityBySlug(
  slug: string
): SocialResponsibilityPost | undefined {
  return socialResponsibility.find((sr) => sr.slug === slug)
}
