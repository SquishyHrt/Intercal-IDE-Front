import React, { useEffect, useRef } from 'react';

// Import your mp3 files if they are in the src directory (optional)
import sound1 from '@/assets/doit.mp3';
//import sound2 from './sounds/sound2.mp3';
//import sound3 from './sounds/sound3.mp3';

const sounds = [sound1]//, sound2, sound3];

const getRandomDelay = (min, max) => {
  return Math.random() * (max - min) + min;
};

const playRandomSound = () => {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const audio = new Audio(sounds[randomIndex]);
  audio.play();
};

const RandomSoundPlayer = () => {
  const timeoutId = useRef(null);

  useEffect(() => {
    const scheduleNextSound = () => {
      const delay = getRandomDelay(4 * 60 * 1000, 6 * 60 * 1000); // 4 to 6 minutes in milliseconds
      timeoutId.current = setTimeout(() => {
        playRandomSound();
        scheduleNextSound();
      }, delay);
    };

    scheduleNextSound();

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <div>
    </div>
  );
};

export default RandomSoundPlayer;

