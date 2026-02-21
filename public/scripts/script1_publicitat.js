// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .problem-card, .solution-step, .reward-card, .quote-card, .stat-card').forEach(el => {
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
addStaggerDelay('.solution-step', 200);
addStaggerDelay('.reward-card', 120);
addStaggerDelay('.quote-card', 150);
addStaggerDelay('.stat-card', 200);