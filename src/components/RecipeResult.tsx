
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type RecipeData } from "./RecipeForm";
import { Scale } from "lucide-react";

const RecipeResult = ({ recipeData }: { recipeData: RecipeData }) => {
  const formatRecipe = (recipe: string) => {
    // Attempt to identify and format sections in the recipe
    const formattedRecipe = recipe
      .replace(/\n\n/g, '<div class="mb-4"></div>')
      .replace(/\n/g, '<br />')
      .replace(
        /^(#+\s.*)|(?:\n)(#+\s.*)/g, 
        (match, p1, p2) => `<h3 class="text-lg font-semibold my-3">${p1 || p2}</h3>`
      )
      .replace(
        /^(\*\*.*\*\*)|(?:\n)(\*\*.*\*\*)/g,
        (match, p1, p2) => `<h4 class="text-md font-semibold my-2">${(p1 || p2).replace(/\*\*/g, '')}</h4>`
      );
      
    return formattedRecipe;
  };

  const extractTitle = (recipe: string): string => {
    // Try to find a title in the recipe
    const titleMatch = recipe.match(/^#\s(.+)$|^(.+?)\n/m);
    return titleMatch ? titleMatch[1] || titleMatch[2] : "Converted Recipe";
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4 flex items-center">
        <Scale className="mr-2 h-5 w-5 text-recipe" />
        {extractTitle(recipeData.convertedRecipe)}
      </h2>
      
      <Tabs defaultValue="converted" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="converted">Converted Recipe</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredient Conversions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="converted" className="min-h-[300px]">
          <Card className="p-4 bg-white/50 min-h-[300px]">
            <ScrollArea className="h-[500px] pr-4">
              <div 
                className="recipe-content"
                dangerouslySetInnerHTML={{ __html: formatRecipe(recipeData.convertedRecipe) }}
              />
            </ScrollArea>
          </Card>
        </TabsContent>
        
        <TabsContent value="ingredients" className="min-h-[300px]">
          <Card className="p-4 bg-white/50 min-h-[300px]">
            {recipeData.ingredients && recipeData.ingredients.length > 0 ? (
              <div className="space-y-2">
                {recipeData.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{ingredient.name}</span>
                      <Badge variant="outline" className="bg-recipe-accent/10 text-recipe-text border-recipe-accent">
                        {ingredient.converted}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Original: {ingredient.original}
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <p>No specific ingredient conversions available.</p>
                <p className="text-sm mt-2">View the converted recipe for full details.</p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeResult;
