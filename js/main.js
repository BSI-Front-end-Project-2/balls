//IIFE Function that runs as soon as it is defined
(function () {
  let canvas, ctx, gravity, friction, ball;
  var balls = [];

  function init() {
    canvas = document.getElementById('ballsCanvas');
    ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;

    gravity = 0.25;
    friction = 0.95;

    //TODO: Make a script that get the max widht of a device and sottrae the canvas width
    canvas.onmousemove = function (e) {
      //ball.x = e.clientX - 450;
      //ball.y = e.clientY - 40;
    };

    for (let index = 0; index < 10; index++) {
      balls[index] = ball = {
        bounce: 0.75,
        radius: 30,
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        //TODO: change velX,velY with user mouse speed
        velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2 || -1)),
        velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2 || -1))
      };
      console.log("For " + balls[index].radius);
    }

    console.log("For " + balls[0].bounce)

    window.requestAnimationFrame(update);
  }

  function draw(balln) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    //TODO: Change color from user selection
    ctx.fillStyle = 'red';
    ctx.arc(balln.x, balln.y, balln.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  //console.log("pre update " + balls[0].velY)
  function update() {
    window.requestAnimationFrame(update);
    //console.log("update " + i + " " + balls[i].velY)
    for (let i = 0; i < balls.length; i++) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log("update " + i + " " + balls[i].velY)
      // gravity
      balls[i].velY += gravity;

      // bottom bound / floor
      if (balls[i].y + balls[i].radius >= canvas.height) {
        balls[i].velY = -balls[i].velY
        balls[i].y = canvas.height - balls[i].radius
      }
      // top bound / ceiling
      if (balls[i].y - balls[i].radius <= 0) {
        balls[i].velY = -balls[i].velY
        balls[i].y = balls[i].radius
      }

      // left bound
      if (balls[i].x - balls[i].radius <= 0) {
        balls[i].velX = -balls[i].velX
        balls[i].x = balls[i].radius
      }
      // right bound
      if (balls[i].x + balls[i].radius >= canvas.width) {
        balls[i].velX = -balls[i].velX
        balls[i].x = canvas.width - balls[i].radius
      }

      // balls[i]s[i] position 
      balls[i].x += balls[i].velX;
      balls[i].y += balls[i].velY;

    //draw(balls[0]);
  }

  balls.forEach(ball => {
    draw(ball);
  });
  }

  function Loop(){

  }

  document.addEventListener('DOMContentLoaded', init);
})();
