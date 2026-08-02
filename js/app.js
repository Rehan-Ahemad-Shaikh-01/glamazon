/**
 * Glamazon Salon - Main Application Bootstrap Module
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Render Catalog Items dynamically from catalog-data.js
    if (typeof renderCatalogItems === 'function') {
        renderCatalogItems();
    }

    // 2. Initialize Scroll Zoom Observer for Editorial Imagery
    if (typeof initScrollZoomObserver === 'function') {
        initScrollZoomObserver();
    }

    // 3. Initialize Scroll Reveal Observer for Section Animations
    if (typeof initScrollRevealObserver === 'function') {
        initScrollRevealObserver();
    }

    // 4. Initialize Live Availability Ticker in Sticky Bottom Nav
    updateStickyNavTicker();
    window.addEventListener('glamazon-state-changed', updateStickyNavTicker);
});

function updateStickyNavTicker() {
    const ticker = document.getElementById('stickyAvailabilityTicker');
    if (ticker && window.GlamazonStore) {
        const chairs = window.GlamazonStore.getChairs();
        const freeCount = chairs.filter(c => c.status === 'available').length;
        ticker.innerText = `14:00 | ${freeCount} CHAIR${freeCount === 1 ? '' : 'S'} FREE`;
    }
}
