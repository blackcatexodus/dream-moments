
document.addEventListener('DOMContentLoaded', function(){ 
    /*var swiper = new Swiper(".open-gift-swiper", {
        direction: "vertical",
        pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: '.gifts-below-btn-next',
		},
	});*/
	
	$('.gifts-below-btn-next').click(function() {
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-2').removeClass('hidden');
		
		$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		$('.go-slide-2').addClass('swiper-pagination-bullet-active');
		
	});
	
	$('.go-slide-1').click(function() {
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-1').removeClass('hidden');
		$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		$('.go-slide-1').addClass('swiper-pagination-bullet-active');
	});
	
	$('.go-slide-2').click(function() {
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-2').removeClass('hidden');
		$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		$('.go-slide-2').addClass('swiper-pagination-bullet-active');
	});
	
	popup_gift_more_info = new jBox('Modal', {
		content: $('#gift-more-info'),
		closeOnClick: false,
		closeButton: 'box',
		repositionOnContent: true,
		
		onCloseComplete: function onCloseComplete() {
		}
	});
	
	//popup_gift_more_info.open();
	
	
	popup_product_options_select = new jBox('Modal', {
		content: $('#product-options-select'),
		closeOnClick: false,
		closeButton: 'box',
		
	});
	

	
	$('.select-gift-btn, .choose-gift').click(function(){
		popup_gift_more_info.close();
	
		ProductID = $(this).parent().find('.ProductID').val();
		ProductName = $(this).parent().find('.ProductName').val();
		gift_img = $(this).parent().find('.gift_img').val();
		ProductPrice = $(this).parent().find('.ProductPrice').val();
		
		$('#activate-gift').val(ProductID);
		$('.activate-gift-name').html(ProductName);
		$('.activate-gift-img').attr('src', gift_img);
		
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-3').removeClass('hidden');
		$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		$('.go-slide-3').addClass('swiper-pagination-bullet-active');
	});
	
	$('.confirm-activate').click(function() {
		var data = $('#activate-certificate-form').serializeArray();
		
		$.ajax({
			type: "POST",
			url: '/ajax/activate',
			data: data,
			cache: false,
			beforeSend: function() {
				$('.confirm-activate').addClass('loading-btn');
			},
			complete: function() {
				$('.confirm-activate').removeClass('loading-btn');
			}, 
			dataType: "json",
			success: function(data) {
				if (data.error === "Y") {
					if (data.errorFields.length > 0) {
						for (var i = 0; i < data.errorFields.length; i++) {
							$('#activate-certificate-form').find('[name="activate[' + data.errorFields[i] + ']"]').addClass('input_type_error');
						}
					}
				} else {
					$('.open-gift-slide').addClass('hidden');
					$('.open-gift-slide-4').removeClass('hidden');
					$('.open-gift-slide-4 .success-success').removeClass('hidden');
					$('.swiper-pagination').remove();
					
				}
			}
		});
		
	});
	
	$('.confirm-activate-demo').click(function() {
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-4').removeClass('hidden');
		$('.open-gift-slide-4 .success-success-demo').removeClass('hidden');
		$('.swiper-pagination').remove();
	});
	
	$('#activate-phone').inputmask({ 'mask': '+7 (999) 999-99-99', showMaskOnHover: false });
	
	$(".catalog-filter__select").niceSelect();

	if ($('#constructorBoxSlider').length) {
		let constructorSlider = new Swiper("#constructorBoxSlider", {
			slidesPerView: "auto",
			spaceBetween: 15,
			navigation: {
				nextEl: "#constructorBoxSlider .swiper-button-next",
				prevEl: "#constructorBoxSlider .swiper-button-prev",
			},
			breakpoints: {
				1240: {
					spaceBetween: 10,
					slidesOffsetBefore:25,
					slidesPerView: "auto",
				}
			}
		});
	 
		$("#catalogCategoryFilter").change(function(){
			$(".load-more__button").attr("data-theme", $(this).val());
		});
		$("#catalogWhoFilter").change(function(){
			$(".load-more__button").attr("data-who", $(this).val());
		});
		$("#catalogPriceFilter").change(function(){
			$(".load-more__button").attr("data-price", $(this).val());
		});
		$("#catalogFilterSelect").click(function(event){
			event.preventDefault();
			
			let $catalog = $("#giftsCatalogList");
			$catalog.addClass("catalog-list_loading");

			let form_data = {
				type: "constructorUniversalCertificate",
				page: 1,
				town: 1,
				theme: $("#catalogCategoryFilter").val(),
				who: $("#catalogWhoFilter").val(),
				price: $("#catalogPriceFilter").val(),
			};
			loadMore(
				form_data,
				function(response){
					$catalog.removeClass("catalog-list_loading");
					$catalog.html(response.html);
				},
				function(){
					$catalog.removeClass("catalog-list_loading");
					showNotification("Обновите страницу, затем повторите действие.", "error");
				}
			);

		});
		
		$('#catalogFilterSelect').trigger('click');
	}
	
	$('.go-to-activate-universal-certificate').click(function(){
		$('.go-to-activate-universal-certificate').addClass('loading-btn');
		
		//return false;
	
		ProductID_arr = [];
		ProductName_arr = [];
		gift_img_arr = [];
		ProductPrice_arr = [];

		$.ajax({
			type: "POST",
			async: false,
			url: "/ajax/clearcartopengiftvalue",
			cache: false,
			dataType: "json",
			success: function success(response) {
			},
			error: function error(response) {
			}
		});
	
		total_price = 0;
		$('#constructorBoxSlider .constructor-box__item').each(function(index) {
			if ($(this).find('.ProductID').length) {
				ProductID_arr.push($(this).find('.ProductID').val());
				ProductName_arr.push($(this).find('.ProductName').val());
				gift_img_arr.push($(this).find('.gift_img').val());
				
				ProductPrice_arr.push($(this).find('.ProductPrice').val());
				
				if ($(this).find('.ProductPrice').length) {
					total_price += parseFloat($(this).find('.ProductPrice').val());
				}
				
				$.ajax({
					type: 'POST',
					async: false,
					url: "/ajax/addtocartopengiftvalue",
					data: { 
						pid: $(this).find('.ProductID').val(),
						option_data: $(this).find('.option_data').val(),
					},
					cache: false,
					dataType: 'json',
					success: function success(response) {
					},
					error: function error(response) {
					}
				});
			}
		});
		
		if (ProductID_arr.length == 0) {
			$('.go-to-activate-universal-certificate').removeClass('loading-btn');
			return false;
		}
		
		data_gift = '';
		
		$.each(ProductID_arr, function(index,value) {
			data_gift += '<div class="product__info-container-item">';
			data_gift += '<div class="product__info">';
			data_gift += '<div class="product__content">';
			data_gift += '<img src="' + gift_img_arr[index] + '" class="img-responsive activate-gift-img">';
			data_gift += '<p class="product__title activate-gift-name">' + ProductName_arr[index] + '</p>';
			data_gift += '</div>';
			data_gift += '<div class="type-certificate hidden">';
			data_gift += 'Тип сертификата:<br>Подарочный';
			data_gift += '<input class="input" type="hidden" name="activate[gift]" value="' + ProductID_arr[index] + '">';
			data_gift += '</div>';
			data_gift += '</div>';
			data_gift += '<div class="checkout-product__price">';
			data_gift += '<i class="icon icon_type_valute checkout-product__valute"></i>';
			data_gift += '<span>' + parseFloat(ProductPrice_arr[index]).toLocaleString('ru') + '</span>';
			data_gift += '</div>';
			data_gift += '</div>';
		});
		
		CertificateBalance = parseFloat($('.constructor-box input.CertificateBalance').val());
		
		remainderCertificateBalance = CertificateBalance - total_price;
		
		if (remainderCertificateBalance < 0) {
			missing_amount = total_price - CertificateBalance;
		
			data_gift += '<div class="product__info-container-item surcharge-amount-container">';
			data_gift += '<div class="product__info">';
			data_gift += '<div class="product__content">';
			data_gift += '<p class="product__title activate-gift-name">Сумма, необходимая к оплате сверх номинала подарочного сертификата</p>';
			data_gift += '</div>';
			data_gift += '</div>';
			data_gift += '<div class="checkout-product__price">';
			data_gift += '<i class="icon icon_type_valute checkout-product__valute"></i>';
			data_gift += '<span>' + missing_amount.toLocaleString('ru') + '</span>';
			data_gift += '</div>';
			data_gift += '</div>';
			
			$('.activate-certificate-form-value-payment').removeClass('hidden');
		} else {
			$('#rest-certificate').html(remainderCertificateBalance.toLocaleString('ru'));
			$('.rest-certificate-block').removeClass('hidden');
		}
		
		$('.product__info-container').html(data_gift);
		
		$('#total-gift-set').html(total_price.toLocaleString('ru'));
		
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-3').removeClass('hidden');
		$('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
		$('.go-slide-3').addClass('swiper-pagination-bullet-active');
		
		$('.go-to-activate-universal-certificate').removeClass('loading-btn');
	});
	
	$('.confirm-activate-universal-certificate-demo').click(function() {
		$('.open-gift-slide').addClass('hidden');
		$('.open-gift-slide-4').removeClass('hidden');
		$('.open-gift-slide-4 .success-success-demo').removeClass('hidden');
		$('.swiper-pagination').remove();
	});
	
	$('.confirm-activate-universal-certificate').click(function() {
		var data = $('#activate-certificate-form-value').serializeArray();
		
		//console.log(data);
		//return false;
		
		$.ajax({
			type: 'POST',
			url: '/ajax/activateuniversalcertificate',
			data: data,
			cache: false,
			beforeSend: function() {
				$('.confirm-activate-universal-certificate').addClass('loading-btn');
			},
			complete: function() {
				$('.confirm-activate-universal-certificate').removeClass('loading-btn');
			}, 
			dataType: 'json',
			success: function(data) {
				if (data['error']) {
					for (i in data['error']) {
						$('#activate-certificate-form-value').find('[name="activate[' + i + ']"]').addClass('input_type_error');
					}
				} else if (data['redirect']) {
					location = data['redirect'];
				} else if (data['success']) {
					$('.open-gift-slide').addClass('hidden');
					$('.open-gift-slide-4').removeClass('hidden');
					$('.open-gift-slide-4 .success-success').removeClass('hidden');
					$('.swiper-pagination').remove();
				} else if (data['error_activate']) {
					$('.open-gift-slide').addClass('hidden');
					$('.open-gift-slide-4').removeClass('hidden');
					$('.open-gift-slide-4 .success-error').removeClass('hidden');
					$('.swiper-pagination').remove();
				}
			}
		});
		
	});
	
	if ($('#slide_2').length) {
		$('.gifts-below-btn-next').trigger('click');
	};
	
	
	reloadJSOpenGift();


	// confetti
	
	
	window.onload = function () {
		if (window.innerWidth >= 1024) {
			var duration = 15 * 1000;
			var animationEnd = Date.now() + duration;
			var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

			function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
			}

			var interval = setInterval(function() {
			var timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			var particleCount = 50 * (timeLeft / duration);
			confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
			confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
			}, 250);
		}
		else {
			var count = 200;
			var defaults = {
			origin: { y: 0.7 }
			};

			function fire(particleRatio, opts) {
			confetti({
				...defaults,
				...opts,
				particleCount: Math.floor(count * particleRatio)
			});
			}

			fire(0.25, {
			spread: 26,
			startVelocity: 55,
			});
			fire(0.2, {
			spread: 60,
			});
			fire(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8
			});
			fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2
			});
			fire(0.1, {
			spread: 120,
			startVelocity: 45,
			});
		}
	};
	
	  
	
	


	$('.gifts-below-btn-next').on('click', function() {
		$('canvas').fadeOut('slow');
	});
	$('.swiper-content').fadeIn('slow');
});


function reloadJSOpenGift() {
	console.log('reloadJSOpenGift');
	
	$('.remove-select-gift-value-btn').unbind('click');
	$('.remove-select-gift-value-btn').on('click', function(e) {
		$('.constructor-container-gift_id-' + $(this).closest('.constructor-box__item').find('.ProductID').val()).find('.gift-activation-box__gifts-item').removeClass('catalog-list__item_inbox');
		
		$(this).closest('.constructor-box__item').addClass('constructor-box__item_empty');
		$(this).closest('.constructor-box__item').html('');
		
		total_price = 0;
		$('#constructorBoxSlider .constructor-box__item').each(function(index) {
			if ($(this).find('.ProductPrice').length) {
				total_price += parseFloat($(this).find('.ProductPrice').val());
			}
		});
		
		CertificateBalance = parseFloat($('.constructor-box input.CertificateBalance').val());
		
		remainderCertificateBalance = CertificateBalance - total_price;
		
		if (remainderCertificateBalance >= 0) {
			$('.constructor-price-type').html('Остаток номинала');
			$('.open-gift-constructor-price').removeClass('insufficient-funds');
		} else {
			$('.constructor-price-type').html('Сумма доплаты');
			$('.open-gift-constructor-price').addClass('insufficient-funds');
		}
		
		$('.open-gift-constructor-price').html(remainderCertificateBalance.toLocaleString('ru'));
	});

	$('.select-gift-value-btn, .choose-gift-value').unbind('click');
	$('.select-gift-value-btn, .choose-gift-value').click(function() {
		popup_gift_more_info.close();

		ProductID = $(this).parent().find('.ProductID').val();
		ProductName = $(this).parent().find('.ProductName').val();
		gift_img = $(this).parent().find('.gift_img').val();
		ProductPrice = $(this).parent().find('.ProductPrice').val();
		
		
		var emptyProductBox = $('.constructor-box__item_empty');
		if (emptyProductBox.length == 0) {
			showNotification('В наборе максимальное число подарков', 'error');
			return;
		}
		
		
		ProductID_arr = [];
	
		$('#constructorBoxSlider .constructor-box__item').each(function(index) {
			if ($(this).find('.ProductID').length) {
				ProductID_arr.push($(this).find('.ProductID').val());
			}
		});
		
		if ($.inArray(ProductID, ProductID_arr) !== -1) {
			return false;
		}
		
		
		emptyProductBox = emptyProductBox.first();
		
		data_product = '<img class="constructor-box__item-image" src="' + gift_img + '" >';
		data_product += '<i class="constructor-box__item-remove remove-select-gift-value-btn"></i>';
		
		data_product += '<div class="hidden">';
		data_product += '<input type="hidden" class="ProductID" value="' + ProductID + '">';
		data_product += '<input type="hidden" class="ProductName" value=\'' + ProductName + '\'>';
		data_product += '<input type="hidden" class="gift_img" value="' + gift_img + '">';
		data_product += '<input type="hidden" class="ProductPrice" value="' + ProductPrice + '">';
		data_product += '</div>';
		
		emptyProductBox.html(data_product);
		emptyProductBox.removeClass('constructor-box__item_empty');
		
		$('.constructor-container-gift_id-' + ProductID).find('.gift-activation-box__gifts-item').addClass('catalog-list__item_inbox');
		
		total_price = 0;
		$('#constructorBoxSlider .constructor-box__item').each(function(index) {
			if ($(this).find('.ProductPrice').length) {
				total_price += parseFloat($(this).find('.ProductPrice').val());
			}
		});
		
		CertificateBalance = parseFloat($('.constructor-box input.CertificateBalance').val());
		
		remainderCertificateBalance = CertificateBalance - total_price;
		
		if (remainderCertificateBalance >= 0) {
			$('.constructor-price-type').html('Остаток номинала');
			$('.open-gift-constructor-price').removeClass('insufficient-funds');
		} else {
			$('.constructor-price-type').html('Сумма доплаты');
			$('.open-gift-constructor-price').addClass('insufficient-funds');
		}
		
		$('.open-gift-constructor-price').html(remainderCertificateBalance.toLocaleString('ru'));
		
		
		reloadJSOpenGift();
		
	});

	$('.gifts-container .more-info').unbind('click');
	$('.gifts-container .more-info').click(function(){
		$('.gift-info__item').addClass('hidden');
		
		if ($(this).parent().parent().find('.product-option-block').length) {
			$('.choose-gift-value').addClass('hidden');
			$('.choose-gift-value-options').removeClass('hidden');
			
			$('#gift-more-info-options').html('');
			$(this).parent().parent().find('.product-option-block').clone().appendTo('#gift-more-info-options');
		} else {
			$('.choose-gift-value').removeClass('hidden');
			$('.choose-gift-value-options').addClass('hidden');
		}
		
		ProductID = $(this).closest('.gift-activation-box__gifts-item').find('.ProductID').val();
		
		ProductPrice = $(this).closest('.gift-activation-box__gifts-item').find('.ProductPrice').val();
	
		gift_img = $(this).closest('.gift-activation-box__gifts-item').find('.gift_img').val();
		ProductPersons = $(this).closest('.gift-activation-box__gifts-item').find('.ProductPersons').val();
		ProductDuration = $(this).closest('.gift-activation-box__gifts-item').find('.ProductDuration').val();
		ProductWeather = $(this).closest('.gift-activation-box__gifts-item').find('.ProductWeather').val();
		ProductClothes = $(this).closest('.gift-activation-box__gifts-item').find('.ProductClothes').val();
		ProductExpire = $(this).closest('.gift-activation-box__gifts-item').find('.ProductExpire').val();
		ProductPlace = $(this).closest('.gift-activation-box__gifts-item').find('.ProductPlace').val();
		ProductName = $(this).closest('.gift-activation-box__gifts-item').find('.ProductName').val();
		ProductFullIntro = $(this).closest('.gift-activation-box__gifts-item').find('.ProductFullIntro').val();
		
		if ($(this).closest('.gift-activation-box__gifts-item').find('.OptionDescription').length) {
			OptionDescription = $(this).closest('.gift-activation-box__gifts-item').find('.OptionDescription').val();
		} else {
			OptionDescription = '';
		}
		
		$('.choose-gift-container .ProductID').val(ProductID);
		$('.choose-gift-container .ProductName').val(ProductName);
		$('.choose-gift-container .gift_img').val(gift_img);
		$('.choose-gift-container .ProductPrice').val(ProductPrice);
		
		$('.gift-card-more-info-container .gift_img').attr('src', gift_img);
		
		if (ProductPersons) {
			$('.gift-card-more-info-container .ProductPersons mark').html(ProductPersons);
			$('.gift-info__item.ProductPersons').removeClass('hidden');
		}
		if (ProductDuration) {
			$('.gift-card-more-info-container .ProductDuration mark').html(ProductDuration);
			$('.gift-info__item.ProductDuration').removeClass('hidden');
		}
		if (ProductWeather) {
			$('.gift-card-more-info-container .ProductWeather mark').html(ProductWeather);
			$('.gift-info__item.ProductWeather').removeClass('hidden');
		}
		if (ProductClothes) {
			$('.gift-card-more-info-container .ProductClothes mark').html(ProductClothes);
			$('.gift-info__item.ProductClothes').removeClass('hidden');
		}
		if (ProductExpire) {
			$('.gift-card-more-info-container .ProductExpire mark').html(ProductExpire);
			$('.gift-info__item.ProductExpire').removeClass('hidden');
		}
		if (ProductPlace) {
			$('.gift-card-more-info-container .ProductPlace mark').html(ProductPlace);
			$('.gift-info__item.ProductPlace').removeClass('hidden');
		}
		if (ProductName) {
			$('.gift-card-more-info-container .ProductName').html(ProductName);
			$('.gift-info__item.ProductName').removeClass('hidden');
		}
		if (ProductFullIntro) {
			$('.gift-card-more-info-container .ProductFullIntro').html(ProductFullIntro);
			$('.ProductFullIntro').removeClass('hidden');
		} else {
			$('.ProductFullIntro').addClass('hidden');
		}
		
		if (OptionDescription) {
			$('.gift-card-more-info-container .OptionDescription').html(OptionDescription);
			$('.OptionDescription').removeClass('hidden');
		} else {
			$('.OptionDescription').addClass('hidden');
		}
		
		popup_gift_more_info.open();
	});


	$('#constructorBoxSlider .constructor-box__item').each(function(index) {
		if ($(this).find('.ProductID').length) {
			$('.constructor-container-gift_id-' + $(this).find('.ProductID').val()).find('.gift-activation-box__gifts-item').addClass('catalog-list__item_inbox');
		}
	});


	$('.select-gift-value-btn-modal').unbind('click');
	$('.select-gift-value-btn-modal').click(function(e) {
	
		$('#modal-price-list').html('');
		$(this).parent().parent().find('.product-option-block').clone().appendTo('#modal-price-list');
		$('#modal-price-list .product-option-block').removeClass('hidden');
		
		popup_product_options_select.open();
		
		$('.jBox-overlay').css('background-color', 'rgba(0, 0, 0, .82)');
		
		reloadJSOpenGift();
		
	});
	
	$('.choose-gift-value-options').unbind('click');
	$('.choose-gift-value-options').click(function(e) {
	
		$('#modal-price-list').html('');
		$(this).parent().parent().find('.product-option-block').clone().appendTo('#modal-price-list');
		$('#modal-price-list .product-option-block').removeClass('hidden');
		
		popup_gift_more_info.close();
		
		popup_product_options_select.open();
		
		$('.jBox-overlay').css('background-color', 'rgba(0, 0, 0, .82)');
		
		reloadJSOpenGift();
		
	});


	$('.js-add-gift-value-options').unbind('click');
	$('.js-add-gift-value-options').click(function() {
		popup_product_options_select.close();
		
		ProductID = $(this).parent().find('.ProductID').val();
		ProductName = $(this).parent().find('.ProductName').val();
		gift_img = $(this).parent().find('.gift_img').val();
		ProductPrice = $(this).parent().find('.ProductPrice').val();

		option_data = false;
		
		if ($(this).closest('.price-list__item').length) {
			option_data = $(this).closest('.price-list__item').attr('data-id');
		}

		
		
		var emptyProductBox = $('.constructor-box__item_empty');
		if (emptyProductBox.length == 0) {
			showNotification('В наборе максимальное число подарков', 'error');
			return;
		}
		
		
		ProductID_arr = [];
	
		$('#constructorBoxSlider .constructor-box__item').each(function(index) {
			if ($(this).find('.ProductID').length) {
				ProductID_arr.push($(this).find('.ProductID').val());
			}
		});
		
		if ($.inArray(ProductID, ProductID_arr) !== -1) {
			return false;
		}
		
		
		emptyProductBox = emptyProductBox.first();
		
		data_product = '<img class="constructor-box__item-image" src="' + gift_img + '" >';
		data_product += '<i class="constructor-box__item-remove remove-select-gift-value-btn"></i>';
		
		data_product += '<div class="hidden">';
		data_product += '<input type="hidden" class="ProductID" value="' + ProductID + '">';
		data_product += '<input type="hidden" class="ProductName" value=\'' + ProductName + '\'>';
		data_product += '<input type="hidden" class="gift_img" value="' + gift_img + '">';
		data_product += '<input type="hidden" class="ProductPrice" value="' + ProductPrice + '">';
		data_product += '<input type="hidden" class="option_data" value=\'' + option_data + '\'>';
		data_product += '</div>';
		
		emptyProductBox.html(data_product);
		emptyProductBox.removeClass('constructor-box__item_empty');
		
		$('.constructor-container-gift_id-' + ProductID).find('.gift-activation-box__gifts-item').addClass('catalog-list__item_inbox');
		
		total_price = 0;
		$('#constructorBoxSlider .constructor-box__item').each(function(index) {
			if ($(this).find('.ProductPrice').length) {
				total_price += parseFloat($(this).find('.ProductPrice').val());
			}
		});
		
		CertificateBalance = parseFloat($('.constructor-box input.CertificateBalance').val());
		
		remainderCertificateBalance = CertificateBalance - total_price;
		
		if (remainderCertificateBalance >= 0) {
			$('.constructor-price-type').html('Остаток номинала');
			$('.open-gift-constructor-price').removeClass('insufficient-funds');
		} else {
			$('.constructor-price-type').html('Сумма доплаты');
			$('.open-gift-constructor-price').addClass('insufficient-funds');
		}
		
		$('.open-gift-constructor-price').html(remainderCertificateBalance.toLocaleString('ru'));
		
		
		reloadJSOpenGift();
		
	});




}

