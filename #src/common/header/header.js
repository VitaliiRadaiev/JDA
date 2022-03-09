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
}