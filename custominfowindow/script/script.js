var marker3;
var info;
var valgtPunkt;
var map;
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
    kbh = new google.maps.LatLng(55.6845777, 12.5921082);
    map = new google.maps.Map(document.getElementById('map'), {
        center: kbh,
        zoom: 15
    });

    var bounds = {
        north: 55.69227046232516,
        south: 55.67688342413421,
        east: 12.604253242419418,
        west: 12.57996315758055

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
        maxWidth: 1000,
        position: google.maps.InfoWindow.LEFT_TOP

    });
    arrayOfMarkers.push(m);

    //open infowindow on marker click
    m.addListener("click", visinfo);

    //close infowindow on map click
    google.maps.event.addListener(map, 'click', function () {
        w.close();
    });

    m.addListener(w, 'domready', function () {
        var iwOuter = $('.gm-style-iw');




        /* The DIV we want to change is above the .gm-style-iw DIV.
         * So, we use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
         */
        var iwBackground = iwOuter.prev();
        iwOuter.next.css({
            'overflow': 'hidden'
        });

        // Remove the background shadow DIV
        iwBackground.children(':nth-child(2)').css({
            'display': 'none'
        });

        // Remove the white background DIV
        iwBackground.children(':nth-child(4)').css({
            'display': 'none'
        });

    });



    function visinfo() {

        var tempinfo =
            document.querySelector("#template").content.cloneNode(true);
        tempinfo.querySelector(".iw-title").innerHTML = punkt.id;
        tempinfo.querySelector(".iw-content").innerHTML = punkt.txt;
        tempinfo.querySelector(".img_classbefore").src = punkt.imgbefore;
        tempinfo.querySelector(".img_classafter").src = punkt.imgafter;

        w.setContent(tempinfo);
        w.open(map, m);
        winAnim();
        map.panTo(m.getPosition());
        map.setZoom(20);
        //BEFORE AND AFTER PLUGIN
        $(function () {
            $('#beforecontainer').beforeAfter();
        });

    }


    //INFOWINDOW ANIMATIONER
    function winAnim() {

        var iwCont = $('.gm-style-iw');
        var iwBG = iwCont.prev();
        var iwCloseBtn = iwCont.next();

        //////////
        iwCont.addClass("grow");
        iwCloseBtn.addClass("grow");
        iwBG.children(':nth-child(1)').addClass("grow");
        iwBG.children(':nth-child(2)').addClass("grow");
        iwBG.children(':nth-child(3)').addClass("grow");
        iwBG.children(':nth-child(4)').addClass("grow");

    }


    var image = 'icon/you_are_here-01-01.svg'

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {

            var minPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            arrayOfMarkers.forEach(each => {
                console.log("arrayOfMarkers");
                console.log(each.getPosition().lng(), each.getPosition().lng());
                var eachmarkerspos = new google.maps.LatLng(each.getPosition().lat(), each.getPosition().lng());
                console.log("var  eachmarkerspos");
                var afstand = google.maps.geometry.spherical.computeDistanceBetween(minPos, eachmarkerspos);
                console.log("var  afstand");
                console.log("distance", afstand);
                if (afstand < 10) {
                    console.log("under 10 meter");
                    each.setAnimation(google.maps.Animation.BOUNCE);
                }
                if (afstand < 5) {
                    console.log("under 5 meter");
                    visinfo();
                } else {
                    console.log("else set animation = null");
                    each.setAnimation(null);
                }

            })

            if (mig != null) {
                map.setCenter(minPos);
            } else {
                console.log("map.setCenter(minPos)");
                mig = new google.maps.Marker({
                    position: minPos,
                    map: map,
                    icon: image
                });
                map.setCenter(minPos);
            }
            /*       console.log("før if else min pos");
                   if (minPos !== 0) {
                       console.log("minPos !== 0");
                       map.setCenter(null);
                   } else {
                       console.log("Geolocation NOT");
                       alert("Geolocation NOT");
                   }*/
        })
    }
}
