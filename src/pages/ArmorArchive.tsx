import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Shield, Sparkles, Zap, Cpu, Activity } from 'lucide-react';
import { armorsData } from '../data/armors';
import { Armor } from '../types';
import { HolographicCard } from '../components/HolographicCard';
import { HolographicArmorModel } from '../components/HolographicArmorModel';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const ArmorArchive: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { theme, openSuitCompare } = useStark();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'mark'>('mark');
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>(null);

  // Check URL query param for highlighting armor
  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    if (highlightId) {
      const match = armorsData.find((a) => a.id === highlightId);
      if (match) setSelectedArmor(match);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'ALL SUITS' },
    { id: 'mcu', label: 'MCU CANON' },
    { id: 'comics', label: 'COMIC ARCHIVES' },
    { id: 'animation', label: 'ANIMATED' },
    { id: 'games', label: 'GAMING VAULT' },
  ];

  const filteredArmors = useMemo(() => {
    let result = armorsData.filter((armor) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        armor.name.toLowerCase().includes(q) ||
        (armor.mark && armor.mark.toLowerCase().includes(q)) ||
        armor.purpose.toLowerCase().includes(q) ||
        armor.weapons.some((w) => w.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'all' || armor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => {
        if (a.mark && b.mark) {
          const numA = parseInt(a.mark.replace(/\D/g, '')) || 0;
          const numB = parseInt(b.mark.replace(/\D/g, '')) || 0;
          return numA - numB;
        }
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header & Stark Clearance Chip */}
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
            <span>STARK INDUSTRIES VAULT // HALL OF ARMORS</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            ARMOR ARCHIVE
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            Classified technical dossiers, offensive payload specifications, and 3D schematics for {armorsData.length} Stark armor configurations.
          </p>
        </motion.div>

        {/* Tactical Search & Filter Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border bg-stark-darker/90 backdrop-blur-xl space-y-6"
          style={{ borderColor: `${theme.primaryColor}30` }}
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH ARMOR BY MARK, NAME, WEAPON SYSTEM OR MISSION..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-black/70 border border-stark-border/60 rounded-xl text-white font-mono text-xs placeholder-gray-500 focus:outline-none focus:border-stark-gold transition-colors tracking-wider uppercase"
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

          {/* Filter Chips & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-800 text-xs font-mono">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 uppercase flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
                SECTOR:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    starkAudio.playClick(900);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider transition-all font-bold cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-stark-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown & Compare Shortcut */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openSuitCompare()}
                className="px-3.5 py-1.5 rounded-lg border border-stark-gold/40 text-stark-gold hover:bg-stark-gold/15 transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMPARE MATRIX</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 uppercase">SORT:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'mark')}
                  className="px-3 py-1.5 bg-black border border-gray-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-stark-gold"
                >
                  <option value="mark">MARK NUMBER</option>
                  <option value="name">ARMOR NAME</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Catalog Counter */}
        <div className="flex items-center justify-between font-mono text-xs text-gray-500 uppercase tracking-widest px-1">
          <span>
            SHOWING <strong className="text-white">{filteredArmors.length}</strong> OF {armorsData.length} COMBAT SUITS
          </span>
          <span>ARMOR CLEARANCE: UNRESTRICTED</span>
        </div>

        {/* Armor Grid with Holographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArmors.map((armor, index) => (
              <HolographicCard
                key={armor.id}
                variant="armor"
                image={armor.image}
                title={armor.name}
                subtitle={armor.mark}
                badges={[
                  { text: armor.universe, color: '#C41E24' },
                  { text: armor.category.toUpperCase(), color: '#D4AF37' },
                ]}
                metadata={[
                  { label: 'DEBUT', value: armor.firstAppearance.split('(')[0].trim() },
                  { label: 'ROLE', value: armor.purpose.length > 22 ? armor.purpose.slice(0, 22) + '...' : armor.purpose },
                ]}
                onClick={() => {
                  setSelectedArmor(armor);
                  starkAudio.playChirp();
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
              >
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono text-gray-400">
                    <span className="text-gray-500">WEAPONS: </span>
                    <span className="text-gray-300">{armor.weapons.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </HolographicCard>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredArmors.length === 0 && (
          <div className="text-center py-20 p-8 rounded-2xl border border-dashed border-gray-800 bg-stark-darker space-y-3">
            <Shield className="w-12 h-12 text-gray-600 mx-auto animate-pulse" />
            <h3 className="font-display text-xl font-bold text-white uppercase">NO MATCHING SUITS IN VAULT</h3>
            <p className="text-xs font-mono text-gray-400">
              Query returned zero records. Adjust parameters or clear search filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-stark-gold text-black font-mono text-xs font-bold uppercase"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* ── Holographic Armor Detail Modal ──────────────────────────────── */}
        <AnimatePresence>
          {selectedArmor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
              onClick={() => setSelectedArmor(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stark-darker border rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-[0_0_60px_rgba(0,0,0,0.9)] relative"
                style={{ borderColor: `${theme.primaryColor}50` }}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-stark-darker/95 backdrop-blur-md border-b border-gray-800 p-6 flex items-start justify-between z-20">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedArmor.mark && (
                        <span className="px-3 py-0.5 bg-stark-gold text-black text-xs font-mono font-bold rounded uppercase">
                          {selectedArmor.mark}
                        </span>
                      )}
                      <span className="px-3 py-0.5 bg-stark-red text-white text-xs font-mono font-bold rounded uppercase">
                        {selectedArmor.universe}
                      </span>
                      <span className="px-3 py-0.5 border border-gray-700 text-gray-300 text-xs font-mono rounded uppercase">
                        {selectedArmor.category}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-4xl font-black uppercase text-white tracking-wide">
                      {selectedArmor.name}
                    </h2>
                    <p className="text-xs font-mono text-gray-400">
                      FIRST MISSION // {selectedArmor.firstAppearance} ({selectedArmor.medium})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const armorToCompare = selectedArmor;
                        setSelectedArmor(null);
                        openSuitCompare(armorToCompare.id);
                      }}
                      className="px-3 py-2 rounded-xl border border-stark-gold/60 text-stark-gold font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-stark-gold/20 transition-colors"
                      title="Load this suit in comparison matrix"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">COMPARE</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedArmor(null);
                        starkAudio.playClick(700);
                      }}
                      className="p-2 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700 text-gray-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Body Content */}
                <div className="p-6 md:p-8 space-y-8">
                  {/* Holographic 3D Interactive Model Showcase */}
                  <div className="flex justify-center">
                    <HolographicArmorModel
                      markName={selectedArmor.mark || selectedArmor.name}
                      category={selectedArmor.category.toUpperCase()}
                      size="lg"
                      showControls={true}
                      interactive={true}
                    />
                  </div>

                  {/* Overview Description */}
                  <div className="p-6 rounded-2xl border border-stark-border/50 bg-black/60 space-y-2 font-mono">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stark-gold">
                      <Cpu className="w-4 h-4" />
                      <span>MISSION PROFILE & TACTICAL OVERVIEW</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed font-sans">
                      {selectedArmor.description}
                    </p>
                    <div className="pt-2 text-xs text-gray-400">
                      <span className="text-stark-gold">PRIMARY PURPOSE: </span>
                      <span>{selectedArmor.purpose}</span>
                    </div>
                  </div>

                  {/* Systems Breakdown Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Weapons Arsenal */}
                    <div className="p-5 rounded-2xl border border-red-500/30 bg-red-950/20 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>OFFENSIVE WEAPONS ARSENAL</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArmor.weapons.map((w) => (
                          <span
                            key={w}
                            className="px-3 py-1 bg-red-950/80 border border-red-500/40 text-red-200 font-mono text-xs rounded-lg font-semibold"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Integrated Technologies */}
                    <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>INTEGRATED TECHNOLOGIES</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArmor.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 font-mono text-xs rounded-lg font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Special Tactical Abilities */}
                    <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>SPECIAL COMBAT ABILITIES</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArmor.abilities.map((a) => (
                          <span
                            key={a}
                            className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 font-mono text-xs rounded-lg font-semibold"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Vulnerabilities & Design Constraints */}
                    <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>KNOWN SYSTEM VULNERABILITIES</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArmor.weaknesses.map((wk) => (
                          <span
                            key={wk}
                            className="px-3 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-200 font-mono text-xs rounded-lg font-semibold"
                          >
                            {wk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cinematic Appearances */}
                  <div className="p-5 rounded-2xl border border-gray-800 bg-stark-darker space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                      DOCUMENTED FIELD DEPLOYMENTS & APPEARANCES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedArmor.appearances.map((app) => (
                        <span
                          key={app}
                          className="px-3.5 py-1.5 bg-black/80 border border-gray-700 text-gray-200 font-mono text-xs rounded-xl"
                        >
                          {app}
                        </span>
                      ))}
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
