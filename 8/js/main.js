/* Домашняя работа №7. Работа с DOM и DOM.
Используя полученные знания выполните сл. задания:
Создайте HTML-документ (index.html) и подключите в него файл script.js.
Создайте стартовую структуру HTML-документа (точно так, как в примере):
<!DOCTYPE html>
<html>
<head>
<script src="script.js"></script>
</head>
<body></body>
</html>

Используя ТОЛЬКО ВОЗМОЖНОСТИ JAVASCRIPT (функции и методы
DOM и BOM) выполните верстку макета «Call_to_Action#3.fig»
(/Notes/WEB_DESIGN/Figma/Elements):

Важные условия:
1. В исходном файле index.html должна оставаться только стартовая
структура. Остальные элементы и их атрибуты, в т.ч. код CSS, должны
появляться динамически из JS.

2. Добавьте к <html> недостающий атрибут lang, а в <head></head>
недостающие и рекомендованные к использованию элементы (<meta>,
<title>).

3. CSS-код добавляйте только в тег <style></style>, используя только
селекторы классов. */
//====================================================================

document.head.innerHTML = " ";
document.body.innerHTML = " ";

let metaUtf8 = document.createElement("meta");
metaUtf8.setAttribute("charset", "utf-8");

let http_equiv = document.createElement("meta");
http_equiv.setAttribute("http-equiv", "X-UA-Compatible");
http_equiv.setAttribute("content", "IE=edge");

let metaViewport = document.createElement("meta");
metaViewport.setAttribute("name", "viewport");
metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");

let title = document.createElement("title");
title.innerHTML = "Choose Your Option";

console.log(document.head);

let style = document.createElement("style");
style.textContent = `
    @import url("https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
        
`;

document.head.appendChild(metaUtf8);
document.head.appendChild(http_equiv);
document.head.appendChild(metaViewport);
document.head.appendChild(title);
document.head.appendChild(style);
//-----------------------------------------------------------------------------------------------------
let container = document.createElement("div");
container.className = "container";
container.style.cssText = `
    text-align: center;
    padding: 50px 20px;
`;

let h1 = document.createElement("h1");
h1.textContent = "Choose Your Option";
h1.style.cssText = `
    font-family: Arvo;
    font-size: 36px;
    margin-bottom: 10px;
    color: rgb(33, 33, 33);
    font-weight: 400;
    line-height: 48px;
`;

let subtitle = document.createElement("p");
subtitle.className = "subtitle";
subtitle.textContent =
  "But I must explain to you how all this mistaken idea of denouncing";
subtitle.style.cssText = `
    color: rgb(159, 163, 167);
    font-family: OpenSans;
    font-size: 14px;
    font-weight: 400;
    line-height: 26px;
    margin: 10px auto;
`;

let options = document.createElement("div");
options.className = "options";
options.style.cssText = `
    display: flex;
    justify-content: center;
    max-width: 800px;
    height: 480px;
    margin: 55px auto;
    flex-wrap: wrap;
`;

function createOption(type) {
  let option = document.createElement("div");
  option.className = `option ${type}`;

  let baseStyles = `
        width: 300px;
        padding: 40px 20px;
        text-align: center;
        transition: transform 0.3s, box-shadow 0.3s;
    `;

  if (type === "freelancer") {
    option.style.cssText = `
            ${baseStyles}
            background-color: rgb(255, 255, 255);
            border: 1px solid rgb(159, 163, 167);
        `;
  } else {
    option.style.cssText = `
            ${baseStyles}
            background-color: rgb(143, 117, 190);
            color: rgb(255, 255, 255);
        `;
  }

  let h3 = document.createElement("h3");
  h3.textContent = type.toUpperCase();
  h3.style.cssText = `
        font-family: Montserrat;
        font-weight: 700;
        font-size: 12px;
        letter-spacing: 2.4px;
        margin-top: 50px;
        color: ${
          type === "studio" ? "rgb(255, 200, 10)" : "rgb(159, 163, 167)"
        };
    `;

  let h2 = document.createElement("h2");
  h2.textContent = "Initially designed to";
  h2.style.cssText = `
        font-family: Arvo;
        font-size: 36px;
        font-weight: 400;
        line-height: 46px;
        margin-top: 20px;
        color: ${type === "studio" ? "rgb(255, 255, 255)" : "rgb(33, 33, 33)"};
    `;

  let p = document.createElement("p");
  p.textContent =
    "But I must explain to you how all this mistaken idea of denouncing";
  p.style.cssText = `
        font-family: OpenSans;
        font-size: 12px;
        font-weight: 400;
        line-height: 22px;
        width: 210px;
        margin-top: 25px;
        margin-left: 45px;
        color: ${
          type === "studio" ? "rgb(255, 255, 255)" : "rgb(159, 163, 167)"
        };
    `;

  let button = document.createElement("button");
  button.textContent = "START HERE";
  button.style.cssText = `
        font-family: Montserrat;
        font-weight: 400;
        font-size: 12px;
        background: none;
        border: 2px solid rgb(255, 200, 10);
        border-radius: 25px;
        padding: 10px 20px;
        margin-top: 56px;
        cursor: pointer;
        transition: all 0.3s;
        color: ${type === "studio" ? "rgb(255, 200, 10)" : "rgb(33, 33, 33)"};
    `;

  button.onmouseover = () => {
    button.style.cssText = `
            font-family: Montserrat;
            font-weight: 400;
            font-size: 12px;
            background-color: rgb(255, 200, 10);
            border: 2px solid rgb(255, 200, 10);
            border-radius: 25px;
            padding: 10px 20px;
            margin-top: 56px;
            cursor: pointer;
            transition: all 0.3s;
            color: rgb(255, 255, 255);
        `;
  };

  button.onmouseout = () => {
    button.style.cssText = `
            font-family: Montserrat;
            font-weight: 400;
            font-size: 12px;
            background: none;
            border: 2px solid rgb(255, 200, 10);
            border-radius: 25px;
            padding: 10px 20px;
            margin-top: 56px;
            cursor: pointer;
            transition: all 0.3s;
            color: ${
              type === "studio" ? "rgb(255, 200, 10)" : "rgb(33, 33, 33)"
            };
        `;
  };

  option.addEventListener("mouseenter", () => {
    option.style.transform = "translateY(-5px)";
    option.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
  });

  option.addEventListener("mouseleave", () => {
    option.style.transform = "translateY(0)";
    option.style.boxShadow = "none";
  });

  option.appendChild(h3);
  option.appendChild(h2);
  option.appendChild(p);
  option.appendChild(button);

  return option;
}

options.appendChild(createOption("freelancer"));
options.appendChild(createOption("studio"));

container.appendChild(h1);
container.appendChild(subtitle);
container.appendChild(options);

document.body.appendChild(container);
console.log(document.body);
