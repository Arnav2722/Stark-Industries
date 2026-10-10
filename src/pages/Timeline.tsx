import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Shield } from 'lucide-react';
import { timelineData } from '../data/timeline';
import { armorsData } from '../data/armors';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';

export const Timeline: React.FC = () => {
  const { theme } = useStark();
  const [selectedEvent, setSelectedEvent] = useState<typeof timelineData[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (event: typeof timelineData[0], idx: number) => {
    setSelectedEvent(event);
    setCurrentIndex(idx);
    starkAudio.playChirp();
  };

  const closeModal = () => {
    setSelectedEvent(null);
    starkAudio.playClick(700);
  };

  const nextEvent = () => {
    if (currentIndex < timelineData.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedEvent(timelineData[nextIdx]);
      starkAudio.playClick(950);
    }
  };

  const prevEvent = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSelectedEvent(timelineData[prevIdx]);
      starkAudio.playClick(850);
    }
  };

  return (
    <div className="relative min-h-screen bg-stark-darkest px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header */}
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
            <span>CHRONOLOGICAL MISSION LOGS // 2008 — 2023</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
            ARMOR EVOLUTION TIMELINE
          </h1>
          <p className="text-sm font-mono text-gray-400 max-w-2xl mx-auto">
            From the crude scrap-iron Mark I forged in the caves of Gulmira to the 85th generation vibranium-infused nanotechnology suit that saved the universe.
          </p>
        </motion.div>

        {/* ── Timeline Chrono-Tree ────────────────────────────────────────── */}
        <div className="relative pt-6 pb-12">
          {/* Glowing Center Power Conduit */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 opacity-40"
            style={{
              background: `linear-gradient(180deg, ${theme.primaryColor} 0%, #D4AF37 50%, ${theme.primaryColor} 100%)`,
              boxShadow: `0 0 15px ${theme.primaryColor}`,
            }}
          />

          <div className="space-y-12">
            {timelineData.map((event, index) => {
              const armor = armorsData.find((a) => a.id === event.armorId);
              const isLeft = index % 2 === 0;
              const isMajor = event.significance === 'major' || event.significance === 'milestone';

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Event Content Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] ml-10 md:ml-0 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      onClick={() => openModal(event, index)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer group hover:scale-[1.02] bg-stark-darker/90 backdrop-blur-md ${
                        isMajor
                          ? 'border-stark-gold/60 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                          : 'border-stark-border/50 hover:border-stark-gold/50'
                      }`}
                    >
                      {/* Year & Significance Badge */}
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-stark-gold text-black">
                          {event.year}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                          {event.significance.toUpperCase()}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-stark-gold transition-colors">
                        {event.title}
                      </h3>

                      {/* Event Description */}
                      <p className="text-xs text-gray-300 leading-relaxed font-sans mt-2 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Armor Tag */}
                      {armor && (
                        <div className={`mt-4 inline-flex items-center gap-2 font-mono text-xs font-bold text-stark-gold ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <Shield className="w-3.5 h-3.5" />
                          <span>{armor.name} ({armor.mark || 'SPECIAL'})</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Node / Arc Core Pip */}
                  <div
                    onClick={() => openModal(event, index)}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-black cursor-pointer hover:scale-125 transition-transform z-10"
                    style={{
                      borderColor: isMajor ? '#D4AF37' : theme.primaryColor,
                      boxShadow: `0 0 12px ${isMajor ? '#D4AF37' : theme.primaryColor}`,
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: isMajor ? '#D4AF37' : theme.primaryColor }} />
                  </div>

                  {/* Empty Spacer on Alternate Side for Grid Balance */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Timeline Event Detail Modal ─────────────────────────────────── */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stark-darker border rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative"
                style={{ borderColor: `${theme.primaryColor}50` }}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-gray-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 bg-stark-gold text-black font-mono text-xs font-bold rounded">
                        YEAR {selectedEvent.year}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        {selectedEvent.significance.toUpperCase()} MILESTONE
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white mt-2">
                      {selectedEvent.title}
                    </h2>
                  </div>

                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-gray-800 bg-black/50">
                    <p className="text-sm text-gray-200 leading-relaxed font-sans">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Linked Armor Preview */}
                  {selectedEvent.armorId && (
                    <div className="p-4 rounded-xl border border-stark-gold/40 bg-stark-gold/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-stark-gold" />
                        <div>
                          <div className="font-bold text-white text-xs">
                            FEATURED SUIT: {armorsData.find((a) => a.id === selectedEvent.armorId)?.name}
                          </div>
                          <div className="text-[10px] font-mono text-gray-400">
                            {armorsData.find((a) => a.id === selectedEvent.armorId)?.mark}
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/armor?highlight=${selectedEvent.armorId}`}
                        onClick={closeModal}
                        className="px-3 py-1.5 rounded-lg bg-stark-gold text-black font-mono text-xs font-bold uppercase hover:scale-105 transition-transform"
                      >
                        INSPECT SUIT
                      </Link>
                    </div>
                  )}
                </div>

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 font-mono text-xs">
                  <button
                    onClick={prevEvent}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded-xl border border-gray-800 bg-black text-white hover:border-stark-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREVIOUS LOG</span>
                  </button>

                  <span className="text-gray-500">
                    {currentIndex + 1} OF {timelineData.length}
                  </span>

                  <button
                    onClick={nextEvent}
                    disabled={currentIndex === timelineData.length - 1}
                    className="px-4 py-2 rounded-xl border border-gray-800 bg-black text-white hover:border-stark-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                  >
                    <span>NEXT LOG</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
