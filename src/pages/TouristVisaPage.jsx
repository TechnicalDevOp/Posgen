// src/pages/VisitPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav"; // adjust path if different
import Footer from "../components/foot"; // adjust path if different
import { FaMapMarkerAlt, FaDollarSign, FaSearch } from "react-icons/fa";

/* ---------- helpers (reuse / consistent with your other pages) ---------- */
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
    .filter(Boolean).map(String);
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
  return `/images/${slugify(country || "placeholder")}.jpg`;
}

/* ---------- component ---------- */
export default function VisitPage() {
  const [pkgs, setPkgs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ text: "", maxBudget: "", currency: "GHS" });
  const [results, setResults] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const imgErrors = useRef(new Set());
  const textRef = useRef(null);

  // load packages JSON
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/data/packages_clean.json")
      .then((r) => {
        if (!r.ok) throw new Error("packages not found");
        return r.json();
      })
      .then((data) => { if (mounted) setPkgs(Array.isArray(data) ? data : []); })
      .catch((err) => { console.error(err); if (mounted) setPkgs([]); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // build list of visit/tourist packages (keeps original index for stable ids)
  const visitPkgs = useMemo(() => {
    if (!pkgs) return null;
    return pkgs
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => {
        const visa = (getVisa(p) || "").toLowerCase();
        return visa.includes("visit") || visa.includes("tourist") || visa.includes("tour");
      });
  }, [pkgs]);

  // reactive filtered list (applies query)
  const filtered = useMemo(() => {
    if (!visitPkgs) return null;
    const txt = (query.text || "").trim().toLowerCase();
    const budget = query.maxBudget ? Number(query.maxBudget) : null;
    return visitPkgs.filter(({ p }) => {
      const country = (getCountry(p) || "").toLowerCase();
      const role = (getRole(p) || "").toLowerCase();
      const visa = (getVisa(p) || "").toLowerCase();
      const textMatch = !txt || country.includes(txt) || role.includes(txt) || visa.includes(txt);
      const { amount } = parseCostAndCurrency(p);
      const budgetMatch = budget == null || amount == null || amount <= budget;
      return textMatch && budgetMatch;
    });
  }, [visitPkgs, query]);

  // when user submits search, show results (and scroll)
  const onSearchSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);
    setResults(filtered || []);
    // smooth scroll to results
    window.scrollTo({ top: 340, behavior: "smooth" });
  };

  const onClear = () => {
    setQuery({ text: "", maxBudget: "", currency: "GHS" });
    setResults([]);
    setSubmitted(false);
    textRef.current?.focus();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-[80vh] bg-[#020519] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          {/* Hero */}
          <section className="mb-8">
            <div className="rounded-2xl bg-gradient-to-r from-[#061021] to-[#021022] p-6 md:p-8 shadow-xl border border-white/5 flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-semibold text-sand">Visit & Tourist Visas</h1>
                <p className="text-white/70 mt-2 max-w-2xl">
                  Explore curated tourist & visit visa packages. Search by country, job role, or set a maximum budget to find packages that match your needs.
                </p>
              </div>

              <div className="w-full md:w-[420px]">
                <form onSubmit={onSearchSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr,120px] gap-3">
                  <label className="text-xs text-white/60 uppercase">Country / Role</label>
                  <div className="col-span-1 sm:col-span-2 grid grid-cols-1 md:grid-cols-[1fr,120px,110px] gap-3 items-end">
                    <div>
                      <div className="bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3 ring-1 ring-white/10">
                        <FaMapMarkerAlt className="text-sand" />
                        <input
                          ref={textRef}
                          value={query.text}
                          onChange={(e) => setQuery(q => ({ ...q, text: e.target.value }))}
                          placeholder="e.g. Italy, Spain, nurse"
                          className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                          aria-label="Country or role"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="sr-only">Max Budget</label>
                      <div className="bg-white/5 rounded-2xl px-3 py-3 flex items-center gap-3 ring-1 ring-white/10">
                        <FaDollarSign className="text-sand" />
                        <input
                          type="number"
                          min="0"
                          value={query.maxBudget}
                          onChange={(e) => setQuery(q => ({ ...q, maxBudget: e.target.value }))}
                          placeholder="Max"
                          className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                          aria-label="Maximum budget"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="sr-only">Currency</label>
                      <select
                        value={query.currency}
                        onChange={(e) => setQuery(q => ({ ...q, currency: e.target.value }))}
                        className="w-full rounded-2xl bg-white/5 px-3 py-3 text-white ring-1 ring-white/10"
                        aria-label="Currency"
                      >
                        <option>GHS</option>
                        <option>USD</option>
                        <option>EUR</option>
                      </select>
                    </div>

                    <div className="md:col-span-3 flex gap-3 mt-1">
                      <button
                        type="submit"
                        aria-label="Search visit packages"
                        className="flex-1 md:flex-none flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-sand text-black font-semibold shadow-md
                                   hover:shadow-lg hover:scale-[1.02] active:scale-[0.995] transition-transform duration-200 ease-out
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/50"
                      >
                        <FaSearch className="w-4 h-4" />
                        Search
                      </button>

                      <button
                        type="button"
                        onClick={onClear}
                        className="px-4 py-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Status */}
          <div className="mb-6 text-sm text-white/60">
            {loading ? "Loading packages…" : `${(results.length && submitted) ? results.length : (filtered ? filtered.length : 0)} visit packages available`}
          </div>

          {/* Results grid */}
          <section aria-live="polite">
            {loading && <div className="py-12 text-center text-white/60">Loading…</div>}

            {!loading && submitted && results.length === 0 && (
              <div className="py-12 text-center text-white/60">No visit packages match your search.</div>
            )}

            {!loading && (!submitted) && (!filtered || filtered.length === 0) && (
              <div className="py-12 text-center text-white/60">No tourist packages indexed yet.</div>
            )}

            {!loading && (submitted ? results : filtered) && ( (submitted ? results : filtered).length > 0 ) && (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {(submitted ? results : filtered).map((p, idx) => {
                  // if results is the raw row array or mapped shape: handle both
                  const row = p.p ? p.p : p; // if visitPkgs used earlier, it's {p,index}
                  const originalIndex = (p.index != null) ? p.index : (pkgs ? pkgs.indexOf(row) : idx);
                  const country = getCountry(row) || "Unknown";
                  const role = getRole(row) || "-";
                  const visa = getVisa(row) || "Visit";
                  const { amount, currency: detectedCurrency, raw } = parseCostAndCurrency(row);
                  const displayCurrency = detectedCurrency || query.currency || "GHS";
                  const displayCost = amount != null ? amount.toLocaleString() : (raw || "—");
                  const img = imageForCountry(country);
                  const pkgId = `${slugify(country)}-${originalIndex}`;

                  return (
                    <article key={pkgId} className="rounded-xl overflow-hidden bg-[#081015] ring-1 ring-white/5 shadow-md flex flex-col">
                      <div className="h-44 relative bg-gray-800">
                        <img
                          src={img}
                          alt={country}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const src = e.currentTarget.getAttribute("src");
                            if (imgErrors.current?.has && imgErrors.current.has(src)) return;
                            imgErrors.current.add(src);
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
                            <div><strong>Processing:</strong> {(row && (row._4 || row.processingTime)) || "—"}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <Link
                            to={`/package/${pkgId}`}
                            state={{ pkg: row, pkgId, originalIndex }}
                            className="px-3 py-2 rounded-lg bg-sand text-black font-semibold text-sm"
                          >
                            See Package
                          </Link>

                          <a
                            href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I want info about ${country}`)}`}
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
