import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING PROTOCOLS...');

  const messages = [
    'BOOTING SYSTEM...',
    'LOADING ASSETS...',
    'INJECTING SHADERS...',
    'ESTABLISHING CONNECTION...',
    'ACCESS GRANTED'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        const diff = Math.random() * 15;
        const next = Math.min(oldProgress + diff, 100);
        
        // Update text based on progress
        const msgIndex = Math.floor((next / 100) * messages.length);
        if (messages[msgIndex]) setLoadingText(messages[msgIndex]);
        
        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center font-mono overflow-hidden"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <div className="absolute inset-0 noise-bg opacity-[0.03]" />
      
      <div className="relative w-full max-w-md px-10">
        {/* Logo or Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <div className="w-16 h-16 border-2 border-brand-primary/20 rounded-xl rotate-45 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-brand-primary rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
        </motion.div>

        {/* Progress Text */}
        <div className="flex justify-between items-end mb-4">
          <motion.div 
            key={loadingText}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.3em]"
          >
            {loadingText}
          </motion.div>
          <div className="text-[10px] text-slate-500 font-bold">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Outer Bar */}
        <div className="w-full h-[6px] bg-white/5 border border-white/10 rounded-full overflow-hidden p-[1px]">
          {/* Inner Progress */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
            style={{ 
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.5)'
            }}
          />
        </div>

        {/* Status Decoration */}
        <div className="mt-6 flex justify-center gap-12 text-[8px] text-slate-600 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
            SECURE_LINK
          </div>
          <div>ENCRYPTION: AES-256</div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/5" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/5" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/5" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/5" />
    </motion.div>
  );
};
