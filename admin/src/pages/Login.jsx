import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, AlertCircle, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import logoImg from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      sessionStorage.setItem("officer_session_active", "true");
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid authentication credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail("admin@skywardens.com");
    setPassword("adminPassword123!");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#020612] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#124b80]/25 rounded-full blur-[140px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-md bg-[#050e1f]/95 border border-[#1a5b98]/40 rounded-2xl p-7 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_45px_rgba(18,75,128,0.25)] backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#165a9b]/30 via-[#0e3d6e]/20 to-[#040d1a] border border-[#247bc4]/45 p-2.5 shadow-[0_0_30px_rgba(26,91,152,0.4)]">
            <img
              src={logoImg}
              alt="Sky Wardens Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(36,123,196,0.5)]"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white uppercase font-sans">
              SKY WARDENS
            </h1>
            <p className="text-xs text-slate-400 font-sans tracking-wide mt-0.5">Command CMS Management Portal</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs font-sans">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 font-sans">
              Admin Liaison Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#4a89c4]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="admin-input !pl-11"
                placeholder="Enter admin email"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300 font-sans">
                Security Clearance Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-medium text-[#5ca2db] hover:text-[#93c5fd] flex items-center gap-1 transition-colors font-sans"
              >
                {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                <span>{showPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#4a89c4]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="admin-input !pl-11 !pr-10"
                placeholder="Enter security password"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full admin-btn-primary py-3 justify-center text-xs uppercase font-sans tracking-wide font-semibold mt-2 shadow-[0_0_25px_rgba(30,107,184,0.35)] hover:shadow-[0_0_30px_rgba(36,123,196,0.5)]"
          >
            {loading ? (
              <span>Authenticating Officer...</span>
            ) : (
              <>
                <span>Access Command Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#cbd5e1]" />
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] text-[#5ca2db] hover:text-[#93c5fd] transition-colors underline underline-offset-4 font-sans inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Autofill Admin Credentials</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
