import { useEffect, useState } from 'react'
import type { Sala } from '../data/salas'
import { setEstado, useEstado } from '../lib/store'
import { reproducirGuiado } from '../lib/recorrido'

export function Ficha({ sala }: { sala: Sala }) {
  const abierta = useEstado((e) => e.panel === 'ficha')
  const [img, setImg] = useState(0)
  const cerrar = () => setEstado({ panel: null })

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <div className={`velo ${abierta ? 'visible' : ''}`} onClick={cerrar} />
      <aside className={`ficha ${abierta ? 'abierta' : ''}`} aria-hidden={!abierta}>
        <button className="ficha__cerrar" onClick={cerrar} aria-label="Cerrar ficha">×</button>
        <figure className="ficha__figura">
          <img src={sala.imagenes[img].src} alt={sala.imagenes[img].pie} />
          <figcaption>{sala.imagenes[img].pie}</figcaption>
          {sala.imagenes.length > 1 && (
            <div className="ficha__miniaturas">
              {sala.imagenes.map((im, i) => (
                <button key={im.src} className={i === img ? 'activa' : ''} onClick={() => setImg(i)} aria-label={im.pie}>
                  <img src={im.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </figure>
        <div className="ficha__texto">
          <p className="volada">Sala {sala.numero} · {sala.nombre} · {sala.periodo}</p>
          <h2>{sala.obra}</h2>
          <p className="ficha__lema">{sala.lema}</p>

          <h3>Análisis de composición visual</h3>
          <p className="capitular">{sala.analisis}</p>

          <h3>Contexto socio-gastronómico</h3>
          <p>{sala.contexto}</p>

          <h3>Ingredientes</h3>
          <ul className="ingredientes">
            {sala.ingredientes.map((i) => <li key={i}>{i}</li>)}
          </ul>

          <button className="boton boton--claro" onClick={() => { cerrar(); reproducirGuiado(sala) }}>
            Escuchar la audioguía
          </button>
        </div>
      </aside>
    </>
  )
}
