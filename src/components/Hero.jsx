const STATS = [
  ["70%", "Off MRP"],
  ["100%", "Original"],
  ["All India", "Shipping"],
];

export default function Hero() {
  return (
    <section className="hero nb nb-photo">
      <picture>
        <source media="(max-width: 600px)" srcSet="/images/hero-bg-m.jpg" />
        <img className="nb-bg" src="/images/hero-bg.jpg" alt="" fetchpriority="high" />
      </picture>
      <div className="nb-shade" aria-hidden="true" />
      <div className="nb-inner">
        <div className="nb-copy">
          <h1 className="mega">Real kicks.<br /><span>Less price.</span></h1>
          <div className="nb-ctas">
            <a href="#shop" className="pill nb-btn">Shop now</a>
          </div>
          <dl className="nb-stats">
            {STATS.map(([a, b]) => <div key={b}><dt>{a}</dt><dd>{b}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}
