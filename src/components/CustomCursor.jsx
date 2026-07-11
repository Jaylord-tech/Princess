import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canUseCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(canUseCursor && !reducedMotion);
    if (!canUseCursor || reducedMotion) return undefined;

    const update = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor"
      animate={{ x: position.x - 12, y: position.y - 12 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.4 }}
      aria-hidden="true"
    />
  );
}
