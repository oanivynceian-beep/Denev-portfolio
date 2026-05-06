/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { Navbar, Hero } from './components/Navigation_Hero';
import { Skills, Projects } from './components/Skills_Projects';
import { Timeline, Contact } from './components/Timeline_Contact';
import { Certificates } from './components/Certificates';
import { LoadingScreen } from './components/LoadingScreen';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-primary pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.1)' : 'rgba(34, 211, 238, 0)',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
};

const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Spotlights and background subtle movement
  const backgroundX = useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-10, 10]);
  const backgroundY = useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-10, 10]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Dynamic Ambient Glows */}
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute inset-0 opacity-40"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-secondary/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[100px]" />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-[0.05]" />
      
      {/* Interactive Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(34, 211, 238, 0.08) 0%, transparent 35%)`
          ),
        }}
      />

      {/* Grain/Noise & Scanlines */}
      <div className="absolute inset-0 noise-bg opacity-[0.03]" />
      <div className="scanline" />
      
      {/* Structural Accents */}
      <div className="absolute top-0 right-[5%] bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
      <div className="absolute top-0 left-[5%] bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-technical-bg">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.main 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-technical-bg selection:bg-brand-primary selection:text-technical-bg cursor-none relative"
          >
            <InteractiveBackground />
            <CustomCursor />
            <motion.div 
              className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
              style={{ scaleX }}
            />
            
            <Navbar />
            
            <Hero />
            
            <Skills />
            
            <Projects />
            
            <Certificates />
            
            <Timeline />
            
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
