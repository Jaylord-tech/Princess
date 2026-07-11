import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_top,#fff7eb,#f8dce5_45%,#6e2b85)] text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <div className="absolute inset-0 sparkle-field" />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative px-6"
          >
            <motion.div
              animate={{ rotate: [0, 12, -10, 0], y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/30 text-gold shadow-glow backdrop-blur"
            >
              <Sparkles aria-hidden="true" />
            </motion.div>
            <p className="font-display text-3xl text-burgundy md:text-5xl">Preparing something special for my Princess...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
