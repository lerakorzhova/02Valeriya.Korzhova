"use strict";

var canvasElement = document.getElementById("holst");
var context = canvasElement.getContext("2d");

context.fillStyle = "black";
context.fillRect(0, 0, 1000, 600);
var img = document.createElement("img");
context.drawImage(img, 0, 0);
var imageData = context.getImageData(0, 0, 1000, 1000);

setInterval(function () {
    var noise = createNoise(imageData);
    //var noise = createColorNoise(imageData);
    context.putImageData(noise, 0, 0);
}, 1)

function createNoise(imageData) {
    var arr = imageData.data;
    var ind = getRandom(0, (arr.length / 4));
    arr[ind * 4] = 255;
    arr[ind * 4 + 1] = 255;
    arr[ind * 4 + 2] = 255;

    setInterval(function () {
        arr[ind * 4] = 0;
        arr[ind * 4 + 1] = 0;
        arr[ind * 4 + 2] = 0;
    }, 1)
    return imageData;
}

function getRandom(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

/////////////////////////////////////////////////////////////////////////////////////////

function createColorNoise(imageData) {
    var arr = imageData.data;
    var ind = getRandom(0, (arr.length / 4));
    arr[ind * 4] = 255;
    arr[ind * 4 + 1] = 0;
    arr[ind * 4 + 2] = 0;

    var ind2 = getRandom(0, (arr.length / 4));
    arr[ind2 * 4] = 0;
    arr[ind2 * 4 + 1] = 255;
    arr[ind2 * 4 + 2] = 0;

    var ind3 = getRandom(0, (arr.length / 4));
    arr[ind3 * 4] = 0;
    arr[ind3 * 4 + 1] = 0;
    arr[ind3 * 4 + 2] = 255;

    setInterval(function () {
        arr[ind * 4] = 0;
        arr[ind * 4 + 1] = 0;
        arr[ind * 4 + 2] = 0;

        arr[ind2 * 4] = 0;
        arr[ind2 * 4 + 1] = 0;
        arr[ind2 * 4 + 2] = 0;

        arr[ind3 * 4] = 0;
        arr[ind3 * 4 + 1] = 0;
        arr[ind3 * 4 + 2] = 0;
    }, 1)
    return imageData;
}