"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, MessageCircle } from "lucide-react"
import { contact, departamentos, whatsappDigits } from "@/lib/site-config"

const CONSENT_VERSION = "2026-11"

const necesidades = [
  "Cobros y mensualidades",
  "Asistencia y horarios",
  "Matrículas y renovaciones",
  "Evaluaciones y rutinas",
  "Eventos y competencias",
  "Inventario y uniformes",
  "Portal para familias",
]
const tamanos = ["Menos de 30", "30 a 75", "76 a 200", "201 a 500", "Más de 500"]
const hoy = ["Hojas de cálculo", "Cuaderno y WhatsApp", "Otro programa", "No llevo control"]
const fuentes = ["WhatsApp", "Instagram", "Facebook", "TikTok", "Un conocido", "Google", "Otro"]

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25"

type Form = {
  necesidades: string[]
  club: string
  tamano: string
  hoy: string
  nombre: string
  whatsapp: string
  email: string
  departamento: string
  ciudad: string
  fuente: string
  consent: boolean
  website: string // trampa para bots: una persona nunca lo llena
}

const empty: Form = {
  necesidades: [], club: "", tamano: "", hoy: "", nombre: "", whatsapp: "", email: "",
  departamento: "", ciudad: "", fuente: "", consent: false, website: "",
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^57(?=3\d{9}$)/, "")
  return /^3\d{9}$/.test(digits) ? `57${digits}` : null
}

function validate(step: number, f: Form): string {
  if (step === 2) {
    if (!f.club.trim()) return "Escribe el nombre de tu club."
    if (!f.tamano) return "Elige cuántos deportistas tiene tu club."
  }
  if (step === 3) {
    if (!f.nombre.trim()) return "Escribe tu nombre completo."
    if (!normalizePhone(f.whatsapp)) return "Escribe un celular colombiano de 10 dígitos que empiece por 3."
    if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) return "Revisa el correo: parece incompleto."
    if (!f.departamento) return "Elige tu departamento."
    if (!f.ciudad.trim()) return "Escribe tu ciudad o municipio."
    if (!f.consent) return "Para guardar tu pre-registro necesitas autorizar el tratamiento de tus datos."
  }
  return ""
}

async function send(f: Form): Promise<"sent" | "whatsapp"> {
  const lead = {
    ...f,
    whatsapp: normalizePhone(f.whatsapp),
    website: undefined,
    consentVersion: CONSENT_VERSION,
    createdAt: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.href : "",
  }
  if (contact.waitlistEndpoint) {
    const res = await fetch(contact.waitlistEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
    if (!res.ok) throw new Error("endpoint")
    return "sent"
  }
  if (whatsappDigits) {
    const text = `Hola, quiero pre-registrar mi club en CheerManager.\nClub: ${f.club}\nDeportistas: ${f.tamano}\nNombre: ${f.nombre}\nCiudad: ${f.ciudad}, ${f.departamento}`
    window.open(`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(text)}`, "_blank", "noopener")
    return "whatsapp"
  }
  throw new Error("sin-canal")
}

export function Preregistro() {
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<"fwd" | "back">("fwd")
  const [f, setF] = useState<Form>(empty)
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "whatsapp">("idle")
  const heading = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  // Al cambiar de paso, el foco va al título para que lectores de pantalla y teclado sigan el flujo.
  useEffect(() => {
    if (moved.current) heading.current?.focus({ preventScroll: true })
  }, [step, status])

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setF((prev) => ({ ...prev, [key]: value }))
    setError("")
  }

  function go(next: number) {
    moved.current = true
    setDir(next > step ? "fwd" : "back")
    setError("")
    setStep(next)
  }

  function advance() {
    const message = validate(step, f)
    if (message) return setError(message)
    go(step + 1)
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const message = validate(2, f) || validate(3, f)
    if (message) return setError(message)
    if (f.website) {
      moved.current = true
      return setStatus("sent")
    }
    setError("")
    setStatus("sending")
    try {
      const result = await send(f)
      moved.current = true
      setStatus(result)
    } catch (e) {
      setStatus("idle")
      setError(
        e instanceof Error && e.message === "sin-canal"
          ? "El pre-registro todavía no está conectado a un canal de recepción. Avísale al equipo de CheerManager."
          : "No pudimos enviar tu pre-registro. Inténtalo de nuevo en un momento.",
      )
    }
  }

  const waLink = whatsappDigits ? `https://wa.me/${whatsappDigits}` : null

  if (status === "sent" || status === "whatsapp") {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-center sm:p-10" aria-live="polite">
        <span className="pop mx-auto grid size-14 place-items-center rounded-full bg-success text-success-foreground">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path className="draw-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 ref={heading} tabIndex={-1} className="mt-6 text-2xl font-bold outline-none">
          {status === "sent" ? "¡Listo, ya estás en la lista!" : "Último paso: envía el mensaje"}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {status === "sent"
            ? "Te avisaremos por WhatsApp cuando abramos los primeros accesos."
            : "Abrimos WhatsApp con tus datos escritos. Pulsa enviar allí para quedar en la lista."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>Paso {step} de 3</span>
        <span>Menos de un minuto</span>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span key={n} className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${n <= step ? 1 : 0})` }}
            />
          </span>
        ))}
      </div>

      <div key={step} data-dir={dir} className="step-in mt-8">
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 ref={heading} tabIndex={-1} className="text-xl font-bold outline-none">Cuéntanos de tu club</h3>
              <p className="mt-1 text-sm text-muted-foreground">Así preparamos CheerManager para tu realidad.</p>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Nombre del club
              <input className={field} value={f.club} onChange={(e) => set("club", e.target.value)} autoComplete="organization" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              ¿Cuántos deportistas tiene?
              <select className={field} value={f.tamano} onChange={(e) => set("tamano", e.target.value)}>
                <option value="">Elige…</option>
                {tamanos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              <span>¿Cómo llevas el club hoy? <span className="font-normal text-muted-foreground">(opcional)</span></span>
              <select className={field} value={f.hoy} onChange={(e) => set("hoy", e.target.value)}>
                <option value="">Elige…</option>
                {hoy.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 ref={heading} tabIndex={-1} className="text-xl font-bold outline-none">¿Qué te gustaría resolver primero?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Elige todo lo que quieras. Puedes pasar al siguiente paso sin elegir nada.</p>
            </div>
            <fieldset>
              <legend className="sr-only">Necesidades del club</legend>
              <div className="flex flex-wrap gap-2">
                {necesidades.map((n) => {
                  const on = f.necesidades.includes(n)
                  return (
                    <label
                      key={n}
                      className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[.97] has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/30 ${
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={() => set("necesidades", on ? f.necesidades.filter((x) => x !== n) : [...f.necesidades, n])}
                      />
                      {n}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 ref={heading} tabIndex={-1} className="text-xl font-bold outline-none">¿Dónde te avisamos?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Te escribimos por WhatsApp cuando abramos los primeros accesos.</p>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Tu nombre completo
              <input className={field} value={f.nombre} onChange={(e) => set("nombre", e.target.value)} autoComplete="name" />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Celular (WhatsApp)
                <div className="flex">
                  <span className="grid place-items-center rounded-l-xl border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+57</span>
                  <input
                    className={`${field} rounded-l-none`}
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="3001234567"
                    value={f.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                  />
                </div>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                <span>Correo <span className="font-normal text-muted-foreground">(opcional)</span></span>
                <input className={field} type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Departamento
                <select className={field} value={f.departamento} onChange={(e) => set("departamento", e.target.value)}>
                  <option value="">Elige…</option>
                  {departamentos.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Ciudad o municipio
                <input className={field} value={f.ciudad} onChange={(e) => set("ciudad", e.target.value)} autoComplete="address-level2" />
              </label>
            </div>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              <span>¿Cómo te enteraste de CheerManager? <span className="font-normal text-muted-foreground">(opcional)</span></span>
              <select className={field} value={f.fuente} onChange={(e) => set("fuente", e.target.value)}>
                <option value="">Elige…</option>
                {fuentes.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              name="website"
              value={f.website}
              onChange={(e) => set("website", e.target.value)}
              className="absolute -left-[9999px] size-0 opacity-0"
            />
            <label className="flex items-start gap-3 text-xs leading-5 text-muted-foreground">
              <input type="checkbox" className="mt-0.5 size-4 shrink-0 accent-primary" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
              <span>
                Autorizo el tratamiento de mis datos personales para recibir el aviso del lanzamiento y novedades por WhatsApp, conforme a la Ley 1581 de 2012
                {contact.politica && (
                  <>
                    {" "}(<a href={contact.politica} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">política de datos</a>)
                  </>
                )}
                .
              </span>
            </label>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="rounded-full px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Atrás
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={advance}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[.97]"
          >
            Siguiente <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-[background-color,transform,opacity] duration-150 hover:bg-primary-hover active:scale-[.97] disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Separar mi lugar"} {status !== "sending" && <Check size={16} />}
          </button>
        )}
      </div>

      {waLink && (
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <MessageCircle size={14} /> ¿Prefieres hablar con alguien?{" "}
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
            Escríbenos por WhatsApp
          </a>
        </p>
      )}
    </form>
  )
}