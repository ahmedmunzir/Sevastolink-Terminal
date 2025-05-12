// postload.js

const folders = document.querySelectorAll('.folder');
const label   = document.querySelector('.folders-label');
const header  = document.getElementById('content-header-bar');
const body    = document.getElementById('content-body');

function calculateVLength(folder) {
  const labelTop     = label.getBoundingClientRect().top;
  const folderMiddle = folder.getBoundingClientRect().top + folder.offsetHeight / 2;
  return folderMiddle - labelTop;
}

function activateFolder(folder) {
  folders.forEach(f => {
    f.classList.remove('active');
    f.style.removeProperty('--v-length');
  });
  folder.classList.add('active');
  folder.style.setProperty('--v-length', `${calculateVLength(folder)}px`);


  body.style.padding  = '4vh 2vw 2vh 2vw';
  body.style.flex     = '';
  body.style.position = '';

  const title = folder.querySelector('.folder-text').textContent;
  if (title === 'ABOUT ME') {
    header.textContent = 'MUNZIR AHMED';
    body.innerHTML = `Hi, I'm Munzir Ahmed and I'm a Computer Science student based in London.

This website is inspired by the Sevastolink Terminals from Alien: Isolation — one of my favourite games of all time. Recreating the terminal was just as fun as playing through the game itself.

I have a strong profieciency in using React (although this website did not require it) alongside HTML, CSS & JS. Java & Python are also additional  languages that I am confident programming in.

You can also check out my:

<a href="https://github.com/ahmedmunzir" target="_blank" style="color: #05b669; text-decoration: none;">GitHub</a>      &         <a href="https://www.linkedin.com/in/munzir-ahmed-392034328/" target="_blank" style="color: #05b669; text-decoration: none;">LinkedIn</a>

- Munzir Ahmed`;
  }
  else if (title === 'PORTFOLIO') {
    header.textContent = 'PROJECTS';
    body.innerHTML = `• Retro Terminal Portfolio (this site)
    <a href="https://github.com/ahmedmunzir/HorseInventory" target="_blank" style="color: #05b669; text-decoration: none;">
     • Horse-Inventory</a> - A Java plugin for multiplayer Minecraft servers
    <a href="https://github.com/ahmedmunzir/java-calculator" target="_blank" style="color: #05b669; text-decoration: none;">
     • Java-Calculator</a> - A simple calculator frontend written in Java
    
    More coming soon...`;
  }
  else if (title === 'EXTRA') {
    header.textContent = 'PONG';
    body.innerHTML = `<canvas id="pongCanvas"></canvas>`;
    body.style.padding  = '0';
    body.style.flex     = '1';
    body.style.position = 'relative';
    startPong();
  }
  else {
    header.textContent = title;
    body.innerHTML = `<p>Loading...</p>`;
  }
}

function recalculateActiveLine() {
  const active = document.querySelector('.folder.active');
  if (!active) return;
  active.style.setProperty('--v-length', `${calculateVLength(active)}px`);
}

folders.forEach(f => f.addEventListener('click', () => activateFolder(f)));
window.addEventListener('resize', recalculateActiveLine);
document.addEventListener('fullscreenchange', recalculateActiveLine);

const defaultActive = document.querySelector('.folder.active');
if (defaultActive) activateFolder(defaultActive);


// --- PONG GAME ---
function startPong() {
  const canvas = document.getElementById("pongCanvas");
  if (!canvas) return;

  const parent = canvas.parentElement; 
  canvas.style.position = 'absolute';
  canvas.style.top      = '0';
  canvas.style.left     = '0';
  canvas.width  = parent.clientWidth;
  canvas.height = parent.clientHeight;

  const ctx      = canvas.getContext("2d");
  const ballSize = 10;

  // base speeds
  const baseBallVX = 6;
  const baseBallVY = 5;
  const serveSpeedFactor = 0.5;  


  let playerY = canvas.height / 2 - 30;
  let cpuY    = canvas.height / 2 - 30;


  let ballX  = canvas.width  / 2;
  let ballY  = canvas.height / 2;

  let ballVX = baseBallVX * serveSpeedFactor * (Math.random() < 0.5 ? 1 : -1);
  let ballVY = baseBallVY * serveSpeedFactor * (Math.random() < 0.5 ? 1 : -1);

  let serving = true;  


  let upPressed   = false;
  let downPressed = false;
  const playerSpeed = 4;     


  const cpuSpeed    = 5;   
  const reactionPct = 2;  


  let playerScore = 0;
  let cpuScore    = 0;


  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp")   upPressed   = true;
    if (e.key === "ArrowDown") downPressed = true;
  });
  document.addEventListener("keyup", e => {
    if (e.key === "ArrowUp")   upPressed   = false;
    if (e.key === "ArrowDown") downPressed = false;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "#05b669";
    ctx.fillRect((canvas.width / 2) - 2, 0, 4, canvas.height);


    ctx.fillStyle    = "#054B1C";
    ctx.textBaseline = "top";
    const fontSize   = Math.floor(canvas.height * 0.05);
    ctx.font         = `${fontSize}px Sevastolink`;

    ctx.textAlign = "left";
    ctx.fillText(`PLAYER: ${playerScore}`, 10, 10);

    ctx.textAlign = "right";
    ctx.fillText(`CPU: ${cpuScore}`, canvas.width - 10, 10);


    ctx.fillStyle = "#05b669";
    ctx.fillRect(10, playerY, 10, 60);
    ctx.fillRect(canvas.width - 20, cpuY, 10, 60);
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
  }

  function resetBall(loserIsPlayer) {
    if (loserIsPlayer) cpuScore++;
    else               playerScore++;

    ballX  = canvas.width  / 2;
    ballY  = canvas.height / 2;

    ballVX = baseBallVX * serveSpeedFactor * (loserIsPlayer ? -1 : 1);
    ballVY = baseBallVY * serveSpeedFactor * (Math.random() < 0.5 ? 1 : -1);
    serving = true;
  }

  function update() {

    if (upPressed)   playerY -= playerSpeed;
    if (downPressed) playerY += playerSpeed;
    playerY = Math.max(0, Math.min(canvas.height - 60, playerY));


    ballX += ballVX;
    ballY += ballVY;


    if (ballY <= 0) {
      ballY  = 0;
      ballVY *= -1;
    } else if (ballY >= canvas.height - ballSize) {
      ballY  = canvas.height - ballSize;
      ballVY *= -1;
    }


    if (ballX <= 20 && ballY + ballSize >= playerY && ballY <= playerY + 60) {
      ballX  = 20;
      ballVX *= -1;
      if (serving) {

        ballVX = Math.sign(ballVX) * baseBallVX;
        ballVY = Math.sign(ballVY) * baseBallVY;
        serving = false;
      }
    }


    if (ballVX > 0 && Math.random() < reactionPct) {
      let targetY = ballY - 30 + (Math.random() - 0.5) * 20;
      if (cpuY + 30 < targetY)      cpuY += cpuSpeed;
      else if (cpuY + 30 > targetY) cpuY -= cpuSpeed;
    } else if (ballVX <= 0) {

      const centerY = canvas.height / 2;
      if (cpuY + 30 < centerY) cpuY += cpuSpeed / 2;
      else if (cpuY + 30 > centerY) cpuY -= cpuSpeed / 2;
    }
    cpuY = Math.max(0, Math.min(canvas.height - 60, cpuY));


    if (ballX + ballSize >= canvas.width - 20 && ballY + ballSize >= cpuY && ballY <= cpuY + 60) {
      ballX  = canvas.width - 20 - ballSize;
      ballVX *= -1;
      if (serving) {
        ballVX = Math.sign(ballVX) * baseBallVX;
        ballVY = Math.sign(ballVY) * baseBallVY;
        serving = false;
      }
    }


    if (ballX < 0)         resetBall(true);
    else if (ballX > canvas.width) resetBall(false);
  }

  (function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  })();
}
