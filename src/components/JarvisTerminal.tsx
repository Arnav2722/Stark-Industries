import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, Cpu } from 'lucide-react';
import { useStark } from '../context/StarkContext';
import { starkAudio } from '../utils/starkAudio';
import { useNavigate } from 'react-router-dom';
import { armorsData } from '../data/armors';

interface TerminalMessage {
  id: string;
  sender: 'user' | 'jarvis';
  text: string;
  timestamp: string;
  actionChips?: Array<{ label: string; command: string }>;
}

export const JarvisTerminal: React.FC = () => {
  const {
    aiMode,
    setAIMode,
    theme,
    isTerminalOpen,
    toggleTerminal,
    triggerHouseParty,
    triggerSnap,
    triggerVeronica,
    openSuitCompare,
  } = useStark();

  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 'init-1',
      sender: 'jarvis',
      text: `Good evening, Mr. Stark. ${theme.name} interface connected to Stark Industries Defense Network. How may I assist you today?`,
      timestamp: '00:00:01',
      actionChips: [
        { label: '🚀 House Party Protocol', command: 'house party' },
        { label: '🛡️ Armor Diagnostics', command: 'diagnostics' },
        { label: '⚡ Arc Reactor Status', command: 'reactor' },
        { label: '⚔️ Compare Mark III vs LXXXV', command: 'compare mark 3 and mark 85' },
        { label: '❓ System Commands', command: 'help' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim();
    if (!raw) return;

    const userMsg: TerminalMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: raw,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    starkAudio.playClick(900);

    const lower = raw.toLowerCase();

    setTimeout(() => {
      let reply = '';
      let chips: TerminalMessage['actionChips'] = undefined;

      if (lower.includes('help') || lower.includes('command') || lower.includes('protocol')) {
        reply = `Available Stark Protocols:\n• "house party" - Engage House Party Protocol\n• "veronica" - Deploy sub-orbital Hulkbuster module\n• "snap" - I am Iron Man emergency protocol\n• "diagnostics" - Full system & armor status\n• "reactor" - Arc Reactor core output & stability\n• "compare [suit 1] and [suit 2]" - Side-by-side suit comparison\n• "switch to friday" / "switch to jarvis" / "switch to edith"\n• "show armors" / "show tower" / "show villains"\n• "clear" - Purge terminal cache`;
        chips = [
          { label: 'House Party', command: 'house party' },
          { label: 'Deploy Veronica', command: 'veronica' },
          { label: 'I am Iron Man', command: 'snap' },
          { label: 'Armor Archive', command: 'show armors' },
        ];
      } else if (lower.includes('house party')) {
        reply = 'House Party Protocol confirmed. Deploying all 31 automated armors from the subterranean vault.';
        triggerHouseParty();
      } else if (lower.includes('veronica') || lower.includes('hulkbuster')) {
        reply = 'Veronica orbital cage in descent trajectory. Hulkbuster modular armor en route to target coordinates.';
        triggerVeronica();
      } else if (lower.includes('snap') || lower.includes('iron man')) {
        reply = '"And I... am... Iron Man." Nanotech Infinity Gauntlet engaging all six Infinity Stones.';
        triggerSnap();
      } else if (lower.includes('diagnostics') || lower.includes('status')) {
        reply = `SYSTEM DIAGNOSTICS REPORT:\n• Main Arc Core: 487 GW // Stable\n• Mark LXXXV Nanite Reservoir: 98.4% capacity\n• Repulsor Capacitor banks: 100% nominal\n• Inertial Dampeners: Operational\n• S.H.I.E.L.D. Uplink: Secure (Level 10 Clearance)\n• Active Defense Grid: 100% Perimeter Lock`;
        chips = [
          { label: 'Inspect Core', command: 'reactor' },
          { label: 'View Armors', command: 'show armors' },
        ];
      } else if (lower.includes('reactor') || lower.includes('arc core') || lower.includes('power')) {
        reply = 'Arc Reactor Core telemetry: Clean energy output at 487 GW/hr. Palladium-free triangular vibranium synthesis core operating at 99.8% thermal efficiency.';
        chips = [
          { label: 'Run Diagnostics', command: 'diagnostics' },
          { label: 'Technology Archive', command: 'show tech' },
        ];
      } else if (lower.includes('compare')) {
        reply = 'Launching Holographic Armor Comparison Matrix...';
        openSuitCompare('mark-3', 'mark-85');
      } else if (lower.includes('friday')) {
        setAIMode('friday');
        reply = 'Voice and protocol switched to F.R.I.D.A.Y. Combat systems primed.';
      } else if (lower.includes('jarvis')) {
        setAIMode('jarvis');
        reply = 'Voice and protocol switched to J.A.R.V.I.S. At your service, sir.';
      } else if (lower.includes('edith')) {
        setAIMode('edith');
        reply = 'Voice and protocol switched to E.D.I.T.H. Orbital satellite targeting network synchronized.';
      } else if (lower.includes('armor') || lower.includes('suits')) {
        reply = 'Navigating to Stark Armor Archive. Accessing 31 classified suit dossiers...';
        navigate('/armor');
      } else if (lower.includes('tech') || lower.includes('technology')) {
        reply = 'Accessing Stark R&D Technology Archive...';
        navigate('/technology');
      } else if (lower.includes('timeline')) {
        reply = 'Accessing Stark Historical Timeline (2008 - 2023)...';
        navigate('/timeline');
      } else if (lower.includes('tower') || lower.includes('hq') || lower.includes('avengers')) {
        reply = 'Accessing Avengers Tower 200 Park Avenue blueprints & floor schematics...';
        navigate('/tower');
      } else if (lower.includes('villain') || lower.includes('enemy') || lower.includes('character')) {
        reply = 'Accessing Threat Assessment and Character Dossiers...';
        navigate('/characters');
      } else if (lower.includes('movie') || lower.includes('film')) {
        reply = 'Accessing Stark Filmography and Mission Archives...';
        navigate('/movies');
      } else if (lower.includes('gallery') || lower.includes('photo')) {
        reply = 'Opening Holographic Visual Gallery Vault...';
        navigate('/gallery');
      } else if (lower.includes('clear')) {
        setMessages([]);
        return;
      } else {
        // Find matching armor if user types a mark number
        const found = armorsData.find(a => lower.includes(a.name.toLowerCase()) || (a.mark && lower.includes(a.mark.toLowerCase())));
        if (found) {
          reply = `${found.name} (${found.mark || 'Suit'}): ${found.purpose}. First appearance: ${found.firstAppearance}. Key weapons: ${found.weapons.slice(0, 3).join(', ')}.`;
          chips = [
            { label: `View ${found.name}`, command: `show armors` },
            { label: 'Compare Suits', command: 'compare mark 3 and mark 85' },
          ];
        } else {
          reply = `Query processed. Command "${raw}" recognized by Stark OS. Type "help" to view full defense protocols or select one of the tactical chips below.`;
          chips = [
            { label: '🚀 House Party', command: 'house party' },
            { label: '🛡️ Diagnostics', command: 'diagnostics' },
            { label: '⚡ Arc Reactor', command: 'reactor' },
            { label: '❓ Help', command: 'help' },
          ];
        }
      }

      const jarvisMsg: TerminalMessage = {
        id: `j-${Date.now()}`,
        sender: 'jarvis',
        text: reply,
        timestamp: new Date().toLocaleTimeString(),
        actionChips: chips,
      };

      setMessages(prev => [...prev, jarvisMsg]);
      starkAudio.playChirp();
      starkAudio.speak(reply.slice(0, 140), aiMode);
    }, 400);
  };

  return (
    <>
      {/* Floating HUD Trigger Orb (Bottom Right) */}
      <motion.button
        onClick={toggleTerminal}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full flex items-center justify-center border-2 backdrop-blur-2xl shadow-2xl group cursor-pointer"
        style={{
          background: 'rgba(5, 5, 5, 0.85)',
          borderColor: theme.primaryColor,
          boxShadow: `0 0 25px ${theme.glowColor}, inset 0 0 15px ${theme.bgGlow}`,
        }}
        title="Access J.A.R.V.I.S. Terminal"
      >
        <div className="relative flex items-center justify-center">
          <Terminal className="w-6 h-6 transition-colors" style={{ color: theme.primaryColor }} />
          {/* Animated Orbiting Ring */}
          <motion.div
            className="absolute -inset-3 rounded-full border border-dashed pointer-events-none"
            style={{ borderColor: theme.secondaryColor }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          {/* Pulse Beacon */}
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
            style={{ background: theme.primaryColor }}
          />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
            style={{ background: theme.primaryColor }}
          />
        </div>
      </motion.button>

      {/* Holographic Terminal Modal / Drawer */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={toggleTerminal}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[620px] flex flex-col rounded-2xl overflow-hidden border border-stark-border/80 bg-stark-darker/95 backdrop-blur-2xl shadow-2xl"
              style={{
                borderColor: theme.primaryColor,
                boxShadow: `0 0 50px ${theme.glowColor}, inset 0 0 30px rgba(0,0,0,0.9)`,
              }}
            >
              {/* Terminal Top Window Bar */}
              <div
                className="px-6 py-4 flex items-center justify-between border-b"
                style={{
                  background: 'rgba(10, 10, 10, 0.95)',
                  borderColor: `${theme.primaryColor}30`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={toggleTerminal} />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-px bg-gray-800" />
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" style={{ color: theme.primaryColor }} />
                    <span className="font-display text-sm font-bold tracking-wider text-white">
                      STARK OS // {theme.name} TACTICAL TERMINAL
                    </span>
                  </div>
                </div>

                {/* AI Assistant Mode Switcher */}
                <div className="flex items-center gap-2">
                  {(['jarvis', 'friday', 'edith'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setAIMode(mode)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all ${
                        aiMode === mode
                          ? 'font-bold border shadow-sm'
                          : 'text-gray-400 hover:text-white bg-black/40'
                      }`}
                      style={
                        aiMode === mode
                          ? {
                              background: `${theme.primaryColor}20`,
                              borderColor: theme.primaryColor,
                              color: theme.primaryColor,
                            }
                          : {}
                      }
                    >
                      {mode}
                    </button>
                  ))}
                  <button
                    onClick={toggleTerminal}
                    className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-xs md:text-sm">
                {/* System Watermark */}
                <div className="text-center py-2 opacity-40">
                  <div className="font-display text-xs tracking-widest text-stark-gold">
                    STARK INDUSTRIES TACTICAL DEFENSE MATRIX v5.85
                  </div>
                  <div className="text-[10px] text-gray-500">
                    CLASSIFIED LEVEL 10 // ALL SESSIONS MONITORED
                  </div>
                </div>

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-[10px] text-gray-500">
                      <span>{msg.sender === 'user' ? 'TONY STARK [COMMANDER]' : `${theme.name} [A.I.]`}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-stark-gold/20 to-stark-gold/10 text-stark-goldLight border border-stark-gold/30 rounded-tr-none'
                          : 'bg-stark-panel/90 text-gray-200 border rounded-tl-none'
                      }`}
                      style={
                        msg.sender === 'jarvis'
                          ? { borderColor: `${theme.primaryColor}40`, boxShadow: `0 0 15px ${theme.bgGlow}` }
                          : {}
                      }
                    >
                      {msg.text}
                    </div>

                    {/* Quick Suggestion Chips */}
                    {msg.actionChips && msg.actionChips.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2.5 max-w-[85%]">
                        {msg.actionChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleCommand(chip.command)}
                            className="px-3 py-1.5 text-xs rounded-lg border font-mono transition-all duration-200 hover:scale-105 active:scale-95 bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white"
                            style={{ borderColor: `${theme.primaryColor}50` }}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Terminal Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(input);
                }}
                className="p-4 border-t border-stark-border/60 bg-black/80 flex items-center gap-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono" style={{ color: theme.primaryColor }}>
                  <span className="animate-pulse">❯</span>
                  <span>STARK:</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command or query (e.g. 'house party', 'diagnostics', 'compare mark 3 and mark 85')..."
                  className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm focus:outline-none placeholder-gray-600"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-lg border transition-all active:scale-95 text-black font-bold"
                  style={{
                    background: theme.primaryColor,
                    borderColor: theme.secondaryColor,
                  }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
