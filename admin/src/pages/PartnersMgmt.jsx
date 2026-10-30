import { useState, useEffect } from 'react';
import { adminApi, mediaApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, Globe, Image, Check, X, Shield } from 'lucide-react';

export default function PartnersMgmt() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const initialForm = {
    name: '',
    category: 'Aerospace',
    logo: '',
    description: '',
    websiteUrl: '',
    active: true,
    order: 0,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getPartners();
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.partners)
        ? res.partners
        : res.data?.data || [];
      setPartners(list);
    } catch (err) {
      console.error('Failed to load partners:', err);
      setMessage({ type: 'error', text: 'Failed to retrieve strategic alliances.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (partner = null) => {
    if (partner) {
      setSelectedPartner(partner);
      setFormData({
        name: partner.name || '',
        category: partner.category || 'Aerospace',
        logo: partner.logo || '',
        description: partner.description || '',
        websiteUrl: partner.websiteUrl || '',
        active: partner.active !== undefined ? partner.active : true,
        order: partner.order || 0,
      });
    } else {
      setSelectedPartner(null);
      setFormData(initialForm);
    }
    setModalOpen(true);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'partners');

    try {
      setUploadingImage(true);
      const res = await mediaApi.upload(uploadData);
      const logoUrl = res.url || res.data?.url || res.data?.data?.url || '';
      setFormData((prev) => ({ ...prev, logo: logoUrl }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Logo upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (selectedPartner) {
        await adminApi.updatePartner(selectedPartner._id, formData);
        setMessage({ type: 'success', text: 'Partner alliance updated.' });
      } else {
        await adminApi.createPartner(formData);
        setMessage({ type: 'success', text: 'New institutional partner enlisted.' });
      }

      setModalOpen(false);
      fetchPartners();
    } catch (err) {
      console.error('Save failed:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to persist partner.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPartner) return;
    try {
      await adminApi.deletePartner(selectedPartner._id);
      setDeleteConfirmOpen(false);
      setSelectedPartner(null);
      setMessage({ type: 'success', text: 'Partner alliance removed.' });
      fetchPartners();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage({ type: 'error', text: 'Failed to remove partner.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Strategic Alliances &amp; Partners
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Institutional affiliations, government ministries, tier-1 suppliers, and certification boards.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="admin-btn-primary text-xs"
        >
          <Plus size={16} />
          <span>Enlist New Partner</span>
        </button>
      </div>

      {message.text && (
        <div
          className={`p-3 rounded-xl text-xs font-medium ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Loading alliance credentials..." />
        </div>
      ) : partners.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
          <p className="text-sm text-slate-400">No partner alliances registered yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-[#060b17]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-sky-500/40 hover:bg-[#071329] transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-28 bg-[#030610] border border-white/10 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt=""
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/skywardens-logo.png";
                          e.currentTarget.className = "max-h-full max-w-full object-contain opacity-40";
                        }}
                        className="max-h-full max-w-full object-contain filter brightness-110"
                      />
                    ) : (
                      <Shield size={22} className="text-slate-500" />
                    )}
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md border flex items-center gap-1.5 backdrop-blur-md ${
                      partner.active
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${partner.active ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                    <span>{partner.active ? 'Active' : 'Dormant'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
                    {partner.category}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-500 font-medium">Order: {partner.order}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors mb-2">{partner.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {partner.description || 'Institutional collaboration partner.'}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <Globe size={13} />
                    <span>Portal</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-600 font-mono">No direct link</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(partner)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded transition-all"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPartner(partner);
                      setDeleteConfirmOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedPartner ? 'Modify Alliance Entity' : 'Register Strategic Partner'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Organization Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Ministry of Defence Innovation Board"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Alliance Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="Aerospace">Aerospace</option>
                <option value="Defence">Defence</option>
                <option value="Government">Government</option>
                <option value="Technology">Technology</option>
                <option value="Strategic">Strategic</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Sort Priority Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Official Portal URL
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData((p) => ({ ...p, websiteUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Logo / Insignia Image
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData((p) => ({ ...p, logo: e.target.value }))}
                placeholder="https://... or /uploads/..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
              <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase rounded cursor-pointer transition-all flex items-center gap-1">
                <Image size={14} />
                <span>{uploadingImage ? '...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
            {formData.logo && (
              <div className="mt-2 h-14 w-28 bg-white/5 rounded border border-white/10 p-2 flex items-center justify-center">
                <img src={formData.logo} alt="Preview" className="max-h-full max-w-full object-contain" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Brief Overview / Engagement Scope
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="Strategic supply chain collaboration in carbon-composite airframe components."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50 leading-relaxed"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData((p) => ({ ...p, active: e.target.checked }))}
                className="rounded bg-white/5 border-white/20 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-xs font-mono uppercase text-slate-300">
                Partner Active & Publicly Listed
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono uppercase rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold uppercase rounded transition-all disabled:opacity-50"
            >
              {saving ? 'Transmitting...' : 'Save Partner'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Revoke Strategic Partnership"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you certain you wish to delist <span className="font-bold text-white">"{selectedPartner?.name}"</span>?
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-4 py-2 bg-white/5 text-slate-300 text-xs font-mono uppercase rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase rounded"
            >
              Confirm Delist
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
