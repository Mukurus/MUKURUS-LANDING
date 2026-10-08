import { initials, projects, whatsappLink, type Project } from '../content';
import './Portfolio.css';

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    const { src, alt, width, height } = project.image;
    return <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
  }
  // Mosaico de color mientras no esté la imagen del proyecto.
  return (
    <div
      className="project-tile"
      style={{ background: `linear-gradient(135deg, ${project.tone[0]} 0%, ${project.tone[1]} 100%)` }}
      aria-hidden="true"
    >
      <span>{initials(project.client)}</span>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portafolio" className="section portfolio" aria-labelledby="portafolio-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Portafolio</p>
            <h2 id="portafolio-title" className="section-title">
              Marcas con las que trabajamos
            </h2>
          </div>
          <a
            className="text-link"
            href={whatsappLink('¡Hola Mukurus! ¿Me pueden compartir su portafolio completo?')}
            target="_blank"
            rel="noopener"
          >
            Pedir el portafolio completo
          </a>
        </div>

        <ul className="projects">
          {projects.map((project) => (
            <li key={project.client} className="project reveal">
              <div className="project-media">
                <ProjectMedia project={project} />
              </div>
              <div className="project-body">
                <div>
                  <h3>{project.client}</h3>
                  <p>{project.work}</p>
                </div>
                <span className="project-tag">{project.tag}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
