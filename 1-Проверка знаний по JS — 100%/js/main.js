console.log("--------------1------------------");
// 1. Напишите функцию, которая добавляет в существующий массив (можно пустой) города Беларуси.
// Если в качестве параметра ничего не передается в функцию, то при каждом ее вызове,
// новый город запрашивается через prompt, иначе новые города можно добавить одним параметром -
// текстом городов через запятую. Выведите получившийся массив в алфавитном порядке.

let arr1 = [];

function addCity(city) {
  if (city === undefined) {
    let addMore = true;
    while (addMore) {
      let newCity = prompt("Введите город");
      if (newCity) {
        arr1.push(newCity.toLowerCase());
        arr1.sort();
      }
      addMore = confirm("Хотите добавить еще город?");
    }
  } else {
    arr1.push(...city.split(",").map(city => city.toLowerCase()));
    arr1.sort();
  }
  console.log(arr1);
}

addCity();
addCity("Могилев,Брест,Гродно,Минск");

// console.log("--------------2------------------");

// 2. Создайте двумерный массив [['Иван', 'Катя', 'Ольга', 'Максим'], ['Минск', 'Брест', 'Гродно', 'Могилев']].
// Используя вложенные циклы вывести в консоль строки вида: "Иван из Минск", "Катя из Брест", "Ольга из Гродно",
// "Максим из Могилев". Создайте массив с расстояниями до городов от Минска (нулевой км). Выведите информацию о
// расстоянии между Иваном и Максимом. Предусмотрите возможность запрашивать расстояние между другими людьми.

let arr2 = [
  ["Иван", "Катя", "Ольга", "Максим"],
  ["Минск", "Брест", "Гродно", "Могилев"],
];

let distances = {
  "Минск-Брест": 350,
  "Минск-Гродно": 272,
  "Минск-Могилев": 199,
  "Брест-Гродно": 235,
  "Брест-Могилев": 540,
  "Гродно-Могилев": 480
};

function calculateDistance(city1, city2) {
  if (city1 === city2) {
    return 0;
  }
  let key1 = `${city1}-${city2}`;
  let key2 = `${city2}-${city1}`;
  return distances[key1] || distances[key2] || "Неизвестное расстояние";
}

function promptNamesAndCalculateDistances() {
  let continuePrompt = true;

  while (continuePrompt) {
    let name1 = prompt("Введите первое имя:").toLowerCase();
    let name2 = prompt("Введите второе имя:").toLowerCase();

    if (name1 && name2) {
      let index1 = arr2[0].map(name => name.toLowerCase()).indexOf(name1);
      let index2 = arr2[0].map(name => name.toLowerCase()).indexOf(name2);

      if (index1 !== -1 && index2 !== -1) {
        let city1 = arr2[1][index1];
        let city2 = arr2[1][index2];
        let distance = calculateDistance(city1, city2);
        console.log(`Расстояние между ${arr2[0][index1]} (${city1}) и ${arr2[0][index2]} (${city2}) составляет ${distance} км`);
      } else {
        console.log("Одно из имен не найдено в массиве.");
      }
    } else {
      console.log("Имена не были введены корректно.");
    }

    continuePrompt = confirm("Хотите ввести еще пары имен?");
  }

  console.log("Все запросы завершены.");
}

promptNamesAndCalculateDistances();

console.log("--------------3------------------");
// 3. Напишите функцию, которая принимает две даты и возвращает количество дней между ними. В зависимости от
// значения, выведите: "дата уже близко" (< 3 дней), "еще есть время" (от 3 до 7), "далековато еще" (> 7 дней).

function calculateDaysDifference(date1, date2) {
  let difference = Math.abs(date1 - date2);
  let daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

function checkDateDifference(date1, date2) {
  let daysDifference = calculateDaysDifference(date1, date2);
  if (daysDifference < 3) {
    console.log("Дата уже близко");
    alert("Дата уже близко");
  } else if (daysDifference >= 3 && daysDifference <= 7) {
    console.log("Еще есть время");
    alert("Еще есть время");
  } else {
    console.log("Далековато еще");
    alert("Далековато еще");
  }
  return daysDifference;
}

function promptForDate(promptText) {
  let dateStr = prompt(promptText);
  let [day, month, year] = dateStr.split(".");
  return new Date(year, month - 1, day);
}

let date1 = promptForDate("Введите первую дату (Дата.Месяц.День-типо: 12.04.1982):");
let date2 = promptForDate("Введите вторую дату (Дата.Месяц.День-типо: 12.04.1987):");

console.log(
  "Количество дней между датами: " + checkDateDifference(date1, date2)
);

console.log("--------------4------------------");
// 4. Напишите функцию celsiusToFahrenheit(celsius), которая конвертирует температуру из градусов Цельсия в
// градусы Фаренгейта. В зависимости от температуры, выведите предупреждение: "сегодня прохладнее, чем обычно"
// (от 5 до 10), "одевайтесь теплее" (от 0 до 5), "сегодня очень холодно" (меньше 0 и до -5),
// "оставайтесь дома" (< -5).

function celsiusToFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

function checkTemperature(celsius) {
  let fahrenheit = celsiusToFahrenheit(celsius);
  let message = "";

  if (celsius >= 10 && celsius < 20) {
    message = "сегодня прекрасная погода";
  } else if (celsius >= 20 && celsius < 30) {
    message = "позагорайте, сходите на водоем";
  } else if (celsius >= 30 && celsius <= 100) {
    message = "переезжайте на север";
  } else if (celsius >= 5 && celsius < 10) {
    message = "сегодня прохладнее, чем обычно и одевайтесь теплее";
  } else if (celsius >= 0 && celsius < 5) {
    message = "одевайтесь теплее";
  } else if (celsius < 0 && celsius >= -5) {
    message = "сегодня очень холодно";
  } else if (celsius < -5) {
    message = "оставайтесь дома";
  }

  console.log(message + ". Температура в градусах Фаренгейта: " + fahrenheit);
  alert(message);

  return fahrenheit;
}

let celsius = prompt("Введите температуру в градусах Цельсия:");
celsius = parseFloat(celsius); 

checkTemperature(celsius);

console.log("--------------5------------------");
// 5. Функция выбора случайного элемента из массива: Создайте функцию randomElement(arr), которая возвращает
// случайный элемент из переданного массива.

function randomElement(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

let arr = [
  'да ладно', 'нееее', 'ааааа', 'всё будет хорошо', 'всё происходит так как надо, даже если кажеться что это не так !!!', 'не бойся',
];
let randomElementFromArray = randomElement(arr);
console.log(randomElementFromArray);

console.log("--------------6------------------");
// 6. Шифр Цезаря: Напишите функцию, которая шифрует латинскую строку с помощью шифра Цезаря с заданным сдвигом.
//  Например: "table" со сдвигом 2 будет "vcdng". Каждая буква "table" имеет свой номер в таблице ASCI
//  (116, 97, 98, 108, 101). Создайте вторую функцию, которая будет расшифровывать текст,
//  если передать правильный ключ сдвига.

function caesarCipher(text, shift) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
     
      let shiftedCharCode = ((charCode - 65 + shift) % 26) + 65;
      result += String.fromCharCode(shiftedCharCode);
    } else if (charCode >= 97 && charCode <= 122) {
      
      let shiftedCharCode = ((charCode - 97 + shift) % 26) + 97;
      result += String.fromCharCode(shiftedCharCode);
    } else {
      // Остальные символы
      result += text.charAt(i);
    }
  }
  return result;
}
function caesarDecipher(text, shift) {
  return caesarCipher(text, -shift);
}
let originalText = "Hello, World!";
let shift = 3;
let encryptedText = caesarCipher(originalText, shift);
let decryptedText = caesarDecipher(encryptedText, shift);
console.log("Зашифрованный текст: " + encryptedText);
console.log("Расшифрованный текст: " + decryptedText);

console.log("--------------7------------------");
// 7. Напишите программу, которая генерирует случайным образом новый пароль, состоящий из 8 чисел
// (параметром можно задавать длину) и возвращает результат. По желанию, доработайте функцию:
// сделайте генератор паролей из латинских символов, целых чисел и специальных символов: _-,.&*^$#@+=!;
// минимум один большой символ, одна цифра, один спец. символ.
let password = generatePassword(8);
console.log("Сгенерированный пароль: " + password);
function generatePassword(length) {
  let password = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let specialCharacters = "_-,.&*^$#@+=!";
  let randomIndex;
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    } else {
      randomIndex = Math.floor(Math.random() * specialCharacters.length);
      password += specialCharacters.charAt(randomIndex);
    }
  }
  return password;
}
console.log("--------------8------------------");
console.log("<== Посмотрите пожалуйста на лево");
// 8. Создайте функцию, которая создает произвольный HTML-элемент в <body>
// в виде круга/овала/квадрата/прямоугольника. Функция должна принимать параметры: width, height, radius, color;
// создавать запись "<div style="width: 200px; height: 100px, border-radius: 5px; background-color: red;"></div>".
// Данное значение добавляйте через document.write. Подумайте о том, как сделать случайную генерацию фигур по
// вызову функции без параметров.
function createRandomShape() {
  let width = Math.floor(Math.random() * 200) + 100; 
  let height = Math.floor(Math.random() * 200) + 100; 
  let radius = Math.floor(Math.random() * 50) + 10; 
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16); 
  let shape = `<div style="width: ${width}px; height: ${height}px; border-radius: ${radius}px; background-color: ${color};"></div>`;
  document.write(shape);
}
createRandomShape();

console.log("--------------9------------------");
// 9. [18+] Создайте функцию-цензор, которая проверяет текст на наличие нецензурных слов и заменяет их на "#".

// Пример текста:

// "В сером городе, где каждый день напоминал предыдущий, одиночество казалось нестерпимым. Люди сливались
// в одну серую массу, а Яна, сжав кулаки, прокладывала путь сквозь толпу. "Какая же нахрен жизнь!" – думала она,
// чувствуя, как ветер шутит с ее волосами. Бросив взглянуть на небо, она заметила, что даже облака
// выглядят опустошенно. "Почему у всех так легко? Почему я, черт побери, должна каждый раз зажмуриваться от этой скуки?"
// Она присела на старую скамейку в парке и, посмотрев на прохожих, вдруг почувствовала, как на душе легло тяжелое бремя.
// "Да нахрен с ним, может, стоит просто сбежать?" – прошептала она, уже представляя, как дерзко покидает этот серый мир.
// В её сердце разгорелось пламя, и, поднимаясь, она с готовностью шагнула навстречу жизни. Ей не нужны были никакие
// фальшивые улыбки, лишь свобода и возможность быть собой. Бляха, она заслуживала этого! И, стиснув зубы, уверенно
// направилась в неизвестность, где ждала её настоящая сказка."

// Нецензурные слова: "нахрен", "черт", "бляха".

// Предусмотрите возможность расширения проверяемых слов в тексте.

function censorText(text, censoredWords) {
  for (let i = 0; i < censoredWords.length; i++) {
    let censoredWord = censoredWords[i];
    let regex = new RegExp(censoredWord, "gi");
    text = text.replace(regex, "#");
  }
  return text;
}
let text =
  'В сером городе, где каждый день напоминал предыдущий, одиночество казалось нестерпимым. Люди сливались в одну серую массу, \
  а Яна, сжав кулаки, прокладывала путь сквозь толпу. "Какая же нахрен жизнь!" – думала она, чувствуя, как ветер шутит  \
  с ее волосами. Бросив взглянуть на небо, она заметила, что даже облака выглядят опустошенно. "Почему у всех так легко? \
  Почему я, черт побери, должна каждый раз зажмуриваться от этой скуки?" Она присела на старую скамейку в парке и, посмотрев\
  на прохожих, вдруг почувствовала, как на душе легло тяжелое бремя. "Да нахрен с ним, может, стоит просто сбежать?"\
 – прошептала она, уже представляя, как дерзко покидает этот серый мир. В её сердце разгорелось пламя, и, поднимаясь,\
 она с готовностью шагнула навстречу жизни. Ей не нужны были никакие фальшивые улыбки, лишь свобода и возможность быть собой. \
 Бляха, она заслуживала этого! И, стиснув зубы, уверенно направилась в неизвестность, где ждала её настоящая сказка.';

let censoredWords = ["нахрен", "черт", "бляха"];
let censoredText = censorText(text, censoredWords);
console.log(censoredText);

