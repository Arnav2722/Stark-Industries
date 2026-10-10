import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../data/gallery';
import { GalleryImage } from '../types';
import { HolographicCard } from '../components/HolographicCard';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const Gallery: React.FC = () => {
  const { theme } = useStark();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'all', label: 'ALL ARCHIVES' },
    { id: 'armor', label: 'ARMOR SCHEMATICS' },
    { id: 'tony-stark', label: 'TONY STARK' },
    { id: 'arc-reactor', label: 'ARC REACTOR CORES' },
    { id: 'technology', label: 'R&D HARDWARE' },
    { id: 'movies', label: 'CINEMATIC STILLS' },
    { id: 'comics', label: 'COMIC VAULT' },
  ];

  const filteredImages = galleryData.filter(
    (img) => selectedCategory === 'all' || img.category === selectedCategory
  );

  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
      starkAudio.playClick(850);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
      starkAudio.playClick(950);
    }
  };

  return (
    <div className="min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-10">
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
            <span>STARK VISUAL VAULT // HOLOGRAPHIC CONCEPT ARCHIVE</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            GALLERY VAULT
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            High-resolution concept schematics, cinematic stills, arc reactor wireframes, and historical workshop archives.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                starkAudio.playClick(900);
              }}
              className={`px-4 py-2 rounded-xl uppercase tracking-wider transition-all font-bold cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stark-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-stark-darker/90 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <HolographicCard
                key={img.id}
                variant="tech"
                image={img.url}
                title={img.title}
                subtitle={img.category.toUpperCase()}
                badges={[
                  { text: img.category.toUpperCase(), color: theme.primaryColor },
                ]}
                onClick={() => {
                  setSelectedImage(img);
                  starkAudio.playChirp();
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
              >
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">
                  {img.description}
                </p>
              </HolographicCard>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Fullscreen Lightbox ─────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-3 bg-stark-darker/80 hover:bg-stark-panel rounded-2xl text-gray-400 hover:text-white border border-gray-700 transition-colors z-20 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-stark-darker/80 hover:bg-stark-panel rounded-2xl text-gray-400 hover:text-white border border-gray-700 transition-colors z-20 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {currentIndex < filteredImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-stark-darker/80 hover:bg-stark-panel rounded-2xl text-gray-400 hover:text-white border border-gray-700 transition-colors z-20 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-stark-darker border rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)]"
                style={{ borderColor: `${theme.primaryColor}50` }}
              >
                <div className="aspect-[16/10] bg-black relative flex items-center justify-center border-b border-gray-800">
                  {selectedImage.url && !selectedImage.url.startsWith('/images') ? (
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-24 h-24 rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: theme.primaryColor }}>
                        <Image className="w-12 h-12" style={{ color: theme.primaryColor }} />
                      </div>
                      <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                        CLASSIFIED HOLOGRAPHIC ARTIFACT // {selectedImage.category.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-0.5 rounded bg-stark-gold text-black font-bold uppercase">
                      {selectedImage.category}
                    </span>
                    <span className="text-gray-500">
                      VAULT ENTRY {currentIndex + 1} OF {filteredImages.length}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-black uppercase text-white mt-1">
                    {selectedImage.title}
                  </h2>
                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};