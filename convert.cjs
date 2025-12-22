const fs = require("fs");
const Papa = require("papaparse");

// Read the CSV
const csvFile = fs.readFileSync("packages_clean.csv", "utf8");
const parsed = Papa.parse(csvFile, { header: true });

// Save JSON
fs.mkdirSync("public/data", { recursive: true });
fs.writeFileSync(
  "public/data/packages.json",
  JSON.stringify(parsed.data, null, 2)
);

console.log("✅ Clean packages.json created successfully with", parsed.data.length, "records");
