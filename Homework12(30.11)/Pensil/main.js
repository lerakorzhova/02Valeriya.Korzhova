"use strict";

var canvasElement = document.getElementById("holst");
var context = canvasElement.getContext("2d");

context.fillStyle = "black";
context.strokeStyle = "black";
context.lineWidth = 3;

var mouseDown = false,
    mouseMove = false,
    x = 0,
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
    savePicture();
})

canvasElement.addEventListener("mouseout", function (event) {
    mouseDown = false;
})

getPicture();

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

function savePicture() {
    var img = document.createElement("img");
    context.drawImage(img, 0, 0);
    var imageData = context.getImageData(0, 0, 1000, 600);
    localStorage.pensilColor = context.fillStyle;
    localStorage.arr = compressArray(imageData);
}

function compressArray(arr) {
    var imageData = arr.data;
    var length = canvasElement.width * canvasElement.height * 4;
    var newArr = [];
    for (var i = 0; i < (length / 4); i++) {
        if (imageData[4 * i + 3] === 255)
            newArr.push(1);
        else newArr.push(0);
    }
    return newArr;
}

function getPicture() {
    if (localStorage.arr !== undefined) {
        var imageData = context.getImageData(0, 0, 1000, 600);
        var arr = imageData.data;
        var imgArr = JSON.parse('[' + localStorage.arr + ']');
        for (var i = 0; i < imgArr.length; i++) {
            arr[4 * i] = arr[4 * i + 1] = arr[4 * i + 2] = 0;
            if(imgArr[i]===1) arr[4 * i + 3] = 255;
            else arr[4 * i + 3] =0;
        }
        console.log(imageData);
        context.putImageData(imageData, 0, 0);
    }
}