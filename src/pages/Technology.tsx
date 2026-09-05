import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, ChevronRight } from 'lucide-react';
import { technologiesData } from '../data/technologies';
import type { Technology as TechType } from '../types';
import { armorsData } from '../data/armors';

export function Technology() {
  const [selectedTech, setSelectedTech] = useState<TechType | null>(null);

  const categories = Array.from(new Set(technologiesData.map(t => t.category)));

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
            TECHNOLOGY ARCHIVE
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the breakthrough technologies that power the Iron Man armor
          </p>
        </motion.div>

        {/* Technology Grid by Category */}
        {categories.map((category, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-arc-blue mb-6 uppercase tracking-wider">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologiesData
                .filter(tech => tech.category === category)
                .map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedTech(tech)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl overflow-hidden hover:border-arc-blue/50 transition-all duration-300 hover:scale-105 h-full">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Cpu className="w-10 h-10 text-arc-blue group-hover:text-stark-gold transition-colors" />
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            {tech.relatedArmor.length} armors
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-arc-blue transition-colors mb-2">
                          {tech.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                          {tech.description}
                        </p>
                        <div className="flex items-center text-arc-blue text-sm font-medium group-hover:text-stark-gold transition-colors">
                          <span>Learn More</span>
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

        {/* Technology Detail Modal */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-arc-blue/20 p-6 flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-arc-blue uppercase tracking-wider">
                      {selectedTech.category}
                    </span>
                    <h2 className="text-3xl font-bold text-white mt-1">{selectedTech.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-arc-blue uppercase tracking-wider mb-3">
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {selectedTech.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-arc-blue uppercase tracking-wider mb-3">
                      Used In {selectedTech.relatedArmor.length} Armors
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedTech.relatedArmor.map((armorId) => {
                        const armor = armorsData.find(a => a.id === armorId);
                        return armor ? (
                          <div
                            key={armorId}
                            className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:border-arc-blue/30 transition-colors"
                          >
                            <p className="text-white font-medium text-sm">{armor.name}</p>
                            {armor.mark && (
                              <p className="text-arc-blue text-xs mt-1">{armor.mark}</p>
                            )}
                          </div>
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
}
