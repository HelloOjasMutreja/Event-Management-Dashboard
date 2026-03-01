/**
 * Seed realistic Indian student registrations across all published events.
 * Run: node scripts/seed-registrations.cjs
 */
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://qsyzhvvhjwnvhtdbimin.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzeXpodnZoandudmh0ZGJpbWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMDI4MjEsImV4cCI6MjA4Nzg3ODgyMX0.3adCQM7QbxpLlgTg-YFUYP3IaQwcNw8tS48MLED256s"
);

const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Reyansh", "Sai", "Arnav", "Dhruv", "Kabir",
  "Ananya", "Diya", "Aadhya", "Isha", "Saanvi", "Anika", "Pari", "Myra", "Navya", "Riya",
  "Rohan", "Karan", "Ishaan", "Yash", "Pranav", "Nikhil", "Rahul", "Amit", "Shreya", "Priya",
  "Tanvi", "Meera", "Kavya", "Pooja", "Nandini", "Sanya", "Ritika", "Neha", "Divya", "Akshay",
  "Harsh", "Varun", "Siddharth", "Manish", "Kunal", "Deepak", "Gaurav", "Vikram", "Ojas", "Dev",
  "Aditi", "Sneha", "Swati", "Kriti", "Anjali", "Bhavya", "Tanya", "Sakshi", "Jiya", "Kiara",
  "Parth", "Aryan", "Shaurya", "Lakshya", "Rudra", "Kartik", "Ayaan", "Atharv", "Krishna", "Om",
  "Anushka", "Trisha", "Mahika", "Aishwarya", "Charvi", "Samaira", "Aanya", "Zara", "Mishka", "Pihu",
];

const LAST_NAMES = [
  "Sharma", "Verma", "Patel", "Gupta", "Singh", "Kumar", "Reddy", "Nair", "Iyer", "Joshi",
  "Agarwal", "Mehta", "Shah", "Rao", "Mishra", "Pandey", "Tiwari", "Saxena", "Bhatia", "Malhotra",
  "Chandra", "Kapoor", "Srivastava", "Banerjee", "Chatterjee", "Mukherjee", "Ghosh", "Das", "Sen", "Bose",
  "Pillai", "Menon", "Krishnan", "Raman", "Subramaniam", "Venkatesh", "Hegde", "Kulkarni", "Deshmukh", "Patil",
  "Chopra", "Arora", "Dhawan", "Gill", "Sandhu", "Thakur", "Chauhan", "Yadav", "Rajput", "Dubey",
];

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Biotechnology",
  "Mathematics",
  "Civil Engineering",
];

const SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  const prefixes = ["98", "97", "96", "95", "94", "93", "91", "90", "89", "88", "87", "86", "85", "70", "73", "74", "75", "76", "77", "78", "79"];
  return "+91 " + pick(prefixes) + Math.floor(10000000 + Math.random() * 90000000);
}

function generateRegistrations(eventId, count) {
  const used = new Set();
  const regs = [];

  for (let i = 0; i < count; i++) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const name = `${first} ${last}`;

    // Generate unique reg number
    let regNum;
    do {
      const yr = pick(["21", "22", "23", "24", "25"]);
      const mid = String(1003010 + Math.floor(Math.random() * 90000)).padStart(7, "0");
      const suffix = String(Math.floor(100 + Math.random() * 900));
      regNum = `RA${yr}${mid}${suffix}`;
    } while (used.has(regNum));
    used.add(regNum);

    // Generate unique email
    const emailBase = `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random() * 100)}`;
    const domain = pick(["gmail.com", "outlook.com", "yahoo.com", "srm.edu.in", "iitb.ac.in", "vit.ac.in", "bits-pilani.ac.in"]);
    const email = `${emailBase}@${domain}`;

    if (used.has(email)) continue;
    used.add(email);

    regs.push({
      event_id: eventId,
      registration_number: regNum,
      name,
      email,
      section: pick(SECTIONS),
      department: pick(DEPARTMENTS),
      year: pick(YEARS),
      phone: Math.random() > 0.3 ? randomPhone() : null,
    });
  }
  return regs;
}

async function main() {
  // Sign in as admin to bypass RLS
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: "admin@clubevents.com",
    password: ".sQ2JlHF28/+",
  });
  if (authErr) {
    console.log("Auth error:", authErr.message);
    return;
  }
  console.log("Signed in as admin");

  // Get published events
  const { data: events, error: evtErr } = await supabase
    .from("events")
    .select("id, title, capacity")
    .eq("status", "published");

  if (evtErr) {
    console.log("Events error:", evtErr.message);
    return;
  }

  console.log(`Found ${events.length} published events\n`);

  for (const event of events) {
    // Register 40%–85% of capacity
    const fillRate = 0.4 + Math.random() * 0.45;
    const count = Math.min(Math.floor(event.capacity * fillRate), event.capacity);
    const regs = generateRegistrations(event.id, count);

    const { error: insErr } = await supabase.from("registrations").insert(regs);
    if (insErr) {
      console.log(`  ERROR seeding "${event.title}":`, insErr.message);
    } else {
      console.log(`  ✓ ${event.title}: ${regs.length}/${event.capacity} registrations`);
    }
  }

  // Verify final counts
  console.log("\n--- Final Event Counts ---");
  const { data: final } = await supabase
    .from("events")
    .select("title, registered_count, capacity")
    .eq("status", "published")
    .order("title");

  for (const e of final) {
    const pct = Math.round((e.registered_count / e.capacity) * 100);
    console.log(`  ${e.title}: ${e.registered_count}/${e.capacity} (${pct}%)`);
  }

  console.log("\nDone!");
}

main();
