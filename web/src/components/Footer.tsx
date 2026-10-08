import logo from '../assets/logo-mukurus-claro.webp';
import { brand, contact } from '../content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <a className="footer-logo" href="#inicio">
          <img src={logo} alt="Mukurus, volver al inicio" width={480} height={327} loading="lazy" />
        </a>
        <p className="footer-tagline">Branding | Social Media | Fotografía · {brand.city}, {brand.country}</p>
        <nav className="footer-nav" aria-label="Pie de página">
          <a href="#paquetes">Paquetes</a>
          <a href="#portafolio">Portafolio</a>
          <a href="#contacto">Contacto</a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener">
            Instagram
          </a>
        </nav>
      </div>
      <div className="wrap footer-legal">
        <p>
          © {brand.year} {brand.name}. {brand.tagline}.
        </p>
      </div>
    </footer>
  );
}
