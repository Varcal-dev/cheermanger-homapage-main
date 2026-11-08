"use client"

import { Fragment, useEffect, useRef, useState } from "react"

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduce(m.matches)
    update()
    m.addEventListener("change", update)
    return () => m.removeEventListener("change", update)
  }, [])
  return reduce
}

/** Marca con `is-in` los elementos [data-reveal] cuando entran en pantalla. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

/** Titular que entra palabra por palabra. Es la única secuencia de carga de la página. */
export function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className="word" style={{ "--i": i } as React.CSSProperties}>
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </>
  )
}

/** Cifra que sube hasta su valor la primera vez que se ve. */
export function CountUp({ to, duration = 1100 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reduce) {
      setValue(to)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const step = (t: number) => {
          const p = Math.min((t - t0) / duration, 1)
          setValue(Math.round(to * (1 - Math.pow(1 - p, 4))))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}

function Cell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl bg-muted px-2 py-3">
      <span key={value} className="tick font-display text-2xl font-bold tabular-nums sm:text-3xl">
        {value}
      </span>
      <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}

/** Cuenta regresiva a la apertura. Antes de montar muestra guiones para no desajustar el HTML del servidor. */
export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (now === null) {
    return (
      <div className="flex gap-2" aria-hidden>
        {["días", "horas", "min", "seg"].map((l) => (
          <Cell key={l} value="--" label={l} />
        ))}
      </div>
    )
  }

  const diff = Math.max(0, new Date(target).getTime() - now)
  if (diff === 0) return <p className="font-display text-lg font-bold">Ya estamos abriendo los primeros accesos.</p>

  const s = Math.floor(diff / 1000)
  const pad = (n: number) => String(n).padStart(2, "0")
  const days = Math.floor(s / 86400)
  return (
    <div role="timer" aria-live="off" aria-label={`Faltan ${days} días para la apertura`} className="flex gap-2">
      <Cell value={pad(days)} label="días" />
      <Cell value={pad(Math.floor((s % 86400) / 3600))} label="horas" />
      <Cell value={pad(Math.floor((s % 3600) / 60))} label="min" />
      <Cell value={pad(s % 60)} label="seg" />
    </div>
  )
}