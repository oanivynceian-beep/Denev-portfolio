import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronRight, Terminal as TerminalIcon } from 'lucide-react';
import { USER_INFO, SKILLS, PROJECTS, EXPERIENCE } from '../constants';

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 30);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-brand-primary ml-1 translate-y-[2px]"
      />
    </span>
  );
};

const MagneticButton = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#about' },
    { name: 'Portfolio', href: '#skills' },
    { name: 'Stack', href: '#projects' },
    { name: 'Credentials', href: '#certificates' },
    { name: 'Timeline', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-lg rotate-12 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              <span className="text-black font-bold text-xl -rotate-12">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white uppercase">{USER_INFO.name.split(' ')[0]}.DEV</span>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{`SESSION active: ${formatTime(sessionTime)}`}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="hover:text-brand-primary border-b border-transparent hover:border-brand-primary pb-1 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-right">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-green-400"
            ></motion.div>
            <span className="text-[10px] uppercase font-bold tracking-tighter text-green-400 whitespace-nowrap">Available for hire</span>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 glass-card flex items-center justify-center text-white cursor-pointer z-[60] active:scale-95 transition-transform"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col md:hidden overflow-hidden"
          >
            {/* Mobile Header */}
            <div className="px-6 py-6 flex justify-between items-center border-b border-white/5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-primary rounded rotate-12 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                  <TerminalIcon className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm font-bold tracking-widest text-white uppercase">{USER_INFO.name.split(' ')[0]}.SYS</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 glass-card flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-10 p-10 relative z-10">
              <div className="flex flex-col items-center gap-6 text-center w-full">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex flex-col items-center"
                  >
                    <span className="text-[10px] font-mono text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-[0.3em] mb-1">{`0${i + 1}`}</span>
                    <span className="text-3xl font-display font-medium text-white hover:text-brand-primary transition-colors tracking-tighter">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
              
              <div className="h-px w-20 bg-white/10 mt-4" />

              <div className="flex gap-4">
                <a href={USER_INFO.github} className="p-4 glass-card rounded-2xl hover:border-brand-primary transition-colors">
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a href={USER_INFO.linkedin} className="p-4 glass-card rounded-2xl hover:border-brand-primary transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div className="p-10 text-center relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-slate-600">Secure Connection Established</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const backgroundX = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const backgroundY = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  return (
    <section 
      id="about" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 relative w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TerminalIcon className="w-32 h-32 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-light text-white leading-tight mb-6">
              {USER_INFO.role.split(' ').slice(0, -1).join(' ')}
              <span className="text-brand-primary font-bold block">{USER_INFO.role.split(' ').slice(-1).join(' ')}</span>
            </h2>
            
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-mono">
              <span className="text-brand-primary mr-2">{">"}</span>
              <TypewriterText text={USER_INFO.tagline} delay={800} />
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="block">
                <MagneticButton className="px-8 py-4 bg-brand-primary text-black font-bold rounded-xl flex items-center gap-2 hover:glow-cyan transition-all group shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  Launch Project
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </a>
              <div className="flex gap-4">
                <a href={USER_INFO.github} className="glass-card p-4 hover:border-brand-primary transition-all rounded-xl active:scale-95 transition-transform">
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a href={USER_INFO.linkedin} className="glass-card p-4 hover:border-brand-primary transition-all rounded-xl active:scale-95 transition-transform">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Profile Identity Card - Now responsive based on image aspect ratio */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card flex flex-col group relative overflow-hidden h-full min-h-[400px]"
          >
            <div className="flex-1 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
               <img 
                src={USER_INFO.avatar} 
                alt={USER_INFO.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-[#050505] to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary font-mono">Status: Active</span>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight uppercase">{USER_INFO.name}</h3>
              <p className="text-slate-400 text-[10px] font-mono mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-widest leading-none">{`// ${USER_INFO.location}`}</p>
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 flex items-center justify-between h-auto"
          >
             <div>
              <p className="text-4xl md:text-5xl font-bold text-white tracking-widest">{new Date().getFullYear() - 2022}+</p>
              <p className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mt-2 font-bold">Years Experience</p>
            </div>
            <div className="h-16 w-[1px] bg-white/10"></div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white text-glow tracking-widest">{PROJECTS.length}</p>
              <p className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mt-2 font-bold">Deployments</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 flex items-center gap-6"
          >
            <div className="w-12 h-12 rounded-full bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/30">
              <Mail className="w-6 h-6 text-brand-secondary" />
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-medium text-sm">Direct Transmission</p>
              <a href={`mailto:${USER_INFO.email}`} className="text-slate-500 text-xs hover:text-brand-primary transition-colors truncate block">{USER_INFO.email}</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
