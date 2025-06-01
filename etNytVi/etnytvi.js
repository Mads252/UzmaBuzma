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