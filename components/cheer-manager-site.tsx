"use client"

import { useEffect, useId, useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowRight, BarChart3, CalendarDays, Check, ChevronDown, ClipboardCheck, Dumbbell, Layers3, Menu, MessageCircle,
  Moon, Package, Sparkles, Sun, Target, TrendingUp, Users, WalletCards, X,
} from "lucide-react"
import { Countdown, CountUp, RevealObserver, SplitWords } from "@/components/motion"
import { Guide } from "@/components/guide"
import { Preregistro } from "@/components/preregistro"
import { HeroShot, Showcase } from "@/components/showcase"
import { areas, contact, faq, formatCOP, formatLaunch, launchIso, modules, plans, whatsappDigits } from "@/lib/site-config"

const icons = [Users, Dumbbell, Layers3, CalendarDays, ClipboardCheck, WalletCards, Target, TrendingUp, Package, BarChart3]

const nav = [
  ["#funcionalidades", "Funcionalidades"],
  ["#roles", "Para quién"],
  ["#planes", "Planes"],
  ["#fundadores", "Clubes fundadores"],
  ["#faq", "FAQ"],
] as const

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="CheerManager, inicio">
      <span className="relative grid size-10 place-items-center rounded-xl bg-primary shadow-lg shadow-primary/25">
        <span className="font-display text-xl font-black italic text-primary-foreground">C</span>
        <span className="absolute bottom-1 right-1 size-2 rounded-full bg-glow" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Cheer<span className="text-brand">Manager</span>
      </span>
    </a>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), [])
  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("cm-theme", next ? "dark" : "light")
    } catch {}
    setDark(next)
  }
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
      className="grid size-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-[color,transform] duration-150 hover:text-foreground active:scale-[.94]"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

function LinkButton({ children, href = "#preregistro", outline = false, light = false }: { children: React.ReactNode; href?: string; outline?: boolean; light?: boolean }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-[background-color,border-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 active:scale-[.97]"
  const tone = light
    ? "bg-white text-primary hover:bg-primary-soft"
    : outline
      ? "border border-border bg-card text-foreground hover:border-primary/50"
      : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-hover"
  return (
    <a href={href} className={`${base} ${tone}`}>
      {children}
      <ArrowRight size={16} />
    </a>
  )
}

function SectionTitle({ title, copy }: { title: string; copy?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-muted-foreground">{copy}</p>}
    </div>
  )
}

/* ---------- Para quién (pestañas por rol) ---------- */
function Roles() {
  const [i, setI] = useState(0)
  const a = areas[i]

  // El recorrido de Isa abre el rol que toca mostrar.
  useEffect(() => {
    const onTab = (e: Event) => {
      const d = (e as CustomEvent<{ group: string; id: string }>).detail
      if (d?.group !== "roles") return
      const idx = areas.findIndex((x) => x.id === d.id)
      if (idx >= 0) setI(idx)
    }
    window.addEventListener("cm:tab", onTab)
    return () => window.removeEventListener("cm:tab", onTab)
  }, [])

  return (
    <section id="roles" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionTitle title="Cada persona del club ve lo suyo." copy="CheerManager se adapta al trabajo de cada rol. Elige uno y mira qué trae." />
      <div role="tablist" aria-label="Roles del club" className="mt-10 flex flex-wrap justify-center gap-2">
        {areas.map((x, n) => (
          <button
            key={x.id}
            role="tab"
            id={`rol-${x.id}`}
            aria-selected={n === i}
            aria-controls="rol-panel"
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            onKeyDown={(e) => {
              const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
              if (!step) return
              e.preventDefault()
              const next = (n + step + areas.length) % areas.length
              setI(next)
              document.getElementById(`rol-${areas[next].id}`)?.focus()
            }}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:scale-[.97] ${
              n === i ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div id="rol-panel" role="tabpanel" aria-labelledby={`rol-${a.id}`} className="mt-12">
        <div key={a.id} className="panel-in grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{a.title}</h3>
            <p className="mt-3 max-w-md leading-7 text-muted-foreground">{a.copy}</p>
            <ul className="mt-7 flex flex-col gap-3">
              {a.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-medium leading-6">
                  <Check size={17} className="mt-1 shrink-0 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LinkButton>Pre-registrarme</LinkButton>
            </div>
          </div>

          <div className="rounded-3xl bg-primary-soft p-5 sm:p-8">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{a.card.title}</p>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-brand">Ilustrativo</span>
              </div>
              <dl className="mt-4 divide-y divide-border">
                {a.card.rows.map(([label, value], n) => (
                  <div key={label} className="row-in flex items-center justify-between gap-4 py-3.5" style={{ "--i": n } as React.CSSProperties}>
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="font-display text-base font-bold tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Calculadora de plan ---------- */
function PricingCalculator() {
  const [athletes, setAthletes] = useState(150)
  const plan = useMemo(() => (athletes <= 75 ? plans[0] : athletes <= 200 ? plans[1] : athletes <= 500 ? plans[2] : plans[3]), [athletes])
  const id = useId()
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <h3 className="text-2xl font-bold tracking-tight">¿Cuántos deportistas tiene tu club?</h3>
      <div className="mt-8 flex items-end justify-between">
        <label htmlFor={id} className="text-sm text-muted-foreground">Deportistas activos</label>
        <output htmlFor={id} className="font-display text-3xl font-bold tabular-nums text-brand">{athletes > 500 ? "500+" : athletes}</output>
      </div>
      <input id={id} type="range" min="1" max="501" value={athletes} onChange={(e) => setAthletes(Number(e.target.value))} className="mt-4 h-2 w-full accent-primary" />
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground" aria-hidden>
        <span>1</span><span>75</span><span>200</span><span>500+</span>
      </div>
      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-ink p-5 text-ink-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-white/60">Tu plan recomendado</p>
          <p key={plan.name} className="tick mt-1 font-display text-2xl font-bold">{plan.name}</p>
          <p className="mt-1 text-sm text-white/65">{plan.description}</p>
        </div>
        <div className="sm:text-right">
          {plan.price ? (
            <>
              <p key={plan.price} className="tick font-display text-2xl font-bold">
                {formatCOP(plan.price)} <span className="text-xs font-normal text-white/60">/ mes</span>
              </p>
              <p className="mt-1 text-xs text-white/60">Hasta {plan.limit} deportistas</p>
            </>
          ) : (
            <p className="text-sm font-bold text-glow">Te preparamos una propuesta a tu medida</p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- FAQ ---------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card px-6">
      {faq.map(([q, a], n) => {
        const isOpen = open === n
        return (
          <div key={q}>
            <h3>
              <button
                id={`${base}-q${n}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${n}`}
                onClick={() => setOpen(isOpen ? null : n)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold"
              >
                {q}
                <ChevronDown size={18} className={`shrink-0 text-brand transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={`${base}-a${n}`} role="region" aria-labelledby={`${base}-q${n}`} data-open={isOpen} inert={!isOpen} className="acc">
              <div>
                <p className="max-w-2xl pb-5 text-sm leading-6 text-muted-foreground">{a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Todas salen del contenido de esta misma página.
const stats = [
  [10, "módulos incluidos en todos los planes"],
  [30, "días de prueba gratuita, sin tarjeta"],
  [4, "planes según el tamaño de tu club"],
] as const

export default function CheerManagerSite() {
  const [menu, setMenu] = useState(false)
  const social = [
    ["Instagram", contact.instagram],
    ["Facebook", contact.facebook],
    ["TikTok", contact.tiktok],
  ].filter((s): s is [string, string] => Boolean(s[1]))

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <RevealObserver />
      <Guide />

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground lg:flex" aria-label="Principal">
            {nav.map(([href, label]) => (
              <a key={href} href={href} className="transition-colors duration-150 hover:text-foreground">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#preregistro" className="hidden rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[.97] sm:inline-flex">
              Pre-regístrate
            </a>
            <button className="grid size-9 place-items-center rounded-full border border-border lg:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? "Cerrar menú" : "Abrir menú"}>
              {menu ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="panel-in flex flex-col gap-4 border-t border-border px-5 py-5 text-sm font-semibold lg:hidden" aria-label="Móvil">
            {nav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>
            ))}
            <a href="#preregistro" onClick={() => setMenu(false)} className="text-brand">Pre-regístrate gratis</a>
          </nav>
        )}
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section id="inicio" className="hero-glow relative isolate overflow-hidden">
          <Image
            src="/fotos/hero.webp"
            alt=""
            width={1600}
            height={1067}
            priority
            className="hero-photo pointer-events-none absolute right-0 top-0 -z-10 h-full w-full select-none object-cover object-[68%_55%] opacity-[.22] dark:opacity-[.32] lg:w-[62%]"
          />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
            <div>
              <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-brand">
                <span className="pulse-dot" aria-hidden /> Pre-lanzamiento · clubes fundadores
              </p>
              <h1 className="mt-6 max-w-2xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-[4rem]">
                <SplitWords text="Lleva la gestión de tu club al siguiente nivel." />
              </h1>
              <p className="hero-rise mt-7 max-w-lg text-lg leading-8 text-muted-foreground" style={{ "--d": "450ms" } as React.CSSProperties}>
                Administra tu club de cheerleading desde un solo lugar: deportistas, entrenamientos, cobros, eventos y evaluaciones.
              </p>

              {launchIso && (
                <div className="hero-rise mt-8 max-w-md" style={{ "--d": "600ms" } as React.CSSProperties}>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">Abrimos el {formatLaunch(launchIso)}</p>
                  <Countdown target={launchIso} />
                </div>
              )}

              <div className="hero-rise mt-9 flex flex-wrap gap-3" style={{ "--d": "750ms" } as React.CSSProperties}>
                <LinkButton>Quiero ser de los primeros</LinkButton>
                <LinkButton outline href="#roles">Ver lo que trae</LinkButton>
              </div>
            </div>
            <HeroShot />
          </div>
        </section>

        {/* ---------- Cinta de módulos ---------- */}
        <section aria-label="Módulos de la plataforma" className="border-y border-border bg-muted/50 py-5">
          <div className="marquee">
            <div className="marquee-track">
              {[false, true].map((hidden) => (
                <ul key={String(hidden)} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
                  {modules.map(([title], n) => {
                    const Icon = icons[n]
                    return (
                      <li key={title} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground">
                        <Icon size={15} className="text-brand" />
                        {title}
                      </li>
                    )
                  })}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <Roles />

        {/* ---------- Módulos ---------- */}
        <section id="funcionalidades" className="border-y border-border bg-muted/40 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle title="Todo lo que necesitas para tener el control." copy="Diez módulos conectados para que la gestión de tu club deje de depender de piezas sueltas." />
            <div data-reveal="group" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {modules.map(([title, copy], n) => {
                const Icon = icons[n]
                return (
                  <div key={title} className="group rounded-2xl border border-border bg-card p-5 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                    <span className="grid size-10 place-items-center rounded-xl bg-muted text-brand transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={18} />
                    </span>
                    <h3 className="mt-5 text-sm font-bold leading-5">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{copy}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <Showcase />

        {/* ---------- Cifras ---------- */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" aria-label="CheerManager en cifras">
          <dl className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {stats.map(([n, label]) => (
              <div key={label} className="text-center">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="font-display text-6xl font-bold tracking-tight text-brand">
                    <CountUp to={n} />
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground" aria-hidden>{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Cómo funciona ---------- */}
        <section id="como-funciona" className="border-y border-border bg-muted/40 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle title="Pre-regístrate hoy, empieza primero." />
            <ol data-reveal="group" className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                ["Pre-regístrate", "Cuéntanos de tu club en menos de un minuto. Es gratis y no te compromete a nada."],
                ["Te avisamos", "El día que abramos los primeros accesos te escribimos por WhatsApp antes que a nadie."],
                ["Empiezas a ordenar", "Registras tu club, cargas a tus deportistas y pruebas la plataforma 30 días, sin tarjeta."],
              ].map(([title, copy], n) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-6">
                  <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{n + 1}</span>
                  <h3 className="mt-6 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Clubes fundadores ---------- */}
        <section id="fundadores" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-12">
            <Image src="/fotos/fundadores.webp" alt="" width={1400} height={1414} className="pointer-events-none absolute inset-0 -z-20 h-full w-full select-none object-cover object-[50%_30%] opacity-45 mix-blend-luminosity" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/85 to-primary/60" />
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
              <div>
                <h2 className="max-w-xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">Sé uno de los primeros clubes en transformar su gestión.</h2>
                <p className="mt-5 max-w-xl leading-7 text-white/75">
                  CheerManager está próximo a lanzarse y queremos que los primeros clubes hagan parte de esta nueva etapa.
                </p>
                <div className="mt-8">
                  <LinkButton light>Quiero ser de los primeros</LinkButton>
                </div>
              </div>
              <div>
                <ul data-reveal="group" className="grid gap-3">
                  {[
                    "Precio de lanzamiento congelado durante 12 meses",
                    "Reconocimiento como Club Fundador",
                    "Acompañamiento prioritario durante la incorporación",
                    "Acceso a los módulos del plan contratado",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-semibold">
                      <Check className="mt-0.5 shrink-0 text-glow" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-5 text-white/55">Prueba gratuita de 30 días. No se requiere tarjeta de crédito.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Planes ---------- */}
        <section id="planes" className="border-y border-border bg-muted/40 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle title="Un plan para cada etapa de crecimiento." copy="Todos los planes incluyen acceso a los diez módulos. El precio depende de la cantidad de deportistas activos." />
            <div data-reveal="group" className="mt-14 grid gap-4 lg:grid-cols-4">
              {plans.map((plan) => (
                <div key={plan.name} className={`relative rounded-3xl border bg-card p-6 ${plan.name === "PRO" ? "border-primary shadow-xl shadow-primary/10" : "border-border"}`}>
                  {plan.name === "PRO" && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">Más elegido</span>}
                  <h3 className="mt-5 text-xl font-bold">{plan.name}</h3>
                  <p className="mt-2 min-h-10 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6">
                    {plan.price ? (
                      <>
                        <span className="font-display text-2xl font-bold">{formatCOP(plan.price)}</span>
                        <span className="text-xs text-muted-foreground"> / mes</span>
                      </>
                    ) : (
                      <span className="font-display text-2xl font-bold">A tu medida</span>
                    )}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-brand">{plan.name === "ENTERPRISE" ? "Desde 501 deportistas" : `Hasta ${plan.limit} deportistas activos`}</p>
                  <a href="#preregistro" className="mt-7 block rounded-full border border-border py-3 text-center text-sm font-bold transition-[border-color,color,transform] duration-150 hover:border-primary hover:text-brand active:scale-[.97]">
                    {plan.name === "ENTERPRISE" ? "Contactar" : "Me interesa"}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <PricingCalculator />
            </div>
          </div>
        </section>

        {/* ---------- Pre-registro ---------- */}
        <section id="preregistro" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Separa el lugar de tu club.</h2>
              <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                Menos de un minuto. Te avisamos por WhatsApp cuando abramos los primeros accesos.
              </p>
              <ul className="mt-8 flex flex-col gap-3 text-sm font-semibold">
                {["Sin costo y sin compromiso", "Prueba gratuita de 30 días, sin tarjeta", "Tus datos protegidos (Ley 1581 de 2012)"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <Check size={16} className="shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Preregistro />
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="border-t border-border bg-muted/40 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionTitle title="Lo que quieres saber antes de empezar." />
            <FAQ />
          </div>
        </section>

        {/* ---------- Cierre ---------- */}
        <section className="relative isolate overflow-hidden bg-primary py-24 text-primary-foreground">
          <Image src="/fotos/cierre.webp" alt="" width={1160} height={844} className="pointer-events-none absolute inset-0 -z-20 h-full w-full select-none object-cover object-center opacity-[.18] mix-blend-luminosity" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-primary/75" />
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Sparkles className="mx-auto text-glow" size={26} />
            <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">Tu club merece una gestión a la altura de su talento.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">Pre-regístrate gratis y sé de los primeros en administrar tu club con CheerManager.</p>
            <div className="mt-8 flex justify-center">
              <LinkButton light>Separar mi lugar</LinkButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">La plataforma para administrar clubes de cheerleading con más claridad, control y tiempo.</p>
          </div>
          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-3">
              <p className="font-bold">Explora</p>
              <a className="text-muted-foreground hover:text-foreground" href="#funcionalidades">Funcionalidades</a>
              <a className="text-muted-foreground hover:text-foreground" href="#planes">Planes</a>
              <a className="text-muted-foreground hover:text-foreground" href="#faq">FAQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">Legal</p>
              {contact.politica ? (
                <a className="text-muted-foreground hover:text-foreground" href={contact.politica} target="_blank" rel="noopener noreferrer">Privacidad</a>
              ) : (
                <span className="text-muted-foreground">Privacidad</span>
              )}
              {contact.terminos ? (
                <a className="text-muted-foreground hover:text-foreground" href={contact.terminos} target="_blank" rel="noopener noreferrer">Términos y condiciones</a>
              ) : (
                <span className="text-muted-foreground">Términos y condiciones</span>
              )}
            </div>
            {(social.length > 0 || contact.email) && (
              <div className="flex flex-col gap-3">
                <p className="font-bold">Contacto</p>
                {contact.email && <a className="text-muted-foreground hover:text-foreground" href={`mailto:${contact.email}`}>{contact.email}</a>}
                {social.map(([name, url]) => (
                  <a key={name} className="text-muted-foreground hover:text-foreground" href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-border px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
          <span>© 2026 CheerManager. Todos los derechos reservados.</span>
          <span>Hecho para clubes que quieren crecer.</span>
        </div>
      </footer>

      {whatsappDigits && (
        <a
          href={`https://wa.me/${whatsappDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-[background-color,transform] duration-150 hover:bg-primary-hover active:scale-[.94]"
        >
          <MessageCircle size={22} />
        </a>
      )}
    </div>
  )
}