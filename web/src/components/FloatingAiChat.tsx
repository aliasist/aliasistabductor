import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ShieldAlert } from "lucide-react";
import AiChatAssistant from "./AiChatAssistant";
import chatIcon from "../assets/chat.svg";

const FloatingAiChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right", rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, rotate: 2 }}
            transition={{ type: "spring", damping: 20, stiffness: 250 }}
            className="mb-4 w-[380px] sm:w-[420px] max-w-[calc(100vw-3rem)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-none overflow-hidden border-2 border-electric/40 bg-zinc-950 relative"
          >
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,.25)_50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))] bg-[length:100%_2px,3px_100%]" />
            
            <div className="bg-zinc-900 border-b-2 border-electric/20 p-3 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-electric/30 animate-pulse" />
              
              <div className="flex items-center gap-2 z-20">
                <div className="p-1 bg-electric/10 rounded-full">
                  {/* Keeping saucer/alien head for the internal header icon as it's part of the brand */}
                  <div className="w-[22px] h-[22px] flex items-center justify-center">
                    <img src={chatIcon} alt="Chat" className="w-full h-full brightness-0 invert opacity-80" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric leading-none">Accessing Neural Link</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">Auth Level: Classified</span>
                </div>
              </div>

              <div className="flex items-center gap-3 z-20">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 border border-red-500/30 bg-red-500/5">
                  <ShieldAlert size={10} className="text-red-500 animate-pulse" />
                  <span className="font-mono text-[8px] uppercase font-bold text-red-500 tracking-tighter">Top Secret</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-electric transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="h-[500px] bg-zinc-950 text-foreground relative">
              <AiChatAssistant isFloating={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 border-2 group relative overflow-hidden ${
          isOpen 
            ? "bg-zinc-900 text-electric border-electric shadow-[0_0_30px_rgba(16,185,129,0.4)]" 
            : "bg-zinc-950 text-electric border-electric/30 hover:border-electric"
        }`}
      >
        {/* Glow inner */}
        <div className={`absolute inset-0 bg-electric/5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        
        {isOpen ? (
          <X size={28} />
        ) : (
          <img 
            src={chatIcon} 
            alt="AI Chat" 
            className="w-10 h-10 relative z-10 brightness-0 invert" 
            style={{ filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))" }}
          />
        )}
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-electric flex items-center justify-center">
              <Zap size={10} className="text-zinc-950 fill-zinc-950" />
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingAiChat;
