import { Card } from "@/components/ui/card";
import { Brain, Clock, TrendingUp } from "lucide-react";

const SolutionSection = () => {
  const solutions = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "AI 요약 & 번역",
      description: "글로벌 게임 커뮤니티의 모든 언어를 실시간으로 번역하고 핵심 내용을 요약합니다.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "통합 게임 타임라인",
      description: "여러 커뮤니티의 정보를 하나의 타임라인으로 통합하여 놓치는 소식이 없도록 합니다.",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "실시간 트렌드 감지",
      description: "AI가 게임 커뮤니티의 최신 이슈와 트렌드를 실시간으로 분석하고 알려드립니다.",
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            MeanWhile의 혁신적 해결책
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            AI 기술로 게임 커뮤니티의 모든 장벽을 허물다
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-neon group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-2xl ${solution.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {solution.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;