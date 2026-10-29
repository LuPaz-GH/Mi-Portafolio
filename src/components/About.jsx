import { motion } from 'framer-motion';
import { useLang } from '../lang';
import { fadeUp, stagger, viewport } from '../motion';
import { icons } from './icons';
import SectionTitle from './SectionTitle';
import TiltCard from './TiltCard';

// Arma las líneas del objeto de código a partir de los textos del idioma activo
function codeLines(c) {
  const prop = ([key, value], last) => [['key', `  ${key}`], ['', ': '], ['str', `"${value}"`], ['', last ? '' : ',']];
  return [
    [['kw', 'const '], ['var', c.variable], ['', ' = {']],
    prop(c.rol),
    prop(c.titulo),
    prop(c.trabajo),
    [['key', '  stack'], ['', ': ['], ['str', '"React"'], ['', ', '], ['str', '"Node.js"'], ['', ', '], ['str', '"C#"'], ['', ', '], ['str', '"MySQL"'], ['', ', '], ['str', '"MongoDB"'], ['', '],']],
    prop(c.ubicacion),
    prop(c.lema, true),
    [['', '};']],
  ];
}

export default function About() {
  const { lang, t } = useLang();
  const a = t.about;
  const lines = codeLines(a.code);

  return (
    <section id="sobre-mi" className="section">
      <SectionTitle tag={a.tag} title={a.title} />

      <div className="about-grid">
        <motion.div className="about-text glass" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <p>
            {a.text.map((part, i) => (i % 2 ? <span key={i} className="hl">{part}</span> : part))}
          </p>
        </motion.div>

        <motion.div
          className="code-window glass"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="window-bar">
            <i /><i /><i />
            <span className="mono">luciana.js</span>
          </div>
          <motion.pre key={lang} className="mono" variants={stagger(0.18)} initial="hidden" whileInView="show" viewport={viewport}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                className="code-line"
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
              >
                <span className="ln">{i + 1}</span>
                <code>
                  {line.map(([cls, txt], j) => <span key={j} className={cls}>{txt}</span>)}
                </code>
              </motion.div>
            ))}
            <span className="caret" />
          </motion.pre>
        </motion.div>
      </div>

      <motion.div className="cards-3" variants={stagger(0.18)} initial="hidden" whileInView="show" viewport={viewport}>
        {a.cards.map((exp) => {
          const Icon = icons[exp.icono];
          return (
            <motion.div key={exp.icono} variants={fadeUp}>
              <TiltCard className="card glass">
                <motion.div
                  className="card-icon"
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon />
                </motion.div>
                <h3>{exp.titulo}</h3>
                <p>{exp.texto}</p>
                <motion.div className="badges" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewport}>
                  {exp.badges.map(([name, color]) => (
                    <motion.span
                      key={name}
                      className="badge mono"
                      style={{ '--badge': color }}
                      variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } }}
                      whileHover={{ y: -4, scale: 1.08 }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </motion.div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
