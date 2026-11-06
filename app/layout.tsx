import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CheerManager | Gestiona tu club al siguiente nivel",
  description: "La plataforma para administrar clubes de cheerleading. Organiza deportistas, entrenamientos, procesos administrativos y finanzas desde un solo lugar.",
  keywords: ["software para clubes de cheerleading", "gestión de clubes deportivos", "administración de clubes de cheerleading", "software para academias deportivas"],
  openGraph: { title: "CheerManager | Gestión para clubes de cheerleading", description: "Todo tu club conectado en un solo lugar.", type: "website", locale: "es_CO" },
}

export const viewport: Viewport = { themeColor: "#98003d", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" suppressHydrationWarning><body>{children}</body></html>
}
