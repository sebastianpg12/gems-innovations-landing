
const testimDots = Array.from(document.querySelectorAll('#testim-dots .dot')); // Dots
const testimContent = Array.from(document.querySelectorAll('#testim-content > div')); // Testimonials
const testimLeftArrow = document.querySelector('#left-arrow');
const testimRightArrow = document.querySelector('#right-arrow');
let currentSlide = 0; // Start with the first testimonial
let testimSpeed = 4500; // Slide interval speed
let testimTimer;

// Function to update the active slide
function playSlide(slideIndex) {
  // Reset all active classes
  testimContent.forEach((content, index) => {
    content.classList.remove('active');
    content.style.opacity = '0'; // Ensure all testimonials are hidden
    testimDots[index].classList.remove('active');
  });

  // Set the active class for the current slide
  testimContent[slideIndex].classList.add('active');
  testimContent[slideIndex].style.opacity = '1'; // Show the active testimonial
  testimDots[slideIndex].classList.add('active');

  // Update the current slide index
  currentSlide = slideIndex;

  // Reset the timer
  clearTimeout(testimTimer);
  testimTimer = setTimeout(() => {
    nextSlide();
  }, testimSpeed);
}

// Function to go to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % testimContent.length;
  playSlide(currentSlide);
}

// Function to go to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + testimContent.length) % testimContent.length;
  playSlide(currentSlide);
}

// Event listeners for arrows
testimLeftArrow.addEventListener('click', prevSlide);
testimRightArrow.addEventListener('click', nextSlide);

// Event listeners for dots
testimDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    playSlide(index);
  });
});

// Start the slider
playSlide(currentSlide);

