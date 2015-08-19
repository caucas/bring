;
/*---------------------------
			EVENTS
----------------------------*/

	// GO TOP BUTTON
	$('body').on('click', '.to-top-btn', function(e) {
		e.preventDefault();
		$('body').animate({scrollTop:0}, '400');
	});

	//  CLEAR FILTER BUTTON
	$('body').on('click', '.clearFilter', function(e) {
		e.preventDefault();
		$(this).siblings('label').children('input').each(function() {
			$(this).attr('checked', false);
		});
	});

	$('body').on('click', '[data-open]', function(e) {
		e.preventDefault();
		var divID = '#' + $(this).data('open');
		var mode = $(this).data('open-mode');
		// debugger
		if (mode == 'private') {
			if (!$(divID).hasClass('opened'))
				$(divID).addClass('opened');
			else
				$(divID).removeClass('opened');
		}
		else {
			if (!$(divID).hasClass('opened')) {
				$(divID).addClass('opened');
				setTimeout(function() {
					$(document).bind('click.data-open', function(e) {
						if (!$(e.target).closest(divID).length)  {
							$(divID).removeClass('opened');
							$(this).unbind('click.data-open');
						}
					})
				}, 0);
			}
		}
	});