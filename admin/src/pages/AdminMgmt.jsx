import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import {
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Edit,
  Power,
  KeyRound,
  History,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  RotateCw,
  Sparkles,
} from "lucide-react";

const MODULES_CONFIG = [
  { id: "dashboard", label: "Dashboard", desc: "System analytics & metrics" },
  { id: "enquiries", label: "Enquiries", desc: "Incoming lead & procurement requests" },
  { id: "settings", label: "Website Settings", desc: "Global branding, SEO & metadata" },
  { id: "navigation", label: "Header & Nav", desc: "Main menu navigation structure" },
  { id: "homepage", label: "Homepage CMS", desc: "Hero, missions, & dynamic sections" },
  { id: "about", label: "About Page", desc: "Corporate history & capabilities" },
  { id: "products", label: "Products & Systems", desc: "Defense systems, specs & catalog" },
  { id: "news", label: "Product", desc: "Product catalog, press releases & briefings" },
  { id: "partners", label: "Strategic Partners", desc: "Defense alliances & logos" },
  { id: "faqs", label: "Strategic FAQs", desc: "Intelligence & protocol FAQs" },
  { id: "footer", label: "Footer Management", desc: "Bottom links, certifications & disclaimers" },
  { id: "media", label: "Media Library", desc: "Cryptographic assets & file uploads" },
  { id: "profile", label: "Admin Profile", desc: "Self profile & security credentials" },
];

export default function AdminMgmt() {
  const { user: currentOfficer } = useAuth();
  const [activeTab, setActiveTab] = useState("admins"); // 'admins' | 'audit'

  // Admin list state
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null); // null = create mode
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatusAdmin, setTargetStatusAdmin] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    role: "ADMIN",
    permissions: [],
  });
  const [showPassword, setShowPassword] = useState(false);

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditActionFilter, setAuditActionFilter] = useState("ALL");

  useEffect(() => {
    fetchAdmins();
  }, [searchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    if (activeTab === "audit") {
      fetchAuditLogs();
    }
  }, [activeTab, auditActionFilter]);

  const showFeedback = (msg, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 6000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (roleFilter !== "ALL") params.role = roleFilter;
      if (statusFilter !== "ALL") params.status = statusFilter;

      const res = await api.getAdmins(params);
      if (res.success) {
        setAdmins(res.users || []);
      }
    } catch (err) {
      showFeedback(err.message || "Failed to load admin accounts", true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      setAuditLoading(true);
      const params = { limit: 100 };
      if (auditActionFilter !== "ALL") params.action = auditActionFilter;

      const res = await api.getAuditLogs(params);
      if (res.success) {
        setAuditLogs(res.logs || []);
      }
    } catch (err) {
      showFeedback(err.message || "Failed to retrieve security audit logs", true);
    } finally {
      setAuditLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingAdmin(null);
    setFormData({
      username: "",
      email: "",
      fullName: "",
      password: "",
      role: "ADMIN",
      permissions: ["dashboard", "products", "news"],
    });
    setShowPassword(false);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      username: admin.username,
      email: admin.email,
      fullName: admin.fullName,
      password: "", // blank unless changing
      role: admin.role,
      permissions: admin.permissions || [],
    });
    setShowPassword(false);
    setIsFormModalOpen(true);
  };

  const handleGeneratePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
    let gen = "";
    for (let i = 0; i < 14; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: gen }));
    setShowPassword(true);
  };

  const handleTogglePermission = (modId) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(modId);
      const newPerms = exists
        ? prev.permissions.filter((p) => p !== modId)
        : [...prev.permissions, modId];
      return { ...prev, permissions: newPerms };
    });
  };

  const handleSelectAllPermissions = () => {
    setFormData((prev) => ({
      ...prev,
      permissions: MODULES_CONFIG.map((m) => m.id),
    }));
  };

  const handleClearPermissions = () => {
    setFormData((prev) => ({
      ...prev,
      permissions: [],
    }));
  };

  const handleSaveAdmin = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);

      if (editingAdmin) {
        // Edit
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          permissions: formData.role === "SUPER_ADMIN" ? MODULES_CONFIG.map((m) => m.id) : formData.permissions,
        };
        if (formData.password.trim()) {
          payload.password = formData.password.trim();
        }

        const res = await api.updateAdmin(editingAdmin._id, payload);
        if (res.success) {
          showFeedback(res.message || "Administrator profile updated successfully.");
          setIsFormModalOpen(false);
          fetchAdmins();
        }
      } else {
        // Create
        if (!formData.username || !formData.email || !formData.password) {
          showFeedback("Username, email, and password are required.", true);
          return;
        }

        const res = await api.createAdmin(formData);
        if (res.success) {
          showFeedback(res.message || "New administrator account provisioned.");
          setIsFormModalOpen(false);
          fetchAdmins();
        }
      }
    } catch (err) {
      showFeedback(err.message || "Operation failed", true);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenStatusModal = (admin) => {
    setTargetStatusAdmin(admin);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusToggle = async () => {
    if (!targetStatusAdmin) return;
    try {
      setActionLoading(true);
      const res = await api.toggleAdminStatus(targetStatusAdmin._id);
      if (res.success) {
        showFeedback(res.message || "Account status toggled successfully.");
        setIsStatusModalOpen(false);
        setTargetStatusAdmin(null);
        fetchAdmins();
      }
    } catch (err) {
      showFeedback(err.message || "Failed to alter account status", true);
    } finally {
      setActionLoading(false);
    }
  };

  // Metrics
  const totalAdmins = admins.length;
  const activeSuperAdmins = admins.filter(
    (a) => a.role === "SUPER_ADMIN" && a.status === "active"
  ).length;
  const restrictedAdmins = admins.filter((a) => a.role === "ADMIN").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white font-sans">
              Admin & Permission Security
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Centralized role-based access control (RBAC), multi-tiered permissions, and immutable security audit records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-[#080f22] p-1 border border-white/10">
            <button
              onClick={() => setActiveTab("admins")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "admins"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Administrators
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === "audit"
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Audit Logs
            </button>
          </div>

          {activeTab === "admins" && (
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all font-sans"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
              Total Admin Roster
            </div>
            <div className="text-2xl font-bold text-white mt-1 font-mono">{totalAdmins}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
              Active Super Admins
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono flex items-center gap-2">
              {activeSuperAdmins}
              {activeSuperAdmins === 1 && (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-sans">
                  Singular Master
                </span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
              Restricted Admins
            </div>
            <div className="text-2xl font-bold text-cyan-400 mt-1 font-mono">{restrictedAdmins}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {activeTab === "admins" ? (
        <>
          {/* SEARCH & FILTERS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#050b18]/60 border border-white/10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#040814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-slate-300">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-[#050b18]">All Roles</option>
                  <option value="SUPER_ADMIN" className="bg-[#050b18]">Super Admin</option>
                  <option value="ADMIN" className="bg-[#050b18]">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-slate-300">
                <span className="text-slate-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-[#050b18]">All Status</option>
                  <option value="active" className="bg-[#050b18]">Active</option>
                  <option value="inactive" className="bg-[#050b18]">Inactive</option>
                </select>
              </div>

              <button
                onClick={fetchAdmins}
                title="Refresh Roster"
                className="p-2 rounded-xl bg-[#040814] border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ADMINS TABLE */}
          {loading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Retrieving administrative roster & clearances..." />
            </div>
          ) : admins.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#050b18]/40 border border-white/10">
              <Users className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <div className="text-base font-semibold text-white">No Administrator Accounts Found</div>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No accounts match the current filter criteria or search query.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-[#050b18]/80 border border-white/10 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#040814]/80 text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                      <th className="py-3.5 px-4">Officer Identity</th>
                      <th className="py-3.5 px-4">Clearance Role</th>
                      <th className="py-3.5 px-4">Module Permissions</th>
                      <th className="py-3.5 px-4">Account Status</th>
                      <th className="py-3.5 px-4">Last Authentication</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                    {admins.map((admin) => {
                      const isSuper = admin.role === "SUPER_ADMIN";
                      const isActive = admin.status === "active";
                      const isSelf = admin._id === currentOfficer?.id;

                      return (
                        <tr
                          key={admin._id}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Officer Identity */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase border ${
                                  isSuper
                                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                                    : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                }`}
                              >
                                {admin.fullName ? admin.fullName.charAt(0) : "A"}
                              </div>
                              <div>
                                <div className="font-semibold text-white flex items-center gap-2">
                                  <span>{admin.fullName || admin.username}</span>
                                  {isSelf && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                                  <span>@{admin.username}</span>
                                  <span>•</span>
                                  <span>{admin.email}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="py-3 px-4">
                            {isSuper ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                SUPER_ADMIN
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                <Users className="w-3 h-3 text-cyan-400" />
                                ADMIN
                              </span>
                            )}
                          </td>

                          {/* Permissions */}
                          <td className="py-3 px-4">
                            {isSuper ? (
                              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Unrestricted Full Clearance ({MODULES_CONFIG.length}/{MODULES_CONFIG.length})</span>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[11px] text-cyan-300">
                                    {(admin.permissions || []).length} / {MODULES_CONFIG.length} Modules
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {(admin.permissions || []).slice(0, 4).map((p) => (
                                    <span
                                      key={p}
                                      className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 border border-white/10 text-slate-300 capitalize"
                                    >
                                      {p}
                                    </span>
                                  ))}
                                  {(admin.permissions || []).length > 4 && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-slate-400">
                                      +{(admin.permissions || []).length - 4} more
                                    </span>
                                  )}
                                  {(admin.permissions || []).length === 0 && (
                                    <span className="text-[10px] text-amber-400/80 italic">
                                      No modules assigned
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            {isActive ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-red-500/10 text-red-300 border border-red-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* Last Authentication */}
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                            {admin.lastLogin
                              ? new Date(admin.lastLogin).toLocaleString()
                              : "No record"}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(admin)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
                                title="Edit Role & Permissions"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleOpenStatusModal(admin)}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isActive
                                    ? "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300"
                                    : "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                                }`}
                                title={isActive ? "Deactivate Account" : "Activate Account"}
                              >
                                <Power className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        /* AUDIT LOGS VIEW */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050b18]/60 border border-white/10">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Immutable Security Audit Records
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-slate-300">
                <span className="text-slate-400">Filter Event:</span>
                <select
                  value={auditActionFilter}
                  onChange={(e) => setAuditActionFilter(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL" className="bg-[#050b18]">All Events</option>
                  <option value="LOGIN_SUCCESS" className="bg-[#050b18]">LOGIN_SUCCESS</option>
                  <option value="LOGIN_FAILED" className="bg-[#050b18]">LOGIN_FAILED</option>
                  <option value="ADMIN_CREATED" className="bg-[#050b18]">ADMIN_CREATED</option>
                  <option value="ADMIN_UPDATED" className="bg-[#050b18]">ADMIN_UPDATED</option>
                  <option value="ADMIN_ACTIVATED" className="bg-[#050b18]">ADMIN_ACTIVATED</option>
                  <option value="ADMIN_DEACTIVATED" className="bg-[#050b18]">ADMIN_DEACTIVATED</option>
                </select>
              </div>

              <button
                onClick={fetchAuditLogs}
                title="Refresh Logs"
                className="p-2 rounded-xl bg-[#040814] border border-white/10 text-slate-400 hover:text-white"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {auditLoading ? (
            <div className="py-20 flex justify-center">
              <LoadingSpinner size="lg" text="Loading cryptographic audit ledger..." />
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#050b18]/40 border border-white/10">
              <History className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <div className="text-base font-semibold text-white">No Audit Records Matching Filter</div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-[#050b18]/80 border border-white/10 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#040814]/80 text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Action Event</th>
                      <th className="py-3 px-4">Performed By</th>
                      <th className="py-3 px-4">Target Account</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4">Event Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-mono">
                    {auditLogs.map((log) => (
                      <tr key={log._id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-4 text-slate-400 text-[11px]">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              log.action.includes("FAILED") || log.action.includes("DEACTIVATED")
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : log.action.includes("SUCCESS") || log.action.includes("PROVISIONED")
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-200">
                          {log.performedByEmail || "SYSTEM"}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400">
                          {log.targetUserEmail || "N/A"}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400 text-[11px]">
                          {log.ipAddress}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400 text-[10px] max-w-xs truncate">
                          {JSON.stringify(log.details || {})}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT ADMIN MODAL */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingAdmin ? `Edit Officer: ${editingAdmin.username}` : "Provision Strategic Administrator"}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSaveAdmin} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-sans">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Commander Vikram Singh"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-sans">
                Username
              </label>
              <input
                type="text"
                required
                disabled={!!editingAdmin}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g. officer_vikram"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-sans">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="officer@skywardens.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-sans">
                  {editingAdmin ? "New Password (Leave blank to keep)" : "Cryptographic Password"}
                </label>
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono uppercase"
                >
                  <KeyRound className="w-3 h-3" />
                  Generate
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required={!editingAdmin}
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingAdmin ? "••••••••••••" : "Min 8 characters"}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="p-4 rounded-xl bg-[#040814] border border-white/10 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-sans">
              Clearance Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.role === "ADMIN"
                    ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "bg-[#060c1c] border-white/5 hover:border-white/15"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={formData.role === "ADMIN"}
                  onChange={() => setFormData({ ...formData, role: "ADMIN" })}
                  className="mt-1 accent-cyan-400"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase font-sans flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    Standard Administrator
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Subject to explicit, granular module permissions. Cannot create or edit other administrators.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.role === "SUPER_ADMIN"
                    ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-[#060c1c] border-white/5 hover:border-white/15"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="SUPER_ADMIN"
                  checked={formData.role === "SUPER_ADMIN"}
                  onChange={() => setFormData({ ...formData, role: "SUPER_ADMIN" })}
                  className="mt-1 accent-emerald-400"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase font-sans flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Super Administrator
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Unrestricted authority. Full administrative access to all modules, role management, and audit logs.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Granular Module Permissions */}
          {formData.role === "ADMIN" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-sans">
                    Granular Module Permissions
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Select which CMS modules this administrator is authorized to access and modify.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllPermissions}
                    className="text-[10px] uppercase font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    Select All
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    type="button"
                    onClick={handleClearPermissions}
                    className="text-[10px] uppercase font-bold text-slate-400 hover:text-white"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
                {MODULES_CONFIG.map((mod) => {
                  const checked = formData.permissions.includes(mod.id);
                  return (
                    <label
                      key={mod.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        checked
                          ? "bg-cyan-500/10 border-cyan-500/30 text-white"
                          : "bg-[#040814] border-white/5 text-slate-400 hover:border-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleTogglePermission(mod.id)}
                        className="mt-0.5 accent-cyan-400"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold tracking-wide capitalize">
                          {mod.label}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {mod.desc}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                <strong>Super Admin Policy:</strong> All 13 modules are automatically authorized under Super Admin clearance.
              </span>
            </div>
          )}

          {/* Form Actions - Sticky Footer with generous padding */}
          <div className="sticky bottom-0 -mx-6 -mb-6 mt-6 px-6 py-4 bg-[#060c1c] border-t border-white/10 flex items-center justify-end gap-3 shadow-[0_-12px_24px_rgba(0,0,0,0.6)] z-20">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-semibold uppercase tracking-wider transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all disabled:opacity-50"
            >
              {actionLoading && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
              <span>{editingAdmin ? "Save Changes" : "Create Account"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM STATUS TOGGLE MODAL */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Confirm Status Alteration"
        maxWidth="max-w-md"
      >
        {targetStatusAdmin && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
              <div>
                <div className="font-bold uppercase tracking-wider">Security Warning</div>
                <div className="mt-1">
                  You are about to{" "}
                  <strong>
                    {targetStatusAdmin.status === "active" ? "DEACTIVATE" : "ACTIVATE"}
                  </strong>{" "}
                  the administrative account for <strong>{targetStatusAdmin.fullName}</strong> (@{targetStatusAdmin.username}).
                </div>
              </div>
            </div>

            {targetStatusAdmin.role === "SUPER_ADMIN" &&
              targetStatusAdmin.status === "active" &&
              activeSuperAdmins <= 1 && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Cannot deactivate this account because it is the <strong>LAST ACTIVE SUPER ADMIN</strong>.
                  </span>
                </div>
              )}

            <p className="text-xs text-slate-400">
              {targetStatusAdmin.status === "active"
                ? "Deactivating this account will immediately revoke all API tokens and prohibit subsequent logins until restored by a Super Administrator."
                : "Activating this account will restore login permissions and API access according to their configured module roles."}
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 pb-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-semibold uppercase tracking-wider transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  actionLoading ||
                  (targetStatusAdmin.role === "SUPER_ADMIN" &&
                    targetStatusAdmin.status === "active" &&
                    activeSuperAdmins <= 1)
                }
                onClick={handleConfirmStatusToggle}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 ${
                  targetStatusAdmin.status === "active"
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    : "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                }`}
              >
                {actionLoading && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  Confirm {targetStatusAdmin.status === "active" ? "Deactivation" : "Activation"}
                </span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
