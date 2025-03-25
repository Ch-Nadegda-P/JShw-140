import { cartAdd } from "../components/Cart.js";

class Page {
  constructor() {
    this.id = null;
    this.title = "Product page";
    this.elem = null;
  }

  getId() {
    let href = location.href;
    href = href.split("/");

    if (!href || href.length == 0) return;

    return href[href.length - 1];
  }

  createProduct(data) {
    let elem = document.createElement("div");
    elem.classList.add("product");

    elem.innerHTML = `
    <div class="product__item">
      <img src="${data.image}" alt="${data.title}">
    </div>
    `;

    let rightItem = document.createElement("div");
    rightItem.classList.add("product__item");

    rightItem.innerHTML = `
      <h1 class="product__title">${data.title}</h1>
      <div class="product__info">
        <span class="product__category">${data.category}</span>
        <div class="product__rate">
          <div class="product__stars">
            <div class="product__stars_bar" style="width: ${
              (data.rating.rate / 5) * 100
            }%"></div>
          </div>
          <span class="product__votes">${data.rating.rate}/5 (${
      data.rating.count
    })</span>
        </div>
        <span class="product__id">№ ${data.id}</span>
      </div>
      <div class="product__desc">${data.description}</div>
    `;

    let footerItem = document.createElement("div");
    footerItem.classList.add("product__footer");

    footerItem.innerHTML = `
      <span class="product__price">$ ${data.price}</span>
    `;

    let btnAdd = document.createElement("button");
    btnAdd.classList.add("product__btn_add");

    btnAdd.innerHTML = `Add to cart`;

    footerItem.append(btnAdd);
    rightItem.append(footerItem);
    elem.append(rightItem);

    btnAdd.addEventListener("click", () => {
      cartAdd(data.id);
    });

    return elem;
  }

  async loadProductData(productId) {
    let productsData = localStorage.getItem("products");

    if (productsData) {
      const data = JSON.parse(productsData);

      const product = data.find((item) => item.id == productId);

      if (product) {
        return product;
      } else {
        throw new Error("Товар не найден");
      }
    } else {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при загрузке товара");
      }
      return await response.json();
    }
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("main__content", "content");

    elem.innerHTML = '<div class="loading">Загрузка товара...</div>';

    return elem;
  }

  init() {
    this.id = this.getId();
    this.elem = this.create();

    this.loadProductData(this.id)
      .then((productData) => {
        this.elem.innerHTML = "";

        this.elem.append(this.createProduct(productData));
      })
      .catch((error) => {
        console.error("Ошибка при загрузке товара:", error);
        this.elem.innerHTML = `<div class="error">Ошибка при загрузке товара: ${error.message}</div>`;
      });

    return this.elem;
  }
}

let obj = new Page();
let elem = obj.init();
let elemTitle = obj.title;
export { elem as page, elemTitle as pageTitle };
