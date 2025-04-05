class Page {
  constructor(params) {
    this.title = "Рецепт";
    this.recipe = null;
    this.recipeId = params?.id || "";
    this.isLoading = true;
    this.error = null;
  }

  async fetchData() {
    try {
      if (!this.recipeId) {
        this.error = "ID рецепта не указан";
        this.isLoading = false;
        return;
      }

      const response = await fetch(
        `https://dummyjson.com/recipes/${this.recipeId}`
      );
      this.recipe = await response.json();

      if (this.recipe) {
        this.title = this.recipe.name;
      }

      this.isLoading = false;
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      this.error = "Не удалось загрузить данные. Пожалуйста, попробуйте позже.";
      this.isLoading = false;
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

    if (!this.recipe) {
      let message = document.createElement("div");
      message.classList.add("message", "message--error");
      message.textContent = "Рецепт не найден";
      elem.appendChild(message);
      return elem;
    }

    let recipeDetail = document.createElement("div");
    recipeDetail.classList.add("recipe-detail");

    let backLink = document.createElement("a");
    backLink.classList.add("btn", "btn--outline");
    backLink.href = "/";
    backLink.textContent = "Вернуться на главную";
    backLink.style.marginBottom = "20px";
    backLink.style.display = "inline-block";
    recipeDetail.appendChild(backLink);

    let header = document.createElement("div");
    header.classList.add("recipe-detail__header");

    let title = document.createElement("h1");
    title.classList.add("recipe-detail__title");
    title.textContent = this.recipe.name;

    let image = document.createElement("img");
    image.classList.add("recipe-detail__image");
    image.src = this.recipe.image;
    image.alt = this.recipe.name;

    header.appendChild(title);
    header.appendChild(image);

    let info = document.createElement("div");
    info.classList.add("recipe-detail__info");

    let difficultyItem = document.createElement("div");
    difficultyItem.classList.add("recipe-detail__info-item");

    let difficultyLabel = document.createElement("span");
    difficultyLabel.classList.add("recipe-detail__info-label");
    difficultyLabel.textContent = "Сложность";

    let difficultyValue = document.createElement("span");
    difficultyValue.classList.add("recipe-detail__info-value");
    difficultyValue.textContent = this.recipe.difficulty;

    difficultyItem.appendChild(difficultyLabel);
    difficultyItem.appendChild(difficultyValue);

    let timeItem = document.createElement("div");
    timeItem.classList.add("recipe-detail__info-item");

    let timeLabel = document.createElement("span");
    timeLabel.classList.add("recipe-detail__info-label");
    timeLabel.textContent = "Время приготовления";

    let timeValue = document.createElement("span");
    timeValue.classList.add("recipe-detail__info-value");
    timeValue.textContent = `${
      this.recipe.prepTimeMinutes + this.recipe.cookTimeMinutes
    } мин`;

    timeItem.appendChild(timeLabel);
    timeItem.appendChild(timeValue);

    let servingsItem = document.createElement("div");
    servingsItem.classList.add("recipe-detail__info-item");

    let servingsLabel = document.createElement("span");
    servingsLabel.classList.add("recipe-detail__info-label");
    servingsLabel.textContent = "Порции";

    let servingsValue = document.createElement("span");
    servingsValue.classList.add("recipe-detail__info-value");
    servingsValue.textContent = this.recipe.servings;

    servingsItem.appendChild(servingsLabel);
    servingsItem.appendChild(servingsValue);

    let caloriesItem = document.createElement("div");
    caloriesItem.classList.add("recipe-detail__info-item");

    let caloriesLabel = document.createElement("span");
    caloriesLabel.classList.add("recipe-detail__info-label");
    caloriesLabel.textContent = "Калории";

    let caloriesValue = document.createElement("span");
    caloriesValue.classList.add("recipe-detail__info-value");
    caloriesValue.textContent = `${this.recipe.caloriesPerServing} ккал/порция`;

    caloriesItem.appendChild(caloriesLabel);
    caloriesItem.appendChild(caloriesValue);

    let cuisineItem = document.createElement("div");
    cuisineItem.classList.add("recipe-detail__info-item");

    let cuisineLabel = document.createElement("span");
    cuisineLabel.classList.add("recipe-detail__info-label");
    cuisineLabel.textContent = "Кухня";

    let cuisineValue = document.createElement("span");
    cuisineValue.classList.add("recipe-detail__info-value");
    cuisineValue.textContent = this.recipe.cuisine;

    cuisineItem.appendChild(cuisineLabel);
    cuisineItem.appendChild(cuisineValue);

    let ratingItem = document.createElement("div");
    ratingItem.classList.add("recipe-detail__info-item");

    let ratingLabel = document.createElement("span");
    ratingLabel.classList.add("recipe-detail__info-label");
    ratingLabel.textContent = "Рейтинг";

    let ratingValue = document.createElement("span");
    ratingValue.classList.add("recipe-detail__info-value");
    ratingValue.textContent = `${this.recipe.rating} (${this.recipe.reviewCount} отзывов)`;

    ratingItem.appendChild(ratingLabel);
    ratingItem.appendChild(ratingValue);

    info.appendChild(difficultyItem);
    info.appendChild(timeItem);
    info.appendChild(servingsItem);
    info.appendChild(caloriesItem);
    info.appendChild(cuisineItem);
    info.appendChild(ratingItem);

    let ingredientsSection = document.createElement("div");
    ingredientsSection.classList.add("recipe-detail__section");

    let ingredientsTitle = document.createElement("h2");
    ingredientsTitle.classList.add("recipe-detail__section-title");
    ingredientsTitle.textContent = "Ингредиенты";

    let ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("recipe-detail__ingredients");

    this.recipe.ingredients.forEach((ingredient) => {
      let item = document.createElement("li");
      item.textContent = ingredient;
      ingredientsList.appendChild(item);
    });

    ingredientsSection.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(ingredientsList);

    let instructionsSection = document.createElement("div");
    instructionsSection.classList.add("recipe-detail__section");

    let instructionsTitle = document.createElement("h2");
    instructionsTitle.classList.add("recipe-detail__section-title");
    instructionsTitle.textContent = "Инструкции";

    let instructionsList = document.createElement("ol");
    instructionsList.classList.add("recipe-detail__instructions");

    this.recipe.instructions.forEach((instruction) => {
      let item = document.createElement("li");
      item.textContent = instruction;
      instructionsList.appendChild(item);
    });

    instructionsSection.appendChild(instructionsTitle);
    instructionsSection.appendChild(instructionsList);

    let tagsSection = document.createElement("div");
    tagsSection.classList.add("recipe-detail__section");

    let tagsTitle = document.createElement("h2");
    tagsTitle.classList.add("recipe-detail__section-title");

    tagsTitle.textContent = "Название";

    let tagsList = document.createElement("div");
    tagsList.classList.add("tags-list");

    this.recipe.tags.forEach((tag) => {
      let tagLink = document.createElement("a");
      tagLink.classList.add("tag");
      tagLink.href = `#tags/${tag}`;
      tagLink.textContent = tag;
      tagsList.appendChild(tagLink);
    });

    tagsSection.appendChild(tagsTitle);
    tagsSection.appendChild(tagsList);

    recipeDetail.appendChild(header);
    recipeDetail.appendChild(info);
    recipeDetail.appendChild(ingredientsSection);
    recipeDetail.appendChild(instructionsSection);
    recipeDetail.appendChild(tagsSection);

    elem.appendChild(recipeDetail);

    return elem;
  }

  async init() {
    let elem = await this.create();
    return elem;
  }
}

export default Page;
