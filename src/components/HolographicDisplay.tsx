import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock armor schematic data - in a real app, this might come from actual schematics
const armorSchematics = [
  { id: 'mark1', name: 'Mark I Schematic', lines: 12, complexity: 'low' },
  { id: 'mark3', name: 'Mark III Schematic', lines: 24, complexity: 'medium' },
  { id: 'mark42', name: 'Mark XLII Schematic', lines: 36, complexity: 'high' },
  { id: 'mark50', name: 'Mark L Schematic', lines: 48, complexity: 'advanced' },
  { id: 'mark85', name: 'Mark LXXXV Schematic', lines: 64, complexity: 'expert' }
];

interface HolographicDisplayProps {
  size?: number;
  interactive?: boolean;
}

export function HolographicDisplay({ size = 200, interactive = true }: HolographicDisplayProps) {
  const [activeSchematic] = useState(armorSchematics[0]);

  return (
    <motion.div
      className="relative"
      style={{
        width: size,
        height: size,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      whileHover={{
        rotateY: interactive ? 10 : 0,
        rotateX: interactive ? 10 : 0,
        scale: interactive ? 1.02 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.3
      }} />

      {/* Main holographic display */}
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          background: 'rgba(0,188,212,0.05)',
          border: '1px solid rgba(0,188,212,0.2)',
          borderRadius: '8px'
        }}
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 180]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {/* Schematic lines */}
        {Array.from({ length: activeSchematic.lines }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: `${Math.random() * 60 + 20}%`,
              height: '1px',
              background: `linear-gradient(90deg, transparent, rgba(0,188,212,0.6), transparent)`,
              transformOrigin: '0% 50%',
              transform: `rotate(${(i / activeSchematic.lines) * 360}deg) translateX(-50%)`,
              opacity: 0.7
            }}
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}

        {/* Nodes/junctions */}
        {Array.from({ length: Math.min(activeSchematic.lines / 2, 12) }).map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: '4px',
              height: '4px',
              background: '#00bcd4',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(0,188,212,0.5)',
              transform: `translate(-50%, -50%) rotate(${(i / 12) * 360}deg) translateY(-30%)`
            }}
            animate={{
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        {/* Label */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            background: 'rgba(0,0,0,0.6)',
            color: '#00bcd4',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: '"Orbitron", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap'
          }}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          {activeSchematic.name}
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#00bcd4' : i % 3 === 1 ? '#D4AF37' : '#C41E24',
              borderRadius: '50%',
              boxShadow: `0 0 ${Math.random() * 6 + 2}px ${i % 3 === 0 ? '#00bcd4' : i % 3 === 1 ? '#D4AF37' : '#C41E24'}`,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              x: [
                parseFloat((Math.random() * 100 - 50).toFixed(1)),
                parseFloat((Math.random() * 100 - 50).toFixed(1)),
                parseFloat((Math.random() * 100 - 50).toFixed(1))
              ],
              y: [
                parseFloat((Math.random() * 100 - 50).toFixed(1)),
                parseFloat((Math.random() * 100 - 50).toFixed(1)),
                parseFloat((Math.random() * 100 - 50).toFixed(1))
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Interactive hint */}
      {interactive && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: '"Orbitron", sans-serif',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        >
          DRAG TO ROTATE
        </motion.div>
      )}
    </motion.div>
  );
}