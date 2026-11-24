import { useSyncExternalStore } from 'react'

// Estado global mínimo compartido entre la escena y la interfaz.
type Estado = {
  dentro: boolean
  sala: number // número de la sala actual (1 a 12)
  panel: 'ficha' | 'mapa' | null
  vista: string
  guiado: boolean
  resaltado: number | null // elemento del platillo que la guía está nombrando
  audio: { activo: boolean; reproduciendo: boolean; progreso: number; frase: string; provisional: boolean }
}

/** La sala se puede abrir directo con un enlace como …/#sala-5 */
export function salaDelEnlace() {
  const m = /sala-(\d+)/.exec(location.hash)
  const n = m ? Number(m[1]) : 1
  return n >= 1 && n <= 12 ? n : 1
}

let estado: Estado = {
  dentro: false,
  sala: salaDelEnlace(),
  panel: null,
  vista: 'sala',
  guiado: false,
  resaltado: null,
  audio: { activo: false, reproduciendo: false, progreso: 0, frase: '', provisional: true },
}
const oyentes = new Set<() => void>()

export function setEstado(parcial: Partial<Estado> | ((e: Estado) => Partial<Estado>)) {
  const p = typeof parcial === 'function' ? parcial(estado) : parcial
  estado = { ...estado, ...p }
  oyentes.forEach((o) => o())
}
export const getEstado = () => estado

export function useEstado<T>(sel: (e: Estado) => T): T {
  return useSyncExternalStore(
    (cb) => {
      oyentes.add(cb)
      return () => oyentes.delete(cb)
    },
    () => sel(estado),
  )
}
