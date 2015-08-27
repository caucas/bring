;
/**
	targetID		- ID целевого блока(ЦБ), указывается без символа #
	expandMode		- режим раскрытия ЦБ (null || private). 
		* null		- (default) клик вне ЦБ скроет его.
		* private	- ЦБ скроется только по клику на триггере
	bodyClasses		- доп. классы для тега body (через пробел)
**/
$('[data-expand]').on('click', function(e) {
	e.preventDefault();
	var targetID	= '#' + $(this).data('expand'),
		expandMode	= $(this).data('expand-mode'),
		bodyClasses = $(this).data('expand-classes');

	if (!$(targetID).hasClass('expanded')) {
		// если указаны доп классы для body, проставим их
		if (bodyClasses) $('body').addClass(bodyClasses);

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
						$('body').removeClass(bodyClasses);
						$(this).unbind('click.expandTrigger');
					}
				})
			}, 100);
		}
	}
	else {
		$('body').removeClass(bodyClasses);
		$(targetID).removeClass('expanded');
	}
});