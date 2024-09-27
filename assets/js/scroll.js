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
          behavior: 'smooth' 
        });
      };