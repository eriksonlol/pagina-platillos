import { Suspense, useCallback, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { salas } from './data/salas'
import { Escena } from './scene/Escena'
import { Entrada } from './ui/Entrada'
import { Hud } from './ui/Hud'
import { Ficha } from './ui/Ficha'
import { Reproductor } from './ui/Reproductor'
import { Capa3D } from './ui/Capa3D'
import { useEstado } from './lib/store'
import { volumenAmbiente } from './lib/ambiente'
import { useRecorridoGuiado } from './lib/recorrido'
import { irASala, registrarVelo } from './lib/navegacion'
import { salaDelEnlace, setEstado } from './lib/store'
import { Mapa } from './ui/Mapa'

export default function App() {
  const numero = useEstado((e) => e.sala)
  const sala = salas[numero - 1]
  const dentro = useEstado((e) => e.dentro)
  const sonando = useEstado((e) => e.audio.reproduciendo)
  const audioActivo = useEstado((e) => e.audio.activo)
  useRecorridoGuiado(sala)
  const velo = useRef<HTMLDivElement>(null)
  const alFundido = useCallback((o: number) => {
    if (velo.current) velo.current.style.opacity = String(o)
  }, [])
  useEffect(() => {
    registrarVelo(velo.current)
    // enlaces como #sala-7 abren esa sala (también con atrás/adelante del navegador)
    const alCambiar = () => {
      const n = salaDelEnlace()
      if (dentroRef.current) irASala(n)
      else setEstado({ sala: n })
    }
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])
  const dentroRef = useRef(dentro)
  dentroRef.current = dentro
  useEffect(() => {
    document.title = `Sala ${sala.numero} · ${sala.nombre} — Del fuego al lienzo`
  }, [sala])

  // el ambiente baja mientras habla la audioguía
  useEffect(() => {
    if (dentro) volumenAmbiente(sonando ? 0.15 : 0.5)
  }, [dentro, sonando])

  return (
    <div className={`museo ${dentro ? 'museo--dentro' : ''} ${audioActivo ? 'museo--audio' : ''}`}>
      <Canvas className="lienzo" dpr={[1, 2]} flat linear gl={{ antialias: true }} camera={{ fov: 42, near: 0.05, far: 60 }}>
        <Suspense fallback={null}>
          <Escena key={sala.numero} sala={sala} alFundido={alFundido} />
        </Suspense>
      </Canvas>
      <div className="vineta" aria-hidden />
      <div className="grano" aria-hidden />
      <div ref={velo} className="fundido" aria-hidden />
      {dentro && <Capa3D sala={sala} />}
      {dentro && <Hud sala={sala} />}
      {dentro && <Reproductor sala={sala} />}
      <Ficha sala={sala} />
      <Mapa actual={sala.numero} />
      {!dentro && <Entrada sala={sala} />}
    </div>
  )
}
