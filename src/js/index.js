// Attach JS to HTML file, causes our bundler to include the first html
import "../html/index.html";
import $ from 'jquery'; //  Redundant but good for esLint support
import './plugins.js'; // Load jquery plugins
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/style.css';
import loadGoogleMapsApi from 'load-google-maps-api-2';

//  Import images
import panda from '../img/panda.gif';


function addImage() {
    let $body = $("body");
    let element = document.createElement("div");
    let text = document.createTextNode("hello everyone I have been added!");
    element.appendChild(text);
    let pandaImage = new Image();
    pandaImage.src = panda;

    $(element).appendTo($body);
    $(pandaImage).appendTo($body);
}

function getImageURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


var map;

function handleNoGeolocation(errorFlag, googleMap) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new googleMap.LatLng(60, 105),
        content: content
    };

    var infowindow = new googleMap.InfoWindow(options);
    map.setCenter(options.position);
}

function initialize(googleMap) {
    var mapOptions = {
        zoom: 15,
        mapTypeId: googleMap.MapTypeId.ROADMAP
    };

    map = new googleMap.Map($('#map-canvas')[0],
        mapOptions);

    // try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new googleMap.LatLng(position.coords.latitude,
                position.coords.longitude);

            var infowindow = new googleMap.InfoWindow({
                map: map,
                position: pos,
                content: 'Location found using HTML5.'
            });
            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true, googleMap);
        });
    } else {
        // browser doesn't support geolocation
        handleNoGeolocation(false, googleMap);
    }
}


loadGoogleMapsApi({'key': 'AIzaSyATSH5MpScAOz-t1vPrAFMuqqhKU5RsvaQ'}).then(function (googleMap) {
    console.log(googleMap); // => Object { Animation: Object, ...
    // When promise is returned, initialize the map if the browser is ready.
    googleMap.event.addDomListener(window, "load", initialize(googleMap));
}).catch(function (err) {
    console.error(err);
});


function enhance(target) {
    let $target = $(target);
    console.log($target);
    $target.addClass("scale-out").delay(1000).queue(() => {
        $target.removeClass("scale-out").dequeue();
    });
}

$(document).ready(function (e) {
    addImage();

    $('#modal1').modal('open');

    $('#enhance').click((event) => {
        enhance(event.target);
    });

});

// addImage('./src/img/panda.gif');
