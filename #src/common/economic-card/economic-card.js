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
}