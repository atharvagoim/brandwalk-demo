import { waURL, INSTAGRAM } from "../lib.js";

export function SaleBand() {
  const words = ["Up to 70% off", "Every day", "Original only"];
  return (
    <div className="sale-band" aria-label="Up to 70% off, every day">
      <div className="run mega" aria-hidden="true">
        {[...words, ...words].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  );
}

export function Editorial() {
  return (
    <section>
      <div className="split">
        <div className="split-media" aria-hidden="true">
          <div className="mega">100%</div>
          <img src="/images/cut-dunkred.png" alt="" />
        </div>
        <div className="split-copy">
          <h2 className="mega">Original<br /><span>or nothing.</span></h2>
          <p className="ed-note">Genuine branded stock only, with big discounts on MRP all year. We ship across India on prepaid orders and show you the exact pair before you pay.</p>
        </div>
      </div>
    </section>
  );
}

export function SizeAndStore() {
  const dir = (q) => `https://www.google.com/maps/search/?api=1&query=${q}`;
  const kandivali = "Brand+Walk+Mahavir+Nagar+Kandivali+West+Mumbai";
  const virar = "Brand+Walk+New+Viva+College+Road+Virar+West";
  return (
    <section id="store" className="flush">
      <div className="store-wide store">
        <div className="store-text">
          <h2 className="mega">Try them <span>on.</span></h2>
          <div className="store-info">
            <div>
              <h4>Kandivali West store</h4><p>Mahavir Nagar, Kandivali West, Mumbai 400067</p>
              <a className="pill pill-white store-dir" target="_blank" rel="noopener" href={dir(kandivali)}>Get directions</a>
            </div>
            <div>
              <h4>Virar West store</h4><p>New Viva College Road, Virar West</p>
              <a className="pill pill-white store-dir" target="_blank" rel="noopener" href={dir(virar)}>Get directions</a>
            </div>
            <div>
              <h4>WhatsApp &amp; calls</h4><p><a href="tel:+917030396707">+91 70303 96707</a></p>
              <h4 style={{ marginTop: 12 }}>Open</h4><p>Daily, 11 am – 10 pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Instagram() {
  return (
    <section id="instagram" className="flush">
      <div className="ig">
        <h2 className="mega">See it first<br />on Instagram</h2>
        <p>Fresh pairs, restocks and flash deals drop on our page almost daily. Follow so you never miss your size.</p>
        <div className="ig-feed">
          <iframe
            title="Brand Walk Kandivali on Instagram"
            src={`${INSTAGRAM}embed/`}
            loading="lazy"
            scrolling="no"
            allowTransparency="true"
          />
        </div>
        <a className="pill pill-follow" target="_blank" rel="noopener" href={INSTAGRAM}>Follow</a>
      </div>
    </section>
  );
}

export function Footer({ setFilter, dark }) {
  return (
    <footer className={dark ? "foot-dark" : ""}>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a href="#" className="wordmark" style={{ color: "var(--ink)", padding: 0 }}><img src="/images/logo-v2.png" alt="" />Brand Walk</a>
            <p style={{ maxWidth: "34ch", marginTop: 12 }}>Original branded footwear at sale prices. Kandivali &amp; Virar.</p>
          </div>
          <div>
            <h5>Shop</h5>
            <a href="#new">New in</a>
            <a href="#shop" onClick={() => setFilter("running")}>Running</a>
            <a href="#shop" onClick={() => setFilter("lifestyle")}>Lifestyle</a>
            <a href="#shop" onClick={() => setFilter("court")}>Court</a>
          </div>
          <div>
            <h5>Help</h5>
            <a href={waURL("Hi! I have a question about an order.")} target="_blank" rel="noopener">Order help</a>
          </div>
          <div>
            <h5>Store</h5>
            <a href="#store">Kandivali West</a>
            <a href="tel:+917030396707">+91 70303 96707</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Brand Walk Kandivali</span>
          <span>All brand names and trademarks belong to their respective owners.</span>
        </div>
      </div>
    </footer>
  );
}
