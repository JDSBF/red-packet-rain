const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const imageSources = ["red-packet.png", "coin.png"];
let loadedImages = 0;

for (let src of imageSources) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImages++;
    if (loadedImages === imageSources.length) {
      startAnimation();
    }
  };
  images.push(img);
}

const items = [];

function createItem() {
  const x = Math.random() * canvas.width;
  const speed = 2 + Math.random() * 3;
  const size = 30 + Math.random() * 30;
  const type = Math.floor(Math.random() * images.length);
  items.push({ x, y: -size, speed, size, type });
}

function drawItems() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let item of items) {
    ctx.drawImage(images[item.type], item.x, item.y, item.size, item.size);
    item.y += item.speed;
  }
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].y > canvas.height) {
      items.splice(i, 1);
    }
  }
}

function animate() {
  createItem();
  drawItems();
  requestAnimationFrame(animate);
}

function startAnimation() {
  animate();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
