"use strict";

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4)
        if (this.status == 200) {
            var coordsArr = JSON.parse(this.responseText);
            createMap(coordsArr);
        }
}
xhr.open("GET", "points.json", true);
xhr.send();


function createMap(arr) {
    var settings = {
        zoom: 3,
        center: {
            lat: +arr[0].lat,
            lng: +arr[0].lng
        },
        mapeTypeId: google.maps.MapTypeId.ROADMAP
    }
    var mapBlock = document.getElementById('maps');
    var map = new google.maps.Map(mapBlock, settings);

    for (var i = 0; i < arr.length; i++) {
        var point = {
            lat: +arr[i].lat,
            lng: +arr[i].lng
        }
        var contentString = arr[i].title;
        (function (x) {
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                position: point
            });
            var marker = new google.maps.Marker({
                position: point,
                map: map
            })
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            marker.setMap(map);
        })(i);
    }
    var flightPlanCoordinates = [];
    for (var i = 0; i < arr.length; i++) {
        flightPlanCoordinates.push(getObj(arr[i].lat, arr[i].lng))
    }
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}

function getObj(lat, lng) {
    return {
        lat: +lat,
        lng: +lng
    }
}