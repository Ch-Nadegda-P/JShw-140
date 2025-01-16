let ToDoList = function() {
  // ---------------------
  let tasks = [];
  let currentEditingTask = null;
  let container, input, list, clearButton, overlay, editPopup, editInput;

  // -----------------------------------------
  let createMainStructure = function() {
      container = document.createElement('div');
      container.className = 'todo';

      let title = document.createElement('h3');
      title.className = 'todo__title';
      title.textContent = 'ToDo List';

      input = document.createElement('input');
      input.className = 'todo__field-name';
      input.placeholder = 'Type your task...';

      list = document.createElement('ul');
      list.className = 'todo__list';

      clearButton = document.createElement('button');
      clearButton.className = 'button__clear';
      clearButton.textContent = 'Очистить список';

      container.append(title, input, list, clearButton);
      document.body.appendChild(container);
  };

  // -------------------------------------------
  let createEditPopup = function() {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.style.display = 'none';

      editPopup = document.createElement('div');
      editPopup.className = 'edit-popup';
      editPopup.style.display = 'none';

      let closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      closeButton.addEventListener('click', closeEditPopup);

      editInput = document.createElement('input');
      editInput.className = 'edit-input';

      let hint = document.createElement('div');
      hint.className = 'edit-popup__hint';
      hint.textContent = 'Для сохранения изменений нажмите Enter';

      editPopup.append(closeButton, editInput, hint);
      document.body.append(overlay, editPopup);
  };

  // --------------------------------------
  let initEventListeners = function() {
      input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && input.value.trim()) {
              addTask(input.value.trim());
              input.value = '';
          }
      });

      clearButton.addEventListener('click', clearAll);

      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
              closeEditPopup();
          }
      });
  };

  // ------------------------------
  let addTask = function(text) {
      let task = {
          text: text,
          completed: false
      };
      tasks.push(task);
      render();
  };

  // --------------------------------------
  let createTaskElement = function(task, index) {
      let li = document.createElement('li');
      li.className = 'todo__item';

      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo__status';
      checkbox.checked = task.completed;

      let span = document.createElement('span');
      span.className = 'todo__name';
      if (task.completed) span.classList.add('completed');
      span.textContent = task.text;

      let deleteBtn = document.createElement('button');
      deleteBtn.className = 'button__delete';
      deleteBtn.textContent = 'Удалить';

      addTaskEventListeners(checkbox, span, deleteBtn, index);

      li.append(checkbox, span, deleteBtn);
      return li;
  };

  // ------------------------------------------------------------
  let addTaskEventListeners = function(checkbox, span, deleteBtn, index) {
      checkbox.addEventListener('change', () => toggleTask(index));
      
      span.addEventListener('mouseenter', (e) => showTooltip(e.target));
      span.addEventListener('mouseleave', hideTooltip);
      span.addEventListener('click', () => editTask(index));
      
      deleteBtn.addEventListener('click', () => deleteTask(index));
  };

  // ---------------------------------
  let showTooltip = function(element) {
      hideTooltip();
      let tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = 'Изменить задачу? Нажмите';
      document.body.appendChild(tooltip);

      let rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.top = `${rect.top}px`;
  };

  // ------------------------------
  let hideTooltip = function() {
      let tooltip = document.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
  };

  // ---------------------------------
  let editTask = function(index) {
      let task = tasks[index];
      if (task) {
          currentEditingTask = index;
          editInput.value = task.text;

          let mainInput = input.getBoundingClientRect();
          editPopup.style.top = `${mainInput.top + window.scrollY}px`;

          overlay.style.display = 'block';
          editPopup.style.display = 'block';
          editInput.focus();

          editInput.onkeydown = (e) => {
              if (e.key === 'Enter') {
                  saveEditedTask();
              }
          };
      }
  };

  // ----------------------------------
  let saveEditedTask = function() {
      if (currentEditingTask !== null && editInput.value.trim()) {
          tasks[currentEditingTask].text = editInput.value.trim();
          render();
          closeEditPopup();
      }
  };

  // ---------------------------------
  let closeEditPopup = function() {
      editPopup.style.display = 'none';
      overlay.style.display = 'none';
      currentEditingTask = null;
      editInput.value = '';
  };

  // ---------------------------------
  let toggleTask = function(index) {
      tasks[index].completed = !tasks[index].completed;
      render();
  };

  // -------------------------------
  let deleteTask = function(index) {
      tasks.splice(index, 1);
      render();
  };

  // --------------------------
  let clearAll = function() {
      tasks = [];
      render();
  };

  // -----------------------
  let render = function() {
      list.innerHTML = '';
      tasks.forEach((task, index) => {
          list.appendChild(createTaskElement(task, index));
      });
  };

  // ----------------------------
  let showUi = function() {
      createMainStructure();
      createEditPopup();
      initEventListeners();
      render();
  };

  showUi();
};

window.addEventListener("load", function() {
  new ToDoList();
});

