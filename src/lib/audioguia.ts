import type { Sala } from '../data/salas'
import { getEstado, setEstado } from './store'

// Reproduce la audioguía de una sala. Si la sala aún no tiene audio grabado,
// usa la voz del navegador como marcador provisional y muestra subtítulos.

let audioEl: HTMLAudioElement | null = null
let frases: { texto: string; inicio: number }[] = []
let total = 1

function partir(guion: string) {
  frases = []
  let pos = 0
  for (const f of guion.match(/[^.!?]+[.!?]+/g) ?? [guion]) {
    frases.push({ texto: f.trim(), inicio: pos / guion.length })
    pos += f.length
  }
  total = guion.length
}

function fraseEn(p: number) {
  let actual = frases[0]?.texto ?? ''
  for (const f of frases) if (f.inicio <= p) actual = f.texto
  return actual
}

function actualizar(p: number, reproduciendo: boolean) {
  setEstado((e) => ({ audio: { ...e.audio, activo: true, reproduciendo, progreso: p, frase: fraseEn(p) } }))
}

function vozEspanol() {
  const voces = speechSynthesis.getVoices()
  return (
    voces.find((v) => v.lang === 'es-MX') ??
    voces.find((v) => v.lang === 'es-US') ??
    voces.find((v) => v.lang.startsWith('es')) ??
    null
  )
}

export function reproducir(sala: Sala) {
  detener()
  partir(sala.guion)
  setEstado({ audio: { activo: true, reproduciendo: true, progreso: 0, frase: frases[0]?.texto ?? '', provisional: !sala.audio } })

  if (sala.audio) {
    audioEl = new Audio(sala.audio)
    audioEl.ontimeupdate = () => audioEl && actualizar(audioEl.currentTime / (audioEl.duration || 1), !audioEl.paused)
    audioEl.onended = () => {
      actualizar(1, false)
      setEstado({ guiado: false })
    }
    void audioEl.play()
    return
  }

  if (!('speechSynthesis' in window)) {
    // Sin voz disponible: se avanzan los subtítulos a ritmo de lectura (~2.6 palabras/s).
    const dur = (sala.guion.split(/\s+/).length / 2.6) * 1000
    const t0 = performance.now()
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / dur)
      actualizar(p, p < 1)
      if (p < 1 && getEstado().audio.reproduciendo) requestAnimationFrame(tick)
    }
    tick()
    return
  }

  const u = new SpeechSynthesisUtterance(sala.guion)
  u.lang = 'es-MX'
  u.rate = 0.92
  u.pitch = 0.95
  const v = vozEspanol()
  if (v) u.voice = v
  u.onboundary = (ev) => actualizar(ev.charIndex / total, true)
  u.onend = () => {
    actualizar(1, false)
    setEstado({ guiado: false })
  }
  speechSynthesis.speak(u)
}

export function pausarOReanudar(sala: Sala) {
  const a = getEstado().audio
  if (!a.activo || a.progreso >= 1) return reproducir(sala)
  if (audioEl) {
    if (audioEl.paused) void audioEl.play()
    else audioEl.pause()
    actualizar(a.progreso, !audioEl.paused)
    return
  }
  if ('speechSynthesis' in window) {
    if (speechSynthesis.paused) speechSynthesis.resume()
    else speechSynthesis.pause()
    actualizar(a.progreso, !speechSynthesis.paused)
  }
}

export function detener() {
  if (audioEl) {
    audioEl.pause()
    audioEl = null
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel()
  setEstado((e) => ({ guiado: false, audio: { ...e.audio, activo: false, reproduciendo: false, progreso: 0, frase: '' } }))
}
