class Cart {
  static setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  static getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  static add(id) {
    let data = localStorage.getItem("cart");
    if (data) data = JSON.parse(data);

    if (!data) data = [];

    if (data.includes(id)) return;

    data.push(id);

    data = JSON.stringify(data);

    if (!data) return;

    localStorage.setItem("cart", data);

    Cart.setCookie("cart", data, 7);

    Cart.updateWidget();
  }

  static remove(id) {
    let data = localStorage.getItem("cart");
    if (data) data = JSON.parse(data);

    if (!data) return;

    data = data.filter((item) => item !== id);

    data = JSON.stringify(data);

    localStorage.setItem("cart", data);

    Cart.setCookie("cart", data, 7);

    Cart.updateWidget();

    return Cart.get();
  }

  static async get() {
    let cartCookie = Cart.getCookie("cart");
    let cartData;

    if (cartCookie) {
      cartData = JSON.parse(cartCookie);
    } else {
      cartData = localStorage.getItem("cart");
      if (cartData) cartData = JSON.parse(cartData);
    }

    if (!cartData) return [];

    let productsData = localStorage.getItem("products");
    if (productsData) {
      productsData = JSON.parse(productsData);

      let tmpData = productsData.filter((item) => {
        return cartData.includes(item.id);
      });

      cartData = tmpData.map((item) => {
        return {
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
        };
      });
    } else {
      await fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          let tmpData = data.filter((item) => {
            return cartData.includes(item.id);
          });

          cartData = tmpData.map((item) => {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              price: item.price,
            };
          });
        });
    }

    return cartData;
  }

  static updateWidget() {
    let counterElem = document.querySelector(".cart_widget__count");
    let totalElem = document.querySelector(".cart_widget__total");

    if (!counterElem || !totalElem) return;

    Cart.get().then((data) => {
      let total = 0;

      data.forEach((item) => {
        total += +item.price;
      });

      counterElem.innerHTML = data.length;
      totalElem.innerHTML = `$ ${total.toFixed(2)}`;
    });
  }
}

let cartAdd = Cart.add;
let cartGet = Cart.get;
let cartUpdate = Cart.updateWidget;
let cartRemove = Cart.remove;

export { cartAdd, cartGet, cartUpdate, cartRemove };
