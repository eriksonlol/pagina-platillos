import { useMemo, useRef } from 'react'
import { useFrame, useLoader, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { fbm, rugosidad, texturaHalo, texturaLajas, texturaRoca } from '../lib/ruido'
import { getEstado, setEstado, useEstado } from '../lib/store'
import { reproducir } from '../lib/audioguia'
import type { Sala } from '../data/salas'

// Sala 1 · Prehistoria. Una cueva estilizada de roca volcánica, iluminada desde
// abajo por la brasa del pedestal, con pinturas rupestres en los muros.

export const RX = 5.6 // semieje lateral de la cueva (m)
export const RZ = 7.6 // semieje longitudinal (m)
export const ALTO = 4.2
export const OBRA = new THREE.Vector3(0, 0, 0)
export const ATRIL = new THREE.Vector3(1.35, 0, 1.05)
const HUECO = 0.24 // ancho angular del arco hacia la sala 2

const PINTURAS: { src: string; ang: number; y: number; ancho: number }[] = [
  { src: 'salas/01/pintura-a.webp', ang: -1.95, y: 2.05, ancho: 2.9 },
  { src: 'salas/01/pintura-b.webp', ang: -1.2, y: 2.25, ancho: 2.5 },
  { src: 'salas/01/pintura-c.webp', ang: 1.85, y: 2.1, ancho: 2.3 },
  { src: 'salas/01/pintura-a.webp', ang: 1.05, y: 2.3, ancho: 2.2 },
  { src: 'salas/01/pintura-b.webp', ang: 2.55, y: 2.0, ancho: 2.0 },
]

export const puntoMuro = (ang: number) => new THREE.Vector3(RX * Math.sin(ang), 0, RZ * Math.cos(ang))
function haciaDentro(ang: number) {
  // normal de la elipse apuntando al centro
  return new THREE.Vector3(-Math.sin(ang) / RX, 0, -Math.cos(ang) / RZ).normalize()
}
const distAng = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)))

const sinClic = (e: ThreeEvent<MouseEvent>) => e.delta > 6

function Muros() {
  const tex = useMemo(() => {
    const t = texturaRoca()
    t.repeat.set(6, 2)
    return t
  }, [])
  const geo = useMemo(() => {
    const g = new THREE.CylinderGeometry(1, 1, ALTO + 0.6, 160, 40, true, Math.PI + HUECO / 2, Math.PI * 2 - HUECO)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i) + (ALTO + 0.6) / 2 - 0.3, z = p.getZ(i)
      const ang = Math.atan2(x, z)
      // los muros se cierran hacia arriba como una bóveda baja
      const cierre = 1 - Math.pow(Math.max(0, (y - 2.4) / (ALTO - 2.4)), 2) * 0.18
      // menos relieve donde hay pinturas y junto al arco
      let calma = 1
      for (const pi of PINTURAS) {
        const d = distAng(ang, pi.ang) * RX
        const dy = Math.abs(y - pi.y)
        calma = Math.min(calma, THREE.MathUtils.smoothstep(Math.hypot(d * 0.8, dy * 1.3), 0.8, 1.9) * 0.75 + 0.25)
      }
      const arco = THREE.MathUtils.smoothstep(distAng(ang, Math.PI), HUECO / 2, HUECO / 2 + 0.18)
      const n = (fbm(x * 2.2 + 3, y * 1.3, z * 2.2, 5) - 0.5) * 1.6
      const salida = 1 + n * 0.14 * calma * (0.3 + 0.7 * arco) + (fbm(x * 9, y * 9, z * 9, 2) - 0.5) * 0.03
      const r = cierre * salida
      p.setXYZ(i, x * RX * r, y, z * RZ * r)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={2.5} roughness={0.95} side={THREE.BackSide} color="#bfa58e" />
    </mesh>
  )
}

function Techo() {
  const tex = useMemo(() => {
    const t = texturaRoca(256, [50, 40, 33])
    t.repeat.set(4, 4)
    return t
  }, [])
  const geo = useMemo(() => {
    const g = new THREE.CircleGeometry(1, 96, 0, Math.PI * 2)
    g.rotateX(Math.PI / 2)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i) * RX * 0.98, z = p.getZ(i) * RZ * 0.98
      const y = -(fbm(x * 0.7, 1, z * 0.7, 4) - 0.5) * 0.9 + 0.15 * (1 - Math.hypot(x / RX, z / RZ))
      p.setXYZ(i, x, y, z)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} position={[0, ALTO * 0.98, 0]}>
      <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={3} roughness={1} color="#9c8572" />
    </mesh>
  )
}

function Piso() {
  const tex = useMemo(() => {
    const t = texturaLajas()
    t.repeat.set(3.2, 4.2)
    return t
  }, [])
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      scale={[RX * 1.2, RZ * 1.2, 1]}
      receiveShadow
      onClick={(e) => {
        if (sinClic(e) || getEstado().panel) return
        e.stopPropagation()
        setEstado({ caminarA: [e.point.x, e.point.z] })
      }}
    >
      <circleGeometry args={[1, 96]} />
      <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={4} roughness={0.85} metalness={0.05} />
    </mesh>
  )
}

function Pinturas() {
  const texs = useLoader(THREE.TextureLoader, [...new Set(PINTURAS.map((p) => p.src))])
  const porSrc = Object.fromEntries([...new Set(PINTURAS.map((p) => p.src))].map((s, i) => [s, texs[i]]))
  texs.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace))
  return (
    <>
      {PINTURAS.map((p, i) => {
        const t = porSrc[p.src]
        const aspecto = t.image ? t.image.height / t.image.width : 0.8
        const pos = puntoMuro(p.ang).add(haciaDentro(p.ang).multiplyScalar(0.32))
        pos.y = p.y
        const mira = pos.clone().add(haciaDentro(p.ang))
        return (
          <group key={i}>
            <mesh position={pos} onUpdate={(m) => m.lookAt(mira)}>
              <planeGeometry args={[p.ancho, p.ancho * aspecto]} />
              <meshStandardMaterial map={t} transparent depthWrite={false} roughness={1} polygonOffset polygonOffsetFactor={-2} />
            </mesh>
            <SpotPintura destino={pos} ang={p.ang} />
          </group>
        )
      })}
    </>
  )
}

function SpotPintura({ destino, ang }: { destino: THREE.Vector3; ang: number }) {
  const luz = useRef<THREE.SpotLight>(null)
  const desde = useMemo(() => destino.clone().add(haciaDentro(ang).multiplyScalar(1.6)).setY(0.15), [destino, ang])
  return (
    <spotLight
      ref={luz}
      position={desde}
      angle={0.55}
      penumbra={1}
      intensity={9}
      distance={5}
      decay={1.6}
      color="#ffb070"
      onUpdate={(l) => {
        l.target.position.copy(destino)
        l.target.updateMatrixWorld()
      }}
    />
  )
}

function Arco({ siguiente }: { siguiente?: string }) {
  const tex = useMemo(() => texturaRoca(256, [70, 55, 44]), [])
  const piedra = (args: [number, number, number], semilla: number) =>
    rugosidad(new THREE.BoxGeometry(...args, 6, 10, 6), 2.4, 0.07, semilla)
  const pilar = useMemo(() => piedra([0.55, 2.6, 0.9], 1), [])
  const pilar2 = useMemo(() => piedra([0.55, 2.6, 0.9], 5), [])
  const dintel = useMemo(() => piedra([2.6, 0.5, 1], 9), [])
  const relleno = useMemo(() => piedra([2.8, 1.6, 0.6], 13), [])
  const cartel = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 256
    const ctx = c.getContext('2d')!
    const pintar = () => {
      ctx.clearRect(0, 0, 512, 256)
      ctx.fillStyle = 'rgba(234, 222, 200, 0.92)'
      ctx.fillRect(0, 0, 512, 256)
      ctx.fillStyle = '#3a2a1e'
      ctx.font = '500 26px "Instrument Sans", sans-serif'
      ctx.fillText('SIGUIENTE SALA · PRÓXIMAMENTE', 40, 70)
      ctx.font = 'italic 64px "Fraunces", serif'
      ctx.fillText(siguiente ?? '', 40, 160)
      ctx.fillRect(40, 196, 60, 3)
      t.needsUpdate = true
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    pintar()
    document.fonts?.ready.then(pintar)
    return t
  }, [siguiente])
  const z = -RZ + 0.05
  const mat = <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={2} roughness={0.95} color="#c4ab92" />
  return (
    <group position={[0, 0, z]}>
      <mesh geometry={pilar} position={[-1.12, 1.3, 0]} castShadow>{mat}</mesh>
      <mesh geometry={pilar2} position={[1.12, 1.3, 0]} castShadow>{mat}</mesh>
      <mesh geometry={dintel} position={[0, 2.75, 0]}>{mat}</mesh>
      <mesh geometry={relleno} position={[0, 3.75, 0.1]}>{mat}</mesh>
      {/* pasillo hacia la siguiente sala, en penumbra */}
      <mesh position={[0, 1.4, -2.2]}>
        <boxGeometry args={[1.8, 2.8, 4]} />
        <meshStandardMaterial color="#2a1f17" side={THREE.BackSide} roughness={1} />
      </mesh>
      <pointLight position={[0, 1.6, -3.4]} intensity={2.5} distance={4} color="#e8b27a" />
      {/* cartel sobre el dintel */}
      <mesh position={[0, 2.75, 0.56]}>
        <planeGeometry args={[1.1, 0.55]} />
        <meshStandardMaterial map={cartel} roughness={0.9} emissive="#ffffff" emissiveMap={cartel} emissiveIntensity={0.25} />
      </mesh>
      <pointLight position={[0, 2.2, 1.6]} intensity={3} distance={4} color="#ffb070" />
    </group>
  )
}

/** El pedestal de roca, la losa sobre brasas y el platillo modelado en 3D. */
function Obra() {
  const halo = useMemo(texturaHalo, [])
  const cerca = useEstado((e) => e.cerca === 'obra')
  const anillo = useRef<THREE.MeshStandardMaterial>(null)
  const luz = useRef<THREE.PointLight>(null)
  const roca = useMemo(() => texturaRoca(256, [58, 46, 38]), [])

  const geo = useMemo(() => {
    const base = rugosidad(mergeVertices(new THREE.IcosahedronGeometry(0.62, 4)), 2.6, 0.09, 2)
    const losa = new THREE.CylinderGeometry(0.88, 0.8, 0.16, 40, 2)
    {
      const p = losa.attributes.position
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), z = p.getZ(i)
        const a = Math.atan2(z, x)
        const r = 1 + (fbm(Math.cos(a) * 2 + 4, Math.sin(a) * 2, 1, 3) - 0.5) * 0.35
        p.setXYZ(i, x * r, p.getY(i) + (fbm(x * 3, 2, z * 3, 3) - 0.5) * 0.05, z * r * 0.82)
      }
      losa.computeVertexNormals()
    }
    const plato = rugosidad(new THREE.CylinderGeometry(0.46, 0.48, 0.06, 36, 1), 5, 0.012, 3)
    plato.scale(1, 1, 0.78)
    const carne = rugosidad(mergeVertices(new THREE.SphereGeometry(0.16, 32, 20)), 9, 0.022, 4)
    carne.scale(1.25, 0.55, 0.78)
    return { base, losa, plato, carne }
  }, [])

  // tierra comestible, tubérculos y hojas como instancias
  const tierra = useMemo(() => {
    const m = new THREE.Object3D()
    const arr: THREE.Matrix4[] = []
    for (let i = 0; i < 320; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * 0.38
      m.position.set(Math.cos(a) * r, 0, Math.sin(a) * r * 0.75)
      m.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3)
      m.scale.setScalar(0.006 + Math.random() * 0.012)
      m.updateMatrix()
      arr.push(m.matrix.clone())
    }
    return arr
  }, [])
  const tuberculos = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        pos: [0.12 + Math.random() * 0.2, 0.02, -0.18 + Math.random() * 0.36] as [number, number, number],
        rot: [Math.PI / 2, 0, Math.random() * Math.PI] as [number, number, number],
        largo: 0.04 + Math.random() * 0.05,
        color: i % 3 === 0 ? '#9a6236' : '#8c6a4a',
      })),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const parpadeo = 0.75 + Math.sin(t * 7.3) * 0.08 + Math.sin(t * 13.1) * 0.06 + Math.sin(t * 2.1) * 0.1
    if (luz.current) luz.current.intensity = 10 * parpadeo
    if (anillo.current) anillo.current.emissiveIntensity = (cerca ? 1.4 : 1.0) * parpadeo + (cerca ? Math.sin(t * 3) * 0.3 : 0)
  })

  const abrir = (e: ThreeEvent<MouseEvent>) => {
    if (sinClic(e)) return
    e.stopPropagation()
    setEstado({ panel: 'ficha', caminarA: null })
  }
  const puntero = (on: boolean) => () => (document.body.style.cursor = on ? 'pointer' : '')

  return (
    <group position={OBRA} onClick={abrir} onPointerOver={puntero(true)} onPointerOut={puntero(false)}>
      <mesh geometry={geo.base} position={[0, 0.42, 0]} scale={[1.15, 0.78, 0.95]} castShadow receiveShadow>
        <meshStandardMaterial map={roca} bumpMap={roca} bumpScale={3} roughness={1} color="#a48c78" />
      </mesh>
      <mesh geometry={geo.losa} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={roca} bumpMap={roca} bumpScale={2} roughness={0.9} color="#b9a28c" />
      </mesh>
      {/* brasa bajo el plato */}
      <mesh position={[0, 0.985, 0]} rotation-x={-Math.PI / 2} scale={[1, 0.78, 1]}>
        <ringGeometry args={[0.36, 0.52, 64]} />
        <meshStandardMaterial ref={anillo} color="#2a1208" emissive="#c2410c" emissiveIntensity={1.0} roughness={1} />
      </mesh>
      <pointLight ref={luz} position={[0, 2.1, 0.3]} color="#ff9a50" intensity={10} distance={9} decay={1.7} />
      {/* resplandor de brasa hacia el piso y los muros */}
      <pointLight position={[0, 0.35, 1.2]} color="#ff7a30" intensity={6} distance={7} decay={1.4} />
      <pointLight position={[0, 0.35, -1.2]} color="#ff7a30" intensity={6} distance={7} decay={1.4} />

      <group position={[0, 1.02, 0]}>
        <mesh geometry={geo.plato} castShadow receiveShadow>
          <meshStandardMaterial color="#4a4542" roughness={0.95} />
        </mesh>
        <group position={[0, 0.035, 0]}>
          <instancedMesh args={[undefined, undefined, tierra.length]} onUpdate={(im) => { tierra.forEach((m, i) => im.setMatrixAt(i, m)); im.instanceMatrix.needsUpdate = true }}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#2b1d15" roughness={1} />
          </instancedMesh>
          {/* costilla en diagonal: el punto focal */}
          <mesh geometry={geo.carne} position={[-0.05, 0.05, -0.02]} rotation-y={0.55} castShadow>
            <meshStandardMaterial color="#2a150e" roughness={0.6} />
          </mesh>
          {/* hueso de la costilla, siguiendo la diagonal */}
          <mesh position={[0.15, 0.04, -0.15]} rotation={[0, 0.55, Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.016, 0.16, 4, 10]} />
            <meshStandardMaterial color="#d9c6a8" roughness={0.55} />
          </mesh>
          <mesh position={[-0.05, 0.1, -0.02]} rotation-y={0.55} scale={[1.3, 0.3, 0.82]}>
            <sphereGeometry args={[0.15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#0e0c0b" roughness={1} bumpMap={roca} bumpScale={6} />
          </mesh>
          {tuberculos.map((tb, i) => (
            <mesh key={i} position={tb.pos} rotation={tb.rot} castShadow>
              <capsuleGeometry args={[0.014, tb.largo, 4, 8]} />
              <meshStandardMaterial color={tb.color} roughness={0.7} />
            </mesh>
          ))}
          {/* el único acento verde */}
          {[[-0.26, 0.02, 0.12, 0.4], [0.3, 0.02, -0.08, 2.1], [-0.2, 0.02, -0.17, 1.2]].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2 + 0.25, 0, r]}>
              <circleGeometry args={[0.05, 5]} />
              <meshStandardMaterial color="#5f8a3a" roughness={0.6} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      </group>
      <Humo />
      <Chispas />
      {/* halo de calor */}
      <sprite position={[0, 1.05, 0]} scale={[2.2, 0.9, 1]}>
        <spriteMaterial map={halo} color="#ff7a2a" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
    </group>
  )
}

function Humo() {
  const n = 18
  const halo = useMemo(texturaHalo, [])
  const refs = useRef<(THREE.Sprite | null)[]>([])
  const fases = useMemo(() => Array.from({ length: n }, (_, i) => i / n), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.current.forEach((s, i) => {
      if (!s) return
      const f = (t * 0.09 + fases[i]) % 1
      s.position.set(Math.sin(t * 0.7 + i) * 0.08 * f + -0.05, 1.12 + f * 2.4, Math.cos(t * 0.5 + i * 2) * 0.06 * f)
      const k = 0.12 + f * 0.9
      s.scale.set(k, k, 1)
      ;(s.material as THREE.SpriteMaterial).opacity = Math.sin(f * Math.PI) * 0.13
    })
  })
  return (
    <>
      {fases.map((_, i) => (
        <sprite key={i} ref={(r) => { refs.current[i] = r }}>
          <spriteMaterial map={halo} color="#b9aa9a" transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </>
  )
}

function Chispas() {
  const n = 40
  const pts = useRef<THREE.Points>(null)
  const datos = useMemo(() => Array.from({ length: n }, () => ({ f: Math.random(), v: 0.15 + Math.random() * 0.3, a: Math.random() * 6.28, r: Math.random() * 0.4 })), [])
  const pos = useMemo(() => new Float32Array(n * 3), [])
  const halo = useMemo(texturaHalo, [])
  useFrame((_, dt) => {
    datos.forEach((d, i) => {
      d.f += dt * d.v * 0.35
      if (d.f > 1) Object.assign(d, { f: 0, a: Math.random() * 6.28, r: Math.random() * 0.4 })
      pos[i * 3] = Math.cos(d.a + d.f * 3) * d.r * (1 + d.f)
      pos[i * 3 + 1] = 1.05 + d.f * 2.2
      pos[i * 3 + 2] = Math.sin(d.a + d.f * 3) * d.r * 0.8 * (1 + d.f)
    })
    if (pts.current) pts.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial map={halo} size={0.045} color="#ffae5a" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

/** Atril de piedra con el punto de audioguía. */
function Atril({ sala }: { sala: Sala }) {
  const cerca = useEstado((e) => e.cerca === 'atril')
  const sonando = useEstado((e) => e.audio.reproduciendo)
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  const roca = useMemo(() => texturaRoca(256, [70, 56, 44]), [])
  const icono = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const g = c.getContext('2d')!
    g.fillStyle = '#20140c'
    g.fillRect(0, 0, 256, 256)
    g.strokeStyle = '#ffd9a0'
    g.fillStyle = '#ffd9a0'
    g.lineWidth = 7
    g.beginPath()
    g.arc(128, 128, 92, 0, Math.PI * 2)
    g.stroke()
    g.beginPath()
    g.moveTo(84, 108); g.lineTo(108, 108); g.lineTo(136, 82); g.lineTo(136, 174); g.lineTo(108, 148); g.lineTo(84, 148)
    g.closePath()
    g.fill()
    g.lineWidth = 8
    g.lineCap = 'round'
    g.beginPath(); g.arc(140, 128, 22, -0.8, 0.8); g.stroke()
    g.beginPath(); g.arc(140, 128, 42, -0.8, 0.8); g.stroke()
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  const columna = useMemo(() => rugosidad(new THREE.BoxGeometry(0.32, 1.0, 0.28, 4, 8, 4), 4, 0.025, 8), [])
  const tapa = useMemo(() => rugosidad(new THREE.BoxGeometry(0.46, 0.08, 0.4, 6, 2, 6), 5, 0.015, 11), [])

  useFrame(({ clock }) => {
    if (mat.current) mat.current.emissiveIntensity = (cerca || sonando ? 1.4 : 0.55) + (cerca && !sonando ? Math.sin(clock.elapsedTime * 3.2) * 0.45 : 0)
  })

  const tocar = (e: ThreeEvent<MouseEvent>) => {
    if (sinClic(e)) return
    e.stopPropagation()
    setEstado({ caminarA: null })
    reproducir(sala)
  }
  const puntero = (on: boolean) => () => (document.body.style.cursor = on ? 'pointer' : '')

  return (
    <group position={ATRIL} rotation-y={-0.9} onClick={tocar} onPointerOver={puntero(true)} onPointerOut={puntero(false)}>
      <mesh geometry={columna} position={[0, 0.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={roca} bumpMap={roca} bumpScale={2} roughness={1} color="#b8a088" />
      </mesh>
      <group position={[0, 1.04, 0]} rotation-x={-0.35}>
        <mesh geometry={tapa} castShadow>
          <meshStandardMaterial map={roca} bumpMap={roca} bumpScale={2} roughness={1} color="#b8a088" />
        </mesh>
        <mesh position={[0, 0.046, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.12, 48]} />
          <meshStandardMaterial ref={mat} map={icono} emissive="#ffb76b" emissiveMap={icono} emissiveIntensity={0.6} roughness={0.6} />
        </mesh>
      </group>
    </group>
  )
}

export function Sala01({ sala }: { sala: Sala }) {
  return (
    <group>
      <color attach="background" args={['#0b0705']} />
      <fog attach="fog" args={['#0b0705', 9, 22]} />
      <ambientLight intensity={0.55} color="#ffd2b0" />
      <hemisphereLight args={['#8a6a50', '#2a1a10', 0.9]} />
      {/* braseros ocultos junto a los muros */}
      <pointLight position={[-4.2, 0.4, 3.5]} color="#ff9a4a" intensity={5} distance={6} decay={1.5} />
      <pointLight position={[4.2, 0.4, 3.5]} color="#ff9a4a" intensity={5} distance={6} decay={1.5} />
      <pointLight position={[-4.0, 0.4, -4.0]} color="#ff9a4a" intensity={4} distance={6} decay={1.5} />
      <pointLight position={[4.0, 0.4, -4.0]} color="#ff9a4a" intensity={4} distance={6} decay={1.5} />
      <Muros />
      <Techo />
      <Piso />
      <Pinturas />
      <Arco siguiente={sala.siguiente} />
      <Obra />
      <Atril sala={sala} />
    </group>
  )
}
