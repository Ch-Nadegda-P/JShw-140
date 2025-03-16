class User {
  constructor(userData) {
    this.data = userData;
  }

  edit(obj) {
    this.data = { ...this.data, ...obj };
  }

  get() {
    return this.data;
  }
}
