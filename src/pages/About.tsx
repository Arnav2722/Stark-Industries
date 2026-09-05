import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';

export function About() {
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
            ABOUT THE MUSEUM
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A tribute to the genius, billionaire, playboy, philanthropist
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Mission */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              The Iron Man Museum is dedicated to preserving and celebrating the legacy of Tony Stark
              and his revolutionary Iron Man technology. From the cave-built Mark I to the ultimate
              Mark LXXXV, we document every armor, every innovation, and every sacrifice that made
              Iron Man one of the greatest heroes in cinematic and comic book history.
            </p>
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Armors Documented', value: '30+' },
              { label: 'Characters Profiled', value: '20+' },
              { label: 'Technologies Explained', value: '15+' },
              { label: 'Films Covered', value: '8' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gray-900 border border-arc-blue/20 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-arc-blue mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* The Legacy */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">The Legacy of Tony Stark</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Tony Stark, played brilliantly by Robert Downey Jr. in the Marvel Cinematic Universe,
                revolutionized what it means to be a superhero. Unlike gods, mutants, or scientifically
                enhanced individuals, Tony was simply a man—a genius, yes, but still human.
              </p>
              <p>
                His journey from weapons manufacturer to world-saving hero spanned over a decade of
                films, culminating in the ultimate sacrifice in Avengers: Endgame. The snap that saved
                the universe cost him his life, cementing his place as one of the greatest heroes in
                cinematic history.
              </p>
              <p>
                This museum exists to honor that legacy—to catalog the incredible technology he created,
                the enemies he faced, the allies he fought beside, and the impact he had on the world.
              </p>
            </div>
          </div>

          {/* Credits */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-arc-blue/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Credits & Disclaimer</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Iron Man, Tony Stark, and all related characters and technologies are the property of
                Marvel Entertainment, Marvel Studios, and The Walt Disney Company. This is a fan-made
                tribute site created for educational and entertainment purposes only.
              </p>
              <p>
                No copyright infringement is intended. All images, names, and references are used under
                fair use principles for the purpose of celebrating the character's legacy.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart className="w-5 h-5 text-stark-red" />
                  <span>Built with love for Iron Man fans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Easter Egg Teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-600 text-sm"
          >
            <p className="font-mono">
              // HINT: Try clicking the Arc Reactor on the home page multiple times...
            </p>
          </motion.div>
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
            © {new Date().getFullYear()} Iron Man Museum. A fan tribute site.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            "I am Iron Man." — Tony Stark, 2008
          </p>
        </motion.div>
      </div>
    </div>
  );
}
