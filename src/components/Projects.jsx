import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import { LuExternalLink, LuArrowRight, LuCheck, LuLock, LuConstruction, LuBookOpen, LuPlay, LuKeyRound, LuCopy } from 'react-icons/lu';
import { asset, contacto } from '../data';
import { useLang } from '../lang';
import { viewport } from '../motion';
import CaseStudy from './CaseStudy';
import SectionTitle from './SectionTitle';

function BrowserMockup({ p, labels }) {
  const content = (
    <>
      <div className="mockup-bar">
        <i /><i /><i />
        <span className="mockup-url mono"><LuLock /> {p.dominio}</span>
      </div>
      <div className="mockup-screen">
        <img src={asset(p.imagen)} alt={`${labels.captura} ${p.nombre}`} loading="lazy" />
        {p.enConstruccion ? (
          <div className="ribbon mono" aria-label={labels.construccion}>
            <span><LuConstruction /> {labels.construccion}</span>
          </div>
        ) : (
          <span className="mockup-cta mono">{labels.verVivo} <LuExternalLink /></span>
        )}
      </div>
    </>
  );

  if (p.enConstruccion) return <div className="mockup">{content}</div>;
  return (
    <a href={p.demo} target="_blank" rel="noreferrer" className="mockup" aria-label={`${labels.abrir} ${p.nombre}`}>
      {content}
    </a>
  );
}

// Usuario y contraseña de la demo, con botón para copiar cada uno
function DemoCredentials({ c, labels }) {
  const [copiado, setCopiado] = useState(null);

  const copy = async (campo, valor) => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(campo);
      setTimeout(() => setCopiado(null), 1500);
    } catch {
      // sin permiso de portapapeles: el texto igual queda visible para copiarlo a mano
    }
  };

  return (
    <div className="demo-creds mono">
      <span className="demo-creds-title"><LuKeyRound aria-hidden="true" /> {labels.accesoDemo}</span>
      {[['email', c.email], ['clave', c.clave]].map(([campo, valor]) => (
        <button key={campo} type="button" onClick={() => copy(campo, valor)} aria-label={`${labels.copiar}: ${valor}`}>
          <span>{valor}</span>
          {copiado === campo ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
          <span className="sr-only" role="status">{copiado === campo ? labels.copiado : ''}</span>
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ p, featured, labels, onCase }) {
  return (
    <motion.article
      layout
      className={`project glass ${featured ? 'project-featured' : ''}`}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <BrowserMockup p={p} labels={labels} />
      <div className="project-body">
        <div className="project-tags">
          {p.cliente && <span className="tag tag-client mono">● {labels.cliente}</span>}
          {p.enConstruccion && <span className="tag tag-wip mono">{labels.construccion}</span>}
          {p.demoAbierta && <span className="tag tag-demo mono"><LuPlay /> {labels.demoTag}</span>}
          <span className="tag mono">{p.categoriaLabel}</span>
        </div>
        <h3>{p.nombre}</h3>
        <p className="project-summary">{p.resumen}</p>
        <ul className="project-points">
          {p.puntos.map((pt) => (
            <li key={pt}><LuCheck /> {pt}</li>
          ))}
        </ul>
        <div className="project-stack">
          {p.stack.map((s) => <span key={s} className="mono">{s}</span>)}
        </div>
        {p.credenciales && <DemoCredentials c={p.credenciales} labels={labels} />}
        {p.caso && (
          <motion.button type="button" className="case-btn mono" onClick={() => onCase(p)} whileHover={{ x: 4 }} data-umami-event="caso-de-estudio" data-umami-event-proyecto={p.id}>
            <LuBookOpen /> {labels.caso} <LuArrowRight />
          </motion.button>
        )}
        <div className="project-links">
          {p.enConstruccion ? (
            <span className="soon">
              <LuConstruction /> {labels.proximamente}
            </span>
          ) : (
            <motion.a href={p.demo} target="_blank" rel="noreferrer" className="primary" whileTap={{ scale: 0.95 }} data-umami-event={p.demoAbierta ? 'probar-demo' : 'ver-sitio'} data-umami-event-proyecto={p.id}>
              {p.demoAbierta ? <LuPlay /> : <LuExternalLink />} {p.demoAbierta ? labels.probarDemo : labels.verSitio}
            </motion.a>
          )}
          <motion.a href={p.repo} target="_blank" rel="noreferrer" whileTap={{ scale: 0.95 }} data-umami-event="ver-codigo" data-umami-event-proyecto={p.id}>
            <FaGithub /> {labels.codigo}
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useLang();
  const pr = t.projects;
  const [filtro, setFiltro] = useState(0);
  // se guarda el id (no el objeto) para que el caso cambie de idioma si se cambia con la ventana abierta
  const [casoId, setCasoId] = useState(null);
  const caso = pr.items.find((p) => p.id === casoId);
  const closeCase = useCallback(() => setCasoId(null), []);
  const visibles = pr.items.filter((p) => filtro === 0 || p.categoria === filtro);

  return (
    <section id="proyectos" className="section">
      <SectionTitle tag={pr.tag} title={pr.title} subtitle={pr.subtitle} />

      <motion.div
        className="filters"
        role="group"
        aria-label={pr.filtrar}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
      >
        {pr.categorias.map((c, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={filtro === i}
            className={`filter mono ${filtro === i ? 'is-active' : ''}`}
            onClick={() => setFiltro(i)}
          >
            {filtro === i && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <span className="filter-label">{c}</span>
          </button>
        ))}
      </motion.div>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {visibles.map((p) => (
            <ProjectCard key={p.id} p={p} featured={filtro === 0 && p.destacado} labels={pr} onCase={(p) => setCasoId(p.id)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="projects-cta glass"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
      >
        <p>{pr.ctaTexto}</p>
        <div className="projects-cta-actions">
          <motion.a href="#contacto" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {pr.ctaBoton} <LuArrowRight />
          </motion.a>
          <motion.a href={contacto.github} target="_blank" rel="noreferrer" className="btn btn-ghost" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FaGithub /> {pr.ctaGithub}
          </motion.a>
        </div>
      </motion.div>

      <AnimatePresence>{caso && <CaseStudy p={caso} onClose={closeCase} />}</AnimatePresence>
    </section>
  );
}
