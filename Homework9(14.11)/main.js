"use strict";

var xhr = new XMLHttpRequest();
var content = document.getElementById("content");
xhr.onreadystatechange = function () {
    if (this.readyState == 4)
        if (this.status == 200) {
            var menu = JSON.parse(this.responseText);
            createMenu(menu);
        }
}
xhr.open("GET", "categories.json", true);
xhr.send();

function createMenu(arr) {
    var list = document.getElementById("list");
    for (var i = 0; i < arr.length; i++) {
        var link = document.createElement("li");
        link.innerHTML = '<a href="' + arr[i].hash + '">' + arr[i].title + '<a>';
        link.setAttribute("class", "link");
        list.appendChild(link);
        getInfo(arr);
        window.onhashchange = function () {
            getInfo(arr);
        }
    }
}

function getInfo(arr) {
    var hash = location.hash,
        path;
    for (var i = 0; i < arr.length; i++) {
        if (hash === arr[i].hash) {
            path = arr[i].filename;
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4)
            if (this.status == 200) {
                var arrGoods = JSON.parse(this.responseText);
                createArr(arrGoods);
            }
    }
    xhr.open("GET", path, true);
    xhr.send();
};

var div = document.createElement("div");
content.appendChild(div);

function createArr(arr) {

    content.removeChild(div);
    div = document.createElement("div");
    content.appendChild(div);
    for (var i = 0; i < arr.length; i++) {

        var info = document.createElement("div");
        var sum = 0;
        info.setAttribute("class", "block");
        info.innerHTML = '<img class="img" src="' + arr[i].img + '"/>' + "<br>Название: " + arr[i].name + "<br>Краткое описание: " + arr[i].descr + "<br> Цена: ";
        var price = document.createElement("span");
        price.innerHTML = arr[i].price;

        var sumField = document.createElement("input");
        sumField.setAttribute('disabled', 'disabled');
        sumField.setAttribute("class", "sum");
        sumField.value = 0;
        var sumFieldText = document.createElement("span");
        sumFieldText.innerHTML = "<br>Итого:"

        var btnPlus = document.createElement("button");
        btnPlus.innerHTML = "+";
        var btnMinus = document.createElement("button");
        btnMinus.innerHTML = "-";

        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");
        input.setAttribute('disabled', 'disabled');
        input.setAttribute("id", "inputField");
        input.value = 0;

        div.appendChild(info);
        info.appendChild(price);
        info.appendChild(btnPlus);
        info.appendChild(input);
        info.appendChild(btnMinus);
        info.appendChild(sumFieldText);
        info.appendChild(sumField);

        btnPlus.addEventListener("click", function (event) {
            event.path[0].nextSibling.value++;
            var next = event.path[0].nextSibling.nextSibling.nextSibling.nextSibling;
            next.value = +(next.value) + (+event.path[0].previousSibling.innerHTML);
        });

        btnMinus.addEventListener("click", function (event) {
            if (event.path[0].previousSibling.value !== "0") {
                event.path[0].previousSibling.value--;
                var prev = event.path[0].previousSibling.previousSibling.previousSibling;
                var next = event.path[0].nextSibling.nextSibling;
                next.value = +(next.value) - (+prev.innerHTML);
            }
        });

    }
}