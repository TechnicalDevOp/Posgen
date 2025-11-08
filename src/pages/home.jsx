// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Nav.jsx";
import {
  FaGlobeAfrica,
  FaHeadset,
  FaShieldAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPlaneDeparture,  
  FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight,
  FaCommentDots, FaPaperPlane
} from "react-icons/fa";


/* ============================== HERO ============================== */
// Local MP4 carousel (cross-fade)
function VideoCarousel({ sources, duration = 9000 }) {
  const [idx, setIdx] = useState(0);
  const vidsRef = useRef([]);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % sources.length), duration);
    return () => clearInterval(t);
  }, [sources.length, duration]);

  useEffect(() => {
    vidsRef.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx) {
        try { v.currentTime = 0; v.play(); } catch {}
      } else {
        v.pause();
      }
    });
  }, [idx]);

  return (
    <div className="absolute inset-0">
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => (vidsRef.current[i] = el)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
          preload="auto"
          autoPlay
          muted
          playsInline
          // webkit-playsinline helps older Safari
          // @ts-ignore
          webkit-playsinline="true"
          loop={false}
          onEnded={() => setIdx((p) => (p + 1) % sources.length)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      {/* veil for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A0E12]/70 via-[#0A0E12]/30 to-[#0A0E12]/80" />
    </div>
  );
}


function Hero() {
  return (
    <section className="relative h-[100dvh] flex flex-col justify-center items-center bg-[#0A0E12] text-white overflow-hidden">
      {/* 🔥 Local video carousel */}
      <VideoCarousel
        sources={[
          "/videos/hero-1.mp4",
          "/videos/hero-2.mp4",
          // "/videos/hero-3.mp4",
        ]}
        duration={18000} // ms per video before auto-advance
      />

      {/* headline */}
      <div className="relative z-10 text-center px-6 mt-16">
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight drop-shadow-[0_6px_22px_rgba(0,0,0,.6)]">
          Explore in <span className="text-postgen-gold">Style</span>
        </h1>
        <p className="mt-3 text-lg md:text-xl text-white/90">
          Luxury travel by <span className="text-postgen-gold font-semibold">Posgen</span>
        </p>
      </div>

      {/* search */}
      <SearchBar />

      {/* WhatsApp */}
      <a
        href="https://wa.me/233240123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:scale-110 transition"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </section>
  );
}



/* ================ SEARCH (same polished dark-glass) ================ */
function SearchBar() {
  return (
    <div className="relative z-10 w-[92%] md:w-[80%] lg:w-[68%] mt-8" id="book">
      <form
        className="rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-[0_18px_70px_rgba(0,0,0,.4)] p-4 md:p-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Search trips"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 md:gap-4 items-center">
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 focus-within:ring-postgen-gold/60">
            <FaMapMarkerAlt className="text-postgen-gold text-xl" />
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wide text-white/60">Location</div>
              <input className="w-full bg-transparent outline-none text-base text-white placeholder:text-white/60" placeholder="Where are you going?" required />
            </div>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 focus-within:ring-postgen-gold/60">
            <FaCalendarAlt className="text-postgen-gold text-xl" />
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wide text-white/60">Date</div>
              <input type="date" className="w-full bg-transparent outline-none text-base text-white [color-scheme:dark]" required />
            </div>
          </label>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 focus-within:ring-postgen-gold/60">
            <FaUser className="text-postgen-gold text-xl" />
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-wide text-white/60">Guests</div>
              <input className="w-full bg-transparent outline-none text-base text-white placeholder:text-white/60" placeholder="+ Add" />
            </div>
          </label>
          <button className="h-14 md:h-[56px] rounded-xl bg-postgen-gold text-postgen-charcoal font-semibold px-8 hover:opacity-90 active:opacity-100 transition" aria-label="Search trips">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}




/* ========================== CHATBOT (with booking + persistence) ========================== */
function Chatbot() {
  const STORAGE_KEY = "postgen_chat_v1";
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi 👋🏾 I’m A.I.ya — your Postgen assistant. How can I help today?" },
  ]);
  const [text, setText] = useState("");
  const [mode, setMode] = useState("chat"); // 'chat' | 'flight'
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // --- Load persisted state
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) {
        setMsgs(saved.msgs ?? msgs);
        setText(saved.text ?? "");
        setMode(saved.mode ?? "chat");
      }
    } catch {}
    // eslint-disable-next-line
  }, []);

  // --- Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ msgs, text, mode }));
  }, [msgs, text, mode]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Focus input when open (chat mode)
  useEffect(() => {
    if (open && mode === "chat") setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, mode]);

  const send = (message) => {
    const userText = (message ?? text).trim();
    if (!userText) return;
    const next = [...msgs, { from: "user", text: userText }];
    setMsgs(next);
    setText("");
    // bot reply
    setTimeout(() => {
      // quick routing to open the flight form
      if (/book.*flight/i.test(userText)) {
        setMode("flight");
        setMsgs((m) => [
          ...m,
          { from: "bot", text: "Great! Fill the flight details below, then hit Submit. ✈️" },
        ]);
        return;
      }
      const reply = botReply(userText);
      setMsgs((m) => [...m, { from: "bot", text: reply }]);
    }, 250);
  };

  const quick = [
    { label: "Book a flight", action: () => { setMode("flight"); setMsgs((m)=>[...m,{from:"bot",text:"Awesome — enter your flight details below. ✈️"}]); } },
    { label: "Hotel reservations", action: () => send("Hotel reservations") },
    { label: "Guided tours", action: () => send("Guided tours") },
    { label: "Holiday packages", action: () => send("Holiday packages") },
    { label: "Travel requirements", action: () => send("Travel requirements") },
    { label: "Talk to a human", action: () => send("Talk to a human") },
  ];

  // Handle flight form submit: add a summary message + handoff link
  const onFlightSubmit = (payload) => {
    const summary =
      `Flight request:\n` +
      `From: ${payload.from}\n` +
      `To: ${payload.to}\n` +
      `Depart: ${payload.depart}\n` +
      `Return: ${payload.returnDate || "One-way"}\n` +
      `Travelers: ${payload.travelers}\n` +
      `Class: ${payload.cabin}`;
    setMsgs((m) => [
      ...m,
      { from: "user", text: "[Submitted flight request]" },
      { from: "bot", text: "Thanks! Here’s your summary — an agent will review and reply shortly." },
      { from: "bot", text: summary },
    ]);
    setMode("chat");
  };

  // Prefilled WhatsApp after flight submit (build from the last summary if available)
  const lastSummary = (() => {
    const rev = [...msgs].reverse();
    const i = rev.findIndex((x) => x.from === "bot" && x.text?.startsWith("Flight request:"));
    return i >= 0 ? rev[i].text : "";
  })();

  const waLink = `https://wa.me/233555000000?text=${encodeURIComponent(
    lastSummary || "Hi, I’d like help with booking a trip via Postgen."
  )}`;

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-24 z-50 h-14 px-5 rounded-full bg-white text-black font-semibold shadow-[0_8px_40px_rgba(0,0,0,0.25)] hover:scale-105 transition inline-flex items-center gap-2"
        aria-label="Open chatbot"
      >
        <FaCommentDots /> Chat with us
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]">
          <section
            ref={panelRef}
            className="absolute right-6 bottom-24 w-[95vw] sm:w-[420px] max-h-[80vh] rounded-3xl overflow-hidden bg-[#0E1318] ring-1 ring-white/10 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Postgen chatbot"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div>
                <div className="text-white font-semibold">Postgen Assistant</div>
                <div className="text-xs text-white/60">Online • replies in seconds</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="size-9 grid place-items-center rounded-full bg-white/10 text-white"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages + Quick chips */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {msgs.map((m, i) => (
                <MessageBubble key={i} from={m.from} text={m.text} />
              ))}

              <div className="mt-2 flex flex-wrap gap-2">
                {quick.map((q, i) => (
                  <button
                    key={i}
                    onClick={q.action}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/10"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight form (slides in) */}
            {mode === "flight" && (
              <div className="px-4 pb-3 border-t border-white/10">
                <FlightForm onCancel={() => setMode("chat")} onSubmit={onFlightSubmit} />
              </div>
            )}

            {/* Actions row (chat mode) */}
            {mode === "chat" && (
              <div className="px-4 pb-3 flex items-center justify-between gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full bg-[#25D366] text-white font-semibold"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <form
                  className="flex-1 flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                >
                  <input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 h-11 px-4 rounded-full bg-white/10 text-white placeholder:text-white/60 outline-none ring-1 ring-white/15 focus:ring-sand"
                    placeholder="Type your message…"
                  />
                  <button
                    type="submit"
                    className="size-11 grid place-items-center rounded-full bg-sand text-black"
                    aria-label="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

function MessageBubble({ from, text }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-sand text-black rounded-br-sm"
            : "bg-white/8 text-white ring-1 ring-white/10 rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

/* ===== Simple reply router (kept from earlier) ===== */
function botReply(input) {
  const q = input.toLowerCase();
  if (q.includes("book") && q.includes("flight")) return "Click 'Book a flight' to open the form below.";
  if (q.includes("hotel")) return "Which city and dates would you like? Any budget or star rating preference?";
  if (q.includes("tour")) return "Lovely! Which destination are you exploring? I can share our top guided tours.";
  if (q.includes("package")) return "We’ve got holiday packages for Dubai, Zanzibar, Cape Town, and Europe. Which destination calls to you?";
  if (q.includes("visa") || q.includes("requirements")) return "I can check travel and visa requirements for your nationality and destination. Where are you traveling from and to?";
  if (q.includes("human") || q.includes("agent") || q.includes("help")) return "I’ll notify an agent now. Meanwhile, you can WhatsApp us for faster support.";
  return "I can help with flights, hotels, tours, and packages. Tell me what you need and I’ll guide you. 😊";
}

/* ================ FLIGHT FORM (embedded) ================= */
function FlightForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    depart: "",
    returnDate: "",
    travelers: 1,
    cabin: "Economy",
  });
  const [error, setError] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.from || !form.to || !form.depart) {
      setError("Please fill From, To, and Depart.");
      return;
    }
    if (form.returnDate && form.returnDate < form.depart) {
      setError("Return date cannot be before Depart date.");
      return;
    }
    setError("");
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input
          className="h-10 px-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 outline-none ring-1 ring-white/15"
          placeholder="From (city/airport)"
          value={form.from}
          onChange={(e) => update("from", e.target.value)}
        />
        <input
          className="h-10 px-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 outline-none ring-1 ring-white/15"
          placeholder="To (city/airport)"
          value={form.to}
          onChange={(e) => update("to", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          className="h-10 px-3 rounded-lg bg-white/10 text-white outline-none ring-1 ring-white/15 [color-scheme:dark]"
          value={form.depart}
          onChange={(e) => update("depart", e.target.value)}
        />
        <input
          type="date"
          className="h-10 px-3 rounded-lg bg-white/10 text-white outline-none ring-1 ring-white/15 [color-scheme:dark]"
          value={form.returnDate}
          onChange={(e) => update("returnDate", e.target.value)}
          placeholder="Return (optional)"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          min={1}
          className="h-10 px-3 rounded-lg bg-white/10 text-white outline-none ring-1 ring-white/15"
          value={form.travelers}
          onChange={(e) => update("travelers", Math.max(1, Number(e.target.value || 1)))}
        />
        <select
          className="h-10 px-3 rounded-lg bg-white/10 text-white outline-none ring-1 ring-white/15"
          value={form.cabin}
          onChange={(e) => update("cabin", e.target.value)}
        >
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First</option>
        </select>
      </div>

      {error && <div className="text-red-400 text-xs">{error}</div>}

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 h-10 rounded-lg bg-white/10 text-white hover:bg-white/15"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 h-10 rounded-lg bg-sand text-black font-semibold hover:opacity-90"
        >
          Submit
        </button>
      </div>
    </form>
  );
}


function ExperienceSection() {
  const stats = [
    { number: 10, suffix: "+", label: "Years of Excellence" },
    { number: 12000, suffix: "+", label: "Happy Travelers" },
    { number: 45, suffix: "+", label: "Destinations Covered" },
    { number: 30, suffix: "+", label: "Trusted Partners" },
  ];

  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  // Intersection Observer for animation trigger
  useEffect(() => {
    const el = document.querySelector("#experience");
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate counts
  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCounts(stats.map((s) => Math.floor(s.number * progress)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <section
      id="experience"
      className="relative bg-[#0A0E12] text-white py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E12] via-[#11161D] to-[#0A0E12] opacity-95" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          {/* <p className="text-white/70 text-sm tracking-wide">Our Story of Excellence</p> */}
          <h2 className="font-display text-3xl md:text-5xl">
            The <span className="text-sand">Postgen Experience</span>
          </h2>
          {/* <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            For over a decade, Postgen Traveling Consult has redefined travel across Africa and beyond —
            blending innovation, comfort, and culture into every journey.
          </p> */}
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-4 md:p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-sand transition-all duration-300"
            >
              <div className="text-3xl md:text-5xl font-bold text-sand">
                {counts[i]}
                {s.suffix}
              </div>
              <div className="mt-2 text-sm md:text-base text-white/80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Optional Image */}
        <div className="mt-16 rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <img
            src="public/videos/black.jpg"
            alt="Luxury travel experience"
            className="w-full h-[300px] md:h-[500px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}



/* ============================ DEALS SECTION =========================== */
const DEALS = [
  { city: "Munich", from: "Accra", price: "from GHS 5,299", miles: "23,400 miles", img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop", tag: "Round trip · Economy" },
  { city: "Dammam", from: "Accra", price: "from GHS 4,899", miles: "21,150 miles", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop", tag: "Round trip · Economy" },
  { city: "Krabi", from: "Accra", price: "from GHS 6,450", miles: "27,450 miles", img: "https://images.unsplash.com/photo-1526481280698-8fcc13fd9b85?q=80&w=1600&auto=format&fit=crop", tag: "Round trip · Economy" },
  { city: "Peshawar", from: "Accra", price: "from GHS 5,999", miles: "22,840 miles", img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1600&auto=format&fit=crop", tag: "Round trip · Economy" },
  { city: "Medina", from: "Accra", price: "from GHS 4,740", miles: "20,120 miles", img: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1600&auto=format&fit=crop", tag: "Round trip · Economy" },
];

function DealsSection() {
  const [i, setI] = useState(2);
  const next = () => setI((p) => (p + 1) % DEALS.length);
  const prev = () => setI((p) => (p - 1 + DEALS.length) % DEALS.length);

  return (
    <section className="bg-[#0A0E12] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-white/70 text-sm">Let us inspire your next trip</p>
            <h2 className="font-display text-3xl md:text-5xl">Our Hot <span className="text-copper">Deals</span></h2>
          </div>
          <a className="text-sand font-semibold hover:opacity-90" href="#">View all</a>
        </div>

        <div className="relative">
          <div className="relative h-[360px] md:h-[420px]">
            {DEALS.map((d, idx) => {
              const pos = (idx - i + DEALS.length) % DEALS.length;
              const norm = pos > DEALS.length / 2 ? pos - DEALS.length : pos;
              const translate = norm * 220;
              const scale = 1 - Math.abs(norm) * 0.12;
              const z = 10 - Math.abs(norm);
              const opacity = 1 - Math.abs(norm) * 0.25;
              return (
                <article key={idx} className="absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) translateX(${translate}px) scale(${scale})`, zIndex: z, opacity, transition: "transform 450ms ease, opacity 300ms ease" }}>
                  <DealCard deal={d} active={norm === 0} />
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={prev} className="size-9 grid place-items-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
            <div className="flex gap-2">
              {DEALS.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-postgen-gold" : "w-2 bg-white/35"}`} aria-label={`Go to slide ${idx + 1}`} />
              ))}
            </div>
            <button onClick={next} className="size-9 grid place-items-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DealCard({ deal, active }) {
  return (
    <div className="w-[240px] h-[300px] md:w-[420px] md:h-[280px] rounded-3xl overflow-hidden relative ring-1 ring-white/10">
      <img src={deal.img} alt={deal.city} className="absolute inset-0 w-full h-full object-cover" loading="lazy" sizes="(max-width: 768px) 240px, 420px" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <div className="absolute left-4 top-3">
        <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-white/85 text-black/80">{deal.tag}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">
        <div className="text-sm opacity-80">{deal.from}</div>
        <div className="text-xl md:text-2xl font-semibold">{deal.city}</div>
        <div className="mt-1 flex items-center gap-3 text-xs md:text-sm opacity-90">
          <span className="font-semibold text-postgen-gold">{deal.price}</span>
          <span className="opacity-70">•</span>
          <span>{deal.miles}</span>
        </div>
      </div>
      <div className={`absolute inset-0 rounded-3xl ring-2 ${active ? "ring-postgen-gold/60" : "ring-transparent"}`} />
    </div>
  );
}



function WhyChoosePostgen() {
  const items = [
    {
      icon: <FaPlaneDeparture className="text-copper text-xl" />,
      title: "Tailored Flight Planning",
      text: "Smart routes, flexible fares, and premium cabin options tuned to your travel style.",
      badge: "Expert Picks",
    },
    {
      icon: <FaHeadset className="text-copper text-xl" />,
      title: "24/7 Concierge Support",
      text: "Real humans, real help — before, during, and after your trip.",
      badge: "24/7",
    },
    {
      icon: <FaGlobeAfrica className="text-copper text-xl" />,
      title: "Local + Global Expertise",
      text: "Africa-first insight with worldwide partnerships for a seamless experience.",
      badge: "Africa-first",
    },
    {
      icon: <FaShieldAlt className="text-copper text-xl" />,
      title: "Trusted & Transparent",
      text: "Clear pricing, verified partners, and guaranteed protection for your bookings.",
      badge: "Verified",
    },
    {
      icon: <FaMoneyBillWave className="text-copper text-xl" />,
      title: "Best-Value Packages",
      text: "Bundled flights, hotels, and tours designed for true value.",
      badge: "Save More",
    },
    {
      icon: <FaUserTie className="text-copper text-xl" />,
      title: "Dedicated Advisor",
      text: "A single contact who knows your preferences and takes care of everything.",
      badge: "Personal",
    },
  ];

  return (
    <section className="relative bg-[#0A0E12] text-white py-16 md:py-24 overflow-hidden">
      {/* Subtle gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E12] via-[#11161D] to-[#0A0E12] opacity-95" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center px-6">
        {/* Left side — image */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.35)] hidden lg:block">
          <img
            src="public/videos/images.png"
            alt="Traveler luxury experience"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          {/* copper overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(45deg, var(--postgen-copper), transparent)",
            }}
          />
        </div>

        {/* Right side — content */}
        <div>
          {/* Heading */}
          <div className="mb-10 text-center lg:text-left">
            <p className="text-white/70 text-sm tracking-wide">Why travelers trust us</p>
            <h2 className="font-display text-3xl md:text-5xl mt-2">
              Why choose <span className="text-sand">Postgen</span>
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto lg:mx-0">
              We make travel effortless. Combining concierge service, expert guidance, and exclusive partnerships to deliver peace of mind — every time you fly.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {items.slice(0, 4).map((it, i) => (
              <article
                key={i}
                className="group rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_60px_rgba(0,0,0,.35)]"
              >
                <div
                  className="rounded-2xl p-[1px]"
                  style={{
                    background: `linear-gradient(135deg, var(--postgen-sand), var(--postgen-white))`,
                  }}
                >
                  <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 relative overflow-hidden">
                    <span className="absolute top-4 right-4 text-[11px] px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/10 text-white/80">
                      {it.badge}
                    </span>

                    <div className="relative mb-4">
                      <div className="size-11 grid place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                        {it.icon}
                      </div>
                      <div
                        className="absolute inset-0 -z-10 blur-2xl opacity-0 group-hover:opacity-60 transition"
                        style={{
                          background:
                            "radial-gradient(200px 80px at 50% 50%, rgba(196,155,108,.25), transparent 60%)",
                        }}
                      />
                    </div>

                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed">{it.text}</p>
                    <div className="mt-4 h-px w-0 bg-sand transition-all duration-300 group-hover:w-1/3" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 px-5 py-4">
              <div className="text-sand font-semibold text-lg">98% satisfaction</div>
              <div className="text-sm text-white/70">from verified clients</div>
            </div>
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 px-5 py-4">
              <div className="text-sand font-semibold text-lg">&lt; 1 hr response</div>
              <div className="text-sm text-white/70">during business hours</div>
            </div>
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 px-5 py-4">
              <div className="text-sand font-semibold text-lg">Secure payments</div>
              <div className="text-sm text-white/70">trusted gateways</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center lg:justify-start">
            <a
              href="#contact"
              className="px-7 h-12 inline-flex items-center justify-center rounded-full text-black font-semibold hover:opacity-95 transition"
              style={{
                backgroundImage: `linear-gradient(90deg, var(--postgen-sand), var(--postgen-copper), var(--postgen-sand))`,
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Talk to an advisor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}



function Avatar({ src, alt, className = "" }) {
  const fallback = "public/videos/avatar-fallback.jpg"; // put a 300x300 jpg in public/images/
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => { e.currentTarget.src = fallback; }}
    />
  );
}

const TESTIMONIALS = [
  {
    quote: "Postgen handled everything — flights, hotels, and local transport. I finally traveled without stress!",
    name: "Adwoa M.",
    title: "Accra • Digital Marketer",
    avatar: "https://images.unsplash.com/photo-1600172454530-9a7a1d9ad848?q=80&w=600&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "They turned my honeymoon dream into reality. Zanzibar was magical — private tours and great service!",
    name: "Kwabena & Akosua",
    title: "Kumasi • Newlyweds",
    avatar: "https://images.unsplash.com/photo-1609951653722-0f3b3f2f5d1a?q=80&w=600&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "Professional, friendly and reliable. Postgen got me the best deal on a Europe trip I thought I couldn’t afford.",
    name: "Ama Serwaa",
    title: "Takoradi • Nurse",
    avatar: "https://images.unsplash.com/photo-1604694746169-b798d9cd9c2a?q=80&w=600&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote: "From visa processing to hotel bookings, they made my Dubai trip smooth and unforgettable.",
    name: "Michael Owusu",
    title: "Tema • Businessman",
    avatar: "https://images.unsplash.com/photo-1590080875832-9ecbdb4ed36d?q=80&w=600&auto=format&fit=crop",
    rating: 4,
  },
  {
    quote: "I joined a guided tour across East Africa — everything was perfectly organized. Highly recommend Postgen!",
    name: "Nana Yaa B.",
    title: "Cape Coast • Teacher",
    avatar: "https://images.unsplash.com/photo-1599442821984-3b1f1cfb0d0a?q=80&w=600&auto=format&fit=crop",
    rating: 5,
  },
];


function Testimonials() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  // auto-advance (pause on hover, respect reduced motion)
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (hover || reduce) return;
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [hover]);

  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t = TESTIMONIALS[i];

  return (
    <section
      className="relative bg-[radial-gradient(1200px_600px_at_70%_-10%,#112635_0%,#0B1620_60%,#0A0E12_100%)] text-white py-16 md:py-24"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="What our travelers say"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-white/70 text-sm">Real stories. Real journeys.</p>
          <h2 className="font-display text-3xl md:text-5xl">
            What our <span className="text-copper">travelers</span> say
          </h2>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="size-24 md:size-28 rounded-2xl overflow-hidden ring-2 ring-copper">
                  <Avatar
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>

              {/* Quote */}
              <div className="flex-1 text-center md:text-left">
                <FaQuoteLeft className="text-postgen-gold/90 mb-3 mx-auto md:mx-0" />
                <p className="text-lg md:text-xl leading-relaxed text-white/90">
                  “{t.quote}”
                </p>

                {/* Meta */}
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-white/70">{t.title}</div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center justify-center md:justify-end gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <FaStar key={k} className={k < t.rating ? "" : "opacity-30"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="size-10 grid place-items-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-postgen-gold" : "w-2 bg-white/35"}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="size-10 grid place-items-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  // Accra center (change to your exact coords if you have them)
  const lat = 5.6037;
  const lon = -0.1870;
  const zoom = 13;

  // OpenStreetMap embed URL (no API key needed)
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.04}%2C${lat - 0.03}%2C${lon + 0.04}%2C${lat + 0.03}&layer=mapnik&marker=${lat}%2C${lon}`;

  // Direct map links for directions
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  const apple = `https://maps.apple.com/?q=${lat},${lon}`;
  const osm = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;

  return (
    <section id="contact" className="relative bg-[#0A0E12] text-white">
      <div className="relative max-w-[1600px] mx-auto px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-8 items-stretch">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
            <iframe
              title="Postgen Office Location"
              src={src}
              className="w-full h-[340px] md:h-[520px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Optional subtle gradient top for style */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/0" />
          </div>

          {/* Contact card */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,.35)]">
            <div>
              <h3 className="font-display text-2xl md:text-3xl mb-2">Visit Postgen</h3>
              <p className="text-white/80">
                Postgen Traveling Consult<br />
                Accra, Ghana
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-sand">Hours:</span>
                  <span className="text-white/80">Mon–Sat, 9:00–18:00</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sand">Phone:</span>
                  <a href="tel:+233555000000" className="text-white/90 hover:underline">+233 55 500 0000</a>
                </div>
                <div className="flex gap-3">
                  <span className="text-sand">Email:</span>
                  <a href="mailto:hello@postgen.travel" className="text-white/90 hover:underline">hello@postgen.travel</a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-sand text-black font-semibold text-center hover:opacity-90 transition"
              >
                Google Maps
              </a>
              <a
                href={apple}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 ring-1 ring-white/15 text-white text-center hover:bg-white/15 transition"
              >
                Apple Maps
              </a>
              <a
                href={osm}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-white/10 ring-1 ring-white/15 text-white text-center hover:bg-white/15 transition"
              >
                OpenStreetMap
              </a>
            </div>

            {/* Optional WhatsApp CTA inline (you already have a floating one) */}
            <a
              href="https://wa.me/233555000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-white/80 hover:text-white underline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================== FOOTER ============================== */
function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0E12] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">About Us</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#">Corporate Profile</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Responsibility</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Media</a></li>
            </ul>
          </div>
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
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Postgen Guest</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#">Our Partners</a></li>
              <li><a href="#">Rewards</a></li>
              <li><a href="#">Miles Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-postgen-gold font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-white/70 mb-3">Subscribe for travel deals and updates.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/50 focus:outline-none" />
              <button className="px-5 py-2 rounded-md bg-postgen-gold text-postgen-charcoal font-semibold hover:scale-105 transition">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10 border-b border-white/10 pb-8">
          <div className="text-center md:text-left">
            <h4 className="text-postgen-gold font-semibold mb-1">We love hearing from you</h4>
            <p className="text-sm text-white/70">Your feedback helps us improve your travel experience.</p>
          </div>
          <button className="px-5 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition">Give Feedback</button>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60 mt-6 gap-3">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
          <p>© {new Date().getFullYear()} Postgen Travel Consult. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================== HOME ============================== */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Chatbot />  
      <ExperienceSection /> 
      <DealsSection />
      <WhyChoosePostgen />
      <Testimonials /> 
      <MapSection />  
      <Footer />
    </>
  );
}
