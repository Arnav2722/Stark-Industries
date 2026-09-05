import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles, Shield } from 'lucide-react';
import { timelineData } from '../data/timeline';
import { armorsData } from '../data/armors';
import { GlassPanel } from '../components/GlassPanel';
import { ArcReactor } from '../components/ArcReactor';
import { ParticleField } from '../components/ParticleField';
import { NoiseOverlay } from '../components/NoiseOverlay';

export function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<typeof timelineData[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (event: typeof timelineData[0], idx: number) => {
    setSelectedEvent(event);
    setCurrentIndex(idx);
  };

  const closeModal = () => setSelectedEvent(null);

  const nextEvent = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedEvent(timelineData[currentIndex + 1]);
    }
  };

  const prevEvent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedEvent(timelineData[currentIndex - 1]);
    }
  };

  return (
    <div className="relative min-h-screen bg-stark-darkest pt-20">
      <ParticleField count={30} color="#00bcd4" speed={0.3} />
      <NoiseOverlay opacity={0.015} />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0,188,212,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm text-stark-gold/60 uppercase tracking-[0.3em] mb-4">
            Evolution Path
          </p>
          <h2 className="section-title text-4xl md:text-5xl">
            Armor Timeline
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
            <ArcReactor size={24} animate={false} />
            <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
          </div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From the first prototype to the ultimate nano-tech suit
          </p>
        </motion.div>

        {/* Timeline - Main Visual */}
        <div className="relative">
          {/* Central Pillar */}
          <div className="absolute left-1/2 top-24 bottom-24 w-[3px] bg-stark-gold/30" />

          {/* Gradient glows */}
          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-12 h-12 rounded-full blur-xl"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)' }} />
          <div className="absolute left-1/2 bottom-24 -translate-x-1/2 w-12 h-12 rounded-full blur-xl"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)' }} />

          {/* Timeline Events */}
          {timelineData.map((event, index) => {
            const armor = armorsData.find(a => a.id === event.armorId);
            const isLeft = index % 2 === 0;
            const isImportant = event.significance === 'major' || event.significance === 'milestone';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.15, duration: 0.6, type: 'spring' }}
                className={`relative flex items-end mb-24 ${isLeft ? 'justify-start' : 'justify-end'} ${isLeft ? 'pr-12 md:pr-24' : 'pl-12 md:pl-24'} w-full`}
              >
                {/* Year Badge */}
                <div className="absolute top-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    className={`px-4 py-2 font-display text-sm font-bold rounded-full
                      ${isImportant ? 'bg-stark-gold/20 text-stark-gold border border-stark-gold/30' : 'bg-gray-800/50 text-gray-300 border border-gray-700'}
                    `}
                  >
                    {event.year}
                  </motion.div>
                </div>

                {/* Connection Line */}
                <div className="absolute top-12 w-full h-[2px] pointer-events-none">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-stark-gold/40"
                    style={{ animationDelay: `${index * 0.2}s` }} />
                </div>

                {/* Event Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${isImportant ? 'bg-stark-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-stark-panel border border-stark-border text-gray-300 shadow-lg'}`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <motion.span
                      className="text-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 100, repeat: Infinity }}
                      style={{ opacity: isImportant ? 0.3 : 0.2 }}
                    >
                      {isImportant ? '★' : '*'}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  className={`absolute top-24 w-72 md:w-80 ${isLeft ? 'right-12 md:right-24' : 'left-12 md:left-24'}`}
                  style={{ zIndex: index }}
                >
                  <GlassPanel
                    variant={isImportant ? 'gold' : 'default'}
                    hover={true}
                    padding="p-5"
                    className="cursor-pointer"
                    onClick={() => openModal(event, index)}
                  >
                    <div className="relative">
                      {/* Armor preview placeholder */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <Shield className="w-20 h-20 text-arc-400/20 group-hover:text-arc-400/40 transition-colors" />
                        {armor && (
                          <div className="absolute bottom-3 left-3">
                            <span className="text-xs font-bold text-arc-400 bg-arc-300/10 px-2 py-1 rounded">{armor.mark}</span>
                          </div>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="font-display text-lg font-bold text-white mb-2 leading-tight">
                        {event.title}
                      </h3>

                      {/* Event Description */}
                      <p className="text-sm text-gray-400 mb-3 line-clamp-3">
                        {event.description}
                      </p>

                      {/* Signature */}
                      <div className="flex items-center gap-2 text-xs text-arc-400 font-mono">
                        <Sparkles className="w-3 h-3" />
                        <span>{event.year} • {armor?.name || 'Armor'}</span>
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                prevEvent();
                setSelectedEvent(timelineData[currentIndex - 1]);
              }
            }}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-stark-panel/50 text-gray-400 hover:text-white hover:bg-stark-panel transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (currentIndex < timelineData.length - 1) {
                nextEvent();
                setSelectedEvent(timelineData[currentIndex + 1]);
              }
            }}
            disabled={currentIndex === timelineData.length - 1}
            className="p-3 rounded-full bg-stark-panel/50 text-gray-400 hover:text-white hover:bg-stark-panel transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-stark-panel rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-stark-panel/95 backdrop-blur-md border-b border-stark-border/20 p-6 flex justify-between items-center z-10">
                <div>
                  <span className="text-arc-400 text-xs font-mono uppercase tracking-wider">
                    {selectedEvent.year}
                  </span>
                  <h2 className="font-display text-2xl text-white mt-1">{selectedEvent.title}</h2>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-stark-panelLight transition-all"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Armor Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <Shield className="w-24 h-24 text-arc-400/20" />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white mb-2">Milestone</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-bold text-white mb-2">Details</h3>
                        <p className="text-sm text-arc-400 font-mono">{selectedEvent.significance.toUpperCase()}</p>
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-bold text-white mb-2">Navigation</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => currentIndex > 0 && (prevEvent(), setSelectedEvent(timelineData[currentIndex - 1]))}
                            disabled={currentIndex === 0}
                            className="px-4 py-2 text-sm rounded bg-stark-panel/50 hover:bg-stark-panel transition-all disabled:opacity-30"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => currentIndex < timelineData.length - 1 && (nextEvent(), setSelectedEvent(timelineData[currentIndex + 1]))}
                            disabled={currentIndex === timelineData.length - 1}
                            className="px-4 py-2 text-sm rounded bg-stark-panel/50 hover:bg-stark-panel transition-all disabled:opacity-30"
                          >
                            Next
                          </button>
                        </div>
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
  );
}