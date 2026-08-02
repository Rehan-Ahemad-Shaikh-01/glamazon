/**
 * Glamazon Salon - Catalog Renderer & Expandable Before/After Drawer Module
 */

function renderCatalogItems() {
    const container = document.getElementById('catalogList');
    if (!container || typeof CATALOG_SERVICES === 'undefined') return;

    container.innerHTML = CATALOG_SERVICES.map(item => `
        <div class="catalog-item border-b border-white/5" data-category="${item.category}" id="item-card-${item.id}">
            <!-- MAIN TREATMENT ROW HEADER (CLICK TO TOGGLE EXPAND) -->
            <div onclick="toggleTreatmentExpand('${item.id}')" class="px-6 md:px-16 py-6 flex justify-between items-center group hover:bg-slate/60 transition-all cursor-pointer">
                <div class="flex flex-col gap-1">
                    <div class="flex flex-wrap items-center gap-3">
                        <span class="text-lg md:text-xl font-serif italic text-cream group-hover:text-gold transition-colors">${item.title}</span>
                        <span class="text-[9px] font-sans font-bold tracking-widest text-gold/90 px-2 py-0.5 bg-gold/10 border border-gold/30 rounded-xs uppercase">[ TAP TO SEE RESULTS ]</span>
                    </div>
                    <span class="text-[9px] font-sans font-bold tracking-widest text-taupe uppercase">${item.categoryTag}</span>
                </div>
                <div class="flex items-center gap-6 text-right">
                    <div>
                        <div class="text-gold font-serif text-xl italic">${item.price}</div>
                        <div class="text-[9px] font-sans font-bold tracking-widest text-taupe uppercase">${item.duration}</div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:border-gold group-hover:bg-gold/20 transition-all">
                        <i class="ph ph-caret-down text-base transition-transform duration-300" id="caret-${item.id}"></i>
                    </div>
                </div>
            </div>

            <!-- EXPANDABLE BEFORE & AFTER SHOWCASE DRAWER -->
            <div id="drawer-${item.id}" class="hidden px-6 md:px-16 py-8 bg-[#141414] border-t border-gold/20 transition-all duration-500">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl">
                    <!-- BEFORE & AFTER IMAGE -->
                    <div class="relative group overflow-hidden border border-gold/40 shadow-2xl rounded-sm gold-border-glow">
                        <div class="absolute top-3 left-3 z-20 px-3 py-1 bg-black/80 backdrop-blur text-gold font-sans font-extrabold text-[9px] tracking-widest uppercase border border-gold/40 shadow-md">
                            BEFORE & AFTER TRANSFORMATION
                        </div>
                        <img src="${item.beforeAfterImage}" alt="${item.title} Before and After" class="w-full h-auto object-cover rounded-xs transition-transform duration-700 group-hover:scale-105">
                    </div>

                    <!-- DETAILS & BOOKING CTA -->
                    <div class="space-y-5">
                        <span class="text-[9px] font-sans font-bold tracking-[0.3em] text-gold uppercase block">CLIENT RESULT SHOWCASE</span>
                        <h4 class="font-serif text-2xl md:text-3xl italic text-cream leading-tight">${item.title}</h4>
                        <p class="text-xs text-taupe font-sans leading-relaxed">${item.description}</p>
                        
                        <div class="pt-4 flex flex-wrap gap-4 items-center">
                            <button onclick="toggleModal(true, '${item.category}')" class="btn-gold-static px-8 py-3.5 text-[10px] tracking-[0.3em] font-sans font-black uppercase rounded-none shadow-lg">
                                BOOK THIS RITUAL
                            </button>
                            <button onclick="toggleTreatmentExpand('${item.id}')" class="px-6 py-3.5 border border-white/10 text-taupe hover:text-cream text-[10px] tracking-widest font-sans font-bold uppercase transition-all cursor-pointer">
                                CLOSE PREVIEW ✕
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleTreatmentExpand(itemId) {
    const drawer = document.getElementById(`drawer-${itemId}`);
    const caret = document.getElementById(`caret-${itemId}`);
    if (!drawer) return;

    const isHidden = drawer.classList.contains('hidden');

    // Close all other open drawers for smooth accordion behavior
    document.querySelectorAll('[id^="drawer-"]').forEach(d => {
        if (d.id !== `drawer-${itemId}`) d.classList.add('hidden');
    });
    document.querySelectorAll('[id^="caret-"]').forEach(c => {
        c.classList.remove('rotate-180');
    });

    if (isHidden) {
        drawer.classList.remove('hidden');
        if (caret) caret.classList.add('rotate-180');
    } else {
        drawer.classList.add('hidden');
        if (caret) caret.classList.remove('rotate-180');
    }
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
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
