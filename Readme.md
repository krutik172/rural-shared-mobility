# 🚐 Rural Shared Mobility

A modern demand-based rural ride sharing platform built to make travel to villages and semi-urban areas affordable, accessible, and community-driven. Instead of drivers creating rides first, passengers create travel intent and the system groups users traveling on similar routes into shared EV/CNG rides.

---

## 🌟 Project Vision

Many rural areas in India have limited bus availability and expensive private transport. This platform focuses on:

* Demand-first ride creation
* Shared travel to reduce cost
* Environment-friendly EV/CNG vehicles
* Simple mobile-first experience for rural users

Users can create a ride request, others can join, and once minimum passengers are reached, a suitable vehicle and driver are assigned automatically.

---

## 🧠 Core Features

### 👤 User Features

* OTP-based login
* Create travel request / ride
* Join existing rides with similar routes
* Ride show page with passengers & pricing
* Cost split based on ₹ per KM model
* Landmark-based pickup points
* Mobile-first UI

### 🚘 Ride Logic

* Every ride is created by a user
* Other users can join rides with matching routes
* Minimum 3 passengers required
* Auto vehicle assignment (EV/CNG)
* Transparent fare calculation

### ⚙️ System Features

* Demand aggregation engine
* Route-based matching
* Background worker for grouping rides
* Admin driver assignment panel

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* React Router
* TailwindCSS (or Vanilla CSS)
* Leaflet + OpenStreetMap
* Lucide React Icons

### Backend

* Ruby on Rails (API mode)
* PostgreSQL
* Sidekiq + Redis (background jobs)

### External Services

* OpenStreetMap Nominatim API (Location search)

---

## 📂 Project Structure

```
rural-shared-mobility/
│
├── frontend/        # React app
├── backend/         # Rails API
├── README.md
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```
git clone https://github.com/krutik172/rural-shared-mobility.git
cd rural-shared-mobility
```

---

### 🔹 2. Backend Setup (Rails)

```
cd backend
bundle install
rails db:create
rails db:migrate
```

Start server:

```
rails s
```

Start Sidekiq worker:

```
bundle exec sidekiq
```

---

### 🔹 3. Frontend Setup (React)

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend API runs on:

```
http://localhost:3000
```

---

## 🧮 Pricing Model

Ride cost is calculated dynamically:

```
Total Cost = Distance (KM) × Price Per KM
Cost Per Person = Total Cost ÷ Number of Passengers
```

Example:

```
100 KM × ₹30/km = ₹3000 total
3 passengers → ₹1000 per person
```

EV/CNG pricing helps keep costs lower than traditional cab services.

---

## 🔄 Ride Flow

1. User creates a travel request
2. Other users join matching rides
3. System groups passengers via Sidekiq matching job
4. Once minimum passengers reached:

   * Ride status becomes Confirmed
   * Driver & vehicle assigned
5. Ride details visible on Ride Show Page

---

## 📡 API Overview

### Auth

```
POST /api/v1/auth/login
```

### Travel Requests

```
POST /api/v1/travel_requests
GET  /api/v1/travel_requests
```

### Ride Groups

```
GET  /api/v1/ride_groups/:id
POST /api/v1/ride_groups/:id/join
```

### Admin

```
GET /api/v1/admin/ride_groups
```

---

## 🧱 Data Models

* User
* TravelRequest
* RideGroup
* RideMember
* Driver
* Vehicle
* PricingRule

---

## 📱 UX Principles

* Mobile-first interface
* Large touch targets
* Landmark-based navigation
* Simple language for rural users
* Transparent pricing

---

## 🔐 Environment Variables

Create `.env` files in frontend/backend as needed:

```
DATABASE_URL=
REDIS_URL=
API_BASE_URL=
```

---

## 🚀 Future Improvements

* WhatsApp notifications
* Route subscription system
* Driver live tracking
* Smart route clustering
* Payment gateway integration

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Open Pull Request

---

## 📄 License

MIT License — feel free to build and extend.

---

## 👨‍💻 Author

**Krutik Thaker**
Building scalable, community-driven mobility solutions 🚀
