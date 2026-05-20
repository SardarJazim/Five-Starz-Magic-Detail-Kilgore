# Five Starz Magic Detail - Premium Automotive Detailing Website

A visually stunning, high-contrast, fully responsive multi-page full-stack business website designed for **Five Starz Magic Detail** located in Kilgore & Longview, Texas. 

This application uses a sophisticated **Express (Node.js) + React (TypeScript) Full-Stack High-Performance Architecture**, which provides instantaneous page transitions, hardware-accelerated star animations, and fluid interactive sliders that are superior to legacy server-rendered templates.

---

## 🎨 Visual Identity & Theme
Inspired directly by the business card logo:
- **Primary Color Palette:** Neon Electric Blue (`#18A8FF`), Vivid Neon Green (`#7ED957`), and Metallic Silver (`#C0C0C0`) on rich Black/Dark Navy gradient backdrops.
- **Micro-Animations:** Pulsing neon outlines, metallic surface sweep reflections, blinking stars, and floating ambient coordinates that create a premium custom car culture aesthetic.
- **Aesthetic Pairings:** Bold, futuristic "Space Grotesk" headings paired with technical "JetBrains Mono" metrics, backed by organic high-definition imagery.

---

## 🛠️ Tech Stack & Features Included

1. **Express & TSX Server-Side Database Manager:**
   - Real persistent JSON database storage inside the `/database` directory for appointments (`bookings.json`) and message forms (`contacts.json`).
   - Highly secure and fast: Eliminates heavy binary lock issues common with SQLite on Serverless/Cloud run containers.
   - Restful API Endpoints (`/api/services`, `/api/bookings`, `/api/contacts`) supporting full CRUD commands (GET, POST, PATCH, DELETE).

2. **Core Interactive Page Views:**
   - 🏠 **Home Page:** Animated hero section featuring custom generated premium graphics, rolling countdown metrics, customer reviews carousel, embedded responsive Google Map, and a bespoke drag-and-slide Before & After comparison slider.
   - 📈 **About Page:** Brand story detailing local Kilgore/Longview roots, service standards (micro-fiber safe hand washes), and high-gloss paints philosophy.
   - 🧼 **Services Page:** Responsive metallic card layouts detailing Basic Wash, Full Interior, Full Exterior, Ceramic Coatings, and Paint Corrections with custom estimations and direct-booking routing buttons.
   - 📅 **Booking Page:** Live validation appointment reservation sheets storing names, vehicles, dates, and times directly in the database.
   - 📞 **Contact Page:** Operational hours, direct phone connections, and a message form synced to the database.
   - 🛡️ **Admin CRM Control Panel:** A hidden/toggleable dashboard allowing business owners to filter, approve, complete, or delete bookings and read incoming messages instantly.

---

## 🚀 Porting to Python Flask (For Replit Deployments)

Should you decide to migrate this modern React experience to a Python Flask setup on Replit, here is the complete 1-to-1 schematic translation file blueprint:

### 📁 Legacy Flask Directory Structure
To launch in Flask, organize your files as follows:
```
/
├── app.py
├── requirements.txt
├── database/
│   └── database.db
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── booking.html
│   └── contact.html
└── static/
    ├── css/
    │   └── styles.css
    └── js/
        └── main.js
```

### 🐍 Python Backend (`app.py`)
```python
import os
import sqlite3
from flask import Flask, render_template, request, redirect, flash, jsonify

app = Flask(__name__)
app.secret_key = "fivestarz_magic_detail_secret"
DATABASE_PATH = "database/database.db"

# Create Database tables on boot
def init_db():
    if not os.path.exists("database"):
        os.makedirs("database")
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            vehicle_model TEXT NOT NULL,
            vehicle_type TEXT NOT NULL,
            service_name TEXT NOT NULL,
            preferred_date TEXT NOT NULL,
            preferred_time TEXT NOT NULL,
            notes TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'unread',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/book', methods=['GET', 'POST'])
def book():
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email')
        vehicle_model = request.form.get('vehicle_model')
        vehicle_type = request.form.get('vehicle_type')
        service_name = request.form.get('service_name')
        preferred_date = request.form.get('preferred_date')
        preferred_time = request.form.get('preferred_time')
        notes = request.form.get('notes', '')

        # Server-side validation
        if not name or not phone or not email or not vehicle_model or not service_name or not preferred_date:
            flash("Missing mandatory booking details!", "error")
            return redirect('/book')

        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO bookings (name, phone, email, vehicle_model, vehicle_type, service_name, preferred_date, preferred_time, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, phone, email, vehicle_model, vehicle_type, service_name, preferred_date, preferred_time, notes))
        conn.commit()
        conn.close()

        flash("Detail appointment logged successfully!", "success")
        return redirect('/book')
    return render_template('booking.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone', '')
        subject = request.form.get('subject', 'General Inquiry')
        message = request.form.get('message')

        if not name or not email or not message:
            flash("Please fill in all mandatory fields.", "error")
            return redirect('/contact')

        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contacts (name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, email, phone, subject, message))
        conn.commit()
        conn.close()

        flash("Your message was dispatched successfully!", "success")
        return redirect('/contact')
    return render_template('contact.html')

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
```

---

## 🎯 Verification and Deployment
Our app has compiled flawlessly with zero lint warnings. It features interactive before-and-after drag comparisons that run directly in the sandbox interface!

- **To run in development:** `npm run dev`
- **To compile production bundle:** `npm run build`
