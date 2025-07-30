// Main JavaScript File

// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const accordionButtons = document.querySelectorAll('.accordion-button');
const copyLinkBtn = document.getElementById('copy-link-btn');
const referralLink = document.getElementById('referral-link');
const copyTooltip = document.querySelector('.copy-tooltip');
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const declineCookiesBtn = document.getElementById('declineCookies');
const videoEmbed = document.querySelector('.video-embed');
// האלמנטים הבאים הוסרו מהדף והוחלפו בתג וידאו ישיר
// const videoPlaceholder = document.querySelector('.video-placeholder');
// const playButton = document.querySelector('.play-button');

// Mobile Menu Toggle
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Accordion functionality
accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle active class on the clicked button
        button.classList.toggle('active');
        
        // Close all other accordion items
        accordionButtons.forEach(otherButton => {
            if (otherButton !== button && otherButton.classList.contains('active')) {
                otherButton.classList.remove('active');
                otherButton.nextElementSibling.style.maxHeight = '0';
            }
        });
        
        // Toggle content visibility
        const content = button.nextElementSibling;
        if (button.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    });
});

// Copy referral link functionality
if (copyLinkBtn && referralLink) {
    copyLinkBtn.addEventListener('click', () => {
        referralLink.select();
        referralLink.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            // Copy the text to clipboard
            document.execCommand('copy');
            // Or use the newer API if available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(referralLink.value);
            }
            
            // Show tooltip
            copyTooltip.classList.add('show');
            
            // Hide tooltip after 2 seconds
            setTimeout(() => {
                copyTooltip.classList.remove('show');
            }, 2000);
            
            // Track copy event for analytics
            if (typeof gtag === 'function') {
                gtag('event', 'copy_referral_link', {
                    'event_category': 'engagement',
                    'event_label': 'referral link copied'
                });
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
}

// Video player functionality - עודכן למבנה החדש עם תג video
const videoElement = document.querySelector('.video-embed video');
if (videoElement) {
    videoElement.addEventListener('play', () => {
        // Track video play event for analytics
        if (typeof gtag === 'function') {
            gtag('event', 'play_video', {
                'event_category': 'engagement',
                'event_label': 'explanation video played'
            });
        }
    });
}

// Cookie consent functionality
function showCookieConsent() {
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
}

if (cookieConsent && acceptCookiesBtn && declineCookiesBtn) {
    // Show cookie consent
    showCookieConsent();
    
    // Accept cookies
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        
        // Enable analytics if accepted
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    });
    
    // Decline cookies
    declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        
        // Disable analytics if declined
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    });
}

// Scroll animation for elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.step, .audience-card, .info-box, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        }
    });
});

// Track CTA clicks for analytics
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (typeof gtag === 'function') {
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': this.textContent.trim()
            });
        }
    });
});

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    // Open first FAQ item by default
    if (accordionButtons.length > 0) {
        accordionButtons[0].click();
    }
    
    // Set up demo referral metrics (for display purposes)
    const friendsCount = document.getElementById('friends-count');
    const earnings = document.getElementById('earnings');
    const meterProgress = document.querySelector('.meter-progress');
    
    if (friendsCount && earnings && meterProgress) {
        // Simulate referral data (would come from backend in real app)
        const demoFriends = 3;
        const demoEarnings = demoFriends * 150;
        const progressPercent = Math.min((demoFriends / 10) * 100, 100);
        
        // Update UI with demo data
        friendsCount.textContent = demoFriends;
        earnings.textContent = demoEarnings;
        meterProgress.style.width = progressPercent + '%';
    }
});
