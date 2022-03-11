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
}