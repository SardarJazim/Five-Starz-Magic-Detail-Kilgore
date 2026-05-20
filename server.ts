import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleMakeModel: string;
  vehicleType: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration path
const DB_DIR = path.join(process.cwd(), "database");
const BOOKINGS_FILE = path.join(DB_DIR, "bookings.json");
const CONTACTS_FILE = path.join(DB_DIR, "contacts.json");

// Ensure database folder exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Helper: Read file database
function readDb<T>(filePath: string, defaultData: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading file database at ${filePath}:`, err);
    return defaultData;
  }
}

// Helper: Write file database
function writeDb<T>(filePath: string, data: T[]): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing file database at ${filePath}:`, err);
    return false;
  }
}

// Initial/Seed Bookings (Admin demonstration)
const seedBookings: Booking[] = [
  {
    id: "b_1",
    name: "Johnny Starz",
    phone: "903-555-0199",
    email: "johnny@starz.com",
    vehicleMakeModel: "Chevrolet Corvette C5",
    vehicleType: "coupe",
    serviceId: "srv_coating",
    serviceName: "Ceramic Coating",
    preferredDate: "2026-05-25",
    preferredTime: "09:00 AM",
    additionalNotes: "Needs 5-Star glassmorphism magic coat. Looking for high shine!",
    status: "confirmed",
    createdAt: new Date().toISOString()
  },
  {
    id: "b_2",
    name: "Tex Rider",
    phone: "903-555-9812",
    email: "tex@longview.net",
    vehicleMakeModel: "Ford F-150 Raptor",
    vehicleType: "truck",
    serviceId: "srv_complete",
    serviceName: "Complete Detail Package",
    preferredDate: "2026-05-28",
    preferredTime: "01:00 PM",
    additionalNotes: "Interior has heavy mud and clay from the oil field. Get it completely detailed!",
    status: "pending",
    createdAt: new Date().toISOString()
  }
];

// Initial/Seed Contact Messages
const seedContacts: ContactMessage[] = [
  {
    id: "c_1",
    name: "Sarah Miller",
    email: "sarah.m@gmail.com",
    phone: "903-555-4300",
    subject: "Clay bar question",
    message: "Do you guys do paint overspray removal from concrete? My garage had a small paint mist issue.",
    createdAt: new Date().toISOString(),
    status: "unread"
  }
];

// ----------------------------------------
// API Endpoints
// ----------------------------------------

// Static Services Data
const servicesList = [
  {
    id: "srv_basic",
    name: "Basic Wash",
    category: "exterior",
    price: "$45+",
    duration: "45 Mins",
    description: "Our signature high-power surface hand wash and interior dust-off that cleans bugs, tar, and road grime away.",
    features: [
      "100% scratch-free micro-fiber hand wash",
      "Wheel face deep clean & high shine tire dressing",
      "All-glass window shine interior & exterior",
      "Complete inside cabin carpet interior vacuum",
      "Glossy spray sealant exterior finish boost"
    ],
    image: "basic_wash",
    popular: false
  },
  {
    id: "srv_interior",
    name: "Full Interior Detail",
    category: "interior",
    price: "$160+",
    duration: "3 - 4 Hours",
    description: "Complete interior sterile recovery. Steam cleaning, dirt extraction, and leather conditioning that brings cabin magic back.",
    features: [
      "High power dual-cyclone dirt extraction carpet & mats",
      "Full steam cleaning of upholstery, safety belts, & leather",
      "Deep vent blowouts, cup-holders, center console, and trunk",
      "Premium pH-balanced nourishing leather cream treatment",
      "Anti-UV non-greasy satin dash & panel dressing shield"
    ],
    image: "interior_cleaning",
    popular: false
  },
  {
    id: "srv_exterior",
    name: "Full Exterior Detail",
    category: "exterior",
    price: "$130+",
    duration: "2 - 3 Hours",
    description: "Deep exterior decontamination and gloss enhancement with carnauba protective layers designed for Texas sun.",
    features: [
      "Foam cannon bath followed by multi-bucket hand wash",
      "Full metallic fall-out and clay bar decontamination",
      "Paint enhancement glaze & gloss polishing prep run",
      "Double layer premium high-bond metallic hand-waxing",
      "Faded plastics rejuvenation & deep chrome metal polishing"
    ],
    image: "paint_correction",
    popular: false
  },
  {
    id: "srv_complete",
    name: "Complete Detail Package",
    category: "full",
    price: "$260+",
    duration: "4 - 5 Hours",
    description: "Our ultimate signature package. It fully blends both Full Interior & Full Exterior details to make your car look showroom shiny.",
    features: [
      "Includes ALL Full Interior Detail procedures",
      "Includes ALL Full Exterior Detail procedures",
      "Bonus high-gloss engine bay deep steam and dressing",
      "Rain-X high performance wind-screen chemical treatment",
      "Long-lasting luxury custom oil-based cabin scenting"
    ],
    image: "complete_detail",
    popular: true
  },
  {
    id: "srv_coating",
    name: "Ceramic Coating",
    category: "specialty",
    price: "$699+",
    duration: "1 - 2 Days",
    description: "High-grade 9H Nano-Ceramic liquid shield. Super hydrophobic micro-beading, protection from UV rays, acid rain, and bird drops.",
    features: [
      "Complete multi-stage paint correction polish prep",
      "Premium 9H glass ceramic molecular barrier implementation",
      "Provides extremely deep gloss mirror reflections",
      "Self-cleaning properties: dirt wipes off with ease",
      "Written durability coverage with maintenance advice"
    ],
    image: "ceramic_coating",
    popular: true
  },
  {
    id: "srv_wax",
    name: "Wax & Polish",
    category: "exterior",
    price: "$99+",
    duration: "1.5 Hours",
    description: "Dual-action mechanical machine glazing and high gloss carnauba waxing for maximum shimmer and protective layer.",
    features: [
      "Thorough synthetic prep wash & door-jamb wipeouts",
      "Single-stage orbital glaze polish to clean minor micro-swirls",
      "Authentic Brazilian wax application by orbital buffer",
      "Tire & rubber trim restoration deep shine dressing",
      "Tailgate & headlight glass UV shielding sprays"
    ],
    image: "wax_polish",
    popular: false
  },
  {
    id: "srv_headlight",
    name: "Headlight Restoration",
    category: "specialty",
    price: "$60",
    duration: "1 Hour",
    description: "Fix foggy, faded, yellowed headlights. Sanding down oxidize layer and adding high solid anti-UV clear coat to make them safe like crystal.",
    features: [
      "3-stage progressive wet-sanding abrasion process",
      "Micro-fine compound machine mechanical restoration",
      "Long-lasting heavy duty anti-UV clear molecular polish",
      "Increases luminous light beam output by up to 150%"
    ],
    image: "headlight",
    popular: false
  },
  {
    id: "srv_correction",
    name: "Paint Correction",
    category: "specialty",
    price: "$349+",
    duration: "6 - 8 Hours",
    description: "Heavy rotary correction designed to extract 80-90% of micro-scratches, buffer halos, water etchings, and swirls.",
    features: [
      "Precise digital paint depth analysis & masking secure",
      "Stage 1 heavy compounding to eliminate micro-grooves",
      "Stage 2 fine jewelers polish to create hyper-clarity gloss",
      "Prep wash wipe with isopropyl alcohol for naked paint exam",
      "Sealant lock application for paint surface final protection"
    ],
    image: "paint_correction",
    popular: false
  },
  {
    id: "srv_engine",
    name: "Engine Bay Cleaning",
    category: "specialty",
    price: "$50",
    duration: "45 Mins",
    description: "Careful steam detailing of structural engine components in high-pressure wash, removing dust, grease, road salt, and oils.",
    features: [
      "Strict masking of alternator, fuse boxes, & air intakes",
      "Safe grease-dissolving foam release and steam rinse",
      "Full blower air drying to clear any sitting humidity",
      "Thermal-safe dust-repelling satin plastic dressing"
    ],
    image: "engine_bay",
    popular: false
  }
];

// 1. Get List of Services
app.get("/api/services", (req, res) => {
  res.json(servicesList);
});

// 2. Get All Bookings
app.get("/api/bookings", (req, res) => {
  const bookings = readDb<Booking>(BOOKINGS_FILE, seedBookings);
  // Sort descending by created time
  bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(bookings);
});

// 3. Create a Booking (Form submit with backend validation)
app.post("/api/bookings", (req, res) => {
  const {
    name,
    phone,
    email,
    vehicleMakeModel,
    vehicleType,
    serviceId,
    preferredDate,
    preferredTime,
    additionalNotes
  } = req.body;

  // Simple backend validations
  if (!name || !phone || !email || !vehicleMakeModel || !vehicleType || !serviceId || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: "Missing required booking variables. Please fill in all fields." });
  }

  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
    return res.status(400).json({ error: "Please provide a valid 10-digit phone number." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const targetService = servicesList.find(s => s.id === serviceId);
  if (!targetService) {
    return res.status(400).json({ error: "Invalid premium service selection." });
  }

  const bookings = readDb<Booking>(BOOKINGS_FILE, seedBookings);

  const newBooking: Booking = {
    id: "b_" + Math.random().toString(36).substr(2, 9),
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    vehicleMakeModel: vehicleMakeModel.trim(),
    vehicleType,
    serviceId,
    serviceName: targetService.name,
    preferredDate,
    preferredTime,
    additionalNotes: additionalNotes ? additionalNotes.trim() : "",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  const success = writeDb(BOOKINGS_FILE, bookings);

  if (success) {
    res.status(201).json({ success: true, booking: newBooking });
  } else {
    res.status(500).json({ error: "Failed to save booking. Database write file error occurred." });
  }
});

// 4. Update Booking Status (for Admin Panel)
app.patch("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: "Invalid booking status change request." });
  }

  const bookings = readDb<Booking>(BOOKINGS_FILE, seedBookings);
  const index = bookings.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Booking session not found." });
  }

  bookings[index].status = status;
  writeDb(BOOKINGS_FILE, bookings);

  res.json({ success: true, booking: bookings[index] });
});

// 5. Delete Booking (for Admin Panel)
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;
  const bookings = readDb<Booking>(BOOKINGS_FILE, seedBookings);
  const filtered = bookings.filter(b => b.id !== id);

  if (filtered.length === bookings.length) {
    return res.status(404).json({ error: "Booking session not found." });
  }

  writeDb(BOOKINGS_FILE, filtered);
  res.json({ success: true, message: "Booking removed successfully." });
});

// 6. Get Contact Messages
app.get("/api/contacts", (req, res) => {
  const contacts = readDb<ContactMessage>(CONTACTS_FILE, seedContacts);
  contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(contacts);
});

// 7. Submit Contact Message
app.post("/api/contacts", (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all mandatory contact fields: Name, Email, and Message." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email format." });
  }

  const contacts = readDb<ContactMessage>(CONTACTS_FILE, seedContacts);

  const newMessage: ContactMessage = {
    id: "c_" + Math.random().toString(36).substr(2, 9),
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : "",
    subject: subject ? subject.trim() : "General Detailing Inquiry",
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: "unread"
  };

  contacts.push(newMessage);
  const success = writeDb(CONTACTS_FILE, contacts);

  if (success) {
    res.status(201).json({ success: true, message: newMessage });
  } else {
    res.status(500).json({ error: "Failed to log contact sheet. Database file write error." });
  }
});

// 8. Update Contact Message Status
app.patch("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['unread', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ error: "Invalid read status modification." });
  }

  const contacts = readDb<ContactMessage>(CONTACTS_FILE, seedContacts);
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Contact sheet not found in database." });
  }

  contacts[index].status = status;
  writeDb(CONTACTS_FILE, contacts);

  res.json({ success: true, contact: contacts[index] });
});

// 9. Delete Contact Message
app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contacts = readDb<ContactMessage>(CONTACTS_FILE, seedContacts);
  const filtered = contacts.filter(c => c.id !== id);

  if (filtered.length === contacts.length) {
    return res.status(404).json({ error: "Contact message not found." });
  }

  writeDb(CONTACTS_FILE, filtered);
  res.json({ success: true, message: "Contact sheet removed successfully." });
});

// ----------------------------------------
// Vite Frontend Middleware, Error Handlers, and Listen Server
// ----------------------------------------

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Integrate Vite dev server middleware so React works dynamically and instantly
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for any remaining route (React Router SPA handler)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // ----------------------------------------
  // Express Error Handling Pages (only reached for unmatched routes)
  // ----------------------------------------

  app.use((req, res, next) => {
    res.status(404).json({ error: "API Route Not Found (404 Error)" });
  });

  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Express uncaught server error:", err);
    res.status(500).json({ error: "Internal Server Error (500 Error)" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Five Starz Magic Detail backend server alive on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to bootstrap server:", err);
});
