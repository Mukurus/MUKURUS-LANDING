import type { CSSProperties } from 'react';
import roja1 from '../assets/plumas/roja-1.webp';
import roja2 from '../assets/plumas/roja-2.webp';
import mostaza1 from '../assets/plumas/mostaza-1.webp';
import mostaza2 from '../assets/plumas/mostaza-2.webp';
import teal1 from '../assets/plumas/teal-1.webp';
import teal2 from '../assets/plumas/teal-2.webp';
import './Sky.css';

export const plumas = {
  roja1: { src: roja1, w: 460, h: 297 },
  roja2: { src: roja2, w: 240, h: 172 },
  mostaza1: { src: mostaza1, w: 188, h: 188 },
  mostaza2: { src: mostaza2, w: 300, h: 194 },
  teal1: { src: teal1, w: 240, h: 224 },
  teal2: { src: teal2, w: 220, h: 162 },
};

type Vars = CSSProperties & Record<`--${string}`, string | number>;

type FeatherProps = {
  pluma: (typeof plumas)[keyof typeof plumas];
  /** Ancho en pantalla, en px */
  size: number;
  rot: number;
  /** Posición, en cualquier unidad CSS */
  left?: string;
  right?: string;
  top: string;
  /** Duración y desfase del vuelo, en segundos */
  dur?: number;
  delay?: number;
  className?: string;
  eager?: boolean;
};

export function Feather({ pluma, size, rot, left, right, top, dur = 15, delay = 0, className, eager }: FeatherProps) {
  const style: Vars = { left, right, top, '--rot': `${rot}deg`, '--dur': `${dur}s`, '--delay': `${delay}s` };
  return (
    <div className={className ? `feather ${className}` : 'feather'} style={style} aria-hidden="true">
      <img
        src={pluma.src}
        alt=""
        width={pluma.w}
        height={pluma.h}
        style={{ width: size }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}

type CloudProps = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  width: number;
  height: number;
  opacity?: number;
  /** Duración y desfase de la deriva, en segundos. Sin `dur` la nube queda quieta. */
  dur?: number;
  delay?: number;
  className?: string;
};

export function Cloud({ left, right, top, bottom, width, height, opacity = 0.85, dur, delay = 0, className }: CloudProps) {
  const style: Vars = { left, right, top, bottom, width, height, '--o': opacity };
  if (dur) {
    style['--dur'] = `${dur}s`;
    style['--delay'] = `${delay}s`;
  }
  const classes = ['cloud', dur ? 'cloud--drift' : '', className ?? ''].filter(Boolean).join(' ');
  return <div className={classes} style={style} aria-hidden="true" />;
}
