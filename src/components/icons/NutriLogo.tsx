import React from "react";

interface NutriLogoProps {
  className?: string;
  size?: number;
}

const NutriLogo: React.FC<NutriLogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Leaf shape */}
      <path
        d="M24 4C24 4 8 12 8 28C8 36.8366 15.1634 44 24 44C32.8366 44 40 36.8366 40 28C40 12 24 4 24 4Z"
        fill="url(#gradient-leaf)"
        stroke="url(#gradient-stroke)"
        strokeWidth="2"
      />
      {/* Leaf vein */}
      <path
        d="M24 12V36"
        stroke="hsl(0 0% 100% / 0.5)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 20L18 26"
        stroke="hsl(0 0% 100% / 0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 20L30 26"
        stroke="hsl(0 0% 100% / 0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 28L19 33"
        stroke="hsl(0 0% 100% / 0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 28L29 33"
        stroke="hsl(0 0% 100% / 0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient-leaf" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(158 64% 42%)" />
          <stop offset="1" stopColor="hsl(175 50% 45%)" />
        </linearGradient>
        <linearGradient id="gradient-stroke" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(158 64% 52%)" />
          <stop offset="1" stopColor="hsl(175 50% 55%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NutriLogo;
