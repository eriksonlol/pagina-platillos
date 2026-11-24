// Generado por herramientas/datos_salas.py a partir del dossier. Para corregir textos o
// tomas se puede editar aquí directamente o en el script y volver a generarlo.
import type { Sala } from './salas'

export const salasResto: Sala[] = [
  {
    "numero": 2,
    "slug": "mesopotamia",
    "acto": "Acto I · La superficie",
    "nombre": "Mesopotamia",
    "periodo": "c. 3500 – 539 a. C.",
    "lema": "Arcilla, geometría inicial y sazón ancestral",
    "obra": "Registro de Ur",
    "analisis": "La obra se lee en franjas paralelas, como los registros de un friso. El punto focal es el cordero, en la banda central; arriba y abajo, dátiles y cebada repiten un ritmo regular. El equilibrio es simétrico respecto al eje horizontal. La altura crece en un pequeño escalonamiento final que evoca el zigurat. Las texturas pasan de lo brillante del guiso a lo crujiente del cereal, y la paleta se limita a marrones del barro, dorados y un azul lapislázuli en el borde del soporte.",
    "contexto": "En Mesopotamia el templo y el palacio almacenaban y redistribuían el grano, de modo que comer era participar del orden divino. Las tablillas de Yale, hacia 1750 a. C., registran guisos de carne con cebolla, ajo, puerro y comino: las primeras recetas escritas. La arcilla lo era todo, desde la tablilla hasta el cuenco hecho al torno. El Estandarte de Ur muestra el banquete en registros jerárquicos, con el rey arriba y los sirvientes abajo. Por eso la obra se presenta sobre una placa de arcilla sin esmaltar y organizada en bandas. La cerveza, que se bebía con cañas desde vasijas compartidas, aparece como gel para recordar ese ritual colectivo.",
    "ingredientes": [
      "Guiso reducido de cordero con cebolla, ajo, puerro y comino",
      "Dátiles confitados",
      "Cebada inflada",
      "Pan plano de cebada",
      "Gel de cerveza artesanal"
    ],
    "guion": "Estás en la tierra entre dos ríos, donde la cocina se escribió por primera vez. Mira la placa de arcilla: el mismo material de las tablillas que guardaron las recetas más antiguas del mundo. Lee la obra como un friso, de arriba abajo. Cada franja es un registro, igual que en el Estandarte de Ur, donde el rey ocupa el nivel superior del banquete. En el centro, el cordero guisado con cebolla, ajo y comino. Arriba y abajo, dátiles y cebada repiten un ritmo regular, casi como una escritura. Al final, una pequeña elevación escalonada recuerda al zigurat. En esta sala el montaje aprende a ordenar: ya no se trata sólo de mostrar el alimento, sino de organizarlo en niveles que expresan jerarquía.",
    "audio": "salas/02/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/02/platillo.webp",
        "pie": "Registro de Ur. Imagen generada con Gemini."
      },
      {
        "src": "salas/02/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Egipto",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/02/sala-fondo.webp",
            "prof": "salas/02/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/02/sala-pedestal.webp",
            "prof": "salas/02/sala-pedestal-prof.png",
            "caja": [
              0.4026,
              0.6471,
              0.5967,
              0.8906
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/02/sala-atril.webp",
            "prof": "salas/02/sala-atril-prof.png",
            "caja": [
              0.6025,
              0.6406,
              0.6875,
              0.8737
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1408,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/02/platillo-fondo.webp",
            "prof": "salas/02/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/02/platillo-plato.webp",
            "prof": "salas/02/platillo-plato-prof.png",
            "caja": [
              0.108,
              0.2096,
              0.8906,
              0.9232
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          434,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          -0.14,
          -1.94
        ],
        "mira": [
          690,
          505,
          0.537
        ],
        "fov": 38,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          704,
          420,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.6,
          0.1,
          -2.49
        ],
        "mira": [
          888,
          550,
          0.489
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.0,
          0,
          -2.1
        ],
        "mira": [
          689,
          361,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 3, Egipto."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          460,
          0.537
        ],
        "etiqueta": "Registro de Ur",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          888,
          590,
          0.489
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          689,
          361,
          0.3
        ],
        "etiqueta": "Sala 3 · Egipto",
        "accion": "sala",
        "sala": 3
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        605,
        525,
        0.537
      ],
      "der": [
        775,
        525,
        0.537
      ]
    },
    "elementos": [
      {
        "en": [
          600,
          330,
          0.831
        ],
        "texto": "Guiso reducido de cordero con comino",
        "lado": "izq",
        "palabra": "cordero"
      },
      {
        "en": [
          712,
          350,
          0.804
        ],
        "texto": "Dátiles confitados",
        "lado": "der",
        "palabra": "dátiles"
      },
      {
        "en": [
          870,
          400,
          0.816
        ],
        "texto": "Cebada inflada",
        "lado": "der",
        "palabra": "cebada"
      },
      {
        "en": [
          455,
          470,
          0.835
        ],
        "texto": "Reducción del guiso",
        "lado": "izq"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "El cordero, en la banda central"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Simétrico respecto al eje horizontal"
      },
      {
        "titulo": "Ritmo",
        "texto": "Regular, en franjas como un friso"
      },
      {
        "titulo": "Altura",
        "texto": "Un escalonamiento final que evoca el zigurat"
      },
      {
        "titulo": "Paleta",
        "texto": "Marrón de barro, dorado y azul lapislázuli"
      }
    ],
    "guia": [
      {
        "frase": "Estás en la tierra",
        "vista": "sala"
      },
      {
        "frase": "Mira la placa",
        "vista": "obra"
      },
      {
        "frase": "Lee la obra",
        "vista": "platillo"
      },
      {
        "frase": "En esta sala el montaje",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 3,
    "slug": "egipto",
    "acto": "Acto I · La superficie",
    "nombre": "Egipto",
    "periodo": "c. 3100 – 30 a. C.",
    "lema": "Geometría sagrada, jerarquía y opulencia del Nilo",
    "obra": "Ofrenda para la eternidad",
    "analisis": "La obra es una torre simétrica levantada sobre un eje vertical. El punto focal es el remate dorado, que conduce la mirada de abajo arriba. El equilibrio es axial y perfecto: cada lado repite al otro. El ritmo lo marcan capas alternas de pan, pato e higo, con alturas regulares. Es la obra más alta del primer acto. Las texturas combinan lo crujiente del pan con lo brillante del confitado y lo translúcido del gel. La paleta sigue el código egipcio: azul del Nilo en el soporte, verde de la renovación y oro de lo divino.",
    "contexto": "Para los egipcios, el orden cósmico, llamado maat, se garantizaba también en la mesa. Las tumbas recibían ofrendas reales y pintadas para alimentar al difunto en la vida eterna. En pinturas como las de la tumba de Najt, en Tebas, los alimentos se apilan con simetría sobre mesas de ofrenda de piedra y se ordenan en registros. Ese apilamiento es el primer antecedente de la arquitectura de alimentos. La obra se presenta sobre cerámica azul que imita la fayenza, material vidriado asociado al Nilo y a la regeneración. Su vista frontal responde al protocolo de la época: la ofrenda se disponía para ser contemplada por dioses y difuntos, no sólo para comerse.",
    "ingredientes": [
      "Pan de espelta",
      "Pato confitado",
      "Higos frescos",
      "Uvas",
      "Gel de flor de loto",
      "Miel de dátil",
      "Polvo de oro comestible"
    ],
    "guion": "Estás frente a un altar. En Egipto, la comida no era sólo para los vivos: alimentaba la eternidad. Mira la obra de frente, como se miraban las ofrendas en las tumbas. Empieza por la base ancha de pan y sube despacio. Cada capa repite la anterior, a izquierda y derecha, en simetría perfecta. Así se apilaban los alimentos en las mesas de piedra pintadas en Tebas. Ahora detente en el remate dorado. El oro era la piel de los dioses, y aquí corona la construcción. Fíjate en el soporte azul: es el color del Nilo, el río que hacía posible esta abundancia. En esta sala el montaje se levanta por primera vez. El alimento ya no sólo se coloca: se construye hacia arriba, con un orden que es sagrado.",
    "audio": "salas/03/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/03/platillo.webp",
        "pie": "Ofrenda para la eternidad. Imagen generada con Gemini."
      },
      {
        "src": "salas/03/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "China antigua",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/03/sala-fondo.webp",
            "prof": "salas/03/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/03/sala-pedestal.webp",
            "prof": "salas/03/sala-pedestal-prof.png",
            "caja": [
              0.4142,
              0.4414,
              0.5858,
              0.7995
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/03/sala-atril.webp",
            "prof": "salas/03/sala-atril-prof.png",
            "caja": [
              0.6715,
              0.5521,
              0.7515,
              0.8086
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/03/platillo-fondo.webp",
            "prof": "salas/03/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/03/platillo-plato.webp",
            "prof": "salas/03/platillo-plato-prof.png",
            "caja": [
              0.0683,
              0.2201,
              0.936,
              0.8958
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          362,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.01,
          0.95,
          -2.83
        ],
        "mira": [
          690,
          380,
          0.352
        ],
        "fov": 26,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          385,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          1.23,
          0.1,
          -3.47
        ],
        "mira": [
          979,
          492,
          0.336
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.0,
          0,
          -2.1
        ],
        "mira": [
          688,
          325,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 4, China antigua."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          335,
          0.352
        ],
        "etiqueta": "Ofrenda para la eternidad",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          979,
          532,
          0.336
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          688,
          325,
          0.3
        ],
        "etiqueta": "Sala 4 · China antigua",
        "accion": "sala",
        "sala": 4
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        621,
        400,
        0.352
      ],
      "der": [
        760,
        400,
        0.352
      ]
    },
    "elementos": [
      {
        "en": [
          712,
          215,
          0.769
        ],
        "texto": "Higos frescos",
        "lado": "der"
      },
      {
        "en": [
          600,
          300,
          0.788
        ],
        "texto": "Pan de espelta",
        "lado": "izq",
        "palabra": "base ancha de pan"
      },
      {
        "en": [
          655,
          360,
          0.847
        ],
        "texto": "Pato confitado",
        "lado": "izq"
      },
      {
        "en": [
          625,
          465,
          0.855
        ],
        "texto": "Miel de dátil",
        "lado": "izq"
      },
      {
        "en": [
          895,
          480,
          0.824
        ],
        "texto": "Gel de flor de loto",
        "lado": "der"
      },
      {
        "en": [
          800,
          525,
          0.878
        ],
        "texto": "Polvo de oro comestible",
        "lado": "der",
        "palabra": "remate dorado"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "El remate dorado, en lo alto de la torre"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Axial y perfecto: cada lado repite al otro"
      },
      {
        "titulo": "Ritmo",
        "texto": "Capas alternas de pan, pato e higo"
      },
      {
        "titulo": "Altura",
        "texto": "La obra más alta del primer acto"
      },
      {
        "titulo": "Paleta",
        "texto": "Azul del Nilo, verde de renovación y oro"
      }
    ],
    "guia": [
      {
        "frase": "Estás frente a un altar",
        "vista": "sala"
      },
      {
        "frase": "Mira la obra de frente",
        "vista": "obra"
      },
      {
        "frase": "Empieza por la base",
        "vista": "platillo"
      },
      {
        "frase": "En esta sala el montaje",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 4,
    "slug": "china",
    "acto": "Acto I · La superficie",
    "nombre": "China antigua",
    "periodo": "Dinastías Shang, Zhou y Han",
    "lema": "Equilibrio, fluidez, jade y vapor",
    "obra": "Cinco sabores bajo la niebla",
    "analisis": "El punto focal son los dumplings, agrupados al centro del plato de laca negra. Alrededor, un anillo de perlas de cinco colores y hojas de jade marca un ritmo circular y continuo. El equilibrio es radial y estable, y el borde negro del plato funciona como espacio vacío que enmarca la composición. La altura es baja y uniforme. Las texturas oponen lo translúcido de la masa al brillo de las perlas y la superficie mate de las hojas. La paleta equilibra verde jade, blanco, rojo y negro de laca.",
    "contexto": "En la China de las dinastías Shang, Zhou y Han, comer era una práctica de armonía. El yin y el yang y los cinco elementos se traducían en cinco sabores que debían equilibrarse. Las Analectas cuentan que Confucio no comía lo que no estaba bien cortado: el bocado preciso expresaba orden moral. El uso de palillos obligaba a cortar en la cocina y no en la mesa. Los bronces rituales, las vaporeras y las lacas de la era Han, como las de Mawangdui, eran los soportes de prestigio. Por eso la obra se sirve en un plato de laca negra, en un pabellón donde el vapor flota en el ambiente como parte de la escena.",
    "ingredientes": [
      "Dumplings translúcidos de camarón y cebollín",
      "Caldo clarificado de jengibre",
      "Perlas de esferificación en cinco sabores",
      "Láminas de pepino en forma de hoja de jade",
      "Té matcha"
    ],
    "guion": "Respira. Imagina el aroma del vapor que flota en este pabellón. En la China antigua, el vapor era parte del espectáculo: velo, movimiento y aroma. Ahora mira el plato de laca negra. Los dumplings se reúnen al centro, translúcidos, y el borde oscuro del plato los enmarca como un vacío que también compone. Sigue el anillo de perlas: cada color es un sabor distinto, dulce, ácido, amargo, picante y salado, porque la armonía exigía equilibrarlos todos. Entre ellas, las hojas verdes evocan el jade. Observa el tamaño de cada pieza, exacto para un bocado. Confucio no comía lo que no estaba bien cortado. En esta sala el montaje aprende el equilibrio de los opuestos y el valor del espacio vacío, una idea que la alta cocina retomaría siglos después.",
    "audio": "salas/04/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/04/platillo.webp",
        "pie": "Cinco sabores bajo la niebla. Imagen generada con Gemini."
      },
      {
        "src": "salas/04/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Los hebreos",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/04/sala-fondo.webp",
            "prof": "salas/04/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/04/sala-pedestal.webp",
            "prof": "salas/04/sala-pedestal-prof.png",
            "caja": [
              0.3263,
              0.3984,
              0.6744,
              0.9193
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/04/sala-atril.webp",
            "prof": "salas/04/sala-atril-prof.png",
            "caja": [
              0.6751,
              0.4635,
              0.8038,
              0.9128
            ],
            "malla": [
              40,
              80
            ]
          }
        ],
        "humo": [
          690,
          425,
          0.869
        ]
      },
      "platillo": {
        "ancho": 1408,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/04/platillo-fondo.webp",
            "prof": "salas/04/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/04/platillo-plato.webp",
            "prof": "salas/04/platillo-plato-prof.png",
            "caja": [
              0.0398,
              0.263,
              0.9858,
              0.9609
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          329,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          0.39,
          -0.95
        ],
        "mira": [
          690,
          425,
          0.869
        ],
        "fov": 46,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          704,
          420,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.61,
          0.1,
          -1.52
        ],
        "mira": [
          1018,
          505,
          0.835
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.01,
          0,
          -2.1
        ],
        "mira": [
          690,
          238,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 5, Los hebreos."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          380,
          0.869
        ],
        "etiqueta": "Cinco sabores bajo la niebla",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          1018,
          545,
          0.835
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          690,
          238,
          0.3
        ],
        "etiqueta": "Sala 5 · Los hebreos",
        "accion": "sala",
        "sala": 5
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        500,
        445,
        0.869
      ],
      "der": [
        882,
        445,
        0.869
      ]
    },
    "elementos": [
      {
        "en": [
          690,
          385,
          0.859
        ],
        "texto": "Dumplings de camarón y cebollín",
        "lado": "izq",
        "palabra": "dumplings"
      },
      {
        "en": [
          422,
          425,
          0.808
        ],
        "texto": "Perlas de cinco sabores",
        "lado": "izq",
        "palabra": "anillo de perlas"
      },
      {
        "en": [
          1050,
          415,
          0.812
        ],
        "texto": "Hojas de jade de pepino",
        "lado": "der",
        "palabra": "hojas verdes"
      },
      {
        "en": [
          930,
          565,
          0.851
        ],
        "texto": "Caldo clarificado de jengibre",
        "lado": "der"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "Los dumplings, reunidos al centro"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Radial y estable, enmarcado por el vacío"
      },
      {
        "titulo": "Ritmo",
        "texto": "Circular: perlas y hojas de jade"
      },
      {
        "titulo": "Altura",
        "texto": "Baja y uniforme"
      },
      {
        "titulo": "Paleta",
        "texto": "Verde jade, blanco, rojo y laca negra"
      }
    ],
    "guia": [
      {
        "frase": "Respira",
        "vista": "sala"
      },
      {
        "frase": "Ahora mira el plato",
        "vista": "platillo"
      },
      {
        "frase": "En esta sala el montaje",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 5,
    "slug": "hebreos",
    "acto": "Acto II · El símbolo",
    "nombre": "Los hebreos",
    "periodo": "c. 1200 a. C. – 70 d. C.",
    "lema": "Sobriedad, pan sin levadura y simbolismo",
    "obra": "Mesa de la memoria",
    "analisis": "La obra es plana y concéntrica. La matzá circular ocupa el centro de una amplia losa de piedra y funciona como plato dentro del plato. Sobre ella, la reducción de cordero traza una espiral que conduce la mirada hacia el punto focal: la quenelle de jaroset junto a la esfera verde de rábano picante. El equilibrio es sereno y centrado. El ritmo lo marcan los anillos de la espiral. La altura es mínima: su valor está en el significado. Las texturas van de lo quebradizo a lo untuoso, y la paleta se limita a blancos de piedra, marrones y verde.",
    "contexto": "La mesa hebrea estaba regulada por la ley divina. Las normas de kashrut, en Levítico 11 y Deuteronomio 14, separaban lo puro de lo impuro, y comer era un acto de obediencia y memoria. La Pascua, descrita en Éxodo 12, fijó una comida narrativa: el pan sin levadura recuerda la salida apresurada de Egipto, y las hierbas amargas, la esclavitud. Siglos después, la tradición rabínica codificó el plato del séder con lugares fijos para cada alimento. La obra se sirve sobre piedra caliza porque, en el periodo del Segundo Templo, las vasijas de piedra se consideraban inmunes a la impureza ritual: un soporte elegido por su valor simbólico.",
    "ingredientes": [
      "Lámina crujiente de matzá",
      "Rabanito picante en gel",
      "Jaroset de manzana, dátil y nuez en quenelle",
      "Cordero en reducción de vino tinto",
      "Hierbas amargas"
    ],
    "guion": "En esta sala, la belleza no está en el adorno. Está en el significado. Mira la gran losa de piedra caliza: casi toda vacía. Se elegía la piedra porque no transmitía impureza ritual. En el centro está la matzá, pan sin levadura, plano y sencillo, porque recuerda una huida que no dio tiempo a que la masa creciera. Sobre ella, la reducción de cordero dibuja una espiral. Síguela hasta el centro. Ahí está el jaroset de manzana y dátil, que recuerda el barro de los ladrillos, y a su lado el verde del rábano picante, que evoca las hierbas amargas de la esclavitud. Nada sobra. Aquí el montaje se vuelve narración: cada alimento cuenta una parte de la historia, igual que esta audioguía te la cuenta a ti.",
    "audio": "salas/05/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/05/platillo.webp",
        "pie": "Mesa de la memoria. Imagen generada con Gemini."
      },
      {
        "src": "salas/05/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Persia",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/05/sala-fondo.webp",
            "prof": "salas/05/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/05/sala-pedestal.webp",
            "prof": "salas/05/sala-pedestal-prof.png",
            "caja": [
              0.3663,
              0.5938,
              0.6337,
              0.8776
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/05/sala-atril.webp",
            "prof": "salas/05/sala-atril-prof.png",
            "caja": [
              0.6265,
              0.5326,
              0.7035,
              0.724
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/05/platillo-fondo.webp",
            "prof": "salas/05/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          410,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          0.04,
          -1.94
        ],
        "mira": [
          690,
          480,
          0.537
        ],
        "fov": 38,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          395,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          1.01,
          0.1,
          -3.67
        ],
        "mira": [
          915,
          449,
          0.314
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          -0.55,
          0,
          -2.1
        ],
        "mira": [
          473,
          345,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 6, Persia."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          435,
          0.537
        ],
        "etiqueta": "Mesa de la memoria",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          915,
          489,
          0.314
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          473,
          345,
          0.3
        ],
        "etiqueta": "Sala 6 · Persia",
        "accion": "sala",
        "sala": 6
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        555,
        500,
        0.537
      ],
      "der": [
        826,
        500,
        0.537
      ]
    },
    "elementos": [
      {
        "en": [
          560,
          525,
          0.78
        ],
        "texto": "Lámina crujiente de matzá",
        "lado": "izq",
        "palabra": "matzá"
      },
      {
        "en": [
          645,
          330,
          0.824
        ],
        "texto": "Jaroset de manzana, dátil y nuez",
        "lado": "izq",
        "palabra": "jaroset"
      },
      {
        "en": [
          752,
          378,
          0.827
        ],
        "texto": "Rabanito picante en gel",
        "lado": "der",
        "palabra": "rábano"
      },
      {
        "en": [
          820,
          292,
          0.78
        ],
        "texto": "Cordero en reducción de vino tinto",
        "lado": "der",
        "palabra": "reducción de cordero"
      },
      {
        "en": [
          535,
          235,
          0.776
        ],
        "texto": "Hierbas amargas",
        "lado": "izq",
        "palabra": "hierbas amargas"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "El jaroset junto a la esfera de rábano"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Sereno, concéntrico y centrado"
      },
      {
        "titulo": "Ritmo",
        "texto": "Los anillos de la espiral de cordero"
      },
      {
        "titulo": "Altura",
        "texto": "Mínima: su valor es el significado"
      },
      {
        "titulo": "Paleta",
        "texto": "Blanco de piedra, marrones y verde"
      }
    ],
    "guia": [
      {
        "frase": "En esta sala, la belleza",
        "vista": "sala"
      },
      {
        "frase": "Mira la gran losa",
        "vista": "obra"
      },
      {
        "frase": "En el centro está",
        "vista": "platillo"
      },
      {
        "frase": "Nada sobra",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 6,
    "slug": "persia",
    "acto": "Acto II · El símbolo",
    "nombre": "Persia",
    "periodo": "Imperios aqueménida y sasánida",
    "lema": "Lujo imperial, color vibrante y metales",
    "obra": "Jardín del rey de reyes",
    "analisis": "El punto focal es la cúpula de arroz al azafrán, alta y dorada, al centro de la bandeja de plata y coronada con pétalos de rosa. A su alrededor, cordero especiado, granada, pistacho y espuma de agua de rosas se repiten en un anillo continuo, unidos por jarabe de azafrán. El equilibrio es radial y simétrico. El ritmo es repetido, como un mosaico que gira alrededor del centro. La altura de la cúpula domina la base plana. Las texturas contrastan el grano suelto con la espuma y la carne. La paleta es saturada y preciosa, potenciada por el reflejo del metal.",
    "contexto": "En los imperios aqueménida y sasánida, el banquete era una manifestación del poder del rey de reyes. Autores griegos como Heródoto y Ateneo describieron con asombro la magnitud de esas mesas. La palabra persa pairidaeza, jardín cercado, dio origen a «paraíso», y el jardín chahar bagh dividía el espacio en cuatro partes con agua al centro. La vajilla de oro y plata, con ritones en forma de animal y platos repujados con escenas de caza, era emblema de prestigio. Por eso la obra se presenta sobre una bandeja de plata. Algunos ingredientes, como el arroz al azafrán, se documentan mejor en la cocina persa posterior, que heredó esta tradición.",
    "ingredientes": [
      "Arroz al azafrán moldeado en cúpula",
      "Perlas de granada",
      "Polvo de pistacho",
      "Espuma de agua de rosas",
      "Cordero especiado",
      "Pétalos de rosa cristalizados"
    ],
    "guion": "Bienvenido al paraíso. La palabra viene del persa y significa jardín cercado. Mira la bandeja de plata: refleja la luz y multiplica cada color. En el centro se levanta una cúpula de arroz teñido con azafrán, dorada como el poder del rey de reyes y coronada con pétalos de rosa. Ahora gira la mirada alrededor. Un anillo de colores la rodea y se repite: rojo de granada, verde de pistacho, blanco de agua de rosas y el marrón del cordero especiado. Es un jardín en miniatura, ordenado alrededor de un centro, como los jardines persas con su fuente. Aquí el color ya no es casual: se elige para deslumbrar. En esta sala el montaje descubre el lujo como lenguaje. La abundancia se ordena para que quien la mire entienda, de inmediato, quién la ofrece.",
    "audio": "salas/06/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/06/platillo.webp",
        "pie": "Jardín del rey de reyes. Imagen generada con Gemini."
      },
      {
        "src": "salas/06/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Grecia clásica",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/06/sala-fondo.webp",
            "prof": "salas/06/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/06/sala-pedestal.webp",
            "prof": "salas/06/sala-pedestal-prof.png",
            "caja": [
              0.3241,
              0.6211,
              0.6715,
              0.9062
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/06/sala-atril.webp",
            "prof": "salas/06/sala-atril-prof.png",
            "caja": [
              0.6715,
              0.5846,
              0.7565,
              0.7995
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1408,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/06/platillo-fondo.webp",
            "prof": "salas/06/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/06/platillo-plato.webp",
            "prof": "salas/06/platillo-plato-prof.png",
            "caja": [
              0.0,
              0.0508,
              1.0,
              1.0
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          439,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.01,
          0.03,
          -1.03
        ],
        "mira": [
          700,
          505,
          0.851
        ],
        "fov": 46,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          704,
          385,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.73,
          0.1,
          -2.04
        ],
        "mira": [
          982,
          499,
          0.607
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.02,
          0,
          -2.1
        ],
        "mira": [
          695,
          282,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 7, Grecia clásica."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          700,
          460,
          0.851
        ],
        "etiqueta": "Jardín del rey de reyes",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          982,
          539,
          0.607
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          695,
          282,
          0.3
        ],
        "etiqueta": "Sala 7 · Grecia clásica",
        "accion": "sala",
        "sala": 7
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        506,
        525,
        0.851
      ],
      "der": [
        878,
        525,
        0.851
      ]
    },
    "elementos": [
      {
        "en": [
          705,
          330,
          0.878
        ],
        "texto": "Arroz al azafrán en cúpula",
        "lado": "der",
        "palabra": "cúpula"
      },
      {
        "en": [
          705,
          200,
          0.796
        ],
        "texto": "Pétalos de rosa cristalizados",
        "lado": "der",
        "palabra": "pétalos"
      },
      {
        "en": [
          600,
          590,
          0.867
        ],
        "texto": "Perlas de granada",
        "lado": "izq",
        "palabra": "granada"
      },
      {
        "en": [
          728,
          665,
          0.898
        ],
        "texto": "Polvo de pistacho",
        "lado": "der",
        "palabra": "pistacho"
      },
      {
        "en": [
          410,
          560,
          0.878
        ],
        "texto": "Espuma de agua de rosas",
        "lado": "izq",
        "palabra": "agua de rosas"
      },
      {
        "en": [
          980,
          505,
          0.855
        ],
        "texto": "Cordero especiado",
        "lado": "der",
        "palabra": "cordero especiado"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "La cúpula de arroz al azafrán"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Radial y simétrico"
      },
      {
        "titulo": "Ritmo",
        "texto": "Repetido, como un mosaico que gira"
      },
      {
        "titulo": "Altura",
        "texto": "La cúpula domina la base plana"
      },
      {
        "titulo": "Paleta",
        "texto": "Saturada, multiplicada por la plata"
      }
    ],
    "guia": [
      {
        "frase": "Bienvenido al paraíso",
        "vista": "sala"
      },
      {
        "frase": "Mira la bandeja",
        "vista": "obra"
      },
      {
        "frase": "En el centro se levanta",
        "vista": "platillo"
      },
      {
        "frase": "Aquí el color",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 7,
    "slug": "grecia",
    "acto": "Acto II · El símbolo",
    "nombre": "Grecia clásica",
    "periodo": "Siglos V y IV a. C.",
    "lema": "Proporción, frescura y la estética del simposio",
    "obra": "Simposio del mar",
    "analisis": "El punto focal es el gel de vino, en la concavidad central del plato. A su alrededor, las láminas de pescado giran en espiral con tamaño decreciente hacia el centro, una lectura contemporánea de la proporción áurea. El equilibrio es radial, sin dominancia de un lado. El ritmo es fluido y continuo. La altura es moderada, sin excesos. Las texturas alternan lo sedoso del pescado con lo crujiente de la aceituna. La paleta mediterránea combina blanco, verde oliva, morado y el terracota y negro del soporte.",
    "contexto": "En Grecia, el ideal de la medida y la máxima «nada en exceso» guiaban también la mesa. El banquete tenía dos partes: el deipnon, la comida, y el symposion, la bebida compartida con conversación y poesía. Los comensales se reclinaban en klinai frente a mesas individuales bajas. Arquéstrato de Gela defendió el producto fresco y la preparación sencilla. La obra se sirve en un plato inspirado en los platos de pescado del sur de Italia del siglo IV a. C., con una concavidad central para la salsa y peces pintados alrededor. La espiral áurea se usa como clave interpretativa moderna, no como dato histórico comprobado.",
    "ingredientes": [
      "Pescado curado en aceite de oliva",
      "Gel de vino tinto",
      "Miel de tomillo",
      "Espuma de queso feta",
      "Aceitunas deshidratadas e higos frescos"
    ],
    "guion": "Aquí la mesa se vuelve conversación. En Grecia, el ideal era la medida: nada en exceso. Mira el plato de cerámica terracota y negra. En el centro hay una pequeña concavidad, como la de los platos de pescado griegos, que guardaba la salsa. Hoy guarda un gel de vino tinto, el punto donde todo converge. Ahora sigue la espiral del pescado curado, pieza por pieza, cada una un poco más pequeña que la anterior, hasta llegar al centro. Es una lectura moderna de la proporción, la armonía que asociamos con el arte clásico. Fíjate en la frescura: aceite, aceituna, higo, queso. Nada pesado. En esta sala el montaje se vuelve íntimo y proporcionado, pensado para un comensal reclinado que mira de cerca su propio plato.",
    "audio": "salas/07/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/07/platillo.webp",
        "pie": "Simposio del mar. Imagen generada con Gemini."
      },
      {
        "src": "salas/07/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Roma imperial",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/07/sala-fondo.webp",
            "prof": "salas/07/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/07/sala-pedestal.webp",
            "prof": "salas/07/sala-pedestal-prof.png",
            "caja": [
              0.3358,
              0.5846,
              0.6657,
              1.0
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/07/sala-atril.webp",
            "prof": "salas/07/sala-atril-prof.png",
            "caja": [
              0.6148,
              0.4844,
              0.6911,
              0.7214
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/07/platillo-fondo.webp",
            "prof": "salas/07/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/07/platillo-plato.webp",
            "prof": "salas/07/platillo-plato-prof.png",
            "caja": [
              0.0233,
              0.181,
              0.9797,
              0.9779
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          438,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          -0.1,
          -1.36
        ],
        "mira": [
          690,
          520,
          0.778
        ],
        "fov": 46,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          415,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.89,
          0.1,
          -3.49
        ],
        "mira": [
          898,
          432,
          0.333
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.0,
          0,
          -2.1
        ],
        "mira": [
          688,
          320,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 8, Roma imperial."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          475,
          0.778
        ],
        "etiqueta": "Simposio del mar",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          898,
          472,
          0.333
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          688,
          320,
          0.3
        ],
        "etiqueta": "Sala 8 · Roma imperial",
        "accion": "sala",
        "sala": 8
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        513,
        540,
        0.778
      ],
      "der": [
        868,
        540,
        0.778
      ]
    },
    "elementos": [
      {
        "en": [
          690,
          420,
          0.878
        ],
        "texto": "Pescado curado en aceite de oliva",
        "lado": "der",
        "palabra": "espiral del pescado"
      },
      {
        "en": [
          363,
          410,
          0.788
        ],
        "texto": "Gel de vino tinto",
        "lado": "izq",
        "palabra": "gel de vino"
      },
      {
        "en": [
          415,
          322,
          0.788
        ],
        "texto": "Espuma de queso feta",
        "lado": "izq",
        "palabra": "queso"
      },
      {
        "en": [
          240,
          405,
          0.788
        ],
        "texto": "Aceitunas deshidratadas",
        "lado": "der",
        "palabra": "aceituna"
      },
      {
        "en": [
          1078,
          450,
          0.808
        ],
        "texto": "Miel de tomillo",
        "lado": "der"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "El gel de vino, en la concavidad central"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Radial, sin dominancia de un lado"
      },
      {
        "titulo": "Ritmo",
        "texto": "Espiral de pescado de tamaño decreciente"
      },
      {
        "titulo": "Altura",
        "texto": "Moderada, nada en exceso"
      },
      {
        "titulo": "Paleta",
        "texto": "Blanco, oliva, morado, terracota y negro"
      }
    ],
    "guia": [
      {
        "frase": "Aquí la mesa",
        "vista": "sala"
      },
      {
        "frase": "Mira el plato",
        "vista": "obra"
      },
      {
        "frase": "En el centro hay",
        "vista": "platillo"
      },
      {
        "frase": "En esta sala el montaje",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 8,
    "slug": "roma",
    "acto": "Acto II · El símbolo",
    "nombre": "Roma imperial",
    "periodo": "27 a. C. – 476 d. C.",
    "lema": "Teatralidad, abundancia y montaje de impacto",
    "obra": "Cena de Trimalción",
    "analisis": "El punto focal es el falso huevo de espuma de queso, alto y blanco, al centro de la bandeja, con la yema de garum escurriendo por un costado. A su alrededor, rodajas de ave rellena, falsas frutas y hongos forman un anillo abundante de elementos satélite. El equilibrio es radial y monumental. El ritmo se repite en el anillo y culmina al centro. La altura es la mayor del segundo acto. Las texturas engañan al ojo: el huevo es queso y la fruta puede ser paté. La paleta combina blancos, marrones asados, rojos pompeyanos y el brillo de la plata.",
    "contexto": "En Roma la mesa era escaparate de estatus. La Cena de Trimalción, del Satiricón de Petronio, satiriza al nuevo rico que convierte cada plato en un golpe de efecto, como una liebre con alas o un jabalí del que salen tordos vivos. La comida seguía tres tiempos: gustatio, mensae primae y mensae secundae. Los comensales se reclinaban en el triclinium, con tres lechos en U alrededor de la mesa. La plata repujada, como la del tesoro de Boscoreale, y la terra sigillata roja eran los soportes de prestigio. Por eso la obra se sirve en una gran bandeja de plata labrada, al centro de un triclinio, como en una puesta en escena.",
    "ingredientes": [
      "Huevo de espuma de queso con yema de garum",
      "Ave rellena en capas",
      "«Fruta» de paté de hígado",
      "Salsa de miel y pimienta",
      "Uvas glaseadas"
    ],
    "guion": "Prepárate para la sorpresa. En Roma, la cena era teatro. Mira el centro de la bandeja de plata: parece un huevo gigante, con la yema escurriendo por un costado. No lo es. Es espuma de queso, y la yema lleva garum, la salsa fermentada de pescado que daba sabor a todo el imperio. Ahora recorre el anillo que lo rodea: rodajas de ave rellena, frutas y hongos en abundancia. Acércate y duda de todo, porque en la mesa romana lo que parecía fruta podía ser paté. El engaño era parte del placer. Fíjate en la plata labrada y en los comensales reclinados al fondo. En esta sala el montaje aprende a impactar. El comensal se vuelve espectador, y el plato, una puesta en escena pensada para provocar asombro.",
    "audio": "salas/08/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/08/platillo.webp",
        "pie": "Cena de Trimalción. Imagen generada con Gemini."
      },
      {
        "src": "salas/08/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Edad Media",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/08/sala-fondo.webp",
            "prof": "salas/08/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/08/sala-pedestal.webp",
            "prof": "salas/08/sala-pedestal-prof.png",
            "caja": [
              0.319,
              0.4844,
              0.6802,
              0.8151
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/08/sala-atril.webp",
            "prof": "salas/08/sala-atril-prof.png",
            "caja": [
              0.7551,
              0.5039,
              0.851,
              0.9427
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/08/platillo-fondo.webp",
            "prof": "salas/08/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/08/platillo-plato.webp",
            "prof": "salas/08/platillo-plato-prof.png",
            "caja": [
              0.0247,
              0.3112,
              0.9782,
              1.0
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          352,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          0.35,
          -1.46
        ],
        "mira": [
          688,
          430,
          0.732
        ],
        "fov": 46,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          400,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.7,
          0.1,
          -1.39
        ],
        "mira": [
          1105,
          532,
          0.917
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.59,
          0,
          -2.1
        ],
        "mira": [
          918,
          209,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 9, Edad Media."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          688,
          385,
          0.732
        ],
        "etiqueta": "Cena de Trimalción",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          1105,
          572,
          0.917
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          918,
          209,
          0.3
        ],
        "etiqueta": "Sala 9 · Edad Media",
        "accion": "sala",
        "sala": 9
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        511,
        450,
        0.732
      ],
      "der": [
        865,
        450,
        0.732
      ]
    },
    "elementos": [
      {
        "en": [
          685,
          305,
          0.804
        ],
        "texto": "Huevo de espuma de queso",
        "lado": "izq",
        "palabra": "huevo gigante"
      },
      {
        "en": [
          680,
          378,
          0.824
        ],
        "texto": "Yema de garum",
        "lado": "izq",
        "palabra": "yema"
      },
      {
        "en": [
          600,
          540,
          0.835
        ],
        "texto": "Ave rellena en capas",
        "lado": "izq",
        "palabra": "ave rellena"
      },
      {
        "en": [
          885,
          430,
          0.784
        ],
        "texto": "«Fruta» de paté de hígado",
        "lado": "der",
        "palabra": "paté"
      },
      {
        "en": [
          680,
          615,
          0.855
        ],
        "texto": "Salsa de miel y pimienta",
        "lado": "izq"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "El falso huevo de espuma de queso"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Radial y monumental"
      },
      {
        "titulo": "Ritmo",
        "texto": "Un anillo de satélites que culmina al centro"
      },
      {
        "titulo": "Altura",
        "texto": "La mayor del segundo acto"
      },
      {
        "titulo": "Paleta",
        "texto": "Blancos, asados, rojo pompeyano y plata"
      }
    ],
    "guia": [
      {
        "frase": "Prepárate",
        "vista": "sala"
      },
      {
        "frase": "Mira el centro",
        "vista": "platillo"
      },
      {
        "frase": "Fíjate en la plata",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 9,
    "slug": "edad-media",
    "acto": "Acto III · La construcción",
    "nombre": "Edad Media",
    "periodo": "Siglos V al XV",
    "lema": "Estructuras heráldicas, volumen y banquetes de caza",
    "obra": "Fortaleza del señor",
    "analisis": "El punto focal es la torre de hojaldre, que se eleva sobre el venado como el torreón de un castillo. El equilibrio es simétrico y frontal, como un escudo. El ritmo lo marcan las almenas repetidas y las plumas de tuile, que abren la silueta en abanico. La altura es la mayor del recorrido hasta este punto. Las texturas oponen la costra crujiente a la carne jugosa y al puré sedoso. La paleta es heráldica: amarillo azafrán, verde de hierbas, rojo vino y acentos de oro.",
    "contexto": "En la Edad Media, la mesa reflejaba la sociedad estamental: el lugar asignado indicaba el rango, y sentarse cerca o lejos del salero monumental marcaba la jerarquía. La caza era privilegio nobiliario y ocupaba el centro del banquete. Los entremets llevaban a la mesa pavos reales y cisnes asados y vestidos de nuevo con sus plumas. Recetarios como Le Viandier y The Forme of Cury documentan el gusto por el color y el dorado. El soporte era el tranchoir, una rebanada gruesa de pan duro que servía de plato y luego se repartía a los pobres. Por eso la obra se levanta sobre pan tostado, un soporte comestible.",
    "ingredientes": [
      "Venado en costra de hierbas",
      "Puré de chirivía al azafrán",
      "Torre de hojaldre en forma de almena",
      "Salsa de vino especiado",
      "Plumas de tuile de cacao",
      "Pan tostado como base"
    ],
    "guion": "Entras al gran salón del señor. Aquí el banquete se construye como una fortaleza. Mira la base: es pan tostado. En la Edad Media, una rebanada de pan duro servía de plato y, al terminar, se daba a los pobres. Sobre ella descansa el venado, porque la caza era privilegio de la nobleza. Ahora sube por la torre de hojaldre hasta las almenas. Es un castillo comestible. Observa las plumas de cacao que se abren en abanico: recuerdan a los pavos reales que se servían vestidos con su propio plumaje. Fíjate en los colores: amarillo, verde, rojo y oro, los mismos de los escudos de armas. En esta sala el montaje se vuelve arquitectura del poder. El alimento ya no sólo se apila: se edifica.",
    "audio": "salas/09/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/09/platillo.webp",
        "pie": "Fortaleza del señor. Imagen generada con Gemini."
      },
      {
        "src": "salas/09/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Mesoamérica",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/09/sala-fondo.webp",
            "prof": "salas/09/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/09/sala-pedestal.webp",
            "prof": "salas/09/sala-pedestal-prof.png",
            "caja": [
              0.3481,
              0.4544,
              0.6512,
              0.7891
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/09/sala-atril.webp",
            "prof": "salas/09/sala-atril-prof.png",
            "caja": [
              0.7224,
              0.5586,
              0.8169,
              0.9062
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1408,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/09/platillo-fondo.webp",
            "prof": "salas/09/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/09/platillo-plato.webp",
            "prof": "salas/09/platillo-plato-prof.png",
            "caja": [
              0.0526,
              0.1745,
              0.9524,
              0.9583
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          408,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          0.0,
          -1.69
        ],
        "mira": [
          688,
          490,
          0.624
        ],
        "fov": 43,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          704,
          410,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.71,
          0.1,
          -1.57
        ],
        "mira": [
          1059,
          535,
          0.803
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          -0.02,
          0,
          -2.1
        ],
        "mira": [
          680,
          296,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 10, Mesoamérica."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          688,
          445,
          0.624
        ],
        "etiqueta": "Fortaleza del señor",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          1059,
          575,
          0.803
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          680,
          296,
          0.3
        ],
        "etiqueta": "Sala 10 · Mesoamérica",
        "accion": "sala",
        "sala": 10
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        530,
        510,
        0.624
      ],
      "der": [
        850,
        510,
        0.624
      ]
    },
    "elementos": [
      {
        "en": [
          545,
          320,
          0.824
        ],
        "texto": "Torre de hojaldre",
        "lado": "izq",
        "palabra": "torre de hojaldre"
      },
      {
        "en": [
          700,
          470,
          0.894
        ],
        "texto": "Venado en costra de hierbas",
        "lado": "izq",
        "palabra": "venado"
      },
      {
        "en": [
          800,
          230,
          0.761
        ],
        "texto": "Plumas de tuile de cacao",
        "lado": "der",
        "palabra": "plumas de cacao"
      },
      {
        "en": [
          362,
          570,
          0.898
        ],
        "texto": "Puré de chirivía al azafrán",
        "lado": "izq"
      },
      {
        "en": [
          600,
          585,
          0.886
        ],
        "texto": "Salsa de vino especiado",
        "lado": "izq"
      },
      {
        "en": [
          1150,
          600,
          0.882
        ],
        "texto": "Pan tostado como base",
        "lado": "izq",
        "palabra": "pan tostado"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "La torre de hojaldre, como un torreón"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Simétrico y frontal, como un escudo"
      },
      {
        "titulo": "Ritmo",
        "texto": "Almenas y plumas que se abren en abanico"
      },
      {
        "titulo": "Altura",
        "texto": "La mayor del recorrido hasta aquí"
      },
      {
        "titulo": "Paleta",
        "texto": "Heráldica: azafrán, verde, rojo vino y oro"
      }
    ],
    "guia": [
      {
        "frase": "Entras al gran salón",
        "vista": "sala"
      },
      {
        "frase": "Mira la base",
        "vista": "platillo"
      },
      {
        "frase": "En esta sala el montaje",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 10,
    "slug": "mesoamerica",
    "acto": "Acto III · La construcción",
    "nombre": "Mesoamérica",
    "periodo": "c. 1500 a. C. – 1521 d. C.",
    "lema": "Simbolismo ritual, barro negro, mole y colores de la tierra",
    "obra": "Quincunce del maíz",
    "analisis": "La obra es radial. El punto focal es el disco de tortilla de maíz azul al centro, cruzado por un trazo de mole negro. Dos montículos de espuma de cacao lo acompañan, y ocho flores de calabaza lo rodean en anillo, como rumbos del cosmos. El equilibrio es simétrico. El ritmo lo dan las flores, repetidas a intervalos iguales. La altura es baja. Las texturas pasan de lo terso del mole a lo aireado de la espuma y lo crujiente del chapulín. La paleta reúne el negro del barro, el azul del maíz, el marrón del cacao y el amarillo de la flor.",
    "contexto": "Según el Popol Vuh, los seres humanos fueron hechos de masa de maíz, y comerlo era reafirmar ese origen. La comida era ofrenda y reciprocidad con los dioses, y el cosmos se pensaba en cuatro rumbos y un centro. Bernal Díaz del Castillo relata que a Moctezuma se le servían más de trescientos platillos. El chocolate se vertía desde lo alto para lograr espuma. Comal, metate, jícaras y cajetes de barro eran los soportes, y la tortilla funcionaba como plato y cuchara. La obra se sirve sobre barro negro de Oaxaca, tradición alfarera cuyo brillo característico se consolidó en el siglo XX, y el mole se usa como símbolo de continuidad.",
    "ingredientes": [
      "Tortilla fina de maíz azul nixtamalizado",
      "Mole negro",
      "Espuma de cacao",
      "Flor de calabaza",
      "Polvo de chapulín",
      "Salsa de achiote"
    ],
    "guion": "Estás frente a un cosmos. En Mesoamérica, el mundo tenía cuatro rumbos y un centro, y así se ordenaban los altares. Mira el centro de la obra: un disco de tortilla de maíz azul. Según el Popol Vuh, los primeros seres humanos fueron hechos de masa de maíz. Sobre la tortilla corre un trazo de mole negro. Ahora sigue el anillo de flores de calabaza que la rodea, como rumbos que irradian desde el centro. Fíjate en la espuma de cacao: se vertía desde lo alto porque la espuma era lo más valioso de la bebida. Observa el barro negro que sostiene la obra y el humo de copal al fondo. En esta sala aparece una idea única en la historia del montaje: el soporte también se come. Plato, cuchara y alimento son lo mismo.",
    "audio": "salas/10/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/10/platillo.webp",
        "pie": "Quincunce del maíz. Imagen generada con Gemini."
      },
      {
        "src": "salas/10/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Renacimiento",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/10/sala-fondo.webp",
            "prof": "salas/10/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/10/sala-pedestal.webp",
            "prof": "salas/10/sala-pedestal-prof.png",
            "caja": [
              0.2558,
              0.4089,
              0.7347,
              0.8776
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/10/sala-atril.webp",
            "prof": "salas/10/sala-atril-prof.png",
            "caja": [
              0.7115,
              0.5911,
              0.8023,
              0.8477
            ],
            "malla": [
              40,
              80
            ]
          }
        ],
        "humo": [
          650,
          330,
          0.674
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/10/platillo-fondo.webp",
            "prof": "salas/10/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/10/platillo-plato.webp",
            "prof": "salas/10/platillo-plato-prof.png",
            "caja": [
              0.1156,
              0.3242,
              0.9019,
              0.9453
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          368,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          0.56,
          -1.58
        ],
        "mira": [
          690,
          395,
          0.674
        ],
        "fov": 46,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          425,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          0.88,
          0.1,
          -2.06
        ],
        "mira": [
          1042,
          522,
          0.602
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.78,
          0,
          -2.1
        ],
        "mira": [
          992,
          302,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 11, Renacimiento."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          350,
          0.674
        ],
        "etiqueta": "Quincunce del maíz",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          1042,
          562,
          0.602
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          992,
          302,
          0.3
        ],
        "etiqueta": "Sala 11 · Renacimiento",
        "accion": "sala",
        "sala": 11
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        513,
        415,
        0.674
      ],
      "der": [
        867,
        415,
        0.674
      ]
    },
    "elementos": [
      {
        "en": [
          520,
          500,
          0.843
        ],
        "texto": "Tortilla de maíz azul",
        "lado": "izq",
        "palabra": "tortilla de maíz azul"
      },
      {
        "en": [
          690,
          410,
          0.843
        ],
        "texto": "Mole negro",
        "lado": "der",
        "palabra": "mole negro"
      },
      {
        "en": [
          820,
          470,
          0.859
        ],
        "texto": "Espuma de cacao",
        "lado": "der",
        "palabra": "espuma de cacao"
      },
      {
        "en": [
          692,
          585,
          0.882
        ],
        "texto": "Flor de calabaza",
        "lado": "der",
        "palabra": "flores de calabaza"
      },
      {
        "en": [
          960,
          470,
          0.808
        ],
        "texto": "Polvo de chapulín",
        "lado": "der"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "El disco de maíz azul cruzado por el mole"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Simétrico, con cuatro rumbos y un centro"
      },
      {
        "titulo": "Ritmo",
        "texto": "Flores de calabaza a intervalos iguales"
      },
      {
        "titulo": "Altura",
        "texto": "Baja"
      },
      {
        "titulo": "Paleta",
        "texto": "Barro negro, maíz azul, cacao y amarillo"
      }
    ],
    "guia": [
      {
        "frase": "Estás frente a un cosmos",
        "vista": "sala"
      },
      {
        "frase": "Mira el centro",
        "vista": "platillo"
      },
      {
        "frase": "Observa el barro negro",
        "vista": "obra"
      },
      {
        "frase": "En esta sala aparece",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 11,
    "slug": "renacimiento",
    "acto": "Acto III · La construcción",
    "nombre": "Renacimiento",
    "periodo": "Siglos XV y XVI",
    "lema": "Bodegón, claroscuro, simetría y perspectiva",
    "obra": "Bodegón comestible",
    "analisis": "La obra se compone como un cuadro. El punto focal es la torre de cardo braseado, coronada por un gajo de higo y uno de durazno, iluminada por una luz lateral única que deja el fondo en penumbra. El equilibrio es piramidal: la pieza alta al centro, el pan a un lado y los cubos de membrillo al otro. El ritmo lo marcan los cubos, ordenados como bloques. La altura sigue la pirámide clásica. Las texturas contrastan el brillo lacado de la fruta con la corteza del pan y las fibras del cardo. La paleta es cálida y profunda: ocres, naranjas, rojo membrillo y fondo negro.",
    "contexto": "El humanismo renacentista hizo del ser humano la medida de todo, y la corte convirtió el banquete en una obra total. Bartolomeo Platina defendió un placer moderado y saludable, y Bartolomeo Scappi publicó su Opera en 1570, con ilustraciones de cocinas y utensilios. En la mesa se exhibían esculturas de azúcar llamadas trionfi, y la credenza mostraba la vajilla de mayólica, plata y vidrio de Murano. El tenedor individual se difundió en Italia. Hacia 1600, el bodegón de Caravaggio y de Juan Sánchez Cotán fijó un canon visual del alimento. Por eso la obra se presenta sobre mayólica, con fondo oscuro y claroscuro.",
    "ingredientes": [
      "Cardo braseado",
      "Cubos de membrillo",
      "Gajos de higo y durazno lacados",
      "Pan de masa madre",
      "Hoja de salvia"
    ],
    "guion": "Detente un momento a la distancia, como frente a un cuadro. En el Renacimiento, la mesa se pensaba igual que una pintura. Mira de dónde viene la luz: entra por un solo lado y deja el fondo en sombra. Es el claroscuro de los bodegones. Ahora busca el centro. La torre de cardo, coronada por higo y durazno, es el punto más alto y atrae tu mirada. A partir de ella, la composición desciende: el pan de masa madre a un lado y los cubos de membrillo al otro, ordenados como bloques de arquitectura. Observa el brillo de la fruta lacada frente a la corteza del pan. Nada está al azar. En esta sala el montaje se vuelve pictórico. El alimento se dispone para ser contemplado desde un punto de vista, como una obra de arte.",
    "audio": "salas/11/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/11/platillo.webp",
        "pie": "Bodegón comestible. Imagen generada con Gemini."
      },
      {
        "src": "salas/11/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Edad Moderna",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/11/sala-fondo.webp",
            "prof": "salas/11/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/11/sala-pedestal.webp",
            "prof": "salas/11/sala-pedestal-prof.png",
            "caja": [
              0.314,
              0.4284,
              0.6802,
              0.8776
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/11/sala-atril.webp",
            "prof": "salas/11/sala-atril-prof.png",
            "caja": [
              0.6933,
              0.5234,
              0.7878,
              0.8828
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/11/platillo-fondo.webp",
            "prof": "salas/11/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/11/platillo-plato.webp",
            "prof": "salas/11/platillo-plato-prof.png",
            "caja": [
              0.061,
              0.0807,
              0.9346,
              0.9479
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          348,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          0.0,
          0.69,
          -2.06
        ],
        "mira": [
          690,
          390,
          0.504
        ],
        "fov": 36,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          385,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          1.01,
          0.1,
          -2.51
        ],
        "mira": [
          1019,
          513,
          0.484
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          0.03,
          0,
          -2.1
        ],
        "mira": [
          698,
          318,
          0.3
        ],
        "fov": 40,
        "nota": "Cruza para pasar a la Sala 12, Edad Moderna."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          690,
          345,
          0.504
        ],
        "etiqueta": "Bodegón comestible",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          1019,
          553,
          0.484
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          698,
          318,
          0.3
        ],
        "etiqueta": "Sala 12 · Edad Moderna",
        "accion": "sala",
        "sala": 12
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        556,
        410,
        0.504
      ],
      "der": [
        824,
        410,
        0.504
      ]
    },
    "elementos": [
      {
        "en": [
          660,
          330,
          0.871
        ],
        "texto": "Cardo braseado",
        "lado": "izq",
        "palabra": "torre de cardo"
      },
      {
        "en": [
          682,
          150,
          0.765
        ],
        "texto": "Gajo de higo",
        "lado": "izq",
        "palabra": "higo"
      },
      {
        "en": [
          672,
          228,
          0.824
        ],
        "texto": "Durazno lacado",
        "lado": "izq",
        "palabra": "durazno"
      },
      {
        "en": [
          960,
          450,
          0.839
        ],
        "texto": "Pan de masa madre",
        "lado": "der",
        "palabra": "pan de masa madre"
      },
      {
        "en": [
          470,
          520,
          0.855
        ],
        "texto": "Cubos de membrillo",
        "lado": "izq",
        "palabra": "cubos de membrillo"
      },
      {
        "en": [
          290,
          550,
          0.867
        ],
        "texto": "Hoja de salvia",
        "lado": "der"
      }
    ],
    "claves": [
      {
        "titulo": "Punto focal",
        "texto": "La torre de cardo, bajo una luz lateral"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Piramidal, como un cuadro clásico"
      },
      {
        "titulo": "Ritmo",
        "texto": "Los cubos de membrillo, como bloques"
      },
      {
        "titulo": "Altura",
        "texto": "Sigue la pirámide de la composición"
      },
      {
        "titulo": "Paleta",
        "texto": "Ocres, naranjas, rojo membrillo y negro"
      }
    ],
    "guia": [
      {
        "frase": "Detente un momento",
        "vista": "sala"
      },
      {
        "frase": "Mira de dónde viene",
        "vista": "obra"
      },
      {
        "frase": "Ahora busca el centro",
        "vista": "platillo"
      },
      {
        "frase": "En esta sala el montaje",
        "vista": "sala"
      }
    ]
  },
  {
    "numero": 12,
    "slug": "edad-moderna",
    "acto": "Acto III · La construcción",
    "nombre": "Edad Moderna",
    "periodo": "Siglos XVII al XIX",
    "lema": "De la haute cuisine a la nouvelle cuisine",
    "obra": "Del templo al lienzo",
    "analisis": "La obra tiene dos puntos focales que dialogan: a la izquierda, la columna vertical de tuile; a la derecha, el pescado sobre un plato blanco casi vacío. El equilibrio es asimétrico y deliberado. El ritmo lo dan las tres verduras torneadas, idénticas y alineadas. La altura alcanza su máximo en la columna y desciende al mínimo en el pescado. Las texturas oponen lo crujiente del tuile a lo sedoso de la salsa. La paleta es blanca, dorada y verde, con amplio espacio negativo.",
    "contexto": "La Edad Moderna codificó la cocina francesa. La Varenne, en Le Cuisinier françois (1651), sustituyó el exceso de especias por fondos y sabores propios. Carême concibió la pastelería como rama de la arquitectura y levantó pièces montées con templos y columnas de azúcar. El service à la française colocaba todos los platos a la vez; el service à la russe, difundido en el siglo XIX, los sirvió en secuencia y llevó el foco al plato. Escoffier racionalizó la cocina en 1903. Como epílogo, la nouvelle cuisine de los años setenta emplató en cocina sobre porcelana blanca, con porciones pequeñas y espacio vacío.",
    "ingredientes": [
      "Columna miniatura de tuile y crema montada inspirada en Carême",
      "Pescado blanco con beurre blanc",
      "Tres verduras torneadas",
      "Aceite de hierbas"
    ],
    "guion": "Llegas al final del recorrido, y la sala se vuelve blanca. Aquí la historia del montaje se resume en un solo plato. Mira primero la columna de la izquierda. Es un homenaje a Carême, el cocinero que decía que la pastelería era una rama de la arquitectura y levantaba templos de azúcar. Ahora desliza la mirada hacia la derecha: un pescado con beurre blanc y tres verduras torneadas, casi solos sobre la porcelana. Ese vacío es intencional. Con el servicio a la rusa, la atención pasó de la mesa entera al plato individual, y la nouvelle cuisine llevó esa idea al extremo. Recuerda la losa de piedra de la primera sala. Del alimento colocado sobre una superficie llegamos al alimento construido dentro de un espacio. Ese es el arte del montaje.",
    "audio": "salas/12/audioguia.mp3",
    "imagenes": [
      {
        "src": "salas/12/platillo.webp",
        "pie": "Del templo al lienzo. Imagen generada con Gemini."
      },
      {
        "src": "salas/12/espacio.webp",
        "pie": "Concepto espacial de la sala. Imagen generada con Gemini."
      }
    ],
    "siguiente": "Prehistoria",
    "escenas": {
      "sala": {
        "ancho": 1376,
        "alto": 768,
        "fov": 50,
        "escala": 3.2,
        "capas": [
          {
            "src": "salas/12/sala-fondo.webp",
            "prof": "salas/12/sala-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              300,
              180
            ]
          },
          {
            "src": "salas/12/sala-pedestal.webp",
            "prof": "salas/12/sala-pedestal-prof.png",
            "caja": [
              0.3648,
              0.4844,
              0.6352,
              0.9258
            ],
            "malla": [
              140,
              110
            ]
          },
          {
            "src": "salas/12/sala-atril.webp",
            "prof": "salas/12/sala-atril-prof.png",
            "caja": [
              0.6388,
              0.4909,
              0.7202,
              0.7174
            ],
            "malla": [
              40,
              80
            ]
          }
        ]
      },
      "platillo": {
        "ancho": 1376,
        "alto": 768,
        "fov": 46,
        "escala": 1.0,
        "capas": [
          {
            "src": "salas/12/platillo-fondo.webp",
            "prof": "salas/12/platillo-fondo-prof.png",
            "caja": [
              -0.1,
              -0.1,
              1.1,
              1.1
            ],
            "malla": [
              200,
              120
            ]
          },
          {
            "src": "salas/12/platillo-plato.webp",
            "prof": "salas/12/platillo-plato-prof.png",
            "caja": [
              0.0,
              0.0703,
              1.0,
              0.987
            ],
            "malla": [
              220,
              130
            ]
          }
        ]
      }
    },
    "vistas": [
      {
        "id": "sala",
        "nombre": "La sala",
        "escena": "sala",
        "pos": [
          0,
          0,
          0
        ],
        "mira": [
          688.0,
          382,
          0.3
        ],
        "fov": 42
      },
      {
        "id": "obra",
        "nombre": "La obra",
        "escena": "sala",
        "pos": [
          -0.02,
          0.28,
          -1.75
        ],
        "mira": [
          680,
          445,
          0.602
        ],
        "fov": 42,
        "libertad": 0.6
      },
      {
        "id": "platillo",
        "nombre": "El platillo",
        "escena": "platillo",
        "pos": [
          0,
          0.2,
          -0.1
        ],
        "mira": [
          688,
          375,
          0.84
        ],
        "fov": 46,
        "libertad": 0.5
      },
      {
        "id": "atril",
        "nombre": "Atril",
        "escena": "sala",
        "pos": [
          1.08,
          0.1,
          -3.62
        ],
        "mira": [
          935,
          432,
          0.32
        ],
        "fov": 40
      },
      {
        "id": "arco",
        "nombre": "Siguiente sala",
        "escena": "sala",
        "pos": [
          -0.01,
          0,
          -2.1
        ],
        "mira": [
          685,
          265,
          0.3
        ],
        "fov": 40,
        "nota": "Fin del recorrido. Cruza para volver a la Sala 1."
      }
    ],
    "puntos": [
      {
        "id": "obra",
        "escena": "sala",
        "en": [
          680,
          400,
          0.602
        ],
        "etiqueta": "Del templo al lienzo",
        "accion": "vista",
        "vista": "obra"
      },
      {
        "id": "atril",
        "escena": "sala",
        "en": [
          935,
          472,
          0.32
        ],
        "etiqueta": "Audioguía",
        "accion": "audio"
      },
      {
        "id": "arco",
        "escena": "sala",
        "en": [
          685,
          265,
          0.3
        ],
        "etiqueta": "Volver a la Sala 1",
        "accion": "sala",
        "sala": 1
      }
    ],
    "paneles": {
      "vista": "obra",
      "izq": [
        553,
        465,
        0.602
      ],
      "der": [
        828,
        465,
        0.602
      ]
    },
    "elementos": [
      {
        "en": [
          650,
          165,
          0.796
        ],
        "texto": "Columna de tuile y crema",
        "lado": "izq",
        "palabra": "columna"
      },
      {
        "en": [
          930,
          450,
          0.847
        ],
        "texto": "Pescado blanco con beurre blanc",
        "lado": "der",
        "palabra": "beurre blanc"
      },
      {
        "en": [
          752,
          555,
          0.886
        ],
        "texto": "Verduras torneadas",
        "lado": "der",
        "palabra": "verduras torneadas"
      }
    ],
    "claves": [
      {
        "titulo": "Puntos focales",
        "texto": "La columna de tuile y el pescado, en diálogo"
      },
      {
        "titulo": "Equilibrio",
        "texto": "Asimétrico y deliberado"
      },
      {
        "titulo": "Ritmo",
        "texto": "Tres verduras torneadas, idénticas"
      },
      {
        "titulo": "Altura",
        "texto": "Del máximo en la columna al mínimo"
      },
      {
        "titulo": "Paleta",
        "texto": "Blanco, dorado y verde, con espacio negativo"
      }
    ],
    "guia": [
      {
        "frase": "Llegas al final",
        "vista": "sala"
      },
      {
        "frase": "Mira primero",
        "vista": "platillo"
      },
      {
        "frase": "Recuerda la losa",
        "vista": "sala"
      }
    ]
  }
]
