import React, { useMemo, useState } from "react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/foot.jsx";
import FloatingActions from "../components/FloatingActions.jsx";
import {
  FaTag,
  FaUmbrellaBeach,
  FaHiking,
  FaHeart,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaPlaneDeparture,
  FaConciergeBell,
  FaWifi,
  FaBus,
} from "react-icons/fa";

const THEMES = [
  { key: "all", label: "All" },
  { key: "honeymoon", label: "Honeymoon", icon: <FaHeart /> },
  { key: "family", label: "Family", icon: <FaUsers /> },
  { key: "adventure", label: "Adventure", icon: <FaHiking /> },
  { key: "relax", label: "Relax", icon: <FaUmbrellaBeach /> },
  { key: "pilgrimage", label: "Pilgrimage", icon: <FaPlaneDeparture /> },
];

const PACKAGES = [
  {
    id: "DXB-5N",
    title: "Dubai Skylines Escape",
    city: "Dubai, UAE",
    nights: 5,
    stars: 5,
    price: "from $799",
    theme: "relax",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
    perks: ["flights", "hotel", "breakfast", "airport-transfer", "tour"],
    month: ["Jan","Feb","Mar","Oct","Nov","Dec"],
    blurb: "5 nights • Marina hotel • Desert safari • City tour",
  },
  {
    id: "CAPP-6N",
    title: "Cappadocia Balloons & Bazaars",
    city: "Istanbul & Cappadocia, Türkiye",
    nights: 6,
    stars: 4,
    price: "from $999",
    theme: "adventure",
    img: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1600&auto=format&fit=crop",
    perks: ["flights", "hotel", "breakfast", "local-guide"],
    month: ["Apr","May","Sep","Oct"],
    blurb: "Cave hotel • Sunrise balloons • Old city tour",
  },
  {
    id: "MAL-4N",
    title: "Maldives Overwater Bliss",
    city: "Malé, Maldives",
    nights: 4,
    stars: 5,
    price: "from $1,499",
    theme: "honeymoon",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    perks: ["flights", "resort", "breakfast", "speedboat"],
    month: ["Jan","Feb","Mar","Nov","Dec"],
    blurb: "Overwater villa • Sunset cruise • Private dinner",
  },
  {
    id: "MAAS-5N",
    title: "Maasai Mara Big Five",
    city: "Narok, Kenya",
    nights: 5,
    stars: 4,
    price: "from $1,180",
    theme: "adventure",
    img: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1600&auto=format&fit=crop",
    perks: ["flights", "camp", "all-meals", "game-drives"],
    month: ["Jul","Aug","Sep","Oct"],
    blurb: "Luxury tented camp • 2× daily game drives",
  },
  {
    id: "HJJ-7N",
    title: "Holy Journey • KSA",
    city: "Makkah & Madinah, KSA",
    nights: 7,
    stars: 4,
    price: "from $1,050",
    theme: "pilgrimage",
    img: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1600&auto=format&fit=crop",
    perks: ["flights", "hotel", "breakfast", "bus"],
    month: ["All"],
    blurb: "Return flights • Close-to-haram stays • Guided support",
  },
  {
    id: "CPT-5N",
    title: "Cape Town & Winelands",
    city: "Cape Town, South Africa",
    nights: 5,
    stars: 4,
    price: "from $920",
    theme: "family",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    perks: ["flights", "hotel", "breakfast", "tour"],
    month: ["Feb","Mar","Apr","Sep","Oct","Nov"],
    blurb: "Table Mountain • Cape Point • Vineyard tasting",
  },
];

export default function TravelPackages() {
  const [q, setQ] = useState("");
  const [theme, setTheme] = useState("all");
  const [duration, setDuration] = useState(7); // nights
  const [budget, setBudget] = useState(1500); // USD estimate
  const [month, setMonth] = useState("Any");

  const filtered = useMemo(() => {
    const toNum = (p) => Number((p.match(/\d+/) || [0])[0]);
    return PACKAGES.filter((p) => {
      const byTheme = theme === "all" || p.theme === theme;
      const byQ =
        !q.trim() ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.city.toLowerCase().includes(q.toLowerCase());
      const byDuration = p.nights <= duration;
      const byBudget = toNum(p.price) <= budget;
      const byMonth =
        month === "Any" || p.month.includes("All") || p.month.includes(month);
      return byTheme && byQ && byDuration && byBudget && byMonth;
    });
  }, [q, theme, duration, budget, month]);

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
            src="https://videos.pexels.com/video-files/3407729/3407729-uhd_2560_1440_24fps.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E12]/40 via-[#0A0E12]/60 to-[#0A0E12]" />
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
            <span className="text-sm">Save on curated bundles • Flights + Hotels + Tours</span>
          </div>

          <div className="grid lg:grid-cols-[1fr,520px] gap-8 items-start">
            {/* Copy */}
            <div>
              <nav className="text-xs text-white/60 mb-2">
                <span className="hover:text-white/80">Home</span> <span className="opacity-40">/</span>{" "}
                <span className="text-white/80">Holiday Packages</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-display leading-tight">
                Curated <span className="text-sand">Holiday Packages</span>
              </h1>
              <p className="mt-3 text-white/80 max-w-2xl">
                Handpicked experiences with flights, stays and tours—planned perfectly for you by Postgen.
              </p>

              {/* Selling points */}
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <Badge icon={<FaConciergeBell />} title="Concierge" sub="End-to-end support" />
                <Badge icon={<FaBus />} title="Transfers" sub="Hassle-free rides" />
                <Badge icon={<FaWifi />} title="Perks" sub="Premium add-ons" />
              </div>
            </div>

            {/* Glass Filters Card */}
            <div className="w-full lg:w-auto sticky top-24">
              <div className="rounded-3xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,.35)] overflow-hidden p-5 md:p-6">
                {/* Search */}
                <div className="mb-4">
                  <label className="block text-sm mb-1">Search destination or package</label>
                  <div className="bg-white/5 ring-1 ring-white/10 rounded-xl px-3 py-2">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="e.g., Dubai, Maldives, Cape Town"
                      className="w-full bg-transparent outline-none placeholder-white/50"
                    />
                  </div>
                </div>

                {/* Themes */}
                <div className="mb-4">
                  <label className="block text-sm mb-2">Theme</label>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTheme(t.key)}
                        className={`px-3 py-2 rounded-full text-sm ring-1 transition inline-flex items-center gap-2 ${
                          theme === t.key
                            ? "bg-sand text-black ring-sand"
                            : "bg-white/5 ring-white/10 hover:bg-white/10"
                        }`}
                      >
                        {t.icon && <span className="text-[13px]">{t.icon}</span>}
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month, Duration, Budget */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Month</label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-3 py-2 outline-none"
                    >
                      {["Any","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1 flex items-center gap-2">
                      <FaClock className="text-white/70" /> Max Nights: {duration}
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={10}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-[var(--postgen-sand)]"
                    />
                  </div>
                </div>

                <div className="mb-1">
                  <label className="block text-sm mb-1">Budget (USD): ≤ {budget}</label>
                  <input
                    type="range"
                    min={500}
                    max={3000}
                    step={50}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[var(--postgen-sand)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="-mt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="text-white/80 text-sm">
                Showing <span className="text-sand font-semibold">{filtered.length}</span> packages
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <PackageCard key={p.id} data={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY BOOK A PACKAGE */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { title: "One Booking, Everything", desc: "Flights, stays, transfers and tours handled together." },
            { title: "Better Value", desc: "Bundle savings and exclusive rates you won’t see elsewhere." },
            { title: "Local Expertise", desc: "Trusted guides & curated itineraries for peace of mind." },
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

/* ============== Components ============== */

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

function PackageCard({ data }) {
  return (
    <article className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-sand transition shadow-[0_20px_60px_rgba(0,0,0,.35)]">
      <div className="relative h-44">
        <img src={data.img} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur ring-1 ring-white/20 text-xs">
          <FaMapMarkerAlt /> {data.city}
        </div>
        <div className="absolute right-4 top-4 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-xs">
          {data.nights} nights
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{data.title}</h3>
            <div className="text-white/60 text-sm flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className={i < data.stars ? "text-sand" : "text-white/30"} />
              ))}
            </div>
            <p className="text-white/75 text-sm mt-2">{data.blurb}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs text-white/60">starting</div>
            <div className="text-xl font-semibold text-sand">{data.price}</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-white/80">
          {data.perks.includes("flights") && tag("Flights")}
          {data.perks.includes("hotel") && tag("Hotel")}
          {data.perks.includes("resort") && tag("Resort")}
          {data.perks.includes("breakfast") && tag("Breakfast")}
          {data.perks.includes("airport-transfer") && tag("Airport transfer")}
          {data.perks.includes("tour") && tag("City tour")}
          {data.perks.includes("speedboat") && tag("Speedboat")}
          {data.perks.includes("local-guide") && tag("Local guide")}
          {data.perks.includes("all-meals") && tag("All meals")}
          {data.perks.includes("camp") && tag("Luxury camp")}
          {data.perks.includes("bus") && tag("Intercity bus")}
        </div>

        <div className="mt-4 flex gap-3">
          <a
            href="/contact"
            className="px-4 py-2 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
          >
            Hold & Enquire
          </a>
          <a
            href={`https://wa.me/233555000000?text=Hi%20Postgen,%20I'm%20interested%20in%20the%20${encodeURIComponent(
              data.title
            )}%20package.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#25D366] text-black font-semibold hover:opacity-95 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function tag(label) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10">
      <FaConciergeBell className="opacity-80" /> {label}
    </span>
  );
}
