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
  sparkles: 'Nature/Sparkles.webp',
  shield: 'Objects/Shield.webp',
  money_bag: 'Objects/Money%20Bag.webp',
  locked: 'Objects/Locked.webp',
  folder: 'Objects/File%20Folder.webp',
  gear: 'Objects/Gear.webp',
  check: 'Symbols/Check%20Mark%20Button.webp'
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
