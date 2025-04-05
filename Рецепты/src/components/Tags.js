class Page {
  constructor(params) {
    this.title = "Название";
    this.recipes = [];
    this.tag = params?.tag || "";
    this.isLoading = true;
    this.error = null;
  }

  async fetchData() {
    try {
      if (!this.tag) {
        this.error = "Название не указано";
        this.isLoading = false;
        return;
      }

      this.title = `Рецепты по названию "${this.tag}"`;

      const response = await fetch(
        `https://dummyjson.com/recipes/tag/${this.tag}`
      );
      const data = await response.json();
      this.recipes = data.recipes;

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
    heading.textContent = this.title;
    elem.appendChild(heading);

    let backLink = document.createElement("a");
    backLink.classList.add("btn", "btn--outline");
    backLink.href = "/";
    backLink.textContent = "Вернуться на главную";
    backLink.style.marginBottom = "20px";
    backLink.style.display = "inline-block";
    elem.appendChild(backLink);

    if (this.recipes.length === 0) {
      let message = document.createElement("div");
      message.classList.add("message", "message--info");
      message.textContent = `Рецептов с названием "${this.tag}" не найдено.`;
      elem.appendChild(message);
    } else {
      let recipesContainer = document.createElement("div");
      recipesContainer.classList.add("recipes");

      this.recipes.forEach((recipe) => {
        recipesContainer.appendChild(this.createRecipeCard(recipe));
      });

      elem.appendChild(recipesContainer);
    }

    return elem;
  }

  async init() {
    let elem = await this.create();
    return elem;
  }
}

export default Page;
