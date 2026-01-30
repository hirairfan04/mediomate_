// ===========================
// Mobile Menu Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (navbar) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===========================
// Animated Counter for Stats
// ===========================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // ~60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    updateCounter();
}

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            
            const customOffset = anchor.dataset.offset || 5;
            const offsetTop = target.offsetTop - customOffset;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                // const offsetTop = target.offsetTop - 10;
                // window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// // ===========================
// // Contact Form Submission
// // ===========================
// const contactForm = document.querySelector('.contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', e => {
//         e.preventDefault();
//         alert('Thank you for your message! We will get back to you soon.');
//         contactForm.reset();
//     });
// }


// ===========================
// Contact Form Submission with Web3Forms
// ===========================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('access_key', '6e6ea91d-8156-48b7-b109-1a7e1a3f4903'); // Get from web3forms.com
        formData.append('name', contactForm.querySelector('input[type="text"]').value);
        formData.append('email', contactForm.querySelector('input[type="email"]').value);
        formData.append('subject', contactForm.querySelectorAll('input[type="text"]')[1].value);
        formData.append('message', contactForm.querySelector('textarea').value);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showAlert(); // Show custom alert box
                contactForm.reset(); // Reset form fields
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        }
    });
}

function showAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.classList.add('show');
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.classList.remove('show');
}

// ===========================
// CTA Buttons Scroll
// ===========================
document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', e => {
        if (!button.closest('form')) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 5;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    });
});

// View Work button
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            const offsetTop = portfolioSection.offsetTop - 10;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ===========================
// Service Card Hover Effect
// ===========================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Portfolio Item Click
// ===========================
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Portfolio item clicked');
    });
});

// ===========================
// Parallax Effect for Hero Section
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===========================
// Highlight Active Nav Link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightNavigation);

// ===========================
// Play Button Click
// ===========================
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        alert('Video player would open here. Integrate with YouTube, Vimeo, or custom player.');
    });
}

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Lazy Loading for Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Ripple Effect on Buttons
// ===========================
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', e => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===========================
// Console Branding
// ===========================
console.log('%c🎬 Mediomate', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cProfessional Video Editing & Digital Services', 'font-size: 14px; color: #6b7280;');
console.log('%cWebsite by Mediomate Development Team', 'font-size: 12px; color: #9ca3af;');


// ===========================
// Typewriter Effect
// ===========================
function initTypewriter() {
    const element = document.querySelector('.typewriter');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    const speed = 60; // typing speed in ms

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 800);
}

// Initialize on load
window.addEventListener('load', initTypewriter);

// Scroll to section if hash exists in URL
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
});