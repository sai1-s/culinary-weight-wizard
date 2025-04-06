
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeRecipe, generateRecipe } from "@/services/googleAI";
import { Loader2, ChefHat, Utensils } from "lucide-react";
import { toast } from "sonner";
import RecipeResult from "./RecipeResult";

export interface IngredientConversion {
  name: string;
  original: string;
  converted: string;
}

export interface RecipeData {
  convertedRecipe: string;
  ingredients: IngredientConversion[];
}

const RecipeForm = () => {
  const [recipeText, setRecipeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);

  const handleAnalyzeClick = async () => {
    if (!recipeText.trim()) {
      toast.error("Please enter a recipe first!");
      return;
    }

    setIsLoading(true);
    try {
      const data = await analyzeRecipe(recipeText);
      setRecipeData(data);
      toast.success("Recipe analyzed successfully!");
    } catch (error) {
      console.error("Error in recipe analysis:", error);
      toast.error("Failed to analyze recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const data = await generateRecipe();
      setRecipeData(data);
      toast.success("Recipe generated successfully!");
    } catch (error) {
      console.error("Error in recipe generation:", error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="recipe-card w-full max-w-4xl mx-auto">
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-medium">Enter Your Recipe</h2>
        <Textarea
          placeholder="Paste your recipe here... (e.g., 1 cup flour, 2 tablespoons sugar...)"
          className="min-h-40 resize-y text-base"
          value={recipeText}
          onChange={(e) => setRecipeText(e.target.value)}
          disabled={isLoading}
        />
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleAnalyzeClick} 
            disabled={isLoading}
            className="bg-recipe hover:bg-recipe/90"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Utensils className="mr-2 h-4 w-4" />}
            Convert Measurements
          </Button>
          <Button 
            onClick={handleGenerateClick} 
            variant="outline" 
            disabled={isLoading}
            className="border-recipe text-recipe hover:bg-recipe/10"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ChefHat className="mr-2 h-4 w-4" />}
            Generate Recipe
          </Button>
        </div>
      </div>

      {recipeData && (
        <RecipeResult recipeData={recipeData} />
      )}
    </div>
  );
};

export default RecipeForm;
