import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import {
  Shield,
  Plane,
  Plus,
  Trash2,
  Edit2,
  Search,
  Filter,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Upload,
  Loader2,
  X,
  RefreshCw,
  FolderOpen,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const SECTOR_CATEGORIES = {
  aerospace: [
    { name: "Surveillance Systems", number: "01", subtitle: "Reconnaissance, ISR, and persistent observation platforms." },
    { name: "Tactical FPV Platforms", number: "02", subtitle: "Small agile combat and close-range tactical systems." },
    { name: "Strike Systems", number: "03", subtitle: "Precision payload delivery and kinetic air-to-ground response platforms." },
    { name: "Loitering Munitions", number: "04", subtitle: "Terminal strike systems built for rapid deployment profiles." },
    { name: "Heavy Tactical Platforms", number: "05", subtitle: "Large systems with higher payload or specialized capability." },
    { name: "Special Mission Systems", number: "06", subtitle: "Mission-specific equipment and tactical support solutions." },
    { name: "Support Infrastructure", number: "07", subtitle: "Operational support systems designed to sustain autonomous deployments." },
  ],
  defence: [
    { name: "Helmets", number: "01", subtitle: "Ballistic and tactical head protection systems for field deployment." },
    { name: "Shoes & Boots", number: "02", subtitle: "Anti-spike and terrain-ready military footwear for varied operating conditions." },
    { name: "Gloves", number: "03", subtitle: "Shock-resistant and tactical hand protection for operational use." },
    { name: "Body Armour", number: "04", subtitle: "Ballistic torso protection and tactical plate carrier systems." },
    { name: "Uniforms", number: "05", subtitle: "Combat uniforms, camouflaged fatigues, and tactical field apparel." },
    { name: "Tactical Gear", number: "06", subtitle: "Operational accessories, load-bearing gear, and field equipment." },
  ],
};

export default function ProductsMgmt() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSector = searchParams.get("sector") || "all";
  const [products, setProducts] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectorTab, setSectorTab] = useState(initialSector);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sector: "aerospace",
    category: "Surveillance Systems",
    categoryNumber: "01",
    categorySubtitle: "",
    desc: "",
    image: "",
    specs: [],
    status: "active",
    order: 0,
  });

  const [newSpec, setNewSpec] = useState({ label: "", value: "" });
  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showManualUrl, setShowManualUrl] = useState(false);

  // Fetch all sectors / briefings from The Newsroom to populate dynamic sectors
  const fetchSectors = async () => {
    try {
      const res = await api.getNews();
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.news)
        ? res.news
        : res.data?.data || [];
      const sorted = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setNewsArticles(sorted);
    } catch (err) {
      console.error("Failed to load sectors from newsroom:", err);
    }
  };

  useEffect(() => {
    fetchSectors();
    const handleFocus = () => fetchSectors();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Compute sectors in the EXACT order defined in The Newsroom (#1, #2, #3, ...)
  const orderedSectors = React.useMemo(() => {
    if (!newsArticles || newsArticles.length === 0) {
      return [
        { id: "aerospace", label: "Aerospace", aliases: ["aerospace"], subcategories: SECTOR_CATEGORIES.aerospace },
        { id: "defence", label: "Defence", aliases: ["defence"], subcategories: SECTOR_CATEGORIES.defence },
      ];
    }

    const list = [];
    const seen = new Set(["all"]);

    newsArticles.forEach((article) => {
      const slug = (article.slug || "").toLowerCase().trim();
      const title = (article.title || "").trim();
      const titleUpper = title.toUpperCase();
      const catUpper = (article.category || "").toUpperCase();

      const isAerospace =
        slug.includes("aerospace") ||
        titleUpper.includes("AEROSPACE") ||
        catUpper === "AEROSPACE";
      const isDefence =
        slug.includes("defence") ||
        titleUpper.includes("DEFENCE") ||
        catUpper === "DEFENCE";

      let id = "";
      let label = "";
      let subcats = [];

      if (isAerospace) {
        id = "aerospace";
        label = "Aerospace";
        subcats = Array.isArray(article.subcategories) && article.subcategories.length > 0
          ? article.subcategories
          : SECTOR_CATEGORIES.aerospace;
      } else if (isDefence) {
        id = "defence";
        label = "Defence";
        subcats = Array.isArray(article.subcategories) && article.subcategories.length > 0
          ? article.subcategories
          : SECTOR_CATEGORIES.defence;
      } else {
        id = slug || title.toLowerCase().replace(/\s+/g, "-");
        label = title || article.category || slug.toUpperCase();
        subcats = Array.isArray(article.subcategories)
          ? article.subcategories.map((sub, sIdx) => ({
              name: typeof sub === "string" ? sub : sub.name || `Subcategory ${sIdx + 1}`,
              number: typeof sub === "object" && sub.number ? sub.number : String(sIdx + 1).padStart(2, "0"),
              subtitle: typeof sub === "object" && sub.subtitle ? sub.subtitle : "",
            }))
          : [];
      }

      if (!id || seen.has(id)) return;
      seen.add(id);

      const aliases = [
        id,
        slug,
        title.toLowerCase(),
        (article.category || "").toLowerCase(),
      ].filter(Boolean);

      list.push({
        id,
        label,
        aliases: Array.from(new Set(aliases)),
        subcategories: subcats,
        raw: article,
      });
    });

    // Ensure fallback for aerospace or defence if not present
    if (!seen.has("aerospace")) {
      list.push({ id: "aerospace", label: "Aerospace", aliases: ["aerospace"], subcategories: SECTOR_CATEGORIES.aerospace });
    }
    if (!seen.has("defence")) {
      list.push({ id: "defence", label: "Defence", aliases: ["defence"], subcategories: SECTOR_CATEGORIES.defence });
    }

    return list;
  }, [newsArticles]);

  const allTabs = React.useMemo(() => {
    return [
      { id: "all", label: "All Sectors", aliases: [] },
      ...orderedSectors,
    ];
  }, [orderedSectors]);

  const mergedSectorCategories = React.useMemo(() => {
    const map = { ...SECTOR_CATEGORIES };
    orderedSectors.forEach((sec) => {
      if (sec.subcategories && sec.subcategories.length > 0) {
        map[sec.id] = sec.subcategories;
      }
    });
    return map;
  }, [orderedSectors]);

  const handleImageFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "products");
      uploadData.append("altText", formData.name || file.name);

      const res = await api.uploadFile(uploadData);
      const uploadedUrl = res.url || res.data?.url;
      if (uploadedUrl) {
        setFormData((prev) => ({
          ...prev,
          image: uploadedUrl,
        }));
      } else {
        throw new Error("No URL returned from server.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSelectCategoryPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      category: preset.name,
      categoryNumber: preset.number,
      categorySubtitle: preset.subtitle || prev.categorySubtitle,
    }));
  };

  const fetchProducts = async (currentSector = sectorTab, search = searchTerm) => {
    try {
      setLoading(true);
      const params = {};
      if (currentSector && currentSector !== "all") {
        const activeTabObj = allTabs.find((t) => t.id === currentSector);
        if (activeTabObj && activeTabObj.aliases && activeTabObj.aliases.length > 0) {
          params.sector = activeTabObj.aliases.join(",");
        } else {
          params.sector = currentSector;
        }
      }
      if (search && search.trim()) {
        params.search = search.trim();
      }
      const res = await api.getProducts(params);
      const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setProducts(list);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sectorFromUrl = searchParams.get("sector") || "all";
    if (sectorFromUrl !== sectorTab) {
      setSectorTab(sectorFromUrl);
    } else {
      fetchProducts(sectorFromUrl, searchTerm);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts(sectorTab, searchTerm);
  }, [sectorTab, allTabs]);

  const handleSectorChange = (tabId) => {
    setSectorTab(tabId);
    if (tabId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ sector: tabId });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(sectorTab, searchTerm);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    const defaultSector = sectorTab === "all" ? "aerospace" : sectorTab;
    const presets = mergedSectorCategories[defaultSector] || [];
    const defaultPreset = presets[0];
    setFormData({
      name: "",
      slug: "",
      sector: defaultSector,
      category: defaultPreset ? defaultPreset.name : "Surveillance Systems",
      categoryNumber: defaultPreset ? defaultPreset.number : "01",
      categorySubtitle: defaultPreset ? defaultPreset.subtitle : "",
      desc: "",
      image: "",
      specs: [],
      status: "active",
      order: products.length + 1,
    });
    setNewSpec({ label: "", value: "" });
    setUploadError("");
    setShowManualUrl(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      sector: product.sector || "defence",
      category: product.category,
      categoryNumber: product.categoryNumber || "01",
      categorySubtitle: product.categorySubtitle || "",
      desc: product.desc,
      image: product.image || "",
      specs: product.specs ? [...product.specs] : [],
      status: product.status || "active",
      order: product.order || 0,
    });
    setNewSpec({ label: "", value: "" });
    setUploadError("");
    setShowManualUrl(false);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (product) => {
    const nextStatus = product.status === "active" ? "draft" : "active";
    try {
      const res = await api.updateProduct(product._id, { status: nextStatus });
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? res.data : p))
        );
      }
    } catch (err) {
      alert("Failed to toggle status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hardware/platform specification?")) {
      return;
    }
    try {
      const res = await api.deleteProduct(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    }
  };

  const addSpec = () => {
    if (!newSpec.label || !newSpec.value) return;
    setFormData((prev) => ({
      ...prev,
      specs: [...(prev.specs || []), { ...newSpec }],
    }));
    setNewSpec({ label: "", value: "" });
  };

  const removeSpec = (idx) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingProduct) {
        const res = await api.updateProduct(editingProduct._id, formData);
        if (res.success) {
          setProducts((prev) =>
            prev.map((p) => (p._id === editingProduct._id ? res.data : p))
          );
        }
      } else {
        const res = await api.createProduct(formData);
        if (res.success) {
          setProducts((prev) => [res.data, ...prev]);
        }
      }
      setIsModalOpen(false);
      setSuccessMsg("Product specification synchronized with MongoDB.");
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      alert("Failed to save product: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Defence &amp; Aerospace Platforms
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, update, and manage hardware products across Aerospace UAVs and Tactical Defence gear.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={
              sectorTab === "defence"
                ? "/defence"
                : sectorTab === "aerospace"
                ? "/aerospace"
                : sectorTab === "all"
                ? "/aerospace"
                : `/news/${sectorTab}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Open Public Category Page in New Tab"
          >
            <span>View Live Public Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          </a>
          <button onClick={openCreateModal} className="admin-btn-primary text-xs">
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Sector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
          {allTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSectorChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-normal transition-all whitespace-nowrap uppercase cursor-pointer ${
                sectorTab === tab.id
                  ? "bg-sky-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="admin-input pr-10 text-xs"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-sky-400"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Products Grid / Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <LoadingSpinner size="md" text="Loading platform specifications..." />
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#040814] text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Image</th>
                  <th className="px-6 py-3.5">Platform Name</th>
                  <th className="px-6 py-3.5">Sector</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Key Specifications</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-1">
                        <img
                          src={item.image || "/images/placeholder.jpg"}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = "/images/skywardens-logo.png";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-slate-400 text-xs max-w-xs truncate">{item.desc}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sky-400 uppercase text-[11px] font-semibold tracking-wide">
                        {item.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">
                      {item.category}
                    </td>
                    <td className="px-6 py-4">
                      {item.specs && item.specs.length > 0 ? (
                        <div className="space-y-0.5">
                          {item.specs.slice(0, 2).map((s, idx) => (
                            <div key={idx} className="text-xs text-slate-400">
                              <span className="text-slate-400 font-medium">{s.label}:</span>{" "}
                              <span className="text-slate-200">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">No specs logged</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                          item.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === "active" ? "bg-emerald-400" : "bg-slate-400"
                          }`}
                        />
                        <span>{item.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-white/10"
                          title="Edit Specification"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs font-mono">
            No platforms found for the selected sector.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? `EDIT PLATFORM: ${editingProduct.name}` : "CREATE NEW PLATFORM SPEC"}
        position="center"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Title / Platform Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-sky-400 font-semibold tracking-wider flex items-center justify-between">
              <span>Platform Title / Name *</span>
              <span className="text-[11px] text-slate-500 font-normal">Shown on main website cards</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="admin-input text-sm font-semibold py-2.5"
              placeholder="e.g. Arrow Drone, Raven Eye, or Abhedya Level III Helmet"
              autoFocus
            />
          </div>

          {/* 2. Platform Image with Native OS File Picker Browser Button */}
          <div className="space-y-2 p-3.5 rounded-xl bg-[#040916] border border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-sky-400 font-semibold tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Platform Image *</span>
              </label>
              <button
                type="button"
                onClick={() => setShowManualUrl(!showManualUrl)}
                className="text-[11px] text-slate-400 hover:text-sky-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                {showManualUrl ? "Hide manual URL" : "Enter URL manually"}
              </button>
            </div>

            {/* Hidden native input for OS file dialog */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,.jpg,.jpeg,.png,.webp,.jfif,.pjp,.pjpeg,.svg,.gif,.bmp"
              onChange={handleImageFileSelect}
              className="hidden"
            />

            {/* Image Preview & Upload Button Layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Preview Thumbnail Box */}
              <div className="w-24 h-24 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center p-1.5 shrink-0 relative group">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "/images/skywardens-logo.png";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 text-[10px] text-center p-1 font-mono">
                    <ImageIcon className="w-6 h-6 mb-1 text-slate-600" />
                    <span>No image</span>
                  </div>
                )}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-sky-400 text-[10px]">
                    <Loader2 className="w-5 h-5 animate-spin mb-1" />
                    <span>Uploading...</span>
                  </div>
                )}
              </div>

              {/* Browse Button & Action Controls */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading from PC...</span>
                      </>
                    ) : (
                      <>
                        <FolderOpen className="w-4 h-4" />
                        <span>Browse Image from PC</span>
                      </>
                    )}
                  </button>

                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  {formData.image ? (
                    <span className="text-emerald-400 flex items-center gap-1 truncate">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{formData.image}</span>
                    </span>
                  ) : (
                    <span>Supports JPG, PNG, JFIF, WebP, SVG, and other image formats.</span>
                  )}
                </div>

                {uploadError && (
                  <div className="text-[11px] text-red-400 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Manual URL input */}
            {showManualUrl && (
              <div className="pt-2">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="admin-input text-xs"
                  placeholder="Or enter image URL / path e.g. /images/drone-arrow.png"
                />
              </div>
            )}
          </div>

          {/* 3. Description Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-sky-400 font-semibold tracking-wider flex items-center justify-between">
              <span>Technical Description *</span>
              <span className="text-[11px] text-slate-500 font-normal">Shown under platform title</span>
            </label>
            <textarea
              rows={3}
              required
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="admin-input text-xs leading-relaxed"
              placeholder="e.g. Tactical aerospace platform with mission-focused capability presentation and technical specification view."
            />
          </div>

          {/* 4. Strategic Sector & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-300">
                Strategic Sector *
              </label>
              <select
                value={formData.sector}
                onChange={(e) => {
                  const newSector = e.target.value;
                  const presets = mergedSectorCategories[newSector] || [];
                  const firstPreset = presets[0];
                  setFormData({
                    ...formData,
                    sector: newSector,
                    category: firstPreset ? firstPreset.name : formData.category,
                    categoryNumber: firstPreset ? firstPreset.number : "01",
                    categorySubtitle: firstPreset ? firstPreset.subtitle : "",
                  });
                }}
                className="admin-input text-xs uppercase font-mono"
              >
                {orderedSectors.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-slate-300">
                  Category *
                </label>
                <span className="text-[11px] text-slate-500 font-mono">Sec #{formData.categoryNumber || "01"}</span>
              </div>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="admin-input text-xs"
                placeholder="e.g. Surveillance Systems, Helmets, Boots"
              />
            </div>
          </div>

          {/* Category Quick Presets Chips */}
          {mergedSectorCategories[formData.sector] && mergedSectorCategories[formData.sector].length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-400">
                Quick Category Suggestions for {formData.sector.toUpperCase()}:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mergedSectorCategories[formData.sector].map((preset) => {
                  const isSelected = formData.category === preset.name;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleSelectCategoryPreset(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-sky-500/20 text-sky-300 border border-sky-400/50 font-bold"
                          : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                      }`}
                    >
                      {preset.number ? `${preset.number} ` : ""}{preset.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Specifications Key-Value List */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <label className="text-xs font-mono uppercase text-white flex items-center justify-between">
              <span>Technical Specifications ({formData.specs?.length || 0})</span>
              <span className="text-[11px] text-slate-400 font-normal">Optional hardware metrics</span>
            </label>

            {formData.specs?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {formData.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div className="truncate pr-2">
                      <span className="font-mono text-slate-400">{s.label}: </span>
                      <span className="text-white font-semibold">{s.value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(idx)}
                      className="text-red-400 hover:text-red-300 p-1 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#040814] border border-white/10 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Metric Name (e.g. Endurance)"
                value={newSpec.label}
                onChange={(e) => setNewSpec({ ...newSpec, label: e.target.value })}
                className="admin-input text-xs sm:w-1/3"
              />
              <input
                type="text"
                placeholder="Specification (e.g. 24+ Hours)"
                value={newSpec.value}
                onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                className="admin-input text-xs flex-1"
              />
              <button
                type="button"
                onClick={addSpec}
                className="admin-btn-secondary text-xs px-4"
              >
                <Plus className="w-4 h-4" />
                <span>Add Spec</span>
              </button>
            </div>
          </div>

          {/* 6. Publication Status & Save Button */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono uppercase text-slate-300">
                Publication Status:
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-[#050b18] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-sky-400"
              >
                <option value="active">Active (Visible on Website)</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={actionLoading || uploadingImage}
              className="admin-btn-primary text-xs px-6 py-2.5 disabled:opacity-50"
            >
              {actionLoading ? "Saving to Database..." : editingProduct ? "Update Product" : "Save & Publish Product"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
