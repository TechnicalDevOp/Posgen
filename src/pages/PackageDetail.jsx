// // src/pages/PackageDetail.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// /* small helpers */
// function slugify(text = "") {
//   return text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
// }

// function getCountry(p) { return (p[""] || p.country || p.Country || "").toString(); }
// function getVisa(p) { return (p._1 || p.visaType || "").toString(); }
// function getDetails(p) { return (p._2 || p.DETAILS || p.Details || "").toString(); }
// function getRequirements(p) { return (p._3 || p.REQUIREMENTS || p.Requirements || "").toString(); }
// function getProcessing(p) { return (p._4 || p.processingTime || p["PROCESSING TIME"] || "").toString(); }
// function getSalary(p) { return (p._5 || p.salary || p["SALARY (JOB OFFER)"] || "").toString(); }
// function getYears(p) { return (p._6 || p.contract || p["NUMBER OF YEARS (CONTRACT)"] || "").toString(); }
// function getCost(p) { return (p._7 || p._5 || p.cost || p.COST || "").toString() || "—"; }
// function getInclusions(p) { return (p._8 || p["PACKAGE INCLUSIONS"] || p.inclusions || "").toString(); }

// export default function PackageDetail() {
//   const { id } = useParams(); // id = original index in pkgs array
//   const navigate = useNavigate();
//   const [pkg, setPkg] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (typeof id === "undefined") return;
//     fetch("/data/packages_clean.json")
//       .then((r) => {
//         if (!r.ok) throw new Error("packages not found");
//         return r.json();
//       })
//       .then((arr) => {
//         const idx = Number(id);
//         if (Number.isNaN(idx) || idx < 0 || idx >= arr.length) {
//           setPkg(null);
//         } else {
//           setPkg(arr[idx]);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setPkg(null);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div className="p-8 text-center">Loading…</div>;
//   if (!pkg) return (
//     <div className="min-h-screen p-8 bg-[#071018] text-white">
//       <div className="max-w-4xl mx-auto">
//         <button onClick={() => navigate(-1)} className="mb-6 px-4 py-2 bg-white/5 rounded">Back</button>
//         <h1 className="text-2xl">Package not found</h1>
//         <p className="mt-3 text-white/60">This package does not exist or the id is invalid.</p>
//       </div>
//     </div>
//   );

//   const country = getCountry(pkg) || "Unknown";
//   const visa = getVisa(pkg) || "—";
//   const details = getDetails(pkg);
//   const requirements = getRequirements(pkg);
//   const processing = getProcessing(pkg);
//   const salary = getSalary(pkg);
//   const years = getYears(pkg);
//   const cost = getCost(pkg);
//   const inclusions = getInclusions(pkg);

//   // try up to 4 images: /images/<slug>-1.jpg ... -4.jpg, then fallback to /images/<slug>.jpg then placeholder
//   const slug = slugify(country);
//   const gallery = [
//     `/images/${slug}-1.jpg`,
//     `/images/${slug}-2.jpg`,
//     `/images/${slug}-3.jpg`,
//     `/images/${slug}-4.jpg`,
//     `/images/${slug}.jpg`,
//   ];

//   return (
//     <div className="min-h-screen bg-[#071018] text-white pb-16">
//       <div className="max-w-5xl mx-auto p-6">
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-bold">{country}</h1>
//             <div className="text-white/60 mt-1">{visa}</div>
//           </div>
//           <div className="flex gap-3">
//             <Link to="/" className="px-4 py-2 bg-white/5 rounded">Home</Link>
//             <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white/5 rounded">Back</button>
//           </div>
//         </div>

//         {/* gallery */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="md:col-span-2 grid gap-4">
//             <div className="h-72 bg-gray-800 overflow-hidden rounded">
//               <img
//                 src={gallery[0]}
//                 onError={(e) => e.currentTarget.src = `/images/${slug}.jpg`}
//                 alt={country}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="grid grid-cols-3 gap-2">
//               {gallery.slice(1,4).map((src, i) => (
//                 <div key={i} className="h-24 bg-gray-800 overflow-hidden rounded">
//                   <img
//                     src={src}
//                     onError={(e) => e.currentTarget.src = "/images/placeholder.jpg"}
//                     alt={`${country} ${i+2}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* details column */}
//           <div className="p-4 bg-[#0b1418] rounded">
//             <div className="mb-4">
//               <div className="text-sm text-white/60">VISA TYPE</div>
//               <div className="text-lg font-semibold">{visa}</div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-white/60">DETAILS</div>
//               <div className="text-sm">{details || "—"}</div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-white/60">REQUIREMENTS</div>
//               <div className="text-sm">{requirements || "—"}</div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-white/60">PROCESSING TIME</div>
//               <div className="text-sm">{processing || "—"}</div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-white/60">SALARY (JOB OFFER)</div>
//               <div className="text-sm">{salary || "—"}</div>
//             </div>

//             <div className="mb-4">
//               <div className="text-sm text-white/60">NUMBER OF YEARS (CONTRACT)</div>
//               <div className="text-sm">{years || "—"}</div>
//             </div>

//             <div className="mb-6">
//               <div className="text-sm text-white/60">COST</div>
//               <div className="text-lg font-semibold">{cost}</div>
//             </div>

//             <div className="mb-6">
//               <div className="text-sm text-white/60">PACKAGE INCLUSIONS</div>
//               <div className="text-sm">{inclusions || "—"}</div>
//             </div>

//             <a
//               href={`https://wa.me/233555000000?text=${encodeURIComponent(`Hello, I'm interested in the ${visa} package for ${country}. Could you provide more info?`)}`}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-block w-full text-center px-4 py-3 bg-[#25D366] text-black font-semibold rounded"
//             >
//               Contact via WhatsApp
//             </a>

//           </div>
//         </div>

//         {/* raw JSON for debugging (optional) */}
//         <div className="mt-8 text-white/50 text-sm">
//           <details className="bg-white/2 p-3 rounded">
//             <summary className="cursor-pointer">Show raw package JSON</summary>
//             <pre className="mt-2 text-xs overflow-auto max-h-48">{JSON.stringify(pkg, null, 2)}</pre>
//           </details>
//         </div>
//       </div>
//     </div>
//   );
// }
