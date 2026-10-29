import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../motion';

export default function SectionTitle({ tag, title, subtitle }) {
  return (
    <motion.header className="section-title" variants={stagger()} initial="hidden" whileInView="show" viewport={viewport}>
      <motion.span className="section-tag" variants={fadeUp}>{`// ${tag}`}</motion.span>
      <motion.h2 variants={fadeUp}>{title}</motion.h2>
      <motion.div
        className="section-line"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } } }}
      />
      {subtitle && <motion.p variants={fadeUp}>{subtitle}</motion.p>}
    </motion.header>
  );
}
