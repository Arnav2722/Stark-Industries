/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arc': {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        'stark': {
          gold: '#D4AF37',
          goldLight: '#F0D060',
          goldDark: '#B8960C',
          red: '#C41E24',
          redLight: '#E8352A',
          redDark: '#8B0000',
          blue: '#1B6B93',
          blueLight: '#2196F3',
          blueDark: '#0D3B66',
          dark: '#0A0A0A',
          darker: '#050505',
          darkest: '#030303',
          panel: '#111111',
          panelLight: '#1A1A1A',
          border: '#222222',
        },
      },
      fontFamily: {
        'display': ['"Orbitron"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'arc-pulse': 'arcPulse 3s ease-in-out infinite',
        'arc-glow': 'arcGlow 2s ease-in-out infinite alternate',
        'hud-scan': 'hudScan 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'slideInLeft': 'slideInLeft 0.6s ease-out forwards',
        'slideInRight': 'slideInRight 0.6s ease-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'borderGlow': 'borderGlow 3s ease-in-out infinite',
        'textGlow': 'textGlow 2s ease-in-out infinite alternate',
        'rotateSlow': 'rotateSlow 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        arcPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        arcGlow: {
          'from': { boxShadow: '0 0 20px rgba(0,188,212,0.3), 0 0 40px rgba(0,188,212,0.1)' },
          'to': { boxShadow: '0 0 40px rgba(0,188,212,0.6), 0 0 80px rgba(0,188,212,0.2)' },
        },
        hudScan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-60px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(60px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.8)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(0,188,212,0.2)' },
          '50%': { borderColor: 'rgba(0,188,212,0.6)' },
        },
        textGlow: {
          'from': { textShadow: '0 0 10px rgba(0,188,212,0.3)' },
          'to': { textShadow: '0 0 20px rgba(0,188,212,0.6), 0 0 40px rgba(0,188,212,0.2)' },
        },
        rotateSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,188,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.03) 1px, transparent 1px)',
        'hud-gradient': 'linear-gradient(135deg, rgba(0,188,212,0.05) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)',
        'stark-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(0,188,212,0.08) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
