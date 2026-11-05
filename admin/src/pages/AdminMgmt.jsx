import React, { useState, useEffect, useMemo } from "react";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import {
  History,
  Search,
  Filter,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Eye,
  Download,
  Calendar,
  Monitor,
  Globe,
  Clock,
  FileText,
} from "lucide-react";

export default function AdminMgmt() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [auditActionFilter, setAuditActionFilter] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAuditLogs();
  }, [auditActionFilter]);

  const showFeedback = (msg, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 6000);
    } else {
      setSuccessMessage(msg);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const params = { limit: 200 };
      if (auditActionFilter !== "ALL") params.action = auditActionFilter;

      const res = await api.getAuditLogs(params);
      if (res.success) {
        setAuditLogs(res.logs || []);
      }
    } catch (err) {
      showFeedback(err.message || "Failed to retrieve security audit logs", true);
    } finally {
      setLoading(false);
    }
  };

  // Filter logs by search term
  const filteredLogs = useMemo(() => {
    if (!searchTerm.trim()) return auditLogs;
    const q = searchTerm.toLowerCase();
    return auditLogs.filter(
      (log) =>
        (log.action && log.action.toLowerCase().includes(q)) ||
        (log.performedByEmail && log.performedByEmail.toLowerCase().includes(q)) ||
        (log.targetUserEmail && log.targetUserEmail.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.toLowerCase().includes(q)) ||
        (log.details && JSON.stringify(log.details).toLowerCase().includes(q))
    );
  }, [auditLogs, searchTerm]);

  // Quick Metrics
  const totalCount = auditLogs.length;
  const successLogins = auditLogs.filter((l) => l.action === "LOGIN_SUCCESS").length;
  const failedLogins = auditLogs.filter((l) => l.action.includes("FAILED")).length;

  const handleExportCsv = () => {
    if (filteredLogs.length === 0) return;
    const headers = ["Timestamp", "Action Event", "Performed By", "Target Account", "IP Address", "Details"];
    const rows = filteredLogs.map((l) => [
      `"${new Date(l.createdAt).toLocaleString()}"`,
      `"${l.action || ""}"`,
      `"${l.performedByEmail || "SYSTEM"}"`,
      `"${l.targetUserEmail || "N/A"}"`,
      `"${l.ipAddress || ""}"`,
      `"${JSON.stringify(l.details || {}).replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `security_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/10 border border-cyan-500/30 text-cyan-400">
              <History className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white font-sans">
              Security Audit Logs
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Immutable security ledger, administrative activity records, and session authentication telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            disabled={filteredLogs.length === 0}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-40"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchAuditLogs}
            title="Refresh Ledger"
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:brightness-110 transition-all font-sans disabled:opacity-60"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
              Total Recorded Events
            </div>
            <div className="text-2xl font-bold text-white mt-1 font-mono">{totalCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <History className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
              Successful Authentications
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono flex items-center gap-2">
              {successLogins}
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-sans">
                Verified
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#050b18]/80 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
              Security Flags / Failed
            </div>
            <div className="text-2xl font-bold text-rose-400 mt-1 font-mono flex items-center gap-2">
              {failedLogins}
              {failedLogins > 0 ? (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase font-sans">
                  Flagged
                </span>
              ) : (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30 uppercase font-sans">
                  Clean
                </span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#050b18]/60 border border-white/10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by actor, target account, IP, action, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#040814] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#040814] border border-white/10 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Event:</span>
            <select
              value={auditActionFilter}
              onChange={(e) => setAuditActionFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-[#050b18]">All Events</option>
              <option value="LOGIN_SUCCESS" className="bg-[#050b18]">LOGIN_SUCCESS</option>
              <option value="LOGIN_FAILED" className="bg-[#050b18]">LOGIN_FAILED</option>
              <option value="ADMIN_CREATED" className="bg-[#050b18]">ADMIN_CREATED</option>
              <option value="ADMIN_UPDATED" className="bg-[#050b18]">ADMIN_UPDATED</option>
              <option value="ADMIN_ACTIVATED" className="bg-[#050b18]">ADMIN_ACTIVATED</option>
              <option value="ADMIN_DEACTIVATED" className="bg-[#050b18]">ADMIN_DEACTIVATED</option>
            </select>
          </div>
        </div>
      </div>

      {/* AUDIT LOGS TABLE VIEW (MATCHES SECOND IMAGE EXACTLY) */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" text="Loading cryptographic audit ledger..." />
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#050b18]/40 border border-white/10">
          <History className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <div className="text-base font-semibold text-white">No Audit Records Matching Filter</div>
          <p className="text-xs text-slate-400 mt-1">Try resetting the filter or search query.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-[#050b18]/80 border border-white/10 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#040814]/80 text-[11px] uppercase tracking-wider font-semibold text-slate-400 font-sans">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Action Event</th>
                  <th className="py-3.5 px-4">Performed By</th>
                  <th className="py-3.5 px-4">Target Account</th>
                  <th className="py-3.5 px-4">IP Address</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-mono">
                {filteredLogs.map((log) => {
                  const isSuccess = log.action.includes("SUCCESS") || log.action.includes("PROVISIONED");
                  const isFailed = log.action.includes("FAILED") || log.action.includes("DEACTIVATED");

                  return (
                    <tr
                      key={log._id || log.createdAt}
                      className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                      onClick={() => setSelectedLog(log)}
                    >
                      {/* Timestamp */}
                      <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>

                      {/* Action Event */}
                      <td className="py-3 px-4 font-sans whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider ${
                            isFailed
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : isSuccess
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>

                      {/* Performed By */}
                      <td className="py-3 px-4 text-slate-200 whitespace-nowrap">
                        {log.performedByEmail || "SYSTEM"}
                      </td>

                      {/* Target Account */}
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {log.targetUserEmail || "N/A"}
                      </td>

                      {/* IP Address */}
                      <td className="py-3 px-4 text-cyan-400/90 text-[11px] whitespace-nowrap">
                        {log.ipAddress || "::1"}
                      </td>

                      {/* Details / View Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLog(log);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 text-[11px] transition-all font-sans"
                        >
                          <Eye className="w-3 h-3 text-cyan-400" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <div>
              Showing <span className="text-white font-mono">{filteredLogs.length}</span> recorded audit entries
            </div>
            <div>Status: Cryptographic Ledger Active</div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR AUDIT LOG ENTRY */}
      <Modal
        isOpen={Boolean(selectedLog)}
        onClose={() => setSelectedLog(null)}
        title="Audit Event Telemetry"
        maxWidth="max-w-xl"
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#040814] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">Action:</span>
                <span className="text-cyan-300 font-bold uppercase">{selectedLog.action}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-200">{new Date(selectedLog.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">Performed By:</span>
                <span className="text-emerald-400">{selectedLog.performedByEmail || "SYSTEM"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">Target Account:</span>
                <span className="text-slate-200">{selectedLog.targetUserEmail || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400">IP Address:</span>
                <span className="text-sky-300">{selectedLog.ipAddress || "::1"}</span>
              </div>
            </div>

            {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-sans">
                  Payload & Device Telemetry
                </div>
                <pre className="p-3.5 rounded-xl bg-[#02050e] border border-white/10 text-slate-300 font-mono text-[11px] overflow-x-auto max-h-60 leading-relaxed">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all font-sans"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
