import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../ThemeToggle";
import logoWhite from "../../assets/logowhite.png";
import logoDark from "../../assets/logodark.png";
import {
  LuLock,
  LuEye,
  LuEyeOff,
  LuArrowLeft,
  LuShieldCheck,
  LuCircleAlert,
  LuKeyRound,
  LuMail,
  LuDatabase,
} from "react-icons/lu";

const AdminLogin = ({ onBackToPortfolio }) => {
  const { login } = useAuth();
  const { isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login({
        identifier: email,
        password,
        rememberMe,
      });

      if (!res.success) {
        setError(
          res.error || "Failed to log in. Please check your Supabase credentials."
        );
      }
      // On success, AuthContext updates isAuthenticated, and App.jsx immediately switches to AdminDashboard!
    } catch {
      setError("An unexpected authentication error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#181818] text-white" : "bg-[#f4f6f8] text-gray-900"
      }`}
    >
      {/* Background Ambience & Lighting */}
      <div
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #2dd4bf 0%, #0f766e 50%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 right-12 w-[520px] h-[520px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
        }}
      />

      {/* Top Bar Navigation */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <button
          onClick={onBackToPortfolio}
          type="button"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white"
              : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700 shadow-sm"
          }`}
          title="Return to Public Portfolio"
        >
          <LuArrowLeft className="text-base" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isDark
                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            <LuDatabase className="text-xs" />
            <span>Supabase Connected</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-1">
        <div
          className={`w-full max-w-md rounded-3xl p-8 sm:p-10 border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
            isDark
              ? "bg-[#202020]/95 border-white/10 shadow-black/70"
              : "bg-white/95 border-gray-200/90 shadow-gray-200/80"
          }`}
        >
          {/* Brand Header */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4">
              <img
                src={isDark ? logoWhite : logoDark}
                alt="Dharmendra Ram Logo"
                className="h-12 w-auto object-contain drop-shadow"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-teal-500/30 bg-teal-500/10 text-teal-400">
              <LuShieldCheck className="text-sm" />
              <span>Admin Portal</span>
            </div>

            <h1
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Sign In to Dashboard
            </h1>
            <p
              className={`text-sm mt-1.5 ${
                isDark ? "text-neutral-400" : "text-gray-500"
              }`}
            >
              Enter your Supabase admin credentials to proceed
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div
              role="alert"
              className="mb-6 p-3.5 rounded-xl text-sm border flex items-start gap-3 bg-red-500/10 border-red-500/30 text-red-400 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <LuCircleAlert className="text-lg shrink-0 mt-0.5" />
              <span className="flex-1 text-xs leading-relaxed">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email field */}
            <div>
              <label
                htmlFor="admin-email"
                className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? "text-neutral-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base ${
                    isDark ? "text-neutral-400" : "text-gray-400"
                  }`}
                >
                  <LuMail />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="admin@dharmendra.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-teal-400 focus:bg-white/10"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-white focus:shadow-sm"
                  }`}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="admin-password"
                className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? "text-neutral-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base ${
                    isDark ? "text-neutral-400" : "text-gray-400"
                  }`}
                >
                  <LuLock />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-teal-400 focus:bg-white/10"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:bg-white focus:shadow-sm"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={`absolute inset-y-0 right-0 pr-3.5 flex items-center text-lg cursor-pointer transition-colors ${
                    isDark
                      ? "text-neutral-400 hover:text-white"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-400 text-teal-500 focus:ring-teal-400 cursor-pointer accent-teal-500"
                />
                <span
                  className={`text-xs ${
                    isDark ? "text-neutral-300" : "text-gray-600"
                  }`}
                >
                  Keep me signed in
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg mt-3 ${
                isLoading
                  ? "opacity-75 cursor-not-allowed bg-teal-600 text-white"
                  : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white hover:shadow-teal-500/25 active:scale-[0.99]"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying with Supabase...</span>
                </>
              ) : (
                <>
                  <LuKeyRound className="text-lg" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Connected Supabase Project Info */}
          <div
            className={`mt-6 pt-5 border-t text-center text-xs flex flex-col items-center gap-1 ${
              isDark
                ? "border-white/10 text-neutral-500"
                : "border-gray-100 text-gray-400"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <LuDatabase className="text-teal-400 text-sm" />
              <span>
                Connected to Supabase Project: <code className="font-mono text-teal-400">yeeflbcxicnxsoywtgzo</code>
              </span>
            </div>
            <span className="text-[11px] opacity-75">
              Instant redirect to Dashboard upon verification
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 py-4 text-center text-xs ${
          isDark ? "text-neutral-500" : "text-gray-400"
        }`}
      >
        Dharmendra Kumar Ram &bull; Admin Access Portal
      </footer>
    </div>
  );
};

export default AdminLogin;
