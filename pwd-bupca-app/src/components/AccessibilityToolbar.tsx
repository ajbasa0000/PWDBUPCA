'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { 
  Eye, 
  Type, 
  Volume2, 
  VolumeX, 
  Sun,
  Moon,
  Sparkles, 
  X,
  Volume
} from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
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
    speakText
  } = useAccessibility();

  const handleToggle = () => {
    playChime('click');
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg font-medium border border-slate-700 dark:border-slate-200 text-xs sm:text-sm cursor-pointer transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-500"
          aria-label="Open Accessibility Menu"
          aria-expanded={isOpen}
        >
          <Eye className="w-4 h-4 text-blue-400 dark:text-blue-600" aria-hidden="true" />
          <span>Accessibility</span>
        </button>
      )}

      {/* Accessibility Drawer / Panel */}
      {isOpen && (
        <div 
          className="w-80 sm:w-96 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-5 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility Settings"
        >
          <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-sm">Display & Accessibility</h2>
            </div>
            <button
              onClick={() => {
                playChime('click');
                setIsOpen(false);
              }}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg"
              aria-label="Close Accessibility Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Light / Dark Mode Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setTheme('light');
                    playChime('click');
                  }}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 transition ${
                    theme === 'light'
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-zinc-900'
                      : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Mode</span>
                </button>
                <button
                  onClick={() => {
                    setTheme('dark');
                    playChime('click');
                  }}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 transition ${
                    theme === 'dark'
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-zinc-900'
                      : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            {/* High Contrast Options for Low Vision */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Special Contrast Modes</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    setContrastMode('standard');
                    playChime('click');
                  }}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border text-center transition ${
                    contrastMode === 'standard' 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => {
                    setContrastMode('high-contrast-black-yellow');
                    playChime('click');
                  }}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition ${
                    contrastMode === 'high-contrast-black-yellow' 
                      ? 'bg-black text-yellow-400 border-yellow-400 ring-2 ring-yellow-400' 
                      : 'bg-black text-yellow-400 border-zinc-700'
                  }`}
                >
                  High Yellow
                </button>
                <button
                  onClick={() => {
                    setContrastMode('high-contrast-dark');
                    playChime('click');
                  }}
                  className={`py-2 px-1 text-[11px] font-bold rounded-lg border text-center transition ${
                    contrastMode === 'high-contrast-dark' 
                      ? 'bg-black text-white border-white ring-2 ring-white' 
                      : 'bg-zinc-950 text-white border-zinc-700'
                  }`}
                >
                  Pure Dark
                </button>
              </div>
            </div>

            {/* Font Size Scaling */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-emerald-500" />
                <span>Text Sizing</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['normal', 'large', 'xlarge'] as const).map((sz, i) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setFontSize(sz);
                      playChime('click');
                    }}
                    className={`py-2 text-xs font-medium rounded-lg border ${
                      fontSize === sz
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {i === 0 ? '100%' : i === 1 ? '125%' : '150%'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexia Friendly Font */}
            <div className="flex items-center justify-between py-1 border-t border-slate-100 dark:border-zinc-800 pt-3">
              <div>
                <span className="text-xs font-semibold block">Dyslexia-Friendly Font</span>
                <span className="text-[11px] text-slate-400">Expands letter spacing</span>
              </div>
              <button
                onClick={() => {
                  setIsDyslexicFont(!isDyslexicFont);
                  playChime('click');
                }}
                className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                  isDyslexicFont ? 'bg-blue-600' : 'bg-slate-200 dark:bg-zinc-700'
                }`}
                aria-pressed={isDyslexicFont}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-xs transform transition-transform ${
                    isDyslexicFont ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sound & Audio Feedback */}
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-xs font-semibold block">Action Audio Cues</span>
                <span className="text-[11px] text-slate-400">Chimes on DTR & button actions</span>
              </div>
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  if (next) playChime('success');
                }}
                className={`p-2 rounded-lg border ${
                  soundEnabled 
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-800' 
                    : 'bg-slate-50 text-slate-400 border-slate-200 dark:border-zinc-800'
                }`}
                aria-label={soundEnabled ? "Disable audio chimes" : "Enable audio chimes"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Screen Reader Voice Test */}
            <button
              onClick={() => speakText("Display and accessibility preferences updated.")}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-medium rounded-lg border border-slate-200 dark:border-zinc-700 cursor-pointer"
            >
              <Volume className="w-3.5 h-3.5 text-blue-500" />
              <span>Test Voice Feedback</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
