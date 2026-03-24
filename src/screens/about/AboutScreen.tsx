"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const WORKS = [
  { title: "CIB on the Mobile", desc: "Redesigned the mobile banking experience for 2M+ users with focus on accessibility.", icon: "📱" },
  { title: "CIB on the Mobile", desc: "Built a real-time notification system reducing response time by 40%.", icon: "🔔" },
  { title: "CIB on the Mobile", desc: "Led UX research and prototyping for the new onboarding flow.", icon: "🎨" },
  { title: "CIB on the Mobile", desc: "Implemented design system components adopted across 5 product teams.", icon: "⚙️" },
];

const PROJECTS = [
  {
    tag: "Featured Project",
    title: "Example Project",
    desc: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    links: ["#", "#"],
    img: null,
    align: "right",
  },
  {
    tag: "Featured Project",
    title: "Example Project",
    desc: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    links: ["#", "#"],
    img: null,
    align: "left",
  },
];

const TECHS = ["⚛️", "🟦", "🌐", "🎨", "⚡", "🐍", "🎭", "🦋", "🔷", "🟩", "🟠", "💎"];

function TypewriterText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className="text-violet-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function GlowOrb() {
  return (
    <div className="relative flex items-center justify-center h-64 my-12">
      <div className="absolute w-64 h-64 rounded-full bg-violet-600/10 blur-3xl animate-pulse" />
      <div className="absolute w-40 h-40 rounded-full bg-violet-500/20 blur-2xl" />
      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-800 flex items-center justify-center shadow-2xl shadow-violet-500/40">
        <span className="text-white text-3xl font-black select-none">K</span>
      </div>
      {/* orbit ring */}
      <div className="absolute w-48 h-48 rounded-full border border-violet-500/20 animate-spin" style={{ animationDuration: "12s" }}>
        <span className="absolute -top-1 left-1/2 w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-400/80" />
      </div>
      <div className="absolute w-64 h-64 rounded-full border border-violet-500/10 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
        <span className="absolute top-0 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full" />
      </div>
    </div>
  );
}

export default function AboutScreen() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#080818] text-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#080818]/80 backdrop-blur-md border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center font-black text-sm">K</div>
        <div className="flex items-center gap-8 text-[13px] text-gray-300">
          <Link href="/about" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/about#projects" className="hover:text-white transition-colors">Lab</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <section ref={heroRef} className="mb-20">
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Avatar area */}
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-violet-600/40 to-purple-900/60 border border-violet-500/20 flex items-center justify-center text-6xl shadow-2xl shadow-violet-500/20">
                🧑‍💻
              </div>
              {/* callout */}
              <div className="absolute -top-4 -right-4 bg-[#1a1a2e] border border-violet-500/30 rounded-xl px-3 py-1.5 text-[12px] whitespace-nowrap shadow-lg">
                <span className="text-gray-400">Hello! I am </span>
                <span className="text-violet-400 font-semibold">Ibrahim Hamun</span>
              </div>
              <div className="mt-3 bg-[#12122a] border border-white/5 rounded-xl p-3 text-[11px] text-gray-400 max-w-[160px]">
                <p className="text-gray-300 font-medium mb-0.5">A Designer who</p>
                <p className="text-[13px] font-bold text-white leading-snug">
                  Judges a book by its{" "}
                  <span className="text-violet-400 underline decoration-dotted">cover</span>...
                </p>
                <p className="text-[10px] mt-1 opacity-50">Because if the cover does not impress you what else can?</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                I&apos;m a{" "}
                <TypewriterText texts={["Software Engineer.", "UI/UX Designer.", "Problem Solver."]} />
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                Currently, I&apos;m a Software Engineer at{" "}
                <span className="text-blue-400 font-medium">🔵 Facebook</span>
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mt-3">
                A self-taught UI/UX designer, functioning in the industry for 3+ years now.
                I make meaningful and delightful digital products that create an equilibrium
                between user needs and business goals.
              </p>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="about" className="mb-20">
          <h2 className="text-2xl font-black mb-6 text-white">Work Experience</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORKS.map((w, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-[#12122e] to-[#0e0e22] border border-violet-500/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-xl border border-violet-500/20">
                    {w.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white">{w.title}</p>
                    <p className="text-[10px] text-violet-400">2021 — Present</p>
                  </div>
                </div>
                <p className="text-[12px] text-gray-400 leading-relaxed">{w.desc}</p>
                <button className="mt-4 text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer">
                  LEARN MORE →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-4 text-center">
          <p className="text-[13px] text-gray-400 mb-4">
            I&apos;m currently looking to join a{" "}
            <span className="text-violet-400 underline decoration-dotted">cross-functional</span>{" "}
            team that values improving people&apos;s lives through accessible design.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-2xl">
            {TECHS.map((t, i) => (
              <span key={i} className="hover:scale-125 transition-transform cursor-default" title="Tech">{t}</span>
            ))}
          </div>
        </section>

        {/* Glow orb */}
        <GlowOrb />

        {/* Featured Projects */}
        <section id="projects" className="mb-20 space-y-16">
          {PROJECTS.map((p, i) => (
            <div key={i} className={`flex flex-col ${p.align === "right" ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
              {/* mock screenshot */}
              <div className="flex-shrink-0 w-full md:w-64 h-44 bg-gradient-to-br from-[#1a1a3e] to-[#0e0e28] rounded-2xl border border-violet-500/10 flex items-center justify-center text-gray-600 text-[12px] shadow-2xl shadow-violet-500/10">
                <div className="w-full h-full p-4 flex flex-col gap-2">
                  <div className="h-2 bg-white/5 rounded w-3/4" />
                  <div className="h-2 bg-white/5 rounded w-1/2" />
                  <div className="flex-1 bg-white/[0.03] rounded-lg mt-1" />
                  <div className="h-2 bg-violet-500/20 rounded w-1/3" />
                </div>
              </div>
              <div className={`${p.align === "right" ? "md:text-right" : "md:text-left"}`}>
                <p className="text-[11px] text-violet-400 font-semibold mb-1">{p.tag}</p>
                <h3 className="text-xl font-black text-white mb-3">{p.title}</h3>
                <div className="bg-[#12122e] border border-violet-500/10 rounded-xl p-4 mb-4">
                  <p className="text-[12px] text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
                <div className={`flex gap-3 ${p.align === "right" ? "md:justify-end" : "justify-start"}`}>
                  <a href={p.links[0]} className="text-gray-300 hover:text-violet-400 transition-colors text-xl">⚙️</a>
                  <a href={p.links[1]} className="text-gray-300 hover:text-violet-400 transition-colors text-xl">🔗</a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-white/5 pt-12">
          <h2 className="text-xl font-black mb-3">Contact</h2>
          <p className="text-[13px] text-gray-400 mb-4 leading-relaxed">
            I&apos;m currently looking to join a cross-functional team that values improving people&apos;s
            lives through accessible design, or have a project in mind? Let&apos;s connect.
          </p>
          <a href="mailto:ibrahimemon832@gmail.com" className="text-[13px] text-violet-400 hover:underline block mb-6">
            ibrahimemon832@gmail.com
          </a>
          <div className="flex gap-4 text-xl">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Instagram">📷</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Dribbble">🏀</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Google">🔍</a>
          </div>
        </section>
      </main>
    </div>
  );
}
