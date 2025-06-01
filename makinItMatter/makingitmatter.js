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
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
  slider.classList.add('dragging');
  e.preventDefault();
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
  const x = e.pageX;
  const walk = (x - startX) * 1.2; // speed
  slider.scrollLeft = scrollLeft - walk;
});
// Hent og byg kundekort fra SheetBest
fetch('https://api.sheetbest.com/sheets/c7e30d95-3a33-450c-83cb-e697f0af7c5f')
  .then(response => response.json())
  .then(data => {
    const cardContainer = document.getElementById("quoteSliderTrack");
    data.forEach(entry => {
      const card = document.createElement("div");
      card.className = "quote-card";
      card.innerHTML = `
        <img src="${entry['Billed-URL']}" alt="Billede af ${entry.Titel}" class="quote-avatar">
        <div class="quote-name">${entry.Titel}</div>
        <div class="quote-role">${entry.Billedtekst}</div>
        <div class="quote-message">${entry.Tekst || ''}</div>
      `;
      cardContainer.appendChild(card);
    });
  });

// Drag-funktion til kundeslider
const dragTarget = document.querySelector('.slider-wrapper');
let isDragging = false;
let dragStartX;
let scrollStartX;

dragTarget.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragTarget.classList.add('dragging');
  dragStartX = e.pageX - dragTarget.offsetLeft;
  scrollStartX = dragTarget.scrollLeft;
});

dragTarget.addEventListener('mouseleave', () => {
  isDragging = false;
  dragTarget.classList.remove('dragging');
});

dragTarget.addEventListener('mouseup', () => {
  isDragging = false;
  dragTarget.classList.remove('dragging');
});

dragTarget.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - dragTarget.offsetLeft;
  const walk = (x - dragStartX) * 1.5;
  dragTarget.scrollLeft = scrollStartX - walk;
});

// Touch support
dragTarget.addEventListener('touchstart', (e) => {
  dragStartX = e.touches[0].pageX - dragTarget.offsetLeft;
  scrollStartX = dragTarget.scrollLeft;
});

dragTarget.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - dragTarget.offsetLeft;
  const walk = (x - dragStartX) * 1.5;
  dragTarget.scrollLeft = scrollStartX - walk;
});
