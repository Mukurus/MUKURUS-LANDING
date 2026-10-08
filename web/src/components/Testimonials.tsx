import { initials, testimonials, type Testimonial } from '../content';
import { Feather, plumas } from './Sky';
import { IconStar } from './Icons';
import './Testimonials.css';

function Review({ review, duplicate }: { review: Testimonial; duplicate?: boolean }) {
  return (
    <figure className="review" aria-hidden={duplicate || undefined}>
      <div className="review-stars" role="img" aria-label="5 de 5 estrellas">
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar key={i} />
        ))}
      </div>
      <blockquote>
        <p>{review.quote}</p>
      </blockquote>
      <figcaption>
        <span className="review-avatar" style={{ background: review.color }} aria-hidden="true">
          {initials(review.name)}
        </span>
        <span>
          <span className="review-name">{review.name}</span>
          <span className="review-role">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section id="resenas" className="section reviews" aria-labelledby="resenas-title">
      <Feather pluma={plumas.roja2} size={120} rot={26} right="6%" top="80px" dur={18} delay={-6} />

      <div className="wrap reviews-head reveal">
        <p className="eyebrow">Reseñas</p>
        <h2 id="resenas-title" className="section-title">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      {/* El carrusel repite las reseñas una vez para que el bucle sea continuo;
          la copia queda oculta para lectores de pantalla. */}
      <div className="marquee">
        <div className="marquee-track">
          {testimonials.map((review) => (
            <Review key={review.name} review={review} />
          ))}
          {testimonials.map((review) => (
            <Review key={`${review.name}-copia`} review={review} duplicate />
          ))}
        </div>
      </div>
    </section>
  );
}
