import { motion } from 'framer-motion';
import { useLang } from '../lang';
import { stagger, viewport } from '../motion';
import { icons } from './icons';
import SectionTitle from './SectionTitle';

const step = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 16 } },
};

export default function Approach() {
  const { t } = useLang();
  const a = t.approach;

  return (
    <section id="enfoque" className="section">
      <SectionTitle tag={a.tag} title={a.title} subtitle={a.subtitle} />

      <motion.ol className="steps" variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={viewport}>
        {a.items.map((e, i) => {
          const Icon = icons[e.icono];
          return (
            <motion.li key={e.icono} className="step glass" variants={step} whileHover={{ y: -8 }}>
              <span className="step-num mono">{String(i + 1).padStart(2, '0')}</span>
              <motion.div
                className="card-icon"
                animate={{ boxShadow: ['0 0 0px #7ade30', '0 0 22px #7ade30', '0 0 0px #7ade30'] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
              >
                <Icon />
              </motion.div>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
