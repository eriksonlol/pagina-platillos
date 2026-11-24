import type { Sala } from '../data/salas'
import { getEstado, setEstado } from './store'

// Reproduce la audioguía de una sala. Primero busca el audio grabado
// (public/salas/NN/audioguia.mp3). Si todavía no existe, usa la voz del
// navegador como marcador provisional. En ambos casos muestra subtítulos.

let audioEl: HTMLAudioElement | null = null
let frases: { texto: string; inicio: number }[] = []
let total = 1
let turno = 0
const sinArchivo = new Set<string>()

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

function terminar() {
  actualizar(1, false)
  setEstado({ guiado: false, resaltado: null })
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
  detener(false)
  const mio = ++turno
  partir(sala.guion)
  const conArchivo = !!sala.audio && !sinArchivo.has(sala.audio)
  setEstado({ audio: { activo: true, reproduciendo: true, progreso: 0, frase: frases[0]?.texto ?? '', provisional: !conArchivo } })
  if (!conArchivo) return vozProvisional(sala, mio)

  const a = new Audio(sala.audio!)
  audioEl = a
  a.ontimeupdate = () => audioEl === a && actualizar(a.currentTime / (a.duration || 1), !a.paused)
  a.onended = () => audioEl === a && terminar()
  const fallar = () => {
    if (audioEl !== a || mio !== turno) return
    // no hay grabación todavía: se recuerda y se pasa a la voz provisional
    sinArchivo.add(sala.audio!)
    audioEl = null
    setEstado((e) => ({ audio: { ...e.audio, provisional: true } }))
    vozProvisional(sala, mio)
  }
  a.onerror = fallar
  a.play().catch((err) => {
    if (err?.name !== 'AbortError') fallar()
  })
}

function vozProvisional(sala: Sala, mio: number) {
  if (!('speechSynthesis' in window)) {
    // Sin voz disponible: se avanzan los subtítulos a ritmo de lectura (~2.6 palabras/s).
    const dur = (sala.guion.split(/\s+/).length / 2.6) * 1000
    const t0 = performance.now()
    const tick = () => {
      if (mio !== turno) return
      const p = Math.min(1, (performance.now() - t0) / dur)
      if (p >= 1) return terminar()
      actualizar(p, true)
      if (getEstado().audio.reproduciendo) requestAnimationFrame(tick)
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
  u.onboundary = (ev) => mio === turno && actualizar(ev.charIndex / total, true)
  u.onend = () => mio === turno && terminar()
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

export function detener(limpiar = true) {
  turno++
  if (audioEl) {
    audioEl.pause()
    audioEl = null
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel()
  if (limpiar)
    setEstado((e) => ({ guiado: false, resaltado: null, audio: { ...e.audio, activo: false, reproduciendo: false, progreso: 0, frase: '' } }))
}
