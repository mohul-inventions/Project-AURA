import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  MapPin,
  Navigation,
  Phone,
  Share2,
  AlertTriangle,
  Battery,
  Car,
  Clock,
  Star,
  Activity,
  CheckCircle2,
  Mic,
  X,
  Radio,
  Wifi,
} from "lucide-react";

export default function RideSafetyDashboard() {
  const [showCheck, setShowCheck] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [alertSent, setAlertSent] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null); // State to hold backend data
  const intervalRef = useRef<any>(null);

  // 1. Polling logic to fetch live data from your Node.js backend
  useEffect(() => {
    const trackingInterval = setInterval(() => {
      fetch('http://localhost:5000/api/live-tracking')
        .then((res) => res.json())
        .then((data) => {
          setTrackingData(data);
          
          // The Magic Trigger: If the backend says 'deviation', open the modal!
          if (data.status === 'deviation' && !showCheck && !alertSent) {
            setShowCheck(true);
          }
        })
        .catch((err) => console.error("Waiting for backend...", err));
    }, 3000); // Checks every 3 seconds

    return () => clearInterval(trackingInterval);
  }, [showCheck, alertSent]);

  // 2. Countdown logic for the safety check modal
  useEffect(() => {
    if (showCheck && !alertSent) {
      intervalRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            setAlertSent(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [showCheck, alertSent]);

  const openCheck = () => {
    setCountdown(15);
    setAlertSent(false);
    setShowCheck(true);
  };

  const confirmSafe = () => {
    clearInterval(intervalRef.current);
    setShowCheck(false);
    setAlertSent(false);
    setCountdown(15);
  };

  const sendHelpNow = () => {
    clearInterval(intervalRef.current);
    setAlertSent(true);
  };

  const closeAfterAlert = () => {
    setShowCheck(false);
    setAlertSent(false);
    setCountdown(15);
  };

  const statusIsSafe = !showCheck;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/30">
              <Shield className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-widest text-slate-100">
                AURA
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Live Trip Protection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status indicator */}
            <div
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                statusIsSafe
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/40 bg-red-500/10 text-red-400"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    statusIsSafe ? "bg-emerald-400 animate-ping" : "bg-red-400 animate-ping"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    statusIsSafe ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
              </span>
              Status: {statusIsSafe ? "Safe" : "Check Required"}
            </div>

            <div className="hidden items-center gap-3 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 sm:flex">
              <span className="flex items-center gap-1 font-mono">
                <Wifi className="h-3.5 w-3.5 text-cyan-400" /> 5G
              </span>
              <span className="h-3 w-px bg-slate-700" />
              <span className="flex items-center gap-1 font-mono">
                <Battery className="h-3.5 w-3.5 text-emerald-400" /> 84%
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-12">
        {/* Left column */}
        <section className="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-3">
          {/* Driver card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Driver
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-slate-950 ring-2 ring-cyan-400/30">
                AK
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-100">Arjun Krishnan</p>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  4.92 &middot; 1,204 trips
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 font-mono text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Car className="h-4 w-4 text-slate-500" />
                White Hyundai i20
              </span>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 tracking-widest text-slate-200">
                TN 58 BX 7741
              </span>
            </div>
          </div>

          {/* Trip details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Trip
            </p>
            <ol className="relative space-y-4 border-l border-slate-800 pl-4">
              <li className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-900" />
                <p className="text-xs text-slate-500">Pickup</p>
                <p className="text-sm text-slate-200">Anna Nagar Bus Stand</p>
              </li>
              <li className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-900" />
                <p className="text-xs text-slate-500">Drop-off</p>
                <p className="text-sm text-slate-200">Teppakulam, Madurai</p>
              </li>
            </ol>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 py-2">
                <p className="font-mono text-lg font-semibold text-cyan-300">12 min</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">ETA</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 py-2">
                <p className="font-mono text-lg font-semibold text-cyan-300">4.2 km</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Distance</p>
              </div>
            </div>
          </div>

          {/* Safety toolkit */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Safety Toolkit
            </p>
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 transition-colors hover:border-cyan-400/40 hover:bg-slate-800/60">
                <span className="flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-cyan-400" />
                  Share trip status
                </span>
              </button>
              <button className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 transition-colors hover:border-cyan-400/40 hover:bg-slate-800/60">
                <span className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-cyan-400" />
                  Record trip audio
                </span>
              </button>
              <button
                onClick={openCheck}
                className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
              >
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Trigger safety check
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Center map */}
        <section className="order-1 lg:order-2 lg:col-span-6">
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40 lg:h-full">
            {/* Grid background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            {/* Radial glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

            {/* Route path */}
            <svg
              viewBox="0 0 600 420"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 80 320 C 180 280, 220 200, 300 210 S 420 150, 500 90"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeDasharray="2 10"
                strokeLinecap="round"
                opacity="0.6"
              />
              <circle cx="80" cy="320" r="6" fill="#22d3ee" />
              <circle cx="500" cy="90" r="6" fill="#34d399" />
            </svg>

            {/* Live location pulse */}
            <div className={`absolute left-[48%] top-[55%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${trackingData?.status === 'deviation' ? 'translate-x-[40px] translate-y-[20px]' : ''}`}>
              <span className={`absolute inset-0 h-16 w-16 -translate-x-1/4 -translate-y-1/4 animate-ping rounded-full border ${trackingData?.status === 'deviation' ? 'border-red-500/40' : 'border-cyan-400/40'}`} />
              <span className={`absolute inset-0 h-10 w-10 -translate-x-[6px] -translate-y-[6px] animate-pulse rounded-full border ${trackingData?.status === 'deviation' ? 'border-red-500/60' : 'border-cyan-400/60'}`} />
              <span className={`relative flex h-3 w-3 items-center justify-center rounded-full shadow-[0_0_12px_3px_rgba(34,211,238,0.6)] ${trackingData?.status === 'deviation' ? 'bg-red-500 shadow-red-500' : 'bg-cyan-400'}`}>
                <Navigation className="h-2 w-2 -translate-y-px text-slate-950" />
              </span>
            </div>

            {/* Floating ETA card */}
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 backdrop-blur-md">
              <Activity className="h-4 w-4 text-cyan-400" />
              <div className="leading-tight">
                <p className="text-xs font-semibold text-slate-100">
                  {trackingData?.message || "Connecting to GPS..."}
                </p>
                <p className="font-mono text-[10px] text-slate-500">32 km/h &middot; heading NE</p>
              </div>
            </div>

            {/* Floating destination card */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <p className="text-xs text-slate-200">Teppakulam, Madurai</p>
            </div>

            {/* Map label */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-slate-600">
              MAP VIEW &middot; LIVE GPS
            </div>
          </div>
        </section>

        {/* Right column */}
        <section className="order-3 flex flex-col gap-4 lg:col-span-3">
          {/* Safety score */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Safety Score
            </p>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={trackingData?.status === 'deviation' ? '#ef4444' : '#22d3ee'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - (trackingData?.status === 'deviation' ? 0.4 : 0.92))}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-mono text-lg font-bold ${trackingData?.status === 'deviation' ? 'text-red-400' : 'text-cyan-300'}`}>
                    {trackingData?.status === 'deviation' ? '40' : '92'}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                <p className="text-sm font-semibold text-slate-100">
                  {trackingData?.status === 'deviation' ? 'Warning' : 'Excellent'}
                </p>
                <p className="mt-1">
                  {trackingData?.message || 'Driver verified, route on track, no anomalies detected.'}
                </p>
              </div>
            </div>
          </div>

          {/* Check-in timeline */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Automated Check-ins
            </p>
            <div className="space-y-3">
              {[
                { time: "10:42", label: "Trip started", ok: true },
                { time: "10:47", label: "Route verified", ok: true },
                { time: "10:53", label: "Speed normal", ok: true },
              ].map((item) => (
                <div key={item.time} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {item.label}
                  </span>
                  <span className="font-mono text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency contacts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 backdrop-blur-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Trusted Contacts
            </p>
            <div className="flex flex-col gap-2">
              {["Mom", "Priya (Sister)"].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200"
                >
                  <span>{name}</span>
                  <Radio className="h-3.5 w-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Conditional emergency check-in modal */}
      {showCheck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-red-500/60 bg-slate-950 p-6 text-center shadow-2xl shadow-red-500/30">
            {/* Animated glow ring */}
            <div className="pointer-events-none absolute -inset-px rounded-3xl border border-red-500/40 animate-pulse" />

            {!alertSent ? (
              <>
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 ring-4 ring-red-500/20">
                  <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                  <AlertTriangle className="relative h-8 w-8 text-red-400" />
                </div>

                <h2 className="text-xl font-bold tracking-tight text-slate-50">
                  Are you safe?
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  We noticed a deviation from the expected route. Confirm your
                  safety or send an alert to your trusted contacts.
                </p>

                {/* Countdown bar */}
                <div className="mt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-red-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${(countdown / 15) * 100}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-red-400">
                    Auto-alert in {countdown}s
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={confirmSafe}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    I'm safe, dismiss
                  </button>
                  <button
                    onClick={sendHelpNow}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    <Phone className="h-4 w-4" />
                    No, send help now
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 ring-4 ring-red-500/20">
                  <Phone className="h-8 w-8 text-red-400" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-50">
                  Alert sent
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Your live location and trip details have been shared with
                  your trusted contacts and support team.
                </p>
                <button
                  onClick={closeAfterAlert}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}