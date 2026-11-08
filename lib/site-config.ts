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

export type Area = {
  id: string
  tab: string
  title: string
  copy: string
  bullets: readonly string[]
  card: { title: string; rows: readonly (readonly [string, string])[] }
}

// Cada rol describe cosas que el sistema ya hace. Las cifras de las tarjetas son
// ilustrativas y se rotulan así en la página.
export const areas: readonly Area[] = [
  {
    id: "direccion",
    tab: "Dirección",
    title: "Para quien dirige el club",
    copy: "Una vista clara de cómo va todo, sin pedirle cifras a nadie.",
    bullets: [
      "Paneles de control por área: personas, finanzas, horarios, eventos y más",
      "Temporadas, grupos, niveles y divisiones en un solo lugar",
      "Roles y permisos: cada persona ve solo lo que le corresponde",
    ],
    card: {
      title: "Resumen del club",
      rows: [["Deportistas activos", "184"], ["Asistencia, últimos 30 días", "92 %"], ["Recaudo del mes", "86 %"], ["Próximo evento", "Copa Nacional"]],
    },
  },
  {
    id: "tesoreria",
    tab: "Tesorería",
    title: "Para quien lleva las cuentas",
    copy: "Mensualidades que se generan solas y una cartera que se entiende de un vistazo.",
    bullets: [
      "Facturación mensual con fecha de vencimiento y control de mora",
      "Pagos con abonos y saldo siempre calculado",
      "Planes de pago, descuentos y conciliación",
      "Nada se borra: se anula con motivo y queda el historial",
    ],
    card: {
      title: "Cartera del mes",
      rows: [["Facturado", "$ 4.860.000"], ["Recaudado", "$ 4.180.000"], ["Familias en mora", "3"], ["Facturas por vencer", "12"]],
    },
  },
  {
    id: "entrenadores",
    tab: "Entrenadores",
    title: "Para quien está en el tapete",
    copy: "Menos papel entre el entrenamiento y el seguimiento de cada atleta.",
    bullets: [
      "Horarios por grupo y asistencia registrada en bloque",
      "Evaluaciones por criterio, con historial de cada deportista",
      "Rúbrica de rutinas con el sistema de puntaje FEDECOLCHEER / IASF",
      "Resultados y premios de cada competencia",
    ],
    card: {
      title: "Entrenamiento de hoy",
      rows: [["Presentes", "14 de 16"], ["Evaluaciones de la semana", "6"], ["Grupo", "Nivel 2"], ["Asistencia", "Guardada"]],
    },
  },
  {
    id: "familias",
    tab: "Familias",
    title: "Para deportistas y acudientes",
    copy: "Las familias consultan por su cuenta y tú dejas de responder las mismas preguntas.",
    bullets: [
      "Acceso de consulta a pagos, evaluaciones y rutinas del deportista",
      "Descarga de sus propios reportes",
      "Consentimientos de datos conforme a la Ley 1581 de 2012",
      "Solicitud de inscripción a la nueva temporada",
    ],
    card: {
      title: "Portal de la familia",
      rows: [["Consentimiento de datos", "Vigente"], ["Último pago", "Registrado"], ["Renovación de temporada", "Solicitada"], ["Saldo pendiente", "$ 0"]],
    },
  },
]

export const faq: readonly (readonly [string, string])[] = [
  ["¿Qué es CheerManager?", "Es una plataforma SaaS para centralizar la administración deportiva, administrativa y financiera de clubes de cheerleading."],
  ["¿Cuándo abren?", "Estamos en pre-lanzamiento. Quienes se pre-registren reciben el aviso primero y pueden entrar antes de la apertura pública."],
  ["¿Pre-registrarme tiene costo?", "No. Es gratis y no te compromete a nada. Solo nos sirve para avisarte y preparar tu acceso."],
  ["¿Para qué tipo de clubes está diseñado?", "Está diseñado para clubes de cheerleading de Colombia y Latinoamérica, sin importar su etapa de crecimiento."],
  ["¿Qué módulos incluye?", "Los diez módulos presentados en esta página están incluidos en todos los planes."],
  ["¿Cuánto cuesta utilizar CheerManager?", "Los planes empiezan en $99.900 COP mensuales y dependen de la cantidad de deportistas activos."],
  ["¿Puedo cambiar de plan?", "Sí. El plan se puede ajustar cuando cambie el tamaño de tu club."],
  ["¿Cómo funciona la prueba gratuita?", "Puedes conocer la plataforma durante 30 días antes de activar tu primera suscripción paga. No se requiere tarjeta de crédito."],
  ["¿Qué beneficios tienen los clubes fundadores?", "Los primeros clubes podrán acceder a precio de lanzamiento congelado por 12 meses y acompañamiento prioritario."],
  ["¿Qué hacen con mis datos?", "Los datos del pre-registro solo se usan para avisarte del lanzamiento y preparar tu acceso, conforme a la Ley 1581 de 2012."],
]

export const departamentos = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca",
  "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño",
  "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima",
  "Valle del Cauca", "Vaupés", "Vichada",
] as const

export const contact = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL,
  foundersAvailable: process.env.NEXT_PUBLIC_FOUNDING_CLUBS_AVAILABLE,
  // Nuevas, para el pre-lanzamiento
  politica: process.env.NEXT_PUBLIC_URL_POLITICA,
  terminos: process.env.NEXT_PUBLIC_URL_TERMINOS,
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT,
}

// Número listo para wa.me (solo dígitos, con indicativo: 573001234567)
export const whatsappDigits = contact.whatsapp?.replace(/\D/g, "") || undefined

// Fecha de apertura. Si no se define, la página no muestra cuenta regresiva:
// no inventamos una fecha. Formato: 2026-12-01T00:00:00-05:00
export const launchIso = process.env.NEXT_PUBLIC_LAUNCH_DATE

export function formatLaunch(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Bogota" })
}

export const logoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/davinci__image1__podrias_desarrollar_una_versi_n_m_s_minim.png-VS5zH9Fgn2OpmEmShEZsYbSy59sQX7.jpeg"

export function formatCOP(price: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price)
}