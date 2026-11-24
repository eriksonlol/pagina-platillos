import { useEffect, useRef } from 'react'
import type { Punto, Sala } from '../data/salas'
import { camara } from '../scene/Escena'
import { setEstado, useEstado } from '../lib/store'
import { reproducirGuiado } from '../lib/recorrido'

// Puntos de luz sobre el render: se recolocan en cada cuadro siguiendo la cámara.
export function Puntos({ sala }: { sala: Sala }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const panel = useEstado((e) => e.panel)

  useEffect(() => {
    let id = 0
    const bucle = () => {
      const { cam, visible, ancho, alto, img, mezcla } = camara
      for (const p of sala.puntos) {
        const el = refs.current[p.id]
        if (!el) continue
        const im = sala.escena[p.img]
        const sx = ((p.x / im.ancho - cam.x) / (visible.x / cam.z) + 0.5) * ancho
        const sy = ((p.y / im.alto - cam.y) / (visible.y / cam.z) + 0.5) * alto
        const dentro = sx > 30 && sx < ancho - 30 && sy > 90 && sy < alto - 110
        const ver = p.img === img && mezcla < 0.02 && dentro
        el.style.transform = `translate(${sx}px, ${sy}px)`
        el.classList.toggle('visible', ver)
      }
      id = requestAnimationFrame(bucle)
    }
    bucle()
    return () => cancelAnimationFrame(id)
  }, [sala])

  const accion = (p: Punto) => {
    if (p.accion === 'vista' && p.vista) setEstado({ vista: p.vista, guiado: false })
    if (p.accion === 'ficha') setEstado({ panel: 'ficha' })
    if (p.accion === 'audio') reproducirGuiado(sala)
  }

  return (
    <div className={`puntos ${panel ? 'oculto' : ''}`}>
      {sala.puntos.map((p) => (
        <button key={p.id} ref={(r) => { refs.current[p.id] = r }} className="punto-luz" onClick={() => accion(p)}>
          <span className="punto-luz__aro" />
          <span className="punto-luz__texto">{p.etiqueta}</span>
        </button>
      ))}
    </div>
  )
}
