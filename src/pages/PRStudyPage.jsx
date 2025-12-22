// src/pages/StudyPRPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav";
import Footer from "../components/foot";
import { FaMapMarkerAlt, FaDollarSign, FaSearch, FaGraduationCap } from "react-icons/fa";

/**
 * Study Visa (Pathway to Permanent Residency) page
 * - Includes Navbar and Footer (import your existing components)
 * - Uses POSGEN styling tokens/classes used across your app (text-sand, bg-sand, etc.)
 * - Modern hero, responsive filters, lazy images with placeholder fallback
 * - Filters only packages whose visa text suggests "study"/"student"
 *
 * Put package images at: public/images/<country-slug>.jpg
 * Provide fallback: public/images/placeholder.jpg
 */

/* ---------- helpers ---------- */
function slugify(text = "") {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function getCountry(p) {
  return (p && (p[""] || p.country || p.Country || "")) || "";
}
function getRole(p) {
  return (p && (p._2 || p.role || "")) || "";
}
function getVisa(p) {
  return (p && (p._1 || p.visaType || p._type || "")) || "";
}
function parseCostAndCurrency(p) {
  const fields = [p && p._7, p && p._5, p && p.cost, p && p.salary, p && p.COST, p && p["COST"], p && p._8]
    .filter(Boolean)
    .map(String);
  const joined = fields.join(" ").replace(/\u00A0/g, " ");
  const currencyMatch = joined.match(/\b(USD|EUR|GHS|AED|QAR|CAD|GBP|US\$|€|dollars|euros|cedis)\b/i);
  let currency = currencyMatch ? currencyMatch[0] : null;
  if (currency) {
    currency = currency.replace("US$", "USD").replace("€", "EUR").toUpperCase();
    if (/dollars/i.test(currency)) currency = "USD";
    if (/euros/i.test(currency)) currency = "EUR";
    if (/cedis/i.test(currency)) currency = "GHS";
  }
  const numMatch = joined.replace(/[,]/g, "").match(/(\d+(\.\d+)?)/);
  const amount = numMatch ? Number(numMatch[0]) : null;
  const raw = fields.length ? fields[0] : "";
  return { amount, currency, raw };
}
function imageForCountry(country) {
  const slug = slugify(country || "placeholder");
  return `/images/${slug}.jpg`;
}

/* ---------- component ---------- */
export default function StudyPRPage() {
  const HERO_TITLE = "Study Visa (Pathway to Permanent Residency)";
  const HERO_SUB = "Study abroad packages that may lead to long-term residency. Explore curated study routes, scholarships, and student-to-PR pathways.";

  const [packages, setPackages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ q: "", maxBudget: "", currency: "GHS" });
  const [imgErrors] = useState(() => new Set());
  const inputRef = useRef();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/data/packages_clean.json")
      .then((r) => {
        if (!r.ok) throw new Error("packages not found");
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setPackages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load packages:", err);
        if (mounted) setPackages([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  // Only packages related to study / student
  const studyPkgs = useMemo(() => {
    if (!packages) return null;
    return packages
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => {
        const visa = (getVisa(p) || "").toLowerCase();
        // match common study/student terms
        return visa.includes("study") || visa.includes("student") || visa.includes("scholar");
      });
  }, [packages]);

  // Filtered by query (text and budget)
  const filtered = useMemo(() => {
    if (!studyPkgs) return null;
    const txt = (query.q || "").trim().toLowerCase();
    const budget = query.maxBudget ? Number(query.maxBudget) : null;
    return studyPkgs.filter(({ p }) => {
      const country = (getCountry(p) || "").toLowerCase();
      const role = (getRole(p) || "").toLowerCase();
      const visa = (getVisa(p) || "").toLowerCase();
      const textMatch =
        !txt || country.includes(txt) || role.includes(txt) || visa.includes(txt);
      const { amount } = parseCostAndCurrency(p);
      const budgetMatch = budget == null || amount == null || amount <= budget;
      return textMatch && budgetMatch;
    });
  }, [studyPkgs, query]);

  const onSearch = (e) => {
    e?.preventDefault();
    // UI is reactive — this keeps compatibility with a submit button
    inputRef.current?.blur();
    if (filtered) window.scrollTo({ top: 360, behavior: "smooth" });
  };

  const onClear = () => {
    setQuery({ q: "", maxBudget: "", currency: "GHS" });
    inputRef.current?.focus();
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative bg-[linear-gradient(120deg,#071018_0%,#021026_60%)] text-white"
        aria-hidden="false"
      >
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-2/3">
            <div className="inline-flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full mb-4">
              <FaGraduationCap className="text-sand" />
              <span className="text-xs text-white/80">Study & PR Pathways</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-sand">{HERO_TITLE}</h1>
            <p className="mt-3 text-white/70 max-w-2xl">{HERO_SUB}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="px-4 py-2 rounded-lg bg-sand text-black font-semibold">Get Advice</Link>
              <a href="#packages" className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10">Browse Study Packages</a>
            </div>
          </div>

          {/* Quick stats / card */}
          <div className="lg:w-1/3 bg-white/3 border border-white/6 rounded-2xl p-4">
            <div className="text-sm text-white/70">Available Study Packages</div>
            <div className="text-3xl font-bold text-sand mt-2">
              {packages ? (studyPkgs ? studyPkgs.length : 0) : "—"}
            </div>
            <div className="mt-3 text-xs text-white/60">
              Search by country, program or set a max budget. Packages are curated — contact us for full counselling.
            </div>
          </div>
        </div>
      </section>

      {/* Search / filters */}
      <main className="bg-[#020519] -mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-[1fr,220px,150px,140px] gap-3 items-end">
            <div>
              <label className="text-xs text-white/60 uppercase">Country / Program</label>
              <div className="mt-1 bg-white/5 rounded-xl ring-1 ring-white/10 px-4 py-3 flex items-center gap-3">
                <FaMapMarkerAlt className="text-sand" />
                <input
                  ref={inputRef}
                  value={query.q}
                  onChange={(e) => setQuery((s) => ({ ...s, q: e.target.value }))}
                  placeholder="e.g. Canada, Australia, MBA"
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 uppercase">Max Budget</label>
              <div className="mt-1 bg-white/5 rounded-xl ring-1 ring-white/10 px-4 py-3 flex items-center gap-3">
                <FaDollarSign className="text-sand" />
                <input
                  type="number"
                  min="0"
                  value={query.maxBudget}
                  onChange={(e) => setQuery((s) => ({ ...s, maxBudget: e.target.value }))}
                  placeholder="e.g. 5000"
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 uppercase">Currency</label>
              <select
                value={query.currency}
                onChange={(e) => setQuery((s) => ({ ...s, currency: e.target.value }))}
                className="mt-1 w-full bg-white/5 rounded-xl ring-1 ring-white/10 px-4 py-3 text-white"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClear}
                className="px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition"
                aria-label="Clear filters"
              >
                Clear
              </button>

              <button
                type="submit"
                className="relative px-5 py-3 rounded-xl bg-gradient-to-r from-[#F5C66A] to-[#F2A800] text-black font-semibold flex items-center gap-2 shadow-md transform hover:-translate-y-0.5 transition"
                aria-label="Search study packages"
              >
                <FaSearch />
                <span className="whitespace-nowrap">Search</span>
              </button>
            </div>
          </form>

          {/* status */}
          <div className="mt-4 text-white/60 text-sm">
            {loading ? "Loading study packages…" : `${filtered?.length ?? 0} packages match`}
          </div>

          {/* results grid */}
          <section id="packages" className="mt-6">
            {loading && (
              <div className="py-12 text-center text-white/60">Loading…</div>
            )}

            {!loading && (!filtered || filtered.length === 0) && (
              <div className="py-12 text-center text-white/60">No study packages match your search.</div>
            )}

            {!loading && filtered && filtered.length > 0 && (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
                {filtered.map(({ p, index }) => {
                  const country = getCountry(p) || "Unknown";
                  const role = getRole(p) || "-";
                  const visa = getVisa(p) || "Study";
                  const { amount, currency: detectedCurrency, raw } = parseCostAndCurrency(p);
                  const displayCurrency = detectedCurrency || query.currency || "GHS";
                  const displayCost = amount != null ? amount.toLocaleString() : (raw || "—");
                  const img = imageForCountry(country);
                  const pkgId = `${slugify(country)}-${index}`;

                  return (
                    <article key={pkgId} className="rounded-xl overflow-hidden bg-[#081015] ring-1 ring-white/5 shadow-md flex flex-col">
                      <div className="h-48 relative">
                        <img
                          src={img}
                          alt={country}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const src = e.currentTarget.getAttribute("src");
                            if (imgErrors.has(src)) return;
                            imgErrors.add(src);
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }}
                        />
                        <div className="absolute left-3 top-3 bg-black/50 px-3 py-1 rounded text-xs">{visa}</div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-lg font-semibold text-sand">{country}</div>
                              <div className="text-sm text-white/70 mt-1">{role}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-white/70">Estimated Cost</div>
                              <div className="font-semibold mt-1">{displayCost} <span className="text-xs text-white/60">({displayCurrency})</span></div>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-white/60">
                            <div><strong>Processing:</strong> {(p && (p._4 || p.processingTime)) || "—"}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <Link
                            to={`/package/${pkgId}`}
                            state={{ pkg: p, pkgId, originalIndex: index }}
                            className="px-3 py-2 rounded-lg bg-sand text-black font-semibold text-sm"
                          >
                            See Package
                          </Link>

                          <a
                            href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I'm interested in study package for ${country}. Please send details.`)}`}
                            className="px-3 py-2 rounded-lg bg-[#25D366] text-black font-semibold text-sm"
                            target="_blank"
                            rel="noreferrer"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* bottom CTA */}
          <div className="mt-10 text-center">
            <Link to="/contact" className="inline-block px-6 py-3 rounded-lg bg-sand text-black font-semibold shadow">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
