const canvas = document.getElementById("c"),
$ = canvas.getContext("2d"),
palette = ['#0742F2', '#0D24A6', '#2CE4FF'],
flames = [];

let w = canvas.width = window.innerWidth,
h = canvas.height = window.innerHeight;

const center = {
  x: w / 2,
  y: h / 2 };


function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Circle {

  constructor(center, speed, palette) {
    this.x = center.x;
    this.y = center.y;
    this.angle = randomInRange(Math.PI + Math.PI / 2.75, Math.PI * 2 - Math.PI / 2.75);
    this.vx = speed * Math.cos(this.angle);
    this.vy = speed * Math.sin(this.angle);
    this.r = randomInRange(8, 16);
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }

  update(w, h, objectsArray) {
    this.x += this.vx *= 1.005;
    this.y += this.vy *= 1.01;
    this.r -= .061;
    if (this.x + this.r < 0 || this.x - this.r > w || this.y - this.r > h || this.r <= 0) {
      objectsArray.splice(objectsArray.indexOf(this), 1);
    }
  }

  render($) {
    $.strokeStyle = this.color;
    $.beginPath();
    $.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    $.stroke();
  }}



(function loop() {
  $.clearRect(0, 0, w, h);
  if (Math.random() > .18) flames.push(new Circle(center, 1 + Math.random(), palette));
  for (var i = 0; i < flames.length; i++) {
    flames[i].update(w, h, flames);
    flames[i].render($);
  }
  requestAnimationFrame(loop);
})();

window.addEventListener('resize', function () {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  center.x = w / 2;
  center.y = h / 2;
});