/*Добавить в задачу с комментариями кнопку закрыть, которая удалит этот комментарий*/

'use strict';
var personArray = [{
        name: 'Анастасия',
        gender: 'w'
    },
    {
        name: 'Александра',
        gender: 'w'
    },
    {
        name: 'Алиса',
        gender: 'w'
    },
    {
        name: 'Максим',
        gender: 'm'
    },
    {
        name: 'Сергей',
        gender: 'm'
    },
    {
        name: 'Алексей',
        gender: 'm'
    },
          ];
var cityArray = ['Минска', 'Могилева', 'Гомеля', 'Витебска', 'Гродно', 'Полоцка'];
var productArray = ['телефон Sony Xperia Z2', 'ноутбук Lenovo IdeaPad', 'духовой шкаф Bosch HBG634BB1', 'мотокультиватор Skiper SK-850', 'мотоцикл M1NSK D4 125', 'кулер для процессора DeepCool GAMMAXX 400'];

function generateComments(person, city, products) {
    var div = document.createElement('div');
    div.setAttribute('class', 'comment');
    document.body.appendChild(div);
    var randomName = getRandom(0, 5);
    var personName = person[randomName].name;
    if (person[randomName].gender === 'w') var str = 'приобрела';
    else var str = 'приобрел';
    var number = getRandom(1, 10);
    var from = city[getRandom(0, 5)];
    var product = products[getRandom(0, 5)];
    var comment = personName + ' из ' + from + ' ' + str + ' ' + product + ' в количестве ' + number + ' шт.';
    var text = document.createTextNode(comment);
    var p = document.createElement('p');
    p.innerHTML = comment;
    div.appendChild(p);
    
    var buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = "Закрыть";
    buttonDelete.setAttribute('class', 'button');
    div.appendChild(buttonDelete);
    buttonDelete.addEventListener("click", function () {
        document.body.removeChild(this.parentNode);
    })
}

function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

setInterval('generateComments(personArray, cityArray, productArray)', 1000);