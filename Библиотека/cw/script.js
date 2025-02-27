// Класс Book - представляет модель книги с её характеристиками
class Book {
  // Конструктор принимает все основные параметры книги
  constructor(title, description, author, year, pages) {
      this.title = title;
      this.description = description;
      this.author = author;
      this.year = year;
      this.pages = pages;
      
  }

  // Метод для редактирования всех данных книги
  edit(title, description, author, year, pages) {
      this.title = title;
      this.description = description;
      this.author = author;
      this.year = year;
      this.pages = pages;
  }

  // Метод для получения всех данных о книге в виде объекта
  get() {
      return {
          title: this.title,
          description: this.description,
          author: this.author,
          year: this.year,
          pages: this.pages
      };
  }
}

// Класс Catalog - управляет коллекцией книг
class Catalog {
  
  constructor() {
      this.data = [];
      this.lastId = 0;
  }

  // Метод добавления новой книги в каталог
  add(book) {
      const id = ++this.lastId;
      this.data.push({ id, ...book });
      return id;
  }

  // Метод редактирования существующей книги
  edit(id, newData) {
      
      const index = this.data.findIndex(book => book.id === id);
      if (index !== -1) {
          
          this.data[index] = { ...this.data[index], ...newData };
      }
  }

  // Метод удаления книги из каталога
  remove(id) {
      
      this.data = this.data.filter(book => book.id !== id);
  }

  // Метод получения книги или всех книг
  get(id) {
      if (id) {
         
          return this.data.find(book => book.id === id);
      }
      return this.data;
  }
}


class Library extends Catalog {
  
  constructor() {
      super();
      this.createInitialStructure();
      this.init();
  }

  // Метод создания всей HTML-структуры интерфейса
  createInitialStructure() {
      document.body.innerHTML = '';
      
      
      const library = document.createElement('div');
      library.className = 'library';
      
     
      const controls = document.createElement('div');
      controls.className = 'controls';
      
      
      const addButton = document.createElement('button');
      addButton.id = 'addButton';
      addButton.textContent = 'Добавить книгу';
      controls.appendChild(addButton);
      
      
      const catalog = document.createElement('div');
      catalog.className = 'catalog';
      
      
      library.appendChild(controls);
      library.appendChild(catalog);
      
      
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.id = 'bookModal';
      
      
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      
      
      const modalTitle = document.createElement('h2');
      modalTitle.textContent = 'Добавить/Редактировать книгу';
      
      
      const form = document.createElement('form');
      form.id = 'bookForm';
      
      
      const titleInput = this.createInput('text', 'title', 'Название книги');
      const authorInput = this.createInput('text', 'author', 'Автор');
      
      
      const descriptionTextarea = document.createElement('textarea');
      descriptionTextarea.id = 'description';
      descriptionTextarea.placeholder = 'Описание';
      
      
      const yearInput = this.createInput('number', 'year', 'Год издания');
      const pagesInput = this.createInput('number', 'pages', 'Количество страниц');
      
      
      const submitButton = document.createElement('button');
      submitButton.id = 'submitButton';
      submitButton.type = 'submit';
      submitButton.textContent = 'Сохранить'; 
      
      
      form.appendChild(titleInput);
      form.appendChild(authorInput);
      form.appendChild(descriptionTextarea);
      form.appendChild(yearInput);
      form.appendChild(pagesInput);
      form.appendChild(submitButton);
      
      
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(form);
      modal.appendChild(modalContent);
      
      
      document.body.appendChild(library);
      document.body.appendChild(modal);
  }
  
  // Вспомогательный метод для создания полей ввода
  createInput(type, id, placeholder) {
      const input = document.createElement('input');
      input.type = type;
      input.id = id;
      input.placeholder = placeholder;
      return input;
  }

  // Метод для получения ссылок на модальное окно и форму
  create() {
      const modal = document.getElementById('bookModal');
      const form = document.getElementById('bookForm');
      return { modal, form };
  }

  
  onAdd() {
      const { modal, form } = this.create();
      form.reset();
      modal.style.display = 'block';

      
      form.onsubmit = (e) => {
          e.preventDefault();
          
          const book = new Book(
              form.title.value,
              form.description.value,
              form.author.value,
              form.year.value,
              form.pages.value
          );
          this.add(book.get());
          modal.style.display = 'none';
          this.update();
      };
  }

  
  onEdit(id) {
      const { modal, form } = this.create();
      const book = this.get(id);
      
      
      form.title.value = book.title;
      form.description.value = book.description;
      form.author.value = book.author;
      form.year.value = book.year;
      form.pages.value = book.pages;
      
      modal.style.display = 'block';
      
      
      form.onsubmit = (e) => {
          e.preventDefault();
          
          this.edit(id, {
              title: form.title.value,
              description: form.description.value,
              author: form.author.value,
              year: form.year.value,
              pages: form.pages.value
          });
          modal.style.display = 'none'; 
          this.update();
      };
  }

  
  onRemove(id) {
      
      if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
          this.remove(id);
          this.update();
      }
  }

  // Метод обновления отображения книг в каталоге
  update() {
      const catalog = document.querySelector('.catalog');
      catalog.innerHTML = '';
      
      
      this.get().forEach(book => {
          const card = document.createElement('div');
          card.className = 'book-card';
          
          card.innerHTML = `
              <h3>${book.title}</h3>  <!-- Название книги -->
              <p><strong>Автор:</strong> ${book.author}</p> <!-- Автор -->
              <p>${book.description}</p> <!-- Описание -->
              <p><strong>Год:</strong> ${book.year}</p> <!-- Год издания -->
              <p><strong>Страниц:</strong> ${book.pages}</p> <!-- Количество страниц -->
              <button onclick="library.onEdit(${book.id})">Редактировать</button> <!-- Кнопка редактирования -->
              <button onclick="library.onRemove(${book.id})">Удалить</button> <!-- Кнопка удаления -->
          `;
          catalog.appendChild(card);
      });
  }

  // Метод инициализации обработчиков событий
  init() {
      
      const addButton = document.getElementById('addButton');
      addButton.addEventListener('click', () => this.onAdd());

      
      document.getElementById('bookModal').addEventListener('click', (e) => {
       
        if (e.target === document.getElementById('bookModal')) {
            document.getElementById('bookModal').style.display = 'none';
        }
    });
}
}

// Функция, которая будет вызвана при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  
  window.library = new Library();
  
  // Демонстрационные книги для примера
  library.add({
      title: "Мастер и Маргарита",
      author: "Михаил Булгаков",
      description: "Знаменитый роман о визите Воланда в Москву",
      year: 1940,
      pages: 480
  });
  
  library.add({
      title: "Война и мир",
      author: "Лев Толстой",
      description: "Эпический роман о событиях начала XIX века",
      year: 1869,
      pages: 1225
  });
  
  
  library.update();
});