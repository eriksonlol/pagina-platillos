// Contenido curatorial de cada sala. Fuente: Dossier curatorial "Del fuego al lienzo".
// La Sala 1 se escribió a mano; las salas 2 a 12 están en salas-resto.ts.
import { salasResto } from './salas-resto'

/**
 * Cada escena es un render de Gemini partido en capas (fondo, pedestal, atril...).
 * Cada capa lleva un mapa de profundidad (blanco = cerca) con el que se levanta en 3D.
 * Los puntos se dan en píxeles del render y con su cercanía `n` (0 lejos, 1 cerca).
 */
export type Capa = { src: string; prof: string; caja?: [number, number, number, number]; malla?: [number, number] }
export type Escena = {
  ancho: number
  alto: number
  fov: number // campo de visión vertical estimado del render
  escala: number // distancia (m) de un punto con cercanía 1
  capas: Capa[]
  fuego?: [number, number, number, number] // resplandor de la brasa (centro y radios, px)
  humo?: [number, number, number] // origen del humo (px y cercanía)
}
export type P3 = [number, number, number] // x, y en píxeles del render y cercanía n
export type Vista = {
  id: string
  nombre: string
  escena: string
  pos: [number, number, number] // posición de la cámara en metros
  mira: P3
  fov?: number
  libertad?: number // cuánto se mueve la cámara con el cursor
  nota?: string
}
export type Punto = { id: string; escena: string; en: P3; etiqueta: string; accion: 'vista' | 'audio' | 'sala'; vista?: string; sala?: number }
/** `palabra`: fragmento del guion que, al sonar, enciende este elemento durante el recorrido guiado. */
export type Elemento = { en: P3; texto: string; lado: 'izq' | 'der'; palabra?: string }

export type Sala = {
  numero: number
  slug: string
  acto: string
  nombre: string
  periodo: string
  lema: string
  obra: string
  analisis: string
  contexto: string
  ingredientes: string[]
  guion: string
  /**
   * Ruta del audio grabado (salas/NN/audioguia.mp3). Si el archivo no existe todavía,
   * se usa una voz provisional del navegador con subtítulos.
   */
  audio: string | null
  imagenes: { src: string; pie: string }[]
  siguiente?: string
  /** Escenas, tomas de cámara y puntos interactivos */
  escenas: Record<string, Escena>
  vistas: Vista[]
  puntos: Punto[]
  /** Paneles flotantes junto a la obra: anclados a puntos de la sala */
  paneles: { vista: string; izq: P3; der: P3 }
  /** Elementos del platillo señalados en la vista de cerca */
  elementos: Elemento[]
  /** Claves de composición que flotan en la vista de cerca */
  claves: { titulo: string; texto: string }[]
  /** Cambios de toma durante el recorrido guiado: frase del guion donde empieza cada toma. */
  guia: { frase: string; vista: string }[]
}

const sala1: Sala =
  {
    numero: 1,
    slug: 'prehistoria',
    acto: 'Acto I · La superficie',
    nombre: 'Prehistoria',
    periodo: 'Paleolítico y Neolítico',
    lema: 'El origen, el fuego y las superficies orgánicas',
    obra: 'Brasa primigenia',
    analisis:
      'El punto focal es la costilla, colocada en diagonal sobre la losa para sugerir movimiento y peso. El equilibrio es asimétrico: la masa de la carne se compensa con tubérculos pequeños dispersos en el lado opuesto. El ritmo es irregular, como los restos de una fogata. La altura es mínima, casi a ras de piedra, y las texturas contrastan lo crujiente de la corteza con lo terroso del polvo. La paleta reúne ocres, rojos de hierro y negros de carbón, con un único acento verde.',
    contexto:
      'En el Paleolítico no existía el plato individual. El alimento se colocaba sobre piedras calientes, hojas o cortezas, y el fuego era el verdadero centro de la mesa. Comer alrededor del hogar reunía al grupo y repartía la caza según una jerarquía de acceso. Por eso la obra se sirve sobre una losa volcánica, soporte que retiene el calor y evoca la superficie original. No hay cubiertos: el gesto de tomar con las manos forma parte del protocolo. La reinterpretación conserva la exposición directa del alimento, que muestra su origen sin disfrazarlo, y la traduce a técnicas actuales como la maduración en ceniza y el humo capturado bajo campana.',
    ingredientes: [
      'Costilla de res madurada en ceniza vegetal',
      'Tubérculos asados en brasa',
      'Tierra comestible de cacao y carbón activado',
      'Hierbas silvestres',
      'Humo de encino',
    ],
    guion:
      'Bienvenido al origen. Antes de los platos, antes de la mesa, hubo fuego. Mira la losa de piedra volcánica: es el primer soporte de la historia. Ahora sigue la diagonal de la costilla. Esa línea es el centro de todo, como lo fue la pieza de caza para el grupo que se reunía alrededor de la hoguera. Observa los tubérculos dispersos del otro lado: equilibran el peso sin ordenarse, igual que los restos de un fuego que se apaga. La paleta es la de las cuevas: ocre, rojo y negro de carbón. Nada está disfrazado. El alimento se muestra tal como es, con la huella del fuego en su superficie. Aquí comienza el montaje: no en el plato, sino en el lugar donde comer se volvió un acto compartido.',
    audio: 'salas/01/audioguia.mp3',
    imagenes: [
      { src: 'salas/01/platillo.webp', pie: 'Brasa primigenia. Imagen generada con Gemini.' },
      { src: 'salas/01/espacio.webp', pie: 'Concepto espacial de la sala. Imagen generada con Gemini.' },
    ],
    siguiente: 'Mesopotamia',
    escenas: {
      sala: {
        ancho: 1376, alto: 768, fov: 50, escala: 3.2,
        capas: [
          { src: 'salas/01/sala-fondo.webp', prof: 'salas/01/sala-fondo-prof.png', caja: [-0.1, -0.1, 1.1, 1.1], malla: [300, 180] },
          { src: 'salas/01/sala-pedestal.webp', prof: 'salas/01/sala-pedestal-prof.png', caja: [0.34, 0.51, 0.65, 0.89], malla: [140, 110] },
          { src: 'salas/01/sala-atril.webp', prof: 'salas/01/sala-atril-prof.png', caja: [0.58, 0.64, 0.67, 0.93], malla: [40, 80] },
        ],
        fuego: [682, 462, 170, 34],
        humo: [700, 405, 0.75],
      },
      platillo: {
        ancho: 1376, alto: 768, fov: 46, escala: 1.0,
        capas: [
          { src: 'salas/01/platillo-fondo.webp', prof: 'salas/01/platillo-fondo-prof.png', caja: [-0.1, -0.1, 1.1, 1.1], malla: [200, 120] },
          { src: 'salas/01/platillo-plato.webp', prof: 'salas/01/platillo-plato-prof.png', caja: [0.09, 0.38, 0.95, 0.97], malla: [220, 130] },
        ],
        fuego: [560, 150, 300, 140],
      },
    },
    vistas: [
      { id: 'sala', nombre: 'La sala', escena: 'sala', pos: [0, 0, 0], mira: [688, 400, 0.3], fov: 42 },
      { id: 'obra', nombre: 'La obra', escena: 'sala', pos: [0.05, 0.45, -1.55], mira: [690, 448, 0.74], fov: 46, libertad: 0.6 },
      { id: 'platillo', nombre: 'El platillo', escena: 'platillo', pos: [0, 0.2, -0.1], mira: [690, 430, 0.84], fov: 46, libertad: 0.5 },
      { id: 'pinturas', nombre: 'Pinturas', escena: 'sala', pos: [-0.35, 0.05, -0.9], mira: [390, 300, 0.48], fov: 40, libertad: 0.7, nota: 'La paleta de la obra sale de estos muros: ocre, rojo de hierro y negro de carbón.' },
      { id: 'atril', nombre: 'Atril', escena: 'sala', pos: [0.45, 0.1, -1.3], mira: [858, 540, 0.86], fov: 40 },
      { id: 'arco', nombre: 'Siguiente sala', escena: 'sala', pos: [0.55, 0, -1.6], mira: [922, 330, 0.38], fov: 40, nota: 'Cruza para pasar a la Sala 2, Mesopotamia.' },
    ],
    puntos: [
      { id: 'obra', escena: 'sala', en: [700, 418, 0.75], etiqueta: 'Brasa primigenia', accion: 'vista', vista: 'obra' },
      { id: 'atril', escena: 'sala', en: [858, 610, 0.86], etiqueta: 'Audioguía', accion: 'audio' },
      { id: 'pinturas', escena: 'sala', en: [175, 250, 0.6], etiqueta: 'Pinturas rupestres', accion: 'vista', vista: 'pinturas' },
      { id: 'arco', escena: 'sala', en: [922, 300, 0.38], etiqueta: 'Sala 2 · Mesopotamia', accion: 'sala', sala: 2 },
    ],
    paneles: { vista: 'obra', izq: [515, 478, 0.74], der: [855, 478, 0.74] },
    elementos: [
      { en: [700, 345, 0.84], texto: 'Costilla madurada en ceniza vegetal', lado: 'izq', palabra: 'diagonal de la costilla' },
      { en: [1030, 480, 0.86], texto: 'Tubérculos asados en brasa', lado: 'der', palabra: 'tubérculos' },
      { en: [430, 565, 0.9], texto: 'Tierra de cacao y carbón activado', lado: 'izq' },
      { en: [1075, 420, 0.84], texto: 'Hierbas silvestres', lado: 'der' },
      { en: [780, 515, 0.87], texto: 'Humo de encino', lado: 'der', palabra: 'huella del fuego' },
    ],
    claves: [
      { titulo: 'Punto focal', texto: 'La costilla, en diagonal sobre la losa' },
      { titulo: 'Equilibrio', texto: 'Asimétrico: la carne contra los tubérculos' },
      { titulo: 'Ritmo', texto: 'Irregular, como los restos de una fogata' },
      { titulo: 'Altura', texto: 'Mínima, casi a ras de piedra' },
      { titulo: 'Paleta', texto: 'Ocre, rojo de hierro, negro de carbón y un acento verde' },
    ],
    guia: [
      { frase: 'Bienvenido al origen', vista: 'sala' },
      { frase: 'Mira la losa', vista: 'obra' },
      { frase: 'Ahora sigue la diagonal', vista: 'platillo' },
      { frase: 'La paleta es la de las cuevas', vista: 'pinturas' },
      { frase: 'Nada está disfrazado', vista: 'platillo' },
      { frase: 'Aquí comienza el montaje', vista: 'sala' },
    ],
}

export const salas: Sala[] = [sala1, ...salasResto]
