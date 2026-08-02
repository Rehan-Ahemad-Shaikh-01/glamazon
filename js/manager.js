/**
 * Glamazon Salon - Manager Operations & Auth Module
 */

function toggleManagerModal(show) {
    const modal = document.getElementById('managerModal');
    const backdrop = document.getElementById('managerBackdrop');
    if (!modal || !backdrop) return;

    if (show) {
        modal.classList.remove('pointer-events-none');
        modal.classList.add('modal-active');
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('pointer-events-none');
        modal.classList.remove('modal-active');
        backdrop.classList.add('opacity-0');
        backdrop.classList.remove('opacity-100');
        document.body.style.overflow = 'auto';
    }
}

function verifyManagerPin() {
    const pinInput = document.getElementById('managerPin');
    const pin = pinInput ? pinInput.value : '';
    const authBox = document.getElementById('managerAuthStep');
    const dashboardBox = document.getElementById('managerDashboardStep');
    const errorMsg = document.getElementById('pinError');

    if (pin === '1234' || pin.length >= 4) {
        if (errorMsg) errorMsg.classList.add('hidden');
        if (authBox) authBox.classList.add('hidden');
        if (dashboardBox) dashboardBox.classList.remove('hidden');
        renderManagerModalChairs();
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
}

function renderManagerModalChairs() {
    const container = document.getElementById('managerChairsContainer');
    const badgeEl = document.getElementById('managerOccupancyBadge');
    if (!container || !window.GlamazonStore) return;

    const chairs = window.GlamazonStore.getChairs();
    const occupied = chairs.filter(c => c.status === 'occupied').length;
    const free = chairs.filter(c => c.status === 'available').length;

    if (badgeEl) {
        badgeEl.innerText = `${occupied} OCCUPIED / ${free} FREE`;
    }

    container.innerHTML = chairs.map(c => `
        <div class="p-3 ${c.status === 'occupied' ? 'bg-red-950/40 border border-red-500/40' : 'bg-emerald-950/40 border border-emerald-500/50 shadow-md shadow-emerald-500/10'} text-center rounded-sm">
            <span class="text-[9px] font-sans ${c.status === 'occupied' ? 'text-red-400' : 'text-emerald-400'} block uppercase font-bold">${c.name}</span>
            <span class="text-xs ${c.status === 'occupied' ? 'text-cream' : 'text-emerald-300 font-bold'} font-serif italic">${c.status === 'occupied' ? c.service : 'AVAILABLE NOW'}</span>
        </div>
    `).join('');
}

function triggerFlashOffer() {
    const alertBanner = document.getElementById('flashOfferSuccess');
    if (alertBanner) {
        alertBanner.classList.remove('hidden');
    }

    if (window.GlamazonStore) {
        window.GlamazonStore.saveFlash({
            active: true,
            discount: "20%",
            message: "Afternoon Flash Deal: 20% off all haircuts & spa slots between 2 PM to 5 PM today"
        });
    }
}

// Subscribe to store updates for manager drawer
window.addEventListener('glamazon-state-changed', () => {
    renderManagerModalChairs();
});
