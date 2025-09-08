// Elements
const overlay = document.getElementById('fullscreenOverlay');
const fsImage = document.getElementById('fsImage');
const fsVideo = document.getElementById('fsVideo');
const gallery = document.getElementById('gallery');

const notification = document.getElementById('notification');
const letter = document.getElementById('letter');
const videoWrapper = document.getElementById('videoWrapper');
const loveVideo = document.getElementById('loveVideo');
const balloons = document.getElementById('balloons');
const words = document.getElementById('words');
const loveText = document.getElementById('loveText');
const loveScroll = document.getElementById('loveScroll');
const acceptBtn = document.getElementById('acceptBtn');
const declineBtn = document.getElementById('declineBtn');

// --- Gallery click: show overlay with image/video ---
gallery.addEventListener('click', e => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  const src = item.dataset.src;
  const ext = src.split('.').pop().toLowerCase();

  fsImage.style.display = 'none';
  fsVideo.style.display = 'none';
  fsVideo.pause();
  fsVideo.src = '';

  if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') {
    fsVideo.src = src;
    fsVideo.muted = false;
    fsVideo.controls = true;
    fsVideo.style.display = 'block';
    fsVideo.play().catch(() => {});
  } else {
    fsImage.src = src;
    fsImage.style.display = 'block';
  }

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Close overlay when clicking background
overlay.addEventListener('click', e => {
  if (e.target !== overlay) return;
  closeOverlay();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeOverlay();
});
function closeOverlay() {
  overlay.style.display = 'none';
  fsVideo.pause();
  fsVideo.src = '';
  document.body.style.overflow = '';
}

// --- Notification appears after 40 seconds ---
setTimeout(() => {
  notification.classList.remove('hidden');
}, 40000);

// --- Notification click → letter flies, then video shows ---
notification.addEventListener('click', () => {
  notification.classList.add('hidden');
  letter.classList.remove('hidden');

  setTimeout(() => {
    letter.style.transform = "translate(500px, -400px)";
  }, 50);

  setTimeout(() => {
    letter.classList.add('hidden');
    videoWrapper.classList.remove('hidden');
    loveVideo.play().catch(() => {});
  }, 3000);
});

// --- When video ends → show balloons ---
loveVideo.addEventListener('ended', () => {
  videoWrapper.classList.add('hidden');
  balloons.classList.remove('hidden');
});

// --- Balloon click → reveal words ---
document.querySelectorAll('.balloon').forEach(balloon => {
  balloon.addEventListener('click', () => {
    const word = document.createElement('div');
    word.className = 'word';
    word.textContent = balloon.dataset.word;
    words.appendChild(word);
    balloon.style.display = 'none';

    // If all balloons popped, hide "I Love You" and show scroll
    if ([...document.querySelectorAll('.balloon')].every(b => b.style.display === 'none')) {
      showScroll();
    }
  });
});

// --- Show scroll and hide "I Love You" ---
function showScroll() {
  if (loveText) {
    loveText.style.display = 'none';
  }
  loveScroll.style.display = 'block';
  loveScroll.style.animation = 'fallScroll 2s forwards';
}

// --- Accept/Decline buttons ---
acceptBtn.addEventListener('click', () => {
  const phone = '8801873881976'; // change to your number
  const message = encodeURIComponent('I love you too <3');
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  loveScroll.style.display = 'none';
});

declineBtn.addEventListener('click', () => {
  loveScroll.style.animation = 'burnScroll 2s forwards'; // add burnScroll CSS
  setTimeout(() => {
    loveScroll.style.display = 'none';
  }, 2000);
});
