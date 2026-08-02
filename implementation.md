# Glamazon Salon - Client Website & Manager Operations System

## System Architecture Overview

Glamazon Salon is structured into two distinct portals to serve both public clients and internal salon managers seamlessly:

---

## 1. Client Public Website (`Client View`)
Designed for regular clients and prospective customers to explore Glamazon Salon on mobile and desktop:
- **Brand Home & Story**: Hero banner, luxury visual identity (Obsidian & Metallic Gold theme), salon facilities, and client reviews.
- **Services & Pricing Menu**: Searchable and filterable catalog of 40+ services (Women's Hair, Men's Grooming, Waxing, Facials, D-Tan, Treatments, Nail Art, Makeup).
- **Offers & Special Combos**: Featured deal packages (₹999 Essential Glow, ₹1890 Herbal Pamper, ₹2999 Luxury Gold Head-to-Toe) and live flash sales.
- **Online Booking Portal**: Interactive slot selection, stylist picker, and instant digital booking pass confirmation.
- **Client Account & My Bookings**: View active appointments with 12-hour advance rescheduling and cancellation controls.

---

## 2. Backend Management Portal (`Manager View`)
Secure operational dashboard for the salon manager to optimize daily revenue and chair utilization:
- **Manager Authentication**: Role-based access with PIN/password gate to prevent unauthorized access.
- **Live 10-Chair Inventory Grid**: Real-time status monitor (Available, Occupied, Cleaning, Reserved) with 1-click manual walk-in booking assignment.
- **Schedule & Stylist Allocation**: Hourly timetable (9:00 AM - 8:00 PM) for all 5 master stylists to prevent double-booking.
- **Analytics & Revenue Counter**: Daily chair utilization gauge `(Occupied Hours / Total Hours) * 100` and daily revenue tracker.
