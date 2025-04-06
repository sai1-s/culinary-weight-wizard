
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <div className="mb-6 text-center pt-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <ChefHat className="h-8 w-8 text-recipe" />
        <h1 className="text-3xl font-semibold text-recipe">Accura Bake</h1>
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Convert recipe measurements to precise gram weights. Paste your recipe or generate a new one.
      </p>
    </div>
  );
};

export default Header;
