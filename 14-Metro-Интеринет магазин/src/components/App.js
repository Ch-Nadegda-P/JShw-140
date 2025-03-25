import { header } from "../layouts/Header.js";
import { main, mainContainer, mainTitle } from "../layouts/Main.js";
import { footer } from "../layouts/Footer.js";
import { cartUpdate } from "./Cart.js";

class App {
  constructor() {
    this.init();
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("app");

    return elem;
  }

  createHead() {
    let metaCharsetElem = document.createElement("meta");
    metaCharsetElem.setAttribute("charset", "UTF-8");

    let metaVPElem = document.createElement("meta");
    metaVPElem.setAttribute("name", "viewport");
    metaVPElem.setAttribute("content", "width=device-width, initial-scale=1.0");

    let titleElem = document.createElement("title");
    titleElem.innerHTML = "Store App";

    let linkElem = document.createElement("link");
    linkElem.rel = "stylesheet";
    linkElem.href = "/src/index.css";

    let linkMediaElem = document.createElement("link");
    linkMediaElem.rel = "stylesheet";
    linkMediaElem.href = "/src/media.css";

    let linkFontElem = document.createElement("link");
    linkFontElem.rel = "stylesheet";
    linkFontElem.href =
      "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap";

    return {
      charset: metaCharsetElem,
      view: metaVPElem,
      title: titleElem,
      css: linkElem,
      media: linkMediaElem,
      font: linkFontElem,
    };
  }

  async fetchProducts() {
    let products = localStorage.getItem("products");

    if (!products) {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        localStorage.setItem("products", JSON.stringify(data));
        console.log(
          "Данные о товарах получены из API и сохранены в localStorage"
        );
      } catch (error) {
        console.error("Ошибка при получении данных из API:", error);
      }
    } else {
      console.log("Данные о товарах загружены из localStorage");
    }
  }

  router() {
    let getPage = async () => {
      let page;

      let hash = location.hash;

      if (!hash) {
        page = "home";
      } else {
        hash = hash.slice(1);

        let hashItems = hash.split("/");

        if (hashItems[0]) page = hashItems[0];
      }

      if (!page) page = "404";

      let timestamp = new Date().getTime();

      let elem = await import(`../pages/${page}.js?v=${timestamp}`).then(
        (module) => {
          mainTitle.innerHTML = "";
          mainContainer.innerHTML = "";

          document.title = module.pageTitle;

          mainTitle.innerHTML = module.pageTitle;
          mainContainer.append(module.page);

          window.scrollTo(0, 0);
        }
      );
    };

    let links = document.querySelectorAll('a[href="/"]');

    if (links)
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();

          history.pushState(null, null, "/");
          getPage();
        });
      });

    window.addEventListener("hashchange", (e) => {
      getPage();
    });

    getPage();
  }

  async render() {
    if (!this.elem) return;

    let headElems = this.createHead();

    if (header) this.elem.append(header);
    if (main) this.elem.append(main);
    if (footer) this.elem.append(footer);

    document.head.append(
      headElems.charset,
      headElems.view,
      headElems.title,
      headElems.css,
      headElems.media,
      headElems.font
    );
    document.body.append(this.elem);
  }

  async init() {
    await this.fetchProducts();

    this.elem = this.create();
    await this.render();

    cartUpdate();

    this.router();

    return this;
  }
}

export default new App();
