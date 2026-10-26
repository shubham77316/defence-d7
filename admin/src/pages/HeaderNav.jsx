import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import {
  Menu,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Phone,
  Mail,
  Shield,
  Layers,
  ArrowRight,
  Globe,
  Sliders,
} from "lucide-react";
import logoImg from "../assets/logo.png";

export default function HeaderNav() {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activePreviewDropdown, setActivePreviewDropdown] = useState(null);

  // Quick Header Settings State
  const [headerPhone, setHeaderPhone] = useState("");
  const [headerEmail, setHeaderEmail] = useState("");
  const [headerSaving, setHeaderSaving] = useState(false);
  const [headerSuccessMsg, setHeaderSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    label: "",
    href: "",
    description: "",
    badge: "",
    order: 0,
    isVisible: true,
    children: [],
  });

  const [newChild, setNewChild] = useState({ label: "", href: "", description: "" });

  const fetchNavAndSettings = async () => {
    try {
      setLoading(true);
      const [navRes, settingsRes] = await Promise.all([
        api.getNavigation().catch(() => ({ success: false, data: [] })),
        api.getSettings().catch(() => ({ success: false, data: null })),
      ]);

      if (navRes.success) {
        setItems(navRes.data || []);
      }
      if (settingsRes.success && settingsRes.data) {
        setSettings(settingsRes.data);
        setHeaderPhone(settingsRes.data.phone || "+91 (0) 11 4988 2000");
        setHeaderEmail(settingsRes.data.contactEmail || "liaison@skywardens.com");
      }
    } catch (err) {
      console.error("Failed to load navigation & header data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavAndSettings();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      label: "",
      href: "",
      description: "",
      badge: "",
      order: items.length + 1,
      isVisible: true,
      children: [],
    });
    setNewChild({ label: "", href: "", description: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      href: item.href,
      description: item.description || "",
      badge: item.badge || "",
      order: item.order || 0,
      isVisible: item.isVisible !== false,
      children: item.children ? [...item.children] : [],
    });
    setNewChild({ label: "", href: "", description: "" });
    setIsModalOpen(true);
  };

  const handleToggleVisibility = async (item) => {
    try {
      const res = await api.updateNavigationItem(item._id, {
        isVisible: !item.isVisible,
      });
      if (res.success) {
        setItems((prev) =>
          prev.map((i) => (i._id === item._id ? res.data : i))
        );
      }
    } catch (err) {
      alert("Failed to toggle visibility: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this navigation item?")) {
      return;
    }
    try {
      const res = await api.deleteNavigationItem(id);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (err) {
      alert("Failed to delete item: " + err.message);
    }
  };

  const handleMoveOrder = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((item, idx) => ({
      id: item._id,
      order: idx + 1,
    }));

    try {
      setItems(newItems);
      await api.reorderNavigation(reordered);
    } catch (err) {
      console.error("Failed to reorder:", err);
      fetchNavAndSettings();
    }
  };

  const handleAddChild = () => {
    if (!newChild.label || !newChild.href) {
      alert("Child menu item requires both label and destination URL.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { ...newChild }],
    }));
    setNewChild({ label: "", href: "", description: "" });
  };

  const handleRemoveChild = (index) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingItem) {
        const res = await api.updateNavigationItem(editingItem._id, formData);
        if (res.success) {
          setItems((prev) =>
            prev.map((i) => (i._id === editingItem._id ? res.data : i))
          );
        }
      } else {
        const res = await api.createNavigationItem(formData);
        if (res.success) {
          setItems((prev) => [...prev, res.data]);
        }
      }
      setIsModalOpen(false);
      setSuccessMsg("Navigation structure updated successfully.");
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      alert("Failed to save menu item: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveHeaderTelemetry = async (e) => {
    e.preventDefault();
    setHeaderSaving(true);
    setHeaderSuccessMsg("");
    try {
      const res = await api.updateSettings({
        phone: headerPhone,
        contactEmail: headerEmail,
      });
      if (res.success) {
        setSettings(res.data);
        setHeaderSuccessMsg("Header hotline and email updated on live site.");
        setTimeout(() => setHeaderSuccessMsg(""), 3500);
      }
    } catch (err) {
      alert("Failed to update header settings: " + err.message);
    } finally {
      setHeaderSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading navigation architecture..." />;
  }

  const visibleItems = items.filter((i) => i.isVisible !== false);
  const totalSubmenus = items.reduce((acc, i) => acc + (i.children?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* 1. Header Title & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Header &amp; Navigation Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure website header hierarchy, primary links, multi-tier dropdowns, badges, and topbar hotline telemetry.
          </p>
        </div>

        <button onClick={openCreateModal} className="admin-btn-primary text-xs">
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 2. Top Telemetry Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Total Nav Items</div>
            <div className="text-2xl font-bold text-white mt-1">{items.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Configured top-level links</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Menu className="w-5 h-5" />
          </div>
        </div>

        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Live &amp; Visible</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{visibleItems.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Active on public website</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Submenu Dropdowns</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">{totalSubmenus}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Nested capability sub-links</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Header Hotline</div>
            <div className="text-xs font-bold text-white mt-2 truncate max-w-[150px]">
              {headerPhone || "+91 (0) 11 4988 2000"}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Direct institutional line</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Phone className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Live Header Visual Preview */}
      <div className="rounded-2xl border border-white/10 bg-[#060b17]/90 shadow-xl relative z-30 overflow-visible">
        {/* Backdrop to close dropdown on click outside */}
        {activePreviewDropdown && (
          <div
            className="fixed inset-0 z-30 bg-transparent"
            onClick={() => setActivePreviewDropdown(null)}
          />
        )}

        <div className="px-6 py-3.5 border-b border-white/10 bg-[#040814] flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold text-white tracking-wide">
              Live Website Header &amp; Navbar Visualizer
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Interactive real-time preview — tap items to toggle submenus
          </span>
        </div>

        {/* Visualized Topbar + Navbar */}
        <div className={`p-6 bg-[#030610] space-y-4 rounded-b-2xl transition-all duration-300 overflow-visible ${activePreviewDropdown ? "pb-52" : "pb-8"}`}>
          {/* Top Announcement Bar */}
          <div className="px-4 py-2 rounded-lg bg-black/60 border border-white/5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3 h-3 text-sky-400" />
                <span>{headerPhone || "+91 (0) 11 4988 2000"}</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-slate-400">
                <Mail className="w-3 h-3 text-sky-400" />
                <span>{headerEmail || "liaison@skywardens.com"}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-semibold text-[10px] tracking-wide uppercase px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                Strategic Defence Gateway
              </span>
            </div>
          </div>

          {/* Main Navigation Bar Simulation */}
          <div className="px-5 py-3.5 rounded-xl bg-[#060b17]/95 border border-white/10 shadow-2xl flex items-center justify-between gap-4 relative z-40 overflow-visible">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500/20 to-sky-900/10 border border-sky-500/30 flex items-center justify-center p-1.5">
                <img
                  src={logoImg}
                  alt="Sky Wardens"
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white tracking-wider uppercase">
                  SKY WARDENS
                </span>
                <span className="block text-[9px] text-sky-400 tracking-widest font-semibold uppercase">
                  Strategic Systems
                </span>
              </div>
            </div>

            {/* Simulated Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1 overflow-visible">
              {visibleItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isDropdownOpen = activePreviewDropdown === item._id;

                return (
                  <div key={item._id} className="relative overflow-visible">
                    <button
                      type="button"
                      onClick={() =>
                        setActivePreviewDropdown(isDropdownOpen ? null : item._id)
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all relative z-40 ${
                        isDropdownOpen
                          ? "bg-sky-500/25 text-sky-300 border border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                          : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180 text-sky-400" : "text-slate-500"
                          }`}
                        />
                      )}
                      {item.badge && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                          {item.badge}
                        </span>
                      )}
                    </button>

                    {/* Dropdown Menu Simulation - Elevated and Unclipped */}
                    {hasChildren && isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2.5 w-72 sm:w-80 rounded-2xl bg-[#050b18]/98 backdrop-blur-2xl border border-sky-500/40 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(56,189,248,0.25)] z-50 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            <span>{item.label} Submenu</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.children.length} links
                          </span>
                        </div>

                        <div className="space-y-1">
                          {item.children.map((child, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-2.5 rounded-xl hover:bg-sky-500/15 hover:border-sky-500/30 border border-transparent transition-all cursor-pointer group/sub"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-white text-xs group-hover/sub:text-sky-300 transition-colors">
                                  {child.label}
                                </span>
                                <span className="text-[10px] font-medium text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 shrink-0">
                                  {child.href}
                                </span>
                              </div>
                              {child.description && (
                                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                  {child.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right CTA Button */}
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all cursor-default">
                <span>Procurement Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Navigation Items Management Table */}
      <div className="admin-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#040814]">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Active Navbar Structure ({items.length} Elements)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag or use arrow buttons to reorder links. Toggling visibility hides/shows links on the live site instantly.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-sky-400" />
            <span>New Link</span>
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {items.map((item, index) => (
            <div
              key={item._id}
              className="p-4 sm:px-6 hover:bg-white/[0.025] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              {/* Left Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight">{item.label}</span>
                  <span className="text-xs font-medium text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {item.href}
                  </span>

                  {item.badge && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      item.isVisible
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.isVisible ? "bg-emerald-400" : "bg-slate-400"
                      }`}
                    />
                    <span>{item.isVisible ? "Visible" : "Hidden"}</span>
                  </span>
                </div>

                {item.description && (
                  <p className="text-xs text-slate-400 pl-8 leading-relaxed">{item.description}</p>
                )}

                {/* Submenu Dropdown Items */}
                {item.children && item.children.length > 0 && (
                  <div className="pl-8 pt-1.5 flex flex-wrap gap-1.5">
                    {item.children.map((child, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center gap-1.5 text-xs bg-white/5 px-2.5 py-1 rounded-lg text-slate-300 border border-white/10"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="font-medium text-white">{child.label}</span>
                        <span className="text-sky-400 text-[11px]">({child.href})</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 self-start sm:self-center shrink-0">
                <button
                  onClick={() => handleMoveOrder(index, "up")}
                  disabled={index === 0}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                  title="Move Item Up"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMoveOrder(index, "down")}
                  disabled={index === items.length - 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                  title="Move Item Down"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleVisibility(item)}
                  className={`p-2 rounded-lg transition-colors ${
                    item.isVisible
                      ? "text-emerald-400 hover:bg-emerald-500/10"
                      : "text-slate-500 hover:bg-white/10"
                  }`}
                  title={item.isVisible ? "Currently visible — click to hide" : "Currently hidden — click to show"}
                >
                  {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-all"
                  title="Edit Menu Item"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete Menu Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Header Liaison & Hotline Telemetry Card */}
      <div className="admin-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Header Topbar Contact &amp; Liaison Telemetry
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              These institutional contacts are displayed in the high-clearance header strip above the navigation bar.
            </p>
          </div>
          {headerSuccessMsg && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{headerSuccessMsg}</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveHeaderTelemetry} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Header Hotline Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={headerPhone}
                onChange={(e) => setHeaderPhone(e.target.value)}
                placeholder="+91 (0) 11 4988 2000"
                className="admin-input pl-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Liaison Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                value={headerEmail}
                onChange={(e) => setHeaderEmail(e.target.value)}
                placeholder="liaison@skywardens.com"
                className="admin-input pl-9 text-xs"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={headerSaving}
              className="admin-btn-primary text-xs w-full py-2.5"
            >
              <Sliders className="w-4 h-4" />
              <span>{headerSaving ? "Saving..." : "Save Header Contacts"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 6. Add / Edit Navigation Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? `Edit Menu Item: ${editingItem.label}` : "Create New Menu Item"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Menu Label (e.g. Products) *
              </label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Destination URL (e.g. /capabilities) *
              </label>
              <input
                type="text"
                required
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Subtext Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="admin-input text-xs"
                placeholder="Optional mega-menu tooltip"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Badge (e.g. External, New)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="admin-input text-xs"
                placeholder="Optional badge tag"
              />
            </div>
          </div>

          {/* Children Dropdown Submenus */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <label className="text-xs font-semibold text-white flex items-center justify-between">
              <span>Dropdown Submenu Items ({formData.children.length})</span>
            </label>

            {formData.children.length > 0 && (
              <div className="space-y-2">
                {formData.children.map((child, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white">{child.label}</span>
                      <span className="text-sky-400 font-medium ml-2">({child.href})</span>
                      {child.description && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{child.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveChild(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Remove submenu link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Child Inline Form */}
            <div className="p-4 rounded-xl bg-[#040814] border border-white/10 space-y-2.5">
              <span className="text-xs font-semibold text-slate-400">
                Append Dropdown Submenu Link
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Submenu Label (e.g. Aerospace Systems)"
                  value={newChild.label}
                  onChange={(e) => setNewChild({ ...newChild, label: e.target.value })}
                  className="admin-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Submenu URL (e.g. /aerospace)"
                  value={newChild.href}
                  onChange={(e) => setNewChild({ ...newChild, href: e.target.value })}
                  className="admin-input text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Submenu Description (optional)"
                value={newChild.description}
                onChange={(e) => setNewChild({ ...newChild, description: e.target.value })}
                className="admin-input text-xs"
              />
              <button
                type="button"
                onClick={handleAddChild}
                className="admin-btn-secondary text-xs w-full py-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Submenu Child</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 text-sky-500 focus:ring-0"
              />
              <span className="text-xs text-slate-300 font-medium">Visible on live website</span>
            </label>

            <button
              type="submit"
              disabled={actionLoading}
              className="admin-btn-primary text-xs px-6 py-2"
            >
              {actionLoading ? "Saving..." : editingItem ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
