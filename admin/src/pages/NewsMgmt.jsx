import { useState, useEffect } from 'react';
import { adminApi, mediaApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { Plus, Edit2, Trash2, Search, ExternalLink, Image, Eye, EyeOff, Star, Calendar, Clock, GripVertical, Move, FolderTree, Layers, Box, Check, X, Upload } from 'lucide-react';

export default function NewsMgmt() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [reordering, setReordering] = useState(false);

  // Subcategories management state
  const [subcatModalOpen, setSubcatModalOpen] = useState(false);
  const [targetArticleForSubcat, setTargetArticleForSubcat] = useState(null);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [activeSubcatIdx, setActiveSubcatIdx] = useState(0);
  const [newSubcatName, setNewSubcatName] = useState('');
  const [newSubcatSubtitle, setNewSubcatSubtitle] = useState('');
  const [newItem, setNewItem] = useState({ name: '', desc: '', image: '', specs: '' });
  const [uploadingItemImage, setUploadingItemImage] = useState(false);

  const initialFormState = {
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    readTime: '3 min read',
    excerpt: '',
    content: [''],
    image: '',
    featured: false,
    author: 'Sky Wardens Intelligence Bureau',
    tags: '',
    status: 'published',
    order: 0,
    subcategories: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getNews();
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.news)
        ? res.news
        : res.data?.data || [];
      setArticles(list);
    } catch (err) {
      console.error('Failed to load news:', err);
      setMessage({ type: 'error', text: 'Failed to retrieve briefings repository.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (article = null) => {
    if (article) {
      setSelectedArticle(article);
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        date: article.date ? new Date(article.date).toISOString().split('T')[0] : '',
        category: (article.category || 'DEFENCE').toUpperCase(),
        readTime: article.readTime || '3 min read',
        excerpt: article.excerpt || '',
        content: article.content && article.content.length > 0 ? article.content : [''],
        image: article.image || '',
        featured: Boolean(article.featured),
        author: article.author || 'Sky Wardens Intelligence Bureau',
        tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
        subcategories: Array.isArray(article.subcategories) ? article.subcategories : [],
        status: article.status || 'published',
        order: article.order || 0,
      });
    } else {
      setSelectedArticle(null);
      setFormData(initialFormState);
    }
    setModalOpen(true);
  };

  const handleOpenSubcatModal = (article) => {
    setTargetArticleForSubcat(article);
    setSubcategoriesList(Array.isArray(article.subcategories) ? JSON.parse(JSON.stringify(article.subcategories)) : []);
    setActiveSubcatIdx(0);
    setNewSubcatName('');
    setNewSubcatSubtitle('');
    setNewItem({ name: '', desc: '', image: '', specs: '' });
    setSubcatModalOpen(true);
  };

  const handleAddSubcategory = () => {
    if (!newSubcatName.trim()) return;
    const num = String(subcategoriesList.length + 1).padStart(2, '0');
    const newEntry = {
      number: num,
      name: newSubcatName.trim(),
      subtitle: newSubcatSubtitle.trim(),
      items: [],
    };
    const updated = [...subcategoriesList, newEntry];
    setSubcategoriesList(updated);
    setActiveSubcatIdx(updated.length - 1);
    setNewSubcatName('');
    setNewSubcatSubtitle('');
  };

  const handleRemoveSubcategory = (index) => {
    const updated = subcategoriesList.filter((_, i) => i !== index).map((s, idx) => ({
      ...s,
      number: String(idx + 1).padStart(2, '0'),
    }));
    setSubcategoriesList(updated);
    if (activeSubcatIdx >= updated.length) {
      setActiveSubcatIdx(Math.max(0, updated.length - 1));
    }
  };

  const handleAddItemToActiveSubcat = () => {
    if (!newItem.name.trim() || activeSubcatIdx < 0 || !subcategoriesList[activeSubcatIdx]) return;
    const updated = [...subcategoriesList];
    const targetSub = { ...updated[activeSubcatIdx] };
    targetSub.items = [...(targetSub.items || []), { ...newItem }];
    updated[activeSubcatIdx] = targetSub;
    setSubcategoriesList(updated);
    setNewItem({ name: '', desc: '', image: '', specs: '' });
  };

  const handleRemoveItemFromSubcat = (itemIdx) => {
    if (activeSubcatIdx < 0 || !subcategoriesList[activeSubcatIdx]) return;
    const updated = [...subcategoriesList];
    const targetSub = { ...updated[activeSubcatIdx] };
    targetSub.items = (targetSub.items || []).filter((_, i) => i !== itemIdx);
    updated[activeSubcatIdx] = targetSub;
    setSubcategoriesList(updated);
  };

  const handleItemImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'subcategories');

    try {
      setUploadingItemImage(true);
      const res = await mediaApi.upload(uploadData);
      const imageUrl = res.url || res.data?.url || res.data?.data?.url || '';
      setNewItem((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error('Subcategory item image upload failed:', err);
      alert('Image upload failed: ' + (err.message || 'Error'));
    } finally {
      setUploadingItemImage(false);
    }
  };

  const handleSaveSubcategories = async () => {
    if (!targetArticleForSubcat) return;
    try {
      setSaving(true);
      await adminApi.updateNews(targetArticleForSubcat._id, {
        ...targetArticleForSubcat,
        subcategories: subcategoriesList,
      });
      setMessage({ type: 'success', text: `Subcategories for "${targetArticleForSubcat.title}" saved successfully!` });
      setSubcatModalOpen(false);
      fetchArticles();
      setTimeout(() => setMessage((m) => (m.text?.includes('Subcategories') ? { type: '', text: '' } : m)), 3500);
    } catch (err) {
      console.error('Failed to save subcategories:', err);
      alert('Failed to save subcategories: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (!selectedArticle) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => {
        const trimmedTitle = title.trim().toUpperCase();
        // Auto-sync category with title if category is empty, default or matched previous title
        const shouldSyncCategory =
          !prev.category ||
          prev.category === 'DEFENCE' ||
          prev.category === (prev.title || '').trim().toUpperCase();

        return {
          ...prev,
          title,
          slug,
          category: shouldSyncCategory && trimmedTitle ? trimmedTitle : prev.category,
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, title }));
    }
  };

  const handleContentParagraphChange = (index, value) => {
    const updated = [...formData.content];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, content: updated }));
  };

  const addParagraph = () => {
    setFormData((prev) => ({ ...prev, content: [...prev.content, ''] }));
  };

  const removeParagraph = (index) => {
    if (formData.content.length <= 1) return;
    const updated = formData.content.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, content: updated }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'news');

    try {
      setUploadingImage(true);
      const res = await mediaApi.upload(uploadData);
      const imageUrl = res.url || res.data?.url || res.data?.data?.url || '';
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed. Check file size (max 10MB) or format.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...formData,
        image: (formData.image || '').trim(),
        category: (formData.category || formData.title || 'DEFENCE').trim().toUpperCase(),
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        content: formData.content.filter((p) => p.trim().length > 0),
      };

      if (selectedArticle) {
        await adminApi.updateNews(selectedArticle._id, payload);
        setMessage({ type: 'success', text: 'Intelligence dispatch updated.' });
      } else {
        await adminApi.createNews(payload);
        setMessage({ type: 'success', text: 'New strategic dispatch published.' });
      }

      setModalOpen(false);
      fetchArticles();
    } catch (err) {
      console.error('Save failed:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save intelligence dispatch.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedArticle) return;
    try {
      await adminApi.deleteNews(selectedArticle._id);
      setDeleteConfirmOpen(false);
      setSelectedArticle(null);
      setMessage({ type: 'success', text: 'Dispatch deleted successfully.' });
      fetchArticles();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage({ type: 'error', text: 'Failed to purge intelligence article.' });
    }
  };

  const handleDragStart = (e, articleId) => {
    setDraggedId(articleId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', articleId);
  };

  const handleDragOver = (e, articleId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverId !== articleId) {
      setDragOverId(articleId);
    }
  };

  const handleDragLeave = (e, articleId) => {
    if (dragOverId === articleId) {
      setDragOverId(null);
    }
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const sourceIndex = articles.findIndex((a) => a._id === draggedId);
    const targetIndex = articles.findIndex((a) => a._id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    // Shift whole item in array
    const updated = [...articles];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);

    const reorderedWithOrder = updated.map((item, idx) => ({ ...item, order: idx }));
    setArticles(reorderedWithOrder);
    setDraggedId(null);
    setDragOverId(null);

    try {
      setReordering(true);
      await adminApi.reorderNews(reorderedWithOrder.map((a, idx) => ({ id: a._id, order: idx })));
      setMessage({ type: 'success', text: 'Articles display order updated and synchronized.' });
      setTimeout(() => setMessage((m) => (m.text?.includes('display order') ? { type: '', text: '' } : m)), 3500);
    } catch (err) {
      console.error('Failed to save reorder:', err);
      setMessage({ type: 'error', text: 'Failed to synchronize reordered dispatch sequence.' });
    } finally {
      setReordering(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      categoryFilter.toUpperCase() === 'ALL' ||
      (a.category && a.category.toUpperCase() === categoryFilter.toUpperCase());
    return matchesSearch && matchesCat;
  });

  const categories = [
    'ALL',
    ...Array.from(
      new Set(
        articles
          .map((a) => (a.category || '').trim().toUpperCase())
          .filter(Boolean)
      )
    ),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Intelligence &amp; Press Briefings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-2">
            <span>Dispatch strategic communiqués, milestone press releases, and geopolitical updates.</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-[11px] font-medium font-sans">
              <Move size={12} /> Drag &amp; Drop to Reorder
            </span>
            {reordering && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-medium font-sans animate-pulse">
                Syncing order...
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="admin-btn-primary text-xs"
        >
          <Plus size={16} />
          <span>New Intelligence Article</span>
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

      {/* Filters */}
      <div className="admin-card p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search dispatch records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-9 pr-4 text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => {
            const isSelected = categoryFilter.toUpperCase() === cat.toUpperCase();
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-normal transition-all whitespace-nowrap uppercase ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Decrypting press archives..." />
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
          <p className="text-sm text-slate-400">No dispatches match current parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => {
            const isDragging = article._id === draggedId;
            const isDragOver = article._id === dragOverId && draggedId !== article._id;

            return (
              <div
                key={article._id}
                draggable
                onDragStart={(e) => handleDragStart(e, article._id)}
                onDragOver={(e) => handleDragOver(e, article._id)}
                onDragLeave={(e) => handleDragLeave(e, article._id)}
                onDrop={(e) => handleDrop(e, article._id)}
                onDragEnd={handleDragEnd}
                className={`bg-[#060b17]/90 border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-xl group cursor-grab active:cursor-grabbing select-none relative ${
                  isDragging
                    ? 'opacity-30 scale-95 border-dashed border-sky-400 bg-sky-950/20 ring-2 ring-sky-500/30'
                    : isDragOver
                    ? 'border-sky-400 bg-[#0a1e3b] scale-[1.03] ring-4 ring-sky-400/30 shadow-[0_0_35px_rgba(56,189,248,0.45)] z-20'
                    : 'border-white/10 hover:border-sky-500/40 hover:bg-[#071329]'
                }`}
              >
                {/* Drag Cue Overlay on Drag Over */}
                {isDragOver && (
                  <div className="absolute inset-0 bg-sky-950/85 border-2 border-sky-400 rounded-2xl z-30 flex flex-col items-center justify-center p-4 backdrop-blur-[2px] pointer-events-none text-center">
                    <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400 mb-2 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                      <Move size={24} className="animate-bounce" />
                    </div>
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      Shift to Position #{index + 1}
                    </span>
                    <span className="text-[11px] text-sky-300/80 mt-0.5">
                      Release cursor to move box here
                    </span>
                  </div>
                )}

                {/* Card Image Area */}
                <div className="relative h-48 bg-[#030610] overflow-hidden flex items-center justify-center pointer-events-none">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/skywardens-logo.png";
                        e.currentTarget.className = "w-24 h-24 object-contain opacity-25 p-2";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-gradient-to-br from-slate-900 to-[#030610]">
                      <Image size={32} className="text-slate-600 mb-1" />
                      <span className="text-[11px] text-slate-500 font-medium">No Image Uploaded</span>
                    </div>
                  )}

                  {/* Subtle gradient overlay to blend into card body */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b17] via-transparent to-black/40 pointer-events-none" />

                  {/* Position Badge & Grip at Top Center */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-white/20 text-slate-200 text-[11px] font-sans font-medium rounded-full shadow-lg group-hover:border-sky-400/60 group-hover:text-sky-300 transition-all">
                    <GripVertical size={13} className="text-sky-400" />
                    <span>#{index + 1}</span>
                  </div>

                  {/* Category Badges on Top Left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-sky-400 text-[11px] font-semibold tracking-wide rounded-md shadow-sm uppercase font-mono">
                      {article.category || 'DEFENCE'}
                    </span>
                    {article.featured && (
                      <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-md flex items-center gap-1 shadow-sm">
                        <Star size={11} className="fill-slate-950" /> Top
                      </span>
                    )}
                  </div>

                  {/* Status on Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-md border flex items-center gap-1.5 backdrop-blur-md ${
                        article.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${article.status === 'published' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                      <span>{article.status === 'published' ? 'Published' : 'Draft'}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {article.readTime || '3 min read'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 mb-2 leading-snug tracking-tight">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed font-normal">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      draggable={false}
                      onClick={() => handleOpenSubcatModal(article)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-400 text-sky-400 text-xs font-semibold transition-all cursor-pointer shadow-sm group/subbtn"
                      title={`Manage Subcategories under ${article.title}`}
                    >
                      <FolderTree size={13} className="text-sky-400 group-hover/subbtn:scale-110 transition-transform" />
                      <span>Subcategories ({article.subcategories?.length || 0})</span>
                      <Plus size={11} className="text-sky-300" />
                    </button>

                    <div
                      className="flex items-center gap-1.5"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={`/news/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg border border-transparent hover:border-sky-500/20 transition-all cursor-pointer"
                        title="View Live Public Sector Page"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        type="button"
                        draggable={false}
                        onClick={() => handleOpenModal(article)}
                        className="p-2 text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg border border-transparent hover:border-sky-500/20 transition-all cursor-pointer"
                        title="Edit Dispatch"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        draggable={false}
                        onClick={() => {
                          setSelectedArticle(article);
                          setDeleteConfirmOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Editor Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedArticle ? 'Edit Strategic Dispatch' : 'Dispatch New Communiqué'}
        size="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Dispatch Headline *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Hypersonic Flight Test Program Milestone"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                URI Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                placeholder="hypersonic-flight-test-milestone"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1 flex items-center justify-between">
                <span>Category / Classification *</span>
                {formData.title && (
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, category: (p.title || '').trim().toUpperCase() }))}
                    className="text-[10px] text-sky-400 hover:text-sky-300 underline lowercase font-sans cursor-pointer"
                  >
                    use title
                  </button>
                )}
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value.toUpperCase() }))}
                placeholder="e.g. VI, DEFENCE, AEROSPACE"
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 uppercase font-mono font-semibold"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {Array.from(
                  new Set([
                    'DEFENCE',
                    'AEROSPACE',
                    'AUTONOMOUS',
                    'INNOVATION',
                    ...categories.filter((c) => c !== 'ALL'),
                  ])
                )
                  .slice(0, 6)
                  .map((catName) => (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, category: catName }))}
                      className={`text-[10px] px-2 py-0.5 rounded border transition-all cursor-pointer ${
                        formData.category === catName
                          ? 'bg-sky-500/25 border-sky-400 text-sky-300 font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {catName}
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Publication Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Read Estimate
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData((p) => ({ ...p, readTime: e.target.value }))}
                placeholder="4 min read"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Executive Abstract / Excerpt *
            </label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
              placeholder="High-level summary visible on the news grid..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Banner Imagery URL or Upload (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
                placeholder="Leave blank for text-only dispatch (no image)"
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25"
              />
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, image: '' }))}
                  className="px-2.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-mono uppercase rounded transition-all"
                  title="Remove image"
                >
                  Clear
                </button>
              )}
              <label className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase rounded cursor-pointer transition-all flex items-center gap-1">
                <Image size={14} />
                <span>{uploadingImage ? 'Uploading...' : 'Browse'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
            {formData.image ? (
              <div className="mt-2 h-24 w-40 rounded border border-white/10 overflow-hidden relative group">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, image: '' }))}
                  className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-red-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1">
                Optional: Koi image select nahi karenge to card pe image show nahi hogi, sirf data show hoga.
              </p>
            )}
          </div>

          {/* Body paragraphs */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono uppercase text-slate-400">
                Detailed Transmission Content (Paragraphs)
              </label>
              <button
                type="button"
                onClick={addParagraph}
                className="text-xs font-mono uppercase text-[#7ec8ff] hover:text-[#bce2ff] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                <Plus size={13} className="text-[#7ec8ff]" /> Add Paragraph
              </button>
            </div>
            <div className="space-y-2">
              {formData.content.map((p, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="text-[10px] font-mono text-slate-500 pt-2 w-5 text-right">
                    P{idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={p}
                    onChange={(e) => handleContentParagraphChange(idx, e.target.value)}
                    placeholder={`Paragraph ${idx + 1} content...`}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25"
                  />
                  {formData.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 pt-2"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Originating Bureau / Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
                placeholder="Aviation, Hypersonic, Radar"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Release Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-[#7ec8ff]/60 focus:ring-1 focus:ring-[#7ec8ff]/25 font-mono"
              >
                <option value="published">Published (Live)</option>
                <option value="draft">Draft (Restricted)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                className="rounded bg-white/5 border-white/20 text-[#247bc4] focus:ring-[#7ec8ff]"
              />
              <span className="text-xs font-mono uppercase text-slate-300">
                Pin as Lead Featured Dispatch
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono uppercase rounded-lg border border-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#7ec8ff] via-[#4fa7f3] to-[#247bc4] hover:from-[#9cd6ff] hover:via-[#6ab5f6] hover:to-[#318ee0] text-[#030b17] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_2px_14px_rgba(126,200,255,0.35)] hover:shadow-[0_4px_20px_rgba(126,200,255,0.55)] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Transmitting...' : selectedArticle ? 'Commit Changes' : 'Authorize Release'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Authorize Dispatch Destruction"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you certain you wish to purge <span className="font-bold text-white">"{selectedArticle?.title}"</span> from the intelligence archives? This action cannot be revoked.
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              onClick={() => setDeleteConfirmOpen(false)}
              className="px-4 py-2 bg-white/5 text-slate-300 text-xs font-mono uppercase rounded"
            >
              Abort
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase rounded"
            >
              Confirm Purge
            </button>
          </div>
        </div>
      </Modal>

      {/* Subcategory Manager Modal */}
      <Modal
        isOpen={subcatModalOpen}
        onClose={() => setSubcatModalOpen(false)}
        title={`Subcategory & Equipment Manager — ${targetArticleForSubcat?.title || ''}`}
        maxWidth="max-w-5xl"
      >
        <div className="space-y-6">
          <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs text-slate-300 flex items-start gap-3">
            <FolderTree className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase font-mono tracking-wider">
                {targetArticleForSubcat?.title} &bull; Subcategories &amp; Platforms
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Add subcategories (e.g. 01 Tactical Drones, 02 Surveillance Platforms) and add equipment items inside them. They will show on the platform page just like Aerospace &amp; Defence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Subcategories list & creator */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0 pr-0 lg:pr-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-300 font-bold">
                  Subcategories ({subcategoriesList.length})
                </span>
              </div>

              {/* Subcategories list */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {subcategoriesList.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-white/10 rounded-xl text-slate-500 text-xs">
                    No subcategories yet. Create your first one below!
                  </div>
                ) : (
                  subcategoriesList.map((sub, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveSubcatIdx(idx)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        activeSubcatIdx === idx
                          ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-sky-400">
                          {sub.number || String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-white truncate">{sub.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {sub.items?.length || 0} product(s)
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSubcategory(idx);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                        title="Delete Subcategory"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Subcategory Form */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <span className="text-[11px] font-mono uppercase text-sky-400 font-bold block">
                  + Add New Subcategory
                </span>
                <input
                  type="text"
                  placeholder="e.g. Tactical UAV Platforms"
                  value={newSubcatName}
                  onChange={(e) => setNewSubcatName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-sky-400"
                />
                <input
                  type="text"
                  placeholder="Subtitle (e.g. High altitude endurance)"
                  value={newSubcatSubtitle}
                  onChange={(e) => setNewSubcatSubtitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={handleAddSubcategory}
                  disabled={!newSubcatName.trim()}
                  className="w-full py-1.5 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Create Subcategory</span>
                </button>
              </div>
            </div>

            {/* Right Column: Items under currently active subcategory */}
            <div className="lg:col-span-7 space-y-4">
              {subcategoriesList.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-xl text-slate-500 text-xs">
                  <Box className="w-8 h-8 mb-2 text-slate-600" />
                  <span>Create a subcategory on the left first to add items/products into it.</span>
                </div>
              ) : subcategoriesList[activeSubcatIdx] ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                        Selected Subcategory #{subcategoriesList[activeSubcatIdx].number}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {subcategoriesList[activeSubcatIdx].name}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {subcategoriesList[activeSubcatIdx].items?.length || 0} Products
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {(!subcategoriesList[activeSubcatIdx].items || subcategoriesList[activeSubcatIdx].items.length === 0) ? (
                      <div className="p-3 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-lg text-slate-500 text-xs">
                        No equipment items in this subcategory yet. Add one below!
                      </div>
                    ) : (
                      subcategoriesList[activeSubcatIdx].items.map((it, itIdx) => (
                        <div
                          key={itIdx}
                          className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {it.image ? (
                              <img src={it.image} alt="" className="w-8 h-8 rounded object-cover border border-white/10 shrink-0" />
                            ) : (
                              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                                <Box size={14} />
                              </div>
                            )}
                            <div className="truncate">
                              <div className="font-semibold text-white truncate">{it.name}</div>
                              <div className="text-[10px] text-slate-400 truncate">{it.desc}</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItemFromSubcat(itIdx)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Remove Item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Item form */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 space-y-2.5">
                    <span className="text-[11px] font-mono uppercase text-sky-400 font-bold block">
                      + Add Product / Item inside "{subcategoriesList[activeSubcatIdx].name}"
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Product / Item Name *"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-sky-400"
                      />
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="Image URL or Browse ->"
                          value={newItem.image}
                          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                          className="flex-1 min-w-0 px-3 py-1.5 bg-slate-950 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-sky-400"
                        />
                        <label className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono uppercase rounded cursor-pointer transition-all flex items-center gap-1 shrink-0">
                          <Upload size={12} />
                          <span>{uploadingItemImage ? '...' : 'Upload'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleItemImageUpload}
                            className="hidden"
                            disabled={uploadingItemImage}
                          />
                        </label>
                      </div>
                    </div>
                    {newItem.image && (
                      <div className="flex items-center gap-2 p-1.5 rounded bg-black/40 border border-white/10">
                        <img src={newItem.image} alt="Preview" className="w-10 h-10 object-cover rounded border border-white/10" />
                        <span className="text-[10px] text-slate-400 truncate font-mono">{newItem.image}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Product Description (e.g. Tactical reconnaissance drone)"
                        value={newItem.desc}
                        onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
                        className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-sky-400"
                      />
                      <input
                        type="text"
                        placeholder="Key Specs (e.g. Range: 100km, VTOL)"
                        value={newItem.specs}
                        onChange={(e) => setNewItem({ ...newItem, specs: e.target.value })}
                        className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-sky-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddItemToActiveSubcat}
                      disabled={!newItem.name.trim()}
                      className="py-1.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus size={13} />
                      <span>Add Item to Subcategory</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[11px] text-slate-400">
              Total Subcategories: <strong className="text-white">{subcategoriesList.length}</strong>
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSubcatModalOpen(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono uppercase rounded transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSubcategories}
                disabled={saving}
                className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold uppercase rounded transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              >
                <Check size={14} />
                <span>{saving ? 'Synchronizing...' : 'Save All Subcategories'}</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
