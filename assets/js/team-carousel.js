document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a elementos del DOM
    const teamCarousel = document.querySelector('.team-carousel');
    const teamSlides = document.querySelectorAll('.team-slide');
    const prevButton = document.querySelector('.team-carousel-prev');
    const nextButton = document.querySelector('.team-carousel-next');
    const indicators = document.querySelectorAll('.team-carousel-indicator');

    // Variables de control
    let currentSlide = 0;
    let isAnimating = false;
    const totalSlides = teamSlides.length;
    const animationDuration = 700; // duración de la animación en ms

    // Inicialización
    function initializeCarousel() {
        if (totalSlides === 0) return;

        // Configurar posición inicial
        updateCarousel(0);

        // Agregar eventos a los botones
        if (prevButton) {
            prevButton.addEventListener('click', goToPrevSlide);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', goToNextSlide);
        }

        // Agregar eventos a los indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        // Agregar eventos táctiles para móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        teamCarousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            // Detener la rotación automática cuando el usuario interactúa
            stopAutoRotation();
        });
        
        teamCarousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            // Reiniciar la rotación automática después de la interacción
            startAutoRotation();
        });

        function handleSwipe() {
            const swipeThreshold = 75;
            if (touchEndX < touchStartX - swipeThreshold) {
                goToNextSlide();  // Deslizar hacia la izquierda = siguiente
            } else if (touchEndX > touchStartX + swipeThreshold) {
                goToPrevSlide();  // Deslizar hacia la derecha = anterior
            }
        }

        // Auto-rotación
        startAutoRotation();
    }

    // Control de la rotación automática
    let autoRotationTimer;
    
    function startAutoRotation() {
        autoRotationTimer = setInterval(goToNextSlide, 5000);
    }
    
    function stopAutoRotation() {
        clearInterval(autoRotationTimer);
    }

    // Navegar a una diapositiva específica
    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        stopAutoRotation();
        updateCarousel(index);
        startAutoRotation();
    }

    // Ir a la diapositiva anterior
    function goToPrevSlide() {
        if (isAnimating) return;
        
        stopAutoRotation();
        const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(newIndex);
        startAutoRotation();
    }

    // Ir a la diapositiva siguiente
    function goToNextSlide() {
        if (isAnimating) return;
        
        stopAutoRotation();
        const newIndex = (currentSlide + 1) % totalSlides;
        updateCarousel(newIndex);
        startAutoRotation();
    }

    // Actualizar el carrusel para mostrar la diapositiva activa - Optimizado
    function updateCarousel(newIndex) {
        if (newIndex === currentSlide) return;
        
        isAnimating = true;

        // Remover clase activa solo de las diapositivas relevantes
        if (teamSlides[currentSlide]) {
            teamSlides[currentSlide].classList.remove('active');
            teamSlides[currentSlide].setAttribute('aria-hidden', 'true');
        }
        
        // Verificar si estamos en móvil para no mostrar slides previos/siguientes
        const isMobile = window.innerWidth <= 768;
        
        const prevCurrentIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        const nextCurrentIndex = (currentSlide + 1) % totalSlides;
        
        if (teamSlides[prevCurrentIndex]) teamSlides[prevCurrentIndex].classList.remove('prev');
        if (teamSlides[nextCurrentIndex]) teamSlides[nextCurrentIndex].classList.remove('next');
        
        // Actualizar indicadores
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.remove('active');
            indicators[currentSlide].setAttribute('aria-selected', 'false');
        }

        // Calcular índices de las diapositivas adyacentes
        const prevIndex = (newIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (newIndex + 1) % totalSlides;

        // Añadir clases para animación solo a las diapositivas relevantes y si no estamos en móvil
        if (!isMobile && teamSlides[prevIndex]) teamSlides[prevIndex].classList.add('prev');
        if (teamSlides[newIndex]) {
            teamSlides[newIndex].classList.add('active');
            teamSlides[newIndex].setAttribute('aria-hidden', 'false');
        }
        if (!isMobile && teamSlides[nextIndex]) teamSlides[nextIndex].classList.add('next');

        // Actualizar indicador activo
        if (indicators[newIndex]) {
            indicators[newIndex].classList.add('active');
            indicators[newIndex].setAttribute('aria-selected', 'true');
        }

        // Actualizar el índice actual
        currentSlide = newIndex;
        
        // Disparar un evento personalizado para notificar el cambio de diapositiva
        const event = new CustomEvent('teamSlideChange', {
            detail: { newIndex, prevIndex, nextIndex }
        });
        document.dispatchEvent(event);

        // Quitar bloqueo de animación después de completar
        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    }

    // Efectos adicionales de parallax y animación - optimizados
    function applyParallaxEffects() {
        // Solo en equipos de escritorio (para evitar problemas de rendimiento en móviles)
        if (window.innerWidth >= 1024) { // Aumentamos el umbral para que solo sea en pantallas grandes
            // Usamos requestAnimationFrame para optimizar el rendimiento
            let ticking = false;
            let activeSlide, avatarContainer, messageContainer;
            let rafId = null;
            
            function updateParallax(mouseX, mouseY) {
                if (!activeSlide) {
                    activeSlide = document.querySelector('.team-slide.active');
                    if (activeSlide) {
                        avatarContainer = activeSlide.querySelector('.team-member__avatar');
                        messageContainer = activeSlide.querySelector('.team-member__message');
                    }
                }
                
                if (activeSlide && avatarContainer) {
                    const carouselRect = teamCarousel.getBoundingClientRect();
                    const centerX = carouselRect.left + carouselRect.width / 2;
                    const centerY = carouselRect.top + carouselRect.height / 2;
                    const moveX = (mouseX - centerX) / 25; // Reducimos la intensidad del movimiento
                    const moveY = (mouseY - centerY) / 25; // Reducimos la intensidad del movimiento
                    
                    avatarContainer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                    
                    if (messageContainer) {
                        messageContainer.style.transform = `translate3d(${-moveX * 0.2}px, ${-moveY * 0.2}px, 0)`;
                    }
                    
                    ticking = false;
                }
            }
            
            teamCarousel.addEventListener('mousemove', e => {
                if (!ticking) {
                    rafId = window.requestAnimationFrame(() => {
                        updateParallax(e.clientX, e.clientY);
                    });
                    ticking = true;
                }
            });

            teamCarousel.addEventListener('mouseleave', () => {
                if (rafId) {
                    window.cancelAnimationFrame(rafId);
                    rafId = null;
                }
                
                if (activeSlide) {
                    if (avatarContainer) {
                        avatarContainer.style.transform = '';
                    }
                    if (messageContainer) {
                        messageContainer.style.transform = '';
                    }
                    
                    // Reseteamos las referencias para evitar problemas
                    activeSlide = null;
                    avatarContainer = null;
                    messageContainer = null;
                }
            });
            
            // Cuando cambia la diapositiva activa, reseteamos las referencias
            document.addEventListener('teamSlideChange', () => {
                activeSlide = null;
                avatarContainer = null;
                messageContainer = null;
            });
        }
    }

    // Efectos de resaltado en hover optimizados - solo para la diapositiva activa
    function setupHoverEffects() {
        // En lugar de agregar eventos a todas las diapositivas, solo agregamos eventos al contenedor
        teamCarousel.addEventListener('mouseenter', (e) => {
            const activeSlide = document.querySelector('.team-slide.active');
            if (activeSlide && e.target.closest('.team-slide.active')) {
                activeSlide.classList.add('highlight');
            }
        }, true);
        
        teamCarousel.addEventListener('mouseleave', (e) => {
            const activeSlide = document.querySelector('.team-slide.active');
            if (activeSlide) {
                activeSlide.classList.remove('highlight');
            }
        }, true);
    }

    // Iniciar carrusel
    initializeCarousel();
    applyParallaxEffects();
    setupHoverEffects();
});