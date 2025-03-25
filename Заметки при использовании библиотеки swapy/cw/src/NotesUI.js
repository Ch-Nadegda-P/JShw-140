class NotesUI extends Notes {

  constructor(id) {
      super();

      if (!id) return;
      
      this.id = id;
      this.elems = null;
      this.swapy = null;

      this.init();
      this.update();
  }

  create() {
      let notesElem = document.createElement('div');
      notesElem.classList.add('notes');

      let formElem = document.createElement('div');
      formElem.classList.add('notes__form');

          let fieldTitle = document.createElement('input');
          fieldTitle.classList.add('notes__field_title');
          fieldTitle.type = 'text';
          fieldTitle.placeholder = 'Заметки';

          let fieldContent = document.createElement('textarea');
          fieldContent.classList.add('notes__field_content');
          fieldContent.placeholder = 'Примечание......';

      let listElem = document.createElement('ul');
      listElem.classList.add('notes__list');
      // Добавляем атрибут для Swapy
      listElem.setAttribute('data-swapy-container', 'true');

      formElem.append(fieldTitle, fieldContent);

      notesElem.append(formElem, listElem);

      return {
          main: notesElem,
          fieldTitle: fieldTitle,
          fieldContent: fieldContent,
          list: listElem
      };
  }

  createItem(title, content, id) {
      if (!title && !content) return;

      // Создаем слот для заметки
      let slotElem = document.createElement('li');
      slotElem.classList.add('notes__slot');
      slotElem.setAttribute('data-swapy-slot', `note-slot-${id}`);

      // Создаем саму заметку как элемент Swapy
      let itemElem = document.createElement('div');
      itemElem.classList.add('notes__item', 'note');
      itemElem.setAttribute('data-swapy-item', `note-item-${id}`);
      itemElem.id = id;

      // Создаем ручку для перетаскивания
      let handleElem = document.createElement('div');
      handleElem.classList.add('note__handle');
      handleElem.setAttribute('data-swapy-handle', '');

      let itemTitle = document.createElement('h3');
      itemTitle.classList.add('note__title');
      itemTitle.innerHTML = title;

      let itemContent = document.createElement('div');
      itemContent.classList.add('note__content');
      itemContent.innerHTML = content;

      let itemBtns = document.createElement('div');
      itemBtns.classList.add('note__btns');

      let itemBtnRemove = document.createElement('button');
      itemBtnRemove.classList.add('note__btn_remove');

      itemBtns.append(itemBtnRemove);
      itemElem.append(handleElem, itemTitle, itemContent, itemBtns);
      slotElem.append(itemElem);

      itemBtnRemove.addEventListener('click', (event) => {
          this.onRemove(id);
      });

      itemElem.addEventListener('dblclick', (event) => {
          if (event.target !== handleElem) {
              this.onEdit(id);
          }
      });

      return slotElem;
  }

  onAdd(event) {
      if (!event || event.code != 'Enter') return false;

      let titleValue = this.elems.fieldTitle.value;
      let contentValue = this.elems.fieldContent.value;

      this.elems.fieldTitle.value = '';
      this.elems.fieldContent.value = '';

      this.add(titleValue, contentValue);
      this.update();
  }

  onEdit(id) {
      this.showFormEdit(id);
  }

  onSave(id, title, content, modalElem) {
      let newData = {
          title: title,
          content: content
      };

      this.edit(id, newData);
      modalElem.remove();
      this.update();
  }

  onRemove(id) {
      this.remove(id);
      this.update();
  }

  saveOrder(slotItemMap) {
      // Получаем текущие данные
      let currentData = this.data || [];
      
      // Создаем массив с новым порядком
      const orderedNotes = [];
      
      // Преобразуем карту слотов в массив идентификаторов заметок
      const orderedIds = slotItemMap.asArray
          .map(item => parseInt(item.item.replace('note-item-', '')))
          .filter(id => !isNaN(id));
      
      // Сортируем заметки в соответствии с новым порядком
      orderedIds.forEach(id => {
          const note = currentData.find(note => note.id === id);
          if (note) orderedNotes.push(note);
      });
      
      // Добавляем заметки, которые могли не попасть в список (если такие есть)
      currentData.forEach(note => {
          if (!orderedIds.includes(note.id)) {
              orderedNotes.push(note);
          }
      });
      
      // Сохраняем новый порядок в localStorage
      this.data = orderedNotes;
  }

  async update() {
      this.elems.list.innerHTML = '';

      let data = await this.get();
      
      data.forEach((item) => {
          let itemElem = this.createItem(item.title || '', item.content || '', item.id);
          if (itemElem) this.elems.list.append(itemElem);
      });

      // Инициализируем Swapy, если есть хотя бы 2 заметки
      if (data && data.length > 1) {
          if (this.swapy) {
              this.swapy.update();
          } else {
              this.initSwapy();
          }
      }
  }

  initSwapy() {
      // Инициализируем Swapy
      this.swapy = Swapy.createSwapy(this.elems.list, {
          animation: 'spring', // Используем анимацию spring для более плавного эффекта
          swapMode: 'hover'    // Меняем местами при наведении
      });

      // Добавляем обработчик события для сохранения порядка
      this.swapy.onSwap((event) => {
          this.saveOrder(event.newSlotItemMap);
      });
  }

  async showFormEdit(id) {
      let noteData = await this.get(id);

      if (!noteData) return;

      let modalElem = document.createElement('div');
      modalElem.classList.add('note__form_edit');

      let fieldTitle = document.createElement('input');
          fieldTitle.classList.add('note__field_title');
          fieldTitle.type = 'text';

      let fieldContent = document.createElement('textarea');
      fieldContent.classList.add('note__field_content');

      let itemBtnSave = document.createElement('button');
      itemBtnSave.classList.add('note__btn_save');
      itemBtnSave.innerHTML = 'Save';

      let itemBtnClose = document.createElement('button');
      itemBtnClose.classList.add('note__btn_close');
      itemBtnClose.innerHTML = 'Close';

      fieldTitle.value = noteData.title || '';
      fieldContent.value = noteData.content || '';

      modalElem.append(fieldTitle, fieldContent, itemBtnSave, itemBtnClose);

      document.body.append(modalElem);

      itemBtnSave.addEventListener('click', () => {
          let title = fieldTitle.value;
          let content = fieldContent.value;

          this.onSave(id, title, content, modalElem);
      });

      itemBtnClose.addEventListener('click', () => {
          modalElem.remove();
      });
  }

  init() {
      let rootElem = document.querySelector(`#${this.id}`);
      if (!rootElem) return;

      this.elems = this.create();

      rootElem.append(this.elems.main);

      this.elems.fieldTitle.addEventListener('keypress', (event) => {
          this.onAdd(event);
      });
      
      this.elems.fieldContent.addEventListener('keypress', (event) => {
          this.onAdd(event);
      });
  }
}
