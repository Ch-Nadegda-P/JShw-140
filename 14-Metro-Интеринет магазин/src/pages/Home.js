class Page {
  constructor() {
    this.title = "Home page";
    this.categories = [
      {
        id: "electronics",
        name: "Электроника",
        image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        link: "/#catalog/electronics",
      },
      {
        id: "clothing",
        name: "Одежда",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        link: "/#catalog/clothing",
      },
      {
        id: "jewelery",
        name: "Ювелирные изделия",
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        link: "/#catalog/jewelery",
      },
      {
        id: "accessories",
        name: "Аксессуары",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        link: "/#catalog/accessories",
      },
    ];

    this.advantages = [
      {
        title: "Быстрая доставка",
        description: "Доставляем заказы в кратчайшие сроки",
        icon: "fas fa-truck",
      },
      {
        title: "Гарантия качества",
        description: "Все товары проходят строгий контроль",
        icon: "fas fa-medal",
      },
      {
        title: "Выгодные цены",
        description: "Регулярные акции и скидки для наших клиентов",
        icon: "fas fa-tag",
      },
      {
        title: "Поддержка 24/7",
        description: "Наши специалисты всегда готовы помочь",
        icon: "fas fa-headset",
      },
    ];
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("main__content", "content");

    let welcomeElem = document.createElement("div");
    welcomeElem.classList.add("home__welcome");
    welcomeElem.innerHTML = `
      <h2>Добро пожаловать в наш интернет-магазин!</h2>
      <p>Здесь вы найдете широкий ассортимент товаров по выгодным ценам.</p>
    `;

    let featuredSection = document.createElement("div");
    featuredSection.classList.add("home__featured");

    let featuredTitle = document.createElement("h3");
    featuredTitle.classList.add("home__section_title");
    featuredTitle.textContent = "Популярные категории";

    let featuredItems = document.createElement("div");
    featuredItems.classList.add("home__featured_items");

    this.categories.forEach((category) => {
      let categoryItem = document.createElement("div");
      categoryItem.classList.add("home__category_item");

      categoryItem.innerHTML = `
        <a href="${category.link}" class="home__category_link" data-category="${category.id}">
          <div class="home__category_image">
            <img src="${category.image}" alt="${category.name}">
          </div>
          <h4 class="home__category_name">${category.name}</h4>
        </a>
      `;

      categoryItem
        .querySelector(".home__category_link")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const categoryId = e.currentTarget.dataset.category;

          sessionStorage.setItem("selectedCategory", categoryId);

          window.location.hash = `catalog/${categoryId}`;
        });

      featuredItems.appendChild(categoryItem);
    });

    featuredSection.appendChild(featuredTitle);
    featuredSection.appendChild(featuredItems);

    let whyUsSection = document.createElement("div");
    whyUsSection.classList.add("home__why_us");

    let whyUsTitle = document.createElement("h3");
    whyUsTitle.classList.add("home__section_title");
    whyUsTitle.textContent = "Почему выбирают нас";

    let whyUsItems = document.createElement("div");
    whyUsItems.classList.add("home__why_us_items");

    this.advantages.forEach((advantage) => {
      let advantageItem = document.createElement("div");
      advantageItem.classList.add("home__advantage_item");

      advantageItem.innerHTML = `
        <div class="home__advantage_icon">
          <i class="${advantage.icon}"></i>
        </div>
        <h4 class="home__advantage_title">${advantage.title}</h4>
        <p class="home__advantage_description">${advantage.description}</p>
      `;

      whyUsItems.appendChild(advantageItem);
    });

    whyUsSection.appendChild(whyUsTitle);
    whyUsSection.appendChild(whyUsItems);

    let ctaSection = document.createElement("div");
    ctaSection.classList.add("home__cta");

    ctaSection.innerHTML = `
      <h3>Готовы сделать покупку?</h3>
      <p>Перейдите в каталог и выберите товары, которые вам нравятся</p>
      <a href="/#catalog" class="home__cta_button">Перейти в каталог</a>
    `;

    ctaSection
      .querySelector(".home__cta_button")
      .addEventListener("click", (e) => {
        e.preventDefault();

        sessionStorage.removeItem("selectedCategory");

        window.location.hash = "catalog";
      });

    elem.appendChild(welcomeElem);
    elem.appendChild(featuredSection);
    elem.appendChild(whyUsSection);
    elem.appendChild(ctaSection);

    return elem;
  }

  init() {
    return this.create();
  }
}

let obj = new Page();
let elem = obj.init();
let elemTitle = obj.title;

export { elem as page, elemTitle as pageTitle };
