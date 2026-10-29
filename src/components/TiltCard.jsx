import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Tarjeta con inclinación 3D y brillo que sigue al puntero
export default function TiltCard({ children, className = '', max = 10, ...rest }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 18 });
  const shine = useTransform(
    [px, py],
    ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18), transparent 55%)`
  );

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
      <motion.span className="tilt-shine" style={{ background: shine }} aria-hidden="true" />
    </motion.div>
  );
}
