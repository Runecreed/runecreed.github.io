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

var thumbnails = 0; //  Number thumbnails displayed

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

function appear(target) {
    let $target = $(target);
    console.log($target);
    $target.removeClass("scale-out");
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
        let addRow;
        let column = $('<div/>', {"class": 'col s12 m4'});
        let substrings = ['png', 'jpg', 'gif', 'svg'];
        if (substrings.some(function (v) {
                return dataUri.toString().indexOf(v) >= 0;
            })) {
            // The added file is an image type
            thumbnails += 1; // Increase counter

            if (thumbnails % 3 === 1) { // Added image goes to a new row
                addRow = $('<div/>', {"class": 'row'}).append(column);
            }

            let $images = $('.images');
            let $newImage = $(`<img class="materialboxed imageThumbnail scale-transition scale-out" src=${dataUri}>`);
            column.append($newImage);
            if (addRow) { // Add a new row to the container with the image in a column
                $images.append(addRow);
            } else { // No new row needed, just add the column to the last row present in the image Display
                $images.children().last().append(column);
            }
            //  New element added, reinitialize the method
            $('.materialboxed').materialbox();

            // fancy show of the image
            window.setTimeout(() => appear($newImage), 200); // .2 seconds
        }
        // Not an image
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


function onScroll(event) {
    let scrollPos = $(document).scrollTop();
    $('.nav-wrapper ul a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#slide-out ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}

$(document).ready(function (e) {

    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        let target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });


    dropzoneConfig();

    // Initialize the side navigation menu
    let $sideMenu = $('#navButton');

    $('#modal1').modal('open');

    $sideMenu.sideNav({
        "menuWidth": 200, // Default is 300
        "edge": 'left', // Choose the horizontal origin
        "closeOnClick": true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        "draggable": true // Choose whether you can drag to open on touch screens,
    });


});
// AddImage('./src/img/panda.gif');
