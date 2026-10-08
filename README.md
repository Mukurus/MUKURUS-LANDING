# Mukurus · Landing

Sitio web de **Mukurus**, agencia creativa de Nicaragua especializada en
**branding, social media y fotografía**.

La landing presenta el menú de servicios de la agencia: los paquetes mensuales
de redes sociales y fotografía (**NIDO**, **VUELO** y **CIELO**), los servicios
complementarios (como **PLUMAJE**, identidad de marca), el portafolio, las
reseñas de clientes y el contacto directo por WhatsApp.

## Estructura del repositorio

| Carpeta / archivo      | Contenido                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `web/`                 | Sitio en producción: Vite + React + TypeScript, pre-renderizado a HTML estático.           |
| `prototipo/`           | Prototipo de diseño de la landing (escritorio y móvil) y sus recursos originales.          |
| `mukurus-landing.html` | Versión anterior de la landing en un único archivo HTML.                                   |
| `SEO-AUDIT.md`         | Auditoría SEO del sitio.                                                                   |

## Puesta en marcha

Requisitos: Node 24 o superior y [pnpm](https://pnpm.io/).

```bash
cd web
pnpm install
pnpm dev          # servidor de desarrollo (recarga al guardar)
pnpm dev --watch  # lo mismo + chequeo de tipos de TypeScript al guardar
pnpm build        # build de producción en web/dist
```

La configuración del entorno vive en `web/.env` (ver `web/.env.example`).
Los detalles del sitio y dónde se edita cada contenido están en
[`web/README.md`](web/README.md).

## Ramas

- `master`: rama principal; concentra los cambios estables y listos para publicar.
- `develop`: rama de integración para el trabajo en curso antes de pasar a `master`.
