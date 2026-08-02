# Project Brief: Glamazon Salon Booking & Yield System

## 1. The Core Objective
To transition Glamazon Salon from manual, phone-based appointment tracking to a fully automated digital booking system that maximizes daily revenue by automatically marketing empty chair slots. The theme should mattch brand colors that are Gold and white, black. **EveryThing is mobile first**

## 2. System Architecture & Features

### Phase 1: The Client-Facing Portal (The "Website")
Instead of a static brochure website, this acts as an interactive booking portal.
*   **Shoud also include their Catlog, details and Logo are in the assets folder** Read the photos and create a markdown file of services offered for agents.
*   **Live Slot Booking:** Customers can view available times and book a specific service (haircut, coloring, spa).


### Phase 2: The Operations Dashboard (Chair Inventory)
This is the backend for the salon manager to track operations in real-time.
*   **Live Chair Availability:** A visual dashboard showing total chairs vs. occupied chairs at any given hour.
*   **Stylist Mapping:** Assigning specific bookings to specific staff members to prevent double-booking.
*   **Daily Analytics:** A simple counter showing the daily utilization rate (e.g., "Chairs were 85% booked today").

### Phase 3: The Flash Marketing Engine (The Revenue Driver)
This is the feature that solves the problem of unexpected slow days and justifies a monthly retainer.
*   **Yield-Triggered Alerts:** If the system detects that less than 30% of chairs are booked for the afternoon, it can trigger a flash sale.
*   **Automated Distribution:** The system pulls from the customer database and sends a WhatsApp or SMS blast: *"Flash Deal at Glamazon Salon! 20% off all haircuts from 2 PM to 5 PM today only."*
*   **Targeted Marketing:** The ability for the manager to manually push specific daily discounts to dormant clients.

## 3. The Demo Strategy (High-Fidelity Prototype)
To secure the client without building the full backend for free, a 3-screen prototype will be presented:
1.  **The Customer View:** A mobile-first screen showing how easily a client can book a time slot.
2.  **The Manager Dashboard:** A screen showing hardcoded chair inventory (e.g., Total: 10, Occupied: 3, Empty: 7).
3.  **The Flash Offer Trigger:** A functional button on the dashboard that, when clicked during the demo, sends an actual SMS/WhatsApp message to a test phone to demonstrate the automated marketing capability.