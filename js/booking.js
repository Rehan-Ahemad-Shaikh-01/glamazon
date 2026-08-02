/**
 * Glamazon Salon - Interactive Booking Modal Module
 */

function toggleModal(show, targetCategory) {
    const modal = document.getElementById('bookingModal');
    const backdrop = document.getElementById('modalBackdrop');
    if (!modal || !backdrop) return;

    if (show) {
        modal.classList.remove('pointer-events-none');
        modal.classList.add('modal-active');
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';

        if (targetCategory) {
            const categoryButtons = document.querySelectorAll('.booking-cat-btn');
            categoryButtons.forEach(btn => {
                const btnText = btn.textContent.toLowerCase();
                if ((targetCategory === 'women-hair' && btnText.includes('women')) ||
                    (targetCategory === 'facials' && btnText.includes('skin')) ||
                    (targetCategory === 'men' && btnText.includes('men')) ||
                    (targetCategory === 'waxing' && btnText.includes('waxing')) ||
                    (targetCategory === 'body-nails' && btnText.includes('bridal'))) {
                    selectBookingCat(btn);
                }
            });
        }
    } else {
        modal.classList.add('pointer-events-none');
        modal.classList.remove('modal-active');
        backdrop.classList.add('opacity-0');
        backdrop.classList.remove('opacity-100');
        document.body.style.overflow = 'auto';
    }
}

function selectBookingCat(btn) {
    document.querySelectorAll('.booking-cat-btn').forEach(b => {
        b.className = 'booking-cat-btn py-3.5 px-3 text-[10px] font-sans font-semibold uppercase tracking-widest transition-all rounded-sm item-unselected';
    });
    btn.className = 'booking-cat-btn py-3.5 px-3 text-[10px] font-sans font-black uppercase tracking-widest transition-all rounded-sm item-selected';
}

function selectStylist(btn) {
    document.querySelectorAll('.stylist-btn').forEach(b => {
        b.className = 'stylist-btn p-4 text-left transition-all rounded-sm item-unselected';
        const nameEl = b.querySelector('.stylist-name');
        const titleEl = b.querySelector('.stylist-title');
        if (nameEl) nameEl.className = 'stylist-name block text-cream text-sm font-serif italic';
        if (titleEl) titleEl.className = 'stylist-title text-[9px] font-sans text-taupe uppercase';
    });

    btn.className = 'stylist-btn p-4 text-left transition-all rounded-sm item-selected';
    const activeName = btn.querySelector('.stylist-name');
    const activeTitle = btn.querySelector('.stylist-title');
    if (activeName) activeName.className = 'stylist-name block text-[#0F0F0F] text-sm font-serif italic font-extrabold';
    if (activeTitle) activeTitle.className = 'stylist-title text-[9px] font-sans text-[#0F0F0F] uppercase font-black';
}

function selectSlot(btn) {
    document.querySelectorAll('.slot-btn').forEach(b => {
        if (b.classList.contains('flash-slot')) {
            b.className = 'slot-btn flash-slot py-3 text-xs font-sans font-bold transition-all rounded-sm flash-unselected';
        } else {
            b.className = 'slot-btn py-3 text-xs font-sans transition-all rounded-sm item-unselected';
        }
    });
    btn.className = 'slot-btn py-3 text-xs font-sans font-black transition-all rounded-sm item-selected';
}

function confirmBooking() {
    const successBox = document.getElementById('bookingSuccess');
    if (successBox) {
        successBox.classList.remove('hidden');
    }
}
