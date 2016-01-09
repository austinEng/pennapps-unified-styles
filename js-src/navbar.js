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
	},

	initializeNav: function (navbar, headingOffset) {
		var navLinks = $('.nav-links a:not(.nav-slider)');
		var numLinks = navLinks.length;
		var navTargets = [];
		for (var i=0; i < numLinks; i++) {
			navTargets.push($(navLinks[i]).attr('href'));
		}
		var topOffset = headingOffset;

		var handleNavSlider = function () {
			var section=0;
			var scrollPos = $(window).scrollTop();

			navLinks.removeClass('active');
			while (section < numLinks && scrollPos > $(navTargets[section]).offset().top + topOffset) {
				$(navLinks[section]).addClass('active');
				section++;
			}
			var prevTop = 0;
			var prevLeft = $('.nav-links').offset().left + 15;
			if (section > 0) {
				prevTop = $(navTargets[section-1]).offset().top + topOffset;
				prevLeft = $(navLinks[section-1]).offset().left + $(navLinks[section-1]).width() / 2;
			}
			var sectionTop;
			var sectionLeft;
			if (section < numLinks) {
				sectionTop = $(navTargets[section]).offset().top + topOffset;
				sectionLeft = $(navLinks[section]).offset().left + $(navLinks[section]).width() / 2;
			} else {
				sectionTop = $(document).height() - $(window).height();
				sectionLeft = $('.nav-links').offset().left + $('.nav-links').width();
			}
			var percentBetween = (scrollPos - prevTop) / (sectionTop - prevTop);

			var fullWidth = $('.nav-links').width() - 15;
			var leftSide = $('.nav-links').offset().left + 15;
			var prevPercent = (prevLeft - leftSide) / fullWidth;
			var nextPercent = (sectionLeft - leftSide) / fullWidth;

			var percent = (1 - percentBetween) * prevPercent + (percentBetween) * nextPercent;
			$('#nav-slider').css('width', percent*100 + "%");
		};
		$(window).resize(function () {
			handleNavSlider();
		});
		$(window).scroll(function () {
			handleNavSlider();
		});	
	}
}