import { MessageCircle, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              MeanWhile
            </h3>
            <p className="text-muted-foreground">
              전 세계 게이머들의 목소리를 한 곳에서
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-muted-foreground hover:text-discord transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2024 MeanWhile. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for global gaming community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;