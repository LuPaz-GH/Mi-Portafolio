import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import { LuX } from 'react-icons/lu';
import { asset } from '../data';
import { useLang } from '../lang';

// Ventana con el caso de estudio de un proyecto. Se cierra con Esc, con la X o haciendo clic afuera.
export default function CaseStudy({ p, onClose }) {
  const { t } = useLang();
  const dialogRef = useRef(null);

  // onClose llega memorizado (useCallback), así el efecto corre una sola vez por apertura
  useEffect(() => {
    const opener = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return;
      // mantiene el foco del teclado dentro de la ventana
      const focusables = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      opener?.focus?.(); // devuelve el foco al botón que abrió la ventana
    };
  }, [onClose]);

  return (
    <motion.div
      className="case-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="case"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="case-close" onClick={onClose} aria-label={t.casos.cerrar} autoFocus>
          <LuX />
        </button>

        <div className="case-hero">
          <img src={asset(p.imagen)} alt="" />
        </div>

        <div className="case-body">
          <span className="section-tag">// {t.projects.caso.toLowerCase()}</span>
          <h2 id="case-title">{p.nombre}</h2>
          <p className="case-lead">{p.caso.bajada}</p>

          <div className="project-stack">
            {p.stack.map((s) => <span key={s} className="mono">{s}</span>)}
          </div>

          <div className="case-sections">
            {p.caso.secciones.map(([titulo, texto], i) => (
              <motion.section
                key={titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
              >
                <h3><span className="mono">{String(i + 1).padStart(2, '0')}</span> {titulo}</h3>
                <p>{texto}</p>
              </motion.section>
            ))}
          </div>

          <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <FaGithub /> {t.projects.codigo}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
