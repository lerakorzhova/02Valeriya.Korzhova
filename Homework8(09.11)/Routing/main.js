"use strict"

var el = document.getElementById('container');

var arr = [{
        hash: "goods",
        path: "./html/goods.html",
        handler: function (text, el) {
            document.body.appendChild(el);
            el.innerHTML = text;
        }
        },
    {
        hash: "info",
        path: "./html/info.html",
        handler: function (text, el) {
            document.body.appendChild(el);
            el.innerHTML = text;
        }
    },
    {
        hash: "profile",
        path: "./html/profile.html",
        handler: function (text, el) {
            document.body.appendChild(el);
            el.innerHTML = text;
        }
    }, {
        hash: "basket",
        path: "./html/basket.html",
        handler: function (text, el) {
            document.body.appendChild(el);
            el.innerHTML = text;
        }
    }, {
        hash: "reviews",
        path: "./html/reviews.html",
        handler: function (text, el) {
            document.body.appendChild(el);
            el.innerHTML = text;
        }
    },
]

function routing(arr, el) {
    var hash = location.hash,
        ind = -1;
    for (var i = 0; i < arr.length; i++) {
        if (hash == ('#' + arr[i].hash)) ind = i;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4)
            if (this.status == 200) {
                arr[ind].handler(this.responseText, el);
                el.style.border="1px solid #106ebb"
            }
    }
    xhr.open("GET", arr[ind].path, true);
    xhr.send();
}

window.onhashchange = function () {
    routing(arr, el);
}

