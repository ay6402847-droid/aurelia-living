# AURELIA LIVING — Luxury Furniture & Interior Design Storefront

A premium, production-grade interior design and furniture e-commerce website inspired by contemporary Scandinavian craftsmanship, warm neutral aesthetics, and refined editorial design.

---

## ✦ Brand Identity & Creative Direction

- **Brand Name**: AURELIA LIVING
- **Positioning**: Thoughtfully curated furniture, architectural lighting, and artisanal home decor for serene, intentional spaces.
- **Color Palette**:
  - Warm Ivory (`#F7F5F1`) & Soft Cream (`#EEEAE3`)
  - Deep Charcoal (`#292929`) & Warm Grey (`#85817B`)
  - Muted Terracotta Accent (`#C98755`) & Warm Beige (`#D8C9B8`)
  - Dark Walnut Planks (`#211B17` / `#2D211A`)
- **Typography**:
  - Headings: *Cormorant Garamond* (Refined editorial serif)
  - Body: *Plus Jakarta Sans* (Clean, modern geometric sans)

---

## ✦ Key Features

1. **Header & Navigation**:
   - One-row, 3-zone clean top bar contract with sticky blur and subtle hairline border.
   - Dynamic cart badge, wishlist count, instant live search trigger.
   - Responsive slide-out navigation for mobile and tablet devices.
2. **Hero Section**:
   - High-contrast, editorial lifestyle photography with warm neutral tones.
   - Dual call-to-actions ("Explore Collection" and "Discover Our Story").
   - 100% Solid Timber & Craft Guarantee markers.
3. **Promotional Category Cards**:
   - 3 clean promotional modules positioned right below hero for immediate discovery (Modern Furniture, Decor & Accents, Inspired Interiors).
4. **Featured Collections Grid**:
   - 4 architectural categories: Living Room, Home Office, Bedroom, and Decor & Accents.
5. **Latest Arrivals (Walnut Wood Showcase)**:
   - Rich dark walnut wood background recreating the signature aesthetic.
   - 3 product cards: The Haven Lounge Chair, Forma Ceramic Vases, and Solace Table Lamp.
6. **Customer Favorites (Bestsellers)**:
   - Interactive segmented category filters (All, Living Room, Bedroom, Home Office, Lighting, Decor).
   - Live sorting (Featured, Price: Low to High, Price: High to Low, Highest Rated).
   - Star reviews, quick-view preview, and one-click add to bag.
7. **Brand Story & Philosophy**:
   - Highlighting small-batch FSC-certified European white oak craftsmanship with readable Manifesto modal.
8. **Editorial Journal**:
   - 3 magazine-style articles with reader modal ("The Art of Minimalist Living", "Warm Neutrals", "Small Details").
9. **Interactive E-Commerce Suite**:
   - **Slide-out Cart Drawer**: Quantity steppers, remove items, live promo code engine (`AURELIA10` for 10% off), and a dynamic free white glove shipping meter ($300 threshold).
   - **Wishlist Drawer**: Saved products with localStorage persistence and "Move to Bag" actions.
   - **Quick View Modal**: Image previews, finish/fabric swatches, dimension specs, and purchase module.
   - **Checkout Modal**: Multi-field delivery destination form, shipping calculations, and sandbox transaction confirmation.
   - **Search Modal**: Real-time product search with keyword suggestions.
   - **Concierge Contact**: Form validation with direct inquiry logging.
   - **Policy Modals**: Detailed white glove delivery, 30-day in-home trial, and privacy commitment.

---

## ✦ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server (running on port 3000):
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:3000`.

---

## ✦ Hostinger Deployment Guide

This application is fully client-side and optimized for standard Hostinger Web Hosting, WordPress Hosting with static files, Cloud Hosting, or VPS.

### Step 1: Build the Production Bundle
Run the build script in your terminal:
```bash
npm run build
```
This will compile and optimize all TypeScript, CSS, and image assets into the self-contained `/dist` folder.

### Step 2: Access Hostinger File Manager
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Navigate to **Websites** → Select your domain → Click **Manage**.
3. Under the **Files** section, click on **File Manager** (or connect via FTP / FileZilla).
4. Open the `public_html` directory of your domain.

### Step 3: Upload the Build Files
1. In Hostinger File Manager, enter the `public_html` folder.
2. If there is a default `default.php` file, you can remove or rename it.
3. Upload the **contents** of the local `dist` folder into `public_html`:
   - `index.html`
   - `.htaccess` (included in `/public` to handle client-side routing and browser caching)
   - `assets/` folder (containing bundled JS, CSS, and optimized images)

### Step 4: Verify Single Page Application (SPA) Routing
A `.htaccess` file is pre-configured and will automatically be placed in `public_html` during upload:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```
This ensures that direct deep links, page refreshes, and URL routing resolve cleanly to `index.html`.

### Step 5: SSL & Performance Verification
1. In Hostinger hPanel, navigate to **Security** → **SSL** and make sure Let's Encrypt SSL is installed and set to active.
2. Enable **LiteSpeed Cache** or browser caching in hPanel for maximum speed.
3. Test your website on mobile, tablet, and desktop viewports.
