/**
 * Glamazon Salon - Motion & Scroll Interactions Module
 */

function initScrollZoomObserver() {
    window.addEventListener('scroll', function() {
        const img = document.getElementById('scrollZoomImg');
        if (img) {
            const rect = img.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
                const scale = 1 + (scrollPercent * 0.12);
                img.style.transform = `scale(${scale})`;
            }
        }
    });
}

function initScrollRevealObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
        observer.observe(el);
    });
}
