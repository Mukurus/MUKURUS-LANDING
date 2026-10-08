import { extras, installments, plans, quoteMessage, singles, usd, whatsappLink, type Plan } from '../content';
import { IconWhatsApp } from './Icons';
import './Packages.css';

function PlanCard({ plan }: { plan: Plan }) {
  const label = `${plan.tier.toUpperCase()} ${plan.name}`;
  const href = whatsappLink(quoteMessage(label, `${usd(plan.price)}/mes`));
  const price = (
    <div className="plan-pricing">
      <p className="plan-price">
        <span className="plan-amount">{usd(plan.price)}</span> <span className="plan-per">/ mes</span>
      </p>
      <p className="plan-installments">{installments.label}</p>
    </div>
  );

  return (
    <article className="plan-inner" aria-labelledby={`${plan.id}-name`}>
      <div className="plan-face plan-front">
        <div>
          {plan.featured && <p className="plan-badge">El más elegido</p>}
          <p className="plan-tier">{plan.tier}</p>
          <h3 className="plan-name" id={`${plan.id}-name`}>
            {plan.name}
          </h3>
        </div>
        {price}
        <ul className="plan-features">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <a className={`btn btn-block plan-cta-touch ${plan.featured ? 'btn-sun' : 'btn-outline'}`} href={href} target="_blank" rel="noopener">
          Cotizar<span className="sr-only"> {plan.tier} {plan.name}</span>
        </a>
      </div>

      <div className="plan-face plan-back">
        <div aria-hidden="true">
          <p className="plan-tier">{plan.tier}</p>
          <p className="plan-name">{plan.name}</p>
        </div>
        <p className="plan-summary">{plan.summary}</p>
        <div aria-hidden="true">{price}</div>
        <a className="btn btn-sun btn-block" href={href} target="_blank" rel="noopener">
          <IconWhatsApp size={20} />
          Cotizar<span className="sr-only"> por WhatsApp el paquete {plan.tier} {plan.name}</span>
        </a>
      </div>
    </article>
  );
}

export default function Packages() {
  return (
    <section id="paquetes" className="section packages" aria-labelledby="paquetes-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Paquetes</p>
            <h2 id="paquetes-title" className="section-title">
              Elegí a qué altura querés volar
            </h2>
          </div>
          <p className="packages-note">
            <b>Precios en dólares.</b> Los paquetes mensuales se pueden <b>pagar en {installments.count} cuotas</b> y
            requieren un <b>mínimo de permanencia de 2 meses.</b> La <b>pauta publicitaria</b> se cotiza <b>aparte.</b>
          </p>
        </div>

        <ul className="plans">
          {plans.map((plan) => (
            <li key={plan.id} className={`plan reveal${plan.featured ? ' plan--featured' : ''}`}>
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>

        <div className="extras-head reveal">
          <h3>Paquetes complementarios</h3>
          <p>
            Resuelven la pieza que falta antes o durante un paquete principal. Al combinarlos se aplica un descuento a
            convenir.
          </p>
        </div>

        <ul className="extras">
          {extras.map((extra) => (
            <li key={extra.id} className="extra reveal">
              <div className="extra-top">
                <div>
                  <p className="extra-tier">{extra.tier}</p>
                  <h4 className="extra-name">{extra.name}</h4>
                </div>
                <p className="extra-price">
                  <span>{usd(extra.price)}</span>
                  <small>proyecto único</small>
                </p>
              </div>
              <ul className="extra-features">
                {extra.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="text-link extra-link"
                href={whatsappLink(quoteMessage(`${extra.tier.toUpperCase()} ${extra.name}`, `${usd(extra.price)}, proyecto único`))}
                target="_blank"
                rel="noopener"
              >
                Cotizar {extra.name.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>

        <p className="singles reveal">
          <b>¿Necesitás una pieza suelta?</b>{' '}
          {singles.map((item, i) => (
            <span key={item.name}>
              {item.name} {usd(item.price)}
              {i < singles.length - 1 ? ', ' : '. '}
            </span>
          ))}
          <a
            className="text-link"
            href={whatsappLink('¡Hola Mukurus! ¿Me pueden compartir el tarifario completo de piezas sueltas?')}
            target="_blank"
            rel="noopener"
          >
            Pedí el tarifario completo
          </a>
        </p>
      </div>
    </section>
  );
}
