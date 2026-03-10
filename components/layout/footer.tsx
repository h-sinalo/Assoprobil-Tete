import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const quickLinks = [
  { href: "/sobre", label: "Sobre a Associação" },
  { href: "/campeonatos", label: "Campeonatos" },
  { href: "/noticias", label: "Notícias" },
  { href: "/galeria", label: "Galeria" },
  { href: "/contactos", label: "Contactos" },
  { href: "/login", label: "Área Administrativa" },
]

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="ASSOPROBIL Tete"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-serif text-lg font-bold text-primary">
                ASSOPROBIL
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Associação Provincial de Bilhar de Tete. Promovendo a excelência
              desportiva e o desenvolvimento comunitário através do bilhar desde
              2021.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-secondary">
              Links Rápidos
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Links rapidos">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-secondary">
              Contactos
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Cidade de Tete, Província de Tete, Moçambique
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +258 84 000 0000
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  info@assoprobil.co.mz
                </span>
              </div> */}
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-secondary">
              Redes Sociais
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ASSOPROBIL Tete. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Associação Provincial de Bilhar de Tete, Moçambique
          </p>
        </div>
      </div>
    </footer>
  )
}
