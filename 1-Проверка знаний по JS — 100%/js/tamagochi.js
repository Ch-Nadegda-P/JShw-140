console.log("--------------tamagochi------------------");
// 10. Создайте функцию-конструктор или отдельный простой объект "Тамагочи" с минимальным набором функций: включение,
// выключение, вывод общей информации о состоянии (имя, дата рождения, здоровье по 5-бальной шкале, сытость по 5 шкале,
// сон в часах от 0 до 8), покормить, спать. При включении "друга" запрашивается имя, автоматически добавляется
// дата рождения, и все показатели состояния устанавливаются в максимальные значения. Каждую минуту (или 1 час,
// как вы захотите), показатель сытости уменьшается на одну единицу. Каждый раз, когда сытость доходит до 1
// и меньше, то уменьшается здоровье на 1 единицу. Если "друг" не спал больше 6 часов, то каждый последующий
// час здоровье уменьшается на 1 единицу. Чтобы восстановить здоровье, нужно быть сытым и хорошо спать: при
// каждом вызове метода "покормить" или "спать" соотв. параметры увеличиваются на 1 единицу. Каждый раз,
// когда параметры сон и сытость приходят к значению 5, то здоровье увеличивается на 1 единицу, но не может
// превышать максимального значения. По вашему желанию, функции тамагочи могут быть улучшены или добавлены новые.
// Проявите фантазию!

function Tamagotchi(name, birthDate, birthPlace) {
  this.name = name;
  this.birthDate = birthDate;
  this.birthPlace = birthPlace;
  this.health = 5;
  this.hunger = 5;
  this.sleep = 8;
  this.isAlive = true;

  this.getInfo = function () {
    return `Здоровье: ${this.health}, Сытость: ${this.hunger}, Сон: ${this.sleep}`;
  };

  this.getGreeting = function () {
    return `Привет, я твой друг ${this.name}. Я родился ${this.birthDate} года в ${this.birthPlace}.`;
  };

  this.decreaseStats = function () {
    if (this.isAlive) {
      this.health = Math.max(0, this.health - 1);
      this.hunger = Math.max(0, this.hunger - 1);
      this.sleep = Math.max(0, this.sleep - 1);
      console.log(`Показатели после уменьшения: ${this.getInfo()}`);  
    }
    if (this.health <= 0) {
      this.isAlive = false;
      console.log("Тамагочи умер.");  
    }
  };

  this.restoreStats = function () {
    this.health = 5;
    this.hunger = 5;
    this.sleep = 8;
  };

  this.feed = function () {
    if (this.hunger < 5) this.hunger++;
  };

  this.heal = function () {
    if (this.health < 5) this.health++;
  };
}

const myPet = new Tamagotchi("Серёжа", "30 ноября 2024", "Минске");
let interval;

function showMessage(message, blinking = false) {
  const messageBox = document.getElementById("message-box");
  messageBox.innerText = message;
  if (blinking) {
    messageBox.style.animation = "blink 1s infinite";
  } else {
    messageBox.style.animation = "none";
  }
  messageBox.classList.remove("hidden");
  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 10000); 
}

function turnOn() {
  myPet.restoreStats();
  document.getElementById("greeting").innerText = myPet.getGreeting();
  document.getElementById("health").innerText = "Здоровье: " + myPet.health;
  document.getElementById("hunger").innerText = "Сытость: " + myPet.hunger;
  document.getElementById("sleep").innerText = "Сон: " + myPet.sleep;

  document.getElementById("greeting").classList.remove("hidden");
  document.getElementById("info").classList.remove("hidden");

  const tamagotchi = document.getElementById("tamagotchi");
  tamagotchi.classList.remove("closed-eyes");
  tamagotchi.querySelector(".tamagotchi-frown").classList.add("hidden");
  tamagotchi.querySelector(".tamagotchi-smile").classList.remove("hidden");

  showMessage("Привет... Я тебя видел во сне!");

  interval = setInterval(function () {
    myPet.decreaseStats();
    document.getElementById("health").innerText = "Здоровье: " + myPet.health;
    document.getElementById("hunger").innerText = "Сытость: " + myPet.hunger;
    document.getElementById("sleep").innerText = "Сон: " + myPet.sleep;
    console.log("Интервал выполняется.");
  }, 60000); 
}

function turnOff() {
  clearInterval(interval);

  document.getElementById("greeting").classList.add("hidden");
  document.getElementById("info").classList.add("hidden");

  const tamagotchi = document.getElementById("tamagotchi");
  tamagotchi.classList.add("closed-eyes");
  tamagotchi.querySelector(".tamagotchi-frown").classList.remove("hidden");
  tamagotchi.querySelector(".tamagotchi-smile").classList.add("hidden");

  showMessage("До встречи после сна!");
}

function feed() {
  myPet.feed();
  document.getElementById("hunger").innerText = "Сытость: " + myPet.hunger;
  showMessage("Мх... Вкусненько!");
}

function heal() {
  myPet.heal();
  document.getElementById("health").innerText = "Здоровье: " + myPet.health;
  showMessage("Ох... Спасибо, доктор!");
}
