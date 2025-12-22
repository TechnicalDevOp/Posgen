// PackageDetailModal.jsx
import React from "react";

function slugify(text = "") {
  return text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function getCountry(p){ return (p[""] || p.country || p.Country || "").toString(); }
function getRole(p){ return (p._2 || p.role || "").toString(); }
function getVisa(p){ return (p._1 || p.visaType || p._type || "").toString(); }
function getProcessing(p){ return (p._4 || p.processingTime || "").toString(); }

function parseCostAndCurrency(p) {
  const fields = [p._7, p._5, p.cost, p.salary, p.COST, p["COST"], p._8].filter(Boolean);
  const joined = fields.join(" ").replace(/\u00A0/g, " ");
  const currencyMatch = joined.match(/\b(USD|EUR|GHS|AED|QAR|CAD|GBP|dollars|euros|cedis)\b/i);
  const currency = currencyMatch ? currencyMatch[0].toUpperCase() : null;
  const numMatch = joined.replace(/[,]/g, "").match(/(\d+(\.\d+)?)/);
  const amount = numMatch ? Number(numMatch[0]) : null;
  const raw = fields.length ? fields[0] : "";
  return { amount, currency, raw };
}

export default function PackageDetailModal({ open, onClose, pkg, image }) {
  if (!open || !pkg) return null;
  const country = getCountry(pkg) || "Unknown";
  const role = getRole(pkg) || "-";
  const visa = getVisa(pkg) || "-";
  const processing = getProcessing(pkg) || "—";
  const { amount, currency, raw } = parseCostAndCurrency(pkg);
  const displayCurrency = currency || "GHS";
  const displayCost = amount != null ? amount.toLocaleString() : (raw || "—");
  const img = image || `/images/${slugify(country)}.jpg`;

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-black/60">
      <div className="w-full max-w-3xl rounded-2xl bg-[#071018] text-white ring-1 ring-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
          <h4 className="text-lg font-semibold">Package details</h4>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/5">Close</button>
        </div>

        <div className="p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div className="w-full h-56 bg-gray-800 overflow-hidden rounded-md">
            <img
              src={img}
              onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
              alt={country}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-semibold text-sand">{country}</div>
                <div className="text-sm text-white/70 mt-1">{role}</div>
                <div className="mt-2 text-sm text-white/70"><strong>Visa:</strong> {visa}</div>
              </div>

              <div className="text-right">
                <div className="text-sm text-white/70">Cost</div>
                <div className="text-xl font-semibold mt-1">{displayCost} <span className="text-xs text-white/60">({displayCurrency})</span></div>
              </div>
            </div>

            <div className="text-sm text-white/60">
              <div><strong>Processing:</strong> {processing}</div>
              {pkg._8 && <div className="mt-2"><strong>Includes:</strong> {pkg._8}</div>}
              {/* show full raw JSON fields for debugging if values are missing */}
              <div className="mt-3 text-xs text-white/40">
                <pre className="whitespace-pre-wrap">{JSON.stringify(pkg, null, 2)}</pre>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I want info about ${country} - ${role || visa}`)}`}
                className="px-4 py-2 rounded bg-[#25D366] text-black font-semibold"
                target="_blank" rel="noreferrer"
              >
                WhatsApp
              </a>

              <a href={`/travel-packages?country=${encodeURIComponent(country)}`} className="px-4 py-2 rounded bg-sand text-black font-semibold">
                View all packages for {country}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
