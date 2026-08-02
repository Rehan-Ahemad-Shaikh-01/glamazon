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
});
