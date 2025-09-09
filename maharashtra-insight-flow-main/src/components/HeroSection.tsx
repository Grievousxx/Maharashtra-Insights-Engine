import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const HeroSection = () => {
  const scrollToEngine = () => {
    const engineSection = document.getElementById('interactive-engine');
    engineSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="hero-section relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(var(--brand-primary) / 0.03), hsl(var(--brand-primary) / 0.01)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="hero-content relative z-10">
        <div className="fade-in-up opacity-0">
          <h1 className="hero-title">
            Maharashtra Insights Engine
          </h1>
        </div>
        
        <div className="fade-in-up opacity-0 stagger-1">
          <p className="hero-subtitle">
            AI-powered answers, backed by real data. Ask complex questions about Maharashtra policy and current events and get clear, sourced responses.
          </p>
        </div>
        
        <div className="fade-in-up opacity-0 stagger-2">
          <Button 
            onClick={scrollToEngine}
            size="lg" 
            className="bg-brand-primary hover:bg-brand-primary-dark text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Explore the Engine
            <ChevronDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in-up opacity-0 stagger-3">
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};