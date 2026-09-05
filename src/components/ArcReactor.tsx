import { motion } from 'framer-motion';

export function ArcReactor({ size = 120, className = '', animate = true }) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={animate ? {
        rotate: [0, 360],
      } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: 'rgba(0,188,212,0.3)' }}
        animate={{ boxShadow: ['0 0 20px rgba(0,188,212,0.3)', '0 0 40px rgba(0,188,212,0.6)', '0 0 20px rgba(0,188,212,0.3)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Ring 2 */}
      <motion.div
        className="absolute inset-8 rounded-full border-2"
        style={{ borderColor: 'rgba(0,188,212,0.4)' }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Ring 3 */}
      <motion.div
        className="absolute inset-16 rounded-full border-2"
        style={{ borderColor: 'rgba(212,175,55,0.3)' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Core */}
      <motion.div
        className="absolute inset-24 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #4dd0e1, #00bcd4 40%, #00838f 70%, #006064)',
          boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(0,188,212,0.6), 0 0 60px rgba(0,188,212,0.3)'
        }}
        animate={{ boxShadow: ['inset 0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(0,188,212,0.6), 0 0 60px rgba(0,188,212,0.3)', 'inset 0 2px 10px rgba(255,255,255,0.5), 0 0 50px rgba(0,188,212,0.8), 0 0 100px rgba(0,188,212,0.5)', 'inset 0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(0,188,212,0.6), 0 0 60px rgba(0,188,212,0.3)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full" style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)'
        }} />
      </motion.div>

      {/* Central detail */}
      <div className="absolute inset-32 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 rounded-full" style={{ background: '#fff', boxShadow: '0 0 10px #fff, 0 0 20px #00bcd4' }} />
      </div>

      {/* Outer particles */}
      <div className="absolute -inset-8">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <motion.div
            key={angle}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
            style={{
              background: '#00bcd4',
              transformOrigin: `${size/2}px ${size/2}px`,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${size/2 - 12}px)`,
              boxShadow: '0 0 8px #00bcd4'
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: angle / 360 * 2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}