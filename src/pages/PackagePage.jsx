// src/pages/PackagePage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Nav";
import Footer from "../components/foot";

/* ---------- helpers ---------- */
const slugify = (t = "") =>
  String(t || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const getField = (p, ...keys) => {
  if (!p) return "";
  for (const k of keys) {
    if (p[k] !== undefined && p[k] !== null && String(p[k]).trim() !== "") return String(p[k]).trim();
  }
  return "";
};
const getCountry = (p) => getField(p, "", "country", "Country");
const getVisa = (p) => getField(p, "_1", "visaType", "_type");
const getRole = (p) => getField(p, "_2", "role");
const getDetails = (p) => getField(p, "_3", "DETAILS", "_2");
const getRequirements = (p) => getField(p, "_9", "REQUIREMENTS", "_3");
const getProcessing = (p) => getField(p, "_4", "processingTime");
const getSalary = (p) => getField(p, "_5", "salary", "SALARY (JOB OFFER)");
const getYears = (p) => getField(p, "_6", "contractYears", "NUMBER OF YEARS (CONTRACT)");
const getCost = (p) => getField(p, "_7", "COST", "cost");
const getIncludes = (p) => getField(p, "_8", "includes", "PACKAGE INCLUSIONS");

function buildImageCandidates(countrySlug) {
  const imgs = [];
  for (let i = 1; i <= 4; i += 1) imgs.push(`/images/${countrySlug}-${i}.jpg`);
  imgs.push(`/images/${countrySlug}.jpg`);
  imgs.push(`/images/placeholder.jpg`);
  return imgs;
}

/* ---------- component ---------- */
export default function PackagePage() {
  const { pkgId: routePkgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // branding colors (you can move these into Tailwind config if you prefer)
  const brand = {
    bg: "#020519", // dark background
    panel: "#071018", // panel dark
    gold: "#d6a05a", // posgen gold/sand
    green: "#25D366", // whatsapp green
  };

  const statePkg = location?.state?.pkg ?? null;
  const [pkg, setPkg] = useState(statePkg || null);
  const [loading, setLoading] = useState(!statePkg);
  const [error, setError] = useState("");

  const [images, setImages] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const imgErrorRef = useRef(new Set());

  useEffect(() => {
    if (statePkg) return;
    async function load() {
      if (!routePkgId) {
        setError("Package id missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch("/data/packages_clean.json");
        if (!res.ok) throw new Error("packages JSON not found");
        const arr = await res.json();

        let found = null;
        const idxMatch = routePkgId.match(/-(\d+)$/);
        if (idxMatch) {
          const idx = Number(idxMatch[1]);
          if (Number.isFinite(idx) && idx >= 0 && idx < arr.length) found = arr[idx];
        }
        if (!found) {
          const slugPrefix = routePkgId.replace(/-\d+$/, "");
          found = arr.find((r) => slugify(getCountry(r)) === slugPrefix);
        }
        if (!found) {
          const slugPrefix2 = routePkgId.replace(/-\d+$/, "");
          found = arr.find((r) => slugify(getCountry(r)).includes(slugPrefix2));
        }
        if (!found) throw new Error("Package not found");
        setPkg(found);
        setError("");
      } catch (err) {
        console.error(err);
        setError(err?.message || String(err));
        setPkg(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [routePkgId, statePkg]);

  useEffect(() => {
    if (!pkg) {
      setImages([]);
      setCurrentIdx(0);
      imgErrorRef.current.clear();
      return;
    }
    const country = getCountry(pkg) || "placeholder";
    const slug = slugify(country);
    const candidates = buildImageCandidates(slug);
    setImages(candidates);
    setCurrentIdx(0);
    imgErrorRef.current.clear();
  }, [pkg]);

  const nextImage = () => {
    if (!images.length) return;
    setCurrentIdx((i) => (i + 1) % images.length);
  };
  const prevImage = () => {
    if (!images.length) return;
    setCurrentIdx((i) => (i - 1 + images.length) % images.length);
  };

  const fields = useMemo(() => {
    if (!pkg) return null;
    return {
      country: getCountry(pkg),
      visa: getVisa(pkg),
      role: getRole(pkg),
      details: getDetails(pkg),
      requirements: getRequirements(pkg),
      processing: getProcessing(pkg),
      salary: getSalary(pkg),
      years: getYears(pkg),
      cost: getCost(pkg),
      includes: getIncludes(pkg),
    };
  }, [pkg]);

  // keyboard left/right for gallery
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images]);

  // ---------- rendering ----------
  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ background: brand.bg }} className="min-h-[60vh] flex items-center justify-center">
          <div className="w-full max-w-4xl p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/6 rounded w-1/3" />
              <div className="h-[420px] bg-white/6 rounded" />
              <div className="h-6 bg-white/6 rounded w-2/3" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !pkg) {
    return (
      <>
        <Navbar />
        <main style={{ background: brand.bg }} className="min-h-[60vh] flex items-center justify-center text-white">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold mb-3">Package not found</h2>
            <p className="text-white/70 mb-6">{error || "This package does not exist."}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate("/travel-packages")} className="px-4 py-2 rounded bg-white/5">View all packages</button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // final layout
  return (
    <>
      <Navbar />

      <main style={{ background: brand.bg }} className="min-h-screen pb-20">
        {/* HERO / Title */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,5,25,0.65), rgba(2,5,25,0.85)), url('/images/hero-travel.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-white/90 flex items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-sand" style={{ color: brand.gold }}>
                  {fields.country || "Country"}
                </h1>
                <p className="mt-2 text-white/70 max-w-2xl">
                  {fields.role || fields.visa || "Explore bespoke travel & work packages curated by Posgen"}
                </p>
              </div>

              <div className="ml-auto">
                <a
                  href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I'm interested in ${fields.country} - ${fields.role || fields.visa}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg"
                >
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-6 -mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden bg-[#0b1317] shadow-xl border border-white/6">
                <div className="relative">
                  <img
                    src={images[currentIdx] || "/images/placeholder.jpg"}
                    alt={`${fields.country} image ${currentIdx + 1}`}
                    className="w-full h-[520px] object-cover"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (imgErrorRef.current.has(el.src)) return;
                      imgErrorRef.current.add(el.src);
                      el.src = "/images/placeholder.jpg";
                    }}
                  />

                  <div className="absolute left-4 top-4 bg-black/50 px-3 py-1 rounded text-sm text-white/90">{fields.visa || "—"}</div>

                  {/* arrows */}
                  <button
                    onClick={prevImage}
                    aria-label="Previous"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full shadow backdrop-blur"
                  >
                    ◀
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full shadow backdrop-blur"
                  >
                    ▶
                  </button>

                  <div className="absolute right-4 bottom-4 bg-black/50 px-3 py-1 rounded text-xs text-white/80">
                    {currentIdx + 1}/{images.length}
                  </div>
                </div>

                {/* thumbnails */}
                <div className="p-4 overflow-x-auto flex items-center gap-3 bg-[#071018]">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-28 h-16 flex-shrink-0 rounded overflow-hidden border ${idx === currentIdx ? "ring-2 ring-sand" : "ring-1 ring-white/6"}`}
                    >
                      <img
                        src={src}
                        alt={`thumb-${idx}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.currentTarget;
                          if (imgErrorRef.current.has(el.src)) return;
                          imgErrorRef.current.add(el.src);
                          el.src = "/images/placeholder.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info blocks */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-5 bg-[#071018] border border-white/6">
                  <h3 className="text-sm text-white/60">Overview</h3>
                  <p className="mt-2 text-white/80 whitespace-pre-wrap">{fields.details || "—"}</p>
                </div>

                <div className="rounded-xl p-5 bg-[#071018] border border-white/6">
                  <h3 className="text-sm text-white/60">Package inclusions</h3>
                  <p className="mt-2 text-white/80 whitespace-pre-wrap">{fields.includes || "—"}</p>
                </div>
              </div>
            </div>

            {/* Sticky side card */}
            <aside className="relative">
              <div style={{ background: "linear-gradient(180deg, rgba(14,24,28,0.9), rgba(7,16,24,1))" }} className="sticky top-20 rounded-xl p-6 shadow-xl border border-white/6">
                <div className="text-sm text-white/60">Visa Type</div>
                <div className="text-lg font-semibold text-white mt-1">{fields.visa || "—"}</div>

                <div className="mt-4 text-sm text-white/60">Processing time</div>
                <div className="font-medium text-white mt-1">{fields.processing || "—"}</div>

                <div className="mt-4 text-sm text-white/60">Salary (job offer)</div>
                <div className="font-medium text-white mt-1">{fields.salary || "—"}</div>

                <div className="mt-4 text-sm text-white/60">Contract length</div>
                <div className="font-medium text-white mt-1">{fields.years || "—"}</div>

                <div className="mt-4 text-sm text-white/60">Cost</div>
                <div className="font-semibold text-2xl" style={{ color: brand.gold }}>{fields.cost || "—"}</div>

                <div className="mt-6">
                  <a
                    href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hi, I'm interested in ${fields.country} - ${fields.role || fields.visa}. Please send more info.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-block text-center px-4 py-3 rounded-lg font-semibold shadow"
                    style={{ background: brand.green, color: "#042019" }}
                  >
                    Contact on WhatsApp
                  </a>
                </div>

                <div className="mt-4 text-xs text-white/50">Want more? Click <button onClick={() => navigate("/travel-packages")} className="underline">View all packages</button></div>
              </div>
            </aside>
          </div>

          {/* Full package information */}
          <section className="mt-10 rounded-xl bg-[#071018] p-6 border border-white/6">
            <h2 className="text-xl font-semibold text-white">Full package information</h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
              <div>
                <div className="mb-4">
                  <h4 className="text-sm text-white/60">Country</h4>
                  <p className="mt-1">{fields.country || "—"}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/60">Visa Type</h4>
                  <p className="mt-1">{fields.visa || "—"}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/60">Details</h4>
                  <p className="mt-1 whitespace-pre-wrap">{fields.details || "—"}</p>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <h4 className="text-sm text-white/60">Requirements</h4>
                  <p className="mt-1 whitespace-pre-wrap">{fields.requirements || "—"}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/60">Processing time</h4>
                  <p className="mt-1">{fields.processing || "—"}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm text-white/60">Package inclusions</h4>
                  <p className="mt-1 whitespace-pre-wrap">{fields.includes || "—"}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
