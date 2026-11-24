import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { salas } from './data/salas'
import { Sala01 } from './scene/Sala01'
import { Jugador } from './scene/Jugador'
import { Entrada } from './ui/Entrada'
import { Hud } from './ui/Hud'
import { Ficha } from './ui/Ficha'
import { Reproductor } from './ui/Reproductor'
import { useEstado } from './lib/store'
import { volumenAmbiente } from './lib/ambiente'

export default function App() {
  const sala = salas[0]
  const dentro = useEstado((e) => e.dentro)
  const sonando = useEstado((e) => e.audio.reproduciendo)

  // el ambiente baja mientras habla la audioguía
  useEffect(() => {
    if (dentro) volumenAmbiente(sonando ? 0.15 : 0.5)
  }, [dentro, sonando])

  return (
    <div className="museo">
      <Canvas
        className="lienzo"

        dpr={[1, 1.75]}
        camera={{ fov: 62, near: 0.05, far: 60, position: [0, 1.62, 5.9] }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Sala01 sala={sala} />
        </Suspense>
        {dentro && <Jugador />}
      </Canvas>
      <div className="grano" aria-hidden />
      <div className="vineta" aria-hidden />
      {dentro && <Hud sala={sala} />}
      {dentro && <Reproductor sala={sala} />}
      <Ficha sala={sala} />
      {!dentro && <Entrada sala={sala} />}
    </div>
  )
}
