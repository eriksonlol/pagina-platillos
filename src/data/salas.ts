// Contenido curatorial de cada sala. Fuente: Dossier curatorial "Del fuego al lienzo".
// Para agregar una sala nueva basta con sumar un objeto a este arreglo.

/** Coordenadas en píxeles de la imagen (origen arriba a la izquierda). */
export type Imagen = {
  src: string
  prof: string // mapa de profundidad en escala de grises (blanco = cerca)
  ancho: number
  alto: number
  fuego?: [number, number, number, number] // centro y radios del resplandor
  humo?: [number, number] // origen de la columna de humo
}
export type Vista = { id: string; nombre: string; img: number; x: number; y: number; zoom: number; nota?: string }
export type Punto = { id: string; img: number; x: number; y: number; etiqueta: string; accion: 'vista' | 'ficha' | 'audio' | 'siguiente'; vista?: string }

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
  /** Ruta del audio grabado. Si es null se usa una voz provisional del navegador. */
  audio: string | null
  imagenes: { src: string; pie: string }[]
  siguiente?: string
  /** Renders que forman la sala y tomas de cámara sobre ellos. */
  escena: Imagen[]
  vistas: Vista[]
  puntos: Punto[]
  /** Cambios de toma durante el recorrido guiado: frase del guion donde empieza cada toma. */
  guia: { frase: string; vista: string }[]
}

export const salas: Sala[] = [
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
    audio: null,
    imagenes: [
      { src: 'salas/01/platillo.webp', pie: 'Brasa primigenia. Imagen generada con Gemini.' },
      { src: 'salas/01/espacio.webp', pie: 'Concepto espacial de la sala. Imagen generada con Gemini.' },
    ],
    siguiente: 'Mesopotamia',
    escena: [
      { src: 'salas/01/espacio.webp', prof: 'salas/01/espacio-prof.png', ancho: 1376, alto: 768, fuego: [682, 462, 170, 34], humo: [700, 405] },
      { src: 'salas/01/platillo.webp', prof: 'salas/01/platillo-prof.png', ancho: 1376, alto: 768, fuego: [560, 150, 300, 140] },
    ],
    vistas: [
      { id: 'sala', nombre: 'La sala', img: 0, x: 688, y: 384, zoom: 1 },
      { id: 'obra', nombre: 'La obra', img: 0, x: 680, y: 450, zoom: 1.9 },
      { id: 'platillo', nombre: 'El platillo', img: 1, x: 688, y: 430, zoom: 1.15 },
      { id: 'pinturas', nombre: 'Pinturas', img: 0, x: 250, y: 290, zoom: 1.6, nota: 'La paleta de la obra sale de estos muros: ocre, rojo de hierro y negro de carbón.' },
      { id: 'atril', nombre: 'Atril', img: 0, x: 858, y: 545, zoom: 2.2 },
      { id: 'arco', nombre: 'Siguiente sala', img: 0, x: 922, y: 330, zoom: 1.9, nota: 'Por este arco se pasa a la Sala 2, Mesopotamia. Próximamente.' },
    ],
    puntos: [
      { id: 'obra', img: 0, x: 692, y: 425, etiqueta: 'Brasa primigenia', accion: 'vista', vista: 'platillo' },
      { id: 'atril', img: 0, x: 858, y: 620, etiqueta: 'Audioguía', accion: 'audio' },
      { id: 'pinturas', img: 0, x: 175, y: 250, etiqueta: 'Pinturas rupestres', accion: 'vista', vista: 'pinturas' },
      { id: 'arco', img: 0, x: 922, y: 300, etiqueta: 'Sala 2 · Mesopotamia', accion: 'vista', vista: 'arco' },
      { id: 'ficha', img: 1, x: 700, y: 360, etiqueta: 'Ver ficha de la obra', accion: 'ficha' },
    ],
    guia: [
      { frase: 'Bienvenido al origen', vista: 'sala' },
      { frase: 'Mira la losa', vista: 'obra' },
      { frase: 'Ahora sigue la diagonal', vista: 'platillo' },
      { frase: 'La paleta es la de las cuevas', vista: 'pinturas' },
      { frase: 'Nada está disfrazado', vista: 'platillo' },
      { frase: 'Aquí comienza el montaje', vista: 'sala' },
    ],
  },
]
