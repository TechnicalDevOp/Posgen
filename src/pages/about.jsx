import React, { useState } from "react";
import {
  FaGlobeAfrica,
  FaHandshake,
  FaStar,
  FaUserFriends,
} from "react-icons/fa";
import Navbar from "../components/Nav";
import ContactModal from "../components/ContactModal"; 
import Footer from "../components/foot";
import FloatingActions from "../components/FloatingActions";


const team = [
  // ===== EXECUTIVE =====
  {
    name: "Bright Owusu",
    role: "Chief Executive Officer (CEO)",
    img: "/images/ceo.jpeg",
    branch: "Head Office",
    position: "center top",
  },

  // ===== ACCRA =====
  {
    name: "Michael Owusu",
    role: "Branch Manager",
    branch: "Accra",
    img: "/images/Accra Manager.jpeg",
    position: "center 20%",
  },
  {
    name: "Ama Serwaa",
    role: "Branch Secretary",
    branch: "Accra",
    img: "/images/Accra_sec.jpeg",
    position: "center top",
    phone: "+233555111112",
    whatsapp: "+233555111112",
    googleMap: "https://www.google.com/maps?q=Accra+Ghana",
    appleMap: "https://maps.apple.com/?q=Accra",
  },

  // ===== KUMASI =====
  {
    name: "Kwame Boateng",
    role: "Branch Manager",
    branch: "Kumasi",
    img: "/images/ksi_manager.jpeg",
    position: "center 15%",
  },
  {
    name: "Akosua Mensah",
    role: "Branch Secretary",
    branch: "Kumasi",
    img: "/images/ksi_sec.jpeg",
    position: "center top",
    phone: "+233555222222",
    whatsapp: "+233555222222",
    googleMap: "https://www.google.com/maps?q=Kumasi+Ghana",
    appleMap: "https://maps.apple.com/?q=Kumasi",
  },

  // ===== TAMALE =====
  {
    name: "Zainab Abdul-Rahman",
    role: "Branch Secretary",
    branch: "Tamale",
    img: "/images/tam_sec.jpg",
    position: "center top",
    phone: "+233555333333",
    whatsapp: "+233555333333",
    googleMap: "https://www.google.com/maps?q=Tamale+Ghana",
    appleMap: "https://maps.apple.com/?q=Tamale",
  },
];


const branches = ["Head Office", "Accra", "Kumasi", "Tamale"];
export function TeamSection() {
  return (
    <section className="bg-[#0A0E12] py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display">
            Meet the <span className="text-sand">Posgen Team</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            The people behind Posgen’s trusted travel and visa expertise across Ghana.
          </p>
        </div>

        {/* Branch Groups */}
        {branches.map((branch) => {
          const members = team.filter((m) => m.branch === branch);
          if (!members.length) return null;

          return (
            <div key={branch} className="mb-20">
              <h3 className="text-2xl font-display text-sand mb-8">
                {branch === "Head Office" ? "Executive Office" : `${branch} Branch`}
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {members.map((member, i) => (
                  <div
                    key={i}
                    className="group rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,.4)] transition"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                     <img
  src={member.img}
  alt={member.name}
  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
  style={{ objectPosition: member.position }}
/>


                      {/* Branch Badge */}
                      <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-black/60 text-sand ring-1 ring-white/20">
                        {member.branch}
                      </span>

                      {/* Role Badge */}
                      <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20">
                        {member.role.includes("Manager") ? "Manager" : member.role.includes("CEO") ? "CEO" : "Secretary"}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-5 text-center">
                      <h4 className="text-lg font-semibold">{member.name}</h4>
                      <p className="text-white/60 text-sm">{member.role}</p>

                      {/* Actions */}
                      {member.phone && (
                        <div className="mt-4 flex justify-center gap-3 text-sm">
                          <a
                            href={`tel:${member.phone}`}
                            className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
                          >
                            📞 Call
                          </a>
                          <a
                            href={`https://wa.me/${member.whatsapp.replace("+", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-[#25D366] text-black font-semibold hover:opacity-90 transition"
                          >
                            WhatsApp
                          </a>
                        </div>
                      )}

                      {/* Maps */}
                      {member.googleMap && (
                        <div className="mt-3 flex justify-center gap-4 text-xs text-white/70">
                          <a href={member.googleMap} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Google Maps
                          </a>
                          <a href={member.appleMap} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Apple Maps
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default function About() {
  // const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);



  return (
    <main className="bg-[#0A0E12] text-white overflow-hidden">
      {/* Navbar */}
      <Navbar onContactClick={() => setOpen(true)} />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop

"
          alt="Luxury travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-display font-semibold">
            About <span className="text-sand">Posgen</span>
          </h1>
          <p className="mt-4 text-white/85 max-w-2xl mx-auto text-lg">
           Genuineness is still a Possibility
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
              Located in Ghana, Posgen Traveling Consult began with a mission to make
              global travel accessible, seamless, and memorable. From humble beginnings
              organizing student trips and local tours, we have evolved into one of
              Africa’s most trusted travel brands, connecting thousands of travelers
              to dream destinations worldwide.
            </p>
            <p className="mt-4 text-white/80 leading-relaxed">
             we are a registered and licensed travel and tour agency dedicated to providing exceptional services that exceed your expectations.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            <img
        src= "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="Airplane travel"
        className="w-full h-full object-cover"
        loading="lazy"
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
              POSGEN TRAVELLING CONSULT is dedicated to delivering genuine pathways and nurturing 
              possibilities for Ghanaians seeking international travel, education, and work 
              experiences. With integrity, passion, and expertise, we connect people to transformative 
              opportunities worldwide, fostering personal growth, cultural exchange, and professional 
              success. We strive to make dreams abroad achievable, ensuring every client's journey 
              reflects our commitment to excellence, transparency, and heartfelt care.
            </p>
          </div>
          <div className="rounded-2xl p-8 bg-white/5 ring-1 ring-white/10 hover:ring-sand transition">
            <h3 className="text-2xl font-semibold mb-3 text-sand">Our Vision</h3>
            <p className="text-white/80 leading-relaxed">
              At POSGEN TRAVELLING CONSULT, we envision a world where every Ghanaian 
              dream of exploring the globe, pursuing education abroad, and securing rewarding international 
              opportunities becomes a vibrant reality. We aspire to be the beacon of trust 
              and gateway to boundless possibilities,
              empowering individuals to transcend borders and unlock their fullest potential.
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
            { icon: <FaStar />, title: "Genuineness", desc: "We uphold honesty and authenticity in every interaction." },
            { icon: <FaGlobeAfrica />, title: "Possibility", desc: "We believe in unlocking opportunities and broadening horizons." },
            { icon: <FaUserFriends />, title: "Empowerment", desc: "We equip individuals with the tools and confidence for international success." },
            { icon: <FaHandshake />, title: "Integrity", desc: "Our actions are guided by trustworthiness and ethical practices" },
            // { icon: <FaStar />, title: "Passion", desc: "We pursue excellence with enthusiasm and dedication to client fulfillment." },
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
<TeamSection />





      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-4">
          Let’s Plan Your <span className="text-sand">Next Adventure</span>
        </h2>
        {/* <button
          onClick={() => setOpen(true)}
          className="inline-block mt-3 px-8 py-3 rounded-full text-black font-semibold hover:opacity-95 transition"
          style={{
            backgroundImage: `linear-gradient(90deg, var(--postgen-sand), var(--postgen-copper), var(--postgen-sand))`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        >
          Contact Us
        </button> */}
          <button
        onClick={() => setOpenContact(true)}
        className="px-5 py-3 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"     
      >
        Contact Us
      </button>

      <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
    
      </section>

      {/* CONTACT MODAL */}
      {/* <ContactModal open={open} onClose={() => setOpen(false)} /> */}
          <FloatingActions />
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
