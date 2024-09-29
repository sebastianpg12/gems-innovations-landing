(function () {
  const cursor = document.querySelector('.cursor');
  const header = document.querySelector('.header');
  const toggleButton = document.querySelector('.header__toggle');
  const navContainer = document.querySelector('.header__nav-container');
  const links = document.querySelectorAll('.header__item');
  const submenuLinks = document.querySelectorAll('.header__link'); // Enlace que agrupa texto + flecha
  const submenuItems = document.querySelectorAll('.header__item--submenu');

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

  // Funcionalidad de abrir y cerrar el menú en pantallas pequeñas
  toggleButton.addEventListener('click', () => {
      navContainer.classList.toggle('active');
      toggleButton.classList.toggle('active');
  });

  // Cerrar el menú al hacer clic en cualquier enlace
  links.forEach(item => {
      item.addEventListener('click', () => {
          navContainer.classList.remove('active');
          toggleButton.classList.remove('active');
          closeAllSubmenus(); // Cerrar submenús cuando se selecciona una opción
      });
  });

  // Funcionalidad para abrir/cerrar submenús al hacer clic en el texto o flecha
  submenuLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
          e.stopPropagation(); // Evitar que el clic cierre el menú principal
          const isActive = submenuItems[index].classList.contains('active');
          closeAllSubmenus(); // Cerrar otros submenús
          if (!isActive) {
              submenuItems[index].classList.add('active'); // Abrir solo el submenú seleccionado
          }
      });
  });

  // Cerrar submenús al hacer clic fuera del menú
  document.addEventListener('click', (event) => {
      if (!navContainer.contains(event.target)) {
          closeAllSubmenus();
      }
  });

  // Función para cerrar todos los submenús
  function closeAllSubmenus() {
      submenuItems.forEach(submenu => {
          submenu.classList.remove('active');
      });
  }

})();
