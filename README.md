# Brand Walk Kandivali — React site

React 18 + Vite.

## Run
```
npm install
npm run dev        # http://localhost:5173 (also reachable via ngrok: ngrok http 5173)
npm run build      # outputs dist/ — deploy to Netlify / Vercel / GitHub Pages
```

## Edit before going live
- **Products**: `src/data/products.js` (brand, name, MRP, price, sizes, `img`). Listings are placeholders.
- **Photos**: put images in `public/images/` and reference them as `/images/<file>.jpg`.
- **WhatsApp number / Instagram**: `src/lib.js`.
- **Store hours, size chart, copy**: `src/components/Sections.jsx`.
- **Styles**: `src/styles.css`.

`legacy.html` is the earlier single-file version (kept for reference).
