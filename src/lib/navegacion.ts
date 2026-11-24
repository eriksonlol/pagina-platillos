import { detener } from './audioguia'
import { getEstado, setEstado } from './store'
import { camara } from '../scene/Escena'

// Cambio de sala: la imagen se funde a negro, se carga la sala nueva y vuelve a abrir.
let velo: HTMLDivElement | null = null
export const registrarVelo = (el: HTMLDivElement | null) => (velo = el)

export function irASala(n: number) {
  if (n === getEstado().sala) return setEstado({ panel: null, vista: 'sala' })
  detener()
  camara.inclina = null
  if (velo) {
    velo.style.transition = 'opacity .7s ease'
    velo.style.opacity = '1'
  }
  setTimeout(() => {
    history.replaceState(null, '', `#sala-${n}`)
    setEstado({ sala: n, vista: 'sala', panel: null, resaltado: null })
    setTimeout(() => {
      if (!velo) return
      velo.style.transition = 'opacity 1.4s ease'
      velo.style.opacity = '0'
      setTimeout(() => velo && (velo.style.transition = ''), 1500)
    }, 650)
  }, 720)
}
