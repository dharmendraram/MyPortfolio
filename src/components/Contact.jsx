import React, { useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiPhone, PiMapPinFill } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";

const socials = [
  { icon: <FaGithub />, href: "https://github.com/", label: "GitHub" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: <FaFacebook />, href: "https://facebook.com/", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://instagram.com/", label: "Instagram" },
  { icon: <BsWhatsapp />, href: "https://wa.me/9779819745073", label: "WhatsApp" },
];

const inputBase = "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200";

const Contact = () => {
  const { isDark } = useTheme();
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    // 1. Insert into Supabase cloud database
    try {
      await supabase.from("inquiries").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          subject: form.subject || "Portfolio Contact Inquiry",
          message: form.message,
          read: false,
        },
      ]);
    } catch (err) {
      console.warn("Supabase insert skipped or failed:", err);
    }

    // 2. Save inquiry to localStorage fallback for Admin Portal
    try {
      const stored = localStorage.getItem("portfolio_inquiries");
      const existing = stored ? JSON.parse(stored) : [];
      const newInquiry = {
        id: "inq-" + Date.now(),
        name: form.name,
        email: form.email,
        phone: form.phone || "",
        subject: form.subject || "Portfolio Contact Inquiry",
        message: form.message,
        date: new Date().toISOString(),
        read: false,
      };
      localStorage.setItem("portfolio_inquiries", JSON.stringify([newInquiry, ...existing]));
    } catch (err) {
      console.error("Error storing contact inquiry locally:", err);
    }

    const message = [
      "Hello Dharmendra Sir, I would like to discuss a project.", "",
      `Name: ${form.name}`, `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`, `Subject: ${form.subject || "Not provided"}`,
      "", "Project details:", form.message,
    ].join("\n");
    window.open(`https://wa.me/9779819745073?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setLoading(false);
  };

  const inputCls = `${inputBase} ${
    isDark
      ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-teal-400/60 focus:bg-white/8"
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-400 focus:shadow-sm"
  }`;

  return (
    <section id="contact" className="relative py-10 px-4 border-t border-[#555]/40 overflow-hidden">
      {/* ambient accent */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #f87171 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto container ">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-teal-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">Let's Talk</p>
          <h2 className={`text-4xl font-bold ${
            isDark ? "text-neutral-100" : "text-gray-800"
          }`}>
            Let’s build something <span className="text-outline">great.</span>
          </h2>
          <p className={`mt-3 max-w-md mx-auto text-sm ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
            Have an idea, a challenge, or a project in mind? I’m always open to a thoughtful conversation.
          </p>
          <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-teal-400 to-teal-700" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-start">
          {/* Left — Info */}
          <div className={`relative rounded-2xl p-8 border h-full flex flex-col justify-between overflow-hidden ${
            isDark ? "bg-white/[0.03] border-white/10" : "bg-gray-50 border-gray-200"
          }`}>
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-teal-400/20" />
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-teal-400/20" />
            <div>
              <h3 className={`text-xl font-bold mb-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>Contact Information</h3>
              <p className={`text-sm mb-3 ${
                isDark ? "text-neutral-500" : "text-gray-400"
              }`}>Open to freelance, full-time & collaborations.</p>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 mb-3 text-xs font-medium ${isDark ? "border-teal-400/20 bg-teal-400/10 text-teal-300" : "border-teal-500/20 bg-teal-50 text-teal-700"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_currentColor]" />
                Available for new projects
              </div>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: <PiMapPinFill className="text-teal-400" />,
                    label: "Location",
                    value: "Kathmandu, Nepal",
                    href: null,
                  },
                  {
                    icon: <MdEmail className="text-teal-400" />,
                    label: "Email",
                    value: "dharmendraram7852@gmail.com",
                    href: "mailto:dharmendraram7852@gmail.com",
                  },
                  {
                    icon: <PiPhone className="text-teal-400" />,
                    label: "Phone",
                    value: "+977-9819745073",
                    href: "tel:+9779819745073",
                  },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl border shrink-0 text-base transition-colors ${
                      isDark
                        ? "bg-white/5 border-white/10 group-hover:border-teal-400/40"
                        : "bg-white border-gray-200 group-hover:border-teal-300"
                    }`}>
                      {icon}
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-neutral-500" : "text-gray-400"
                      }`}>{label}</p>
                      {href ? (
                        <a href={href} className={`text-sm font-medium hover:text-teal-400 transition-colors ${
                          isDark ? "text-neutral-200" : "text-gray-700"
                        }`}>{value}</a>
                      ) : (
                        <p className={`text-sm font-medium ${
                          isDark ? "text-neutral-200" : "text-gray-700"
                        }`}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="mt-10">
              <p className={`text-xs uppercase tracking-widest mb-3 ${
                isDark ? "text-neutral-500" : "text-gray-400"
              }`}>Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl border text-sm transition-all hover:text-teal-400 hover:border-teal-400/50 hover:scale-110 ${
                      isDark
                        ? "bg-white/5 border-white/10 text-neutral-400"
                        : "bg-white border-gray-200 text-gray-500"
                    }`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className={`rounded-2xl p-8 border shadow-xl ${
            isDark ? "bg-white/[0.03] border-white/10" : "bg-gray-50 border-gray-200"
          }`}>
            <h3 className={`text-xl font-bold mb-1 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>Hire <span className="text-outline">Me</span></h3>
            <p className={`text-sm mb-6 ${
              isDark ? "text-neutral-500" : "text-gray-400"
            }`}>Tell me about your project and I'll get back to you.</p>

            {submitted && (
              <div className="mb-4 px-4 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                ✓ Message sent! I'll respond shortly.
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-2 gap-3.5">
                <input type="text" name="from_name" placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                <input type="email" name="from_email" placeholder="Your Email *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                <input type="text" name="phone" placeholder="Your Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} />
              </div>
              <textarea rows={5} name="message" placeholder="Describe your project... *" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} />
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-1 py-2.5 px-6 rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? "Sending..." : "Send Request"}
                  {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
