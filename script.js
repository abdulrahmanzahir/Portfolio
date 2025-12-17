/**
 * ORIGINAL PORTFOLIO - JAVASCRIPT
 * Author: Abdulrahman Zahir
 * Description: Interactive features and GSAP animations
 */

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initTypingEffect();
    initBackToTop();
    initSmoothScroll();
    initCursorEffect();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        console.log('Mobile menu initialized');
        
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Menu button clicked');
            console.log('Current active state:', navMenu.classList.contains('active'));
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                console.log('Menu closed');
            } else {
                mobileToggle.classList.add('active');
                navMenu.classList.add('active');
                console.log('Menu opened');
            }
        });
        
        // Close menu when clicking on links
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                console.log('Menu closed via link click');
            });
        });
    } else {
        console.error('Mobile menu elements not found!');
        console.log('mobileToggle:', mobileToggle);
        console.log('navMenu:', navMenu);
    }
    
    // Highlight active section in nav
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// ===== GSAP SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // About Section Animations
    gsap.from('.about-image-wrapper', {
        scrollTrigger: {
            trigger: '.section-about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        duration: 1,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.section-about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Info cards stagger
    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.about-info-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    });
    
    // Skills Section - Different animation for each card
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((card, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: direction,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Projects Section - Flip animation
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            rotationY: 90,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power2.out'
        });
    });
    
    // Experience Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Marker animation
        gsap.from(item.querySelector('.timeline-marker'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(2)',
            delay: 0.3
        });
    });
    
    // Education Card
    gsap.from('.education-card', {
        scrollTrigger: {
            trigger: '.section-education',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        scale: 0.5,
        opacity: 0,
        rotation: -10,
        duration: 1,
        ease: 'back.out(1.7)'
    });
    
    // Certificates - Wave animation
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
        
        // Icon rotation
        gsap.from(card.querySelector('.certificate-icon'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            rotation: 360,
            scale: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: index * 0.1 + 0.2
        });
    });
    
    // Contact Section
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach((method, index) => {
        gsap.from(method, {
            scrollTrigger: {
                trigger: method,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    gsap.from('.contact-social .social-icon', {
        scrollTrigger: {
            trigger: '.contact-social',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        gsap.from(header.querySelector('.section-label'), {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(2)'
        });
        
        gsap.from(header.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
    });
    
    // Parallax effect for gradient orbs
    gsap.to('.orb-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        rotation: 90
    });
    
    gsap.to('.orb-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        rotation: -90
    });
    
    gsap.to('.orb-3', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        x: -100,
        rotation: 45
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-code');
    
    if (!typingElement) return;
    
    const codeSnippet = `# AI/ML Engineer

import coffee
from brain import ideas

while coffee.level > 0:
    ideas.generate()
    bugs.fix()
    models.train()
    
if success:
    print("Let's build something cool!")
else:
    coffee.refill()`;
    
    let index = 0;
    const speed = 30;
    
    function type() {
        if (index < codeSnippet.length) {
            typingElement.textContent += codeSnippet.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CURSOR EFFECT (Optional Enhancement) =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.classList.add('custom-cursor');
    cursorDot.classList.add('custom-cursor-dot');
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth cursor follow
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursor.style.borderColor = 'var(--primary-400)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.borderColor = 'var(--text-tertiary)';
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== EASTER EGG: KONAMI CODE =====
function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create a fun animation or effect
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, var(--primary-500), var(--accent-color));
        color: white;
        padding: 2rem 4rem;
        border-radius: 1rem;
        font-size: 2rem;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(message);
    
    gsap.to(message, {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        onComplete: () => {
            setTimeout(() => {
                gsap.to(message, {
                    scale: 0,
                    duration: 0.3,
                    onComplete: () => message.remove()
                });
            }, 2000);
        }
    });
}

// Initialize easter egg
initEasterEgg();

// ===== CONSOLE MESSAGE =====
console.log(`
%c🚀 Welcome to Abdulrahman's Portfolio! 🚀

%cBuilt with passion using:
- Vanilla JavaScript
- GSAP for smooth animations
- Modern CSS with custom properties
- Semantic HTML5

%cInterested in the code? Let's connect!
📧 abdulrahman.hosamaddin@gmail.com
💼 https://linkedin.com/in/abdulrahmanzahir

`,
    'font-size: 20px; font-weight: bold; color: #3b82f6;',
    'font-size: 14px; color: #6b7280;',
    'font-size: 14px; color: #10b981; font-weight: bold;'
);

// ===== FLUID SHADER EFFECT FOR HERO SECTION =====
function initCursorEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    // Create canvas for fluid effect
    const canvas = document.createElement('canvas');
    canvas.className = 'fluid-canvas';
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = heroSection.offsetWidth;
    let height = canvas.height = heroSection.offsetHeight;
    
    // Fluid simulation particles
    const particles = [];
    const mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    let lastMouse = { x: width / 2, y: height / 2 };
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            radius: Math.random() * 100 + 50,
            hue: Math.random() * 60 + 180, // Blue to cyan range
            opacity: Math.random() * 0.3 + 0.1
        });
    }
    
    // Mouse tracking with velocity
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        
        mouse.vx = (newX - lastMouse.x) * 0.5;
        mouse.vy = (newY - lastMouse.y) * 0.5;
        mouse.x = newX;
        mouse.y = newY;
        
        lastMouse.x = newX;
        lastMouse.y = newY;
    });
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(10, 15, 26, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        particles.forEach((particle, index) => {
            // Calculate distance from mouse
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Apply mouse force
            if (dist < 200) {
                const force = (200 - dist) / 200;
                particle.vx += (dx / dist) * force * 2;
                particle.vy += (dy / dist) * force * 2;
            }
            
            // Apply velocity and friction
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            
            // Boundary wrapping
            if (particle.x < -particle.radius) particle.x = width + particle.radius;
            if (particle.x > width + particle.radius) particle.x = -particle.radius;
            if (particle.y < -particle.radius) particle.y = height + particle.radius;
            if (particle.y > height + particle.radius) particle.y = -particle.radius;
            
            // Draw particle with gradient
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`);
            gradient.addColorStop(0.5, `hsla(${particle.hue + 20}, 70%, 50%, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(
                particle.x - particle.radius,
                particle.y - particle.radius,
                particle.radius * 2,
                particle.radius * 2
            );
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
    });
}
