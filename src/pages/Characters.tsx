import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, X, Search } from 'lucide-react';
import { charactersData } from '../data/characters';
import { Character } from '../types';

export function Characters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const filteredCharacters = charactersData.filter(char =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (char.alias && char.alias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allies = filteredCharacters.filter(c =>
    !c.relationship.toLowerCase().includes('enemy') &&
    !c.relationship.toLowerCase().includes('adversary') &&
    !c.relationship.toLowerCase().includes('villain')
  );

  const enemies = filteredCharacters.filter(c =>
    c.relationship.toLowerCase().includes('enemy') ||
    c.relationship.toLowerCase().includes('adversary') ||
    c.relationship.toLowerCase().includes('villain')
  );

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
            CHARACTERS
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the key figures in Tony Stark's journey
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-xl mx-auto mb-12"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-arc-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-arc-blue transition-colors"
          />
        </motion.div>

        {/* Allies Section */}
        {allies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-6 uppercase tracking-wider">
              Allies & Associates
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {allies.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedCharacter(character)}
                  className="cursor-pointer group"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                    <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Users className="w-16 h-16 text-green-400/30 group-hover:text-green-400/50 transition-colors" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold group-hover:text-green-400 transition-colors">
                        {character.name}
                      </h3>
                      {character.alias && (
                        <p className="text-sm text-gray-400 mt-1">{character.alias}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Enemies Section */}
        {enemies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-stark-red mb-6 uppercase tracking-wider">
              Adversaries
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {enemies.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedCharacter(character)}
                  className="cursor-pointer group"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-stark-red/20 rounded-xl overflow-hidden hover:border-stark-red/50 transition-all duration-300 hover:scale-105">
                    <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Users className="w-16 h-16 text-stark-red/30 group-hover:text-stark-red/50 transition-colors" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold group-hover:text-stark-red transition-colors">
                        {character.name}
                      </h3>
                      {character.alias && (
                        <p className="text-sm text-gray-400 mt-1">{character.alias}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Character Detail Modal */}
        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedCharacter(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/30 rounded-2xl max-w-2xl w-full"
              >
                {/* Modal Header */}
                <div className="border-b border-arc-blue/20 p-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedCharacter.name}</h2>
                    {selectedCharacter.alias && (
                      <p className="text-arc-blue text-lg mt-1">{selectedCharacter.alias}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedCharacter(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-12 h-12 text-arc-blue/50" />
                    </div>
                    <div>
                      <div className="mb-4">
                        <h3 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-1">
                          Relationship
                        </h3>
                        <p className="text-white">{selectedCharacter.relationship}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-1">
                          First Appearance
                        </h3>
                        <p className="text-gray-400">{selectedCharacter.firstAppearance}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
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
}
