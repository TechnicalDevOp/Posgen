import React, { useState } from "react";
import {
  FaGlobeAfrica,
  FaHandshake,
  FaStar,
  FaUserFriends,
} from "react-icons/fa";
import Navbar from "../components/Nav";
// import ContactForm from "../components/contactform";
import Footer from "../components/foot";
import FloatingActions from "../components/FloatingActions";

export default function About() {
  const [open, setOpen] = useState(false);

  const team = [
    {
      name: "Grace Aidoo",
      role: "Founder & Travel Consultant",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Kwame Mensah",
      role: "Head of Operations",
      img: "https://images.unsplash.com/photo-1628157588553-5c13207b9b40?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Ama Boateng",
      role: "Client Relations Manager",
      img: "https://images.unsplash.com/photo-1590080875832-79c61a3c6b1a?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Nana Osei",
      role: "Tour & Experience Lead",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="bg-[#0A0E12] text-white overflow-hidden">
      {/* Navbar */}
      <Navbar onContactClick={() => setOpen(true)} />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-display font-semibold">
            About <span className="text-sand">Postgen</span>
          </h1>
          <p className="mt-4 text-white/85 max-w-2xl mx-auto text-lg">
            Redefining luxury and purpose-driven travel across Africa and beyond.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display mb-4">
              Our <span className="text-sand">Story</span>
            </h2>
            <p className="text-white/80 leading-relaxed">
              Founded in Ghana, Postgen Traveling Consult began with a mission to make
              global travel accessible, seamless, and memorable. From humble beginnings
              organizing student trips and local tours, we have evolved into one of
              Africa’s most trusted travel brands, connecting thousands of travelers
              to dream destinations worldwide.
            </p>
            <p className="mt-4 text-white/80 leading-relaxed">
              Our philosophy is simple — travel should not just be about movement,
              but about meaning. That’s why Postgen combines world-class expertise
              with a heart for culture, safety, and genuine hospitality.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"
              alt="Postgen Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 text-center md:text-left">
          <div className="rounded-2xl p-8 bg-white/5 ring-1 ring-white/10 hover:ring-sand transition">
            <h3 className="text-2xl font-semibold mb-3 text-sand">Our Mission</h3>
            <p className="text-white/80 leading-relaxed">
              To connect people and cultures through premium travel experiences
              — offering trusted, affordable, and exceptional service that brings
              peace of mind and joy to every journey.
            </p>
          </div>
          <div className="rounded-2xl p-8 bg-white/5 ring-1 ring-white/10 hover:ring-sand transition">
            <h3 className="text-2xl font-semibold mb-3 text-sand">Our Vision</h3>
            <p className="text-white/80 leading-relaxed">
              To become Africa’s most respected travel brand — empowering generations
              to explore, experience, and expand their world with confidence and pride.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl">
            Our <span className="text-sand">Core Values</span>
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            The principles that guide every flight, booking, and connection we make.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: <FaGlobeAfrica />, title: "Excellence", desc: "We go beyond expectations in every service we deliver." },
            { icon: <FaHandshake />, title: "Integrity", desc: "Honesty and transparency build lasting trust with our clients." },
            { icon: <FaUserFriends />, title: "Hospitality", desc: "We treat every traveler like family, not a customer." },
            { icon: <FaStar />, title: "Innovation", desc: "We embrace technology to enhance convenience and comfort." },
          ].map((v, i) => (
            <div
              key={i}
              className="group p-8 bg-white/5 rounded-2xl ring-1 ring-white/10 hover:ring-sand transition transform hover:-translate-y-1"
            >
              <div className="text-sand text-3xl mb-4 flex justify-center">{v.icon}</div>
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="text-white/70 text-sm mt-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="bg-[#0A0E12] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display mb-6">
            Meet the <span className="text-sand">Postgen Team</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-12">
            The brilliant minds and warm hearts behind every unforgettable journey.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-white/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP LOCATION */}
      <section className="bg-[#0A0E12] py-20 text-center">
        <h2 className="text-3xl font-display text-sand mb-8">Find Us</h2>
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg ring-1 ring-white/10">
          <iframe
            title="Postgen Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.074634347112!2d-1.609471725818885!3d5.303011635599358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfcba2bcd30b0a2b%3A0xa7c0bda4ce3b36c!2sTakoradi%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1697404000000!5m2!1sen!2sgh"
            width="100%"
            height="400"
            style={{ border: "none" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-4">
          Let’s Plan Your <span className="text-sand">Next Adventure</span>
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="inline-block mt-3 px-8 py-3 rounded-full text-black font-semibold hover:opacity-95 transition"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--postgen-sand), var(--postgen-copper), var(--postgen-sand))`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        >
          Contact Us
        </button>
      </section>

      {/* CONTACT MODAL */}
      {/* <ContactForm open={open} onClose={() => setOpen(false)} /> */}
          <FloatingActions />
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
