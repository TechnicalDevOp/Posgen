import React, { useState } from "react";

export default function ContactModal({ open, onClose }) {
  if (!open) return null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted successfully!");
    onClose();
  };

  const whatsappLink = `https://wa.me/233555000000?text=${encodeURIComponent(
    `Hello, my name is ${form.name}. I would like to make an enquiry about your services.`
  )}`;

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
      {/* Modal box */}
      <div className="w-[92%] max-w-xl bg-[#0A0F14] text-white rounded-2xl shadow-xl border border-white/10 p-6 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-sand">Contact Us</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
          >
            Close
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/60">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-1 w-full px-4 py-3 bg-white/5 rounded-xl outline-none border border-white/10 focus:border-sand"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@mail.com"
              className="mt-1 w-full px-4 py-3 bg-white/5 rounded-xl outline-none border border-white/10 focus:border-sand"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+233 55 000 0000"
              className="mt-1 w-full px-4 py-3 bg-white/5 rounded-xl outline-none border border-white/10 focus:border-sand"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message…"
              className="mt-1 w-full px-4 py-3 bg-white/5 rounded-xl outline-none border border-white/10 focus:border-sand resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-sand text-black font-semibold rounded-xl hover:opacity-90 transition"
            >
              Send Message
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-4 py-3 bg-[#25D366] text-black font-semibold rounded-xl text-center hover:bg-[#1FC55A] transition"
            >
              WhatsApp Us
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
