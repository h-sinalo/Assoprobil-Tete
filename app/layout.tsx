import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'ASSOPROBIL Tete - Associacao Provincial de Bilhar',
    template: '%s | ASSOPROBIL Tete',
  },
  description:
    'Associacao Provincial de Bilhar de Tete, Mocambique. Campeonatos, noticias, responsabilidade social e desenvolvimento do desporto de bilhar na provincia de Tete.',
  keywords: ['bilhar', 'tete', 'mocambique', 'assoprobil', 'campeonato', 'snooker', 'pool'],
  openGraph: {
    title: 'ASSOPROBIL Tete - Associacao Provincial de Bilhar',
    description:
      'Associacao Provincial de Bilhar de Tete. Promovendo o bilhar em Mocambique.',
    locale: 'pt_MZ',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`font-sans antialiased ${_playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
