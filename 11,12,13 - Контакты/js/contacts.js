class Contacts {
  constructor() {
    this.data = [];
  }

  add(userData) {
    let user = new User(userData);
    this.data.push(user);
    return user;
  }

  edit(id, obj) {
    let user = this.data.find((user) => user.get().id === id);
    if (user) {
      user.edit(obj);
      return true;
    }
    return false;
  }

  remove(id) {
    let index = this.data.findIndex((user) => user.get().id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }

  get() {
    return this.data;
  }
}
