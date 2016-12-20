//Написать функцию для рекурсивного подсчета суммы цифр числа
'use strict';

var myNumber = verify();
var value = 0;

function verify() {
    value = prompt('Enter a number: ');
    if (isNaN(value) || value.length == 0) {
        console.log('error!');
        verify();
    }
    return value;
}

console.clear();
console.log('Your number is: ' + myNumber);

var sum = 0;
sum = calcSumma(myNumber);

function calcSumma(number) {
    if (number !== 0) {
        sum = sum + number % 10;
        number = number / 10;
        number=~~number;
        calcSumma(number);
    }
    return sum;
}

console.log('Sum is: ' + sum);