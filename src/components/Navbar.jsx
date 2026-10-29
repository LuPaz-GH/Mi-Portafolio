import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { LuMenu, LuX } from 'react-icons/lu';
import { asset } from '../data';
import { useLang } from '../lang';

const ids = ['inicio', 'sobre-mi', 'servicios', 'proyectos', 'experiencia', 'contacto'];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle mono" role="group" aria-label="Idioma / Language">
      {['es', 'en'].map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} className={lang === l ? 'is-active' : ''}>
          {lang === l && <motion.span layoutId="lang-pill" className="lang-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
          <span className="lang-label">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [active, setActive] = useState('inicio');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="nav-progress" style={{ scaleX: progress }} />
      <div className="nav-inner">
        <a href="#inicio" className="nav-brand" onClick={() => setOpen(false)} aria-label={`lu.dev — ${t.nav.inicio}`}>
          <motion.img src={asset('logo.svg')} alt="" whileHover={{ rotate: 90, scale: 1.1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }} />
          <span>lu<span className="accent">.dev</span></span>
        </a>

        <ul className="nav-links">
          {ids.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : ''}>
                {active === id && (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="nav-label">{t.nav[id]}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <LangToggle />
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label={t.nav.menu} aria-expanded={open} aria-controls="nav-mobile">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                {open ? <LuX /> : <LuMenu />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="nav-mobile"
            className="nav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {ids.map((id, i) => (
              <motion.li key={id} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                <a href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>
                  {t.nav[id]}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
