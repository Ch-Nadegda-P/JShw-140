import { cartGet, cartRemove } from "../components/Cart.js";

class Page {
  constructor() {
    this.title = "Cart page";
    this.elem = null;
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("main__content", "content");

    elem.innerHTML = '<div class="loading">Загрузка корзины...</div>';

    return elem;
  }

  createProducts(data) {
    let total = 0;

    let elem = document.createElement("div");
    elem.classList.add("cart");

    let listElem = document.createElement("ul");
    listElem.classList.add("cart__list");

    let titleElem = document.createElement("li");
    titleElem.classList.add("cart__list_title");

    let titleDeliteElem = document.createElement("div");
    titleDeliteElem.classList.add("cart__list_delite");

    let titleProductElem = document.createElement("div");
    titleProductElem.classList.add("cart__list_product");
    titleProductElem.innerHTML = "Product";

    let titlePriceElem = document.createElement("div");
    titlePriceElem.classList.add("cart__list_price");
    titlePriceElem.innerHTML = "Price";

    let titleQuantityElem = document.createElement("div");
    titleQuantityElem.classList.add("cart__list_quantity");
    titleQuantityElem.innerHTML = "Quantity";

    let titleSubtotalElem = document.createElement("div");
    titleSubtotalElem.classList.add("cart__list_subtotal");
    titleSubtotalElem.innerHTML = "Subtotal";

    titleElem.append(
      titleDeliteElem,
      titleProductElem,
      titlePriceElem,
      titleQuantityElem,
      titleSubtotalElem
    );
    listElem.append(titleElem);

    
    if (data.length === 0) {
      let emptyCartElem = document.createElement("li");
      emptyCartElem.classList.add("cart__empty");
      emptyCartElem.innerHTML = "Ваша корзина пуста";

      listElem.append(emptyCartElem);
      elem.append(listElem);
      return elem;
    }

    let cartTotal = 0;

    data.forEach((item, index) => {
      let quantity = 1;
      let totalItem = quantity * item.price;

      totalItem = totalItem.toFixed(2);

      cartTotal += +totalItem;

      let liElem = document.createElement("li");
      liElem.classList.add("cart__item");
      liElem.dataset.id = item.id;

      let itemDelite = document.createElement("div");
      itemDelite.classList.add("cart__delite");
      let itemDeliteBtn = document.createElement("button");
      itemDeliteBtn.classList.add("cart__delite_btn");

      itemDeliteBtn.addEventListener("click", () => {
        cartRemove(item.id);

        this.updateCart();
      });

      let itemProduct = document.createElement("div");
      itemProduct.classList.add("cart__product");

      let itemProductImg = document.createElement("img");
      itemProductImg.classList.add("cart__product_img");
      itemProductImg.src = `${item.image}`;

      let itemProductTitle = document.createElement("a");
      itemProductTitle.classList.add("cart__product_title");
      itemProductTitle.href = `/#product/${item.id}`;
      itemProductTitle.innerHTML = `${item.title}`;

      let itemPrice = document.createElement("span");
      itemPrice.classList.add("cart__price");
      itemPrice.innerHTML = `$${item.price}`;

      let itemQuantity = document.createElement("div");
      itemQuantity.classList.add("cart__quantity");

      let itemQuantityInput = document.createElement("input");
      itemQuantityInput.classList.add("cart__input");
      itemQuantityInput.type = "number";
      itemQuantityInput.min = "1";
      itemQuantityInput.value = `${quantity}`;

      itemQuantityInput.addEventListener("change", () => {
        let newQuantity = parseInt(itemQuantityInput.value);
        if (newQuantity < 1) {
          newQuantity = 1;
          itemQuantityInput.value = "1";
        }

        let newTotalItem = (newQuantity * item.price).toFixed(2);
        itemSubtotal.innerHTML = `$${newTotalItem}`;

        this.recalculateTotal();
      });

      let itemSubtotal = document.createElement("span");
      itemSubtotal.classList.add("cart__subtotal");
      itemSubtotal.innerHTML = `$${totalItem}`;

      itemDelite.append(itemDeliteBtn);
      itemProduct.append(itemProductImg, itemProductTitle);
      itemQuantity.append(itemQuantityInput);
      liElem.append(
        itemDelite,
        itemProduct,
        itemPrice,
        itemQuantity,
        itemSubtotal
      );

      listElem.append(liElem);
    });

    let elemTotal = document.createElement("div");
    elemTotal.classList.add("cart__total");
    elemTotal.id = "cart-total";
    elemTotal.innerHTML = `Total: $ ${cartTotal.toFixed(2)}`;

    elem.append(listElem, elemTotal);

    return elem;
  }

  recalculateTotal() {
    let totalElement = document.getElementById("cart-total");
    let subtotalElements = document.querySelectorAll(".cart__subtotal");
    let total = 0;

    subtotalElements.forEach((elem) => {
      let value = parseFloat(elem.innerHTML.replace("$", ""));
      total += value;
    });

    totalElement.innerHTML = `Total: $ ${total.toFixed(2)}`;
  }

  async updateCart() {
    const cartData = await cartGet();

    this.elem.innerHTML = "";

    this.elem.append(this.createProducts(cartData));
  }

  init() {
    this.elem = this.create();

    cartGet()
      .then((cartData) => {
        this.elem.innerHTML = "";

        this.elem.append(this.createProducts(cartData));
      })
      .catch((error) => {
        console.error("Ошибка при загрузке корзины:", error);
        this.elem.innerHTML =
          '<div class="error">Ошибка при загрузке корзины</div>';
      });

    return this.elem;
  }
}

let obj = new Page();
let elem = obj.init();
let elemTitle = obj.title;
export { elem as page, elemTitle as pageTitle };
