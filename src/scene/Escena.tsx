import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Imagen, Sala, Vista } from '../data/salas'
import { getEstado } from '../lib/store'

// La sala se construye con los renders de Gemini. Cada render lleva un mapa de
// profundidad hecho a mano, que permite mover la cámara con paralaje (2.5D):
// el pedestal se desplaza respecto a los muros como en un plano de cine.
// Encima se pintan la luz viva de la brasa, el humo y las chispas.

type Cam = { x: number; y: number; z: number } // centro en 0..1 (origen arriba-izq.) y zoom

/** Estado de cámara compartido con la capa de puntos interactivos (HTML). */
export const camara = {
  img: 0,
  cam: { x: 0.5, y: 0.5, z: 1 } as Cam,
  mezcla: 0,
  ancho: 1,
  alto: 1,
  visible: { x: 1, y: 1 },
}

const vert = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`

const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tA, dA, tB, dB;
uniform vec3 camA, camB;
uniform vec2 visA, visB, texelA, texelB;
uniform vec4 fuegoA, fuegoB;
uniform vec2 humoA, humoB;
uniform float mezcla, tiempo, llama;
uniform vec2 par;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float ruido(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * ruido(p); p *= 2.03; a *= 0.5; } return s; }

vec3 capa(sampler2D t, sampler2D d, vec3 cam, vec2 vis, vec2 texel, vec4 fuego, vec2 humo) {
  // coordenadas de la imagen (origen arriba-izquierda)
  vec2 iu = cam.xy + (vec2(vUv.x, 1.0 - vUv.y) - 0.5) * vis / cam.z;
  vec2 off = par * 0.022 / sqrt(cam.z);
  // dos pasadas de búsqueda para reducir el estiramiento en los bordes
  float p0 = texture2D(d, vec2(iu.x, 1.0 - iu.y)).r;
  vec2 u1 = iu + off * (p0 - 0.55);
  float p1 = texture2D(d, vec2(u1.x, 1.0 - u1.y)).r;
  vec2 u = iu + off * (p1 - 0.55);
  vec2 st = vec2(u.x, 1.0 - u.y);
  vec3 c = texture2D(t, st).rgb;
  // nitidez suave para compensar la ampliación
  vec3 bl = (texture2D(t, st + vec2(texel.x, 0.0)).rgb + texture2D(t, st - vec2(texel.x, 0.0)).rgb +
             texture2D(t, st + vec2(0.0, texel.y)).rgb + texture2D(t, st - vec2(0.0, texel.y)).rgb) * 0.25;
  c += (c - bl) * 0.45 * clamp(cam.z - 0.6, 0.0, 1.0);

  // la brasa respira: resplandor vivo y luz que tiembla sobre lo cercano
  if (fuego.z > 0.0) {
    vec2 q = (u - fuego.xy) / fuego.zw;
    float g = exp(-dot(q, q) * 1.6);
    float lejos = exp(-dot(q * vec2(0.22, 0.12), q * vec2(0.22, 0.12)));
    c *= 1.0 + (llama - 0.5) * 0.16 * lejos;
    c += vec3(1.0, 0.42, 0.1) * g * (0.1 + llama * 0.22);

    // chispas que suben desde la brasa
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 g2 = vec2(u.x * 90.0, u.y * 50.0 + tiempo * (1.1 + fi * 0.45));
      vec2 celda = floor(g2);
      vec2 f = fract(g2) - 0.5;
      float h = hash(celda + fi * 17.0);
      if (h > 0.93) {
        vec2 p = (vec2(hash(celda + 3.1), hash(celda + 7.7)) - 0.5) * 0.6;
        p.x += sin(tiempo * 2.0 + h * 40.0) * 0.15;
        float s = smoothstep(0.11, 0.0, length(f - p));
        vec2 zq = (u - fuego.xy) / (fuego.zw * vec2(1.1, 6.0));
        float zona = exp(-zq.x * zq.x * 2.0) * smoothstep(0.02, -0.04, u.y - fuego.y) * exp(-max(0.0, -zq.y) * 1.2);
        c += vec3(1.0, 0.6, 0.25) * s * zona * (0.6 + 0.4 * sin(tiempo * 9.0 + h * 90.0));
      }
    }
  }

  // humo que se eleva desde el platillo
  if (humo.x > 0.0) {
    float alto = humo.y - u.y;
    float ancho = 0.012 + max(alto, 0.0) * 0.12;
    float dx = u.x - humo.x - sin(u.y * 14.0 + tiempo * 0.8) * 0.012 * alto * 6.0;
    float col = exp(-dx * dx / (ancho * ancho)) * smoothstep(0.0, 0.04, alto) * smoothstep(0.5, 0.12, alto);
    float n = fbm(vec2(u.x * 22.0, u.y * 9.0 + tiempo * 0.35));
    c += vec3(0.62, 0.57, 0.52) * col * smoothstep(0.35, 0.8, n) * 0.38;
  }
  return c;
}

void main() {
  vec3 a = capa(tA, dA, camA, visA, texelA, fuegoA, humoA);
  vec3 c = a;
  if (mezcla > 0.001) {
    vec3 b = capa(tB, dB, camB, visB, texelB, fuegoB, humoB);
    c = mix(a, b, mezcla);
  }
  // gradación cálida, viñeta y grano de película
  c = pow(c, vec3(0.97, 1.0, 1.05));
  vec2 v = vUv - 0.5;
  c *= 1.0 - dot(v, v) * 0.9;
  c += (hash(vUv * 900.0 + fract(tiempo * 7.0)) - 0.5) * 0.035;
  gl_FragColor = vec4(c, 1.0);
}
`

const suavizar = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function aCam(v: Vista, img: Imagen): Cam {
  return { x: v.x / img.ancho, y: v.y / img.alto, z: v.zoom }
}

type Tween = { desde: Cam; hasta: Cam; t0: number; dur: number }
const lerpCam = (tw: Tween, t: number): Cam => {
  const k = suavizar(Math.min(1, Math.max(0, (t - tw.t0) / tw.dur)))
  return {
    x: tw.desde.x + (tw.hasta.x - tw.desde.x) * k,
    y: tw.desde.y + (tw.hasta.y - tw.desde.y) * k,
    z: tw.desde.z * Math.pow(tw.hasta.z / tw.desde.z, k),
  }
}

export function Escena({ sala }: { sala: Sala }) {
  const { size, gl } = useThree()
  const texturas = useLoader(THREE.TextureLoader, sala.escena.flatMap((i) => [i.src, i.prof]))
  texturas.forEach((t) => {
    t.minFilter = THREE.LinearFilter
    t.generateMipmaps = false
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
  })
  const tex = (i: number) => texturas[i * 2]
  const prof = (i: number) => texturas[i * 2 + 1]

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        depthTest: false,
        uniforms: {
          tA: { value: null }, dA: { value: null }, tB: { value: null }, dB: { value: null },
          camA: { value: new THREE.Vector3(0.5, 0.5, 1) }, camB: { value: new THREE.Vector3(0.5, 0.5, 1) },
          visA: { value: new THREE.Vector2(1, 1) }, visB: { value: new THREE.Vector2(1, 1) },
          texelA: { value: new THREE.Vector2() }, texelB: { value: new THREE.Vector2() },
          fuegoA: { value: new THREE.Vector4() }, fuegoB: { value: new THREE.Vector4() },
          humoA: { value: new THREE.Vector2() }, humoB: { value: new THREE.Vector2() },
          mezcla: { value: 0 }, tiempo: { value: 0 }, llama: { value: 0.5 },
          par: { value: new THREE.Vector2() },
        },
      }),
    [],
  )

  // capas A (visible) y B (entrando en un fundido)
  const est = useRef({
    a: { img: 0, tw: null as Tween | null, cam: aCam(sala.vistas[0], sala.escena[0]) },
    b: { img: 0, tw: null as Tween | null, cam: aCam(sala.vistas[0], sala.escena[0]) },
    mezcla: null as Tween | null,
    vista: sala.vistas[0].id,
    raton: new THREE.Vector2(),
    par: new THREE.Vector2(),
    pan: 0,
  })

  // ratón y dedo: paralaje con el puntero, arrastre para mirar a los lados
  useEffect(() => {
    const el = gl.domElement
    let abajo: { x: number; pan: number } | null = null
    const mover = (e: PointerEvent) => {
      est.current.raton.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
      if (abajo) {
        const vis = camara.visible.x / est.current.a.cam.z
        est.current.pan = THREE.MathUtils.clamp(abajo.pan - ((e.clientX - abajo.x) / window.innerWidth) * vis, -0.5, 0.5)
      }
    }
    const bajar = (e: PointerEvent) => (abajo = { x: e.clientX, pan: est.current.pan })
    const subir = () => (abajo = null)
    window.addEventListener('pointermove', mover)
    el.addEventListener('pointerdown', bajar)
    window.addEventListener('pointerup', subir)
    return () => {
      window.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerdown', bajar)
      window.removeEventListener('pointerup', subir)
    }
  }, [gl])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const s = est.current
    const u = mat.uniforms

    // ¿cambió la toma pedida?
    const pedida = getEstado().vista
    if (pedida !== s.vista) {
      const v = sala.vistas.find((x) => x.id === pedida)
      if (v) {
        s.vista = pedida
        s.pan = 0
        const destino = aCam(v, sala.escena[v.img])
        if (s.mezcla) {
          // si había un fundido a medias, se consolida primero
          s.a = { ...s.b }
          s.mezcla = null
        }
        if (v.img === s.a.img) {
          s.a.tw = { desde: { ...s.a.cam }, hasta: destino, t0: t, dur: 2.6 }
        } else {
          // la cámara empuja hacia adelante mientras el siguiente render aparece
          s.a.tw = { desde: { ...s.a.cam }, hasta: { ...s.a.cam, z: s.a.cam.z * 1.45 }, t0: t, dur: 2.4 }
          s.b = { img: v.img, cam: { ...destino, z: destino.z * 0.88 }, tw: null }
          s.b.tw = { desde: { ...destino, z: destino.z * 0.88 }, hasta: destino, t0: t + 0.3, dur: 2.8 }
          s.mezcla = { desde: { x: 0, y: 0, z: 1 }, hasta: { x: 1, y: 0, z: 1 }, t0: t + 0.5, dur: 1.7 }
        }
      }
    }
    if (s.a.tw) s.a.cam = lerpCam(s.a.tw, t)
    if (s.b.tw) s.b.cam = lerpCam(s.b.tw, t)
    let mezcla = 0
    if (s.mezcla) {
      mezcla = lerpCam(s.mezcla, t).x
      if (t > s.mezcla.t0 + s.mezcla.dur && (!s.b.tw || t > s.b.tw.t0 + s.b.tw.dur)) {
        s.a = { ...s.b }
        s.mezcla = null
        mezcla = 0
      }
    }

    // paralaje: puntero suavizado más una órbita lenta, como un travelling
    const objetivo = new THREE.Vector2(
      s.raton.x * 0.75 + Math.sin(t * 0.21) * 0.45,
      -s.raton.y * 0.45 + Math.cos(t * 0.17) * 0.25,
    )
    s.par.lerp(objetivo, 0.035)

    const aspVista = size.width / size.height
    const ajustar = (capa: { img: number; cam: Cam }, uCam: THREE.Vector3, uVis: THREE.Vector2, uTexel: THREE.Vector2, uFuego: THREE.Vector4, uHumo: THREE.Vector2, uT: string, uD: string, conPan: boolean) => {
      const im = sala.escena[capa.img]
      const aspImg = im.ancho / im.alto
      const vis = aspVista > aspImg ? new THREE.Vector2(1, aspImg / aspVista) : new THREE.Vector2(aspVista / aspImg, 1)
      // respiración lenta del zoom
      const z = Math.max(1.04, capa.cam.z * (1.02 + Math.sin(t * 0.12) * 0.015))
      const mx = vis.x / z / 2 + 0.012, my = vis.y / z / 2 + 0.012
      const x = THREE.MathUtils.clamp(capa.cam.x + (conPan ? s.pan : 0), mx, 1 - mx)
      const y = THREE.MathUtils.clamp(capa.cam.y, my, 1 - my)
      uCam.set(x, y, z)
      uVis.copy(vis)
      uTexel.set(1 / im.ancho, 1 / im.alto)
      if (im.fuego) uFuego.set(im.fuego[0] / im.ancho, im.fuego[1] / im.alto, im.fuego[2] / im.ancho, im.fuego[3] / im.alto)
      else uFuego.set(0, 0, 0, 0)
      if (im.humo) uHumo.set(im.humo[0] / im.ancho, im.humo[1] / im.alto)
      else uHumo.set(0, 0)
      u[uT].value = tex(capa.img)
      u[uD].value = prof(capa.img)
      return { x, y, z, vis }
    }
    const ra = ajustar(s.a, u.camA.value, u.visA.value, u.texelA.value, u.fuegoA.value, u.humoA.value, 'tA', 'dA', true)
    ajustar(s.b, u.camB.value, u.visB.value, u.texelB.value, u.fuegoB.value, u.humoB.value, 'tB', 'dB', false)
    u.mezcla.value = mezcla
    u.tiempo.value = t
    u.llama.value = 0.5 + Math.sin(t * 7.3) * 0.18 + Math.sin(t * 13.7 + 1) * 0.12 + Math.sin(t * 2.3) * 0.2
    u.par.value.copy(s.par)

    camara.img = s.a.img
    camara.cam = { x: ra.x, y: ra.y, z: ra.z }
    camara.mezcla = mezcla
    camara.ancho = size.width
    camara.alto = size.height
    camara.visible = { x: ra.vis.x, y: ra.vis.y }
  })

  return (
    <mesh frustumCulled={false} material={mat}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}
