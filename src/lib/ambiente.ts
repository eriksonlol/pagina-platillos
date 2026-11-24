// Sonido ambiente de brasa generado en el navegador (sin archivos):
// un rumor grave filtrado y chasquidos aleatorios de leña.

let ctx: AudioContext | null = null
let master: GainNode | null = null

export function iniciarAmbiente() {
  if (ctx) return
  ctx = new AudioContext()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)
  master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3)

  // Rumor: ruido marrón con paso bajo
  const largo = ctx.sampleRate * 4
  const buf = ctx.createBuffer(1, largo, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let ult = 0
  for (let i = 0; i < largo; i++) {
    ult = (ult + 0.02 * (Math.random() * 2 - 1)) / 1.02
    d[i] = ult * 3.2
  }
  const rumor = ctx.createBufferSource()
  rumor.buffer = buf
  rumor.loop = true
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 420
  const g = ctx.createGain()
  g.gain.value = 0.35
  rumor.connect(lp).connect(g).connect(master)
  rumor.start()

  const chasquido = () => {
    if (!ctx || !master) return
    const n = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate)
    const c = n.getChannelData(0)
    for (let i = 0; i < c.length; i++) c[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / c.length, 4)
    const s = ctx.createBufferSource()
    s.buffer = n
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1800 + Math.random() * 3000
    const gg = ctx.createGain()
    gg.gain.value = 0.05 + Math.random() * 0.18
    s.connect(bp).connect(gg).connect(master)
    s.start()
    setTimeout(chasquido, 80 + Math.random() * (Math.random() < 0.3 ? 200 : 1400))
  }
  chasquido()
}

export function volumenAmbiente(v: number) {
  if (ctx && master) master.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.6)
}
