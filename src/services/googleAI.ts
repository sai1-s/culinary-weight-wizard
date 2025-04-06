
import { toast } from "sonner";

const API_KEY = "AIzaSyDc7s8UVC6Q4qlGYg255uvUFqwGoBGWYIs";

interface AnalyzeRecipeResponse {
  convertedRecipe: string;
  ingredients: {
    name: string;
    original: string;
    converted: string;
  }[];
  error?: string;
}

export async function analyzeRecipe(recipeText: string): Promise<AnalyzeRecipeResponse> {
  try {
    const prompt = `
You are a professional chef and nutrition expert. 
Your task is to analyze the following recipe and convert any measurements to precise gram weights.
Focus especially on converting measurements like cups, tablespoons, teaspoons, etc. into grams.

For common ingredients, use these conversion guidelines:
- 1 cup all-purpose flour = 120g
- 1 cup granulated sugar = 200g
- 1 cup brown sugar = 220g
- 1 cup butter = 227g
- 1 cup milk = 245g
- 1 tablespoon = 15ml
- 1 teaspoon = 5ml
- 1 stick of butter = 113g
- 1 cup rice (uncooked) = 185g
- 1 cup oats = 90g

Original Recipe:
${recipeText}

Return a JSON response with the following structure:
{
  "convertedRecipe": "The full recipe with all measurements converted to grams where appropriate",
  "ingredients": [
    {
      "name": "ingredient name",
      "original": "original measurement (e.g., 1 cup sugar)",
      "converted": "converted measurement (e.g., 200g sugar)"
    }
  ]
}

Make sure to include ALL ingredients from the original recipe in your analysis.
Always provide the most accurate gram conversions possible.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Handle potential errors in response
    if (!data.candidates || data.candidates.length === 0) {
      console.error("No candidates in response:", data);
      return {
        convertedRecipe: "Error analyzing recipe. Please try again.",
        ingredients: [],
        error: "No response from AI"
      };
    }

    // Extract the text from the response
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Try to parse JSON from the text response
    try {
      // Find JSON object in the text - sometimes the AI wraps it with backticks or other text
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        const parsedResponse = JSON.parse(jsonString);
        return parsedResponse;
      } else {
        console.error("Couldn't find JSON in response:", textResponse);
        return {
          convertedRecipe: textResponse,
          ingredients: [],
        };
      }
    } catch (e) {
      console.error("Error parsing JSON from response:", e);
      console.log("Original response:", textResponse);
      
      // If we can't parse JSON, return the text as is
      return {
        convertedRecipe: textResponse,
        ingredients: [],
      };
    }
  } catch (error) {
    console.error("Error analyzing recipe:", error);
    toast.error("Failed to analyze recipe. Please try again.");
    throw error;
  }
}

export async function generateRecipe(): Promise<AnalyzeRecipeResponse> {
  try {
    const prompt = `
Generate a detailed food recipe with accurate measurements. 
Include precise weight measurements in grams for all ingredients.
The recipe should have:
1. A title
2. List of ingredients with measurements in both traditional (cups, tbsp) and precise (grams) formats
3. Step-by-step cooking instructions
4. Cooking time and servings

Make the recipe interesting, delicious, and something people would actually want to cook.

Return a JSON response with the following structure:
{
  "convertedRecipe": "The full recipe with all measurements clearly indicated",
  "ingredients": [
    {
      "name": "ingredient name",
      "original": "traditional measurement (e.g., 1 cup sugar)",
      "converted": "precise measurement (e.g., 200g sugar)"
    }
  ]
}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the text from the response
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Try to parse JSON from the text response
    try {
      // Find JSON object in the text
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        const parsedResponse = JSON.parse(jsonString);
        return parsedResponse;
      } else {
        console.error("Couldn't find JSON in response:", textResponse);
        return {
          convertedRecipe: textResponse,
          ingredients: [],
        };
      }
    } catch (e) {
      console.error("Error parsing JSON from response:", e);
      
      // If we can't parse JSON, return the text as is
      return {
        convertedRecipe: textResponse,
        ingredients: [],
      };
    }
  } catch (error) {
    console.error("Error generating recipe:", error);
    toast.error("Failed to generate recipe. Please try again.");
    throw error;
  }
}
