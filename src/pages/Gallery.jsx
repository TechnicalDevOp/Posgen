// src/pages/Gallery.jsx
import Navbar from "../components/Nav";
import Footer from "../components/foot";

const galleryImages = [
  "/images/gallery17.jpeg",
  "/images/gallery16.jpeg",
  "/images/gallery2.jpeg",
  "/images/gallery27.jpeg",
  "/images/gallery5.jpeg",
  "/images/gallery10.jpeg",
  "/images/gallery1.jpeg",
  "/images/gallery11.jpeg",
  "/images/gallery.jpeg",
  "/images/gallery3.jpeg",
  "/images/gallery4.jpeg",
  "/images/gallery5.jpeg",
  "/images/gallery6.jpeg",
  "/images/gallery12.jpeg",
  "/images/gallery13.jpeg",
  "/images/gallery14.jpeg",
  "/images/gallery15.jpeg",
  "/images/gallery18.jpeg",
  "/images/gallery19.jpeg",
  "/images/gallery22.jpeg",
  "/images/gallery23.jpeg",
  "/images/gallery24.jpeg",
  "/images/gallery25.jpeg",
  "/images/gallery26.jpeg",
  "/images/gallery28.jpeg",
  "/images/gallery9.jpeg",
];

export default function Gallery() {
  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[55vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1800&auto=format&fit=crop"
          alt="Gallery hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-display font-semibold">
            Posgen <span className="text-sand">Gallery</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto text-lg">
            Real airport moments, successful travels, and unforgettable journeys.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      {/* GALLERY GRID */}
<section className="max-w-7xl mx-auto px-6 py-24">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {galleryImages.map((src, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-3xl"
      >
        <img
          src={src}
          alt={`Gallery image ${index + 1}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/fallback.jpg";
          }}
          className="
            w-full
            h-[520px]
            object-contain
            bg-transparent
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>
    ))}
  </div>
</section>

      <Footer />
    </main>
  );
}
