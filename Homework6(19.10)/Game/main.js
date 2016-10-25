'use strict';

//СЧЕТЧИК ВРЕМЕНИ
var timeStart, timeEnd;

//ИГРОВОЕ ПОЛЕ
var gameScreen = document.createElement('div');
gameScreen.setAttribute('class', 'gameScreen');
gameScreen.style.backgroundImage = 'url(images/bg.jpg)';
document.body.appendChild(gameScreen);

//КНОПКА "СТАРТ"
var btnStart = document.createElement('button');
btnStart.setAttribute('class', 'btn btnStart');
btnStart.innerHTML = 'START';
gameScreen.appendChild(btnStart);
btnStart.addEventListener("click", function () {
    gameScreen.removeChild(btnStart);
    gameLevel();
});

//НАЧАЛО ИГРЫ
function startGame(n) {
    timeStart=new Date();
    var gameArray = generateGameArray(n);
}

//ВЫБОР УРОВНЯ СЛОЖНОСТИ
function gameLevel() {
    gameScreen.style.backgroundImage = 'url(images/bg2.jpg)';
    var levelBlock = document.createElement('div');
    levelBlock.setAttribute('class', 'levelBlock');
    gameScreen.appendChild(levelBlock);
    var level = document.createElement('ul');
    levelBlock.appendChild(level);

    var ligthLev = document.createElement('li');
    ligthLev.innerHTML = '<button class="btn btnLevel">Ligth</button>';
    level.appendChild(ligthLev);

    var normLev = document.createElement('li');
    normLev.innerHTML = '<button class="btn btnLevel">Normal</button>';
    level.appendChild(normLev);

    var hardLev = document.createElement('li');
    hardLev.innerHTML = '<button class="btn btnLevel">Hard</button>';
    level.appendChild(hardLev);

    ligthLev.addEventListener('click', function () {
        gameScreen.removeChild(levelBlock);
        var n = 3;
        startGame(n);

    })

    normLev.addEventListener('click', function () {
        gameScreen.removeChild(levelBlock);
        var n = 5;
        startGame(n);
    })

    hardLev.addEventListener('click', function () {
        gameScreen.removeChild(levelBlock);
        var n = 9;
        startGame(n);
    })
}

//ГЕНЕРАТОР ИГРОВОГО МАССИВА 
function generateGameArray(n) {
    var gameArray = new Array(n * 2);
    var gameField = document.createElement('div');
    gameScreen.appendChild(gameField);

    for (var i = 0; i < n * 2; i++) {
        gameArray[i] = {};
        gameArray[i].pick = document.createElement('div');
        var str = "card card" + i;
        gameArray[i].pick.setAttribute('class', str);
        var img = document.createElement('img');
        gameArray[i].pick.appendChild(img);
        img.setAttribute('src', 'images/cl.png');
        gameField.appendChild(gameArray[i].pick);


        switch (n) {
        case 3:
            gameArray[i].pick.style.width = img.style.width = '150px';
            gameArray[i].pick.style.height = img.style.height = '200px';
            gameField.style.width = '530px';
            gameField.style.padding = '90px 0 0 203px';
            break;
        case 5:
            gameArray[i].pick.style.width = img.style.width = '140px';
            gameArray[i].pick.style.height = img.style.height = '190px';
            gameField.style.width = '850px';
            gameField.style.padding = '90px 0 0 80px';
            break;
        case 9:
            gameArray[i].pick.style.width = img.style.width = '110px';
            gameArray[i].pick.style.height = img.style.height = '160px';
            gameField.style.width = '780px';
            gameField.style.padding = '50px 0 0 80px';
            break;
        }
    }
    fillGameArray(n, gameArray);
    generateEvent(gameArray);
}

//ЗАПОЛНЕНИЕ ИГРОВОГО МАССИВА
function fillGameArray(n, arr) {
    var randArray = randNumArray(n);
    for (var j = 0; j < n * 2; j++) {
        arr[j].value = randArray[j];
    }
    return arr;
}

//ГЕНЕРАЦИЯ СОБЫТИЙ
function generateEvent(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].pick.addEventListener('click', function () {
            for (var i = 0; i < arr.length; i++) {
                var str = 'card card' + i;
                if (this.getAttribute('class') === str) {
                    arr[i].open = true;
                }
            }
            checkOpen(arr);
        })
    }
}

//ПРОВЕРКА СКОЛЬКО КАРТОЧЕК ОТКРЫТО
function checkOpen(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].open) count++
    }

    switch (count) {
    case 1:
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].open === true) {
                var src = 'images/' + arr[i].value + '.png';
                arr[i].pick.firstChild.setAttribute('src', src);
            }
        }
        break;
    case 2:
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].open === true && (arr[i].pick.firstChild.getAttribute('src')) === 'images/cl.png') {
                var src = 'images/' + arr[i].value + '.png';
                arr[i].pick.firstChild.setAttribute('src', src);
            }
        }
        compareCards(arr);
        break;
    }
    return count = 0;
}

//СРАВНЕНИЕ КАРТОЧЕК
function compareCards(arr) {
    var twoCard = new Array;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].open === true) {
            twoCard.push(arr[i].value);
        }
    }
    if (twoCard[0] == twoCard[1]) {
        setTimeout(function () {
            deleteCards(twoCard, arr);
        }, 800);
    } else setTimeout(function () {
        closeCards(twoCard, arr);
    }, 800);
}

//УДАЛИТЬ КАРТОЧКИ
function deleteCards(twoCards, arr) {
    for (var i = 0, j = 0; i < arr.length; i++) {
        if (arr[i].value === twoCards[j]) {
            arr[i].open = false;
            arr[i].delete = true;
            arr[i].pick.style.visibility = "hidden";
            j++;
        }
    }
    checkDelete(arr);
}

//ПРОВЕРИТЬ ВСЕ ЛИ КАРТОЧКИ УДАЛЕНЫ 
function checkDelete(arr) {
    var k = 0;
    for (var i = 0, j = 0; i < arr.length; i++) {
        if (arr[i].delete === true)
            k++;
    }
    if (k === arr.length) {
        gameScreen.removeChild(gameScreen.lastChild);
        timeEnd=new Date();
        var gameOver = document.createElement('div');
        gameOver.setAttribute('class', 'gameOverBlock');
        gameOver.innerHTML = '<p class="gameOver">YOU WIN<span class="gameOverTime"><br>YOUR TIME: '+((timeEnd-timeStart)/1000).toFixed(3)+' SECONDS'+'</span>';
        gameScreen.appendChild(gameOver);
        var btnStartAgain = document.createElement('button');
        btnStartAgain.setAttribute('class', 'btn btnStartAgain');
        btnStartAgain.innerHTML = 'START AGAIN';
        gameScreen.appendChild(btnStartAgain);
        btnStartAgain.addEventListener("click", function () {
            gameScreen.removeChild(gameOver);
            gameScreen.removeChild(btnStartAgain);
            gameLevel();
        });
    }
}

//ЗАКРЫТЬ КАРТОЧКИ
function closeCards(twoCard, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].open === true) {
            arr[i].open = false;
            arr[i].pick.firstChild.setAttribute('src', 'images/cl.png');
        }
    }
}

//МАССИВ РАНДОМНЫХ ЧИСЕЛ
function randNumArray(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(i);
    }
    var newArray = arr.concat(arr);

    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    newArray = newArray.sort(compareRandom);
    return newArray;
}