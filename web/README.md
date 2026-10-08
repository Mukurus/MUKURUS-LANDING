# Landing de Mukurus

Sitio de una sola página hecho con Vite + React + TypeScript. En el build se pre-renderiza a HTML estático: el contenido completo llega en el HTML (bueno para Google y para la primera carga) y React solo lo hidrata en el navegador.

## Comandos

Requiere Node 24 o superior y pnpm.

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo en http://localhost:5173 (recarga al guardar)
pnpm dev --watch  # lo mismo + chequeo de tipos de TypeScript al guardar
pnpm build        # build de producción en dist/
pnpm preview      # sirve dist/ en http://localhost:4173
```

## Antes de publicar

1. Copiá `.env.example` como `.env` y poné el dominio final:
   ```
   SITE_URL=https://www.tu-dominio.com
   ```
2. Corré `pnpm build`. Con `SITE_URL` definida se generan el canonical, `og:url`, `og:image` (la vista previa en WhatsApp e Instagram) y `sitemap.xml`. Sin `SITE_URL` el build igual funciona, pero avisa que esas etiquetas faltan.
3. El sitio se publica en Netlify desde la rama `master`. La configuración está en `netlify.toml` (raíz del repo): compila `web/` con `pnpm build` (Node 24, pnpm 11) y publica `web/dist`. Si no definís `SITE_URL`, el build usa la URL del sitio que entrega Netlify (el dominio propio cuando se conecta uno). En otro hosting estático la configuración es:
   - carpeta base: `web`
   - comando de build: `pnpm build`
   - carpeta de salida: `web/dist`
   - variable de entorno: `SITE_URL`
4. La caché del navegador se configura en `public/_headers`: los archivos con hash de `assets/` se guardan un año y el HTML se revalida en cada visita. Cloudflare Pages y Netlify lo leen solos; en Vercel hay que pasar esas reglas a `vercel.json`.

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Precios, paquetes, complementarios y piezas sueltas | `src/content.ts` |
| Portafolio y reseñas | `src/content.ts` |
| WhatsApp, Instagram y correo | `src/content.ts` (`contact`) |
| Título, descripción y vista previa para redes | `src/seo.ts` |
| Colores y tipografías | `src/styles/global.css` (variables en `:root`) |
| Imagen de vista previa (1200×630) | `public/og-image.jpg` |

**Agregar la imagen de un proyecto del portafolio:** guardala en `src/assets/portafolio/` (WebP de unos 800 px de ancho), importala al principio de `src/content.ts` como se hace con `china-mall.webp` y agregá el campo `image` al proyecto. Mientras no tenga imagen, se muestra un mosaico de color con las iniciales.

**Agregar el correo:** completá `contact.email` en `src/content.ts` y aparece solo en la sección de contacto.

**Cambiar el video del equipo:** reemplazá `src/assets/media/equipo-mukurus.mp4` (720×1280, H.264, sin audio, con `faststart`) y su poster `equipo-mukurus-poster.webp`, conservando los nombres. Vite les cambia el hash en cada build, así que nadie ve la versión anterior guardada en caché. El original en alta calidad está en `prototipo/assets/video-equipo-original.mp4`.

## Cómo está armado

```
src/
  content.ts        todo el texto y los datos
  seo.ts            <head>, Open Graph y datos estructurados (JSON-LD)
  App.tsx           orden de las secciones
  main.tsx          entrada del navegador (hidrata el HTML)
  entry-server.tsx  entrada del pre-renderizado
  components/       una sección por archivo, cada una con su CSS
  assets/           logos, plumas, imágenes y el video del equipo (Vite les agrega hash para cache)
public/
  fonts/            Copeland en WOFF2, solo caracteres latinos
scripts/
  prerender.mjs     genera dist/index.html, robots.txt y sitemap.xml
```

- **Formulario de contacto:** no necesita servidor. Arma el mensaje con los datos del formulario y abre WhatsApp listo para enviar.
- **Video:** se pide recién después de que la página terminó de cargar, y se pausa cuando sale de pantalla. Con "reducir movimiento" o "ahorro de datos" activados se muestra solo el poster.
- **Movimiento:** solo se anima `transform` y `opacity`. Todo se desactiva si el sistema tiene "reducir movimiento".

## Licencia de la tipografía

Copeland es una fuente comercial de Storytype Studio. Verificá que la licencia de Mukurus cubra el uso web (webfont) antes de publicar.
