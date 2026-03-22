import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TransmissionsSection from "@/components/TransmissionsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingAiChat from "@/components/FloatingAiChat";

const Index = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TransmissionsSection />
      <ContactSection />
      <Footer />
      <FloatingAiChat />
    </motion.div>
  );
};

export default Index;
