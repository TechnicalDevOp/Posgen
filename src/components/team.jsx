import React from "react";

const team = [
  {
    name: "Grace Aidoo",
    role: "Founder & Travel Consultant",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  },
  {
    name: "Kwame Mensah",
    role: "Marketing Director",
    img: "https://images.unsplash.com/photo-1590080875832-79c61a3c6b1a?q=80&w=800",
  },
  {
    name: "Ama Boateng",
    role: "Client Experience Manager",
    img: "https://images.unsplash.com/photo-1628157588553-5c13207b9b40?q=80&w=800",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#0A0E12] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-display mb-6">
          Meet the <span className="text-sand">Postgen Team</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-12">
          A team of travel professionals and dream builders committed to creating world-class experiences.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <div key={i} className="group">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
              <p className="text-white/60">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
