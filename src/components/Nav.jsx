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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // close mobile & dropdown on route change
    setOpenMobile(false);
    setOpenServices(false);
    setMobileServicesOpen(false);
    // scroll top
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [openMobile]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setOpenServices(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // keyboard: escape closes menus
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
    "px-2 py-2 text-sm text-white/80 hover:text-sand transition duration-200";
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
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-black/70 grid place-items-center ring-1 ring-white/10 overflow-hidden">
            <img
              src="/images/logo.jpeg"
              alt="Posgen Logo"
              className="w-full h-full object-contain p-1"
              loading="eager"
            />
          </div>

          <div className="leading-tight">
            <div className="font-display text-lg">Posgen</div>
            <div className="text-[11px] text-white/60 -mt-0.5">
              Traveling Consult
            </div>
          </div>
      </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`${link} ${location.pathname === "/" ? active : ""}`}>
            Home
          </Link>

          <Link
            to="/about"
            className={`${link} ${location.pathname.startsWith("/about") ? active : ""}`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative services-menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <button
              className={`${link} inline-flex items-center gap-2`}
              aria-haspopup="true"
              aria-expanded={openServices}
              onClick={(e) => {
                e.stopPropagation();
                setOpenServices((s) => !s);
              }}
            >
              Services
              <span className="opacity-80 transition-transform">
                {openServices ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {/* Dropdown Menu */}
            {openServices && (
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-[640px] max-w-[94vw] rounded-2xl bg-[#0E1318] ring-1 ring-white/10 shadow-2xl p-5 transition-all duration-200"
                role="menu"
                onMouseEnter={() => setHoveringDropdown(true)}
                onMouseLeave={() => {
                  setHoveringDropdown(false);
                  handleMouseLeave();
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  {/* first column - Visit & Tourist */}
                  <div className="space-y-2">
                    <Link
                      to={SERVICES[0].to}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                      role="menuitem"
                    >
                      <div className="shrink-0 w-11 h-11 grid place-items-center rounded-lg bg-white/5">
                        <FaPlaneDeparture className="text-sand text-xl" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{SERVICES[0].title}</div>
                        <p className="text-xs text-white/70 mt-0.5">{SERVICES[0].desc}</p>
                      </div>
                    </Link>

                    <Link
                      to={SERVICES[1].to}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                      role="menuitem"
                    >
                      <div className="shrink-0 w-11 h-11 grid place-items-center rounded-lg bg-white/5">
                        <FaUmbrellaBeach className="text-sand text-xl" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{SERVICES[1].title}</div>
                        <p className="text-xs text-white/70 mt-0.5">{SERVICES[1].desc}</p>
                      </div>
                    </Link>
                  </div>

                  {/* second column - PR Work & PR Study */}
                  <div className="space-y-2">
                    <Link
                      to={SERVICES[2].to}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                      role="menuitem"
                    >
                      <div className="shrink-0 w-11 h-11 grid place-items-center rounded-lg bg-white/5">
                        <FaRoute className="text-sand text-xl" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{SERVICES[2].title}</div>
                        <p className="text-xs text-white/70 mt-0.5">{SERVICES[2].desc}</p>
                      </div>
                    </Link>

                    <Link
                      to={SERVICES[3].to}
                      className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                      role="menuitem"
                    >
                      <div className="shrink-0 w-11 h-11 grid place-items-center rounded-lg bg-white/5">
                        <FaHotel className="text-sand text-xl" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{SERVICES[3].title}</div>
                        <p className="text-xs text-white/70 mt-0.5">{SERVICES[3].desc}</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* footer quick links */}
                {/* <div className="mt-4 flex items-center justify-between">
                  <Link to="/services" className="text-sm text-white/70 hover:text-white underline">
                    View all services
                  </Link>
                  <div className="text-xs text-white/50">Need help? <Link to="/contact" className="text-sand font-medium">Contact us</Link></div>
                </div> */}
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={`${link} ${location.pathname === "/contact" ? active : ""}`}
          >
            Contact us
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 border border-white/15"
          onClick={() => setOpenMobile(true)}
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
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

/* Mobile drawer with collapsible Services group */
function MobilePanel({ onClose, mobileServicesOpen, setMobileServicesOpen }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden">
      <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#0E1318] text-white shadow-2xl ring-1 ring-white/10">
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-black/70 grid place-items-center ring-1 ring-white/10">
              <span className="text-sand font-bold">PG</span>
            </div>
            <div className="font-semibold">Menu</div>
          </div>
          <button
            className="w-10 h-10 grid place-items-center rounded-md bg-white/10"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-4 space-y-1">
          <Link to="/" className="block px-3 py-3 rounded-lg hover:bg-white/5" onClick={onClose}>
            Home
          </Link>
          <Link to="/about" className="block px-3 py-3 rounded-lg hover:bg-white/5" onClick={onClose}>
            About Us
          </Link>

          {/* Services collapsible */}
          <div className="border-t border-white/5 pt-3">
            <button
              onClick={() => setMobileServicesOpen((s) => !s)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5"
              aria-expanded={mobileServicesOpen}
            >
              <div className="flex items-center gap-3">
                <FaPlaneDeparture className="text-sand" />
                <span>Services</span>
              </div>
              <span>{mobileServicesOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>

            {mobileServicesOpen && (
              <div className="mt-2 space-y-1 px-2">
                {SERVICES.map((s) => (
                  <Link key={s.to} to={s.to} className="block px-3 py-2 rounded-lg hover:bg-white/5" onClick={onClose}>
                    <div className="text-sm font-medium">{s.title}</div>
                    <div className="text-xs text-white/60">{s.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="block px-3 py-3 rounded-lg hover:bg-white/5" onClick={onClose}>
            Contact
          </Link>

          <Link to="/services" className="block px-3 py-3 rounded-lg hover:bg-white/5" onClick={onClose}>
            All Services
          </Link>
        </nav>
      </div>
    </div>
  );
}
