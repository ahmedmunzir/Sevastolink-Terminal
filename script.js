window.addEventListener('load', animateLoadingBarStutter);

function animateLoadingBarStutter() {
  const bar = document.querySelector('.progress-bar');

  // When the animation ends, trigger the redirect sequence
  bar.addEventListener('animationend', loadPostload, { once: true });
}

function loadPostload() {
  const screen = document.getElementById('screen');
  
  // Trigger fade-out animation
  screen.classList.add('fade-out');

  // Redirect after fade-out finishes
  setTimeout(() => {
    window.location.href = 'postload.html';
  }, 900); // Match this with your CSS fade-out duration
}
