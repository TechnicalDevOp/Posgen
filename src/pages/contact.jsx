import React, { useState } from "react";
import Navbar from "../components/Nav";
import Footer from "../components/foot";
import FloatingActions from "../components/FloatingActions";
import ContactModal from "../components/ContactModal";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { FaFacebookF, FaTiktok } from "react-icons/fa";


const BRANCHES = [
  {
    city: "Accra (Head Office)",
    address: "Ablekuma Pentecost Junction , Accra – Ghana",
    phone: "+233 24 395 5621",
    email: "posgentravelingconsult@gmail.com",
    hours: "Mon–Fri: 8:00 AM  - 4:30 PM (GMT)",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3970.593881739152!2d-0.30806446075439453!3d5.62681245803833!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfa33dc3a2186d%3A0x6956973bbee49eed!2sAmoah%20Memorial%20Hospital%20Eye%20Clinic!5e0!3m2!1sen!2sgh!4v1766696815349!5m2!1sen!2sgh" ,
    
  },
  {
    city: "Kumasi Branch",
    address: "Ayeduase Gate , Kumasi – Ghana",
    phone: "+233 54 777 1233",
    email: "posgentravelingconsult@gmail.com",
    hours: "Mon–Fri: 8:00 AM  - 4:30 PM (GMT)",
    map: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3962.778275545808!2d-1.5653163250057158!3d6.674371193320728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNDAnMjcuNyJOIDHCsDMzJzQ1LjkiVw!5e0!3m2!1sen!2sgh!4v1766697164257!5m2!1sen!2sgh" 
  },
  {
    city: "Tamale Branch",
    address: "Buy Water Area , Tamale – Ghana",
    phone: "+233 55 312 4987",
    email: "posgentravelingconsult@gmail.com",
    hours: "Mon–Fri: 8:00 AM  - 4:30 PM (GMT)",
    map: " https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.4720118680457!2d-0.8704929000000001!3d9.467608700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd43c2c877d3e0b%3A0xec0ffcbe8eddf039!2sElix%20Shopping%20center!5e0!3m2!1sen!2sgh!4v1766697006371!5m2!1sen!2sgh",
  },

];


export default function Contact() {
  const [openContact, setOpenContact] = useState(false);

  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-24 pb-14 bg-[radial-gradient(900px_500px_at_70%_-10%,#112635_0%,#0B1620_60%,#0A0E12_100%)]">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-display">
            Contact <span className="text-sand">Posgen</span>
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl">
            Reach out to any of our branches across Ghana. We’re always ready to guide
            your travel, visa, and migration journey.
          </p>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {BRANCHES.map((b, i) => (
            <div
              key={i}
              className="grid lg:grid-cols-2 gap-8 items-stretch"
            >
              {/* Map */}
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,.35)] min-h-[340px]">
                <iframe
                  title={b.city}
                  src={b.map}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="w-full h-full min-h-[340px]"
                  style={{ border: 0 }}
                />
              </div>

              {/* Info */}
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-sand">
                    {b.city}
                  </h3>

                  <div className="mt-4 space-y-3 text-white/80 text-sm">
                    <InfoRow icon={<FaMapMarkerAlt />} text={b.address} />
                    <InfoRow icon={<FaPhoneAlt />} text={b.phone} />
                    <InfoRow icon={<FaEnvelope />} text={b.email} />
                    <InfoRow icon={<FaClock />} text={b.hours} />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${b.phone}`}
                    className="px-5 py-2.5 rounded-lg bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${b.phone.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-[#25D366] text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* Social Media */}
<div className="mt-8 flex justify-center gap-6">
  <a
    href="https://www.facebook.com/groups/231168604875524/?ref=share&mibextid=NSMWBT"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-xl hover:bg-[#1877F2] hover:text-white transition"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://www.tiktok.com/@posgen.traveling?_r=1&_t=ZS-92H8TNiE2YS"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
    className="w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center text-xl hover:bg-black hover:text-white transition"
  >
    <FaTiktok />
  </a>
</div>

      <section className="pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-display">
          Need personalized help?
        </h2>
        <p className="mt-3 text-white/75">
          Open our contact form and tell us exactly what you need.
        </p>
        <button
          onClick={() => setOpenContact(true)}
          className="mt-6 px-6 py-3 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
        >
          Open Contact Form
        </button>

        <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}

/* Small reusable row */
function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sand">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
