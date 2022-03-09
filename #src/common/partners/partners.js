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
}