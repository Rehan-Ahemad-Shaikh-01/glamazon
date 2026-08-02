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
    } else {
        if (errorMsg) errorMsg.classList.remove('hidden');
    }
}

function triggerFlashOffer() {
    const alertBanner = document.getElementById('flashOfferSuccess');
    if (alertBanner) {
        alertBanner.classList.remove('hidden');
    }
}
