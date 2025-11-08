import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWhatsapp } from "react-icons/fa";


export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center bg-black overflow-hidden">

      <div className="relative w-full max-w-[1600px] px-5 py-5">
             {/* 🎥 YOUTUBE VIDEO FULL WIDTH */}
        <div className="relative overflow-hidden rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.20)] border border-black/10">
          <div className="relative aspect-[16/7] md:aspect-[16/6] w-full">
            <iframe
              src="https://www.youtube.com/embed/xgqDj9A4UTc?autoplay=1&mute=1&loop=1&controls=0&playlist=xgqDj9A4UTc&modestbranding=1&showinfo=0"
              title="MADAGASCAR: The World's Strangest Island | 4K Travel Documentary"
              className="absolute inset-0 w-full h-full rounded-[32px] border-none"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>

            {/* Overlay gradient for better contrast */}
            <div className="absolute inset-0 bg-black/25" />
          </div>


          

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-display text-5xl md:text-6xl text-white font-semibold drop-shadow-[0_3px_15px_rgba(0,0,0,.6)]">
              Explore in Style
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white/85">
              Luxury travel by <span className="text-postgen-gold font-semibold">Postgen</span>
            </p>

            {/* Play Button */}
            {/* <button
              className="mt-8 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/70 backdrop-blur-md 
                         border border-white/60 shadow-[0_10px_50px_rgba(0,0,0,.3)] grid place-items-center hover:scale-105 transition"
            >
              <div className="w-0 h-0 border-l-[24px] md:border-l-[28px] border-y-[14px] md:border-y-[16px] border-l-postgen-gold border-y-transparent ml-2" />
            </button> */}
          </div>
        </div>

        {/* 🌍 MODERN FULL-WIDTH SEARCH BAR */}
        <div className="absolute left-1/2 bottom-[-60px] -translate-x-1/2 w-[95%] md:w-[85%]">
          <div className="bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.25)] p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 md:gap-5 items-center">
              
              {/* Location */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition">
                <FaMapMarkerAlt className="text-postgen-gold text-xl" />
                <div className="flex flex-col text-left">
                  <label className="text-[11px] uppercase tracking-wide text-black/60 mb-0.5">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="bg-transparent outline-none text-base text-black placeholder:text-black/50"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition">
                <FaCalendarAlt className="text-postgen-gold text-xl" />
                <div className="flex flex-col text-left">
                  <label className="text-[11px] uppercase tracking-wide text-black/60 mb-0.5">
                    Date
                  </label>
                  <input
                    type="date"
                    className="bg-transparent outline-none text-base text-black"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-md transition">
                <FaUser className="text-postgen-gold text-xl" />
                <div className="flex flex-col text-left">
                  <label className="text-[11px] uppercase tracking-wide text-black/60 mb-0.5">
                    Guests
                  </label>
                  <input
                    type="text"
                    placeholder="+ Add"
                    className="bg-transparent outline-none text-base text-black placeholder:text-black/50"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button className="h-14 md:h-[56px] rounded-xl bg-postgen-gold text-postgen-charcoal font-semibold px-10 flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fit the viewport */}
      <div className="h-24" />
      {/* 💬 Floating WhatsApp Chat Button */}
  <a
    href="https://wa.me/233555000000" // Replace with your WhatsApp number
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center 
              shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:scale-110 hover:shadow-[0_10px_45px_rgba(0,0,0,0.35)] transition-all duration-300"
  >
    <FaWhatsapp className="text-3xl" />
  </a>

    </section>
  );
}
