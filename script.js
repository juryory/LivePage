document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const video = document.getElementById("liveVideo");
    const videoSrc = "http://www.wjchome.com:2022/live/414e4a14a874.m3u8";
    let currentIndex = 0;

    // 检查浏览器是否原生支持 HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // 如果支持，则直接设置视频源
        video.src = videoSrc;
    } else if (Hls.isSupported()) {
        // 如果不支持 HLS，则使用 hls.js 加载
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else {
        console.error("此浏览器不支持 HLS 播放。");
    }

    function showSlide(index) {
        const slider = document.querySelector(".testimonial-slider");
        slider.style.transform = `translateX(-${index * 100}%)`; // 确保每次移动一个完整的评论
    }

    prevButton.addEventListener("click", function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
    });

    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    // 自动轮播
    setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }, 20000); // 每5秒自动切换
});