import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaHotel,
  FaRoute,
  FaUmbrellaBeach,
} from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [hoveringDropdown, setHoveringDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  // scroll behavior
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // auto-scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenMobile(false);
    setOpenServices(false);
  }, [location.pathname]);

  // lock body scroll on mobile open
  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [openMobile]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".services-menu")) {
        setOpenServices(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // link style
  const link =
    "px-2 py-2 text-sm text-white/80 hover:text-sand transition duration-200";
  const active = "font-semibold text-sand border-b-2 border-sand";

  // hover handling with delay
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpenServices(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!hoveringDropdown) setOpenServices(false);
    }, 100); // keep open for 300ms
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-white/15 shadow-lg"
          : "bg-black/30 backdrop-blur-sm border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between text-white">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-black/70 grid place-items-center ring-1 ring-white/10">
            <span className="text-sand font-bold">PG</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg">Postgen</div>
            <div className="text-[11px] text-white/60 -mt-0.5">Traveling Consult</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`${link} ${location.pathname === "/" ? active : ""}`}>
            Home
          </Link>
          <Link
            to="/about"
            className={`${link} ${location.pathname === "/about" ? active : ""}`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative services-menu"
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
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                className={`opacity-80 transition-transform ${
                  openServices ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {openServices && (
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-[620px] max-w-[94vw] rounded-2xl bg-[#0E1318] ring-1 ring-white/10 shadow-2xl p-5 transition-all duration-300"
                role="menu"
                onMouseEnter={() => setHoveringDropdown(true)}
                onMouseLeave={() => {
                  setHoveringDropdown(false);
                  handleMouseLeave();
                }}
              >
                {/* Top two-column section */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/services/flight-booking"
                    className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                  >
                    <div className="shrink-0 size-11 grid place-items-center rounded-lg bg-white/5">
                      <FaPlaneDeparture className="text-sand text-xl" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Flight Booking</div>
                      <p className="text-xs text-white/70 mt-0.5">
                        Best routes & flexible fares.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/services/hotel-reservations"
                    className="group flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                  >
                    <div className="shrink-0 size-11 grid place-items-center rounded-lg bg-white/5">
                      <FaHotel className="text-sand text-xl" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Hotel Reservations</div>
                      <p className="text-xs text-white/70 mt-0.5">
                        Luxury stays & great deals.
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Bottom row */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/services/guided-tours"
                    className="group flex-1 min-w-[260px] flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                  >
                    <div className="shrink-0 size-10 grid place-items-center rounded-lg bg-white/5">
                      <FaRoute className="text-sand" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Guided Tours</div>
                      <p className="text-[11px] text-white/70">
                        Local experts & curated routes.
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/services/travel-packages"
                    className="group flex-1 min-w-[260px] flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 ring-1 ring-transparent hover:ring-white/10 transition"
                  >
                    <div className="shrink-0 size-10 grid place-items-center rounded-lg bg-white/5">
                      <FaUmbrellaBeach className="text-sand" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Travel Packages</div>
                      <p className="text-[11px] text-white/70">
                        All-in-one, stress-free travel.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={`${link} ${location.pathname === "/contact" ? active : ""}`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center size-10 rounded-md bg-white/10 border border-white/15"
          onClick={() => setOpenMobile(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {openMobile && <MobilePanel onClose={() => setOpenMobile(false)} />}
    </header>
  );
}

function MobilePanel({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden">
      <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#0E1318] text-white shadow-2xl ring-1 ring-white/10">
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-black/70 grid place-items-center ring-1 ring-white/10">
              <span className="text-sand font-bold">PG</span>
            </div>
            <div className="font-semibold">Menu</div>
          </div>
          <button
            className="size-10 grid place-items-center rounded-md bg-white/10"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="px-5 py-4 space-y-2">
          <Link to="/" className="block px-3 py-3 rounded-lg hover:bg-white/5">
            Home
          </Link>
          <Link to="/about" className="block px-3 py-3 rounded-lg hover:bg-white/5">
            About Us
          </Link>
          <Link to="/services" className="block px-3 py-3 rounded-lg hover:bg-white/5">
            Services
          </Link>
          <Link to="/contact" className="block px-3 py-3 rounded-lg hover:bg-white/5">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
