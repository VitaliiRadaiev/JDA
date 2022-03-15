{
    let clientsSliderNav = document.querySelector('[data-slider="clients-nav"]');
    if(clientsSliderNav) {
        let items = Array.from(clientsSliderNav.querySelector('.swiper-wrapper').children);
        let sliderData = new Swiper(clientsSliderNav, {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            //slideToClickedSlide: true,
            on: {
                click: (e) => {
                    setTimeout(() => {
                        let index = items.findIndex(i => i.classList.contains('tab-active'));
                        sliderData.update();
                        sliderData.slideTo(index);
                    },300)
                }
            }
        });
        
    }
}