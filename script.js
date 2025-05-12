window.addEventListener('load', animateLoadingBarStutter);

function animateLoadingBarStutter() {
  const bar = document.querySelector('.progress-bar');

  bar.addEventListener('animationend', loadPostload, { once: true });
}

function loadPostload() {

  fetch('postload.html')
    .then(res => res.text())
    .then(html => {

      const post = document.createElement('div');
      post.id = 'postload';
      post.innerHTML = html;
      document.body.appendChild(post);


      requestAnimationFrame(() => {

        document.getElementById('screen').classList.add('fade-out');

        post.classList.add('fade-in');
      });


      setTimeout(() => {
        const old = document.getElementById('screen');
        if (old) old.remove();
      }, 900); 
    })
    .catch(err => {
      console.error('Failed to load postload:', err);
      window.location.href = 'postload.html';
    });
}
