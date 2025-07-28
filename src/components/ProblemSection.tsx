import { Card } from "@/components/ui/card";
import { MessageSquareX, Globe, AlertTriangle } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: <MessageSquareX className="w-8 h-8" />,
      title: "정보 파편화",
      description: "흩어진 커뮤니티, 놓치는 중요한 소식들"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "언어 장벽",
      description: "글로벌 게임 정보를 이해하기 어려운 현실"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "독성 문화",
      description: "건전한 소통이 어려운 게임 커뮤니티 환경"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            게이머들이 마주한 현실
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            전 세계 게이머들이 공통으로 경험하는 문제들
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card 
              key={index}
              className="p-8 bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-center">
                <div className="mb-6 text-secondary flex justify-center">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;