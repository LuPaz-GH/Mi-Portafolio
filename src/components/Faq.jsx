import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuPlus } from 'react-icons/lu';
import { useLang } from '../lang';
import { fadeUp, stagger, viewport } from '../motion';
import SectionTitle from './SectionTitle';

export default function Faq() {
  const { t } = useLang();
  const f = t.faq;
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <SectionTitle tag={f.tag} title={f.title} subtitle={f.subtitle} />

      <motion.div className="faq" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
        {f.items.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <motion.div key={i} className={`faq-item glass ${isOpen ? 'is-open' : ''}`} variants={fadeUp}>
              <button
                type="button"
                id={`faq-q-${i}`}
                className="faq-q"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
              >
                <span>{q}</span>
                <motion.span className="faq-icon" aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }}>
                  <LuPlus />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
