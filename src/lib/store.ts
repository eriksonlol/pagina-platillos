import { useSyncExternalStore } from 'react'

// Estado global mínimo compartido entre la escena 3D y la interfaz.
export type Foco = 'obra' | 'atril' | null

type Estado = {
  dentro: boolean
  panel: 'ficha' | null
  cerca: Foco
  audio: { activo: boolean; reproduciendo: boolean; progreso: number; frase: string; provisional: boolean }
  caminarA: [number, number] | null
}

let estado: Estado = {
  dentro: false,
  panel: null,
  cerca: null,
  audio: { activo: false, reproduciendo: false, progreso: 0, frase: '', provisional: true },
  caminarA: null,
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
