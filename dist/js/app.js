class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
				}
			}
		}
	
		trigger();
	
		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {
	
			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});
	
				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => {animation.play()})
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = [...str].slice(0, stringLength).join('') + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}
}


;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.оbjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	  });
  
	  this.arraySort(this.оbjects);
  
	  this.mediaQueries = this.оbjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const оbjectsFilter = this.оbjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, оbjects) {
	  if (matchMedia.matches) {
		оbjects.forEach((оbject) => {
		  оbject.index = this.indexInParent(оbject.parent, оbject.element);
		  this.moveTo(оbject.place, оbject.element, оbject.destination);
		});
	  } else {
		оbjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {
		if (this.utils.isMobile()) {
			document.body.classList.add('mobile');
		}

		if (this.utils.iOS()) {
			document.body.classList.add('mobile-ios');
		}

		this.utils.numberCounterAnim();
		this.utils.initTruncateString();
		this.dynamicAdapt.init();
		this.headerHandler();
		this.popupHandler();
		this.initSmoothScroll();
		this.inputMaskInit();
		//this.tabsInit();

		window.addEventListener('load', () => {
			document.body.classList.add('page-is-load');

			this.setPaddingTopHeaderSize();
			this.videoHandlerInit();
			//this.scrollTgriggerAnimationInit();
			this.slidersInit();
			this.componentsScripts();
		});

	}

	headerHandler() {
		let header = document.querySelector('[data-header]');
let mobileMenu = document.querySelector('[data-mobile-menu]');
let burger = document.querySelector('[data-action="open-mobile-menu"]');
let mobileMenuCloseBtn = document.querySelector('[data-action="close-mobile-menu"]');

if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })
}

if (mobileMenu) {
    let itemsHasSubMenu = mobileMenu.querySelectorAll('.menu-item-has-children');
    if (itemsHasSubMenu.length) {
        itemsHasSubMenu.forEach(item => {
            let link = item.querySelector('.menu__link');
            let subMenu = item.querySelector('.sub-menu');

            if (link && subMenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    link.classList.toggle('menu__link--submenu-is-open')
                    this.utils.slideToggle(subMenu);

                    itemsHasSubMenu.forEach(i => {
                        if (i === item) return;

                        let link = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');

                        link.classList.remove('menu__link--submenu-is-open')
                        this.utils.slideUp(subMenu);
                    })
                })
            }
        })
    }
}

if(mobileMenu && burger && mobileMenuCloseBtn) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.add('mobile-menu--open');
        mobileMenuCloseBtn.classList.add('mobile-menu-close--show');
        document.body.classList.add('overflow-hidden');
        document.documentElement.classList.add('overflow-hidden');
    })
    mobileMenuCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open');
        mobileMenuCloseBtn.classList.remove('mobile-menu-close--show');
        document.body.classList.remove('overflow-hidden');
        document.documentElement.classList.remove('overflow-hidden');
    })
};
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}
;
	}

	slidersInit() {
		let simpleCardsCarousels = document.querySelectorAll('[data-slider="simple-cards-carousel"]');
if(simpleCardsCarousels.length) {
    simpleCardsCarousels.forEach(simpleCardsCarousel => {
        let sliderActiveParams = simpleCardsCarousel.querySelector('.swiper-wrapper').children.length > 3 ? true : false;

        if(!sliderActiveParams) {
            simpleCardsCarousel.classList.add('simple-cards-carousel--three-slides')
        }
        if(document.documentElement.clientWidth < 768) {
            sliderActiveParams = true;
        }
        let swiperSimpleCardsCarousel = new Swiper(simpleCardsCarousel.querySelector('.swiper'), {
            
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            slidesPerView: 3,
            spaceBetween: 0,
            speed: 800,
            loopAdditionalSlides: 2,
            centeredSlides: sliderActiveParams,
            loop: sliderActiveParams,
            pagination: {
            	el: simpleCardsCarousel.querySelector('[data-slider="pagination"]'),
            	clickable: true,
            },
            navigation: {
                nextEl: simpleCardsCarousel.querySelector('[data-action="btn-next"]'),
                prevEl: simpleCardsCarousel.querySelector('[data-action="btn-prev"]'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        });
    })
};
		let partnersSlider = document.querySelector('[data-slider="partners-slider"]');
if (partnersSlider) {
    let swiperPartnersSlider = new Swiper(partnersSlider.querySelector('.swiper'), {
        
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        freeMode: true,
        speed: 800,
        loopAdditionalSlides: 2,
        loop: true,
        pagination: {
            el: partnersSlider.querySelector('[data-slider="pagination"]'),
            clickable: true,
        },
        navigation: {
            nextEl: partnersSlider.querySelector('[data-action="btn-next"]'),
            prevEl: partnersSlider.querySelector('[data-action="btn-prev"]'),
        },
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 60,
            },
        },
    });
};
		let cardsCarousels = document.querySelectorAll('[data-slider="cards-carousel"]');
if(cardsCarousels.length) {
    cardsCarousels.forEach(cardsCarousel => {
        let sliderActiveParams = cardsCarousel.querySelector('.swiper-wrapper').children.length > 3 ? true : false;

        if(!sliderActiveParams) {
            cardsCarousel.classList.add('cards-carousel--three-slides')
        }
        if(document.documentElement.clientWidth < 768) {
            sliderActiveParams = true;
        }
        let swiperCardsCarousel = new Swiper(cardsCarousel.querySelector('.swiper'), {
            
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            speed: 800,
            loopAdditionalSlides: 2,
            centeredSlides: sliderActiveParams,
            loop: sliderActiveParams,
            pagination: {
            	el: cardsCarousel.querySelector('[data-slider="pagination"]'),
            	clickable: true,
            },
            navigation: {
                nextEl: cardsCarousel.querySelector('[data-action="btn-next"]'),
                prevEl: cardsCarousel.querySelector('[data-action="btn-prev"]'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 28,
                },
            },
        });
    })
};
	}

	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					triggerItems[0].classList.add('tab-active');
					getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 2000)
				window.addEventListener('resize', setPedding);
			}

		}
	}

	videoHandlerInit() {
		
function togglePlayPause(video, btn) {
	if (video.paused) {
		video.play();
		btn.classList.remove('video-block__controll--play');
		btn.classList.add('video-block__controll--pause');
		video.setAttribute('controls', true);

	} else {
		video.pause();
		btn.classList.add('video-block__controll--play');
		btn.classList.remove('video-block__controll--pause');
		btn.style.opacity = '1';
	}
}

let videoBlock = document.querySelectorAll('[data-video]');
if (videoBlock.length) {
	videoBlock.forEach((item) => {
		let videoWrap = item.querySelector('.video-block__video-wrap');
		let video = item.querySelector('.video-block__video');
		let btn = item.querySelector('.video-block__controll');

		if (video) {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				togglePlayPause(video, btn);
			});

			video.addEventListener('ended', () => {
				video.pause();
				btn.classList.add('video-block__controll--play');
				btn.classList.remove('video-block__controll--pause');
				btn.style.opacity = '1';
				video.removeAttribute('controls');
			});

			video.addEventListener('play', () => {
				btn.classList.remove('video-block__controll--play');
				btn.classList.add('video-block__controll--pause');

				if (this.utils.isMobile()) {
					btn.style.opacity = '0';
				}
			});

			video.addEventListener('pause', () => {
				btn.classList.add('video-block__controll--play');
				btn.classList.remove('video-block__controll--pause');
			});

			videoWrap.addEventListener('mouseenter', (e) => {
				if (!video.paused) {
					btn.style.opacity = '1';
				}
			});

			videoWrap.addEventListener('mouseleave', (e) => {
				if (!video.paused) {
					btn.style.opacity = '0';
				}
			});
		}
	})
}

{
	let vimeoVideos = document.querySelectorAll('[data-vimeo-id]');
	if(vimeoVideos.length) {
		vimeoVideos.forEach(async video => {
			let id = video.dataset.vimeoId;
			let img = video.querySelector('img');
			
			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.vimeoMobileId.trim()) {
					id = video.dataset.vimeoMobileId;
				}
			}

			if(!/[a-z]/gi.test(id)) {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://player.vimeo.com/video/${id}?muted=1&amp;autoplay=1&amp;controls=0&amp;loop=1&amp;background=1&amp"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay;" ></iframe>`);
				let iframe = video.querySelector('iframe')
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
	
				 setCoverVideoIframe(iframe, video, {desk: {w: 16.56, h: 9.31}, mob: {w:5.55, h: 7}});
			} else {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://iframe.videodelivery.net/${id}?autoplay=true&muted=true&controls=false" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>`);
				let iframe = video.querySelector('iframe');
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
				setCoverVideoIframe(iframe, video, {desk: {w: 16, h: 9}, mob: {w:555, h: 700}});

			}

		})
	}

	function setCoverVideoIframe(iframe, parent, size) {
		
		const setSize = (widthVideo = 16.56, heightVideo = 9.31) => {
			let percentHeight =  heightVideo / widthVideo * 100;
			let percentWidth =  widthVideo / heightVideo * 100;

			if((parent.clientHeight / parent.clientWidth * 100) < percentHeight ) {
				iframe.style.width = '100%';
				iframe.style.height = (parent.clientWidth / 100 * percentHeight) + 'px';
			} else {
				iframe.style.width = (parent.clientHeight / 100 * percentWidth) + 'px';
				iframe.style.height = '100%';
			}
		}

		if(document.documentElement.clientWidth >= 768) {
			setSize(size.desk.w, size.desk.h);
		} else {
			setSize(size.mob.w, size.mob.h);
		}

		window.addEventListener('resize', () => {
			if(document.documentElement.clientWidth >= 768) {
				setSize(size.desk.w, size.desk.h);
			} else {
				setSize(size.mob.w, size.mob.h);
			}
		});
	}

	
	let youtubeVideos = document.querySelectorAll('[data-youtube-id]');
	if (youtubeVideos.length) {
		youtubeVideos.forEach(video => {
			let videoContainer = document.createElement('div');
			video.append(videoContainer);
			let videoId = video.dataset.youtubeId;
			let img = video.querySelector('img');

			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.youtubeMobileId.trim()) {
					videoId = video.dataset.youtubeMobileId;
				}
			}
			let player = new YT.Player(videoContainer, {
				height: 'auto',
				width: 'auto',
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId,
					controls: 0,
					enablejsapi: 1,
				},
				events: {
					onReady: (e) => {
						e.target.mute();
						e.target.playVideo();

						if(img) {
							img.style.opacity = 0;
						}
					}
				}
			});
		})
	}


	function setMobileVideoForBanner() {
		let videos = document.querySelectorAll('[data-media-mobile]');
		if(videos.length) {
			videos.forEach(video => {
				let url = video.dataset.mediaMobile;
				Array.from(video.children).forEach(item => {
					item.setAttribute('src', url);
				})
	
				video.load();
			})
		}
	}

	if(document.documentElement.clientWidth < 768) {
		setMobileVideoForBanner()
	}

	let fancyboxYoutubeLinks = document.querySelectorAll('[data-fancybox-youtube]');
	if(fancyboxYoutubeLinks.length) {
		fancyboxYoutubeLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/www\.youtube\.com/i.test(id)) return;
			link.setAttribute('href', `https://www.youtube.com/watch?v=${id}`)
		})
	}

	let fancyboxVimeoLinks = document.querySelectorAll('[data-fancybox-vimeo]');
	if(fancyboxVimeoLinks.length) {
		fancyboxVimeoLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/vimeo\.com\//i.test(id)) return;
			link.setAttribute('href', `https://vimeo.com/${id}`)
		})
	}
};
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('[data-scroll]');
		if (anchors.length) {
			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
				anchor.addEventListener('click', (e) => {

					let el = document.getElementById(id);
					e.preventDefault();
					window.scrollTo({
						top: el ? el.offsetTop : 0,
						behavior: 'smooth',
					})


				})
			})
		}
	}

	componentsScripts() {
		;
		let interactiveMap = document.querySelectorAll('[data-interactive-map]');
if(interactiveMap.length) {
    interactiveMap.forEach(svgMap => {
        let items = [];
        let areaAll = svgMap.querySelectorAll('.interactive-map__area');
        if(areaAll.length) {
            areaAll.forEach(area => {
                items.push({
                    area,
                    text: svgMap.querySelector(`.interactive-map__text[data-id="${area.dataset.id}"]`) || null,
                    btn: svgMap.querySelector(`.interactive-map__btn[data-id="${area.dataset.id}"]`) || null,
                })
            })
        }
        svgMap.addEventListener
        items.forEach(item => {
            item.area.addEventListener('mouseenter', () => {
                item.area.classList.add('active');
                item.text?.classList?.add('active');
                item.btn?.classList?.add('active');
            })
            item.area.addEventListener('mouseleave', () => {
                item.area.classList.remove('active');
                item.text?.classList?.remove('active');
                item.btn?.classList?.remove('active');
            })

            if(item.btn) {
                item.btn.addEventListener('mouseenter', () => {
                    item.area.classList.add('active');
                    item.text?.classList?.add('active');
                    item.btn?.classList?.add('active');
                })
                item.btn.addEventListener('mouseleave', () => {
                    item.area.classList.remove('active');
                    item.text?.classList?.remove('active');
                    item.btn?.classList?.remove('active');
                })
            }
        })
    })
};
		function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


const $cookieEl = document.querySelector('[data-cookies-message]');
if ($cookieEl) {
    let closeBtn = document.querySelector('[data-action="cookies-message-close"]');

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        $cookieEl.classList.remove('show');

        document.cookie = encodeURIComponent('hide-cookie') + "=" + encodeURIComponent('true') + "; path=/; max-age=86400";
    })


    if (!getCookie('hide-cookie')) {
        setTimeout(() => {
            $cookieEl.classList.add('show');
        }, 1000);
    }

};
		{
    let economicCardAll = document.querySelectorAll('[data-economic-card]');
    if(economicCardAll.length) {
        economicCardAll.forEach(economicCard => {
            let text = economicCard.querySelector('.economic-card__text');
            let btn = economicCard.querySelector('.economic-card__btn');
            if(btn && text) {
                btn.addEventListener('click', () => {
                    if(text.classList.contains('open')) {
                        text.classList.remove('open');
                        btn.innerText = 'Read More';
                        this.utils.slideUp(text);
                    } else {
                        text.classList.add('open');
                        btn.innerText = 'Close';
                        this.utils.slideDown(text);
                    }
                })
            }
        })
    }
};
		{
    let personCardAll = document.querySelectorAll('[data-person-card]');
    if(personCardAll.length) {
        personCardAll.forEach(personCard => {
            const setHeight = () => {
                personCard.style.height = personCard.clientWidth + 'px';
            }

            setHeight();
            window.addEventListener('resize', setHeight);

            let boxWrap = personCard.querySelector('.person-card__text-wrap');
            let box = personCard.querySelector('.person-card__box');
            let imgWrap = personCard.querySelector('.person-card__img-wrap');
            let img = personCard.querySelector('.person-card__img');

            const animForward = () => {
                new Promise((res, rej) => {
                    box.style.transform = "rotate(50deg)";
                    img.style.transform = "rotate(-40deg)";
                    setTimeout(() => {
                        res();
                    },300)
                }).then(() => {
                    boxWrap.style.zIndex = 2;
                    imgWrap.style.zIndex = 1;
                    box.style.transform = "rotate(0deg)";
                    img.style.transform = "rotate(0deg)";
                })
            }

            const animBack = () => {
                new Promise((res, rej) => {
                    box.style.transform = "rotate(50deg)";
                    img.style.transform = "rotate(-40deg)";
                    setTimeout(() => {
                        res();
                    },300)
                }).then(() => {
                    boxWrap.style.zIndex = 1;
                    imgWrap.style.zIndex = 2;
                    box.style.transform = "rotate(0deg)";
                    img.style.transform = "rotate(0deg)";
                })
            }

            personCard.addEventListener('mouseenter', () => {
                if(!this.utils.isMobile()) {
                    animForward();
                }
            })
            personCard.addEventListener('mouseleave', () => {
                if(!this.utils.isMobile()) {
                    animBack();
                }
            })

            personCard.addEventListener('click', () => {
                if(this.utils.isMobile()) {
                    if(personCard.classList.contains('open')) {
                        animBack();
                        personCard.classList.remove('open');
                    } else {
                        animForward();
                        personCard.classList.add('open');
                    }
                }
            })
        })
    }
};
	}

}

window.addEventListener('DOMContentLoaded', function () {
	let app = new App();
	app.init();
});

