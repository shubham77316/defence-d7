import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  Inbox,
  Shield,
  Newspaper,
  Building2,
  ArrowRight,
  ArrowUpRight,
  Sliders,
  Globe,
  Radio,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.getDashboardStats();
      if (res?.success && res.data) {
        setStats(res.data);
      } else if (res?.data) {
        setStats(res.data);
      } else if (res) {
        setStats(res);
      }
    } catch (err) {
      setError(err.message || "Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <LoadingSpinner size="lg" text="Retrieving live CMS metrics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 max-w-xl mx-auto my-12">
        <h3 className="font-bold text-sm">Failed to connect to backend service</h3>
        <p className="text-xs mt-1.5 text-red-300">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold uppercase tracking-wider font-mono"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const { enquiries, products, news, partners, recentEnquiries } = stats || {};

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header with Breadcrumb & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">
              Command Intelligence Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Strategic Command Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time metrics, dynamic content management, and procurement liaison telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/enquiries"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-semibold text-xs tracking-normal rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
          >
            <Inbox className="w-4 h-4" />
            <span>Manage Enquiries ({enquiries?.new || 0} New)</span>
          </Link>
        </div>
      </div>

      {/* 2. Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* KPI 1: Enquiries */}
        <div
          onClick={() => navigate("/enquiries")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/enquiries");
            }
          }}
          className="p-5 sm:p-6 rounded-2xl bg-[#060b17]/90 border border-white/10 shadow-xl hover:border-sky-500/50 hover:bg-[#071329] transition-all flex flex-col justify-between cursor-pointer group select-none"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                Procurement Enquiries
              </span>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                <Inbox className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-sky-400 transition-colors">
              {enquiries?.total || 0}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {enquiries?.new || 0} New Unread
            </span>
            <span className="text-slate-400 group-hover:text-sky-400 transition-colors flex items-center gap-1 font-semibold">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* KPI 2: Products / Published Platforms */}
        <div
          onClick={() => navigate("/products")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/products");
            }
          }}
          className="p-5 sm:p-6 rounded-2xl bg-[#060b17]/90 border border-white/10 shadow-xl hover:border-cyan-500/50 hover:bg-[#071329] transition-all flex flex-col justify-between cursor-pointer group select-none"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                Published Platforms
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              {products?.total || 0}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/products?sector=aerospace");
                }}
                className="hover:text-cyan-300 hover:underline transition-colors font-medium"
                title="View Aerospace platforms"
              >
                {products?.aerospace || 0} Aerospace
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/products?sector=defence");
                }}
                className="hover:text-cyan-300 hover:underline transition-colors font-medium"
                title="View Defence platforms"
              >
                {products?.defence || 0} Defence
              </button>
            </span>
            <span className="text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-semibold">
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* KPI 3: News */}
        <div
          onClick={() => navigate("/news")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/news");
            }
          }}
          className="p-5 sm:p-6 rounded-2xl bg-[#060b17]/90 border border-white/10 shadow-xl hover:border-indigo-500/50 hover:bg-[#071329] transition-all flex flex-col justify-between cursor-pointer group select-none"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                Newsroom Articles
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <Newspaper className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
              {news?.total || 0}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Published official briefings</span>
            <span className="text-slate-400 group-hover:text-indigo-400 transition-colors flex items-center gap-1 font-semibold">
              <span>Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* KPI 4: Partners */}
        <div
          onClick={() => navigate("/partners")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/partners");
            }
          }}
          className="p-5 sm:p-6 rounded-2xl bg-[#060b17]/90 border border-white/10 shadow-xl hover:border-amber-500/50 hover:bg-[#071329] transition-all flex flex-col justify-between cursor-pointer group select-none"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                Ecosystem Partners
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors">
              {partners?.total || 0}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>DRDO, CSIR, ISRO &amp; Allied</span>
            <span className="text-slate-400 group-hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold">
              <span>Affiliations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>


      {/* 4. Recent Enquiries Table (Balanced Layout with Horizontal Scroll Protection) */}
      <div className="rounded-2xl border border-white/10 bg-[#060b17]/90 shadow-2xl overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#040814] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Recent Procurement Transmissions
            </h3>
          </div>
          <Link
            to="/enquiries"
            className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table Body */}
        {recentEnquiries && recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[840px]">
              <thead className="bg-[#030610] text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-white/10">
                <tr>
                  <th className="px-6 py-3.5">Tracking ID</th>
                  <th className="px-6 py-3.5">Liaison Contact</th>
                  <th className="px-6 py-3.5">Organization</th>
                  <th className="px-6 py-3.5">Domain</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentEnquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.025] transition-colors">
                    {/* 1. Tracking ID */}
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-sky-400 text-xs">
                      {item.referenceId}
                    </td>

                    {/* 2. Liaison Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-white">{item.fullName}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{item.email}</div>
                    </td>

                    {/* 3. Organization */}
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300 font-medium">
                      {item.company}
                    </td>

                    {/* 4. Domain */}
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                      {item.areaOfInterest}
                    </td>

                    {/* 5. Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
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

                    {/* 6. Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                    </td>

                    {/* 7. Action Button */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        to={`/enquiries?id=${item._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/20 text-xs font-medium transition-all"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-slate-500 text-xs font-sans">
            No procurement transmissions recorded yet. Form submissions from the website will appear here instantly.
          </div>
        )}
      </div>
    </div>
  );
}
