// Scroll-to-Top Button JavaScript
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show the button when the user scrolls down
window.onscroll = function() {
  if (document.body.scrollTop > 380 || document.documentElement.scrollTop > 380) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Scroll back to top smoothly when button is clicked
scrollToTopBtn.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // smooth scroll effect
  });
};

// Toggle Menu JavaScript
const toggleButton = document.querySelector('.header__toggle');
const navContainer = document.querySelector('.header__nav-container');

toggleButton.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  toggleButton.classList.toggle('active');
});

// Close the menu when clicking on any link
document.querySelectorAll('.header__item').forEach(item => {
  item.addEventListener('click', () => {
    navContainer.classList.remove('active');
    toggleButton.classList.remove('active');
  });
});

// Testimonial Slider
const testimDots = Array.from(document.querySelectorAll('#testim-dots .dot'));
const testimContent = Array.from(document.querySelectorAll('#testim-content > div'));
const testimLeftArrow = document.querySelector('#left-arrow');
const testimRightArrow = document.querySelector('#right-arrow');
let currentSlide = 0;
let testimSpeed = 4500;
let testimTimer;

function playSlide(slideIndex) {
  testimContent.forEach((content, index) => {
    content.classList.remove('active');
    content.style.opacity = '0';
    testimDots[index].classList.remove('active');
  });

  testimContent[slideIndex].classList.add('active');
  testimContent[slideIndex].style.opacity = '1';
  testimDots[slideIndex].classList.add('active');
  currentSlide = slideIndex;

  clearTimeout(testimTimer);
  testimTimer = setTimeout(() => {
    nextSlide();
  }, testimSpeed);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimContent.length;
  playSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + testimContent.length) % testimContent.length;
  playSlide(currentSlide);
}

testimLeftArrow.addEventListener('click', prevSlide);
testimRightArrow.addEventListener('click', nextSlide);

testimDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    playSlide(index);
  });
});

playSlide(currentSlide);
