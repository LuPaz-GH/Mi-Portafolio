import { Fragment, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { LuDownload, LuArrowRight, LuChevronDown } from 'react-icons/lu';
import { asset } from '../data';
import { useLang } from '../lang';
import TiltCard from './TiltCard';

function useTypewriter(words, speed = 55, pause = 1700) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const full = !deleting && text === word;
    // todo cambio de estado ocurre dentro del timeout, nunca directo en el efecto
    const timeout = setTimeout(
      () => {
        if (full) {
          setDeleting(true);
        } else if (deleting && text === '') {
          setDeleting(false);
          setIndex((i) => i + 1);
        } else {
          setText(word.slice(0, text.length + (deleting ? -1 : 1)));
        }
      },
      full ? pause : deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } };
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function MagneticButton({ children, ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };

  return (
    <motion.a
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.94 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

// El texto que se tipea se oculta a los lectores de pantalla (se leería letra por letra);
// en su lugar leen una frase fija
function TypedRole({ words }) {
  const typed = useTypewriter(words);
  return (
    <>
      <span aria-hidden="true">{typed}</span>
      <span className="caret" aria-hidden="true" />
    </>
  );
}

export default function Hero() {
  const { lang, t } = useLang();
  const h = t.hero;
  const nombre = 'Luciana Daniza Paz';

  return (
    <section id="inicio" className="hero">
      <motion.div className="hero-text" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="hero-avatar-wrap">
          <div className="hero-avatar-ring" />
          <img className="hero-avatar" src={asset('Imagenes/Luciana.webp')} alt={h.foto} width="150" height="150" />
          <motion.span
            className="status-dot"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            title={h.disponible}
          />
        </motion.div>

        <motion.a variants={item} href="#contacto" className="availability">
          <span className="availability-top">
            <span className="availability-dot" />
            <strong>{h.disponible}</strong>
          </span>
          <span className="availability-role">{h.busco}</span>
        </motion.a>

        <motion.p variants={item} className="hero-hello mono">
          <span className="accent">&gt;</span> {h.hola}
        </motion.p>

        <h1 className="hero-name" aria-label={nombre}>
          {nombre.split(' ').map((word, w, words) => {
            // índice global de la primera letra de la palabra, para escalonar la animación
            const offset = words.slice(0, w).join(' ').length + (w ? 1 : 0);
            return (
              <Fragment key={word}>
                {w > 0 && ' '}
                <span className="hero-word" aria-hidden="true">
                  {word.split('').map((ch, i) => (
                    <motion.span
                      key={i}
                      className="hero-letter"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.7 + (offset + i) * 0.04, type: 'spring', stiffness: 200, damping: 14 }}
                      whileHover={{ y: -10, transition: { duration: 0.15 } }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </Fragment>
            );
          })}
        </h1>

        <motion.p variants={item} className="hero-role mono">
          {/* key: reinicia la animación de tipeo al cambiar de idioma */}
          <TypedRole key={lang} words={h.roles} />
          <span className="sr-only">{h.rolesSr}</span>
        </motion.p>

        <motion.p variants={item} className="hero-desc">
          {h.desc[0]}<strong>{h.desc[1]}</strong>{h.desc[2]}<strong>{h.desc[3]}</strong>{h.desc[4]}
        </motion.p>

        <motion.div variants={item} className="hero-actions">
          <MagneticButton href="#proyectos" className="btn btn-primary">
            {h.verTrabajos} <LuArrowRight />
          </MagneticButton>
          <MagneticButton href={asset(t.cv)} download className="btn btn-ghost" data-umami-event="descargar-cv" data-umami-event-idioma={lang}>
            {h.cv} <LuDownload />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.85, rotate: 4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="hero-frame-border">
            <TiltCard className="hero-frame" max={6}>
              <img src={asset('Imagenes/Estructura.png')} alt="Luciana programando rodeada de tecnologías" />
            </TiltCard>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre-mi"
        className="scroll-hint"
        aria-label={h.bajar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 1.8, repeat: Infinity } }}
      >
        <LuChevronDown />
      </motion.a>
    </section>
  );
}
