import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { ShieldCheck, User, Lock, Key, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminProfile() {
  const { user, login } = useAuth();

  const [detailsForm, setDetailsForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingDetails, setSavingDetails] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [detailsMsg, setDetailsMsg] = useState({ type: '', text: '' });
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setSavingDetails(true);
    setDetailsMsg({ type: '', text: '' });

    try {
      const res = await authApi.updateDetails(detailsForm);
      setDetailsMsg({ type: 'success', text: 'Administrative profile updated successfully.' });
    } catch (err) {
      console.error(err);
      setDetailsMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update administrative profile.',
      });
    } finally {
      setSavingDetails(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await authApi.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      // Update token in storage and context
      if (res.data?.token) {
        localStorage.setItem('cms_token', res.data.token);
      }

      setPasswordMsg({ type: 'success', text: 'Security credentials renewed successfully.' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      setPasswordMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update security credentials.',
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-mono">
          Commander Profile & Cryptographic Keys
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage root administrative authority, communication email, and authentication credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Details Form */}
        <div className="bg-black/40 border border-white/10 rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded">
              <User size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white font-mono uppercase">
                Officer Identity
              </h2>
              <p className="text-[11px] text-slate-400">Public signature and notification email.</p>
            </div>
          </div>

          {detailsMsg.text && (
            <div
              className={`p-3 rounded text-xs font-mono uppercase flex items-center gap-2 ${
                detailsMsg.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {detailsMsg.type === 'success' ? (
                <CheckCircle size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              <span>{detailsMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateDetails} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Full Designation / Name
              </label>
              <input
                type="text"
                required
                value={detailsForm.name}
                onChange={(e) => setDetailsForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Command Email
              </label>
              <input
                type="email"
                required
                value={detailsForm.email}
                onChange={(e) => setDetailsForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50 font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingDetails}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold uppercase rounded transition-all disabled:opacity-50"
              >
                {savingDetails ? 'Saving...' : 'Update Officer Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-black/40 border border-white/10 rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded">
              <Key size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white font-mono uppercase">
                Passphrase Rotation
              </h2>
              <p className="text-[11px] text-slate-400">
                Salted bcrypt cryptographic key update.
              </p>
            </div>
          </div>

          {passwordMsg.text && (
            <div
              className={`p-3 rounded text-xs font-mono uppercase flex items-center gap-2 ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {passwordMsg.type === 'success' ? (
                <CheckCircle size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Current Passphrase
              </label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                New Passphrase (min 8 chars)
              </label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Confirm New Passphrase
              </label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingPassword}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase rounded transition-all disabled:opacity-50"
              >
                {savingPassword ? 'Encrypting...' : 'Rotate Security Passphrase'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
