// -----------------------------
// Uzma-slider (tekst + knapper)
// -----------------------------
const uzmaSlidesContainer = document.querySelector('.uzma-slides');
const uzmaTotalSlides = document.querySelectorAll('.uzma-slide').length;
const uzmaPrevBtn = document.querySelector('.uzma-prev');
const uzmaNextBtn = document.querySelector('.uzma-next');
let uzmaCurrentIndex = 0;

function updateUzmaSlider() {
  uzmaSlidesContainer.style.transform = `translateX(-${uzmaCurrentIndex * 100}%)`;
}

uzmaPrevBtn.addEventListener('click', () => {
  uzmaCurrentIndex = (uzmaCurrentIndex - 1 + uzmaTotalSlides) % uzmaTotalSlides;
  updateUzmaSlider();
});

uzmaNextBtn.addEventListener('click', () => {
  uzmaCurrentIndex = (uzmaCurrentIndex + 1) % uzmaTotalSlides;
  updateUzmaSlider();
});

// Swipe/drag for Uzma-slider
let uzmaStartX = 0;
let uzmaDragging = false;

const uzmaStartDrag = (e) => {
  uzmaDragging = true;
  uzmaStartX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
};

const uzmaEndDrag = (e) => {
  if (!uzmaDragging) return;
  uzmaDragging = false;
  const uzmaEndX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
  const uzmaDistance = uzmaEndX - uzmaStartX;

  if (uzmaDistance > 50) {
    uzmaCurrentIndex = (uzmaCurrentIndex - 1 + uzmaTotalSlides) % uzmaTotalSlides;
  } else if (uzmaDistance < -50) {
    uzmaCurrentIndex = (uzmaCurrentIndex + 1) % uzmaTotalSlides;
  }
  updateUzmaSlider();
};

const uzmaSliderWindow = document.querySelector('.uzma-slider-window');
uzmaSliderWindow.addEventListener('mousedown', uzmaStartDrag);
uzmaSliderWindow.addEventListener('touchstart', uzmaStartDrag);
uzmaSliderWindow.addEventListener('mouseup', uzmaEndDrag);
uzmaSliderWindow.addEventListener('touchend', uzmaEndDrag);

// Initial position
updateUzmaSlider();


// data-slider (tekst + knapper)
const dataSlider = document.getElementById('dataSliderRow');
const progressBar = document.getElementById('dataSliderProgress');

dataSlider.addEventListener('scroll', () => {
  const scrollLeft = dataSlider.scrollLeft;
  const maxScrollLeft = dataSlider.scrollWidth - dataSlider.clientWidth;
  const scrollPercent = (scrollLeft / maxScrollLeft) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});
const slider = document.getElementById('dataSliderRow');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('dragging');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('dragging');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('dragging');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // speed factor
  slider.scrollLeft = scrollLeft - walk;
});










