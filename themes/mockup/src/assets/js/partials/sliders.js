;
/*---------------------------
        SWIPER SLIDERS
----------------------------*/

	// auth form slides (<= 640px)
	var authSlider = new Swiper('#authBlock', {
		slidesPerView: 'auto',
		nextButton: '#authBlock .button-next',
		prevButton: '#authBlock .button-prev',
		followFinger: true,
		simulateTouch: false
	});

	// Home page sliders
	var topSlider = new Swiper('.top-slider', {
		pagination: '.top-slider-pagination',
		paginationClickable: true,
		followFinger: true,
		simulateTouch: false,
		// swipeHandler: '.image',
		// autoplay: 3000,
		effect: 'fade',
		loop: true
	});
	var noveltySlider = new Swiper('.novelty-slider', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		nextButton: '.novelty-slider .swiper-button-next',
		prevButton: '.novelty-slider .swiper-button-prev'
	});
	var singleProductSlider = new Swiper('.single-product-slider', {
		pagination: '.single-slider-pagination',
        paginationClickable: true,
        slidesPerView: 1,
        effect: 'fade'
	});