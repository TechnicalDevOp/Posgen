import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/foot.jsx";
import FloatingActions from "../components/FloatingActions.jsx";

/* =============== POPUP RESULTS =============== */
function ResultsModal({ open, onClose, matches = [], query = {} }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-[#0A0E12] text-white p-5 ring-1 ring-white/10 shadow-2xl overflow-auto max-h-[85vh]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">Search Results</h3>
            <p className="text-sm text-white/70">
              Showing <span className="text-sand font-semibold">{matches.length}</span> packages for “{query.location}”
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-2 rounded-md bg-white/5 text-white hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            No matches found. Try another destination.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {matches.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 flex gap-3"
              >
                <img
                  src={pkg.img || "/images/default.jpg"}
                  alt={pkg.title}
                  className="w-24 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{pkg.title}</h4>
                  <p className="text-sm text-white/70">{pkg.city}, {pkg.country}</p>
                  <p className="text-xs text-white/60 mt-1">{pkg.blurb}</p>
                  <p className="mt-2 text-sand font-semibold">{pkg.price}</p>

                  <div className="mt-2 flex gap-2">
                    <a
                      href={`https://wa.me/233555000000?text=Hi%20Postgen,%20I'm%20interested%20in%20${pkg.title}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#25D366] text-black font-semibold text-sm"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =============== SEARCH BAR =============== */
function SearchBar() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ location: "", date: "", guests: 1 });
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [matches, setMatches] = useState([]);

  // Load travel data from your JSON
  useEffect(() => {
    fetch("/data/packages.json")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch(() => setPackages([]));
  }, []);

  // Handle input
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.location) e.location = "Enter a location.";
    if (!form.date) e.date = "Select a date.";
    if (form.guests < 1) e.guests = "Enter at least 1 guest.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Search function
  const searchPackages = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const query = form.location.toLowerCase();
    const found = packages.filter(
      (pkg) =>
        pkg.city?.toLowerCase().includes(query) ||
        pkg.country?.toLowerCase().includes(query) ||
        pkg.title?.toLowerCase().includes(query)
    );

    setMatches(found);
    setOpenModal(true);
  };

  return (
    <>
      <form
        onSubmit={searchPackages}
        className="bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl max-w-3xl mx-auto mt-10"
      >
        <div className="grid md:grid-cols-[2fr_1fr_1fr_auto] gap-4">
          <label className="flex items-center gap-3 bg-white/5 ring-1 ring-white/10 px-4 py-3 rounded-xl focus-within:ring-sand">
            <FaMapMarkerAlt className="text-sand text-lg" />
            <input
              type="text"
              name="location"
              placeholder="Enter destination"
              value={form.location}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-white"
            />
          </label>

          <label className="flex items-center gap-3 bg-white/5 ring-1 ring-white/10 px-4 py-3 rounded-xl focus-within:ring-sand">
            <FaCalendarAlt className="text-sand text-lg" />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-white"
            />
          </label>

          <label className="flex items-center gap-3 bg-white/5 ring-1 ring-white/10 px-4 py-3 rounded-xl focus-within:ring-sand">
            <FaUser className="text-sand text-lg" />
            <input
              type="number"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className="flex-1 bg-transparent outline-none text-white"
            />
          </label>

          <button
            type="submit"
            className="h-14 rounded-xl bg-sand text-black font-semibold hover:opacity-90 transition"
          >
            Search
          </button>
        </div>
      </form>

      <ResultsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        matches={matches}
        query={form}
      />
    </>
  );
}

/* =============== MAIN PAGE =============== */
export default function HomeWithSearch() {
  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Discover <span className="text-sand">Your Next Destination</span>
        </h1>
        <p className="mt-3 text-white/70">
          Search and book exclusive travel packages with Postgen.
        </p>
        <SearchBar />
      </section>
      <Footer />
      <FloatingActions />
    </main>
  );
}
