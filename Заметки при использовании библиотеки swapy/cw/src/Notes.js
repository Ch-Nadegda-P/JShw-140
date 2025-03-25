class Notes extends Storage {

  #data = [];

  constructor(...args) {
      super(
          'notes', 
          'https://jsonplaceholder.typicode.com/posts', 
          ...args
      );
      
      this.lastId = 0;
  }

  add(title, content, color) {
      if (!title && !content) return;

      this.lastId++;

      let note = {
          id: this.lastId,
          create: Date.now()
      };

      if (title) note.title = title;
      if (content) note.content = content;
      if (color) note.color = color;

      this.#data.push(note);
      this.data = this.#data;

      return true;
  }

  edit(id, newData = {}) {
      if (!id) return false;

      let note = this.#data.find((item) => {
          return item.id == id;
      });

      if (!note) return false;

      for (let key in newData) {
          let value = newData[key];
          note[key] = value;
      }

      if (!note.title && !note.content) {
          this.remove(id);
          return false;
      }

      this.data = this.#data;

      return true;
  }

  remove(id) {
      if (!id) return;

      let dataTmp = this.#data.filter((item) => {
          return item.id != id;
      });

      this.#data = dataTmp;
      this.data = this.#data;
  }

  getLastId(data) {
      let maxId = 0;

      data.forEach(item => {
          if (item.id > maxId) maxId = item.id;
      });

      return maxId;
  }

  async get(id) {
      this.#data = await this.getData();

      this.lastId = this.getLastId(this.#data);

      if (id > 0) {
          let note = this.#data.find((item) => {
              return item.id == id;
          });

          if (note) return note;
          return false;
      }
      
      return this.#data;
  }
  
  // Метод для обновления порядка заметок
  updateOrder(orderedNotes) {
      if (!Array.isArray(orderedNotes) || orderedNotes.length === 0) return;
      
      this.#data = orderedNotes;
      this.data = this.#data;
  }
}
