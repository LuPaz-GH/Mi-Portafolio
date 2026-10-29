import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Halo que sigue al puntero (solo en dispositivos con mouse)
export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />;
}
