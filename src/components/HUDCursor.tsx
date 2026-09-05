import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function HUDCursor() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // Store raw pixel position
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring so it trails smoothly
  const x = useSpring(rawX, { stiffness: 600, damping: 45, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 600, damping: 45, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      const el = e.target as HTMLElement;
      setIsInteractive(
        !!(el.closest('a') || el.closest('button') || el.closest('[role="button"]'))
      );
    };
    const onDown = () => setIsActive(true);
    const onUp   = () => setIsActive(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [rawX, rawY]);

  const color = isActive ? '#C41E24' : isInteractive ? '#D4AF37' : '#00bcd4';
  const glow  = isActive ? 'rgba(196,30,36,0.4)' : isInteractive ? 'rgba(212,175,55,0.4)' : 'rgba(0,188,212,0.3)';

  // Shared positioning: x/y are the cursor pixel coords.
  // We use translateX/Y -50% to center each element on that point.
  const base = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    pointerEvents: 'none' as const,
    x,
    y,
  };

  return (
    <>
      {/* ── Outer rotating targeting ring ── */}
      <motion.div
        style={{
          ...base,
          width: isActive ? 34 : isInteractive ? 42 : 30,
          height: isActive ? 34 : isInteractive ? 42 : 30,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 10px ${glow}, 0 0 20px ${glow}`,
          zIndex: 9999,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        {/* Corner ticks */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((p) => (
          <span
            key={p}
            style={{
              position: 'absolute',
              width: 6,
              height: 6,
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

      {/* ── Inner dot ── */}
      <motion.div
        style={{
          ...base,
          width: isActive ? 6 : 4,
          height: isActive ? 6 : 4,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${glow}`,
          zIndex: 9999,
        }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* ── Horizontal crosshair ── */}
      <motion.div
        style={{
          ...base,
          width: 20,
          height: 1,
          translateX: '-50%',
          translateY: '-50%',
          background: `linear-gradient(90deg, transparent, ${color}90, transparent)`,
          zIndex: 9998,
        }}
      />

      {/* ── Vertical crosshair ── */}
      <motion.div
        style={{
          ...base,
          width: 1,
          height: 20,
          translateX: '-50%',
          translateY: '-50%',
          background: `linear-gradient(180deg, transparent, ${color}90, transparent)`,
          zIndex: 9998,
        }}
      />

      {/* ── "ENGAGE" label that appears on interactive elements ── */}
      {isInteractive && (
        <motion.div
          style={{
            ...base,
            // offset to the right & above so it doesn't sit on the ring
            translateX: '18px',
            translateY: '-140%',
            zIndex: 9997,
          }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.8)',
              border: `1px solid ${color}60`,
              color,
              backdropFilter: 'blur(6px)',
              padding: '2px 8px',
              fontSize: 9,
              fontFamily: 'JetBrains Mono, monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
          >
            ENGAGE ▶
          </div>
        </motion.div>
      )}
    </>
  );
}
