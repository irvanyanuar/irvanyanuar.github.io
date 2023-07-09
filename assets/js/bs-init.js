$(document).ready(function () {
	AOS.init({ disable: 'mobile' });
	$('[data-bs-hover-animate]')
		.mouseenter(function () { var elem = $(this); elem.addClass('animated ' + elem.attr('data-bs-hover-animate')) })
		.mouseleave(function () { var elem = $(this); elem.removeClass('animated ' + elem.attr('data-bs-hover-animate')) });

	(function () {

		if (!('requestAnimationFrame' in window)) return;
		if (/Mobile|Android/.test(navigator.userAgent)) return;

		var backgrounds = [];

		$('[data-bs-parallax-bg]').each(function () {
			var el = $(this);
			var bg = $('<div>');

			bg.css({
				backgroundImage: el.css('background-image'),
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				position: 'absolute',
				height: '200%',
				width: '100%',
				top: 0, left: 0,
				zIndex: -100
			});

			bg.appendTo(el);
			backgrounds.push(bg[0]);

			el.css({
				position: 'relative',
				background: 'transparent',
				overflow: 'hidden',
			});
		});

		if (!backgrounds.length) return;

		var visible = [];
		var scheduled;

		$(window).on('scroll resize', scroll);

		scroll();

		function scroll() {

			visible.length = 0;

			for (var i = 0; i < backgrounds.length; i++) {
				var rect = backgrounds[i].parentNode.getBoundingClientRect();

				if (rect.bottom > 0 && rect.top < window.innerHeight) {
					visible.push({
						rect: rect,
						node: backgrounds[i]
					});
				}

			}

			cancelAnimationFrame(scheduled);

			if (visible.length) {
				scheduled = requestAnimationFrame(update);
			}

		}

		function update() {

			for (var i = 0; i < visible.length; i++) {
				var rect = visible[i].rect;
				var node = visible[i].node;

				var quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);

				node.style.transform = 'translate3d(0, ' + (-50 * quot) + '%, 0)';
			}

		}

	})();

	userLog()
});

function userLog() {
	var user_info = navigator.userAgent + " - " + navigator.language + " ("+navigator.platform+") [" + window.screen.width + "x" + window.screen.height + "]"
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbyp-4_RbxgI1ezKQt9e5Qk1v-e0-1BvjINDJt4yrUArOrxx2N5A7IO7eqZQRpesH8JaFQ/exec",
		type: 'post',
		data: {
			'created' : dateTime(),
			'name' : 'Visited',
			'email': 'UserVisited',
			'message' : user_info
		},
		success: function () {
			console.log('User Log Visited');
		},
		error: function () {
			console.log('Log visited failed!');
		}
	});
}
document.onkeydown = function (e) {
	if (event.keyCode == 123) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
		return false;
	}
}
$(document).bind("contextmenu", function (e) {
	e.preventDefault();
});
$(document).keydown(function (e) {
	if (e.which === 123) {
		return false;
	}
});

$(document).on('click', '.btn-send-message', function (e) {
	e.preventDefault();

	$("#DateTime").attr("value", dateTime());

	const name = $('#contact-me-form').find('[name=name]').val();
	const email = $('#contact-me-form').find('[name=email]').val();
	const message = $('#contact-me-form').find('[name=message]').val();

	if (message == "") {
		Swal.fire('Message cannot be empty!', '', 'warning')
		return false
	}
	Swal.fire({
		title: 'Sending message...',
		html: 'Please wait...',
		allowEscapeKey: false,
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading()
		}
	})
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbyp-4_RbxgI1ezKQt9e5Qk1v-e0-1BvjINDJt4yrUArOrxx2N5A7IO7eqZQRpesH8JaFQ/exec",
		type: 'post',
		data: $("#contact-me-form").serializeArray(),
		success: function () {
			Swal.close()
			Swal.fire('Message sent successfully', '', 'success')
			$("#contact-me-form")[0].reset()
		},
		error: function () {
			Swal.close()
			Swal.fire("Failed to send message!", '', 'error')
		}
	});

})

function dateTime() {
	return new Date($.now());
}