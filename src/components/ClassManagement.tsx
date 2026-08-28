import React, { useState } from 'react';
import { MuridRA, PresensiAnak } from '../types';
import { Users, UserPlus, CheckCircle2, Clock, Smile, Meh, Frown, Heart, Calendar, Search, Filter, Trash2, Edit3, Save, X } from 'lucide-react';

interface ClassManagementProps {
  muridList: MuridRA[];
  presensiList: PresensiAnak[];
  onAddMurid: (murid: MuridRA) => void;
  onUpdateMurid: (murid: MuridRA) => void;
  onDeleteMurid: (id: string) => void;
  onSavePresensi: (presensi: PresensiAnak) => void;
}

export const ClassManagement: React.FC<ClassManagementProps> = ({
  muridList,
  presensiList,
  onAddMurid,
  onUpdateMurid,
  onDeleteMurid,
  onSavePresensi,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'presensi' | 'murid'>('presensi');
  const [selectedTanggal, setSelectedTanggal] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKelompok, setFilterKelompok] = useState<string>('Semua');

  // Modal State Tambah Murid
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNamaLengkap, setNewNamaLengkap] = useState('');
  const [newNamaPanggilan, setNewNamaPanggilan] = useState('');
  const [newKelompok, setNewKelompok] = useState<'RA A' | 'RA B' | 'KB'>('RA B');
  const [newJenisKelamin, setNewJenisKelamin] = useState<'L' | 'P'>('L');
  const [newNis, setNewNis] = useState('');
  const [newNamaOrangTua, setNewNamaOrangTua] = useState('');

  const filteredMurid = muridList.filter((m) => {
    const matchesSearch =
      m.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.namaPanggilan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nis.includes(searchQuery);
    const matchesKelompok = filterKelompok === 'Semua' || m.kelompok === filterKelompok;
    return matchesSearch && matchesKelompok;
  });

  const getPresensiForMurid = (muridId: string) => {
    return presensiList.find(
      (p) => p.muridId === muridId && p.tanggal === selectedTanggal
    ) || {
      id: `p-${muridId}-${selectedTanggal}`,
      tanggal: selectedTanggal,
      muridId,
      status: 'Hadir',
      emosiPagi: 'Senang',
      catatanKarakterKBC: '',
    };
  };

  const handleStatusChange = (muridId: string, status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa') => {
    const current = getPresensiForMurid(muridId);
    onSavePresensi({ ...current, status });
  };

  const handleEmosiChange = (muridId: string, emosiPagi: 'Senang' | 'Semangat' | 'Sedih' | 'Mengantuk' | 'Malu') => {
    const current = getPresensiForMurid(muridId);
    onSavePresensi({ ...current, emosiPagi });
  };

  const handleCatatanChange = (muridId: string, catatanKarakterKBC: string) => {
    const current = getPresensiForMurid(muridId);
    onSavePresensi({ ...current, catatanKarakterKBC });
  };

  const handleTambahMuridSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNamaLengkap || !newNamaPanggilan) return;

    const newStudent: MuridRA = {
      id: `m-${Date.now()}`,
      namaLengkap: newNamaLengkap,
      namaPanggilan: newNamaPanggilan,
      kelompok: newKelompok,
      jenisKelamin: newJenisKelamin,
      nis: newNis || `${Math.floor(1000000 + Math.random() * 9000000)}`,
      namaOrangTua: newNamaOrangTua || 'Orang Tua Murid',
      avatar: newJenisKelamin === 'L' 
        ? 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1595454810237-7f99990b7904?w=150&auto=format&fit=crop&q=80',
    };

    onAddMurid(newStudent);
    setIsModalOpen(false);
    setNewNamaLengkap('');
    setNewNamaPanggilan('');
    setNewNis('');
    setNewNamaOrangTua('');
  };

  // Presensi Summary Metrics for today
  const todayPresensi = presensiList.filter((p) => p.tanggal === selectedTanggal);
  const totalHadir = todayPresensi.filter((p) => p.status === 'Hadir').length;
  const totalIzin = todayPresensi.filter((p) => p.status === 'Izin').length;
  const totalSakit = todayPresensi.filter((p) => p.status === 'Sakit').length;
  const totalSemangat = todayPresensi.filter((p) => p.emosiPagi === 'Semangat' || p.emosiPagi === 'Senang').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Sub-Tabs */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-emerald-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-800/40">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-md">
              Interaktif Kelas RA
            </span>
            <span className="text-xs text-emerald-200/90">• Presensi & Jurnal Harian</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold mt-2 tracking-tight">
            Manajemen Kelas & Murid Raudhatul Athfal
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
            Catat kehadiran, pantau emosi/mood anak di pagi hari, serta simpan jurnal catatan karakter KBC secara real-time.
          </p>
        </div>

        <div className="flex items-center bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md">
          <button
            onClick={() => setActiveSubTab('presensi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'presensi'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            Presensi & Mood Pagi
          </button>
          <button
            onClick={() => setActiveSubTab('murid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'murid'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            Daftar Murid ({muridList.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'presensi' ? (
        <div className="space-y-5">
          {/* Controls & Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Tanggal Presensi</p>
                <input
                  type="date"
                  value={selectedTanggal}
                  onChange={(e) => setSelectedTanggal(e.target.value)}
                  className="font-bold text-slate-800 text-sm bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 mt-1 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Hadir Hari Ini</p>
                <p className="text-2xl font-black text-emerald-700 mt-0.5">{totalHadir} Anak</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Izin / Sakit</p>
                <p className="text-2xl font-black text-amber-600 mt-0.5">{totalIzin + totalSakit} Anak</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Anak Ceria & Semangat</p>
                <p className="text-2xl font-black text-rose-600 mt-0.5">{totalSemangat} Anak</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-500">
                <Heart className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Table Presensi & Mood Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <Smile className="w-4 h-4 text-emerald-600" />
                <span>Lembar Presensi & Mood Pagi ({selectedTanggal})</span>
              </h2>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari murid..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <select
                  value={filterKelompok}
                  onChange={(e) => setFilterKelompok(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Semua">Semua Kelompok</option>
                  <option value="RA A">RA Kelompok A</option>
                  <option value="RA B">RA Kelompok B</option>
                  <option value="KB">Kelompok Bermain (KB)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-3">Siswa RA</th>
                    <th className="p-3">Status Kehadiran</th>
                    <th className="p-3">Emosi / Mood Pagi</th>
                    <th className="p-3">Jurnal Karakter & Kejadian Penting KBC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMurid.map((m) => {
                    const presensi = getPresensiForMurid(m.id);
                    return (
                      <tr key={m.id} className="hover:bg-emerald-50/30 transition-all">
                        {/* Student Info */}
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={m.avatar}
                              alt={m.namaPanggilan}
                              className="w-9 h-9 rounded-full object-cover border border-emerald-200"
                            />
                            <div>
                              <p className="font-bold text-slate-800">{m.namaLengkap}</p>
                              <p className="text-[10px] text-slate-500">
                                {m.kelompok} • NIS: {m.nis}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Status Radio Buttons */}
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5">
                            {(['Hadir', 'Izin', 'Sakit', 'Alpa'] as const).map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => handleStatusChange(m.id, st)}
                                className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition-all ${
                                  presensi.status === st
                                    ? st === 'Hadir'
                                      ? 'bg-emerald-600 text-white'
                                      : st === 'Izin'
                                      ? 'bg-amber-500 text-white'
                                      : st === 'Sakit'
                                      ? 'bg-purple-600 text-white'
                                      : 'bg-rose-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </td>

                        {/* Emosi Selector */}
                        <td className="p-3">
                          <div className="flex items-center space-x-1">
                            {(
                              [
                                { key: 'Semangat', emoji: '🤩' },
                                { key: 'Senang', emoji: '😊' },
                                { key: 'Sedih', emoji: '🥺' },
                                { key: 'Mengantuk', emoji: '🥱' },
                              ] as const
                            ).map((item) => (
                              <button
                                key={item.key}
                                type="button"
                                onClick={() => handleEmosiChange(m.id, item.key)}
                                title={item.key}
                                className={`p-1.5 rounded-lg text-sm transition-all ${
                                  presensi.emosiPagi === item.key
                                    ? 'bg-amber-100 border border-amber-300 scale-110 shadow-2xs'
                                    : 'hover:bg-slate-100 opacity-60'
                                }`}
                              >
                                {item.emoji}
                              </button>
                            ))}
                          </div>
                        </td>

                        {/* Catatan Jurnal */}
                        <td className="p-3">
                          <input
                            type="text"
                            value={presensi.catatanKarakterKBC || ''}
                            onChange={(e) => handleCatatanChange(m.id, e.target.value)}
                            placeholder="Catat perilaku KBC / perkembangan positif anak..."
                            className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Sub Tab: Daftar Murid */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Daftar Peserta Didik Raudhatul Athfal</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Murid Baru</span>
            </button>
          </div>

          {/* Grid Student Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredMurid.map((m) => (
              <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={m.avatar}
                      alt={m.namaLengkap}
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-200 shadow-2xs"
                    />
                    <div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {m.kelompok}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{m.namaLengkap}</h3>
                      <p className="text-xs text-slate-500 font-medium">Panggilan: "{m.namaPanggilan}"</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteMurid(m.id)}
                    className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
                    title="Hapus Data Murid"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">NIS / NISN:</span>
                    <span className="font-semibold">{m.nis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jenis Kelamin:</span>
                    <span className="font-semibold">{m.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Orang Tua:</span>
                    <span className="font-semibold">{m.namaOrangTua}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Tambah Murid */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Tambah Data Peserta Didik RA</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTambahMuridSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={newNamaLengkap}
                  onChange={(e) => setNewNamaLengkap(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="misal: Muhammad Al-Fatih"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  value={newNamaPanggilan}
                  onChange={(e) => setNewNamaPanggilan(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="misal: Fatih"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kelompok</label>
                  <select
                    value={newKelompok}
                    onChange={(e: any) => setNewKelompok(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="KB">KB (3-4 Th)</option>
                    <option value="RA A">RA A (4-5 Th)</option>
                    <option value="RA B">RA B (5-6 Th)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={newJenisKelamin}
                    onChange={(e: any) => setNewJenisKelamin(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NIS / Nomor Induk</label>
                <input
                  type="text"
                  value={newNis}
                  onChange={(e) => setNewNis(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="misal: 2025007"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Orang Tua / Wali</label>
                <input
                  type="text"
                  value={newNamaOrangTua}
                  onChange={(e) => setNewNamaOrangTua(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="misal: Bpk. Farhan & Ibu Salma"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs"
                >
                  Simpan Murid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
