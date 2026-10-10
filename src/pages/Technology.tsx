import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, X, ChevronRight, Shield } from 'lucide-react';
import { technologiesData } from '../data/technologies';
import type { Technology as TechType } from '../types';
import { armorsData } from '../data/armors';
import { HolographicCard } from '../components/HolographicCard';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const Technology: React.FC = () => {
  const { theme } = useStark();
  const [selectedTech, setSelectedTech] = useState<TechType | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(technologiesData.map((t) => t.category)))];

  const filteredTech =
    activeCategory === 'ALL'
      ? technologiesData
      : technologiesData.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header & Clearance Chip */}
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
            <span>STARK R&D DIVISION // LEVEL 10 CLEARANCE</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            TECHNOLOGY ARCHIVE
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            Explore {technologiesData.length} revolutionary Stark engineering breakthroughs across clean energy, nanotechnology, artificial intelligence, and aerospace defense.
          </p>
        </motion.div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                starkAudio.playClick(900);
              }}
              className={`px-4 py-2 rounded-xl uppercase tracking-wider transition-all font-bold cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stark-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-stark-darker/90 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, index) => (
              <HolographicCard
                key={tech.id}
                variant="tech"
                image={tech.image}
                title={tech.name}
                subtitle={tech.category}
                badges={[
                  { text: `${tech.relatedArmor.length} ARMORS`, color: theme.primaryColor },
                ]}
                metadata={[
                  { label: 'INVENTOR', value: tech.inventor },
                  { label: 'CATEGORY', value: tech.category },
                ]}
                onClick={() => {
                  setSelectedTech(tech);
                  starkAudio.playChirp();
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
              >
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mt-1">
                  {tech.description}
                </p>
              </HolographicCard>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Tech Detail Modal ────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stark-darker border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(0,0,0,0.9)] relative"
                style={{ borderColor: `${theme.primaryColor}50` }}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-stark-darker/95 backdrop-blur-md border-b border-gray-800 p-6 flex items-start justify-between z-20">
                  <div className="space-y-1">
                    <span
                      className="px-3 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border"
                      style={{
                        background: `${theme.primaryColor}20`,
                        borderColor: `${theme.primaryColor}50`,
                        color: theme.primaryColor,
                      }}
                    >
                      {selectedTech.category} // PATENT FILED
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white tracking-wide mt-1">
                      {selectedTech.name}
                    </h2>
                    <p className="text-xs font-mono text-gray-400">
                      LEAD INVENTOR: <span className="text-stark-gold font-bold">{selectedTech.inventor}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTech(null);
                      starkAudio.playClick(700);
                    }}
                    className="p-2 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Detailed Description */}
                  <div className="p-6 rounded-2xl border border-stark-border/40 bg-black/60 space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stark-gold flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>TECHNICAL SPECIFICATION & OVERVIEW</span>
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed font-sans pt-1">
                      {selectedTech.description}
                    </p>
                  </div>

                  {/* Related Armors Grid */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>DEPLOYED IN {selectedTech.relatedArmor.length} COMBAT ARMOR UNITS</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedTech.relatedArmor.map((armorId) => {
                        const armor = armorsData.find((a) => a.id === armorId);
                        return armor ? (
                          <Link
                            key={armorId}
                            to={`/armor?highlight=${armorId}`}
                            onClick={() => {
                              setSelectedTech(null);
                              starkAudio.playChirp();
                            }}
                            className="p-3 rounded-xl border border-gray-800 bg-black/50 hover:border-stark-gold/60 hover:bg-stark-panel/60 transition-all flex flex-col justify-between group cursor-pointer"
                          >
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-stark-gold transition-colors">
                                {armor.name}
                              </div>
                              <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                                {armor.mark || armor.universe}
                              </div>
                            </div>
                            <div className="text-[10px] font-mono text-stark-gold mt-2 flex items-center gap-1 group-hover:underline">
                              <span>OPEN DOSSIER</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
