import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArcReactor } from './ArcReactor';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';
import { Shield, Sparkles, Terminal, ChevronRight } from 'lucide-react';

const starkQuotes = [
  { text: "I am Iron Man.", movie: "Iron Man (2008)" },
  { text: "Sometimes you gotta run before you can walk.", movie: "Iron Man (2008)" },
  { text: "Genius, billionaire, playboy, philanthropist.", movie: "The Avengers (2012)" },
  { text: "It's not about how much we lost. It's about how much we have left.", movie: "Avengers: Endgame (2019)" },
  { text: "If we can't accept limitations, then we're no better than the bad guys.", movie: "Captain America: Civil War (2016)" },
  { text: "Part of the journey is the end.", movie: "Avengers: Endgame (2019)" },
];

export const HeroSection: React.FC = () => {
  const { theme, toggleTerminal, openSuitCompare } = useStark();
  const [quoteIdx, setQuoteIdx] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % starkQuotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = starkQuotes[quoteIdx];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-4 py-16 md:py-24">
      {/* Background Holographic Hex Grid & Circuit Mesh */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${theme.primaryColor}20 1px, transparent 1px),
            linear-gradient(to right, ${theme.primaryColor}08 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.primaryColor}08 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 20px 20px, 20px 20px',
        }}
      />

      {/* Floating Ambient Holographic Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: theme.bgGlow }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px]"
          style={{ background: 'rgba(212, 175, 55, 0.08)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Top Stark Status Chip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border bg-stark-darker/85 backdrop-blur-md mb-8 shadow-lg"
          style={{ borderColor: `${theme.primaryColor}40` }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ background: theme.primaryColor }} />
          <span className="font-mono text-xs uppercase tracking-widest text-gray-300 font-bold">
            STARK INDUSTRIES ARCHIVE // LEVEL 10 CLEARANCE
          </span>
        </motion.div>

        {/* Centerpiece 3D Interactive Arc Reactor Display */}
        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="mb-8 relative flex items-center justify-center"
        >
          <div className="relative p-6 rounded-full border border-dashed backdrop-blur-sm" style={{ borderColor: `${theme.primaryColor}30` }}>
            <ArcReactor size={200} interactive={true} />

            {/* Orbiting Telemetry Tag 1 */}
            <motion.div
              className="absolute -top-4 -right-12 hidden md:block px-3 py-1.5 rounded-lg border bg-black/80 backdrop-blur-md text-left font-mono text-[10px]"
              style={{ borderColor: `${theme.secondaryColor}40` }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-gray-400">OUTPUT CORE:</div>
              <div className="font-bold text-stark-gold">487 GW // PEAK</div>
            </motion.div>

            {/* Orbiting Telemetry Tag 2 */}
            <motion.div
              className="absolute -bottom-4 -left-12 hidden md:block px-3 py-1.5 rounded-lg border bg-black/80 backdrop-blur-md text-left font-mono text-[10px]"
              style={{ borderColor: `${theme.primaryColor}40` }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="text-gray-400">A.I. SYSTEM:</div>
              <div className="font-bold" style={{ color: theme.primaryColor }}>{theme.name} ACTIVE</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              IRON MAN
            </span>{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.secondaryColor} 0%, #ffffff 50%, ${theme.primaryColor} 100%)`,
              }}
            >
              MUSEUM
            </span>
          </h1>

          <p className="font-display text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400">
            THE DEFINITIVE STARK ARMOR, TECHNOLOGY & CINEMATIC ARCHIVE
          </p>
        </motion.div>

        {/* Holographic Rotating Quote Hologram */}
        <motion.div
          key={currentQuote.text}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl px-6 py-4 rounded-xl border bg-stark-darker/90 backdrop-blur-md mb-10 shadow-2xl relative"
          style={{
            borderColor: `${theme.secondaryColor}40`,
            boxShadow: `0 0 25px rgba(212,175,55,0.15)`,
          }}
        >
          <p className="font-display text-base md:text-lg italic text-stark-goldLight font-medium mb-1">
            "{currentQuote.text}"
          </p>
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
            — TONY STARK // {currentQuote.movie}
          </p>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 z-20"
        >
          {/* Enter Armor Archive CTA */}
          <Link
            to="/armor"
            onClick={() => starkAudio.playChirp()}
            className="group px-8 py-4 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)`,
              boxShadow: `0 0 35px rgba(212,175,55,0.5)`,
            }}
          >
            <Shield className="w-4 h-4 text-black" />
            <span>ENTER ARMOR ARCHIVE (31 SUITS)</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-black" />
          </Link>

          {/* Launch Holographic Compare CTA */}
          <button
            onClick={() => openSuitCompare()}
            className="px-7 py-4 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white border flex items-center gap-2 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-stark-darker/80"
            style={{
              borderColor: `${theme.primaryColor}80`,
              boxShadow: `0 0 25px ${theme.bgGlow}`,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: theme.primaryColor }} />
            <span>COMPARE SUITS MATRIX</span>
          </button>

          {/* Open J.A.R.V.I.S. Terminal CTA */}
          <button
            onClick={toggleTerminal}
            className="px-6 py-4 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white border border-stark-border/60 hover:border-stark-border flex items-center gap-2 bg-stark-panel/60 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-stark-gold" />
            <span>ACCESS STARK OS</span>
          </button>
        </motion.div>

        {/* Real-time Telemetry Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl mt-16 pt-10 border-t border-stark-border/40 font-mono"
        >
          {[
            { value: '31', label: 'ARMORS CATALOGED', tag: 'MK I — MK LXXXV' },
            { value: '15', label: 'CORE TECHNOLOGIES', tag: 'CLEAN ENERGY & NANO' },
            { value: '8', label: 'MCU BLOCKBUSTERS', tag: '2008 — 2019' },
            { value: '20+', label: 'KEY DOSSIERS', tag: 'ALLIES & ADVERSARIES' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-display text-3xl md:text-4xl font-black text-white">
                {stat.value}
              </span>
              <span className="text-[11px] font-bold tracking-wider mt-1 text-stark-gold">
                {stat.label}
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
                {stat.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
