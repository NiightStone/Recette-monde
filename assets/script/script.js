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

function setupSearchBar() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) {
    console.error("❌ #searchInput introuvable dans le HTML");
    return;
  }

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();

    const filtered = allRecipes.filter((r) =>
      r.name.toLowerCase().includes(value)
    );

    render(filtered);
  });
}

async function init() {
  try {
    allRecipes = await getData();
    render(allRecipes);
    setupSearchBar();
  } catch (e) {
    console.error("Erreur chargement recettes :", e);
    recipeContainer.innerHTML = "<p>Impossible de charger les recettes.</p>";
  }
}

init();
