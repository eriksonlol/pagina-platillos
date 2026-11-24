# Genera src/data/salas-resto.ts (salas 2 a 12) a partir de las fichas del dossier,
# las medidas de herramientas/capas.py y lo escrito a mano aquí (claves, guía).
import json, math, os, sys
import numpy as np
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FICHAS = sys.argv[1]
fichas = json.load(open(FICHAS))
med = json.load(open(os.path.join(RAIZ, 'herramientas', 'medidas.json')))

BASE = {
 2: ('mesopotamia', 'Mesopotamia', 'c. 3500 – 539 a. C.', 'Arcilla, geometría inicial y sazón ancestral', 'Registro de Ur'),
 3: ('egipto', 'Egipto', 'c. 3100 – 30 a. C.', 'Geometría sagrada, jerarquía y opulencia del Nilo', 'Ofrenda para la eternidad'),
 4: ('china', 'China antigua', 'Dinastías Shang, Zhou y Han', 'Equilibrio, fluidez, jade y vapor', 'Cinco sabores bajo la niebla'),
 5: ('hebreos', 'Los hebreos', 'c. 1200 a. C. – 70 d. C.', 'Sobriedad, pan sin levadura y simbolismo', 'Mesa de la memoria'),
 6: ('persia', 'Persia', 'Imperios aqueménida y sasánida', 'Lujo imperial, color vibrante y metales', 'Jardín del rey de reyes'),
 7: ('grecia', 'Grecia clásica', 'Siglos V y IV a. C.', 'Proporción, frescura y la estética del simposio', 'Simposio del mar'),
 8: ('roma', 'Roma imperial', '27 a. C. – 476 d. C.', 'Teatralidad, abundancia y montaje de impacto', 'Cena de Trimalción'),
 9: ('edad-media', 'Edad Media', 'Siglos V al XV', 'Estructuras heráldicas, volumen y banquetes de caza', 'Fortaleza del señor'),
 10: ('mesoamerica', 'Mesoamérica', 'c. 1500 a. C. – 1521 d. C.', 'Simbolismo ritual, barro negro, mole y colores de la tierra', 'Quincunce del maíz'),
 11: ('renacimiento', 'Renacimiento', 'Siglos XV y XVI', 'Bodegón, claroscuro, simetría y perspectiva', 'Bodegón comestible'),
 12: ('edad-moderna', 'Edad Moderna', 'Siglos XVII al XIX', 'De la haute cuisine a la nouvelle cuisine', 'Del templo al lienzo'),
}
ACTO = lambda n: 'Acto I · La superficie' if n <= 4 else ('Acto II · El símbolo' if n <= 8 else 'Acto III · La construcción')

CLAVES = {
 2: [('Punto focal', 'El cordero, en la banda central'), ('Equilibrio', 'Simétrico respecto al eje horizontal'), ('Ritmo', 'Regular, en franjas como un friso'), ('Altura', 'Un escalonamiento final que evoca el zigurat'), ('Paleta', 'Marrón de barro, dorado y azul lapislázuli')],
 3: [('Punto focal', 'El remate dorado, en lo alto de la torre'), ('Equilibrio', 'Axial y perfecto: cada lado repite al otro'), ('Ritmo', 'Capas alternas de pan, pato e higo'), ('Altura', 'La obra más alta del primer acto'), ('Paleta', 'Azul del Nilo, verde de renovación y oro')],
 4: [('Punto focal', 'Los dumplings, reunidos al centro'), ('Equilibrio', 'Radial y estable, enmarcado por el vacío'), ('Ritmo', 'Circular: perlas y hojas de jade'), ('Altura', 'Baja y uniforme'), ('Paleta', 'Verde jade, blanco, rojo y laca negra')],
 5: [('Punto focal', 'El jaroset junto a la esfera de rábano'), ('Equilibrio', 'Sereno, concéntrico y centrado'), ('Ritmo', 'Los anillos de la espiral de cordero'), ('Altura', 'Mínima: su valor es el significado'), ('Paleta', 'Blanco de piedra, marrones y verde')],
 6: [('Punto focal', 'La cúpula de arroz al azafrán'), ('Equilibrio', 'Radial y simétrico'), ('Ritmo', 'Repetido, como un mosaico que gira'), ('Altura', 'La cúpula domina la base plana'), ('Paleta', 'Saturada, multiplicada por la plata')],
 7: [('Punto focal', 'El gel de vino, en la concavidad central'), ('Equilibrio', 'Radial, sin dominancia de un lado'), ('Ritmo', 'Espiral de pescado de tamaño decreciente'), ('Altura', 'Moderada, nada en exceso'), ('Paleta', 'Blanco, oliva, morado, terracota y negro')],
 8: [('Punto focal', 'El falso huevo de espuma de queso'), ('Equilibrio', 'Radial y monumental'), ('Ritmo', 'Un anillo de satélites que culmina al centro'), ('Altura', 'La mayor del segundo acto'), ('Paleta', 'Blancos, asados, rojo pompeyano y plata')],
 9: [('Punto focal', 'La torre de hojaldre, como un torreón'), ('Equilibrio', 'Simétrico y frontal, como un escudo'), ('Ritmo', 'Almenas y plumas que se abren en abanico'), ('Altura', 'La mayor del recorrido hasta aquí'), ('Paleta', 'Heráldica: azafrán, verde, rojo vino y oro')],
 10: [('Punto focal', 'El disco de maíz azul cruzado por el mole'), ('Equilibrio', 'Simétrico, con cuatro rumbos y un centro'), ('Ritmo', 'Flores de calabaza a intervalos iguales'), ('Altura', 'Baja'), ('Paleta', 'Barro negro, maíz azul, cacao y amarillo')],
 11: [('Punto focal', 'La torre de cardo, bajo una luz lateral'), ('Equilibrio', 'Piramidal, como un cuadro clásico'), ('Ritmo', 'Los cubos de membrillo, como bloques'), ('Altura', 'Sigue la pirámide de la composición'), ('Paleta', 'Ocres, naranjas, rojo membrillo y negro')],
 12: [('Puntos focales', 'La columna de tuile y el pescado, en diálogo'), ('Equilibrio', 'Asimétrico y deliberado'), ('Ritmo', 'Tres verduras torneadas, idénticas'), ('Altura', 'Del máximo en la columna al mínimo'), ('Paleta', 'Blanco, dorado y verde, con espacio negativo')],
}

# Frase del guion donde empieza cada toma del recorrido guiado.
GUIA = {
 2: [('Estás en la tierra', 'sala'), ('Mira la placa', 'obra'), ('Lee la obra', 'platillo'), ('En esta sala el montaje', 'sala')],
 3: [('Estás frente a un altar', 'sala'), ('Mira la obra de frente', 'obra'), ('Empieza por la base', 'platillo'), ('En esta sala el montaje', 'sala')],
 4: [('Respira', 'sala'), ('Ahora mira el plato', 'platillo'), ('En esta sala el montaje', 'sala')],
 5: [('En esta sala, la belleza', 'sala'), ('Mira la gran losa', 'obra'), ('En el centro está', 'platillo'), ('Nada sobra', 'sala')],
 6: [('Bienvenido al paraíso', 'sala'), ('Mira la bandeja', 'obra'), ('En el centro se levanta', 'platillo'), ('Aquí el color', 'sala')],
 7: [('Aquí la mesa', 'sala'), ('Mira el plato', 'obra'), ('En el centro hay', 'platillo'), ('En esta sala el montaje', 'sala')],
 8: [('Prepárate', 'sala'), ('Mira el centro', 'platillo'), ('Fíjate en la plata', 'sala')],
 9: [('Entras al gran salón', 'sala'), ('Mira la base', 'platillo'), ('En esta sala el montaje', 'sala')],
 10: [('Estás frente a un cosmos', 'sala'), ('Mira el centro', 'platillo'), ('Observa el barro negro', 'obra'), ('En esta sala aparece', 'sala')],
 11: [('Detente un momento', 'sala'), ('Mira de dónde viene', 'obra'), ('Ahora busca el centro', 'platillo'), ('En esta sala el montaje', 'sala')],
 12: [('Llegas al final', 'sala'), ('Mira primero', 'platillo'), ('Recuerda la losa', 'sala')],
}

# Palabra del guion que enciende cada elemento del platillo (en el orden de capas.py).
PALABRAS = {
 2: ['cordero', 'dátiles', 'cebada', None],
 3: [None, 'base ancha de pan', None, None, None, 'remate dorado'],
 4: ['dumplings', 'anillo de perlas', 'hojas verdes', None],
 5: ['matzá', 'jaroset', 'rábano', 'reducción de cordero', 'hierbas amargas'],
 6: ['cúpula', 'pétalos', 'granada', 'pistacho', 'agua de rosas', 'cordero especiado'],
 7: ['espiral del pescado', 'gel de vino', 'queso', 'aceituna', None],
 8: ['huevo gigante', 'yema', 'ave rellena', 'paté', None],
 9: ['torre de hojaldre', 'venado', 'plumas de cacao', None, None, 'pan tostado'],
 10: ['tortilla de maíz azul', 'mole negro', 'espuma de cacao', 'flores de calabaza', None],
 11: ['torre de cardo', 'higo', 'durazno', 'pan de masa madre', 'cubos de membrillo', None],
 12: ['columna', 'beurre blanc', 'verduras torneadas'],
}

INGR = {
 2: ['Guiso reducido de cordero con cebolla, ajo, puerro y comino', 'Dátiles confitados', 'Cebada inflada', 'Pan plano de cebada', 'Gel de cerveza artesanal'],
 4: ['Dumplings translúcidos de camarón y cebollín', 'Caldo clarificado de jengibre', 'Perlas de esferificación en cinco sabores', 'Láminas de pepino en forma de hoja de jade', 'Té matcha'],
 5: ['Lámina crujiente de matzá', 'Rabanito picante en gel', 'Jaroset de manzana, dátil y nuez en quenelle', 'Cordero en reducción de vino tinto', 'Hierbas amargas'],
 8: ['Huevo de espuma de queso con yema de garum', 'Ave rellena en capas', '«Fruta» de paté de hígado', 'Salsa de miel y pimienta', 'Uvas glaseadas'],
 11: ['Cardo braseado', 'Cubos de membrillo', 'Gajos de higo y durazno lacados', 'Pan de masa madre', 'Hoja de salvia'],
 12: ['Columna miniatura de tuile y crema montada inspirada en Carême', 'Pescado blanco con beurre blanc', 'Tres verduras torneadas', 'Aceite de hierbas'],
}

NOTA_PUERTA = 'Cruza para pasar a la Sala {n}, {nom}.'
FOV, ESC = 50, 3.2

def mundo(W, H, p, fov=FOV, esc=ESC):
    t = math.tan(math.radians(fov / 2)); asp = W / H
    z = esc / (p[2] * 0.95 + 0.05)
    return [(p[0] / W - 0.5) * 2 * t * asp * z, -(p[1] / H - 0.5) * 2 * t * z, -z]

def r(v, d=2):
    return [round(x, d) for x in v]

def muestrear(ruta, x, y):
    im = np.array(Image.open(ruta).convert('L')).astype(np.float32) / 255
    return float(im[int(min(im.shape[0] - 1, y)), int(min(im.shape[1] - 1, x))])

def limpiar(s, pref):
    s = s.replace('*', '')
    return s[len(pref):].strip() if s.startswith(pref) else s

def sala(n):
    f = fichas[n - 1]; m = med[str(n)]; ms, mp = m['sala'], m['platillo']
    slug, nombre, periodo, lema, obra = BASE[n]
    dirn = f'salas/{n:02d}'
    W, H = ms['ancho'], ms['alto']
    ingr = f['obra'].replace('*', '').split('Ingredientes:')[1].strip().rstrip('.')
    ingr = [i.strip() for i in ingr.replace(' y ', ', ').split(', ') if i.strip()]
    ingr = [i[0].upper() + i[1:] for i in ingr]
    ingr = INGR.get(n, ingr)
    guion = f['guion'].replace('*', '')
    nO = ms['nPed'] + 0.035
    T = mundo(W, H, [ms['obra'][0], ms['obra'][1], nO])
    dist = math.hypot(T[0], T[2])
    # la cámara avanza como mucho un tercio del camino: más allá, el render se deforma
    D = max(2.7, 0.66 * dist)
    pos_obra = [T[0] * (1 - D / dist), T[1] + 0.12 * D + 0.25, T[2] * (1 - D / dist)]
    fov_obra = max(27, min(46, 46 * 2.7 / D * 1.15))
    # separación máxima de los paneles (px del render) para que quepan en la toma cercana, como en la Sala 1
    margen = round(170 * 3.71 / ((dist / D) / math.tan(math.radians(fov_obra / 2))))
    A = mundo(W, H, [ms['atril'][0], ms['atril'][1], ms['nAtr']])
    pos_atril = [A[0] * 0.4, 0.1, A[2] * 0.4]
    pp = ms['puerta']
    P = mundo(W, H, [pp[0], pp[1], 0.3])
    pos_puerta = [P[0] * 0.22, 0, P[2] * 0.22]
    sig = n + 1 if n < 12 else 1
    nom_sig = BASE[sig][1] if sig > 1 else 'Prehistoria'
    WP, HP = mp['ancho'], mp['alto']
    capas_p = [dict(src=f'{dirn}/platillo-fondo.webp', prof=f'{dirn}/platillo-fondo-prof.png', caja=[-0.1, -0.1, 1.1, 1.1], malla=[200, 120])]
    if mp['capas'] == 2:
        capas_p.append(dict(src=f'{dirn}/platillo-plato.webp', prof=f'{dirn}/platillo-plato-prof.png', caja=mp['caja'], malla=[220, 130]))
    prof_el = os.path.join(RAIZ, 'public', capas_p[-1]['prof'])
    elementos = []
    for i, e in enumerate(mp['elementos']):
        nn = round(muestrear(prof_el, e['x'], e['y']), 3)
        fx_ = e['x'] / WP
        lado = ('der' if fx_ < 0.22 else 'izq') if fx_ < 0.5 else ('izq' if fx_ > 0.8 else 'der')
        el = dict(en=[e['x'], max(e['y'], 150), nn], texto=e['texto'], lado=lado)
        pal = PALABRAS[n][i] if i < len(PALABRAS[n]) else None
        if pal:
            assert pal.lower() in guion.lower(), (n, pal)
            el['palabra'] = pal
        elementos.append(el)
    for fr, _ in GUIA[n]:
        assert fr in guion, (n, fr)
    cy = (mp['centro'][1] + 420) / 2
    ped_x0, ped_x1 = ms['pedX']
    oy = ms['obra'][1]
    humo = ms.get('humo')
    sala_esc = dict(ancho=W, alto=H, fov=FOV, escala=ESC, capas=[
        dict(src=f'{dirn}/sala-fondo.webp', prof=f'{dirn}/sala-fondo-prof.png', caja=[-0.1, -0.1, 1.1, 1.1], malla=[300, 180]),
        dict(src=f'{dirn}/sala-pedestal.webp', prof=f'{dirn}/sala-pedestal-prof.png', caja=ms['cajaPed'], malla=[140, 110]),
        dict(src=f'{dirn}/sala-atril.webp', prof=f'{dirn}/sala-atril-prof.png', caja=ms['cajaAtr'], malla=[40, 80]),
    ])
    if humo:
        sala_esc['humo'] = [humo[0], humo[1], round(nO, 3)]
    return dict(
        numero=n, slug=slug, acto=ACTO(n), nombre=nombre, periodo=periodo, lema=lema, obra=obra,
        analisis=limpiar(f['analisis'], 'Análisis de composición visual.'),
        contexto=limpiar(f['contexto'], 'Contexto socio-gastronómico.'),
        ingredientes=ingr, guion=guion, audio=f'{dirn}/audioguia.mp3',
        imagenes=[dict(src=f'{dirn}/platillo.webp', pie=f'{obra}. Imagen generada con Gemini.'),
                  dict(src=f'{dirn}/espacio.webp', pie='Concepto espacial de la sala. Imagen generada con Gemini.')],
        siguiente=nom_sig,
        escenas=dict(sala=sala_esc, platillo=dict(ancho=WP, alto=HP, fov=46, escala=1.0, capas=capas_p)),
        vistas=[
            dict(id='sala', nombre='La sala', escena='sala', pos=[0, 0, 0], mira=[W / 2, round((ms['centro'][1] + ms['obra'][1]) / 2 + 10), 0.3], fov=42),
            dict(id='obra', nombre='La obra', escena='sala', pos=r(pos_obra), mira=[ms['obra'][0], oy - 25, round(nO, 3)], fov=round(fov_obra), libertad=0.6),
            dict(id='platillo', nombre='El platillo', escena='platillo', pos=[0, 0.2, -0.1], mira=[round(WP / 2), round(cy), 0.84], fov=46, libertad=0.5),
            dict(id='atril', nombre='Atril', escena='sala', pos=r(pos_atril), mira=[ms['atril'][0], ms['atril'][1] - 40, ms['nAtr']], fov=40),
            dict(id='arco', nombre='Siguiente sala', escena='sala', pos=r(pos_puerta), mira=[pp[0], pp[1], 0.3], fov=40,
                 nota=NOTA_PUERTA.format(n=sig, nom=nom_sig) if sig > 1 else 'Fin del recorrido. Cruza para volver a la Sala 1.'),
        ],
        puntos=[
            dict(id='obra', escena='sala', en=[ms['obra'][0], oy - 45, round(nO, 3)], etiqueta=obra, accion='vista', vista='obra'),
            dict(id='atril', escena='sala', en=[ms['atril'][0], ms['atril'][1], ms['nAtr']], etiqueta='Audioguía', accion='audio'),
            dict(id='arco', escena='sala', en=[pp[0], pp[1], 0.3], etiqueta=(f'Sala {sig} · {nom_sig}' if sig > 1 else 'Volver a la Sala 1'), accion='sala', sala=sig),
        ],
        paneles=dict(vista='obra', izq=[max(ped_x0 + 45, ms['obra'][0] - margen), oy + 20, round(nO, 3)], der=[min(ped_x1 - 40, ms['obra'][0] + margen), oy + 20, round(nO, 3)]),
        elementos=elementos,
        claves=[dict(titulo=a, texto=b) for a, b in CLAVES[n]],
        guia=[dict(frase=a, vista=b) for a, b in GUIA[n]],
    )

datos = [sala(n) for n in range(2, 13)]
# copias para la ficha
for n in range(2, 13):
    d = f'{RAIZ}/public/salas/{n:02d}'
    Image.open(f'/mnt/project-files/imagenes-espacios/espacio_sala{n:02d}.jpeg').convert('RGB').save(f'{d}/espacio.webp', quality=86)
    nom = 'sala06_v2.jpeg' if n == 6 else f'sala{n:02d}.jpeg'
    Image.open(f'/mnt/project-files/imagenes-salas/{nom}').convert('RGB').save(f'{d}/platillo.webp', quality=86)

out = '// Generado por herramientas/datos_salas.py a partir del dossier. Para corregir textos o\n' \
      '// tomas se puede editar aquí directamente o en el script y volver a generarlo.\n' \
      "import type { Sala } from './salas'\n\n" \
      'export const salasResto: Sala[] = ' + json.dumps(datos, ensure_ascii=False, indent=2) + '\n'
open(os.path.join(RAIZ, 'src', 'data', 'salas-resto.ts'), 'w').write(out)
print('ok', len(datos))
