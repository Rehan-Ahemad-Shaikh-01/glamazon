/**
 * Glamazon Salon - Catalog Renderer & Filtering Module
 */

function renderCatalogItems() {
    const container = document.getElementById('catalogList');
    if (!container || typeof CATALOG_SERVICES === 'undefined') return;

    container.innerHTML = CATALOG_SERVICES.map(item => `
        <div onclick="toggleModal(true, '${item.category}')" class="catalog-item px-6 md:px-16 py-6 border-b border-white/5 flex justify-between items-center group hover:bg-slate transition-colors cursor-pointer" data-category="${item.category}">
            <div class="flex flex-col gap-1">
                <span class="text-lg md:text-xl font-serif italic text-cream group-hover:text-gold transition-colors">${item.title}</span>
                <span class="text-[9px] font-sans font-bold tracking-widest text-taupe uppercase">${item.categoryTag}</span>
            </div>
            <div class="text-right">
                <div class="text-gold font-serif text-xl italic">${item.price}</div>
                <div class="text-[9px] font-sans font-bold tracking-widest text-taupe uppercase">${item.duration}</div>
            </div>
        </div>
    `).join('');
}

function filterCatalog(category, btn) {
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(b => {
        b.classList.remove('border-gold', 'text-gold');
        b.classList.add('border-transparent', 'text-taupe');
    });
    
    if (btn) {
        btn.classList.remove('border-transparent', 'text-taupe');
        btn.classList.add('border-gold', 'text-gold');
    }

    const items = document.querySelectorAll('.catalog-item');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}
