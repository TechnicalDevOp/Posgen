// import React, { useState } from "react";
// import Navbar from "../components/Nav";
// import Footer from "../components/foot";
// import ContactModal from "../components/contactform";
// // import FloatingActions from "../components/FloatingActions"; // if you didn’t add globally in App
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// export default function ContactModal() {
//   const [openContact, setOpenContact] = useState(true); // open by default if you want popup
//   // set to false if you want the user to click the button to open

//   return (
//     <main className="bg-[#0A0E12] text-white min-h-screen">
//       <Navbar />

//       {/* Hero */}
//       <section className="pt-24 pb-12 md:pb-16 bg-[radial-gradient(900px_500px_at_70%_-10%,#112635_0%,#0B1620_60%,#0A0E12_100%)]">
//         <div className="max-w-7xl mx-auto px-6">
//           <h1 className="text-4xl md:text-6xl font-display">
//             Contact <span className="text-sand">Postgen</span>
//           </h1>
//           <p className="mt-3 text-white/75 max-w-2xl">
//             We’re here to help with bookings, packages, guided tours, and custom travel plans.
//           </p>
//           <button
//             onClick={() => setOpenContact(true)}
//             className="mt-6 px-6 py-3 rounded-full bg-sand text-black font-semibold hover:opacity-95 transition"
//           >
//             Open Contact Form
//           </button>
//         </div>
//       </section>

//       {/* Info grid */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           <InfoCard
//             icon={<FaPhoneAlt />}
//             title="Phone"
//             lines={["+233 55 500 0000", "+233 24 123 4567"]}
//           />
//           <InfoCard
//             icon={<FaEnvelope />}
//             title="Email"
//             lines={["support@postgentravel.com", "bookings@postgentravel.com"]}
//           />
//           <InfoCard
//             icon={<FaMapMarkerAlt />}
//             title="Address"
//             lines={["Accra, Ghana", "Weija - Mall area"]}
//           />
//           <InfoCard
//             icon={<FaClock />}
//             title="Hours"
//             lines={["Mon–Sat: 8:00–18:00", "Sun: 12:00–17:00"]}
//           />
//         </div>
//       </section>

//       {/* Map + CTA */}
//       <section className="pb-16">
//         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-stretch">
//           {/* Map */}
//           <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,.35)] min-h-[360px]">
//             {/* Replace this src with your exact Google Maps embed */}
//             <iframe
//               title="Postgen Location"
//               width="100%"
//               height="100%"
//               className="min-h-[360px] w-full"
//               style={{ border: 0 }}
//               loading="lazy"
//               allowFullScreen
//               referrerPolicy="no-referrer-when-downgrade"
//               src="https://www.google.com/maps?q=Accra%20Mall&output=embed"
//             />
//           </div>

//           {/* Quick CTA card */}
//           <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 flex flex-col justify-between">
//             <div>
//               <h3 className="text-2xl font-semibold">
//                 Tell us about your <span className="text-sand">next trip</span>
//               </h3>
//               <p className="mt-2 text-white/75">
//                 Prefer a quick chat? Use WhatsApp or our chatbot — or open the form to send full details.
//               </p>
//               <ul className="mt-4 space-y-2 text-white/80 list-disc list-inside">
//                 <li>Flight bookings & changes</li>
//                 <li>Hotel reservations</li>
//                 <li>Guided tours</li>
//                 <li>Custom travel packages</li>
//               </ul>
//             </div>
//             <div className="mt-6 flex flex-wrap gap-3">
//               <button
//                 onClick={() => setOpenContact(true)}
//                 className="px-5 py-3 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
//               >
//                 Open Form
//               </button>
//               <a
//                 href="https://wa.me/233555000000"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-5 py-3 rounded-lg bg-[#25D366] text-black font-semibold hover:opacity-95 transition"
//               >
//                 WhatsApp Us
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />

//       {/* Contact modal (validated) */}
//       <ContactModal open={openContact} onClose={() => setOpenContact(false)} />

//       {/* Floating bubbles (if not already global in App.jsx) */}
//       {/* <FloatingActions /> */}
//     </main>
//   );
// }

// function InfoCard({ icon, title, lines = [] }) {
//   return (
//     <div className="p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-sand transition shadow-[0_20px_60px_rgba(0,0,0,.25)]">
//       <div className="text-sand text-2xl">{icon}</div>
//       <h3 className="mt-3 text-lg font-semibold">{title}</h3>
//       <div className="mt-2 space-y-1 text-white/75 text-sm">
//         {lines.map((l, i) => (
//           <div key={i}>{l}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useMemo } from "react";

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // === VALIDATION ===
  const validate = (values) => {
    const e = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      e.name = "Please enter your full name.";
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (!emailOk) e.email = "Enter a valid email address.";
    const digits = (values.phone || "").replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      e.phone = "Enter a valid phone number.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      e.message = "Please tell us a bit more (10+ characters).";
    }
    return e;
  };

  const allValid = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSubmitting(true);
      // TODO: hook to EmailJS / API here
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
      onSuccess?.(form);
      // Optional: reset after success
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const waLink = useMemo(() => {
    const msg =
      `Hello Postgen,%0A%0A` +
      `Name: ${encodeURIComponent(form.name || "")}%0A` +
      `Email: ${encodeURIComponent(form.email || "")}%0A` +
      `Phone: ${encodeURIComponent(form.phone || "")}%0A` +
      `Message: ${encodeURIComponent(form.message || "")}`;
    // TODO: replace with your real WhatsApp number
    return `https://wa.me/233555000000?text=${msg}`;
  }, [form]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">
          Send us a <span className="text-sand">message</span>
        </h3>
        <p className="text-white/70 mt-1">
          We typically respond within a few hours during business days.
        </p>
      </div>

      {/* Success toast */}
      {sent && (
        <div className="mb-4 rounded-xl bg-sand/10 ring-1 ring-sand/30 px-4 py-3 text-sand">
          ✓ Message sent! We’ll get back to you shortly.
        </div>
      )}

      {/* Form card */}
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 shadow-[0_25px_70px_rgba(0,0,0,.35)]"
      >
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              placeholder="e.g. Grace Aidoo"
              autoComplete="name"
              required
              className="w-full bg-white/5 px-3 py-3 rounded-lg outline-none placeholder-white/50 ring-1 ring-white/10 focus:ring-sand transition"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full bg-white/5 px-3 py-3 rounded-lg outline-none placeholder-white/50 ring-1 ring-white/10 focus:ring-sand transition"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label className="block text-sm mb-1">Phone</label>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            pattern="[\d\s()+-]{7,}"
            value={form.phone}
            onChange={onChange}
            placeholder="+233 55 500 0000"
            autoComplete="tel"
            required
            className="w-full bg-white/5 px-3 py-3 rounded-lg outline-none placeholder-white/50 ring-1 ring-white/10 focus:ring-sand transition"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <p className="mt-1 text-[11px] text-white/45">Include country code (e.g., +233).</p>
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-400" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mt-4">
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            rows="5"
            maxLength={600}
            value={form.message}
            onChange={onChange}
            placeholder="Tell us about your trip, dates, budget, and preferences…"
            required
            className="w-full bg-white/5 px-3 py-3 rounded-lg outline-none placeholder-white/50 ring-1 ring-white/10 focus:ring-sand transition resize-y"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.message ? (
              <p id="message-error" className="text-xs text-red-400" role="alert">
                {errors.message}
              </p>
            ) : (
              <span className="text-[11px] text-white/45">Min. 10 characters</span>
            )}
            <span className="text-[11px] text-white/45">{form.message.length}/600</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="submit"
            disabled={!allValid || submitting}
            className={`px-5 py-3 rounded-lg font-semibold text-black transition ${
              !allValid || submitting ? "bg-sand/60 cursor-not-allowed" : "bg-sand hover:opacity-95"
            }`}
          >
            {submitting ? "Sending…" : "Send Message"}
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg text-center bg-[#25D366] text-black font-semibold hover:opacity-95 transition"
          >
            Send via WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}
