import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { InteractiveEngine } from "@/components/InteractiveEngine";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Trigger hero animations on page load
    const timer = setTimeout(() => {
      const heroElements = document.querySelectorAll('.fade-in-up.opacity-0');
      heroElements.forEach((el) => {
        el.classList.remove('opacity-0');
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <InteractiveEngine />
    </main>
  );
};

export default Index;