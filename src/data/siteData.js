import { Cake, Crown, Gem, Heart, Infinity, Sparkles, Star, Sun } from 'lucide-react';

const mediaPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const birthdayConfig = {
  songTitle: 'Fall For You',
  songArtist: 'Neriel',
  backgroundSong: mediaPath('love-song.mp4'),
  heroBackground: mediaPath('assets/romantic-hero.webp'),
  heroImage: {
    src: mediaPath('assets/image.webp'),
    alt: 'Akinwumi Oluwabukolami Princess smiling at her birthday celebration'
  }
};

export const loveLetter = `Happy Birthday to the most amazing woman in my life. You bring happiness, peace, love, and colour into my world in ways words may never fully explain. Your beautiful smile, kind heart, strength, and loving personality make every moment with you special.

On this beautiful day, I want you to remember how deeply loved, valued, and appreciated you are. I pray this new chapter of your life brings you unlimited happiness, favour, success, peace, beautiful memories, and everything your heart desires.

Thank you for being you, my Princess. I am incredibly blessed to have you in my life.

Happy Birthday, Akinwumi Oluwabukolami Princess. I love you more than words can say.`;

export const reasons = [
  { icon: Heart, text: 'Your beautiful and caring heart' },
  { icon: Sun, text: 'The happiness your smile brings' },
  { icon: Crown, text: 'Your strength and determination' },
  { icon: Sparkles, text: 'The way you make every moment special' },
  { icon: Gem, text: 'Your loving and amazing personality' },
  { icon: Infinity, text: 'Simply because you are you' }
];

export const galleryImages = [
  // Add photos/videos to public/assets as m1.png through m5.png, or update the paths below.
  { src: mediaPath('assets/m1.webp'), alt: 'A favourite birthday memory with Princess', caption: 'One of my favourite moments' },
  { src: mediaPath('assets/image.webp'), alt: 'Princess smiling beautifully', caption: 'That beautiful smile' },
  { src: mediaPath('assets/m3-fast.mp4'), alt: 'A treasured video memory with Princess', caption: 'A memory I will always treasure', type: 'video' },
  { src: mediaPath('assets/m4-fast.mp4'), alt: 'A beautiful moment with my favourite person', caption: 'My favourite person', type: 'video' },
  { src: mediaPath('assets/m2-fast.mp4'), alt: 'A beautiful video memory of Princess', caption: 'My Princess', type: 'video' }
];

export const birthdayWishes = [
  { icon: Star, text: 'May this new year bring you happiness beyond your imagination.' },
  { icon: Sparkles, text: 'May every dream in your heart become a beautiful reality.' },
  { icon: Cake, text: 'May love, peace, favour, success, and laughter follow you everywhere.' }
];
