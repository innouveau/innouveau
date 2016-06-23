$('#nav ul li.menu-item a').hover(function(){
	var container = $(this).find('.ripple-container'),
		ripple = $(this).find('.ripple');
	rippleIn(container, ripple);
});

$('#nav ul li.menu-item a').mouseleave(function(){
	var container = $(this).find('.ripple-container'),
		ripple = $(this).find('.ripple');
	rippleOut(container, ripple);
})


function rippleIn(container, ripple) {
	container.css('opacity', 1);
	ripple.addClass('show');
}

function rippleOut(container, ripple) {
	container.css('opacity', 0);
	ripple.removeClass('show');
}
