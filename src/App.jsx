import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cake, Camera, Gift, Heart, PartyPopper, Sparkles } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import FloatingDecor from './components/FloatingDecor';
import Lightbox from './components/Lightbox';
import LoadingScreen from './components/LoadingScreen';
import MusicControl from './components/MusicControl';
import { birthdayConfig, birthdayWishes, galleryImages, loveLetter, reasons } from './data/siteData';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const sectionReveal = {
  hidden: { opacity: 0, y: 42, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: 'easeOut' } }
};

function triggerConfetti() {
  window.dispatchEvent(new Event('birthday-confetti'));
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <motion.div className="mx-auto mb-10 max-w-3xl text-center" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-[clamp(2.15rem,9vw,3.8rem)] leading-tight text-burgundy md:text-6xl">{title}</h2>
      {children && <p className="mx-auto mt-4 max-w-2xl text-burgundy/70">{children}</p>}
    </motion.div>
  );
}

function TypewriterText({ text, className, delay = 0, speed = 75, cycleDuration = 7600 }) {
  const [visibleText, setVisibleText] = useState('');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisibleText(text);
      return undefined;
    }

    const timers = [];
    const intervals = [];

    const runCycle = () => {
      setVisibleText('');
      let index = 0;
      const startTimer = window.setTimeout(() => {
        const intervalId = window.setInterval(() => {
          index += 1;
          setVisibleText(text.slice(0, index));
          if (index >= text.length) {
            window.clearInterval(intervalId);
          }
        }, speed);
        intervals.push(intervalId);
      }, delay);

      const nextCycleTimer = window.setTimeout(runCycle, cycleDuration);
      timers.push(startTimer, nextCycleTimer);
    };

    runCycle();

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      intervals.forEach((intervalId) => window.clearInterval(intervalId));
    };
  }, [cycleDuration, delay, reducedMotion, speed, text]);

  return (
    <span className={`typewriter-fixed ${className}`} aria-label={text}>
      <span className="typewriter-reserve" aria-hidden="true">{text}</span>
      <span className={`typewriter-reveal ${visibleText.length >= text.length ? 'is-complete' : ''}`} aria-hidden="true">
        {visibleText}
      </span>
    </span>
  );
}

function ConfettiCanvas() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.className = 'confetti-canvas';
    document.body.appendChild(canvas);
    let particles = [];
    let frame;
    const colors = ['#f8dce5', '#d7a642', '#8b1e3f', '#6e2b85', '#fff7eb'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const burst = () => {
      particles = Array.from({ length: 120 }, () => ({
        x: canvas.width / 2,
        y: canvas.height * 0.25,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -8 - 2,
        gravity: 0.2 + Math.random() * 0.12,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        spin: Math.random() * Math.PI
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((particle) => particle.y < canvas.height + 20);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.spin += 0.15;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.spin);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.65);
        context.restore();
      });
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('birthday-confetti', burst);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('birthday-confetti', burst);
      canvas.remove();
    };
  }, []);

  return null;
}

function Hero() {
  return (
    <section id="top" className="animated-section hero-section relative isolate min-h-dvh overflow-hidden">
      <FloatingDecor />
      <div className="relative z-10 mx-auto grid min-h-dvh max-w-7xl items-center gap-8 px-5 py-16 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-semibold text-burgundy shadow-soft backdrop-blur">
            <Sparkles size={16} aria-hidden="true" /> A birthday made with love
          </p>
          <h1 className="font-display text-[clamp(2.65rem,14vw,4.8rem)] leading-[1.02] text-burgundy md:text-7xl lg:text-8xl">
            <TypewriterText text="Happy Birthday, My Princess" className="typewriter-title" />
          </h1>
          <p className="mt-4 font-script text-[clamp(2.15rem,10vw,3.7rem)] leading-tight text-royal md:text-6xl">
            <TypewriterText text="Akinwumi Oluwabukolami Princess" className="typewriter-name" delay={2450} speed={70} />
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-burgundy/80 md:text-lg md:leading-8">
            Today, the world celebrates the day someone truly beautiful, loving, special, and unforgettable was born.
          </p>
          <button
            className="primary-button mt-8"
            onClick={() => {
              scrollToId('message');
              triggerConfetti();
            }}
          >
            <Gift size={19} aria-hidden="true" /> Open Your Birthday Surprise
          </button>
        </motion.div>

        <motion.div className="photo-orbit mx-auto w-full max-w-md" initial={{ opacity: 0, scale: 0.9, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.45 }}>
          <figure className="hero-photo">
            <img src={birthdayConfig.heroImage.src} alt={birthdayConfig.heroImage.alt} />
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

function MessageSection() {
  return (
    <section id="message" className="animated-section section-pad bg-cream">
      <div className="section-orb orb-one" aria-hidden="true" />
      <div className="section-orb orb-two" aria-hidden="true" />
      <motion.div className="relative z-10 mx-auto max-w-5xl px-5" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
        <SectionTitle eyebrow="A little letter" title="To My Beautiful Princess" />
        <motion.article className="glass-card love-letter" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          {loveLetter.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="signature">Forever yours ♥</p>
        </motion.article>
      </motion.div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="animated-section section-pad bg-[linear-gradient(135deg,#fff7eb,#f8dce5_48%,#f2e3ff)]">
      <div className="section-orb orb-two" aria-hidden="true" />
      <motion.div className="relative z-10 mx-auto max-w-7xl px-5" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }}>
        <SectionTitle eyebrow="Six reasons" title="Reasons I Love You" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, text }, index) => (
            <motion.article
              className="reason-card"
              key={text}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.2 : 1.2, scale: 1.02 }}
            >
              <Icon aria-hidden="true" />
              <h3>{text}</h3>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function GallerySection() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    triggerConfetti();
  };

  return (
    <section className="animated-section section-pad bg-cream">
      <div className="section-orb orb-one" aria-hidden="true" />
      <motion.div className="relative z-10 mx-auto max-w-7xl px-5 text-center" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.14 }}>
        <SectionTitle eyebrow="A secret" title="Special Surprise">
          Tap the gift to reveal beautiful memories.
        </SectionTitle>
        <button className={`gift-box ${open ? 'is-open' : ''}`} onClick={handleOpen} aria-label="Reveal memory pictures">
          <span className="gift-lid" />
          <span className="gift-body" />
          <span className="gift-ribbon" />
        </button>
        <p className="mt-5 font-semibold text-burgundy">{open ? 'Beautiful memories unlocked' : 'Tap the gift to open your surprise'}</p>
        {open && (
          <motion.div className="mt-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="gallery-grid text-left">
              {galleryImages.map((image, index) => (
                <motion.button
                  className="polaroid"
                  key={image.caption}
                  onClick={() => setSelected(image)}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5, scale: 1.025 }}
                  aria-label={`Open preview: ${image.caption}`}
                >
                  {image.src && (image.type === 'video' || /\.(mp4|mov|webm|ogg)$/i.test(image.src)) ? (
                    <video src={image.src} muted playsInline preload="metadata" aria-label={image.alt} />
                  ) : image.src ? (
                    <img src={image.src} alt={image.alt} />
                  ) : (
                    <div className="gallery-placeholder"><Camera aria-hidden="true" /><span>Photo {index + 1}</span></div>
                  )}
                  <span>{image.caption}</span>
                </motion.button>
              ))}
            </div>
            <motion.div className="glass-card mx-auto mt-8 max-w-3xl p-6 text-center text-base leading-8 text-burgundy/80 md:p-8 md:text-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              My greatest birthday wish is to continue creating beautiful memories, celebrating your wins, supporting your dreams, and loving you through every chapter of life. You are my favourite person and my forever Princess.
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function WishesSection() {
  return (
    <section className="animated-section section-pad relative overflow-hidden bg-[radial-gradient(circle_at_top,#fff4cf,#f8dce5_45%,#efe0ff)]">
      <div className="balloons" aria-hidden="true"><span /><span /><span /></div>
      <div className="section-orb orb-two" aria-hidden="true" />
      <motion.div className="relative z-10 mx-auto max-w-7xl px-5" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        <SectionTitle eyebrow="Birthday wishes" title="A Beautiful New Chapter" />
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div className="cake-wrap" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ scale: 1.03 }}>
            <div className="cake">
              <span className="flame" />
              <span className="candle" />
              <span className="tier top" />
              <span className="tier middle" />
              <span className="tier bottom" />
            </div>
          </motion.div>
          <div className="grid gap-5">
            {birthdayWishes.map(({ icon: Icon, text }) => (
              <motion.article className="wish-card" key={text} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} whileHover={{ x: 8, scale: 1.015 }}>
                <Icon aria-hidden="true" />
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FinalSection() {
  return (
    <section className="animated-section final-section relative min-h-dvh overflow-hidden">
      <FloatingDecor />
      <div className="section-orb orb-one" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid min-h-dvh max-w-5xl place-items-center px-5 py-16 text-center md:py-24">
        <motion.div variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <Heart className="mx-auto mb-6 text-gold" size={44} aria-hidden="true" />
          <h2 className="font-display text-[clamp(2.55rem,13vw,4.6rem)] leading-tight text-white md:text-7xl">Happy Birthday, My Love</h2>
          <p className="mt-5 font-script text-[clamp(2.05rem,10vw,3.75rem)] leading-tight text-blush md:text-6xl">Akinwumi Oluwabukolami Princess</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/82 md:text-lg md:leading-8">
            You deserve every beautiful thing life has to offer. Today, tomorrow, and always, I hope your heart remains filled with happiness.
          </p>
          <button
            className="primary-button mt-8"
            onClick={() => {
              scrollToId('top');
              triggerConfetti();
            }}
          >
            <PartyPopper size={19} aria-hidden="true" /> Celebrate Again
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), reducedMotion ? 300 : 1800);
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  return (
    <>
      <LoadingScreen visible={loading} />
      <CustomCursor />
      <ConfettiCanvas />
      <main>
        <Hero />
        <MessageSection />
        <ReasonsSection />
        <GallerySection />
        <WishesSection />
        <FinalSection />
      </main>
      <footer className="bg-burgundy px-5 py-8 text-center text-sm text-white/80">
        Made with endless love for Akinwumi Oluwabukolami Princess by her love, JAY ♥ {new Date().getFullYear()}
      </footer>
      <MusicControl />
    </>
  );
}
