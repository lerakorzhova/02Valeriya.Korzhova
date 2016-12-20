//Написать функцию, которая сгенерирует массив из N случайных чисел, со средним значением s и отклонением не более, чем на p%. Отсортировать такой массив и вычислить в нем среднее значение.
'use strict';

var n = prompt('Enter a size of array: ');
n = +n;

var arr = new Array(n);

var average = prompt('Enter an average value: ');
average = +average;

var deviation = prompt('Enter a deviation (in percent): ');
deviation = +deviation;
deviation = deviation / 100;

function initArray(a, size) {
    a.push(average);
    for (var i = 0; i < size; i++) {
        if (a[i] !== a[i - 1]) {
            a[i] = average * (Math.random() * 2 * deviation + (1 - deviation));
        } else a[i] = average * (Math.random() * 2 * deviation + (1 - deviation));
    }
    return a;
}

function sortArray(a) {
    a.sort(function (a, b) {
        return a - b
    });
}

var mid = 0;

function calcAverage(a, size) {
    var sum = 0;
    for (var i = 0; i < size; i++) {
        sum += a[i];
    }
    mid = sum / size;
    return mid;
}

initArray(arr, n);
sortArray(arr);
mid = calcAverage(arr, n);

console.log('Array: ' + arr);
alert('Average value in array: ' + mid);