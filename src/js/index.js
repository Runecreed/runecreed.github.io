/* eslint-disable sort-keys,no-magic-numbers */
import $ from "jquery";
import "../css/bootstrap.css";


function addImage(URL) {
    let element = document.createElement("div");
    let text = document.createTextNode("hello everyone I have been added!");
    element.appendChild(text);

    let img = document.createElement("img");
    img.src = URL;
    $(element).appendTo($("body"));
    $(img).appendTo($("body"));
}

function getImageURL(input){
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(document).ready(function (e) {

    $("#imgInp").change(function() {
        getImageURL(this);
    });
});
