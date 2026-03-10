import type { Metadata } from "next"
import { PageHeader } from "@/components/shared/page-header"
import { ContactForm } from "@/components/shared/contact-form"
import { Mail, MapPin, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Entre em contacto com a ASSOPROBIL Tete. Formulário de contacto, endereço, telefone e redes sociais.",
}

const contactInfo = [
  {
    icon: <MapPin className="size-5" />,
    title: "Endereço",
    lines: ["Cidade de Tete", "Província de Tete", "Moçambique"],
  },
  {
    icon: <Phone className="size-5" />,
    title: "Telefone",
    lines: ["+258 84 000 0000", "+258 86 000 0000"],
  },
  {
    icon: <Mail className="size-5" />,
    title: "Email",
    lines: ["info@assoprobil.co.mz", "geral@assoprobil.co.mz"],
  },
  {
    icon: <Clock className="size-5" />,
    title: "Horário",
    lines: ["Segunda a Sexta: 08h00 - 17h00", "Sábado: 09h00 - 13h00"],
  },
]

export default function ContactosPage() {
  return (
    <>
      <PageHeader
        title="Contactos"
        description="Entre em contacto connosco. Estamos disponíveis para responder a todas as suas questões sobre a ASSOPROBIL e os nossos programas."
        breadcrumbs={[{ label: "Contactos" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="mb-6 font-serif text-xl font-bold text-foreground">
                Envie-nos uma Mensagem
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-serif text-xl font-bold text-foreground">
                Informações de Contacto
              </h2>
              <div className="flex flex-col gap-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="flex gap-4 rounded-lg border border-border/50 bg-card p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {info.title}
                      </h3>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 overflow-hidden rounded-lg border border-border/50">
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-center">
                    <MapPin className="mx-auto size-8 text-primary/40" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Tete, Moçambique
                    </p>
                    <p className="text-xs text-muted-foreground">
                      -16.1564, 33.5867
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 rounded-lg border border-border/50 bg-card p-5">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Redes Sociais
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Facebook", "Instagram", "YouTube"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="rounded-md border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
