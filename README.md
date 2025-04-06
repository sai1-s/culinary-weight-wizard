# Accurabake 



## Description

Accurabake, is a web application designed to simplify baking and cooking by converting common recipe measurements (like cups, tablespoons, etc.) into precise gram weights. This ensures accuracy in your recipes, leading to consistent and delicious results every time.

This project is built with modern web technologies and aims to be user-friendly and accessible for all cooking enthusiasts.

## Features

*   **Measurement Conversion:** Easily convert recipe ingredients from volume measurements (cups, tablespoons, teaspoons, etc.) to grams.
*   **Precise Gram Weights:** Get accurate gram measurements for various ingredients, improving recipe precision.
*   **User-Friendly Interface:**  A clean and intuitive design for easy navigation and use.
*   **Responsive Design:** Works seamlessly on various devices, from desktops to mobile phones.

## Getting Started

This is a front-end web application, and you can run it in any modern web browser.

### Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge, etc.)

### Usage

1.  **Open in Browser:** Simply open the `index.html` file (if you have a local copy of the project) in your web browser, or navigate to the deployed website URL (if available).
2.  **Interact with the Application:** Use the input fields and dropdowns on the webpage (once the application is fully implemented in `src/main.tsx`) to enter your recipe measurements and get the gram equivalents.

## Functionality (Based on Project Intent)

While the provided HTML only sets up the basic structure, the core functionality is expected to be implemented in the `src/main.tsx` file. Here's a breakdown of the functions we anticipate in the complete application:

**(Note:** The actual function names and implementation might differ in `src/main.tsx`. This is based on the project's described purpose.)

### 1. `measurementConversion` (Hypothetical Function Name)

This function is the heart of Accurabake. It will take the user's input for measurement unit and quantity, and convert it into grams.

**Expected Parameters:**

*   `unit`:  A string representing the measurement unit (e.g., "cup", "tablespoon", "ml").
*   `quantity`: A number representing the amount of the measurement unit.
*   `ingredient` (Optional): A string representing the ingredient name (e.g., "flour", "sugar"). This might be used to fetch ingredient-specific density for more accurate conversions, especially for volume-to-weight conversions.

**Expected Return Value:**

*   A number representing the equivalent weight in grams.
*   Potentially an object containing the gram weight and the ingredient name for display purposes.

**Example Usage (Hypothetical - based on anticipated UI):**

Imagine you have input fields on the webpage:

*   **Input 1:**  Quantity: `1`
*   **Dropdown 1:** Unit: `cup`
*   **Dropdown 2 (Optional):** Ingredient: `All Purpose Flour`

The `measurementConversion` function would be called internally (likely triggered by an event like button click or input change) to calculate the gram weight of 1 cup of all-purpose flour.

### 2. `displayConversionResult` (Hypothetical Function Name)

This function would be responsible for taking the gram weight calculated by `measurementConversion` and displaying it to the user in the web interface.

**Expected Parameters:**

*   `grams`:  A number representing the calculated gram weight.
*   `ingredient` (Optional): A string representing the ingredient name, for context in the display.
*   `unit` (Optional): The original unit for display context.
*   `quantity` (Optional): The original quantity for display context.


