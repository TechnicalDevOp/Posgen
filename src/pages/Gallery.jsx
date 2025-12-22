import Navbar from "../components/Nav";
import Footer from "../components/foot";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    title: "International Flights",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Luxury Destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1502920514313-52581002a659",
    title: "Airport Experience",
  },
  {
    src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    title: "Tour Adventures",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Beach Getaways",
  },
  {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
    title: "City Escapes",
  },
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    title: "Dubai Experience",
  },
  {
    src: "https://images.unsplash.com/photo-1494475673543-6a6a27143b16",
    title: "Mountain Views",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Nature Tours",
  },
];

export default function Gallery() {
  return (
    <main className="bg-[#0A0E12] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          alt="Travel gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-display font-semibold">
            Posgen <span className="text-sand">Gallery</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Moments from journeys, destinations, and unforgettable experiences
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-white/5"
            >
              <img
                src={`${img.src}?q=80&w=1200&auto=format&fit=crop`}
                alt={img.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-lg font-semibold text-sand">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
