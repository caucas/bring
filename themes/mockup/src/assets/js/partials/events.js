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
		if ($(divID).hasClass('opened'))
			$(divID).removeClass('opened')
		else
			$(divID).addClass('opened')
	});