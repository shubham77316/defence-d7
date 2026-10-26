import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Settings as SettingsIcon, Save, CheckCircle2, Globe, Mail, Phone, MapPin, Search } from "lucide-react";

export default function Settings() {
  const [formData, setFormData] = useState({
    siteName: "",
    companyName: "",
    tagline: "",
    subTagline: "",
    foundingVision: "",
    corporateOffice: "",
    contactEmail: "",
    inquiriesEmail: "",
    phone: "",
    workingHours: "",
    clearanceNotice: "",
    copyrightText: "",
    seoDefaults: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [keywordsStr, setKeywordsStr] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.getSettings();
        if (res.success && res.data) {
          setFormData(res.data);
          if (res.data.seoDefaults?.keywords) {
            setKeywordsStr(res.data.seoDefaults.keywords.join(", "));
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("seo_")) {
      const field = name.replace("seo_", "");
      setFormData((prev) => ({
        ...prev,
        seoDefaults: { ...prev.seoDefaults, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    try {
      const payload = {
        ...formData,
        seoDefaults: {
          ...formData.seoDefaults,
          keywords: keywordsStr
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        },
      };

      const res = await api.updateSettings(payload);
      if (res.success) {
        setSuccessMsg("Strategic website configuration saved to MongoDB.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading website settings..." />;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Website &amp; Strategic Identity Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global entity details, contact gateways, corporate headquarters, and SEO metadata.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="admin-btn-primary text-xs self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Configuration"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Entity Overview */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Corporate Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Brand / Short Name
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Full Registered Entity Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Primary Brand Headline / Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Sub-Tagline / Sectors Breadcrumb
            </label>
            <input
              type="text"
              name="subTagline"
              value={formData.subTagline || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Founding Institutional Vision
            </label>
            <textarea
              name="foundingVision"
              rows={3}
              value={formData.foundingVision || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>
        </div>

        {/* Contact Liaison & Communications */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Procurement &amp; Contact Gateways</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Primary Liaison Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Public Inquiries Email (Footer / Navbar)
              </label>
              <input
                type="email"
                name="inquiriesEmail"
                value={formData.inquiriesEmail || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Official Liaison Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Operational Working Hours
              </label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Corporate Engineering Centre Address
            </label>
            <input
              type="text"
              name="corporateOffice"
              value={formData.corporateOffice || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Security Clearance Notice
            </label>
            <textarea
              name="clearanceNotice"
              rows={2}
              value={formData.clearanceNotice || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Copyright Text
            </label>
            <input
              type="text"
              name="copyrightText"
              value={formData.copyrightText || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-400" />
            <span>Search Engine Optimization (SEO) Defaults</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Default Meta Title
            </label>
            <input
              type="text"
              name="seo_metaTitle"
              value={formData.seoDefaults?.metaTitle || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Default Meta Description
            </label>
            <textarea
              name="seo_metaDescription"
              rows={3}
              value={formData.seoDefaults?.metaDescription || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              SEO Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={keywordsStr}
              onChange={(e) => setKeywordsStr(e.target.value)}
              placeholder="Defence, Aerospace, UAV, Ballistics, Military"
              className="admin-input text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="admin-btn-primary px-8 py-3 text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Website Configuration"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
