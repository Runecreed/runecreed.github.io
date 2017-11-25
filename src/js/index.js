import $ from "jquery";
import "../css/bootstrap.css";

function addImage() {
    let element = document.createElement("div");
    let text = document.createTextNode("hello everyone I have been added!");
    element.appendChild(text);

    let img = document.createElement("img");
    img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";
    $(element).appendTo($("body"));
}

$(document).ready(function () {
    addImage();
});

