import type { Sala } from '../data/salas'
import { setEstado, useEstado } from '../lib/store'
import { reproducir } from '../lib/audioguia'

export function Hud({ sala }: { sala: Sala }) {
  const cerca = useEstado((e) => e.cerca)
  const panel = useEstado((e) => e.panel)
  const audio = useEstado((e) => e.audio.activo)
  return (
    <>
      <header className="cartela">
        <span className="numero">0{sala.numero}</span>
        <div>
          <p className="volada">{sala.acto}</p>
          <h2>{sala.nombre}</h2>
          <p className="cartela__lema">{sala.lema}</p>
        </div>
      </header>

      <div className={`acciones ${cerca && !panel ? 'visible' : ''} ${audio ? 'arriba' : ''}`}>
        {cerca === 'obra' && (
          <button className="pastilla" onClick={() => setEstado({ panel: 'ficha' })}>
            <span className="punto" /> Ver ficha · <em>{sala.obra}</em>
          </button>
        )}
        {cerca === 'atril' && !audio && (
          <button className="pastilla" onClick={() => reproducir(sala)}>
            <span className="punto" /> Escuchar audioguía
          </button>
        )}
      </div>

      <nav className="botonera">
        <button className="redondo" title="Ficha de la obra" onClick={() => setEstado({ panel: 'ficha' })}>
          Ficha
        </button>
        {!audio && (
          <button className="redondo" title="Audioguía" onClick={() => reproducir(sala)}>
            Audio
          </button>
        )}
      </nav>

      <p className="ayuda-pie">Arrastra para mirar · W A S D o toca el piso para caminar</p>
    </>
  )
}
