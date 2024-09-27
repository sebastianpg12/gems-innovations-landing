
const grid = document.querySelector('.technologies-grid');
const items = Array.from(grid.children);
const totalItems = items.length;
const gridWidth = grid.scrollWidth; // Ancho total de la grilla
const containerWidth = document.querySelector('.technologies-carousel').offsetWidth; // Ancho visible del contenedor

// Clonamos los elementos hasta que el ancho total sea suficiente para llenar el carrusel sin dejar huecos
let totalWidth = gridWidth;
while (totalWidth < containerWidth * 2) { // Aseguramos que se clonen suficientes ítems
  items.forEach(item => {
    const clone = item.cloneNode(true);
    grid.appendChild(clone);
    totalWidth += item.offsetWidth + 30; // Ajustamos el totalWidth
  });
}
