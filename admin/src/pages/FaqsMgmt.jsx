import { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqsMgmt() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [expandedId, setExpandedId] = useState(null);

  const initialForm = {
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    active: true,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getFaqs();
      setFaqs(res.data.data || []);
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      setMessage({ type: 'error', text: 'Failed to retrieve FAQ records.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setSelectedFaq(faq);
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || 'General',
        order: faq.order || 0,
        active: faq.active !== undefined ? faq.active : true,
      });
    } else {
      setSelectedFaq(null);
      setFormData(initialForm);
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (selectedFaq) {
        await adminApi.updateFaq(selectedFaq._id, formData);
        setMessage({ type: 'success', text: 'FAQ inquiry updated successfully.' });
      } else {
        await adminApi.createFaq(formData);
        setMessage({ type: 'success', text: 'New FAQ inquiry registered.' });
      }

      setModalOpen(false);
      fetchFaqs();
    } catch (err) {
      console.error('Save failed:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save FAQ.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedFaq) return;
    try {
      await adminApi.deleteFaq(selectedFaq._id);
      setDeleteConfirmOpen(false);
      setSelectedFaq(null);
      setMessage({ type: 'success', text: 'FAQ removed.' });
      fetchFaqs();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage({ type: 'error', text: 'Failed to delete FAQ.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
            Frequently Asked Inquiries (FAQs)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Standard operating procedures, defense procurement protocols, and technical security disclosures.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus size={16} /> Add FAQ Item
        </button>
      </div>

      {message.text && (
        <div
          className={`p-3 rounded text-xs font-mono uppercase tracking-wider ${
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
          <LoadingSpinner size="lg" message="Loading knowledge base records..." />
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-lg">
          <p className="text-sm text-slate-400">No knowledge base items recorded.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isExpanded = expandedId === faq._id;
            return (
              <div
                key={faq._id}
                className="bg-black/40 border border-white/10 rounded-lg overflow-hidden transition-all hover:border-amber-500/30"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : faq._id)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-amber-500/10 text-amber-400 rounded">
                      <HelpCircle size={16} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          {faq.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Order: {faq.order}</span>
                        {!faq.active && (
                          <span className="text-[10px] font-mono uppercase text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-white mt-1">{faq.question}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleOpenModal(faq)}
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded transition-all"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFaq(faq);
                        setDeleteConfirmOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded transition-all"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq._id)}
                      className="p-2 text-slate-400 hover:text-white"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Editor Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedFaq ? 'Modify FAQ Entry' : 'Create Knowledge Base Entry'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Inquiry / Question *
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData((p) => ({ ...p, question: e.target.value }))}
              placeholder="e.g. What certification levels do Sky Wardens systems adhere to?"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Domain / Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
              >
                <option value="General">General</option>
                <option value="Procurement">Procurement</option>
                <option value="Security">Security</option>
                <option value="Technology">Technology</option>
                <option value="Careers">Careers</option>
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
              Authoritative Answer *
            </label>
            <textarea
              required
              rows={4}
              value={formData.answer}
              onChange={(e) => setFormData((p) => ({ ...p, answer: e.target.value }))}
              placeholder="Detailed response explaining policy, specifications, or procurement channels..."
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
                FAQ Visible on Public Website
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
              {saving ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Delete Knowledge Entry"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you sure you want to remove this FAQ entry?
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
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
