// Todo el texto y los datos de la landing viven acá.
// Para cambiar un precio, un paquete o una reseña, editá este archivo.

import chinaMall from './assets/portafolio/china-mall.webp';

export const brand = {
  name: 'Mukurus',
  tagline: 'Somos Aves, nuestra forma de volar es crear',
  description:
    'Diseño gráfico, community management y fotografía para marcas que quieren verse bien y sonar mejor.',
  country: 'Nicaragua',
  // Base de la agencia. No limita el servicio: se mueven a cualquier parte del país.
  city: 'Managua',
  coverage: 'Estamos en Managua y nos movemos a cualquier parte de Nicaragua',
  year: 2026,
};

// Aplica solo a los paquetes marcados con `installments: true` (hoy, Vuelo Crecimiento).
export const installments = {
  count: 2,
  label: '¡Pagalo en 2 cuotas!',
};

export const contact = {
  whatsappNumber: '50588239594',
  whatsappDisplay: '8823 9594',
  instagramUrl: 'https://www.instagram.com/mukurus_agencia/',
  instagramHandle: '@mukurus_agencia',
  // Pendiente: completar cuando exista el correo de la agencia.
  email: '' as string,
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function quoteMessage(planLabel: string, price: string) {
  return `¡Hola Mukurus! Me interesa el paquete ${planLabel} (${price}). ¿Me pueden dar más información?`;
}

export const nav = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'paquetes', label: 'Paquetes' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'contacto', label: 'Contacto' },
] as const;

export type Plan = {
  id: string;
  tier: string;
  name: string;
  price: number;
  features: string[];
  summary: string;
  featured?: boolean;
  // Muestra el tag de pago en cuotas.
  installments?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'nido-emprendedores',
    tier: 'Nido',
    name: 'Especial Emprendedores',
    price: 80,
    features: [
      '4 publicaciones al mes',
      '4 historias al mes',
      '1 reel corto al mes (hasta 20 seg)',
      'Programación de contenido',
    ],
    summary: 'Ideal para marcas que están iniciando su presencia digital de forma ordenada.',
  },
  {
    id: 'nido-esencial',
    tier: 'Nido',
    name: 'Esencial',
    price: 110,
    features: [
      '8 publicaciones al mes',
      '4 historias al mes',
      '1 reel corto al mes (hasta 30 seg)',
      '1 sesión fotográfica básica (15–20 fotos editadas)',
      'Programación y respuesta básica a comentarios',
    ],
    summary:
      'Ideal para marcas que están retomando o iniciando su presencia digital de forma ordenada.',
  },
  {
    id: 'vuelo-crecimiento',
    tier: 'Vuelo',
    name: 'Crecimiento',
    price: 170,
    featured: true,
    installments: true,
    features: [
      '12 publicaciones al mes (posts y carruseles)',
      '8 historias al mes',
      '3 reels cortos al mes',
      '1 sesión fotográfica ampliada (20–25 fotos)',
      'Estrategia y calendario editorial mensual',
      'Gestión activa de comentarios y mensajes',
      'Reporte mensual de métricas',
    ],
    summary:
      'Nuestro paquete más elegido por marcas personales y negocios ya establecidos que buscan crecer con consistencia.',
  },
  {
    id: 'cielo-premium',
    tier: 'Cielo',
    name: 'Premium',
    price: 250,
    features: [
      '20 publicaciones al mes (posts y carruseles)',
      '12 historias al mes',
      '4 reels cortos al mes',
      '2 sesiones fotográficas (1 ampliada + 1 básica)',
      'Calendario estratégico y apoyo en campañas pagadas',
      'Reporte detallado y reunión mensual de resultados',
    ],
    summary:
      'Para marcas que ya facturan de forma estable y quieren consolidar su lugar como referentes en su sector.',
  },
];

export type Extra = {
  id: string;
  tier: string;
  name: string;
  price: number;
  features: string[];
};

export const extras: Extra[] = [
  {
    id: 'plumaje',
    tier: 'Plumaje',
    name: 'Identidad de marca',
    price: 250,
    features: [
      'Logotipo y variaciones',
      'Paleta y tipografía de marca',
      'Manual básico de uso de marca',
      'Plantillas base para redes',
    ],
  },
  {
    id: 'habitat',
    tier: 'Hábitat',
    name: 'Diseño web',
    price: 400,
    features: [
      'Sitio de 3 a 5 secciones',
      'Diseño responsive',
      'Integración con redes y WhatsApp',
      'Velocidad y SEO on-page básico',
    ],
  },
];

export const singles = [
  { name: 'Historia', price: 7 },
  { name: 'Post', price: 10 },
  { name: 'Carrusel', price: 17 },
];

export type Project = {
  client: string;
  work: string;
  tag: string;
  image?: { src: string; alt: string; width: number; height: number };
  // Colores del mosaico mientras no haya imagen del proyecto.
  tone: [string, string];
};

export const projects: Project[] = [
  {
    client: 'China Mall Corporative',
    work: 'Community management y piezas para campañas',
    tag: 'Redes',
    image: {
      src: chinaMall,
      alt: 'Identidad de China Mall aplicada en la fachada, una taza, una bolsa, un calendario y una camiseta',
      width: 792,
      height: 612,
    },
    tone: ['#E23B37', '#F5B421'],
  },
  {
    client: 'Kelly Valle Coach',
    work: 'Identidad visual y contenido para marca personal',
    tag: 'Marca',
    tone: ['#E4573F', '#F5B421'],
  },
  {
    client: 'Los Pipitos Nicaragua',
    work: 'Piezas gráficas para campañas de sensibilización',
    tag: 'Social',
    tone: ['#0F8F89', '#86C2EE'],
  },
  {
    client: 'Nick Tuckler',
    work: 'Dirección visual y parrilla de contenido',
    tag: 'Contenido',
    tone: ['#1B2A3A', '#0A57BE'],
  },
];

export type Testimonial = { name: string; role: string; quote: string; color: string };

export const testimonials: Testimonial[] = [
  {
    name: 'Alice Miranda',
    role: 'By Vida Nica',
    quote:
      'Súper contenta con mi sesión de fotos profesionales. Todo estuvo 100% nítido: la atención, el trato y, sobre todo, el resultado final. Se nota el profesionalismo y el cariño que ponen en su trabajo. ¡Gracias, Mukurus, recomiendo totalmente!',
    color: '#0A57BE',
  },
  {
    name: 'Nick Tuckler',
    role: 'Entrenador personal',
    quote:
      'Así pasé de utilizar contenido genérico a crear contenido con identidad propia. Me contacté con MUKURUS, hicimos una sesión de fotos BRUTAL y ahora tengo algo completamente original y alineado con mi marca.',
    color: '#0F8F89',
  },
  {
    name: 'Mood Market',
    role: 'Tienda de accesorios femeninos',
    quote:
      'Ha sido una experiencia única, ya que son creativos, profesionales, cuidan cada detalle y entendieron lo que yo quería reflejar para mi marca. En fin, un gran equipo...',
    color: '#C2481F',
  },
];

// Espacio no separable: el precio nunca se parte entre dos líneas.
export const usd = (n: number) => `USD\u00a0${n}`;

export const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
