import React, { useState } from "react";
import { FaWhatsapp, FaComments } from "react-icons/fa";
import ChatbotModal from "./ChatbotModal.jsx";

export default function FloatingActions() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      {/* WhatsApp bubble */}
      <a
        href="https://wa.me/233555000000?text=Hi%20Postgen,%20I%20need%20help%20with%20a%20trip."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[120] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:scale-110 transition"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Chatbot bubble */}
      <button
        type="button"
        onClick={() => setOpenChat(true)}
        aria-label="Open chatbot"
        className="fixed bottom-6 right-24 z-[120] w-14 h-14 rounded-full bg-sand text-black border border-white/15 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:scale-110 transition"
      >
        <FaComments className="text-xl" />
      </button>

      {/* Chatbot modal */}
      <ChatbotModal open={openChat} onClose={() => setOpenChat(false)} />
    </>
  );
}
