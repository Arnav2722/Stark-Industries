import React, { useState, useEffect } from 'react';
import { useStark } from '../context/StarkContext';
import { Volume2, VolumeX, Zap, Sparkles } from 'lucide-react';

export interface HUDOverlayProps {
  className?: string;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({ className = '' }) => {
  const {
    theme,
    isMuted,
    toggleMute,
    triggerHouseParty,
    openSuitCompare,
  } = useStark();

  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(d.toTimeString().split(' ')[0] + ' EST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-30 ${className}`}>
      {/* ── Top Left Diagnostics HUD ─────────────────────────────────── */}
      <div className="absolute top-20 left-6 hidden xl:block pointer-events-auto">
        <div
          className="p-3.5 rounded-xl border bg-stark-darker/80 backdrop-blur-md space-y-1.5 font-mono text-[10px]"
          style={{ borderColor: `${theme.primaryColor}30` }}
        >
          <div className="flex items-center gap-2 pb-1 border-b border-gray-800">
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: theme.primaryColor }} />
            <span className="font-display font-bold uppercase tracking-widest text-white">
              MALIBU R&D LAB // {time || '12:00:00 EST'}
            </span>
          </div>
          <div className="flex justify-between gap-4 text-gray-400">
            <span>COORDINATES:</span>
            <span className="text-white">34.0044° N, 118.8066° W</span>
          </div>
          <div className="flex justify-between gap-4 text-gray-400">
            <span>ARC OUTPUT:</span>
            <span style={{ color: theme.secondaryColor }}>487 GW // NOMINAL</span>
          </div>
          <div className="flex justify-between gap-4 text-gray-400">
            <span>ARMOR VAULT:</span>
            <span className="text-white">31 UNITS ONLINE</span>
          </div>
          <div className="flex justify-between gap-4 text-gray-400">
            <span>ACTIVE AI:</span>
            <span style={{ color: theme.primaryColor }}>{theme.name}</span>
          </div>
        </div>
      </div>

      {/* ── Top Right Tactical Quick Actions HUD ──────────────────────── */}
      <div className="absolute top-20 right-6 hidden md:flex items-center gap-2 pointer-events-auto z-40">
        {/* Sound Toggle Button with Audio Wave */}
        <button
          onClick={toggleMute}
          className="px-3 py-2 rounded-xl border bg-stark-darker/85 backdrop-blur-md text-xs font-mono flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            borderColor: `${theme.primaryColor}40`,
            color: isMuted ? '#888888' : theme.primaryColor,
          }}
          title={isMuted ? 'Unmute Stark Sound FX' : 'Mute Sound FX'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-500" />
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              {/* Animated audio wave bars */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-current animate-pulse" />
                <span className="w-0.5 h-3 bg-current animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-current animate-pulse delay-150" />
              </div>
            </>
          )}
          <span className="hidden lg:inline uppercase text-[10px] tracking-wider">
            {isMuted ? 'AUDIO OFF' : 'AUDIO ON'}
          </span>
        </button>

        {/* Suit Compare Launcher Button */}
        <button
          onClick={() => openSuitCompare()}
          className="px-3 py-2 rounded-xl border bg-stark-darker/85 backdrop-blur-md text-xs font-display tracking-wider font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-stark-gold"
          style={{ borderColor: 'rgba(212,175,55,0.4)' }}
          title="Open Armor Comparison Matrix"
        >
          <Sparkles className="w-4 h-4 text-stark-gold" />
          <span className="hidden lg:inline text-[10px]">COMPARE SUITS</span>
        </button>

        {/* House Party Protocol Button */}
        <button
          onClick={triggerHouseParty}
          className="px-3 py-2 rounded-xl border bg-red-950/70 backdrop-blur-md text-xs font-display tracking-wider font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-red-400"
          style={{ borderColor: 'rgba(239,68,68,0.4)' }}
          title="Engage House Party Protocol"
        >
          <Zap className="w-4 h-4 text-red-400" />
          <span className="hidden lg:inline text-[10px]">HOUSE PARTY</span>
        </button>
      </div>

      {/* ── Screen Edge HUD Calipers ─────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: `${theme.primaryColor}60` }} />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: `${theme.primaryColor}60` }} />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: `${theme.primaryColor}60` }} />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: `${theme.primaryColor}60` }} />

      {/* Bottom Center System Ticker */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gray-800 text-[9px] font-mono text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.primaryColor }} />
          SECURE PROTOCOL // CLEARED FOR LEVEL 10
        </span>
        <span className="text-gray-600">|</span>
        <span style={{ color: theme.secondaryColor }}>
          DEFCON 4 // GLOBAL DEFENSE ACTIVE
        </span>
      </div>
    </div>
  );
};
