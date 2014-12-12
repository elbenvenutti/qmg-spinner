require('spin-js-lite');

window.QSpin = (function ($, window) {
    'use strict';

    var $window = $(window),
        opts,
        spinner,
        message,
        messageStyles,
        container,
        dialogContainer;

    function init() {
        opts = {
            lines: 13, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#AB2D91', // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            position: 'fixed'
        };
        container = '<p id="spinner-container" class="spinner-container" style="position:fixed;height:100%;width:100%;top:0;bottom:0;background:#000;opacity:0.7;z-index:1999999998"></p>';

        $window.on('spinner:add', addSpinner);
        $window.on('spinner:remove', removeSpinner);
    }

    function addSpinner(event, className) {
        if($('.spinner-container').length < 1) { //this prevent multiple spinner from existing at all.
            spinner = new Spinner(opts).spin();
            message = '<p class="spinner-message">Loading...</p>';
            messageStyles = {
                fontSize: '2em',
                position: 'fixed',
                width: '100%',
                textAlign: 'center',
                top: '60%',
                opacity: '1',
                color: 'rgb(255, 255, 255)',
                zIndex: '1999999999'
            };

            $('body').append(container);
            $('.spinner-container').append(spinner.el);
            $('.spinner').css('opacity','1');

            $('.spinner-container').after(message);
            $('.spinner-message').css(messageStyles);

            if(className) {
                $('.spinner-container').addClass(className);
            }

            // IE8 fix for opacity
            dialogContainer = document.getElementById("spinner-container");
            dialogContainer.style.filter = 'alpha(opacity=70)';
        } // maybe we can add smt like else {removeSpinner(event); addSpinner(event, className); } so the latter always ovverides ?
    }

    function removeSpinner(event) { // , className ) {
          // since there can be only one spinner at a time, I'll revert this to his previous version, keeping the current code in the comments.
        // if ($('.spinner-container').hasClass(className)) {
        //    $('.' + className).remove();
            $('.spinner-container').remove();
            $('.spinner-message').remove();
            spinner = null;
        // }
    }

    init();

    return {
        addSpinner: addSpinner,
        removeSpinner: removeSpinner
    };
}(jQuery, window));
