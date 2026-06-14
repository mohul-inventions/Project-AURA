# 🛡️ Project Aura

> **The Proactive AI Guardian for Women's Commute**  
> *Built for the OneJourney Mobility Hackathon 2026 (Track: Women Safety & Secure Commute)*

## 🚀 About The Project
Current mobility safety apps are fundamentally flawed: they are reactive. They expect a woman in a high-stress, dangerous situation to unlock her phone, open an app, and press an SOS button. 

**Project Aura** shifts safety from reactive to proactive. Designed as a background module for the OneJourney super-app, Aura monitors the commute using real-time geospatial data. If a vehicle deviates from its route or stops in a dark zone, Aura bypasses the need for human interaction and automatically triggers a safety countdown, escalating to emergency contacts if the user is unresponsive.

## ✨ Key Features (MVP)
*   **Live Route Tracking:** A polished, mobile-first React dashboard tracking the active commute.
*   **The Deviation Engine:** A Node.js simulation engine that tracks coordinates against a predefined safe path.
*   **Auto-Escalation:** An intelligent UI that forces a 15-second safety check upon detecting a deviation. If ignored, it broadcasts a live tracking link automatically.

## 🛠️ Tech Stack
*   **Frontend:** React (Vite), Tailwind CSS, Lucide-React (Icons)
*   **Backend:** Node.js, Express, CORS
*   **Data Logic:** Simulated live-polling REST API

## ⚙️ How to Run Locally

To test the prototype on your local machine, you will need to run both the backend simulation engine and the frontend UI simultaneously.

### 1. Start the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
node server.js
