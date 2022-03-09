(function uploadFileHandler() {
    let files = []
    let inputWrapItems = document.querySelectorAll('.file-input');
    if (inputWrapItems.length) {
        inputWrapItems.forEach(inputWrap => {
            let input = inputWrap.querySelector('input[type="file"]');
            let text = inputWrap.querySelector('.file-input__text');


            const changeHandler = (event) => {
                if (!event.target.files.length) {
                    return
                }

                files = Array.from(event.target.files);

                let result = files.map(item => item.name);
                text.innerText = result.join(', ');
            }

            input.addEventListener('change', changeHandler);

            ;['dragenter', 'dragover'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.add('highlight');
                });
            })
            ;['dragleave', 'drop'].forEach(eventName => {
                input.addEventListener(eventName, (e) => {
                    inputWrap.classList.remove('highlight');
                });
            })

        })
    }
})()

