'use strict';

var filterApp = {
    currentState: {
        dataUrl: null,
        imageData: null,
        appliedFilter: null,
        stickersArr: [],
    },

    Data: {
        canvas: document.getElementById('canvasElem'),
        context: null,
        originalContext: null,
        inputFile: null,
        img: null,
    },

    constant: {
        CANVAS_WIDTH: 700,
        CANVAS_HEIGHT: 400,
    },

    buttons: {
        blackWhiteBtn: document.getElementById("black-white"),
        negativeBtn: document.getElementById("negative"),
        sepiaBtn: document.getElementById("sepia"),
        brightnessBtn: document.getElementById("brightness"),
        noiseBtn: document.getElementById("noise"),
        blurBtn: document.getElementById("blur"),
        saveBtn: document.getElementById("save"),

    },

    init: function () {
        filterApp.Data.context = filterApp.Data.canvas.getContext("2d");
        filterApp.Data.originalContex = filterApp.Data.context;
        filterApp.Data.inputFile = document.getElementById("fileInput");
        filterApp.initStickers();
        filterApp.Data.canvas.ondragenter = function (event) {
            filterApp.eventDefault(event);
            filterApp.Data.canvas.setAttribute('class', 'isDragged');
        };

        filterApp.Data.canvas.addEventListener('dragleave', function (event) {
            filterApp.eventDefault(event);
            filterApp.Data.canvas.removeAttribute('class');
        });

        filterApp.Data.canvas.addEventListener('dragover', function (event) {
            filterApp.eventDefault(event);
        });
        
        filterApp.Data.canvas.addEventListener('click', function (event) {
            filterApp.Data.inputFile.click();
        });

        filterApp.Data.canvas.ondrop = function (event) {
            filterApp.eventDefault(event);
            filterApp.getImage(event.dataTransfer.files[0]);
        }

        filterApp.Data.inputFile.addEventListener('change', function (event) {
            filterApp.getImage(event.target.files[0]);
        })

        filterApp.buttons.blackWhiteBtn.addEventListener('click', function () {

            filterApp.currentState.appliedFilter = 0;
            filterApp.checkCurrentState();
        });

        filterApp.buttons.negativeBtn.addEventListener('click', function () {
            filterApp.currentState.appliedFilter = 1;
            filterApp.checkCurrentState();
        });

        filterApp.buttons.sepiaBtn.addEventListener('click', function () {
            filterApp.currentState.appliedFilter = 2;
            filterApp.checkCurrentState();
        })

        filterApp.buttons.brightnessBtn.addEventListener('click', function () {
            filterApp.currentState.appliedFilter = 3;
            filterApp.checkCurrentState();
        });

        filterApp.buttons.noiseBtn.addEventListener('click', function () {
            filterApp.currentState.appliedFilter = 4;
            filterApp.checkCurrentState();
        });

        filterApp.buttons.blurBtn.addEventListener('click', function () {
            filterApp.currentState.appliedFilter = 5;
            filterApp.checkCurrentState();
        });
        
        filterApp.buttons.saveBtn.addEventListener('click', function(){
            var image=document.createElement('img');
            image.setAttribute('src', filterApp.currentState.dataUrl);
            window.open(image.src);
        })

    },

    eventDefault: function (event) {
        event.preventDefault();
        event.stopPropagation();
    },

    getImage: function (file) {
        var a = file.name.split('.');
        var ext = a[a.length - 1];
        if (ext === 'png' || ext === 'jpeg' || ext === 'jpg') {
            if (document.getElementById('inputBlock'))
                document.getElementById('inputBlock').remove();
            filterApp.Data.canvas.removeAttribute('class');
            var reader = new FileReader();
            reader.onload = function () {
                filterApp.Data.img = new Image();
                filterApp.Data.img.src = reader.result;
                filterApp.Data.context.drawImage(filterApp.Data.img, 0, 0);
                filterApp.createMiniature(filterApp.Data.img);
                filterApp.currentState.dataUrl = filterApp.Data.canvas.toDataURL("image/jpeg");
            }
            reader.readAsDataURL(file);
        } else {
            document.getElementById('newInput').innerHTML = "Oops, the file isn't an image :c<br><strong id='colorChange'>Choose a file</strong> or drag it here.";
        }
    },

    getImageData: function (img) {
        filterApp.Data.context.drawImage(img, 0, 0);
        return filterApp.Data.imageData = filterApp.Data.context.getImageData(0, 0, filterApp.constant.CANVAS_WIDTH, filterApp.constant.CANVAS_WIDTH);
    },

    createMiniature(img) {
        var filterArr = document.getElementsByClassName('filter');
        var arrMiniatures = [].slice.call(filterArr);
        filterArr = [];
        for (var index in filterApp.filters) {
            filterArr.push(filterApp.filters[index]);
        }
        var i = 0;
        for (var k = 0; k < arrMiniatures.length; k++) {
            var data = filterApp.getImageData(img);
            var ctx = arrMiniatures[k].getContext('2d');
            var newWidth = 100;
            var newHeight = 400 * (105 / 700);
            ctx.putImageData(filterArr[i](data), 0, 0);
            i++;
        }
    },

    filters: {
        blackAndWhite: function (imageData) {
            var arr = imageData.data;
            for (var i = 0; i < arr.length; i++) {
                var value = (arr[4 * i] + arr[4 * i + 1] + arr[4 * i + 2]) / 3;
                arr[4 * i] = arr[4 * i + 1] = arr[4 * i + 2] = value;
            }
            return imageData;
        },

        negative: function (imageData) {
            var arr = imageData.data;
            for (var i = 0; i < arr.length; i++) {
                arr[4 * i] = 255 - arr[4 * i];
                arr[4 * i + 1] = 255 - arr[4 * i + 1];
                arr[4 * i + 2] = 255 - arr[4 * i + 2];;
            }
            return imageData;
        },

        brightness: function (imageData) {
            var arr = imageData.data;
            for (var i = 0; i < arr.length; i++) {
                var value = 50;
                arr[4 * i] += value;
                arr[4 * i + 1] += value + arr[4 * i + 1] * 0.070;
                arr[4 * i + 2] += value + arr[4 * i + 2] * 0.05;
            }
            return imageData;
        },

        sepia: function (imageData) {
            var arr = imageData.data;
            for (var i = 0; i < arr.length; i += 4) {
                var r = arr[i];
                var g = arr[i + 1];
                var b = arr[i + 2];
                arr[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
                arr[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
                arr[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
            }
            return imageData;
        },

        noise: function (imageData) {
            var factor = 75;
            var arr = imageData.data;
            for (var i = 0; i < arr.length; i += 4) {
                arr[i] += (0.5 - Math.random()) * factor;
                arr[i + 1] += (0.5 - Math.random()) * factor;
                arr[i + 2] += (0.5 - Math.random()) * factor;
            }
            return imageData;
        },

        blur: function (imageData, divisor) {
            var matr1 = [1, 2, 1],
                matr2 = [2, 4, 2],
                matr3 = [1, 2, 1];
            var m = [].concat(matr1, matr2, matr3);
            if (!divisor) {
                divisor = m.reduce(function (a, b) {
                    return a + b;
                }) || 1;
            }
            var olddata = imageData;
            var oldpx = olddata.data;
            var newdata = filterApp.Data.context.createImageData(olddata);
            var newpx = newdata.data
            var len = newpx.length;
            var res = 0;
            var w = filterApp.constant.CANVAS_WIDTH;
            for (var i = 0; i < len; i++) {
                if ((i + 1) % 4 === 0) {
                    newpx[i] = oldpx[i];
                    continue;
                }
                res = 0;
                var these = [
                    oldpx[i - w * 4 - 4] || oldpx[i],
                    oldpx[i - w * 4] || oldpx[i],
                    oldpx[i - w * 4 + 4] || oldpx[i],
                    oldpx[i - 4] || oldpx[i],
                    oldpx[i],
                    oldpx[i + 4] || oldpx[i],
                    oldpx[i + w * 4 - 4] || oldpx[i],
                    oldpx[i + w * 4] || oldpx[i],
                    oldpx[i + w * 4 + 4] || oldpx[i]
                ];
                for (var j = 0; j < 9; j++) {
                    res += these[j] * m[j];
                }
                res /= divisor;
                newpx[i] = res;
            }
            return newdata;
        }
    },

    initStickers: function () {
        var stickers = [],
            numberStick = 6;
        for (var i = 1; i < numberStick+2; i++) {
            var ind = i.toString();
            stickers.push(document.getElementById(ind))
        }
        length = stickers.length;
        for (var i = 0; i < length - 1; i++) {
            stickers[i].addEventListener('dragstart', function (e) {
                filterApp.Data.canvas.ondrop = null;
                filterApp.Data.canvas.ondragenter = null;

            })
            stickers[i].addEventListener('dragend', function (e) {
                filterApp.Data.canvas.ondragenter = function (event) {
                    filterApp.eventDefault(event);
                    filterApp.Data.canvas.setAttribute('class', 'isDragged');
                };
                filterApp.Data.canvas.ondrop = function (event) {
                    filterApp.eventDefault(event);
                    filterApp.getImage(event.dataTransfer.files[0]);
                }
                if (isInForm(e.offsetX, e.offsetY)) {
                    filterApp.currentState.stickersArr.push(getSticker(e.pageX, e.pageY, this.src));
                    filterApp.checkCurrentState();
                    console.log(filterApp.currentState.stickersArr)
                }
            })

            function isInForm(x, y) {
                if (x < filterApp.constant.CANVAS_WIDTH && y < filterApp.constant.CANVAS_HEIGHT)
                    return true;
                else return false;
            };

            function getSticker(X, Y, src) {
                return {
                    x: X-65,
                    y: Y-65,
                    src: src,
                }
            }
        }
    },
    checkCurrentState: function () {
        var image = document.createElement('img');
        image.setAttribute('src', filterApp.currentState.dataUrl);
        filterApp.Data.context.drawImage(image, 0, 0);
        var length = filterApp.currentState.stickersArr.length;
        for (var i = 0; i < length; i++) {
            var stick = document.createElement('img');
            stick.setAttribute('src', filterApp.currentState.stickersArr[i].src);
            filterApp.Data.context.drawImage(stick, filterApp.currentState.stickersArr[i].x, filterApp.currentState.stickersArr[i].y);
        }
        filterApp.currentState.dataUrl = filterApp.Data.canvas.toDataURL("image/jpeg");
        image.setAttribute('src', filterApp.currentState.dataUrl);
        if (filterApp.currentState.appliedFilter != null) {
            switch (filterApp.currentState.appliedFilter) {
            case 0:
                filterApp.Data.context.putImageData(filterApp.filters.blackAndWhite(filterApp.getImageData(image)), 0, 0);
                break;
            case 1:
                filterApp.Data.context.putImageData(filterApp.filters.negative(filterApp.getImageData(image)), 0, 0);
                break;
            case 2:
                filterApp.Data.context.putImageData(filterApp.filters.brightness(filterApp.getImageData(image)), 0, 0);
                break;
            case 3:
                filterApp.Data.context.putImageData(filterApp.filters.sepia(filterApp.getImageData(image)), 0, 0);
                break;
            case 4:
                filterApp.Data.context.putImageData(filterApp.filters.noise(filterApp.getImageData(image)), 0, 0);
                break;
            case 5:
                filterApp.Data.context.putImageData(filterApp.filters.blur(filterApp.getImageData(image)), 0, 0);
                break;
            }
        }

    }
}


filterApp.init();