import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ResultsModal({ open, onClose, matches = [], query = {} }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-[#0A0E12] text-white p-5 ring-1 ring-white/10 shadow-2xl overflow-auto max-h-[85vh]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-semibold">Search results</h3>
            <p className="text-sm text-white/70">
              Showing <span className="text-sand font-semibold">{matches.length}</span> packages for “{query.location}” on {query.date}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/services/travel-packages"
              className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white/90"
            >
              View all packages
            </a>
            <button onClick={onClose} className="px-3 py-2 rounded-md bg-white/5">Close</button>
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-12 text-white/60">No matches found. Try another city or country.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {matches.map((p) => (
              <article key={p.id} className="rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10 p-3 flex gap-3">
                <img src={p.img || "/images/default.jpg"} alt={p.title} className="w-28 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{p.title}</h4>
                      <div className="text-sm text-white/70">{p.city}{p.country ? `, ${p.country}` : ""}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sand font-semibold">{p.price_usd ? `$${p.price_usd}` : p.price || ""}</div>
                      <div className="text-xs text-white/60">from</div>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 mt-2">{p.blurb}</p>
                  <div className="mt-3 flex gap-2 items-center">
                    <a
                      href={`https://wa.me/233555000000?text=Hi%20Postgen%2C%20I'm%20interested%20in%20${encodeURIComponent(p.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#25D366] text-black font-semibold"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a href={`/services/travel-packages`} className="inline-block px-3 py-2 rounded-md bg-sand text-black font-semibold">View details</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
