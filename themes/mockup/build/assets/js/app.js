'use strict';

// JS INCLUDES
'use strict';
(function($) {

	$('a[data-modal]').on('click', function(e) {
		e.preventDefault();
		var modalLocation = $(this).attr('data-modal');
		$('#'+modalLocation).modal($(this).data());
	});

	$.fn.modal = function(options) {

		var defaults = {  
			animation: 'none',
			animationSpeed: 200,
			nonModal: true,
			closeBtn: 'close-modal'
		};

		//Extend dem' options
		var options = $.extend({}, defaults, options); 

		return this.each(function() {

			var modal = $(this),
				topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
				locked = false,
				modalBG = $('.modal-bg');

			if(modalBG.length == 0) {
				modalBG = $('<div class="modal-bg" />').insertAfter(modal);
			}		    

			//Entrance Animations
			modal.bind('modal:open', function () {
				if ($(window).innerWidth() < 800)
					$('body').addClass('no-scroll');
				modalBG.unbind('click.modalEvent');
				$('.' + options.closeBtn).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fade") {
						modal.css({
							'display' : 'block',
							'opacity' : 0,
							'visibility' : 'visible',
							'top': $(document).scrollTop()+topMeasure
						});
						modalBG.fadeIn(options.animationSpeed/2);
						modal.delay(options.animationSpeed/2).animate({
							"opacity" : 1
						}, options.animationSpeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({
							'visibility' : 'visible',
							'display' : 'block',
							'top':$(document).scrollTop()+topMeasure
						});
						modalBG.css({"display":"block"});	
						unlockModal()				
					}
				}
				modal.unbind('modal:open');
			}); 	

			//Closing Animation
			modal.bind('modal:close', function () {
				if ($('body').hasClass('no-scroll'))
					$('body').removeClass('no-scroll');
				if(!locked) {
					lockModal();
					if(options.animation == "fade") {
						modalBG.delay(options.animationSpeed).fadeOut(options.animationSpeed);
						modal.animate({
							"opacity" : 0
						}, options.animationSpeed, function() {
							modal.css({
								'opacity' : 1,
								'display' : 'none',
								'visibility' : 'hidden',
								'top' : topMeasure
							});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({
							'display' : 'none',
							'visibility' : 'hidden',
							'top' : topMeasure
						});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('modal:close');
			});     

		/* Open and add Closing Listeners */
		modal.trigger('modal:open')
			
			//Close Modal Listeners
			var closeButton = $('.' + options.closeBtn).bind('click.modalEvent', function () {
				modal.trigger('modal:close')
			});
			
			if(options.nonModal) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
					modal.trigger('modal:close')
				});
			}
			$('body').keyup(function(e) {
				if(e.which===27){ modal.trigger('modal:close'); }
			});

			/* Animations Locks */
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	

		});
	}
})(jQuery);
;
/*---------------------------
			EVENTS
----------------------------*/

	// GO TOP BUTTON
	$('body').on('click', '.to-top-btn', function(e) {
		e.preventDefault();
		$('body').animate({scrollTop:0}, '400');
	});

	$('body').on('click', '[data-trigger]', function(e) {
		e.preventDefault();
		var divID = '#' + $(this).data('trigger');
		if (!$(divID).hasClass('opened')) {
			$(divID).addClass('opened');
			setTimeout(function() {
				$(document).bind('click.jm-trigger', function(e) {
					if (!$(e.target).closest(divID).length)  {
						$(divID).removeClass('opened');
						$(this).unbind('click.jm-trigger');
					}
				})
			}, 0);
		}
	});
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