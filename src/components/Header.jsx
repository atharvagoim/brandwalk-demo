import { useEffect, useState } from "react";
import { WaIcon, InstaIcon, MenuIcon, CloseIcon } from "./Icons.jsx";
import { waURL, INSTAGRAM } from "../lib.js";

const NAV = [
  { label: "New in", href: "#new" },
  { label: "Men", href: "#shop" },
  { label: "Women", href: "#shop", jump: "women" },
  { label: "Running", href: "#shop", jump: "running" },
  { label: "Sale", href: "#shop", sale: true },
];

export function Promo() {
  return (
    <div className="promo" role="note">
      <div className="promo-rot">
        <span>Shipping all over India on prepaid orders</span>
        <span>100% original branded footwear. Nothing else.</span>
        <span>Up to 70% off MRP. <a href="#shop">Shop the drop</a></span>
      </div>
    </div>
  );
}

export default function Header({ setFilter }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (item) => () => {
    if (item.jump) setFilter(item.jump);
    setOpen(false);
  };
  const hello = waURL("Hi Brand Walk Kandivali! I'd like to know about the latest stock.");

  return (
    <>
      <header className={"head" + (hidden ? " hide" : "")}>
        <div className="wrap">
          <a href="#" className="wordmark" aria-label="Brand Walk Kandivali home">
            <img src="/images/logo-v2.png" alt="" />Brand Walk
          </a>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className={n.sale ? "sale" : ""} onClick={go(n)}>{n.label}</a>
            ))}
          </nav>
          <div className="head-actions">
            <a className="icon-btn" href={hello} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><WaIcon size={28} /></a>
            <a className="icon-btn" href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram"><InstaIcon size={28} /></a>
            <button className="icon-btn menu-btn" aria-label="Open menu" aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div className={"drawer" + (open ? " open" : "")} id="drawer" aria-hidden={!open}>
        <div className="drawer-top">
          <button className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}><CloseIcon /></button>
        </div>
        <nav>
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className={n.sale ? "sale" : ""} onClick={go(n)}>{n.label}</a>
          ))}
          <a href="#store" onClick={() => setOpen(false)}>Visit the store</a>
        </nav>
        <p>Order in a few messages. Real photos of your pair before you pay.</p>
        <a className="pill pill-dark" href={hello} target="_blank" rel="noopener" onClick={() => setOpen(false)}>Chat on WhatsApp</a>
      </div>
    </>
  );
}
