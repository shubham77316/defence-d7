import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Home, Save, Plus, Trash2, CheckCircle2, Radio, Sparkles } from "lucide-react";

export default function HomepageMgmt() {
  const [formData, setFormData] = useState({
    heroTag: "",
    heroTitle: "",
    heroSubtitle: "",
    heroCtaText: "",
    heroCtaLink: "",
    heroSecondaryCtaText: "",
    heroSecondaryCtaLink: "",
    tickerItems: [],
    showcaseTitle: "",
    showcaseSubtitle: "",
    showcaseDesc: "",
    ctaBannerTitle: "",
    ctaBannerDesc: "",
    ctaBannerButtonText: "",
    ctaBannerButtonLink: "",
    ctaBannerSecondaryButtonText: "",
    ctaBannerSecondaryButtonLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [newTicker, setNewTicker] = useState({ tag: "SPOTLIGHT:", text: "" });

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        const res = await api.getHomepage();
        if (res.success && res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepage();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      const res = await api.updateHomepage({ ...formData, heroTag: "" });
      if (res.success) {
        if (res.data) {
          setFormData(res.data);
        }
        setSuccessMsg("Homepage sections updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3500);
      }
    } catch (err) {
      alert("Failed to save homepage: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const addTickerItem = () => {
    if (!newTicker.text.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tickerItems: [...(prev.tickerItems || []), { ...newTicker }],
    }));
    setNewTicker({ tag: "SPOTLIGHT:", text: "" });
  };

  const removeTickerItem = (idx) => {
    setFormData((prev) => ({
      ...prev,
      tickerItems: prev.tickerItems.filter((_, i) => i !== idx),
    }));
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading homepage configuration..." />;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono uppercase">
            HOMEPAGE MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Edit flagship 3D hero typography, spotlight ticker headlines, and strategic vision banners.
          </p>
        </div>

        <button onClick={handleSave} disabled={saving} className="admin-btn-primary text-xs self-start sm:self-auto">
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Homepage"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Flagship Hero Section */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Flagship 3D Hero Section</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Monumental Hero Main Headline
            </label>
            <textarea
              name="heroTitle"
              rows={2}
              value={formData.heroTitle || ""}
              onChange={handleChange}
              className="admin-input text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Hero Mission Subtitle
            </label>
            <textarea
              name="heroSubtitle"
              rows={3}
              value={formData.heroSubtitle || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-sky-400">
                Primary CTA Button
              </span>
              <input
                type="text"
                placeholder="Button Label (leave blank to hide)"
                name="heroCtaText"
                value={formData.heroCtaText || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
              <input
                type="text"
                placeholder="Target URL (e.g. /capabilities)"
                name="heroCtaLink"
                value={formData.heroCtaLink || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase text-slate-400">
                Secondary CTA Button
              </span>
              <input
                type="text"
                placeholder="Button Label (leave blank to hide)"
                name="heroSecondaryCtaText"
                value={formData.heroSecondaryCtaText || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
              <input
                type="text"
                placeholder="Target URL (e.g. /contact)"
                name="heroSecondaryCtaLink"
                value={formData.heroSecondaryCtaLink || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
          </div>
        </div>

        {/* Live Spotlight Breaking News Ticker */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Live Breaking News Ticker Headlines ({formData.tickerItems?.length || 0})</span>
            </div>
          </h3>

          <div className="space-y-2">
            {formData.tickerItems?.map((ticker, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs gap-3"
              >
                <div className="flex items-center gap-3 flex-1 truncate">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono font-bold text-[10px]">
                    {ticker.tag || "SPOTLIGHT:"}
                  </span>
                  <span className="text-slate-200 font-mono font-medium truncate">
                    {ticker.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeTickerItem(idx)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Tag (e.g. SPOTLIGHT:)"
              value={newTicker.tag}
              onChange={(e) => setNewTicker({ ...newTicker, tag: e.target.value })}
              className="admin-input text-xs sm:w-36"
            />
            <input
              type="text"
              placeholder="Breaking news broadcast statement..."
              value={newTicker.text}
              onChange={(e) => setNewTicker({ ...newTicker, text: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <button
              type="button"
              onClick={addTickerItem}
              className="admin-btn-secondary text-xs px-4"
            >
              <Plus className="w-4 h-4" />
              <span>Add Headline</span>
            </button>
          </div>
        </div>

        {/* Featured Hypersonic Platform Showcase */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Home className="w-4 h-4 text-sky-400" />
            <span>Featured Platform Showcase Section</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Section Title
            </label>
            <input
              type="text"
              name="showcaseTitle"
              value={formData.showcaseTitle || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Subtitle
            </label>
            <input
              type="text"
              name="showcaseSubtitle"
              value={formData.showcaseSubtitle || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Platform Description
            </label>
            <textarea
              rows={2}
              name="showcaseDesc"
              value={formData.showcaseDesc || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>
        </div>

        {/* Strategic CTA Banner */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Strategic Vision Bottom CTA Banner</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              CTA Banner Title
            </label>
            <input
              type="text"
              name="ctaBannerTitle"
              value={formData.ctaBannerTitle || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              CTA Banner Description
            </label>
            <textarea
              rows={2}
              name="ctaBannerDesc"
              value={formData.ctaBannerDesc || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Primary Button Label
              </label>
              <input
                type="text"
                placeholder="Leave blank to hide"
                name="ctaBannerButtonText"
                value={formData.ctaBannerButtonText || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Primary Button Link
              </label>
              <input
                type="text"
                placeholder="e.g. /contact"
                name="ctaBannerButtonLink"
                value={formData.ctaBannerButtonLink || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Secondary Button Label
              </label>
              <input
                type="text"
                placeholder="Leave blank to hide"
                name="ctaBannerSecondaryButtonText"
                value={formData.ctaBannerSecondaryButtonText || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Secondary Button Link
              </label>
              <input
                type="text"
                placeholder="e.g. /capabilities"
                name="ctaBannerSecondaryButtonLink"
                value={formData.ctaBannerSecondaryButtonLink || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="admin-btn-primary px-8 py-3 text-sm">
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Homepage Sections"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
