import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldCheck, User, School, Lock, ArrowRight, AlertCircle, PhoneCall, LogIn, UserPlus, Eye, EyeOff, Flame, X, MessageCircle } from 'lucide-react';
import { UserSession, RegisteredUser } from '../types';
import { InfografisPromoView } from './InfografisPromoView';

interface LoginActivationModalProps {
  onLoginSuccess: (session: UserSession) => void;
  validKeys: string[];
  onOpenInfografis?: () => void;
}

export const LoginActivationModal: React.FC<LoginActivationModalProps> = ({
  onLoginSuccess,
  validKeys,
  onOpenInfografis,
}) => {
  const [showInfografisModal, setShowInfografisModal] = useState(false);

  // Load registered users from localStorage
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = localStorage.getItem('rpp_ra_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Initial seed users if empty
    const seed = [
      {
        username: 'guru_ra',
        password: '123',
        namaLengkap: 'Ustadzah Fatimah, S.Pd.I',
        namaRA: 'RA Mutiara Cinta',
        activationCode: 'RA-UTAMA-2025',
        role: 'user',
        createdAt: new Date().toISOString(),
      },
      {
        username: 'admin',
        password: '@riyant1970',
        namaLengkap: 'Administrator KMA 1503',
        namaRA: 'RA Mutiara Cinta',
        activationCode: 'ADMIN-RA-2025',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    ];

    if (saved) {
      try {
        const parsed: RegisteredUser[] = JSON.parse(saved);
        // Ensure admin user has updated password @riyant1970
        return parsed.map((u) => (u.username === 'admin' ? { ...u, password: '@riyant1970' } : u));
      } catch (e) {
        console.error(e);
      }
    }
    return seed;
  });

  // Check if device is already activated once
  const [isDeviceActivated, setIsDeviceActivated] = useState<boolean>(() => {
    return localStorage.getItem('rpp_ra_device_activated') === 'true' || registeredUsers.length > 0;
  });

  // Mode: 'login' (Username & Password) or 'activate' (Aktivasi 1x + Buat Password)
  const [activeTab, setActiveTab] = useState<'login' | 'activate'>(() => {
    return isDeviceActivated ? 'login' : 'activate';
  });

  // Form states for Login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states for Activation / Registration
  const [namaLengkap, setNamaLengkap] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [namaRA, setNamaRA] = useState('');
  const [activationCode, setActivationCode] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync registered users & device activated flag to localStorage
  useEffect(() => {
    localStorage.setItem('rpp_ra_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Master keys default
  const masterAdminKeys = ['ADMIN-RA-2025', 'KBC-SUPER-2025', 'SUBARIYANTO-ADMIN'];
  const defaultUserKeys = ['RA-KBC-2025', 'GURU-RA-BERKAH', 'MODUL-RA-2025'];

  // Handle Login (Username & Password)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUsername = loginUsername.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    if (!cleanUsername || !cleanPassword) {
      setErrorMsg('Silakan masukkan Username dan Password Anda.');
      return;
    }

    // Find registered user
    const foundUser = registeredUsers.find(
      (u) => u.username.toLowerCase() === cleanUsername && u.password === cleanPassword
    );

    // Fallback master admin login
    const isMasterAdmin =
      cleanUsername === 'admin' &&
      (cleanPassword === '@riyant1970' || cleanPassword === 'admin123' || cleanPassword === 'SUBARIYANTO-ADMIN');

    if (foundUser || isMasterAdmin) {
      const session: UserSession = {
        username: foundUser ? foundUser.username : 'admin',
        namaLengkap: foundUser ? foundUser.namaLengkap : 'Administrator KMA 1503',
        namaRA: foundUser ? foundUser.namaRA : 'RA Kurikulum Merdeka',
        activationCode: foundUser ? foundUser.activationCode : 'ADMIN-RA-2025',
        activatedAt: new Date().toISOString(),
        role: foundUser ? foundUser.role : 'admin',
      };

      localStorage.setItem('rpp_ra_device_activated', 'true');
      onLoginSuccess(session);
    } else {
      setErrorMsg('Username atau Password yang Anda masukkan tidak cocok. Silakan coba lagi.');
    }
  };

  // Handle Activation & Registration (Aktivasi 1x)
  const handleActivationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanCode = activationCode
      .trim()
      .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-')
      .replace(/\s+/g, '')
      .toUpperCase();

    const cleanUsername = regUsername.trim().toLowerCase().replace(/\s+/g, '_');
    const cleanPassword = regPassword.trim();

    if (!namaLengkap.trim()) {
      setErrorMsg('Silakan masukkan Nama Lengkap Anda.');
      return;
    }

    if (!cleanUsername) {
      setErrorMsg('Silakan tentukan Username untuk akun Anda.');
      return;
    }

    if (!cleanPassword || cleanPassword.length < 3) {
      setErrorMsg('Silakan buat Password minimal 3 karakter.');
      return;
    }

    if (!cleanCode) {
      setErrorMsg('Silakan masukkan Kode Aktivasi dari Admin.');
      return;
    }

    // Check if username is already registered
    const exists = registeredUsers.some((u) => u.username.toLowerCase() === cleanUsername);
    if (exists) {
      setErrorMsg(`Username "${cleanUsername}" sudah terdaftar. Gunakan menu Masuk Akun atau pilih Username lain.`);
      return;
    }

    // Validasi Kode Aktivasi
    const isAdmin = masterAdminKeys.includes(cleanCode);
    const isKnownKey =
      isAdmin ||
      defaultUserKeys.includes(cleanCode) ||
      validKeys
        .map((k) => k.replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-').replace(/\s+/g, '').toUpperCase())
        .includes(cleanCode);

    const isFormattedKey =
      cleanCode.length >= 4 &&
      (cleanCode.startsWith('RA-') ||
        cleanCode.startsWith('GURU-') ||
        cleanCode.startsWith('KBC-') ||
        cleanCode.startsWith('MODUL-') ||
        cleanCode.startsWith('ADMIN-') ||
        cleanCode.startsWith('SEKOLAH-') ||
        cleanCode.includes('2025') ||
        cleanCode.includes('2026'));

    const isValid = isKnownKey || isFormattedKey;

    if (isValid) {
      const newUser: RegisteredUser = {
        username: cleanUsername,
        password: cleanPassword,
        namaLengkap: namaLengkap.trim(),
        namaRA: namaRA.trim() || 'RA Kurikulum Merdeka',
        activationCode: cleanCode,
        role: isAdmin ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('rpp_ra_registered_users', JSON.stringify(updatedUsers));
      localStorage.setItem('rpp_ra_device_activated', 'true');
      setIsDeviceActivated(true);

      const session: UserSession = {
        username: newUser.username,
        namaLengkap: newUser.namaLengkap,
        namaRA: newUser.namaRA,
        activationCode: newUser.activationCode,
        activatedAt: newUser.createdAt,
        role: newUser.role,
      };

      onLoginSuccess(session);
    } else {
      setErrorMsg('Kode Aktivasi tidak valid. Mohon periksa kembali atau hubungi Admin untuk mendapatkan Kode Aktivasi.');
    }
  };

  const handleWhatsAppRequest = () => {
    const text = encodeURIComponent(
      `Assalamu'alaikum Admin, saya ${namaLengkap || '[Nama Saya]'} dari ${namaRA || '[Nama RA]'} ingin mengajukan Kode Aktivasi / Pembelian Aplikasi Generator RPP & Modul Ajar RA KBC KMA 1503 dengan harga promo Rp. 100.000,-.`
    );
    window.open(`https://wa.me/6282330647698?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6 flex min-h-full items-center justify-center">
      {/* Full Infografis Modal Popup if triggered */}
      {showInfografisModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex justify-center">
          <div className="bg-slate-50 rounded-3xl max-w-5xl w-full my-auto shadow-2xl border border-slate-700 overflow-hidden relative">
            <div className="sticky top-0 z-20 bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-sm sm:text-base">Infografis & Brosur Resmi Aplikasi RPP RA KBC</span>
              </div>
              <button
                onClick={() => setShowInfografisModal(false)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all"
                title="Tutup Infografis"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-8 max-h-[85vh] overflow-y-auto">
              <InfografisPromoView
                onBackToApp={() => setShowInfografisModal(false)}
                isInsideModal={true}
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-md w-full my-auto overflow-hidden transition-all max-h-[92vh] flex flex-col">
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 p-5 sm:p-6 text-white relative overflow-hidden shrink-0">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center space-y-1.5">
            <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Aplikasi RPP RA Kurikulum Merdeka</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {activeTab === 'login' ? 'Masuk Aplikasi' : 'Aktivasi & Daftar Akun'}
            </h1>
            <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xs mx-auto">
              {activeTab === 'login'
                ? 'Aplikasi telah diaktivasi. Masukkan Username dan Password Anda.'
                : 'Aktivasi cukup 1x per akun. Buat Password untuk login berikutnya.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'login'
                ? 'bg-white text-emerald-900 shadow-2xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-700" />
            <span>Masuk (Login)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('activate');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'activate'
                ? 'bg-white text-emerald-900 shadow-2xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-600" />
            <span>Aktivasi Akun Baru</span>
          </button>
        </div>

        {/* Form Content (Scrollable) */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-300 text-rose-900 p-3.5 rounded-2xl flex items-start space-x-2.5 text-xs animate-in shake duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN (Username & Password) */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Username / Email</span>
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                  placeholder="contoh: guru_ra atau fatimah"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 pr-10"
                    placeholder="Masukkan Password Anda"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm active:scale-98"
              >
                <LogIn className="w-4 h-4 text-emerald-200" />
                <span>Masuk Aplikasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('activate');
                    setErrorMsg('');
                  }}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
                >
                  Aktivasi Akun Baru / Perangkat Lain dengan Kode Aktivasi
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ACTIVATION & REGISTRATION */}
          {activeTab === 'activate' && (
            <form onSubmit={handleActivationSubmit} className="space-y-4">
              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed font-medium">
                💡 Aktivasi hanya dilakukan <strong>1 kali</strong> per akun/HP. Tentukan Username & Password yang mudah Anda ingat.
              </div>

              {/* Nama Lengkap Guru */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Nama Lengkap Pengguna / Guru</span>
                </label>
                <input
                  type="text"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                  placeholder="misal: Ustadzah Fatimah, S.Pd.I"
                />
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Username Akun
                  </label>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    placeholder="misal: fatimah"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* Nama RA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <School className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Nama Raudhatul Athfal (RA)</span>
                </label>
                <input
                  type="text"
                  value={namaRA}
                  onChange={(e) => setNamaRA(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                  placeholder="misal: RA Mutiara Cinta Al-Azhar"
                />
              </div>

              {/* Kode Aktivasi */}
              <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/90 space-y-2">
                <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center space-x-1.5">
                  <KeyRound className="w-4 h-4 text-amber-700" />
                  <span>Kode Aktivasi Aplikasi (1x Pakai)</span>
                </label>
                <input
                  type="text"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  required
                  className="w-full px-3.5 py-2.5 text-sm font-black tracking-wider uppercase border border-amber-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder:normal-case placeholder:font-normal shadow-2xs"
                  placeholder="Masukkan Kode Aktivasi dari Admin"
                />
                <p className="text-[11px] text-amber-800 font-medium italic">
                  *Aktivasi ini akan mendaftarkan akun Anda secara permanen di browser ini.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm active:scale-98"
              >
                <Lock className="w-4 h-4 text-emerald-200" />
                <span>Aktivasi Akun & Masuk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold underline"
                >
                  Sudah pernah aktivasi? Masuk dengan Username & Password
                </button>
              </div>
            </form>
          )}

          {/* Hubungi Admin & Infografis Section */}
          <div className="pt-3 border-t border-slate-100 text-center space-y-2">
            <button
              type="button"
              onClick={() => {
                if (onOpenInfografis) {
                  onOpenInfografis();
                } else {
                  setShowInfografisModal(true);
                }
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xs"
            >
              <Flame className="w-4 h-4 text-amber-200" />
              <span>Lihat Infografis & Brosur Keunggulan Aplikasi</span>
            </button>

            <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/90 text-center space-y-1.5">
              <div className="flex items-center justify-center space-x-1.5">
                <span className="text-[11px] text-emerald-900 font-medium">
                  Belum punya Kode Aktivasi?
                </span>
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  Promo: Rp. 100.000,-
                </span>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppRequest}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                <span>Pesan Kode via WA: 082330647698</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-100 text-center shrink-0">
          <p className="text-[11px] text-slate-500 font-medium">
            KMA 1503 Tahun 2025 • Kurikulum Merdeka RA & KBC Integratif • CS: 082330647698
          </p>
        </div>
      </div>
    </div>
  );
};

