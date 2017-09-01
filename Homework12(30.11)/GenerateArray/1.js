onmessage = function (e) {
    var n = e.data;
    var arr = [],
        mid = 0,
        sum = 0;
    for (var i = 0; i < n; i++) {
        arr.push(getRandom(0, 30000));
    }
    for (var i = 0; i < n; i++) {
        sum += arr[i];
    }
    mid = sum / n;
    postMessage(mid);
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}