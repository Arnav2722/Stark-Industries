import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Cpu, Database, Wifi, Film, Image, Building, Info, Terminal, Volume2, VolumeX } from 'lucide-react';
import { useStark } from '../context/StarkContext';
import { ArcReactor } from './ArcReactor';
import { starkAudio } from '../utils/starkAudio';

export interface NavigationProps {
  className?: string;
}

const navLinks = [
  { path: '/', label: 'HOME', icon: Shield, system: 'CORE' },
  { path: '/armor', label: 'ARMOR ARCHIVE', icon: Shield, system: 'WEAPONS' },
  { path: '/technology', label: 'TECHNOLOGY', icon: Cpu, system: 'R&D' },
  { path: '/timeline', label: 'TIMELINE', icon: Database, system: 'ARCHIVE' },
  { path: '/characters', label: 'CHARACTERS', icon: Wifi, system: 'AGENTS' },
  { path: '/movies', label: 'FILMOGRAPHY', icon: Film, system: 'MEDIA' },
  { path: '/gallery', label: 'GALLERY', icon: Image, system: 'VAULT' },
  { path: '/tower', label: 'AVENGERS TOWER', icon: Building, system: 'HQ' },
  { path: '/about', label: 'ABOUT', icon: Info, system: 'INFO' },
];

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, aiMode, setAIMode, isMuted, toggleMute, toggleTerminal } = useStark();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className}`}>
      {/* Top Glassmorphic Navigation Bar */}
      <div
        className={`w-full border-b transition-all duration-300 ${
          scrolled
            ? 'bg-stark-darker/95 backdrop-blur-2xl py-3 border-stark-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-stark-darker/70 backdrop-blur-md py-4 border-stark-border/20'
        }`}
        style={{
          borderBottomColor: scrolled ? `${theme.primaryColor}30` : undefined,
        }}
      >
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Stark Industries Brand Logo */}
          <Link
            to="/"
            onClick={() => {
              setIsOpen(false);
              starkAudio.playChirp();
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            {/* Animated Arc Reactor Emblem */}
            <div className="relative">
              <ArcReactor size={38} animate={true} interactive={false} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg md:text-xl font-black tracking-wider text-white group-hover:text-stark-gold transition-colors">
                  STARK INDUSTRIES
                </span>
                <span
                  className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded border"
                  style={{
                    background: `${theme.primaryColor}15`,
                    borderColor: `${theme.primaryColor}40`,
                    color: theme.primaryColor,
                  }}
                >
                  SEC-LEVEL 10
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-gray-400">
                {theme.name} // {theme.statusText}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => {
                    starkAudio.playClick(900);
                  }}
                  onClick={() => starkAudio.playChirp()}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg font-display text-xs font-semibold tracking-wider uppercase transition-all duration-200 group ${
                    isActive
                      ? 'text-white border shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-stark-panel/60 border border-transparent'
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${theme.primaryColor}20, ${theme.secondaryColor}15)`,
                          borderColor: `${theme.primaryColor}60`,
                          color: '#ffffff',
                          boxShadow: `0 0 15px ${theme.bgGlow}`,
                        }
                      : {}
                  }
                >
                  <Icon
                    className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                    style={{ color: isActive ? theme.primaryColor : undefined }}
                  />
                  <span>{link.label}</span>

                  {/* Micro System Tag */}
                  <span
                    className="text-[9px] font-mono opacity-60 ml-0.5"
                    style={{ color: isActive ? theme.secondaryColor : '#666' }}
                  >
                    [{link.system}]
                  </span>

                  {/* Active Indicator Pip */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPip"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: theme.primaryColor, boxShadow: `0 0 8px ${theme.primaryColor}` }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities (AI Mode Switcher, Terminal, Mobile Menu) */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Quick Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-stark-border/60">
              {(['jarvis', 'friday', 'edith'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAIMode(mode)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all ${
                    aiMode === mode
                      ? 'font-bold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={
                    aiMode === mode
                      ? {
                          background: theme.primaryColor,
                          color: '#000000',
                        }
                      : {}
                  }
                  title={`Switch active AI to ${mode.toUpperCase()}`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Terminal Launcher Button */}
            <button
              onClick={toggleTerminal}
              className="p-2 rounded-lg border bg-stark-panel/80 hover:bg-stark-panel text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{ borderColor: `${theme.primaryColor}50` }}
              title="Open J.A.R.V.I.S. Command Terminal"
            >
              <Terminal className="w-4 h-4" style={{ color: theme.primaryColor }} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                starkAudio.playClick(800);
              }}
              className="xl:hidden p-2 rounded-lg border bg-stark-panel/80 text-white transition-colors"
              style={{ borderColor: `${theme.primaryColor}40` }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-stark-darker/98 backdrop-blur-2xl border-b border-stark-border/80 px-6 py-8 overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      starkAudio.playChirp();
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-xl font-display text-sm font-semibold tracking-wider uppercase border transition-all ${
                      isActive
                        ? 'text-white border-stark-gold bg-stark-gold/15'
                        : 'text-gray-300 hover:text-white border-stark-border/40 hover:bg-stark-panel/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" style={{ color: theme.primaryColor }} />
                      <span>{link.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">[{link.system}]</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer Utilities */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ background: theme.primaryColor }} />
                <span>{theme.name} ACTIVE</span>
              </div>
              <button
                onClick={toggleMute}
                className="flex items-center gap-1.5 text-stark-gold hover:underline"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isMuted ? 'UNMUTE AUDIO' : 'MUTE AUDIO'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
