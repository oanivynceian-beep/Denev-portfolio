import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, MapPin, Send, Terminal as TerminalIcon } from 'lucide-react';
import { EXPERIENCE, USER_INFO } from '../constants';

export const Timeline = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false }}
          className="flex items-center justify-between mb-12 origin-left"
        >
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">Latest Experience</h3>
          <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-white/10 to-transparent"></div>
        </motion.div>

        <div className="glass-card p-10 flex flex-col gap-8">
          {EXPERIENCE.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center gap-6 group"
            >
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: index === 0 ? 56 : 48 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
                className={`w-1 rounded-full transition-colors ${index === 0 ? 'bg-brand-primary' : 'bg-slate-800'}`} 
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h5 className={`text-lg font-bold transition-colors ${index === 0 ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{exp.role}</h5>
                  <span className={`px-3 py-1 text-[9px] uppercase tracking-tighter border rounded font-bold ${
                    index === 0 ? 'border-brand-primary/30 text-brand-primary' : 'border-white/5 text-slate-500'
                  }`}>
                    {index === 0 ? 'Lead' : 'Historical'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-1 uppercase tracking-widest leading-none">
                  {exp.company} <span className="mx-2">•</span> {exp.period}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 atmos-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="glass-card grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        >
          <div className="p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-light text-white mb-6 leading-tight"
            >
              Initiate <span className="text-brand-primary font-bold">Connection</span>
            </motion.h2>
            <p className="text-slate-400 mb-12 max-w-sm text-sm leading-relaxed">
              Seeking specialized technical oversight? Deploy a request to discuss your systems architecture.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email Primary', value: USER_INFO.email },
                { icon: MapPin, label: 'Operations Hub', value: USER_INFO.location }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-primary/50 transition-all">
                    <item.icon className="w-5 h-5 text-slate-500 group-hover:text-brand-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.2em] mb-1">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="p-12 space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] ml-1">Ident</label>
                <input 
                  type="text" 
                  placeholder="ID_NAME"
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-4 text-xs text-white focus:border-brand-primary/50 focus:outline-none transition-all placeholder:text-slate-700 font-mono"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] ml-1">Route</label>
                <input 
                  type="email" 
                  placeholder="ID_EMAIL"
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-4 text-xs text-white focus:border-brand-primary/50 focus:outline-none transition-all placeholder:text-slate-700 font-mono"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] ml-1">Payload</label>
              <textarea 
                rows={4}
                placeholder="Transmission details..."
                className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-4 text-xs text-white focus:border-brand-primary/50 focus:outline-none transition-all placeholder:text-slate-700 font-mono resize-none"
              />
            </div>
            
            <button className="w-full py-5 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-brand-primary transition-all group active:scale-95">
              Push Message
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
        
        <footer className="mt-24 pb-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded rotate-12 flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              <TerminalIcon className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-medium text-xs tracking-[0.3em] text-white uppercase">{USER_INFO.name}.SYS</span>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">Status: Operational</span>
            </div>
            <div className="flex gap-8">
              <a href={USER_INFO.github} className="text-slate-500 hover:text-brand-primary transition-colors font-bold text-[10px] uppercase tracking-widest">Github</a>
              <a href={USER_INFO.linkedin} className="text-slate-500 hover:text-brand-primary transition-colors font-bold text-[10px] uppercase tracking-widest">LinkedIn</a>
            </div>
          </div>
          
          <p className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.3em]">
            © 2024 Nexus Operations. ARCH.V2
          </p>
        </footer>
      </div>
    </section>
  );
};
