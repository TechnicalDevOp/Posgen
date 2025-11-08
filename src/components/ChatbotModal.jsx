import React, { useState, useEffect, useRef } from "react";

/* ========= Simple memory ========= */
const CHAT_KEY = "pg_chat_log_v1";
const PROFILE_KEY = "pg_profile_v1";

const defaultGreeting = (name) =>
  name
    ? `Welcome back, ${name}! I can help with flights, hotels, guided tours, or travel packages.`
    : "Hi! I’m your Postgen assistant. How can I help you today?";

/* ========= Helpers: extract details (very simple patterns) ========= */
function extractName(text) {
  // "my name is Grace", "I'm Grace", "I am Grace"
  const m =
    text.match(/\bmy name is\s+([a-z][a-z\s'-]{1,40})/i) ||
    text.match(/\bi['’]m\s+([a-z][a-z\s'-]{1,40})/i) ||
    text.match(/\bi am\s+([a-z][a-z\s'-]{1,40})/i);
  if (m) return capitalizeWords(m[1].trim());
  return null;
}
function extractDestination(text) {
  // "to Dubai", "going to Nairobi", "destination Accra"
  const m =
    text.match(/\bto\s+([a-z][\w\s'-]{1,40})/i) ||
    text.match(/\bdestination\s+([a-z][\w\s'-]{1,40})/i) ||
    text.match(/\bgoing to\s+([a-z][\w\s'-]{1,40})/i);
  return m ? capitalizeWords(m[1].trim()) : null;
}
function extractBudget(text) {
  // "budget $1500", "budget is GHS 5000", "$2000", "2000 usd"
  const m =
    text.match(/\bbudget(?: is)?\s*([a-z$€£₵]*\s?\d[\d,\.]*)/i) ||
    text.match(/([$€£₵]\s?\d[\d,\.]*)/i) ||
    text.match(/(\d[\d,\.]*\s?(?:usd|ghs|eur|gbp))/i);
  return m ? m[1].toUpperCase().replace(/\s+/g, " ").trim() : null;
}
function extractDates(text) {
  // super light: catch "from X to Y" or a single date-like chunk
  const range = text.match(/\bfrom\s+([a-z0-9\/\-\.\s]+?)\s+to\s+([a-z0-9\/\-\.\s]+)\b/i);
  if (range) return `From ${range[1].trim()} to ${range[2].trim()}`;
  const single = text.match(/\b(on|starting|around)\s+([a-z0-9\/\-\.\s]+)\b/i);
  if (single) return capitalizeWords(`${single[1]} ${single[2].trim()}`);
  return null;
}
function capitalizeWords(s) {
  return s.replace(/\b\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/* ========= Intent detection ========= */
function intent(text) {
  const t = text.toLowerCase();
  if (/(flight|ticket|fare|air|plane)/.test(t)) return "flights";
  if (/(hotel|stay|accommodat)/.test(t)) return "hotels";
  if (/(tour|guide|itinerary|safari|heritage)/.test(t)) return "tours";
  if (/(package|bundle|all[-\s]?in[-\s]?one)/.test(t)) return "packages";
  if (/(contact|reach|call|email|form)/.test(t)) return "contact";
  if (/(show|view).*(detail|info|profile)/.test(t) || /my details/.test(t)) return "show_profile";
  if (/edit.*(name|date|budget|destination|detail|info|profile)/.test(t)) return "edit_profile";
  if (/(clear|reset).*(memory|detail|info|profile|chat)/.test(t)) return "clear_profile";
  return "unknown";
}

/* ========= Component ========= */
export default function ChatbotModal({ open, onClose, onOpenContact }) {
  const [profile, setProfile] = useState(() => {
    try {
      const p = localStorage.getItem(PROFILE_KEY);
      return p ? JSON.parse(p) : { name: "", destination: "", dates: "", budget: "" };
    } catch {
      return { name: "", destination: "", dates: "", budget: "" };
    }
  });

  const [log, setLog] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [{ role: "bot", text: defaultGreeting(profile.name) }];
  });

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  /* Persist */
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_KEY, JSON.stringify(log));
    } catch {}
  }, [log]);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  /* Open behaviors */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    const onClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) onClose?.();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  /* Auto-scroll */
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [log, typing]);

  if (!open) return null;

  const pushBot = (text) => setLog((l) => [...l, { role: "bot", text }]);
  const pushUser = (text) => setLog((l) => [...l, { role: "user", text }]);

  const summaryText = (p) => {
    const lines = [];
    if (p.name) lines.push(`• Name: ${p.name}`);
    if (p.destination) lines.push(`• Destination: ${p.destination}`);
    if (p.dates) lines.push(`• Dates: ${p.dates}`);
    if (p.budget) lines.push(`• Budget: ${p.budget}`);
    if (!lines.length) return "No details saved yet. Tell me your name, destination, dates, and budget.";
    return `Here’s what I have saved:\n${lines.join("\n")}`;
  };

  const handleKnownIntents = (key) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      switch (key) {
        case "flights":
          pushBot("✈️ Great! Share your destination and dates, and I’ll help with routes & fares.");
          break;
        case "hotels":
          pushBot("🏨 Awesome. Which city and dates? I’ll suggest luxury and value options.");
          break;
        case "tours":
          pushBot("🧭 Nice! Which country or theme? (heritage, safari, beach, culture)");
          break;
        case "packages":
          pushBot("🎒 Perfect. Packages can include flights, hotels, transfers & activities. Destination and dates?");
          break;
        case "contact":
          pushBot("📮 Opening the contact form…");
          onOpenContact?.();
          break;
        case "show_profile":
          pushBot(summaryText(profile));
          break;
        case "edit_profile":
          pushBot("Tell me what to change. For example: “My name is Grace”, “Change destination to Dubai”, “Budget $1500”.");
          break;
        case "clear_profile":
          setProfile({ name: "", destination: "", dates: "", budget: "" });
          pushBot("✅ Cleared your saved details. You can tell me your name/destination/dates/budget again anytime.");
          break;
        default:
          pushBot("I can help with flights, hotels, guided tours, or travel packages. You can also say “show my details”.");
      }
    }, 500);
  };

  /* Very simple “edit” phrases like: change destination to X / set budget to Y */
  function applyEdits(text) {
    const newP = { ...profile };
    let changed = false;

    const name = extractName(text);
    if (name) { newP.name = name; changed = true; }

    // explicit "change destination to X"
    const destCmd = text.match(/(change|set)\s+destination\s+(to\s+)?(.+)/i);
    const dest = extractDestination(text) || (destCmd ? destCmd[3] : null);
    if (dest) { newP.destination = dest; changed = true; }

    const datesCmd = text.match(/(change|set)\s+date[s]?\s+(to\s+)?(.+)/i);
    const dates = extractDates(text) || (datesCmd ? datesCmd[3] : null);
    if (dates) { newP.dates = capitalizeWords(dates.trim()); changed = true; }

    const budCmd = text.match(/(change|set)\s+budget\s+(to\s+)?(.+)/i);
    const budget = extractBudget(text) || (budCmd ? budCmd[3] : null);
    if (budget) { newP.budget = budget.toUpperCase().trim(); changed = true; }

    if (changed) setProfile(newP);
    return changed;
  }

  const send = (e) => {
    e?.preventDefault?.();
    const text = message.trim();
    if (!text) return;

    setMessage("");
    pushUser(text);

    // Try to capture details from free text
    const changed = applyEdits(text);

    // If not an edit, try basic extract without "change/set" commands
    const name = extractName(text);
    const dest = extractDestination(text);
    const dates = extractDates(text);
    const budget = extractBudget(text);
    if (!changed && (name || dest || dates || budget)) {
      setProfile((p) => ({
        name: name || p.name,
        destination: dest || p.destination,
        dates: dates || p.dates,
        budget: budget || p.budget,
      }));
    }

    // Route intent
    const key = intent(text);
    if (key === "unknown") {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        // If we just saved something, acknowledge
        if (changed || name || dest || dates || budget) {
          pushBot("Noted! " + summaryText({ ...profile, name: name || profile.name, destination: dest || profile.destination, dates: dates || profile.dates, budget: budget || profile.budget }));
          pushBot("When you’re ready, say “contact” to send these details to our team.");
        } else {
          pushBot("I can help with flights, hotels, guided tours, or travel packages. You can also say “show my details”.");
        }
      }, 500);
    } else {
      handleKnownIntents(key);
    }
  };

  const QuickChip = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-sm"
      type="button"
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm p-4 flex items-end sm:items-center justify-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-title"
        className="w-full max-w-md bg-[#0A0E12] text-white rounded-2xl ring-1 ring-white/10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 id="chatbot-title" className="font-semibold">
            Postgen <span className="text-sand">Chat</span>
          </h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-sand text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div ref={listRef} className="h-72 overflow-y-auto p-4 space-y-3">
          {log.map((m, i) => (
            <div
              key={i}
              className={`whitespace-pre-line max-w-[85%] px-3 py-2 rounded-lg ${
                m.role === "user"
                  ? "ml-auto bg-sand text-black"
                  : "mr-auto bg-white/5 ring-1 ring-white/10"
              }`}
            >
              {m.text}
            </div>
          ))}

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <QuickChip onClick={() => handleKnownIntents("flights")}>Flights</QuickChip>
            <QuickChip onClick={() => handleKnownIntents("hotels")}>Hotels</QuickChip>
            <QuickChip onClick={() => handleKnownIntents("tours")}>Guided Tours</QuickChip>
            <QuickChip onClick={() => handleKnownIntents("packages")}>Travel Packages</QuickChip>
            <QuickChip onClick={() => handleKnownIntents("show_profile")}>My Details</QuickChip>
            <QuickChip onClick={() => handleKnownIntents("clear_profile")}>Clear Memory</QuickChip>
            <QuickChip onClick={() => handleKnownIntents("contact")}>Contact</QuickChip>
          </div>

          {/* Typing indicator */}
          {typing && (
            <div className="mr-auto bg-white/5 ring-1 ring-white/10 px-3 py-2 rounded-lg inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-white/70 animate-pulse"></span>
              <span className="text-white/70 text-sm">Typing…</span>
            </div>
          )}
        </div>

        {/* Composer */}
        <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              profile.name
                ? `Message Postgen as ${profile.name}…`
                : "Type your message… (e.g., My name is Grace)"
            }
            className="flex-1 bg-white/5 rounded-lg px-3 py-2 outline-none placeholder-white/50 ring-1 ring-white/10 focus:ring-sand transition"
          />
          <button
            type="submit"
            className="px-4 rounded-lg bg-sand text-black font-semibold hover:opacity-95 transition"
          >
            Send
          </button>
        </form>

        {/* Hint */}
        <div className="px-4 py-2 text-[11px] text-white/45 border-t border-white/10">
          Tip: Tell me “My name is …”, “Destination to …”, “Budget $1500”, or “From 2 Aug to 9 Aug”.
        </div>
      </div>
    </div>
  );
}
