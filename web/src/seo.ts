// Metadatos del <head> y datos estructurados. Se generan en el build
// (scripts/prerender.mjs) a partir del mismo contenido que muestra la página.

import { brand, contact, extras, plans } from './content';

export const seo = {
  title: 'Agencia de redes sociales y branding en Nicaragua | Mukurus',
  description:
    'Agencia creativa en Managua: redes sociales, branding, fotografía y diseño web en toda Nicaragua. Paquetes desde USD 80 al mes, pagables en 2 cuotas.',
  ogTitle: 'Mukurus · Agencia creativa en Nicaragua',
  ogDescription:
    'Redes sociales, branding, fotografía y diseño web desde Managua a toda Nicaragua. Paquetes desde USD 80 al mes, pagables en 2 cuotas.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Mukurus: Somos Aves, nuestra forma de volar es crear',
  locale: 'es_NI',
};

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function jsonLd(siteUrl: string) {
  const url = `${siteUrl}/`;
  const offers = [
    ...plans.map((plan) => ({
      '@type': 'Offer',
      name: `${plan.tier} · ${plan.name}`,
      description: plan.features.join('. '),
      price: plan.price,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.price,
        priceCurrency: 'USD',
        unitText: 'mes',
      },
      itemOffered: { '@type': 'Service', name: `Gestión de redes sociales: ${plan.tier} ${plan.name}` },
    })),
    ...extras.map((extra) => ({
      '@type': 'Offer',
      name: `${extra.tier} · ${extra.name}`,
      description: extra.features.join('. '),
      price: extra.price,
      priceCurrency: 'USD',
      itemOffered: { '@type': 'Service', name: extra.name },
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}#organizacion`,
        name: brand.name,
        url,
        logo: `${siteUrl}/logo-mukurus.png`,
        description: brand.description,
        slogan: brand.tagline,
        address: { '@type': 'PostalAddress', addressLocality: brand.city, addressCountry: 'NI' },
        areaServed: { '@type': 'Country', name: brand.country },
        sameAs: [contact.instagramUrl],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+${contact.whatsappNumber}`,
          contactType: 'sales',
          availableLanguage: 'es',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Paquetes de Mukurus',
          itemListElement: offers,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#sitio`,
        url,
        name: brand.name,
        inLanguage: 'es',
        publisher: { '@id': `${url}#organizacion` },
      },
    ],
  };
}

/** Etiquetas del <head>. Sin `siteUrl` se omiten las que necesitan una URL absoluta. */
export function buildHead(siteUrl?: string) {
  const tags = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:site_name" content="${brand.name}" />`,
    `<meta property="og:title" content="${escape(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escape(seo.ogDescription)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];

  if (siteUrl) {
    tags.push(
      `<link rel="canonical" href="${siteUrl}/" />`,
      `<meta property="og:url" content="${siteUrl}/" />`,
      `<meta property="og:image" content="${siteUrl}${seo.ogImage}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escape(seo.ogImageAlt)}" />`,
    );
  }

  const data = JSON.stringify(jsonLd(siteUrl ?? '')).replace(/</g, '\\u003c');
  tags.push(`<script type="application/ld+json">${data}</script>`);

  return tags.join('\n    ');
}
