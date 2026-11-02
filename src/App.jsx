import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { products } from "./data/products.js";
import { waURL } from "./lib.js";
import { WaIcon } from "./components/Icons.jsx";
import Header, { Promo } from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Tiles from "./components/Tiles.jsx";
import Rail from "./components/Rail.jsx";
import Shop from "./components/Shop.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { SaleBand, Editorial, SizeAndStore, Instagram, Footer } from "./components/Sections.jsx";

function Home({ filter, setFilter }) {
  return (
    <main>
      <Hero />
      <Tiles setFilter={setFilter} />
      <Rail products={products.filter((p) => p.isNew)} />
      <SaleBand />
      <Shop products={products} filter={filter} setFilter={setFilter} />
      <Editorial />
      <SizeAndStore />
      <Instagram />
    </main>
  );
}

/* scroll to #hash targets (or the top) after every route change */
function useScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const t = setTimeout(() => {
      const el = hash && document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname, hash]);
}

/* "#section" links work from any page: off the home page they route to "/#section" */
function useHashLinks() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || pathname === "/") return;
      e.preventDefault();
      navigate("/" + a.getAttribute("href"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, navigate]);
}

export default function App() {
  const [filter, setFilter] = useState("all");
  useScrollManager();
  useHashLinks();

  return (
    <>
      <Promo />
      <Header setFilter={setFilter} />
      <Routes>
        <Route path="/" element={<Home filter={filter} setFilter={setFilter} />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="*" element={<Home filter={filter} setFilter={setFilter} />} />
      </Routes>
      <Footer setFilter={setFilter} dark />
      <a className="fab" href={waURL("Hi Brand Walk Kandivali!")} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <WaIcon size={26} /><span>Chat</span>
      </a>
    </>
  );
}
