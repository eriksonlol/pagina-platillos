# Genera, para las salas 2 a 12, las capas 3D (fondo rellenado, pedestal, atril, plato)
# y sus mapas de profundidad, a partir de los renders de Gemini.
# Requiere: pip install opencv-python-headless pillow numpy
# Uso: python3 herramientas/capas.py   (lee /mnt/project-files, escribe public/salas/NN y herramientas/medidas.json)
import json, os, sys
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from componer import componer

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = '/mnt/project-files'
NB = 0.30  # cercanía del muro del fondo

def elipse(cx, cy, rx, ry, n=48):
    return [(cx + rx * np.cos(a), cy + ry * np.sin(a)) for a in np.linspace(0, 2 * np.pi, n, endpoint=False)]

# Medidas tomadas a mano sobre cada render (px). back = muro del fondo; puerta = vano hacia la siguiente sala.
SALAS = {
  2: dict(back=(395,140,1000,545), puerta=[(588,262),(790,262),(790,545),(588,545)],
          ped=[[(612,525),(630,510),(690,503),(745,506),(762,522),(760,545),(768,582),(790,612),(815,676),(560,678),(578,615),(606,590),(608,550)]],
          atr=[(835,503),(880,498),(940,505),(935,525),(915,528),(918,600),(930,655),(905,665),(845,662),(855,600),(858,528),(838,522)],
          obra=(690,505),
          plt=dict(horizonte=290, plato=elipse(703,435,545,268), foco=(600,420,130,200),
                   el=[(600,330,'Guiso reducido de cordero con comino'),(712,350,'Dátiles confitados'),(870,400,'Cebada inflada'),(455,470,'Reducción del guiso')])),
  3: dict(back=(520,75,855,575), puerta=[(578,190),(798,190),(798,575),(578,575)],
          ped=[[(632,350),(700,345),(745,385),(745,425),(795,428),(800,470),(790,490),(785,605),(748,608),(745,500),(630,500),(628,605),(590,605),(588,490),(576,470),(590,440),(632,425)]],
          atr=[(955,430),(1000,430),(1003,468),(1028,470),(1025,498),(1010,500),(1015,615),(950,615),(955,500),(932,495),(930,468),(952,466)],
          obra=(690,380),
          plt=dict(horizonte=345, plato=[(100,660),(250,520),(405,365),(585,362),(588,290),(640,220),(680,175),(710,205),(770,240),(795,285),(795,362),(1000,365),(1140,490),(1282,660),(1270,682),(105,682)], foco=(690,350,110,180),
                   el=[(712,215,'Higos frescos'),(600,300,'Pan de espelta'),(655,360,'Pato confitado'),(625,465,'Miel de dátil'),(895,480,'Gel de flor de loto'),(800,525,'Polvo de oro comestible')])),
  4: dict(back=(350,25,1030,400), puerta=elipse(690,270,100,105),
          ped=[[(550,395),(600,390),(700,388),(800,392),(830,410),(918,412),(922,545),(890,548),(893,590),(870,590),(865,555),(825,555),(822,700),(552,700),(550,555),(497,555),(490,592),(465,590),(470,548),(455,545),(460,412),(550,410)],
               [(500,350),(528,330),(558,350),(558,410),(500,410)], [(835,330),(856,312),(878,330),(878,395),(835,395)]],
          atr=[(935,362),(1000,365),(1080,372),(1100,440),(1060,445),(1030,450),(1030,630),(1062,690),(1050,695),(1015,650),(975,695),(965,690),(1000,640),(1005,450),(960,442),(940,380)],
          obra=(690,425), humo=(690,425),
          plt=dict(horizonte=330, plato=elipse(722,470,660,262), foco=(720,420,230,130),
                   el=[(690,385,'Dumplings de camarón y cebollín'),(422,425,'Perlas de cinco sabores'),(1050,415,'Hojas de jade de pepino'),(930,565,'Caldo clarificado de jengibre')])),
  5: dict(back=(300,110,1075,530), puerta=[(388,245),(558,245),(558,530),(388,530)],
          ped=[[(568,462),(805,462),(808,485),(862,485),(866,578),(802,580),(800,668),(575,668),(573,580),(510,578),(510,485),(565,485)]],
          atr=[(868,415),(955,415),(962,460),(945,462),(946,548),(905,550),(900,465),(880,462)],
          obra=(690,480),
          plt=dict(cenital=True, plato=None, foco=(690,370,120,90),
                   el=[(560,525,'Lámina crujiente de matzá'),(645,330,'Jaroset de manzana, dátil y nuez'),(752,378,'Rabanito picante en gel'),(820,292,'Cordero en reducción de vino tinto'),(535,235,'Hierbas amargas')])),
  6: dict(back=(305,220,1055,485), puerta=[(600,205),(790,205),(790,425),(600,425)],
          ped=[[(452,545),(480,508),(560,495),(615,488),(700,483),(770,492),(860,505),(915,530),(918,555),(890,590),(800,615),(790,625),(792,650),(760,675),(700,690),(683,690),(620,675),(585,650),(585,625),(560,610),(480,590),(455,570)]],
          atr=[(930,488),(960,455),(1000,455),(1035,485),(1010,505),(995,520),(990,565),(1015,608),(930,608),(960,565),(955,520),(935,505)],
          obra=(700,505),
          plt=dict(horizonte=40, plato=elipse(705,410,700,365), foco=(705,350,220,190),
                   el=[(705,330,'Arroz al azafrán en cúpula'),(705,200,'Pétalos de rosa cristalizados'),(600,590,'Perlas de granada'),(728,665,'Polvo de pistacho'),(410,560,'Espuma de agua de rosas'),(980,505,'Cordero especiado')])),
  7: dict(back=(375,150,1000,520), puerta=[(598,248),(778,248),(778,455),(598,455)],
          ped=[[(512,520),(540,480),(600,462),(690,455),(780,462),(840,485),(860,520),(845,580),(860,600),(905,665),(910,680),(890,685),(890,700),(870,700),(870,768),(845,768),(842,705),(818,705),(818,768),(540,768),(538,705),(530,705),(528,768),(492,768),(492,700),(470,680),(468,665),(510,600),(528,580)]],
          atr=[(878,378),(915,378),(918,415),(940,415),(945,440),(915,445),(912,540),(925,548),(870,548),(882,540),(882,445),(852,440),(855,425),(876,415)],
          obra=(690,520),
          plt=dict(horizonte=330, plato=elipse(690,445,652,300), foco=(690,410,170,100),
                   el=[(690,420,'Pescado curado en aceite de oliva'),(363,410,'Gel de vino tinto'),(415,322,'Espuma de queso feta'),(240,405,'Aceitunas deshidratadas'),(1078,450,'Miel de tomillo')])),
  8: dict(back=(310,90,1070,420), puerta=[(815,95),(1020,95),(1020,420),(815,420)],
          ped=[[(445,490),(480,478),(540,470),(560,440),(600,420),(625,400),(650,380),(720,378),(750,400),(790,425),(810,445),(850,470),(900,478),(930,490),(915,505),(870,515),(820,550),(810,560),(800,610),(760,620),(600,620),(560,610),(555,560),(530,540),(470,510)]],
          atr=[(1048,400),(1070,393),(1135,395),(1165,410),(1145,470),(1110,475),(1100,480),(1100,600),(1130,660),(1165,710),(1150,718),(1100,700),(1060,718),(1045,712),(1080,660),(1090,600),(1090,480),(1048,465)],
          obra=(688,430),
          plt=dict(horizonte=360, plato=elipse(690,560,650,210)+[], extra=[elipse(685,365,98,120),[(780,380),(815,330),(870,345),(935,430),(940,500),(800,500)]], foco=(685,380,100,130),
                   el=[(685,305,'Huevo de espuma de queso'),(680,378,'Yema de garum'),(600,540,'Ave rellena en capas'),(885,430,'«Fruta» de paté de hígado'),(680,615,'Salsa de miel y pimienta')])),
  9: dict(back=(450,150,950,460), puerta=[(600,210),(760,210),(760,455),(600,455)],
          ped=[[(545,465),(570,430),(600,425),(630,410),(630,355),(745,355),(748,410),(770,425),(800,430),(842,490),(840,510),(800,520),(795,548),(860,560),(890,575),(890,600),(485,600),(485,575),(580,550),(578,525),(535,505)]],
          atr=[(1005,435),(1040,435),(1118,438),(1118,490),(1080,495),(1070,500),(1070,640),(1115,665),(1115,690),(1025,690),(1030,640),(1040,500),(1000,495)],
          obra=(688,490),
          plt=dict(horizonte=470, plato=[(80,640),(100,580),(170,530),(320,480),(460,465),(460,255),(510,245),(630,250),(635,330),(690,170),(700,140),(800,175),(915,140),(905,260),(985,265),(960,330),(995,380),(1000,455),(1150,465),(1300,520),(1335,580),(1330,670),(1250,720),(1000,730),(300,730),(110,700)], foco=(650,400,260,200),
                   el=[(545,320,'Torre de hojaldre'),(700,470,'Venado en costra de hierbas'),(800,230,'Plumas de tuile de cacao'),(362,570,'Puré de chirivía al azafrán'),(600,585,'Salsa de vino especiado'),(1150,600,'Pan tostado como base')])),
  10: dict(back=(300,150,1110,490), puerta=[(915,200),(1070,200),(1070,490),(915,490)],
           ped=[[(548,370),(570,345),(620,325),(700,320),(780,330),(830,370),(832,390),(810,440),(850,455),(908,490),(910,550),(955,555),(958,605),(1005,610),(1005,668),(358,668),(360,610),(410,605),(410,555),(455,550),(458,490),(510,458),(560,445),(550,400)]],
           atr=[(985,460),(1090,460),(1098,512),(1080,520),(1075,620),(1085,645),(1005,645),(1012,620),(1012,520),(985,512)],
           obra=(690,395), humo=(650,330),
           plt=dict(horizonte=340, plato=[(165,560),(180,470),(250,400),(320,330),(450,290),(600,262),(700,255),(860,260),(1000,275),(1120,310),(1190,370),(1230,450),(1235,540),(1215,600),(1100,660),(900,710),(600,720),(380,700),(220,660),(170,620)], foco=(680,430,200,120),
                    el=[(520,500,'Tortilla de maíz azul'),(690,410,'Mole negro'),(820,470,'Espuma de cacao'),(692,585,'Flor de calabaza'),(960,470,'Polvo de chapulín')])),
  11: dict(back=(300,40,1100,530), puerta=[(902,196),(1034,196),(1034,530),(902,530)],
           ped=[[(500,405),(555,385),(560,345),(600,335),(650,350),(700,355),(740,350),(800,355),(830,385),(872,400),(860,425),(835,440),(930,462),(925,490),(918,500),(918,668),(452,668),(452,500),(438,470),(500,440)]],
           atr=[(960,412),(1050,408),(1078,465),(1035,470),(1028,475),(1028,600),(1065,660),(985,672),(1005,605),(1008,478),(965,470)],
           obra=(690,390),
           plt=dict(horizonte=440, plato=[(90,700),(120,680),(240,445),(480,440),(480,390),(495,300),(560,255),(600,215),(650,175),(680,110),(710,68),(720,120),(750,240),(800,260),(845,310),(860,320),(970,330),(1050,380),(1080,440),(1170,440),(1280,690),(1270,720),(100,722)], foco=(660,350,200,200),
                    el=[(660,330,'Cardo braseado'),(682,140,'Gajo de higo'),(672,228,'Durazno lacado'),(960,450,'Pan de masa madre'),(470,520,'Cubos de membrillo'),(290,550,'Hoja de salvia')])),
  12: dict(back=(400,80,1005,520), puerta=[(570,165),(800,165),(800,450),(570,450)],
           ped=[[(508,490),(560,455),(630,450),(630,410),(645,378),(670,385),(700,410),(720,435),(790,450),(825,462),(868,490),(868,705),(508,705)]],
           atr=[(885,385),(970,383),(968,395),(958,400),(958,540),(985,545),(895,545),(912,538),(912,400),(888,395)],
           obra=(680,445),
           plt=dict(horizonte=200, plato=elipse(690,470,690,282), extra=[[(540,180),(580,130),(610,70),(660,60),(700,100),(740,110),(760,180),(745,240),(720,300),(600,300)]], foco=(650,330,120,250),
                    el=[(650,165,'Columna de tuile y crema'),(930,450,'Pescado blanco con beurre blanc'),(752,555,'Verduras torneadas')])),
}

def mascara(polys, W, H, pluma=1.2):
    m = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(m)
    for p in polys:
        d.polygon([tuple(map(float, q)) for q in p], fill=255)
    return np.array(m.filter(ImageFilter.GaussianBlur(pluma))).astype(np.float32) / 255

def rellenar(rgb, hueco, donante=None):
    h = (hueco > 0.02).astype(np.uint8) * 255
    h = cv2.dilate(h, np.ones((9, 9), np.uint8))
    small = cv2.resize(rgb, None, fx=0.25, fy=0.25, interpolation=cv2.INTER_AREA)
    hs = cv2.resize(h, (small.shape[1], small.shape[0]), interpolation=cv2.INTER_NEAREST)
    fs = cv2.inpaint(small, hs, 9, cv2.INPAINT_TELEA)
    up = cv2.resize(fs, (rgb.shape[1], rgb.shape[0]), interpolation=cv2.INTER_CUBIC)
    out = rgb.astype(np.float32).copy()
    out[h > 0] = up[h > 0]
    if donante is not None:
        f = rgb.astype(np.float32)
        det = np.roll(f - cv2.GaussianBlur(f, (0, 0), 6), donante, axis=(0, 1))
        out[h > 0] += det[h > 0] * 0.9
    else:
        # grano fino para que el relleno no se vea plástico (sin copiar objetos de otra zona)
        ruido = cv2.GaussianBlur(np.random.default_rng(7).normal(0, 3.2, rgb.shape[:2]).astype(np.float32), (0, 0), 0.7)
        out[h > 0] += ruido[h > 0][:, None]
    return np.clip(out, 0, 255).astype(np.uint8)

def lum(rgb):
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(np.float32) / 255
    return cv2.GaussianBlur(g, (0, 0), 3)

def guardar_rgba(rgb, a, ruta):
    Image.fromarray(np.dstack([rgb, (a * 255).astype(np.uint8)]), 'RGBA').save(ruta, quality=90)

def guardar_prof(d, ruta, blur=2):
    Image.fromarray((np.clip(d, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur)).save(ruta)

def cercania(s):
    return np.clip((s * (0.95 * NB + 0.05) - 0.05) / 0.95, 0, 1)

def caja(poly, W, H, margen=6):
    xs = [p[0] for p in poly]; ys = [p[1] for p in poly]
    return [round(max(0, min(xs) - margen) / W, 4), round(max(0, min(ys) - margen) / H, 4),
            round(min(W, max(xs) + margen) / W, 4), round(min(H, max(ys) + margen) / H, 4)]

def procesar(n, sp, salida):
    os.makedirs(salida, exist_ok=True)
    med = {}
    # ───── sala ─────
    rgb = np.array(Image.open(f'{ORIGEN}/imagenes-espacios/espacio_sala{n:02d}.jpeg').convert('RGB'))
    H, W = rgb.shape[:2]
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    x0, y0, x1, y1 = sp['back']
    cx, cy, hw, hh = (x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0) / 2, (y1 - y0) / 2
    s = np.maximum(np.abs(x - cx) / hw, np.abs(y - cy) / hh)
    d = cercania(np.maximum(s, 1))
    im = Image.fromarray((d * 255).astype(np.uint8))
    ImageDraw.Draw(im).polygon([tuple(map(float, q)) for q in sp['puerta']], fill=int(0.12 * 255))
    d = np.array(im.filter(ImageFilter.GaussianBlur(4))).astype(np.float32) / 255
    mp = mascara(sp['ped'], W, H)
    ma = mascara([sp['atr']], W, H)
    fondo = rellenar(rgb, np.maximum(mp, ma))
    Image.fromarray(fondo).save(f'{salida}/sala-fondo.webp', quality=88)
    guardar_prof(d + (lum(fondo) - 0.3) * 0.03, f'{salida}/sala-fondo-prof.png', 1)

    def n_suelo(yb):
        return float(cercania(max(1.0, (yb - cy) / hh)))
    todos = [q for p in sp['ped'] for q in p]
    yb_ped = max(q[1] for q in sp['ped'][0])
    n_ped = n_suelo(yb_ped) - 0.03
    ped_rgb = rellenar(rgb, ma * (mp > 0.5), donante=None)
    xs = [q[0] for q in todos]
    pcx, prx = (min(xs) + max(xs)) / 2, (max(xs) - min(xs)) / 2
    ped_x, ped_mp = x.copy(), mp.copy()
    yb_atr = max(q[1] for q in sp['atr'])
    n_atr = n_suelo(yb_atr) - 0.02
    guardar_rgba(rgb, ma, f'{salida}/sala-atril.webp')
    axs = [q[0] for q in sp['atr']]
    acx, arx = (min(axs) + max(axs)) / 2, (max(axs) - min(axs)) / 2
    da = n_atr + 0.02 * np.clip(1 - ((x - acx) / arx) ** 2, 0, 1) + (lum(rgb) - 0.3) * 0.03
    guardar_prof(da, f'{salida}/sala-atril-prof.png', 2)
    pxs = [q[0] for q in sp['puerta']]; pys = [q[1] for q in sp['puerta']]
    med['sala'] = dict(ancho=W, alto=H, cajaPed=caja(todos, W, H), cajaAtr=caja(sp['atr'], W, H),
                       nPed=round(n_ped, 3), nAtr=round(n_atr, 3), centro=[cx, cy],
                       obra=list(sp['obra']), atril=[round(acx), round(min(q[1] for q in sp['atr']) + (yb_atr - min(q[1] for q in sp['atr'])) * 0.55)],
                       puerta=[round(sum(pxs) / len(pxs)), round(min(pys) + (max(pys) - min(pys)) * 0.35)],
                       pedX=[min(xs), max(xs)], humo=sp.get('humo'))

    # ───── platillo ─────
    nom = 'sala06_v2.jpeg' if n == 6 else f'sala{n:02d}.jpeg'
    rgb = np.array(Image.open(f'{ORIGEN}/imagenes-salas/{nom}').convert('RGB'))
    H, W = rgb.shape[:2]
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    pl = sp['plt']
    fx, fy, frx, fry = pl['foco']
    bulto = np.exp(-(((x - fx) / frx) ** 2 + ((y - fy) / fry) ** 2))
    if pl.get('cenital'):
        Image.fromarray(rgb).save(f'{salida}/platillo-fondo.webp', quality=90)
        dd = 0.78 + 0.07 * bulto + (lum(rgb) - 0.5) * 0.04
        guardar_prof(dd, f'{salida}/platillo-fondo-prof.png', 3)
        med['platillo'] = dict(ancho=W, alto=H, capas=1, cenital=True)
    else:
        yh = pl['horizonte']
        polys = [pl['plato']] + pl.get('extra', [])
        mpl = mascara(polys, W, H, 1.2)
        fondo = rellenar(rgb, mpl, donante=None)
        Image.fromarray(fondo).save(f'{salida}/platillo-fondo.webp', quality=88)
        dfo = np.where(y < yh, 0.12 + 0.05 * (y / max(yh, 1)), 0.30 + 0.62 * np.clip((y - yh) / max(H - yh, 1), 0, 1))
        guardar_prof(dfo.astype(np.float32), f'{salida}/platillo-fondo-prof.png', 6)
        guardar_rgba(rgb, mpl, f'{salida}/platillo-plato.webp')
        todos = [q for p in polys for q in p]
        ys = [q[1] for q in todos]
        yt, yb = min(ys), max(ys)
        dpl = 0.70 + 0.22 * np.clip((y - yt) / max(yb - yt, 1), 0, 1) + 0.08 * bulto + (lum(rgb) - 0.3) * 0.05
        guardar_prof(dpl, f'{salida}/platillo-plato-prof.png', 2)
        med['platillo'] = dict(ancho=W, alto=H, capas=2, caja=caja(todos, W, H), yt=yt, yb=yb)
    # el platillo de la sala se sustituye por el de la vista de cerca
    plato = np.array(Image.open(f'{salida}/platillo-plato.webp' if not pl.get('cenital') else f'{salida}/platillo-fondo.webp').convert('RGBA'))
    rgb2, a2, sa = componer(n, ped_rgb, ped_mp, plato, pl.get('cenital', False))
    guardar_rgba(rgb2, a2, f'{salida}/sala-pedestal.webp')
    ys_, xs_ = np.where(a2 > 0.02)
    H2, W2 = a2.shape
    med['sala']['cajaPed'] = [round(max(0, xs_.min() - 8) / W2, 4), round(max(0, ys_.min() - 8) / H2, 4),
                              round(min(W2, xs_.max() + 8) / W2, 4), round(min(H2, ys_.max() + 8) / H2, 4)]
    chico = cv2.resize(rgb2, (ped_mp.shape[1], ped_mp.shape[0]), interpolation=cv2.INTER_AREA)
    dp = n_ped + 0.03 * np.clip(1 - ((ped_x - pcx) / prx) ** 2, 0, 1) + (lum(chico) - 0.3) * 0.04 + 0.03 * cv2.GaussianBlur(sa, (0, 0), 4)
    guardar_prof(dp, f'{salida}/sala-pedestal-prof.png', 2)
    med['platillo']['elementos'] = [dict(x=e[0], y=e[1], texto=e[2]) for e in pl['el']]
    med['platillo']['centro'] = [fx, fy]
    return med

if __name__ == '__main__':
    cuales = [int(a) for a in sys.argv[1:]] or sorted(SALAS)
    medidas = {}
    ruta_med = os.path.join(RAIZ, 'herramientas', 'medidas.json')
    if os.path.exists(ruta_med):
        medidas = json.load(open(ruta_med))
    for n in cuales:
        medidas[str(n)] = procesar(n, SALAS[n], os.path.join(RAIZ, 'public', 'salas', f'{n:02d}'))
        print('sala', n, 'lista')
    json.dump(medidas, open(ruta_med, 'w'), ensure_ascii=False, indent=1)
