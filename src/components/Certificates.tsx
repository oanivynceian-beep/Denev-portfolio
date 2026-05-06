import React from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, Hash } from 'lucide-react';
import { CERTIFICATES } from '../constants';

const GlitchText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = React.useState(text);
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

export const Certificates = () => {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex items-center justify-between mb-12"
        >
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">
            <GlitchText text="Validated Accreditations" />
          </h3>
          <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-white/10 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card group relative overflow-hidden h-full flex flex-col border border-white/5 hover:border-brand-primary/30 transition-all duration-500"
            >
              {/* Certificate Image Preview */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-brand-primary/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-brand-primary/20">
                    <Award className="w-5 h-5 text-brand-primary" />
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4 flex flex-col flex-1 relative z-10">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors leading-tight uppercase tracking-tight">
                    {cert.title}
                  </h4>
                  <p className="text-brand-primary/70 text-xs font-mono uppercase tracking-[0.2em]">{cert.issuer}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                      <Calendar className="w-3 h-3 text-brand-primary/50" />
                      {cert.date}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                      <Hash className="w-3 h-3 text-brand-primary/50" />
                      ID: {cert.code}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Authenticated Card</span>
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono italic">
                    {`// CRT_${cert.code.slice(0, 4)}`}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
