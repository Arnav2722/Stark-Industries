import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Cpu } from 'lucide-react';
import { ArcReactor } from '../components/ArcReactor';
import { useStark } from '../context/StarkContext';

export const About: React.FC = () => {
  const { theme, triggerHouseParty, triggerVeronica, triggerSnap } = useStark();

  return (
    <div className="min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header & Clearance Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-stark-darker text-[10px] font-mono uppercase tracking-widest"
            style={{ borderColor: `${theme.primaryColor}50`, color: theme.primaryColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: theme.primaryColor }} />
            <span>MEMORIAL ARCHIVE // LEVEL 10 CLEARANCE</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            ABOUT THE ARCHIVE
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-xl mx-auto">
            Preserving the legacy of Anthony Edward Stark — the futurist, inventor, hero, and founding Avenger.
          </p>
        </motion.div>

        {/* ── Centerpiece Memorial Arc Reactor ───────────────────────────── */}
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-stark-gold/40 bg-stark-darker/90 backdrop-blur-xl text-center space-y-4 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <ArcReactor size={180} animate={true} interactive={true} />
          <div className="space-y-1">
            <h2 className="font-display text-xl md:text-2xl font-black text-stark-gold uppercase tracking-wider">
              "PROOF THAT TONY STARK HAS A HEART"
            </h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              GIFTED BY PEPPER POTTS // 2008 MALIBU WORKSHOP
            </p>
          </div>
        </div>

        {/* ── Mission & Engineering Philosophy ────────────────────────────── */}
        <div className="p-8 rounded-3xl border border-stark-border/50 bg-stark-darker/80 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>ARCHIVAL MISSION & PURPOSE</span>
          </div>
          <p className="text-base text-gray-200 leading-relaxed font-sans">
            The Stark Industries Museum & Archival Terminal is dedicated to permanently preserving and celebrating the technical breakthroughs of Tony Stark. From the crude scrap-metal Mark I constructed under duress in the Afghan mountains to the pinnacle Mark LXXXV nanotechnology suit that saved the cosmos, we document every armor mark, weapons system, artificial intelligence core, and ultimate sacrifice.
          </p>
        </div>

        {/* ── Interactive Tactical Protocol Easter Eggs Console ──────────── */}
        <div className="p-8 rounded-3xl border border-red-500/40 bg-red-950/20 backdrop-blur-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>STARK EMERGENCY OVERRIDE PROTOCOLS (LIVE TEST)</span>
            </span>
            <p className="text-xs font-mono text-gray-400">
              Trigger authorized Stark OS defense subroutines directly in your browser:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <button
              onClick={triggerHouseParty}
              className="p-4 rounded-xl border border-red-500/50 bg-red-950/60 hover:bg-red-900/60 text-red-200 font-bold uppercase tracking-wider flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-red-400" />
              <span>HOUSE PARTY PROTOCOL</span>
            </button>

            <button
              onClick={triggerVeronica}
              className="p-4 rounded-xl border border-amber-500/50 bg-amber-950/60 hover:bg-amber-900/60 text-amber-200 font-bold uppercase tracking-wider flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Shield className="w-5 h-5 text-amber-400" />
              <span>DEPLOY VERONICA</span>
            </button>

            <button
              onClick={triggerSnap}
              className="p-4 rounded-xl border border-cyan-500/50 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-200 font-bold uppercase tracking-wider flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>INFINITY SNAP</span>
            </button>
          </div>
        </div>

        {/* ── Credits & Disclaimers ───────────────────────────────────────── */}
        <div className="p-8 rounded-3xl border border-gray-800 bg-black/60 space-y-4 font-mono text-xs text-gray-400">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            CREDITS & FAIR USE DISCLAIMER
          </h3>
          <p className="leading-relaxed font-sans text-xs">
            Iron Man, Tony Stark, Avengers, J.A.R.V.I.S., and all related characters and marks are registered trademarks of Marvel Studios and Marvel Characters, Inc. This application is an educational fan tribute built to celebrate the legacy of Tony Stark and Robert Downey Jr.
          </p>
          <div className="pt-4 border-t border-gray-900 flex items-center justify-between text-[11px] text-gray-500">
            <span>STARK INDUSTRIES ARCHIVAL ENGINE V10.4</span>
            <span className="text-stark-gold">"I LOVE YOU 3000"</span>
          </div>
        </div>
      </div>
    </div>
  );
};
