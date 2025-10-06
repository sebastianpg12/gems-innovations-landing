// Video Showcase Controls - Auto mode only
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar si estamos en la página de LMS
    if (!document.getElementById('videoWrapper')) return;
    
    const highlight1 = document.getElementById('highlight1');
    const highlight2 = document.getElementById('highlight2');
    const highlight3 = document.getElementById('highlight3');
    
    let autoTourInterval;
    let currentHighlight = 1;
    
    // Función para activar un resaltado específico
    function activateHighlight(highlightNum) {
        // Eliminar clase active de todos los resaltados
        [highlight1, highlight2, highlight3].forEach(h => h.classList.remove('active'));
        
        // Activar el resaltado seleccionado
        currentHighlight = highlightNum;
        
        if (highlightNum === 1) {
            highlight1.classList.add('active');
        } else if (highlightNum === 2) {
            highlight2.classList.add('active');
        } else if (highlightNum === 3) {
            highlight3.classList.add('active');
        }
    }
    
    // Función para el auto-tour
    function startAutoTour() {
        clearInterval(autoTourInterval);
        
        // Activar el primer resaltado inmediatamente
        activateHighlight(1);
        
        // Iniciar el intervalo
        autoTourInterval = setInterval(() => {
            currentHighlight = (currentHighlight % 3) + 1;
            activateHighlight(currentHighlight);
        }, 4000);
    }
    
    // Iniciar auto-tour al cargar la página
    startAutoTour();
});