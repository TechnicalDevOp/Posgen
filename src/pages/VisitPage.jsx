// src/pages/VisitPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaSearch } from "react-icons/fa";
import Navbar from "../components/Nav";
import Footer from "../components/foot";

/* ---------- helpers (matching your other utilities) ---------- */
function slugify(text = "") {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function getCountry(p) { return (p && (p[""] || p.country || p.Country || "") || "").toString(); }
function getRole(p) { return (p && (p._2 || p.role || "") || "").toString(); }
function getVisa(p) { return (p && (p._1 || p.visaType || p._type || "") || "").toString(); }
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

/* ---------- VisitPage component ---------- */
export default function VisitPage() {
  const [packages, setPackages] = useState(null);
  const [q, setQ] = useState({ text: "", maxBudget: "", currency: "GHS" });
  const [loading, setLoading] = useState(true);
  const imgErrorRef = useRef(new Set()); // stable set to avoid flicker loops
  const inputRef = useRef();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/data/packages_clean.json")
      .then((r) => {
        if (!r.ok) throw new Error("packages not found");
        return r.json();
      })
      .then((data) => { if (mounted) setPackages(Array.isArray(data) ? data : []); })
      .catch((err) => { console.error(err); if (mounted) setPackages([]); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // filter only visit/tourist packages and keep original index
  const visitPkgs = useMemo(() => {
    if (!packages) return null;
    return packages
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => {
        const visa = getVisa(p).toLowerCase();
        return visa.includes("visit") || visa.includes("visitor") || visa.includes("tourist") || visa.includes("tour");
      });
  }, [packages]);

  // apply UI filters (text search, budget)
  const filtered = useMemo(() => {
    if (!visitPkgs) return null;
    const txt = (q.text || "").trim().toLowerCase();
    const budget = q.maxBudget ? Number(q.maxBudget) : null;
    return visitPkgs.filter(({ p }) => {
      const country = getCountry(p).toLowerCase();
      const role = getRole(p).toLowerCase();
      const visa = getVisa(p).toLowerCase();
      const textMatch = !txt || country.includes(txt) || role.includes(txt) || visa.includes(txt);
      const { amount } = parseCostAndCurrency(p);
      const budgetMatch = budget == null || amount == null || amount <= budget;
      return textMatch && budgetMatch;
    });
  }, [visitPkgs, q]);

  const onSearchSubmit = (e) => { e?.preventDefault(); /* filters update reactively */ };

  return (
    <>
      <Navbar />

      <main className="min-h-[80vh] bg-[#020519] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-sand">Visit & Tourist Packages</h1>
            <p className="text-white/70 mt-2 max-w-2xl">
              Explore curated visit / tourist visa packages. Filter by country, profession and budget — fast and secure.
            </p>
          </header>

          {/* Search / Filters */}
          <form onSubmit={onSearchSubmit} className="grid grid-cols-1 md:grid-cols-[1fr,220px,160px,120px] gap-3 items-end mb-6">
            <div>
              <label className="text-xs text-white/60 uppercase">Country or Role</label>
              <div className="mt-1 bg-white/5 rounded-xl ring-1 ring-white/10 px-4 py-3 flex items-center gap-3">
                <FaMapMarkerAlt className="text-sand" />
                <input
                  ref={inputRef}
                  value={q.text}
                  onChange={(e) => setQ((s) => ({ ...s, text: e.target.value }))}
                  placeholder="e.g. Germany, Dubai, nurse"
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                  aria-label="Search country or role"
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
                  value={q.maxBudget}
                  onChange={(e) => setQ((s) => ({ ...s, maxBudget: e.target.value }))}
                  placeholder="e.g. 2000"
                  className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                  aria-label="Max budget"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 uppercase">Currency</label>
              <select
                value={q.currency}
                onChange={(e) => setQ((s) => ({ ...s, currency: e.target.value }))}
                className="mt-1 w-full bg-white/5 rounded-xl ring-1 ring-white/10 px-4 py-3 text-white"
                aria-label="Currency"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="w-full px-5 py-3 rounded-xl bg-sand text-black flex items-center justify-center gap-2">
                <FaSearch /> Search
              </button>
              <button
                type="button"
                onClick={() => { setQ({ text: "", maxBudget: "", currency: "GHS" }); inputRef.current?.focus(); }}
                className="px-4 py-3 rounded-xl bg-white/5 text-white"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Status */}
          <div className="mb-4 text-sm text-white/60">
            {loading ? "Loading visit packages…" : `${filtered?.length ?? 0} visit packages found`}
          </div>

          {/* Grid */}
          <section>
            {loading && <div className="py-12 text-center text-white/60">Loading…</div>}

            {!loading && (!filtered || filtered.length === 0) && (
              <div className="py-12 text-center text-white/60">No visit packages match your search.</div>
            )}

            {!loading && filtered && filtered.length > 0 && (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map(({ p, index }) => {
                  const country = getCountry(p) || "Unknown";
                  const role = getRole(p) || "-";
                  const visa = getVisa(p) || "Visit";
                  const { amount, currency: detectedCurrency, raw } = parseCostAndCurrency(p);
                  const displayCurrency = detectedCurrency || q.currency || "GHS";
                  const displayCost = amount != null ? amount.toLocaleString() : raw || "—";
                  const img = imageForCountry(country);
                  const pkgId = `${slugify(country)}-${index}`;

                  return (
                    <article key={pkgId} className="rounded-xl overflow-hidden bg-[#081015] ring-1 ring-white/5 shadow-md flex flex-col">
                      <div className="h-44 relative">
                        <img
                          src={img}
                          alt={country}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const src = e.currentTarget.getAttribute("src");
                            if (imgErrorRef.current.has(src)) return;
                            imgErrorRef.current.add(src);
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
                              <div className="text-sm text-white/70">Cost</div>
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
                            href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I want info about ${country} - ${role || visa}`)}`}
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

          {/* bottom link */}
          <div className="mt-8 text-center text-white/60">
            <Link to="/travel-packages" className="underline text-white hover:text-sand">View all packages</Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
