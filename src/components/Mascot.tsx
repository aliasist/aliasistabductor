import { motion } from "framer-motion";
import roswellUFO from "@/assets/roswell.png";

/**
 * Mascot — the Aliasist UFO spaceship mascot.
 * Floats with a gentle bobbing animation and a subtle teal glow.
 */
const Mascot = () => {
  return (
    <motion.div
      className="pointer-events-none select-none"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.img
        src={roswellUFO}
        alt="Aliasist UFO mascot"
        className="w-28 h-28 object-contain"
        style={{
          filter:
            "drop-shadow(0 0 18px hsl(165 90% 42% / 0.55)) drop-shadow(0 0 6px hsl(165 90% 42% / 0.3))",
        }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </motion.div>
  );
};

export default Mascot;
