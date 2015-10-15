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
	$('.clearFilter').on('click', function(e) {
		e.preventDefault();
		$(this).siblings('li').find('input').each(function() {
			$(this).attr('checked', false);
		});
	});

	// EXPAND ASIDE SUBMENUS
	$('aside li').on('click', function(e) {
		// проверяем, если клик не по самому <li> и по дочернему <a>
		// то не обрабатываем и переходим по ссыле
		// if ((e.target != this) && (e.target.getAttribute('href'))) return;
		debugger;
		console.log($(this));
		if ($(this).children('ul').length) { // проверяем, есть ли вложенные подменю
			if (!$(this).hasClass('expanded')) {
				$(this).siblings('li').removeClass('expanded');
				$(this).addClass('expanded')
			}
			else {
				$(this).removeClass('expanded')	
			}
		};
	});

	// EXPAND SUBMENUS
	$('.nav-expand li span').on('click', function(e) {
		var $menuElement = $(this).parents('li');

		if ($(this).siblings('ul').length) { // проверяем, есть ли вложенные подменю
			if ($menuElement.hasClass('active')) {
				$menuElement.removeClass('active');
			}
			else {
				$menuElement.siblings('li').removeClass('active'); // очищаем соседние
				$menuElement.find('li').removeClass('active'); // и вложенные элементы меню
				$menuElement.addClass('active'); // активируем текущий элемент меню
			}
		}
		else {
			$menuElement.siblings('li').removeClass('active');
			$menuElement.addClass('active');
		}
	});