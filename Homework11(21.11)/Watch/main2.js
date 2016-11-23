"use strict";

var canvasElement = document.getElementById("holst");
var context = canvasElement.getContext("2d");

var sec = 0,
    min = 0,
    hour = 0;

setInterval(function () {
    var d = new Date();
    sec = d.getSeconds();
    context.clearRect(0, 0, 200, 200);
    drawWatch();
    drawLine(sec*6, 50, "#F08080");

    min = d.getMinutes()
    context.lineWidth = 2;
    drawLine(min*6, 40, "red");

    hour = d.getHours();
    context.lineWidth = 3;
    drawLine(hour*30, 30, "#B22222");
}, 1000);


function drawWatch() {
    context.lineWidth = 1;
    context.strokeStyle = "#B22222";
    context.fillStyle = "#B22222";

    context.beginPath();
    context.arc(200, 200, 90, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(200, 200, 80, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.stroke();

    context.font = "20px Arial";
    context.textAlign = "center";

    context.fillStyle = "#B22222";
    context.beginPath();
    context.arc(200, 200, 3, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(200, 120);
    context.lineTo(200, 130);
    context.fillText("12", 200, 150);
    context.stroke();

    context.beginPath();
    context.moveTo(280, 200);
    context.lineTo(270, 200);
    context.fillText("3", 260, 205);
    context.stroke();

    context.beginPath();
    context.moveTo(200, 280);
    context.lineTo(200, 270);
    context.fillText("6", 200, 265);
    context.stroke();

    context.beginPath();
    context.moveTo(120, 200);
    context.lineTo(130, 200);
    context.fillText("9", 140, 205);
    context.stroke();
}

function drawLine(degree, length, color) {
    context.translate(200, 200);
    context.rotate(Math.PI);
    rotateSurf(degree);
    context.strokeStyle = color;
    context.fillStyle = color;

    context.beginPath();
    context.fillStyle = color;
    context.moveTo(0, 0);
    context.lineTo(0, length);
    context.stroke();
    rotateSurf(-degree);
    context.translate(200, 200);
    context.rotate(-Math.PI);
}

function rotateSurf(degree) {
    var angle = degree * Math.PI / 180;
    context.rotate(angle);
}