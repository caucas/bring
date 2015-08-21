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

	$('body').on('click', '[data-expand]', function(e) {
		e.preventDefault();
		var divID = '#' + $(this).data('expand');
		var mode = $(this).data('expand-mode');
		// debugger
		if (mode == 'private') {
			if (!$(divID).hasClass('expanded'))
				$(divID).addClass('expanded');
			else
				$(divID).removeClass('expanded');
		}
		else {
			if (!$(divID).hasClass('expanded')) {
				$(divID).addClass('expanded');
				setTimeout(function() {
					$(document).bind('click.data-expand', function(e) {
						if (!$(e.target).closest(divID).length)  {
							$(divID).removeClass('expanded');
							$(this).unbind('click.data-expand');
						}
					})
				}, 0);
			}
		}
	});