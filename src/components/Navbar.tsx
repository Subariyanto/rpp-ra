import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  Heart,
  Award,
  Building2,
  KeyRound,
  LogOut,
  UserCheck,
  ChevronDown,
  FileText,
  FolderKanban,
  Flame,
  LayoutDashboard
} from 'lucide-react';
import { UserSession } from '../types';

export type NavTabType =
  | 'dashboard'
  | 'my-modules'
  | 'classroom'
  | 'assessment'
  | 'bank-topics'
  | 'guide'
  | 'madrasah'
  | 'infografis';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  onNewGeneratorClick: () => void;
  hasApiKey: boolean;
  userSession: UserSession | null;
  onLogout: () => void;
  onOpenActivationManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewGeneratorClick,
  userSession,
  onLogout,
  onOpenActivationManager,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'kelas' | 'kbc' | 'settings' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = userSession?.role === 'admin' || userSession?.activationCode.includes('ADMIN');

  const handleSelectTab = (tab: NavTabType) => {
    setActiveTab(tab);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs print:hidden transition-all">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* 1. Logo & Brand */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
            onClick={() => handleSelectTab('dashboard')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/30 transition-all duration-200">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="hidden min-[420px]:block">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">RPP RA</span>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-200/80">
                  KMA 1503
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                Integrasi PM & KBC
              </p>
            </div>
          </div>

          {/* 2. Main Navigation Bar (Clean & Elegant) */}
          <nav ref={navRef} className="hidden lg:flex items-center space-x-1">
            {/* Tab 1: Dashboard (NEW) */}
            <button
              onClick={() => handleSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* Tab 2: Modul Ajar Saya */}
            <button
              onClick={() => handleSelectTab('my-modules')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'my-modules'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Modul Saya</span>
            </button>

            {/* Tab 3: Dropdown Pengelolaan Kelas & Siswa */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'kelas' ? null : 'kelas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'classroom' || activeTab === 'assessment'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kelas & Siswa</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${openDropdown === 'kelas' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'kelas' && (
                <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleSelectTab('classroom')}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                      activeTab === 'classroom' ? 'text-emerald-800 bg-emerald-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-1.5 bg-emerald-100/80 rounded-lg text-emerald-800 shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="block font-bold">Data Kelas & Presensi</div>
                      <div className="text-[10px] text-slate-400 font-normal">Absensi & daftar murid RA</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('assessment')}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                      activeTab === 'assessment' ? 'text-emerald-800 bg-emerald-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-1.5 bg-amber-100/80 rounded-lg text-amber-800 shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="block font-bold">Asesmen Perkembangan CP</div>
                      <div className="text-[10px] text-slate-400 font-normal">Penilaian & narasi rapor anak</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Tab 4: Dropdown Referensi & KBC */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'kbc' ? null : 'kbc')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'bank-topics' || activeTab === 'guide'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Referensi KBC</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${openDropdown === 'kbc' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'kbc' && (
                <div className="absolute left-0 mt-2 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleSelectTab('bank-topics')}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                      activeTab === 'bank-topics' ? 'text-emerald-800 bg-emerald-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-1.5 bg-rose-100/80 rounded-lg text-rose-800 shrink-0">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="block font-bold">Bank Topik KBC RA</div>
                      <div className="text-[10px] text-slate-400 font-normal">Inspirasi topik & subtopik pilihan</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectTab('guide')}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                      activeTab === 'guide' ? 'text-emerald-800 bg-emerald-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-1.5 bg-emerald-100/80 rounded-lg text-emerald-800 shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="block font-bold">Panduan KMA 1503</div>
                      <div className="text-[10px] text-slate-400 font-normal">Regulasi & kurikulum RA</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Tab 5: Dropdown Pengaturan RA & Admin */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'settings' ? null : 'settings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'madrasah'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Pengaturan</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${openDropdown === 'settings' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'settings' && (
                <div className="absolute left-0 mt-2 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleSelectTab('madrasah')}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all cursor-pointer ${
                      activeTab === 'madrasah' ? 'text-emerald-800 bg-emerald-50 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-1.5 bg-emerald-100/80 rounded-lg text-emerald-800 shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="block font-bold">Profil Data RA & Yayasan</div>
                      <div className="text-[10px] text-slate-400 font-normal">NPSN, Alamat, Kop RPP & Kepala</div>
                    </div>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setOpenDropdown(null);
                        onOpenActivationManager();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 hover:bg-amber-50 text-amber-900 border-t border-slate-100 mt-1 transition-all cursor-pointer"
                    >
                      <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 shrink-0">
                        <KeyRound className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="block font-bold">Kelola Kode Aktivasi</div>
                        <div className="text-[10px] text-amber-700 font-normal">Khusus Admin Aplikasi</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right Action Controls (Buat RPP, Infografis & Brosur, Username/Admin, Tombol Keluar) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* CTA Button: Buat RPP */}
            <button
              onClick={onNewGeneratorClick}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Buat RPP</span>
            </button>

            {/* Infografis & Brosur Promosi */}
            <button
              onClick={() => handleSelectTab('infografis')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                activeTab === 'infografis'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25'
                  : 'text-amber-900 bg-amber-50 hover:bg-amber-100/90 border border-amber-300'
              }`}
              title="Infografis & Brosur Pemesanan Resmi (Promo Rp. 100.000,-)"
            >
              <Flame className={`w-3.5 h-3.5 ${activeTab === 'infografis' ? 'text-white' : 'text-amber-600'}`} />
              <span className="hidden xl:inline">Infografis & Brosur</span>
              <span className="xl:hidden">Brosur</span>
              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter ${
                activeTab === 'infografis' ? 'bg-white text-amber-600' : 'bg-amber-400 text-emerald-950'
              }`}>
                Rp 100rb
              </span>
            </button>

            {/* User Profile Pill & Logout (Dipindah ke Paling Kanan) */}
            {userSession && (
              <div className="flex items-center space-x-1 bg-slate-50 pl-2.5 pr-1 py-1 rounded-xl border border-slate-200/80 text-xs shrink-0">
                <div className="hidden sm:flex items-center space-x-1.5 mr-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="font-bold text-slate-800 block truncate max-w-[90px] md:max-w-[120px]">
                      {userSession.namaLengkap}
                    </span>
                    <span className="text-[9px] text-emerald-700 font-semibold font-mono block">
                      {isAdmin ? '🔑 Admin App' : '✨ Lisensi Aktif'}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="px-2 py-1 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                  title="Keluar / Ganti Akun Pengguna"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar (Clean Horizontal Scrollable Tabs) */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1.5 border-t border-slate-200/80 no-scrollbar">
          <button
            onClick={() => handleSelectTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => handleSelectTab('my-modules')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'my-modules' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <FolderKanban className="w-3 h-3" />
            <span>Modul Saya</span>
          </button>
          <button
            onClick={() => handleSelectTab('classroom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'classroom' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Kelas & Murid</span>
          </button>
          <button
            onClick={() => handleSelectTab('assessment')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'assessment' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Award className="w-3 h-3" />
            <span>Asesmen CP</span>
          </button>
          <button
            onClick={() => handleSelectTab('bank-topics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'bank-topics' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Heart className="w-3 h-3" />
            <span>Bank Topik</span>
          </button>
          <button
            onClick={() => handleSelectTab('guide')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'guide' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Panduan KBC</span>
          </button>
          <button
            onClick={() => handleSelectTab('madrasah')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'madrasah' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Data RA</span>
          </button>
          <button
            onClick={() => handleSelectTab('infografis')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              activeTab === 'infografis' ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Brosur Rp 100rb</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => {
                onOpenActivationManager();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-amber-100 text-amber-900 border border-amber-300 flex items-center space-x-1 cursor-pointer"
            >
              <KeyRound className="w-3 h-3" />
              <span>Kode Aktivasi</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
