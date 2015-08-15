;
/*---------------------------
        SWIPER SLIDERS
----------------------------*/

	// Home page sliders
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
		slidesPerView: 'auto',
		spaceBetween: 30,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});
	var singleProductSlider = new Swiper('.single-product-slider', {
		pagination: '.single-slider-pagination',
        paginationClickable: true,
        slidesPerView: 1,
        effect: 'fade'
	});