import React, { Fragment, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SocialIcon from "./components/SocialIcon";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ExperienceProvider } from "./context/ExperienceContext";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

const isAdminHash = (hash) => {
  const clean = (hash || "").replace(/^#\/?/, "").toLowerCase();
  return clean === "admin" || clean === "login";
};

const PageLoader = ({ isDark }) => (
  <div
    className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden ${isDark ? "bg-[#0c0e14] text-white" : "bg-[#f8fafc] text-slate-900"}`}
    role="status"
    aria-live="polite"
    aria-label="Loading portfolio"
  >
    <div className="absolute inset-0 opacity-40" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
    </div>
    <div className="relative flex flex-col items-center">
      <div className="relative grid h-32 w-32 place-items-center" aria-hidden="true">
        <div className="absolute inset-2 rounded-full border border-dashed border-teal-400/50 animate-[spin_12s_linear_infinite]" />
        <div className="absolute inset-5 rounded-full border border-cyan-400/30 animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute h-16 w-16 rotate-45 rounded-2xl border border-teal-300/70 bg-teal-400/10 shadow-[0_0_40px_rgba(45,212,191,0.2)] animate-pulse" />
        <span className="relative font-mono text-2xl font-bold tracking-tight text-teal-400">DR</span>
        <span className="absolute right-3 top-7 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
      </div>
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-teal-500 dark:text-teal-300">Preparing portfolio</p>
      <div className={`mt-4 h-px w-40 overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-300"}`} aria-hidden="true">
        <div className="h-full w-1/2 animate-[loader-scan_1.4s_ease-in-out_infinite] bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const [isAdminView, setIsAdminView] = useState(() =>
    isAdminHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(isAdminHash(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = "#admin";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToPortfolio = () => {
    if (window.location.hash) {
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <PageLoader isDark={isDark} />;

  // Render Admin View if on #admin or #login route
  if (isAdminView) {
    if (isAuthenticated) {
      return <AdminDashboard onBackToPortfolio={navigateToPortfolio} />;
    }
    return <AdminLogin onBackToPortfolio={navigateToPortfolio} />;
  }

  // Render Public Portfolio
  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 font-sans selection:bg-teal-500/20 selection:text-teal-300 ${
        isDark ? "bg-[#0c0e14] text-neutral-100" : "bg-[#f8fafc] text-slate-800"
      }`}
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25 transition-all duration-700 ${
            isDark ? "bg-teal-500/20" : "bg-teal-300/30"
          }`}
        />
        <div
          className={`absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
            isDark ? "bg-cyan-500/20" : "bg-cyan-300/20"
          }`}
        />
        <div
          className={`absolute bottom-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-15 transition-all duration-700 ${
            isDark ? "bg-blue-600/20" : "bg-blue-300/20"
          }`}
        />
      </div>

      <Navbar />
      <SocialIcon />

      <main className="relative z-10 pt-6 sm:pt-18">
        <Home />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer onNavigateToAdmin={navigateToAdmin} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Fragment>
      <ThemeProvider>
        <AuthProvider>
          <PortfolioProvider>
            <ExperienceProvider>
              <AppContent />
            </ExperienceProvider>
          </PortfolioProvider>
        </AuthProvider>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
