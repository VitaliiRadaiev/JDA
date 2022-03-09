(function checkboxHandler() {
	let $checkboxWrap = document.querySelectorAll('.checkbox-wrap');
	if($checkboxWrap.length) {
		$checkboxWrap.forEach((item, index) => {
			let input = item.querySelector('input[type="checkbox"]');
			input.checked = true;
			item.querySelector('.checkbox-wrap__label').setAttribute('for', `_form${index}`)
			input.id = `_form${index}`;
			
			if(input.checked) {
				item.classList.add('_is-checked');
			}
			
			input.addEventListener('click', () => {
				if(input.checked) {
					item.classList.add('_is-checked');
				} else {
					item.classList.remove('_is-checked');
				}
				
			})
		})
	}
})();