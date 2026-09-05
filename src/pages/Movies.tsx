import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, X, Calendar, User, Swords } from 'lucide-react';
import { moviesData } from '../data/movies';
import { Movie } from '../types';
import { armorsData } from '../data/armors';

export function Movies() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const ironManMovies = moviesData.filter(m =>
    m.title.includes('Iron Man')
  );
  const avengerMovies = moviesData.filter(m =>
    m.title.includes('Avengers') || m.title.includes('Civil War')
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
            IRON MAN FILMOGRAPHY
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore Tony Stark's cinematic journey through the MCU
          </p>
        </motion.div>

        {/* Iron Man Solo Films */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-stark-gold mb-6 uppercase tracking-wider">
            Iron Man Films
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ironManMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMovie(movie)}
                className="cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-stark-gold/20 rounded-xl overflow-hidden hover:border-stark-gold/50 transition-all duration-300 hover:scale-105 h-full">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                    <Film className="w-20 h-20 text-stark-gold/30 group-hover:text-stark-gold/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <span className="text-arc-blue text-sm font-semibold">
                        {new Date(movie.releaseDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white group-hover:text-stark-gold transition-colors mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {movie.synopsis}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Avengers Appearances */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-arc-blue mb-6 uppercase tracking-wider">
            Avengers Films
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avengerMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedMovie(movie)}
                className="cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl overflow-hidden hover:border-arc-blue/50 transition-all duration-300 hover:scale-105 h-full">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                    <Film className="w-16 h-16 text-arc-blue/30 group-hover:text-arc-blue/50 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                      <span className="text-arc-blue text-xs font-semibold">
                        {new Date(movie.releaseDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-arc-blue transition-colors mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {movie.synopsis}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Movie Detail Modal */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedMovie(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="border-b border-arc-blue/20 p-6 flex items-start justify-between">
                  <div>
                    <span className="text-arc-blue text-sm font-semibold">
                      {new Date(selectedMovie.releaseDate).getFullYear()}
                    </span>
                    <h2 className="text-3xl font-bold text-white mt-1">{selectedMovie.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-arc-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Release Date</h4>
                        <p className="text-white">{new Date(selectedMovie.releaseDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-arc-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Director</h4>
                        <p className="text-white">{selectedMovie.director}</p>
                      </div>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                      Synopsis
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedMovie.synopsis}
                    </p>
                  </div>

                  {/* Main Cast */}
                  <div>
                    <h3 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                      Main Cast
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.mainCast.map((actor) => (
                        <span
                          key={actor}
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Armors */}
                  <div>
                    <h3 className="text-xs font-semibold text-arc-blue uppercase tracking-wider mb-2">
                      Featured Armors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.armor.map((armorId) => {
                        const armor = armorsData.find(a => a.id === armorId);
                        return armor ? (
                          <span
                            key={armorId}
                            className="px-3 py-1 bg-arc-blue/10 text-arc-blue text-sm rounded-full border border-arc-blue/20"
                          >
                            {armor.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Villain */}
                  <div className="flex items-start gap-3">
                    <Swords className="w-5 h-5 text-stark-red flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Villain</h4>
                      <p className="text-white">{selectedMovie.villain}</p>
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
