import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { Chevron } from "./Icons.jsx";

export default function Rail({ products }) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  useEffect(update, [products]);

  const scroll = (dir) => {
    const card = ref.current.querySelector(".card");
    ref.current.scrollBy({ left: dir * (card.getBoundingClientRect().width + 12) * 2, behavior: "smooth" });
  };

  return (
    <section id="new">
      <div className="wrap">
        <div className="sec-top">
          <h2 className="h2">Just landed</h2>
          <div className="arrows">
            <button aria-label="Previous" disabled={edge.start} onClick={() => scroll(-1)}><Chevron dir="left" /></button>
            <button aria-label="Next" disabled={edge.end} onClick={() => scroll(1)}><Chevron dir="right" /></button>
          </div>
        </div>
        <div className="rail" ref={ref} onScroll={update}>
          {products.map((p) => <ProductCard key={p.name} product={p} />)}
        </div>
      </div>
    </section>
  );
}
