"use strict";

window.onload = function () {
    var img = document.getElementById('photo');
    var canvas = getCanvas(img.width, img.height);
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    var imageData = context.getImageData(0, 0, 480, 320);
    //var imageWithFilter = blackAndWhite(imageData);
    //var imageWithFilter = threshold(imageData);
    var imageWithFilter = brightness(imageData);
    context.putImageData(imageWithFilter, 0, 0);
}

function getCanvas(width, height) {
    var canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

function blackAndWhite(imageData) {
    var arr = imageData.data;
    for (var i = 0; i < arr.length; i++) {
        var value = (arr[4 * i] + arr[4 * i + 1] + arr[4 * i + 2]) / 3;
        arr[4 * i] = arr[4 * i + 1] = arr[4 * i + 2] = value;
    }
    return imageData;
}

function threshold(imageData) {
    var arr = imageData.data;
    for (var i = 0; i < arr.length; i++) {
        arr[4 * i] = 255 - arr[4 * i];
        arr[4 * i + 1] = 255 - arr[4 * i + 1];
        arr[4 * i + 2] = 255 - arr[4 * i + 2];;
    }
    return imageData;
}

function brightness(imageData) {
    var arr = imageData.data;
    for (var i = 0; i < arr.length; i++) {
        var value = 50;
        arr[4 * i] += value;
        arr[4 * i + 1] += value + arr[4 * i+1] * 0.070;
        arr[4 * i + 2] += value + arr[4 * i+2] * 0.05;
    }
    return imageData;
}