import { motion } from 'framer-motion';

interface HUDCornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  color?: string;
  animate?: boolean;
}

export function HUDCorner({ position, size = 16, color = '#00bcd4', animate = true }: HUDCornerProps) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: '2px solid', borderLeft: '2px solid' },
    tr: { top: 0, right: 0, borderTop: '2px solid', borderRight: '2px solid' },
    bl: { bottom: 0, left: 0, borderBottom: '2px solid', borderLeft: '2px solid' },
    br: { bottom: 0, right: 0, borderBottom: '2px solid', borderRight: '2px solid' },
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        ...styles[position],
        width: size,
        height: size,
        borderColor: color,
        opacity: animate ? 0.8 : 1,
      }}
      animate={animate ? { opacity: [0.4, 1, 0.4] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

export function HUDFrame({ children, className = '', color = '#00bcd4' }: { children: React.ReactNode; className?: string; color?: string }) {
  return (
    <div className={`relative ${className}`}>
      <HUDCorner position="tl" color={color} size={20} />
      <HUDCorner position="tr" color={color} size={20} />
      <HUDCorner position="bl" color={color} size={20} />
      <HUDCorner position="br" color={color} size={20} />
      {children}
    </div>
  );
}