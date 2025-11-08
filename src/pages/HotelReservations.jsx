import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/foot.jsx";
import FloatingActions from "../components/FloatingActions.jsx";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaCoffee,
  FaSpa,
  FaUtensils,
  FaCheck,
  FaTag,
} from "react-icons/fa";

/* ---------------- Demo City Data (autocomplete) ---------------- */
const CITIES = [
  { city: "Accra", country: "Ghana" },
  { city: "Dubai", country: "UAE" },
  { city: "Abu Dhabi", country: "UAE" },
  { city: "Doha", country: "Qatar" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Nairobi", country: "Kenya" },
  { city: "Johannesburg", country: "South Africa" },
  { city: "Cape Town", country: "South Africa" },
  { city: "Mombasa", country: "Kenya" },
  { city: "Lagos", country: "Nigeria" },
];

export default function HotelReservations() {
  const [form, setForm] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    rooms: 1,
    guests: 2,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // tiny validation
  const validate = (v) => {
    const e = {};
    if (!v.destination.trim()) e.destination = "Choose a destination.";
    if (!v.checkin) e.checkin = "Select check-in.";
    if (!v.checkout) e.checkout = "Select check-out.";
    if (v.checkin && v.checkout && new Date(v.checkout) <= new Date(v.checkin)) {
      e.checkout = "Check-out must be after check-in.";
    }
    const r = Number(v.rooms);
    if (!r || r < 1 || r > 8) e.rooms = "Rooms: 1–8.";
    const g = Number(v.guests);
    if (!g || g < 1 || g > 20) e.guests = "Guests: 1–20.";
    return e;
  };

  const allValid = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      // simulate fetch
      await new Promise((r) => setTimeout(r, 1000));
      setResults({
        summary: `${form.destination} • ${form.rooms} room(s) • ${form.guests} guest(s)`,
        dates: `Check-in: ${form.checkin} • Check-out: ${form.checkout}`,
        hotels: DEMO_HOTELS.map((h) => ({
          ...h,
          // optional dynamic tweak
          tag: Math.random() > 0.5 ? "Breakfast included" : "Free cancellation",
        })),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* ======= HERO ======= */}
      <section className="relative pt-24 md:pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <video
            className="w-full h-full object-cover opacity-60"
            autoPlay
            playsInline
            muted
            loop
            preload="metadata"
            src="https://videos.pexels.com/video-files/2031742/2031742-uhd_2560_1440_24fps.mp4"
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
            <span className="text-sm">Seasonal offers • Save up to 20% on luxury stays</span>
          </div>

          <div className="grid lg:grid-cols-[1fr,520px] gap-8 items-start">
            {/* Copy */}
            <div className="min-w-[280px]">
              <nav className="text-xs text-white/60 mb-2">
                <span className="hover:text-white/80">Home</span> <span className="opacity-40">/</span>{" "}
                <span className="text-white/80">Hotel Reservations</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-display leading-tight">
                Reserve your <span className="text-sand">Stay</span>
              </h1>
              <p className="mt-3 text-white/80 max-w-2xl">
                Handpicked hotels, curated for comfort and style—experience Postgen’s premium hospitality network.
              </p>

              {/* highlights */}
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <Badge icon={<FaCheck />} title="Best picks" sub="Curated stays" />
                <Badge icon={<FaWifi />} title="Perks" sub="Free Wi-Fi" />
                <Badge icon={<FaCoffee />} title="Comfort" sub="Breakfast options" />
              </div>
            </div>

            {/* Sticky glass search card */}
            <div className="w-full lg:w-auto sticky top-24">
              <div className="rounded-3xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,.35)] overflow-hidden">
                <form className="p-5 md:p-6 grid gap-4" onSubmit={onSubmit} noValidate>
                  {/* Destination */}
                  <Field label="Destination" error={errors.destination}>
                    <AutoCity
                      icon={<FaMapMarkerAlt className="text-white/70" />}
                      placeholder="City or region (e.g., Dubai)"
                      value={form.destination}
                      onSelect={(val) => setForm((p) => ({ ...p, destination: val }))}
                      onChange={(val) => setForm((p) => ({ ...p, destination: val }))}
                    />
                  </Field>

                  {/* Dates */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Check-in" error={errors.checkin}>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl ring-1 ring-white/10 px-3 py-2 focus-within:ring-sand transition">
                        <FaCalendarAlt className="text-white/70" />
                        <input
                          type="date"
                          name="checkin"
                          value={form.checkin}
                          onChange={onChange}
                          className="w-full bg-transparent outline-none placeholder-white/50"
                        />
                      </div>
                    </Field>
                    <Field label="Check-out" error={errors.checkout}>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl ring-1 ring-white/10 px-3 py-2 focus-within:ring-sand transition">
                        <FaCalendarAlt className="text-white/70" />
                        <input
                          type="date"
                          name="checkout"
                          value={form.checkout}
                          onChange={onChange}
                          className="w-full bg-transparent outline-none placeholder-white/50"
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Guests / Rooms */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Rooms" error={errors.rooms}>
                      <input
                        type="number"
                        name="rooms"
                        min={1}
                        max={8}
                        value={form.rooms}
                        onChange={onChange}
                        className="w-full bg-white/5 px-3 py-2 rounded-xl outline-none ring-1 ring-white/10 focus:ring-sand transition"
                      />
                    </Field>
                    <Field label="Guests" error={errors.guests}>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl ring-1 ring-white/10 px-3 py-2 focus-within:ring-sand transition">
                        <FaUserFriends className="text-white/70" />
                        <input
                          type="number"
                          name="guests"
                          min={1}
                          max={20}
                          value={form.guests}
                          onChange={onChange}
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="text-white/70 text-sm">
                      Free cancellation on select rates
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
                      {submitting ? "Searching…" : "Search Hotels"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      {submitting && (
        <div className="max-w-7xl mx-auto px-6 -mt-8 pb-12">
          <SkeletonRows />
        </div>
      )}

      {results && !submitting && (
        <section className="-mt-8 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{results.summary}</div>
                  <div className="text-white/70">{results.dates}</div>
                </div>
                <div className="text-sm text-white/60">
                  Demo results • connect your hotel API later
                </div>
              </div>

              {/* Grid of hotel cards */}
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.hotels.map((h, i) => (
                  <HotelCard key={i} data={h} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Popular Stays / Inspiration */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-white/60">Handpicked for comfort</p>
              <h2 className="relative text-2xl md:text-3xl font-display inline-block">
                Popular <span className="text-sand">Stays</span>
                <span className="absolute left-0 -bottom-2 h-[2px] w-24 bg-gradient-to-r from-sand/60 to-transparent rounded-full" />
              </h2>
            </div>
            <a href="#" className="text-sand/90 hover:text-sand">View all</a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_STAYS.map((d, i) => (
              <article
                key={i}
                className="relative h-60 rounded-2xl overflow-hidden group ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
              >
                <img
                  src={d.img}
                  alt={d.city}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute left-4 bottom-4 right-4">
                  <div className="text-white/85">{d.note}</div>
                  <h3 className="text-xl font-semibold">{d.city}</h3>
                </div>
              </article>
            ))}
          </div>
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

function SkeletonRows() {
  return (
    <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 animate-pulse">
      <div className="h-6 w-60 bg-white/10 rounded-md" />
      <div className="mt-2 h-4 w-40 bg-white/10 rounded-md" />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 rounded-2xl bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function HotelCard({ data }) {
  return (
    <article className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-sand transition shadow-[0_20px_60px_rgba(0,0,0,.35)]">
      <div className="relative h-40">
        <img src={data.img} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur ring-1 ring-white/20 text-xs">
          {data.tag}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{data.name}</h3>
            <div className="text-white/60 text-sm flex items-center gap-1">
              <FaMapMarkerAlt className="text-white/50" />
              {data.area}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="flex items-center justify-end gap-1 text-sand">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className={i < data.stars ? "opacity-100" : "opacity-25"} />
              ))}
            </div>
            <div className="text-white/70 text-xs mt-1">{data.reviews} reviews</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-white/80">
          {data.perks.includes("wifi") && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
              <FaWifi /> Wi-Fi
            </span>
          )}
          {data.perks.includes("pool") && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
              <FaSwimmingPool /> Pool
            </span>
          )}
          {data.perks.includes("breakfast") && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
              <FaUtensils /> Breakfast
            </span>
          )}
          {data.perks.includes("spa") && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
              <FaSpa /> Spa
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="text-white/70 text-sm">
            {data.refundable ? "Free cancellation" : "Non-refundable"}
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">from</div>
            <div className="text-2xl font-semibold text-sand">{data.price}</div>
            <button className="mt-2 px-4 py-2 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition">
              View Rooms
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ====== Autocomplete for Cities (no deps) ====== */
function AutoCity({ icon, placeholder, value, onSelect, onChange }) {
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
    if (!s) return CITIES.slice(0, 6);
    return CITIES.filter(
      (c) =>
        c.city.toLowerCase().includes(s) ||
        c.country.toLowerCase().includes(s)
    ).slice(0, 8);
  }, [q]);

  const pick = (a) => {
    const label = `${a.city}, ${a.country}`;
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
            results.map((a, i) => (
              <button
                key={`${a.city}-${i}`}
                type="button"
                onClick={() => pick(a)}
                className="w-full text-left px-3 py-3 hover:bg-white/5 transition"
              >
                <div className="text-sm font-semibold">{a.city}</div>
                <div className="text-xs text-white/60">{a.country}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Demo Data ---------------- */
const DEMO_HOTELS = [
  {
    name: "Marina Grand Hotel",
    area: "Dubai Marina, Dubai",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
    stars: 5,
    reviews: "1,204",
    price: "$229",
    perks: ["wifi", "pool", "breakfast", "spa"],
    refundable: true,
  },
  {
    name: "The Sandstone Palace",
    area: "The Palm, Dubai",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop",
    stars: 5,
    reviews: "987",
    price: "$318",
    perks: ["wifi", "pool", "spa"],
    refundable: true,
  },
  {
    name: "Cedar Boulevard",
    area: "Airport Residential, Accra",
    img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600&auto=format&fit=crop",
    stars: 4,
    reviews: "643",
    price: "$149",
    perks: ["wifi", "breakfast"],
    refundable: false,
  },
  {
    name: "Harbour View Suites",
    area: "Victoria & Alfred, Cape Town",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    stars: 4,
    reviews: "812",
    price: "$172",
    perks: ["wifi", "pool"],
    refundable: true,
  },
  {
    name: "Oasis Downtown",
    area: "Westlands, Nairobi",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
    stars: 4,
    reviews: "520",
    price: "$138",
    perks: ["wifi", "breakfast"],
    refundable: true,
  },
  {
    name: "Renaissance Court",
    area: "Istanbul Old City, Istanbul",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
    stars: 5,
    reviews: "1,034",
    price: "$260",
    perks: ["wifi", "pool", "spa"],
    refundable: false,
  },
];

const POPULAR_STAYS = [
  {
    city: "Dubai",
    note: "Skyline views • 5★",
    img: "https://images.unsplash.com/photo-1536129802803-8e1bfc7d0f97?q=80&w=1600&auto=format&fit=crop",
  },
  {
    city: "Doha",
    note: "Corniche • Luxury",
    img: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    city: "Accra",
    note: "Airport Residential",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
  },
  {
    city: "Istanbul",
    note: "Old City Charms",
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600&auto=format&fit=crop",
  },
];
