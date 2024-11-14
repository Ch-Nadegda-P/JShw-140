// Домашняя работа No5. Функции
//================================================================
console.log("-------------5.1-------------------------------------");
// 1. Сделайте функцию, которая отнимает от первого числа второе и делит на
// третье. Числа передаются параметром.

function bi(a, b, c) {
  return (a - b) / c;
}
console.log(bi(10, 5, 2)); //2.5
//================================================================
console.log("-------------5.2-------------------------------------");
// 2. Сделайте функцию, которая возвращает куб числа и его квадрат. Число
// передается параметром.

function cubeNumber(number) {
  let square = number * number;
  let cube = number * number * number;

  return {
    "квадрат числа": square,
    "куб числа": cube,
  };
}

let result = cubeNumber(3);
console.log(result); // { 'квадрат числа:': 9, 'куб числа:': 27 }
//================================================================
console.log("-------------5.3-------------------------------------");
// 3. Напишите функции min и max, которые возвращают меньшее и большее из
// чисел a и b.

function min(a, b) {
  return a < b ? a : b;
}
console.log(min(10, 5)); //5
function max(a, b) {
  return a > b ? a : b;
}
console.log(max(10, 5)); //10
//================================================================
console.log("-------------5.4-------------------------------------");
// 4. Напишите две функции: первая ф-ция должна возвращать массив с
// числовыми значениями, диапазон которых должен вводиться пользователем
// с клавиатуры; вторая – выводить полученный массив.

function createArray(a, b) {
  let array = [];
  for (let i = a; i <= b; i++) {
    array.push(i);
  }
  return array;
}
let numbersArray = createArray(1, 5);

function displayArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}
displayArray(numbersArray); //1,2,3,4,5
//================================================================
console.log("--------------5.5-------------------------------------");
// 5. Сделайте функцию isEven() (even - это четный), которая параметром
// принимает целое число и проверяет: четное оно или нет. Если четное - пусть
// функция возвращает true, если нечетное — false.

function isEven(num) {
  return num % 2 === 0;
}
console.log(isEven(4)); //true
console.log(isEven(7)); //false
//================================================================
console.log("--------------5.6-------------------------------------");
// 6. Напишите ф-цию, в которую передается массив с целыми числами.
// Верните новый массив, где останутся лежать только четные из этих чисел.
// Для этого используйте вспомогательную функцию isEven из предыдущей
// задачи.

function isEven(num) {
  return num % 2 === 0;
}
function createArray(start, end) {
  let array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
function getEvenNumbers(arr) {
  let evenNumbers = [];
  for (let i = 0; i < arr.length; i++) {
    if (isEven(arr[i])) {
      evenNumbers.push(arr[i]);
    }
  }
  return evenNumbers;
}
let numbersArray1 = createArray(1, 10);
let evenNumbersArray = getEvenNumbers(numbersArray1);
console.log(evenNumbersArray); //2,4,6,8,10
//================================================================
console.log("--------------5.7-------------------------------------");
// 7. Напишите ф-цию, которая рисует следующую пирамидку (исп. вложенные
// циклы):
// 1
// 22
// 333
// 4444
// 55555
// 666666
// 7777777
// 88888888
// 999999999
// Кол-во рядов должно вводиться параметром. Если пользователь ввел доп.
// параметр, непредусмотренный ф-цией по умолчанию - один любой символ,
// кроме пробела, то пирамида должна быть нарисована этим символом,
// например:

// *
// **
// ***
// ****
// *****
// ******
// *******
// ********
// *********

function pyramid() {
  let input = prompt("Введите количество рядов для пирамиды:");
  let rows = Number(input);

  if (isNaN(rows) || rows <= 0) {
    let symbol = input;

    for (let i = 1; i <= 12; i++) {
      let row = "";
      for (let j = 1; j <= i; j++) {
        row += symbol;
      }
      console.log(row);
    }
  } else {
    for (let i = 1; i <= rows; i++) {
      let row = "";
      for (let j = 1; j <= i; j++) {
        row += i;
      }
      console.log(row);
    }
  }
}
pyramid();
//================================================================
console.log("--------------5.8-------------------------------------");
// 8. Напишите ф-цию, которая рисует равнобедренный треугольник из
// звездочек:

// *
// ***
// *****
// *******
// *********

// Кол-во рядов должно вводиться с клавиатуры. Доп., напишите такую же ф-
// цию, но которая выведет перевернутый треугольник.

function triangle() {
  let rows = prompt("Введите количество рядов для пирамиды:");
  rows = Number(rows);

  if (isNaN(rows) || rows <= 0) {
    console.log("Введите положительное число.");
    return;
  }

  for (let i = 1; i <= rows; i++) {
    let row = "";
    for (let j = 1; j <= rows - i; j++) {
      row += " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
      row += "*";
    }
    console.log(row);
  }
}

triangle();

//-----------------------------------------------------------

function triangle1() {
  let rows = prompt("Введите количество рядов для пирамиды:");
  rows = Number(rows);

  if (isNaN(rows) || rows <= 0) {
    console.log("Введите положительное число.");
    return;
  }

  for (let i = rows; i >= 1; i--) {
    let row = "";
    for (let j = 1; j <= rows - i; j++) {
      row += " ";
    }
    for (let j = 1; j <= 2 * i - 1; j++) {
      row += "*";
    }
    console.log(row);
  }
}

triangle1();
//================================================================
console.log("--------------5.9-------------------------------------");
// 9. Напишите ф-цию, которая возвращает массив заполненный числами
// Фибоначи от 0 до 1000.

function fibonacci() {
  let fibonacciArray = [0, 1];
  let i = 2;
  while (true) {
    let nextFibonacci = fibonacciArray[i - 1] + fibonacciArray[i - 2];
    if (nextFibonacci > 1000) {
      break;
    }
    fibonacciArray.push(nextFibonacci);
    i++;
  }
  return fibonacciArray;
}
let fibonacciArray = fibonacci();
console.log(fibonacciArray); //0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987
//================================================================
console.log("--------------5.10-------------------------------------");
// 10. Дано число. Сложите его цифры. Если сумма получилась более 9-ти,
// опять сложите его цифры. И так, пока сумма не станет однозначным числом
// (9 и менее). Исп. Рекурсию.

function summa(number) {
  let sum = 0;
  let strNumber = number.toString();
  for (let char of strNumber) {
    sum += +char;
  }
  return sum;
}

function summa_Recursive(number) {
  let sum = summa(number);
  if (sum > 9) {
    return summa_Recursive(sum);
  }
  return sum;
}

let number = 12345;
let result1 = summa_Recursive(number);
console.log(result1); //6
//================================================================
console.log("--------------5.11-------------------------------------");
// 11. Дан массив с числами (передается параметром). Выведите
// последовательно его элементы, используя рекурсию и не используя цикл.

function numArray(arr, index) {
  if (index < arr.length) {
    console.log(arr[index]);
    numArray(arr, index + 1);
  }
}

let arr = [1, 2, 3, 4, 5];
numArray(arr, 0);
//================================================================
console.log("--------------5.12-------------------------------------");
// 12. Напишите ф-цию, запрашивающую имя, фамилия, отчество и номер
// группы студента и выводящую введённые данные в следующем виде:

// *****************************
// * Домашняя работа: «Функции» *
// * Выполнил: студент гр. W4017 *
// * Иванов Иван Иванович *
// *****************************

// Размер рамки должен определятся автоматически по самой длинной строке.
// Рамку вывести в консоль.

function studentInfo() {
  let lastName = prompt("Введите вашу фамилию:");
  let firstName = prompt("Введите ваше имя:");
  let middleName = prompt("Введите ваше отчество:");
  let groupNumber = prompt("Введите номер вашей группы:");

  let title = "Домашняя работа: «Функции»";
  let studentInfo = `Выполнил: студент гр. ${groupNumber}`;
  let fullName = `${lastName} ${firstName} ${middleName}`;

  let maxLength = title.length;
  if (studentInfo.length > maxLength) {
    maxLength = studentInfo.length;
  }
  if (fullName.length > maxLength) {
    maxLength = fullName.length;
  }

  let border = "";
  for (let i = 0; i < maxLength + 4; i++) {
    border += "*";
  }

  function space(str, length) {
    while (str.length < length) {
      str += " ";
    }
    return str;
  }

  console.log(border);
  console.log(`* ${space(title, maxLength)} *`);
  console.log(`* ${space(studentInfo, maxLength)} *`);
  console.log(`* ${space(fullName, maxLength)} *`);
  console.log(border);
}

studentInfo();
//================================================================
console.log("--------------5.13-------------------------------------");
// 13. Напишите ф-цию, которая должна проверить правильность ввода адреса
// эл. почты, неиспользуя регулярные выражения. Почта верна при условии:
// a. весь адрес не должен содержать русские буквы и спецсимволы, кроме
// одной «собачки», знака подчеркивания, дефиса и точки, причем они не могут
// быть первыми и последними в адресе, и идти подряд, например: «..», «@.»,
// «.@» или «@@», «_@», «@-», «--» и т.п.
// b. имя эл. почты (до знака @) должно быть длиной более 2 символов, причем
// имя может содержать только буквы, цифры, но не быть первыми и
// единственными в имени, и точку;
// c. после последней точки и после @, домен верхнего уровня (ru, by, com и
// т.п.) не может быть длиной менее 2 и более 11 символов.

// Для ввода значений можете использовать ф-цию prompt(), либо задавать
// значения при инициализации переменных в коде.
// Для вывода результатов скриптов вы можете использовать функции: alert()
// для вывода всплывающего окна; console.log() для вывода в консоль браузера;
// document.write() для вывода в «тело» HTML-документа.

function isEmail(email) {
  let atIndex = email.indexOf("@");
  if (atIndex === -1 || email.indexOf("@", atIndex + 1) !== -1) {
    return false;
  }

  let local = email.slice(0, atIndex);
  let domain = email.slice(atIndex + 1);

  if (local.length <= 2) {
    return false;
  }

  let inChars =
    "абвгдеёжзийклмнопрстуфхцчшщъыьэюя!#$%^&*()+=[]{}|\\:;\"'<>,/?`~";
  let infollows = [
    "..",
    ".@",
    "@.",
    "@@",
    "_@",
    "@-",
    "--",
    "-.",
    ".-",
    "_-",
    "-_",
    "__",
  ];

  for (let i = 0; i < email.length; i++) {
    for (let j = 0; j < inChars.length; j++) {
      if (email[i] === inChars[j]) {
        return false;
      }
    }

    if (i > 0) {
      let follow = email.slice(i - 1, i + 1);
      for (let k = 0; k < infollows.length; k++) {
        if (follow === infollows[k]) {
          return false;
        }
      }
    }
  }

  let lastIndex = domain.lastIndexOf(".");
  if (lastIndex === -1 || lastIndex === 0 || lastIndex === domain.length - 1) {
    return false;
  }

  let topDomain = domain.slice(lastIndex + 1);
  if (topDomain.length < 2 || topDomain.length > 11) {
    return false;
  }

  return true;
}

let email = prompt("Введите адрес электронной почты:");
if (isEmail(email)) {
  console.log("Адрес электронной почты корректен.");
} else {
  console.log("Адрес электронной почты некорректен.");
}

//================================================================
console.log("--------------5.14---Дополнительное задание---------------");

/*Создайте массив с числами и длиной массива от 5 до 8 на выш выбор. 
Необходимо найти и вывести наименьшее число в массиве*/
// используйте внутри функции уже созданные функции для создания массива
// и поиска минимального значения в массиве.

function createArray(start, end) {
  let array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

function min(a, b) {
  return a < b ? a : b;
}

function getMinInArr() {
  let arr = createArray(5, 8);

  let minimum = arr[0];

  for (let i = 5; i < arr.length; i++) {
    minimum = min(minimum, arr[i]);
  }

  console.log("Массив:", arr);
  console.log("Минимальное число в массиве:", minimum);

  return minimum;
}

getMinInArr();
//================================================================
console.log("--------------5.15---Дополнительное задание---------------");

// "Многие программы электронной вёрстки и редакторы HTML используют
// Lorem Ipsum в качестве текста по умолчанию"

// Напишите функцию findLongestWord(str), которая принимает строку в качестве
// параметра и находит самое длинное слово в строке. решить с помощью split
// Пример:
// Word(“У нас всё должно получиться.” // должно вывести “получиться”

function findLongestWord(str) {
  let words = str.split(" ");
  let longestWord = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  return longestWord;
}
console.log(findLongestWord("У нас всё должно получиться"));

//================================================================
console.log("--------------5.16---Дополнительное задание---------------");

//Напишите функцию, которая проверяет, является ли переданная строка палиндромом.
//пример

// function palindrome(str) {
//   let reversedStr = str.split("").reverse().join("");
//   return str === reversedStr;
// }
// console.log(palindrome("анна"));
// console.log(palindrome("Петя"));

//пример
// function polindrom(word) {
//   // code

//   /*
//   1. Превращаем строку в массив из символов
//   2. Переворачиваем массив, создав новый - обратный
//   3. Превразаем новый массив обратно в строку
//   4. Сравниваем два слова
//   */

//   return false;
//----------------------------------------------------------
function polindrom(word) {
  let lowerCaseWord = word.toLowerCase();
  let reversedWord = lowerCaseWord.split("").reverse().join("");
  return lowerCaseWord === reversedWord;
}

console.log(polindrom("анна"));
console.log(polindrom("Петя"));
//================================================================

console.log("--------------5.17---Дополнительное задание---------------");
// Нужно написать функцию, которая проверяет, являются ли две строки анаграммами, 
// причем регистр букв не имеет значения. Учитываются лишь символы; 
// пробелы или знаки препинания в расчет не берутся.

function anagramma(word1, word2) {
  word1 = word1.split('');
  for (let i = 0; i < word2.length; i++) {
    if (word1.indexOf(word2[i]) < 0) return false;
    
  }
  return true;
}
console.log(anagramma('жизнедеятельность', 'дятел'));
//==================================================================
console.log("--------------5.18---Дополнительное задание---------------");
// Функция обратного порядка: Создайте функцию reverseString(str), 
// которая принимает строку и возвращает её в обратном порядке

function reverseString(str) {
  let reversedStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
  }
  return reversedStr;
}
console.log(reverseString("Отзывчивое устройство"));
//==================================================================
console.log("--------------5.19---Дополнительное задание---------------");
// Функция для уникальных значений: Напишите функцию uniqueValues(arr), 
// которая принимает массив и возвращает новый массив с уникальными значениями.

function uniqueValues(arr) {
  return [...new Set(arr)];
}

console.log(uniqueValues([1, 2, 3, 4, 5]));
console.log(uniqueValues(['лес', 'дерево', 'дрова', 'опилки','пыль']));
//==================================================================
console.log("--------------5.20---Дополнительное задание---------------");
// Функция находит общие элементы в двух массивах: 
// Напишите функцию intersection(arr1, arr2), 
// которая находит и возвращает общие элементы в двух массивах
function intersection(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}
console.log(intersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));

//==================================================================
console.log("--------------5.21---Дополнительное задание---------------");
// Функция поиска элемента в массиве: Напишите функцию contains(arr, value), 
// которая проверяет, содержится ли значение в массиве
function contains(arr, value) {
  return arr.includes(value);
}
console.log(contains([1, 2, 3, 4, 5], 3));
console.log(contains([1, 2, 3, 4, 5], 6));
//==================================================================
console.log("--------------5.22---Дополнительное задание---------------");
// Функция конвертации температуры: Напишите функцию celsiusToFahrenheit(celsius), 
// которая конвертирует температуру из градусов Цельсия в градусы Фаренгейта
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
console.log(celsiusToFahrenheit(0));
console.log(celsiusToFahrenheit(100));
//==================================================================
console.log("--------------5.23---Дополнительное задание---------------");
// Напишите функцию createArr(), которая создает массив, заполняемый "руками" 
// (например, через prompt()), пока пользователь не введет пустую строку. 
// Функция должна вернуть созданный массив.
function createArr() {
  let arr = [];
  let input;
  while (true) {
    input = prompt(
      "Введите элемент массива (или нажмите Отмена для завершения)"
    );
    if (input === null) {
      break;
    }
    arr.push(input);
  }
  return arr;
}
console.log(createArr());
//==================================================================
