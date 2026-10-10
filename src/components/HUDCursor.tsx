import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export interface HUDCursorProps {
  className?: string;
}

export const HUDCursor: React.FC<HUDCursorProps> = ({ className = '' }) => {
  const { theme } = useStark();
  const [isInteractive, setIsInteractive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 700, damping: 40, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 700, damping: 40, mass: 0.3 });

  useEffect(() => {
    let lastPlayed = 0;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      const el = e.target as HTMLElement;
      const interactive = !!(el.closest('a') || el.closest('button') || el.closest('[role="button"]') || el.closest('select') || el.closest('input'));

      if (interactive && !isInteractive) {
        const now = Date.now();
        if (now - lastPlayed > 120) {
          starkAudio.playClick(1100);
          lastPlayed = now;
        }
      }
      setIsInteractive(interactive);
    };

    const onDown = () => {
      setIsActive(true);
      starkAudio.playClick(650);
    };
    const onUp = () => setIsActive(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [rawX, rawY, isInteractive]);

  const color = isActive ? theme.accentColor : isInteractive ? theme.secondaryColor : theme.primaryColor;
  const glow = isActive ? theme.accentColor : isInteractive ? theme.secondaryColor : theme.glowColor;

  const base = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    pointerEvents: 'none' as const,
    x,
    y,
  };

  return (
    <div className={`hidden md:block pointer-events-none ${className}`}>
      {/* Outer Targeting Ring */}
      <motion.div
        style={{
          ...base,
          width: isActive ? 32 : isInteractive ? 46 : 28,
          height: isActive ? 32 : isInteractive ? 46 : 28,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 12px ${glow}`,
          zIndex: 9999,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        {/* Reticle Corner Brackets */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((p) => (
          <span
            key={p}
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              borderColor: color,
              borderStyle: 'solid',
              borderWidth: 0,
              ...(p === 'tl' && { top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 }),
              ...(p === 'tr' && { top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 }),
              ...(p === 'bl' && { bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 }),
              ...(p === 'br' && { bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 }),
            }}
          />
        ))}
      </motion.div>

      {/* Center Plasma Pip */}
      <motion.div
        style={{
          ...base,
          width: isActive ? 5 : 3,
          height: isActive ? 5 : 3,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${glow}`,
          zIndex: 9999,
        }}
      />

      {/* Caliper Crosshairs */}
      <motion.div
        style={{
          ...base,
          width: 18,
          height: 1,
          translateX: '-50%',
          translateY: '-50%',
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
          zIndex: 9998,
        }}
      />
      <motion.div
        style={{
          ...base,
          width: 1,
          height: 18,
          translateX: '-50%',
          translateY: '-50%',
          background: `linear-gradient(180deg, transparent, ${color}80, transparent)`,
          zIndex: 9998,
        }}
      />

      {/* Target Engagement Tag */}
      {isInteractive && (
        <motion.div
          style={{
            ...base,
            translateX: '24px',
            translateY: '-130%',
            zIndex: 9997,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase backdrop-blur-md shadow-lg"
            style={{
              background: 'rgba(5, 5, 5, 0.9)',
              border: `1px solid ${color}80`,
              color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: color }} />
            <span>LOCK [{coords.x},{coords.y}]</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
