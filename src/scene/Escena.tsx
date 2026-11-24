import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Escena as TEscena, P3, Sala, Vista } from '../data/salas'
import { getEstado } from '../lib/store'

// La sala se levanta en 3D a partir de los renders de Gemini: cada render está
// partido en capas (muros, pedestal, atril) y cada capa se deforma con su mapa
// de profundidad. La cámara es real, así que al moverse el atril pasa por
// delante de los muros y el pedestal gira levemente, como en un recorrido.

/** Convierte un punto del render (px, px, cercanía) a metros en la escena. */
export function mundo(e: TEscena, p: P3, destino = new THREE.Vector3()) {
  const t = Math.tan(THREE.MathUtils.degToRad(e.fov / 2))
  const asp = e.ancho / e.alto
  const z = e.escala / (p[2] * 0.95 + 0.05)
  return destino.set((p[0] / e.ancho - 0.5) * 2 * t * asp * z, -(p[1] / e.alto - 0.5) * 2 * t * z, -z)
}

/** Estado compartido con la capa HTML (puntos, paneles, etiquetas). */
export const camara = {
  obj: null as THREE.PerspectiveCamera | null,
  escena: 'sala',
  enTransito: false,
  ancho: 1,
  alto: 1,
  mouse: new THREE.Vector2(),
  inclina: null as THREE.Vector3 | null, // punto hacia el que se inclina la mirada (recorrido guiado)
  quieta: false, // el cursor está sobre un punto: la cámara deja de seguirlo
}

const vert = /* glsl */ `
uniform sampler2D prof;
uniform vec4 caja;
uniform float tanMedio, asp, escala;
varying vec2 vUv;
void main() {
  vec2 u = mix(caja.xy, caja.zw, vec2(uv.x, 1.0 - uv.y)); // coordenadas del render, origen arriba-izq.
  vUv = u;
  float n = texture2D(prof, vec2(clamp(u.x, 0.0, 1.0), 1.0 - clamp(u.y, 0.0, 1.0))).r;
  float z = escala / (n * 0.95 + 0.05);
  vec3 p = vec3((u.x - 0.5) * 2.0 * tanMedio * asp * z, -(u.y - 0.5) * 2.0 * tanMedio * z, -z);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`

const frag = /* glsl */ `
precision highp float;
uniform sampler2D mapa;
uniform vec4 fuego;
uniform float llama, tiempo, opacidad;
varying vec2 vUv;
void main() {
  vec2 u = clamp(vUv, 0.0, 1.0);
  vec4 c = texture2D(mapa, vec2(u.x, 1.0 - u.y));
  if (c.a < 0.03) discard;
  vec3 col = c.rgb;
  if (fuego.z > 0.0) {
    vec2 q = (u - fuego.xy) / fuego.zw;
    float g = exp(-dot(q, q) * 1.6);
    vec2 q2 = q * vec2(0.22, 0.12);
    float lejos = exp(-dot(q2, q2));
    col *= 1.0 + (llama - 0.5) * 0.18 * lejos;
    col += vec3(1.0, 0.42, 0.1) * g * (0.08 + llama * 0.22);
  }
  // gradación cálida y bordes que se pierden en la penumbra
  col = pow(col, vec3(0.97, 1.0, 1.05));
  vec2 b = smoothstep(vec2(0.0), vec2(0.06), vUv) * smoothstep(vec2(0.0), vec2(0.06), 1.0 - vUv);
  col *= mix(0.15, 1.0, b.x * b.y);
  gl_FragColor = vec4(col, c.a * opacidad);
}
`

function crearHalo() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')!
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  r.addColorStop(0, 'rgba(255,255,255,1)')
  r.addColorStop(0.4, 'rgba(255,255,255,0.3)')
  r.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = r
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

function EscenaCapas({ esc, visible, mats }: { esc: TEscena; visible: boolean; mats: THREE.ShaderMaterial[] }) {
  const urls = esc.capas.flatMap((c) => [c.src, c.prof])
  const tex = useLoader(THREE.TextureLoader, urls)
  const capas = useMemo(
    () =>
      esc.capas.map((c, i) => {
        const mapa = tex[i * 2], prof = tex[i * 2 + 1]
        for (const t of [mapa, prof]) {
          t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
          t.generateMipmaps = false
          t.minFilter = THREE.LinearFilter
        }
        const [sx, sy] = c.malla ?? [100, 60]
        const geo = new THREE.PlaneGeometry(1, 1, sx, sy)
        const caja = c.caja ?? [0, 0, 1, 1]
        const mat = new THREE.ShaderMaterial({
          vertexShader: vert,
          fragmentShader: frag,
          transparent: i > 0,
          depthWrite: i === 0,
          uniforms: {
            mapa: { value: mapa },
            prof: { value: prof },
            caja: { value: new THREE.Vector4(...caja) },
            tanMedio: { value: Math.tan(THREE.MathUtils.degToRad(esc.fov / 2)) },
            asp: { value: esc.ancho / esc.alto },
            escala: { value: esc.escala },
            fuego: {
              value: esc.fuego
                ? new THREE.Vector4(esc.fuego[0] / esc.ancho, esc.fuego[1] / esc.alto, esc.fuego[2] / esc.ancho, esc.fuego[3] / esc.alto)
                : new THREE.Vector4(),
            },
            llama: { value: 0.5 },
            tiempo: { value: 0 },
            opacidad: { value: 1 },
          },
        })
        mats.push(mat)
        return { geo, mat, orden: i }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tex, esc],
  )
  return (
    <group visible={visible}>
      {capas.map((c, i) => (
        <mesh key={i} geometry={c.geo} material={c.mat} renderOrder={c.orden} frustumCulled={false} />
      ))}
      {esc.humo && <Humo esc={esc} />}
      {esc.fuego && <Chispas esc={esc} />}
    </group>
  )
}

function Humo({ esc }: { esc: TEscena }) {
  const halo = useMemo(crearHalo, [])
  const origen = useMemo(() => mundo(esc, esc.humo!), [esc])
  const refs = useRef<(THREE.Sprite | null)[]>([])
  const n = 16
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.current.forEach((s, i) => {
      if (!s) return
      const f = (t * 0.07 + i / n) % 1
      s.position.set(origen.x + Math.sin(t * 0.6 + i) * 0.08 * f, origen.y + f * 1.5, origen.z + Math.cos(t * 0.4 + i) * 0.05 * f)
      const k = 0.08 + f * 0.6
      s.scale.set(k, k * 1.3, 1)
      ;(s.material as THREE.SpriteMaterial).opacity = Math.sin(f * Math.PI) * 0.12
    })
  })
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <sprite key={i} ref={(r) => { refs.current[i] = r }} renderOrder={5}>
          <spriteMaterial map={halo} color="#b8aa9c" transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </>
  )
}

function Chispas({ esc }: { esc: TEscena }) {
  const n = 46
  const halo = useMemo(crearHalo, [])
  const base = useMemo(() => mundo(esc, [esc.fuego![0], esc.fuego![1], esc.humo ? esc.humo[2] : 0.25]), [esc])
  const ancho = useMemo(() => {
    const a = mundo(esc, [esc.fuego![0] + esc.fuego![2], esc.fuego![1], esc.humo ? esc.humo[2] : 0.25])
    return a.distanceTo(base)
  }, [esc, base])
  const pts = useRef<THREE.Points>(null)
  const pos = useMemo(() => new Float32Array(n * 3), [])
  const d = useMemo(() => Array.from({ length: n }, () => ({ f: Math.random(), v: 0.2 + Math.random() * 0.3, x: Math.random() * 2 - 1, z: Math.random() * 2 - 1 })), [])
  useFrame((_, dt) => {
    d.forEach((p, i) => {
      p.f += dt * p.v * 0.3
      if (p.f > 1) Object.assign(p, { f: 0, x: Math.random() * 2 - 1, z: Math.random() * 2 - 1 })
      pos[i * 3] = base.x + p.x * ancho * 0.7 * (1 - p.f * 0.5) + Math.sin(p.f * 9 + i) * 0.03
      pos[i * 3 + 1] = base.y + p.f * ancho * 3
      pos[i * 3 + 2] = base.z + p.z * ancho * 0.3
    })
    if (pts.current) pts.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={pts} renderOrder={6} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial map={halo} size={ancho * 0.05} color="#ffae5a" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

const suavizar = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function Escena({ sala, alFundido }: { sala: Sala; alFundido: (o: number) => void }) {
  const { camera, size, gl } = useThree()
  const cam = camera as THREE.PerspectiveCamera
  const mats = useRef<THREE.ShaderMaterial[]>([]).current

  const pose = (v: Vista) => {
    const e = sala.escenas[v.escena]
    const mira = mundo(e, v.mira)
    const pos = new THREE.Vector3(...v.pos)
    // en pantallas verticales, las tomas cercanas se alejan un poco para que quepa la obra
    const asp = size.width / size.height
    if ((v.libertad ?? 1) < 1 && asp < 1) pos.sub(mira).multiplyScalar(1 + (1 / asp - 1) * 0.45).add(mira)
    return { pos, mira, fov: v.fov ?? 42, lib: v.libertad ?? 1 }
  }
  const est = useRef({
    vista: sala.vistas[0].id,
    escena: sala.vistas[0].escena,
    desde: pose(sala.vistas[0]),
    hasta: pose(sala.vistas[0]),
    t0: -10,
    dur: 2.6,
    fundido: null as null | { t0: number; vista: Vista },
    actual: { pos: new THREE.Vector3(), mira: new THREE.Vector3(), fov: 42 },
    mouse: new THREE.Vector2(),
    mouseSuave: new THREE.Vector2(),
    inclina: new THREE.Vector3(),
    peso: 0,
  })

  // puntero: con ratón se usa su posición; con el dedo, el arrastre
  useEffect(() => {
    const el = gl.domElement
    let toque: { x: number; y: number; mx: number; my: number } | null = null
    const mover = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        est.current.mouse.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
      } else if (toque) {
        est.current.mouse.set(
          THREE.MathUtils.clamp(toque.mx - ((e.clientX - toque.x) / window.innerWidth) * 2.4, -1, 1),
          THREE.MathUtils.clamp(toque.my - ((e.clientY - toque.y) / window.innerHeight) * 2.4, -1, 1),
        )
      }
    }
    const bajar = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') toque = { x: e.clientX, y: e.clientY, mx: est.current.mouse.x, my: est.current.mouse.y }
    }
    const subir = () => (toque = null)
    window.addEventListener('pointermove', mover)
    el.addEventListener('pointerdown', bajar)
    window.addEventListener('pointerup', subir)
    return () => {
      window.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerdown', bajar)
      window.removeEventListener('pointerup', subir)
    }
  }, [gl])

  useFrame(({ clock }, dtBruto) => {
    const t = clock.elapsedTime
    const dt = Math.min(dtBruto, 0.05)
    const s = est.current

    // ¿nueva toma?
    const pedida = getEstado().vista
    if (pedida !== s.vista && !s.fundido) {
      const v = sala.vistas.find((x) => x.id === pedida)
      if (v) {
        s.vista = pedida
        if (v.escena === s.escena) {
          s.desde = { pos: s.actual.pos.clone(), mira: s.actual.mira.clone(), fov: s.actual.fov, lib: s.hasta.lib }
          s.hasta = pose(v)
          s.t0 = t
          s.dur = 2.6
        } else {
          // la cámara avanza y la imagen se funde a negro cálido antes de cambiar de escena
          const adelante = s.actual.mira.clone().sub(s.actual.pos).normalize().multiplyScalar(0.8)
          s.desde = { pos: s.actual.pos.clone(), mira: s.actual.mira.clone(), fov: s.actual.fov, lib: s.hasta.lib }
          s.hasta = { ...s.desde, pos: s.actual.pos.clone().add(adelante), fov: s.actual.fov * 0.85 }
          s.t0 = t
          s.dur = 1.1
          s.fundido = { t0: t, vista: v }
        }
      }
    }
    if (s.fundido) {
      const k = (t - s.fundido.t0) / 0.9
      if (k < 1) alFundido(Math.min(1, k * 1.1))
      else {
        // cambio de escena a oscuras; la nueva toma entra desde un poco más lejos
        const v = s.fundido.vista
        s.escena = v.escena
        const p = pose(v)
        const atras = p.pos.clone().sub(p.mira).normalize().multiplyScalar(0.25)
        s.desde = { ...p, pos: p.pos.clone().add(atras).add(new THREE.Vector3(0, 0.08, 0)), fov: p.fov * 1.08 }
        s.hasta = p
        s.t0 = t
        s.dur = 2.4
        s.fundido = null
        alFundido(0)
      }
    }

    const k = suavizar(Math.min(1, Math.max(0, (t - s.t0) / s.dur)))
    const pos = s.desde.pos.clone().lerp(s.hasta.pos, k)
    const mira = s.desde.mira.clone().lerp(s.hasta.mira, k)
    const fovBase = s.desde.fov + (s.hasta.fov - s.desde.fov) * k
    const lib = s.desde.lib + (s.hasta.lib - s.desde.lib) * k

    // el cursor guía la mirada: la cámara se desliza y gira hacia donde apunta
    if (!camara.quieta) s.mouseSuave.lerp(s.mouse, 1 - Math.exp(-dt * 2.2))
    const m = s.mouseSuave
    const e = sala.escenas[s.escena]
    const asp = size.width / size.height
    const tImg = Math.tan(THREE.MathUtils.degToRad(e.fov / 2))
    const tMax = Math.min(tImg, (tImg * (e.ancho / e.alto)) / asp) * 0.9
    const fov = Math.min(fovBase, THREE.MathUtils.radToDeg(2 * Math.atan(tMax)))
    // margen horizontal disponible para girar sin ver el borde del render
    const giroMax = Math.max(0.06, Math.atan(tImg * (e.ancho / e.alto)) - Math.atan(Math.tan(THREE.MathUtils.degToRad(fov / 2)) * asp)) * 0.85
    const adelante = mira.clone().sub(pos)
    const dist = adelante.length()
    adelante.normalize()
    const derecha = new THREE.Vector3().crossVectors(adelante, new THREE.Vector3(0, 1, 0)).normalize()
    const arriba = new THREE.Vector3().crossVectors(derecha, adelante)
    pos.addScaledVector(derecha, m.x * 0.38 * lib).addScaledVector(arriba, -m.y * 0.12 * lib)
    // respiración: un vaivén lento como de cámara en mano
    pos.x += Math.sin(t * 0.23) * 0.03
    pos.y += Math.sin(t * 0.31) * 0.015
    const giro = m.x * giroMax * (0.6 + lib * 0.4)
    const cabeceo = -m.y * 0.06 * lib
    const dir = adelante.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -giro).applyAxisAngle(derecha, cabeceo)
    const miraFinal = pos.clone().addScaledVector(dir, dist)

    // al pasar sobre un punto, la mirada se inclina hacia él antes del clic
    if (camara.inclina) s.inclina.lerp(camara.inclina, 0.2)
    s.peso += ((camara.inclina ? 1 : 0) - s.peso) * (1 - Math.exp(-dt * 3))
    if (s.peso > 0.001) {
      miraFinal.lerp(s.inclina, 0.16 * s.peso)
      pos.lerp(s.inclina, 0.025 * s.peso)
    }

    s.actual.pos.copy(pos)
    s.actual.mira.copy(mira)
    s.actual.fov = fovBase
    cam.position.copy(pos)
    cam.fov = fov * (1 - 0.04 * s.peso)
    cam.near = 0.05
    cam.far = 60
    cam.updateProjectionMatrix()
    cam.lookAt(miraFinal)

    const llama = 0.5 + Math.sin(t * 7.3) * 0.18 + Math.sin(t * 13.7 + 1) * 0.12 + Math.sin(t * 2.3) * 0.2
    for (const mt of mats) {
      mt.uniforms.llama.value = llama
      mt.uniforms.tiempo.value = t
    }

    camara.obj = cam
    camara.escena = s.escena
    camara.enTransito = !!s.fundido || t - s.t0 < s.dur * 0.8
    camara.ancho = size.width
    camara.alto = size.height
    camara.mouse.copy(m)
  })

  return (
    <>
      <color attach="background" args={['#0a0604']} />
      {Object.entries(sala.escenas).map(([id, esc]) => (
        <EscenaCapas key={id} esc={esc} visible={est.current.escena === id || camara.escena === id} mats={mats} />
      ))}
      <Visibilidad sala={sala} />
    </>
  )
}

/** Muestra solo la escena activa (sin re-renderizar React en cada cuadro). */
function Visibilidad({ sala }: { sala: Sala }) {
  const { scene } = useThree()
  const ids = Object.keys(sala.escenas)
  useFrame(() => {
    // los grupos de escena son hijos directos en el mismo orden que sala.escenas
    const grupos = scene.children.filter((c) => c.type === 'Group')
    grupos.forEach((g, i) => (g.visible = ids[i] === camara.escena))
  })
  return null
}
