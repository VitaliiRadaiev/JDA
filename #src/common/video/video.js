
function togglePlayPause(video, btn) {
	if (video.paused) {
		video.play();
		btn.classList.remove('video-block__controll--play');
		btn.classList.add('video-block__controll--pause');
		video.setAttribute('controls', true);

	} else {
		video.pause();
		btn.classList.add('video-block__controll--play');
		btn.classList.remove('video-block__controll--pause');
		btn.style.opacity = '1';
	}
}

let videoBlock = document.querySelectorAll('[data-video]');
if (videoBlock.length) {
	videoBlock.forEach((item) => {
		let videoWrap = item.querySelector('.video-block__video-wrap');
		let video = item.querySelector('.video-block__video');
		let btn = item.querySelector('.video-block__controll');

		if (video) {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				togglePlayPause(video, btn);
			});

			video.addEventListener('ended', () => {
				video.pause();
				btn.classList.add('video-block__controll--play');
				btn.classList.remove('video-block__controll--pause');
				btn.style.opacity = '1';
				video.removeAttribute('controls');
			});

			video.addEventListener('play', () => {
				btn.classList.remove('video-block__controll--play');
				btn.classList.add('video-block__controll--pause');

				if (this.utils.isMobile()) {
					btn.style.opacity = '0';
				}
			});

			video.addEventListener('pause', () => {
				btn.classList.add('video-block__controll--play');
				btn.classList.remove('video-block__controll--pause');
			});

			videoWrap.addEventListener('mouseenter', (e) => {
				if (!video.paused) {
					btn.style.opacity = '1';
				}
			});

			videoWrap.addEventListener('mouseleave', (e) => {
				if (!video.paused) {
					btn.style.opacity = '0';
				}
			});
		}
	})
}

