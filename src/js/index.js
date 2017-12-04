// Attach JS to HTML file, causes our bundler to include the first html
import "../html/index.html";
import $ from 'jquery'; //  Redundant but good for esLint support
import './plugins.js'; // Load jquery plugins
import Dropzone from './dropzone';
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/style.css';
import numberToWords from 'number-to-words';

import './maps.js';

//  Import images
import panda from '../img/panda.gif';

var caroucelItems = 1;  //  Number of items in the caroucel initially

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

function resetCarousel() {
    $('.carousel').removeClass("initialized");
    $('.carousel').carousel();
}

function dropzoneConfig() {

    var previewNode = document.querySelector("#template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);


    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
        "url": "/target-url", // Set the url
        "thumbnailWidth": 400,
        "thumbnailHeight": 400,
        "parallelUploads": 20,
        previewTemplate,
        "autoQueue": false, // Make sure the files aren't queued until manually added
        "previewsContainer": false, // Define the container to display the previews
        "clickable": "#dropzone" // Define the element that should be used as click trigger to select files.
    });

    // When a thumbnail is made
    myDropzone.on('thumbnail', function (file, dataUri) {

        let substrings = ['png', 'jpg', 'gif', 'svg'];
        if (substrings.some(function (v) {
                return dataUri.toString().indexOf(v) >= 0;
            })) {
            // The added file is an image type

            let $images = $('.images');
            let newImage = `<img class="materialboxed" src=${dataUri}>`;
            $images.append(newImage);

            //  new element added, reinitialize the method
            $('.materialboxed').materialbox();
        }
    });

// When file is added
    myDropzone.on("addedfile", function (file) {
        // Hookup the start button
        // Console.log(file.previewElement);


        // File.previewElement.querySelector(".start").onclick = function () {
        //
        //     $(this).parents().eq(2).append("<span>To be implemented later</span>");
        //     MyDropzone.enqueueFile(file);
        // };
    });
// Note that dropzone uses data handlers attached as attributes to the fields in the templates
//  This means that you dont need methods for cancel and remove.
}


$(document).ready(function (e) {

    let $sideMenu = $('#navButton');
    addImage();

    dropzoneConfig();


    $('#modal1').modal('open');

    $('#enhance').click((event) => {
        enhance(event.target);
    });

    $sideMenu.sideNav({
        "menuWidth": 200, // Default is 300
        "edge": 'left', // Choose the horizontal origin
        "closeOnClick": true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        "draggable": true // Choose whether you can drag to open on touch screens,
    });


});

// AddImage('./src/img/panda.gif');
