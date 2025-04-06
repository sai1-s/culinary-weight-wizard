
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-center py-6 text-sm text-muted-foreground mt-8">
      <p className="mb-1">© {new Date().getFullYear()} Culinary Weight Wizard</p>
      <p>Powered by Google AI</p>
    </footer>
  );
};

export default Footer;
