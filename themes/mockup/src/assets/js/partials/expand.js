;
/**
	targetID	- ID целевого блока(ЦБ),
				  указывается либо id элемента без символа #
				  либо "self" - класс expanded добавится элементу, 
				  по которому был произведен клик
	expandMode	- режим раскрытия ЦБ (null || private). 
	  * null	- (default) клик вне ЦБ скроет его.
	  * private	- ЦБ скроется только по клику на триггере
	bodyClasses	- доп. классы для тега body (через пробел)
**/
$('[data-expand]').on('click', function(e) {
	e.preventDefault();
	var targetID	= ($(this).data('expand') =="self") ? $(this) : '#' + $(this).data('expand'),
		expandMode	= $(this).data('expand-mode'),
		noscroll 	= $(this).data('expand-noscroll');

	if (!$(targetID).hasClass('expanded')) {
		// если указаны доп классы для body, проставим их
		if (noscroll) $('body').addClass('no-scroll');

		// раскрываем целевой блок в зависимости от режима
		if (expandMode == 'private') {
			$(targetID).addClass('expanded');
		}
		else {
			$(targetID).addClass('expanded');
			setTimeout(function() {
				$(document).bind('click.expandTrigger', function(e) {
					if (!$(e.target).closest(targetID).length)  {
						$(targetID).removeClass('expanded');
						$('body').removeClass('no-scroll');
						$(this).unbind('click.expandTrigger');
					}
				})
			}, 100);
		}
	}
	else {
		$('body').removeClass('no-scroll');
		$(targetID).removeClass('expanded');
	}
});