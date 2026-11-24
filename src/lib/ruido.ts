// Ruido de valor 3D y texturas procedurales (roca, losas) dibujadas en canvas.
import * as THREE from 'three'

function hash(x: number, y: number, z: number) {
  let h = x * 374761393 + y * 668265263 + z * 2147483647
  h = (h ^ (h >> 13)) * 1274126177
  return ((h ^ (h >> 16)) & 0xffff) / 0xffff
}
const suave = (t: number) => t * t * (3 - 2 * t)

export function ruido3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = suave(x - xi), yf = suave(y - yi), zf = suave(z - zi)
  const l = (a: number, b: number, t: number) => a + (b - a) * t
  const c = (dx: number, dy: number, dz: number) => hash(xi + dx, yi + dy, zi + dz)
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), xf), l(c(0, 1, 0), c(1, 1, 0), xf), yf),
    l(l(c(0, 0, 1), c(1, 0, 1), xf), l(c(0, 1, 1), c(1, 1, 1), xf), yf),
    zf,
  )
}

export function fbm(x: number, y: number, z: number, oct = 4) {
  let s = 0, a = 0.5, f = 1
  for (let i = 0; i < oct; i++) {
    s += a * ruido3(x * f, y * f, z * f)
    f *= 2.03
    a *= 0.5
  }
  return s // ~0..1
}

/** Desplaza los vértices de una geometría a lo largo de su normal. */
export function rugosidad(geo: THREE.BufferGeometry, escala: number, amp: number, semilla = 0) {
  geo.computeVertexNormals()
  const p = geo.attributes.position
  const n = geo.attributes.normal
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i)
    const d = (fbm(x * escala + semilla, y * escala, z * escala) - 0.5) * 2 * amp
    p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d, z + n.getZ(i) * d)
  }
  geo.computeVertexNormals()
  return geo
}

function lienzo(tam: number, pintar: (img: ImageData) => void) {
  const c = document.createElement('canvas')
  c.width = c.height = tam
  const ctx = c.getContext('2d')!
  const img = ctx.createImageData(tam, tam)
  pintar(img)
  ctx.putImageData(img, 0, 0)
  return c
}

/** Textura de roca volcánica: tonos pardos con vetas y poros. */
export function texturaRoca(tam = 512, tono: [number, number, number] = [62, 48, 38]) {
  const c = lienzo(tam, (img) => {
    for (let y = 0; y < tam; y++)
      for (let x = 0; x < tam; x++) {
        const u = x / tam, v = y / tam
        // ruido periódico combinando dos muestras para que la textura se repita sin costuras
        const n = fbm(Math.cos(u * Math.PI * 2) * 3 + 10, Math.sin(u * Math.PI * 2) * 3, v * 18, 5)
        const poro = ruido3(x * 0.35, y * 0.35, 7) > 0.86 ? -22 : 0
        const k = 0.55 + n * 0.9
        const i = (y * tam + x) * 4
        img.data[i] = tono[0] * k + poro
        img.data[i + 1] = tono[1] * k + poro
        img.data[i + 2] = tono[2] * k + poro
        img.data[i + 3] = 255
      }
  })
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

/** Piso de lajas irregulares (diagrama de Voronoi con juntas oscuras). */
export function texturaLajas(tam = 512, celdas = 26) {
  const pts: [number, number, number][] = []
  for (let i = 0; i < celdas; i++) pts.push([hash(i, 1, 3) * tam, hash(i, 7, 9) * tam, 0.75 + hash(i, 4, 4) * 0.4])
  const c = lienzo(tam, (img) => {
    for (let y = 0; y < tam; y++)
      for (let x = 0; x < tam; x++) {
        let d1 = 1e9, d2 = 1e9, k = 1
        for (const [px, py, pk] of pts)
          for (let ox = -1; ox <= 1; ox++)
            for (let oy = -1; oy <= 1; oy++) {
              const dx = x - (px + ox * tam), dy = y - (py + oy * tam)
              const d = dx * dx + dy * dy
              if (d < d1) { d2 = d1; d1 = d; k = pk } else if (d < d2) d2 = d
            }
        const borde = Math.sqrt(d2) - Math.sqrt(d1)
        const junta = Math.min(1, borde / 5)
        const n = 0.75 + fbm(x * 0.03, y * 0.03, 2, 4) * 0.5
        const v = (34 + 26 * k * n) * (0.25 + 0.75 * junta)
        const i = (y * tam + x) * 4
        img.data[i] = v * 1.05
        img.data[i + 1] = v * 0.95
        img.data[i + 2] = v * 0.85
        img.data[i + 3] = 255
      }
  })
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** Mancha radial suave para humo, brillos y chispas. */
export function texturaHalo(tam = 128) {
  const c = document.createElement('canvas')
  c.width = c.height = tam
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(tam / 2, tam / 2, 0, tam / 2, tam / 2, tam / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, tam, tam)
  return new THREE.CanvasTexture(c)
}
