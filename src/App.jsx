import React, { Fragment, useState, useEffect } from "react";
import HeadingHero from "./utils/HeadingHero";
import GridLine from "./utils/GridLine";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import logo from "./assets/logowhite.png";
import logoDark from "./assets/logodark.png";
import SocialIcon from "./components/SocialIcon";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ExperienceProvider } from "./context/ExperienceContext";
import ThemeToggle from "./components/ThemeToggle";
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
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#202020] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-center md:justify-start">
        <img src={isDark ? logo : logoDark} alt="" className="h-15" />
      </div>
      <ThemeToggle />
      <Navbar />
      <SocialIcon />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer onNavigateToAdmin={navigateToAdmin} />
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
