import { motion } from "framer-motion";
import saucerIcon from "@/assets/saucer.svg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(165_90%_42%_/_0.05)_0%,_transparent_65%)]" />

      <div className="absolute top-24 right-6 sm:right-12 hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground border border-border px-3 py-1.5 opacity-60">
        <img src={saucerIcon} alt="" className="w-4 h-4 opacity-80" />
        Artificial Artifacts // Mission Log
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="block w-8 h-px bg-electric" />
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-electric">
              AI Security & Adversarial Defense
            </p>
            <span className="block w-8 h-px bg-electric" />
          </motion.div>

          <h1
            className="glitch-text text-6xl sm:text-8xl md:text-[9rem] font-bold tracking-tight text-foreground mb-8 leading-none"
            data-text="ALIASIST"
          >
            ALIASIST
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xl sm:text-2xl font-medium text-foreground/85 mb-3 tracking-wide">
              Open Source Security & Software Development (AIdevOps) 
            </p>
            <p className="text-sm font-mono text-muted-foreground mb-14 tracking-[0.08em]">
              // Currently in development... but stay tuned!
            </p>
          </motion.div>
          .
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-3.5 bg-foreground text-background font-mono text-xs uppercase tracking-[0.1em] rounded-sm hover:bg-foreground/85 transition-all hover:-translate-y-0.5"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-border text-foreground font-mono text-xs uppercase tracking-[0.1em] rounded-sm hover:border-electric/50 hover:text-electric transition-all hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
