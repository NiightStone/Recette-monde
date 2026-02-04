const recipeContainer = document.getElementById("recipesContainer");
let allRecipes = [];
const modal = document.getElementById("recipeModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");

async function getData() {
  const response = await fetch("assets/data/recette.json"); 
  const data = await response.json();
  return data.recipes;
}

function render(array) {
  recipeContainer.innerHTML = "";

  array.forEach((r) => {
    recipeContainer.innerHTML += `
      <article class="recipe-card" data-id="${r.id}">
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

recipeContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const recipe = allRecipes.find((r) => r.id === id);
  if (!recipe) return;


  modalTitle.textContent = recipe.name;
  modalDescription.textContent = recipe.description || "";
  modalIngredients.innerHTML = recipe.ingredients
    .map((i) => `<li>${i.ingredient}</li>`)
    .join("");

  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

init();
