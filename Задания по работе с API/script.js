let pageTitle = createElement("h1", {}, "Задания по работе с API");
document.body.appendChild(pageTitle);

document.body.insertBefore(pageTitle, document.body.firstChild);

function createElement(tag, attributes = {}, textContent = "") {
  let element = document.createElement(tag);

  for (let [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

function createTaskSection(taskNumber, taskTitle, taskDescription) {
  let section = createElement("div", {
    class: "task-section",
    id: `task${taskNumber}`,
  });
  let title = createElement(
    "h2",
    { class: "task-title" },
    `Задание ${taskNumber}: ${taskTitle}`
  );
  let description = createElement(
    "p",
    { class: "task-description" },
    taskDescription
  );

  section.appendChild(title);
  section.appendChild(description);

  document.body.appendChild(section);
  return section;
}

// ===========================================================================================
// Задание 1: Получение данных пользователя
// ===========================================================================================

let task1Section = createTaskSection(
  1,
  "Данные пользователя",
  "Получение данных пользователя по URL https://jsonplaceholder.typicode.com/users/1 и вывод имени, email, полного адреса и телефона."
);

let fetchUserButton = createElement(
  "button",
  { id: "fetchUserButton" },
  "Получить данные пользователя"
);
let userDataContainer = createElement("div", {
  id: "userData",
  class: "result-container",
});

task1Section.appendChild(fetchUserButton);
task1Section.appendChild(userDataContainer);

function fetchUserData() {
  userDataContainer.textContent = "Загрузка...";

  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((user) => {
      userDataContainer.innerHTML = "";

      let fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

      let nameInfo = createElement("div", { class: "user-info" });
      nameInfo.innerHTML = "<strong>Имя:</strong> " + user.name;

      let emailInfo = createElement("div", { class: "user-info" });
      emailInfo.innerHTML = "<strong>Email:</strong> " + user.email;

      let addressInfo = createElement("div", { class: "user-info" });
      addressInfo.innerHTML = "<strong>Адрес:</strong> " + fullAddress;

      let phoneInfo = createElement("div", { class: "user-info" });
      phoneInfo.innerHTML = "<strong>Телефон:</strong> " + user.phone;

      userDataContainer.appendChild(nameInfo);
      userDataContainer.appendChild(emailInfo);
      userDataContainer.appendChild(addressInfo);
      userDataContainer.appendChild(phoneInfo);
    })
    .catch((error) => {
      userDataContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

fetchUserButton.addEventListener("click", fetchUserData);

// ===========================================================================================
// Задание 2: Случайное изображение собаки
// ===========================================================================================

let task2Section = createTaskSection(
  2,
  "Случайное изображение собаки",
  "Запрос к API для получения случайного изображения собаки (https://dog.ceo/api/breeds/image/random) и вывод его на веб-странице."
);

let fetchDogButton = createElement(
  "button",
  { id: "fetchDogButton" },
  "Показать случайную собаку"
);
let dogContainer = createElement("div", {
  id: "dogContainer",
  class: "result-container",
});

task2Section.appendChild(fetchDogButton);
task2Section.appendChild(dogContainer);

function fetchRandomDog() {
  dogContainer.innerHTML = '<p class="loading">Загрузка изображения...</p>';

  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "success" && data.message) {
        dogContainer.innerHTML = "";

        let dogImage = createElement("img", {
          src: data.message,
          alt: "Случайное изображение собаки",
          class: "dog-image",
        });

        dogContainer.appendChild(dogImage);
      } else {
        throw new Error("Неожиданный формат данных от API");
      }
    })
    .catch((error) => {
      dogContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

fetchDogButton.addEventListener("click", fetchRandomDog);

// ===========================================================================================
// Задание 3: Информация о персонаже Звездных войн
// ===========================================================================================

let task3Section = createTaskSection(
  3,
  "Информация о персонаже Звездных войн",
  "Получение информации о персонажах Звездных войн из API https://swapi.dev/api/people/1/ и вывод имени, роста и цвета волос."
);

let fetchCharacterButton = createElement(
  "button",
  { id: "fetchCharacterButton" },
  "Получить информацию о персонаже"
);
let characterContainer = createElement("div", {
  id: "characterContainer",
  class: "result-container",
});

task3Section.appendChild(fetchCharacterButton);
task3Section.appendChild(characterContainer);

function fetchStarWarsCharacter() {
  characterContainer.innerHTML =
    '<p class="loading">Загрузка информации о персонаже...</p>';

  fetch("https://swapi.dev/api/people/1/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((character) => {
      characterContainer.innerHTML = "";

      let nameInfo = createElement("div", { class: "character-info" });
      nameInfo.innerHTML = "<strong>Имя:</strong> " + character.name;

      let heightInfo = createElement("div", { class: "character-info" });
      heightInfo.innerHTML =
        "<strong>Рост:</strong> " + character.height + " см";

      let hairColorInfo = createElement("div", { class: "character-info" });
      hairColorInfo.innerHTML =
        "<strong>Цвет волос:</strong> " + character.hair_color;

      characterContainer.appendChild(nameInfo);
      characterContainer.appendChild(heightInfo);
      characterContainer.appendChild(hairColorInfo);
    })
    .catch((error) => {
      characterContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

fetchCharacterButton.addEventListener("click", fetchStarWarsCharacter);

// ===========================================================================================
// Задание 4: Переводчик
// ===========================================================================================

let task4Section = createTaskSection(
  4,
  "Переводчик",
  "Перевод слов с английского на русский, используя API: https://tmp.myitschool.org/API/translate/"
);

let translateForm = createElement("div", { class: "translate-form" });
let wordInput = createElement("input", {
  type: "text",
  id: "wordInput",
  placeholder: "Введите слово для перевода",
});
let sourceSelect = createElement("select", { id: "sourceSelect" });
let targetSelect = createElement("select", { id: "targetSelect" });
let translateButton = createElement(
  "button",
  { id: "translateButton" },
  "Перевести"
);
let translateContainer = createElement("div", {
  id: "translateContainer",
  class: "result-container",
});

let languages = [
  { code: "en", name: "Английский" },
  { code: "ru", name: "Русский" },
  { code: "fr", name: "Французский" },
  { code: "de", name: "Немецкий" },
  { code: "es", name: "Испанский" },
  { code: "it", name: "Итальянский" },
  { code: "ja", name: "Японский" },
  { code: "ko", name: "Корейский" },
  { code: "zh", name: "Китайский" },
  { code: "ar", name: "Арабский" },
  { code: "hi", name: "Хинди" },
  { code: "bn", name: "Бенгальский" },
  { code: "pt", name: "Португальский" },
  { code: "nl", name: "Голландский" },
  { code: "sv", name: "Шведский" },
  { code: "no", name: "Норвежский" },
  { code: "fi", name: "Финский" },
  { code: "da", name: "Датский" },
  { code: "tr", name: "Турецкий" },
  { code: "pl", name: "Польский" },
  { code: "cs", name: "Чешский" },
  { code: "el", name: "Греческий" },
  { code: "he", name: "Иврит" },
  { code: "ur", name: "Урду" },
  { code: "hi", name: "Хинди" },
  { code: "bn", name: "Бенгальский" },
  { code: "pt", name: "Португальский" },
  { code: "nl", name: "Голландский" },
  { code: "sv", name: "Шведский" },
  { code: "no", name: "Норвежский" },
  { code: "fi", name: "Финский" },
  { code: "da", name: "Датский" },
  { code: "tr", name: "Турецкий" },
  { code: "pl", name: "Польский" },
  { code: "cs", name: "Чешский" },
  { code: "el", name: "Греческий" },
  { code: "he", name: "Иврит" },
  { code: "ur", name: "Урду" },
];

languages.forEach((lang) => {
  let sourceOption = createElement("option", { value: lang.code }, lang.name);
  let targetOption = createElement("option", { value: lang.code }, lang.name);

  if (lang.code === "en") sourceOption.selected = true;
  if (lang.code === "ru") targetOption.selected = true;

  sourceSelect.appendChild(sourceOption);
  targetSelect.appendChild(targetOption);
});

translateForm.appendChild(wordInput);
translateForm.appendChild(sourceSelect);
translateForm.appendChild(targetSelect);
translateForm.appendChild(translateButton);

task4Section.appendChild(translateForm);
task4Section.appendChild(translateContainer);

function wordsTranslate() {
  let word = wordInput.value.trim();
  let source = sourceSelect.value;
  let target = targetSelect.value;

  if (!word) {
    translateContainer.innerHTML =
      '<div class="error">Пожалуйста, введите слово для перевода</div>';
    return;
  }

  translateContainer.innerHTML = '<p class="loading">Переводим...</p>';

  let url = `https://tmp.myitschool.org/API/translate/?source=${source}&target=${target}&word=${encodeURIComponent(
    word
  )}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      translateContainer.innerHTML = "";

      if (data.translate) {
        let translationInfo = createElement("div");
        translationInfo.innerHTML = `<strong>Перевод:</strong> ${data.translate}`;
        translateContainer.appendChild(translationInfo);
      } else {
        translateContainer.innerHTML =
          '<div class="error">Не удалось получить перевод</div>';
      }
    })
    .catch((error) => {
      translateContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

translateButton.addEventListener("click", wordsTranslate);

// ===========================================================================================
// Задание 5: Случайный факт
// ===========================================================================================

let task5Section = createTaskSection(
  5,
  "Случайный факт",
  "Запрос случайного факта о человечестве из https://uselessfacts.jsph.pl/random.json?language=en и вывод его на веб-странице."
);

let fetchFactButton = createElement(
  "button",
  { id: "fetchFactButton" },
  "Получить случайный факт"
);
let factContainer = createElement("div", {
  id: "factContainer",
  class: "result-container",
});

task5Section.appendChild(fetchFactButton);
task5Section.appendChild(factContainer);

function fetchRandomFact() {
  factContainer.innerHTML =
    '<p class="loading">Загрузка случайного факта...</p>';

  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      factContainer.innerHTML = "";

      if (data.text) {
        let factInfo = createElement("div");
        factInfo.innerHTML = `<strong>Факт:</strong> ${data.text}`;
        factContainer.appendChild(factInfo);
      } else {
        throw new Error("Неожиданный формат данных от API");
      }
    })
    .catch((error) => {
      factContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

fetchFactButton.addEventListener("click", fetchRandomFact);

// ===========================================================================================
// Задание 6: Шутка с кэшированием
// ===========================================================================================

let task6Section = createTaskSection(
  6,
  "Шутка с кэшированием",
  "Получение данных (шутки по URL https://official-joke-api.appspot.com/random_joke) и кэширование их в localStorage."
);

let fetchJokeButton = createElement(
  "button",
  { id: "fetchJokeButton" },
  "Получить шутку"
);
let clearCacheButton = createElement(
  "button",
  { id: "clearCacheButton" },
  "Очистить кэш"
);
let jokeContainer = createElement("div", {
  id: "jokeContainer",
  class: "result-container",
});

task6Section.appendChild(fetchJokeButton);
task6Section.appendChild(clearCacheButton);
task6Section.appendChild(jokeContainer);

function fetchJokeAndCacheData() {
  let cachedJoke = localStorage.getItem("cachedJoke");

  if (cachedJoke) {
    let jokeData = JSON.parse(cachedJoke);
    displayJoke(jokeData, true);
    return;
  }

  jokeContainer.innerHTML = '<p class="loading">Загрузка шутки...</p>';

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("cachedJoke", JSON.stringify(data));

      displayJoke(data, false);
    })
    .catch((error) => {
      jokeContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

function displayJoke(joke, fromCache) {
  jokeContainer.innerHTML = "";

  if (fromCache) {
    let cacheNote = createElement(
      "div",
      { class: "cached-note" },
      "Данные загружены из кэша"
    );
    jokeContainer.appendChild(cacheNote);
  }

  let setupInfo = createElement("div", { class: "joke-info" });
  setupInfo.innerHTML = "<strong>Вопрос:</strong> " + joke.setup;

  let punchlineInfo = createElement("div", { class: "joke-info" });
  punchlineInfo.innerHTML = "<strong>Ответ:</strong> " + joke.punchline;

  jokeContainer.appendChild(setupInfo);
  jokeContainer.appendChild(punchlineInfo);
}

function clearJokeCache() {
  localStorage.removeItem("cachedJoke");
  jokeContainer.innerHTML = "<div>Кэш очищен</div>";
}

fetchJokeButton.addEventListener("click", fetchJokeAndCacheData);
clearCacheButton.addEventListener("click", clearJokeCache);

// ===========================================================================================
// Задание 7: Погода
// ===========================================================================================

let task7Section = createTaskSection(
  7,
  "Погода",
  "Получение данных о погоде по вашему городу и отображение текущей температуры и погодных условий."
);

let weatherForm = createElement("div", { class: "weather-form" });
let cityInput = createElement("input", {
  type: "text",
  id: "cityInput",
  placeholder: "Введите название города",
});
let fetchWeatherButton = createElement(
  "button",
  { id: "fetchWeatherButton" },
  "Узнать погоду"
);
let weatherContainer = createElement("div", {
  id: "weatherContainer",
  class: "result-container",
});

weatherForm.appendChild(cityInput);
weatherForm.appendChild(fetchWeatherButton);

task7Section.appendChild(weatherForm);
task7Section.appendChild(weatherContainer);

function fetchWeather() {
  let city = cityInput.value.trim();

  if (!city) {
    weatherContainer.innerHTML =
      '<div class="error">Пожалуйста, введите название города</div>';
    return;
  }

  weatherContainer.innerHTML =
    '<p class="loading">Загрузка данных о погоде...</p>';

  let apiKey = "687b7dd5bda740cda79171527250304";
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      weatherContainer.innerHTML = "";

      let locationInfo = createElement("div", { class: "weather-info" });
      locationInfo.innerHTML = `<strong>Местоположение:</strong> ${data.location.name}, ${data.location.country}`;

      let tempInfo = createElement("div", { class: "weather-info" });
      tempInfo.innerHTML = `<strong>Температура:</strong> ${data.current.temp_c}°C`;

      let conditionInfo = createElement("div", { class: "weather-info" });
      conditionInfo.innerHTML = `<strong>Погодные условия:</strong> ${data.current.condition.text}`;

      let iconInfo = createElement("div", { class: "weather-info" });
      let weatherIcon = createElement("img", {
        src: `https:${data.current.condition.icon}`,
        alt: "Иконка погоды",
      });
      iconInfo.appendChild(weatherIcon);

      weatherContainer.appendChild(locationInfo);
      weatherContainer.appendChild(tempInfo);
      weatherContainer.appendChild(conditionInfo);
      weatherContainer.appendChild(iconInfo);
    })
    .catch((error) => {
      weatherContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
      weatherContainer.innerHTML +=
        "<div>Примечание: Для работы с API погоды может потребоваться API ключ.</div>";
    });
}

fetchWeatherButton.addEventListener("click", fetchWeather);

// ===========================================================================================
// Задание 8: Курсы валют
// ===========================================================================================

let task8Section = createTaskSection(
  8,
  "Курсы валют",
  "Получение актуальных курсов валют с API и отображение их на веб-странице."
);

let currencyForm = createElement("div", { class: "currency-form" });
let baseCurrencySelect = createElement("select", { id: "baseCurrencySelect" });
let fetchCurrencyButton = createElement(
  "button",
  { id: "fetchCurrencyButton" },
  "Получить курсы валют"
);
let currencyContainer = createElement("div", {
  id: "currencyContainer",
  class: "result-container",
});

let currencies = [
  { code: "USD", name: "Доллар США" },
  { code: "AED", name: "Дирхам ОАЭ" },
  { code: "AFN", name: "Афганский афгани" },
  { code: "ALL", name: "Албанский лек" },
  { code: "AMD", name: "Армянский драм" },
  { code: "ANG", name: "Нидерландский антильский гульден" },
  { code: "AOA", name: "Ангольская кванза" },
  { code: "ARS", name: "Аргентинское песо" },
  { code: "AUD", name: "Австралийский доллар" },
  { code: "AWG", name: "Арубанский флорин" },
  { code: "AZN", name: "Азербайджанский манат" },
  { code: "BAM", name: "Конвертируемая марка Боснии и Герцеговины" },
  { code: "BBD", name: "Барбадосский доллар" },
  { code: "BDT", name: "Бангладешская така" },
  { code: "BGN", name: "Болгарский лев" },
  { code: "BHD", name: "Бахрейнский динар" },
  { code: "BIF", name: "Бурундийский франк" },
  { code: "BMD", name: "Бермудский доллар" },
  { code: "BND", name: "Брунейский доллар" },
  { code: "BOB", name: "Боливийский боливиано" },
  { code: "BRL", name: "Бразильский реал" },
  { code: "BSD", name: "Багамский доллар" },
  { code: "BTN", name: "Бутанский нгултрум" },
  { code: "BWP", name: "Ботсванская пула" },
  { code: "BYN", name: "Белорусский рубль" },
  { code: "BZD", name: "Белизский доллар" },
  { code: "CAD", name: "Канадский доллар" },
  { code: "CDF", name: "Конголезский франк" },
  { code: "CHF", name: "Швейцарский франк" },
  { code: "CLP", name: "Чилийское песо" },
  { code: "CNY", name: "Китайский юань" },
  { code: "COP", name: "Колумбийское песо" },
  { code: "CRC", name: "Коста-риканский колон" },
  { code: "CUP", name: "Кубинское песо" },
  { code: "CVE", name: "Кабо-вердианское эскудо" },
  { code: "CZK", name: "Чешская крона" },
  { code: "DJF", name: "Джибутийский франк" },
  { code: "DKK", name: "Датская крона" },
  { code: "DOP", name: "Доминиканское песо" },
  { code: "DZD", name: "Алжирский динар" },
  { code: "EGP", name: "Египетский фунт" },
  { code: "ERN", name: "Эритрейская накфа" },
  { code: "ETB", name: "Эфиопский быр" },
  { code: "EUR", name: "Евро" },
  { code: "FJD", name: "Фиджийский доллар" },
  { code: "FKP", name: "Фунт Фолклендских островов" },
  { code: "FOK", name: "Фарерская крона" },
  { code: "GBP", name: "Британский фунт" },
  { code: "GEL", name: "Грузинский лари" },
  { code: "GGP", name: "Гернсийский фунт" },
  { code: "GHS", name: "Ганский седи" },
  { code: "GIP", name: "Гибралтарский фунт" },
  { code: "GMD", name: "Гамбийский даласи" },
  { code: "GNF", name: "Гвинейский франк" },
  { code: "GTQ", name: "Гватемальский кетсаль" },
  { code: "GYD", name: "Гайанский доллар" },
  { code: "HKD", name: "Гонконгский доллар" },
  { code: "HNL", name: "Гондурасская лемпира" },
  { code: "HRK", name: "Хорватская куна" },
  { code: "HTG", name: "Гаитянский гурд" },
  { code: "HUF", name: "Венгерский форинт" },
  { code: "IDR", name: "Индонезийская рупия" },
  { code: "ILS", name: "Израильский шекель" },
  { code: "IMP", name: "Мэнский фунт" },
  { code: "INR", name: "Индийская рупия" },
  { code: "IQD", name: "Иракский динар" },
  { code: "IRR", name: "Иранский риал" },
  { code: "ISK", name: "Исландская крона" },
  { code: "JEP", name: "Джерсийский фунт" },
  { code: "JMD", name: "Ямайский доллар" },
  { code: "JOD", name: "Иорданский динар" },
  { code: "JPY", name: "Японская иена" },
  { code: "KES", name: "Кенийский шиллинг" },
  { code: "KGS", name: "Киргизский сом" },
  { code: "KHR", name: "Камбоджийский риель" },
  { code: "KID", name: "Доллар Кирибати" },
  { code: "KMF", name: "Коморский франк" },
  { code: "KRW", name: "Южнокорейская вона" },
  { code: "KWD", name: "Кувейтский динар" },
  { code: "KYD", name: "Доллар Каймановых островов" },
  { code: "KZT", name: "Казахстанский тенге" },
  { code: "LAK", name: "Лаосский кип" },
  { code: "LBP", name: "Ливанский фунт" },
  { code: "LKR", name: "Шри-ланкийская рупия" },
  { code: "LRD", name: "Либерийский доллар" },
  { code: "LSL", name: "Лесотский лоти" },
  { code: "LYD", name: "Ливийский динар" },
  { code: "MAD", name: "Марокканский дирхам" },
  { code: "MDL", name: "Молдавский лей" },
  { code: "MGA", name: "Малагасийский ариари" },
  { code: "MKD", name: "Македонский денар" },
  { code: "MMK", name: "Мьянманский кьят" },
  { code: "MNT", name: "Монгольский тугрик" },
  { code: "MOP", name: "Патака Макао" },
  { code: "MRU", name: "Мавританская угия" },
  { code: "MUR", name: "Маврикийская рупия" },
  { code: "MVR", name: "Мальдивская руфия" },
  { code: "MWK", name: "Малавийская квача" },
  { code: "MXN", name: "Мексиканское песо" },
  { code: "MYR", name: "Малайзийский ринггит" },
  { code: "MZN", name: "Мозамбикский метикал" },
  { code: "NAD", name: "Намибийский доллар" },
  { code: "NGN", name: "Нигерийская найра" },
  { code: "NIO", name: "Никарагуанская кордоба" },
  { code: "NOK", name: "Норвежская крона" },
  { code: "NPR", name: "Непальская рупия" },
  { code: "NZD", name: "Новозеландский доллар" },
  { code: "OMR", name: "Оманский риал" },
  { code: "PAB", name: "Панамский бальбоа" },
  { code: "PEN", name: "Перуанский соль" },
  { code: "PGK", name: "Папуа-новогвинейская кина" },
  { code: "PHP", name: "Филиппинское песо" },
  { code: "PKR", name: "Пакистанская рупия" },
  { code: "PLN", name: "Польский злотый" },
  { code: "PYG", name: "Парагвайский гуарани" },
  { code: "QAR", name: "Катарский риал" },
  { code: "RON", name: "Румынский лей" },
  { code: "RSD", name: "Сербский динар" },
  { code: "RUB", name: "Российский рубль" },
  { code: "RWF", name: "Руандийский франк" },
  { code: "SAR", name: "Саудовский риял" },
  { code: "SBD", name: "Доллар Соломоновых Островов" },
  { code: "SCR", name: "Сейшельская рупия" },
  { code: "SDG", name: "Суданский фунт" },
  { code: "SEK", name: "Шведская крона" },
  { code: "SGD", name: "Сингапурский доллар" },
  { code: "SHP", name: "Фунт Святой Елены" },
  { code: "SLE", name: "Сьерра-леонский леоне" },
  { code: "SLL", name: "Старый леоне Сьерра-Леоне" },
  { code: "SOS", name: "Сомалийский шиллинг" },
  { code: "SRD", name: "Суринамский доллар" },
  { code: "SSP", name: "Южносуданский фунт" },
  { code: "STN", name: "Добра Сан-Томе и Принсипи" },
  { code: "SYP", name: "Сирийский фунт" },
  { code: "SZL", name: "Свазилендский лилангени" },
  { code: "THB", name: "Тайский бат" },
  { code: "TJS", name: "Таджикский сомони" },
  { code: "TMT", name: "Туркменский манат" },
  { code: "TND", name: "Тунисский динар" },
  { code: "TOP", name: "Тонганская паанга" },
  { code: "TRY", name: "Турецкая лира" },
  { code: "TTD", name: "Доллар Тринидада и Тобаго" },
  { code: "TVD", name: "Доллар Тувалу" },
  { code: "TWD", name: "Новый тайваньский доллар" },
  { code: "TZS", name: "Танзанийский шиллинг" },
  { code: "UAH", name: "Украинская гривна" },
  { code: "UGX", name: "Угандийский шиллинг" },
  { code: "UYU", name: "Уругвайское песо" },
  { code: "UZS", name: "Узбекский сум" },
  { code: "VES", name: "Венесуэльский боливар" },
  { code: "VND", name: "Вьетнамский донг" },
  { code: "VUV", name: "Вануатский вату" },
  { code: "WST", name: "Самоанская тала" },
  { code: "XAF", name: "Франк КФА ВЕАС" },
  { code: "XCD", name: "Восточно-карибский доллар" },
  { code: "XCG", name: "Золото (унция)" },
  { code: "XDR", name: "Специальные права заимствования" },
  { code: "XOF", name: "Франк КФА ВСЕАО" },
  { code: "XPF", name: "Французский тихоокеанский франк" },
  { code: "YER", name: "Йеменский риал" },
  { code: "ZAR", name: "Южноафриканский рэнд" },
  { code: "ZMW", name: "Замбийская квача" },
  { code: "ZWL", name: "Зимбабвийский доллар" },
];

currencies.forEach((currency) => {
  let option = createElement(
    "option",
    { value: currency.code },
    `${currency.name} (${currency.code})`
  );
  baseCurrencySelect.appendChild(option);
});

currencyForm.appendChild(baseCurrencySelect);
currencyForm.appendChild(fetchCurrencyButton);

task8Section.appendChild(currencyForm);
task8Section.appendChild(currencyContainer);

function fetchCurrencyRates() {
  let baseCurrency = baseCurrencySelect.value;

  currencyContainer.innerHTML =
    '<p class="loading">Загрузка курсов валют...</p>';

  let url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети или сервера: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      currencyContainer.innerHTML = "";

      let baseInfo = createElement("div", { class: "currency-info" });
      baseInfo.innerHTML = `<strong>Базовая валюта:</strong> ${data.base}`;
      currencyContainer.appendChild(baseInfo);

      let dateInfo = createElement("div", { class: "currency-info" });
      dateInfo.innerHTML = `<strong>Дата:</strong> ${data.date}`;
      currencyContainer.appendChild(dateInfo);

      let ratesTitle = createElement("h3", {}, "Курсы валют:");
      currencyContainer.appendChild(ratesTitle);

      let mainCurrencies = ["USD", "EUR", "RUB", "GBP", "JPY", "CNY", "BYN"];

      mainCurrencies.forEach((currency) => {
        if (currency !== data.base && data.rates[currency]) {
          let rateInfo = createElement("div", { class: "currency-info" });
          rateInfo.innerHTML = `<strong>${data.base}/${currency}:</strong> ${data.rates[currency]}`;
          currencyContainer.appendChild(rateInfo);
        }
      });
    })
    .catch((error) => {
      currencyContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

fetchCurrencyButton.addEventListener("click", fetchCurrencyRates);

// ===========================================================================================
// Задание 9: Пользователи и их посты
// ===========================================================================================

let task9Section = createTaskSection(
  9,
  "Пользователи и их посты",
  "Получение пользователей и их постов из JSONPlaceholder и вывод пользователей с количеством их постов."
);

let fetchUsersButton = createElement(
  "button",
  { id: "fetchUsersButton" },
  "Получить пользователей с количеством постов"
);
let usersContainer = createElement("div", {
  id: "usersContainer",
  class: "result-container",
});

task9Section.appendChild(fetchUsersButton);
task9Section.appendChild(usersContainer);

function fetchUsersWithPostCount() {
  usersContainer.innerHTML =
    '<p class="loading">Загрузка данных о пользователях и постах...</p>';

  Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
      response.json()
    ),
    fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
      response.json()
    ),
  ])
    .then(([users, posts]) => {
      usersContainer.innerHTML = "";

      let postCounts = {};
      posts.forEach((post) => {
        if (!postCounts[post.userId]) {
          postCounts[post.userId] = 0;
        }
        postCounts[post.userId]++;
      });

      let title = createElement(
        "h3",
        {},
        "Пользователи и количество их постов:"
      );
      usersContainer.appendChild(title);

      users.forEach((user) => {
        let userInfo = createElement("div", { class: "user-post-info" });
        let postCount = postCounts[user.id] || 0;
        userInfo.innerHTML = `<strong>${user.name}</strong> (${user.email}) - <span style="color: #8a2115;">${postCount} постов</span>`;
        usersContainer.appendChild(userInfo);
      });
    })
    .catch((error) => {
      usersContainer.innerHTML = `<div class="error">Произошла ошибка: ${error.message}</div>`;
    });
}

fetchUsersButton.addEventListener("click", fetchUsersWithPostCount);

// ===========================================================================================
// Задание 10: Обработка ошибок
// ===========================================================================================

let task10Section = createTaskSection(
  10,
  "Обработка ошибок",
  "Запрос к несуществующему URL и обработка ошибки с выводом сообщения в консоль."
);

let fetchErrorButton = createElement(
  "button",
  { id: "fetchErrorButton" },
  "Сделать запрос к несуществующему URL"
);
let errorContainer = createElement("div", {
  id: "errorContainer",
  class: "result-container",
});

task10Section.appendChild(fetchErrorButton);
task10Section.appendChild(errorContainer);

function fetchWithErrorHandling() {
  errorContainer.innerHTML = '<p class="loading">Выполнение запроса...</p>';

  fetch("https://jsonplaceholder.typicode.com/nonexistent-endpoint")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      errorContainer.innerHTML =
        "<div>Данные получены успешно (это не должно произойти)</div>";
    })
    .catch((error) => {
      console.error("Произошла ошибка при запросе:", error);

      errorContainer.innerHTML = `
              <div class="error">Произошла ошибка: ${error.message}</div>
              <div>Подробная информация об ошибке выведена в консоль.</div>
              <div>Откройте консоль разработчика (F12 или Ctrl+Shift+I), чтобы увидеть детали.</div>
          `;
    });
}

fetchErrorButton.addEventListener("click", fetchWithErrorHandling);
