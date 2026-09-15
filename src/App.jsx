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

const AppContent = () => {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isAdminView, setIsAdminView] = useState(() =>
    isAdminHash(window.location.hash)
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Scroll Progress Bar at the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 shadow-sm shadow-teal-400/30 transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

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

      <main className="relative z-10 pt-18">
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
