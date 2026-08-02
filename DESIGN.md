# Design System & Animation Specifications: "Glamazon"

## 1. Global Styles

### 1.1 Color Palette
*   **Background:** Deep Charcoal / Soft Black (`#0F0F0F` or `#111111`) - Creates a moody, luxurious editorial feel.
*   **Primary Text:** Off-White / Cream (`#F5F4F0`) - Used for main headings, body text, and the logo.
*   **Secondary/Muted Text:** Taupe / Mid-Grey (`#8B8B8B`) - Used for eyebrows, durations, and minor details.
*   **Accent/Button Background:** Light Grey/Beige (`#E6E6E6`) - Used for the sticky "SECURE ENTRY" CTA.
*   **Button Text:** Soft Black (`#111111`) - Provides high contrast against the light button background.
*   **Borders/Dividers:** Dark Grey (`#2A2A2A` or `rgba(255,255,255,0.1)`) - Used for section dividers and pill outlines.

### 1.2 Typography
*   **Display Serif:** High-contrast, elegant serif (e.g., *Ogg*, *Playfair Display*, or *Canela*). Used for the "azon." logo text, main section headlines, and menu item names. 
    *   *Styling:* Often includes italics for emphasis within paragraphs (e.g., "*silent ritual*").
*   **Display Script:** Elegant, flowing cursive script. Used for the "glam" logo text and the client reflection quote.
*   **Primary Sans-Serif:** Clean, minimalist sans-serif (e.g., *Inter*, *Helvetica Neue*, or *Montserrat*). Used strictly in ALL CAPS for eyebrows (e.g., "01 — THE ETHOS"), pill tags, menu categories, footer details, and UI elements. Wide letter-spacing (tracking).

### 1.3 Layout & Grid
*   **Spacing:** Generous vertical padding (`120px` to `160px`) between main sections to let the content breathe.
*   **Alignment:** Predominantly left-aligned content with specific elements (like prices/times) right-aligned using flexbox space-between.
*   **Imagery:** Edge-to-edge full bleed for the hero video, and contained, wide-aspect monochromatic images for internal sections.

---

## 2. Component Specifications

### 2.1 Hero Section (00:00 - 00:02)
*   **Background:** Full-height (`100vh`) vertical video loop (hair stylist working) with a subtle dark overlay to ensure text legibility.
*   **Logo Overlay:**
    *   "glam" (Script): Positioned overlapping the top-left of the serif text.
    *   "azon." (Serif): Large, centered-left, pure white.
*   **Corner Details:** Bottom left "[ EST. 2014 ]", Bottom right "[ VOLUME III ]" in small, muted sans-serif.
*   **Scroll Indicator:** A thin vertical line spanning down the left-hand margin, serving as a scroll prompt.

### 2.2 Sticky Bottom Action Bar
*   **Positioning:** `position: fixed; bottom: 0; width: 100%; z-index: 100;`
*   **Layout:** Dark horizontal bar split into two main functional areas.
*   **Left Side:** "AVAILABILITY / NEXT: 14:00" (Sans-serif, muted grey with white numbers).
*   **Right Side:** "SECURE ENTRY" button. White/light grey background with black text. Sharp corners, no border radius.

### 2.3 Section Headers (e.g., "01 — THE ETHOS")
*   **Eyebrow Text:** Small, uppercase sans-serif with a warm muted tone.
*   **Tag:** `( CORE PHILOSOPHY )` enclosed in a thin, rounded-rectangle (pill) border.
*   **Paragraph:** Large serif text. Mix of normal and italicized weights for visual cadence.

### 2.4 The Menu (Treatments)
*   **Container:** Standard section margins.
*   **List Item Layout:** `display: flex; justify-content: space-between; align-items: flex-end;`
*   **Left Column:** Category (small sans-serif, e.g., "CHROMA") stacked above Treatment Name (large serif, e.g., "bespoke tinting").
*   **Right Column:** Duration (e.g., "90 MIN") stacked above Price (e.g., "$240+"). Both in small, muted sans-serif.
*   **Dividers:** `border-bottom: 1px solid rgba(255,255,255,0.1);` applied below each item.

### 2.5 The Dialogue (Testimonial)
*   **Quote:** Massive, edge-to-edge script typography.
*   **Attribution:** "ELENA V. — CREATIVE DIRECTOR" in uppercase, tracked-out sans-serif below the quote.

### 2.6 Footer
*   **Previous Engagements:** A mini-gallery of three square, greyscale thumbnails.
*   **Typography:** "VOGUE FEATURED — 2023" (small sans-serif) above "Where architecture meets aesthetic." (medium serif).
*   **Address Details:** Tiny, muted sans-serif at the very bottom.

---

## 3. Animation & Interactions

### 3.1 Scroll Dynamics
*   **Hero Parallax:** As the user scrolls down, the hero background video and the primary "glamazon" logo scroll up at slightly different speeds (parallax effect) and gradually fade out in opacity (`opacity: 1` -> `opacity: 0`).
*   **Persistent Sticky Nav:** The bottom "AVAILABILITY / SECURE ENTRY" bar remains absolutely fixed in the viewport regardless of scroll position.

### 3.2 Reveal Animations (Intersection Observer)
*   **Fade Up on Scroll:** Elements in subsequent sections (Ethos paragraph, Menu items, Quote) enter the viewport with a subtle upward translation (`transform: translateY(20px)` to `0`) paired with an opacity fade (`opacity: 0` to `1`).
*   **Staggered Menu Loading:** When the "Menu" section enters the viewport, the treatments ("bespoke tinting", "signature editorial cut", "silk-infusion therapy") likely fade in sequentially with a 100ms-200ms stagger.

### 3.3 Micro-Interactions (Assumed Web Standard)
*   **SECURE ENTRY Button:** Hover state likely inverts colors (Black background, white text) with a quick CSS transition (`transition: all 0.3s ease`).
*   **Menu Items:** Hovering over a menu item might increase the brightness of the text slightly or expand the bottom border thickness to indicate clickability.
*   **Left Scroll Line:** The vertical line on the left side of the screen acts as a scroll progress bar, extending or contracting based on the user's position down the page