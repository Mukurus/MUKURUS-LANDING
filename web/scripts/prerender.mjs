// Pre-renderiza la landing a HTML estático después de `vite build`.
// Así el contenido completo llega en el HTML (bueno para SEO y para la
// primera pintura) y React solo lo hidrata en el navegador.

import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

try {
  process.loadEnvFile(path.join(root, '.env'));
} catch {
  // Sin .env: se usa SITE_URL del entorno, si existe.
}

const siteUrl = (process.env.SITE_URL ?? '').trim().replace(/\/+$/, '');
if (siteUrl && !/^https?:\/\/[^/]+$/.test(siteUrl)) {
  throw new Error(`SITE_URL debe ser solo el dominio con protocolo, por ejemplo https://www.mukurus.com (recibido: ${siteUrl})`);
}

const { render, buildHead } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
for (const marker of ['<!--app-head-->', '<!--app-html-->', '<title>Mukurus</title>']) {
  if (!template.includes(marker)) throw new Error(`No se encontró ${marker} en dist/index.html`);
}

const html = template
  .replace(/\n\s*<title>Mukurus<\/title>/, '')
  .replace('<!--app-head-->', buildHead(siteUrl || undefined))
  .replace('<!--app-html-->', render());

await writeFile(path.join(dist, 'index.html'), html);

const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : []), ''];
await writeFile(path.join(dist, 'robots.txt'), robots.join('\n'));

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
} else {
  console.warn(
    '\n⚠  SITE_URL no está definida: se omitieron canonical, og:url, og:image y sitemap.xml.' +
      '\n   Creá un archivo .env con SITE_URL=https://tu-dominio (ver .env.example) y volvé a compilar.\n',
  );
}

await rm(ssrDir, { recursive: true, force: true });
console.log(`✓ Pre-renderizado: dist/index.html (${Math.round(html.length / 1024)} KB)`);
