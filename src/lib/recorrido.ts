import type { Sala } from '../data/salas'
import { reproducir } from './audioguia'
import { getEstado, setEstado, useEstado } from './store'
import { useEffect } from 'react'
import { camara, mundo } from '../scene/Escena'

// Recorrido guiado: la audioguía suena y la cámara cambia de toma cuando el
// guion llega a cada frase clave. Cuando la guía nombra un ingrediente, ese
// elemento del platillo se enciende y la mirada se inclina hacia él.

const DURA_RESALTE = 0.07 // fracción del guion que dura encendido cada elemento

export function reproducirGuiado(sala: Sala) {
  setEstado({ guiado: true, resaltado: null, vista: sala.guia[0]?.vista ?? getEstado().vista })
  reproducir(sala)
}

function posicion(sala: Sala, frase: string) {
  const i = sala.guion.toLowerCase().indexOf(frase.toLowerCase())
  return Math.max(0, i) / sala.guion.length
}

export function useRecorridoGuiado(sala: Sala) {
  const progreso = useEstado((e) => e.audio.progreso)
  const guiado = useEstado((e) => e.guiado)
  useEffect(() => {
    if (!guiado) return
    const marcas = sala.guia.map((g) => ({ ...g, en: posicion(sala, g.frase) })).sort((a, b) => a.en - b.en)
    let vista = marcas[0]?.vista
    for (const m of marcas) if (progreso + 0.005 >= m.en) vista = m.vista
    const cambios: Parameters<typeof setEstado>[0] = {}
    if (vista && vista !== getEstado().vista) cambios.vista = vista

    let resaltado: number | null = null
    sala.elementos.forEach((el, i) => {
      if (!el.palabra) return
      const en = posicion(sala, el.palabra)
      if (progreso + 0.01 >= en && progreso < en + DURA_RESALTE) resaltado = i
    })
    if ((vista ?? getEstado().vista) !== 'platillo') resaltado = null
    if (resaltado !== getEstado().resaltado) {
      cambios.resaltado = resaltado
      camara.inclina = resaltado === null ? null : mundo(sala.escenas.platillo, sala.elementos[resaltado].en)
    }
    if (Object.keys(cambios).length) setEstado(cambios)
  }, [progreso, guiado, sala])
}
