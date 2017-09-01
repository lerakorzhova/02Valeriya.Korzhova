//Калькулятор

'use strict';

var a = verifyNumber();
var sign = prompt('Enter a sign of operation: ');
var b = verifyNumber();

var value = 0;

function verifyNumber() {
    value = prompt('Enter a number: ');
    if (isNaN(value) || value.length == 0) {
        console.log('error!');
        verifyNumber();
    }
    return value;
}
var result = 0;
switch (sign) {
case '/':
    result = a / b;
    break;
case '%':
    result = a % b;
    break;
case '+':
    result = a + b;
    break;
case '-':
    result = a - b;
    break;
case '*':
    result = a * b;
    break;
case '^':
    result = Math.pow(a, b);
    break;
default:
    console.log('Sign error');
}
result.toFixed(10);
console.log(a+' ',sign+' ',b + ' = ', result);