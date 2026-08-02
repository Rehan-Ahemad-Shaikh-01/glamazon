/**
 * Glamazon Salon - Centralized State & Persistence Store Module
 */

const STORAGE_KEY_CHAIRS = 'glamazon_chairs_v1';
const STORAGE_KEY_BOOKINGS = 'glamazon_bookings_v1';
const STORAGE_KEY_FLASH = 'glamazon_flash_v1';
const STORAGE_KEY_CONTACTS = 'glamazon_contacts_v1';
const STORAGE_KEY_TEMPLATES = 'glamazon_templates_v1';

const INITIAL_CHAIRS = [
    { id: 1, name: "Chair 01", status: "occupied", service: "Hair Botox Ritual", stylist: "Ananya Sharma", timeRemaining: "45 MIN" },
    { id: 2, name: "Chair 02", status: "occupied", service: "Precision Cut & Beard", stylist: "Rohan Verma", timeRemaining: "20 MIN" },
    { id: 3, name: "Chair 03", status: "available", service: "Available", stylist: "Priya Patel", timeRemaining: "READY" },
    { id: 4, name: "Chair 04", status: "occupied", service: "Nanoplastia Organic", stylist: "Vikram Malhotra", timeRemaining: "60 MIN" }
];

const INITIAL_BOOKINGS = [
    { id: "BK-8891", name: "Sunita Rao", service: "Hair Botox Treatment", chair: "Chair 01", stylist: "Ananya Sharma", time: "02:00 PM (Today)", phone: "+91 98765 12345", status: "CONFIRMED", timestamp: Date.now() - 3600000 },
    { id: "BK-8892", name: "Rajesh Kumar", service: "Men's Hair Patch System", chair: "Chair 04", stylist: "Vikram Malhotra", time: "03:30 PM (Today)", phone: "+91 98123 45678", status: "CONFIRMED", timestamp: Date.now() - 2500000 },
    { id: "BK-8893", name: "Kavita Kapoor", service: "O3+ Skin Whitening Facial", chair: "Chair 03", stylist: "Priya Patel", time: "05:00 PM (Today)", phone: "+91 99887 76655", status: "CONFIRMED", timestamp: Date.now() - 1800000 },
    { id: "BK-8894", name: "Amit Shah", service: "Architectural Cut & Beard", chair: "Chair 02", stylist: "Rohan Verma", time: "06:30 PM (Today)", phone: "+91 97112 23344", status: "PENDING", timestamp: Date.now() - 900000 }
];

const INITIAL_FLASH = {
    active: true,
    discount: "20%",
    message: "Afternoon Flash Deal: 20% off all haircuts & spa slots between 2 PM to 5 PM today"
};

const INITIAL_CONTACTS = [
    { id: "CNT-101", name: "Sunita Rao", phone: "+91 98765 12345", tag: "VIP Client", source: "System" },
    { id: "CNT-102", name: "Rajesh Kumar", phone: "+91 98123 45678", tag: "Regular", source: "System" },
    { id: "CNT-103", name: "Kavita Kapoor", phone: "+91 99887 76655", tag: "VIP Client", source: "System" },
    { id: "CNT-104", name: "Amit Shah", phone: "+91 97112 23344", tag: "Dormant", source: "System" },
    { id: "CNT-105", name: "Pooja Hegde", phone: "+91 98234 56789", tag: "Regular", source: "System" },
    { id: "CNT-106", name: "Arjun Reddy", phone: "+91 99123 88776", tag: "Dormant", source: "System" },
    { id: "CNT-107", name: "Neha Sharma", phone: "+91 97444 33221", tag: "VIP Client", source: "System" },
    { id: "CNT-108", name: "Siddharth Malhotra", phone: "+91 98999 11223", tag: "Regular", source: "System" }
];

const INITIAL_TEMPLATES = [
    {
        id: "TPL-1",
        title: "⚡ Afternoon Flash Deal (2 PM - 5 PM)",
        body: "Hi {name}! ⚡ Exclusive Flash Deal at {salon_name}: Get {discount} OFF all hair spa & styling slots between 2 PM to 5 PM today! Reply or tap to reserve your chair.",
        discount: "20%"
    },
    {
        id: "TPL-2",
        title: "👑 VIP Reward & Winback",
        body: "Hello {name}! We miss your presence at {salon_name}. Enjoy a special {discount} VIP discount on your next service when you visit us this week!",
        discount: "25%"
    },
    {
        id: "TPL-3",
        title: "✨ Weekend Luxury Pamper Special",
        body: "Greetings {name}! Elevate your weekend at {salon_name}. Book any signature ritual today and claim a complimentary organic hair mask worth ₹1,200! Offer valid with code FLASHWEEKEND.",
        discount: "Special Benefit"
    }
];

class StoreManager {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEY_CHAIRS)) {
            localStorage.setItem(STORAGE_KEY_CHAIRS, JSON.stringify(INITIAL_CHAIRS));
        }
        if (!localStorage.getItem(STORAGE_KEY_BOOKINGS)) {
            localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
        }
        if (!localStorage.getItem(STORAGE_KEY_FLASH)) {
            localStorage.setItem(STORAGE_KEY_FLASH, JSON.stringify(INITIAL_FLASH));
        }
        if (!localStorage.getItem(STORAGE_KEY_CONTACTS)) {
            localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(INITIAL_CONTACTS));
        }
        if (!localStorage.getItem(STORAGE_KEY_TEMPLATES)) {
            localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(INITIAL_TEMPLATES));
        }
    }

    notify() {
        window.dispatchEvent(new CustomEvent('glamazon-state-changed', {
            detail: {
                chairs: this.getChairs(),
                bookings: this.getBookings(),
                flash: this.getFlash()
            }
        }));
    }

    getChairs() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_CHAIRS)) || INITIAL_CHAIRS;
        } catch (e) {
            return INITIAL_CHAIRS;
        }
    }

    saveChairs(chairs) {
        localStorage.setItem(STORAGE_KEY_CHAIRS, JSON.stringify(chairs));
        this.notify();
    }

    getBookings() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKINGS)) || INITIAL_BOOKINGS;
        } catch (e) {
            return INITIAL_BOOKINGS;
        }
    }

    saveBookings(bookings) {
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
        this.notify();
    }

    getFlash() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_FLASH)) || INITIAL_FLASH;
        } catch (e) {
            return INITIAL_FLASH;
        }
    }

    saveFlash(flash) {
        localStorage.setItem(STORAGE_KEY_FLASH, JSON.stringify(flash));
        this.notify();
    }

    addBooking(bookingData) {
        const bookings = this.getBookings();
        bookings.unshift(bookingData);
        this.saveBookings(bookings);

        // Auto-assign or update chair status if available
        const chairs = this.getChairs();
        const availableChair = chairs.find(c => c.status === 'available');
        if (availableChair) {
            availableChair.status = 'occupied';
            availableChair.service = bookingData.service;
            availableChair.stylist = bookingData.stylist || availableChair.stylist;
            availableChair.timeRemaining = '45 MIN';
            this.saveChairs(chairs);
        }
        return bookingData;
    }

    releaseChair(chairId) {
        const chairs = this.getChairs();
        const chair = chairs.find(c => c.id === chairId);
        if (chair) {
            chair.status = 'available';
            chair.service = 'Available';
            chair.timeRemaining = 'READY';
            this.saveChairs(chairs);
        }
    }

    assignWalkIn(chairId, serviceName = 'Walk-in Haircut & Styling') {
        const chairs = this.getChairs();
        const chair = chairs.find(c => c.id === chairId);
        if (chair) {
            chair.status = 'occupied';
            chair.service = serviceName;
            chair.timeRemaining = '45 MIN';
            this.saveChairs(chairs);
        }
    }

    updateBookingStatus(bookingId, newStatus) {
        const bookings = this.getBookings();
        const bk = bookings.find(b => b.id === bookingId);
        if (bk) {
            bk.status = newStatus;
            this.saveBookings(bookings);
        }
    }

    getContacts() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_CONTACTS)) || INITIAL_CONTACTS;
        } catch (e) {
            return INITIAL_CONTACTS;
        }
    }

    saveContacts(contacts) {
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
        this.notify();
    }

    addContact(contact) {
        const contacts = this.getContacts();
        const newContact = {
            id: 'CNT-' + (Date.now().toString().slice(-4)),
            name: contact.name || 'Client',
            phone: contact.phone || '',
            tag: contact.tag || 'Regular',
            source: contact.source || 'Manual'
        };
        contacts.unshift(newContact);
        this.saveContacts(contacts);
        return newContact;
    }

    importContacts(newContactsList) {
        const contacts = this.getContacts();
        let addedCount = 0;
        newContactsList.forEach(c => {
            if (c.phone) {
                contacts.unshift({
                    id: 'CNT-' + (Date.now().toString().slice(-4)) + Math.floor(Math.random() * 100),
                    name: c.name || 'Client',
                    phone: c.phone,
                    tag: c.tag || 'Imported',
                    source: 'CSV Upload'
                });
                addedCount++;
            }
        });
        this.saveContacts(contacts);
        return addedCount;
    }

    deleteContact(contactId) {
        let contacts = this.getContacts();
        contacts = contacts.filter(c => c.id !== contactId);
        this.saveContacts(contacts);
    }

    getTemplates() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY_TEMPLATES)) || INITIAL_TEMPLATES;
        } catch (e) {
            return INITIAL_TEMPLATES;
        }
    }

    saveTemplates(templates) {
        localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(templates));
        this.notify();
    }

    addTemplate(template) {
        const templates = this.getTemplates();
        const newTemplate = {
            id: 'TPL-' + (Date.now().toString().slice(-4)),
            title: template.title || 'Custom Template',
            body: template.body || '',
            discount: template.discount || '20%'
        };
        templates.unshift(newTemplate);
        this.saveTemplates(templates);
        return newTemplate;
    }
}

window.GlamazonStore = new StoreManager();
