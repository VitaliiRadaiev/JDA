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
}