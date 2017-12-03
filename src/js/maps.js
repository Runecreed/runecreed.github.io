import $ from "jquery";
import loadGoogleMapsApi from "load-google-maps-api-2";

let map;

function handleNoGeolocation(errorFlag, googleMap) {
    let content;
    if (errorFlag) {
        content = 'Error: The Geolocation service failed.';
    } else {
        content = 'Error: Your browser doesn\'t support geolocation.';
    }

    let options = {
        map,
        'position': new googleMap.LatLng(51, 5.46),
        content
    };

    map.setCenter(options.position);
}

function initialize(googleMap) {
    let mapOptions = {
        "zoom": 15,
        "mapTypeId": googleMap.MapTypeId.ROADMAP
    };

    map = new googleMap.Map(
        $('#map-canvas')[0],
        mapOptions
    );

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new googleMap.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            let infowindow = new googleMap.InfoWindow({
                map,
                "position": pos,
                "content": 'Location found using HTML5.'
            });
            infowindow.close();

            let marker = new googleMap.Marker({
                'position': pos,
                map,
                'title': "You are here!"
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true, googleMap);
        });
    } else {
        // Browser doesn't support geolocation
        handleNoGeolocation(false, googleMap);
    }
}

loadGoogleMapsApi({'key': 'AIzaSyATSH5MpScAOz-t1vPrAFMuqqhKU5RsvaQ'}).then(function (googleMap) {
    console.log(googleMap); // => Object { Animation: Object, ...
    // When promise is returned, initialize the map if the browser is ready.
    googleMap.event.addDomListener(window, "load", initialize(googleMap));
}).
    catch(function (err) {
        console.error(err);
    });
