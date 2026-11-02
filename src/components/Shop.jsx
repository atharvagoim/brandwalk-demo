import { useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { offPct } from "../lib.js";

const TABS = [
  ["all", "All"],
  ["lifestyle", "Lifestyle"],
  ["running", "Running"],
  ["court", "Court"],
  ["women", "Women"],
];

const PRICES = [
  ["u3", "Under ₹3,000", 0, 3000],
  ["3-6", "₹3,000 – ₹6,000", 3000, 6000],
  ["6-9", "₹6,000 – ₹9,000", 6000, 9000],
  ["9+", "Above ₹9,000", 9000, Infinity],
];

const SORTS = [
  ["featured", "Featured"],
  ["low", "Price: low to high"],
  ["high", "Price: high to low"],
  ["off", "Biggest discount"],
];

const toggle = (set, v) => {
  const next = new Set(set);
  next.has(v) ? next.delete(v) : next.add(v);
  return next;
};

export default function Shop({ products, filter, setFilter }) {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState(new Set());
  const [sizes, setSizes] = useState(new Set());
  const [price, setPrice] = useState(null);
  const [sort, setSort] = useState("featured");

  const allBrands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);
  const allSizes = useMemo(() => [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => a - b), [products]);

  const active = brands.size + sizes.size + (price ? 1 : 0);
  const clear = () => { setBrands(new Set()); setSizes(new Set()); setPrice(null); };

  const shown = useMemo(() => {
    const range = PRICES.find((r) => r[0] === price);
    const list = products.filter((p) =>
      (filter === "all" || p.cat.includes(filter)) &&
      (!brands.size || brands.has(p.brand)) &&
      (!sizes.size || p.sizes.some((s) => sizes.has(s))) &&
      (!range || (p.price >= range[2] && p.price < range[3]))
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "off") list.sort((a, b) => offPct(b) - offPct(a));
    return list;
  }, [products, filter, brands, sizes, price, sort]);

  return (
    <section id="shop">
      <div className="wrap">
        <div className="sec-top">
          <h2 className="h2">Shop the drop</h2>
          <span className="count">{shown.length} {shown.length === 1 ? "style" : "styles"}</span>
        </div>
        <div className="tabs" role="tablist" aria-label="Filter by category">
          {TABS.map(([key, label]) => (
            <button key={key} className="tab" role="tab" aria-selected={filter === key} onClick={() => setFilter(key)}>{label}</button>
          ))}
        </div>

        <div className="toolbar">
          <button className="filter-btn" aria-expanded={open} aria-controls="filter-panel" onClick={() => setOpen(!open)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>
            Filters{active ? ` (${active})` : ""}
          </button>
          <label className="sort">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </label>
        </div>

        {open && (
          <div className="filter-panel" id="filter-panel">
            <div className="fgroup">
              <h3>Brand</h3>
              <div className="fchecks">
                {allBrands.map((b) => (
                  <label key={b}><input type="checkbox" checked={brands.has(b)} onChange={() => setBrands(toggle(brands, b))} />{b}</label>
                ))}
              </div>
            </div>
            <div className="fgroup">
              <h3>Size (UK)</h3>
              <div className="fchips">
                {allSizes.map((s) => (
                  <button key={s} aria-pressed={sizes.has(s)} onClick={() => setSizes(toggle(sizes, s))}>{s}</button>
                ))}
              </div>
            </div>
            <div className="fgroup">
              <h3>Price</h3>
              <div className="fchecks">
                {PRICES.map(([k, l]) => (
                  <label key={k}><input type="radio" name="price" checked={price === k} onChange={() => setPrice(k)} onClick={() => price === k && setPrice(null)} />{l}</label>
                ))}
              </div>
            </div>
            {active > 0 && <button className="fclear" onClick={clear}>Clear all filters</button>}
          </div>
        )}

        {shown.length ? (
          <div className="grid">
            {shown.map((p) => <ProductCard key={p.name} product={p} />)}
          </div>
        ) : (
          <div className="empty">
            <p>No styles match these filters.</p>
            <button className="pill pill-dark" onClick={() => { clear(); setFilter("all"); }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
