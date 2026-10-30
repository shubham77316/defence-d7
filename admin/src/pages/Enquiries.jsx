import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Send,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

export default function Enquiries() {
  const [searchParams] = useSearchParams();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.getEnquiries({
        search: searchTerm,
        status: statusFilter,
      });
      if (res.success) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  // Handle URL query param ?id=...
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl && enquiries.length > 0) {
      const match = enquiries.find((e) => e._id === idFromUrl);
      if (match) {
        setSelectedEnquiry(match);
        setIsDetailOpen(true);
      }
    }
  }, [searchParams, enquiries]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      setActionLoading(true);
      const res = await api.updateEnquiryStatus(enquiryId, { status: newStatus });
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === enquiryId ? res.data : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
          setSelectedEnquiry(res.data);
        }
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedEnquiry) return;

    try {
      setActionLoading(true);
      const res = await api.updateEnquiryStatus(selectedEnquiry._id, {
        note: noteText.trim(),
      });
      if (res.success) {
        setSelectedEnquiry(res.data);
        setEnquiries((prev) =>
          prev.map((item) => (item._id === res.data._id ? res.data : item))
        );
        setNoteText("");
      }
    } catch (err) {
      alert("Failed to add note: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (enquiryId) => {
    if (!window.confirm("Are you sure you want to permanently delete this transmission record?")) {
      return;
    }

    try {
      const res = await api.deleteEnquiry(enquiryId);
      if (res.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== enquiryId));
        if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
          setIsDetailOpen(false);
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      alert("Failed to delete enquiry: " + err.message);
    }
  };

  const handleExportCsv = () => {
    const token = localStorage.getItem("skywardens_admin_token");
    window.open(`${api.exportEnquiriesCsvUrl()}?token=${token}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Procurement &amp; Liaison Transmissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Store, audit, and track institutional buyer inquiries submitted through the portal.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="admin-btn-secondary text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-sky-400" />
          <span>Export Transmissions CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-normal transition-all whitespace-nowrap bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
          >
            All Enquiries
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, company, email..."
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

      {/* Enquiries Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <LoadingSpinner size="md" text="Loading transmissions..." />
        ) : enquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#040814] text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Ref ID</th>
                  <th className="px-6 py-3.5">Liaison Contact</th>
                  <th className="px-6 py-3.5">Organization</th>
                  <th className="px-6 py-3.5">Interest Domain</th>
                  <th className="px-6 py-3.5">Country</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Logged Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => {
                      setSelectedEnquiry(item);
                      setIsDetailOpen(true);
                    }}
                    className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-sky-400 text-xs">
                      {item.referenceId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{item.fullName}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">
                      {item.company}
                    </td>
                    <td className="px-6 py-4 text-slate-400 max-w-[180px] truncate">
                      {item.areaOfInterest}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{item.country}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${
                          item.status === "New"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : item.status === "In Progress"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : item.status === "Contacted"
                            ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                            : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className="px-6 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedEnquiry(item);
                            setIsDetailOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                          title="Delete Record"
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
          <div className="p-12 text-center text-slate-500 text-xs">
            No procurement transmissions found matching current filter criteria.
          </div>
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedEnquiry(null);
        }}
        title={`Enquiry Details — ${selectedEnquiry?.referenceId || ""}`}
        maxWidth="max-w-3xl"
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            {/* Top Quick Status & Actions */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400">
                  Current Status:
                </span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiry._id, e.target.value)
                  }
                  disabled={actionLoading}
                  className="bg-[#050b18] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-sky-400"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="text-xs text-slate-400">
                Received: {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Contact Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#050b18] border border-white/5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span>Full Name</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {selectedEnquiry.fullName}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#050b18] border border-white/5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-sky-400" />
                  <span>Organization</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {selectedEnquiry.company}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#050b18] border border-white/5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>Liaison Email</span>
                </div>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-sm text-sky-400 hover:underline font-medium"
                >
                  {selectedEnquiry.email}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-[#050b18] border border-white/5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Contact Number</span>
                </div>
                <div className="text-sm font-medium text-slate-200">
                  {selectedEnquiry.phone || "N/A"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#050b18] border border-white/5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Location</span>
                </div>
                <div className="text-sm text-slate-200">
                  {selectedEnquiry.city ? `${selectedEnquiry.city}, ` : ""}
                  {selectedEnquiry.country}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#050b18] border border-white/5 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-sky-400" />
                  <span>Area of Interest</span>
                </div>
                <div className="text-sm text-sky-300 font-medium">
                  {selectedEnquiry.areaOfInterest}
                </div>
              </div>
            </div>

            {/* Transmission Message */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Transmission Requirements Message:
              </label>
              <div className="p-4 rounded-xl bg-[#030612] border border-white/10 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Audit Notes & Action Log */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Internal Audit Notes &amp; Action Log</span>
              </h4>

              {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {selectedEnquiry.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="text-sky-400 font-semibold">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  No internal notes recorded yet.
                </div>
              )}

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Append internal operational note..."
                  className="admin-input text-xs flex-1"
                />
                <button
                  type="submit"
                  disabled={actionLoading || !noteText.trim()}
                  className="admin-btn-primary text-xs shrink-0 px-4"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Note</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
