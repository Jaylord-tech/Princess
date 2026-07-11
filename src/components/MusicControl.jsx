import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { birthdayConfig } from '../data/siteData';

export default function MusicControl({ autoStart = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!autoStart || !audio || isPlaying) return;

    setShowPrompt(false);
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
        setShowPrompt(true);
      });
  }, [autoStart, isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setShowPrompt(false);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setShowPrompt(true);
    }
  };

  return (
    <div className="music-control fixed bottom-5 right-5 z-40 flex items-end gap-3">
      <audio ref={audioRef} src={birthdayConfig.backgroundSong} loop preload="none" />
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="hidden max-w-56 rounded-2xl border border-white/60 bg-white/75 p-4 text-sm text-burgundy shadow-soft backdrop-blur md:block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            Turn on "{birthdayConfig.songTitle}" by {birthdayConfig.songArtist} for a softer birthday mood.
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex rounded-full border border-white/50 bg-burgundy/90 p-2 text-white shadow-glow backdrop-blur">
        <button className="icon-button" onClick={togglePlay} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button className="icon-button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Unmute music' : 'Mute music'}>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <Music className="mx-2 self-center text-gold" size={18} aria-hidden="true" />
      </div>
    </div>
  );
}
