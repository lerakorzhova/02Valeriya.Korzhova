"use strict";

var player, isPlay = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoYt');
}

document.addEventListener('visibilitychange', function () {
    if (document.hidden === true && player.getPlayerState() === 1) isPlay = true;
    if (document.hidden === true && player.getPlayerState() === 2) isPlay = false;
    if (document.hidden == true && isPlay == true) player.pauseVideo();
    if (document.hidden == false && isPlay == true) player.playVideo();

})