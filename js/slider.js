// Slider functionality

// Products Slider - Infinite Circular Carousel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Slider.js loaded');
    
    const originalCards = Array.from(document.querySelectorAll('.product-card'));
    
    if (originalCards.length === 0) {
        console.log('No product cards found');
        return;
    }
    
    console.log('Found', originalCards.length, 'original product cards');
    
    // Clone entire set 3 times for infinite effect
    const container = document.querySelector('.products-container');
    const allLinks = Array.from(container.querySelectorAll('.product-card-link'));
    
    // Clone the entire set 2 more times (so we have 3 complete sets)
    for (let i = 0; i < 2; i++) {
        allLinks.forEach(link => {
            const clone = link.cloneNode(true);
            container.appendChild(clone);
        });
    }
    
    // Get all cards including clones
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    console.log('Total cards after cloning:', productCards.length);
    
    // Start from middle set (כורסת עיסוי in second set)
    let currentIndex = originalCards.length + 1;
    
    function showCards() {
        const total = productCards.length;
        
        productCards.forEach((card, i) => {
            // Remove all classes
            card.classList.remove('center', 'side', 'far');
            
            // Force reflow to ensure CSS updates
            void card.offsetWidth;
            
            // Check if this is the center card
            if (i === currentIndex) {
                card.classList.add('center');
                console.log('Center card index:', i, '- Name:', card.querySelector('h3').textContent);
            } 
            // Check if this is next card (right side)
            else if (i === (currentIndex + 1) % total) {
                card.classList.add('side');
            }
            // Check if this is previous card (left side)
            else if (i === (currentIndex - 1 + total) % total) {
                card.classList.add('side');
            }
            // All other cards are far
            else {
                card.classList.add('far');
            }
        });
        
        // Force browser to recalculate styles
        document.body.offsetHeight;
    }
    
    function nextCard() {
        currentIndex = (currentIndex + 1) % productCards.length;
        console.log('Moving to index:', currentIndex);
        showCards();
    }
    
    // Initialize - force immediate display
    console.log('Initializing carousel...');
    setTimeout(() => {
        showCards();
        console.log('Initial display set');
    }, 0);
    
    // Auto-rotate every 2 seconds
    let autoRotateInterval = setInterval(nextCard, 2000);
    
    // Manual swipe/drag functionality
    let startX = 0;
    let isDragging = false;
    
    function prevCard() {
        currentIndex = (currentIndex - 1 + productCards.length) % productCards.length;
        console.log('Moving to index:', currentIndex);
        showCards();
    }
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        clearInterval(autoRotateInterval);
    });
    
    container.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextCard(); // Swipe left - next
            } else {
                prevCard(); // Swipe right - previous
            }
        }
        
        // Restart auto-rotation after 3 seconds
        setTimeout(() => {
            autoRotateInterval = setInterval(nextCard, 2000);
        }, 3000);
    });
    
    // Mouse events for desktop
    container.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        clearInterval(autoRotateInterval);
        container.style.cursor = 'grabbing';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    container.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum drag distance
            if (diff > 0) {
                nextCard(); // Drag left - next
            } else {
                prevCard(); // Drag right - previous
            }
        }
        
        isDragging = false;
        container.style.cursor = 'grab';
        
        // Restart auto-rotation after 3 seconds
        setTimeout(() => {
            autoRotateInterval = setInterval(nextCard, 2000);
        }, 3000);
    });
    
    container.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = 'grab';
        }
    });
    
    // Set initial cursor
    container.style.cursor = 'grab';
    
    console.log('Carousel initialized with manual controls');
    
    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
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
