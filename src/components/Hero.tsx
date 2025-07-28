import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gaming.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            전 세계 게이머들의
            <br />
            목소리를 한 곳에서
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            MeanWhile은 글로벌 게임 커뮤니티 데이터를 AI로 요약·번역해 Discord에서 공유합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="discord" 
              size="lg"
              className="animate-pulse-neon text-lg px-8 py-4"
            >
              Discord 커뮤니티 합류하기
            </Button>
            
            <Button 
              variant="neon" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              더 알아보기
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;