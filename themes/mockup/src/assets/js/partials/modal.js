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
			animationSpeed: 100,
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
			  $('body').addClass('no-scroll');
			  modalBG.unbind('click.modalEvent');
				$('.' + options.closeBtn).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fade") {
						modal.css({
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
								'visibility' : 'hidden',
								'top' : topMeasure
							});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
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