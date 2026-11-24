# Del fuego al lienzo · Museo virtual de arte gastronómico

Museo 3D de doce salas sobre la evolución del montaje, de la Prehistoria a la Edad Moderna.
Proyecto final de *Arte en Platillos y Montaje*. Hecho con React, Three.js y React Three Fiber.

## Estado

Prototipo de la **Sala 1 · Prehistoria** como recorrido cinematográfico: la sala se construye con
los renders de Gemini, cada uno con un mapa de profundidad (`*-prof.png`, blanco = cerca) que da
paralaje 2.5D. Encima se animan la brasa, el humo y las chispas. La cámara pasa entre tomas
(sala, obra, platillo, pinturas, atril) y el recorrido guiado cambia de toma al ritmo de la audioguía.

## Cómo se recorre

- Mover el cursor o arrastrar para mirar alrededor.
- Tocar los puntos de luz, o los botones de toma, para acercarse.
- «Recorrido guiado» reproduce la audioguía y mueve la cámara con ella.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera dist/ para publicar (Vercel o Netlify)
```

- El contenido de cada sala está en `src/data/salas.ts`.
- Las imágenes de cada sala van en `public/salas/NN/`.
- Para usar la grabación final de la audioguía, copia el archivo a `public/salas/NN/` y pon su ruta en
  el campo `audio` de la sala. Mientras ese campo sea `null` se usa una voz provisional del navegador.
- Las tomas, los puntos de luz y los cambios del recorrido guiado se definen en `salas.ts` con
  coordenadas en píxeles del render.
