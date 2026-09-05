import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

// Diagnostic data for HUD overlay
const diagnosticData = [
  { label: 'SYSTEM STATUS', value: 'NOMINAL', color: '#00bcd4' },
  { label: 'POWER LEVEL',   value: '87%',     color: '#D4AF37' },
  { label: 'ARC REACTOR',   value: 'STABLE',  color: '#00bcd4' },
  { label: 'J.A.R.V.I.S.', value: 'ONLINE',  color: '#00bcd4' },
  { label: 'THREAT LEVEL',  value: 'NONE',    color: '#D4AF37' },
  { label: 'NAVIGATION',    value: 'ACTIVE',  color: '#00bcd4' },
  { label: 'SENSORS',       value: 'OPTIMAL', color: '#00bcd4' },
  { label: 'COMM LINK',     value: 'SECURE',  color: '#D4AF37' },
];

export function HUDOverlay() {
  const [_isActive, setIsActive] = useState(false);

  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xValue.set((clientX / window.innerWidth  - 0.5) * 2);
      yValue.set((clientY / window.innerHeight - 0.5) * 2);
    };
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp   = () => setIsActive(false);

    window.addEventListener('mousemove',  handleMouseMove);
    window.addEventListener('mousedown',  handleMouseDown);
    window.addEventListener('mouseup',    handleMouseUp);
    return () => {
      window.removeEventListener('mousemove',  handleMouseMove);
      window.removeEventListener('mousedown',  handleMouseDown);
      window.removeEventListener('mouseup',    handleMouseUp);
    };
  }, [xValue, yValue]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">

      {/* ── Top diagnostics row ─────────────────────────────────────── */}
      <div className="flex justify-between items-start p-6">

        {/* Top-left */}
        <div className="space-y-2">
          {diagnosticData.slice(0, 4).map((data, i) => (
            <motion.div
              key={data.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: data.color }} />
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${data.color}99` }}>
                {data.label}
              </span>
              <span className="text-[10px] font-mono font-bold" style={{ color: data.color }}>
                {data.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Top-right */}
        <div className="space-y-2 text-right">
          {diagnosticData.slice(4, 8).map((data, i) => (
            <motion.div
              key={data.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center justify-end gap-2"
            >
              <span className="text-[10px] font-mono font-bold" style={{ color: data.color }}>
                {data.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${data.color}99` }}>
                {data.label}
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: data.color }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom status ticker ─────────────────────────────────────── */}
      <motion.div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {diagnosticData.map((data, i) => (
          <motion.div
            key={data.label}
            className="flex items-center gap-1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          >
            <div className="w-1 h-1 rounded-full" style={{ background: data.color }} />
            <span className="text-[9px] font-mono" style={{ color: `${data.color}99` }}>
              {data.label.slice(0, 3)}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── HUD scan lines ───────────────────────────────────────────── */}
      <motion.div
        className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-arc-500/20 to-transparent"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="fixed top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-arc-500/20 to-transparent"
        animate={{ x: ['0vw', '100vw'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}
      />
    </div>
  );
}
