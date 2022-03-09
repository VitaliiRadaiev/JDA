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
}