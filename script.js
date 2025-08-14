// Personal Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Profile Image Handler
    initializeProfileImage();
    
    // Smooth Scrolling
    initializeSmoothScroll();
    
    // Video Placeholder
    initializeVideoPlaceholder();
    
    // Dynamic Year in Footer
    updateCopyrightYear();
    
    // Lazy Loading for Images
    initializeLazyLoading();
    
    // Print Optimization
    initializePrintOptimization();
});

/**
 * Initialize profile image with fallback to placeholder
 */
function initializeProfileImage() {
    const profileImg = document.getElementById('profileImage');
    const placeholder = document.querySelector('.profile-pic-placeholder');
    
    if (profileImg) {
        // Try to load the actual profile image
        profileImg.onload = function() {
            profileImg.style.display = 'block';
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        };
        
        profileImg.onerror = function() {
            // If image fails to load, show placeholder
            profileImg.style.display = 'none';
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        };
        
        // Set the source - replace with your actual image path
        // profileImg.src = 'profile.jpg';
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize video placeholder
 * Now configured to load your VisibleBits.mov video
 */
function initializeVideoPlaceholder() {
    const videoContainer = document.getElementById('visiblebits-video');
    
    if (videoContainer) {
        // Load your VisibleBits.mov video
        videoContainer.innerHTML = `
            <video width="100%" height="auto" controls preload="metadata">
                <source src="VisibleBits.mov" type="video/quicktime">
                <source src="VisibleBits.mov" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        
        // Add some styling to make the video look better
        const video = videoContainer.querySelector('video');
        if (video) {
            video.style.borderRadius = '4px';
            video.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }
    }
}

/**
 * Update copyright year dynamically
 */
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Initialize print optimization
 */
function initializePrintOptimization() {
    // Add print-specific class to body when printing
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

/**
 * Utility function to handle external link warnings (optional)
 */
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Add rel="noopener" for security if not present
        if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Optional: Add visual indicator for external links
        if (!link.querySelector('.external-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-icon';
            icon.innerHTML = ' ↗';
            link.appendChild(icon);
        }
    });
}

/**
 * Add navigation highlighting based on scroll position
 */
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Update navigation if you add a navigation menu
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Form validation (if you add a contact form later)
 */
function validateContactForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.trim() === '') {
        errors.name = 'Name is required';
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Valid email is required';
    }
    
    if (!formData.message || formData.message.trim() === '') {
        errors.message = 'Message is required';
    }
    
    return errors;
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Analytics tracking (if needed)
 */
function trackEvent(category, action, label) {
    // Implement Google Analytics or other tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Export functions for potential use in other scripts
window.siteUtils = {
    validateContactForm,
    isValidEmail,
    trackEvent,
    handleExternalLinks
};