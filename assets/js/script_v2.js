$(document).ready(function(){
	function get_bannersSwiper() {
		var bannersSwiper = new Swiper("#bannersSlider", {
			loop: true,
			spaceBetween: 20,
			slidesPerView: "1",
			centeredSlides: true,
			navigation: {
				nextEl: "#bannersSlider .swiper-button-next",
				prevEl: "#bannersSlider .swiper-button-prev",
			},
			pagination: {
				el: "#bannersSlider .swiper-pagination"
			},
			autoplay: {
				delay: 5000,
			},
			on: {
				resize: function(){
					bannersSwiper.update();
				}
			}
		});
	};
	var gallerySwiper = new Swiper("#gallerySlider", {
		loop: true,
		navigation: {
			nextEl: "#gallerySlider .swiper-button-next",
			prevEl: "#gallerySlider .swiper-button-prev",
		},
		pagination: {
			el: "#gallerySlider .swiper-pagination"
		},
		autoplay: {
			delay: 5000,
		}
	});
	setTimeout(get_bannersSwiper, 4000); 
	var giftsSwiper = new Swiper("#giftsSlider", {
		slidesPerView: "auto",
		spaceBetween: 20,
		breakpoints: {
			320: {
				initialSlide: 0,
				centeredSlides: true,
				loop: true,
			},
			767: {
				initialSlide: 0,
				centeredSlides: true,
				loop: true,
			},
		}
	});
	var lastViewedGiftsSwiper = new Swiper("#lastViewedGiftsSlider", {
		slidesPerView: "auto",
		spaceBetween: 21,
		breakpoints: {
			320: {
				initialSlide: 1,
				centeredSlides: true,
				loop: true,
			},
			767: {
				initialSlide: 1,
				centeredSlides: true,
				loop: true,
			},
			991: {
				centeredSlides: false,
				loop: false,
			},
		}
	});
	var similarViewedGiftsSwiper = new Swiper("#similarViewedGiftsSlider", {
		slidesPerView: "auto",
		spaceBetween: 21,
		breakpoints: {
			320: {
				initialSlide: 1,
				centeredSlides: true,
				loop: true,
			},
			767: {
				initialSlide: 1,
				centeredSlides: true,
				loop: true,
			},
			991: {
				centeredSlides: false,
				loop: false,
			},
		}
	});
	var aboutDelivery = new Swiper("#aboutDelivery", {
		slidesPerView: 4,
		pagination: {
			el: ".gift-about-delivery__pagination",
			type: "bullets",
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 13,
			}
		}
	});
	var aboutWorks = new Swiper("#aboutWorks", {
		slidesPerView: 4,
		pagination: {
			el: ".gift-about-Works__pagination",
			type: "bullets",
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 13,
			}
		}
	});
	var aboutRewiews = new Swiper("#aboutRewiews", {
		slidesPerView: "auto",
		spaceBetween: 13,
		pagination: {
			el: ".gift-about-rewiews__pagination",
			type: 'fraction',
			
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' +
				' / ' +
				'<span class="' + totalClass + '"></span>';
			}
		}
	});
	const productSlider = document.querySelectorAll('.main__gift');

	productSlider.forEach(element => {
		var aboutCover = new Swiper("#aboutCover", {
				centeredSlides: true,
				slidesPerView: 1,
				slideActiveClass: "swiper-slide-active gift-about-cover__item_active",

			});
			$(".gift-about-cover__thumbnails-preview").each(function(index){
				$(this).click(function(){
					aboutCover.slideTo(index);
				})
			});
		var aboutCover_mob = new Swiper("#aboutCover_mob", {
			centeredSlides: true,
			slidesPerView: 1,
			slideActiveClass: "swiper-slide-active gift-about-cover__item_active",
			
		});
		$(".main__gift-slider_mob .gift-about-cover__thumbnails-preview").each(function(index){
			$(this).click(function(){
				aboutCover_mob.slideTo(index);
			})
		});
	});
	


	

	
	$('div.gift-about-cover__thumbnails-items').on('click', '.gift-about-cover__thumbnails-preview:not(.gift-about-cover__anim)', function() {
		$(this)
	.addClass('gift-about-cover__anim').siblings().removeClass('gift-about-cover__anim')});
	
	$('ul.multi__gift-tabs').on('click', 'li:not(.multi__gift-tabs_item-active)', function() {
		$(this)
		.addClass('multi__gift-tabs_item-active').siblings().removeClass('multi__gift-tabs_item-active')
		.closest('div.container__main').find('div.multi__gift-content').removeClass('multi__gift-content_active').eq($(this).index()).addClass('multi__gift-content_active');
	});
	
	const catalog = document.querySelector('.header__main-catalog'),
    dpdw = document.querySelector('.header__main-dpdw');
	
		if (dpdw) {
			dpdw?.addEventListener('click', () => {
				dpdw.classList.toggle('header__main-dpdw_active');
				catalog.classList.toggle('header__main-catalog_active');
			});
		}
	
    
    const menu = document.querySelector('.header__main-nav_mini'),
    hamburger = document.querySelector('.header__main-hamburger');
		if(hamburger){
			hamburger.addEventListener('click', () => {
					hamburger.classList.toggle('header__main-hamburger_active');
					menu.classList.toggle('header__main-nav_mini-active');
		});
		}
	
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define(['exports'], factory);
		} else if (typeof exports !== 'undefined') {
            factory(exports);
		} else {
            factory((root.dragscroll = {}));
		}
		}(this, function (exports) {
			var _window = window;
			var _document = document;
			var mousemove = 'mousemove';
			var mouseup = 'mouseup';
			var mousedown = 'mousedown';
			var EventListener = 'EventListener';
			var addEventListener = 'add'+EventListener;
			var removeEventListener = 'remove'+EventListener;
			var newScrollX, newScrollY;
			
			var dragged = [];
			var reset = function(i, el) {
				for (i = 0; i < dragged.length;) {
					el = dragged[i++];
					el = el.container || el;
					el[removeEventListener](mousedown, el.md, 0);
					_window[removeEventListener](mouseup, el.mu, 0);
					_window[removeEventListener](mousemove, el.mm, 0);
				}
				
				// cloning into array since HTMLCollection is updated dynamically
				dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
				for (i = 0; i < dragged.length;) {
					(function(el, lastClientX, lastClientY, pushed, scroller, cont){
						(cont = el.container || el)[addEventListener](
							mousedown,
							cont.md = function(e) {
								if (!el.hasAttribute('nochilddrag') ||
									_document.elementFromPoint(
										e.pageX, e.pageY
									) == cont
									) {
									pushed = 1;
									lastClientX = e.clientX;
									lastClientY = e.clientY;
									
									e.preventDefault();
								}
							}, 0
						);
						
						_window[addEventListener](
							mouseup, cont.mu = function() {pushed = 0;}, 0
						);
						
						_window[addEventListener](
							mousemove,
							cont.mm = function(e) {
								if (pushed) {
									(scroller = el.scroller||el).scrollLeft -=
                                    newScrollX = (- lastClientX + (lastClientX=e.clientX));
									scroller.scrollTop -=
                                    newScrollY = (- lastClientY + (lastClientY=e.clientY));
									if (el == _document.body) {
										(scroller = _document.documentElement).scrollLeft -= newScrollX;
										scroller.scrollTop -= newScrollY;
									}
								}
							}, 0
						);
					})(dragged[i++]);
				}
			}
			
			
			if (_document.readyState == 'complete') {
				reset();
			} else {
				_window[addEventListener]('load', reset, 0);
			}
			
			exports.reset = reset;
		}));
		
		const anchors = document.querySelectorAll('a[href*="#"]')
		
        for (let anchor of anchors) {
			anchor.addEventListener('click', function (e) {
				e.preventDefault()
				
				const blockID = anchor.getAttribute('href').substr(1)
				
				document.getElementById(blockID).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			})
		};
		
		if ($('#main_qusetions_accordion').length) {
			class ItcAccordion {
				constructor(target, config) {
					this._el = typeof target === 'string' ? document.querySelector(target) : target;
					const defaultConfig = {
						alwaysOpen: true
					};
					this._config = Object.assign(defaultConfig, config);
					this.addEventListener();
				}
				addEventListener() {
					this._el.addEventListener('click', (e) => {
						const elHeader = e.target.closest('.main__questions-title');
						if (!elHeader) {
							return;
						}
						if (!this._config.alwaysOpen) {
							const elOpenItem = this._el.querySelector('.main__questions-item_show');
							if (elOpenItem) {
								elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle('main__questions-item_show') : null;
							}
						}
						elHeader.parentElement.classList.toggle('main__questions-item_show');
					});
				}
			};
			new ItcAccordion(document.querySelector('#main_qusetions_accordion'), {
				alwaysOpen: true
			});
		}
		
		
		$('[data-modal="buy__offer"]').on('click', function() {
            $('.overlay__buy-offer').fadeIn('slow');
		}); 
        $('.overlay__service-close').on('click', function() {
            $('.overlay__wrapp').fadeOut('slow');
		}); 

		// modal close
			// закрытие модалки с папки №3
		$('.popup__prod-close').on('click', function() {
            $('.popup__prod-overlay').fadeOut('slow');
		});
			// закрытие модалки с папки N5
		$('.popup__prodbuy-close').on('click', function() {
            $('.popup__prodbuy-overlay').fadeOut('slow');
		});
			// закрытие модалки с папки N6 > №2
			$('.popup__prodcheck-close').on('click', function() {
				$('.popup__prodcheck-overlay').fadeOut('slow');
			});
			// закрытие модалки с папки N7 страницы акаунта "Активации"
			$('.popup__actv-close').on('click', function() {
				$('.popup__actv-overlay').fadeOut('slow');
			});
			// закрытие предложения сменить город
			$('.info__loc-close').on('click', function() {
				$('.info__loc-mod').fadeOut('fast');
			});

			//modal lk
			$('.account__activation-actv').on('click', function() {
				$('.popup__actv-overlay').fadeIn('slow');
			});

		// popap product tabs
		$('ul.main__base-clicks').on('click', 'li:not(.main__base-click_actv)', function() {
			$(this)
			.addClass('main__base-click_actv').siblings().removeClass('main__base-click_actv')
			.closest('div.main__base-wrapp').find('div.main__base-content').removeClass('main__base-content-actv').eq($(this).index()).addClass('main__base-content-actv');
		});
		
		  
		  //   header catalog dpdw
		  class dpdwHedCatWr {
			constructor(target, config) {
			  this._el = typeof target === 'string' ? document.querySelector(target) : target;
			  const defaultConfig = {
				alwaysOpen: true
			  };
			  this._config = Object.assign(defaultConfig, config);
			  this.addEventListener();
			}
			addEventListener() {
			  this._el.addEventListener('click', (e) => {
				const elHeader = e.target.closest('.header__catalog-t');
				if (!elHeader) {
				  return;
				}
				if (!this._config.alwaysOpen) {
				  const elOpenItem = this._el.querySelector('.header__catalog-item_actv');
				  if (elOpenItem) {
					elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle('header__catalog-item_actv') : null;
				  }
				}
				elHeader.parentElement.classList.toggle('header__catalog-item_actv');
			  });
			}
		  };
		  if ($('.header__catalog-m').length) {
			  new dpdwHedCatWr(document.querySelector('.header__catalog-m'), {
				alwaysOpen: true
			  });
		  }


		class dpdwHedCat {
			constructor(target, config) {
			  this._el = typeof target === 'string' ? document.querySelector(target) : target;
			  const defaultConfig = {
				alwaysOpen: true
			  };
			  this._config = Object.assign(defaultConfig, config);
			  this.addEventListener();
			}
			addEventListener() {
			  this._el.addEventListener('click', (e) => {
				const elHeader = e.target.closest('.menu__m-title');
				if (!elHeader) {
				  return;
				}
				if (!this._config.alwaysOpen) {
				  const elOpenItem = this._el.querySelector('.menu__m-item_actv');
				  if (elOpenItem) {
					elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle('menu__m-item_actv') : null;
				  }
				}
				elHeader.parentElement.classList.toggle('menu__m-item_actv');
			  });
			}
		  };
		  if ($('.menu__m-wrapp').length) {
			  new dpdwHedCat(document.querySelector('.menu__m-wrapp'), {
				alwaysOpen: true
			  });
		  }
		  
		  
		//   submenu catalog modals
		class dpdwSBCat {
			constructor(target, config) {
			  this._el = typeof target === 'string' ? document.querySelector(target) : target;
			  const defaultConfig = {
				alwaysOpen: true
			  };
			  this._config = Object.assign(defaultConfig, config);
			  this.addEventListener();
			}
			addEventListener() {
			  this._el.addEventListener('click', (e) => {
				const elHeader = e.target.closest('.menu__m-title');
				if (!elHeader) {
				  return;
				}
				if (!this._config.alwaysOpen) {
				  const elOpenItem = this._el.querySelector('.menu__m-item_actv');
				  if (elOpenItem) {
					elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle('menu__m-item_actv') : null;
				  }
				}
				elHeader.parentElement.classList.toggle('menu__m-item_actv');
			  });
			}
		  };
		  if ($('.catalog__m-wrapp').length) {
			  new dpdwSBCat(document.querySelector('.catalog__m-wrapp'), {
				alwaysOpen: true
			  });
		  }
		//   3 ур моб меню

		$('.menu__dpdw-it_t').click(function(){
				$(this).parents('.menu__dpdw-it').toggleClass('menu__dpdw-it_actv');	
		});
		  
		  $('.submenu__catalog').on('click', function() {
            $('.overlay__submenu-catalog').fadeIn();
		}); 
        $('.catalog__m-close').on('click', function() {
            $('.overlay__submenu-catalog').fadeOut();
			$(".menu__m-item").removeClass("menu__m-item_actv");
			$(".menu__dpdw-it").removeClass("menu__dpdw-it_actv");
		}); 
		$('.submenu__cont').on('click', function() {
            $('.overlay__submenu-contacts').fadeIn('slow');
		}); 
        $('.catalog__cont-close').on('click', function() {
            $('.overlay__submenu-contacts').fadeOut('slow');
		}); 
		$(document).on('click', function(e) {
			if (!$(e.target).closest(".overlay__main").length) {
			  $('.overlay__submenu-contacts').fadeOut('slow');
			}
			e.stopPropagation();
		  });
			
			

		

		// location menu
		$('.location__wrapp').each(function() {
			const _this = $(this),
				selectOption = _this.find('option'),
				selectOptionLength = selectOption.length,
				selectedOption = selectOption.filter(':selected'),
				duration = 50;
		  
			_this.hide();
			_this.wrap('<div class="location__wrapp"></div>');
			$('<div>', {
				class: 'new-select',
				text: _this.children('option:selected').text()
			}).insertAfter(_this);
		  
			const selectHead = _this.next('.new-select');
			$('<div>', {
				class: 'new-sign__list'
			}).insertAfter(selectHead);
		  
			const selectList = selectHead.next('.new-sign__list');
			for (let i = 1; i < selectOptionLength; i++) {
				$('<div>', {
					class: 'new-select__item',
					html: $('<span>', {
						text: selectOption.eq(i).text()
					})
				})
				.attr('data-value', selectOption.eq(i).val())
				.appendTo(selectList);
			}
			const selectItem = selectList.find('.new-select__item');
			selectList.slideUp(0);
			const newSelect = document.querySelectorAll(".new-select");
			for (var i = 0; i < newSelect.length; i++)				
				{
					newSelect[i].addEventListener("click", event => {
						if ( !$('location__wrapp').hasClass('new-select_actv') ) {
							$('.modal__town').fadeIn();
							$('location__wrapp').addClass('new-select_actv');
							selectList.slideDown(duration);
				  
							selectItem.on('click', function() {
								let chooseItem = $(this).data('value');
				  
								$('select').val(chooseItem).attr('selected', 'selected');
								selectHead.text( $(this).find('span').text() );
								$('.info__loc-mod').fadeOut();
								selectList.slideUp(duration);
								$('location__wrapp').removeClass('new-select_actv');
								$('.modal__town').slideUp();
							});
							$('.town__m-close').on('click', function() {
								selectList.slideUp(duration);
								$('.modal__town').slideUp();
							});
				  
						} else {
							$('location__wrapp').removeClass('new-select_actv');
							selectList.slideUp(duration);
							$('.modal__town').slideUp();
						}
					});
					
				  }
		  });
		//   basket

const basketSliders = document.querySelectorAll('.basket__base');

basketSliders.forEach(element => {
		function basketsSliders() {
			if (window.screen.width >= 900) {
				var backetSwipeDescr = new Swiper("#basket__slider", {
					allowTouchMove: false,
					slidesPerView: "auto",
					// resizeObserver: false,
					spaceBetween: 13,
					effect: "fade",
					slideActiveClass: "swiper-slide-active gift-about-cover__item_active",
					
				});
				$(".basket__greeting-info_wrp .gift-about-cover__thumbnails-preview").each(function(index){
					$(this).click(function(){
						backetSwipeDescr.slideTo(index);
					})
				});
				}
				else {
					var swiper = new Swiper(".basket__slider-em", {
						loop: true,
						// spaceBetween: 15,
						slidesPerView: "auto",
						freeMode: true,
						watchSlidesProgress: true,
					});
					var swiper2 = new Swiper("#basket__slider", {
						loop: true,
						spaceBetween: 10,
						slidesPerView: "auto",
						
						effect: "fade",
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
						thumbs: {
							swiper: swiper,
						},
					});
					 const baskInpCheck = document.querySelectorAll('.basket__slider-em');

					baskInpCheck.forEach(element => {
						function updateRadioButtons(parent, addClass, removeClass) {
							const parentElement = document.querySelector(parent);
							if (parentElement) {
								if (parentElement.classList.contains(addClass)) {
								const radioButtons = parentElement.querySelectorAll('input[type="radio"]');
								radioButtons.forEach(radio => {
									radio.checked = true;
								});
								} else if (parentElement.classList.contains(removeClass)) {
								const radioButtons = parentElement.querySelectorAll('input[type="radio"]');
								radioButtons.forEach(radio => {
									radio.checked = false;
								});
								}
							}
							}
							const parentSelector = '.swiper-slide';
							const activeClass = 'swiper-slide-thumb-active';
							const inactiveClass = 'swiper-slide-thumb-active';
							const observer = new MutationObserver(mutations => {
							mutations.forEach(mutation => {
								if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
								updateRadioButtons(parentSelector, activeClass, inactiveClass);
								}
							});
							});
							observer.observe(document.querySelector(parentSelector), {
							attributes: true,
							attributeFilter: ['class']
							});
							updateRadioButtons(parentSelector, activeClass, inactiveClass);
					});
				}
		};
		window.addEventListener('load', basketsSliders);
		window.addEventListener('resize', basketsSliders);
		// счетчик символов
		  const baskMaxLenghtTta = document.querySelectorAll('.basket__tta');

			baskMaxLenghtTta.forEach(element => {
				const textarea = document.querySelector('.basket__greeting-congr');
				const charCount = document.querySelector('.basket__tta-indc');
				const maxLength = textarea.getAttribute('maxlength');

				textarea.addEventListener('input', function() {
					const currentLength = textarea.value.length;
					const remaining = maxLength - currentLength;
					charCount.textContent = remaining;
				});
			});
			// корзина допы
			$('.addition-btn_tgl').click(function(){
				$(this).parents('.basket__addition-item').toggleClass('basket__addition-items_show');	
			});

			// переключатель електронного серт
			$( "#bascket__delvr-lab_p input" ).on( "click", function() {
				if($(this).is(":checked")) { $(".bascket__delvr-cont_s").addClass("bascket__delvr-cont_actv");
				$(".bascket__delvr-cont_p").removeClass("bascket__delvr-cont_actv");
				
				} 
				
			})
			$( "#bascket__delvr-lab_s input" ).on( "click", function() {
				if($(this).is(":checked")) { $(".bascket__delvr-cont_p").addClass("bascket__delvr-cont_actv");
				$(".bascket__delvr-cont_s").removeClass("bascket__delvr-cont_actv");
				
				} 
				
			})
		

			//   order clicks
		
		
			$(function() {
				$( "#name__anon input" ).on( "click", function() {
					if($(this).is(":checked")) { $("#name__an").addClass("info__anon");}
					else {$("#name__an").removeClass("info__anon");}
					})
				});
		
        $(function() {
			$( "#basket__dell-pick input" ).on( "click", function() {
				if($(this).is(":checked")) { 
				$('.basket__gr-dellpick').fadeIn();
				$('.basket__gr-adress, .basket__gr-dell, .basket__gr-place').fadeOut();
				}
				else {
				$('.basket__gr-dellpick').fadeOut();
				}
				})
			});
			$(function() {
				$( "#basket__dell-yd input" ).on( "click", function() {
					if($(this).is(":checked")) { 
					$('.basket__gr-dell').fadeIn();
					$('.basket__gr-adress, .basket__gr-dellpick, .basket__gr-place').fadeOut();
					}
					else {
					$('.basket__gr-dell').fadeOut();
					}
					})
				});
				$(function() {
					$( "#basket__dell-tast input" ).on( "click", function() {
						if($(this).is(":checked")) { 
						$('.basket__gr-dell, .basket__gr-adress').fadeIn();
						$('.basket__gr-dellpick, .basket__gr-place').fadeOut();
						
						}
						else {
						$('.basket__gr-dell, .basket__gr-adress').fadeOut();
						}
						})
					});
			$(function() {
				$( "#basket__dell-curier input" ).on( "click", function() {
					if($(this).is(":checked")) { 
					$('.basket__gr-adress, .basket__gr-dell, .basket__gr-place').fadeIn();
					$('.basket__gr-dellpick').fadeOut();	
					}
					else {
						$('.basket__gr-adress, .basket__gr-dell, .basket__gr-place').fadeOut();
					}
					})
				});
				$(function() {
				$( "#basket__dell-hand input" ).on( "click", function() {
					if($(this).is(":checked")) { 
					$('.basket__gr-adress, .basket__gr-dell, .basket__gr-place').fadeIn();
					$('.basket__gr-dellpick').fadeOut();	
					}
					else {
						$('.basket__gr-adress, .basket__gr-dell, .basket__gr-place').fadeOut();
					}
					})
				});

});


		

				// sticky overlay__subwrapp

				var StickyElement = function(node) {
					fixed = false,
					anchor = node.find('.overlay__subwrapp-anch'),
					content = node.find('.overlay__subwrapp');
					var onScroll = function(e){
						if(!fixed){
							anchor.height(content.outerHeight());       
							fixed = true;
						}
					};
					$(window).on('scroll', onScroll);
					
				};
				var sticky = new StickyElement($('.overlay__main'));
				// sticky header
				

				window.onload = function () {
					if (window.innerWidth < 1240) {
						var StickyHead = function(node) {
							var doc = $(document),
							fixed = false,
							anchor = node.find('.page__header-anch'),
							content = node.find('.page__header-wrapper');
							var onScrollHead = function(e){
								var docTop = doc.scrollTop(),
								anchorTop = anchor.offset().top;
								if(docTop > anchorTop){
									if(!fixed){
										anchor.height(content.outerHeight());
										content.addClass('page__header-fix');         
										fixed = true;
									}
									} else {
									if(fixed){
										anchor.height(0);
										content.removeClass('page__header-fix');
										fixed = false;
									}
								}
							};
							$(window).on('scroll', onScrollHead);
						};
						var sticky_head = new StickyHead($('.page__header'));
					}
				};
				
// submenu catalog


const subMenuCat = document.querySelectorAll('.gift__main.header-catalog');

subMenuCat.forEach(element => {
 var headerBars = document.getElementById('catalog_desc');

headerBars.addEventListener('click', function() {
	  document.querySelector('.submenu-catalog').classList.toggle('submenu-catalog_show');
});
document.addEventListener('click', function(event) {
  const targetSubM = document.getElementById('MainCategoryMenu1'); 
  const targetSubMc = document.querySelector('.submenu-catalog'); 
  if (targetSubM && !targetSubM.contains(event.target)) {
    targetSubMc.classList.remove('submenu-catalog_show');
  }
});

// активный hover первого уровня каталога в десктопе
const parentFirst = document.querySelector('ul.submenu-catalog_nav');
const childrenFirst = document.querySelectorAll('.submenu-catalog_nav .submenu-catalog_item');
let lastHoveredFirst = null;


function removeHover() {
  childrenFirst.forEach(child => {
    child.classList.remove('submenu-catalog_item-actv');
  });
}


childrenFirst.forEach(child => {
  child.addEventListener('mouseenter', () => {
    removeHover(); 
    child.classList.add('submenu-catalog_item-actv'); 
    lastHoveredFirst = child; 
	
  });
  
});


parentFirst.addEventListener('mouseleave', () => {
  if (lastHoveredFirst) {
    lastHoveredFirst.classList.add('submenu-catalog_item-actv');
  }
 
});
// активный hover второго уровня каталога в десктопе
const items = document.querySelectorAll('.submenu-catalog_lists .submenu-catalog_lists-it');

    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            items.forEach(otherItem => {
                otherItem.classList.remove('submenu-catalog_lists-it_show');
            }); 
            item.classList.add('submenu-catalog_lists-it_show');
        });

    });

});



	
$('.header__toggle-button').click(function() {
		$(".header__catalog-item").removeClass("header__catalog-item_actv");
		$(".menu__m-item").removeClass("menu__m-item_actv");
	});
});

// blog slider

var blog_sl = new Swiper(".blog__article-sl", {
		slidesPerView: "auto",
		spaceBetween: 19,
		breakpoints: {
			320: {
				spaceBetween: 19,
				loop: false,
				centeredSlides: true,
			},
			414: {
				spaceBetween: 34,
				centeredSlides: true,
			},
			480: {
				loop: true,
				centeredSlides: true,
			},
			900: {
				loop: true,
				centeredSlides: true,

			},
			1024: {
				spaceBetween: 19,
				centeredSlides: false,
			},
		}
	});

