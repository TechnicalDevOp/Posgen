// components/SearchBar.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaMapMarkerAlt, FaFilter, FaSearch, FaDollarSign } from "react-icons/fa";
import ResultsGridModal from "./ResultsGridModal";

/**
 * Requirements (same as before):
 * - public/data/packages_clean.json
 * - public/images/<country-slug>.jpg and /images/placeholder.jpg
 */

function usePackages() {
  const [pkg, setPkg] = useState(null);
  useEffect(() => {
    fetch("/data/packages_clean.json")
      .then((r) => (r.ok ? r.json() : Promise.reject("not found")))
      .then(setPkg)
      .catch((err) => {
        console.error("Failed to load packages:", err);
        setPkg([]);
      });
  }, []);
  return pkg;
}

function parseNumericCost(p) {
  const candidates = [p._7, p._5, p.salary, p.cost, p.COST, p["COST"]];
  for (const c of candidates) {
    if (!c) continue;
    const match = String(c).replace(/[,]/g, "").match(/(\d+(\.\d+)?)/);
    if (match) return Number(match[0]);
  }
  return null;
}

export default function SearchBar() {
  const pkgs = usePackages();
  const [q, setQ] = useState({ country: "", visa: "Any", budget: "", currency: "GHS" });
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  const visaOptions = ["Any", "Work", "Visit", "Tourist", "Study", "Direct employment"];

  const confirmSearch = (e) => {
    e?.preventDefault();
    if (!pkgs) return;
    const s = (q.country || "").trim().toLowerCase();
    const budgetNum = q.budget ? Number(q.budget) : null;

    const matches = pkgs.filter((pRaw) => {
      const country = (pRaw[""] || pRaw.country || pRaw.Country || "").toString().toLowerCase();
      const role = (pRaw._2 || pRaw.role || "").toString().toLowerCase();
      const visaType = (pRaw._1 || pRaw._type || pRaw.visaType || "").toString().toLowerCase();

      const textMatch =
        s === "" ||
        country.includes(s) ||
        role.includes(s) ||
        visaType.includes(s);

      const visaMatch =
        q.visa === "Any" ||
        visaType.includes(q.visa.toLowerCase()) ||
        (String(pRaw._1 || "").toLowerCase().includes(q.visa.toLowerCase()));

      const numericCost = parseNumericCost(pRaw);
      const budgetMatch = budgetNum == null || numericCost == null || numericCost <= budgetNum;

      return textMatch && visaMatch && budgetMatch;
    });

    setResults(matches);
    setOpen(true);
  };


  

  const clear = () => {
    setQ({ country: "", visa: "Any", budget: "", currency: "GHS" });
    setResults([]);
  };



  const count = useMemo(() => (pkgs ? pkgs.length : 0), [pkgs]);

  // debug helper you can remove after confirming inputs are clickable:
  useEffect(() => {
    const handler = (e) => {
      // press `Ctrl` while hovering input to log underlying element
      if (e.ctrlKey) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        console.log("elementFromPoint under cursor:", el);
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <>
      <div className="relative w-[92%] md:w-[80%] lg:w-[65%] mt-8 mx-auto z-50">
        <form
          onSubmit={confirmSearch}
          className={`rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 
                     shadow-[0_18px_60px_rgba(0,0,0,.55)] px-5 py-5 md:px-6 md:py-6 
                     grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-4 items-end
                     pointer-events-auto`}
        >
          {/* COUNTRY/ROLE */}
          <div>
            <label className="text-[11px] uppercase tracking-wide text-white/50">Country or Role</label>
            <div className="flex items-center gap-3 bg-white/5 mt-1 px-4 py-3 rounded-xl ring-1 ring-white/10">
              <FaMapMarkerAlt className="text-sand" />
              <input
                value={q.country}
                onChange={(e) => setQ((p) => ({ ...p, country: e.target.value }))}
                placeholder="e.g. Dubai, Germany, Nurse"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50"
                aria-label="Country or role"
              />
            </div>
          </div>

          {/* VISA TYPE */}
<div>
  <label className="text-[11px] uppercase tracking-wide text-white/70">
    Visa Type
  </label>

  <div className="relative mt-1">
    <select
      value={q.visa}
      onChange={(e) => setQ((p) => ({ ...p, visa: e.target.value }))}
      className="w-full bg-white/10 px-4 py-3 rounded-xl ring-1 ring-white/10
                 text-white outline-none cursor-pointer pr-10
                 backdrop-blur-md"
      aria-label="Visa type"
    >
      {visaOptions.map((v) => (
        <option
          key={v}
          value={v}
          className="text-black bg-white"  // Ensures visibility inside dropdown
        >
          {v}
        </option>
      ))}
    </select>

    {/* Dropdown Icon */}
    {/* <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
      
    </span> */}
  </div>
</div>


          {/* BUDGET + CURRENCY */}
          <div>
            <label className="text-[11px] uppercase tracking-wide text-white/50">Max Budget (GHS / USD / EUR)</label>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-xl ring-1 ring-white/10 flex-1">
                <FaDollarSign className="text-sand" />
                <input
                  type="number"
                  value={q.budget}
                  onChange={(e) => setQ((p) => ({ ...p, budget: e.target.value }))}
                  placeholder="e.g. 5000"
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50"
                  aria-label="Budget"
                />
              </div>
              <select
                value={q.currency}
                onChange={(e) => setQ((p) => ({ ...p, currency: e.target.value }))}
                className="bg-white/5 px-3 py-3 rounded-xl ring-1 ring-white/10 text-sand"
                aria-label="Currency"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button type="button" onClick={clear} className="px-5 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10">Clear</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-sand text-black font-semibold flex items-center gap-2">
              <FaSearch /> Search
            </button>
          </div>

          {/* info row (span full width) */}
          <div className="md:col-span-4 text-white/60 text-sm mt-3">
            {/* {pkgs ? `${count} packages indexed · Results will show packages with cost ≤ your budget` : "Loading packages…"} */}
          </div>
        </form>
      </div>

      <ResultsGridModal
        open={open}
        onClose={() => setOpen(false)}
        results={results}
        currency={q.currency}
      />
    </>
  );
}
