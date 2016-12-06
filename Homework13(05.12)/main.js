"use strict";

alert("Можно добавлять несколько аудиозаписей одновременно, выбирая их из файловой системы с помощью Shift/Ctrl.");

var audio = new Audio();
document.body.appendChild(audio);
var info = document.getElementById('info');
var fileArr = [];

var play = document.getElementById("play");
var playImg = document.getElementById("playImg");
play.addEventListener("click", function () {
    if (audio.paused === true) {
        audio.play();
        localStorage.play = true;
        Play();
        playImg.setAttribute("src", "2.png");
    } else {
        audio.pause();
        localStorage.play = false;
        playImg.setAttribute("src", "1.png");
    }
})

function Play() {
    setInterval(function () {
        playMusic();
        getTime();
        if (audio.currentTime === audio.duration) nextSong(audio);
    }, 500)
}


var stop = document.getElementById('stop');
stop.addEventListener("click", function () {
    if (audio.paused === false) {
        audio.pause();
        localStorage.play = false;
        audio.currentTime = 0;
        playImg.setAttribute("src", "1.png");
    }
})

var volume = document.getElementById('volume');
volume.addEventListener("change", function () {
    audio.volume = volume.value;
})

var fast = document.getElementById('fast');
fast.addEventListener("click", function () {
    audio.playbackRate *= 1.5;
})

var slow = document.getElementById('slow');
slow.addEventListener("click", function () {
    audio.playbackRate /= 1.5;
})

var loopBool = false;
var loop = document.getElementById('return');
loop.addEventListener("click", function () {
    loopBool = loopBool ? false : true;
    if (loopBool) {
        audio.loop = true;
        loop.style.backgroundColor = "blue";
    } else {
        loop.style.backgroundColor = "transparent";
    }
})

var playBlock = document.getElementById("playWidth");
playBlock.style.width = 0;
var block = document.getElementById("block");
var blockWid = block.clientWidth;
block.addEventListener('click', function (event) {
    var x = event.offsetX;
    audio.currentTime = x * audio.duration / blockWid;
    playBlock.style.width = x * audio.duration / blockWid + "%";
    playMusic();
})

function playMusic() {
    var dur = audio.duration;
    var curDur = audio.currentTime;
    playBlock.style.width = Math.round(curDur) * 100 / Math.round(dur) + "%";
    window.localStorage.curTime = audio.currentTime;
}

function getTime() {
    var timeBlock = document.getElementById("time");
    var curMin = Math.floor(audio.currentTime / 60);
    var curSec = Math.floor(audio.currentTime - 60 * curMin);
    var durMin = Math.floor(audio.duration / 60);
    var durSec = Math.floor(audio.duration - 60 * durMin);
    if (curSec >= 0 && curSec < 10)
        timeBlock.innerHTML = curMin + ":0" + curSec + " / " + durMin + ':' + durSec;
    else
        timeBlock.innerHTML = curMin + ":" + curSec + " / " + durMin + ':' + durSec;
}

function getSongName(obj, fileName) {
    obj.innerHTML = "<span>" + fileName + "</span><br>";
}

var list = document.getElementById("list");
list.addEventListener('dragenter', function (event) {
    event.preventDefault();
    event.stopPropagation();
    list.style.border = '2px solid lightcoral';
    list.style.color = '';
});

list.addEventListener('dragleave', function (event) {
    event.preventDefault();
    event.stopPropagation();
    list.style.border = '2px solid black';
});

list.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.stopPropagation();
});

var listArr = [],
    isFirst = true;

list.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
    for (var i = 0; i < event.dataTransfer.files.length; i++) {
        fileArr.push(event.dataTransfer.files[i]);
        if (event.dataTransfer.files[i].name.search(/\.mp3/) != -1)
            addSong(event.dataTransfer.files[i]);
    }
    if (isFirst) {
        readFile(fileArr[0]);
        isFirst = false;
    }
}

function readFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
        listArr.push(reader.result);
        playList(reader.result, file);
    }
    reader.readAsDataURL(file);
}

function addSong(fileName) {
    var songInfo = document.createElement("div");
    songInfo.setAttribute('class', "listSong");
    list.appendChild(songInfo);
    getSongName(songInfo, fileName.name);
}

function playList(value, song) {
    audio.src = value;
    getSongName(info, song.name);
    if (audio.paused === true)
        audio.play();
    Play();
}

function nextSong(audio) {
    if (fileArr.length > 1) {
        for (var i = 0; i < listArr.length; i++) {
            if (audio.src == listArr[i])
                var ind = i;
        }
        if ((ind + 1) < fileArr.length) {
            readFile(fileArr[ind + 1]);
        } else audio.pause();
    }
}

function prevSong(audio) {
    if (fileArr.length > 1) {
        for (var i = 0; i < listArr.length; i++) {
            if (audio.src == listArr[i])
                var ind = i;
        }
        if ((ind - 1) < fileArr.length) {
            playList(listArr[ind-1], fileArr[ind-1]);
        } else audio.pause();
    }
}

next.addEventListener('click',function(){
    nextSong(audio);
})
prev.addEventListener('click',function(){
    prevSong(audio);
})


