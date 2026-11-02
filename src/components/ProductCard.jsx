import { useState } from "react";
import { Link } from "react-router-dom";
import { rupee, offPct, slugOf, photosOf } from "../lib.js";
import { Chevron } from "./Icons.jsx";

export default function ProductCard({ product: p }) {
  const photos = photosOf(p);
  const [i, setI] = useState(0);

  /* arrows live inside the card link: swallow the click so the page doesn't open */
  const step = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setI((n) => (n + dir + photos.length) % photos.length);
  };

  return (
    <Link className="card" to={`/product/${slugOf(p)}`} aria-label={`${p.brand} ${p.name}, ${rupee(p.price)}`}>
      <div className="card-img">
        <span className="badge red">{offPct(p)}% off</span>
        {photos.map((src, n) => (
          <img key={src} className={n === i ? "" : "off"} src={src} alt={n === 0 ? `${p.brand} ${p.name}` : ""} loading="lazy" decoding="async" />
        ))}
        {photos.length > 1 && (
          <>
            <span className="card-arrow prev" role="button" tabIndex={0} aria-label="Previous photo" onClick={step(-1)} onKeyDown={(e) => { if (e.key === "Enter") step(-1)(e); }}><Chevron dir="left" /></span>
            <span className="card-arrow next" role="button" tabIndex={0} aria-label="Next photo" onClick={step(1)} onKeyDown={(e) => { if (e.key === "Enter") step(1)(e); }}><Chevron dir="right" /></span>
            <span className="card-dots" aria-hidden="true">
              {photos.map((_, n) => <i key={n} className={n === i ? "" : "off"} />)}
            </span>
          </>
        )}
      </div>
      <div className="card-info">
        <h4>{p.brand} {p.name}</h4>
        <div className="cat">{p.type}</div>
        <div className="price"><span>{rupee(p.price)}</span><s>{rupee(p.mrp)}</s></div>
      </div>
    </Link>
  );
}
