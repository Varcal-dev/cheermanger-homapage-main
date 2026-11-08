import { formatCOP, plans } from "@/lib/site-config"

// Guion del recorrido de Isa. Cada texto describe algo que ya está en la página
// o en el sistema; si cambias una función, cambia aquí su frase.

export type GuideStep = {
  text: string
  /** Sección donde ocurre el paso (se usa si no existe `highlight`). */
  section: string
  /** Selector CSS del elemento que se resalta y al que se desplaza la página. */
  highlight: string
  /** Pestaña que debe abrirse antes de resaltar (la escuchan Roles y Showcase). */
  tab?: { group: "roles" | "producto"; id: string }
}

export const stepsById = {
  "rol-direccion": {
    section: "roles",
    highlight: "#rol-panel",
    tab: { group: "roles", id: "direccion" },
    text: "Si diriges el club, tienes paneles de control por área, temporadas, grupos, niveles y divisiones en un solo lugar. Y cada persona ve solo lo que le corresponde.",
  },
  "rol-tesoreria": {
    section: "roles",
    highlight: "#rol-panel",
    tab: { group: "roles", id: "tesoreria" },
    text: "En tesorería, las mensualidades se facturan con fecha de vencimiento y control de mora. Los pagos admiten abonos y el saldo siempre está calculado. Nada se borra: se anula con motivo.",
  },
  "rol-entrenadores": {
    section: "roles",
    highlight: "#rol-panel",
    tab: { group: "roles", id: "entrenadores" },
    text: "En el tapete: horarios por grupo, asistencia registrada en bloque, evaluaciones con historial y la rúbrica de puntaje FEDECOLCHEER / IASF.",
  },
  "rol-familias": {
    section: "roles",
    highlight: "#rol-panel",
    tab: { group: "roles", id: "familias" },
    text: "Las familias consultan los pagos, las evaluaciones y las rutinas de su deportista, descargan sus reportes y firman los consentimientos de datos.",
  },
  "prod-panel": {
    section: "producto",
    highlight: "#panel-producto",
    tab: { group: "producto", id: "panel" },
    text: "Así se ve el panel principal: deportistas, cartera, asistencia y la distribución del club. Son capturas del sistema con datos de muestra.",
  },
  "prod-matricula": {
    section: "producto",
    highlight: "#panel-producto",
    tab: { group: "producto", id: "matricula" },
    text: "Matricular toma cuatro pasos: plan de inscripción, mensualidad, convenio y grupo. Sin hojas de cálculo.",
  },
  "prod-asistencia": {
    section: "producto",
    highlight: "#panel-producto",
    tab: { group: "producto", id: "asistencia" },
    text: "Así se registra la asistencia de un entrenamiento: eliges el grupo y la fecha, y guardas toda la lista de una vez.",
  },
  "prod-consentimientos": {
    section: "producto",
    highlight: "#panel-producto",
    tab: { group: "producto", id: "consentimientos" },
    text: "Aquí viven los consentimientos de tratamiento de datos, datos de salud y uso de imagen, con fecha de vigencia y opción de revocar.",
  },
  planes: {
    section: "planes",
    highlight: '#planes [data-reveal="group"]',
    text: `Los planes dependen de los deportistas activos y empiezan en ${formatCOP(plans[0].price)} al mes. Mueve la calculadora de abajo para ver cuál te toca.`,
  },
  fundadores: {
    section: "fundadores",
    highlight: '#fundadores [data-reveal="group"]',
    text: "Los primeros clubes tienen precio de lanzamiento congelado por 12 meses y acompañamiento prioritario durante la incorporación.",
  },
  preregistro: {
    section: "preregistro",
    highlight: "#preregistro form",
    text: "Y listo: pre-regístrate en menos de un minuto. Te avisamos por WhatsApp cuando abramos los primeros accesos.",
  },
} satisfies Record<string, GuideStep>

export type StepId = keyof typeof stepsById

export const tours = {
  completo: ["rol-direccion", "rol-tesoreria", "rol-entrenadores", "rol-familias", "prod-panel", "planes", "fundadores", "preregistro"],
  direccion: ["rol-direccion", "prod-panel", "preregistro"],
  tesoreria: ["rol-tesoreria", "prod-matricula", "planes", "preregistro"],
  entrenadores: ["rol-entrenadores", "prod-asistencia", "preregistro"],
  familias: ["rol-familias", "prod-consentimientos", "preregistro"],
} satisfies Record<string, StepId[]>

export type TourKey = keyof typeof tours

export const roleChoices: { key: Exclude<TourKey, "completo">; label: string }[] = [
  { key: "direccion", label: "Dirección" },
  { key: "tesoreria", label: "Tesorería" },
  { key: "entrenadores", label: "Entrenadores" },
  { key: "familias", label: "Familias" },
]