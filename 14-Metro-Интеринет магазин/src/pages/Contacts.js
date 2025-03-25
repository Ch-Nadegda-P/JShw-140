class Page {
  constructor() {
    this.title = "Contacts page";
  }

  create() {
    let elem = document.createElement("div");
    elem.classList.add("main__content", "content");

    let contactsContainer = document.createElement("div");
    contactsContainer.classList.add("contacts__container");

    let contactsTitle = document.createElement("h2");
    contactsTitle.classList.add("contacts__title");
    contactsTitle.textContent = "Свяжитесь с нами";

    let contactsDescription = document.createElement("p");
    contactsDescription.classList.add("contacts__description");
    contactsDescription.textContent =
      "Мы всегда рады помочь вам с выбором товаров и ответить на любые вопросы.";

    let contactsInfo = document.createElement("div");
    contactsInfo.classList.add("contacts__info");

    contactsInfo.innerHTML = `
      <div class="contacts__info_item">
        <div class="contacts__info_icon">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="contacts__info_content">
          <h3>Адрес</h3>
          <p>59 Street, Newyork City, Rose Town, 05 Rive House</p>
        </div>
      </div>
      
      <div class="contacts__info_item">
        <div class="contacts__info_icon">
          <i class="fas fa-phone-alt"></i>
        </div>
        <div class="contacts__info_content">
          <h3>Телефон</h3>
          <p>+123 456 7890</p>
        </div>
      </div>
      
      <div class="contacts__info_item">
        <div class="contacts__info_icon">
          <i class="fas fa-envelope"></i>
        </div>
        <div class="contacts__info_content">
          <h3>Email</h3>
          <p>info@example.com</p>
        </div>
      </div>
      
      <div class="contacts__info_item">
        <div class="contacts__info_icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="contacts__info_content">
          <h3>Время работы</h3>
          <p>Пн-Пт: 9:00 - 18:00</p>
          <p>Сб-Вс: 10:00 - 16:00</p>
        </div>
      </div>
    `;

    let contactsForm = document.createElement("div");
    contactsForm.classList.add("contacts__form_container");

    let formTitle = document.createElement("h3");
    formTitle.classList.add("contacts__form_title");
    formTitle.textContent = "Напишите нам";

    let form = document.createElement("form");
    form.classList.add("contacts__form");
    form.action = "#";
    form.method = "post";

    form.innerHTML = `
      <div class="contacts__form_group">
        <label for="name">Ваше имя</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="contacts__form_group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="contacts__form_group">
        <label for="subject">Тема</label>
        <input type="text" id="subject" name="subject" required>
      </div>
      
      <div class="contacts__form_group">
        <label for="message">Сообщение</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      
      <button type="submit" class="contacts__form_submit">Отправить</button>
    `;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.");
      form.reset();
    });

    let mapContainer = document.createElement("div");
    mapContainer.classList.add("contacts__map");
    mapContainer.innerHTML = `
      <h3>Мы на карте</h3>
      <div class="contacts__map_frame">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095989785!2d-74.00425878459362!3d40.74076294379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9ac1f1b85%3A0x7e33d1c0e7af3be4!2zNTl0aCBTdCwgTmV3IFlvcmssIE5ZLCDQodCo0JA!5e0!3m2!1sru!2sru!4v1618235418279!5m2!1sru!2sru" 
          width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    `;

    contactsForm.appendChild(formTitle);
    contactsForm.appendChild(form);

    contactsContainer.appendChild(contactsTitle);
    contactsContainer.appendChild(contactsDescription);
    contactsContainer.appendChild(contactsInfo);
    contactsContainer.appendChild(contactsForm);
    contactsContainer.appendChild(mapContainer);

    elem.appendChild(contactsContainer);

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
