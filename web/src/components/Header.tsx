import { useEffect, useState } from 'react';
import logo from '../assets/logo-mukurus.webp';
import { nav, whatsappLink } from '../content';
import { IconClose, IconMenu, IconWhatsApp } from './Icons';
import './Header.css';

export default function Header() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState<string>('inicio');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Marca en la navegación la sección que ocupa el centro de la pantalla.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = (onNavigate?: () => void) =>
    nav.map((item) => (
      <a
        key={item.id}
        href={`#${item.id}`}
        className={active === item.id ? 'is-active' : undefined}
        aria-current={active === item.id ? 'true' : undefined}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    ));

  return (
    <header className={`site-header${compact ? ' is-compact' : ''}`}>
      <div className="wrap header-bar">
        <a className="brand-logo" href="#inicio">
          <img src={logo} alt="Mukurus" width={480} height={327} />
        </a>

        <nav className="nav-pill" aria-label="Secciones">
          {links()}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href={whatsappLink()} target="_blank" rel="noopener">
            <IconWhatsApp />
            <span>Escribinos</span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id="menu-movil" className="mobile-menu" hidden={!open}>
        <nav aria-label="Secciones (móvil)">{links(() => setOpen(false))}</nav>
        <a className="btn btn-sun btn-block" href={whatsappLink()} target="_blank" rel="noopener">
          <IconWhatsApp />
          Escribinos por WhatsApp
        </a>
      </div>
    </header>
  );
}
