import { cartAdd } from "./Cart.js";

class Products {
  constructor() {
    this.elem = null;
    this.allProducts = [];
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("catalog__products", "products");
    return elem;
  }

  createProducts(data) {
    let elem = document.createElement("div");
    elem.classList.add("products__item", "product");

    let containerImg = document.createElement("div");
    containerImg.classList.add("products__container_img");

    let imgElem = document.createElement("img");
    imgElem.classList.add("products__image");
    imgElem.src = data.image;
    imgElem.alt = data.title;

    let containerContent = document.createElement("div");
    containerContent.classList.add("products__container_content");

    let titleElem = document.createElement("a");
    titleElem.classList.add("products__title");
    titleElem.href = `/#product/${data.id}`;
    titleElem.innerHTML = data.title;

    let priceElem = document.createElement("div");
    priceElem.classList.add("products__price");
    priceElem.innerHTML = `$${data.price}`;

    let btnAddElem = document.createElement("button");
    btnAddElem.classList.add("products__btn_add");
    btnAddElem.innerHTML = `Добавить в корзину`;

    containerContent.append(titleElem, priceElem, btnAddElem);
    containerImg.append(imgElem);

    elem.append(containerImg, containerContent);

    btnAddElem.addEventListener("click", () => {
      cartAdd(data.id);
    });

    return elem;
  }

  filterProductsByCategory(products, category) {
    if (category === "electronics") {
      return products.filter((product) => product.category === "electronics");
    } else if (category === "clothing") {
      return products.filter(
        (product) =>
          product.category === "men's clothing" ||
          product.category === "women's clothing"
      );
    } else if (category === "jewelery") {
      return products.filter((product) => product.category === "jewelery");
    } else if (category === "accessories") {
      return products.filter((product) => product.id === 1);
    }

    return products;
  }

  displayProducts(products) {
    this.elem.innerHTML = "";

    if (products.length === 0) {
      let noProductsElem = document.createElement("div");
      noProductsElem.classList.add("error");
      noProductsElem.textContent = "Товары не найдены";
      this.elem.appendChild(noProductsElem);
      return;
    }

    products.forEach((item) => {
      this.elem.append(this.createProducts(item));
    });
  }

  getCategoryFromUrl() {
    const hash = window.location.hash;
    if (hash.includes("/")) {
      const parts = hash.split("/");
      if (parts.length >= 2) {
        return parts[1];
      }
    }
    return null;
  }

  async getData() {
    this.elem.innerHTML = "";

    let loadingElem = document.createElement("div");
    loadingElem.classList.add("loading");
    loadingElem.textContent = "Загрузка товаров...";
    this.elem.appendChild(loadingElem);

    try {
      let productsData = localStorage.getItem("products");

      if (!productsData) {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        localStorage.setItem("products", JSON.stringify(data));
        this.allProducts = data;
      } else {
        this.allProducts = JSON.parse(productsData);
      }

      const categoryFromUrl = this.getCategoryFromUrl();

      if (categoryFromUrl) {
        const filteredProducts = this.filterProductsByCategory(
          this.allProducts,
          categoryFromUrl
        );
        this.displayProducts(filteredProducts);
      } else {
        const selectedCategory = sessionStorage.getItem("selectedCategory");
        if (selectedCategory) {
          const filteredProducts = this.filterProductsByCategory(
            this.allProducts,
            selectedCategory
          );
          this.displayProducts(filteredProducts);

          sessionStorage.removeItem("selectedCategory");
        } else {
          this.displayProducts(this.allProducts);
        }
      }
    } catch (error) {
      this.elem.innerHTML = "";
      let errorElem = document.createElement("div");
      errorElem.classList.add("error");
      errorElem.textContent = `Ошибка при загрузке товаров: ${error.message}`;
      this.elem.appendChild(errorElem);
    }
  }

  handleHashChange() {
    if (this.allProducts.length > 0) {
      const categoryFromUrl = this.getCategoryFromUrl();
      if (categoryFromUrl) {
        const filteredProducts = this.filterProductsByCategory(
          this.allProducts,
          categoryFromUrl
        );
        this.displayProducts(filteredProducts);
      } else {
        this.displayProducts(this.allProducts);
      }
    }
  }

  init() {
    this.elem = this.create();
    this.getData();

    window.addEventListener("hashchange", () => this.handleHashChange());

    return this.elem;
  }
}

let products = new Products().init();
export { products };
