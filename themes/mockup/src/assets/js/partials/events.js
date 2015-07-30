;
/*---------------------------
			EVENTS
----------------------------*/

	// GO TOP BUTTON
	$('body').on('click', '.to-top-btn', function(e) {
		e.preventDefault();
		$('body').animate({scrollTop:0}, '400');
	});

	$('body').on('click', '.classTrigger', function(e) {
		e.preventDefault();
		// console.log();
		var divID = $(this).attr('href');
		if ($(divID).hasClass('opened'))
			$(divID).removeClass('opened')
		else
			$(divID).addClass('opened')
	});