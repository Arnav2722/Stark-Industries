import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStark } from '../context/StarkContext';
import { armorsData } from '../data/armors';
import { HolographicArmorModel } from './HolographicArmorModel';
import { X, Zap, Crosshair, Sparkles } from 'lucide-react';
import { starkAudio } from '../utils/starkAudio';

export const StarkSpecialFX: React.FC = () => {
  const {
    isHousePartyActive,
    isSnapActive,
    isVeronicaActive,
    isCompareOpen,
    setIsCompareOpen,
    compareSuits,
    setCompareSuits,
    theme,
  } = useStark();

  const suit1 = armorsData.find(a => a.id === compareSuits[0]) || armorsData[2]; // Mark 3 default
  const suit2 = armorsData.find(a => a.id === compareSuits[1]) || armorsData[13]; // Mark 85 default

  return (
    <>
      {/* ── 1. House Party Protocol FX ────────────────────────────────────── */}
      <AnimatePresence>
        {isHousePartyActive && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Warning Banner */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 px-8 py-3 bg-red-950/90 border-2 border-red-500 rounded-xl backdrop-blur-xl flex items-center gap-4 text-white shadow-[0_0_50px_rgba(239,68,68,0.8)]"
            >
              <Zap className="w-6 h-6 text-yellow-400 animate-bounce" />
              <div>
                <div className="font-display text-base font-black tracking-widest text-red-400">
                  HOUSE PARTY PROTOCOL ENGAGED
                </div>
                <div className="text-xs font-mono text-gray-300">
                  31 AUTOMATED SUITS DEPLOYED // COMBAT VECTOR SECURE
                </div>
              </div>
            </motion.div>

            {/* Flying Armor Squads across screen */}
            {armorsData.slice(0, 16).map((armor, idx) => {
              const startY = 15 + (idx % 8) * 11;
              const delay = idx * 0.4;
              const isReverse = idx % 2 === 1;

              return (
                <motion.div
                  key={armor.id}
                  initial={{
                    x: isReverse ? '120vw' : '-30vw',
                    y: `${startY}vh`,
                    scale: 0.6 + Math.random() * 0.6,
                    opacity: 0,
                  }}
                  animate={{
                    x: isReverse ? '-40vw' : '130vw',
                    y: `${startY + (Math.random() * 15 - 7)}vh`,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    delay,
                    ease: 'easeInOut',
                  }}
                  className="absolute flex items-center gap-3"
                >
                  {/* Glowing Repulsor Jet Stream */}
                  <div
                    className={`w-32 h-2 rounded-full ${isReverse ? 'order-last' : ''}`}
                    style={{
                      background: `linear-gradient(${isReverse ? '90deg' : '-90deg'}, #00bcd4, #D4AF37, transparent)`,
                      boxShadow: '0 0 20px #00bcd4',
                    }}
                  />
                  {/* Mini Hologram Armor Silhouette */}
                  <div className="px-3 py-1 bg-black/80 border border-arc-500 rounded-md backdrop-blur-sm text-arc-300 font-display text-xs font-bold whitespace-nowrap shadow-[0_0_15px_rgba(0,188,212,0.6)]">
                    {armor.mark || armor.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* ── 2. "I am Iron Man" Snap FX ───────────────────────────────────── */}
      <AnimatePresence>
        {isSnapActive && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {/* White/Gold Energy Flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 0.9, 0] }}
              transition={{ duration: 4 }}
              className="absolute inset-0 bg-white"
            />

            {/* Infinity Stones Energy Ring */}
            <motion.div
              initial={{ scale: 0.2, rotate: 0 }}
              animate={{ scale: [0.2, 1.5, 3], rotate: 720 }}
              transition={{ duration: 5 }}
              className="relative w-96 h-96 rounded-full border-4 border-stark-gold flex items-center justify-center"
              style={{
                boxShadow: '0 0 100px #D4AF37, 0 0 200px #E8352A, inset 0 0 80px #00bcd4',
              }}
            >
              {/* 6 Infinity Stones glowing points */}
              {[
                { color: '#3b82f6', label: 'SPACE' },
                { color: '#eab308', label: 'MIND' },
                { color: '#ef4444', label: 'REALITY' },
                { color: '#a855f7', label: 'POWER' },
                { color: '#22c55e', label: 'TIME' },
                { color: '#f97316', label: 'SOUL' },
              ].map((stone, idx) => (
                <div
                  key={stone.label}
                  className="absolute w-8 h-8 rounded-full flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-lg"
                  style={{
                    background: stone.color,
                    boxShadow: `0 0 25px ${stone.color}`,
                    top: `${50 + 42 * Math.sin((idx * 60 * Math.PI) / 180)}%`,
                    left: `${50 + 42 * Math.cos((idx * 60 * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  ✦
                </div>
              ))}
            </motion.div>

            {/* Stark Quote Banner */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-32 text-center"
            >
              <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-widest drop-shadow-[0_0_30px_rgba(212,175,55,1)]">
                "I AM IRON MAN."
              </h2>
              <p className="font-mono text-sm text-stark-gold tracking-widest mt-2">
                NANO GAUNTLET DISCHARGE COMPLETE // 2008 - 2023
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 3. Veronica Hulkbuster Orbital Deployment FX ─────────────────── */}
      <AnimatePresence>
        {isVeronicaActive && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {/* Satellite Grid Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 border-8 border-red-500/40"
            >
              <div className="absolute top-8 left-8 font-mono text-xs text-red-400 space-y-1">
                <div>[ORBITAL SATELLITE: VERONICA-01]</div>
                <div>TRAJECTORY: DESCENT VECTOR 44.29</div>
                <div>TARGET LOCK: HULKBUSTER MODULE MARK XLIV</div>
              </div>
            </motion.div>

            {/* Target Reticle Lock */}
            <motion.div
              initial={{ scale: 3, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
              className="relative w-80 h-80 rounded-full border-2 border-red-500 flex items-center justify-center"
              style={{ boxShadow: '0 0 60px rgba(239,68,68,0.8)' }}
            >
              <Crosshair className="w-24 h-24 text-red-500 animate-pulse" />
              <div className="absolute font-display text-xs text-red-400 font-bold tracking-widest bottom-6">
                ORBITAL DROP INBOUND
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 4. Holographic Armor Comparison Matrix Modal ─────────────────── */}
      <AnimatePresence>
        {isCompareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl"
            onClick={() => setIsCompareOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl border bg-stark-darker/95 p-6 md:p-8"
              style={{
                borderColor: theme.primaryColor,
                boxShadow: `0 0 50px ${theme.glowColor}`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-stark-border/60">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-stark-gold" />
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-wider">
                      HOLOGRAPHIC ARMOR COMPARISON MATRIX
                    </h2>
                    <p className="text-xs font-mono text-gray-400">
                      STARK INDUSTRIES DIAGNOSTIC COMPARISON BENCHMARK
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Suit Selectors & Visualizer Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                {/* Suit 1 Column */}
                <div className="space-y-4 p-6 rounded-xl border border-stark-border/50 bg-stark-panel/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-arc-400 uppercase tracking-wider font-bold">
                      PRIMARY ARMOR SPECIMEN
                    </label>
                    <select
                      value={suit1.id}
                      onChange={(e) => {
                        setCompareSuits([e.target.value, compareSuits[1]]);
                        starkAudio.playClick();
                      }}
                      className="bg-gray-900 border border-arc-500/40 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-arc-400"
                    >
                      {armorsData.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.mark || 'Special'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <HolographicArmorModel markName={suit1.name} category={suit1.universe} size="md" />

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-800">
                      <span className="text-gray-400">Mark Identifier:</span>
                      <span className="text-white font-bold">{suit1.mark || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800">
                      <span className="text-gray-400">First Appearance:</span>
                      <span className="text-white">{suit1.firstAppearance}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800">
                      <span className="text-gray-400">Purpose / Role:</span>
                      <span className="text-stark-gold">{suit1.purpose}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Key Technologies:</span>
                      <div className="flex flex-wrap gap-1">
                        {suit1.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-arc-900/40 text-arc-300 border border-arc-700/50 rounded text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Weapons Loadout:</span>
                      <div className="flex flex-wrap gap-1">
                        {suit1.weapons.map((w) => (
                          <span key={w} className="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-800/50 rounded text-[10px]">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suit 2 Column */}
                <div className="space-y-4 p-6 rounded-xl border border-stark-border/50 bg-stark-panel/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-stark-gold uppercase tracking-wider font-bold">
                      COMPARISON ARMOR SPECIMEN
                    </label>
                    <select
                      value={suit2.id}
                      onChange={(e) => {
                        setCompareSuits([compareSuits[0], e.target.value]);
                        starkAudio.playClick();
                      }}
                      className="bg-gray-900 border border-stark-gold/40 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-stark-gold"
                    >
                      {armorsData.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.mark || 'Special'})
                        </option>
                      ))}
                    </select>
                  </div>

                  <HolographicArmorModel markName={suit2.name} category={suit2.universe} size="md" />

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-800">
                      <span className="text-gray-400">Mark Identifier:</span>
                      <span className="text-white font-bold">{suit2.mark || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800">
                      <span className="text-gray-400">First Appearance:</span>
                      <span className="text-white">{suit2.firstAppearance}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-800">
                      <span className="text-gray-400">Purpose / Role:</span>
                      <span className="text-stark-gold">{suit2.purpose}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Key Technologies:</span>
                      <div className="flex flex-wrap gap-1">
                        {suit2.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-arc-900/40 text-arc-300 border border-arc-700/50 rounded text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Weapons Loadout:</span>
                      <div className="flex flex-wrap gap-1">
                        {suit2.weapons.map((w) => (
                          <span key={w} className="px-2 py-0.5 bg-red-950/40 text-red-400 border border-red-800/50 rounded text-[10px]">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
