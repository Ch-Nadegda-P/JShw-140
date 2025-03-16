class ContactsApp extends Contacts {
  constructor() {
    super();

    this.root = document.getElementById("root");

    let title = document.createElement("h1");
    title.textContent = "Мои контакты";
    this.root.appendChild(title);

    this.app = document.createElement("div");
    this.app.className = "contacts";
    this.root.appendChild(this.app);

    this.createInterface();
  }

  get storage() {
    let data = localStorage.getItem("contacts");
    return data ? JSON.parse(data) : null;
  }

  set storage(data) {
    localStorage.setItem("contacts", JSON.stringify(data));

    let date = new Date();
    date.setDate(date.getDate() + 10);
    document.cookie = `storageExpiration=${date.toUTCString()};path=/;expires=${date.toUTCString()}`;
  }

  createInterface() {
    let form = document.createElement("form");
    form.className = "contacts-form";

    let fields = [
      { name: "name", placeholder: "Имя", type: "text" },
      { name: "email", placeholder: "Email", type: "email" },
      { name: "address", placeholder: "Адрес", type: "text" },
      { name: "phone", placeholder: "Телефон", type: "tel" },
    ];

    fields.forEach((field) => {
      let input = document.createElement("input");
      input.type = field.type;
      input.name = field.name;
      input.placeholder = field.placeholder;
      input.className = "contacts-input";
      form.appendChild(input);
    });

    let idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "id";
    form.appendChild(idInput);

    let addButton = document.createElement("button");
    addButton.textContent = "Добавить";
    addButton.type = "button";
    addButton.className = "contacts-button add";
    addButton.addEventListener("click", () => this.onAdd(form));

    let resetButton = document.createElement("button");
    resetButton.textContent = "Сбросить";
    resetButton.type = "reset";
    resetButton.className = "contacts-button reset";

    form.appendChild(addButton);
    form.appendChild(resetButton);

    let apiButton = document.createElement("button");
    apiButton.textContent = "Загрузить из API";
    apiButton.className = "contacts-button api";
    apiButton.addEventListener("click", () => {
      localStorage.removeItem("contacts");
      this.data = [];
      this.contactsList.innerHTML = "";
      this.getData(true);
    });

    let searchForm = document.createElement("div");
    searchForm.className = "contacts-search";

    let searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Введите ID пользователя";
    searchInput.className = "contacts-input";

    let searchButton = document.createElement("button");
    searchButton.textContent = "Найти по ID";
    searchButton.className = "contacts-button search";
    searchButton.addEventListener("click", () =>
      this.findById(searchInput.value)
    );

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);

    let messageElement = document.createElement("div");
    messageElement.className = "contacts-message";

    let contactsList = document.createElement("div");
    contactsList.className = "contacts-list";

    this.app.appendChild(apiButton);
    this.app.appendChild(searchForm);
    this.app.appendChild(messageElement);
    this.app.appendChild(form);
    this.app.appendChild(contactsList);

    this.form = form;
    this.contactsList = contactsList;
    this.messageElement = messageElement;
    this.searchInput = searchInput;
  }

  onAdd(form) {
    let formData = new FormData(form);

    let newId;

    if (!formData.get("id")) {
      if (this.data.length > 0) {
        let maxId = Math.max(
          ...this.data.map((user) => parseInt(user.get().id))
        );
        newId = (maxId + 1).toString();
      } else {
        newId = "1";
      }
    } else {
      newId = formData.get("id");
    }

    let userData = {
      id: newId,
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    };

    if (!formData.get("id")) {
      this.add(userData);
    } else {
      this.edit(userData.id, userData);
    }

    this.storage = this.data.map((user) => user.get());
    this.get();

    form.reset();
    form.elements.id.value = "";
  }

  onEdit(id) {
    let user = this.data.find((user) => user.get().id === id);
    if (user) {
      let userData = user.get();

      this.form.elements.id.value = userData.id;
      this.form.elements.name.value = userData.name;
      this.form.elements.email.value = userData.email;
      this.form.elements.address.value = userData.address;
      this.form.elements.phone.value = userData.phone;
    }
  }

  onRemove(id) {
    if (confirm("Вы уверены, что хотите удалить этот контакт?")) {
      this.remove(id);

      this.storage = this.data.map((user) => user.get());
      this.get();
    }
  }

  findById(id) {
    if (!id.trim()) {
      this.showMessage("Введите ID пользователя");
      return;
    }

    if (this.data.length === 0) {
      this.showMessage('Нет данных. Сначала нажмите "Загрузить из API"');
      return;
    }

    let searchId = id.toString();

    let user = this.data.find((user) => user.get().id.toString() === searchId);

    if (user) {
      this.contactsList.innerHTML = "";

      let userData = user.get();
      let contactItem = this.createContactItem(userData);
      this.contactsList.appendChild(contactItem);

      this.messageElement.textContent = "";
    } else {
      this.showMessage(`Пользователь с ID ${id} не найден`);
    }
  }

  showMessage(message) {
    this.messageElement.textContent = message;
  }

  createContactItem(userData) {
    let contactItem = document.createElement("div");
    contactItem.className = "contact-item";

    let contactInfo = document.createElement("div");
    contactInfo.className = "contact-info";
    contactInfo.innerHTML = `
          <h3>${userData.name}</h3>
          <p>Email: ${userData.email}</p>
          <p>Адрес: ${userData.address}</p>
          <p>Телефон: ${userData.phone}</p>
      `;

    let contactActions = document.createElement("div");
    contactActions.className = "contact-actions";

    let editButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    editButton.className = "contacts-button edit";
    editButton.addEventListener("click", () => this.onEdit(userData.id));

    let removeButton = document.createElement("button");
    removeButton.textContent = "Удалить";
    removeButton.className = "contacts-button remove";
    removeButton.addEventListener("click", () => this.onRemove(userData.id));

    contactActions.appendChild(editButton);
    contactActions.appendChild(removeButton);

    contactItem.appendChild(contactInfo);
    contactItem.appendChild(contactActions);

    return contactItem;
  }

  get() {
    super.get();

    this.messageElement.textContent = "";
    this.contactsList.innerHTML = "";

    if (this.data.length === 0) {
      return this.data;
    }

    this.data.forEach((user) => {
      let userData = user.get();
      let contactItem = this.createContactItem(userData);
      this.contactsList.appendChild(contactItem);
    });

    return this.data;
  }

  async getData(fromApi = false) {
    if (fromApi) {
      try {
        console.log("Загрузка данных из API...");
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Не удалось получить данные");
        }

        let users = await response.json();
        console.log("Данные из API:", users);

        this.data = [];

        users.forEach((user) => {
          this.add({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            address: user.address.street + ", " + user.address.city,
            phone: user.phone,
          });
        });

        this.storage = this.data.map((user) => user.get());
        this.get();
        this.showMessage("Данные успешно загружены из API");
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        this.showMessage("Ошибка при получении данных: " + error.message);
      }
    }

    this.checkCookieExpiration();
  }

  checkCookieExpiration() {
    let cookies = document.cookie.split(";");
    let hasExpirationCookie = false;

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith("storageExpiration=")) {
        hasExpirationCookie = true;
        let expirationDate = new Date(
          cookie.substring("storageExpiration=".length)
        );
        let currentDate = new Date();

        if (currentDate > expirationDate) {
          localStorage.removeItem("contacts");
          document.cookie =
            "storageExpiration=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
          this.data = [];
          this.get();
        }
        break;
      }
    }

    if (!hasExpirationCookie && this.data.length > 0) {
      let date = new Date();
      date.setDate(date.getDate() + 10);
      document.cookie = `storageExpiration=${date.toUTCString()};path=/;expires=${date.toUTCString()}`;
    }
  }
}
