import { useEffect } from 'react'
import { salas } from '../data/salas'
import { setEstado, useEstado } from '../lib/store'
import { irASala } from '../lib/navegacion'

// Mapa del recorrido: las doce salas agrupadas en sus tres actos.
const ACTOS = [
  { titulo: 'Acto I', nombre: 'La superficie', texto: 'El alimento se coloca sobre lo que hay: piedra, arcilla, laca.', salas: [1, 2, 3, 4] },
  { titulo: 'Acto II', nombre: 'El símbolo', texto: 'Cada pieza significa algo: memoria, poder, medida, asombro.', salas: [5, 6, 7, 8] },
  { titulo: 'Acto III', nombre: 'La construcción', texto: 'El plato se edifica, se pinta y, al final, se vacía.', salas: [9, 10, 11, 12] },
]
const nn = (n: number) => String(n).padStart(2, '0')

export function Mapa({ actual }: { actual: number }) {
  const abierto = useEstado((e) => e.panel === 'mapa')
  const dentro = useEstado((e) => e.dentro)
  const cerrar = () => setEstado({ panel: null })
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  const ir = (n: number) => {
    if (!dentro) setEstado({ sala: n, panel: null })
    else irASala(n)
    history.replaceState(null, '', `#sala-${n}`)
  }

  return (
    <section className={`mapa ${abierto ? 'abierto' : ''}`} aria-hidden={!abierto}>
      <header className="mapa__cabeza">
        <div>
          <p className="volada">Mapa del recorrido</p>
          <h2>Del fuego <em>al lienzo</em></h2>
        </div>
        <button className="ficha__cerrar mapa__cerrar" onClick={cerrar} aria-label="Cerrar mapa">×</button>
      </header>
      <div className="mapa__actos">
        {ACTOS.map((a) => (
          <div key={a.titulo} className="mapa__acto">
            <p className="mapa__acto-titulo"><span>{a.titulo}</span> {a.nombre}</p>
            <p className="mapa__acto-texto">{a.texto}</p>
            <ol>
              {a.salas.map((n) => {
                const s = salas[n - 1]
                return (
                  <li key={n}>
                    <button className={`mapa__sala ${n === actual ? 'actual' : ''}`} onClick={() => ir(n)}>
                      <img src={`salas/${nn(n)}/espacio.webp`} alt="" loading="lazy" />
                      <span className="mapa__num">{nn(n)}</span>
                      <span className="mapa__nombre">{s.nombre}</span>
                      <span className="mapa__obra">{s.obra}</span>
                      {n === actual && <span className="mapa__aqui">Estás aquí</span>}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </div>
      <p className="mapa__pie">Al final de la Sala 12, la <em>nouvelle cuisine</em> cierra el recorrido como epílogo.</p>
    </section>
  )
}
