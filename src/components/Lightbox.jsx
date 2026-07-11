import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Lightbox({ image, onClose }) {
  const isVideo = image?.type === 'video' || /\.(mp4|mov|webm|ogg)$/i.test(image?.src || '');

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-burgundy/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="absolute right-5 top-5 rounded-full bg-white p-3 text-burgundy shadow-soft" onClick={onClose} aria-label="Close preview">
            <X size={20} />
          </button>
          <motion.figure
            className="w-full max-w-3xl rounded-[2rem] bg-white p-4 shadow-glow"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            onClick={(event) => event.stopPropagation()}
          >
            {image.src && isVideo ? (
              <video className="max-h-[70vh] w-full rounded-[1.4rem] object-cover" src={image.src} controls autoPlay playsInline aria-label={image.alt} />
            ) : image.src ? (
              <img className="max-h-[70vh] w-full rounded-[1.4rem] object-cover" src={image.src} alt={image.alt} />
            ) : (
              <div className="grid aspect-[4/3] place-items-center rounded-[1.4rem] bg-gradient-to-br from-blush via-cream to-purple-100 text-center text-burgundy">
                Photo placeholder
              </div>
            )}
            <figcaption className="pt-4 text-center font-script text-3xl text-burgundy">{image.caption}</figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
