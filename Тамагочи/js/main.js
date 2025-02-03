//------------------------------------------
function Tamagotchi() {
  this.hunger = 200;
  this.happiness = 200;
  this.energy = 200;
  this.isAlive = true;

  this.init();

  let self = this;
  setInterval(function () {
    self.decreaseStats();
  }, 1000);
}

//--------------------------------------------------
Tamagotchi.prototype.init = function () {
  let app = document.querySelector("div");
  if (!app) {
    app = document.createElement("div");
    document.body.appendChild(app);
  }

  let tamagotchi = document.createElement("div");
  tamagotchi.className = "tamagotchi";

  let petName = document.createElement("div");
  petName.className = "pet-name";
  petName.textContent = "Няша";

  let screen = document.createElement("div");
  screen.className = "screen";

  let gameContainer = document.createElement("div");
  gameContainer.className = "game-container";

  gameContainer.appendChild(this.createColorPicker("bow", "Бантики"));
  gameContainer.appendChild(this.createPetGirl());
  gameContainer.appendChild(this.createColorPicker("dress", "Платье"));

  screen.appendChild(gameContainer);
  screen.appendChild(this.createStats());

  tamagotchi.appendChild(petName);
  tamagotchi.appendChild(screen);
  tamagotchi.appendChild(this.createControls());

  app.appendChild(tamagotchi);

  this.initEventListeners();
};

//-----------------------------------------------------------------
Tamagotchi.prototype.createColorPicker = function (type, title) {
  let container = document.createElement("div");
  container.className = type + "-colors";

  let heading = document.createElement("h3");
  heading.textContent = title;

  let picker = document.createElement("div");
  picker.className = "color-picker";

  for (let i = 1; i <= 5; i++) {
    let circle = document.createElement("div");
    circle.className = "color-circle";
    circle.setAttribute("data-color", i);
    circle.setAttribute("data-target", type);
    picker.appendChild(circle);
  }

  container.appendChild(heading);
  container.appendChild(picker);
  return container;
};

//----------------------------------------------------------
Tamagotchi.prototype.createPetGirl = function () {
  let petGirl = document.createElement("div");
  petGirl.className = "pet-girl";

  let head = document.createElement("div");
  head.className = "head";

  let bowLeft = document.createElement("div");
  bowLeft.className = "bow bow-left";
  let bowRight = document.createElement("div");
  bowRight.className = "bow bow-right";

  let eyeLeft = document.createElement("div");
  eyeLeft.className = "eye eye-left";
  let eyeRight = document.createElement("div");
  eyeRight.className = "eye eye-right";

  let mouth = document.createElement("div");
  mouth.className = "mouth";

  head.appendChild(bowLeft);
  head.appendChild(bowRight);
  head.appendChild(eyeLeft);
  head.appendChild(eyeRight);
  head.appendChild(mouth);

  let dress = document.createElement("div");
  dress.className = "dress";

  let armLeft = document.createElement("div");
  armLeft.className = "arm arm-left";
  let armRight = document.createElement("div");
  armRight.className = "arm arm-right";

  let legLeft = document.createElement("div");
  legLeft.className = "leg leg-left";
  let legRight = document.createElement("div");
  legRight.className = "leg leg-right";

  petGirl.appendChild(head);
  petGirl.appendChild(dress);
  petGirl.appendChild(armLeft);
  petGirl.appendChild(armRight);
  petGirl.appendChild(legLeft);
  petGirl.appendChild(legRight);

  return petGirl;
};

//----------------------------------------------------
Tamagotchi.prototype.createStats = function () {
  let stats = document.createElement("div");
  stats.className = "stats";

  let hunger = document.createElement("div");
  hunger.className = "hunger";
  hunger.innerHTML = "Голод: <span>200</span>";

  let happiness = document.createElement("div");
  happiness.className = "happiness";
  happiness.innerHTML = "Счастье: <span>200</span>";

  let energy = document.createElement("div");
  energy.className = "energy";
  energy.innerHTML = "Энергия: <span>200</span>";

  stats.appendChild(hunger);
  stats.appendChild(happiness);
  stats.appendChild(energy);
  return stats;
};

//------------------------------------------------------
Tamagotchi.prototype.createControls = function () {
  let controls = document.createElement("div");
  controls.className = "controls";

  let feedBtn = document.createElement("button");
  feedBtn.textContent = "Покормить";

  let playBtn = document.createElement("button");
  playBtn.textContent = "Играть";

  let sleepBtn = document.createElement("button");
  sleepBtn.textContent = "Спать";

  controls.appendChild(feedBtn);
  controls.appendChild(playBtn);
  controls.appendChild(sleepBtn);
  return controls;
};

//----------------------------------------------------------
Tamagotchi.prototype.createDeathPopup = function () {
  let popup = document.createElement("div");
  popup.className = "death-popup";

  let cross = document.createElement("div");
  cross.className = "orthodox-cross";
  cross.innerHTML = "☦";

  let message = document.createElement("div");
  message.className = "death-message";
  message.textContent = "Соболезнуем, ваша Няша умерла";

  popup.appendChild(cross);
  popup.appendChild(message);
  return popup;
};

//------------------------------------------------------------------
Tamagotchi.prototype.generateRandomOperations = function () {
  let multiply = Math.floor(Math.random() * 30) + 2;
  let subtract = Math.floor(Math.random() * 30) + 1;
  let add = Math.floor(Math.random() * 30) + 1;

  let result = 2;
  result = result * multiply;
  result = result - subtract;
  result = result + add;

  let operations = new Object();
  operations.multiply = multiply;
  operations.subtract = subtract;
  operations.add = add;
  operations.result = result;

  return operations;
};

//--------------------------------------------------------
Tamagotchi.prototype.createMathGame = function () {
  let existingPopup = document.querySelector(".math-game-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  let operations = this.generateRandomOperations();

  let steps = new Array();

  steps[0] = {
    message: "Ура! Давай играть! Готов?",
    type: "greeting",
  };
  steps[1] = {
    message: "Загадай любое число! Загадал?",
    type: "start",
  };
  steps[2] = {
    message: "Прибавь к нему такое же число!",
    type: "step",
  };
  steps[3] = {
    message:
      "Теперь раздели полученную сумму на число, которое загадал.\n(Если нужно, используй калькулятор)",
    type: "step",
  };
  steps[4] = {
    message: "Умножь результат на " + operations.multiply,
    type: "step",
  };
  steps[5] = {
    message: "Отними " + operations.subtract,
    type: "step",
  };
  steps[6] = {
    message: "Прибавь " + operations.add,
    type: "step",
  };
  steps[7] = {
    message: "Готов узнать результат?",
    type: "final",
  };
  steps[8] = {
    message: "У тебя получилось число " + operations.result + "!",
    type: "result",
  };

  this.showGameStep(steps, 0);
};

//---------------------------------------------------------------------
Tamagotchi.prototype.showGameStep = function (steps, currentStep) {
  let self = this;

  let gamePopup = document.createElement("div");
  gamePopup.className = "math-game-popup";

  let message = document.createElement("div");
  message.className = "game-message";
  message.textContent = steps[currentStep].message;

  let button = document.createElement("button");
  button.className = "game-button";
  button.textContent = "OK";

  function handleAction(e) {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      gamePopup.remove();
      button.removeEventListener("click", handleAction);
      document.removeEventListener("keydown", handleAction);

      if (currentStep === steps.length - 1) {
        self.happiness = Math.min(200, self.happiness + 20);
        self.updateUI();
        return;
      }

      self.showGameStep(steps, currentStep + 1);
    }
  }

  button.addEventListener("click", handleAction);
  document.addEventListener("keydown", handleAction);

  gamePopup.appendChild(message);
  gamePopup.appendChild(button);
  document.querySelector(".screen").appendChild(gamePopup);
};

//-----------------------------------------------------------
Tamagotchi.prototype.initEventListeners = function () {
  let self = this;
  let buttons = document.querySelector(".controls").children;

  buttons[0].addEventListener("click", function () {
    self.feed();
  });
  buttons[1].addEventListener("click", function () {
    self.play();
  });
  buttons[2].addEventListener("click", function () {
    self.sleep();
  });

  let circles = document.querySelectorAll(".color-circle");
  for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener("click", function (e) {
      let color = window.getComputedStyle(e.target).backgroundColor;
      let target = e.target.getAttribute("data-target");

      if (target === "bow") {
        let bows = document.querySelectorAll(".bow");
        for (let j = 0; j < bows.length; j++) {
          bows[j].style.borderBottomColor = color;
        }
      } else if (target === "dress") {
        document.querySelector(".dress").style.borderBottomColor = color;
      }
    });
  }
};

//----------------------------------------------------------
Tamagotchi.prototype.decreaseStats = function () {
  if (!this.isAlive) return;

  this.hunger -= 2;
  this.happiness -= 1;
  this.energy -= 1;

  this.checkStats();
  this.updateUI();
};

//--------------------------------------------
Tamagotchi.prototype.feed = function () {
  if (!this.isAlive) return;
  this.hunger = Math.min(200, this.hunger + 30);
  this.updateUI();
};

Tamagotchi.prototype.play = function () {
  if (!this.isAlive || this.energy < 20) return;
  this.createMathGame();
  this.energy -= 20;
  this.updateUI();
};

Tamagotchi.prototype.sleep = function () {
  if (!this.isAlive) return;
  this.energy = 200;
  this.updateUI();
};

//------------------------------------------------
Tamagotchi.prototype.checkStats = function () {
  if (this.hunger <= 0 || this.happiness <= 0) {
    this.isAlive = false;
    let screen = document.querySelector(".screen");
    screen.appendChild(this.createDeathPopup());
  }
};

//-------------------------------------------------
Tamagotchi.prototype.updateUI = function () {
  document.querySelector(".hunger span").textContent = this.hunger;
  document.querySelector(".happiness span").textContent = this.happiness;
  document.querySelector(".energy span").textContent = this.energy;
};

//-------------------------
let pet = new Tamagotchi();
