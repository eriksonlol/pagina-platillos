import type { Sala } from '../data/salas'
import { setEstado, useEstado } from '../lib/store'
import { reproducirGuiado } from '../lib/recorrido'

export function Hud({ sala }: { sala: Sala }) {
  const vista = useEstado((e) => e.vista)
  const audio = useEstado((e) => e.audio.activo)
  const guiado = useEstado((e) => e.guiado)
  const nota = sala.vistas.find((v) => v.id === vista)?.nota
  const tomas = sala.vistas.filter((v) => v.id !== 'arco')

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

      <nav className="botonera">
        <button className="redondo" title="Ficha de la obra" onClick={() => setEstado({ panel: 'ficha' })}>
          Ficha
        </button>
      </nav>

      {nota && !audio && (
        <p key={vista} className="nota-vista">{nota}</p>
      )}

      {!audio && (
        <div className="tomas">
          <button className="tomas__guia" onClick={() => reproducirGuiado(sala)}>
            <svg viewBox="0 0 20 20"><path d="M6 4l10 6-10 6z" /></svg>
            Recorrido guiado
          </button>
          <div className="tomas__lista">
            {tomas.map((v) => (
              <button
                key={v.id}
                className={v.id === vista ? 'activa' : ''}
                onClick={() => setEstado({ vista: v.id, guiado: false })}
              >
                {v.nombre}
              </button>
            ))}
          </div>
        </div>
      )}
      {guiado && <p className="sello-guiado">Recorrido guiado</p>}
    </>
  )
}
