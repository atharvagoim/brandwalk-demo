import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { products } from "../data/products.js";
import { waURL, rupee, offPct, slugOf, photosOf } from "../lib.js";
import { WaIcon } from "../components/Icons.jsx";
import ProductCard from "../components/ProductCard.jsx";

const Icon = ({ d }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d={d} /></svg>
);

export default function ProductPage() {
  const { slug } = useParams();
  const p = products.find((x) => slugOf(x) === slug);
  const [shot, setShot] = useState(0);
  const [size, setSize] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setShot(0);
    setSize(null);
    setErr("");
    if (p) document.title = `${p.brand} ${p.name} — Brand Walk Kandivali`;
    return () => { document.title = "Brand Walk Kandivali — Original branded footwear"; };
  }, [slug]);

  if (!p) return <Navigate to="/" replace />;

  const photos = photosOf(p);
  const href = size
    ? waURL(`Hi Brand Walk! I'd like the ${p.brand} ${p.name} in UK ${size} (${rupee(p.price)}). Is it available?`)
    : "#";
  const order = (e) => {
    if (!size) { e.preventDefault(); setErr("Select a size to continue."); }
  };
  const more = products.filter((x) => x !== p).slice(0, 4);

  return (
    <section className="pdp">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/#shop">Shop</Link> <span>/</span> <span>{p.brand} {p.name}</span>
        </nav>

        <div className="pdp-grid">
          <div className={"pdp-gallery" + (photos.length > 1 ? " has-thumbs" : "")}>
            {photos.length > 1 && (
              <div className="pdp-thumbs">
                {photos.map((src, i) => (
                  <button key={src} aria-label={`View photo ${i + 1}`} aria-pressed={shot === i} onClick={() => setShot(i)}>
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
            <div className="pdp-main">
              <span className="badge red">{offPct(p)}% off</span>
              <img src={photos[shot]} alt={`${p.brand} ${p.name}`} />
            </div>
          </div>

          <div className="pdp-info">
            <span className="pdp-brand">{p.brand}</span>
            <h1>{p.name}</h1>
            <span className="cat">{p.type}</span>
            <div className="price pdp-price"><span>{rupee(p.price)}</span><s>MRP {rupee(p.mrp)}</s><em>{offPct(p)}% off</em></div>

            <div className="size-head"><span>Select size (UK)</span></div>
            <div className="size-grid" role="group" aria-label="Sizes">
              {p.sizes.map((s) => (
                <button key={s} aria-pressed={size === s} onClick={() => { setSize(s); setErr(""); }}>UK {s}</button>
              ))}
            </div>
            <div className="size-err" aria-live="polite">{err}</div>

            <a className="pill pill-dark pdp-order" href={href} target="_blank" rel="noopener" onClick={order}>
              <WaIcon size={20} />Order on WhatsApp
            </a>
            <small className="pdp-note">We'll confirm stock and send real photos before you pay.</small>

            <div className="pdp-trust">
              <div><Icon d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Zm-1.2 12.2-3-3 1.4-1.4 1.6 1.6 4-4 1.4 1.4-5.4 5.4Z" /><b>100% original</b><span>Genuine branded stock</span></div>
              <div><Icon d="M3 6h11v9H3V6Zm11 3h4l3 3v3h-7V9ZM7 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" /><b>Ships India-wide</b><span>Prepaid orders</span></div>
              <div><Icon d="M4 10v10h16V10M3 10l2-6h14l2 6M9 20v-6h6v6" /><b>Try in store</b><span>Kandivali West</span></div>
            </div>

            <div className="pdp-acc">
              <details name="pdp" open>
                <summary>Description</summary>
                <div className="acc-body">
                  <p>Genuine {p.brand} {p.name} — {p.type.toLowerCase()} at up to {offPct(p)}% off MRP.</p>
                  <p>Available in UK sizes {p.sizes[0]}–{p.sizes[p.sizes.length - 1]}. Before you pay, we confirm your size is in stock and send live photos and videos of the exact pair you'll receive.</p>
                </div>
              </details>
              <details name="pdp">
                <summary>Product details</summary>
                <dl className="acc-body acc-dl">
                  <dt>Brand</dt><dd>{p.brand}</dd>
                  <dt>Model</dt><dd>{p.name}</dd>
                  <dt>Type</dt><dd>{p.type}</dd>
                  <dt>Sizes (UK)</dt><dd>{p.sizes.join(", ")}</dd>
                  <dt>MRP</dt><dd>{rupee(p.mrp)}</dd>
                  <dt>Our price</dt><dd>{rupee(p.price)} ({offPct(p)}% off)</dd>
                </dl>
              </details>
              <details name="pdp">
                <summary>Shipping &amp; payment</summary>
                <div className="acc-body">
                  <p>We ship across India. Payment is online via UPI or bank transfer, and orders are shipped once payment is confirmed.</p>
                  <p>Cash on delivery is not available.</p>
                </div>
              </details>
              <details name="pdp">
                <summary>Store pickup</summary>
                <div className="acc-body">
                  <p>Try it on at Brand Walk, Mahavir Nagar, Kandivali West, Mumbai 400067. We can keep your pair ready for pickup.</p>
                  <p>Message us on WhatsApp before you visit to confirm stock and opening hours.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className="sec-top pdp-more-head"><h2 className="h2">You may also like</h2></div>
        <div className="grid pdp-more">
          {more.map((x) => <ProductCard key={slugOf(x)} product={x} />)}
        </div>
      </div>
    </section>
  );
}
