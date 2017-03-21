var map;
var marker3;
var info;
var valgtPunkt;
var infowindow;
var kbh;
var mig = null;
var overlay;

window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    $.getJSON("json/ture.json", visPunktListe);

}


function visPunktListe(listen) {
    console.table(listen);
    listen.forEach(visPunktInfo);
}

function initMap() {
    kbh = new google.maps.LatLng(55.706500, 12.539083);
    map = new google.maps.Map(document.getElementById('map'), {
        center: kbh,
        zoom: 20
    });
    var bounds = {
        north: 55.70723596854047,
        south: 55.70576401759747,
        east: 12.540161248023992,
        west: 12.536508079345708

    }

    var overlay = new google.maps.GroundOverlay("../test_1-01.svg", bounds);
    overlay.setMap(map);

}

function visPunktInfo(punkt)  {
    var arrayOfMarkers = [];


    console.log("Vis info");
    console.log("id: " + punkt.id);
    console.log("lat: " + punkt.lat);
    console.log("lng: " + punkt.lng);

    // sæt data ind i klonen


    var ll = new google.maps.LatLng(punkt.lat, punkt.lng);
    var m = new google.maps.Marker({
        position: ll,
        map: map,
        icon: punkt.icon,
        animation: google.maps.Animation.DROP
    });
    var w = new google.maps.InfoWindow({
        maxWidth: 100

    });
    arrayOfMarkers.push(m);
    m.addListener("click", visinfo);

    function visinfo() {
        var tempinfo =
            document.querySelector("#text_template").content.cloneNode(true);
        tempinfo.querySelector(".h2class").innerHTML = punkt.id;
        tempinfo.querySelector(".pclass").innerHTML = punkt.txt;
        tempinfo.querySelector(".img_class").src = punkt.img;

        w.setContent(tempinfo);
        w.open(map, m);
    }
}
