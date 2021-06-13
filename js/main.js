/**
 * this is the main js
 * this file handle the game logic and event interactions
 */


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
  canvas.width = window.innerWidth - window.innerWidth * 0.25;
  canvas.height = window.innerHeight - window.innerHeight * 0.25;
});

window.onload = function () {
  canvas.width = window.innerWidth - window.innerWidth * 0.25;
  canvas.height = window.innerHeight - window.innerHeight * 0.25;
}

/**
 * available colors
 * in consts
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
      velX: velPosX,
      velY: velPosY,
    })
  );
}
/**
 * set horizontal speed
 * @returns mouse horizontal speed, could be negative or positive depending on the direction
 */
function directionMouseX() {
  var velPosX;
  if (dirX == "right")
    velPosX = (Math.random() * 15 + 5) * Math.floor(Math.random() * 2);
  else
    velPosX = (Math.random() * 15 + 5) * Math.floor(Math.random() * -2);

  return velPosX;
}
/**
 * set vertical speed
 * @returns mouse vertical speed, could be negative or positive depending on the direction
 */
function directionMouseY() {
  var velPosY;
  if (dirY == "down")
    velPosY = (Math.random() * 15 + 5) * Math.floor(Math.random() * 1);
  else
    velPosY = (Math.random() * 15 + 5) * Math.floor(Math.random() * -2);

  return velPosY;
}
/**
 *  increase ball radius 
 *  ball radius value must be less than 100
 *  if less than 100 radius is incremented by 2
 */
function ballSizeInc() {
  if (isStarted) {
    if (ball.radius < 100) {
      balls.forEach((ball) => {
        ball.radius += 2;
      });
    }
  }
}
/**
 *  decrease ball radius 
 *  ball radius value must be greater than 2
 *  if greater than 2 radius is decremented by 2
 */
function ballSizeDec() {
  if (isStarted) {
    if (ball.radius > 2) {
      balls.forEach((ball) => {
        ball.radius -= 2;
      });
    }
  }
}
/**
 *  remove a ball if at least one is present
 *  if is the last ball the canvas must be cleared
 *  since update will not be able anymore to clear
 *  the canvas since ball length reach 0
 */
function removeBall() {
  if (isStarted) {
    if (balls.length >= 0) {
      balls.shift();
      if (balls.length == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
}
/**
 * 
 * @returns an index for scrolling colors 
 * must be in range of 0 and colors array length
 * than could increased, otherwise restart from color 
 * at first index
 */
function colorRing() {
  if (iColor >= 0 && iColor < colors.length - 1) {
    iColor++;
  } else {
    iColor = 0;
  }

  return iColor;
}
/**
 * take a valid color index
 * and than apply the color to the html element
 */
function colorScroll() {
  let color = colors[colorRing()];
  cColor.style.backgroundColor = color;
}
/**
 * 
 * @returns a color name retrieved from the array
 */
function colorPal() {
  color = colors[iColor];
  return color;
}

var color = colorPal();
cColor.style.backgroundColor = color;
/**
 * if speed maintain a specific range, is incremented
 * however if speed is near to zero, is resetted to a
 * value either negative or positive. 
 */
function speedInc() {

  if (isStarted) {
    balls.forEach((ball) => {

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
}
/**
 * speed id decremented
 */
function speedDec() {

  if (isStarted) {
    balls.forEach((ball) => {
      ball.velY *= 0.8;
      ball.velX *= 0.8;
    });
  }
}
/**
 * 
 * @param {Event} 
 * retrieve current mouse x and 
 * calculate if pointer is located right or left
 * from the previous x coordinate
 * 
 * retrieve current mouse y and 
 * calculate if pointer is located up or down
 * from the previous y coordinate
 * 
 * than old coordinated are updated
 */
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

}

/**
 * init the game environment
 * configurate gravity and friction 
 */
function init() {
  canvas = document.getElementById('ballsCanvas');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth - window.innerWidth * 0.20;
  canvas.height = window.innerHeight - window.innerHeight * 0.20;

  gravity = 0.60;
  friction = 0.80;

  /**
  *  Make a script that get the max width of a device and sub the canvas width
  *  new balls should be generated when the user clicks and moves the mouse
  *  a boolean handle ball creation which is allowed only if the mouse is pressed
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
    if (mouseIsDown && isStarted) {
      newBall();
    }
  });
}

/**
 * 
 * @param {*} balln the ball to use
 * @param {*} color for filling the ball
 * 
 * draw balls depending on color and ball parameters configuration
 */
function draw(balln, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(balln.x, balln.y, balln.radius, 0, Math.PI * 2);
  ctx.fill();
}

function animationLoop(timestamp) {
  // Draw
  update();
}
/**
 * update animation
 */
function update() {
  requestId = requestAnimationFrame(update);

  balls.forEach((ball) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    ball.x += ball.velX;
    ball.y += ball.velY;
  });
  // shift color on the color container
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
    isStarted = true;
    playAudio();
  }
}
// animation is paused
function stop() {

  if (isStarted) {
    if (requestId) {
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
/**
 * key event listeners for controller buttons
 */
document.addEventListener('keydown', function (keyEvent) {
  if (isStarted) {
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
    if (keyEvent.key == 'Backspace') {
      removeBall();
    }
  }
});