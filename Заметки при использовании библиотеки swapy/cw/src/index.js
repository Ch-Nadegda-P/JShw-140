window.addEventListener('load', () => {
  // Инициализируем приложение заметок
  const notesApp = new NotesUI('root');
  
  // Добавляем обработчик для клавиши Escape, чтобы закрывать модальные окна
  document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
          const modal = document.querySelector('.note__form_edit');
          if (modal) modal.remove();
      }
  });
  
  // Добавляем обработчик для клика вне модального окна
  document.addEventListener('click', (event) => {
      const modal = document.querySelector('.note__form_edit');
      if (modal && !modal.contains(event.target) && 
          !event.target.closest('.notes__item')) {
          modal.remove();
      }
  });
});