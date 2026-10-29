import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { whatsappMsg } from '../data';
import { useLang } from '../lang';
import { fadeUp, stagger, viewport } from '../motion';
import { icons } from './icons';
import SectionTitle from './SectionTitle';
import TiltCard from './TiltCard';

export default function Services() {
  const { t } = useLang();
  const s = t.services;

  return (
    <section id="servicios" className="section">
      <SectionTitle tag={s.tag} title={s.title} subtitle={s.subtitle} />

      <motion.div className="services-grid" variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={viewport}>
        {s.items.map((item, i) => {
          const Icon = icons[item.icono];
          return (
            <motion.div key={item.icono} variants={fadeUp}>
              <TiltCard className="service glass" max={8}>
                <span className="service-num mono">{String(i + 1).padStart(2, '0')}</span>
                <motion.div className="card-icon" whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }} transition={{ duration: 0.5 }}>
                  <Icon />
                </motion.div>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
                <span className="service-example mono">{item.ejemplo}</span>
                <a href={whatsappMsg(s.mensaje(item.titulo))} target="_blank" rel="noreferrer" className="service-link mono" data-umami-event="consultar-servicio" data-umami-event-servicio={item.titulo}>
                  <FaWhatsapp /> {s.consultar}
                </a>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
