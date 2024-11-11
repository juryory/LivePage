document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("liveVideo");
    const countdownTimer = document.getElementById("countdown-timer");
    const videoSrc = "http://www.wjchome.com:2022/live/414e4a14a874.m3u8";

    // 更新倒计时功能
    function updateCountdown() {
        const now = new Date();
        const currentHour = now.getHours();
        const nextPlayHour = currentHour + (3 - (currentHour % 3));
        const nextPlayTime = new Date(now);
        nextPlayTime.setHours(nextPlayHour, 0, 0, 0);
        
        const timeDiff = nextPlayTime - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownTimer.innerHTML = `将在 ${hours} 小时 ${minutes} 分钟后开始重新播放影片` +
                                   `<br><span class="delay-note">(直播画面右下角的时间为每隔3小时的整点时重播)</span>`;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // 每分钟更新一次倒计时

    // 用户交互后初始化和播放视频
    document.addEventListener("click", () => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play().catch(error => {
                    console.error("播放失败：", error);
                });
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari 支持 HLS 的情况
            video.src = videoSrc;
            video.play().catch(error => {
                console.error("播放失败：", error);
            });
        }
    }, { once: true }); // 确保视频只初始化和播放一次

    // 评论轮播功能
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    let currentIndex = 0;

    function showSlide(index) {
        const slider = document.querySelector(".testimonial-slider");
        slider.style.transform = `translateX(-${index * 100}%)`; // 滑动到对应的评论
    }

    prevButton.addEventListener("click", function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
    });

    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    // 自动轮播评论
    setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }, 20000); // 每20秒自动切换评论
});
