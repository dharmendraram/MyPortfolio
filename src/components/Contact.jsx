import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { LuMail, LuPhone, LuMapPin, LuSend, LuLoader, LuMessageSquare } from "react-icons/lu";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";

const socials = [
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/dharmendraram/", label: "LinkedIn", color: "hover:text-blue-500 hover:border-blue-500" },
  { icon: <FaGithub />, href: "https://github.com/dharmendraram", label: "GitHub", color: "hover:text-neutral-100 hover:border-neutral-400" },
  { icon: <BsWhatsapp />, href: "https://wa.me/9779819745073", label: "WhatsApp", color: "hover:text-emerald-500 hover:border-emerald-500" },
  { icon: <FaFacebook />, href: "https://facebook.com/", label: "Facebook", color: "hover:text-blue-600 hover:border-blue-600" },
  { icon: <FaInstagram />, href: "https://instagram.com/", label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500" },
];

const Contact = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [headerRef, headerVisible] = useScrollReveal(0.1);
  const [leftRef, leftVisible] = useScrollReveal(0.1);
  const [rightRef, rightVisible] = useScrollReveal(0.1);

  const subText = "Have a project in mind, an opportunity, or a technical question? Reach out through the form or direct channels below.";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      await supabase.from("inquiries").insert([{
        name: form.name, email: form.email, phone: form.phone || "",
        subject: form.subject || "Portfolio Contact Inquiry", message: form.message, read: false,
      }]);
    } catch (err) { console.warn("Supabase insert skipped or failed:", err); }

    try {
      const stored = localStorage.getItem("portfolio_inquiries");
      const existing = stored ? JSON.parse(stored) : [];
      const newInquiry = {
        id: "inq-" + Date.now(), name: form.name, email: form.email,
        phone: form.phone || "", subject: form.subject || "Portfolio Contact Inquiry",
        message: form.message, date: new Date().toISOString(), read: false,
      };
      localStorage.setItem("portfolio_inquiries", JSON.stringify([newInquiry, ...existing]));
    } catch (err) { console.error("Error storing contact inquiry locally:", err); }

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

  const inputBaseClasses = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
    isDark
      ? "bg-white/[0.03] border-white/10 text-white placeholder-neutral-500 focus:border-teal-400/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-teal-400/40"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500/30"
  }`;

  return (
    <section
      id="contact"
      className="relative py-10 border-t border-slate-200/60 dark:border-white/10 overflow-hidden"
    >
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-5 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-mono text-[10px] sm:text-xs text-gray-500 mb-2">
            <span className="text-teal-400">$</span>{" "}
            <span className="text-cyan-400">cat</span> contact.json
          </div>
          <h2 className={`font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Let's build something{" "}
            <span className="text-teal-500 dark:text-teal-400">
              extraordinary.
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-xl ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
            {subText}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div
            ref={leftRef}
            className={`lg:col-span-6 space-y-6 transition-all duration-700 ease-out delay-100 ${
              leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Let's talk about your vision</h3>
              <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed">
                I am actively collaborating with companies, startups, and product teams on engineering resilient web platforms, REST APIs, and modern frontend interfaces.
              </p>
            </div>

            <div className="space-y-2 grid grid-cols-2 gap-3">
              <a href="mailto:dharmendraram7852@gmail.com" className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group ${isDark ? "bg-white/[0.02] border-white/10 hover:border-teal-500/40 hover:bg-white/[0.05]" : "bg-white border-slate-200 hover:border-teal-500/40 hover:bg-slate-50 shadow-sm"}`}>
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <LuMail className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 block font-medium">Direct Email</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-neutral-200 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">dharmendraram7852@gmail.com</span>
                </div>
              </a>

              <a href="tel:+9779819745073" className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group ${isDark ? "bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.05]" : "bg-white border-slate-200 hover:border-cyan-500/40 hover:bg-slate-50 shadow-sm"}`}>
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <LuPhone className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 block font-medium">Phone / Viber</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-neutral-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">+977 9819745073</span>
                </div>
              </a>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <LuMapPin className="text-xl" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-neutral-400 block font-medium">Location</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-neutral-200">Kathmandu, Bagmati, Nepal</span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider block mb-3">Social Profiles & Networks</span>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center text-base transition-all duration-200 ${isDark ? "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.1] " + item.color : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 " + item.color}`}>
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightRef}
            className={`lg:col-span-6 transition-all duration-700 ease-out delay-200 ${
              rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${isDark ? "bg-white/[0.02] border-white/10 shadow-xl shadow-black/20" : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"}`}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <LuMessageSquare className="text-teal-500" />
                <span>Send a Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mb-6">
                Fill out the form below. Your message will be saved securely to the database and sent directly to my WhatsApp.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm">
                  <div>
                    <span className="font-semibold block">Thank you! Message forwarded.</span>
                    <span className="text-xs opacity-90">Your inquiry has been recorded and WhatsApp opened to complete sending.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Your Name <span className="text-teal-500">*</span></label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. John Doe" className={inputBaseClasses} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Email Address <span className="text-teal-500">*</span></label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="e.g. john@example.com" className={inputBaseClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Phone Number (Optional)</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+977 98..." className={inputBaseClasses} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Subject</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry / Job Proposal" className={inputBaseClasses} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Your Message <span className="text-teal-500">*</span></label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell me about your project goals, timelines, and technical requirements..." className={inputBaseClasses} />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-medium text-sm shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <><LuLoader className="animate-spin text-base" /><span>Sending message...</span></>
                  ) : (
                    <><LuSend className="text-base" /><span>Send Message & Connect on WhatsApp</span></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer terminal line */}
      <div className={`px-4 sm:px-6 md:px-8 lg:px-16 mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 border-t ${isDark ? "border-white/10" : "border-slate-200/60"}`}>
        <div className={`font-mono text-[10px] sm:text-xs flex flex-wrap items-center gap-1.5 sm:gap-2 ${isDark ? "text-gray-600" : "text-slate-400"}`}>
          <span className="text-teal-400">$</span>
          <span className="text-cyan-400">./send_message.sh</span>
          <span className="hidden sm:inline">--channel=whatsapp</span>
          <span className={`hidden sm:inline ${isDark ? "text-gray-700" : "text-slate-300"}`}>|</span>
          <span className="hidden sm:inline text-teal-400">grep</span>
          <span className="hidden sm:inline">&quot;status=delivered&quot;</span>
          <span className="animate-pulse text-teal-400">_</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
