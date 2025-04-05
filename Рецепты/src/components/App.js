import { main } from "./Main.js";

class App {
  constructor() {
    this.init();
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("app");

    let header = document.createElement("header");
    header.classList.add("header");

    let headerContainer = document.createElement("div");
    headerContainer.classList.add("container");

    let headerInner = document.createElement("div");
    headerInner.classList.add("header__inner");

    let logo = document.createElement("a");
    logo.classList.add("logo");
    logo.href = "/";
    logo.textContent = "Рецепты";

    let nav = document.createElement("nav");
    nav.classList.add("nav");

    let homeLink = document.createElement("a");
    homeLink.classList.add("nav__link");
    homeLink.href = "/";
    homeLink.textContent = "Главная";

    nav.appendChild(homeLink);
    headerInner.appendChild(logo);
    headerInner.appendChild(nav);
    headerContainer.appendChild(headerInner);
    header.appendChild(headerContainer);

    elem.appendChild(header);

    return elem;
  }

  router() {
    const getPage = async () => {
      let page = "Home";
      let params = {};

      const hash = location.hash.slice(1);

      if (hash) {
        const [route, id] = hash.split("/");

        if (route === "tags" && id) {
          page = "Tags";
          params.tag = id;
        } else if (route === "recipes" && id) {
          page = "Recipes";
          params.id = id;
        }
      }

      try {
        const module = await import(`./${page}.js`);

        const pageInstance = new module.default(params);

        const pageElement = await pageInstance.init();

        main.innerHTML = "";
        main.appendChild(pageElement);

        document.title = pageInstance.title
          ? `${pageInstance.title} | Рецепты`
          : "Рецепты";
      } catch (error) {
        console.error("Ошибка загрузки страницы:", error);

        main.innerHTML = `
                    <div class="container">
                        <div class="main__content content">
                            <h1>Страница не найдена</h1>
                            <p>Извините, запрашиваемая страница не существует.</p>
                            <a href="/" class="btn">Вернуться на главную</a>
                        </div>
                    </div>
                `;
      }
    };

    document.addEventListener("click", (e) => {
      if (e.target.matches('a[href="/"]')) {
        e.preventDefault();
        history.pushState(null, null, "/");
        getPage();
      }
    });

    window.addEventListener("hashchange", () => {
      getPage();
    });

    getPage();
  }

  render() {
    if (!this.elem) return;

    this.elem.append(main);

    document.body.append(this.elem);
  }

  init() {
    this.elem = this.create();
    this.render();
    this.router();
  }
}

export default new App();
