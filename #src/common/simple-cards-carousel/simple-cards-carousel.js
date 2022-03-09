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
            /*
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            */
            slidesPerView: 3,
            spaceBetween: 0,
            speed: 800,
            //initialSlide: 1,
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
}