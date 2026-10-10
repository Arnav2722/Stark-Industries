import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Shield } from 'lucide-react';
import { charactersData } from '../data/characters';
import { Character } from '../types';
import { HolographicCard } from '../components/HolographicCard';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const Characters: React.FC = () => {
  const { theme } = useStark();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'allies' | 'enemies'>('all');

  const filteredCharacters = charactersData.filter((char) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      char.name.toLowerCase().includes(q) ||
      (char.alias && char.alias.toLowerCase().includes(q)) ||
      char.relationship.toLowerCase().includes(q);

    const isEnemy =
      char.relationship.toLowerCase().includes('enemy') ||
      char.relationship.toLowerCase().includes('adversary') ||
      char.relationship.toLowerCase().includes('villain') ||
      char.relationship.toLowerCase().includes('opponent');

    if (filterType === 'allies') return matchesSearch && !isEnemy;
    if (filterType === 'enemies') return matchesSearch && isEnemy;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-10">
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
            <span>S.H.I.E.L.D. & STARK DATABASE // INTELLIGENCE DOSSIERS</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            CHARACTER INTELLIGENCE
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            Classified psychological assessments, weapon signatures, and historical engagements with Tony Stark's inner circle, Avengers allies, and galactic adversaries.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="p-6 rounded-2xl border bg-stark-darker/90 backdrop-blur-xl space-y-6" style={{ borderColor: `${theme.primaryColor}30` }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH BY CHARACTER NAME, ALIAS, OR AFFILIATION..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-black/70 border border-stark-border/60 rounded-xl text-white font-mono text-xs placeholder-gray-500 focus:outline-none focus:border-stark-gold tracking-wider uppercase"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-800 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 uppercase mr-2">ALIGNMENT:</span>
              {[
                { id: 'all', label: 'ALL DOSSIERS' },
                { id: 'allies', label: 'ALLIES & AVENGERS' },
                { id: 'enemies', label: 'ADVERSARIES & THREATS' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilterType(f.id as any);
                    starkAudio.playClick(900);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-all font-bold cursor-pointer ${
                    filterType === f.id
                      ? 'bg-stark-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-gray-500">
              SHOWING {filteredCharacters.length} DOSSIERS
            </span>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCharacters.map((char, index) => {
              const isEnemy =
                char.relationship.toLowerCase().includes('enemy') ||
                char.relationship.toLowerCase().includes('adversary') ||
                char.relationship.toLowerCase().includes('villain');

              return (
                <HolographicCard
                  key={char.id}
                  variant="character"
                  image={char.image}
                  title={char.name}
                  subtitle={char.alias || char.relationship}
                  badges={[
                    {
                      text: isEnemy ? 'THREAT / HOSTILE' : 'VERIFIED ALLY',
                      color: isEnemy ? '#ef4444' : '#22c55e',
                    },
                  ]}
                  metadata={[
                    { label: 'RELATION', value: char.relationship },
                    { label: 'DEBUT', value: char.firstAppearance.split('(')[0].trim() },
                  ]}
                  onClick={() => {
                    setSelectedCharacter(char);
                    starkAudio.playChirp();
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(index * 0.02, 0.3) }}
                >
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">
                    {char.description}
                  </p>
                </HolographicCard>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Character Detail Modal ──────────────────────────────────────── */}
        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
              onClick={() => setSelectedCharacter(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stark-darker border rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative"
                style={{ borderColor: `${theme.primaryColor}50` }}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-gray-800">
                  <div className="space-y-1">
                    <span className="px-3 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-700 bg-black text-stark-gold">
                      CLASSIFIED DOSSIER // {selectedCharacter.relationship.toUpperCase()}
                    </span>
                    <h2 className="font-display text-2xl md:text-4xl font-black uppercase text-white mt-1">
                      {selectedCharacter.name}
                    </h2>
                    {selectedCharacter.alias && (
                      <p className="text-xs font-mono text-cyan-400">
                        CODENAME: {selectedCharacter.alias}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCharacter(null);
                      starkAudio.playClick(700);
                    }}
                    className="p-2 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-gray-800 bg-black/50">
                    <div>
                      <span className="text-gray-500 uppercase text-[10px]">RELATIONSHIP WITH STARK:</span>
                      <p className="text-white font-bold mt-0.5">{selectedCharacter.relationship}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 uppercase text-[10px]">FIRST CHRONICLED APPEARANCE:</span>
                      <p className="text-white font-bold mt-0.5">{selectedCharacter.firstAppearance}</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-stark-border/40 bg-black/60 space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stark-gold flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>TACTICAL BACKGROUND & PSYCHOLOGICAL PROFILE</span>
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed font-sans pt-1">
                      {selectedCharacter.description}
                    </p>
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
