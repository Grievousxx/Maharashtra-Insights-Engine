import { Search, Database, Brain } from "lucide-react";
import { useAutoAnimate } from "@/hooks/useIntersectionObserver";

export const HowItWorksSection = () => {
  const animateRef = useAutoAnimate();
  
  const features = [
    {
      icon: Search,
      title: "Ask Anything",
      description: "Pose your question in natural language."
    },
    {
      icon: Database,
      title: "AI Retrieves Sources", 
      description: "The model scans a vast corpus of policy documents and news articles."
    },
    {
      icon: Brain,
      title: "Get a Synthesized Answer",
      description: "Receive a clear answer, complete with the original source links for verification."
    }
  ];

  return (
    <section ref={animateRef} className="py-24 px-6 bg-surface-secondary opacity-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our sophisticated AI pipeline combines advanced retrieval with intelligent synthesis to deliver accurate, well-sourced insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="feature-card"
              >
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-brand-primary" />
                </div>
                
                <h3 className="text-xl font-heading font-semibold mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};