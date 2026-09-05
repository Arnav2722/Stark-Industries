import { motion } from 'framer-motion';

export function ScanLine({ speed = 4, color = 'rgba(0,188,212,0.15)' }: { speed?: number; color?: string }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
      animate={{ transform: ['translateY(-100%)', 'translateY(100%)'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export function GridBackground({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,188,212,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,188,212,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}
    />
  );
}

export function Vignette({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)',
      }}
    />
  );
}