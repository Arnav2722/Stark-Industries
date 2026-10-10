import React, { createContext, useContext, useState, useEffect } from 'react';
import { starkAudio } from '../utils/starkAudio';

export type AIAssistantType = 'jarvis' | 'friday' | 'edith';

export interface AIThemeConfig {
  id: AIAssistantType;
  name: string;
  fullName: string;
  voiceStyle: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  glowColor: string;
  bgGlow: string;
  statusText: string;
}

export const AI_THEMES: Record<AIAssistantType, AIThemeConfig> = {
  jarvis: {
    id: 'jarvis',
    name: 'J.A.R.V.I.S.',
    fullName: 'Just A Rather Very Intelligent System',
    voiceStyle: 'Polished British Tactical AI',
    primaryColor: '#00bcd4', // Cyan
    secondaryColor: '#D4AF37', // Gold
    accentColor: '#C41E24', // Crimson
    glowColor: 'rgba(0, 188, 212, 0.4)',
    bgGlow: 'rgba(0, 188, 212, 0.08)',
    statusText: 'ALL SYSTEMS NOMINAL // ONLINE',
  },
  friday: {
    id: 'friday',
    name: 'F.R.I.D.A.Y.',
    fullName: 'Female Replacement Intelligent Digital Assistant Youth',
    voiceStyle: 'Tactical Combat Protocol AI',
    primaryColor: '#E8352A', // Crimson Red
    secondaryColor: '#F0D060', // Light Gold
    accentColor: '#00bcd4', // Cyan
    glowColor: 'rgba(232, 53, 42, 0.4)',
    bgGlow: 'rgba(232, 53, 42, 0.08)',
    statusText: 'COMBAT PROTOCOL ACTIVE // READY',
  },
  edith: {
    id: 'edith',
    name: 'E.D.I.T.H.',
    fullName: 'Even Dead, I\'m The Hero',
    voiceStyle: 'Orbital Satellite Defense Network',
    primaryColor: '#38bdf8', // Sky Blue
    secondaryColor: '#a855f7', // Purple
    accentColor: '#22c55e', // Emerald
    glowColor: 'rgba(56, 189, 248, 0.4)',
    bgGlow: 'rgba(56, 189, 248, 0.08)',
    statusText: 'SATELLITE UPLINK SECURE // TARGETING READY',
  },
};

interface StarkContextValue {
  aiMode: AIAssistantType;
  setAIMode: (mode: AIAssistantType) => void;
  theme: AIThemeConfig;
  isMuted: boolean;
  toggleMute: () => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  isHousePartyActive: boolean;
  triggerHouseParty: () => void;
  isSnapActive: boolean;
  triggerSnap: () => void;
  isVeronicaActive: boolean;
  triggerVeronica: () => void;
  compareSuits: [string | null, string | null];
  setCompareSuits: React.Dispatch<React.SetStateAction<[string | null, string | null]>>;
  openSuitCompare: (suit1Id?: string, suit2Id?: string) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
}

const StarkContext = createContext<StarkContextValue | undefined>(undefined);

export const StarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiMode, setAIModeState] = useState<AIAssistantType>('jarvis');
  const [isMuted, setIsMuted] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isHousePartyActive, setIsHousePartyActive] = useState(false);
  const [isSnapActive, setIsSnapActive] = useState(false);
  const [isVeronicaActive, setIsVeronicaActive] = useState(false);
  const [compareSuits, setCompareSuits] = useState<[string | null, string | null]>(['mark-3', 'mark-85']);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const theme = AI_THEMES[aiMode];

  const setAIMode = (mode: AIAssistantType) => {
    setAIModeState(mode);
    starkAudio.playProtocolConfirm();
    starkAudio.speak(`${AI_THEMES[mode].name} initialized. Systems transferred.`, mode);
  };

  const toggleMute = () => {
    const muted = starkAudio.toggleMute();
    setIsMuted(muted);
  };

  const toggleTerminal = () => {
    setIsTerminalOpen(prev => {
      const next = !prev;
      if (next) {
        starkAudio.playChirp();
      } else {
        starkAudio.playClick(600);
      }
      return next;
    });
  };

  const triggerHouseParty = () => {
    setIsHousePartyActive(true);
    starkAudio.playProtocolConfirm();
    starkAudio.speak('House Party Protocol initiated. All available armors engaging.', aiMode);
    setTimeout(() => {
      setIsHousePartyActive(false);
    }, 12000);
  };

  const triggerSnap = () => {
    setIsSnapActive(true);
    starkAudio.playRepulsorCharge();
    setTimeout(() => {
      starkAudio.playRepulsorBlast();
    }, 1500);
    setTimeout(() => {
      setIsSnapActive(false);
    }, 8000);
  };

  const triggerVeronica = () => {
    setIsVeronicaActive(true);
    starkAudio.playProtocolConfirm();
    starkAudio.speak('Veronica orbital deployment module inbound.', aiMode);
    setTimeout(() => {
      setIsVeronicaActive(false);
    }, 10000);
  };

  const openSuitCompare = (suit1Id?: string, suit2Id?: string) => {
    setCompareSuits([suit1Id || 'mark-3', suit2Id || 'mark-85']);
    setIsCompareOpen(true);
    starkAudio.playChirp();
  };

  useEffect(() => {
    // Initial welcome chime on load
    const timer = setTimeout(() => {
      starkAudio.playChirp();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StarkContext.Provider
      value={{
        aiMode,
        setAIMode,
        theme,
        isMuted,
        toggleMute,
        isTerminalOpen,
        setIsTerminalOpen,
        toggleTerminal,
        isHousePartyActive,
        triggerHouseParty,
        isSnapActive,
        triggerSnap,
        isVeronicaActive,
        triggerVeronica,
        compareSuits,
        setCompareSuits,
        openSuitCompare,
        isCompareOpen,
        setIsCompareOpen,
      }}
    >
      {children}
    </StarkContext.Provider>
  );
};

export const useStark = () => {
  const context = useContext(StarkContext);
  if (!context) {
    throw new Error('useStark must be used within a StarkProvider');
  }
  return context;
};
