// ==== 2 ===============================

let a1 = 5 % 3;
let a3 = 5 + '3';
let a4 = '5' - 3;
let a5 = 75 + 'кг';
let a6 = 785 * 653;
let a7 = 100 / 25;
let a8 = 0 * 0;
let a9 = 0 / 2;
let a10 = 89 / 0;
let a11 = 98 + 2;
let a2 = 3 % 5;
let a12 = 5 - 98;
let a13 = (8 + 56 * 4) / 5;
let a14 = ((9 - 12) * 7) / (5 + 2);
let a15 = +'123';
let a16 = 1 || 0;
let a17 = false || true;
let a18 = true > 0;

console.log(a1, typeof a1);
console.log(a2, typeof a2);
console.log(a3, typeof a3);
console.log(a4, typeof a4);
console.log(a5, typeof a5);
console.log(a6, typeof a6);
console.log(a7, typeof a7);
console.log(a8, typeof a8);
console.log(a9, typeof a9);
console.log(a10, typeof a10);
console.log(a11, typeof a11);
console.log(a12, typeof a12);
console.log(a13, typeof a13);
console.log(a14, typeof a14);
console.log(a15, typeof a15);
console.log(a16, typeof a16);
console.log(a17, typeof a17);
console.log(a18, typeof a18);

//======= 5 =================================

let pl_Kruga = 5,
  SKruga = 3.14 * pl_Kruga * pl_Kruga;

console.log("Площадь круга", SKruga, "см");

//======== 6 =================================

let footingA = 5,
    footingB = 7,
    STrap;

    heiGht = 10;

STrap = ((footingA + footingB) / 2) * heiGht;
console.log("Площадь трапеции", STrap, "см");

//======== 7.1 =================================
// Моя версия, как начисляются проценты и выплаты

let S = 2000000; // Размер ипотечного кредита в рублях
let p = 10; // Процентная годовая ставка в процентах
let years = 5; // Количество лет

let obKol_Mes = years * 12; // Общее количество месяцев
let obPr = S / 100 * obKol_Mes; // Общая сумма процентов за весь срок
let obSumm = S + obPr; // Общая сумма выплат
let mesPl = obSumm / obKol_Mes; // Ежемесячный платеж

let Pereplata = obSumm - S; // Переплата по кредиту

console.log("Ежемесячный платеж", mesPl, "рублей");
console.log("Переплата по кредиту", Pereplata, "рублей");

//======== 7.2 =================================
// Тут меня немного исправил Copilot

let S1 = 2000000; // Размер ипотечного кредита в рублях
let p1 = 10; // Процентная годовая ставка в процентах
let years1 = 5; // Количество лет
let obKol_Mes1 = years1 * 12; // Общее количество месяцев

let obPr1 = S1 * (p1 / 100) * years1; // Общая сумма процентов за весь срок
let obSumm1 = S1 + obPr1; // Общая сумма выплат
let mesPl1 = obSumm1 / obKol_Mes1; // Ежемесячный платеж
let Pereplata1 = obSumm1 - S; // Переплата по кредиту

console.log("Ежемесячный платеж", mesPl1, "рублей");
console.log("Переплата по кредиту", Pereplata1, "рублей");

//======== 7.3 =================================
// Это решила не я, а Мэрлин когда я спросила у него правильно ли я сделала.
// Он сказал что это не правильно надо так. Но извените я не математик и 
// не банковский работник.
// И мы ещё не проходили Math.pow и не проходили формулу расчета аннуитетного платежа.

// Если стоял вопрос просто решить поставленную задачу, то вот решение.

let S2 = 2000000; // Размер ипотечного кредита в рублях
let p2 = 10; // Процентная годовая ставка в процентах
let years2 = 5; // Количество лет

let obKol_Mes2 = years2 * 12; // Общее количество месяцев
let r = p2 / 12 / 100; // Месячная процентная ставка

let mesPl2 = (S2 * r * Math.pow((1 + r), obKol_Mes2)) / (Math.pow((1 + r), obKol_Mes2) - 1); // Ежемесячный платеж
let obSumm2 = mesPl2 * obKol_Mes2; // Общая сумма выплат
let Pereplata2 = obSumm2 - S2; // Переплата по кредиту

console.log("Ежемесячный платеж", mesPl2.toFixed(2), "рублей");
console.log("Переплата по кредиту", Pereplata2.toFixed(2), "рублей");

//======== 8 =================================

// Первое уравнение: a + 2(x - b) = 16
let a = 8; // значение a
let b = 3; // значение b

// Решаем уравнение 8 + 2(x - 3) = 16
// Сначала выразим x:
let x1 = (16 - a + 2 * b) / 2; // x = (16 - 8 + 2 * 3) / 2
console.log("Первое уравнение, x =", x1); // x = 7

// Второе уравнение: b(x + 15) = a + 6x
// Решаем уравнение 3(x + 15) = 8 + 6x
let x2 = (a + 45 - 8) / (6 - b); // x = (8 + 45 - 8) / (6 - 3)
console.log("Второе уравнение, x =", x2); // x = 37 / 3 ≈ 12.33

// Третье уравнение: x + 2x + ax + bx = 23780
// Решаем уравнение x + 2x + 8x + 3x = 23780
let sumFactors = 1 + 2 + a + b; // Сумма коэффициентов при x
let x3 = 23780 / sumFactors; // x = 23780 / (1 + 2 + 8 + 3)
console.log("Третье уравнение, x =", x3); // x = 1700

//===================== 9 =================================

let text_1 = 'Бывало, спит у ног собака,',
		text_2 = 'костер занявшийся гудит,',
    text_3 = 'и женщина из полумрака',
    text_4 = 'глазами зыбкими глядит.',
    text_5 = ''
    text_6 = 'Потом под пихтою приляжет',
    text_7 = 'на куртку рыжую мою и мне,',
    text_8 = 'задумчивая, скажет:',
    text_9 = 'А ну-ка, спой!.."- и я пою';

		console.log(text_1);
    console.log(text_2);
    console.log(text_3);
    console.log(text_4);
    console.log(text_5);
    console.log(text_5);
    console.log(text_6);
    console.log(text_7);
    console.log(text_8);
    console.log(text_5);
    console.log(text_5);
    console.log(text_9);









