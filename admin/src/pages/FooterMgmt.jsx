import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Layers, Save, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function FooterMgmt() {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    inquiriesEmail: "",
    copyrightText: "",
    navLinks: [],
    focusLinks: [],
    socialLinks: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [newNav, setNewNav] = useState({ label: "", href: "" });
  const [newFocus, setNewFocus] = useState({ label: "", href: "" });
  const [newSocial, setNewSocial] = useState({ platform: "", href: "" });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setLoading(true);
        const res = await api.getFooter();
        if (res.success && res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        console.error("Failed to load footer data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      const payload = { ...formData };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      const res = await api.updateFooter(payload);
      if (res.success) {
        if (res.data) {
          setFormData(res.data);
        }
        setSuccessMsg("Footer configuration saved to MongoDB.");
        setTimeout(() => setSuccessMsg(""), 3500);
      }
    } catch (err) {
      alert("Failed to save footer: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const addNavLink = () => {
    if (!newNav.label || !newNav.href) return;
    setFormData((prev) => ({
      ...prev,
      navLinks: [...(prev.navLinks || []), { ...newNav, order: (prev.navLinks?.length || 0) + 1 }],
    }));
    setNewNav({ label: "", href: "" });
  };

  const removeNavLink = (idx) => {
    setFormData((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== idx),
    }));
  };

  const addFocusLink = () => {
    if (!newFocus.label || !newFocus.href) return;
    setFormData((prev) => ({
      ...prev,
      focusLinks: [...(prev.focusLinks || []), { ...newFocus, order: (prev.focusLinks?.length || 0) + 1 }],
    }));
    setNewFocus({ label: "", href: "" });
  };

  const removeFocusLink = (idx) => {
    setFormData((prev) => ({
      ...prev,
      focusLinks: prev.focusLinks.filter((_, i) => i !== idx),
    }));
  };

  const addSocialLink = () => {
    if (!newSocial.platform || !newSocial.href) return;
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { ...newSocial }],
    }));
    setNewSocial({ platform: "", href: "" });
  };

  const removeSocialLink = (idx) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== idx),
    }));
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading footer configuration..." />;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono uppercase">
            FOOTER MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Edit footer mission text, navigation columns, focus areas, social links, and inquiries gateway.
          </p>
        </div>

        <button onClick={handleSave} disabled={saving} className="admin-btn-primary text-xs self-start sm:self-auto">
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Footer"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Footer Identity */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Footer Statement &amp; Inquiries</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Footer Main Headline
            </label>
            <input
              type="text"
              value={formData.heading || ""}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Footer Mission Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="admin-input text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Inquiries Email
              </label>
              <input
                type="email"
                value={formData.inquiriesEmail || ""}
                onChange={(e) => setFormData({ ...formData, inquiriesEmail: e.target.value })}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Copyright Notice Text
              </label>
              <input
                type="text"
                value={formData.copyrightText || ""}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                className="admin-input text-xs"
              />
            </div>
          </div>
        </div>



        {/* Navigation Links Column */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
            <span>Navigation Links ({formData.navLinks?.length || 0})</span>
            <span className="text-[11px] text-slate-400 font-normal">Shown under NAVIGATION header</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.navLinks?.map((nav, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
              >
                <div className="truncate pr-2">
                  <span className="font-semibold text-white">{nav.label}</span>
                  <div className="text-[11px] font-mono text-sky-400 truncate">{nav.href}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeNavLink(idx)}
                  className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                  title="Remove link"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Link Label (e.g. About, Products)"
              value={newNav.label}
              onChange={(e) => setNewNav({ ...newNav, label: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <input
              type="text"
              placeholder="Target URL / Path (e.g. /about)"
              value={newNav.href}
              onChange={(e) => setNewNav({ ...newNav, href: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <button
              type="button"
              onClick={addNavLink}
              className="admin-btn-secondary text-xs px-4 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Link</span>
            </button>
          </div>
        </div>

        {/* Focus Links Column */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
            <span>Focus Links ({formData.focusLinks?.length || 0})</span>
            <span className="text-[11px] text-slate-400 font-normal">Shown under FOCUS header</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.focusLinks?.map((focus, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
              >
                <div className="truncate pr-2">
                  <span className="font-semibold text-white">{focus.label}</span>
                  <div className="text-[11px] font-mono text-sky-400 truncate">{focus.href}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFocusLink(idx)}
                  className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                  title="Remove link"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Focus Area Label (e.g. Aerospace, Defence)"
              value={newFocus.label}
              onChange={(e) => setNewFocus({ ...newFocus, label: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <input
              type="text"
              placeholder="Target URL / Path (e.g. /aerospace)"
              value={newFocus.href}
              onChange={(e) => setNewFocus({ ...newFocus, href: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <button
              type="button"
              onClick={addFocusLink}
              className="admin-btn-secondary text-xs px-4 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Focus Area</span>
            </button>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
            <span>Social Media Channels ({formData.socialLinks?.length || 0})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {formData.socialLinks?.map((social, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
              >
                <div className="truncate pr-2">
                  <span className="font-semibold text-white">{social.platform}</span>
                  <div className="text-[11px] font-mono text-sky-400 truncate">{social.href}</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSocialLink(idx)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            <input
              type="text"
              placeholder="Platform (e.g. LinkedIn, YouTube)"
              value={newSocial.platform}
              onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <input
              type="text"
              placeholder="Profile URL"
              value={newSocial.href}
              onChange={(e) => setNewSocial({ ...newSocial, href: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <button
              type="button"
              onClick={addSocialLink}
              className="admin-btn-secondary text-xs px-4"
            >
              <Plus className="w-4 h-4" />
              <span>Add Social</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="admin-btn-primary px-8 py-3 text-sm">
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Footer Configuration"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
