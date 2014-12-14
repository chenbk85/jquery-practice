$(function() {
	var $content = $('.content ul'),
		$items = $content.find('li'),
		$btns = $('.change-btn button'),
		$btn_prev = $btns.filter(':first'),
		$btn_next = $btns.filter(':last'),
		$states = $('.state span');

	var contentWidth = $content.width(),
		totalWidth = $items.eq(0).width() * $items.length,
		pages = Math.ceil(totalWidth / contentWidth),
		page = 1;

	// 设定总宽度
	$content.width(contentWidth * pages);

	// 翻页控制
	var setPage = {
		check: function() {
			return $content.is(':animated');
		},

		setState: function() {
			$states.removeClass('active').eq(page - 1).addClass('active');
		},

		prev: function() {
			if (this.check()) return;

			if (page === 1) {
				page = pages - 1;
				this.next();
			} else {
				$content.animate({
					left: $content.offset().left + contentWidth
				});
				page--;
			}

			this.setState();
		},

		next: function() {
			if (this.check()) return;

			if (page === pages) {
				$content.animate({
					left: 0
				});
				page = 1;
			} else {
				$content.animate({
					left: -(contentWidth * page)
				});
				page++;
			}

			this.setState();
		}
	}

	$btn_prev.on('click', setPage.prev.bind(setPage));

	$btn_next.on('click', setPage.next.bind(setPage));
});