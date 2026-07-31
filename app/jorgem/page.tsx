"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  ClipboardList,
  Clock,
  Dumbbell,
  Flame,
  HeartPulse,
  Info,
  Moon,
  Printer,
  RotateCcw,
  ShieldAlert,
  TrendingUp,
  User,
  Wind,
} from "lucide-react";

const colors = {
  navy: "#152A47", blue: "#2C6DA6", blueSoft: "#EAF2FA", white: "#FFFFFF",
  text: "#5B6472", border: "#D7E0EA", success: "#237A5C", successBg: "#E7F5EF",
  warning: "#B4740E", warningBg: "#FCF1DE", danger: "#B3382C", dangerBg: "#FBEAE8",
};

const days = [
  { key: "d1", label: "Día 1", title: "Tren superior A", subtitle: "Pecho, espalda y core", cardio: "25-30 min · Caminadora con ligera inclinación.", exercises: [["Press de pecho con mancuernas, plano", "3-4 × 10-12", "75 s"], ["Remo sentado, agarre neutro", "3-4 × 10-12", "75 s"], ["Aperturas en máquina / pec deck", "3 × 12-15", "Biserie A"], ["Jalón al pecho, agarre neutro", "3 × 10-12", "45-60 s"], ["Elevaciones laterales", "3 × 12-15", "Biserie B"], ["Face pulls", "3 × 12-15", "45 s"], ["Crunch", "3 × 15", "30-45 s"], ["Plancha inclinada", "3 × 20-30 s", "30-45 s"]] },
  { key: "d2", label: "Día 2", title: "Piernas y core", subtitle: "Fuerza de tren inferior", cardio: "25-30 min · Escaladora o caminadora moderada.", exercises: [["Prensa de piernas", "4 × 10-12", "75-90 s"], ["Sentadilla a caja / goblet squat", "3 × 10-12", "75 s"], ["Curl femoral", "3 × 12-15", "Biserie A"], ["Hip thrust o empuje de cadera", "3 × 10-12", "45-60 s"], ["Step-ups / escalones", "3 × 10 por pierna", "Biserie B"], ["Elevación de talones / gemelos", "3 × 15", "45-60 s"], ["Dead bug", "3 × 10 por lado", "30-45 s"], ["Crunch", "3 × 15", "30-45 s"]] },
  { key: "d3", label: "Día 3", title: "Tren superior B", subtitle: "Espalda, bíceps y core", cardio: "25-35 min · Caminadora o escaladora moderada.", exercises: [["Remo pecho apoyado / máquina", "4 × 10-12", "75 s"], ["Jalón al pecho, agarre neutro", "4 × 10-12", "75 s"], ["Remo unilateral en polea", "3 × 12 por lado", "Biserie A"], ["Pájaros / reverse fly", "3 × 12-15", "45-60 s"], ["Curl martillo", "3 × 10-12", "Opcional"], ["Curl con cuerda en polea", "3 × 12", "Opcional"], ["Plancha lateral con rodillas flexionadas", "3 × 20 s por lado", "30-45 s"], ["Crunch o máquina abdominal", "3 × 15", "30-45 s"]] },
  { key: "d4", label: "Día 4", title: "Tren superior C", subtitle: "Pecho, hombro seguro y estabilidad", cardio: "25-30 min · Caminadora con ligera inclinación.", exercises: [["Press inclinado en máquina o mancuernas", "4 × 10-12", "75 s"], ["Remo sentado, agarre neutro", "3 × 10-12", "75 s"], ["Press de pecho en máquina convergente", "3 × 12", "Biserie A"], ["Reverse fly", "3 × 12-15", "45-60 s"], ["Elevaciones laterales", "3 × 12-15", "Biserie B"], ["Rotación externa en polea o banda", "3 × 15", "45 s"], ["Curl de bíceps en máquina ligera", "2-3 × 12", "Opcional"], ["Bird-dog", "3 × 10 por lado", "30-45 s"]] },
  { key: "d5", label: "Día 5", title: "Circuito metabólico", subtitle: "Tren superior y gasto calórico", cardio: "30-35 min · Alterna 2 min vivos con 1 min suave.", exercises: [["Press de pecho en máquina", "3 × 12", "Biserie A"], ["Jalón al pecho, agarre neutro", "3 × 12", "45-60 s"], ["Remo sentado", "3 × 12", "Biserie B"], ["Sentadilla a caja / goblet squat", "3 × 12", "45-60 s"], ["Elevaciones laterales", "3 × 15", "Biserie C"], ["Curl martillo ligero", "3 × 12", "Opcional"], ["Crunch", "3 × 15", "30-45 s"], ["Plancha inclinada", "3 × 20-30 s", "30-45 s"]] },
];

const progression = [
  ["Semanas 1-2", "Adaptación", "2-3 series de trabajo. RPE 6-7. Aprende los movimientos y detecta cargas sin dolor.", 35],
  ["Semanas 3-4", "Progresión", "Sube la carga un 2.5-5% solo con técnica limpia y sin más dolor.", 55],
  ["Semanas 5-6", "Consolidación", "Usa el número completo de series y deja 1-3 repeticiones en reserva.", 80],
  ["Semana 7", "Descarga", "Reduce el volumen total un 25-30%.", 40],
  ["Semana 8", "Cierre", "Registra pesos, repeticiones y sensaciones finales.", 75],
];

const exerciseSheets: Record<string, { src: string; aspectRatio: string }> = {
  d1: { src: "/images/jorgem/day-1-exercises.png", aspectRatio: "1 / 1" },
  d2: { src: "/images/jorgem/day-2-exercises.png", aspectRatio: "0.95 / 1" },
  d3: { src: "/images/jorgem/day-3-exercises.png", aspectRatio: "1 / 1" },
  d4: { src: "/images/jorgem/day-4-exercises.png", aspectRatio: "4 / 3" },
  d5: { src: "/images/jorgem/day-5-exercises.png", aspectRatio: "4 / 3" },
};

const safety = [
  "No aguantes la respiración durante el esfuerzo.",
  "No entrenes hasta el fallo muscular.",
  "Detente ante dolor en el pecho, mareo, falta de aire inusual o dolor agudo.",
  "Mantén la molestia del codo entre 0 y 3 sobre 10.",
  "Evita press militar, fondos y extensiones directas de tríceps.",
  "Sigue las recomendaciones de tu médico sobre hipertensión y ejercicio.",
];

type Tab = "summary" | "progress" | "safety" | (typeof days)[number]["key"];

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <section style={{ background: colors.white, border: `1px solid ${colors.border}`, borderRadius: 18, padding: 20, ...style }}>{children}</section>;
}

function Pill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "warning" | "success" }) {
  const styles = tone === "warning" ? { background: colors.warningBg, color: colors.warning } : tone === "success" ? { background: colors.successBg, color: colors.success } : { background: colors.blueSoft, color: colors.navy };
  return <span style={{ ...styles, display: "inline-flex", alignItems: "center", gap: 5, borderRadius: 999, padding: "5px 10px", fontSize: 12, fontWeight: 800 }}>{children}</span>;
}

function ExerciseImage({ dayKey, index, name }: { dayKey: string; index: number; name: string }) {
  const sheet = exerciseSheets[dayKey];
  const column = index % 2;
  const row = Math.floor(index / 2);
  return <div role="img" aria-label={`Illustration of ${name}`} style={{ width: "100%", aspectRatio: sheet.aspectRatio, borderRadius: 10, backgroundImage: `url(${sheet.src})`, backgroundSize: "200% 400%", backgroundPosition: `${column * 100}% ${row * 100}%`, backgroundRepeat: "no-repeat", backgroundColor: colors.blueSoft }} />;
}

export default function JorgePlanPage() {
  const [tab, setTab] = useState<Tab>("summary");
  const [compact, setCompact] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [weekNotes, setWeekNotes] = useState<Record<number, string>>({});
  const activeDay = days.find((day) => day.key === tab);
  const total = days.reduce((sum, day) => sum + day.exercises.length, 0);
  const complete = Object.values(done).filter(Boolean).length;

  const menu = [{ key: "summary" as const, label: "Resumen", icon: ClipboardList }, ...days.map((day) => ({ key: day.key, label: day.label, icon: Dumbbell })), { key: "progress" as const, label: "Progreso", icon: TrendingUp }, { key: "safety" as const, label: "Seguridad", icon: ShieldAlert }];

  return <div style={{ minHeight: "100vh", background: colors.blueSoft, color: colors.navy, fontFamily: "Arial, sans-serif" }}>
    <style>{`@media print {.jorgem-no-print{display:none!important} body{background:#fff!important}} @media (max-width:600px){.jorgem-card{padding:15px!important}.jorgem-title{font-size:18px!important}}`}</style>
    <header className="jorgem-no-print" style={{ position: "sticky", top: 0, zIndex: 10, background: colors.navy, color: colors.white, padding: "14px 16px" }}>
      <div style={{ maxWidth: 760, margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Dumbbell size={23} /><div><strong>Plan de Jorge</strong><div style={{ color: "#9bc1e1", fontSize: 12, marginTop: 2 }}>8 semanas · Nivel intermedio</div></div></div>
          <div style={{ display: "flex", gap: 7 }}><button onClick={() => setCompact((value) => !value)} style={headerButton}>{compact ? "Vista detallada" : "Vista compacta"}</button><button aria-label="Imprimir plan" onClick={() => window.print()} style={headerButton}><Printer size={16} /></button></div>
        </div>
        <nav style={{ display: "flex", gap: 6, overflowX: "auto", marginTop: 12, paddingBottom: 3 }}>
          {menu.map((item) => { const Icon = item.icon; return <button key={item.key} onClick={() => setTab(item.key)} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, border: 0, borderRadius: 999, padding: "9px 13px", cursor: "pointer", fontSize: 13, fontWeight: 800, background: tab === item.key ? colors.white : "rgba(255,255,255,.14)", color: tab === item.key ? colors.navy : colors.white }}><Icon size={15} />{item.label}</button>; })}
        </nav>
      </div>
    </header>

    <main style={{ maxWidth: 760, margin: "auto", padding: "20px 14px 56px", display: "grid", gap: 18 }}>
      {tab === "summary" && <><Card><div style={{ display: "flex", gap: 14, alignItems: "center" }}><span style={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: "50%", background: colors.navy, color: colors.white }}><User size={27} /></span><div><h1 className="jorgem-title" style={{ margin: 0, fontSize: 24 }}>Plan de Jorge</h1><p style={{ margin: "3px 0", color: colors.text }}>60 años · 1.70 m · 115 kg · Nivel intermedio</p></div></div><div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}><Pill tone="warning">Hipertensión</Pill><Pill tone="warning">Resistencia a la insulina</Pill><Pill tone="warning">Inflamación en el codo</Pill></div><div style={{ background: colors.blueSoft, borderRadius: 12, padding: 14, marginTop: 15 }}><strong>Objetivo principal</strong><p style={{ margin: "6px 0 0" }}>Perder grasa corporal manteniendo músculo y fuerza.</p><p style={{ color: colors.success, fontWeight: 800, margin: "8px 0 0" }}>✓ Ya perdió 9 kg este año</p></div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, background: colors.successBg, borderRadius: 12, padding: "11px 14px", marginTop: 15, color: colors.success, fontWeight: 800 }}><span>Progreso de sesiones</span><span>{complete}/{total}</span></div></Card>
        <Card><h2 style={sectionTitle}><ClipboardList size={19} /> Distribución semanal</h2>{days.map((day) => <button key={day.key} onClick={() => setTab(day.key)} style={{ width: "100%", border: 0, background: colors.blueSoft, color: colors.navy, textAlign: "left", borderRadius: 11, padding: "11px 12px", marginTop: 8, cursor: "pointer", fontWeight: 800 }}>{day.label} · {day.title}<span style={{ display: "block", color: colors.text, fontSize: 12, fontWeight: 400, marginTop: 3 }}>{day.subtitle}</span></button>)}</Card>
        <Card><h2 style={sectionTitle}><TrendingUp size={19} /> Progresión de las 8 semanas</h2>{progression.map(([weeks, title, detail, bar]) => <div key={String(weeks)} style={{ marginTop: 14 }}><strong style={{ fontSize: 14 }}>{weeks} · {title}</strong><div style={{ height: 8, background: colors.blueSoft, borderRadius: 999, marginTop: 6 }}><div style={{ width: `${bar}%`, height: "100%", borderRadius: 999, background: colors.blue }} /></div><p style={{ margin: "6px 0 0", color: colors.text, fontSize: 13 }}>{detail}</p></div>)}</Card>
        <Card><h2 style={sectionTitle}><Info size={19} /> RPE y repeticiones en reserva</h2><p style={bodyText}>RPE es el esfuerzo percibido en una escala de 0 a 10. Un RPE 7 significa que podrías haber hecho aproximadamente 3 repeticiones más con buena técnica.</p><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}><Pill><Clock size={13} /> 60-90 min por sesión</Pill><Pill><Activity size={13} /> 5 días por semana</Pill><Pill><Moon size={13} /> Recuperación</Pill></div></Card></>}

      {activeDay && <><Card><div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}><div><h1 className="jorgem-title" style={{ margin: 0, fontSize: 23 }}>{activeDay.label} · {activeDay.title}</h1><p style={{ margin: "4px 0 0", color: colors.text }}>{activeDay.subtitle}</p></div><Pill tone="success">{activeDay.exercises.filter((_, index) => done[`${activeDay.key}-${index}`]).length}/{activeDay.exercises.length} hecho</Pill></div><div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}><Pill>RPE 6-8</Pill><Pill>No aguantes la respiración</Pill><Pill tone="warning">Codo: máximo 3/10</Pill></div></Card>
        <Card><h2 style={sectionTitle}><Activity size={19} /> Calentamiento · 8-10 min</h2><ul style={bodyText}><li>5 minutos de caminadora o bicicleta suave.</li><li>Movilidad de hombros, codos y escápulas.</li><li>1 serie ligera de los movimientos principales.</li></ul></Card>
        <Card><h2 style={sectionTitle}><Dumbbell size={19} /> Ejercicios</h2><div style={{ display: "grid", gap: 10 }}>{activeDay.exercises.map(([name, sets, rest], index) => { const id = `${activeDay.key}-${index}`; const checked = Boolean(done[id]); return <article className="jorgem-card" key={id} style={{ background: checked ? colors.successBg : colors.blueSoft, border: `1px solid ${checked ? colors.success : colors.border}`, borderRadius: 14, padding: compact ? 11 : 15 }}><div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "minmax(112px, 30%) 1fr", gap: 12 }}><ExerciseImage dayKey={activeDay.key} index={index} name={name} /><div><div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><div><strong>{index + 1}. {name}</strong><div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 8 }}><Pill>{sets}</Pill><Pill tone={rest === "Opcional" ? "warning" : "blue"}>{rest}</Pill></div></div><button onClick={() => setDone((current) => ({ ...current, [id]: !checked }))} aria-pressed={checked} style={{ alignSelf: "start", display: "inline-flex", alignItems: "center", gap: 5, border: `1px solid ${checked ? colors.success : colors.border}`, borderRadius: 9, background: colors.white, color: checked ? colors.success : colors.navy, padding: "8px 10px", cursor: "pointer", fontWeight: 800, fontSize: 12 }}><CheckCircle2 size={15} />{checked ? "Hecho" : "Marcar"}</button></div>{!compact && <p style={{ margin: "11px 0 0", fontSize: 13, color: colors.text }}>Prioriza una técnica controlada y detén el ejercicio si la molestia aumenta.</p>}</div></div></article>; })}</div></Card>
        <Card><h2 style={sectionTitle}><Flame size={19} /> Cardio post-entreno</h2><p style={bodyText}>{activeDay.cardio}</p></Card>
        <Card style={{ borderColor: colors.danger, background: colors.dangerBg }}><h2 style={{ ...sectionTitle, color: colors.danger }}><ShieldAlert size={19} /> Seguridad del día</h2><p style={{ ...bodyText, color: colors.danger }}>Evita el fallo muscular y detén o sustituye un ejercicio si aumenta la molestia del codo.</p></Card>
        <button className="jorgem-no-print" onClick={() => setDone((current) => { const next = { ...current }; activeDay.exercises.forEach((_, index) => { delete next[`${activeDay.key}-${index}`]; }); return next; })} style={{ justifySelf: "start", display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${colors.border}`, borderRadius: 11, padding: "10px 14px", background: colors.white, color: colors.text, cursor: "pointer", fontWeight: 800 }}><RotateCcw size={16} /> Reiniciar esta sesión</button></>}

      {tab === "progress" && <><Card><h1 className="jorgem-title" style={{ margin: 0, fontSize: 23 }}>Seguimiento de 8 semanas</h1><p style={{ ...bodyText, marginBottom: 0 }}>Registra tus datos al final de cada semana. El objetivo es observar tendencias, no perder una cantidad exacta de peso.</p></Card>{Array.from({ length: 8 }, (_, index) => <Card key={index}><h2 style={{ margin: 0, fontSize: 17 }}>Semana {index + 1}</h2><label style={{ display: "block", marginTop: 12, color: colors.text, fontSize: 13, fontWeight: 800 }}>Notas de la semana<textarea value={weekNotes[index] ?? ""} onChange={(event) => setWeekNotes((current) => ({ ...current, [index]: event.target.value }))} rows={3} style={{ display: "block", width: "100%", marginTop: 5, border: `1px solid ${colors.border}`, borderRadius: 10, padding: 10, color: colors.navy, font: "inherit", resize: "vertical" }} placeholder="Peso, entrenos completados, energía, molestias del codo…" /></label></Card>)}</>}

      {tab === "safety" && <><Card style={{ borderColor: colors.danger, background: colors.dangerBg }}><h1 className="jorgem-title" style={{ margin: 0, color: colors.danger, fontSize: 23 }}>Panel de seguridad</h1><ul style={{ ...bodyText, color: colors.danger, fontWeight: 700 }}>{safety.map((item) => <li key={item}>{item}</li>)}</ul></Card><Card><h2 style={sectionTitle}><HeartPulse size={19} /> Sobre el codo</h2><p style={bodyText}>El plan evita press militar, fondos y extensiones directas de tríceps. Prioriza agarres neutros, máquinas y movimientos controlados. Si la molestia persiste o empeora, solicita una evaluación médica o de fisioterapia.</p></Card><Card><h2 style={sectionTitle}><Wind size={19} /> Sobre la hipertensión</h2><p style={bodyText}>Exhala en el esfuerzo, no aguantes la respiración y evita llegar al fallo muscular. Sigue siempre las recomendaciones de tu médico.</p></Card><Card style={{ background: colors.blueSoft }}><p style={bodyText}><strong>Aviso:</strong> este plan es una guía de entrenamiento y no reemplaza el consejo de un profesional médico. Consulta a tu médico o fisioterapeuta antes de iniciar o modificar tu rutina.</p></Card></>}
    </main>
    <footer className="jorgem-no-print" style={{ textAlign: "center", color: colors.text, padding: "0 20px 28px", fontSize: 12 }}>Escucha a tu cuerpo. Progreso constante, técnica primero. · ¡Tú puedes, Jorge!</footer>
  </div>;
}

const headerButton: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #5B93C4", background: "transparent", color: colors.white, borderRadius: 9, padding: "8px 10px", cursor: "pointer", fontWeight: 800, fontSize: 12 };
const sectionTitle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8, color: colors.navy, margin: 0, fontSize: 17 };
const bodyText: React.CSSProperties = { color: colors.text, fontSize: 14, lineHeight: 1.7, margin: "12px 0 0" };
