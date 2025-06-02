window.addEventListener('load', () => {
  const bar = document.querySelector('.progress-bar');

  // When the loading bar animation ends, jump directly to postload.html
  bar.addEventListener('animationend', () => {
    window.location.href = 'postload.html';
  }, { once: true });
});
