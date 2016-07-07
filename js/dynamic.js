function slider(t) {
	t.find('.container').empty();
	t.find('.prev, .next, .pagination').remove();
	t.find('.container').html(t.find('.temp').html());
	t.width(t.parent().width())
	t.find('.container, .container > div').width(t.parent().width());
	t.slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 10000,
		pause: 2500,
	});
	t.find('.line-l').width(($('.slider .inner').width()-$('.slider .pagination li').size()*30)/2-61);
	t.find('.line-r').width(($('.slider .inner').width()-$('.slider .pagination li').size()*30)/2-62);
}
$(function() {
	slider($('.slider'));
	$('.slider').bind('swipeleft', function() {
		$('.slider .next').trigger('click');
	});
	$('.slider').bind('swiperight', function() {
		$('.slider .prev').trigger('click');
	});
	$('.index .nav ul li a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass();
	});
	$('.index .rc').css({
		'min-height': $('.index .nav').height()+'px'
	});
	$('.index .nav a[href]').on('click', function(e) {
		e.preventDefault();
		var t = $(this);
		function showTab() {
			$('.index .rc > div[data-tab="'+t.attr('href')+'"]').stop().fadeIn(250);
		}
		if ( $('.index .rc > div:visible').length > 0 ) {
			$('.index .rc > div').stop().fadeOut(250, function() {
				showTab();
			});
		} else {
			showTab();
		}
	}).filter(':first').click();
	$('menu h4').bind('mouseenter', function() {
		$('.menu-drop').css({
			'left': $(this).offset().left+'px',
			'top': $(this).offset().top+$(this).outerHeight()+'px'
		}).delay(200).stop(true,true).fadeIn(250);
		setTimeout(function() {
			$('header .city-drop, .lk-drop').stop().slideUp(0);
			$('header .city, .panel .lk').removeClass('active');
		}, 200);
	});
	$('body').on('mouseover', function() {
		$('.menu-drop').delay(200).stop(true,true).fadeOut(250);
	});
	$('menu h4, .menu-drop').on('mouseover', function(e) {
		e.stopPropagation();
	});
	$('[data-open]').bind('click', function(e) {
		e.preventDefault();
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(500);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < $(window).scrollTop()+40 ) {
			h = $(window).scrollTop()+20;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(500);
	});
	$('.fade, [data-target] .close').bind('click', function(e) {
		e.preventDefault();
		$('.fade, [data-target]').stop(true,true).fadeOut(500);
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('header .city').on('click', function(e) {
		e.preventDefault();
		if ( $('header .city-drop').is(':hidden') ) {
			$('header .city-drop').stop().slideDown(0);
			$(this).addClass('active');
			$('.lk-drop').stop().slideUp(0);
			$('.panel .lk').removeClass('active');
		} else {
			$('header .city-drop').stop().slideUp(0);
			$(this).removeClass('active');
		}
	});
	$('header .city-drop li').on('click', function(e) {
		e.preventDefault();
		$(this).hide().siblings().show();
		$(this).parent().stop().slideUp(0);
		$('header .city').removeClass('active');
		$('header .city span').text($(this).text());
	});
	$('header .city-drop li.default').trigger('click');
	$('body').click(function() {
		$('header .city-drop, .lk-drop').stop().slideUp(0);
		$('header .city, .panel .lk').removeClass('active');
	});
	$('header .city-drop, header .city, .panel .lk, .lk-drop').click(function(e) {
		e.stopPropagation();
	});
	$('[data-open="gallery"]').on('click', function() {
		$('.gallery-e .main').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			infinite: true,
			arrows: false,
			draggable: false
		});
		$('.gallery-e .preview .item').each(function() {
			$(this).attr('data-item', $(this).index());
		});
		$('.gallery-e .preview').slick({
			slidesToShow: eval($('.gallery-e .preview').attr('data-big')),
			slidesToScroll: 1,
			adaptiveHeight: true,
			infinite: true,
			draggable: false,
			responsive: [
				{
					breakpoint: 1460,
					settings: {
						slidesToShow: eval($('.gallery-e .preview').attr('data-medium')),
					}
				},
				{
					breakpoint: 1230,
					settings: {
						slidesToShow: eval($('.gallery-e .preview').attr('data-small')),
					}
				}
			]
		});
		$('.gallery-e .preview .item > div').on('click', function(e) {
			e.preventDefault();
			$(this).parent().addClass('current').siblings().removeClass('current');
			$('.gallery-e .main').slick('slickGoTo', eval($(this).parent().attr('data-item')));
		});
		$('.gallery-e .preview .item.slick-current').addClass('current');
	});
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.nav-e li').children('ul').each(function() {
		var t = $(this).parent();
		t.addClass('sub');
		t.children('a').append('<span class="arrow"></span>');
	});
	$('.nav-e .arrow').on('click', function(e) {
		e.preventDefault();
		$(this).parent().parent().toggleClass('active');
	});
	$('.card-e .gallery .preview li').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.gallery').find('[data-main="'+$(this).attr('data-preview')+'"]').stop().fadeIn(200).siblings('img').fadeOut(200);
		$(this).addClass('current').siblings().removeClass('current');
	}).filter(':first').click();
	$('input[type="checkbox"]').uniform();
	$('.product-m .nav li a').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.product-m').find('[data-tab="'+$(this).attr('href')+'"]').show().siblings('.tab').hide();
		$(this).parent().addClass('active').siblings().removeClass('active');
	}).filter(':first').click();
	$('.filter-e .minimize').on('click', function(e) {
		e.preventDefault();
		if ( $(this).text() == 'Свернуть' ) {
			$(this).parent().find('.group').stop().slideUp(200);
			$(this).text('Развернуть');
		} else {
			$(this).parent().find('.group').stop().slideDown(200);
			$(this).text('Свернуть');
		}
		$(this).toggleClass('active');
	});
	$('.file .upload').on('click', function() {
		$(this).siblings('input[type="file"]').trigger('click');
	});
	$('.file input[type="file"]').change(function() {
		$(this).siblings('.upload').hide();
		$(this).siblings('.filename, .delete').show();
		$(this).siblings('.filename').text($(this).val().split('\\').pop());
	});
	$('.file .delete').on('click', function() {
		$(this).hide();
		$(this).siblings('.filename').hide();
		$(this).siblings('.upload').show();
	});
	$('.panel .lk').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			$('.lk-drop').css({
				'left': $(this).offset().left+'px'
			}).stop().fadeIn(200);
			$('header .city-drop').stop().slideUp(0);
			$('header .city').removeClass('active');
		} else {
			$('.lk-drop').stop().fadeOut(200);
		}
		$(this).toggleClass('active');
	});
	$(window).resize(function() {
		slider($('.slider'));
		if ( $('.panel .lk').hasClass('active') ) {
			$('.lk-drop').css({
				'left': $('.panel .lk').offset().left+'px'
			});
		}	
	});
});