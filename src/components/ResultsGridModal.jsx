// ResultsGridModal.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* helpers */
function slugify(text = "") {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function getCountry(p) { return (p && (p[""] || p.country || p.Country || "") || "").toString(); }
function getRole(p) { return (p && (p._2 || p.role || "") || "").toString(); }
function getVisa(p) { return (p && (p._1 || p.visaType || p._type || "") || "").toString(); }
function getProcessing(p) { return (p && (p._4 || p.processingTime || "") || "").toString(); }

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

function imageCandidatesForCountry(country) {
  const slug = slugify(country || "placeholder");
  const c = [];
  for (let i = 1; i <= 4; i++) c.push(`/images/${slug}-${i}.jpg`);
  c.push(`/images/${slug}.jpg`);
  c.push(`/images/placeholder.jpg`);
  return c;
}

/**
 * ResultsGridModal
 * - open: boolean
 * - onClose: function
 * - results: array (rows from packages_clean.json)
 * - currency: default currency string (e.g. "GHS")
 */
export default function ResultsGridModal({ open, onClose, results = [], currency: defaultCurrency = "GHS" }) {
  const imgErrorRef = useRef(new Set()); // used as extra safety in case onError triggers
  const [imageMap, setImageMap] = useState(() => ({})); // { key -> goodImageUrl }

  // take a slice for display (top results)
  const topRaw = useMemo(() => (results || []).slice(0, 24), [results]);

  // Preload images for all items in topRaw and cache first-successful url
  useEffect(() => {
    if (!topRaw || topRaw.length === 0) {
      setImageMap({});
      return;
    }

    let cancelled = false;
    const nextMap = {}; // local cache while preloading

    async function preloadForAll() {
      for (let i = 0; i < topRaw.length; i++) {
        const p = topRaw[i];
        const country = getCountry(p) || "placeholder";
        const candidates = imageCandidatesForCountry(country);

        // Try each candidate sequentially until success
        let found = null;
        for (const url of candidates) {
          try {
            // create a short-lived Image to test
            await new Promise((resolve) => {
              const img = new window.Image();
              let done = false;
              const tidy = (ok) => {
                if (done) return;
                done = true;
                // small timeout to avoid tight loops in very slow networks
                setTimeout(() => resolve(ok), 0);
              };
              img.onload = () => tidy(true);
              img.onerror = () => tidy(false);
              img.src = url;
            }).then((ok) => {
              if (ok && !found) found = url;
            });
          } catch (err) {
            // ignore; try next candidate
          }
          if (found) break;
        }
        // fallback to placeholder
        if (!found) found = `/images/placeholder.jpg`;
        if (cancelled) return;
        // assign using a stable key: slug + original index (we will build originalIndex below)
        // but we don't yet know originalIndex here — we'll assign map by position in topRaw (i),
        // and later when rendering we compute pkgKey similarly and prefer the cached value.
        nextMap[i] = found;
      }

      if (!cancelled) setImageMap((prev) => ({ ...prev, ...nextMap }));
    }

    preloadForAll();

    return () => { cancelled = true; };
  }, [topRaw]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-start justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-7xl rounded-2xl bg-[#071018] text-white ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h3 className="text-xl font-semibold">Search results</h3>
            <div className="text-sm text-white/70">Showing {results?.length ?? 0} matches</div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/travel-packages" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">View all</Link>
            <button onClick={onClose} className="px-3 py-2 rounded-lg bg-white/5 text-sm">Close</button>
          </div>
        </div>

        <div className="p-6" style={{ maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}>
          {topRaw.length === 0 && <div className="p-8 text-center text-white/60">No packages matched your query.</div>}

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {topRaw.map((p, idx) => {
              // original index in the full results list (fallback to idx if not found)
              const origIdx = results.indexOf(p);
              const originalIndex = origIdx >= 0 ? origIdx : idx;

              const country = getCountry(p) || "Unknown";
              const role = getRole(p) || "-";
              const visa = getVisa(p) || "-";
              const processing = getProcessing(p) || "—";
              const { amount, currency, raw } = parseCostAndCurrency(p);
              const displayCurrency = currency || defaultCurrency || "—";
              const displayCost = (amount != null) ? amount.toLocaleString() : (raw || "—");
              const slug = slugify(country);
              const pkgId = `${slug}-${originalIndex}`;

              // choose cached image if available, else fallback to candidate[0] (optimistic) or placeholder
              const candidateList = imageCandidatesForCountry(country);
              // imageMap used numeric keys by position in topRaw; prefer mapped by idx
              const cached = imageMap.hasOwnProperty(idx) ? imageMap[idx] : null;
              const imgSrc = cached || candidateList[0] || "/images/placeholder.jpg";

              return (
                <article key={pkgId} className="rounded-xl overflow-hidden bg-[#081015] ring-1 ring-white/5 shadow-md flex flex-col">
                  <div className="h-44 bg-gray-800 relative flex-shrink-0">
                    <img
                      src={imgSrc}
                      alt={country}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300"
                      onError={(e) => {
                        // extra safety: replace only once per originalRequested (avoid flapping)
                        const originalRequested = e.currentTarget.getAttribute("src") || "";
                        if (!originalRequested) return;
                        if (imgErrorRef.current.has(originalRequested)) return;
                        imgErrorRef.current.add(originalRequested);
                        e.currentTarget.src = "/images/placeholder.jpg";
                      }}
                    />
                    <div className="absolute left-3 top-3 bg-black/40 px-3 py-1 rounded-md text-xs">{visa}</div>
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
                        <div><strong>Processing:</strong> {processing}</div>
                        {p && p._8 && <div className="mt-2"><strong>Includes:</strong> {p._8}</div>}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      {/* Link to a dedicated package page (new route) */}
                      <Link
                        to={`/package/${pkgId}`}
                        state={{ pkg: p, image: imgSrc, pkgId, originalIndex }}
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

          <div className="mt-6 text-center text-white/60">Showing top {topRaw.length} results · <Link to="/travel-packages" className="underline">View all packages</Link></div>
        </div>
      </div>
    </div>
  );
}
