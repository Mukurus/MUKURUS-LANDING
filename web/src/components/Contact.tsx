import type { FormEvent } from 'react';
import { brand, contact, extras, plans, whatsappLink } from '../content';
import { IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons';
import './Contact.css';

const UNDECIDED = 'Todavía no lo sé';

const options = [
  ...plans.map((plan) => `${plan.tier.toUpperCase()} · ${plan.name}`),
  ...extras.map((extra) => `${extra.tier.toUpperCase()} · ${extra.name}`),
  UNDECIDED,
];

// El formulario no necesita servidor: arma el mensaje y lo abre en WhatsApp.
function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('nombre') ?? '').trim();
  const plan = String(data.get('paquete') ?? '');
  const message = String(data.get('mensaje') ?? '').trim();

  const text = [
    `¡Hola Mukurus! Soy ${name}.`,
    plan === UNDECIDED ? 'Todavía no sé qué paquete me conviene.' : `Me interesa el paquete ${plan}.`,
    message,
  ]
    .filter(Boolean)
    .join(' ');

  window.open(whatsappLink(text), '_blank', 'noopener');
}

export default function Contact() {
  return (
    <section id="contacto" className="section contact" aria-labelledby="contacto-title">
      <div className="wrap contact-grid">
        <div className="contact-intro reveal">
          <p className="eyebrow">Contacto</p>
          <h2 id="contacto-title" className="section-title">
            Contanos de tu marca
          </h2>
          <p className="contact-lead">
            Respondemos en menos de 24 horas hábiles con una propuesta y un rango de inversión.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-icon">
                <IconPhone />
              </span>
              <a href={whatsappLink()} target="_blank" rel="noopener">
                <span className="sr-only">WhatsApp: </span>
                {contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <span className="contact-icon">
                <IconInstagram />
              </span>
              <a href={contact.instagramUrl} target="_blank" rel="noopener">
                <span className="sr-only">Instagram: </span>
                {contact.instagramHandle}
              </a>
            </li>
            {contact.email && (
              <li>
                <span className="contact-icon">
                  <IconMail />
                </span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            )}
            <li>
              <span className="contact-icon">
                <IconPin />
              </span>
              <span className="contact-text">{brand.coverage}</span>
            </li>
          </ul>
        </div>

        <form className="contact-form reveal" action={whatsappLink()} method="get" target="_blank" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" placeholder="Tu nombre y empresa" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="paquete">Paquete de interés</label>
            <select id="paquete" name="paquete">
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows={3} placeholder="Contanos qué necesitás y para cuándo" />
          </div>
          <button type="submit" className="btn btn-sun btn-block">
            <IconWhatsApp size={20} />
            Enviar por WhatsApp
          </button>
          <p className="form-note">Se abre WhatsApp con tu mensaje listo para enviar.</p>
        </form>
      </div>
    </section>
  );
}
