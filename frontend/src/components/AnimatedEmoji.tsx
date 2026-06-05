import React from 'react';

const BASE_URL = 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main';

export const EMOJI_PATHS = {
  waving_hand: 'People/Waving%20Hand.webp',
  pointing_up: 'People/Backhand%20Index%20Pointing%20Up.webp',
  pointing_right: 'People/Backhand%20Index%20Pointing%20Right.webp',
  eyes: 'People/Eyes.webp',
  rocket: 'Travel%20and%20Places/Rocket.webp',
  fire: 'Nature/Fire.webp',
  handshake: 'People/Handshake.webp',
  laptop: 'Objects/Laptop.webp',
} as const;

export type EmojiType = keyof typeof EMOJI_PATHS;

interface AnimatedEmojiProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  name: EmojiType;
}

export const AnimatedEmoji: React.FC<AnimatedEmojiProps> = ({ name, className = '', alt, ...props }) => {
  return (
    <img
      src={`${BASE_URL}/${EMOJI_PATHS[name]}`}
      alt={alt || name.replace('_', ' ')}
      loading="lazy"
      className={`inline-block object-contain ${className}`}
      {...props}
    />
  );
};
