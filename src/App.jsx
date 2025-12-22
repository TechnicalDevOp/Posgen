import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import GuidedTours from "./pages/GuidedTours.jsx";
import FlightBooking from "./pages/FlightBooking.jsx";
import HotelReservations from "./pages/HotelReservations";
import TravelPackages from "./pages/TravelPackages";
import HomeWithSearch from "./pages/HomeWithSearch.jsx";
// import PackageDetail from "./pages/PackageDetail";
import PackagePage from "./pages/PackagePage";
import VisitPage from "./pages/VisitPage";
import TouristVisaPage from "./pages/TouristVisaPage";
import PRWorkPage from "./pages/PRWorkPage";
import PRStudyPage from "./pages/PRStudyPage";
import Gallery from "./pages/Gallery";


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
      <Route path="/" element={<HomeWithSearch />} />
      {/* <Route path="/package/:id" element={<PackageDetail />} /> */}
       <Route path="/package/:pkgId" element={<PackagePage />} />
       <Route path="/services/visit" element={<VisitPage />} />
      <Route path="/services/tourist" element={<TouristVisaPage />} />
      <Route path="/services/permanent-residency-work" element={<PRWorkPage />} />
      <Route path="/services/permanent-residency-study" element={<PRStudyPage />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}



<Route path="/gallery" element={<Gallery />} />

