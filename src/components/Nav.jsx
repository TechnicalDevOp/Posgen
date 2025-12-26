// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaHotel,
  FaRoute,
  FaUmbrellaBeach,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const SERVICES = [
  { to: "/services/visit", title: "Visit Visa", desc: "Short-term visit permits" },
  { to: "/services/tourist", title: "Tourist Visa", desc: "Holiday & tourism visas" },
  { to: "/services/permanent-residency-work", title: "Permanent Residency for Work", desc: "Long-term work residency" },
  { to: "/services/permanent-residency-study", title: "Permanent Residency for Study", desc: "Study-to-residency pathways" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoveringDropdown, setHoveringDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setOpenMobile(false);
    setOpenServices(false);
    setMobileServicesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [openMobile]);

  /* Click outside dropdown */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenServices(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* Escape key closes menus */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenServices(false);
        setOpenMobile(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const link =
    "px-2 py-2 text-sm text-white/80 hover:text-sand transition";
  const active = "font-semibold text-sand border-b-2 border-sand";

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpenServices(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!hoveringDropdown) setOpenServices(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-white/15 shadow-lg"
          : "bg-black/30 backdrop-blur-sm border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between text-white">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-black/70 ring-1 ring-white/10 overflow-hidden">
            <img
              src="/images/logo.jpeg"
              alt="Posgen Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg">Posgen</div>
            <div className="text-[11px] text-white/60 -mt-0.5">
              Traveling Consult
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`${link} ${location.pathname === "/" ? active : ""}`}>
            Home
          </Link>

          <Link to="/about" className={`${link} ${location.pathname.startsWith("/about") ? active : ""}`}>
            About Us
          </Link>

          <Link to="/gallery" className={`${link} ${location.pathname === "/gallery" ? active : ""}`}>
            Gallery
          </Link>

          {/* SERVICES DROPDOWN */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`${link} inline-flex items-center gap-2`}
              onClick={(e) => {
                e.stopPropagation();
                setOpenServices((s) => !s);
              }}
            >
              Services
              {openServices ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openServices && (
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-[640px] max-w-[94vw] rounded-2xl bg-[#0E1318] ring-1 ring-white/10 shadow-2xl p-5"
                onMouseEnter={() => setHoveringDropdown(true)}
                onMouseLeave={() => {
                  setHoveringDropdown(false);
                  handleMouseLeave();
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  {/* COLUMN 1 */}
                  <div className="space-y-2">
                    <ServiceItem icon={<FaPlaneDeparture />} data={SERVICES[0]} />
                    <ServiceItem icon={<FaUmbrellaBeach />} data={SERVICES[1]} />
                  </div>

                  {/* COLUMN 2 */}
                  <div className="space-y-2">
                    <ServiceItem icon={<FaRoute />} data={SERVICES[2]} />
                    <ServiceItem icon={<FaHotel />} data={SERVICES[3]} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/contact" className={`${link} ${location.pathname === "/contact" ? active : ""}`}>
            Contact Us
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden w-10 h-10 rounded-md bg-white/10 border border-white/15"
          onClick={() => setOpenMobile(true)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMobile && (
        <MobilePanel
          onClose={() => setOpenMobile(false)}
          mobileServicesOpen={mobileServicesOpen}
          setMobileServicesOpen={setMobileServicesOpen}
        />
      )}
    </header>
  );
}

/* SERVICE ITEM */
function ServiceItem({ icon, data }) {
  return (
    <Link
      to={data.to}
      className="flex gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10"
    >
      <div className="w-11 h-11 grid place-items-center rounded-lg bg-white/5 text-sand text-xl">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{data.title}</div>
        <p className="text-xs text-white/70">{data.desc}</p>
      </div>
    </Link>
  );
}

/* MOBILE PANEL */
function MobilePanel({ onClose, mobileServicesOpen, setMobileServicesOpen }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/70">
      <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#0E1318] ring-1 ring-white/10">
        <div className="h-16 px-5 flex justify-between items-center border-b border-white/10">
          <span className="font-semibold">Menu</span>
          <button onClick={onClose}>✕</button>
        </div>

        <nav className="p-4 space-y-1">
          <MobileLink to="/" label="Home" onClose={onClose} />
          <MobileLink to="/about" label="About Us" onClose={onClose} />
          <MobileLink to="/gallery" label="Gallery" onClose={onClose} />

          <button
            onClick={() => setMobileServicesOpen((s) => !s)}
            className="w-full px-3 py-3 text-left rounded-lg hover:bg-white/5"
          >
            Services {mobileServicesOpen ? "▲" : "▼"}
          </button>

          {mobileServicesOpen &&
            SERVICES.map((s) => (
              <MobileLink key={s.to} to={s.to} label={s.title} onClose={onClose} />
            ))}

          <MobileLink to="/contact" label="Contact Us" onClose={onClose} />
        </nav>
      </div>
    </div>
  );
}

function MobileLink({ to, label, onClose }) {
  return (
    <Link
      to={to}
      onClick={onClose}
      className="block px-3 py-3 rounded-lg hover:bg-white/5"
    >
      {label}
    </Link>
  );
}
