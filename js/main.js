//IIFE Function that runs as soon as it is defined
var song = document.getElementById("music");
let canvas, ctx, gravity, friction, ball;
var balls = [],
  requestId, pX, pY, dirX, dirY;
var isStarted = false;

let xDirection, yDirection;
let oldX = 0,
  oldY = 0;
/**
 * handle the canvas responsiveness 
 * by resizing the browser window 
 * 0.15% less than real width and height
 */
addEventListener('resize', function () {
  canvas.width = window.innerWidth - window.innerWidth * 0.15;
  canvas.height = window.innerHeight - window.innerHeight * 0.15;
});
/**
 * available colors
 */
const colors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#06664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];
let iColor = 0;
let cColor = document.getElementById('colorPal');
/**
 * create a new ball
 * -keep x and y speed from mouse pointer
 * -insert the ball in the array
 * -set default values for radius and bounce
 */
function newBall() {
  var velPosX = directionMouseX();
  var velPosY = directionMouseY();

  balls.push(
    (ball = {
      bounce: 0.75,
      radius: 30,
      x: pX,
      y: pY,
      //TODO: change velX,velY with user mouse speed
      velX: velPosX,
      velY: velPosY,
    })
  );
}
/**
 * 
 * @returns 
 */
function directionMouseX() {
  var velPosX;
  if (dirX == "right")
    velPosX = (Math.random() * 15 + 5) * Math.floor(Math.random() * 2);
  else
    velPosX = (Math.random() * 15 + 5) * Math.floor(Math.random() * -2);

  return velPosX;
}

function directionMouseY() {
  var velPosY;
  if (dirY == "down")
    velPosY = (Math.random() * 15 + 5) * Math.floor(Math.random() * 1);
  else
    velPosY = (Math.random() * 15 + 5) * Math.floor(Math.random() * -2);

  return velPosY;
}

function ballSizeInc() {
  if (ball.radius < 100) {
    balls.forEach((ball) => {
      ball.radius += 2;
    });
  }
}
function ballSizeDec() {
  if (ball.radius > 2) {
    balls.forEach((ball) => {
      ball.radius -= 2;
    });
  }
}
function removeBall() {
  if (balls.length >= 0) {
    balls.shift();
    if (balls.length == 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}

function colorRing() {
  if (iColor >= 0 && iColor < colors.length - 1) {
    iColor++;
  } else {
    iColor = 0;
  }

  return iColor;
}

function colorScroll() {
  let color = colors[colorRing()];
  //console.log(color);
  cColor.style.backgroundColor = color;
}

function colorPal() {
  color = colors[iColor];
  return color;
}

var color = colorPal();
cColor.style.backgroundColor = color;

function speedInc() {

  balls.forEach((ball) => {
    console.log(ball.velY);
    console.log(ball.velX);
    if (ball.velY < 80 && ball.velY > -80) {
      if (ball.velY > 0 && ball.velY < 0.4)
        ball.velY += ((Math.random()) * 2 - 1) * 10;
      else
        ball.velY *= 1.3;
    }

    if (ball.velX < 80 && ball.velY > -80) {
      if (ball.velX === 0)
        ball.velX += ((Math.random()) * 2 - 1) * 10;
      else
        ball.velX *= 1.3;
    }
  });
}
function speedDec() {

  balls.forEach((ball) => {
    ball.velY *= 0.8;
    ball.velX *= 0.8;
  });
}

function getMouseDirection(e) {
  if (oldX < e.pageX) {
    xDirection = 'right';
  } else {
    xDirection = 'left';
  }


  if (oldY < e.pageY) {
    yDirection = 'down';
  } else {
    yDirection = 'up';
  }

  oldX = e.pageX;
  oldY = e.pageY;

  pX = e.clientX;
  pY = e.clientY;
  dirX = xDirection;
  dirY = yDirection;

  //console.log(xDirection + ' ' + yDirection);
}

// credo si possa eliminare
/*
function getMouseX(e) {
  console.log(e.clientX);
  return e.clientX
}
*/

function init() {
  canvas = document.getElementById('ballsCanvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth - window.innerWidth * 0.15;
  canvas.height = window.innerHeight - window.innerHeight * 0.15;

  gravity = 0.60;
  friction = 0.80;

  //TODO: Make a script that get the max widht of a device and sottrae the canvas width
  /* PDF 1 -  new balls should be generated when the use clicks and drags the mouse
  ho inserito onclick dentro onmove perché altrimentri si creavano troppe palline
  */
  var mouseIsDown = false;
  canvas.addEventListener('mousedown', function () {
    mouseIsDown = true;
  });
  canvas.addEventListener('mouseup', function () {
    mouseIsDown = false;
  });

  canvas.addEventListener('mousemove', getMouseDirection, false);

  canvas.addEventListener('mousemove', function () {
    if (mouseIsDown) {
      newBall();
    }
  });

  /*
  for (let index = 0; index < 10; index++) {
    newBall();
    //console.log("For " + balls[index].radius);
  }
  */
  //console.log("For " + balls[0].bounce)

  //window.requestAnimationFrame(update);
}

function draw(balln, color) {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  //TODO: Change color from user selection
  ctx.fillStyle = color;
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
    /*
        if (ball.velX == 0 && ball.velY != 0) {
          ball.velX = Math.random() * 15 + 5;
        }
    */
    // gravity
    ball.velY += gravity;

    // balls[i] position
    ball.x += ball.velX;
    ball.y += ball.velY;

    //draw(balls[0]);
  });

  document.getElementById('color').addEventListener('click', function () {
    color = colorPal();
  });

  balls.forEach((ball) => {
    draw(ball, color);
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
    playAudio();
  }
}
function stop() {

  if (isStarted) {
    if (requestId) {
      //console.log(requestId);
      // Stop the animation loop
      cancelAnimationFrame(requestId);
      isStarted = false;
      pauseAudio();
    }
  }
}

function playAudio() {
  song.play();
}
function pauseAudio() {
  song.pause();
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