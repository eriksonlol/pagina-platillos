# Del fuego al lienzo · Museo virtual de arte gastronómico

Museo 3D de doce salas sobre la evolución del montaje, de la Prehistoria a la Edad Moderna.
Proyecto final de *Arte en Platillos y Montaje*. Hecho con React, Three.js y React Three Fiber.

## Estado

Prototipo de la **Sala 1 · Prehistoria**. La sala se levanta en 3D a partir de los renders de
Gemini: cada render está partido en capas (muros, pedestal, atril) y cada capa se deforma con su
mapa de profundidad (`*-prof.png`, blanco = cerca). Como la cámara es real, al moverse el atril
pasa por delante de los muros. Encima se animan la brasa, el humo y las chispas.

## Cómo se recorre

- El cursor (o el dedo) guía la mirada: la cámara se desliza hacia donde apuntas.
- Al pasar sobre un punto de luz la cámara se inclina hacia él; con clic se acerca.
- En «La obra», el análisis y el contexto flotan a los lados del pedestal.
- En «El platillo» se ve la obra desde arriba con sus elementos señalados.
- «Recorrido guiado» reproduce la audioguía y mueve la cámara con ella.
- «Salas» abre el mapa del recorrido; la puerta de cada sala lleva a la siguiente.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera dist/ para publicar (Vercel o Netlify)
```

- El contenido de cada sala está en `src/data/salas.ts`.
- Las imágenes de cada sala van en `public/salas/NN/`.
- **Audioguías (ElevenLabs):** guarda cada grabación como `public/salas/NN/audioguia.mp3`
  (por ejemplo `sala01.mp3` → `public/salas/01/audioguia.mp3`). La página la detecta sola; si el
  archivo no existe, usa una voz provisional del navegador. No hace falta tocar código.
- Durante el recorrido guiado la cámara cambia de toma según las frases del campo `guia`, y cada
  elemento del platillo con `palabra` se enciende cuando la guía la pronuncia. Si la grabación final
  cambia el ritmo, la sincronía se ajusta sola porque se mide en proporción al guion.
- Salas 2 a 12: capas generadas con `herramientas/capas.py` y datos con `herramientas/datos_salas.py`
  (escriben `public/salas/NN/` y `src/data/salas-resto.ts`). Se puede abrir una sala directo con `#sala-N`.
- Las capas, tomas, puntos de luz y paneles se definen en `salas.ts` con coordenadas en píxeles
  del render y su cercanía (0 lejos, 1 cerca).
