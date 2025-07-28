import { Card } from "@/components/ui/card";
import { Shield, BarChart3, Clock, Lightbulb } from "lucide-react";

const PartnerSection = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "실시간 버그 감지",
      description: "커뮤니티 반응을 통해 게임 이슈를 조기에 발견하고 대응하세요"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "여론 분석",
      description: "플레이어들의 실제 목소리를 데이터로 분석하여 게임 개선에 활용하세요"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "운영 효율성",
      description: "AI 자동화로 커뮤니티 관리 비용을 절감하고 효율성을 높이세요"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "인사이트 제공",
      description: "글로벌 게이머들의 트렌드와 선호도를 실시간으로 파악하세요"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            게임사를 위한 특별한 가치
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            MeanWhile과 파트너십으로 게임 운영의 새로운 차원을 경험하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-accent flex-shrink-0 mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;