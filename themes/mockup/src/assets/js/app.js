// READY FUNC
	$(function() {
		equalHeight();
	});

// -- SWIPER SLIDERS --
	var topSlider = new Swiper('.top-slider', {
		pagination: '.top-slider-pagination',
		paginationClickable: true,
		followFinger: true,
		// swipeHandler: '.image',
		// autoplay: 3000,
		effect: 'fade',
		loop: true
	});
	var noveltySlider = new Swiper('.novelty-slider', {
		slidesPerView: 3,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});
	var singleProductSlider = new Swiper('.single-product-slider', {
		pagination: '.single-slider-pagination',
        paginationClickable: true,
        effect: 'fade'
	});

// -- FUNCTIONS --
	// equal sidebar & content div heights
		function equalHeight() {
			var asideH = $('aside').innerHeight(),
				contentH = $('.main-container').innerHeight();
			if (asideH > contentH)
				$('.main-container').innerHeight(asideH);
			else if (asideH < contentH)
				$('aside').innerHeight(contentH)
		}