import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { P3, Sala } from '../data/salas'
import { camara, mundo } from '../scene/Escena'
import { setEstado, useEstado } from '../lib/store'
import { reproducirGuiado } from '../lib/recorrido'

// Todo lo que flota en la sala: puntos de luz, paneles junto a la obra,
// etiquetas de los elementos del platillo. Se anclan a puntos 3D y se
// recolocan en cada cuadro, así que se mueven con la cámara.

type Ancla = { el: HTMLElement; escena: string; en: P3; vista?: string; modo: 'punto' | 'izq' | 'der' | 'fijo' }

export function Capa3D({ sala }: { sala: Sala }) {
  const anclas = useRef<Map<string, Ancla>>(new Map())
  const vista = useEstado((e) => e.vista)
  const panel = useEstado((e) => e.panel)
  const v = useRef(vista)
  v.current = vista

  const reg = (id: string, a: Omit<Ancla, 'el'>) => (el: HTMLElement | null) => {
    if (el) anclas.current.set(id, { ...a, el })
    else anclas.current.delete(id)
  }

  useEffect(() => {
    let id = 0
    const tmp = new THREE.Vector3()
    const bucle = () => {
      const cam = camara.obj
      if (cam) {
        const movil = camara.ancho < 700
        for (const a of anclas.current.values()) {
          const e = sala.escenas[a.escena]
          mundo(e, a.en, tmp).project(cam)
          const x = (tmp.x * 0.5 + 0.5) * camara.ancho
          const y = (-tmp.y * 0.5 + 0.5) * camara.alto
          const enVista = !a.vista || a.vista === v.current
          const fijo = a.modo === 'fijo' || (movil && a.modo !== 'punto')
          const ver = a.escena === camara.escena && enVista && !camara.enTransito && tmp.z < 1 &&
            (fijo || (x > -40 && x < camara.ancho + 40 && y > 70 && y < camara.alto - 90))
          a.el.classList.toggle('visible', ver)
          if (fijo) {
            a.el.style.transform = ''
            continue
          }
          const giro = camara.mouse.x * -7
          if (a.modo === 'punto') a.el.style.transform = `translate3d(${x}px, ${y}px, 0)`
          else if (a.modo === 'izq') a.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(calc(-100% - 2.4rem), -50%) perspective(900px) rotateY(${12 + giro}deg)`
          else if (a.modo === 'der') a.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(2.4rem, -50%) perspective(900px) rotateY(${-12 + giro}deg)`
          else a.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(2.4rem, -50%) perspective(900px) rotateY(${-12 + giro}deg)`
        }
      }
      id = requestAnimationFrame(bucle)
    }
    bucle()
    return () => cancelAnimationFrame(id)
  }, [sala])

  const inclinar = (en: P3 | null, escena = 'sala') => () => {
    camara.inclina = en ? mundo(sala.escenas[escena], en) : null
  }
  const ir = (vista: string) => {
    camara.inclina = null
    setEstado({ vista, guiado: false })
  }

  const p = sala.paneles
  const frases = sala.contexto.match(/[^.]+\./g) ?? []

  return (
    <div className={`capa3d ${panel ? 'oculto' : ''}`}>
      {sala.puntos.map((pt) => (
        <button
          key={pt.id}
          ref={reg('p-' + pt.id, { escena: pt.escena, en: pt.en, modo: 'punto', vista: pt.vista === vista ? '__nunca' : undefined })}
          className="punto-luz"
          onPointerEnter={inclinar(pt.en, pt.escena)}
          onPointerLeave={inclinar(null)}
          onClick={() => (pt.accion === 'audio' ? (inclinar(null)(), reproducirGuiado(sala)) : ir(pt.vista!))}
        >
          <span className="punto-luz__aro" />
          <span className="punto-luz__texto">{pt.etiqueta}</span>
        </button>
      ))}

      {/* paneles que flotan a los lados del pedestal */}
      <div className="flotantes">
        <article ref={reg('panel-izq', { escena: 'sala', en: p.izq, vista: p.vista, modo: 'izq' })} className="flotante flotante--izq">
          <p className="volada">Sala {sala.numero} · {sala.periodo}</p>
          <h3>{sala.obra}</h3>
          <h4>Análisis de composición</h4>
          <p>{sala.analisis}</p>
        </article>
        <article ref={reg('panel-der', { escena: 'sala', en: p.der, vista: p.vista, modo: 'der' })} className="flotante flotante--der">
          <h4>Contexto</h4>
          <p>{frases.slice(0, 3).join(' ')}</p>
          <div className="flotante__acciones">
            <button className="boton-flotante boton-flotante--lleno" onClick={() => ir('platillo')}>Ver el platillo de cerca</button>
            <button className="boton-flotante" onClick={() => reproducirGuiado(sala)}>Escuchar audioguía</button>
            <button className="boton-flotante" onClick={() => setEstado({ panel: 'ficha' })}>Ficha completa</button>
          </div>
        </article>
      </div>

      {/* elementos del platillo, señalados sobre la obra */}
      {sala.elementos.map((el, i) => (
        <div key={i} ref={reg('el-' + i, { escena: 'platillo', en: el.en, vista: 'platillo', modo: 'punto' })} className={`elemento elemento--${el.lado}`} style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
          <span className="elemento__punto" />
          <span className="elemento__linea" />
          <span className="elemento__texto">{el.texto}</span>
        </div>
      ))}
      <aside ref={reg('claves', { escena: 'platillo', en: [0, 0, 0], vista: 'platillo', modo: 'fijo' })} className="claves">
        <p className="volada">Cómo está montado</p>
        <dl>
          {sala.claves.map((c) => (
            <div key={c.titulo}>
              <dt>{c.titulo}</dt>
              <dd>{c.texto}</dd>
            </div>
          ))}
        </dl>
      </aside>
      <button ref={reg('volver', { escena: 'platillo', en: [0, 0, 0], vista: 'platillo', modo: 'fijo' })} className="volver" onClick={() => ir('obra')}>
        ← Volver a la sala
      </button>
    </div>
  )
}
