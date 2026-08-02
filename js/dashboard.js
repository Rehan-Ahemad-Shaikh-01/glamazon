/**
 * Glamazon Salon - Manager Operations Dashboard Logic with Dynamic State Sync
 */

const STYLISTS_LIST = [
    { name: "Ananya Sharma", title: "Master Colorist", assignedChair: "Chair 01" },
    { name: "Rohan Verma", title: "Hair Sculptor", assignedChair: "Chair 02" },
    { name: "Priya Patel", title: "Skin Specialist", assignedChair: "Chair 03" },
    { name: "Vikram Malhotra", title: "Senior Barber & Patch Specialist", assignedChair: "Chair 04" }
];

// Initialize Dashboard on Load & Subscribe to State Events
document.addEventListener('DOMContentLoaded', () => {
    refreshDashboardView();
    initFlashMarketingEngine();

    window.addEventListener('glamazon-state-changed', () => {
        refreshDashboardView();
        renderTemplatesSelect();
        renderContactsTable();
    });
});

function refreshDashboardView() {
    renderChairsGrid();
    updateUtilizationMetrics();
    renderStylistSchedule();
    renderUpcomingBookings();
}

/* ========================================================================= */
/* FLASH MARKETING & AUTOMATED WHATSAPP MESSENGER ENGINE ENGINE LOGIC      */
/* ========================================================================= */

// Global State for Contacts Selection & Campaign Dispatch Queue
let selectedContactIds = new Set();
let currentQueue = [];
let currentQueueIndex = 0;
let queueSessionLogs = [];

// Initialize Flash Marketing Module
function initFlashMarketingEngine() {
    // Select all initial contacts by default
    if (window.GlamazonStore) {
        const contacts = window.GlamazonStore.getContacts();
        selectedContactIds = new Set(contacts.map(c => c.id));
    }
    
    renderTemplatesSelect();
    renderContactsTable();
    setupCSVDragAndDrop();
    updateLivePreview();
}

// Render Template Selector Dropdown
function renderTemplatesSelect() {
    const select = document.getElementById('templateSelect');
    if (!select || !window.GlamazonStore) return;

    const templates = window.GlamazonStore.getTemplates();
    select.innerHTML = templates.map(t => `
        <option value="${t.id}">${t.title}</option>
    `).join('');

    if (templates.length > 0) {
        onTemplateChange();
    }
}

// Handle Template Switch Event
function onTemplateChange() {
    const select = document.getElementById('templateSelect');
    const msgTextarea = document.getElementById('customFlashMessage');
    const discountSelect = document.getElementById('flashDiscountSelect');

    if (!select || !msgTextarea || !window.GlamazonStore) return;

    const templates = window.GlamazonStore.getTemplates();
    const selectedTemplate = templates.find(t => t.id === select.value);

    if (selectedTemplate) {
        msgTextarea.value = selectedTemplate.body;
        if (discountSelect && selectedTemplate.discount) {
            discountSelect.value = selectedTemplate.discount;
        }
        updateLivePreview();
    }
}

// Insert Dynamic Placeholder Tags ({name}, {discount}, {salon_name}) at Cursor
function insertTag(tagStr) {
    const textarea = document.getElementById('customFlashMessage');
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, startPos);
    const textAfter = textarea.value.substring(endPos, textarea.value.length);

    textarea.value = textBefore + tagStr + textAfter;
    textarea.selectionStart = startPos + tagStr.length;
    textarea.selectionEnd = startPos + tagStr.length;
    textarea.focus();

    updateLivePreview();
}

// Update Phone Mockup Live Preview
function updateLivePreview() {
    const msgTextarea = document.getElementById('customFlashMessage');
    const discountSelect = document.getElementById('flashDiscountSelect');
    const salonInput = document.getElementById('salonNameTag');
    const phoneBody = document.getElementById('phoneMessageBody');
    const targetNameEl = document.getElementById('previewTargetName');
    const salonHeaderEl = document.getElementById('previewSalonHeader');

    if (!msgTextarea || !phoneBody) return;

    const rawTemplate = msgTextarea.value || "";
    const discountVal = discountSelect ? discountSelect.value : "20%";
    const salonVal = salonInput ? salonInput.value : "Glamazon Salon";

    // Get first selected contact for preview or sample fallback
    let previewName = "Sunita Rao";
    if (window.GlamazonStore) {
        const contacts = window.GlamazonStore.getContacts();
        const selected = contacts.find(c => selectedContactIds.has(c.id));
        if (selected) previewName = selected.name;
    }

    // Substitute Dynamic Tokens
    let formattedMsg = rawTemplate
        .replace(/\{name\}/g, previewName)
        .replace(/\{discount\}/g, discountVal)
        .replace(/\{salon_name\}/g, salonVal);

    phoneBody.innerText = formattedMsg;
    if (targetNameEl) targetNameEl.innerText = previewName;
    if (salonHeaderEl) salonHeaderEl.innerText = salonVal.toUpperCase();
}

// Render Client Contacts Table with Search & Filters
function renderContactsTable() {
    const tbody = document.getElementById('contactsTableBody');
    const searchInput = document.getElementById('contactSearchInput');
    const tagFilter = document.getElementById('contactTagFilter');
    if (!tbody || !window.GlamazonStore) return;

    const allContacts = window.GlamazonStore.getContacts();
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedTag = tagFilter ? tagFilter.value : 'ALL';

    const filteredContacts = allContacts.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm) || c.phone.includes(searchTerm);
        const matchesTag = (selectedTag === 'ALL') || (c.tag === selectedTag);
        return matchesSearch && matchesTag;
    });

    if (filteredContacts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-taupe">No client contacts found matching filter.</td></tr>`;
        updateSelectionCounters(0, allContacts.length);
        return;
    }

    tbody.innerHTML = filteredContacts.map(c => {
        const isChecked = selectedContactIds.has(c.id);
        let tagClass = "tag-regular";
        if (c.tag === "VIP Client") tagClass = "tag-vip";
        else if (c.tag === "Dormant") tagClass = "tag-dormant";
        else if (c.tag === "Imported" || c.source === "CSV Upload") tagClass = "tag-imported";

        return `
            <tr class="hover:bg-white/5">
                <td class="p-4 text-center">
                    <input type="checkbox" onchange="toggleContactSelection('${c.id}', this)" ${isChecked ? 'checked' : ''} class="accent-gold w-4 h-4 cursor-pointer">
                </td>
                <td class="p-4 font-medium text-cream flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif italic text-xs">
                        ${c.name.charAt(0)}
                    </div>
                    ${c.name}
                </td>
                <td class="p-4 font-mono text-gold">${c.phone}</td>
                <td class="p-4"><span class="tag-badge ${tagClass}">${c.tag}</span></td>
                <td class="p-4 text-taupe text-[10px] uppercase font-mono">${c.source}</td>
                <td class="p-4 text-right">
                    <button onclick="deleteContactItem('${c.id}')" class="text-taupe hover:text-red-400 p-1 transition-colors" title="Delete Contact">
                        <i class="ph ph-trash text-base"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Sync select-all checkbox
    const selectAllCb = document.getElementById('selectAllCheckbox');
    if (selectAllCb) {
        const allFilteredSelected = filteredContacts.every(c => selectedContactIds.has(c.id));
        selectAllCb.checked = filteredContacts.length > 0 && allFilteredSelected;
    }

    updateSelectionCounters(filteredContacts.length, allContacts.length);
}

// Toggle Selection for Single Contact Row
function toggleContactSelection(contactId, checkbox) {
    if (checkbox.checked) {
        selectedContactIds.add(contactId);
    } else {
        selectedContactIds.delete(contactId);
    }
    renderContactsTable();
    updateLivePreview();
}

// Toggle Select All Contacts
function toggleSelectAllContacts(selectAllCheckbox) {
    if (!window.GlamazonStore) return;
    const allContacts = window.GlamazonStore.getContacts();

    if (selectAllCheckbox.checked) {
        allContacts.forEach(c => selectedContactIds.add(c.id));
    } else {
        selectedContactIds.clear();
    }
    renderContactsTable();
    updateLivePreview();
}

// Update Counters in Header and Toolbar
function updateSelectionCounters(filteredCount, totalCount) {
    const selectedCount = selectedContactIds.size;
    
    const targetBadge = document.getElementById('targetContactCountBadge');
    const selectedText = document.getElementById('selectedCountText');
    const tableStats = document.getElementById('tableSelectionStats');

    if (targetBadge) targetBadge.innerText = `${selectedCount} CLIENTS TARGETED`;
    if (selectedText) selectedText.innerText = `${selectedCount} Contacts`;
    if (tableStats) tableStats.innerText = `${selectedCount} / ${totalCount} SELECTED`;
}

// Delete Single Contact Item
function deleteContactItem(contactId) {
    if (window.GlamazonStore) {
        window.GlamazonStore.deleteContact(contactId);
        selectedContactIds.delete(contactId);
    }
}

/* ========================================================================= */
/* CSV FILE IMPORT & PARSING                                                 */
/* ========================================================================= */

function setupCSVDragAndDrop() {
    const dropzone = document.getElementById('csvDropzone');
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            processCSVFile(files[0]);
        }
    });
}

function handleCSVFileSelect(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
        processCSVFile(files[0]);
    }
}

function processCSVFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        parseAndImportCSV(text);
    };
    reader.readAsText(file);
}

// Robust Client-Side CSV Parser
function parseAndImportCSV(text) {
    const lines = text.split(/\r\n|\n/);
    const parsedContacts = [];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Split by comma or tab
        const parts = trimmed.split(/,|\t/).map(p => p.trim().replace(/^["']|["']$/g, ''));
        
        // Skip header lines like Name, Phone, Tag
        if (parts[0].toLowerCase() === 'name' || parts[0].toLowerCase() === 'client name') return;

        if (parts.length >= 2) {
            const name = parts[0];
            let phone = parts[1];
            const tag = parts[2] || 'Imported';

            // Clean & sanitize phone number
            if (phone) {
                if (!phone.startsWith('+')) {
                    phone = '+91 ' + phone.replace(/[^0-9]/g, '');
                }
                parsedContacts.push({ name, phone, tag });
            }
        } else if (parts.length === 1 && parts[0].length >= 8) {
            // Single raw phone number per line fallback
            let phone = parts[0];
            if (!phone.startsWith('+')) phone = '+91 ' + phone.replace(/[^0-9]/g, '');
            parsedContacts.push({ name: 'Client ' + phone.slice(-4), phone, tag: 'Imported' });
        }
    });

    if (parsedContacts.length > 0 && window.GlamazonStore) {
        const addedCount = window.GlamazonStore.importContacts(parsedContacts);
        
        // Auto-select imported contacts
        const allContacts = window.GlamazonStore.getContacts();
        allContacts.forEach(c => selectedContactIds.add(c.id));

        renderContactsTable();
        updateLivePreview();

        alert(`Successfully imported ${addedCount} client contacts from CSV!`);
    } else {
        alert("Could not parse contacts from CSV file. Please format rows as: Name, Phone, Tag");
    }
}

/* ========================================================================= */
/* MODALS: ADD CONTACT & ADD TEMPLATE MODAL HANDLERS                         */
/* ========================================================================= */

function openAddContactModal() {
    document.getElementById('addContactModal').classList.remove('hidden');
}

function closeAddContactModal() {
    document.getElementById('addContactModal').classList.add('hidden');
}

function handleManualContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('newContactName').value;
    const phone = document.getElementById('newContactPhone').value;
    const tag = document.getElementById('newContactTag').value;

    if (window.GlamazonStore) {
        const newContact = window.GlamazonStore.addContact({ name, phone, tag });
        selectedContactIds.add(newContact.id);
        renderContactsTable();
        updateLivePreview();
    }
    closeAddContactModal();
}

function openAddTemplateModal() {
    document.getElementById('addTemplateModal').classList.remove('hidden');
}

function closeAddTemplateModal() {
    document.getElementById('addTemplateModal').classList.add('hidden');
}

function handleCustomTemplateSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('newTemplateTitle').value;
    const discount = document.getElementById('newTemplateDiscount').value;
    const body = document.getElementById('newTemplateBody').value;

    if (window.GlamazonStore) {
        const newTpl = window.GlamazonStore.addTemplate({ title, discount, body });
        renderTemplatesSelect();
        
        const select = document.getElementById('templateSelect');
        if (select) {
            select.value = newTpl.id;
            onTemplateChange();
        }
    }
    closeAddTemplateModal();
}

/* ========================================================================= */
/* AUTOMATED WHATSAPP BROADCAST QUEUE DISPATCH RUNNER                        */
/* ========================================================================= */

function launchCampaignQueue() {
    if (!window.GlamazonStore) return;

    const contacts = window.GlamazonStore.getContacts();
    currentQueue = contacts.filter(c => selectedContactIds.has(c.id));

    if (currentQueue.length === 0) {
        alert("Please select at least one contact from the directory table before launching broadcast.");
        return;
    }

    currentQueueIndex = 0;
    queueSessionLogs = [];

    document.getElementById('broadcastQueueModal').classList.remove('hidden');
    renderQueueStep();
}

function renderQueueStep() {
    if (currentQueueIndex >= currentQueue.length) {
        // Queue Completed State
        document.getElementById('queueStepCounter').innerText = `${currentQueue.length} / ${currentQueue.length}`;
        document.getElementById('queueProgressPercent').innerText = `100%`;
        document.getElementById('queueProgressBar').style.width = `100%`;

        document.getElementById('queueTargetName').innerText = "Campaign Broadcast Complete!";
        document.getElementById('queueTargetPhone').innerText = `Finished processing all ${currentQueue.length} target contacts.`;
        document.getElementById('queueTargetInitial').innerText = "✓";
        document.getElementById('queueTargetTag').innerText = "COMPLETED";

        document.getElementById('queueMessagePreview').innerText = "All campaign messages have been stepped through and dispatched to target clients.";
        document.getElementById('queueCurrentStatus').innerText = "FINISHED";
        document.getElementById('queueCurrentStatus').className = "text-emerald-400 font-bold";

        const btn = document.getElementById('whatsappDeepLinkBtn');
        if (btn) {
            btn.innerHTML = `<i class="ph ph-check-circle text-lg"></i> CAMPAIGN COMPLETE (CLOSE)`;
            btn.onclick = closeBroadcastModal;
            btn.href = "#";
        }
        return;
    }

    const currentContact = currentQueue[currentQueueIndex];
    const totalCount = currentQueue.length;
    const stepNum = currentQueueIndex + 1;
    const progressPercent = Math.round((stepNum / totalCount) * 100);

    // Update Progress
    document.getElementById('queueStepCounter').innerText = `${stepNum} / ${totalCount}`;
    document.getElementById('queueProgressPercent').innerText = `${progressPercent}%`;
    document.getElementById('queueProgressBar').style.width = `${progressPercent}%`;

    // Recipient Details
    document.getElementById('queueTargetName').innerText = currentContact.name;
    document.getElementById('queueTargetPhone').innerText = currentContact.phone;
    document.getElementById('queueTargetInitial').innerText = currentContact.name.charAt(0);
    
    const tagBadge = document.getElementById('queueTargetTag');
    if (tagBadge) {
        tagBadge.innerText = currentContact.tag;
        tagBadge.className = "tag-badge " + (currentContact.tag === 'VIP Client' ? 'tag-vip' : currentContact.tag === 'Dormant' ? 'tag-dormant' : 'tag-regular');
    }

    // Format Personalized Text
    const rawTemplate = document.getElementById('customFlashMessage') ? document.getElementById('customFlashMessage').value : "";
    const discountVal = document.getElementById('flashDiscountSelect') ? document.getElementById('flashDiscountSelect').value : "20%";
    const salonVal = document.getElementById('salonNameTag') ? document.getElementById('salonNameTag').value : "Glamazon Salon";

    const personalizedMsg = rawTemplate
        .replace(/\{name\}/g, currentContact.name)
        .replace(/\{discount\}/g, discountVal)
        .replace(/\{salon_name\}/g, salonVal);

    document.getElementById('queueMessagePreview').innerText = personalizedMsg;
    document.getElementById('queueCurrentStatus').innerText = "READY TO SEND";
    document.getElementById('queueCurrentStatus').className = "text-amber-400 font-bold";

    // Format WhatsApp Link
    const cleanPhone = currentContact.phone.replace(/[^0-9]/g, '');
    const waDeepLink = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(personalizedMsg)}`;

    const btn = document.getElementById('whatsappDeepLinkBtn');
    if (btn) {
        btn.innerHTML = `<i class="ph ph-whatsapp-logo text-lg"></i> ⚡ SEND VIA WHATSAPP`;
        btn.href = waDeepLink;
        btn.onclick = () => {
            markCurrentQueueSent();
        };
    }
}

function markCurrentQueueSent() {
    if (currentQueueIndex < currentQueue.length) {
        const contact = currentQueue[currentQueueIndex];
        logQueueAction(`[SENT] Message dispatched to ${contact.name} (${contact.phone})`);
    }
    advanceQueueStep(false);
}

function advanceQueueStep(skipped = false) {
    if (skipped && currentQueueIndex < currentQueue.length) {
        const contact = currentQueue[currentQueueIndex];
        logQueueAction(`[SKIPPED] ${contact.name} skipped by operator`);
    }

    currentQueueIndex++;
    renderQueueStep();
}

function logQueueAction(messageStr) {
    const logBox = document.getElementById('queueSessionLog');
    queueSessionLogs.unshift(messageStr);

    if (logBox) {
        logBox.innerHTML = queueSessionLogs.map(l => `<div>${l}</div>`).join('');
    }
}

function closeBroadcastModal() {
    document.getElementById('broadcastQueueModal').classList.add('hidden');
}

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

// Render Chair Grid Cards from Store
function renderChairsGrid() {
    const grid = document.getElementById('chairsGrid');
    if (!grid || !window.GlamazonStore) return;

    const chairsData = window.GlamazonStore.getChairs();

    grid.innerHTML = chairsData.map(chair => {
        let statusClass = "chair-available";
        let statusBadge = `<span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-extrabold uppercase rounded-xs">AVAILABLE</span>`;
        
        if (chair.status === 'occupied') {
            statusClass = "chair-occupied";
            statusBadge = `<span class="px-2 py-0.5 bg-red-500/20 text-red-400 text-[8px] font-extrabold uppercase rounded-xs">BUSY (${chair.timeRemaining})</span>`;
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
                        ? `<button onclick="assignWalkIn(${chair.id})" class="w-full py-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[9px] font-sans font-bold uppercase hover:bg-emerald-500 hover:text-black transition-all">ASSIGN WALK-IN</button>`
                        : `<button onclick="releaseChair(${chair.id})" class="w-full py-2 bg-white/5 border border-white/10 text-taupe text-[9px] font-sans font-bold uppercase hover:border-gold hover:text-cream transition-all">RELEASE CHAIR</button>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

// Update Daily Analytics & Utilization Metrics
function updateUtilizationMetrics() {
    if (!window.GlamazonStore) return;
    const chairs = window.GlamazonStore.getChairs();
    const totalChairs = chairs.length;
    const occupiedChairs = chairs.filter(c => c.status === 'occupied').length;
    const freeChairs = chairs.filter(c => c.status === 'available').length;
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

    // Trigger Yield Alert if Occupancy Drops Below 50%
    if (yieldSensorEl) {
        if (utilizationRate <= 50 || freeChairs >= 2) {
            yieldSensorEl.classList.remove('hidden');
        } else {
            yieldSensorEl.classList.add('hidden');
        }
    }
}

// Assign Walk-in Client to Chair
function assignWalkIn(chairId) {
    if (window.GlamazonStore) {
        window.GlamazonStore.assignWalkIn(chairId);
    }
}

// Release Occupied Chair
function releaseChair(chairId) {
    if (window.GlamazonStore) {
        window.GlamazonStore.releaseChair(chairId);
    }
}

// Render Upcoming Bookings List from Store
function renderUpcomingBookings() {
    const container = document.getElementById('upcomingBookingsContainer');
    if (!container || !window.GlamazonStore) return;

    const bookings = window.GlamazonStore.getBookings();

    if (bookings.length === 0) {
        container.innerHTML = `<div class="p-6 text-center text-taupe font-sans text-xs">No upcoming bookings scheduled yet.</div>`;
        return;
    }

    container.innerHTML = bookings.map(b => `
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
                    <p class="text-xs text-taupe font-sans">${b.service} • <span class="text-gold font-medium">${b.stylist}</span></p>
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
    
    const phoneMsgBody = document.getElementById('phoneMessageBody');
    const statusBanner = document.getElementById('dispatchStatusBanner');

    if (phoneMsgBody) {
        phoneMsgBody.innerText = messageContent;
    }

    if (statusBanner) {
        statusBanner.classList.remove('hidden');
        statusBanner.innerHTML = `<i class="ph ph-check-circle text-lg inline-block mr-2"></i> BROADCAST DISPATCHED TO 148 DORMANT CLIENTS! (${discount} DISCOUNT ACTIVE)`;
    }

    if (window.GlamazonStore) {
        window.GlamazonStore.saveFlash({
            active: true,
            discount: discount,
            message: messageContent
        });
    }
}

// Render Master Stylists Schedule Matrix
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
