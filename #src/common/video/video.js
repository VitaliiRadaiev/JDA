
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

{
	let vimeoVideos = document.querySelectorAll('[data-vimeo-id]');
	if(vimeoVideos.length) {
		vimeoVideos.forEach(async video => {
			let id = video.dataset.vimeoId;
			let img = video.querySelector('img');
			
			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.vimeoMobileId.trim()) {
					id = video.dataset.vimeoMobileId;
				}
			}

			if(!/[a-z]/gi.test(id)) {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://player.vimeo.com/video/${id}?muted=1&amp;autoplay=1&amp;controls=0&amp;loop=1&amp;background=1&amp"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay;" ></iframe>`);
				let iframe = video.querySelector('iframe')
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
	
				 setCoverVideoIframe(iframe, video, {desk: {w: 16.56, h: 9.31}, mob: {w:5.55, h: 7}});
			} else {
				video.insertAdjacentHTML('beforeend', `<iframe src="https://iframe.videodelivery.net/${id}?autoplay=true&muted=true&controls=false" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>`);
				let iframe = video.querySelector('iframe');
				iframe.onload = () => {
					if(img) {
						img.style.opacity = 0;
					}
				}
				setCoverVideoIframe(iframe, video, {desk: {w: 16, h: 9}, mob: {w:555, h: 700}});

			}

		})
	}

	function setCoverVideoIframe(iframe, parent, size) {
		
		const setSize = (widthVideo = 16.56, heightVideo = 9.31) => {
			let percentHeight =  heightVideo / widthVideo * 100;
			let percentWidth =  widthVideo / heightVideo * 100;

			if((parent.clientHeight / parent.clientWidth * 100) < percentHeight ) {
				iframe.style.width = '100%';
				iframe.style.height = (parent.clientWidth / 100 * percentHeight) + 'px';
			} else {
				iframe.style.width = (parent.clientHeight / 100 * percentWidth) + 'px';
				iframe.style.height = '100%';
			}
		}

		if(document.documentElement.clientWidth >= 768) {
			setSize(size.desk.w, size.desk.h);
		} else {
			setSize(size.mob.w, size.mob.h);
		}

		window.addEventListener('resize', () => {
			if(document.documentElement.clientWidth >= 768) {
				setSize(size.desk.w, size.desk.h);
			} else {
				setSize(size.mob.w, size.mob.h);
			}
		});
	}

	
	let youtubeVideos = document.querySelectorAll('[data-youtube-id]');
	if (youtubeVideos.length) {
		youtubeVideos.forEach(video => {
			let videoContainer = document.createElement('div');
			video.append(videoContainer);
			let videoId = video.dataset.youtubeId;
			let img = video.querySelector('img');

			if(document.documentElement.clientWidth < 992) {
				if(video.dataset.youtubeMobileId.trim()) {
					videoId = video.dataset.youtubeMobileId;
				}
			}
			let player = new YT.Player(videoContainer, {
				height: 'auto',
				width: 'auto',
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId,
					controls: 0,
					enablejsapi: 1,
				},
				events: {
					onReady: (e) => {
						e.target.mute();
						e.target.playVideo();

						if(img) {
							img.style.opacity = 0;
						}
					}
				}
			});
		})
	}


	function setMobileVideoForBanner() {
		let videos = document.querySelectorAll('[data-media-mobile]');
		if(videos.length) {
			videos.forEach(video => {
				let url = video.dataset.mediaMobile;
				Array.from(video.children).forEach(item => {
					item.setAttribute('src', url);
				})
	
				video.load();
			})
		}
	}

	if(document.documentElement.clientWidth < 768) {
		setMobileVideoForBanner()
	}

	let fancyboxYoutubeLinks = document.querySelectorAll('[data-fancybox-youtube]');
	if(fancyboxYoutubeLinks.length) {
		fancyboxYoutubeLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/www\.youtube\.com/i.test(id)) return;
			link.setAttribute('href', `https://www.youtube.com/watch?v=${id}`)
		})
	}

	let fancyboxVimeoLinks = document.querySelectorAll('[data-fancybox-vimeo]');
	if(fancyboxVimeoLinks.length) {
		fancyboxVimeoLinks.forEach(link => {
			let id = link.getAttribute('href');
			if(/https:\/\/vimeo\.com\//i.test(id)) return;
			link.setAttribute('href', `https://vimeo.com/${id}`)
		})
	}
}