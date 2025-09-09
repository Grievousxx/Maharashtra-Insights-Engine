// InteractiveEngine.tsx - FINAL VERSION

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Search, FileText } from "lucide-react";

export const InteractiveEngine = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    answer?: string;
    sources?: Array<{ title: string; content: string; }>;
  } | null>(null);

  const exampleQuestions = [
    "What incentives does the Industrial Policy of 2013 offer?",
    "What is the latest news on the Mumbai Trans Harbour Sea Link?",
    "Are there any special provisions for IT parks in Maharashtra?",
  ];

  const handleExampleClick = (question: string) => {
    setQuery(question);
    handleSubmit(question); // Automatically submit when an example is clicked
  };

  // --- THIS IS THE NEW, LIVE ENGINE ---
  const handleSubmit = async (questionToSubmit?: string) => {
    const finalQuery = questionToSubmit || query;
    if (!finalQuery.trim()) return;

    setIsLoading(true);
    setResults(null);

    try {
        // This is the REAL API call to your live engine
        const response = await fetch('https://grievousxx-maharashtra-insights-engine.hf.space/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: finalQuery }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        // The backend sends back { answer: "...", sources: ["...", "...", "..."] }
        const data = await response.json();
        
        // This part transforms the simple string array from your backend
        // into the { title, content } array that your beautiful UI expects.
        const formattedSources = data.sources.map((sourceText: string, index: number) => ({
            title: `Retrieved Source ${index + 1}`,
            content: sourceText
        }));

        setResults({
            answer: data.answer,
            sources: formattedSources
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        setResults({
            answer: "Sorry, an error occurred. The server might be asleep or busy. Please try again in a moment.",
            sources: []
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <section id="interactive-engine" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Interactive Engine
          </h2>
          <p className="text-xl text-muted-foreground">
            Ask complex questions and get intelligent, sourced responses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Query Input Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-heading font-semibold mb-4">
                Ask a Question
              </h3>
              
              <Textarea
                placeholder="e.g., What incentives does the Industrial Policy of 2013 offer?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[120px] text-base resize-none custom-scrollbar"
              />
              
              <Button
                onClick={() => handleSubmit()}
                disabled={!query.trim() || isLoading}
                className="w-full mt-4 bg-brand-primary hover:bg-brand-primary-dark text-primary-foreground"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Insights...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Generate Insights
                  </>
                )}
              </Button>
            </Card>

            {/* Example Questions */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-muted-foreground">
                Try these examples:
              </h4>
              <div className="grid gap-2">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="example-pill text-left"
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {!results && !isLoading && (
              <Card className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">
                  Your generated insights will appear here.
                </p>
              </Card>
            )}

            {isLoading && (
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="shimmer h-6 rounded"></div>
                  <div className="shimmer h-4 rounded w-3/4"></div>
                  <div className="shimmer h-4 rounded w-1/2"></div>
                </div>
              </Card>
            )}

            {results && (
              <div className="space-y-6 fade-in-up">
                {/* Main Answer */}
                <Card className="p-6 insight-card">
                  <h4 className="text-xl font-heading font-semibold mb-4 text-brand-primary">
                    Generated Answer
                  </h4>
                  <p className="leading-relaxed text-card-foreground">
                    {results.answer}
                  </p>
                </Card>

                {/* Sources */}
                {results.sources && results.sources.length > 0 && (
                  <div>
                    <h4 className="text-xl font-heading font-semibold mb-4">
                      Sources Found
                    </h4>
                    <div className="space-y-4">
                      {results.sources.map((source, index) => (
                        <Card key={index} className="p-4 insight-card">
                          <div className="flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-brand-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold mb-2 text-sm text-brand-primary">
                                {source.title}
                              </h5>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {source.content}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};