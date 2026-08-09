import { useState, useEffect } from 'react';

const WORDS = ['yREX', 'Rituraj Ingale', 'RI'];
const TYPING_SPEED = 100;
const DELETING_SPEED = 100;
const PAUSE_DURATION = 1000;

let text = '';
let isDeleting = false;
let loopNum = 0;
let typingSpeed = TYPING_SPEED;
let timer: NodeJS.Timeout | null = null;

const listeners = new Set<(text: string) => void>();

const subscribe = (listener: (text: string) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
};

const notify = () => {
  listeners.forEach(listener => listener(text));
};

const tick = () => {
  const currentWordIndex = loopNum % WORDS.length;
  const fullText = WORDS[currentWordIndex];

  if (isDeleting) {
    text = fullText.substring(0, text.length - 1);
    typingSpeed = DELETING_SPEED;
  } else {
    text = fullText.substring(0, text.length + 1);
    typingSpeed = TYPING_SPEED;
  }

  if (!isDeleting && text === fullText) {
    typingSpeed = PAUSE_DURATION;
    isDeleting = true;
  } else if (isDeleting && text === '') {
    isDeleting = false;
    loopNum++;
    typingSpeed = TYPING_SPEED;
  }
  
  notify();
  timer = setTimeout(tick, typingSpeed);
};

export const useTypingAnimation = () => {
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    // Start timer if this is the first listener
    if (listeners.size === 0 && !timer) {
      timer = setTimeout(tick, typingSpeed);
    }
    const unsubscribe = subscribe(setCurrentText);
    return unsubscribe;
  }, []);

  return currentText;
};
