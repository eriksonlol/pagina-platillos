import type { Sala } from '../data/salas'
import { reproducir } from './audioguia'
import { getEstado, setEstado, useEstado } from './store'
import { useEffect } from 'react'

// Recorrido guiado: la audioguía suena y la cámara cambia de toma
// cuando el guion llega a cada frase clave.

export function reproducirGuiado(sala: Sala) {
  setEstado({ guiado: true, vista: sala.guia[0]?.vista ?? getEstado().vista })
  reproducir(sala)
}

export function useRecorridoGuiado(sala: Sala) {
  const progreso = useEstado((e) => e.audio.progreso)
  const guiado = useEstado((e) => e.guiado)
  useEffect(() => {
    if (!guiado) return
    const marcas = sala.guia
      .map((g) => ({ ...g, en: Math.max(0, sala.guion.indexOf(g.frase)) / sala.guion.length }))
      .sort((a, b) => a.en - b.en)
    let vista = marcas[0]?.vista
    for (const m of marcas) if (progreso + 0.005 >= m.en) vista = m.vista
    if (vista && vista !== getEstado().vista) setEstado({ vista })
  }, [progreso, guiado, sala])
}
