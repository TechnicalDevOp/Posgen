import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0A0E12] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* --- Top Links Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">
          {/* About Us */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">About Us</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#">Corporate Profile</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Our Responsibility</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Media</a></li>
            </ul>
          </div>

          {/* Flights & Travel */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Flights & Travel</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#">Travel Requirements</a></li>
              <li><a href="#">Book Flights</a></li>
              <li><a href="#">Special Offers</a></li>
              <li><a href="#">Flight Status</a></li>
              <li><a href="#">Destinations</a></li>
            </ul>
          </div>

          {/* Postgen Guest */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Postgen Guest</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#">Our Partners</a></li>
              <li><a href="#">Rewards</a></li>
              <li><a href="#">Miles Calculator</a></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-white/70 mb-3">
              Subscribe to get our latest travel deals and updates straight to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/50 focus:outline-none"
              />
              <button className="px-5 py-2 rounded-md bg-postgen-gold text-postgen-charcoal font-semibold hover:scale-105 transition">
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
          <button className="px-5 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition">
            Give Feedback
          </button>

          <div className="flex items-center gap-4 text-white/70">
            <span className="text-sm hidden md:inline">Connect with us</span>
            <a href="#" className="hover:text-postgen-gold"><FaFacebookF /></a>
            <a href="#" className="hover:text-postgen-gold"><FaInstagram /></a>
            <a href="#" className="hover:text-postgen-gold"><FaXTwitter /></a>
            <a href="#" className="hover:text-postgen-gold"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-postgen-gold"><FaYoutube /></a>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60 mt-6 gap-3">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
          <p className="text-center">
            © {new Date().getFullYear()} Postgen Travel Consult. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
