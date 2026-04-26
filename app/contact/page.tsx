import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const INFO_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "greddysmartinez5@gmail.com",
    href: "mailto:greddysmartinez5@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/greddysmartinez",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: "Behance",
    value: "behance.net/greddysmartinez",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    label: "UpWork",
    value: "Available for freelance",
    href: "#",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Málaga, Spain · Open to remote",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <main className={`${playfair.variable} ${inter.variable} bg-[#F0F7FF] font-inter text-[#3c3e3f] overflow-x-hidden min-h-screen`}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#bcd2ff]/60 h-16 px-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="font-playfair italic text-[#1183D0] text-xl font-medium">Logo</a>
          <ul className="flex items-center gap-1">
            {["Projects", "Resume", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${link === "Contact" ? "bg-[#1183D0]/10 text-[#1183D0]" : "text-[#1183D0] hover:bg-[#003d66]/5"}`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="/contact"
          className="px-5 py-2 rounded-full bg-[#1183D0] text-white text-sm font-medium hover:bg-[#0e6fad] transition-colors"
        >
          Get in touch
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-[#1183D0] text-sm font-medium mb-3 tracking-wide uppercase">Let's talk</p>
        <h1 className="text-5xl font-playfair italic text-[#0e2951] leading-tight mb-4">Get in Touch</h1>
        <p className="text-[#5c7792] text-lg max-w-xl mx-auto leading-relaxed">
          Whether you have a project in mind, a question, or just want to say hello — I'd love to hear from you.
        </p>
      </section>

      {/* 2-col: Form + Info */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#bcd2ff]/30">
            <h2 className="text-xl font-semibold text-[#0e2951] mb-6">Send a message</h2>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5c7792] uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="px-4 py-3 rounded-xl border border-[#bcd2ff]/60 bg-[#F0F7FF] text-[#3c3e3f] text-sm outline-none focus:border-[#1183D0] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5c7792] uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="px-4 py-3 rounded-xl border border-[#bcd2ff]/60 bg-[#F0F7FF] text-[#3c3e3f] text-sm outline-none focus:border-[#1183D0] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5c7792] uppercase tracking-wide">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="px-4 py-3 rounded-xl border border-[#bcd2ff]/60 bg-[#F0F7FF] text-[#3c3e3f] text-sm outline-none focus:border-[#1183D0] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5c7792] uppercase tracking-wide">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="px-4 py-3 rounded-xl border border-[#bcd2ff]/60 bg-[#F0F7FF] text-[#3c3e3f] text-sm outline-none focus:border-[#1183D0] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 px-6 py-3 rounded-full bg-[#1183D0] text-white font-medium text-sm hover:bg-[#0e6fad] transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            <p className="text-[#5c7792] text-sm leading-relaxed">
              I'm currently based in Málaga, Spain and available for remote opportunities worldwide. Response time is usually within 24 hours.
            </p>
            {INFO_CARDS.map((card) => (
              <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#bcd2ff]/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E0EEFB] text-[#1183D0] flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs text-[#5c7792] font-medium uppercase tracking-wide">{card.label}</p>
                  {card.href ? (
                    <a href={card.href} className="text-sm text-[#0e2951] font-medium hover:text-[#1183D0] transition-colors">{card.value}</a>
                  ) : (
                    <p className="text-sm text-[#0e2951] font-medium">{card.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e2951] text-white/70 text-sm py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-playfair italic text-white text-lg">Greddys Martínez</span>
          <div className="flex gap-6">
            {["Home", "Projects", "Resume", "Contact"].map((l) => (
              <a key={l} href={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <p>© 2025 · All rights reserved</p>
        </div>
      </footer>
    </main>
  );
}
