export default function Hero() {
  return (
    <section className="hero">
      <div className="poster">
        <div className="poster-slab" aria-hidden="true" />
        <div className="poster-word mega" aria-hidden="true">Original</div>

        <div className="poster-copy">
          <h1 className="mega">Real kicks.<br /><span>Less price.</span></h1>
          <div className="poster-ctas">
            <a href="#shop" className="pill pill-red">Shop now</a>
          </div>
        </div>

        <div className="poster-stage">
          <img className="poster-shoe" src="/images/hero-shoe-v2.png" alt="Nike Air Max 90" />
        </div>

        <div className="poster-badge">Up to 70% off MRP</div>
      </div>
    </section>
  );
}
