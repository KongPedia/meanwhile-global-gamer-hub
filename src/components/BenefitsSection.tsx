import { Card } from "@/components/ui/card";
import { Zap, Users, Search, Heart } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "빠른 탐색",
      description: "원하는 게임 정보를 빠르게 찾아보세요"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "번역 지원",
      description: "언어의 제약 없이 전 세계 게이머와 소통하세요"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "커뮤니티 연결",
      description: "같은 관심사를 가진 게이머들과 연결되세요"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "건전한 문화",
      description: "AI가 필터링한 건전한 게임 커뮤니티를 경험하세요"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            눈팅 유저도 글로벌 게이머가 됩니다
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            MeanWhile과 함께 게임 커뮤니티의 새로운 경험을 시작하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="mb-4 text-primary flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;