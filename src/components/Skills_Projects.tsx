import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { SKILLS, PROJECTS } from '../constants';

const GlitchText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  
  const handleMouseEnter = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      iteration += 1 / 3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
  };

  const handleMouseLeave = () => {
    setDisplayText(text);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {displayText}
    </span>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex items-center justify-between mb-12"
        >
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">
            <GlitchText text="Core Competencies" />
          </h3>
          <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-white/10 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 group flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
                <item.icon className="w-6 h-6 text-slate-400 group-hover:text-brand-primary transition-colors" />
              </div>
              <h3 className="text-xl text-white mb-4">{item.category}</h3>
              <ul className="space-y-3 mt-auto">
                  {item.skills.map((skill, sIndex) => (
                    <motion.li 
                      key={sIndex} 
                      whileHover={{ x: 5, color: '#22d3ee' }}
                      className="text-[11px] text-slate-500 font-mono flex items-center gap-2 uppercase tracking-wider cursor-default"
                    >
                      <span className="w-1 h-1 bg-brand-primary rounded-full shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                      {skill}
                    </motion.li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="flex items-center justify-between mb-12"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">
                <GlitchText text="Featured Architecture" />
              </h3>
              <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-white/10 to-transparent"></div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-light text-white"
            >
              Selected <span className="text-brand-secondary font-bold">Protocols</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group flex flex-col h-full cursor-pointer hover:shadow-2xl hover:shadow-brand-primary/5 transition-all"
            >
              <div className="h-40 bg-[#0a0a0a] flex items-center justify-center p-6 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 atmos-bg opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Scanning Line Animation */}
                <motion.div 
                  initial={{ top: '-100%' }}
                  animate={{ top: '100%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-brand-primary/20 z-20 group-hover:bg-brand-primary/40"
                />

                <div className="text-center relative z-10">
                  <span className="text-sm font-mono text-brand-primary tracking-widest">{`[ ${project.title.toUpperCase().replace(' ', '-')}-STABLE ]`}</span>
                  <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em] font-bold">Standard Operations</p>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-brand-primary font-bold tracking-tighter uppercase whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-xl text-white font-bold mb-4">{project.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-8 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between text-brand-primary">
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    Access Terminal <ArrowRight className="w-3 h-3" />
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
