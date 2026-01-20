// ========== NAVIGATION ========== 
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(current)) {
            link.classList.add('active');
        }
    });

    // Header scroll effect
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== STATUS BADGE (Open/Closed) ========== 
function updateStatus() {
    const statusBadge = document.getElementById('statusBadge');
    const statusText = statusBadge.querySelector('.status-text');
    
    // ==========================================
    // 🔧 EMERGENCY MANUAL OVERRIDE
    // ==========================================
    // Para mag-show ng "CLOSED" - i-set to TRUE
    // Para bumalik sa "OPEN NOW" - i-set to FALSE
    const EMERGENCY_CLOSED = false;
    // ==========================================
    
    if (EMERGENCY_CLOSED) {
        // EMERGENCY MODE: Force CLOSED status
        statusBadge.classList.add('closed');
        statusText.textContent = 'Temporarily Closed';
    } else {
        // NORMAL MODE: Always OPEN (24/7 operation)
        statusBadge.classList.remove('closed');
        statusText.textContent = 'Open Now';
    }
    
    // ==========================================
    // OPTIONAL: Time-based schedule (currently disabled)
    // ==========================================
    // Uncomment below kung gusto mo may specific hours
    /*
    const now = new Date();
    const hours = now.getHours();
    const isOpen = hours >= 8 && hours < 24; // 8 AM to 12 AM
    
    if (isOpen) {
        statusBadge.classList.remove('closed');
        statusText.textContent = 'Open Now';
    } else {
        statusBadge.classList.add('closed');
        statusText.textContent = 'Closed';
    }
    */
}

// Update status on load and every minute
updateStatus();
setInterval(updateStatus, 60000);


// ========== GALLERY LIGHTBOX ========== 
const galleryImages = [
    'br1.jpg',
    'br3.jpg',
    'br4.jpg',
    'br5.jpg',
    'br6.jpg',
    'br7.jpg'
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = galleryImages[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = galleryImages[currentImageIndex];
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    }
});

// Close lightbox when clicking outside image
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });
}

// ========== FAQ ACCORDION ========== 
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const allItems = document.querySelectorAll('.faq-item');
    
    // Close all other items
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
}

// ========== CONTACT FORM - FORMSUBMIT INTEGRATION ========== 
// REMOVED: e.preventDefault() - Let FormSubmit handle the submission
// The form will now submit directly to FormSubmit API

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Basic client-side validation only
        // Do NOT preventDefault - let form submit naturally
        
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If validation fails, prevent submission
        if (!isValid) {
            e.preventDefault();
        }
        // If valid, form will submit to FormSubmit naturally (no preventDefault)
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// ========== SCROLL TO TOP BUTTON ========== 
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SMOOTH SCROLL FOR ALL LINKS ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Header height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMATE ON SCROLL ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and other animated elements
document.querySelectorAll('[data-aos]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========== OPERATING HOURS DISPLAY ========== 
function updateOperatingHours() {
    const hoursElement = document.getElementById('operatingHours');
    if (hoursElement) {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
        
        // Same hours for all days in this example
        hoursElement.innerHTML = `We are open 24/7 to serve you anytime`;
    }
}

updateOperatingHours();

// ========== PREVENT FORM RESUBMISSION ========== 
window.addEventListener('beforeunload', () => {
    const formSuccess = document.getElementById('formSuccess');
    if (formSuccess) {
        formSuccess.style.display = 'none';
    }
});

// ========== LOADING ANIMATION ========== 
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== CONSOLE MESSAGE ========== 
console.log('%c🔥 BARAX CAFE 🔥', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Barax Cafe! Visit us for the best gaming experience.', 'color: #ffa500; font-size: 14px;');