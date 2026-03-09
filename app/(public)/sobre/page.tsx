import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import {
  Target,
  Eye,
  Heart,
  Users,
  Shield,
  Award,
  Handshake,
  GraduationCap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre a Associacao",
  description:
    "Conheca a ASSOPROBIL Tete - a nossa historia, missao, visao e valores. Desde 2021 a promover o bilhar na provincia de Tete, Mocambique.",
}

const timelineItems = [
  {
    year: "2021",
    title: "Criação do NUPROBIL",
    description:
      "Criação do Núcleo Provincial de Bilhar de Tete (NUPROBIL) com o objectivo de desenvolver a modalidade de bilhar na província. Os primeiros torneios provinciais realizaram-se com crescimento de 16 para 32 jogadores.",
  },
  {
    year: "2022",
    title: "Reconhecimento Oficial",
    description:
      "O NUPROBIL recebe o reconhecimento oficial pela Direcção Provincial da Juventude, Desporto e Emprego, abrindo caminho para a formalização das actividades e a organização de campeonatos oficiais.",
  },
  {
    year: "2023",
    title: "Primeiro Torneio Nacional",
    description:
      "Organização do primeiro torneio nacional de bilhar em Moçambique, sediado em Tete. Um marco histórico que colocou Tete no centro do desporto nacional e reuniu jogadores de todas as províncias do país.",
  },
  {
    year: "2024",
    title: "Primeiro Torneio Interprovincial",
    description:
      "Organização do primeiro torneio interprovincial da zona centro, reunindo jogadores de Tete, Sofala e Manica. Expansão dos programas de formação de jovens e início do projecto 'Bilhar nas Escolas'.",
  },
  {
    year: "2025",
    title: "Criação Oficial da ASSOPROBIL",
    description:
      "Criação oficial da Associação Provincial de Bilhar de Tete (ASSOPROBIL Tete), consolidando quatro anos de crescimento do bilhar na província e marcando o início de uma nova era para a modalidade em Tete.",
  },
]


const values = [
  {
    icon: <Award className="size-6" />,
    title: "Excelencia Desportiva",
    description:
      "Compromisso com os mais altos padroes de competicao e formacao tecnica.",
  },
  {
    icon: <Users className="size-6" />,
    title: "Inclusao",
    description:
      "O bilhar e para todos, independentemente da idade, genero ou condicao social.",
  },
  {
    icon: <Handshake className="size-6" />,
    title: "Fair Play",
    description:
      "Respeito pelo adversario, pelas regras e pelo espirito desportivo.",
  },
  {
    icon: <Heart className="size-6" />,
    title: "Responsabilidade Social",
    description:
      "Utilizacao do desporto como ferramenta de transformacao comunitaria.",
  },
  {
    icon: <GraduationCap className="size-6" />,
    title: "Formacao",
    description:
      "Investimento continuo na capacitacao de jogadores, arbitros e dirigentes.",
  },
  {
    icon: <Shield className="size-6" />,
    title: "Integridade",
    description:
      "Transparencia e etica em todas as actividades da associacao.",
  },
]

export default function SobrePage() {
  return (
    <>
      <PageHeader
        title="Sobre a Associacao"
        description="Conheca a historia, missao e valores da ASSOPROBIL Tete - a forca motriz do bilhar na provincia de Tete desde 2021."
        breadcrumbs={[{ label: "Sobre" }]}
      />

      {/* Intro Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
              A <span className="font-semibold text-foreground">ASSOPROBIL</span>{" "}
              - Associacao Provincial de Bilhar de Tete - foi fundada em 2021 com
              a missao de promover, organizar e desenvolver o desporto de bilhar
              na provincia de Tete, Mocambique. Desde a sua fundacao, a
              associacao tem trabalhado incansavelmente para elevar o nivel
              competitivo, formar novos talentos e utilizar o bilhar como
              ferramenta de desenvolvimento social.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-border/30 bg-card/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="size-6 text-primary" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Missao
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Promover, organizar e desenvolver o desporto de bilhar na
                provincia de Tete, proporcionando competicoes de alto nivel,
                formacao de qualidade e programas de inclusao social que
                contribuam para o desenvolvimento integral dos praticantes e das
                comunidades locais.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Eye className="size-6 text-secondary" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Visao
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Ser a associacao provincial de referencia no desenvolvimento do
                bilhar em Mocambique, reconhecida pela excelencia dos seus eventos,
                pelo impacto positivo nas comunidades e pela formacao de atletas
                de nivel nacional e internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Os Nossos Valores
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-secondary" />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center gap-3 rounded-lg border border-border/50 bg-card p-6 text-center transition-colors hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {value.icon}
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border/30 bg-card/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
              A Nossa Historia
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              O percurso da ASSOPROBIL desde a sua fundacao
            </p>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-secondary" />
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute top-0 left-6 h-full w-px bg-border lg:left-1/2 lg:-translate-x-px" />

              {timelineItems.map((item, i) => (
                <div
                  key={item.year}
                  className="relative mb-10 flex gap-6 last:mb-0 lg:mb-12"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    <span className="text-xs font-bold text-primary">
                      {item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-lg border border-border/50 bg-card p-5 lg:w-[calc(50%-3rem)] ${i % 2 === 0
                        ? "lg:ml-auto lg:pl-6"
                        : "lg:mr-auto lg:pr-6"
                      }`}
                  >
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
