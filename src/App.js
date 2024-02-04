import React, { useState } from 'react';
import './App.css';

function App() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showRecipeDialog, setShowRecipeDialog] = useState(false);
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('recipes')) || []);
  const [recipeName, setRecipeName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [direction, setDirection] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to handle clicking the "Add" button
  const handleAddButtonClick = () => {
    setShowAddDialog(true);
  };

  // Function to handle clicking on a recipe
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDialog(true);
  };

  // Function to handle adding or updating a recipe
  const handleAddRecipe = () => {
    const newRecipe = {
      name: recipeName,
      ingredients: ingredient.split(',').map(item => item.trim()),
      directions: direction
    };
  
    // Check if a recipe with the same name already exists
    const existingRecipeIndex = recipes.findIndex(recipe => recipe.name === recipeName);
  
    if (existingRecipeIndex !== -1) {
      // If the recipe already exists, update it
      const updatedRecipes = [...recipes];
      updatedRecipes[existingRecipeIndex] = newRecipe;
      setRecipes(updatedRecipes);
    } else {
      // If the recipe doesn't exist, add it to the recipes array
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);
    }
  
    // Save updated recipes to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    // Reset input fields
    setRecipeName('');
    setIngredient('');
    setDirection('');
  
    // Close the add recipe dialog
    setShowAddDialog(false);
  };

  // Function to handle resetting the "Add Recipe" dialog
  const handleResetAddDialog = () => {
    setRecipeName('');
    setIngredient('');
    setDirection('');
  };

  return (
    <div className='main_div'>
      <button className ="localStorageClear" onClick={localStorage.clear()}> ↻ </button>
      <div className='center_div'>
        <br />
        <button onClick={handleAddButtonClick}> + </button>
        <h1>Recipe</h1>
        <br />
        <div className='addForum'>
          <ol>
            {recipes.map((recipe, index) => (
              <li key={index} onClick={() => handleRecipeClick(recipe)}>{recipe.name}</li>
            ))}
          </ol>
        </div>
      </div>
      {showAddDialog && (
        <div className='popup'>
          <div className='popup_inner'>
            <h2>Add Recipe</h2>
            <input type="text" placeholder="Name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
            <textarea placeholder="Ingredient (comma-separated)" value={ingredient} onChange={(e) => setIngredient(e.target.value)} rows={4} cols={30} />
            <textarea placeholder="Direction" value={direction} onChange={(e) => setDirection(e.target.value)} rows={8} cols={30} />
            <button className="add-button" onClick={handleAddRecipe}> + </button>
            <button className="reset-button" onClick={handleResetAddDialog}> ↻ </button>
            <button className="close-button" onClick={() => setShowAddDialog(false)}> x </button>
          </div>
        </div>
      )}
      {showRecipeDialog && (
        <div className='popup'>
          <div className='popup_inner'>
            <button className="close-button" onClick={() => setShowRecipeDialog(false)}> x </button>
            <h2>{selectedRecipe.name}</h2>
            <p className='emptySpace'></p>
            <p><strong>Ingredients:</strong></p>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <p key={index}>{index + 1}. {ingredient}</p>
              ))}
              <p className='emptySpace'></p>
            <p><strong>Direction:</strong></p>
            <p>{selectedRecipe.directions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
