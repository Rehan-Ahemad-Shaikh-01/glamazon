/**
 * Glamazon Salon - Interactive Booking Modal Module with Full Validation & Persistence
 */

let selectedCategory = "WOMEN'S HAIR";
let selectedStylist = "Ananya Sharma";
let selectedSlot = "02:00 PM";

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

        // Clear previous success or error states
        const successBox = document.getElementById('bookingSuccess');
        const errorBox = document.getElementById('bookingErrorMsg');
        if (successBox) successBox.classList.add('hidden');
        if (errorBox) errorBox.classList.add('hidden');

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
    selectedCategory = btn.textContent.trim();
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
    if (activeName) {
        activeName.className = 'stylist-name block text-[#000000] text-sm font-serif italic font-extrabold';
        selectedStylist = activeName.textContent.trim();
    }
    if (activeTitle) activeTitle.className = 'stylist-title text-[9px] font-sans text-[#000000] uppercase font-black';
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
    selectedSlot = btn.textContent.replace('⚡', '').trim();
}

function confirmBooking() {
    const custNameEl = document.getElementById('custName');
    const custPhoneEl = document.getElementById('custPhone');
    const errorBox = document.getElementById('bookingErrorMsg');
    const successBox = document.getElementById('bookingSuccess');

    let isValid = true;

    if (custNameEl) custNameEl.classList.remove('input-error');
    if (custPhoneEl) custPhoneEl.classList.remove('input-error');
    if (errorBox) errorBox.classList.add('hidden');

    const custName = custNameEl ? custNameEl.value.trim() : '';
    const custPhone = custPhoneEl ? custPhoneEl.value.trim() : '';

    if (!custName) {
        if (custNameEl) custNameEl.classList.add('input-error');
        isValid = false;
    }
    if (!custPhone || custPhone.length < 7) {
        if (custPhoneEl) custPhoneEl.classList.add('input-error');
        isValid = false;
    }

    if (!isValid) {
        if (errorBox) {
            errorBox.classList.remove('hidden');
            errorBox.innerText = 'PLEASE PROVIDE BOTH FULL NAME AND VALID PHONE NUMBER TO CONFIRM YOUR PASS.';
        }
        return;
    }

    // Determine available chair
    const chairs = window.GlamazonStore ? window.GlamazonStore.getChairs() : [];
    const freeChair = chairs.find(c => c.status === 'available');
    const assignedChair = freeChair ? freeChair.name : 'Chair 03';

    // Generate dynamic pass ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passId = `BK-${randomNum}`;

    const newBooking = {
        id: passId,
        name: custName,
        phone: custPhone,
        service: `${selectedCategory} Ritual`,
        stylist: selectedStylist,
        chair: assignedChair,
        time: `${selectedSlot} (Today)`,
        status: 'CONFIRMED',
        timestamp: Date.now()
    };

    if (window.GlamazonStore) {
        window.GlamazonStore.addBooking(newBooking);
    }

    // Populate Dynamic Success Pass DOM
    if (successBox) {
        successBox.innerHTML = `
            <i class="ph ph-check-circle text-5xl text-gold mb-3 inline-block animate-bounce"></i>
            <h4 class="font-serif text-3xl italic text-cream mb-1">Pass Confirmed, ${custName}!</h4>
            <p class="text-xs text-taupe font-sans mb-4">Your digital booking pass has been generated. Confirmation sent via WhatsApp to ${custPhone}.</p>
            <div class="p-4 bg-obsidian border border-gold/40 inline-block text-left font-mono text-[11px] text-gold space-y-1.5 rounded-sm shadow-inner w-full max-w-sm">
                <div class="flex justify-between border-b border-gold/20 pb-1">
                    <span class="text-taupe">PASS ID:</span>
                    <span class="font-bold text-cream">#GLAM-2026-${randomNum}</span>
                </div>
                <div class="flex justify-between border-b border-gold/20 pb-1">
                    <span class="text-taupe">RITUAL:</span>
                    <span class="font-bold text-cream">${selectedCategory}</span>
                </div>
                <div class="flex justify-between border-b border-gold/20 pb-1">
                    <span class="text-taupe">MASTER STYLIST:</span>
                    <span class="font-bold text-cream">${selectedStylist}</span>
                </div>
                <div class="flex justify-between border-b border-gold/20 pb-1">
                    <span class="text-taupe">ASSIGNED CHAIR:</span>
                    <span class="font-bold text-gold">${assignedChair} (READY)</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-taupe">SLOT TIME:</span>
                    <span class="font-bold text-cream">TODAY @ ${selectedSlot}</span>
                </div>
            </div>
            <div class="mt-6">
                <button onclick="resetBookingForm()" class="px-6 py-2.5 bg-gold/15 border border-gold text-gold hover:bg-gold hover:text-black font-sans text-[10px] tracking-widest font-extrabold uppercase transition-all rounded-xs">
                    BOOK ANOTHER RITUAL
                </button>
            </div>
        `;
        successBox.classList.remove('hidden');
    }
}

function resetBookingForm() {
    const successBox = document.getElementById('bookingSuccess');
    const custNameEl = document.getElementById('custName');
    const custPhoneEl = document.getElementById('custPhone');
    if (successBox) successBox.classList.add('hidden');
    if (custNameEl) custNameEl.value = '';
    if (custPhoneEl) custPhoneEl.value = '';
}
