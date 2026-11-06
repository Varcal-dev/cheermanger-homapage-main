export const plans = [
  { name: "START", price: 99900, limit: 75, description: "Para clubes que están dando el siguiente salto." },
  { name: "PRO", price: 199900, limit: 200, description: "Para clubes en crecimiento y movimiento." },
  { name: "ELITE", price: 349900, limit: 500, description: "Para operaciones deportivas consolidadas." },
  { name: "ENTERPRISE", price: null, limit: 501, description: "Para clubes con necesidades a gran escala." },
] as const

export const modules = [
  ["Deportistas y acudientes", "Toda la información de tus familias, siempre disponible."],
  ["Entrenadores y personal", "Coordina a tu equipo y sus responsabilidades."],
  ["Grupos, divisiones y niveles", "Organiza tu estructura deportiva con claridad."],
  ["Horarios y asistencias", "Planea entrenamientos y registra la asistencia."],
  ["Matrículas e inscripciones", "Simplifica el ingreso y la renovación de deportistas."],
  ["Gestión financiera", "Ten una visión ordenada de pagos y mensualidades."],
  ["Eventos y competencias", "Centraliza la información de cada presentación."],
  ["Evaluaciones y seguimiento", "Acompaña el progreso de tus deportistas."],
  ["Inventario y ventas", "Controla productos, uniformes y existencias."],
  ["Panel y reportes", "Convierte la información en mejores decisiones."],
] as const

export const contact = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL,
  foundersAvailable: process.env.NEXT_PUBLIC_FOUNDING_CLUBS_AVAILABLE,
}

export const logoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/davinci__image1__podrias_desarrollar_una_versi_n_m_s_minim.png-VS5zH9Fgn2OpmEmShEZsYbSy59sQX7.jpeg"

export function formatCOP(price: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price)
}
