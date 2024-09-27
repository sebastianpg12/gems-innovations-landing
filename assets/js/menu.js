const toggleButton = document.querySelector('.header__toggle');
const navContainer = document.querySelector('.header__nav-container');

toggleButton.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  toggleButton.classList.toggle('active');
});

// Cerrar el menú al hacer clic en cualquier enlace
document.querySelectorAll('.header__item').forEach(item => {
  item.addEventListener('click', () => {
    navContainer.classList.remove('active');
    toggleButton.classList.remove('active');
  });
});