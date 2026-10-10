import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

interface ArcReactorProps {
  size?: number;
  className?: string;
  animate?: boolean;
  interactive?: boolean;
  showPowerLevel?: boolean;
}

export const ArcReactor: React.FC<ArcReactorProps> = ({
  size = 120,
  className = '',
  animate = true,
  interactive = true,
}) => {
  const { theme } = useStark();
  const [isOverloading, setIsOverloading] = useState(false);
  const [powerLevel, setPowerLevel] = useState(100);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();

    starkAudio.playArcPulse();
    setIsOverloading(true);
    setPowerLevel(prev => (prev >= 400 ? 100 : prev + 50));

    setTimeout(() => {
      setIsOverloading(false);
    }, 1200);
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
      title={interactive ? "Click to charge Arc Reactor Core" : undefined}
    >
      {/* Outer ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${isOverloading ? theme.accentColor : theme.primaryColor} 0%, transparent 70%)`,
        }}
        animate={{
          scale: isOverloading ? [1, 1.4, 1.2] : [1, 1.15, 1],
          opacity: isOverloading ? [0.6, 0.9, 0.7] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: isOverloading ? 0.6 : 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SVG Multi-Layered Rotating Reactor Ring Core */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(0,188,212,0.6)]"
      >
        <defs>
          <radialGradient id={`reactorGlow-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor={isOverloading ? '#F0D060' : theme.primaryColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor={isOverloading ? theme.accentColor : theme.secondaryColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </radialGradient>
          <filter id={`arcFilter-${size}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Outer Housing Casing */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="#222222" strokeWidth="4" />
        <circle cx="100" cy="100" r="90" fill="none" stroke={theme.secondaryColor} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />

        {/* Layer 2: Rotating Ring with 10 Energy Coils */}
        <g className={animate ? 'origin-center animate-[spin_20s_linear_infinite]' : 'origin-center'}>
          <circle cx="100" cy="100" r="82" fill="none" stroke={theme.primaryColor} strokeWidth="2.5" opacity="0.7" />
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 36} 100 100)`}>
              {/* Copper/Palladium Coil Bracket */}
              <rect x="94" y="20" width="12" height="18" rx="2" fill="#111111" stroke={theme.secondaryColor} strokeWidth="1.2" />
              <line x1="96" y1="24" x2="104" y2="24" stroke={theme.primaryColor} strokeWidth="1" />
              <line x1="96" y1="29" x2="104" y2="29" stroke={theme.primaryColor} strokeWidth="1" />
              <line x1="96" y1="34" x2="104" y2="34" stroke={theme.primaryColor} strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Layer 3: Counter-rotating Inner Stator */}
        <g className={animate ? 'origin-center animate-[spin_15s_linear_infinite_reverse]' : 'origin-center'}>
          <circle cx="100" cy="100" r="58" fill="none" stroke={theme.secondaryColor} strokeWidth="2" opacity="0.8" />
          <circle cx="100" cy="100" r="50" fill="none" stroke={theme.primaryColor} strokeWidth="1" strokeDasharray="3,3" />
          {/* Triangular Core Anchor (Mark VI/LXXXV style) */}
          <polygon
            points="100,56 138,122 62,122"
            fill="none"
            stroke={theme.secondaryColor}
            strokeWidth="2"
            opacity="0.9"
          />
        </g>

        {/* Layer 4: Central Arc Core Plasma Sphere */}
        <circle
          cx="100"
          cy="100"
          r="36"
          fill={`url(#reactorGlow-${size})`}
          filter={`url(#arcFilter-${size})`}
        />
        <circle cx="100" cy="100" r="16" fill="#ffffff" filter={`url(#arcFilter-${size})`} />

        {/* Micro center emitter */}
        <circle cx="100" cy="100" r="6" fill="#ffffff" />
      </svg>

      {/* Floating Micro-Coordinates / Output readout if size >= 100 */}
      {size >= 100 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap">
          <span className="text-[9px] font-mono tracking-widest uppercase font-bold" style={{ color: isOverloading ? theme.accentColor : theme.primaryColor }}>
            {powerLevel}% OUTPUT // {487 * (powerLevel / 100)} GW
          </span>
        </div>
      )}
    </div>
  );
};
