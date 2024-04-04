$(document).ready(function(){
	//Slider
	$('.slider__content').slick({
		speed: 1000,
		infinite: true,
		/* adaptiveHeight: true,	 */	
		prevArrow: '<button type="button" class="slick-prev"> <img src="icons/arrow-left.svg"> </button>',
		nextArrow: '<button type="button" class="slick-next"> <img src="icons/arrow-right.svg"> </button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
				dots: true,
				arrows: false,
			  }
			}
		]
	});
	
	//Tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	  });

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e){
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list-wrapper').eq(i).toggleClass('catalog-item__list-wrapper_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});
/* 	$('.button_mini').on('click', function() {
		$('.overlay, #order').fadeIn('slow');
	}); */

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	//Validate forms
	function valideForms (form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Будь ласка, введіть своє ім'я",
					minlength: jQuery.validator.format("Введіть щонайменше {0} символів!")
				},
				phone: "Будь ласка, введіть свій телефон",
				email: {
				  required: "Будь ласка, введіть свою пошту",
				  email: "Неправильно введена адреса пошти"
				}
			}
		});
	}
	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+38 (099) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}
		
		$.ajax({
			type: "POST", 
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('');

			$('form').trigger('reset');

		});
		return false;

	});

	// Smooth scroll and page up
	$(window).scroll(function() {
		if($(this).scrollTop() > 1200 ) {
			$('.page-up').fadeIn();
		} else {
			$('.page-up').fadeOut();
		}
	});

	$("a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
		  // Prevent default anchor click behavior
		  event.preventDefault();
	
		  // Store hash
		  var hash = this.hash;
	
		  // Using jQuery's animate() method to add smooth page scroll
		  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
	
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		  });
		} // End if
	  });

	new WOW().init();

});



		  