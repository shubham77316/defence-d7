import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi, api } from "../services/api";
import {
  ShieldCheck,
  User,
  Lock,
  Key,
  CheckCircle,
  AlertCircle,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Globe,
  Clock,
  Calendar,
  Users,
  Shield,
  History,
  Activity,
  ArrowRight,
} from "lucide-react";
import { formatDateTime, getDeviceCategory } from "../utils/deviceHelper";

export default function AdminProfile() {
  const { user, login } = useAuth();
  const [profileUser, setProfileUser] = useState(user);

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'device'

  const [detailsForm, setDetailsForm] = useState({
    name: user?.fullName || user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [savingDetails, setSavingDetails] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [detailsMsg, setDetailsMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    // Refresh current user data to fetch latest device and login telemetry
    const fetchFreshUser = async () => {
      try {
        const res = await api.getMe();
        if (res.success && res.user) {
          setProfileUser(res.user);
          setDetailsForm({
            name: res.user.fullName || res.user.name || "",
            email: res.user.email || "",
          });
        }
      } catch (e) {
        // use fallback user from context
      }
    };
    fetchFreshUser();
  }, []);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setSavingDetails(true);
    setDetailsMsg({ type: "", text: "" });

    try {
      const res = await authApi.updateDetails({ fullName: detailsForm.name, email: detailsForm.email });
      setDetailsMsg({ type: "success", text: "Administrative profile updated successfully." });
    } catch (err) {
      console.error(err);
      setDetailsMsg({
        type: "error",
        text: err.response?.data?.message || err.message || "Failed to update administrative profile.",
      });
    } finally {
      setSavingDetails(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "Password must be at least 8 characters long." });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await authApi.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res.data?.token || res.token) {
        localStorage.setItem("skywardens_admin_token", res.data?.token || res.token);
      }

      setPasswordMsg({ type: "success", text: "Security credentials renewed successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setPasswordMsg({
        type: "error",
        text: err.response?.data?.message || err.message || "Failed to update security credentials.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const activeUser = profileUser || user || {};
  const isSuperAdmin = activeUser.role === "SUPER_ADMIN";
  const lastDetails = activeUser.lastLoginDetails || {};
  const loginHistory = Array.isArray(activeUser.loginHistory) ? activeUser.loginHistory : [];
  const lastLoginTime = formatDateTime(activeUser.lastLogin || lastDetails.loginAt);
  const deviceCat = getDeviceCategory(lastDetails.device);

  return (
    <div className="max-w-5xl space-y-7 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wide uppercase font-mono">
              Administrative Clearance & Session Security
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">
            Admin Profile & Device Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage officer credentials, inspect active device information, and audit authentication timestamps.
          </p>
        </div>

        {/* Super admin shortcut to team management */}
        {isSuperAdmin && (
          <Link
            to="/admins"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-bold uppercase font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0"
          >
            <Users className="w-4 h-4" />
            <span>Manage All Admins</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase font-mono tracking-wider transition-all ${
            activeTab === "profile"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab("device")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase font-mono tracking-wider transition-all ${
            activeTab === "device"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Login Device & Session History</span>
          {activeUser.lastLogin && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          )}
        </button>
      </div>

      {activeTab === "profile" ? (
        <div className="space-y-6">
          {/* Quick Info Bar */}
          <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base uppercase border ${
                  isSuperAdmin
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                }`}
              >
                {activeUser.fullName ? activeUser.fullName.charAt(0) : "A"}
              </div>
              <div>
                <div className="text-white font-semibold text-sm flex items-center gap-2">
                  <span>{activeUser.fullName || activeUser.username}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                      isSuperAdmin
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    {activeUser.role === "SUPER_ADMIN" ? "ADMIN" : activeUser.role}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  @{activeUser.username} • {activeUser.email}
                </div>
              </div>
            </div>

            {/* Last login quick teaser */}
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans">
                Last Authenticated
              </div>
              <div className="text-xs text-slate-200 font-mono mt-0.5 flex items-center gap-1.5 justify-end">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lastLoginTime.full}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {lastLoginTime.relative}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Details Form */}
            <div className="bg-[#050b18]/90 border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                  <User size={18} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white font-mono uppercase">
                    Officer Identity
                  </h2>
                  <p className="text-[11px] text-slate-400">Public name signature and communication address.</p>
                </div>
              </div>

              {detailsMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono uppercase flex items-center gap-2 ${
                    detailsMsg.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                >
                  {detailsMsg.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  <span>{detailsMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateDetails} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Full Designation / Name
                  </label>
                  <input
                    type="text"
                    required
                    value={detailsForm.name}
                    onChange={(e) => setDetailsForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-[#040814] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Command Email
                  </label>
                  <input
                    type="email"
                    required
                    value={detailsForm.email}
                    onChange={(e) => setDetailsForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-[#040814] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingDetails}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-50"
                  >
                    {savingDetails ? "Saving Profile..." : "Update Officer Profile"}
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="bg-[#050b18]/90 border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Key size={18} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white font-mono uppercase">
                    Passphrase Rotation
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Salted cryptographic bcrypt key renewal.
                  </p>
                </div>
              </div>

              {passwordMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono uppercase flex items-center gap-2 ${
                    passwordMsg.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                >
                  {passwordMsg.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  <span>{passwordMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Current Passphrase
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#040814] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    New Passphrase (min 8 characters)
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#040814] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Confirm New Passphrase
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#040814] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase rounded-xl transition-all disabled:opacity-50"
                  >
                    {savingPassword ? "Encrypting..." : "Rotate Security Passphrase"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* DEVICE & SESSION TELEMETRY TAB */
        <div className="space-y-6">
          {/* Active Device Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#061126] via-[#050b18] to-[#040814] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  {deviceCat === "Mobile" ? (
                    <Smartphone className="w-6 h-6" />
                  ) : deviceCat === "Tablet" ? (
                    <Tablet className="w-6 h-6" />
                  ) : (
                    <Monitor className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono uppercase text-cyan-400">
                      Active Authorized Device
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current Session
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-wide mt-0.5">
                    {lastDetails.deviceModel || lastDetails.device || "Desktop Terminal"}
                  </h2>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-sans block">
                  Last Authentication Timestamp
                </span>
                <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center sm:justify-end gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {lastLoginTime.full}
                </span>
              </div>
            </div>

            {/* Grid of Telemetry Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block font-sans">
                  Device Type
                </span>
                <span className="text-xs font-bold text-white font-mono mt-1 block">
                  {lastDetails.device || "Desktop"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block font-sans">
                  Operating System
                </span>
                <span className="text-xs font-bold text-white font-mono mt-1 block">
                  {lastDetails.os || "Unknown OS"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block font-sans">
                  Web Browser
                </span>
                <span className="text-xs font-bold text-cyan-300 font-mono mt-1 block truncate">
                  {lastDetails.browser || "Unknown Browser"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block font-sans">
                  IP Address
                </span>
                <span className="text-xs font-bold text-emerald-400 font-mono mt-1 block">
                  {lastDetails.ip || "127.0.0.1"}
                </span>
              </div>
            </div>

            {lastDetails.userAgent && (
              <div className="mt-4 p-3 rounded-xl bg-[#030611] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 font-mono block mb-1">
                  Client User-Agent Signature
                </span>
                <p className="text-[11px] text-slate-400 font-mono break-all leading-relaxed">
                  {lastDetails.userAgent}
                </p>
              </div>
            )}
          </div>

          {/* Historical Login Sessions */}
          <div className="p-6 rounded-2xl bg-[#050b18]/90 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                  Historical Login Sessions ({loginHistory.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Recent access telemetry
              </span>
            </div>

            {loginHistory.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs font-mono">
                No past session history recorded yet. Future logins will appear here with complete device and timestamp telemetry.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      <th className="py-2.5 px-3">Date & Time</th>
                      <th className="py-2.5 px-3">Device & Hardware</th>
                      <th className="py-2.5 px-3">Operating System</th>
                      <th className="py-2.5 px-3">Browser</th>
                      <th className="py-2.5 px-3">IP Address</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-mono text-slate-300">
                    {loginHistory.map((item, idx) => {
                      const dt = formatDateTime(item.loginAt);
                      const cat = getDeviceCategory(item.device);
                      return (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="text-white font-medium">{dt.date}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                              <span>{dt.time}</span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-white/5 text-cyan-300">
                                {dt.relative}
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5 text-white">
                              {cat === "Mobile" ? (
                                <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              ) : cat === "Tablet" ? (
                                <Tablet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              ) : (
                                <Monitor className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              )}
                              <span>{item.deviceModel || item.device || "Desktop"}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-300">{item.os || "Unknown"}</td>
                          <td className="py-2.5 px-3 text-cyan-300">{item.browser || "Unknown"}</td>
                          <td className="py-2.5 px-3 text-slate-400">{item.ip || "127.0.0.1"}</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              <span className="w-1 h-1 rounded-full bg-emerald-400" />
                              Verified
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
