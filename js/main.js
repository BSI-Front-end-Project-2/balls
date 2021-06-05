//IIFE Function that runs as soon as it is defined
(function () {
  let canvas, ctx, gravity, ball, friction;

  function init() {
    canvas = document.getElementById('ballsCanvas');
    ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;

    gravity = 0.25;
    friction = 0.95;

    //TODO: Make a script that get the max widht of a device and sottrae the canvas width
    canvas.onmousemove = function (e) {
      ball.x = e.clientX - 450;
      ball.y = e.clientY - 40;
    };

    ball = {
      bounce: 0.75,
      radius: 30,

      x: canvas.width / 2,
      y: canvas.height / 2,

      //TODO: change velX,velY with user mouse speed
      velX: 10,
      velY: 10,
    };

    window.requestAnimationFrame(update);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    //TODO: Change color from user selection
    ctx.fillStyle = 'red';

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

    ctx.fill();
  }

  function update() {
    window.requestAnimationFrame(update);

    // gravity
    ball.velY += gravity;

    ball.x += ball.velX;
    ball.y += ball.velY;

    draw();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
