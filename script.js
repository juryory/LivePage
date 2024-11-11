document.addEventListener("DOMContentLoaded", function () {
    const programContainer = document.getElementById("programContainer");
    const videoSection = document.getElementById("videoSection");
    const liveVideo = document.getElementById("liveVideo");
    const programInfo = document.getElementById("programInfo");

    function adjustLayout() {
        if (programInfo.offsetHeight > liveVideo.offsetHeight) {
            programContainer.style.flexDirection = "column"; // 改为上下排列
            programInfo.style.width = liveVideo.offsetWidth + "px"; // 使 programInfo 宽度与 liveVideo 一致
        } else {
            programContainer.style.flexDirection = "row"; // 改为左右排列
            programInfo.style.width = ""; // 还原 programInfo 宽度
        }
    }

    // 初始检查
    adjustLayout();

    // 监听窗口大小调整
    window.addEventListener("resize", adjustLayout);
});