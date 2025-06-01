const track = document.querySelector('.frame-track');
const frames = document.querySelectorAll('.frame');
let index = 0;

function getFrameWidth() {
  return frames[0].offsetWidth;
}

function updateSlider() {
  const frameWidth = getFrameWidth();
  track.style.transform = `translateX(-${index * frameWidth}px)`;

  setTimeout(() => {
    frames.forEach(f => f.classList.remove('dingler'));
    frames[index].classList.add('dingler');

    setTimeout(() => {
      frames[index].classList.remove('dingler');
    }, 500);
  }, 200);
}

function updateSlide2() {
  const frameWidth = getFrameWidth();
  track.style.transform = `translateX(-${index * frameWidth}px)`;

  setTimeout(() => {
    frames.forEach(f => f.classList.remove('dingler2'));
    frames[index].classList.add('dingler2');

    setTimeout(() => {
      frames[index].classList.remove('dingler2');
    }, 500);
  }, 200);
}

document.getElementById('nextBtn').addEventListener('click', () => {
  index = (index + 1) % frames.length;
  updateSlider();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  index = (index - 1 + frames.length) % frames.length;
  updateSlide2();
});

// Opdater på resize
window.addEventListener('resize', () => {
  updateSlider();
});

updateSlider();


const carousel = document.querySelector('.smart-carousel');
const items = document.querySelectorAll('.carousel-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    // Hvis allerede aktiv → luk
    if (item.classList.contains('active')) {
      item.classList.remove('active');
      carousel.classList.remove('focus-mode');
    } else {
      // Ellers: gør denne aktiv
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      carousel.classList.add('focus-mode');
    }
  });
});
