import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';
import { Shield, Cpu, ChevronRight, Zap } from 'lucide-react';

interface HolographicCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  badges?: Array<{ text: string; color: string }>;
  metadata?: Array<{ label: string; value?: string | number | null }>;
  onClick?: () => void;
  variant?: 'armor' | 'tech' | 'character' | 'movie';
  className?: string;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  image,
  title,
  subtitle,
  badges = [],
  metadata = [],
  onClick,
  variant = 'armor',
  className = '',
  ...props
}) => {
  const { theme } = useStark();
  const [imageError, setImageError] = useState(false);

  const accentColor =
    variant === 'armor'
      ? '#D4AF37'
      : variant === 'tech'
      ? theme.primaryColor
      : variant === 'character'
      ? '#22c55e'
      : theme.accentColor;

  return (
    <motion.div
      className={`relative group cursor-pointer select-none rounded-2xl overflow-hidden border border-stark-border/50 bg-stark-darker/90 backdrop-blur-xl transition-all duration-300 ${className}`}
      style={{
        boxShadow: `0 4px 20px rgba(0,0,0,0.7), inset 0 0 15px rgba(255,255,255,0.02)`,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        borderColor: accentColor,
        boxShadow: `0 0 30px ${accentColor}30, inset 0 0 20px ${accentColor}10`,
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => starkAudio.playClick(950)}
      onClick={() => {
        starkAudio.playChirp();
        onClick?.();
      }}
      {...props}
    >
      {/* Background Hex Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top Banner / Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-stark-panel to-stark-darker flex items-center justify-center border-b border-stark-border/40">
        {!imageError && image && !image.startsWith('/images') ? (
          <img
            src={image}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          /* Procedural Holographic Blueprint Visualizer */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Animated Schematic Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentColor} 1px, transparent 1px),
                  linear-gradient(to bottom, ${accentColor} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Rotating Reticle */}
            <motion.div
              className="relative w-20 h-20 rounded-full border border-dashed flex items-center justify-center"
              style={{ borderColor: `${accentColor}60` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {variant === 'tech' ? (
                <Cpu className="w-9 h-9" style={{ color: accentColor }} />
              ) : variant === 'character' ? (
                <Shield className="w-9 h-9" style={{ color: accentColor }} />
              ) : (
                <Zap className="w-9 h-9" style={{ color: accentColor }} />
              )}
            </motion.div>

            {/* Schematic Label */}
            <div className="mt-3 text-center z-10">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-gray-400">
                SCHEMATIC // {subtitle || 'STARK R&D'}
              </span>
            </div>

            {/* Holographic Scan Sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${accentColor}20 50%, transparent 100%)`,
              }}
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}

        {/* Badges Overlay (Top Left) */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
            {badges.map((b, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-md"
                style={{
                  background: `${b.color}25`,
                  borderColor: `${b.color}60`,
                  color: b.color,
                }}
              >
                {b.text}
              </span>
            ))}
          </div>
        )}

        {/* Tactical Corner Bracket */}
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: accentColor }} />
      </div>

      {/* Card Content Area */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-stark-gold transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs font-mono text-gray-400 tracking-wider uppercase mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Key Metadata Grid */}
        {metadata.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stark-border/40 text-xs font-mono">
            {metadata.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{m.label}</span>
                <span className="text-gray-200 font-semibold truncate">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {children && <div className="pt-1 text-xs text-gray-400 leading-relaxed">{children}</div>}

        {/* Card Action Link Indicator */}
        <div
          className="pt-2 flex items-center justify-between text-xs font-display font-semibold tracking-wider uppercase transition-colors"
          style={{ color: accentColor }}
        >
          <span>INSPECT DOSSIER</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom Glow Energy Bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: accentColor }} />
    </motion.div>
  );
};
