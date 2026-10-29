import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLang } from '../lang';
import { viewport } from '../motion';
import SectionTitle from './SectionTitle';

export default function Timeline() {
  const { t } = useLang();
  const tl = t.timeline;
  const ref = useRef(null);
  // la línea se dibuja a medida que se hace scroll por la sección
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <section id="experiencia" className="section">
      <SectionTitle tag={tl.tag} title={tl.title} subtitle={tl.subtitle} />

      <div className="timeline" ref={ref}>
        <div className="timeline-track" />
        <motion.div className="timeline-progress" style={{ scaleY }} />
        {tl.items.map((item, i) => (
          <motion.div
            key={i}
            className={`timeline-item ${i % 2 ? 'right' : 'left'}`}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={`timeline-dot ${item.actual ? 'is-current' : ''}`} />
            <div className="timeline-card glass">
              <span className="timeline-date mono">{item.fecha}</span>
              <h3>{item.titulo}</h3>
              <p className="timeline-place">{item.lugar}</p>
              <ul>
                {item.puntos.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
