import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Loader2, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type SimulationStep = 'idle' | 'userQuestion' | 'thinking' | 'analyzing' | 'result';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  step?: SimulationStep;
}

export default function ChatSimulator() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<SimulationStep>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start simulation after component mount
    const startTimer = setTimeout(() => {
      startSimulation();
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  const startSimulation = async () => {
    setIsAnimating(true);
    setMessages([]);
    setCurrentStep('idle');

    // Step 1: User asks question
    await delay(500);
    setCurrentStep('userQuestion');
    setMessages([{
      role: 'user',
      content: t('chatSimulator.userQuestion') || "What are players saying about the new update?"
    }]);

    // Step 2: Thinking
    await delay(1500);
    setCurrentStep('thinking');

    // Step 3: Analyzing
    await delay(2000);
    setCurrentStep('analyzing');

    // Step 4: Show result
    await delay(2500);
    setCurrentStep('result');
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: t('chatSimulator.assistantResponse') || "Based on 2,847 posts across Reddit, Steam, and Discord, the community sentiment is mixed (6.2/10). Main concerns: difficulty balance (68% of discussions). Positive feedback: boss mechanics praised universally. Top issue: rewards don't match difficulty.",
      step: 'result'
    }]);

    setIsAnimating(false);

    // Restart simulation after showing result
    await delay(8000);
    startSimulation();
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getStepIndicator = () => {
    switch (currentStep) {
      case 'thinking':
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{t('chatSimulator.thinking') || 'Thinking...'}</span>
          </div>
        );
      case 'analyzing':
        return (
          <div className="flex items-center gap-2 text-sm text-primary" aria-live="polite">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{t('chatSimulator.analyzing') || 'Analyzing 2,847 community posts...'}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="default" className="mb-4 bg-gradient-primary">
            {t('chatSimulator.badge') || 'AI Assistant'}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('chatSimulator.title') || 'Insight Assistant'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('chatSimulator.subtitle') || 'Ask questions about your game community and get instant insights'}
          </p>
        </div>

        {/* Chat Simulator */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 bg-card/50 border-border">
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{t('chatSimulator.assistantName') || 'Insight Assistant'}</h3>
                <p className="text-xs text-muted-foreground">
                  {t('chatSimulator.assistantStatus') || 'Online • Analyzing communities'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 min-h-[300px]" role="log" aria-label="Chat messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 animate-fade-in-up ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Step Indicator */}
              {(currentStep === 'thinking' || currentStep === 'analyzing') && (
                <div className="flex gap-3 animate-fade-in-up">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    {getStepIndicator()}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                {t('chatSimulator.note') || '💡 This is a simulation. Real assistant analyzes live community data.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
