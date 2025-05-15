
const rainContainer = document.querySelector(".rain-container");
const images = ["red_packet.png", "coin.png"];

// 创建掉落物
function createDrop() {
  const drop = document.createElement("img");
  drop.src = images[Math.floor(Math.random() * images.length)];
  drop.className = "drop";
  drop.style.left = Math.random() * window.innerWidth + "px";
  rainContainer.appendChild(drop);

  setTimeout(() => {
    drop.style.top = window.innerHeight + "px";
  }, 10);

  drop.addEventListener("click", () => {
    document.getElementById("coin-audio").play();
    drop.remove();
  });

  setTimeout(() => {
    drop.remove();
  }, 3500);
}

// 每200ms落下一个
setInterval(createDrop, 200);

// 用户首次点击解锁音频播放
document.body.addEventListener("click", () => {
  const audio = document.getElementById("coin-audio");
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
  }).catch((e) => {
    console.log("首次点击激活音频失败：", e);
  });
}, { once: true });
