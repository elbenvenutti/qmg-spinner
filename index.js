require('spin-js-lite');

window.QSpin = (function ($, window) {
    'use strict';

    var $window = $(window),
        opts,
        spinner,
        container;

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
        container = '<dialog class="spinner-container" style="position:fixed;width:100%;top:0;bottom:0;background:#000;opacity:0.3"></dialog>';

        $window.on('spinner:add', addSpinner);
        $window.on('spinner:remove', removeSpinner);
    }

    function addSpinner() {
        spinner = new Spinner(opts).spin();
		$('body').append(container);
		$('.spinner-container').append(spinner.el);
		$('.spinner').css('opacity','1');
	}

	function removeSpinner() {
        spinner = null;
		$('.spinner-container').remove();
	}

    init();

    return {
        addSpinner: addSpinner,
        removeSpinner: removeSpinner
    };
}(jQuery, window));