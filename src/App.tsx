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

export default function App() {
  const sala = salas[0]
  const dentro = useEstado((e) => e.dentro)
  const sonando = useEstado((e) => e.audio.reproduciendo)
  useRecorridoGuiado(sala)
  const velo = useRef<HTMLDivElement>(null)
  const alFundido = useCallback((o: number) => {
    if (velo.current) velo.current.style.opacity = String(o)
  }, [])

  // el ambiente baja mientras habla la audioguía
  useEffect(() => {
    if (dentro) volumenAmbiente(sonando ? 0.15 : 0.5)
  }, [dentro, sonando])

  return (
    <div className={`museo ${dentro ? 'museo--dentro' : ''}`}>
      <Canvas className="lienzo" dpr={[1, 2]} flat linear gl={{ antialias: true }} camera={{ fov: 42, near: 0.05, far: 60 }}>
        <Suspense fallback={null}>
          <Escena sala={sala} alFundido={alFundido} />
        </Suspense>
      </Canvas>
      <div className="vineta" aria-hidden />
      <div className="grano" aria-hidden />
      <div ref={velo} className="fundido" aria-hidden />
      {dentro && <Capa3D sala={sala} />}
      {dentro && <Hud sala={sala} />}
      {dentro && <Reproductor sala={sala} />}
      <Ficha sala={sala} />
      {!dentro && <Entrada sala={sala} />}
    </div>
  )
}
