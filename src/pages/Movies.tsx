import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Film, X, Swords, Shield, ArrowRight } from 'lucide-react';
import { moviesData } from '../data/movies';
import { Movie } from '../types';
import { armorsData } from '../data/armors';
import { HolographicCard } from '../components/HolographicCard';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const Movies: React.FC = () => {
  const { theme } = useStark();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const ironManTrilogy = moviesData.filter((m) => m.title.includes('Iron Man'));
  const avengersCrossovers = moviesData.filter(
    (m) => !m.title.includes('Iron Man')
  );

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
            <span>MCU CINEMATIC ARCHIVES // 8 BLOCKBUSTERS</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            IRON MAN FILMOGRAPHY
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            From the historic 2008 blockbuster that launched the Marvel Cinematic Universe to the climactic battle against Thanos in Avengers: Endgame.
          </p>
        </motion.div>

        {/* ── Section 1: The Iron Man Solo Trilogy ────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h2 className="font-display text-2xl font-black uppercase tracking-wider text-stark-gold flex items-center gap-2">
              <Film className="w-5 h-5" />
              <span>THE IRON MAN TRILOGY</span>
            </h2>
            <span className="font-mono text-xs text-gray-500">2008 — 2013</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ironManTrilogy.map((movie, index) => (
              <HolographicCard
                key={movie.id}
                variant="movie"
                image={movie.image}
                title={movie.title}
                subtitle={`${new Date(movie.releaseDate).getFullYear()} // DIR. ${movie.director.toUpperCase()}`}
                badges={[
                  { text: `${movie.armor.length} ARMORS`, color: '#D4AF37' },
                ]}
                metadata={[
                  { label: 'DIRECTOR', value: movie.director },
                  { label: 'PRIMARY ADVERSARY', value: movie.villain },
                ]}
                onClick={() => {
                  setSelectedMovie(movie);
                  starkAudio.playChirp();
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">
                  {movie.synopsis}
                </p>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* ── Section 2: Avengers Crossovers & Cinematic Events ───────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h2 className="font-display text-2xl font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>AVENGERS CROSSOVERS & SPECIAL ENGAGEMENTS</span>
            </h2>
            <span className="font-mono text-xs text-gray-500">2012 — 2019</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {avengersCrossovers.map((movie, index) => (
              <HolographicCard
                key={movie.id}
                variant="movie"
                image={movie.image}
                title={movie.title}
                subtitle={`${new Date(movie.releaseDate).getFullYear()} // MCU SAGA`}
                badges={[
                  { text: `${movie.armor.length} ARMORS`, color: theme.primaryColor },
                ]}
                metadata={[
                  { label: 'DIRECTOR', value: movie.director },
                  { label: 'ADVERSARY', value: movie.villain },
                ]}
                onClick={() => {
                  setSelectedMovie(movie);
                  starkAudio.playChirp();
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">
                  {movie.synopsis}
                </p>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* ── Film Detail Modal ────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
              onClick={() => setSelectedMovie(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stark-darker border rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative"
                style={{ borderColor: `${theme.primaryColor}50` }}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-gray-800">
                  <div className="space-y-1">
                    <span className="px-3 py-0.5 bg-stark-gold text-black font-mono text-xs font-bold rounded">
                      RELEASED {new Date(selectedMovie.releaseDate).getFullYear()}
                    </span>
                    <h2 className="font-display text-2xl md:text-4xl font-black uppercase text-white mt-1">
                      {selectedMovie.title}
                    </h2>
                    <p className="text-xs font-mono text-gray-400">
                      DIRECTED BY {selectedMovie.director.toUpperCase()}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMovie(null);
                      starkAudio.playClick(700);
                    }}
                    className="p-2 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-6 font-mono text-xs">
                  <div className="p-6 rounded-2xl border border-stark-border/40 bg-black/60 space-y-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stark-gold flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      <span>MISSION SYNOPSIS</span>
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed font-sans pt-1">
                      {selectedMovie.synopsis}
                    </p>
                  </div>

                  {/* Primary Adversary & Cast */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20">
                      <span className="text-[10px] text-red-400 uppercase font-bold flex items-center gap-1.5">
                        <Swords className="w-3.5 h-3.5" />
                        PRIMARY ADVERSARY:
                      </span>
                      <p className="text-white font-bold text-sm mt-1">{selectedMovie.villain}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-800 bg-black/50">
                      <span className="text-[10px] text-gray-400 uppercase font-bold">KEY ENSEMBLE CAST:</span>
                      <p className="text-gray-200 mt-1">{selectedMovie.mainCast.join(', ')}</p>
                    </div>
                  </div>

                  {/* Featured Armors Deployed */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>ARMOR CONFIGURATIONS DEPLOYED IN THIS FILM</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedMovie.armor.map((armorId) => {
                        const armor = armorsData.find((a) => a.id === armorId);
                        return armor ? (
                          <Link
                            key={armorId}
                            to={`/armor?highlight=${armorId}`}
                            onClick={() => {
                              setSelectedMovie(null);
                              starkAudio.playChirp();
                            }}
                            className="p-3 rounded-xl border border-gray-800 bg-black/60 hover:border-stark-gold hover:bg-stark-panel/60 transition-all flex flex-col justify-between group cursor-pointer"
                          >
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-stark-gold transition-colors">
                                {armor.name}
                              </div>
                              <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                                {armor.mark}
                              </div>
                            </div>
                            <div className="text-[10px] font-mono text-stark-gold mt-2 flex items-center gap-1 group-hover:underline">
                              <span>INSPECT SUIT</span>
                              <ArrowRight className="w-3 h-3" />
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
