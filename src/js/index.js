// Attach JS to HTML file, causes our bundler to include the first html
import "../html/index.html";
import $ from 'jquery'; //  Redundant but good for esLint support
import './plugins.js'; // Load jquery plugins
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';


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

$(document).ready(function (e) {
    $("#imgInp").change(function (selection) {
        getImageURL(this);
    });
    addImage();

    $('#modal1').modal('open');
});

// addImage('./src/img/panda.gif');
