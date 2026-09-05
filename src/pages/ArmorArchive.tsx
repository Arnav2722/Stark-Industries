import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronRight, Shield } from 'lucide-react';
import { armorsData } from '../data/armors';
import { Armor } from '../types';

export function ArmorArchive() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'mark'>('mark');
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>(null);

  const categories = [
    { id: 'all', label: 'All Armors' },
    { id: 'mcu', label: 'MCU' },
    { id: 'comics', label: 'Comics' },
    { id: 'animation', label: 'Animation' },
    { id: 'games', label: 'Games' },
  ];

  const filteredArmors = useMemo(() => {
    let result = armorsData.filter(armor => {
      const matchesSearch = searchQuery === '' ||
        armor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (armor.mark && armor.mark.toLowerCase().includes(searchQuery.toLowerCase()));
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
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-7xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ARMOR ARCHIVE
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore {armorsData.length} iconic Iron Man suits from the MCU and comics
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by armor name or Mark number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-arc-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-arc-blue transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-5 h-5 text-arc-blue" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-arc-blue text-black'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border border-arc-blue/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'mark')}
                className="px-4 py-2 bg-gray-900 border border-arc-blue/20 rounded-lg text-white focus:outline-none focus:border-arc-blue"
              >
                <option value="mark">Mark Number</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm mb-6"
        >
          Showing {filteredArmors.length} of {armorsData.length} armors
        </motion.div>

        {/* Armor Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArmors.map((armor, index) => (
              <motion.div
                key={armor.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedArmor(armor)}
                className="cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl overflow-hidden hover:border-arc-blue/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-arc-blue/10">
                  {/* Image Placeholder */}
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    <Shield className="w-24 h-24 text-arc-blue/20 group-hover:text-arc-blue/40 transition-colors" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-arc-blue/90 text-black text-xs font-bold rounded uppercase">
                        {armor.category}
                      </span>
                    </div>
                    {armor.mark && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-stark-red/90 text-white text-xs font-bold rounded">
                          {armor.mark}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-arc-blue transition-colors mb-1">
                      {armor.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{armor.universe}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {armor.purpose}
                    </p>
                    <div className="flex items-center text-arc-blue text-sm mt-3 font-medium group-hover:text-stark-gold transition-colors">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredArmors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No armors found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {/* Armor Detail Modal */}
        <AnimatePresence>
          {selectedArmor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedArmor(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-arc-blue/20 p-6 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {selectedArmor.mark && (
                        <span className="px-3 py-1 bg-stark-red text-white text-sm font-bold rounded">
                          {selectedArmor.mark}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-arc-blue/20 text-arc-blue text-sm font-medium rounded uppercase">
                        {selectedArmor.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">{selectedArmor.name}</h2>
                    <p className="text-gray-400 mt-1">{selectedArmor.universe} • {selectedArmor.medium}</p>
                  </div>
                  <button
                    onClick={() => setSelectedArmor(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                      <Shield className="w-32 h-32 text-arc-blue/30" />
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-arc-blue uppercase tracking-wider mb-2">
                          Overview
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedArmor.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-1">
                            First Appearance
                          </h4>
                          <p className="text-white text-sm">{selectedArmor.firstAppearance}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-1">
                            Purpose
                          </h4>
                          <p className="text-white text-sm">{selectedArmor.purpose}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                          Key Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedArmor.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-arc-blue/10 text-arc-blue text-xs rounded-full border border-arc-blue/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                          Weapons
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedArmor.weapons.map((weapon) => (
                            <span
                              key={weapon}
                              className="px-3 py-1 bg-stark-red/10 text-stark-red text-xs rounded-full border border-stark-red/20"
                            >
                              {weapon}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                          Abilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedArmor.abilities.map((ability) => (
                            <span
                              key={ability}
                              className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20"
                            >
                              {ability}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                          Weaknesses
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedArmor.weaknesses.map((weakness) => (
                            <span
                              key={weakness}
                              className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/20"
                            >
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                          Major Appearances
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedArmor.appearances.map((appearance) => (
                            <span
                              key={appearance}
                              className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                            >
                              {appearance}
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
      </div>
    </div>
  );
}