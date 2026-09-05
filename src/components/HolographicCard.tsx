import { motion, HTMLMotionProps } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface HolographicCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  badges?: Array<{ text: string; color: string }>;
  metadata?: Array<{ label: string; value: string }>;
  onClick?: () => void;
  variant?: 'armor' | 'tech' | 'character' | 'movie';
}

const variantStyles = {
  armor: { accent: '#C41E24', glow: 'rgba(196,30,36,0.2)' },
  tech: { accent: '#00bcd4', glow: 'rgba(0,188,212,0.2)' },
  character: { accent: '#D4AF37', glow: 'rgba(212,175,55,0.2)' },
  movie: { accent: '#8B0000', glow: 'rgba(139,0,0,0.2)' },
};

export function HolographicCard({
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
}: HolographicCardProps) {
  const style = variantStyles[variant];

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      {...props}
    >
      {/* 3D Perspective Container */}
      <div className="relative" style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}>
        {/* Background glow */}
        <motion.div
          className="absolute -inset-4 rounded-[1rem] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${style.glow} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            zIndex: -1,
            opacity: 0
          }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Main Card */}
        <GlassPanel
          variant={variant === 'armor' ? 'red' : variant === 'tech' ? 'arc' : variant === 'character' ? 'gold' : 'dark'}
          hover={false}
          padding="p-0"
          className="overflow-hidden"
        >
          {/* Image Section */}
          {image && (
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stark-panelLight to-stark-panel" />
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Holographic overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `linear-gradient(180deg,
                  transparent 0%,
                  transparent 40%,
                  ${style.accent}15 100%)`
              }} />
              {/* Scan line effect */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)`,
                  boxShadow: `0 0 20px ${style.accent}`
                }}
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Badges */}
              {badges.length > 0 && (
                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                  {badges.map((badge, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider rounded-full"
                      style={{
                        background: `${badge.color}20`,
                        color: badge.color,
                        border: `1px solid ${badge.color}40`
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      {badge.text}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="relative p-6 space-y-4">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text"
                style={{
                  background: `linear-gradient(135deg, #fff, ${style.accent})`
                }}>
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-400 mt-1 font-mono tracking-wider">{subtitle}</p>
              )}
            </div>

            {/* Metadata */}
            {metadata.length > 0 && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stark-border/30">
                {metadata.map((item, i) => (
                  <div key={i} className="text-left">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-white font-mono">{item.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Children content */}
            {children && (
              <div className="pt-2">
                {children}
              </div>
            )}

            {/* Action indicator */}
            <motion.div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: style.accent }}
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span>VIEW DETAILS</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ►
              </motion.span>
            </motion.div>
          </div>
        </GlassPanel>

        {/* Floating particles on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: style.accent,
                boxShadow: `0 0 10px ${style.accent}`,
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                opacity: 0,
                transform: 'scale(0)'
              }}
              whileHover={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                y: [0, -30, -60]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}