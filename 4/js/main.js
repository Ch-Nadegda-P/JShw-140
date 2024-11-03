// Домашняя работа.
//==============================
// «Массивы»
//------------------------------------------
// Задание:
//------------------------------------------
console.log('--------------------4.1------------------------------')
// 1. Дан массив с элементами [1, 2, 3, 4, 5]. С помощью цикла for выведите все эти
// элементы на экран.
let arr = [1, 2, 3, 4, 5];

 for (let i = 1; i <= 5; i++) {
    console.log(i);
}
console.log('----------------------4.2------------------------------')
// 2. Дан массив с числами [-2, -1, -3, 15, 0, -4, 2, -5, 9, -15, 0, 4, 5, -6, 10, 7]. 
// Числа могут быть положительными и отрицательными. Выведите на экран только 
// отрицательные числа, которые больше -10, но меньше -3.
let arr1 = [-2, -1, -3, 15, 0, -4, 2, -5, 9, -15, 0, 4, 5, -6, 10, 7];
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > -10 && arr1[i] < -3) {
        console.log(arr1[i]);
    }
}
console.log('----------------------4.3---------------------------')
// 3. Создайте новый массив и заполните его значениями от 23 до 57, используя цикл for и
// while. Выведите оба массива. С помощью цикла for найдите сумму элементов этого
// массива. Запишите ее в переменную result и выведите. 

let arr2 = [];
let arr3 = [];
for (let i = 23; i <= 57; i++) {
    arr2.push(i);
}
console.log(arr2);
console.log(arr3);
let result = 0;
for (let i = 0; i < arr2.length; i++) {
    result = result + arr2[i];
}
console.log(result);
console.log('--------------------4.4------------------------------')
// 4. Дан массив числами (строчного типа), 
// например: [‘10’, ‘20’, ‘30’, ‘50’, ‘235’, ‘3000’]. Выведите на экран только 
// те числа из массива, которые начинаются на цифру 1, 2 или 5.

let arr4 = ['10', '20', '30', '50', '235', '3000'];
for (let i = 0; i < arr4.length; i++) {
    if (arr4[i][0] === '1' || arr4[i][0] === '2' || arr4[i][0] === '5') {
        console.log(arr4[i]);
    }
}

console.log('-------------------4.5--------------------------------')
// 5. Составьте массив дней недели (ПН, ВТ, СР и т.д.). С помощью цикла for 
// выведите все дни недели, а выходные дни выведите жирным. 

let arr5 = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
for (let i = 0; i < arr5.length; i++) {
    if (arr5[i] === 'СБ' || arr5[i] === 'ВС') {
        console.log(arr5[i].bold());
    } else {
        console.log(arr5[i]);
    }
  }
  console.log('---------------------------------------------------')
  console.log('<== Смотрите в лево: На документ :))')

  let arr5_1 = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
for (let i = 0; i < arr5_1.length; i++) {
    if (arr5_1[i] === 'СБ' || arr5_1[i] === 'ВС') {
        document.write('<b>' + arr5_1[i] + '</b><br>');
    } else {
        document.write(arr5_1[i] + '<br>');
    }
}

console.log('------------------4.6---------------------------------')
// 6. Создайте массив с произвольными данными. Добавьте в конец массива любой элемент,
// и получите последний элемент массива, используя свойство length.

let arr6 = [1, 2, 3, 4, 5];
arr6.push(6);
console.log(arr6[arr6.length - 1]);

console.log('------------------4.7---------------------------------')
// 7. Запросите у пользователя по очереди числовые значения при помощи prompt и
// сохраните их в массив. Собирайте числа до тез пор пока пользователь не введет пустое
// значение. Выведите получившийся массив на экран. Выполните сортировку чисел
// массива, и выведите его на экран.

let arr7 = [];
let num = prompt('Введите число');

while (true) {
    if (num === '') {
        alert('Вы прекратили ввод чисел.');
        break;
    }
    arr7.push(Number(num));
    num = prompt('Введите число');
}

console.log(arr7 + ' - массив');
console.log(arr7.sort((a, b) => a - b));


console.log('------------------4.8---------------------------------')
// 8. Переверните массив [12, false, ‘Текст’, 4, 2, -5, 0] (выведите в обратном порядке),
// используя цикл while и метод reverse.

let arr8 = [12, false, 'Текст', 4, 2, -5, 0];
console.log(arr8.reverse());

console.log('------------------4.9---------------------------------')
// 9. Напишите скрипт, считающий количество нулевых (пустых) элементов в заданном
// целочисленном массиве [5, 9, 21, , , 9, 78, , , , 6].

let arr9 = [5, 9, 21, , , 9, 78, , , , 6];
let count = 0;
for (let i = 0; i < arr9.length; i++) {
    if (arr9[i] === undefined) {
        count++;
    }
}
console.log(count);

console.log('------------------4.10---------------------------------')
// 10. Найдите сумму элементов массива между двумя нулями (первым и последним нулями
// в массиве). Если двух нулей нет в массиве, то выведите ноль. В массиве может быть
// более 2х нулей. Пример массива: [48,9,0,4,21,2,1,0,8,84,76,8,4,13,2] или
// [1,8,0,13,76,8,7,0,22,0,2,3,2].

let arr10 = [48, 9, 0, 4, 21, 2, 1, 0, 8, 84, 76, 8, 4, 13, 2];
let a_Zero = arr10.indexOf(0);
let b_Zero = arr10.lastIndexOf(0);
let sum1 = 0;
if (a_Zero !== -1 && b_Zero !== -1 && a_Zero !== b_Zero) {
    for (let i = a_Zero + 1; i < b_Zero; i++) {
        sum1 += arr10[i];
    }
}
console.log(sum1);


console.log('------------------4.11---------------------------------')
// 11. *** Нарисовать равнобедренный треугольник из символов ^. Высоту выбирает
// пользователь. Например: высота = 5.
// Для ввода значений можете использовать ф-цию prompt(), либо задавать значения при
// инициализации переменных в коде.

let visotaTr = prompt('Введите высоту треугольника');
let pustoiKopob = '';
for (let i = 0; i < visotaTr; i++) {
  pustoiKopob += '^';
    console.log(pustoiKopob);
}

console.log('------------------4.12-1.Дополнительное задание---------------------------------')
// Найдите сумму элементов массива (3, -5, "23", 0, "0", 1, -9)

let arrA = [3, -5, "23", 0, "0", 1, -9];
let sum = 0;
for (let i = 0; i < arrA.length; i++) {
    sum += +arrA[i];
}
    console.log(sum);
console.log('------------------4.13-2.Дополнительное задание---------------------------------')
// Посчитайте кол-во отрицательных, положительных элементов

let arrB = [3, -5, "23", 0, "0", 1, -9];
let positive = 0;
let negative = 0;

for (let i = 0; i < arrB.length; i++) {
  
    sum+= arrB[i];
    if (arrB[i] > 0) {
        positive++;
    } else if (arrB[i] < 0) {
        negative++;
    }
}

console.log(positive);
console.log(negative);
console.log('------------------4.14-3.Дополнительное задание---------------------------------')
// Найдите максимальный и минимальный элементы массива [23, 2, 0, , -2, 56, 12, 11]. 
//Выведите эти элементы

let arrC = [23, 2, 0, -2, 56, 12, 11];
let max = arrC[0];
let min = arrC[0];
for (let i = 0; i < arrC.length; i++) {
    if (arrC[i] > max) {
        max = arrC[i];
    }
    if (arrC[i] < min) {
        min = arrC[i];
    }
}
console.log(max);
console.log(min);
console.log('------------------4.15-4.Дополнительное задание---------------------------------')
// Создайте произвольный массив и выведите его перевернутую версию 
// (создав новый массив), например: 
// [0, ‘N’, 98, ‘Text’, 3, 5] => [5, 3, ‘Text’, 98, ‘N’, 0]

let arrD = [0, 'N', 98, 'Text', 3, 5];
let arrD2 = [];
for (let i = arrD.length - 1; i >= 0; i--) {
    arrD2.push(arrD[i]);
}

console.log(arrD2);
console.log('------------------4.16-5.Дополнительное задание---------------------------------')
// Есть два массива с числовыми значениями одинаковой длины. 
// Создайте третий массив с суммами элементов данных массивов. 
// Например:  [12,4,0] + [8,7,6] = [20, 11, 6].

let arrE = [12, 4, 0];
let arrF = [8, 7, 6];
let arrG = [];
for (let i = 0; i < arrE.length; i++) {
    arrG.push(arrE[i] + arrF[i]);
}
console.log(arrG);
console.log('------------------4.17-6.Дополнительное задание---------------------------------')
// Дан массив целых чисел (минимум 6 элементов). 
// Проверить, есть ли в нем одинаковые элементы. 
// Вывести в консоль: “Есть повторки!”, “Нет повторов”.

let arrH = [45, 2, 4, 0, 2, 11, 7];

let chek = false;
for (let i = 0; i < arrH.length; i++) {
    if (arrH.indexOf(arrH[i]) !== arrH.lastIndexOf(arrH[i])) {
        chek = true;
        break;
    }
}
if (chek) {
    console.log('Есть повторки!');
} else {
    console.log('Нет повторов');
}
console.log('------------------4.17-7.Дополнительное задание---------------------------------')

let chek1 = false;
for (let i = 0; i < arrH.length; i++) {
    if (arrH.indexOf(arrH[i]) !== arrH.lastIndexOf(arrH[i])) {
        console.log(arrH[i]);
        chek1 = true;
    }
}
if (chek1 === false) {
    console.log('Нет повторов');
}
console.log('------------------4.18-8.Дополнительное задание---------------------------------')
// Создайте массив из пяти имен и выведите их на экран те из них, 
// которые начинаются с определенной буквы, которая вводится с клавиатуры.
//если такой буквы нет в массиве, выведите сообщение об этом.

let arrI = ['Alex', 'Bob', 'John', 'Mike', 'Nick'];
let letter = prompt('Введите букву');
let check2 = false;

for (let i = 0; i < arrI.length; i++) {
    if (arrI[i][0] === letter) {
        console.log(arrI[i]);
        check2 = true;
    }
}

if (check2 === false) {
    console.log('Такой буквы нет в массиве');
}

console.log('------------------4.19-9.Дополнительное задание---------------------------------')
// Если в одномерном массиве имеются три подряд идущих 
// одинаковых элемента, то переменной r присвоить значение истина

let arrJ = [1, 2, 3, 3, 3, 4, 5];
let r = false;
for (let i = 0; i < arrJ.length; i++) {
    if (arrJ[i] === arrJ[i + 1] && arrJ[i + 1] === arrJ[i + 2]) {
        r = true;
        break;
    }
}
console.log(r);

console.log('------------------4.20-10.Дополнительное задание---------------------------------')
// Заданы два массива. Один содержит наименование услуг, а другой – расценки за эти услуги. 
// Удалите из обоих массивов все элементы, которые по цене равняются n  рублей. 
// Выведите оба массива и удаленные элементы.

// 1. Создаем два массива с услугами и ценами.
// 2. Задаем значение переменной N с ценой, товары по которой будем удалять.
// 3. Создаем цикл для массива price
// 4. Выполняем поиск значения N в массиве price. В случае если эл. найден, 
// то мы его удалям из массива, запоминая его index.
// 5. Сохраняем элемент по index в переменную для вывода на экран.
// 6. Из массива services удаляем элемент под индексом из index.
// 7. Выводим оба массива и удаленный элемент ввиде: 

// "Услуга 1: $4"
// "Услуга 2: $23"
// "Удалена Услуга 5: $82"


let services = ['Маникюр', 'Педикюр', 'Массаж', 'Маска', 'Маска для лица'];
let price = [4, 23, 12, 10, 82];
let N = 10;

for (let i = price.length - 1; i >= 0; i--) {
    if (price[i] === N) {
        let delService = services.splice(i, 1);
        let delPrice = price.splice(i, 1);
        console.log(`Удалена Услуга: ${delService} - $${delPrice}`);
    }
}

console.log('Оставшиеся услуги: ', services);
console.log('Оставшиеся цены: ', price);

console.log('------------------4.21-11.Дополнительное задание---------------------------------')
// Найти номер и значение первого найденного отрицательного элемента массива.

let arrK = [1, -25, 3, -4, 5, 6, 7, 8, 9, 10];
let index = -1;
let ups = null;
for (let i = 0; i < arrK.length; i++) {
    if (arrK[i] < 0) {
      ups = arrK[i];
        index = i;
        break;
    }
}
console.log('Первый отрицательный элемент: ' + ups);
console.log('Его индекс: ' + index);


console.log('------------------4.22-12.Дополнительное задание---------------------------------')
// Найдите максимальный и минимальный элементы массива. Выведите эти элементы и их сумму.

let arrL = [1, -25, 3, -4, 5, 6, 7, 8, 9, 10];
let max2 = arrL[0];
let min2 = arrL[0];

for (let i = 0; i < arrL.length; i++) {
    if (arrL[i] > max2) {
        max2 = arrL[i];
    }
    if (arrL[i] < min2) {
        min2 = arrL[i];
    }
}

console.log('Максимальный элемент: ' + max2);
console.log('Минимальный элемент: ' + min2);
console.log('Сумма максимального и минимального элемента: ' + (max2 + min2));

console.log('------------------4.25-13.Дополнительное задание---------------------------------')
// Дан массив, содержащий положительные и отрицательные числа. 
// Заменить все элементы массива на противоположные по знаку. 
// Например, задан массив [1, -5, 0, 3, -4]. 
// После преобразования должно получиться [-1, 5, 0, -3, 4].

let arrM = [1, -5, 0, 3, -4];
for (let i = 0; i < arrM.length; i++) {
    arrM[i] = -arrM[i];
}
console.log(arrM);
console.log('Но так как в прогрвмировании нет отрицательного 0, то в массиве будет 0')

let arrM1 = [1, -5, 0, 3, -4];
for (let i = 0; i < arrM1.length; i++) {
    if (arrM1[i] !== 0) {
        arrM1[i] = -arrM1[i];
    }
}
console.log(arrM1);

console.log('------------------4.26-14.Дополнительное задание---------------------------------')
// Поменяйте местами максимальный и минимальных элементы в массиве.
let arrN = [1, -5, 0, 3, -4];
let max3 = arrN[0];
let min3 = arrN[0];
let maxIndex = 0;
let minIndex = 0;

for (let i = 0; i < arrN.length; i++) {
    if (arrN[i] > max3) {
        max3 = arrN[i];
        maxIndex = i;
    }
    if (arrN[i] < min3) {
        min3 = arrN[i];
        minIndex = i;
    }
}

let temp = arrN[maxIndex];
arrN[maxIndex] = arrN[minIndex];
arrN[minIndex] = temp;

console.log(arrN);

console.log('------------------4.27-15.Дополнительное задание---------------------------------')
// Посчитайте кол-во отрицательных, положительных элементов, 
// а также  элементов со строчным типом данных.
let arrO = [1, -5, 0, 3, -4, 'Всё', 'происходит', 'так', 'как', 'надо', 'даже', 'если', 'кажеться', 'что', 'это', 'не', 'так'];
let positive1 = 0;
let negative1 = 0;
let string = 0;

for (let i = 0; i < arrO.length; i++) {
    if (typeof arrO[i] === 'number') {
        if (arrO[i] > 0) {
            positive1++;
        } else if (arrO[i] < 0) {
            negative1++;
        }
    } else if (typeof arrO[i] === 'string') {
        string++;
    }
}

console.log('Положительных элементов: ' + positive1);
console.log('Отрицательных элементов: ' + negative1);
console.log('Элементов со строчным типом данных: ' + string);

console.log('------------------------------------------------------------------------------')









