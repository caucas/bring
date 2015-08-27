;
/*---------------------------
			EVENTS
----------------------------*/

	// GO TOP BUTTON
	$('.to-top-btn').on('click', function(e) {
		e.preventDefault();
		$('body').animate({scrollTop:0}, '400');
	});

	//  CLEAR FILTER BUTTON
	$('.filter .clearFilter').on('click', function(e) {
		e.preventDefault();
		$(this).siblings('li').find('input').each(function() {
			$(this).attr('checked', false);
		});
	});

	// EXPAND ASIDE SUBMENUS
	$('aside li').on('click', function(e) {
		// проверяем, если клик не по самому <li> и по дочернему <a>
		// то не обрабатываем и переходим по ссыле
		if ((e.target != this) && (e.target.getAttribute('href'))) return;

		// проверяем, есть ли вложенные подменю
		if ($(this).children('ul').length) {
			// если есть, то показываем или скрываем
			if (!$(this).hasClass('expanded')) {
				$('aside li').removeClass('expanded');
				$(this).addClass('expanded')
			}
			else {
				$(this).removeClass('expanded')	
			}
		};
	});