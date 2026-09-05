import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { galleryData } from '../data/gallery';
import { GalleryImage } from '../types';

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'armor', label: 'Armor' },
    { id: 'tony-stark', label: 'Tony Stark' },
    { id: 'arc-reactor', label: 'Arc Reactor' },
    { id: 'technology', label: 'Technology' },
    { id: 'movies', label: 'Movies' },
    { id: 'comics', label: 'Comics' },
  ];

  const filteredImages = galleryData.filter(img =>
    selectedCategory === 'all' || img.category === selectedCategory
  );

  const currentIndex = selectedImage
    ? filteredImages.findIndex(img => img.id === selectedImage.id)
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

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
            GALLERY
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse stunning imagery from the Iron Man archive
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          <Filter className="w-5 h-5 text-arc-blue mr-2" />
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
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSelectedImage(img)}
                className="cursor-pointer group break-inside-avoid"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl overflow-hidden hover:border-arc-blue/50 transition-all duration-300 hover:scale-[1.02]">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                    <Image className="w-12 h-12 text-arc-blue/20 group-hover:text-arc-blue/40 transition-colors" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-arc-blue text-xs rounded uppercase">
                        {img.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-white group-hover:text-arc-blue transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{img.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No images found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-lg transition-colors z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Previous Button */}
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-lg transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Next Button */}
              {currentIndex < filteredImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-lg transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/30 rounded-2xl overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Image className="w-24 h-24 text-arc-blue/30" />
                  </div>

                  {/* Image Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-arc-blue/10 text-arc-blue text-xs rounded-full uppercase">
                        {selectedImage.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {currentIndex + 1} / {filteredImages.length}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                    <p className="text-gray-400">{selectedImage.description}</p>
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
