import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Menu, LogOut, AlertTriangle } from "lucide-react";
import Modal from "../common/Modal";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  return (
    <>
      <header className="h-20 bg-[#040814]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Mobile Toggle & Status */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right: User Profile & Logout */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_12px_rgba(56,189,248,0.35)] ring-1 ring-white/20">
              {user?.fullName?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white tracking-normal leading-tight">
                {user?.fullName || "Command Admin"}
              </div>
              <div className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                {user?.email || "admin@skywardens.com"}
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block" />

          <button
            onClick={() => setShowLogoutConfirm(true)}
            title="Sign Out of Session"
            className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-b from-rose-500/[0.08] to-rose-950/[0.22] hover:from-rose-500/[0.18] hover:to-rose-900/[0.38] text-rose-200 hover:text-white border border-rose-500/25 hover:border-rose-400/50 shadow-[0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_20px_rgba(244,63,94,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] text-xs font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-300 group-hover:text-rose-100 transition-transform duration-200 group-hover:translate-x-0.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Sign Out Confirmation Modal */}
      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Sign Out"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Are you sure you want to sign out?
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                You will be signed out of your current administration session. You'll need to enter your credentials again to log back in.
              </p>
            </div>
          </div>

          {/* Current Officer Details */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 flex items-center justify-center font-bold text-[11px]">
                {user?.fullName?.charAt(0) || "A"}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white leading-tight">
                  {user?.fullName || "Command Admin"}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {user?.email || "admin@skywardens.com"}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-sky-500/15 border border-sky-500/30 text-sky-300">
              Admin
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-all cursor-pointer active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Yes, Sign Out</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

