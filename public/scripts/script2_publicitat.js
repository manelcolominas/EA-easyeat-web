// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .problem-card, .how-step, .feature-card, .reward-card, .quote-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add stagger delay to grid items
const addStaggerDelay = (selector, baseDelay = 100) => {
    document.querySelectorAll(selector).forEach((el, index) => {
        el.style.transitionDelay = `${index * baseDelay}ms`;
    });
};

addStaggerDelay('.problem-card', 150);
addStaggerDelay('.how-step', 200);
addStaggerDelay('.feature-card', 150);
addStaggerDelay('.reward-card', 120);
addStaggerDelay('.quote-card', 150);
addStaggerDelay('.stat-card', 200);

// Change logo color based on background
const navLogo = document.querySelector('.nav-logo');
const darkSections = document.querySelectorAll('.revelation, .features, .results, .final-cta, footer');

const logoObserverOptions = {
    threshold: 0.1,
    rootMargin: '-50px 0px -90% 0px' // Adjust rootMargin to trigger when the section is near the top
};

const logoObserver = new IntersectionObserver((entries) => {
    let isDarkSectionVisible = false;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            isDarkSectionVisible = true;
        }
    });

    if (isDarkSectionVisible) {
        navLogo.classList.add('white-text');
    } else {
        // Check if we are currently in any dark section
        let inDark = false;
        darkSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Simple check if the top of the viewport is within the section (considering nav height)
            if (rect.top <= 50 && rect.bottom >= 50) {
                inDark = true;
            }
        });
        if (!inDark) {
            navLogo.classList.remove('white-text');
        }
    }
}, logoObserverOptions);

darkSections.forEach(section => {
    logoObserver.observe(section);
});

// Fallback scroll event listener for more precise control if IntersectionObserver is tricky with fixed headers
window.addEventListener('scroll', () => {
    let inDark = false;
    const navHeight = document.querySelector('nav').offsetHeight || 60;
    const checkPoint = navHeight / 2; // Check point near the top of the screen

    darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= checkPoint && rect.bottom >= checkPoint) {
            inDark = true;
        }
    });

    if (inDark) {
        navLogo.classList.add('white-text');
    } else {
        navLogo.classList.remove('white-text');
    }
});
