import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Info, Save, Plus, Trash2, CheckCircle2, Shield } from "lucide-react";

export default function AboutMgmt() {
  const [formData, setFormData] = useState({
    badge: "",
    headline: "",
    subHeadline: "",
    foundingVision: "",
    overviewText: "",
    groupText: "",
    affiliationsText: "",
    pillars: [],
    metrics: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [newPillar, setNewPillar] = useState({ title: "", desc: "", icon: "Shield" });
  const [newMetric, setNewMetric] = useState({ number: "", label: "", desc: "" });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await api.getAbout();
        if (res.success && res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        console.error("Failed to load about data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      const res = await api.updateAbout(payload);
      if (res.success) {
        if (res.data) {
          setFormData(res.data);
        }
        setSuccessMsg("About page content updated in MongoDB.");
        setTimeout(() => setSuccessMsg(""), 3500);
      }
    } catch (err) {
      alert("Failed to save about data: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const addPillar = () => {
    if (!newPillar.title.trim()) return;
    setFormData((prev) => ({
      ...prev,
      pillars: [...(prev.pillars || []), { ...newPillar }],
    }));
    setNewPillar({ title: "", desc: "", icon: "Shield" });
  };

  const removePillar = (idx) => {
    setFormData((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((_, i) => i !== idx),
    }));
  };

  const addMetric = () => {
    if (!newMetric.number.trim()) return;
    setFormData((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), { ...newMetric }],
    }));
    setNewMetric({ number: "", label: "", desc: "" });
  };

  const removeMetric = (idx) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== idx),
    }));
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading about page data..." />;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono uppercase">
            ABOUT PAGE MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage founding institutional purpose, strategic pillars, metrics, and Tri-Service accreditations.
          </p>
        </div>

        <button onClick={handleSave} disabled={saving} className="admin-btn-primary text-xs self-start sm:self-auto">
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save About Content"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main Headlines */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-400" />
            <span>Headline &amp; Founding Vision</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Top Badge
              </label>
              <input
                type="text"
                name="badge"
                value={formData.badge || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Main Headline
              </label>
              <input
                type="text"
                name="headline"
                value={formData.headline || ""}
                onChange={handleChange}
                className="admin-input text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Sub-Headline
            </label>
            <input
              type="text"
              name="subHeadline"
              value={formData.subHeadline || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Founding Vision Statement
            </label>
            <textarea
              rows={3}
              name="foundingVision"
              value={formData.foundingVision || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Detailed Overview Text
            </label>
            <textarea
              rows={4}
              name="overviewText"
              value={formData.overviewText || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Group of Companies Text
            </label>
            <textarea
              rows={3}
              name="groupText"
              value={formData.groupText || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Strategic Partnerships &amp; Accreditations (DRDO, CSIR, Army, Police)
            </label>
            <textarea
              rows={4}
              name="affiliationsText"
              value={formData.affiliationsText || ""}
              onChange={handleChange}
              className="admin-input text-xs"
            />
          </div>
        </div>

        {/* Strategic Pillars */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Core Operational Pillars ({formData.pillars?.length || 0})</span>
            </div>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.pillars?.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/10 relative space-y-1"
              >
                <button
                  type="button"
                  onClick={() => removePillar(idx)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="text-xs font-bold text-sky-400 font-mono uppercase">
                  {pillar.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#040814] border border-white/10 space-y-3">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              Add Strategic Pillar
            </span>
            <input
              type="text"
              placeholder="Pillar Title (e.g. Strategic Self-Reliance)"
              value={newPillar.title}
              onChange={(e) => setNewPillar({ ...newPillar, title: e.target.value })}
              className="admin-input text-xs"
            />
            <textarea
              rows={2}
              placeholder="Pillar Description"
              value={newPillar.desc}
              onChange={(e) => setNewPillar({ ...newPillar, desc: e.target.value })}
              className="admin-input text-xs"
            />
            <button
              type="button"
              onClick={addPillar}
              className="admin-btn-secondary text-xs px-4"
            >
              <Plus className="w-4 h-4" />
              <span>Append Pillar</span>
            </button>
          </div>
        </div>

        {/* Strategic Metrics */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center justify-between">
            <span>Key Institutional Metrics ({formData.metrics?.length || 0})</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {formData.metrics?.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center relative space-y-1"
              >
                <button
                  type="button"
                  onClick={() => removeMetric(idx)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <div className="text-xl font-bold font-mono text-white">{metric.number}</div>
                <div className="text-[11px] font-semibold text-sky-400">{metric.label}</div>
                {metric.desc && (
                  <div className="text-[10px] text-slate-400 truncate">{metric.desc}</div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#040814] border border-white/10 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Number (e.g. 100%)"
              value={newMetric.number}
              onChange={(e) => setNewMetric({ ...newMetric, number: e.target.value })}
              className="admin-input text-xs sm:w-28"
            />
            <input
              type="text"
              placeholder="Label (e.g. Indigenous Engineering)"
              value={newMetric.label}
              onChange={(e) => setNewMetric({ ...newMetric, label: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <input
              type="text"
              placeholder="Description"
              value={newMetric.desc}
              onChange={(e) => setNewMetric({ ...newMetric, desc: e.target.value })}
              className="admin-input text-xs flex-1"
            />
            <button
              type="button"
              onClick={addMetric}
              className="admin-btn-secondary text-xs px-4"
            >
              <Plus className="w-4 h-4" />
              <span>Add Metric</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="admin-btn-primary px-8 py-3 text-sm">
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save About Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
