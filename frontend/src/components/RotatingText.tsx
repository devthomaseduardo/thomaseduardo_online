import React, { useState, useEffect } from 'react';

const NAMES = ['Thomas Eduardo', '@devthomaseduardo'];

export function RotatingText() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentName = NAMES[index];
      
      if (isDeleting) {
        setText((prev) => currentName.substring(0, prev.length - 1));
      } else {
        setText((prev) => currentName.substring(0, prev.length + 1));
      }

      let typingSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && text === currentName) {
        typingSpeed = 2000; // Wait 2s before deleting
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % NAMES.length);
        typingSpeed = 500; // Wait 500ms before starting to type next word
      }

      timeoutId = setTimeout(tick, typingSpeed);
    };

    timeoutId = setTimeout(tick, 100);

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, index]);

  return (
    <span className="inline-block">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
