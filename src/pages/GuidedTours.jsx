import React, { useState } from "react";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/foot.jsx";
// import Contactform from "../components/contactform.jsx";
import FloatingActions from "../components/FloatingActions.jsx"; // keep if not global
import {
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

const TOURS = [
  {
    id: "ct-01",
    title: "Cape Town & Winelands Escape",
    country: "South Africa",
    duration: "6 days",
    group: "Small group (10–16)",
    rating: 4.8,
    price: "From $1,250",
    img: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Table Mountain", "V&A Waterfront", "Winelands tasting"],
  },
  {
    id: "zn-01",
    title: "Zanzibar Blue Waters Retreat",
    country: "Tanzania",
    duration: "5 days",
    group: "Private / Couple",
    rating: 4.7,
    price: "From $980",
    img: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Stone Town", "Pristine beaches", "Spice tour"],
  },
  {
    id: "gh-01",
    title: "Accra Culture & Cape Coast Heritage",
    country: "Ghana",
    duration: "4 days",
    group: "Small group (8–14)",
    rating: 4.9,
    price: "From GHS 5,499",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Cape Coast Castle", "Kakum canopy walk", "Local cuisine"],
  },
  {
    id: "ke-01",
    title: "Masai Mara Safari Adventure",
    country: "Kenya",
    duration: "7 days",
    group: "Small group (8–12)",
    rating: 4.8,
    price: "From $1,690",
    img: "https://images.unsplash.com/photo-1533551802269-c9c3a3b38b48?q=80&w=1600&auto=format&fit=crop",
    highlights: ["Big Five safari", "Sunrise drive", "Cultural village"],
  },
];

export default function GuidedTours() {
  const [openContact, setOpenContact] = useState(false);

  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pb-16 bg-[radial-gradient(900px_500px_at_70%_-10%,#112635_0%,#0B1620_60%,#0A0E12_100%)]">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-display">
            Guided <span className="text-sand">Tours</span>
          </h1>
          <p className="mt-3 text-white/75 max-w-2xl">
            Curated, stress-free journeys led by local experts — from heritage
            trails to luxury beach escapes and bucket-list safaris.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setOpenContact(true)}
              className="px-6 py-3 rounded-full bg-sand text-black font-semibold hover:opacity-95 transition"
            >
              Customize a Tour
            </button>
            <a
              href="#tours"
              className="px-6 py-3 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              Explore Tours
            </a>
          </div>
        </div>
      </section>

      {/* Tours grid */}
      <section id="tours" className="py-14">
        <div className="max-w-7xl mx-auto px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOURS.map((t) => (
            <TourCard key={t.id} tour={t} onEnquire={() => setOpenContact(true)} />
          ))}
        </div>
      </section>

      {/* What’s included / How it works */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
            <h3 className="text-2xl font-semibold">
              What’s <span className="text-sand">included</span>
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                "Handpicked hotels & lodges",
                "Airport pickup & transfers",
                "Daily breakfasts or meals per itinerary",
                "Licensed local tour guides",
                "Entrance fees & permits",
                "24/7 trip support by Postgen",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 text-sand" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
            <h3 className="text-2xl font-semibold">
              How it <span className="text-sand">works</span>
            </h3>
            <ol className="mt-4 space-y-3 text-white/80">
              <li>
                <span className="font-semibold text-white">1) Tell us your vibe:</span>{" "}
                dates, budget, travel style (luxury, adventure, culture).
              </li>
              <li>
                <span className="font-semibold text-white">2) We propose two options:</span>{" "}
                flexible itineraries and transparent pricing.
              </li>
              <li>
                <span className="font-semibold text-white">3) Book & relax:</span>{" "}
                we handle tickets, hotels, guides and on-trip support.
              </li>
            </ol>

            <button
              onClick={() => setOpenContact(true)}
              className="mt-6 px-6 py-3 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
            >
              Start Planning
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-display text-center">
            Frequently Asked <span className="text-sand">Questions</span>
          </h3>
          <div className="mt-8 space-y-4">
            <FAQ
              q="Can we customize these tours?"
              a="Yes. All tours are customizable — switch hotels, add days, or change activities. We’ll tailor it to your budget and pace."
            />
            <FAQ
              q="Do you arrange visas and insurance?"
              a="We assist with flight bookings, hotel confirmations and travel letters for visa applications. We can recommend trusted insurance providers."
            />
            <FAQ
              q="Are flights included in the price?"
              a="Prices shown are for the land package unless otherwise stated. We can bundle flights at competitive rates."
            />
            <FAQ
              q="Is it safe to travel with your guides?"
              a="Absolutely. We work with licensed, vetted local guides and trusted partners. Your safety and comfort are our top priorities."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-display">
            Ready for your next <span className="text-sand">guided adventure</span>?
          </h3>
          <p className="text-white/75 mt-3">
            Tell us your dates and travel style — we’ll craft a perfect itinerary.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setOpenContact(true)}
              className="px-6 py-3 rounded-full bg-sand text-black font-semibold hover:opacity-95 transition"
            >
              Get a Free Plan
            </button>
            <a
              href="https://wa.me/233555000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-black font-semibold hover:opacity-95 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Contact popup */}
      {/* <Contactform open={openContact} onClose={() => setOpenContact(false)} /> */}

      {/* If FloatingActions is not global, keep this. If it is, you can remove this import + component. */}
      <FloatingActions />
    </main>
  );
}

function TourCard({ tour, onEnquire }) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-sand transition shadow-[0_25px_70px_rgba(0,0,0,.35)] flex flex-col">
      <div className="relative h-48">
        <img
          src={tour.img}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute left-3 top-3 px-3 py-1 text-[11px] rounded-full bg-black/50 ring-1 ring-white/10">
          {tour.country}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h4 className="text-lg font-semibold">{tour.title}</h4>
        <div className="flex flex-wrap gap-3 text-sm text-white/75">
          <span className="inline-flex items-center gap-2">
            <FaClock /> {tour.duration}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaUsers /> {tour.group}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaMapMarkerAlt /> Guided
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <FaStar className="text-sand" />
          <span className="text-white/80">{tour.rating}</span>
          <span className="text-white/40">•</span>
          <span className="text-sand font-semibold">{tour.price}</span>
        </div>

        {/* Highlights */}
        <ul className="mt-1 text-sm text-white/75 list-disc list-inside">
          {tour.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <div className="mt-3 flex gap-2">
          <button
            onClick={onEnquire}
            className="px-4 py-2 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
          >
            Enquire
          </button>
          <a
            href="#"
            className="px-4 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
          >
            View Details
          </a>
        </div>
      </div>
    </article>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-3 flex items-center justify-between"
      >
        <span className="font-medium">{q}</span>
        <span className="text-sand">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-white/75">{a}</div>}
    </div>
  );
}
