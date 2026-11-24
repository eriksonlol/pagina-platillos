# Genera las capas (fondo rellenado, pedestal, atril) y sus mapas de profundidad de la Sala 1.
# Requiere: pip install opencv-python-headless pillow numpy
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFilter
OUT='/home/user/pagina-platillos/public/salas/01/'

def mascara(poly, W, H, pluma=1.0):
    m=Image.new('L',(W,H),0); ImageDraw.Draw(m).polygon(poly,fill=255)
    return np.array(m.filter(ImageFilter.GaussianBlur(pluma))).astype(np.float32)/255

def rellenar(rgb, hueco, radio=9, donante=None):
    """Rellena el hueco a escala reducida y luego a escala completa (más suave en zonas grandes)."""
    h=(hueco>0.02).astype(np.uint8)*255
    h=cv2.dilate(h,np.ones((9,9),np.uint8))
    small=cv2.resize(rgb,None,fx=0.25,fy=0.25,interpolation=cv2.INTER_AREA)
    hs=cv2.resize(h,(small.shape[1],small.shape[0]),interpolation=cv2.INTER_NEAREST)
    fs=cv2.inpaint(small,hs,radio,cv2.INPAINT_TELEA)
    up=cv2.resize(fs,(rgb.shape[1],rgb.shape[0]),interpolation=cv2.INTER_CUBIC)
    base=rgb.copy(); base[h>0]=up[h>0]
    out=cv2.inpaint(base,cv2.erode(h,np.ones((5,5),np.uint8)) if False else np.zeros_like(h),3,cv2.INPAINT_TELEA)
    # textura: un poco de grano de la imagen original para que no se vea liso
    out=out.astype(np.float32)
    if donante is not None:
        # detalle de alta frecuencia copiado de otra zona de la misma imagen (piso, roca)
        f=rgb.astype(np.float32); det=f-cv2.GaussianBlur(f,(0,0),6)
        det=np.roll(det,donante,axis=(0,1))
        out[h>0]+=det[h>0]*1.1
    else:
        ruido=(np.random.default_rng(1).normal(0,5,rgb.shape)).astype(np.float32)
        out[h>0]+=ruido[h>0]
    return np.clip(out,0,255).astype(np.uint8)

def guardar_rgba(rgb, a, nombre):
    rgba=np.dstack([rgb,(a*255).astype(np.uint8)])
    Image.fromarray(rgba,'RGBA').save(OUT+nombre,quality=92)

def guardar_prof(d, nombre, blur=2):
    Image.fromarray((np.clip(d,0,1)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur)).save(OUT+nombre)

def lum(rgb):
    g=cv2.cvtColor(rgb,cv2.COLOR_RGB2GRAY).astype(np.float32)/255
    return cv2.GaussianBlur(g,(0,0),3)

# ───────── Sala ─────────
rgb=np.array(Image.open('/mnt/project-files/imagenes-espacios/espacio_sala01.jpeg').convert('RGB'))
H,W=rgb.shape[:2]
y,x=np.mgrid[0:H,0:W].astype(np.float32)
ped=[(476,466),(492,457),(560,451),(572,444),(600,437),(645,428),(652,412),(672,404),(700,402),(735,406),(752,420),(760,433),(792,440),(800,452),(866,456),(874,467),(862,478),(836,489),(818,494),(822,520),(826,560),(818,610),(812,645),(800,668),(700,676),(590,674),(552,665),(544,630),(540,580),(545,520),(548,494),(505,488),(484,478)]
atr=[(803,519),(812,510),(822,506),(860,505),(906,503),(913,512),(909,548),(898,552),(900,600),(900,650),(904,672),(905,700),(870,706),(808,702),(806,676),(816,640),(820,600),(822,556),(806,555)]
mp=mascara(ped,W,H); ma=mascara(atr,W,H)

# fondo sin objetos
fondo=rellenar(rgb,np.maximum(mp,ma),donante=(0,-400))
Image.fromarray(fondo).save(OUT+'sala-fondo.webp',quality=90)
back=np.full((H,W),0.30,np.float32)
floor=0.30+0.70*np.clip((y-440)/(H-440),0,1)
ceil=0.30+0.55*np.clip((140-y)/140,0,1)
left=0.30+0.55*np.clip((380-x)/380,0,1)
right=0.30+0.55*np.clip((x-1090)/286,0,1)
d=np.maximum.reduce([back,floor,ceil,left,right])
im=Image.fromarray((d*255).astype(np.uint8)); dr=ImageDraw.Draw(im)
dr.polygon([(755,135),(1060,125),(1085,520),(1000,525),(995,205),(850,215),(850,450),(800,455),(760,450)],fill=int(0.38*255))
dr.polygon([(852,205),(995,200),(997,445),(852,447)],fill=int(0.14*255))
d=np.array(im.filter(ImageFilter.GaussianBlur(4))).astype(np.float32)/255
# relieve fino de la roca a partir de la luminancia
d+= (lum(fondo)-0.3)*0.04
guardar_prof(d,'sala-fondo-prof.png',1)

# pedestal: tapar lo que el atril oculta con pixeles del propio pedestal
ped_rgb=rellenar(rgb,ma*(mp>0.5))
guardar_rgba(ped_rgb,mp,'sala-pedestal.webp')
dp=0.72+0.07*np.clip((y-450)/225,0,1)+0.03*np.clip(1-((x-683)/175)**2,0,1)
dp+= (lum(rgb)-0.3)*0.05
dp+= 0.03*np.exp(-(((x-700)/60)**2+((y-425)/22)**2))  # la carne sobresale
guardar_prof(dp,'sala-pedestal-prof.png',2)

guardar_rgba(rgb,ma,'sala-atril.webp')
da=0.86+0.03*np.clip(1-((x-858)/50)**2,0,1)+0.02*np.clip((y-505)/200,0,1)+(lum(rgb)-0.3)*0.03
guardar_prof(da,'sala-atril-prof.png',2)

# ───────── Platillo ─────────
rgb=np.array(Image.open('/mnt/project-files/imagenes-salas/sala01.jpeg').convert('RGB'))
H,W=rgb.shape[:2]
y,x=np.mgrid[0:H,0:W].astype(np.float32)
plato=[(145,505),(200,465),(270,440),(290,405),(360,375),(380,355),(420,370),(500,360),(550,345),(560,320),(600,305),(800,305),(835,330),(850,345),(900,360),(950,355),(1010,365),(1040,385),(1060,380),(1100,410),(1190,425),(1260,460),(1292,520),(1290,580),(1250,625),(1160,690),(950,718),(650,732),(350,722),(200,690),(155,630),(142,560)]
mpl=mascara(plato,W,H,1.2)
fondo=rellenar(rgb,mpl)
Image.fromarray(fondo).save(OUT+'platillo-fondo.webp',quality=90)
dfo=np.where(y<375,0.12+0.05*(y/375),0.30+0.62*np.clip((y-375)/(H-375),0,1))
guardar_prof(dfo.astype(np.float32),'platillo-fondo-prof.png',6)
guardar_rgba(rgb,mpl,'platillo-plato.webp')
dpl=0.70+0.22*np.clip((y-360)/370,0,1)
dpl+=0.07*np.exp(-(((x-700)/150)**2+((y-385)/70)**2))
dpl+=(lum(rgb)-0.3)*0.06
guardar_prof(dpl,'platillo-plato-prof.png',2)
print('ok')
