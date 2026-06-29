type WhatsAppIconProps = {
  size?: number;
  className?: string;
};

export function WhatsAppIcon({ size = 20, className }: WhatsAppIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 18.5 6.4 15A7 7 0 1 1 9 17.6l-3.5.9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.4 8.9c.2-.4.4-.5.8-.5h.5c.2 0 .4.1.5.4l.5 1.2c.1.3 0 .5-.2.7l-.3.4c.5.9 1.2 1.6 2.2 2.1l.5-.4c.2-.2.4-.2.7-.1l1.1.5c.3.1.4.3.4.6v.5c0 .4-.2.7-.6.9-.5.2-1.1.3-1.7.2-2.8-.4-5.1-2.6-5.6-5.4-.1-.5.1-.9.3-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
