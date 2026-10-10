import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Activity, ChevronRight } from 'lucide-react';
import { avengersTower } from '../data/avengers-tower';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const Tower: React.FC = () => {
  const { theme } = useStark();
  const [selectedFloor, setSelectedFloor] = useState<number>(0);

  const activeFloorData = avengersTower.floors[selectedFloor] || avengersTower.floors[0];

  return (
    <div className="min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-12">
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
            <span>STARK ARCHITECTURE // 200 PARK AVENUE NYC</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            AVENGERS TOWER COMPLEX
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            The self-sustaining architectural pinnacle of clean arc energy, advanced aerospace hangars, and tactical command centers in midtown Manhattan.
          </p>
        </motion.div>

        {/* ── Interactive Skyscraper Floor CAD Inspector ─────────────────── */}
        <section className="p-6 md:p-8 rounded-3xl border bg-stark-darker/90 backdrop-blur-xl space-y-8" style={{ borderColor: `${theme.primaryColor}40` }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-800 font-mono text-xs">
            <div>
              <span className="text-stark-gold font-bold uppercase">INTERACTIVE TOWER CAD ELEVATOR</span>
              <p className="text-gray-500 text-[10px]">SELECT A LEVEL TO INSPECT TACTICAL LAYOUT & AMENITIES</p>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
              <span>ARC POWER GRID NOMINAL // 100% CLEAN RUN</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Floor Selector Stack */}
            <div className="lg:col-span-4 space-y-2">
              {avengersTower.floors.map((floor, index) => (
                <button
                  key={floor.level}
                  onClick={() => {
                    setSelectedFloor(index);
                    starkAudio.playClick(900);
                  }}
                  className={`w-full text-left p-4 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                    selectedFloor === index
                      ? 'bg-stark-gold/15 text-white border-stark-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'border-stark-border/40 text-gray-400 hover:text-white hover:bg-stark-panel/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-stark-gold font-bold">LVL {floor.level}</span>
                    <span className="font-semibold">{floor.name}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedFloor === index ? 'translate-x-1 text-stark-gold' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>

            {/* Right: Active Floor Technical Dossier */}
            <div className="lg:col-span-8 p-6 rounded-2xl border border-stark-border/50 bg-black/60 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stark-gold">
                    LEVEL {activeFloorData.level} SPECIFICATION
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase text-white mt-1">
                    {activeFloorData.name}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl border border-stark-gold/40 flex items-center justify-center bg-stark-gold/10">
                  <Building className="w-6 h-6 text-stark-gold" />
                </div>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed font-sans">
                {activeFloorData.description}
              </p>

              {/* Tactical Features Chips */}
              <div className="space-y-2 font-mono">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">DEPLOYED AMENITIES & SYSTEMS:</span>
                <div className="flex flex-wrap gap-2">
                  {activeFloorData.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-semibold"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Historical Events at Avengers Tower ─────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h2 className="font-display text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-stark-gold" />
              <span>KEY HISTORICAL ENGAGEMENTS AT 200 PARK AVE</span>
            </h2>
            <span className="font-mono text-xs text-gray-500">MCU ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {avengersTower.keyEvents.map((event) => (
              <div
                key={event.date}
                className="p-5 rounded-2xl border border-stark-border/50 bg-stark-darker/80 backdrop-blur-md space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-stark-gold/20 text-stark-gold border border-stark-gold/30">
                    {event.date}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{event.movie}</span>
                </div>
                <p className="text-sm font-sans text-gray-200 font-medium pt-1">{event.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tower History Log ───────────────────────────────────────────── */}
        <section className="p-6 md:p-8 rounded-3xl border border-gray-800 bg-stark-darker/60 space-y-4 font-mono text-xs">
          <h3 className="font-display text-xl font-black uppercase text-stark-gold">
            STRUCTURAL TIMELINE & EVOLUTION
          </h3>
          <div className="space-y-3">
            {avengersTower.history.map((h, i) => (
              <div key={i} className="flex items-start gap-3 border-l-2 border-stark-gold/40 pl-4 py-1">
                <p className="text-sm font-sans text-gray-300 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
