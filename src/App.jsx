import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import GuidedTours from "./pages/GuidedTours.jsx";
import FlightBooking from "./pages/FlightBooking.jsx";
import HotelReservations from "./pages/HotelReservations";
import TravelPackages from "./pages/TravelPackages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services/guided-tours" element={<GuidedTours />} />
      <Route path="/services/flight-booking" element={<FlightBooking />} />
      <Route path="/services/travel-packages" element={<TravelPackages />} />
      <Route path="/services/hotel-reservations" element={<HotelReservations />} />
    </Routes>
  );
}


