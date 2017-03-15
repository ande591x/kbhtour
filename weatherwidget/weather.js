// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
    $('.js-geolocation').show();
} else {
    $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
    });
});

/*
 * Test Locations
 * Austin lat/long: 30.2676,-97.74298
 * Austin WOEID: 2357536
 */
$(document).ready(function () {
    loadWeather('Copenhagen', ''); //@params location, woeid
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function (weather) {
            html = '<span class="weathercontainer"><i class="currently icon-' + weather.code + '"></i>' + '<span class="currently ">' + weather.currently + '</span>' + '<span class="currently">' + weather.city + '</span>' + weather.temp + '&deg;' + weather.units.temp + '</span>';

            $("#weather").html(html);
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });


}
