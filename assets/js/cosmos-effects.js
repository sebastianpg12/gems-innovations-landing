document.addEventListener('DOMContentLoaded', function() {
    // Crear el fondo cósmico
    createCosmicBackground();
    
    // Crear partículas cósmicas
    createCosmicParticles();
    
    // Agregar efectos a los badges
    enhanceBadges();
});

// Función para crear el fondo estelar
function createCosmicBackground() {
    const teamSection = document.querySelector('.team-section');
    if (!teamSection) return;
    
    // Crear contenedor de fondo cósmico
    const cosmicBackground = document.createElement('div');
    cosmicBackground.className = 'cosmic-background';
    teamSection.appendChild(cosmicBackground);
    
    // Crear estrellas
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        createStar(cosmicBackground);
    }
}

// Función para crear una estrella individual
function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Tamaño aleatorio
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Posición aleatoria
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    
    // Animación personalizada
    star.style.setProperty('--delay', `${Math.random() * 6}s`);
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    star.style.setProperty('--opacity', `${Math.random() * 0.7 + 0.3}`);
    
    // Agregar al contenedor
    container.appendChild(star);
}

// Función para crear partículas cósmicas flotantes
function createCosmicParticles() {
    const teamSection = document.querySelector('.team-section');
    if (!teamSection) return;
    
    // Número de partículas
    const numParticles = 15;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición inicial aleatoria
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        // Dirección aleatoria
        const endX = startX + (Math.random() * 200 - 100);
        const endY = startY + (Math.random() * 200 - 100);
        
        // Configurar variables CSS personalizadas
        particle.style.setProperty('--x-start', `${startX}%`);
        particle.style.setProperty('--y-start', `${startY}%`);
        particle.style.setProperty('--x-end', `${endX}%`);
        particle.style.setProperty('--y-end', `${endY}%`);
        particle.style.setProperty('--duration', `${Math.random() * 20 + 10}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particle.style.setProperty('--opacity', `${Math.random() * 0.4 + 0.1}`);
        
        // Agregar al contenedor
        teamSection.appendChild(particle);
    }
}

// Función para mejorar los badges con efectos cósmicos
function enhanceBadges() {
    const badges = document.querySelectorAll('.team-member__badge');
    
    badges.forEach(badge => {
        badge.classList.add('cosmic-badge');
    });
}