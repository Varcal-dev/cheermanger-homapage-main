"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target) } }), { threshold: 0.12 })
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

function Frame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#16151a] shadow-2xl shadow-[#8f0038]/25">
    <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3"><span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" /></div>
    <Image src={src} alt={alt} width={1600} height={742} priority={priority} className="h-auto w-full" />
  </div>
}

export function HeroShot() {
  return <div className="float relative mx-auto w-full max-w-[640px]"><Frame src="/screens/dashboard.webp" alt="Panel principal de CheerManager con deportistas, cartera y asistencia" priority /></div>
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
  const t = tabs[i]
  return <section id="producto" className="bg-[#19171c] py-24 text-white"><div className="mx-auto max-w-7xl px-5 sm:px-8">
    <div data-reveal className="mx-auto max-w-2xl text-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#f2b7ca]">El producto</p><h2 className="text-balance text-3xl font-black tracking-[-0.05em] sm:text-5xl">Así se ve CheerManager por dentro.</h2></div>
    <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-2">{tabs.map((x, n) => <button key={x.id} role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${n === i ? "bg-white text-[#8f0038]" : "bg-white/10 text-white/70 hover:bg-white/15"}`}>{x.label}</button>)}</div>
    <div data-reveal className="mx-auto mt-10 max-w-5xl"><div key={t.id} className="shot-in"><Frame src={t.src} alt={t.title} /></div><div className="mt-7 text-center"><h3 className="text-xl font-black">{t.title}</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/60">{t.copy}</p></div></div>
  </div></section>
}
