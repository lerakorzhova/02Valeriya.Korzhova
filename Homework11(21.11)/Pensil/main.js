"use strict";

var canvasElement = document.getElementById("holst");
var context = canvasElement.getContext("2d");
context.fillStyle = "black";
context.strokeStyle = "black";
context.lineWidth = 3;
var mouseDown = false,
    mouseMove = false;
var x = 0,
    y = 0,
    x1 = 0,
    y1 = 0;
canvasElement.addEventListener("mousemove", function (event) {
    mouseMove = true;
    x1 = event.offsetX;
    y1 = event.offsetY;
    compare(event, x1, y1);
})

canvasElement.addEventListener("mousedown", function (event) {
    mouseDown = true;
    x = event.offsetX;
    y = event.offsetY;
    
})

canvasElement.addEventListener("mouseup", function (event) {
    mouseDown = false;
    
})

canvasElement.addEventListener("mouseout", function (event) {
    mouseDown = false;
})

function compare(event, x1, y1) {
    if (mouseDown && mouseMove) {
        draw(x, y, x1, y1);
        x = x1;
        y = y1;
    }
}

function draw(a, b, c, d) {
    context.beginPath();
    context.moveTo(a, b);
    context.lineTo(c, d);
    context.stroke();
}