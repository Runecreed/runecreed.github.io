// Attach JS to HTML file, causes our bundler to include the first html
import "../html/index.html";
import $ from 'jquery'; //  Redundant but good for esLint support
import './plugins.js'; // Load jquery plugins
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/style.css';

import './maps.js';

//  Import images
import panda from '../img/panda.gif';


function addImage() {
    let $content = $(".content");
    let element = document.createElement("div");
    let text = document.createTextNode("hello everyone I have been added!");
    element.appendChild(text);
    let pandaImage = new Image();
    pandaImage.src = panda;

    $(element).appendTo($content);
    $(pandaImage).appendTo($content);
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


function enhance(target) {
    let $target = $(target);
    console.log($target);
    $target.addClass("scale-out").delay(1000).queue(() => {
        $target.removeClass("scale-out").dequeue();
    });
}


$(document).ready(function (e) {

    let $sideMenu = $('#navButton');
    addImage();

    $('#modal1').modal('open');

    $('#enhance').click((event) => {
        enhance(event.target);
    });

    $sideMenu.sideNav({
        menuWidth: 200, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens,
    });




});

// AddImage('./src/img/panda.gif');
