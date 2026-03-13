import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
  "Awakening the interface...",
  "Polishing pixels ✨",
  "Sprinkling some magic...",
  "Almost ready for you."
];

export function GlobalPreloader() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2800); 
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setTextIndex(prev => (prev + 1) % loadingTexts.length);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 backdrop-blur-3xl overflow-hidden font-sans selection:bg-none"
        >
          {/* Ambient Pastel Glows for that elegant, "expensive" feel */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
             <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-blue-100 via-indigo-50 to-purple-100 rounded-full blur-[80px] opacity-70"
             />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Playful yet Professional Main Element: Floating Prism */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-32 h-32 mb-10 flex items-center justify-center"
            >
               {/* Behind the glass glow */}
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 rounded-full blur-xl opacity-50"
               />
               
               {/* Glass morphed shape */}
               <motion.div 
                 animate={{
                   borderRadius: [
                     "40% 60% 70% 30% / 40% 50% 60% 50%", 
                     "60% 40% 30% 70% / 60% 30% 70% 40%", 
                     "40% 60% 70% 30% / 40% 50% 60% 50%"
                   ]
                 }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden"
               >
                 {/* Internal sweeping sheen */}
                 <motion.div 
                   animate={{ x: ['-200%', '200%'] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                   className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
                 />
                 
                 <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-900 drop-shadow-sm font-serif italic pr-1">
                   D
                 </span>
               </motion.div>
            </motion.div>

            {/* Elegant Changing Text Pill */}
            <motion.div 
              layout
              className="bg-white/80 backdrop-blur-md border border-slate-100/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] rounded-full px-8 py-3.5 flex items-center gap-4 relative overflow-hidden"
            >
               {/* Minimal Loading Spinner inside the pill */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-blue-500 border-r-blue-500"
               />
               
               <div className="h-5 flex items-center overflow-hidden min-w-[170px] relative pointer-events-none">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={textIndex}
                     initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                     animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                     exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                     transition={{ duration: 0.3 }}
                     className="text-slate-600 font-medium text-sm tracking-wide absolute w-full font-sans"
                   >
                     {loadingTexts[textIndex]}
                   </motion.div>
                 </AnimatePresence>
               </div>
            </motion.div>

            {/* Bottom Progress elegant mini-bar */}
            <div className="mt-8 w-12 h-1 bg-slate-200/50 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full h-full bg-slate-400 rounded-full"
               />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
