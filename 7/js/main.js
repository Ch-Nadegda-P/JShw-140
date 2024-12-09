// Домашняя работа.
// «Front End».Объекты»
//==============================================
// Задание: Использую полученные знания, реализуйте экземпляр любого объекта. Объект
// должен иметь, как внутренние, так и доступные для пользователя, свойства и методы.
// Примеры объектов:
console.log("---------Калькулятор----------");
//  Калькулятор. Возможные методы: вкл/выкл калькулятора, получение выражения для
// расчета или, а и б числа с операцией, вычисление выражения, показ результата расчета.

let calculator = {
  condition: false,
  count: "",

  on_off: function () {
    let userChoice = confirm(
      "Нажмите Enter для включения калькулятора \n\
или нажмите отмена для выключения:"
    );
    if (userChoice) {
      this.condition = true;
      alert("Калькулятор включен");
    } else {
      this.condition = false;
      alert("Калькулятор выключен");
    }
  },

  enter_count: function () {
    if (!this.condition) {
      alert("Калькулятор выключен. Включите его.");
      return;
    }
    this.count = prompt(
      "Введите выражение для расчета: \n\
например 5 + 5, и нажмите Enter:"
    );
    console.log(`Введенное выражение: ${this.count}`);
  },

  calculate: function () {
    if (!this.condition) {
      alert("Калькулятор выключен. Включите его.");
      return;
    }
    try {
      let result = eval(this.count);
      console.log(`Результат: ${result}`);
      alert(`Результат: ${result}`);
      return result;
    } catch (e) {
      console.log("Ошибка в выражении. Попробуйте снова.");
      alert("Ошибка в выражении. Попробуйте снова.");
    }
  },
};

calculator.on_off();
calculator.enter_count();
calculator.calculate();
calculator.on_off();

console.log("---------Лампочка-------------");
//  Лампочка. Возможные методы: ввод информации о лампочке (мощность, стоимость
// электроэнергии), вкл./выкл. лампочки, получение расхода за горение лампочки,
// счетчик горения лампочки.
let lamp = {
  condition_lamp: false,
  count_lamp: 0,
  cost_kwh: 0,
  total_time: 0,

  info_lamp: function () {
    this.count_lamp = Number(prompt("Введите мощность лампочки в ваттах (W):"));
    this.cost_kwh = Number(
      prompt("Введите стоимость электроэнергии за киловатт-час (руб/кВтч):")
    );
    alert(`Мощность лампочки: ${this.count_lamp}W\n\
Стоимость электроэнергии: ${this.cost_kwh} руб/кВтч`);
  },

  on_off_lamp: function () {
    this.condition_lamp = !this.condition_lamp;
    alert(this.condition_lamp ? "Лампочка включена" : "Лампочка выключена");
  },

  the_time_lamp: function () {
    if (this.condition_lamp) {
      let hours = Number(prompt("Введите количество часов работы лампочки:"));
      this.total_time += hours;
      alert(`Лампочка работала еще ${hours} часов`);
    } else {
      alert("Лампочка выключена, включите её сначала.");
    }
  },

  total_cost_lamp: function () {
    let energyUsed = (this.count_lamp / 1000) * this.total_time;
    let totalCost = energyUsed * this.cost_kwh;
    alert(`Общее потребление электроэнергии: ${energyUsed.toFixed(2)} кВтч\n\
Общая стоимость: ${totalCost.toFixed(2)} руб`);
  },

  showInfo: function () {
    let status = this.condition_lamp ? "включена" : "выключена";
    let info = `Лампочка ${status}\nМощность: ${this.count_lamp}W\n\
Стоимость электроэнергии: ${this.cost_kwh} руб/кВтч\n\
Общее время работы: ${this.total_time} часов`;
    alert(info);
    console.log(info);
  },
};

lamp.info_lamp();
lamp.on_off_lamp();
lamp.the_time_lamp();
lamp.total_cost_lamp();
lamp.showInfo();
lamp.on_off_lamp();

