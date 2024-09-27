(function () {
    const cursor = document.querySelector('.cursor');
    const header = document.querySelector('.header');
    const toggleButton = document.querySelector('.header__toggle');
    const navContainer = document.querySelector('.header__nav-container');
    const links = document.querySelectorAll('.header__item');
  
    // Mueve el cursor personalizado con el movimiento del mouse
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  
    // Mostrar el cursor solo al estar dentro del header
    header.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1'; // Mostrar el cursor
    });
  
    header.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0'; // Ocultar el cursor al salir del header
    });
  
    // Funcionalidad de abrir y cerrar el menú
    toggleButton.addEventListener('click', () => {
      navContainer.classList.toggle('active');
      toggleButton.classList.toggle('active');
    });
  
    // Cerrar el menú al hacer clic en cualquier enlace
    links.forEach(item => {
      item.addEventListener('click', () => {
        navContainer.classList.remove('active');
        toggleButton.classList.remove('active');
      });
    });
  
  })();
  