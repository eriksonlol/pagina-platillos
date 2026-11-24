# Sustituye el platillo que Gemini dibujó en la sala por el mismo platillo de la vista
# de cerca, para que al acercarse no cambie. Trabaja sobre la capa del pedestal, que
# se guarda al doble de resolución para que la toma "La obra" se vea nítida.
import numpy as np, cv2
from PIL import Image

E = 2  # escala de la capa del pedestal

# Por sala, en píxeles del render de la sala:
#   borrar: (x0, y0, x1, y1, y_apoyo): caja del platillo original. Lo que queda por encima
#           de y_apoyo se vuelve transparente; lo de abajo se rellena con el propio pedestal.
#   centro, base, ancho: dónde se apoya el platillo nuevo; aplasta: escorzo vertical.
#   fuente: recorte en la imagen de cerca (opcional). cuadro: para vistas cenitales.
PLATILLOS = {
  1: dict(borrar=(566, 396, 800, 462, 452), centro=683, base=468, ancho=255, aplasta=0.8),
  2: dict(borrar=(608, 494, 767, 560, 547), centro=688, base=561, ancho=165, aplasta=0.7),
  3: dict(borrar=(626, 336, 754, 431, 427), centro=690, base=431, ancho=128, aplasta=1.0, fuente=(560, 30, 820, 372)),
  4: dict(borrar=(543, 383, 847, 506, 470), centro=695, base=508, ancho=305, aplasta=0.85),
  5: dict(cuadro=[(566, 463), (821, 463), (826, 536), (548, 536)]),
  6: dict(borrar=(450, 476, 925, 606, 575), centro=688, base=612, ancho=475, aplasta=0.6),
  7: dict(borrar=(506, 452, 868, 626, 600), centro=687, base=630, ancho=360, aplasta=0.8),
  8: dict(borrar=(518, 372, 860, 548, 520), centro=688, base=560, ancho=480, aplasta=0.6),
  9: dict(borrar=(520, 346, 854, 576, 560), centro=690, base=580, ancho=365, aplasta=0.9),
  10: dict(borrar=(538, 310, 838, 471, 462), centro=688, base=472, ancho=305, aplasta=0.7),
  11: dict(borrar=(493, 326, 877, 461, 452), centro=685, base=464, ancho=390, aplasta=0.8),
  12: dict(borrar=(546, 360, 828, 485, 476), centro=687, base=488, ancho=290, aplasta=0.55),
}

def _caja_suave(H, W, x0, y0, x1, y1, pluma=3):
    m = np.zeros((H, W), np.float32)
    m[int(y0):int(y1), int(x0):int(x1)] = 1
    return cv2.GaussianBlur(m, (0, 0), pluma)

def componer(n, ped_rgb, mp, plato_rgba, cenital=False):
    """Devuelve (rgb, alfa) al doble de resolución y la máscara del platillo nuevo a 1x."""
    c = PLATILLOS[n]
    H, W = mp.shape
    rgb = cv2.resize(ped_rgb, (W * E, H * E), interpolation=cv2.INTER_CUBIC).astype(np.float32)
    a = cv2.resize(mp, (W * E, H * E), interpolation=cv2.INTER_LINEAR)
    ref = None
    if 'borrar' in c:
        x0, y0, x1, y1, ya = [v * E for v in c['borrar']]
        caja = _caja_suave(H * E, W * E, x0, y0, x1, y1, 4)
        ref = ped_rgb[int(y0 / E):int(y1 / E), int(x0 / E):int(x1 / E)].reshape(-1, 3).astype(np.float32)
        arriba = _caja_suave(H * E, W * E, x0, y0, x1, ya, 4)
        abajo = np.clip(caja - arriba, 0, 1)
        a = a * (1 - arriba)
        hueco = (abajo > 0.05).astype(np.uint8) * 255
        if hueco.any():
            r = cv2.inpaint(np.clip(rgb, 0, 255).astype(np.uint8), hueco, 7, cv2.INPAINT_TELEA).astype(np.float32)
            rgb = rgb * (1 - abajo[..., None]) + r * abajo[..., None]

    src = plato_rgba.astype(np.float32)
    if 'cuadro' in c:
        hs, ws = src.shape[:2]
        dst = np.float32([[x * E, y * E] for x, y in c['cuadro']])
        M = cv2.getPerspectiveTransform(np.float32([[0, 0], [ws, 0], [ws, hs], [0, hs]]), dst)
        cap = cv2.warpPerspective(src, M, (W * E, H * E), flags=cv2.INTER_AREA)
        sa = cap[..., 3] / 255
    else:
        al = src[..., 3]
        if 'fuente' in c:
            fx0, fy0, fx1, fy1 = c['fuente']
        else:
            ys, xs = np.where(al > 128)
            fx0, fy0, fx1, fy1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
        rec = src[fy0:fy1, fx0:fx1]
        w = int(c['ancho'] * E)
        h = int(rec.shape[0] * w / rec.shape[1] * c['aplasta'])
        rec = cv2.resize(rec, (w, h), interpolation=cv2.INTER_AREA)
        cap = np.zeros((H * E, W * E, 4), np.float32)
        px, py = int(c['centro'] * E - w / 2), int(c['base'] * E - h)
        cap[py:py + h, px:px + w] = rec
        sa = cap[..., 3] / 255
        # sombra de contacto bajo el platillo
        sombra = np.zeros((H * E, W * E), np.float32)
        cv2.ellipse(sombra, (int(c['centro'] * E), int(c['base'] * E - 3 * E)), (int(w * 0.5), int(9 * E)), 0, 0, 360, 1, -1)
        sombra = cv2.GaussianBlur(sombra, (0, 0), 6 * E) * (a > 0.3)
        rgb *= (1 - 0.45 * sombra)[..., None]
    col = cap[..., :3]
    # igualar el brillo al de la luz de la sala
    if ref is not None and ref.size:
        sel = sa > 0.5
        g = np.clip(ref.mean() / max(col[sel].mean(), 1), 0.55, 1.15)
        col = col * g
    rgb = col * sa[..., None] + rgb * (1 - sa[..., None])
    a = np.maximum(a, sa)
    sa1 = cv2.resize(sa, (W, H), interpolation=cv2.INTER_AREA)
    return np.clip(rgb, 0, 255).astype(np.uint8), np.clip(a, 0, 1), sa1
