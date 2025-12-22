// scripts/clean-packages.cjs
// run: node scripts/clean-packages.cjs
const fs = require("fs");
const path = require("path");

const IN = path.join(__dirname, "..", "public", "data", "packages.json");
const OUT = path.join(__dirname, "..", "public", "data", "packages_clean.json");

if (!fs.existsSync(IN)) {
  console.error("Input not found:", IN);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(IN, "utf8"));

// detect header row (first meaningful entry that holds header labels)
let headerMap = null;
for (const r of raw) {
  // find first object that has real header labels in properties like "" or "_1"
  if (r[""] && r["_1"]) {
    headerMap = {
      countryCol: "",
      visaTypeCol: "_1",
      roleCol: "_2",
      requirementsCol: "_3",
      processingCol: "_4",
      salaryCol: "_5",
      yearsCol: "_6",
      costCol: "_7",
      inclusionsCol: "_8",
    };
    break;
  }
}
if (!headerMap) {
  console.error("Could not detect header row. Inspect the input file format.");
  process.exit(1);
}

// iterate rows and build packages. Many rows omit the country value when
// they continue details for the same country. We'll track currentCountry
// and create a package for any row with at least one meaningful field.
const cleaned = [];
let currentCountry = null;

for (const row of raw) {
  // skip empty objects
  if (!row || Object.keys(row).length === 0) continue;

  const countryVal = (row[headerMap.countryCol] || "").toString().trim();
  const visaTypeVal = (row[headerMap.visaTypeCol] || "").toString().trim();
  const roleVal = (row[headerMap.roleCol] || "").toString().trim();
  const reqVal = (row[headerMap.requirementsCol] || "").toString().trim();
  const procVal = (row[headerMap.processingCol] || "").toString().trim();
  const salaryVal = (row[headerMap.salaryCol] || "").toString().trim();
  const yearsVal = (row[headerMap.yearsCol] || "").toString().trim();
  const costVal = (row[headerMap.costCol] || "").toString().trim();
  const inclVal = (row[headerMap.inclusionsCol] || "").toString().trim();

  // update currentCountry when a country cell is present and not the header label
  if (countryVal && countryVal.toUpperCase() !== "COUNTRY") {
    currentCountry = countryVal;
  }

  // If this row is header or totally empty, skip
  const isHeaderRow = countryVal.toUpperCase?.() === "COUNTRY" ||
                      visaTypeVal.toUpperCase?.() === "VISA TYPE";
  const hasContent = visaTypeVal || roleVal || reqVal || procVal || salaryVal || yearsVal || costVal || inclVal;

  if (!hasContent || isHeaderRow) continue;

  // Build an object. If a field is missing, keep it as empty string.
  const obj = {
    country: currentCountry || "",
    visaType: visaTypeVal || "",
    role: roleVal || "",
    requirements: reqVal || "",
    processingTime: procVal || "",
    salary: salaryVal || "",
    contractYears: yearsVal || "",
    cost: costVal || "",
    inclusions: inclVal || "",
  };

  // Filter out rows that do not have country or any meaningful role/visaType/inclusion
  const meaningful = (obj.country && (obj.role || obj.visaType || obj.inclusions || obj.cost || obj.salary));
  if (meaningful) cleaned.push(obj);
}

// (optional) dedupe near-duplicates if needed — simple approach: JSON string set
const unique = [];
const seen = new Set();
for (const c of cleaned) {
  const key = `${c.country}|${c.visaType}|${c.role}|${c.inclusions}|${c.cost}`;
  if (!seen.has(key)) {
    seen.add(key);
    unique.push(c);
  }
}

// write out
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(unique, null, 2), "utf8");
console.log(`✅ Clean file written: ${OUT} — ${unique.length} records`);
