const TILES = [
  { key: "lifestyle", title: "Lifestyle", bg: "var(--red)", img: "samba-v2", pill: "pill-white" },
  { key: "running", title: "Running", bg: "var(--dark)", img: "nb574-v2", pill: "pill-white" },
  { key: "court", title: "Court", bg: "var(--grey-2)", img: "dunkbr", pill: "pill-dark", dark: true },
];

export default function Tiles({ setFilter }) {
  return (
    <section>
      <div className="wrap">
        <div className="sec-top"><h2 className="h2">Shop by look</h2></div>
        <div className="tiles">
          {TILES.map((t) => (
            <a key={t.key} href="#shop" className="tile" style={t.dark ? { color: "var(--ink)" } : undefined} onClick={() => setFilter(t.key)}>
              <div className="tile-bg" style={{ background: t.bg }} />
              <img src={`/images/cut-${t.img}.png`} alt="" aria-hidden="true" />
              <div className="tile-label">
                <h3 className="mega">{t.title}</h3>
                <span className={"pill " + t.pill}>Shop</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
