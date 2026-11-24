# Del fuego al lienzo · Museo virtual de arte gastronómico

Museo 3D de doce salas sobre la evolución del montaje, de la Prehistoria a la Edad Moderna.
Proyecto final de *Arte en Platillos y Montaje*. Hecho con React, Three.js y React Three Fiber.

## Estado

Prototipo de la **Sala 1 · Prehistoria**: cueva navegable en primera persona, platillo sobre su
pedestal, ficha curatorial y audioguía con subtítulos.

## Cómo se recorre

- Arrastrar (ratón o dedo) para mirar alrededor.
- `W A S D` o flechas para caminar, o tocar el piso para ir a ese punto.
- Tocar el platillo abre su ficha; tocar el atril reproduce la audioguía.

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
- `?vista=x,z,giro,inclinación` en la URL abre la sala en un punto concreto (útil para revisar).
