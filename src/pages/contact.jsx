import React, { useState } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/foot";
import FloatingActions from "../components/FloatingActions"; // if you didn’t add globally in App
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ContactModal from "../components/ContactModal"; 

export default function Contact() {
  const [openContact, setOpenContact] = useState(true); // open by default if you want popup
  // set to false if you want the user to click the button to open
  

  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 md:pb-16 bg-[radial-gradient(900px_500px_at_70%_-10%,#112635_0%,#0B1620_60%,#0A0E12_100%)]">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-display">
            Contact <span className="text-sand">Postgen</span>
          </h1>
          <p className="mt-3 text-white/75 max-w-2xl">
            We’re here to help with bookings, packages, guided tours, and custom travel plans.
          </p>
        
        </div>
      </section>

      {/* Info grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={<FaPhoneAlt />}
            title="Phone"
            lines={["+233 55 500 0000", "+233 24 123 4567"]}
          />
          <InfoCard
            icon={<FaEnvelope />}
            title="Email"
            lines={["support@postgentravel.com", "bookings@postgentravel.com"]}
          />
          <InfoCard
            icon={<FaMapMarkerAlt />}
            title="Address"
            lines={["Accra, Ghana", "Weija - Mall area"]}
          />
          <InfoCard
            icon={<FaClock />}
            title="Hours"
            lines={["Mon–Sat: 8:00–18:00", "Sun: 12:00–17:00"]}
          />
        </div>
      </section>

      {/* Map + CTA */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,.35)] min-h-[360px]">
            {/* Replace this src with your exact Google Maps embed */}
            <iframe
              title="Postgen Location"
              width="100%"
              height="100%"
              className="min-h-[360px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Accra%20Mall&output=embed"
            />
          </div>

          {/* Quick CTA card */}
          <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold">
                Tell us about your <span className="text-sand">next trip</span>
              </h3>
              <p className="mt-2 text-white/75">
                Prefer a quick chat? Use WhatsApp or our chatbot — or open the form to send full details.
              </p>
              <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
                <li>Flight bookings & changes</li>
                <li>Hotel reservations</li>
                <li>Guided tours</li>
                <li>Custom travel packages</li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setOpenContact(true)}
              className="px-5 py-3 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
            >
              Open Form
            </button>

        <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
              <a
                href="https://wa.me/233555000000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-[#25D366] text-black font-semibold hover:opacity-95 transition"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating bubbles (if not already global in App.jsx) */}
      <FloatingActions />
    </main>
  );
}

function InfoCard({ icon, title, lines = [] }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-sand transition shadow-[0_20px_60px_rgba(0,0,0,.25)]">
      <div className="text-sand text-2xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <div className="mt-2 space-y-1 text-white/75 text-sm">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}
