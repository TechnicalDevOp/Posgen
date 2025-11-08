import React, { useMemo, useState, useEffect, useRef } from "react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/foot.jsx";
import FloatingActions from "../components/FloatingActions.jsx";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaExchangeAlt,
  FaUserFriends,
  FaShieldAlt,
  FaGlobeAfrica,
  FaHeadset,
  FaCheck,
  FaTag,
} from "react-icons/fa";

/* ----------------- Demo data for Autocomplete ----------------- */
const AIRPORTS = [
  { city: "Accra", code: "ACC", name: "Kotoka International" },
  { city: "Dubai", code: "DXB", name: "Dubai International" },
  { city: "Abu Dhabi", code: "AUH", name: "Zayed International" },
  { city: "Doha", code: "DOH", name: "Hamad International" },
  { city: "Nairobi", code: "NBO", name: "Jomo Kenyatta" },
  { city: "Lagos", code: "LOS", name: "Murtala Muhammed" },
  { city: "Johannesburg", code: "JNB", name: "O. R. Tambo" },
  { city: "London", code: "LHR", name: "Heathrow" },
  { city: "Istanbul", code: "IST", name: "Istanbul Airport" },
  { city: "New York", code: "JFK", name: "JFK" },
];

const CABINS = ["Economy", "Premium Economy", "Business", "First"];

export default function FlightBooking() {
  const [tripType, setTripType] = useState("return"); // 'oneway' | 'return'
  const [form, setForm] = useState({
    from: "",
    to: "",
    depart: "",
    return: "",
    passengers: 1,
    cabin: "Economy",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  /* ------------- handlers ------------- */
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const setField = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  const swap = () => setForm((p) => ({ ...p, from: p.to, to: p.from }));

  const incr = () => setForm((p) => ({ ...p, passengers: Math.min(9, Number(p.passengers) + 1) }));
  const decr = () => setForm((p) => ({ ...p, passengers: Math.max(1, Number(p.passengers) - 1) }));

  /* ------------- validation ------------- */
  const validate = (v) => {
    const e = {};
    if (!v.from.trim()) e.from = "Enter departure city/airport.";
    if (!v.to.trim()) e.to = "Enter destination city/airport.";
    if (v.from && v.to && v.from.trim().toLowerCase() === v.to.trim().toLowerCase()) {
      e.to = "Departure and destination cannot be the same.";
    }
    if (!v.depart) e.depart = "Select a departure date.";
    if (tripType === "return") {
      if (!v.return) e.return = "Select a return date.";
      if (v.depart && v.return && new Date(v.return) < new Date(v.depart)) {
        e.return = "Return must be after departure.";
      }
    }
    const pax = Number(v.passengers);
    if (!pax || pax < 1 || pax > 9) e.passengers = "Passengers must be 1–9.";
    if (!CABINS.includes(v.cabin)) e.cabin = "Choose a cabin.";
    return e;
  };

  const allValid = useMemo(() => Object.keys(validate(form)).length === 0, [form, tripType]);

  /* ------------- submit ------------- */
  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1100));
      setResults({
        summary: `${form.from} → ${form.to} • ${form.cabin} • ${form.passengers} pax`,
        dates:
          tripType === "oneway"
            ? `Depart: ${form.depart}`
            : `Depart: ${form.depart} • Return: ${form.return}`,
        suggestions: [
          {
            code: "PG101",
            note: "Best value",
            bag: "1×23kg",
            change: "Flexible",
            fromPrice: "$399",
            logo: "/images/airlines/etihad.png",
            bg: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop",
          },
          {
            code: "PG302",
            note: "Shortest time",
            bag: "2×23kg",
            change: "Semi-flex",
            fromPrice: "$520",
            logo: "/images/airlines/emirates.png",
            bg: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1600&auto=format&fit=crop",
          },
          {
            code: "PG808",
            note: "Business saver",
            bag: "2×32kg",
            change: "Flexible",
            fromPrice: "$999",
            logo: "/images/airlines/qatar.png",
            bg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
          },
        ],
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* ========== HERO with video background ========== */}
      <section className="relative pt-24 md:pt-28 pb-24 overflow-hidden">
        {/* Background video (muted, loop) */}
        <div className="absolute inset-0 -z-10">
          <video
            className="w-full h-full object-cover opacity-60"
            autoPlay
            playsInline
            muted
            loop
            preload="metadata"
            // Replace with your own hosted mp4 to avoid CORS issues
            src="https://videos.pexels.com/video-files/855575/855575-hd_1280_720_25fps.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E12]/40 via-[#0A0E12]/60 to-[#0A0E12]" />
          {/* soft glows */}
          <div
            className="absolute -top-24 right-[-10%] w-[700px] h-[700px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(196,155,108,0.18), transparent)" }}
          />
          <div
            className="absolute -bottom-16 left-[-10%] w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(184,115,51,0.14), transparent)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Promo ribbon */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <FaTag className="text-sand" />
            <span className="text-sm">Early bird deals to Dubai & Europe • Limited seats</span>
          </div>

          <div className="grid lg:grid-cols-[1fr,520px] gap-8 items-start">
            {/* Copy */}
            <div className="min-w-[280px]">
              <nav className="text-xs text-white/60 mb-2">
                <span className="hover:text-white/80">Home</span> <span className="opacity-40">/</span>{" "}
                <span className="text-white/80">Book Flight</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-display leading-tight">
                Book a <span className="text-sand">Flight</span>
              </h1>
              <p className="mt-3 text-white/80 max-w-2xl">
                Flexible fares, trusted routes, and premium support — fly with confidence with Postgen.
              </p>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <Badge icon={<FaShieldAlt />} title="Secure" sub="Protected checkout" />
                <Badge icon={<FaGlobeAfrica />} title="Global" sub="Major airlines" />
                <Badge icon={<FaHeadset />} title="Support" sub="7-day assistance" />
              </div>

              {/* Airline strip with real images (graceful fallback) */}
              <div className="mt-6 flex items-center gap-6 opacity-90">
                {[
                  "/images/airlines/etihad.png",
                  "/images/airlines/emirates.png",
                  "/images/airlines/qatar.png",
                  "/images/airlines/turkish.png",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="h-8 w-24 bg-white/10 rounded overflow-hidden ring-1 ring-white/10 grid place-items-center"
                  >
                    <img
                      src={src}
                      alt="Airline partner"
                      className="h-6 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add("bg-white/20");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating glass search card */}
            <div className="w-full lg:w-auto sticky top-24">
              <div className="rounded-3xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,.35)] overflow-hidden">
                {/* Toggle pills */}
                <div className="p-2 bg-white/5">
                  <div className="relative grid grid-cols-2 text-sm rounded-full overflow-hidden ring-1 ring-white/10">
                    <button
                      className={`py-2 ${tripType === "return" ? "bg-sand text-black font-semibold" : "text-white/80"}`}
                      onClick={() => setTripType("return")}
                    >
                      Return
                    </button>
                    <button
                      className={`py-2 ${tripType === "oneway" ? "bg-sand text-black font-semibold" : "text-white/80"}`}
                      onClick={() => setTripType("oneway")}
                    >
                      One way
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form className="p-5 md:p-6 grid gap-4" onSubmit={onSubmit} noValidate>
                  {/* From / To with swap + Autocomplete */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3">
                    <Field label="From" error={errors.from}>
                      <AutoInput
                        icon={<FaPlaneDeparture className="text-white/70" />}
                        placeholder="Accra (ACC) or city"
                        value={form.from}
                        onSelect={(val) => setField("from", val)}
                        onChange={(val) => setField("from", val)}
                      />
                    </Field>

                    <div className="flex items-end justify-center">
                      <button
                        type="button"
                        onClick={swap}
                        title="Swap"
                        className="mt-6 h-11 w-11 grid place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 active:scale-95 transition"
                      >
                        <FaExchangeAlt />
                      </button>
                    </div>

                    <Field label="To" error={errors.to}>
                      <AutoInput
                        icon={<FaPlaneArrival className="text-white/70" />}
                        placeholder="Dubai (DXB) or city"
                        value={form.to}
                        onSelect={(val) => setField("to", val)}
                        onChange={(val) => setField("to", val)}
                      />
                    </Field>
                  </div>

                  {/* Dates */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Departure" error={errors.depart}>
                      <input
                        type="date"
                        name="depart"
                        value={form.depart}
                        onChange={onChange}
                        className="w-full bg-white/5 px-3 py-2 rounded-xl outline-none ring-1 ring-white/10 focus:ring-sand transition"
                      />
                    </Field>

                    <Field label="Return" error={errors.return}>
                      <input
                        type="date"
                        name="return"
                        value={form.return}
                        onChange={onChange}
                        disabled={tripType === "oneway"}
                        className="w-full bg-white/5 px-3 py-2 rounded-xl outline-none ring-1 ring-white/10 focus:ring-sand transition disabled:opacity-60"
                      />
                    </Field>
                  </div>

                  {/* Pax + Cabin */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Passengers" error={errors.passengers}>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl ring-1 ring-white/10 px-2 py-2">
                        <button type="button" onClick={decr} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15">–</button>
                        <div className="flex items-center gap-2">
                          <FaUserFriends className="text-white/70" />
                          <input
                            type="number"
                            name="passengers"
                            value={form.passengers}
                            onChange={onChange}
                            min={1}
                            max={9}
                            className="w-16 bg-transparent outline-none text-center"
                          />
                        </div>
                        <button type="button" onClick={incr} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15">+</button>
                      </div>
                    </Field>

                    <Field label="Cabin" error={errors.cabin}>
                      <div className="grid grid-cols-2 gap-2">
                        {CABINS.map((c) => (
                          <label
                            key={c}
                            className={`px-3 py-2 rounded-xl text-sm cursor-pointer ring-1 transition ${
                              form.cabin === c
                                ? "bg-sand text-black ring-sand"
                                : "bg-white/5 ring-white/10 hover:bg-white/10"
                            }`}
                          >
                            <input
                              type="radio"
                              name="cabin"
                              value={c}
                              checked={form.cabin === c}
                              onChange={onChange}
                              className="hidden"
                            />
                            {c}
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="text-white/70 text-sm">
                      <span className="inline-flex items-center gap-1">
                        <FaCheck className="text-sand" /> Best-price guidance
                      </span>{" "}
                      • Free 24h hold on select fares
                    </div>
                    <button
                      type="submit"
                      disabled={!allValid || submitting}
                      className={`px-6 py-3 rounded-xl font-semibold text-black transition ${
                        !allValid || submitting
                          ? "bg-sand/60 cursor-not-allowed"
                          : "bg-sand hover:opacity-95 active:scale-[0.99]"
                      }`}
                    >
                      {submitting ? "Searching…" : "Search Flights"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESULTS ========== */}
      {submitting && (
        <div className="max-w-7xl mx-auto px-6 -mt-10 pb-12">
          <Skeleton />
        </div>
      )}

      {results && !submitting && (
        <section className="-mt-10 pb-16 relative">
          {/* Decorative flourish */}
          <div className="pointer-events-none absolute inset-x-0 -top-12 -z-10">
            <svg className="mx-auto opacity-10" width="1200" height="220" viewBox="0 0 1200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 150 C 300 250, 900 50, 1200 160" stroke="url(#g)" strokeWidth="2" fill="none"/>
              <defs>
                <linearGradient id="g" x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C49B6C"/>
                  <stop offset="1" stopColor="#B87333"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{results.summary}</div>
                  <div className="text-white/70">{results.dates}</div>
                </div>
                <div className="text-sm text-white/60">Demo results • connect your flight API</div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {results.suggestions.map((s, i) => (
                  <ResultCard key={i} data={s} />
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://wa.me/233555000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#25D366] text-black font-semibold hover:opacity-95 transition"
                >
                  Ask on WhatsApp
                </a>
                <a
                  href="/contact"
                  className="px-5 py-3 rounded-xl bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                >
                  Contact a Consultant
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== INSPIRATION / POPULAR DESTINATIONS ====== */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-white/60">Let us inspire your next trip</p>
              <h2 className="relative text-2xl md:text-3xl font-display inline-block">
                Popular <span className="text-sand">Destinations</span>
                <span className="absolute left-0 -bottom-2 h-[2px] w-24 bg-gradient-to-r from-sand/60 to-transparent rounded-full" />
              </h2>
            </div>
            <a href="#" className="text-sand/90 hover:text-sand">View all</a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                city: "Dubai",
                price: "from $499",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
              },
              {
                city: "Istanbul",
                price: "from $420",
                img: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1600&auto=format&fit=crop",
              },
              {
                city: "Doha",
                price: "from $460",
                img: "https://images.unsplash.com/photo-1569091791842-7cfb64e0473d?q=80&w=1600&auto=format&fit=crop",
              },
              {
                city: "Johannesburg",
                price: "from $380",
                img: "https://images.unsplash.com/photo-1552844836-1f9cc69e45d6?q=80&w=1600&auto=format&fit=crop",
              },
            ].map((d, i) => (
              <article
                key={i}
                className="relative h-60 rounded-2xl overflow-hidden group ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
              >
                <img
                  src={d.img}
                  alt={d.city}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-4 bottom-4 right-4">
                  <div className="text-white/85">{d.price}</div>
                  <h3 className="text-xl font-semibold">{d.city}</h3>
                </div>
                <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/15 text-xs">
                  Round trip · Economy
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REASSURANCE STRIP ========== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { title: "Flexible Fares", desc: "Hold options, mix cabins, and routes that fit your schedule." },
            { title: "Premium Support", desc: "From booking to boarding, our team is with you every step." },
            { title: "Global Partners", desc: "Access to major airlines and alliances worldwide." },
          ].map((b, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 ring-1 ring-white/10">
              <div className="text-sand font-semibold">{b.title}</div>
              <div className="text-white/70 mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}

/* ================= helpers ================= */

function Field({ label, error, children }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm mb-1 text-white/90">{label}</label>
        {error && <span className="text-[11px] text-red-400">{error}</span>}
      </div>
      {children}
    </div>
  );
}

function Badge({ icon, title, sub }) {
  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-3">
      <div className="flex items-center gap-2">
        <span className="text-sand">{icon}</span>
        <div className="text-sm">
          <div className="font-semibold">{title}</div>
          <div className="text-white/60 text-[12px] -mt-0.5">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 animate-pulse">
      <div className="h-6 w-64 bg-white/10 rounded-md" />
      <div className="mt-2 h-4 w-40 bg-white/10 rounded-md" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-white/10 p-5 h-36" />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ data }) {
  const logo = data.logo || "/images/airlines/etihad.png";
  const bg =
    data.bg ||
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop";

  return (
    <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 overflow-hidden hover:ring-sand transition">
      {/* subtle banner image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E12]" />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-white/10 rounded grid place-items-center ring-1 ring-white/10 overflow-hidden">
            <img
              src={logo}
              alt="Airline"
              className="h-6 w-auto object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div>
            <div className="text-white/90 font-semibold">{data.code}</div>
            <div className="text-white/60 text-sm">{data.note}</div>
          </div>
        </div>
        <span className="text-sand text-sm">from {data.fromPrice || "$399"}</span>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 text-sm text-white/80">
        <div>Bag: {data.bag}</div>
        <div>Changes: {data.change}</div>
      </div>

      <div className="relative mt-5 flex gap-3">
        <button className="px-4 py-2 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition">
          Hold & Enquire
        </button>
        <button className="px-4 py-2 rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition">
          Details
        </button>
      </div>
    </div>
  );
}

/* ======== Minimal, dependency-free Autocomplete for airports ======== */
function AutoInput({ icon, placeholder, value, onSelect, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(value || "");
  const wrapRef = useRef(null);

  useEffect(() => setQ(value || ""), [value]);

  useEffect(() => {
    const onClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const s = (q || "").toLowerCase().trim();
    if (!s) return AIRPORTS.slice(0, 5);
    return AIRPORTS.filter(
      (a) =>
        a.city.toLowerCase().includes(s) ||
        a.code.toLowerCase().includes(s) ||
        a.name.toLowerCase().includes(s)
    ).slice(0, 7);
  }, [q]);

  const pick = (a) => {
    const label = `${a.city} (${a.code})`;
    onSelect?.(label);
    onChange?.(label);
    setQ(label);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center gap-2 bg-white/5 rounded-xl ring-1 ring-white/10 px-3 py-2 focus-within:ring-sand transition">
        {icon}
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            onChange?.(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder-white/50"
          autoComplete="off"
        />
      </div>

      {open && (
        <div className="absolute z-20 left-0 right-0 mt-2 rounded-2xl bg-[#0E1318] ring-1 ring-white/10 shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <div className="px-3 py-3 text-sm text-white/60">No matches</div>
          ) : (
            results.map((a) => (
              <button
                key={a.code}
                type="button"
                onClick={() => pick(a)}
                className="w-full text-left px-3 py-3 hover:bg-white/5 transition"
              >
                <div className="text-sm">
                  <span className="font-semibold">{a.city}</span>{" "}
                  <span className="text-white/60">({a.code})</span>
                </div>
                <div className="text-xs text-white/50">{a.name}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
