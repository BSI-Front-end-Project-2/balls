//IIFE Function that runs as soon as it is defined
let canvas, ctx, gravity, friction, ball;
var balls = [], requestId;

function newBall() {
  balls.push(ball = {
    bounce: 0.75,
    radius: 30,
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    //TODO: change velX,velY with user mouse speed
    velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2 || -1)),
    velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2 || -1))
  });
}
// TODO -->
function ballSizeInc() {
  balls.forEach(ball => {
    ball.radius += 2;
  });
}
function ballSizeDec() {
  balls.forEach(ball => {
    if (ball.radius > 2) {
      ball.radius -= 2;
    }
  });
}
function bouncingDec() { }
function speedInc() { }
function colorPal() { }

// End TODO <--
function init() {
  canvas = document.getElementById('ballsCanvas');
  ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 800;

  gravity = 0.25;
  friction = 0;

  //TODO: Make a script that get the max widht of a device and sottrae the canvas width
  /* PDF 1 -  new balls should be generated when the use clicks and drags the mouse 
  ho inserito onclick dentro onmove perché altrimentri si creavano troppe palline
  */
  canvas.onmousemove = function (e) {
    //ball.x = e.clientX - 450;
    //ball.y = e.clientY - 40;
    canvas.onclick = function (e) {
      newBall();
    };
  };


  for (let index = 0; index < 10; index++) {
    newBall();
    //console.log("For " + balls[index].radius);
  }
  //console.log("For " + balls[0].bounce)

  //window.requestAnimationFrame(update);
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

function animationLoop(timestamp) {
  // Draw
  update();
}
function update() {
  requestId = requestAnimationFrame(update);
  //console.log("update " + i + " " + balls[i].velY)
  balls.forEach(ball => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("update " + " " + ball.velY)
    // gravity
    ball.velY += gravity;


    // bottom bound / floor
    if (ball.y + ball.radius >= canvas.height) {
      ball.velY = -ball.velY
      ball.y = canvas.height - ball.radius
    }
    // top bound / ceiling
    if (ball.y - ball.radius <= 0) {
      ball.velY = -ball.velY
      ball.y = ball.radius
    }

    // left bound
    if (ball.x - ball.radius <= 0) {
      ball.velX = -ball.velX
      ball.x = ball.radius
    }
    // right bound
    if (ball.x + ball.radius >= canvas.width) {
      ball.velX = -ball.velX
      ball.x = canvas.width - ball.radius
    }

    // balls[i] position 
    ball.x += ball.velX;
    ball.y += ball.velY;

    //draw(balls[0]);
  });



  balls.forEach(ball => {
    draw(ball);
  });
}

document.addEventListener('DOMContentLoaded', init);
function start() {
  // Start the animation loop
  requestId = requestAnimationFrame(animationLoop);
  //console.log(requestId);
}
function stop() {
  if (requestId) {
    //console.log(requestId);
    // Stop the animation loop
    cancelAnimationFrame(requestId);
  }
}

document.addEventListener("keydown", function (keyEvent) {
  if (keyEvent.key == "+") {
    ballSizeInc();
  } if (keyEvent.key == "-") {
    ballSizeDec();
  }
});
