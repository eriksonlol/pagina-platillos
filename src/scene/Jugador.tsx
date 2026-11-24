import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { getEstado, setEstado, type Foco } from '../lib/store'
import { ATRIL, OBRA, RX, RZ } from './Sala01'

// Recorrido en primera persona:
// - arrastrar (ratón o dedo) para mirar
// - W A S D o flechas para caminar
// - clic o toque en el piso para ir a ese punto

const OJOS = 1.62
const VEL = 2.2

export function Jugador() {
  const { camera, gl } = useThree()
  const yaw = useRef(0)
  const pitch = useRef(-0.08)
  const teclas = useRef(new Set<string>())
  const pos = useRef(new THREE.Vector3(0, OJOS, 5.9))
  const paso = useRef(0)
  const cercaPrev = useRef<Foco>(null)

  // ?vista=x,z,giro para abrir en un punto concreto (útil para revisar la sala)
  useEffect(() => {
    const v = new URLSearchParams(location.search).get('vista')?.split(',').map(Number)
    if (v && v.length >= 2 && v.every(Number.isFinite)) {
      pos.current.set(v[0], OJOS, v[1])
      if (v[2] !== undefined) yaw.current = v[2]
      if (v[3] !== undefined) pitch.current = v[3]
    }
  }, [])

  useEffect(() => {
    const el = gl.domElement
    let abajo = false
    let lx = 0, ly = 0
    const down = (e: PointerEvent) => {
      abajo = true
      lx = e.clientX
      ly = e.clientY
    }
    const move = (e: PointerEvent) => {
      if (!abajo || getEstado().panel) return
      const k = e.pointerType === 'touch' ? 0.006 : 0.0035
      yaw.current += (e.clientX - lx) * k
      pitch.current = THREE.MathUtils.clamp(pitch.current + (e.clientY - ly) * k, -1.1, 0.9)
      lx = e.clientX
      ly = e.clientY
    }
    const up = () => (abajo = false)
    const kd = (e: KeyboardEvent) => {
      if (getEstado().panel) return
      teclas.current.add(e.code)
      if (e.code.startsWith('Arrow')) e.preventDefault()
      setEstado({ caminarA: null })
    }
    const ku = (e: KeyboardEvent) => teclas.current.delete(e.code)
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)
    window.addEventListener('blur', () => teclas.current.clear())
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
    }
  }, [gl])

  useFrame((_, dtBruto) => {
    const dt = Math.min(dtBruto, 0.05)
    const t = teclas.current
    const adelante = (t.has('KeyW') || t.has('ArrowUp') ? 1 : 0) - (t.has('KeyS') || t.has('ArrowDown') ? 1 : 0)
    const lado = (t.has('KeyD') ? 1 : 0) - (t.has('KeyA') ? 1 : 0)
    yaw.current += ((t.has('ArrowLeft') ? 1 : 0) - (t.has('ArrowRight') ? 1 : 0)) * dt * 1.6

    const fw = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current))
    const der = new THREE.Vector3(-fw.z, 0, fw.x)
    const mov = new THREE.Vector3()
    mov.addScaledVector(fw, adelante).addScaledVector(der, lado)

    const meta = getEstado().caminarA
    if (meta && mov.lengthSq() === 0) {
      const d = new THREE.Vector3(meta[0] - pos.current.x, 0, meta[1] - pos.current.z)
      if (d.length() < 0.15) setEstado({ caminarA: null })
      else {
        mov.copy(d.normalize())
        // girar la vista suavemente hacia donde se camina
        const objetivo = Math.atan2(-d.x, -d.z)
        const dif = Math.atan2(Math.sin(objetivo - yaw.current), Math.cos(objetivo - yaw.current))
        yaw.current += dif * Math.min(1, dt * 2.5)
      }
    }

    if (mov.lengthSq() > 0 && !getEstado().panel) {
      mov.normalize().multiplyScalar(VEL * dt)
      const p = pos.current.clone().add(mov)
      // dentro de la cueva
      const e = Math.hypot(p.x / (RX - 0.7), p.z / (RZ - 0.7))
      if (e > 1) {
        p.x /= e
        p.z /= e
      }
      // sin atravesar el pedestal ni el atril
      for (const [c, r] of [[OBRA, 1.05], [ATRIL, 0.45]] as const) {
        const dx = p.x - c.x, dz = p.z - c.z
        const dd = Math.hypot(dx, dz)
        if (dd < r) {
          p.x = c.x + (dx / dd) * r
          p.z = c.z + (dz / dd) * r
          if (meta && Math.hypot(meta[0] - c.x, meta[1] - c.z) < r + 0.2) setEstado({ caminarA: null })
        }
      }
      paso.current += mov.length() * 5
      pos.current.copy(p)
    }

    camera.position.set(pos.current.x, OJOS + Math.sin(paso.current) * 0.025, pos.current.z)
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')

    // ¿qué tenemos cerca?
    const dObra = Math.hypot(pos.current.x - OBRA.x, pos.current.z - OBRA.z)
    const dAtril = Math.hypot(pos.current.x - ATRIL.x, pos.current.z - ATRIL.z)
    let cerca: Foco = null
    if (dAtril < 1.7 && dAtril < dObra) cerca = 'atril'
    else if (dObra < 2.6) cerca = 'obra'
    if (cerca !== cercaPrev.current) {
      cercaPrev.current = cerca
      setEstado({ cerca })
    }
  })

  return null
}
