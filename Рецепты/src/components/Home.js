class Page {
  constructor() {
    this.title = "Главная";
    this.recipes = [];
    this.filteredRecipes = [];
    this.tags = [];
    this.isLoading = true;
    this.error = null;
    this.searchQuery = "";
  }

  async fetchData() {
    try {
      const recipesResponse = await fetch(
        "https://dummyjson.com/recipes?limit=30"
      );
      const recipesData = await recipesResponse.json();
      this.recipes = recipesData.recipes;
      this.filteredRecipes = [...this.recipes];

      const tagsResponse = await fetch("https://dummyjson.com/recipes/tags");
      this.tags = await tagsResponse.json();

      this.isLoading = false;
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      this.error = "Не удалось загрузить данные. Пожалуйста, попробуйте позже.";
      this.isLoading = false;
    }
  }

  createRecipeCard(recipe) {
    let card = document.createElement("div");
    card.classList.add("recipe-card");

    let image = document.createElement("img");
    image.classList.add("recipe-card__image");
    image.src = recipe.image;
    image.alt = recipe.name;

    let content = document.createElement("div");
    content.classList.add("recipe-card__content");

    let title = document.createElement("h3");
    title.classList.add("recipe-card__title");
    title.textContent = recipe.name;

    let info = document.createElement("div");
    info.classList.add("recipe-card__info");

    let difficulty = document.createElement("span");
    difficulty.textContent = `Сложность: ${recipe.difficulty}`;

    let time = document.createElement("span");
    time.textContent = `Время: ${
      recipe.prepTimeMinutes + recipe.cookTimeMinutes
    } мин`;

    info.appendChild(difficulty);
    info.appendChild(time);

    let tags = document.createElement("div");
    tags.classList.add("recipe-card__tags");

    recipe.tags.forEach((tag) => {
      let tagLink = document.createElement("a");
      tagLink.classList.add("tag");
      tagLink.href = `#tags/${tag}`;
      tagLink.textContent = tag;
      tags.appendChild(tagLink);
    });

    let link = document.createElement("a");
    link.classList.add("btn");
    link.href = `#recipes/${recipe.id}`;
    link.textContent = "Подробнее";

    content.appendChild(title);
    content.appendChild(info);
    content.appendChild(tags);
    content.appendChild(link);

    card.appendChild(image);
    card.appendChild(content);

    return card;
  }

  createTagFilter(tags) {
    let filters = document.createElement("div");
    filters.classList.add("filters");

    let title = document.createElement("h3");
    title.classList.add("filters__title");
    title.textContent = "Фильтр по названию";

    let tagsList = document.createElement("div");
    tagsList.classList.add("tags-list");

    const displayTags = tags.slice(0, 20);

    displayTags.forEach((tag) => {
      let tagLink = document.createElement("a");
      tagLink.classList.add("tag");
      tagLink.href = `#tags/${tag}`;
      tagLink.textContent = tag;
      tagsList.appendChild(tagLink);
    });

    filters.appendChild(title);
    filters.appendChild(tagsList);

    return filters;
  }

  createSearchForm() {
    let searchForm = document.createElement("form");
    searchForm.classList.add("search-form");

    let searchInput = document.createElement("input");
    searchInput.classList.add("search-form__input");
    searchInput.type = "text";
    searchInput.placeholder = "Поиск рецептов...";
    searchInput.value = this.searchQuery;

    let searchButton = document.createElement("button");
    searchButton.classList.add("search-form__button", "btn");
    searchButton.type = "submit";
    searchButton.textContent = "Найти";

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchQuery = searchInput.value.trim().toLowerCase();
      this.filterRecipes();
    });

    return searchForm;
  }

  filterRecipes() {
    if (this.searchQuery) {
      this.filteredRecipes = this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredRecipes = [...this.recipes];
    }

    this.updateRecipesList();
  }

  updateRecipesList() {
    const recipesContainer = document.querySelector(".recipes");
    if (!recipesContainer) return;

    recipesContainer.innerHTML = "";

    if (this.filteredRecipes.length === 0) {
      let message = document.createElement("div");
      message.classList.add("message", "message--error");
      message.textContent = `Рецептов с названием "${this.searchQuery}" не найдено.`;
      recipesContainer.appendChild(message);
    } else {
      this.filteredRecipes.forEach((recipe) => {
        recipesContainer.appendChild(this.createRecipeCard(recipe));
      });
    }
  }

  async create() {
    let elem = document.createElement("div");
    elem.classList.add("main__content", "content");

    elem.innerHTML = `
      <div class="loader">
        <div class="loader__spinner"></div>
      </div>
    `;

    await this.fetchData();

    elem.innerHTML = "";

    if (this.error) {
      let errorMessage = document.createElement("div");
      errorMessage.classList.add("message", "message--error");
      errorMessage.textContent = this.error;
      elem.appendChild(errorMessage);
      return elem;
    }

    let heading = document.createElement("h1");
    heading.textContent = "Каталог рецептов";
    elem.appendChild(heading);

    elem.appendChild(this.createSearchForm());

    elem.appendChild(this.createTagFilter(this.tags));

    let recipesContainer = document.createElement("div");
    recipesContainer.classList.add("recipes");

    this.filteredRecipes.forEach((recipe) => {
      recipesContainer.appendChild(this.createRecipeCard(recipe));
    });

    elem.appendChild(recipesContainer);

    return elem;
  }

  async init() {
    let elem = await this.create();
    return elem;
  }
}

export default Page;
