const recipeContainer = document.getElementById("recipesContainer");
let allRecipes = [];

async function getData() {
  const response = await fetch("assets/data/recette.json"); 
  const data = await response.json();
  return data.recipes;
}

function render(array) {
  recipeContainer.innerHTML = "";

  array.forEach((r) => {
    recipeContainer.innerHTML += `
      <article class="recipe-card">
        <h2>${r.name}</h2>
        <p><strong>Nombre de personnes :</strong> ${r.servings}</p>
        <ul>
          ${r.ingredients.map((i) => `<li>${i.ingredient}</li>`).join("")}
        </ul>
      </article>
    `;
  });
}

async function init() {
  allRecipes = await getData();
  render(allRecipes);
}

init();
