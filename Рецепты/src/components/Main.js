class Main {
  create() {
    let elem = document.createElement("main");
    elem.classList.add("main");

    let container = document.createElement("div");
    container.classList.add("container");
    elem.appendChild(container);

    return elem;
  }

  init() {
    let elem = this.create();
    return elem;
  }
}

let main = new Main().init();

export { main };
