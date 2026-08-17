import React from 'react';
import { Stethoscope, Brain, Heart, Activity } from 'lucide-react';

export function HologramAnatomy() {
  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center select-none pointer-events-none">
      {/* Glow Base Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-purple-600/20 rounded-full blur-2xl animate-pulse-glow" />
      
      {/* Concentric Rotating Hologram Rings */}
      <div className="absolute bottom-2 w-48 h-16 border-2 border-cyan-400/40 rounded-[100%] animate-spin-slow shadow-[0_0_20px_rgba(0,229,255,0.4)]" />
      <div className="absolute bottom-4 w-36 h-12 border border-purple-400/50 rounded-[100%] shadow-[0_0_15px_rgba(139,92,246,0.4)]" />
      <div className="absolute bottom-6 w-24 h-8 border border-blue-400/60 rounded-[100%]" />

      {/* Floating Holographic Medical Icons Orbit */}
      <div className="absolute top-6 left-4 w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.5)] animate-float-slow">
        <Stethoscope className="w-5 h-5" />
      </div>

      <div className="absolute top-8 right-4 w-10 h-10 rounded-full bg-purple-950/80 border border-purple-400/60 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <Brain className="w-5 h-5" />
      </div>

      <div className="absolute bottom-16 left-2 w-9 h-9 rounded-full bg-blue-950/80 border border-blue-400/60 flex items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-float-slow" style={{ animationDelay: '2.5s' }}>
        <Activity className="w-4 h-4" />
      </div>

      <div className="absolute bottom-20 right-2 w-9 h-9 rounded-full bg-pink-950/80 border border-pink-400/60 flex items-center justify-center text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.5)] animate-float-slow" style={{ animationDelay: '3.5s' }}>
        <Heart className="w-4 h-4" />
      </div>

      {/* Hologram Human Anatomy SVG Silhouette with Neon Glow */}
      <div className="relative z-10 w-44 h-56 flex items-center justify-center drop-shadow-[0_0_18px_rgba(0,229,255,0.85)]">
        <svg viewBox="0 0 100 160" className="w-full h-full text-cyan-300">
          <defs>
            <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0088FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Head & Neck */}
          <circle cx="50" cy="18" r="8" fill="url(#holoGradient)" opacity="0.85" filter="url(#glow)" />
          <rect x="48" y="26" width="4" height="6" fill="#00E5FF" opacity="0.8" />

          {/* Torso & Core */}
          <path d="M38 32 C38 32, 42 62, 45 74 L55 74 C58 62, 62 32, 62 32 Z" fill="url(#holoGradient)" opacity="0.8" />

          {/* Shoulders & Arms */}
          <path d="M38 32 L26 58 L28 88 L31 88 L30 60 L40 36 Z" fill="#00E5FF" opacity="0.75" />
          <path d="M62 32 L74 58 L72 88 L69 88 L70 60 L60 36 Z" fill="#00E5FF" opacity="0.75" />

          {/* Legs */}
          <path d="M45 74 L42 115 L40 148 L46 148 L48 116 L49 74 Z" fill="url(#holoGradient)" opacity="0.8" />
          <path d="M55 74 L58 115 L60 148 L54 148 L52 116 L51 74 Z" fill="url(#holoGradient)" opacity="0.8" />

          {/* Hologram Grid Scanlines */}
          <line x1="30" y1="40" x2="70" y2="40" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.8" />
          <line x1="35" y1="55" x2="65" y2="55" stroke="#8B5CF6" strokeWidth="0.75" strokeDasharray="3,2" opacity="0.8" />
          <line x1="40" y1="70" x2="60" y2="70" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.8" />
          <line x1="38" y1="95" x2="62" y2="95" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.8" />
          <line x1="36" y1="125" x2="64" y2="125" stroke="#8B5CF6" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.8" />

          {/* Medical Chakra Pulse Points */}
          <circle cx="50" cy="18" r="2" fill="#FFFFFF" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="50" cy="46" r="2.5" fill="#00E5FF" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="50" cy="62" r="2" fill="#EC4899" className="animate-ping" style={{ animationDuration: '2.5s' }} />
        </svg>
      </div>
    </div>
  );
}
