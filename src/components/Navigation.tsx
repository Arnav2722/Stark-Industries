import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Menu, X, Shield, Zap, Wifi, Database, Cpu } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

const navLinks = [
  { path: '/', label: 'HOME', icon: null, shortLabel: 'HOME', system: 'CORE' },
  { path: '/armor', label: 'ARMOR ARCHIVE', icon: Shield, shortLabel: 'ARMORS', system: 'WEAPONS' },
  { path: '/technology', label: 'TECHNOLOGY', icon: Cpu, shortLabel: 'TECH', system: 'R&D' },
  { path: '/timeline', label: 'TIMELINE', icon: Database, shortLabel: 'TIMELINE', system: 'ARCHIVE' },
  { path: '/characters', label: 'CHARACTERS', icon: Wifi, shortLabel: 'AGENTS', system: 'PERSONNEL' },
  { path: '/movies', label: 'FILMOGRAPHY', icon: Zap, shortLabel: 'FILMS', system: 'MEDIA' },
  { path: '/gallery', label: 'GALLERY', icon: Database, shortLabel: 'VISUAL', system: 'VAULT' },
  { path: '/tower', label: 'AVENGERS TOWER', icon: Zap, shortLabel: 'TOWER', system: 'HQ' },
  { path: '/about', label: 'ABOUT', icon: null, shortLabel: 'INFO', system: 'META' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Mouse position for HUD effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse for HUD effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Top Bar */}
      <motion.div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[50] pointer-events-none"
        style={{ height: '88px' }}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <div className="absolute inset-0 pointer-events-auto">
          <GlassPanel
            variant="dark"
            padding="px-6 py-4"
            border={scrolled}
            hover={false}
            className="rounded-none"
            style={{
              background: scrolled
                ? 'rgba(5,5,5,0.95)'
                : 'rgba(5,5,5,0.8)',
              boxShadow: scrolled
                ? '0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)'
                : 'none'
            }}
          >
            <div className="max-w-[1600px] mx-auto flex items-center justify-between relative">
              {/* HUD Top Decorations */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stark-gold/30 to-transparent" />
              <div className="absolute top-0 left-0 w-8 h-px bg-stark-gold" />
              <div className="absolute top-0 right-0 w-8 h-px bg-stark-gold" />
              <div className="absolute top-0 left-0 w-px h-8 bg-stark-gold" />
              <div className="absolute top-0 right-0 w-px h-8 bg-stark-gold" />

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3 group pointer-events-auto relative z-10"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="relative w-10 h-10"
                >
                  <Shield className="w-10 h-10 text-stark-gold" />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-stark-gold/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Energy ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-arc-500/30"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
                <span className="font-display text-xl font-bold tracking-wider text-white">
                  STARK INDUSTRIES
                </span>
                <motion.div
                  className="ml-2 pl-2 border-l border-stark-gold/30 hidden md:block"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="text-[10px] text-stark-gold/60 font-mono tracking-widest uppercase">
                    J.A.R.V.I.S. ONLINE
                  </div>
                </motion.div>
              </Link>

              {/* System Status Indicators */}
              <motion.div
                className="hidden lg:flex items-center gap-4 ml-8 pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-arc-500 animate-pulse" />
                  <span className="font-mono text-arc-400/80">SYS</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-stark-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="font-mono text-stark-gold/80">ARC</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-arc-500 animate-pulse" style={{ animationDelay: '1s' }} />
                  <span className="font-mono text-arc-400/80">NAV</span>
                </div>
              </motion.div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1 pointer-events-auto relative z-10">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  const isHovered = hoveredLink === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredLink(link.path)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-sm font-medium tracking-wider uppercase transition-all duration-300 group
                        ${isActive
                          ? 'text-stark-gold bg-stark-gold/10 border border-stark-gold/20'
                          : 'text-gray-300 hover:text-white hover:bg-stark-panel/50'}
                      `}
                    >
                      {Icon && (
                        <motion.span
                          whileHover={{ rotate: 180, scale: 1.2 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.span>
                      )}
                      <span>{link.label}</span>

                      {/* HUD System Tag */}
                      <motion.span
                        className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                        style={{ color: isActive ? '#D4AF37' : '#00bcd4' }}
                        initial={{ x: -10 }}
                        animate={{ x: isHovered ? 0 : -10 }}
                      >
                        [{link.system}]
                      </motion.span>

                      {/* Active indicator with HUD style */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                          style={{ background: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      )}

                      {/* Hover scan effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-stark-gold/10 to-transparent rounded-lg"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-stark-gold hover:bg-stark-panel/50 transition-colors pointer-events-auto"
              >
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    className="w-6 h-6"
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </GlassPanel>

          {/* Bottom scan line when scrolled */}
          {scrolled && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arc-500/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[51] bg-stark-dark/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {/* Background pattern with circuit overlay */}
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute inset-0 circuit-pattern opacity-20" />

            <nav className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md px-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-center px-6 py-4 rounded-xl font-display text-lg font-medium tracking-wider uppercase transition-all duration-300 relative overflow-hidden
                      ${isActive
                        ? 'text-stark-gold bg-stark-gold/10 border border-stark-gold/30'
                        : 'text-gray-200 hover:text-stark-gold hover:bg-stark-panel/50 border border-stark-border/30'}
                    `}
                    style={{ transitionDelay: '0s' }}
                  >
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      {Icon && <Icon className="w-5 h-5" />}
                      <span>{link.label}</span>
                    </div>
                    <div className="absolute top-0 right-0 p-2 text-xs font-mono opacity-50">
                      {link.system}
                    </div>
                    {/* Scan line effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-stark-gold/10 to-transparent"
                      whileHover={{ scaleX: [0, 1] }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* System status bar at bottom */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8 text-xs font-mono text-stark-gold/60">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-arc-500 animate-pulse" />
                <span>SYSTEMS NOMINAL</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-stark-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span>ARC REACTOR STABLE</span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute bottom-8 right-8 p-3 rounded-full bg-stark-panel/50 border border-stark-border/30 text-gray-400 hover:text-stark-gold hover:border-stark-gold/50 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}