import { motion } from 'framer-motion';
import { LuQuote } from 'react-icons/lu';
import { useLang } from '../lang';
import { fadeUp, stagger, viewport } from '../motion';
import SectionTitle from './SectionTitle';

// Solo se muestra cuando hay testimonios cargados en data.js
export default function Testimonials() {
  const { t } = useLang();
  const ts = t.testimonios;
  if (!ts.items.length) return null;

  return (
    <section id="testimonios" className="section">
      <SectionTitle tag={ts.tag} title={ts.title} />
      <motion.div className="testimonials" variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={viewport}>
        {ts.items.map((item) => (
          <motion.figure key={item.nombre} className="testimonial glass" variants={fadeUp}>
            <LuQuote className="testimonial-icon" />
            <blockquote>{item.texto}</blockquote>
            <figcaption>
              <strong>{item.nombre}</strong>
              <span>{item.cargo} · {item.empresa}</span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
