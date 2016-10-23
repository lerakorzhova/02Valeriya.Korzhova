/*Калькулятор*/

'use strict';
var current,
    output,
    operator,
    period;

var one = document.getElementById("1");
var two = document.getElementById("2");
var three = document.getElementById("3");
var four = document.getElementById("4");
var five = document.getElementById("5");
var six = document.getElementById("6");
var seven = document.getElementById("7");
var eight = document.getElementById("8");
var nine = document.getElementById("9");
var zero = document.getElementById("0");

var sum = document.getElementById("sum");
var sub = document.getElementById("sub");
var mul = document.getElementById("mul");
var div = document.getElementById("div");
var dot = document.getElementById("dot");
var equal = document.getElementById("equal");
var clear = document.getElementById("clear");
var screen = document.getElementById("res");

var numbers = [one, two, three, four, five, six, seven, eight, nine, zero];
var op = [sum, sub, mul, div];

for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
       var num = this.value;
        output = screen.innerHTML += num;
    });
}

zero.addEventListener("click", function () {
    zero = this.value;
    if (screen.innerHTML === "") {
        output = screen.innerHTML = zero;
    } else if (screen.innerHTML === output) {
        output = screen.innerHTML += zero;
    }
})
dot.addEventListener("click", function () {
    period = this.value;
    if (screen.innerHTML === "") {
        output = screen.innerHTML = screen.innerHTML.concat("0.");
    } else if (screen.innerHTML === output) {
        screen.innerHTML = screen.innerHTML.concat(".");

    }
})

equal.addEventListener("click", function () {
    if (screen.innerHTML === output) {
        screen.innerHTML = eval(output);
    } else {
        screen.innerHTML = "";
    }
})

clear.addEventListener("click", function () {
    screen.innerHTML='';
})

for (var i = 0; i < op.length; i++) {
    op[i].addEventListener("click", function () {
            operator = this.value;
            if (screen.innerHTML === "") {
                screen.innerHTML = screen.innerHTML.concat("");
            } else if (output) {
                screen.innerHTML = output.concat(operator);
            }
        });
    }