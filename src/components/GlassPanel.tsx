import { motion, HTMLMotionProps } from 'framer-motion';
import { HUDCorner } from './HUDCorner';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'arc' | 'red' | 'dark';
  padding?: string;
  hover?: boolean;
  border?: boolean;
  showEnergy?: boolean;
  showCircuit?: boolean;
  systemName?: string;
}

const variants = {
  default: 'bg-stark-panel/60 backdrop-blur-2xl border-stark-border/30',
  gold: 'bg-stark-panel/60 backdrop-blur-2xl border-stark-gold/30',
  arc: 'bg-stark-panel/60 backdrop-blur-2xl border-arc-500/30',
  red: 'bg-stark-panel/60 backdrop-blur-2xl border-stark-red/30',
  dark: 'bg-stark-darker/80 backdrop-blur-2xl border-stark-border/20',
};

const cornerColors = {
  default: '#00bcd4',
  gold: '#D4AF37',
  arc: '#00bcd4',
  red: '#C41E24',
  dark: '#333333',
};

const glowColors = {
  default: 'rgba(0,188,212,0.08)',
  gold: 'rgba(212,175,55,0.1)',
  arc: 'rgba(0,188,212,0.1)',
  red: 'rgba(196,30,36,0.1)',
  dark: 'rgba(51,51,51,0.1)',
};

export function GlassPanel({
  children,
  variant = 'default',
  padding = 'p-6 md:p-8',
  hover = true,
  border = true,
  showEnergy = false,
  showCircuit = false,
  systemName,
  className = '',
  style,
  ...props
}: GlassPanelProps) {
  const baseClasses = `
    relative rounded-xl overflow-hidden
    ${variants[variant]}
    ${border ? 'border' : 'border-0'}
    ${padding}
    ${hover ? 'transition-all duration-500' : ''}
    ${className}
  `;

  const glowColor = glowColors[variant];
  const cornerColor = cornerColors[variant];

  return (
    <motion.div
      className={baseClasses}
      style={{
        ...style,
        boxShadow: `
          0 4px 20px rgba(0,0,0,0.5),
          0 0 0 1px rgba(255,255,255,0.02) inset,
          ${hover ? `0 0 60px ${glowColor}` : ''}
        `
      }}
      whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
    >
      {/* Circuit pattern overlay */}
      {showCircuit && (
        <div className="absolute inset-0 pointer-events-none circuit-pattern opacity-10" />
      )}

      {/* Subtle inner glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(135deg,
          rgba(255,255,255,0.03) 0%,
          transparent 30%,
          transparent 70%,
          ${cornerColor}20 100%)`
      }} />

      {/* Energy indicator bar */}
      {showEnergy && (
        <div className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none" style={{
          background: `linear-gradient(90deg, ${cornerColor}40, ${cornerColor}80, ${cornerColor}40)`
        }}>
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${cornerColor}, transparent)`,
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* System name tag */}
      {systemName && (
        <div className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider opacity-50" style={{ color: cornerColor }}>
          {systemName}
          <span className="ml-2 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cornerColor }} />
            ACTIVE
          </span>
        </div>
      )}

      {/* HUD Corners with enhanced animations */}
      <HUDCorner position="tl" color={cornerColor} size={18} animate={hover} />
      <HUDCorner position="tr" color={cornerColor} size={18} animate={hover} />
      <HUDCorner position="bl" color={cornerColor} size={18} animate={hover} />
      <HUDCorner position="br" color={cornerColor} size={18} animate={hover} />

      {/* Corner energy indicators */}
      <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded"
            style={{ background: cornerColor }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Top accent line with scan effect */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent, ${cornerColor}, transparent)`,
        opacity: hover ? 1 : 0.3
      }}>
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${cornerColor}80, transparent)`,
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Side accent lines */}
      <div className="absolute top-1/4 bottom-1/4 left-0 w-px pointer-events-none" style={{
        background: `linear-gradient(180deg, transparent, ${cornerColor}40, transparent)`,
        opacity: 0.3
      }} />
      <div className="absolute top-1/4 bottom-1/4 right-0 w-px pointer-events-none" style={{
        background: `linear-gradient(180deg, transparent, ${cornerColor}40, transparent)`,
        opacity: 0.3
      }} />

      {/* Holographic scan line that sweeps on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: hover ? 1 : 0, opacity: hover ? 0.1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `linear-gradient(180deg,
            transparent 0%,
            ${cornerColor}30 50%,
            transparent 100%)`
        }}
      >
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${cornerColor}60, transparent)`
          }}
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Children with subtle entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}