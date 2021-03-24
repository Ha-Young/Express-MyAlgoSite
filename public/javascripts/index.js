// import { TweenMax, Elastic } from "/node_modules/gsap/all.js";
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const particles = [];

function drawScene() {
  canvas.width = png.width * 3.5;
  canvas.height = png.height * 3.5;
  ctx.drawImage(png, 0, 0);
  const my_gradient = ctx.createLinearGradient(0, 170, 170, 0);
  my_gradient.addColorStop(1, "#e32c2c");

  ctx.fillStyle = my_gradient;
  const data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0, y2 = data.height; y < y2; y++) {
    for (let x = 0, x2 = data.width; x < x2; x++) {
      let p = y * 4 * data.width + x * 4;
      if (data.data[p + 3] > 129) {
        const particle = {
          x0: x,
          y0: y,
          x1: png.width / 2,
          y1: png.height / 2,
          speed: Math.random() * 4 + 2,
          color:
            "rgb(" +
            data.data[p] +
            "," +
            data.data[p + 1] +
            "," +
            data.data[p + 2] +
            ")",
        };
        TweenMax.to(particle, particle.speed, {
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 30,
          ease: Elastic.easeOut,
        });
        particles.push(particle);
      }
    }
  }
  requestAnimationFrame(render);
}
const render = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0, j = particles.length; i < j; i++) {
    let particle = particles[i];
    ctx.fillRect(particle.x1 * 3, particle.y1 * 3, 2, 2);
  }
  requestAnimationFrame(render);
};

const png = new Image();
png.crossOrigin = "anonymous";
png.onload = drawScene;
png.src =
  "https://cdn.icon-icons.com/icons2/2622/PNG/128/brand_codewars_icon_158954.png";
