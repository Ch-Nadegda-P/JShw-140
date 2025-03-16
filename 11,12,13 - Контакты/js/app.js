let app;

document.addEventListener("DOMContentLoaded", function () {
  let rootElement = document.getElementById("root");
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);
  }

  app = new ContactsApp();
});
