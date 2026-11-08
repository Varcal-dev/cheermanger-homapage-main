import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "CheerManager | Pre-regístrate y gestiona tu club al siguiente nivel",
  description:
    "La plataforma para administrar clubes de cheerleading: deportistas, entrenamientos, cobros, eventos y evaluaciones en un solo lugar. Pre-regístrate y entra de los primeros.",
  keywords: ["software para clubes de cheerleading", "gestión de clubes deportivos", "administración de clubes de cheerleading", "software para academias deportivas"],
  openGraph: {
    title: "CheerManager | Tu club, en orden",
    description: "Pre-regístrate y entra de los primeros a la plataforma para clubes de cheerleading.",
    type: "website",
    locale: "es_CO",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#800F2F" },
    { media: "(prefers-color-scheme: dark)", color: "#141016" },
  ],
  width: "device-width",
  initialScale: 1,
}

// Corre antes de pintar: marca que hay JS (para las animaciones de entrada) y
// aplica el tema guardado, para que la página no parpadee al cargar.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('cm-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  )
}