/**
 * Glamazon Salon - Manager Operations Dashboard Logic
 */

// 4 Chairs State with Authentic Indian Stylist Names
let CHAIRS_DATA = [
    { id: 1, name: "Chair 01", status: "occupied", service: "Hair Botox Ritual", stylist: "Ananya Sharma", timeRemaining: "45 MIN" },
    { id: 2, name: "Chair 02", status: "occupied", service: "Precision Cut & Beard", stylist: "Rohan Verma", timeRemaining: "20 MIN" },
    { id: 3, name: "Chair 03", status: "available", service: "—", stylist: "Priya Patel", timeRemaining: "READY" },
    { id: 4, name: "Chair 04", status: "occupied", service: "Nanoplastia Organic", stylist: "Vikram Malhotra", timeRemaining: "60 MIN" }
];

const STYLISTS_LIST = [
    { name: "Ananya Sharma", title: "Master Colorist", assignedChair: "Chair 01" },
    { name: "Rohan Verma", title: "Hair Sculptor", assignedChair: "Chair 02" },
    { name: "Priya Patel", title: "Skin Specialist", assignedChair: "Chair 03" },
    { name: "Vikram Malhotra", title: "Senior Barber & Patch Specialist", assignedChair: "Chair 04" }
];

const UPCOMING_BOOKINGS = [
    { id: "BK-8891", name: "Sunita Rao", service: "Hair Botox Treatment", chair: "Chair 01", stylist: "Ananya Sharma", time: "14:00 PM (Today)", phone: "+91 98765 12345", status: "CONFIRMED" },
    { id: "BK-8892", name: "Rajesh Kumar", service: "Men's Hair Patch System", chair: "Chair 04", stylist: "Vikram Malhotra", time: "15:30 PM (Today)", phone: "+91 98123 45678", status: "CONFIRMED" },
    { id: "BK-8893", name: "Kavita Kapoor", service: "O3+ Skin Whitening Facial", chair: "Chair 03", stylist: "Priya Patel", time: "16:30 PM (Today)", phone: "+91 99887 76655", status: "CONFIRMED" },
    { id: "BK-8894", name: "Amit Shah", service: "Architectural Cut & Beard", chair: "Chair 02", stylist: "Rohan Verma", time: "17:30 PM (Today)", phone: "+91 97112 23344", status: "PENDING" }
];

// Initialize Dashboard on Load
document.addEventListener('DOMContentLoaded', () => {
    renderChairsGrid();
    updateUtilizationMetrics();
    renderStylistSchedule();
    renderUpcomingBookings();
});

// View Switcher (3-Screen Prototype Strategy)
function switchTab(viewName, btn) {
    document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-gold', 'text-gold', 'bg-gold/10');
        b.classList.add('border-transparent', 'text-taupe');
    });

    const targetView = document.getElementById(viewName);
    if (targetView) targetView.classList.remove('hidden');

    if (btn) {
        btn.classList.remove('border-transparent', 'text-taupe');
        btn.classList.add('border-gold', 'text-gold', 'bg-gold/10');
    }
}

// Render 4 Chair Grid Cards
function renderChairsGrid() {
    const grid = document.getElementById('chairsGrid');
    if (!grid) return;

    grid.innerHTML = CHAIRS_DATA.map(chair => {
        let statusClass = "chair-available";
        let statusBadge = `<span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-extrabold uppercase rounded-xs">AVAILABLE</span>`;
        
        if (chair.status === 'occupied') {
            statusClass = "chair-occupied";
            statusBadge = `<span class="px-2 py-0.5 bg-red-500/20 text-red-400 text-[8px] font-extrabold uppercase rounded-xs">BUSY — ${chair.timeRemaining}</span>`;
        } else if (chair.status === 'cleaning') {
            statusClass = "chair-cleaning";
            statusBadge = `<span class="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[8px] font-extrabold uppercase rounded-xs">SANIZING</span>`;
        }

        return `
            <div class="chair-card p-4 rounded-sm flex flex-col justify-between ${statusClass}">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <span class="text-[9px] font-sans font-bold text-taupe uppercase block">${chair.name}</span>
                        <h4 class="font-serif text-lg italic text-cream">${chair.stylist}</h4>
                    </div>
                    ${statusBadge}
                </div>
                <div class="space-y-1 mb-3 text-xs font-sans">
                    <div class="text-taupe text-[10px] uppercase">Service: <span class="text-cream font-medium">${chair.service}</span></div>
                </div>
                <div>
                    ${chair.status === 'available' 
                        ? `<button onclick="assignWalkIn(${chair.id})" class="w-full py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[9px] font-sans font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all">ASSIGN WALK-IN —</button>`
                        : `<button onclick="releaseChair(${chair.id})" class="w-full py-2 bg-white/5 border border-white/10 text-taupe text-[9px] font-sans font-bold uppercase hover:border-gold hover:text-cream transition-all">RELEASE CHAIR —</button>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

// Update Daily Analytics & Utilization Rate (4 Chairs Total)
function updateUtilizationMetrics() {
    const totalChairs = CHAIRS_DATA.length; // 4 chairs
    const occupiedChairs = CHAIRS_DATA.filter(c => c.status === 'occupied').length;
    const freeChairs = CHAIRS_DATA.filter(c => c.status === 'available').length;
    const utilizationRate = Math.round((occupiedChairs / totalChairs) * 100);

    const occCountEl = document.getElementById('occupiedCount');
    const freeCountEl = document.getElementById('freeCount');
    const utilGaugeEl = document.getElementById('utilizationGauge');
    const utilTextEl = document.getElementById('utilizationText');
    const yieldSensorEl = document.getElementById('yieldSensorAlert');

    if (occCountEl) occCountEl.innerText = `${occupiedChairs} CHAIRS`;
    if (freeCountEl) freeCountEl.innerText = `${freeChairs} FREE`;
    if (utilGaugeEl) utilGaugeEl.innerText = `${utilizationRate}%`;
    if (utilTextEl) utilTextEl.innerText = `Chairs are ${utilizationRate}% booked right now.`;

    // Trigger Yield Alert if Occupancy Drops Below 30%
    if (yieldSensorEl) {
        if (utilizationRate <= 30 || freeChairs >= 3) {
            yieldSensorEl.classList.remove('hidden');
        } else {
            yieldSensorEl.classList.add('hidden');
        }
    }
}

// Assign Walk-in Client to Available Chair
function assignWalkIn(chairId) {
    const chair = CHAIRS_DATA.find(c => c.id === chairId);
    if (chair) {
        chair.status = 'occupied';
        chair.service = 'Walk-in Haircut & Styling';
        chair.timeRemaining = '45 MIN';
        renderChairsGrid();
        updateUtilizationMetrics();
    }
}

// Release Occupied Chair
function releaseChair(chairId) {
    const chair = CHAIRS_DATA.find(c => c.id === chairId);
    if (chair) {
        chair.status = 'available';
        chair.service = '—';
        chair.timeRemaining = 'READY';
        renderChairsGrid();
        updateUtilizationMetrics();
    }
}

// Render Upcoming Bookings List
function renderUpcomingBookings() {
    const container = document.getElementById('upcomingBookingsContainer');
    if (!container) return;

    container.innerHTML = UPCOMING_BOOKINGS.map(b => `
        <div class="p-4 bg-[#181818] border border-white/10 rounded-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-gold/40 transition-colors">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold font-serif italic text-base">
                    ${b.name.charAt(0)}
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <h5 class="font-serif italic text-cream text-lg">${b.name}</h5>
                        <span class="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-gold">${b.id}</span>
                    </div>
                    <p class="text-xs text-taupe font-sans">${b.service} — <span class="text-gold font-medium">${b.stylist}</span></p>
                </div>
            </div>
            <div class="flex items-center justify-between md:justify-end gap-6 text-xs font-sans">
                <div class="text-right">
                    <span class="block text-cream font-bold">${b.time}</span>
                    <span class="text-[10px] text-taupe uppercase">${b.chair} • ${b.phone}</span>
                </div>
                <span class="px-3 py-1 ${b.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'} text-[9px] font-extrabold uppercase rounded-xs">
                    ${b.status}
                </span>
            </div>
        </div>
    `).join('');
}

// Simulate Yield Marketing WhatsApp/SMS Dispatch
function sendFlashBroadcast() {
    const discount = document.getElementById('flashDiscountSelect') ? document.getElementById('flashDiscountSelect').value : '20%';
    const messageContent = document.getElementById('customFlashMessage') ? document.getElementById('customFlashMessage').value : `Flash Deal at Glamazon Salon! ${discount} off all haircuts & spa slots from 2 PM to 5 PM today only.`;
    
    const phonePopup = document.getElementById('phoneMockupModal');
    const phoneMsgBody = document.getElementById('phoneMessageBody');
    const statusBanner = document.getElementById('dispatchStatusBanner');

    if (phoneMsgBody) {
        phoneMsgBody.innerText = messageContent;
    }

    if (statusBanner) {
        statusBanner.classList.remove('hidden');
        statusBanner.innerHTML = `<i class="ph ph-check-circle text-lg inline-block mr-2"></i> BROADCAST DISPATCHED TO 148 DORMANT CLIENTS! (${discount} DISCOUNT ACTIVE)`;
    }

    if (phonePopup) {
        phonePopup.classList.remove('hidden');
    }
}

// Render 4 Master Stylists Schedule Matrix
function renderStylistSchedule() {
    const container = document.getElementById('stylistScheduleContainer');
    if (!container) return;

    container.innerHTML = STYLISTS_LIST.map(s => `
        <div class="p-4 bg-[#161616] border border-white/10 rounded-sm">
            <div class="flex justify-between items-center mb-2">
                <h5 class="font-serif italic text-cream text-base">${s.name}</h5>
                <span class="text-[9px] font-sans font-bold text-gold uppercase">${s.title}</span>
            </div>
            <div class="text-[10px] text-taupe font-sans mb-3">Assigned: ${s.assignedChair}</div>
            <div class="grid grid-cols-4 gap-1 text-[9px] font-sans">
                <div class="p-1 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-center">14:00 (FREE)</div>
                <div class="p-1 bg-red-950/40 border border-red-500/40 text-cream text-center">15:00 (BUSY)</div>
                <div class="p-1 bg-red-950/40 border border-red-500/40 text-cream text-center">16:00 (BUSY)</div>
                <div class="p-1 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-center">17:00 (FREE)</div>
            </div>
        </div>
    `).join('');
}
