// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa6"; // keep your fa6 import if you use it


export default function Footer({ onOpenContact }) {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: replace with real submit (API call)
    console.log("subscribe:", email);
    setEmail("");
    alert("Thanks — you're subscribed!");
  };

  const openContact = () => {
    if (typeof onOpenContact === "function") return onOpenContact();
    // fallback: navigate to contact page
    window.location.href = "/contact";
  };

  return (
    <footer className="bg-[#0A0E12] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* --- Top Links Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">
          
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Our Branches</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Accra — Head Office</li>
              <li>Kumasi — Branch Office</li>
              <li>Takoradi — Branch Office</li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">About Us</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/about/our-story" className="hover:text-white">Our story</Link></li>
              <li><Link to="/about/mission" className="hover:text-white">Mission</Link></li>
              <li><Link to="/about/vision" className="hover:text-white">Vision</Link></li>
              <li><Link to="/about/values" className="hover:text-white">Our core Values</Link></li>
              <li><Link to="/about/team" className="hover:text-white">Our team</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/services/guided-tours" className="hover:text-white">Guided Tours</Link></li>
              <li><Link to="/services/hotel-reservation" className="hover:text-white">Hotel Reservations</Link></li>
              <li><Link to="/services/travel-packages" className="hover:text-white">Holiday packages</Link></li>
              <li><Link to="/services/flight-booking" className="hover:text-white">Flight booking</Link></li>
              <li><Link to="/" className="hover:text-white">Travel deals</Link></li>
            </ul>
          </div>

          {/* Postgen Guest */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Posgen Guest</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/partners" className="hover:text-white">Our Partners</Link></li>
              <li><Link to="/rewards" className="hover:text-white">Rewards</Link></li>
              <li><Link to="/tools/miles-calculator" className="hover:text-white">Miles Calculator</Link></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-white/70 mb-3">
              Subscribe to get our latest travel deals and updates straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2" aria-label="Subscribe to newsletter">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/50 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-postgen-gold text-postgen-charcoal font-semibold hover:scale-105 transition"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- Feedback & Social --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10 border-b border-white/10 pb-8">
          <div className="text-center md:text-left">
            <h4 className="text-postgen-gold font-semibold mb-1">We love hearing from you</h4>
            <p className="text-sm text-white/70">Your feedback helps us improve your travel experience.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openContact}
              className="px-5 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition"
              aria-label="Open contact form"
            >
              Give Feedback
            </button>

            <div className="flex items-center gap-4 text-white/70">
              <span className="text-sm hidden md:inline">Connect with us</span>

              {/* social links: put your real URLs */}
              <a aria-label="Facebook" href="https://www.facebook.com/groups/231168604875524/?ref=share&mibextid=NSMWBT" target="_blank" rel="noreferrer" className="hover:text-postgen-gold">
                <FaFacebookF />
              </a>

              {/* <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-postgen-gold">
                <FaInstagram />
              </a> */}

              <a
                aria-label="TikTok"
                href="https://www.tiktok.com/@posgen"
                target="_blank"
                rel="noreferrer"
                className="hover:text-postgen-gold"
              >
                <FaTiktok />
              </a>


              {/* <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-postgen-gold">
                <FaLinkedinIn />
              </a> */}
{/* 
              <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-postgen-gold">
                <FaYoutube />
              </a> */}
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60 mt-6 gap-3">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-white">Cookie Policy</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/travel-packages" className="hover:text-white">Travel packages</Link>
          </div>

          <p className="text-center">
            © {year} Posgen Travel Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
