'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';
type ContrastMode = 'standard' | 'high-contrast-black-yellow' | 'high-contrast-dark';
type FontSizeSetting = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  fontSize: FontSizeSetting;
  setFontSize: (size: FontSizeSetting) => void;
  isDyslexicFont: boolean;
  setIsDyslexicFont: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  playChime: (type?: 'success' | 'alert' | 'click') => void;
  speakText: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [contrastMode, setContrastMode] = useState<ContrastMode>('standard');
  const [fontSize, setFontSize] = useState<FontSizeSetting>('normal');
  const [isDyslexicFont, setIsDyslexicFont] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Initialize theme from system or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('pwd_bupca_theme') as ThemeMode | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply root classes based on theme and accessibility state
  useEffect(() => {
    const root = document.documentElement;
    
    // Theme application
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pwd_bupca_theme', theme);

    // Remove old accessibility classes
    root.classList.remove(
      'hc-black-yellow', 
      'hc-dark', 
      'text-normal', 
      'text-large', 
      'text-xlarge', 
      'font-dyslexic'
    );

    // Apply Contrast
    if (contrastMode === 'high-contrast-black-yellow') {
      root.classList.add('hc-black-yellow');
    } else if (contrastMode === 'high-contrast-dark') {
      root.classList.add('hc-dark');
    }

    // Apply Font Size
    root.classList.add(`text-${fontSize}`);

    // Apply Dyslexia font
    if (isDyslexicFont) {
      root.classList.add('font-dyslexic');
    }
  }, [theme, contrastMode, fontSize, isDyslexicFont]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    playChime('click');
  };

  // Audio Cue using Web Audio API
  const playChime = (type: 'success' | 'alert' | 'click' = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'alert') {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.setValueAtTime(220, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // AudioContext might need user gesture in some browsers
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        contrastMode,
        setContrastMode,
        fontSize,
        setFontSize,
        isDyslexicFont,
        setIsDyslexicFont,
        soundEnabled,
        setSoundEnabled,
        playChime,
        speakText,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
