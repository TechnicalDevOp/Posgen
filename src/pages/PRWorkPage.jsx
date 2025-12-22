// src/pages/PRWorkPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Nav"; // adjust if your path differs
import Footer from "../components/foot"; // adjust if your path differs
import { FaSearch, FaDollarSign, FaBriefcase } from "react-icons/fa";

/* ---------- helpers ---------- */
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
function getImageForCountry(country) {
  return `/images/${slugify(country || "placeholder")}.jpg`;
}

/* ---------- constants ---------- */
const SERVICE_LABEL = "Permanent Residency — Work";
const KEYWORDS = ["permanent", "resid", "work", "employment", "pr"];

/* ---------- component ---------- */
export default function PRWorkPage() {
  const [pkgs, setPkgs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ q: "", budget: "", currency: "GHS" });
  const [results, setResults] = useState([]);
  const imgErrorRef = useRef(new Set());
  const qRef = useRef();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/data/packages_clean.json")
      .then((r) => r.ok ? r.json() : Promise.reject("packages not found"))
      .then((data) => mounted && setPkgs(Array.isArray(data) ? data : []))
      .catch((err) => { console.error(err); if (mounted) setPkgs([]); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // search handler
  const doSearch = (e) => {
    e?.preventDefault();
    if (!pkgs) return;
    const s = (query.q || "").trim().toLowerCase();
    const budgetNum = query.budget ? Number(query.budget) : null;

    const matches = pkgs.filter((p) => {
      const country = (p[""] || p.country || p.Country || "").toString().toLowerCase();
      const role = (p._2 || p.role || "").toString().toLowerCase();
      const visa = (p._1 || p.visaType || p._type || "").toString().toLowerCase();

      const textMatch = s === "" || country.includes(s) || role.includes(s) || visa.includes(s);
      const visaMatch = KEYWORDS.some(k => visa.includes(k));
      const { amount } = parseCostAndCurrency(p);
      const budgetMatch = budgetNum == null || amount == null || amount <= budgetNum;

      return textMatch && visaMatch && budgetMatch;
    });

    setResults(matches);
    // smooth scroll to results
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const clear = () => { setQuery({ q: "", budget: "", currency: "GHS" }); setResults([]); qRef.current?.focus(); };

  const displayed = results.length ? results : [];

  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] bg-[#020519] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero / header */}
          <div className="rounded-2xl bg-gradient-to-r from-[#07101a] to-[#041022] p-6 md:p-8 shadow-xl border border-white/5 mb-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-semibold text-sand">{SERVICE_LABEL}</h1>
                <p className="text-white/70 mt-2 max-w-2xl">
                  Browse long-term permanent residency packages tailored for employment — curated options and full package details.
                </p>
              </div>

              <form onSubmit={doSearch} className="w-full md:w-[480px]">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,140px,110px] gap-3 items-end">
                  <div className="col-span-1">
                    <label className="text-xs text-white/60 uppercase">Country or Role</label>
                    <div className="mt-1 bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3 ring-1 ring-white/10">
                      <FaBriefcase className="text-sand" />
                      <input
                        ref={qRef}
                        value={query.q}
                        onChange={(e) => setQuery((p) => ({ ...p, q: e.target.value }))}
                        placeholder="e.g. Canada, Australia, Nurse"
                        className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/60 uppercase">Max Budget</label>
                    <div className="mt-1 bg-white/5 rounded-2xl px-3 py-3 flex items-center gap-3 ring-1 ring-white/10">
                      <FaDollarSign className="text-sand" />
                      <input
                        type="number"
                        min="0"
                        value={query.budget}
                        onChange={(e) => setQuery((p) => ({ ...p, budget: e.target.value }))}
                        placeholder="e.g. 10000"
                        className="bg-transparent outline-none text-white w-full placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/60 uppercase">Currency</label>
                    <select
                      value={query.currency}
                      onChange={(e) => setQuery((p) => ({ ...p, currency: e.target.value }))}
                      className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-3 text-white ring-1 ring-white/10"
                    >
                      <option>GHS</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-sand text-black font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition"
                    >
                      <FaSearch /> Search
                    </button>
                    <button type="button" onClick={clear} className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10">
                      Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* status */}
          <div className="mb-6 text-white/60">
            {loading ? "Loading packages…" : `${displayed.length} permanent residency work packages`}
          </div>

          {/* results grid */}
          <section>
            {loading && <div className="py-12 text-center text-white/60">Loading…</div>}

            {!loading && displayed.length === 0 && (
              <div className="py-12 text-center text-white/60">No permanent residency (work) packages found for your search.</div>
            )}

            {!loading && displayed.length > 0 && (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {displayed.map((p, idx) => {
                  const country = getCountry(p) || "Unknown";
                  const role = getRole(p) || "-";
                  const visa = getVisa(p) || "-";
                  const { amount, currency, raw } = parseCostAndCurrency(p);
                  const displayCurrency = currency || query.currency || "GHS";
                  const displayCost = amount != null ? amount.toLocaleString() : (raw || "—");
                  const img = getImageForCountry(country);
                  const originalIndex = pkgs ? pkgs.indexOf(p) : idx;
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
                            if (imgErrorRef.current.has(src)) return;
                            imgErrorRef.current.add(src);
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }}
                        />
                        <div className="absolute left-3 top-3 bg-black/40 px-3 py-1 rounded text-xs">{visa}</div>
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
                              <div className="font-semibold mt-1">
                                {displayCost} <span className="text-xs text-white/60">({displayCurrency})</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-white/60">
                            <div><strong>Processing:</strong> {(p && (p._4 || p.processingTime)) || "—"}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <Link
                            to={`/package/${pkgId}`}
                            state={{ pkg: p, pkgId, originalIndex }}
                            className="px-3 py-2 rounded-lg bg-sand text-black font-semibold text-sm"
                          >
                            See Package
                          </Link>

                          <a
                            href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I want info about ${country} - ${role || visa}`)}`}
                            className="px-3 py-2 rounded-lg bg-[#25D366] text-black font-semibold text-sm"
                            target="_blank" rel="noreferrer"
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
        </div>
      </main>

      <Footer />
    </>
  );
}
