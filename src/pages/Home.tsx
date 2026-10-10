import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { GlassPanel } from '../components/GlassPanel';
import { HolographicCard } from '../components/HolographicCard';
import { HolographicArmorModel } from '../components/HolographicArmorModel';
import { ArcReactor } from '../components/ArcReactor';
import { ParticleField } from '../components/ParticleField';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { armorsData } from '../data/armors';
import { charactersData } from '../data/characters';
import { technologiesData } from '../data/technologies';
import { moviesData } from '../data/movies';
import { avengersTower } from '../data/avengers-tower';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';
import { Shield, Zap, Sparkles, Terminal, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { theme, toggleTerminal, openSuitCompare, triggerHouseParty } = useStark();
  const [selectedMark, setSelectedMark] = useState('MARK LXXXV');

  const featuredArmors = armorsData.slice(0, 4);
  const featuredTech = technologiesData.slice(0, 4);

  const stats = [
    { value: armorsData.length, label: 'ARMORS CATALOGED', suffix: ' SUITS', sub: 'MK I — MK LXXXV' },
    { value: technologiesData.length, label: 'R&D TECHNOLOGIES', suffix: ' SYSTEMS', sub: 'CLEAN ENERGY & NANO' },
    { value: charactersData.length, label: 'TACTICAL DOSSIERS', suffix: ' ENTRIES', sub: 'ALLIES & ADVERSARIES' },
    { value: moviesData.length, label: 'CINEMATIC MISSIONS', suffix: ' FILMS', sub: '2008 — 2019 MCU' },
  ];

  return (
    <div className="relative min-h-screen bg-stark-darkest">
      {/* Dynamic Background Effects */}
      <ParticleField count={40} color={theme.primaryColor} speed={0.3} />
      <NoiseOverlay opacity={0.015} />

      {/* Hero Section */}
      <HeroSection />

      {/* ── Holographic Armor Diagnostic Lab Centerpiece ────────────────────── */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-stark-border/30">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-stark-darker text-[10px] font-mono uppercase tracking-widest text-stark-gold mb-3" style={{ borderColor: 'rgba(212,175,55,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-stark-gold" />
            <span>MALIBU WORKSHOP // 3D SCHEMATIC CAD</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase text-white tracking-wide">
            HOLOGRAPHIC SUIT CAD & WEAPONS LAB
          </h2>
          <p className="text-sm font-mono text-gray-400 mt-2 max-w-2xl mx-auto">
            Interact directly with Tony Stark's CAD schematics. Toggle armor layers, engage repulsor firing tests, and inspect nano-composite wireframes.
          </p>
        </div>

        {/* CAD Laboratory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Mark Selector & System Specs */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl border bg-stark-darker/90 backdrop-blur-md space-y-4" style={{ borderColor: `${theme.primaryColor}40` }}>
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span className="text-xs font-mono text-gray-400 uppercase">SELECT ARMOR SCHEMATIC</span>
                <span className="text-[10px] font-mono font-bold" style={{ color: theme.primaryColor }}>CAD V9.4</span>
              </div>

              {['MARK LXXXV', 'MARK L', 'MARK XLIV (HULKBUSTER)', 'MARK VII'].map((mark) => (
                <button
                  key={mark}
                  onClick={() => {
                    setSelectedMark(mark);
                    starkAudio.playClick(900);
                  }}
                  className={`w-full text-left p-3 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                    selectedMark === mark
                      ? 'bg-stark-gold/15 text-white border-stark-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'border-stark-border/40 text-gray-400 hover:text-white hover:bg-stark-panel/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4" style={{ color: selectedMark === mark ? '#D4AF37' : '#666' }} />
                    <span className="font-bold">{mark}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">[{selectedMark === mark ? 'ACTIVE' : 'STANDBY'}]</span>
                </button>
              ))}

              <div className="pt-4 border-t border-gray-800 space-y-2 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>ALLOY:</span>
                  <span className="text-white">Gold-Titanium / Vibranium Nano</span>
                </div>
                <div className="flex justify-between">
                  <span>ENERGY CORE:</span>
                  <span className="text-stark-gold">Mark VI Multi-Arc Node</span>
                </div>
                <div className="flex justify-between">
                  <span>AERO MACH:</span>
                  <span className="text-cyan-400">Mach 10.4 Peak Sub-Orbital</span>
                </div>
              </div>

              <Link
                to="/armor"
                className="w-full mt-2 py-3 rounded-xl border text-center font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-black transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, #D4AF37 0%, #F0D060 100%)`,
                  borderColor: '#D4AF37',
                }}
              >
                <span>OPEN FULL ARMOR VAULT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Holographic 3D Armor Visualizer */}
          <div className="lg:col-span-8 flex justify-center">
            <HolographicArmorModel
              markName={selectedMark}
              category="MCU NANO-TECH"
              size="lg"
              showControls={true}
              interactive={true}
            />
          </div>
        </div>
      </section>

      {/* ── Real-Time Stark Telemetry Stats Bar ─────────────────────────────── */}
      <section className="relative py-16 px-6 border-y border-stark-border/30 bg-stark-darker/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="font-display text-4xl md:text-5xl font-black text-white mb-1">
                  {stat.value}
                  <span className="text-stark-gold text-2xl font-bold ml-1">{stat.suffix}</span>
                </div>
                <div className="text-xs text-stark-gold font-bold uppercase tracking-[0.2em] font-mono mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-gray-500 font-mono tracking-widest mt-0.5">
                  {stat.sub}
                </div>
                <div className="mx-auto mt-3 w-12 h-[2px] bg-gradient-to-r from-transparent via-stark-gold to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Hall of Armor ────────────────────────────────────────── */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-stark-gold uppercase tracking-[0.4em] mb-3">
            HALL OF ARMOR PODS
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
            FEATURED STARK ARMORS
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-stark-gold/60" />
            <ArcReactor size={32} animate={true} interactive={false} />
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-stark-gold/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArmors.map((armor, i) => (
            <Link key={armor.id} to={`/armor?highlight=${armor.id}`}>
              <HolographicCard
                variant="armor"
                image={armor.image}
                title={armor.name}
                subtitle={armor.mark}
                badges={[
                  { text: armor.universe, color: '#C41E24' },
                  { text: armor.category.toUpperCase(), color: '#D4AF37' },
                ]}
                metadata={[
                  { label: 'First Appearance', value: armor.firstAppearance.split('(')[0].trim() },
                  { label: 'Primary Weapon', value: armor.weapons[0] || 'Repulsors' },
                ]}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/armor"
            onClick={() => starkAudio.playChirp()}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-display text-sm font-bold tracking-wider uppercase text-white border rounded-xl hover:scale-105 active:scale-95 transition-all bg-stark-darker"
            style={{ borderColor: `${theme.primaryColor}80`, boxShadow: `0 0 20px ${theme.bgGlow}` }}
          >
            <span>VIEW ALL 31 ARMORS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => openSuitCompare()}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-display text-sm font-bold tracking-wider uppercase text-stark-gold border border-stark-gold/40 rounded-xl hover:bg-stark-gold/15 transition-all hover:scale-105 active:scale-95 cursor-pointer bg-stark-darker"
          >
            <Sparkles className="w-4 h-4" />
            <span>LAUNCH SUIT COMPARISON MATRIX</span>
          </button>
        </div>
      </section>

      {/* ── Avengers Tower & Arc Reactor Clean Energy Grid ──────────────────── */}
      <section className="relative py-24 px-6 border-t border-stark-border/30 bg-stark-darker/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.4em] mb-3" style={{ color: theme.primaryColor }}>
              ZERO-EMISSION CLEAN ENERGY GRID
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
              AVENGERS TOWER & STARK POWER
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-cyan-500/60" />
              <ArcReactor size={28} animate={true} interactive={false} />
              <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-cyan-500/60" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Tower Information Dossier */}
            <GlassPanel variant="arc" padding="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ background: theme.primaryColor }} />
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                  MANHATTAN COMPLEX // 200 PARK AVENUE
                </span>
              </div>
              <h3 className="font-display text-3xl font-black text-white mb-4 uppercase">
                Self-Sustaining Arc Energy Landmark
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                {avengersTower.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-gray-800">
                {avengersTower.keyEvents.slice(0, 4).map((event, i) => (
                  <div key={i} className="flex items-start gap-4 group font-mono text-xs">
                    <div className="flex-shrink-0 w-20 font-bold text-stark-gold">
                      {event.date}
                    </div>
                    <div className="flex-grow">
                      <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                        {event.event}
                      </p>
                      <p className="text-gray-500 text-[10px] uppercase">
                        {event.movie}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/tower"
                  onClick={() => starkAudio.playChirp()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-black transition-all hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${theme.primaryColor} 0%, #ffffff 100%)` }}
                >
                  <span>INSPECT TOWER ARCHITECTURE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassPanel>

            {/* Interactive Arc Energy Grid Display */}
            <div className="p-8 rounded-2xl border bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-center space-y-6" style={{ borderColor: `${theme.primaryColor}40` }}>
              <div className="space-y-1">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  CENTRAL ARC POWER CORE // LIVE SIMULATION
                </span>
                <p className="text-[11px] font-mono text-stark-gold">
                  CLICK REACTOR CORE TO TEST EMERGENCY ENERGY DISCHARGE
                </p>
              </div>

              <ArcReactor size={220} animate={true} interactive={true} />

              <div className="grid grid-cols-3 gap-3 w-full font-mono text-[11px] pt-4 border-t border-gray-800">
                <div className="p-3 rounded-lg border border-gray-800 bg-stark-darker">
                  <div className="text-gray-500 text-[9px]">OUTPUT:</div>
                  <div className="text-cyan-400 font-bold text-sm">487 GW</div>
                </div>
                <div className="p-3 rounded-lg border border-gray-800 bg-stark-darker">
                  <div className="text-gray-500 text-[9px]">COOLANT:</div>
                  <div className="text-emerald-400 font-bold text-sm">LIQUID N2</div>
                </div>
                <div className="p-3 rounded-lg border border-gray-800 bg-stark-darker">
                  <div className="text-gray-500 text-[9px]">EFFICIENCY:</div>
                  <div className="text-stark-gold font-bold text-sm">99.8%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Technology Archive ───────────────────────────────────── */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.4em] mb-3" style={{ color: theme.primaryColor }}>
            STARK R&D DIVISIONS
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
            CORE TECHNOLOGIES
          </h2>
          <p className="text-sm font-mono text-gray-400 mt-2 max-w-xl mx-auto">
            From clean energy miniaturization to quantum GPS navigation and orbital defense satellites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTech.map((tech, i) => (
            <Link key={tech.id} to="/technology">
              <HolographicCard
                variant="tech"
                image={tech.image}
                title={tech.name}
                subtitle={tech.category}
                badges={[
                  { text: `${tech.relatedArmor.length} ARMORS`, color: theme.primaryColor },
                ]}
                metadata={[
                  { label: 'Category', value: tech.category },
                  { label: 'Inventor', value: tech.inventor },
                ]}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mt-1">
                  {tech.description}
                </p>
              </HolographicCard>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/technology"
            onClick={() => starkAudio.playChirp()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white border hover:scale-105 active:scale-95 transition-all bg-stark-darker"
            style={{ borderColor: `${theme.primaryColor}80` }}
          >
            <span>INSPECT ALL 15 TECHNOLOGIES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Quick Archive Navigation Grid ─────────────────────────────────── */}
      <section className="relative py-24 px-6 border-t border-stark-border/30 bg-stark-darker/90">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
              STARK INDUSTRIES ARCHIVES
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-2 uppercase tracking-widest">
              DIRECT ACCESS TO ALL MCU DOSSIERS & HISTORICAL LOGS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { to: '/timeline', label: 'TIMELINE', desc: 'Armor Evolution (2008-2023)', color: '#D4AF37', icon: '⏱' },
              { to: '/characters', label: 'CHARACTERS', desc: 'Allies & Adversaries Dossiers', color: '#22c55e', icon: '👤' },
              { to: '/movies', label: 'FILMOGRAPHY', desc: '8 MCU Blockbusters & Box Office', color: '#ef4444', icon: '🎬' },
              { to: '/gallery', label: 'VAULT GALLERY', desc: 'Concept Art & 4K Stills', color: '#00bcd4', icon: '📸' },
            ].map((item) => (
              <Link key={item.to} to={item.to} onClick={() => starkAudio.playChirp()}>
                <GlassPanel variant="default" padding="p-8" hover className="group cursor-pointer text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="font-display text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-stark-gold transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs font-mono text-gray-400">{item.desc}</p>
                  </div>
                  <div
                    className="mt-6 inline-flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-wider uppercase group-hover:underline"
                    style={{ color: item.color }}
                  >
                    <span>ENTER DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassPanel>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stark Industries Terminal CTA Footer ───────────────────────────── */}
      <footer className="relative py-16 px-6 border-t border-stark-border/40 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-3.5">
            <ArcReactor size={42} animate={true} interactive={false} />
            <div>
              <div className="font-display text-xl font-black text-white tracking-wider">
                STARK INDUSTRIES
              </div>
              <div className="text-[10px] font-mono text-stark-gold uppercase tracking-widest">
                ARCHIVAL LEVEL 10 // ALL SYSTEMS OPERATIONAL
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={toggleTerminal}
              className="px-5 py-2.5 rounded-xl border font-display text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 bg-stark-darker hover:scale-105 active:scale-95 transition-all cursor-pointer"
              style={{ borderColor: `${theme.primaryColor}60` }}
            >
              <Terminal className="w-4 h-4" style={{ color: theme.primaryColor }} />
              <span>ACCESS J.A.R.V.I.S. OS</span>
            </button>
            <button
              onClick={triggerHouseParty}
              className="px-5 py-2.5 rounded-xl border border-red-500/50 font-display text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>HOUSE PARTY PROTOCOL</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <p>© {new Date().getFullYear()} STARK INDUSTRIES ARCHIVES. A TRIBUTE TO TONY STARK.</p>
          <p className="text-stark-gold">"PROOF THAT TONY STARK HAS A HEART"</p>
        </div>
      </footer>
    </div>
  );
};
