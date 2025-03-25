import { products } from "../components/Products.js";

class Page {
  constructor() {
    const hash = window.location.hash;
    let categoryFromUrl = null;

    if (hash.includes("/")) {
      categoryFromUrl = hash.split("/")[1];
    }

    this.selectedCategory = categoryFromUrl;

    const categoryNames = {
      electronics: "Products",
      clothing: "Products",
      jewelery: "Products",
      accessories: "Products",
    };

    this.title = this.selectedCategory
      ? categoryNames[this.selectedCategory] || "Каталог товаров"
      : "Products";
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("main__content", "content");

    let titleElem = document.createElement("h1");
    titleElem.classList.add("catalog__title");

    const categoryNames = {
      electronics: "Электроника",
      clothing: "Одежда",
      jewelery: "Ювелирные изделия",
      accessories: "Аксессуары",
    };

    if (this.selectedCategory && categoryNames[this.selectedCategory]) {
      titleElem.textContent = categoryNames[this.selectedCategory];
    } else {
      titleElem.textContent = "Каталог товаров";
    }

    elem.appendChild(titleElem);

    return elem;
  }

  init() {
    let elem = this.create();

    if (products) elem.append(products);

    return elem;
  }
}

let obj = new Page();
let elem = obj.init();
let elemTitle = obj.title;

export { elem as page, elemTitle as pageTitle };
