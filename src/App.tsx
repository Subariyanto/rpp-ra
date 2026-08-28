import React, { useState, useEffect } from 'react';
import { Navbar, NavTabType } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { RPPGeneratorModal } from './components/RPPGeneratorModal';
import { RPPDetailView } from './components/RPPDetailView';
import { ClassManagement } from './components/ClassManagement';
import { AssessmentView } from './components/AssessmentView';
import { BankTopicsView } from './components/BankTopicsView';
import { GuideKBCView } from './components/GuideKBCView';
import { DataMadrasahView } from './components/DataMadrasahView';
import { LoginActivationModal } from './components/LoginActivationModal';
import { ActivationManagerModal } from './components/ActivationManagerModal';
import { InfografisPromoView } from './components/InfografisPromoView';
import { RPPModulAjar, MuridRA, PresensiAnak, AsesmenHarian, ProfilMadrasah, UserSession, ActivationKey } from './types';
import { SAMPLE_RPP_PRESET, INITIAL_MURID, INITIAL_PRESENSI, INITIAL_ASESMEN, BANK_TOPIK_RA, INITIAL_PROFIL_MADRASAH } from './data/presets';
import { Sparkles, BookOpen, Plus, Search, Trash2, Eye, Printer, Heart, Award, Users, CheckCircle2, Calendar, PhoneCall, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('dashboard');
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [isActivationManagerOpen, setIsActivationManagerOpen] = useState(false);

  // User Auth & Activation Session
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('rpp_ra_auth_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  // Custom Activation Keys List (Admin managed)
  const [activationKeys, setActivationKeys] = useState<ActivationKey[]>(() => {
    const saved = localStorage.getItem('rpp_ra_activation_keys');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        code: 'RA-UTAMA-2025',
        assignedTo: 'RA Mutiara Cinta',
        role: 'user',
        createdAt: '2025-01-15',
        isUsed: false,
        note: 'Lisensi Sekolah Utama',
      },
    ];
  });

  // Sync Auth & Keys to LocalStorage
  useEffect(() => {
    if (userSession) {
      localStorage.setItem('rpp_ra_auth_session', JSON.stringify(userSession));
    } else {
      localStorage.removeItem('rpp_ra_auth_session');
    }
  }, [userSession]);

  useEffect(() => {
    localStorage.setItem('rpp_ra_activation_keys', JSON.stringify(activationKeys));
  }, [activationKeys]);

  // Profil Madrasah & Yayasan
  const [profilMadrasah, setProfilMadrasah] = useState<ProfilMadrasah>(() => {
    const saved = localStorage.getItem('rpp_ra_profil');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROFIL_MADRASAH;
  });

  // States with LocalStorage fallback
  const [modules, setModules] = useState<RPPModulAjar[]>(() => {
    const saved = localStorage.getItem('rpp_ra_modules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [SAMPLE_RPP_PRESET];
  });

  const [murids, setMurids] = useState<MuridRA[]>(() => {
    const saved = localStorage.getItem('rpp_ra_murids');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MURID;
  });

  const [presensis, setPresensis] = useState<PresensiAnak[]>(() => {
    const saved = localStorage.getItem('rpp_ra_presensis');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRESENSI;
  });

  const [asesmens, setAsesmens] = useState<AsesmenHarian[]>(() => {
    const saved = localStorage.getItem('rpp_ra_asesmens');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ASESMEN;
  });

  const [selectedModule, setSelectedModule] = useState<RPPModulAjar | null>(SAMPLE_RPP_PRESET);
  const [searchModule, setSearchModule] = useState('');

  // Delete modal states
  const [deletingModule, setDeletingModule] = useState<RPPModulAjar | null>(null);
  const [deletingMurid, setDeletingMurid] = useState<MuridRA | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('rpp_ra_modules', JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem('rpp_ra_murids', JSON.stringify(murids));
  }, [murids]);

  useEffect(() => {
    localStorage.setItem('rpp_ra_presensis', JSON.stringify(presensis));
  }, [presensis]);

  useEffect(() => {
    localStorage.setItem('rpp_ra_asesmens', JSON.stringify(asesmens));
  }, [asesmens]);

  useEffect(() => {
    localStorage.setItem('rpp_ra_profil', JSON.stringify(profilMadrasah));
  }, [profilMadrasah]);

  // Handlers
  const handleGeneratedModule = (newRpp: RPPModulAjar) => {
    setModules([newRpp, ...modules]);
    setSelectedModule(newRpp);
    setActiveTab('my-modules');
  };

  const handleDeleteModuleClick = (m: RPPModulAjar, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingModule(m);
  };

  const confirmDeleteModule = () => {
    if (!deletingModule) return;
    const targetId = deletingModule.id;
    const updated = modules.filter((m) => m.id !== targetId);
    setModules(updated);
    if (selectedModule?.id === targetId) {
      setSelectedModule(updated[0] || null);
    }
    setDeletingModule(null);
  };

  const handleAddMurid = (newMurid: MuridRA) => {
    setMurids([...murids, newMurid]);
  };

  const handleUpdateMurid = (updatedMurid: MuridRA) => {
    setMurids(murids.map((m) => (m.id === updatedMurid.id ? updatedMurid : m)));
  };

  const handleDeleteMuridClick = (id: string) => {
    const muridToDel = murids.find((m) => m.id === id);
    if (muridToDel) {
      setDeletingMurid(muridToDel);
    } else {
      setMurids(murids.filter((m) => m.id !== id));
    }
  };

  const confirmDeleteMurid = () => {
    if (!deletingMurid) return;
    const targetId = deletingMurid.id;
    setMurids(murids.filter((m) => m.id !== targetId));
    setDeletingMurid(null);
  };

  const handleSavePresensi = (presensiItem: PresensiAnak) => {
    const existingIndex = presensis.findIndex(
      (p) => p.muridId === presensiItem.muridId && p.tanggal === presensiItem.tanggal
    );
    if (existingIndex >= 0) {
      const copy = [...presensis];
      copy[existingIndex] = presensiItem;
      setPresensis(copy);
    } else {
      setPresensis([...presensis, presensiItem]);
    }
  };

  const handleAddAsesmen = (asesmenItem: AsesmenHarian) => {
    setAsesmens([asesmenItem, ...asesmens]);
  };

  const filteredModules = modules.filter(
    (m) =>
      m.identitas.topikUtama.toLowerCase().includes(searchModule.toLowerCase()) ||
      m.identitas.subTopik.toLowerCase().includes(searchModule.toLowerCase()) ||
      m.identitas.namaRA.toLowerCase().includes(searchModule.toLowerCase())
  );

  // Auth & Activation Key Handlers
  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    // Update default guru and RA name if provided in session
    if (session.namaRA) {
      setProfilMadrasah((prev) => ({
        ...prev,
        namaRA: session.namaRA || prev.namaRA,
        namaGuruDefault: session.namaLengkap || prev.namaGuruDefault,
      }));
    }
  };

  const handleLogout = () => {
    setUserSession(null);
  };

  const handleAddActivationKey = (key: ActivationKey) => {
    setActivationKeys([key, ...activationKeys]);
  };

  const handleAddActivationKeys = (keys: ActivationKey[]) => {
    setActivationKeys([...keys, ...activationKeys]);
  };

  const handleDeleteActivationKey = (code: string) => {
    setActivationKeys(activationKeys.filter((k) => k.code !== code));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      {/* If user is not authenticated, show activation login screen */}
      {!userSession && (
        <LoginActivationModal
          onLoginSuccess={handleLoginSuccess}
          validKeys={activationKeys.map((k) => k.code)}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'my-modules' && !selectedModule && modules.length > 0) {
            setSelectedModule(modules[0]);
          }
        }}
        onNewGeneratorClick={() => setIsGeneratorModalOpen(true)}
        hasApiKey={true}
        userSession={userSession}
        onLogout={handleLogout}
        onOpenActivationManager={() => setIsActivationManagerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 0: Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            userSession={userSession}
            profilMadrasah={profilMadrasah}
            modules={modules}
            murids={murids}
            presensis={presensis}
            asesmens={asesmens}
            onOpenGenerator={() => setIsGeneratorModalOpen(true)}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              if (tab === 'my-modules' && !selectedModule && modules.length > 0) {
                setSelectedModule(modules[0]);
              }
            }}
            onSelectModule={(m) => setSelectedModule(m)}
          />
        )}

        {/* Tab 1: Modul Ajar Saya */}
        {activeTab === 'my-modules' && (
          <div className="space-y-6">
            {selectedModule ? (
              <RPPDetailView
                rpp={selectedModule}
                onBack={() => setSelectedModule(null)}
              />
            ) : (
              <div className="space-y-6">
                {/* Hero Header in Modern Deep Emerald */}
                <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden border border-emerald-800/40">
                  <div className="space-y-2.5 max-w-2xl relative z-10">
                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                        Kemenag KMA 1503/2025
                      </span>
                      <span className="text-xs text-emerald-200/90 font-medium">• Kurikulum Merdeka RA</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      Koleksi Modul Ajar / RPP Raudhatul Athfal
                    </h1>
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
                      Merancang pembelajaran RA berstandar Kurikulum Merdeka, Integrasi Kurikulum Berbasis Cinta (KBC), Deep Learning (Mindful, Meaningful, Joyful), dan otomatisasi AI Gemini.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsGeneratorModalOpen(true)}
                    className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 shrink-0 active:scale-95 relative z-10 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Buat RPP Baru AI</span>
                  </button>
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute -left-10 -top-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari topik, sub-topik, atau RA..."
                      value={searchModule}
                      onChange={(e) => setSearchModule(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none text-slate-800 placeholder:text-slate-400 transition-all"
                    />
                  </div>

                  <p className="text-xs text-slate-500 font-medium">
                    Menampilkan <span className="font-bold text-slate-900">{filteredModules.length}</span> Modul Ajar
                  </p>
                </div>

                {/* Grid Modules */}
                {filteredModules.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3 shadow-xs">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                    <p className="font-bold text-slate-700">Belum ada Modul Ajar ditemukan</p>
                    <button
                      onClick={() => setIsGeneratorModalOpen(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Buat RPP Baru dengan AI
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredModules.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:shadow-slate-900/5 hover:border-emerald-500/40 transition-all duration-200 space-y-4 flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200/60">
                              {m.identitas.kelompokUsia}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {m.createdDate}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
                              {m.identitas.topikUtama}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 italic line-clamp-2">
                              "{m.identitas.subTopik}"
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-slate-400">RA:</span>
                              <span className="font-semibold text-slate-800">{m.identitas.namaRA}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Guru:</span>
                              <span className="font-semibold text-slate-800">{m.identitas.namaGuru}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedModule(m)}
                            className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 border border-transparent cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Lihat & Cetak RPP</span>
                          </button>

                          <button
                            onClick={(e) => handleDeleteModuleClick(m, e)}
                            className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-all active:scale-95 cursor-pointer"
                            title="Hapus Modul Ajar"
                          >
                            <Trash2 className="w-4 h-4 text-rose-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Kelas & Presensi */}
        {activeTab === 'classroom' && (
          <ClassManagement
            muridList={murids}
            presensiList={presensis}
            onAddMurid={handleAddMurid}
            onUpdateMurid={handleUpdateMurid}
            onDeleteMurid={handleDeleteMuridClick}
            onSavePresensi={handleSavePresensi}
          />
        )}

        {/* Tab 3: Asesmen Perkembangan */}
        {activeTab === 'assessment' && (
          <AssessmentView
            muridList={murids}
            asesmenList={asesmens}
            onAddAsesmen={handleAddAsesmen}
          />
        )}

        {/* Tab 4: Bank Topik KBC */}
        {activeTab === 'bank-topics' && (
          <BankTopicsView
            topics={BANK_TOPIK_RA}
            onSelectTopicForGenerator={(topik, sub) => {
              setIsGeneratorModalOpen(true);
            }}
          />
        )}

        {/* Tab 5: Panduan KBC */}
        {activeTab === 'guide' && <GuideKBCView />}

        {/* Tab 6: Data Madrasah & Yayasan */}
        {activeTab === 'madrasah' && (
          <DataMadrasahView
            profil={profilMadrasah}
            onSave={(updated) => setProfilMadrasah(updated)}
          />
        )}

        {/* Tab 7: Infografis & Brosur Promo Penjualan */}
        {activeTab === 'infografis' && (
          <InfografisPromoView onBackToApp={() => setActiveTab('my-modules')} />
        )}
      </main>

      {/* RPP AI Generator Modal */}
      <RPPGeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        onGenerated={handleGeneratedModule}
        defaultProfil={profilMadrasah}
      />

      {/* Admin Activation Keys Management Modal */}
      <ActivationManagerModal
        isOpen={isActivationManagerOpen}
        onClose={() => setIsActivationManagerOpen(false)}
        activationKeys={activationKeys}
        onAddKey={handleAddActivationKey}
        onAddKeys={handleAddActivationKeys}
        onDeleteKey={handleDeleteActivationKey}
        currentSession={userSession}
      />

      {/* Modal Konfirmasi Hapus Modul */}
      {deletingModule && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Hapus Modul Ajar?</h3>
                <p className="text-[11px] text-slate-500">Konfirmasi Hapus Data</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus modul ajar <strong className="text-slate-900">"{deletingModule.identitas.topikUtama}"</strong>?
            </p>
            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setDeletingModule(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteModule}
                className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors active:scale-95"
              >
                Ya, Hapus Modul
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus Murid */}
      {deletingMurid && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Hapus Data Murid?</h3>
                <p className="text-[11px] text-slate-500">Konfirmasi Hapus Data</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus data murid <strong className="text-slate-900">"{deletingMurid.namaLengkap}"</strong>?
            </p>
            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setDeletingMurid(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteMurid}
                className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors active:scale-95"
              >
                Ya, Hapus Murid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500 mt-auto print:hidden">
        <p className="font-semibold text-slate-700">
          Aplikasi RPP / Modul Ajar Raudhatul Athfal (RA) Kurikulum Merdeka
        </p>
        <p className="mt-1 text-slate-400">
          Integrasi Kurikulum Berbasis Cinta (KBC) • Deep Learning (Mindful, Meaningful, Joyful) • Standar KMA 1503/2025
        </p>
      </footer>
    </div>
  );
}
