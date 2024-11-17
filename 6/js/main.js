// Домашняя работа No6.
// Дата и время. Математические ф-ции. Работа со
// строками. Регулярные выражения.
//===================================================================================
console.log("--------------6.1---------------");
// 1. Дана строка 'aaa@bbb@ccc'. Замените все @ на ! с помощью глобального
// поиска и замены.

let str = "aaa@bbb@ccc";
console.log(str.replace(/@/g, "!"));

console.log("--------------6.2---------------");
// 2. В переменной date лежит дата в формате 2025-12-31. Преобразуйте эту
// дату в формат 31/12/2025.

let date = "2025-12-31";
console.log(date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1"));

console.log("--------------6.3---------------");
// 3. Дана строка «Я учу javascript!». Вырежете из нее слово «учу» и слово
// «javascript» тремя разными способами (через substr, substring, slice).

let str1 = "Я учу javascript!";
console.log(str1.substr(2, 3));
console.log(str1.substring(2, 5));
console.log(str1.slice(2, 5));

console.log("--------------6.4---------------");
// 4. Дан массив с элементами 4, 2, 5, 19, 13, 0, 10. Найдите квадратный корень
// из суммы кубов его элементов. Для решения воспользуйтесь циклом for.

let arr = [4, 2, 5, 19, 13, 0, 10];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += Math.pow(arr[i], 3);
}
console.log(Math.sqrt(sum));

console.log("--------------6.5---------------");
// 5. Даны переменные a и b. Отнимите от a переменную b и результат
// присвойте переменной c. Сделайте так, чтобы в любом случае в переменную
// c записалось положительное значение. Проверьте работу скрипта при a и b,
// равных соответственно 3 и 5, 6 и 1.

let a = 3;
let b = 5;
let c = Math.abs(a - b);
console.log(c);

console.log("--------------6.6---------------");
// 6. Выведите на экран текущую дату-время в формате 12:59:59 31.12.2014.
// Для решения этой задачи напишите функцию, которая будет добавлять 0
// перед днями и месяцами, которые состоят из одной цифры (из 1.9.2014
// сделает 01.09.2014).

let date1 = new Date();
let day = date1.getDate();
let month = date1.getMonth() + 1;
let year = date1.getFullYear();
let hours = date1.getHours();
let minutes = date1.getMinutes();
let seconds = date1.getSeconds();

if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}
if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (seconds < 10) {
  seconds = "0" + seconds;
}

console.log(
  hours + ":" + minutes + ":" + seconds + " " + day + "." + month + "." + year
);

console.log("--------------6.7---------------");
// 7. Дана строка 'aa aba abba abbba abca abea'. Напишите регулярку, которая
// найдет строки aba, abba, abbba по шаблону: буква 'a', буква 'b' любое
// количество раз, буква 'a'.

let str2 = "aa aba abba abbba abca abea";
console.log(str2.match(/a[b]+a/g));

console.log("--------------6.8---------------");
// 8. Напишите ф-цию строгой проверки ввода номер телефона в
// международном формате (<код страны> <код города или сети> <номер
// телефона>). Функция должна возвращать true или false. Используйте
// регулярные выражения.

function checkPhone(str) {
  return /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/.test(str);
}
console.log(checkPhone("+375291234567"));
console.log(checkPhone("80291234567"));
console.log(checkPhone("802912345678"));

console.log("--------------6.9---------------");
// 9. Напишите ф-цию строгой проверки адреса эл. почты с учетом следующих
// условия:
// - весь адрес не должен содержать русские буквы и спецсимволы, кроме
// одной «собачки», знака подчеркивания, дефиса и точки;
// - имя эл. почты (до знака @) должно быть длиной более 2 символов, причем
// имя может содержать только буквы, цифры, но не быть первыми и
// единственными в имени;
// - после последней точки и после @, домен верхнего уровня (ru, by, com и т.п.)
// не может быть длиной менее 2 и более 11 символов.
// Функция должна возвращать true или false. Используйте регулярные
// выражения.

function checkEmail(str) {
  return /^[a-z0-9][a-z0-9_\-\.]+@[a-z0-9][a-z0-9_\-\.]+\.[a-z]{2,11}$/i.test(
    str
  );
}
console.log(checkEmail("test@mail.ru"));
console.log(checkEmail("test@mail.ru.com"));
console.log(checkEmail("test@mail.r"));
console.log(checkEmail("test@mail"));

console.log("--------------6.10---------------");
// 10. Напишите ф-цию, которая из полного адреса с параметрами и без,
// например: https://tech.onliner.by/2018/04/26/smart-do-200/?
// utm_source=main_tile&utm_medium=smartdo200#zag3 , получит адрес
// доменного имени (https://tech.onliner.by), остальную часть адреса без
// параметров (/2018/04/26/smart-do-200/), параметры
// (utm_source=main_tile&utm_medium=smartdo200) и хеш (#zag3). В адресе
// может и не быть каких-либо составляющих. Ф-ция должна возвращать
// массив.
// * Для быстрого составления регулярного выражения и проверки исп. онлайн-
// сервис https://regex101.com/.

function getUrlParts(url) {
  let matches = url.match(/^(https?:\/\/[^\/]+)(\/[^\?#]*)?(\?[^#]*)?(#.*)?$/);

  if (matches) {
    let domain = matches[1] || "";
    let path = matches[2] || "";
    let params = matches[3] || "";
    let hash = matches[4] || "";

    return [domain, path, params, hash];
  }

  return [];
}

console.log(
  getUrlParts(
    "https://tech.onliner.by/2018/04/26/smart-do-200/?utm_source=main_ \
    tile&utm_medium=smartdo200#zag3"
  )
);

console.log(getUrlParts("https://tech.onliner.by/2018/04/26/smart-do-200/"));

//=====================================================================
console.log("--------------6.11-Доп.задание---------------");
// Функция выбора случайного элемента из массива: Создайте функцию randomElement(arr), 
// которая возвращает случайный элемент из переданного массива.

function randomElement(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
let arr1 = [1, 2, 3, 4, 5];
console.log(randomElement(arr1));

console.log("--------------6.12-Доп.задание---------------");
// Напишите функцию, которая принимает дату рождения и возвращает, 
// сколько лет человеку на данный момент.

function calculateAge(birthDate) {
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  let dayDifference = today.getDate() - birthDate.getDate();
  let hourDifference = today.getHours() - birthDate.getHours();
  let minuteDifference = today.getMinutes() - birthDate.getMinutes();
  let secondDifference = today.getSeconds() - birthDate.getSeconds();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
    monthDifference += 12;
  }
  if (dayDifference < 0) {
    monthDifference--;
    dayDifference += 30;
  }
  if (hourDifference < 0) {
    dayDifference--;
    hourDifference += 24;
  }
  if (minuteDifference < 0) {
    hourDifference--;
    minuteDifference += 60;
  }
  if (secondDifference < 0) {
    minuteDifference--;
    secondDifference += 60;
  }

  return {
    years: age,
    months: monthDifference,
    days: dayDifference,
    hours: hourDifference,
    minutes: minuteDifference,
    seconds: secondDifference,
  };
}

function getBirthDate() {
  let day = prompt("Введите день своего рождения (например, 12):");
  let month = prompt("Введите месяц своего рождения (например, 04):");
  let year = prompt("Введите год своего рождения (например, 1987):");
  return new Date(`${year}-${month}-${day}`);
}

function showAge() {
  let birthDate = getBirthDate();
  let age = calculateAge(birthDate);

  let result = `Вам ${age.years} лет, ${age.months} месяцев, ${age.days} дней, \ /
  ${age.hours} часов, ${age.minutes} минут и ${age.seconds} секунд.`;

  console.log(result);
  alert(result);
}

showAge();



