import type { Sala } from '../data/salas'
import { setEstado } from '../lib/store'
import { iniciarAmbiente } from '../lib/ambiente'

export function Entrada({ sala }: { sala: Sala }) {
  const entrar = () => {
    iniciarAmbiente()
    setEstado({ dentro: true })
  }
  return (
    <section className="entrada">
      <div className="entrada__fondo" style={{ backgroundImage: `url(salas/01/espacio.webp)` }} />
      <div className="entrada__caja">
        <p className="volada">Museo virtual de arte gastronómico</p>
        <h1>
          Del fuego <em>al lienzo</em>
        </h1>
        <p className="entrada__bajada">
          Doce salas recorren la evolución del montaje, de la piedra caliente junto a la hoguera a la porcelana blanca
          de la alta cocina.
        </p>
        <div className="entrada__sala">
          <span className="numero">0{sala.numero}</span>
          <div>
            <p className="volada">{sala.acto}</p>
            <p className="entrada__nombre">{sala.nombre}</p>
            <p className="entrada__lema">{sala.lema}</p>
          </div>
        </div>
        <button className="boton" onClick={entrar}>
          Entrar a la sala
        </button>
        <ul className="entrada__ayuda">
          <li><kbd>Toca los puntos de luz</kbd> para acercarte a la obra, el atril o los muros</li>
          <li><kbd>Recorrido guiado</kbd> para que la audioguía te lleve por la sala</li>
          <li><kbd>Mueve el cursor</kbd> o arrastra para mirar alrededor</li>
        </ul>
        <p className="nota">Prototipo · Sala 1 de 12 · Con sonido</p>
      </div>
    </section>
  )
}
