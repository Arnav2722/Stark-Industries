import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

interface HolographicArmorModelProps {
  markName?: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showControls?: boolean;
  interactive?: boolean;
  activeLayer?: 'all' | 'armor' | 'weapons' | 'core' | 'circuits';
  className?: string;
}

export const HolographicArmorModel: React.FC<HolographicArmorModelProps> = ({
  markName = 'MARK LXXXV',
  category = 'MCU NANO-TECH',
  size = 'md',
  showControls = true,
  interactive = true,
  className = '',
}) => {
  const { theme } = useStark();
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'armor' | 'weapons' | 'core' | 'circuits'>('all');
  const [isCharging, setIsCharging] = useState(false);
  const [repulsorFired, setRepulsorFired] = useState(false);

  const sizeClasses = {
    sm: 'w-48 h-64',
    md: 'w-72 h-96',
    lg: 'w-96 h-[480px]',
    hero: 'w-full max-w-lg h-[520px]',
  };

  const handleFireRepulsor = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCharging || repulsorFired) return;

    setIsCharging(true);
    starkAudio.playRepulsorCharge();

    setTimeout(() => {
      setIsCharging(false);
      setRepulsorFired(true);
      starkAudio.playRepulsorBlast();

      setTimeout(() => {
        setRepulsorFired(false);
      }, 1000);
    }, 600);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none overflow-hidden rounded-xl border border-stark-border/40 bg-stark-darker/90 backdrop-blur-xl ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: `0 0 30px ${theme.bgGlow}, inset 0 0 20px rgba(0,0,0,0.8)`,
      }}
    >
      {/* Background Holographic Hex Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.primaryColor}25 1px, transparent 1px),
            linear-gradient(to right, ${theme.primaryColor}10 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.primaryColor}10 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 12px 12px, 12px 12px',
        }}
      />

      {/* Top HUD Telemetry Header */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ background: theme.primaryColor }} />
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold" style={{ color: theme.primaryColor }}>
            SCHEMATIC // {markName}
          </span>
        </div>
        <span className="text-[9px] font-mono tracking-wider text-gray-500 uppercase">
          {category}
        </span>
      </div>

      {/* Repulsor Blast Flash Wave */}
      {repulsorFired && (
        <motion.div
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none z-30 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.primaryColor} 0%, ${theme.secondaryColor} 40%, transparent 70%)`,
          }}
        />
      )}

      {/* 3D Wireframe Holographic Suit Illustration */}
      <div
        className="relative w-full h-full flex items-center justify-center p-6"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-4/5 h-4/5 flex items-center justify-center"
          animate={{
            rotateY: interactive ? [0, 6, 0] : 0,
            y: [0, -6, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Target Reticle Orbit Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed pointer-events-none"
            style={{ borderColor: `${theme.primaryColor}30` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-4 rounded-full border border-dotted pointer-events-none"
            style={{ borderColor: `${theme.secondaryColor}25` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />

          {/* SVG Detailed Iron Man Armor Blueprint */}
          <svg
            viewBox="0 0 200 320"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(0,188,212,0.5)] transition-all duration-300"
            style={{
              filter: `drop-shadow(0 0 12px ${isCharging ? theme.accentColor : theme.primaryColor}80)`,
            }}
          >
            <defs>
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.primaryColor} stopOpacity="0.9" />
                <stop offset="50%" stopColor={theme.secondaryColor} stopOpacity="0.7" />
                <stop offset="100%" stopColor={theme.primaryColor} stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="arcCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor={theme.primaryColor} />
                <stop offset="100%" stopColor={theme.secondaryColor} />
              </linearGradient>
              <filter id="glowEffect" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Circuit Line Grid Underlay */}
            {(selectedLayer === 'all' || selectedLayer === 'circuits') && (
              <g stroke={theme.primaryColor} strokeWidth="0.5" opacity="0.35" strokeDasharray="2,2">
                <line x1="20" y1="50" x2="180" y2="50" />
                <line x1="15" y1="120" x2="185" y2="120" />
                <line x1="30" y1="210" x2="170" y2="210" />
                <line x1="100" y1="10" x2="100" y2="310" />
                <circle cx="100" cy="115" r="45" fill="none" />
                <circle cx="100" cy="115" r="65" fill="none" opacity="0.2" />
              </g>
            )}

            {/* Armor Shell Wireframe Layers */}
            {(selectedLayer === 'all' || selectedLayer === 'armor') && (
              <g fill="none" stroke="url(#suitGrad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {/* Helmet / Mask Structure */}
                <path d="M78 28 C78 14 122 14 122 28 L126 50 L118 70 L100 78 L82 70 L74 50 Z" />
                <path d="M84 38 L116 38" strokeWidth="1" opacity="0.7" />
                {/* Eyes glowing slots */}
                <polygon points="83,44 94,46 92,48 83,47" fill={theme.primaryColor} filter="url(#glowEffect)" />
                <polygon points="117,44 106,46 108,48 117,47" fill={theme.primaryColor} filter="url(#glowEffect)" />
                <line x1="100" y1="50" x2="100" y2="68" strokeWidth="1" opacity="0.6" />
                <path d="M88 64 L100 70 L112 64" strokeWidth="1" />

                {/* Neck & Collar */}
                <path d="M86 74 L84 84 L116 84 L114 74" opacity="0.8" />

                {/* Torso & Chest Plates */}
                <path d="M68 86 L132 86 L138 140 L126 172 L100 182 L74 172 L62 140 Z" strokeWidth="1.8" />
                <path d="M68 86 L86 115 L100 90 L114 115 L132 86" strokeWidth="1.2" opacity="0.8" />
                <path d="M74 120 L86 148 L100 156 L114 148 L126 120" strokeWidth="1" opacity="0.7" />

                {/* Shoulders / Pauldrons */}
                <path d="M64 88 C44 92 42 114 48 126 L62 120 Z" />
                <path d="M136 88 C156 92 158 114 152 126 L138 120 Z" />

                {/* Arms & Forearms */}
                <path d="M48 126 L42 168 L50 198 L60 194 L56 164 Z" />
                <path d="M152 126 L158 168 L150 198 L140 194 L144 164 Z" />

                {/* Hands & Palm Repulsor Nodes */}
                <path d="M48 198 L40 216 L48 224 L56 218 L52 196 Z" />
                <path d="M152 198 L160 216 L152 224 L144 218 L148 196 Z" />

                {/* Waist & Pelvis */}
                <path d="M74 172 L126 172 L122 204 L100 218 L78 204 Z" />

                {/* Thighs */}
                <path d="M76 208 L68 258 L92 258 L96 216 Z" />
                <path d="M124 208 L132 258 L108 258 L104 216 Z" />

                {/* Shins & Boots */}
                <path d="M68 260 L62 304 L88 312 L92 260 Z" />
                <path d="M132 260 L138 304 L112 312 L108 260 Z" />
              </g>
            )}

            {/* Core & Arc Reactor Elements */}
            {(selectedLayer === 'all' || selectedLayer === 'core') && (
              <g>
                {/* Main Unibeam / Chest Arc Reactor Core */}
                <circle
                  cx="100"
                  cy="116"
                  r="14"
                  fill="url(#arcCoreGrad)"
                  filter="url(#glowEffect)"
                  className="cursor-pointer"
                  onClick={handleFireRepulsor}
                />
                <circle cx="100" cy="116" r="18" fill="none" stroke={theme.secondaryColor} strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="100" cy="116" r="8" fill="#ffffff" />
                {/* Energy Conduits from Arc Core */}
                <path d="M100 102 L100 86" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                <path d="M88 116 L68 116" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                <path d="M112 116 L132 116" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
                <path d="M100 130 L100 155" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
              </g>
            )}

            {/* Weapon & Repulsor Nodes */}
            {(selectedLayer === 'all' || selectedLayer === 'weapons') && (
              <g>
                {/* Left Palm Repulsor */}
                <circle
                  cx="48"
                  cy="212"
                  r={isCharging ? 7 : 4}
                  fill={isCharging ? theme.accentColor : theme.primaryColor}
                  filter="url(#glowEffect)"
                  className="animate-pulse cursor-pointer"
                  onClick={handleFireRepulsor}
                />
                {/* Right Palm Repulsor */}
                <circle
                  cx="152"
                  cy="212"
                  r={isCharging ? 7 : 4}
                  fill={isCharging ? theme.accentColor : theme.primaryColor}
                  filter="url(#glowEffect)"
                  className="animate-pulse cursor-pointer"
                  onClick={handleFireRepulsor}
                />
                {/* Shoulder Micro-Missile Pods */}
                <rect x="56" y="92" width="6" height="4" fill={theme.secondaryColor} opacity="0.8" />
                <rect x="138" y="92" width="6" height="4" fill={theme.secondaryColor} opacity="0.8" />
              </g>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Interactive Controls & Layer Toggle Bar */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
          {/* Layer Selector Chips */}
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-stark-border/50">
            {(['all', 'armor', 'weapons', 'core'] as const).map((layer) => (
              <button
                key={layer}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLayer(layer);
                  starkAudio.playClick();
                }}
                className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded transition-all ${
                  selectedLayer === layer
                    ? 'font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={
                  selectedLayer === layer
                    ? { background: theme.primaryColor, color: '#000' }
                    : {}
                }
              >
                {layer}
              </button>
            ))}
          </div>

          {/* Action: Fire Repulsor Blast */}
          <button
            onClick={handleFireRepulsor}
            className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-display uppercase tracking-widest font-bold rounded-lg border transition-all active:scale-95 shadow-md"
            style={{
              background: `linear-gradient(135deg, ${theme.secondaryColor}20, ${theme.primaryColor}30)`,
              borderColor: theme.primaryColor,
              color: '#ffffff',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: theme.accentColor }} />
            <span>{isCharging ? 'CHARGING...' : 'FIRE REPULSOR'}</span>
          </button>
        </div>
      )}

      {/* Corner HUD Ticks */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: theme.primaryColor }} />
      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: theme.primaryColor }} />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: theme.primaryColor }} />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: theme.primaryColor }} />
    </div>
  );
};
