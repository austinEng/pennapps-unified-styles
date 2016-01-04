'use strict'
module.exports = {
	registerNav: function (navbar, pinFunc) {
		var handleNav = function () {
			if (pinFunc()) {
				navbar.addClass('fixed');
			} else {
				navbar.removeClass('fixed');
			}
		};
		$(window).resize(function () {
			handleNav();
		});
		$(window).scroll(function () {
			handleNav();
		});
	}
}