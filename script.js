const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let redPackets = [];
let image = new Image();
image.src = 'red_packet.png';

class RedPacket {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = 2 + Math.random() * 3;
        this.size = 30 + Math.random() * 30;
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.drawImage(image, this.x, this.y, this.size, this.size);
    }
}

function createPackets(num) {
    for (let i = 0; i < num; i++) {
        redPackets.push(new RedPacket());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redPackets.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

image.onload = function () {
    createPackets(30);
    animate();
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});