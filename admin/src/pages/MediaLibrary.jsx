import { useState, useEffect } from 'react';
import { mediaApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { Upload, Trash2, Copy, Check, File, Image, Folder, ExternalLink } from 'lucide-react';

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folderFilter, setFolderFilter] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchMedia();
  }, [folderFilter]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await mediaApi.getAll(folderFilter);
      setMediaList(res.data.data || []);
    } catch (err) {
      console.error('Failed to load media:', err);
      setMessage({ type: 'error', text: 'Failed to access digital asset repository.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folderFilter === 'all' ? 'general' : folderFilter);
        await mediaApi.upload(formData);
      }
      setMessage({ type: 'success', text: `${files.length} asset(s) archived successfully.` });
      fetchMedia();
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: 'Upload failed. Ensure file size is under 10MB.' });
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url, id) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!selectedMedia) return;
    try {
      await mediaApi.delete(selectedMedia._id);
      setDeleteConfirmOpen(false);
      setSelectedMedia(null);
      setMessage({ type: 'success', text: 'Media asset deleted.' });
      fetchMedia();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage({ type: 'error', text: 'Failed to delete asset.' });
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
            Digital Asset Vault & Media
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Central repository for sovereign product schematics, imagery, and tactical telemetry assets.
          </p>
        </div>
        <div>
          <label className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg shadow-amber-500/20">
            <Upload size={16} />
            <span>{uploading ? 'Archiving Files...' : 'Upload Media Files'}</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
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

      {/* Folder Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
        {['all', 'products', 'news', 'partners', 'general'].map((f) => (
          <button
            key={f}
            onClick={() => setFolderFilter(f)}
            className={`px-3 py-1.5 rounded text-xs font-mono uppercase flex items-center gap-1.5 transition-all ${
              folderFilter === f
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Folder size={13} />
            <span>{f}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" message="Scanning media vault..." />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
          <Image size={40} className="mx-auto text-slate-600 mb-2" />
          <p className="text-sm text-slate-400">Vault directory contains no records.</p>
          <p className="text-xs text-slate-500 mt-1">Upload files using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => (
            <div
              key={item._id}
              className="bg-black/40 border border-white/10 rounded-lg overflow-hidden flex flex-col group hover:border-amber-500/40 transition-all"
            >
              <div
                onClick={() => setPreviewMedia(item)}
                className="relative h-36 bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
              >
                {item.mimetype?.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.originalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <File size={36} className="text-slate-500" />
                )}
                <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono uppercase text-slate-300 rounded">
                  {item.folder}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-white truncate" title={item.originalName}>
                    {item.originalName}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                    {formatFileSize(item.size)}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(item.url, item._id)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded text-[11px] font-mono flex items-center gap-1 transition-all"
                    title="Copy URL"
                  >
                    {copiedId === item._id ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMedia(item);
                      setDeleteConfirmOpen(true);
                    }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded transition-all"
                    title="Delete Asset"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <Modal
          isOpen={!!previewMedia}
          onClose={() => setPreviewMedia(null)}
          title={previewMedia.originalName}
          size="lg"
        >
          <div className="space-y-4">
            <div className="max-h-[60vh] bg-slate-950 rounded flex items-center justify-center p-2 overflow-hidden border border-white/10">
              {previewMedia.mimetype?.startsWith('image/') ? (
                <img
                  src={previewMedia.url}
                  alt={previewMedia.originalName}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="py-12 text-center">
                  <File size={48} className="mx-auto text-slate-500 mb-2" />
                  <p className="text-xs text-slate-400">{previewMedia.originalName}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-white/5 p-3 rounded">
              <div>
                <span className="text-slate-500">File Size:</span>{' '}
                <span className="text-white">{formatFileSize(previewMedia.size)}</span>
              </div>
              <div>
                <span className="text-slate-500">Format:</span>{' '}
                <span className="text-white">{previewMedia.mimetype}</span>
              </div>
              <div>
                <span className="text-slate-500">Vault Folder:</span>{' '}
                <span className="text-white uppercase">{previewMedia.folder}</span>
              </div>
              <div>
                <span className="text-slate-500">Uploaded:</span>{' '}
                <span className="text-white">
                  {new Date(previewMedia.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Asset URI Path
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={previewMedia.url}
                  className="flex-1 px-3 py-1.5 bg-black/60 border border-white/10 rounded text-xs text-slate-300 font-mono"
                />
                <button
                  onClick={() => handleCopyUrl(previewMedia.url, previewMedia._id)}
                  className="px-3 py-1.5 bg-amber-500 text-black text-xs font-mono uppercase font-bold rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <Modal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Asset Destruction"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Permanently delete <span className="font-bold text-white">"{selectedMedia?.originalName}"</span> from the storage volume?
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
              Destroy Asset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
