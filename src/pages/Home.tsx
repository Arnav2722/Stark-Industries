import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { GlassPanel } from '../components/GlassPanel';
import { HolographicCard } from '../components/HolographicCard';
import { ArcReactor } from '../components/ArcReactor';
import { ParticleField } from '../components/ParticleField';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { armorsData } from '../data/armors';
import { charactersData } from '../data/characters';
import { technologiesData } from '../data/technologies';
import { moviesData } from '../data/movies';
import { avengersTower } from '../data/avengers-tower';
import { Shield } from 'lucide-react';

export function Home() {
  const featuredArmors = armorsData.slice(0, 4);
  const featuredTech = technologiesData.slice(0, 4);

  const stats = [
    { value: armorsData.length, label: 'ARMORS', suffix: '+' },
    { value: charactersData.length, label: 'CHARACTERS', suffix: '+' },
    { value: technologiesData.length, label: 'TECHNOLOGIES', suffix: '+' },
    { value: moviesData.length, label: 'FILMS', suffix: '+' },
  ];

  return (
    <div className="relative min-h-screen bg-stark-darkest">
      {/* Global effects */}
      <ParticleField count={50} color="#00bcd4" speed={0.3} />
      <NoiseOverlay opacity={0.012} />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="relative py-16 px-6 border-y border-stark-border/20" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,5,5,0.9) 50%, rgba(0,0,0,0) 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, type: 'spring' }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-black text-white mb-1">
                  {stat.value}
                  <span className="text-stark-gold">{stat.suffix}</span>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.3em] font-mono">
                  {stat.label}
                </div>
                <motion.div
                  className="mx-auto mt-3 w-12 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Armors */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-display text-sm text-stark-gold/60 uppercase tracking-[0.4em] mb-4">
              Featured Collection
            </p>
            <h2 className="section-title text-4xl md:text-5xl">
              Iconic Armors
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
              <ArcReactor size={30} animate={false} />
              <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
            </div>
          </motion.div>

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
                  ]}
                  metadata={[
                    { label: 'First', value: armor.firstAppearance.split('(')[0].trim() },
                    { label: 'Purpose', value: armor.purpose.length > 20 ? armor.purpose.slice(0, 20) + '...' : armor.purpose },
                  ]}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/armor" className="inline-flex items-center gap-2 px-8 py-3 font-display text-sm tracking-wider uppercase text-stark-gold border border-stark-gold/30 rounded-lg hover:bg-stark-gold/10 hover:border-stark-gold/60 transition-all">
              <span>View All Armors</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Avengers Tower Section */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,5,5,1) 50%, rgba(0,0,0,0) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-display text-sm text-arc-400/60 uppercase tracking-[0.4em] mb-4">
              Headquarters
            </p>
            <h2 className="section-title text-4xl md:text-5xl">
              Avengers Tower
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,188,212,0.4), transparent)' }} />
              <ArcReactor size={20} animate={false} />
              <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,188,212,0.4), transparent)' }} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Tower Info */}
            <GlassPanel variant="arc" padding="p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                200 Park Avenue
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {avengersTower.description}
              </p>
              <div className="space-y-4">
                {avengersTower.keyEvents.slice(0, 4).map((event, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-16 font-display text-sm text-stark-gold">
                      {event.date}
                    </div>
                    <div className="flex-grow">
                      <p className="text-white text-sm font-medium group-hover:text-arc-400 transition-colors">
                        {event.event}
                      </p>
                      <p className="text-gray-500 text-xs font-mono mt-1">
                        {event.movie}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Tower Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative" style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)'
              }}>
                {/* Tower silhouette */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-48 md:w-64 h-64 md:h-80 relative">
                    {/* Building body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full">
                      <div className="absolute bottom-0 w-3/5 h-full left-1/2 -translate-x-1/2" style={{
                        background: 'linear-gradient(180deg, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0.05) 50%, rgba(0,188,212,0.02) 100%)',
                        borderLeft: '1px solid rgba(0,188,212,0.1)',
                        borderRight: '1px solid rgba(0,188,212,0.1)',
                      }} />
                      {/* Windows */}
                      {Array.from({ length: 8 }).map((_, floor) => (
                        <div key={floor} className="absolute flex gap-1 px-2" style={{ bottom: `${20 + floor * 10}%`, left: '15%', right: '15%' }}>
                          {Array.from({ length: 6 }).map((_, win) => (
                            <div key={win} className="h-3 flex-1 rounded-sm" style={{
                              background: `rgba(0,188,212,${0.05 + Math.random() * 0.1})`,
                              boxShadow: `0 0 ${Math.random() * 4}px rgba(0,188,212,${0.1 + Math.random() * 0.2})`
                            }} />
                          ))}
                        </div>
                      ))}
                      {/* Stark logo */}
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="font-display text-stark-gold/30 text-xs tracking-widest"
                        >
                          STARK
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scan effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,188,212,0.02) 50%, transparent 100%)',
                  }}
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3 font-display text-sm tracking-wider uppercase text-arc-400 border border-arc-400/30 rounded-lg hover:bg-arc-400/10 hover:border-arc-400/60 transition-all">
              <span>Explore Tower History</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tech */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-display text-sm text-arc-400/60 uppercase tracking-[0.4em] mb-4">
              Core Technologies
            </p>
            <h2 className="section-title text-4xl md:text-5xl">
              Technology Archive
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTech.map((tech, i) => (
              <Link key={tech.id} to={`/technology`}>
                <HolographicCard
                  variant="tech"
                  image={tech.image}
                  title={tech.name}
                  subtitle={tech.category}
                  badges={[
                    { text: `${tech.relatedArmor.length} armors`, color: '#00bcd4' },
                  ]}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-xs text-gray-400 line-clamp-2">{tech.description.slice(0, 80)}...</p>
                </HolographicCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Section */}
      <section className="relative py-24 px-6" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,5,5,1) 50%, rgba(0,0,0,0) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-4xl md:text-5xl">
              Explore More
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { to: '/timeline', label: 'Timeline', desc: 'Armor evolution', color: '#D4AF37', icon: '⏱' },
              { to: '/characters', label: 'Characters', desc: 'Heroes & villains', color: '#D4AF37', icon: '👤' },
              { to: '/movies', label: 'Films', desc: 'MCU filmography', color: '#C41E24', icon: '🎬' },
              { to: '/gallery', label: 'Gallery', desc: 'Visual archive', color: '#00bcd4', icon: '📸' },
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <GlassPanel variant="default" padding="p-8" hover className="group cursor-pointer">
                  <div className="text-center">
                    <div className="font-display text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-stark-gold transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
                      style={{ color: item.color }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1, x: 5 }}
                    >
                      <span>ENTER</span>
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </motion.div>
                  </div>
                </GlassPanel>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-stark-border/20" style={{ background: '#050505' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-stark-gold/50" />
            <span className="font-display text-xl font-bold text-white tracking-wider">STARK INDUSTRIES</span>
          </div>
          <p className="text-gray-500 text-sm font-mono mb-4">
            © {new Date().getFullYear()} Iron Man Museum. A fan tribute to Tony Stark.
          </p>
          <p className="text-gray-600 text-xs font-mono">
            "I am Iron Man." — Tony Stark, 2008
          </p>
        </div>
      </footer>
    </div>
  );
}