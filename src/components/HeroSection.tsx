import { motion, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { ArcReactor } from './ArcReactor';
import { ParticleField } from './ParticleField';
import { HolographicDisplay } from './HolographicDisplay';
import { GridBackground, Vignette, ScanLine } from './ScanLine';
import { NoiseOverlay } from './NoiseOverlay';

// Tony Stark quotes for the holographic display
const starkQuotes = [
  { text: "I am Iron Man.", movie: "Iron Man (2008)" },
  { text: "Sometimes you gotta run before you can walk.", movie: "Iron Man (2008)" },
  { text: "Genius, billionaire, playboy, philanthropist.", movie: "Iron Man 2 (2010)" },
  { text: "I just pick a blue one. It's armor.", movie: "Iron Man 2 (2010)" },
  { text: "Chelsea, drop the 'Mr.", movie: "Iron Man 3 (2013)" },
  { text: "Peace of cake.", movie: "Avengers: Age of Ultron (2015)" },
];

// Floating data elements
const floatingData = [
  { label: 'ARC OUTPUT', value: '400%', unit: 'PEAK', color: '#00bcd4' },
  { label: 'SYSTEM', value: 'ONLINE', unit: 'STATUS', color: '#D4AF37' },
  { label: 'REPSULSORS', value: '100', unit: '%', color: '#C41E24' },
  { label: 'J.A.R.V.I.S.', value: 'ACTIVE', unit: 'A.I.', color: '#00bcd4' },
];

export function HeroSection() {
  const [isHovering, setIsHovering] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(starkQuotes[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseX.set((clientX / width - 0.5) * 2);
      mouseY.set((clientY / height - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Rotate through quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => {
        const currentIndex = starkQuotes.indexOf(prev);
        return starkQuotes[(currentIndex + 1) % starkQuotes.length];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Deep background */}
      <div className="absolute inset-0 bg-stark-darkest" />

      {/* Grid background */}
      <GridBackground />

      {/* Particle field */}
      <ParticleField count={80} color="#00bcd4" speed={0.5} />

      {/* Vignette */}
      <Vignette />

      {/* Scan line */}
      <ScanLine speed={8} color="rgba(0,188,212,0.08)" />

      {/* Noise overlay */}
      <NoiseOverlay opacity={0.015} />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/6 w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(0,188,212,0.08) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-[300px] h-[300px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(196,30,36,0.03) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-[100px]">
        {/* Arc Reactor Centerpiece with enhanced effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 relative"
          style={{
            x: useTransform(mouseX, [-1, 1], [20, -20]),
            y: useTransform(mouseY, [-1, 1], [20, -20])
          }}
        >
          <ArcReactor size={180} />

          {/* Outer rotating rings */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 border border-arc-500/10 rounded-full" />
            <div className="absolute inset-8 border border-stark-gold/10 rounded-full" />
            <div className="absolute inset-16 border border-arc-500/05 rounded-full" />
          </motion.div>

          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 rounded-full"
              style={{
                borderColor: i % 2 === 0 ? 'rgba(0,188,212,0.2)' : 'rgba(212,175,55,0.15)',
                animationDelay: `${i * 0.5}s`
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}

          {/* Enhanced interactive glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,188,212,0.2) 0%, transparent 70%)',
              boxShadow: '0 0 60px rgba(0,188,212,0.3)'
            }}
            animate={{
              scale: isHovering ? [1, 1.2, 1.2, 1] : 1,
              opacity: isHovering ? [0.5, 0.8, 0.8, 0.5] : 0.5
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Holographic Display orbiting the Arc Reactor */}
          <motion.div
            className="absolute"
            style={{
              left: '110%',
              top: '0',
              width: '160px',
              height: '160px'
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <HolographicDisplay size={160} interactive={false} />
          </motion.div>

          {/* Second Holographic Display orbiting */}
          <motion.div
            className="absolute"
            style={{
              right: '110%',
              bottom: '0',
              width: '120px',
              height: '120px'
            }}
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            <HolographicDisplay size={120} interactive={false} />
          </motion.div>
        </motion.div>

        {/* Floating Data Readouts */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingData.map((data, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            return (
              <motion.div
                key={data.label}
                className="absolute"
                style={{
                  left: `${5 + col * 45}%`,
                  top: `${10 + row * 25}%`,
                  transform: `translate(-50%, -50%)`
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <motion.div
                  className="px-3 py-2 rounded backdrop-blur-sm"
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    borderLeft: `2px solid ${data.color}`
                  }}
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                    {data.label}
                  </div>
                  <div className="text-lg font-bold text-white font-display">
                    {data.value}
                    <span className="text-sm text-gray-500 ml-1">{data.unit}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="w-24 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <span className="font-display text-lg tracking-widest text-stark-gold/70">
              STARK INDUSTRIES ARCHIVE
            </span>
            <motion.div
              className="w-24 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-4">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              IRON
            </span>
            <span className="block bg-gradient-to-r from-stark-red via-stark-redLight to-stark-gold bg-clip-text text-transparent">
              MAN
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-gray-400/50 mt-2 tracking-widest">
              MUSEUM
            </span>
          </h1>
        </motion.div>

        {/* Tagline with holographic quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center max-w-3xl mb-16 px-4"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300/80 leading-relaxed font-light mb-4">
            Explore the complete legacy of Tony Stark's revolutionary armor technology.
            From the cave‑forged Mark I to the universe‑saving Mark LXXXV.
          </p>

          {/* Holographic quote display */}
          <motion.div
            key={currentQuote.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(0,188,212,0.05) 0%, rgba(212,175,55,0.05) 100%)',
              border: '1px solid rgba(212,175,55,0.2)'
            }}
          >
            <p className="text-xl font-display italic text-stark-gold/80 mb-2">
              "{currentQuote.text}"
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
              — {currentQuote.movie}
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-16"
        >
          {[
            { value: '30+', label: 'ARMORS ARCHIVED' },
            { value: '15', label: 'CORE TECHNOLOGIES' },
            { value: '8', label: 'MCU FILMS' },
            { value: '20+', label: 'KEY CHARACTERS' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-stark-gold transition-colors">
                {stat.value}
              </div>
              <div className="font-body text-xs text-gray-500 uppercase tracking-widest group-hover:text-stark-gold transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            to="/armor"
            className="group relative px-10 py-4 font-display font-semibold text-base tracking-wider uppercase
                       bg-gradient-to-r from-stark-gold to-stark-goldDark text-black
                       rounded overflow-hidden transition-all duration-300
                       hover:from-stark-goldLight hover:to-stark-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]
                       hover:scale-105 active:scale-95 z-10"
          >
            <span className="relative flex items-center gap-3">
              ENTER ARMOR ARCHIVE
              <motion.span
                whileHover={{ x: 8 }}
                transition={{ type: 'spring' }}
              >
                ▸
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          <Link
            to="/timeline"
            className="group relative px-10 py-4 font-display font-semibold text-base tracking-wider uppercase
                       border-2 border-stark-gold/50 text-stark-gold rounded
                       transition-all duration-300
                       hover:border-stark-gold hover:bg-stark-gold/10 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]
                       hover:scale-105 active:scale-95 z-10"
          >
            <span className="relative flex items-center gap-3">
              EXPLORE TIMELINE
              <motion.span
                whileHover={{ x: 8 }}
                transition={{ type: 'spring' }}
              >
                ▸
              </motion.span>
            </span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="font-body text-xs text-gray-500 uppercase tracking-widest">SCROLL TO BEGIN</div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-arc-500/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-arc-500 rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* Interactive hint - appears on hover */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-stark-gold/70 uppercase tracking-wider font-mono">
            A.I. Interface Active
          </p>
          <motion.div
            className="w-2 h-2 bg-stark-gold rounded-full mx-auto mt-2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}