import type { Sala } from '../data/salas'
import { useEstado } from '../lib/store'
import { detener, pausarOReanudar } from '../lib/audioguia'

export function Reproductor({ sala }: { sala: Sala }) {
  const a = useEstado((e) => e.audio)
  if (!a.activo) return null
  return (
    <div className="reproductor" role="region" aria-label="Audioguía">
      <p className="reproductor__frase" aria-live="polite">{a.frase}</p>
      <div className="reproductor__barra">
        <button className="reproductor__play" onClick={() => pausarOReanudar(sala)} aria-label={a.reproduciendo ? 'Pausar' : 'Reproducir'}>
          {a.reproduciendo ? (
            <svg viewBox="0 0 20 20"><rect x="5" y="4" width="3.4" height="12" /><rect x="11.6" y="4" width="3.4" height="12" /></svg>
          ) : (
            <svg viewBox="0 0 20 20"><path d="M6 4l10 6-10 6z" /></svg>
          )}
        </button>
        <div className="reproductor__info">
          <span>Audioguía · Sala {sala.numero}</span>
          <div className="pista"><div style={{ width: `${a.progreso * 100}%` }} /></div>
          {a.provisional && <span className="nota">Voz provisional, se reemplaza por la grabación final</span>}
        </div>
        <button className="reproductor__cerrar" onClick={detener} aria-label="Cerrar audioguía">×</button>
      </div>
    </div>
  )
}
