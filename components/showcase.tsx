"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CircleDollarSign, ClipboardCheck } from "lucide-react"

function Frame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl shadow-primary/25">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
      </div>
      <Image src={src} alt={alt} width={1600} height={742} priority={priority} className="h-auto w-full" />
    </div>
  )
}

/** Captura real del panel con dos avisos ilustrativos que aparecen una sola vez, en orden, al cargar. */
export function HeroShot() {
  return (
    <div className="hero-rise relative mx-auto w-full max-w-[640px]" style={{ "--d": "250ms" } as React.CSSProperties}>
      <Frame src="/screens/dashboard.webp" alt="Panel principal de CheerManager con deportistas, cartera y asistencia" priority />

      <div
        aria-hidden
        className="chip-in absolute -left-3 bottom-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl sm:-left-10"
        style={{ "--d": "900ms" } as React.CSSProperties}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-brand">
          <CircleDollarSign size={18} />
        </span>
        <div>
          <p className="text-[11px] text-muted-foreground">Pago registrado</p>
          <p className="text-sm font-bold">Mensualidad del mes</p>
        </div>
      </div>

      <div
        aria-hidden
        className="chip-in absolute -right-2 top-14 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl sm:flex lg:-right-6"
        style={{ "--d": "1150ms" } as React.CSSProperties}
      >
        <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-brand">
          <ClipboardCheck size={18} />
        </span>
        <div>
          <p className="text-[11px] text-muted-foreground">Asistencia guardada</p>
          <p className="text-sm font-bold">14 de 16 presentes</p>
        </div>
      </div>
    </div>
  )
}

const tabs = [
  { id: "panel", label: "Panel", src: "/screens/dashboard.webp", title: "Todo el club en una sola vista", copy: "Deportistas, cartera, asistencia y distribución por estado, género y división, actualizados al instante." },
  { id: "matricula", label: "Matrícula guiada", src: "/screens/matricula.webp", title: "Matricula en cuatro pasos", copy: "Plan de inscripción, mensualidad, convenio y grupo en un flujo claro, sin hojas de cálculo." },
  { id: "horarios", label: "Horarios", src: "/screens/horarios.webp", title: "Calendario de entrenamientos", copy: "Cada grupo con su color y su horario semanal. Registra la asistencia desde la misma sección." },
  { id: "asistencia", label: "Asistencia", src: "/screens/asistencia.webp", title: "Asistencia por grupo y fecha", copy: "Registra la lista de un entrenamiento en bloque y consulta lo guardado cuando lo necesites." },
  { id: "consentimientos", label: "Consentimientos", src: "/screens/consentimientos.webp", title: "Acudientes y consentimientos Ley 1581", copy: "Tratamiento de datos, datos de salud y uso de imagen, con fecha de vigencia y opción de revocar." },
  { id: "eventos", label: "Eventos", src: "/screens/eventos.webp", title: "Competencias bajo control", copy: "Inscribe grupos, registra resultados y premios, y gestiona el cobro de cada evento." },
]

export function Showcase() {
  const [i, setI] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const t = tabs[i]

  // El recorrido de Isa abre la pestaña que toca mostrar.
  useEffect(() => {
    const onTab = (e: Event) => {
      const d = (e as CustomEvent<{ group: string; id: string }>).detail
      if (d?.group !== "producto") return
      const idx = tabs.findIndex((x) => x.id === d.id)
      if (idx >= 0) setI(idx)
    }
    window.addEventListener("cm:tab", onTab)
    return () => window.removeEventListener("cm:tab", onTab)
  }, [])

  function onKey(event: React.KeyboardEvent, n: number) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (n + step + tabs.length) % tabs.length
    setI(next)
    refs.current[next]?.focus()
  }

  return (
    <section id="producto" className="bg-ink py-24 text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">Así se ve CheerManager por dentro.</h2>
          <p className="mt-4 text-base leading-7 text-white/60">Capturas del sistema con datos de muestra.</p>
        </div>

        <div role="tablist" aria-label="Pantallas del sistema" className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((x, n) => (
            <button
              key={x.id}
              ref={(el) => {
                refs.current[n] = el
              }}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={n === i}
              aria-controls="panel-producto"
              tabIndex={n === i ? 0 : -1}
              onClick={() => setI(n)}
              onKeyDown={(e) => onKey(e, n)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,transform] duration-150 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow ${
                n === i ? "bg-white text-primary" : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div id="panel-producto" role="tabpanel" aria-labelledby={`tab-${t.id}`} className="mx-auto mt-10 max-w-5xl">
          <div key={t.id} className="panel-in">
            <Frame src={t.src} alt={t.title} />
            <div className="mt-7 text-center">
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/60">{t.copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}