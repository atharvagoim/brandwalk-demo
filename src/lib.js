export const WA = "917030396707";
export const waURL = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
export const rupee = (n) => "₹" + n.toLocaleString("en-IN");
export const offPct = (p) => Math.round((1 - p.price / p.mrp) * 100);
export const INSTAGRAM = "https://www.instagram.com/brandwalk_kandivali/";
export const slugOf = (p) => `${p.brand}-${p.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const photosOf = (p) => p.imgs || [p.img];
