jQuery(document).ready(function($){
    $('#color-picker').iris({
        color: false,
        mode: 'hsv', //'hsl'
        controls: {
            horiz: 's', // horizontal defaults to saturation
            vert: 'l', // vertical defaults to lightness
            strip: 'h' // right strip defaults to hue
        },
        hide: true, // hide the color picker by default
        border: true, // draw a border around the collection of UI elements
        target: false, // a DOM element / jQuery selector that the element will be appended within. Only used when called on an input.
        width: 200, // the width of the collection of UI elements
        palettes: true, // show a palette of basic colors beneath the square.
        change: function(event, ui) {
            // event = standard jQuery event, produced by whichever control was changed.
            // ui = standard jQuery UI object, with a color member containing a Color.js object

            // change the scrollblock color
            $("#block-title").css( 'background-color', ui.color.toString());
        }
    });
});