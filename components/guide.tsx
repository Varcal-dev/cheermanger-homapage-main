"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, X } from "lucide-react"
import { usePrefersReducedMotion } from "@/components/motion"
import { roleChoices, stepsById, tours, type GuideStep, type TourKey } from "@/lib/guide-script"
import { whatsappDigits } from "@/lib/site-config"

const NUDGE_KEY = "cm-guide-nudge"

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[.97]"

/**
 * Recorrido guiado de Isa, la embajadora virtual. Es un guion (no un chat):
 * lleva a la persona por las secciones, abre las pestañas que toca mostrar y
 * resalta el bloque que explica. No hay IA detrás ni datos que se envíen.
 */
export function Guide() {
  const [open, setOpen] = useState(false)
  const [tour, setTour] = useState<TourKey | null>(null)
  const [n, setN] = useState(0)
  const [nudge, setNudge] = useState(false)
  const reduce = usePrefersReducedMotion()
  const launcher = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLParagraphElement>(null)

  const ids = tour ? tours[tour] : []
  const step: GuideStep | null = tour ? stepsById[ids[n]] : null
  const last = tour !== null && n === ids.length - 1

  // Invitación discreta: una sola vez por visita, solo si la persona sigue arriba.
  useEffect(() => {
    let hide: number | undefined
    const show = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(NUDGE_KEY) || window.scrollY > 1200) return
        sessionStorage.setItem(NUDGE_KEY, "1")
      } catch {
        return
      }
      setNudge(true)
      hide = window.setTimeout(() => setNudge(false), 9000)
    }, 9000)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [])

  // Cada paso: abre la pestaña que toca, resalta el bloque y desplaza la página.
  useEffect(() => {
    if (!open || !step) return
    if (step.tab) window.dispatchEvent(new CustomEvent("cm:tab", { detail: step.tab }))
    let cancelled = false
    let marked: Element | null = null
    const t = window.setTimeout(
      () => {
        if (cancelled) return
        const el = document.querySelector(step.highlight) ?? document.getElementById(step.section)
        if (!el) return
        el.classList.add("guide-focus")
        marked = el
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
      },
      step.tab ? 90 : 0,
    )
    return () => {
      cancelled = true
      window.clearTimeout(t)
      marked?.classList.remove("guide-focus")
    }
  }, [open, step, reduce])

  // Esc cierra el recorrido.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  function close() {
    setOpen(false)
    setTour(null)
    setN(0)
    launcher.current?.focus()
  }

  function toggle() {
    setNudge(false)
    if (open) return close()
    setOpen(true)
  }

  // Al abrir, el foco pasa al panel (ya montado) para lectores de pantalla y teclado.
  useEffect(() => {
    if (open) heading.current?.focus({ preventScroll: true })
  }, [open])

  function start(key: TourKey) {
    setTour(key)
    setN(0)
  }

  function back() {
    if (n === 0) {
      setTour(null)
      window.setTimeout(() => heading.current?.focus({ preventScroll: true }), 0)
    } else setN(n - 1)
  }

  function next() {
    if (!last) return setN(n + 1)
    close()
    window.setTimeout(() => document.querySelector<HTMLElement>("#preregistro form input")?.focus({ preventScroll: true }), 60)
  }

  return (
    <>
      {open && (
        <div
          id="guide-panel"
          role="dialog"
          aria-label="Recorrido guiado con Isa"
          className="panel-in fixed bottom-24 left-4 right-4 z-50 flex max-h-[72vh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/20 sm:right-auto sm:left-5 sm:w-[380px]"
        >
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Image src="/isa/avatar.webp" alt="" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-primary/30" />
            <div className="min-w-0 flex-1">
              <p ref={heading} tabIndex={-1} className="font-display text-base font-bold outline-none">Isa</p>
              <p className="text-xs text-muted-foreground">Embajadora virtual de CheerManager</p>
            </div>
            <button
              onClick={close}
              aria-label="Cerrar recorrido"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-150 hover:bg-muted hover:text-foreground active:scale-[.94]"
            >
              <X size={17} />
            </button>
          </div>

          <div className="overflow-y-auto p-4">
            {!tour || !step ? (
              <div className="panel-in">
                <div className="flex gap-3">
                  <Image
                    src="/isa/presenter.webp"
                    alt="Isa, la embajadora virtual, con la mano abierta dándote la bienvenida"
                    width={84}
                    height={112}
                    className="h-28 w-[84px] shrink-0 rounded-2xl object-cover"
                  />
                  <p className="rounded-2xl rounded-tl-sm bg-primary-soft p-3.5 text-sm leading-6">
                    ¡Hola! Soy Isa, la embajadora virtual de CheerManager. Te muestro el sistema en un minuto. ¿Cómo quieres verlo?
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <button onClick={() => start("completo")} className={primaryBtn}>
                    Recorrido completo · 1 min <ArrowRight size={16} />
                  </button>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-muted-foreground">O solo lo de tu rol</p>
                    <div className="flex flex-wrap gap-2">
                      {roleChoices.map((r) => (
                        <button
                          key={r.key}
                          onClick={() => start(r.key)}
                          className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-semibold transition-[border-color,color,transform] duration-150 hover:border-primary/50 hover:text-brand active:scale-[.97]"
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  Es un recorrido con guion, no un chat.
                  {whatsappDigits && (
                    <>
                      {" "}¿Prefieres hablar con una persona?{" "}
                      <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
                        Escríbenos por WhatsApp
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-xs font-semibold text-muted-foreground">
                  Paso {n + 1} de {ids.length}
                </p>
                <div className="h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
                  <span
                    className="block h-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out"
                    style={{ transform: `scaleX(${(n + 1) / ids.length})` }}
                  />
                </div>
                <div aria-live="polite" className="mt-4">
                  <p key={`${tour}-${n}`} className="panel-in rounded-2xl rounded-tl-sm bg-primary-soft p-3.5 text-sm leading-6">
                    {step.text}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={back}
                    className="rounded-full px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    {n === 0 ? "Cambiar recorrido" : "Atrás"}
                  </button>
                  <button onClick={next} className={primaryBtn}>
                    {last ? "Pre-registrarme" : "Siguiente"} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed bottom-5 left-5 z-50">
        {nudge && !open && (
          <div className="chip-in absolute bottom-full left-0 mb-3 w-60 rounded-2xl rounded-bl-sm border border-border bg-card p-3.5 pr-9 text-sm font-medium shadow-xl">
            ¿Te muestro CheerManager en 1 minuto?
            <button
              onClick={() => setNudge(false)}
              aria-label="Cerrar sugerencia"
              className="absolute right-2 top-2 grid size-6 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <button
          ref={launcher}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="guide-panel"
          aria-label={open ? "Cerrar recorrido guiado" : "Abrir recorrido guiado con Isa, embajadora virtual"}
          className="flex items-center gap-3 rounded-full border border-border bg-card p-1 shadow-xl transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 active:scale-[.97] sm:pr-5"
        >
          <Image src="/isa/avatar.webp" alt="" width={52} height={52} className="size-[52px] rounded-full object-cover ring-2 ring-primary" />
          <span className="hidden text-left sm:block" aria-hidden>
            <span className="block text-sm font-bold leading-4">Recorrido con Isa</span>
            <span className="block text-[11px] text-muted-foreground">Embajadora virtual</span>
          </span>
        </button>
      </div>
    </>
  )
}