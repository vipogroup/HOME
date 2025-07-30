// Slider functionality

// Products Slider
document.addEventListener('DOMContentLoaded', function() {
    // Products slider
    const productsContainer = document.querySelector('.products-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (productsContainer && prevBtn && nextBtn) {
        // Get all product cards
        const productCards = document.querySelectorAll('.product-card');
        let cardWidth = 0;
        let scrollPosition = 0;
        let autoScrollInterval;
        
        // Calculate card width including margin
        if (productCards.length > 0) {
            const cardStyle = window.getComputedStyle(productCards[0]);
            cardWidth = productCards[0].offsetWidth + parseInt(cardStyle.marginRight);
        }
        
        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            scrollPosition = Math.max(scrollPosition - cardWidth, 0);
            productsContainer.scroll({
                left: scrollPosition,
                behavior: 'smooth'
            });
            resetAutoScroll();
        });
        
        // Next button click handler
        nextBtn.addEventListener('click', () => {
            scrollPosition = Math.min(scrollPosition + cardWidth, productsContainer.scrollWidth - productsContainer.clientWidth);
            productsContainer.scroll({
                left: scrollPosition,
                behavior: 'smooth'
            });
            resetAutoScroll();
        });
        
        // Auto-scroll functionality
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (scrollPosition >= productsContainer.scrollWidth - productsContainer.clientWidth) {
                    scrollPosition = 0;
                } else {
                    scrollPosition += cardWidth;
                }
                
                productsContainer.scroll({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }, 5000); // Auto-scroll every 5 seconds
        }
        
        // Reset auto-scroll timer after user interaction
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }
        
        // Start auto-scroll on page load
        startAutoScroll();
        
        // Stop auto-scroll when user interacts with the slider
        productsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        // Resume auto-scroll when user stops interacting
        productsContainer.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
        
        // Update card width on window resize
        window.addEventListener('resize', () => {
            if (productCards.length > 0) {
                const cardStyle = window.getComputedStyle(productCards[0]);
                cardWidth = productCards[0].offsetWidth + parseInt(cardStyle.marginRight);
            }
        });
    }
    
    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let testimonialInterval;
    
    function showSlide(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'flex';
            dots[index].classList.add('active');
        }
    }
    
    // Initialize testimonials slider
    if (testimonialCards.length > 0 && dots.length > 0) {
        // Show first slide by default
        showSlide(0);
        
        // Add click event to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
                currentSlide = slideIndex;
                resetTestimonialInterval();
            });
        });
        
        // Auto-rotate testimonials
        function startTestimonialInterval() {
            testimonialInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
                showSlide(currentSlide);
            }, 6000); // Change testimonial every 6 seconds
        }
        
        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        }
        
        // Start auto-rotation
        startTestimonialInterval();
    }
});
