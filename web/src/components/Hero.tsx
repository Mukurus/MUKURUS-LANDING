import { useEffect, useRef, type CSSProperties } from 'react';
import VIDEO_SRC from '../assets/media/equipo-mukurus.mp4';
import POSTER_SRC from '../assets/media/equipo-mukurus-poster.webp';
import { brand } from '../content';
import { Cloud, Feather, plumas } from './Sky';
import { IconArrow } from './Icons';
import './Hero.css';

const order = (i: number) => ({ '--i': i }) as CSSProperties;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // El video (1,3 MB) se pide recién después de que la página terminó de cargar,
  // así no compite con el texto y las fuentes. Con "reducir movimiento" o
  // "ahorro de datos" queda solo el poster.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduceMotion || saveData) return;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!video.src) return;
      if (visible) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);

    const start = () => {
      video.src = VIDEO_SRC;
      if (visible) video.play().catch(() => {});
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      window.removeEventListener('load', start);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <Cloud left="-140px" top="80%" width={440} height={170} opacity={0.85} dur={64} delay={-20} className="only-wide" />
      <Cloud left="44%" top="700px" width={330} height={140} opacity={0.7} dur={82} delay={-30} className="only-wide" />
      <Cloud right="-60px" top="58%" width={480} height={170} opacity={0.6} dur={71} delay={-55} />
      <Cloud left="12%" bottom="-60px" width={620} height={220} opacity={0.9} />
      <Cloud right="8%" bottom="-80px" width={700} height={240} opacity={0.85} />

      <Feather pluma={plumas.roja1} size={230} rot={-24} left="57%" top="24%" dur={15} delay={-2} className="only-wide" eager />
      <Feather pluma={plumas.mostaza1} size={96} rot={38} left="26%" top="71%" dur={19} delay={-7} className="only-wide" eager />
      <Feather pluma={plumas.teal1} size={120} rot={18} right="1%" top="61%" dur={12} delay={-4} eager />
      <Feather pluma={plumas.teal2} size={110} rot={-58} left="48%" top="67%" dur={22} delay={-13} className="only-wide" eager />
      <Feather pluma={plumas.mostaza2} size={150} rot={-12} left="39%" top="76%" dur={17} delay={-9} eager />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" style={order(0)}>
            Somos Aves,
            <br /> nuestra forma de volar es <span className="hero-accent">crear</span>
          </h1>
          <p className="hero-lead" style={order(1)}>
            {brand.description}
          </p>
          <p className="hero-proof" style={order(2)}>
            <b>+90% de las marcas</b> que han trabajado con nuestra bandada siguen llevando sus ideas más lejos.
          </p>
          <div className="hero-ctas" style={order(3)}>
            <a className="btn btn-sun" href="#paquetes">
              Ver paquetes
              <IconArrow />
            </a>
            <a className="btn btn-ghost" href="#portafolio">
              Ver portafolio
            </a>
          </div>
        </div>

        <div className="hero-media">
          <figure className="phone">
            <div className="phone-screen">
              <video
                ref={videoRef}
                poster={POSTER_SRC}
                muted
                loop
                playsInline
                preload="none"
                width={720}
                height={1280}
                aria-label="Video de presentación del equipo de Mukurus"
              />
            </div>
            <figcaption>Conocé al equipo</figcaption>
          </figure>

          <div className="metric-card" aria-hidden="true">
            <p className="metric-label">Alcance del mes</p>
            <p className="metric-value">+10 marcas</p>
            <div className="metric-bars">
              {[40, 62, 50, 86, 70].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} className={i === 3 ? 'is-peak' : i % 2 ? 'is-mid' : undefined} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap hero-foot">
        <p className="hero-claim">
          Diseño con intención,
          <br /> redes con estrategia
        </p>
        <div className="hero-badge">
          <p className="hero-badge-label">Agencia creativa · {brand.country}</p>
          <p className="hero-badge-years">+3 años de marcas</p>
        </div>
      </div>
    </section>
  );
}
