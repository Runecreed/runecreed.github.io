// Avoid `console` errors in browsers that lack a console.
import $ from "jquery"; // Only do this to satisfy esLint

(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        "assert", "clear", "count", "debug", "dir", "dirxml", "error",
        "exception", "group", "groupCollapsed", "groupEnd", "info", "log",
        "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd",
        "timeline", "timelineEnd", "timeStamp", "trace", "warn"
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* Place any jQuery/helper plugins in here.
 This function is only executed when the DOM is ready, so it loads when ready.
*/
$(function () {

    $('.carousel').carousel({
        "dist": 0,

        "padding": 20

    });
    $('.parallax').parallax();
    $('.modal').modal();
    $('.materialboxed').materialbox();

});
