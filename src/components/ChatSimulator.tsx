import { useState, useEffect, useRef, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, User, Loader2, Sparkles, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type SimulationStep = 'idle' | 'typing' | 'userQuestion' | 'thinking' | 'analyzing' | 'result';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  step?: SimulationStep;
}

interface Question {
  text: string;
  response: string;
}

export default function ChatSimulator() {
  const { t, language, loading } = useLanguage();
  const [currentStep, setCurrentStep] = useState<SimulationStep>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSimulatingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const questions: Question[] = useMemo(() => {
    if (loading) {
      return [];
    }
    return [
      {
        text: t('landing.chatSimulator.questions.question1.text'),
        response: t('landing.chatSimulator.questions.question1.response')
      },
      {
        text: t('landing.chatSimulator.questions.question2.text'),
        response: t('landing.chatSimulator.questions.question2.response')
      },
      {
        text: t('landing.chatSimulator.questions.question3.text'),
        response: t('landing.chatSimulator.questions.question3.response')
      }
    ];
  }, [t, language, loading]);

  useEffect(() => {
    // Don't start simulation if still loading or questions not ready
    if (loading || questions.length === 0) {
      return;
    }
    
    // Clear any existing simulation when language changes
    isSimulatingRef.current = false;
    if (simulationTimerRef.current) {
      clearTimeout(simulationTimerRef.current);
      simulationTimerRef.current = null;
    }
    
    // Reset state
    setMessages([]);
    setCurrentStep('idle');
    setTypingText('');
    setIsAnimating(false);
    setCurrentQuestionIndex(0);
    
    // Start new simulation after component mount or language change
    const startTimer = setTimeout(() => {
      startSimulation();
    }, 1000);

    return () => {
      isSimulatingRef.current = false;
      clearTimeout(startTimer);
      if (simulationTimerRef.current) {
        clearTimeout(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
    };
  }, [language, loading, questions]); // Add loading and questions dependencies

  const startSimulation = async () => {
    // Set simulation flag to true
    isSimulatingRef.current = true;
    setIsAnimating(true);
    setMessages([]);
    setCurrentQuestionIndex(0);
    
    // Process all 3 questions
    for (let i = 0; i < questions.length; i++) {
      // Check if simulation was cancelled
      if (!isSimulatingRef.current) {
        return;
      }
      
      setCurrentQuestionIndex(i);
      await processQuestion(questions[i]);
      
      // Check again after processing
      if (!isSimulatingRef.current) {
        return;
      }
      
      // Pause between questions (except after last one)
      if (i < questions.length - 1) {
        await delay(2000);
      }
    }

    setIsAnimating(false);

    // Check before restarting
    if (!isSimulatingRef.current) {
      return;
    }

    // Restart simulation after showing all results
    simulationTimerRef.current = setTimeout(() => {
      if (isSimulatingRef.current) {
        startSimulation();
      }
    }, 10000);
  };

  const processQuestion = async (question: Question) => {
    const questionText = question.text;
    const responseText = question.response;

    // Step 1: Show typing animation in input
    setCurrentStep('typing');
    setTypingText('');
    
    // Type out the question character by character
    for (let i = 0; i <= questionText.length; i++) {
      // Check if simulation was cancelled
      if (!isSimulatingRef.current) {
        return;
      }
      setTypingText(questionText.slice(0, i));
      await delay(50); // 50ms per character
    }

    // Check if simulation was cancelled
    if (!isSimulatingRef.current) {
      return;
    }

    // Step 2: "Send" the message
    await delay(300);
    
    if (!isSimulatingRef.current) {
      return;
    }
    
    setCurrentStep('userQuestion');
    setMessages(prev => [...prev, {
      role: 'user',
      content: questionText
    }]);
    setTypingText('');

    // Step 3: Thinking
    await delay(800);
    
    if (!isSimulatingRef.current) {
      return;
    }
    
    setCurrentStep('thinking');

    // Step 4: Analyzing
    await delay(1500);
    
    if (!isSimulatingRef.current) {
      return;
    }
    
    setCurrentStep('analyzing');

    // Step 5: Show result
    await delay(2000);
    
    if (!isSimulatingRef.current) {
      return;
    }
    
    setCurrentStep('result');
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: responseText,
      step: 'result'
    }]);

    await delay(500);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStep]);

  // Auto-scroll input to show typing text on mobile
  useEffect(() => {
    if (inputRef.current && currentStep === 'typing' && typingText) {
      // Scroll to the end of the input to show what's being typed
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [typingText, currentStep]);

  const getStepIndicator = () => {
    const getAnalyzingText = () => {
      const counts = ['2,847', '1,523', '3,124'];
      const count = counts[currentQuestionIndex] || '2,847';
      
      return t('landing.chatSimulator.analyzingTemplate').replace('{count}', count);
    };

    switch (currentStep) {
      case 'thinking':
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{t('landing.chatSimulator.thinking')}</span>
          </div>
        );
      case 'analyzing':
        return (
          <div className="flex items-center gap-2 text-sm text-primary" aria-live="polite">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>{getAnalyzingText()}</span>
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
            {t('landing.chatSimulator.badge') || 'AI Assistant'}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line">
            {t('landing.chatSimulator.title') || 'Insight Assistant'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">
            {t('landing.chatSimulator.subtitle') || 'Ask questions about your game community and get instant insights'}
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
                <h3 className="font-semibold">{t('landing.chatSimulator.assistantName') || 'Insight Assistant'}</h3>
                <p className="text-xs text-muted-foreground">
                  {t('landing.chatSimulator.assistantStatus') || 'Online • Analyzing communities'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className={`space-y-4 h-[300px] md:h-[350px] overflow-y-auto transition-all duration-500 scroll-smooth scrollbar-hide ${
                currentStep === 'typing' ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`} 
              role="log" 
              aria-label="Chat messages"
            >
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

            {/* Input Area with Typing Animation */}
            <div className={`mt-4 flex gap-2 transition-all duration-500 ${
              currentStep === 'typing' ? 'scale-110 shadow-lg' : 'scale-100'
            }`}>
              <Input
                ref={inputRef}
                value={typingText}
                readOnly
                placeholder={currentStep === 'typing' ? '' : t('landing.chatSimulator.inputPlaceholder')}
                className={`flex-1 transition-all duration-300 ${
                  currentStep === 'typing' ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
              />
              <Button 
                size="icon" 
                disabled={currentStep !== 'typing' || typingText.length === 0}
                className={`transition-all duration-300 ${
                  currentStep === 'typing' && typingText.length > 0 ? 'bg-primary scale-110' : ''
                }`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground whitespace-pre-line">
                {t('landing.chatSimulator.note')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
