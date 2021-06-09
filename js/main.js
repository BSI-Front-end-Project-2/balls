//IIFE Function that runs as soon as it is defined
let canvas, ctx, gravity, friction, ball;
var balls = [],
  requestId;

let colors = ['red', 'blue', 'yellow'].sort();
let iColor = 0;
var isStarted = false;

function newBall() {
  balls.push(
    (ball = {
      bounce: 0.75,
      radius: 30,
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      //TODO: change velX,velY with user mouse speed
      velX: (Math.random() * 15 + 5) * Math.floor(Math.random() * 2 || -1),
      velY: (Math.random() * 15 + 5) * Math.floor(Math.random() * 2 || -1),
    })
  );
}
// TODO -->
function ballSizeInc() {
  balls.forEach((ball) => {
    ball.radius += 2;
  });
}
function ballSizeDec() {
  balls.forEach((ball) => {
    if (ball.radius > 2) {
      ball.radius -= 2;
    }
  });
}
function removeBall() {
  if (balls.length >= 0) {
    balls.shift();
    if (balls.length == 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
function speedInc() {}

function Test() {
  if (iColor >= 0 && iColor < colors.length - 1) {
    iColor++;
  } else {
    iColor = 0;
  }

  return iColor;
}

function colorPal() {
  let color = colors[Test()];
  console.log(color);

  return color;
  // ctx.fill();

  // balls.forEach((ball) => {

  // });
  // ctx.fillStyle = color;
  // ctx.fill();
  // document.getElementById('color').textContent = color;
}
function speedInc() {
  balls.forEach((ball) => {
    ball.velY -= 10;
  });
}
function speedDec() {
  balls.forEach((ball) => {
    ball.velY *= 0.8;
  });
}
function colorPal() {}

// End TODO <--
function init() {
  canvas = document.getElementById('ballsCanvas');
  ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 800;

  gravity = 0.25;
  friction = 0.98;

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
  ctx.fillStyle = colorPal();
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
  balls.forEach((ball) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("update " + " " + ball.velY)
    // bottom bound / floor
    if (ball.y + ball.radius >= canvas.height) {
      ball.velX *= friction;
      ball.velY = -ball.velY;
      ball.y = canvas.height - ball.radius;
    }
    // top bound / ceiling
    if (ball.y - ball.radius <= 0) {
      ball.velX *= friction;
      ball.velY = -ball.velY;
      ball.y = ball.radius;
    }

    // left bound
    if (ball.x - ball.radius <= 0) {
      ball.velX = -ball.velX;
      ball.x = ball.radius;
    }
    // right bound
    if (ball.x + ball.radius >= canvas.width) {
      ball.velX = -ball.velX;
      ball.x = canvas.width - ball.radius;
    }

    if (ball.velX < 0.01 && ball.velX > -0.01) {
      ball.velX = 0;
    }
    if (ball.velY < 0.01 && ball.velY > -0.01) {
      ball.velY = 0;
    }

    // gravity
    ball.velY += gravity;

    // balls[i] position
    ball.x += ball.velX;
    ball.y += ball.velY;

    //draw(balls[0]);
  });

  balls.forEach((ball) => {
    draw(ball);
  });

  //Counter Balls
  var counter = balls.length;
  document.getElementById('counter').textContent = counter;
}

document.addEventListener('DOMContentLoaded', init);

// Start the animation loop
function start() {
  if (!isStarted) {
    requestId = requestAnimationFrame(animationLoop);
    //console.log(requestId);
    isStarted = true;
  }
}
function stop() {
  if (isStarted) {
    if (requestId) {
      //console.log(requestId);
      // Stop the animation loop
      cancelAnimationFrame(requestId);
      isStarted = false;
    }
  }
}

document.addEventListener('keydown', function (keyEvent) {
  //console.log(keyEvent);
  if (keyEvent.key == '+') {
    speedInc();
  }
  if (keyEvent.key == '-') {
    speedDec();
  }
  if (keyEvent.key == 'ArrowUp') {
    ballSizeInc();
  }
  if (keyEvent.key == 'ArrowDown') {
    ballSizeDec();
  }
});
