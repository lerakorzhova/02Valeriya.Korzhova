"use strict";

var num = document.getElementById('num'),
    btn = document.getElementById('btn'),
    block = document.getElementById('block'),
    m = 0,
    arr = [];

btn.addEventListener("click", function () {
    number = num.value;
    if (num.value != '') {
        var number = num.value;
        var worker = new Worker("1.js");
        worker.onmessage = function (event) {
            var mid = document.createElement('span');
            mid.innerHTML = event.data + "<br>";
            block.appendChild(mid);
            m++;
            arr.push(event.data);
        }
        for (var i = 0; i < number; i++)
            worker.postMessage(1000000);
    }
})

var k = setInterval(function () {
    if (m == +num.value) {
        calcDispersion(arr);
    }
}, 200);


function calcDispersion(arr) {
    var mid = 0;
    for (var i = 0; i < arr.length; i++) {
        mid += arr[i];
    }
    mid /= arr.length;
    arr = arr.map(function (a) {
        return Math.pow((a - mid), 2);
    })
    mid = 0;
    for (var i = 0; i < arr.length; i++) {
        mid += arr[i];
    }
    mid /= arr.length;
    mid=mid.toFixed(3);
    if (mid > 0) {
        clearInterval(k);
        var disp = document.createElement('span');
        disp.innerHTML ="Дисперсия: "+ mid + "<br>";
        block.appendChild(disp);
    }
}