import { useState, useEffect, useRef } from "react";
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
  ko: string;
  en: string;
  ja: string;
  response: {
    ko: string;
    en: string;
    ja: string;
  };
}

export default function ChatSimulator() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<SimulationStep>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSimulatingRef = useRef(false);

  const questions: Question[] = [
    {
      ko: '신규 업데이트에 대해 플레이어들은 어떻게 말하고 있나요?',
      en: 'What are players saying about the new update?',
      ja: '新しいパッチノートについてプレイヤーは何と言っていますか？',
      response: {
        ko: '레딧, 디시인사이드, 스팀커뮤니티의 2,847개 게시물을 분석한 결과, 커뮤니티 감정은 복합적입니다 (6.2/10). 주요 우려사항: 난이도 밸런스 (논의의 68%). 긍정적 피드백: 보스 메카닉이 보편적으로 칭찬받음.',
        en: 'Based on 2,847 posts across Reddit, DCInside, and Steam Community, the community sentiment is mixed (6.2/10). Main concerns: difficulty balance (68% of discussions). Positive feedback: boss mechanics praised universally.',
        ja: 'Reddit、DCインサイド、Steamコミュニティの2,847件の投稿を分析した結果、コミュニティの感情は複雑です（6.2/10）。主な懸念事項：難易度バランス（議論の68％）。肯定的なフィードバック：ボスメカニクスが普遍的に称賛されています。'
      }
    },
    {
      ko: '최근 가장 많이 언급되는 이슈는 무엇인가요?',
      en: 'What are the most mentioned issues recently?',
      ja: '最近最も言及されている問題は何ですか？',
      response: {
        ko: '네이버카페, 다음카페, 스팀커뮤니티의 1,523개 게시물 분석 결과, 상위 3개 이슈: 1) 서버 안정성 (42%), 2) 보상 시스템 (28%), 3) 매칭 시스템 (18%). 긍정 언급률 34.2%, 부정 언급률 51.8%로 개선이 필요합니다.',
        en: 'Analyzing 1,523 posts from Naver Cafe, Daum Cafe, and Steam Community, top 3 issues: 1) Server stability (42%), 2) Reward system (28%), 3) Matchmaking (18%). Positive mentions 34.2%, negative 51.8% - improvements needed.',
        ja: 'ネイバーカフェ、Daumカフェ、Steamコミュニティの1,523件の投稿を分析した結果、上位3つの問題：1）サーバー安定性（42％）、2）報酬システム（28％）、3）マッチングシステム（18％）。肯定的言及34.2％、否定的言及51.8％ - 改善が必要です。'
      }
    },
    {
      ko: '커뮤니티에서 가장 인기 있는 콘텐츠는 무엇인가요?',
      en: 'What content is most popular in the community?',
      ja: 'コミュニティで最も人気のあるコンテンツは何ですか？',
      response: {
        ko: '디시인사이드, 레딧, 다음카페의 3,124개 게시물 분석: 신규 캐릭터 관련 콘텐츠가 가장 높은 참여도 (평균 좋아요 156개). 팬아트 +89%, 공략 가이드 +67% 증가. 전체 긍정 감성 점수 7.8/10으로 매우 호의적입니다.',
        en: 'Analyzing 3,124 posts from DCInside, Reddit, and Daum Cafe: New character content has highest engagement (avg 156 likes). Fan art +89%, strategy guides +67% increase. Overall positive sentiment 7.8/10 - very favorable.',
        ja: 'DCインサイド、Reddit、Daumカフェの3,124件の投稿を分析：新キャラクター関連コンテンツが最も高いエンゲージメント（平均156いいね）。ファンアート+89％、攻略ガイド+67％増加。全体的な肯定的感情スコア7.8/10 - 非常に好意的です。'
      }
    }
  ];

  useEffect(() => {
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
  }, [language]); // Add language dependency

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
    const questionText = question[language as keyof Question] as string || question.en;
    const responseText = question.response[language as keyof typeof question.response] as string || question.response.en;

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

  const getStepIndicator = () => {
    const getAnalyzingText = () => {
      const counts = ['2,847', '1,523', '3,124'];
      const count = counts[currentQuestionIndex] || '2,847';
      
      if (language === 'ko') {
        return `${count}개의 커뮤니티 게시물 분석 중...`;
      } else if (language === 'ja') {
        return `${count}件のコミュニティ投稿を分析中...`;
      } else {
        return `Analyzing ${count} community posts...`;
      }
    };

    switch (currentStep) {
      case 'thinking':
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{language === 'ko' ? '생각 중...' : language === 'ja' ? '考え中...' : 'Thinking...'}</span>
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
                value={typingText}
                readOnly
                placeholder={currentStep === 'typing' ? '' : (language === 'ko' ? '질문을 입력하세요...' : language === 'ja' ? '質問を入力してください...' : 'Type your question...')}
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
              <p className="text-xs text-center text-muted-foreground">
                💡 {language === 'ko' ? '실제 어시스턴트는 라이브 커뮤니티 데이터를 분석합니다.' : 
                     language === 'ja' ? '実際のアシスタントはライブコミュニティデータを分析します。' :
                     'Real assistant analyzes live community data.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
