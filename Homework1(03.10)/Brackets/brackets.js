//Написать функцию, которая проверяет правильность растановки круглых скобок

'use strict';

var string = prompt('Enter the string: ');
var n = string.length;

var left = string.split('(').length - 1;   
var right = string.split(')').length - 1;    

var bool=true;

function verifyBrackets(str) {
    if (left == right) {
        for (var i = 0; i < left; i++) {
            var leftInd = str.indexOf('(');  
            var rightInd = str.indexOf(')');
            if (leftInd < rightInd) {
                str = str.slice(leftInd, n);
            } else {
                bool=false;
                break;
            }
        }
    } else bool=false;
    if (bool) console.log('ok');
    else console.log('error');
}


verifyBrackets(string);