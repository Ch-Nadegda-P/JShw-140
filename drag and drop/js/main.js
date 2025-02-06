let sentences = {
  first: ["В комнате", "горела", "лампа", "освещая", "книги", "на полке"],
  second: ["На улице", "лежал", "снег", "укрывая", "машины", "и", "деревья"],
};

let header = document.createElement("div");
header.className = "header";

let title = document.createElement("h1");
title.className = "title";
title.textContent =
  "Попробуй переставить слова из этих предложений так, чтобы они оставались понятными:";
header.appendChild(title);

let container = document.createElement("div");
container.className = "container";

for (let i = 0; i < 3; i++) {
  let box = document.createElement("div");
  box.className = "box";

  // Заполняем первый бокс
  if (i === 0) {
    sentences.first.forEach((word) => {
      //
      let div = document.createElement("div");
      div.className = "div";
      div.draggable = true;
      div.textContent = word;
      box.appendChild(div);
    });
  } else if (i === 1) {
    sentences.second.forEach((word) => {
      let div = document.createElement("div");
      div.className = "div";
      div.draggable = true;
      div.textContent = word;
      box.appendChild(div);
    });
  }
  container.appendChild(box);
}

document.body.appendChild(header);
document.body.appendChild(container);

let draggables = document.querySelectorAll(".div");
let containers = document.querySelectorAll(".box");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragging");

    let rect = draggable.getBoundingClientRect();
    let centerX = rect.width / 2;
    let centerY = rect.height / 2;

    e.dataTransfer.setDragImage(new Image(), centerX, centerY);
    draggable.style.cursor = "move";
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    let draggable = document.querySelector(".dragging");
    let siblings = [...box.querySelectorAll(".div:not(.dragging)")];

    siblings.forEach((sibling) => {
      let rect = sibling.getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        sibling.style.transform = "translateY(10px)";
      } else {
        sibling.style.transform = "translateY(0)";
      }
    });

    let nextSibling = siblings.find((sibling) => {
      let rect = sibling.getBoundingClientRect();
      return e.clientY < rect.top + rect.height / 2;
    });

    if (nextSibling) {
      box.insertBefore(draggable, nextSibling);
    } else {
      box.appendChild(draggable);
    }
  });

  box.addEventListener("dragleave", () => {
    let siblings = [...box.querySelectorAll(".div:not(.dragging)")];
    siblings.forEach((sibling) => {
      sibling.style.transform = "translateY(0)";
    });
  });

  box.addEventListener("drop", () => {
    let siblings = [...box.querySelectorAll(".div:not(.dragging)")];
    siblings.forEach((sibling) => {
      sibling.style.transform = "translateY(0)";
    });
  });
});
