# Audit SEO · Landing de Mukurus

Fecha: 8 de octubre de 2026
Alcance: página única (one-page) de captación. Se auditaron dos fuentes:

- `mukurus-landing.html`: archivo plano actual.
- `prototipo/Main.dc.html` y `prototipo/Movil.dc.html`: prototipo más completo exportado del lienzo de diseño.

El sitio todavía no está publicado, así que no hay datos de Search Console, tráfico ni posiciones. El audit es técnico y on-page, hecho sobre el código fuente.

Contexto asumido: agencia creativa en Nicaragua (teléfono +505) que vende paquetes mensuales de redes sociales, fotografía, branding y diseño web. El objetivo de la página es que el visitante entienda la oferta y escriba por WhatsApp.

---

## Resumen ejecutivo

**Estado general: no está lista para posicionar ni para compartirse.** El diseño y la oferta son claros para quien ya conoce a Mukurus. Para Google y para quien llega desde un link compartido falta lo básico: la página no dice qué es Mukurus ni dónde está, no tiene imagen de vista previa y pesa más de lo necesario.

Problemas principales:

1. **El título y el H1 no dicen qué hace Mukurus.** "Mukurus · Menú de servicios 2026" y "Elegí hasta dónde querés volar" no contienen ninguna búsqueda real (redes sociales, branding, fotografía, Nicaragua).
2. **Los links compartidos salen sin imagen.** No hay `og:image`, `og:url` ni tarjeta de Twitter/X. En WhatsApp e Instagram, que son los canales de venta de Mukurus, el link aparece como texto plano.
3. **No hay canonical, robots.txt, sitemap, favicon ni datos estructurados.** Google no recibe señales de qué entidad es Mukurus ni de qué ofrece.
4. **Peso y velocidad.** El HTML plano pesa 308 KB: 89 KB son la fuente Copeland en base64 dentro del CSS y unos 185 KB son 18 copias de plumas SVG. En el prototipo, el video del hero pesa 12,5 MB.
5. **El contenido del HTML plano depende de JavaScript para verse.** Todo lo que tiene la clase `.reveal`, incluido el H1, arranca con `opacity: 0`. Si el script falla o tarda, la página queda en blanco, y además retrasa el LCP.

Mejoras rápidas, ya aplicadas en `web/`: título y descripción nuevos, metadatos Open Graph, favicon, fuentes autoalojadas, imágenes optimizadas y HTML pre-renderizado.

---

## Hallazgos técnicos

### T1. No hay canonical ni URL definida
- **Impacto:** alto
- **Evidencia:** ninguna de las dos fuentes tiene `<link rel="canonical">` ni `og:url`.
- **Fix:** canonical autorreferente con el dominio final y la misma URL en `og:url` y en el sitemap.
- **Estado:** resuelto en `web/`. Se genera al compilar desde la variable `SITE_URL`. **Pendiente: definir el dominio.**

### T2. Sin robots.txt ni sitemap.xml
- **Impacto:** medio (es una sola página, pero el sitemap hace falta para enviarlo a Search Console)
- **Evidencia:** no existen.
- **Fix:** `robots.txt` que permita todo y apunte al sitemap, y `sitemap.xml` con la URL canónica.
- **Estado:** resuelto en `web/`. Se generan en el build (el sitemap solo si `SITE_URL` está definida).

### T3. Fuente Copeland embebida en base64 (89 KB) y bloqueante
- **Impacto:** alto (LCP y peso)
- **Evidencia:** línea 15 de `mukurus-landing.html`: `@font-face{src:url(data:font/otf;base64,...)}` dentro del `<style>` del `<head>`. El navegador no pinta nada hasta descargarla, no se puede cachear aparte y está en OTF en lugar de WOFF2. El prototipo no la carga: depende de que la fuente esté instalada en la computadora.
- **Fix:** subconjunto latino (español completo) en WOFF2 autoalojado, con `preload` y `font-display: swap`.
- **Estado:** resuelto. Pasa de 89 KB a 18 KB (−80 %).

### T4. Google Fonts como recurso externo bloqueante
- **Impacto:** medio
- **Evidencia:** `<link href="https://fonts.googleapis.com/css2?family=Quicksand...">` en las dos versiones. Agrega dos conexiones a terceros antes del primer render.
- **Fix:** autoalojar Quicksand (variable, WOFF2, solo los subconjuntos de caracteres que se usan).
- **Estado:** resuelto con `@fontsource-variable/quicksand`.

### T5. Imágenes decorativas pesadas o duplicadas
- **Impacto:** medio
- **Evidencia:** el HTML plano tiene 18 SVG de plumas en línea, de unos 10 KB cada uno y casi idénticos (3 colores × 2 variantes). El prototipo usa 6 PNG que suman 630 KB.
- **Fix:** 6 archivos WebP con transparencia, del doble del tamaño en pantalla, cacheables.
- **Estado:** resuelto. Las 6 plumas suman 86 KB (−86 %).

### T6. Video del hero de 12,5 MB
- **Impacto:** alto en móvil (datos y LCP)
- **Evidencia:** `7c3b6d…mp4` del prototipo: 1080×1920, 12 Mbps y con pista de audio, aunque se reproduce silenciado.
- **Fix:** recodificar a 720×1280 H.264 sin audio, con `faststart`. Mostrar primero un poster liviano y cargar el video después del evento `load`. No se carga si el usuario activó "reducir movimiento" o "ahorro de datos".
- **Estado:** resuelto. El video pasa a 1,3 MB (−89 %) y el poster pesa 38 KB.

### T7. Contenido oculto hasta que corre JavaScript
- **Impacto:** alto (LCP, accesibilidad y riesgo de página en blanco)
- **Evidencia:** en el HTML plano, `.reveal{opacity:0}` se aplica también al `h1` del hero y solo se quita con un `IntersectionObserver`.
- **Fix:** el contenido es visible por defecto. La entrada del hero es una animación CSS corta, y las animaciones al hacer scroll usan `animation-timeline: view()` solo donde el navegador lo soporta.
- **Estado:** resuelto.

### T8. Aplicación de una sola página sin HTML pre-renderizado (riesgo del nuevo stack)
- **Impacto:** alto si no se mitiga
- **Evidencia:** un React clásico entrega un `<div id="root">` vacío, y el contenido aparece recién cuando se ejecuta el JavaScript.
- **Fix:** pre-renderizar en el build (`renderToString`) e hidratar en el cliente. El HTML final trae todo el texto, los precios y los enlaces.
- **Estado:** resuelto (`scripts/prerender.mjs`).

### T9. Mobile
- **Impacto:** bajo
- **Evidencia:** el viewport está bien configurado y el HTML plano es responsive. El prototipo usa artboards de ancho fijo (1440 y 390 px).
- **Fix:** un solo layout responsive, con objetivos táctiles de 44 px o más y sin scroll horizontal.
- **Estado:** resuelto en `web/`.

### T10. HTTPS
- **Impacto:** alto (factor de confianza)
- **Fix:** publicar en un hosting con HTTPS automático (Cloudflare Pages, Netlify o Vercel) y redirigir `http` y la variante `www` o sin `www` a una sola URL.
- **Estado:** pendiente, depende del hosting.

---

## Hallazgos on-page

### O1. Title tag sin búsqueda objetivo
- **Impacto:** alto
- **Evidencia:** `Mukurus · Menú de servicios 2026` (32 caracteres). La marca va primero, siendo una marca que todavía nadie busca, y "menú de servicios" no es una consulta real.
- **Fix:** `Agencia de redes sociales y branding en Nicaragua | Mukurus` (59 caracteres). Primero la consulta y la marca al final.
- **Estado:** resuelto.

### O2. Meta description corta y sin llamada a la acción
- **Impacto:** medio (afecta el CTR)
- **Evidencia:** tiene 82 caracteres y nombra NIDO, VUELO y CIELO, que nadie busca.
- **Fix:** `Agencia creativa en Managua: redes sociales, branding, fotografía y diseño web en toda Nicaragua. Paquetes desde USD 80 al mes, pagables en 2 cuotas.` (149 caracteres)
- **Estado:** resuelto.

### O3. El H1 y el hero no describen el servicio
- **Impacto:** medio
- **Evidencia:** el H1 del HTML plano es "Elegí hasta dónde querés volar" y el del prototipo es "Somos Aves, nuestra forma de volar es crear". Ninguno menciona redes, branding, fotografía ni Nicaragua. En el HTML plano, el primer texto descriptivo aparece recién en la segunda sección.
- **Fix aplicado:** se mantiene el H1 de marca del prototipo y justo debajo va una línea descriptiva: "Diseño gráfico, community management y fotografía para marcas que quieren verse bien y sonar mejor." Así, las palabras clave quedan entre las primeras 100 palabras.
- **Decisión abierta:** si Google reescribe el título en los resultados por no coincidir con el H1, la alternativa es usar como H1 la línea descriptiva y dejar "Somos Aves…" como titular visual.

### O4. Jerarquía de encabezados
- **Impacto:** bajo
- **Evidencia:** en el HTML plano, las tarjetas de detalle de cada paquete no tienen encabezado (el nombre está en un `span.ck`) y los H2 son solo "NIDO", "VUELO" y "CIELO". En el prototipo, las tarjetas de paquetes complementarios usan `h4` directamente bajo un `h3`, lo cual es correcto, pero los nombres de los paquetes no forman parte de ningún encabezado de sección.
- **Fix:** un solo H1, un H2 por sección (Paquetes, Portafolio, Reseñas, Contacto) y un H3 por paquete, proyecto o testimonio.
- **Estado:** resuelto.

### O5. Sin datos estructurados
- **Impacto:** medio
- **Evidencia:** no hay ningún bloque `application/ld+json`.
- **Fix:** JSON-LD con `Organization` (logo, teléfono, Instagram en `sameAs`, base en Managua y `areaServed`: Nicaragua) y un `OfferCatalog` con los 6 paquetes y sus precios en USD. Se generan desde los mismos datos que muestra la página, así nunca se desincronizan.
- **Importante:** **no** se marcan las reseñas con `Review` ni `AggregateRating`. Google no muestra estrellas para reseñas que una empresa publica sobre sí misma y puede tomarlo como spam.
- **Estado:** resuelto.

### O6. Sin vista previa para redes y WhatsApp
- **Impacto:** alto para este negocio
- **Evidencia:** no hay `og:image`, `og:type`, `og:locale` ni `twitter:card`.
- **Fix:** imagen OG de 1200×630 generada desde el hero real y todas las etiquetas Open Graph y de Twitter.
- **Estado:** resuelto. Las URLs absolutas dependen de `SITE_URL`.

### O7. Imágenes
- **Impacto:** bajo
- **Evidencia:** las plumas decorativas ya estaban ocultas para lectores de pantalla y el logo y la foto de portafolio tienen `alt`. Faltan el ancho y el alto declarados, lo que provoca saltos de layout (CLS).
- **Fix:** `width` y `height` en todas las imágenes, `loading="lazy"` debajo del pliegue y `alt` descriptivo solo en las imágenes con contenido.
- **Estado:** resuelto.

---

## Hallazgos de contenido

### C1. Confianza (E-E-A-T)
- El HTML plano no tiene portafolio, reseñas, equipo ni ubicación. El prototipo agrega portafolio, 3 reseñas, el video del equipo y "+3 años". Es un salto grande en señales de confianza, por eso la nueva versión parte del prototipo.
- **Resuelto:** la ubicación. La agencia tiene base en Managua y trabaja en todo el país, y así figura en contacto, en el pie, en la meta descripción y en los datos estructurados. El título mantiene "Nicaragua" para no limitar el alcance, y "Managua" suma la búsqueda local con intención de compra.
- **Pendiente:** imágenes reales para 3 de los 4 proyectos del portafolio (Kelly Valle Coach, Los Pipitos y Nick Tuckler hoy muestran un mosaico de color) y el correo de contacto (en el prototipo dice "[tu correo]").

### C2. Inconsistencias de texto (corregidas en `web/`)
| Prototipo | Corregido | Motivo |
|---|---|---|
| Marcas con las que **trabajé** | Marcas con las que **trabajamos** | El resto del sitio habla en plural ("nuestra bandada", "respondemos") |
| **Cuentanos** de tu marca | **Contanos** de tu marca | Falta la tilde y el sitio usa voseo ("Elegí", "querés", "Pedí") |
| Lo que dicen **Nuestros** clientes | Lo que dicen **nuestros** clientes | Mayúscula sobrante |
| **Escribime** (navegación) | **Escribinos** | Consistencia con el plural |
| Contame qué necesitás | Contanos qué necesitás | Ídem |
| Diseñá tu marca. **Vela** volar (H1 móvil) | Se usa el H1 de escritorio | Parece un error de tipeo y el titular debe ser el mismo en todos los tamaños |

Las reseñas se dejaron con el texto de los clientes. Solo se ajustaron espacios dobles y el signo de apertura `¡`.

### C3. Búsquedas objetivo sugeridas
Validar con Google Search Console a las 4 o 6 semanas de publicar:
- agencia de redes sociales Nicaragua / Managua
- community manager Nicaragua
- diseño de logo / identidad de marca Nicaragua
- fotografía para marcas / fotografía de producto Managua
- diseño de páginas web Nicaragua

### C4. Fechas
"Menú de servicios 2026" y "© 2026" son promesas de vigencia. Hay que actualizarlas cada año o quitarlas del contenido indexable.

---

## Autoridad y SEO local (fuera de la página)

- **Google Business Profile:** para una agencia local es la palanca más grande, más que cualquier ajuste on-page. Crearlo con categoría "Agencia de marketing" o "Servicio de marketing en redes sociales", el teléfono, el sitio y fotos del equipo.
- **Nombre, teléfono y sitio iguales en todas partes:** Instagram, Facebook, Google Business Profile y directorios.
- **Link en la bio de Instagram** apuntando al sitio.
- **Pedir reseñas en Google** a los clientes que ya dejaron testimonio en el sitio (Alice Miranda, Nick Tuckler, Mood Market).
- **Links desde clientes:** pedir a China Mall, Los Pipitos y los demás un crédito "Diseño: Mukurus" con enlace.

---

## Plan de acción priorizado

**1. Crítico (antes de publicar)**
- [ ] Definir el dominio y publicar con HTTPS (T1, T10)
- [ ] Compilar con `SITE_URL` para generar canonical, Open Graph y sitemap
- [x] HTML pre-renderizado con todo el contenido (T8)
- [x] Contenido visible sin JavaScript (T7)

**2. Alto impacto**
- [x] Title, description, Open Graph e imagen de vista previa (O1, O2, O6)
- [x] Fuentes autoalojadas en WOFF2 y medios optimizados (T3 a T6)
- [x] JSON-LD de organización y catálogo de servicios (O5)
- [ ] Alta en Google Search Console y Bing Webmaster Tools, y envío del sitemap
- [ ] Google Business Profile

**3. Mejoras rápidas**
- [x] Favicon e ícono para iOS
- [x] Jerarquía de encabezados y textos corregidos (O4, C2)
- [ ] Correo de contacto e imágenes de portafolio reales (C1)
- [x] Ubicación: Managua como base, cobertura en toda Nicaragua (C1)
- [x] "Pagalo en 2 cuotas" en los paquetes mensuales
- [ ] Link en la bio de Instagram

**4. Largo plazo**
- [ ] Una página por caso de portafolio (`/portafolio/china-mall`) con proceso, piezas y resultados. Cada una puede posicionar por "branding para [rubro]" y enlaza al formulario.
- [ ] Sección de preguntas frecuentes (cuotas, permanencia, pauta, tiempos de entrega)
- [ ] Revisar posiciones 8 a 20 en Search Console cada mes y ajustar títulos o contenido
