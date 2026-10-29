import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiVite, SiNodedotjs, SiMysql, SiGithub, SiMongodb, SiExpress, SiGit,
} from 'react-icons/si';
import { TbBrandCSharp, TbApi } from 'react-icons/tb';
import { useLang } from '../lang';
import { fadeUp, stagger, viewport } from '../motion';
import SectionTitle from './SectionTitle';

// Dos anillos que giran en sentidos opuestos; cada ícono contra-gira para quedar derecho
const rings = [
  {
    radius: 'var(--r1)',
    duration: 40,
    items: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'C#', Icon: TbBrandCSharp, color: '#b18cff' },
      { name: 'MySQL', Icon: SiMysql, color: '#4FA3D1' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FBF4A' },
    ],
  },
  {
    radius: 'var(--r2)',
    duration: 60,
    reverse: true,
    items: [
      { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', Icon: SiCss, color: '#2e8bf0' },
      { name: 'Vite', Icon: SiVite, color: '#a78bff' },
      { name: 'Express', Icon: SiExpress, color: '#e8e8f0' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'APIs', Icon: TbApi, color: '#2E9BF0' },
      { name: 'Git', Icon: SiGit, color: '#F05033' },
      { name: 'GitHub', Icon: SiGithub, color: '#ffffff' },
    ],
  },
];

export default function TechOrbit() {
  const { t } = useLang();
  const { grupos } = t.stack;
  const [hovered, setHovered] = useState(null);

  return (
    <section id="stack" className="section">
      <SectionTitle tag={t.stack.tag} title={t.stack.title} subtitle={t.stack.subtitle} />

      <div className="stack-grid">
        <motion.div
          className="orbit"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbit-core">
            <motion.span
              key={hovered?.name ?? 'core'}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: hovered?.color }}
              className="mono"
            >
              {hovered ? hovered.name : '</>'}
            </motion.span>
          </div>

          {rings.map((ring, r) => (
            <motion.div
              key={r}
              className="orbit-ring"
              style={{ '--radius': ring.radius }}
              animate={{ rotate: ring.reverse ? -360 : 360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
            >
              {ring.items.map((t, i) => {
                const angle = (360 / ring.items.length) * i;
                return (
                  <div key={t.name} className="orbit-slot" style={{ '--angle': `${angle}deg` }}>
                    <motion.div
                      animate={{ rotate: ring.reverse ? 360 : -360 }}
                      transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
                    >
                      <motion.button
                        type="button"
                        className="orbit-item"
                        style={{ '--c': t.color, rotate: -angle }}
                        aria-label={t.name}
                        whileHover={{ scale: 1.3 }}
                        onPointerEnter={() => setHovered(t)}
                        onPointerLeave={() => setHovered(null)}
                        onFocus={() => setHovered(t)}
                        onBlur={() => setHovered(null)}
                      >
                        <t.Icon aria-hidden="true" />
                      </motion.button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        <motion.ul className="stack-list" variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={viewport}>
          {grupos.map((g) => (
            <motion.li key={g.titulo} className="glass" variants={fadeUp} whileHover={{ x: 8 }}>
              <h3>{g.titulo}</h3>
              <p>{g.items}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
