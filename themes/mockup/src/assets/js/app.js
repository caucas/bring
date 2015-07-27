// var swiper = new Swiper('.swiper-container', {
// 	scrollbar: '.swiper-scrollbar',
// 	scrollbarHide: false,
// 	slidesPerView: 3,
// 	nextButton: '.swiper-button-next',
// 	prevButton: '.swiper-button-prev',
// 	spaceBetween: 30
// });
	var mainSlider = new Swiper('.main-slider', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		swipeHandler: '.image',
		followFinger: true,
		// autoplay: 3000,
		effect: 'fade',
		loop: true
	});