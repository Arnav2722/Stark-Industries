import { motion } from 'framer-motion';
import { avengersTower } from '../data/avengers-tower';
import { Shield } from 'lucide-react';

export function Tower() {
  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            AVENGERS TOWER
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stark Industries Headquarters • 200 Park Avenue, New York City
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Overview */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {avengersTower.description}
            </p>
          </div>

          {/* History */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Historical Timeline</h2>
            <div className="space-y-4">
              {avengersTower.history.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="border-l-2 border-stark-gold/50 pl-4"
                >
                  <p className="text-gray-300">{event}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Events */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Key Events in MCU</h2>
            <div className="space-y-4">
              {avengersTower.keyEvents.map((event, index) => (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-20 font-mono text-stark-gold">
                    {event.date}
                  </div>
                  <div>
                    <p className="font-medium text-white">{event.event}</p>
                    <p className="text-sm text-gray-400">{event.movie}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floors */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Floor Layout</h2>
            <div className="space-y-6">
              {avengersTower.floors.map((floor) => (
                <motion.div
                  key={floor.level}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="border-t border-stark-border/30 pt-6 first:border-t-0 first:pt-0"
                >
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {floor.name}
                  </h3>
                  <p className="text-gray-300">{floor.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {floor.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-stark-panel/60 text-stark-gold/70 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Images Gallery */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Visual Archive</h2>
            <div className="grid gap-4">
              {avengersTower.images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-[4/3] rounded-xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Avengers Tower ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-arc-blue" />
            <span className="text-xl font-bold text-white">STARK INDUSTRIES</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Iron Man Museum. A fan tribute to Tony Stark.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            "I am Iron Man." — Tony Stark, 2008
          </p>
        </motion.div>
      </div>
    </div>
  );
}