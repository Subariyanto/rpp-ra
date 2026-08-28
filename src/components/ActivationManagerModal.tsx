import React, { useState } from 'react';
import {
  KeyRound,
  Plus,
  Copy,
  Check,
  Trash2,
  UserCheck,
  Sparkles,
  X,
  Send,
  Layers,
  Search,
  CheckCheck,
  Share2,
} from 'lucide-react';
import { ActivationKey, UserSession } from '../types';

interface ActivationManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activationKeys: ActivationKey[];
  onAddKey: (key: ActivationKey) => void;
  onAddKeys?: (keys: ActivationKey[]) => void;
  onDeleteKey: (code: string) => void;
  currentSession: UserSession | null;
}

export const ActivationManagerModal: React.FC<ActivationManagerModalProps> = ({
  isOpen,
  onClose,
  activationKeys,
  onAddKey,
  onAddKeys,
  onDeleteKey,
  currentSession,
}) => {
  const [customCode, setCustomCode] = useState('');
  const [assignedName, setAssignedName] = useState('');
  const [note, setNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unused' | 'used'>('all');
  
  // Feedback states
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedRawCode, setCopiedRawCode] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Helper to generate a unique random code
  const generateUniqueCode = (existingCodes: Set<string>): string => {
    let code = '';
    do {
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      code = `RA-KBC-${randomSuffix}`;
    } while (existingCodes.has(code));
    return code;
  };

  // Generate Single Random Key
  const handleGenerateSingleKey = () => {
    const existingCodes = new Set<string>(activationKeys.map((k) => k.code));
    const newCode = generateUniqueCode(existingCodes);
    const today = new Date().toISOString().split('T')[0];

    const newKeyItem: ActivationKey = {
      code: newCode,
      assignedTo: assignedName.trim() || 'Guru RA / Madrasah',
      role: 'user',
      createdAt: today,
      isUsed: false,
      note: note.trim() || 'Kode Aktivasi Pengguna Baru',
    };

    onAddKey(newKeyItem);
    setAssignedName('');
    setNote('');
    showNotification('✨ Berhasil menerbitkan 1 kode aktivasi baru!');
  };

  // Generate Bulk Random Keys (e.g. 5 or 10)
  const handleGenerateBulkKeys = (count: number) => {
    const existingCodes = new Set<string>(activationKeys.map((k) => k.code));
    const newKeys: ActivationKey[] = [];
    const today = new Date().toISOString().split('T')[0];

    for (let i = 0; i < count; i++) {
      const newCode = generateUniqueCode(existingCodes);
      existingCodes.add(newCode);

      const targetLabel = assignedName.trim()
        ? `${assignedName.trim()} (${i + 1}/${count})`
        : `Guru RA #${i + 1}`;

      newKeys.push({
        code: newCode,
        assignedTo: targetLabel,
        role: 'user',
        createdAt: today,
        isUsed: false,
        note: note.trim() || `Paket Terbitan ${count} Kode (${today})`,
      });
    }

    if (onAddKeys) {
      onAddKeys(newKeys);
    } else {
      newKeys.forEach((k) => onAddKey(k));
    }

    setAssignedName('');
    setNote('');
    showNotification(`🎉 Berhasil menerbitkan ${count} kode aktivasi baru sekaligus!`);
  };

  // Add Custom Key
  const handleAddCustomKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = customCode.trim().toUpperCase();
    if (!cleanCode) return;

    // Check duplicate
    if (activationKeys.some((k) => k.code === cleanCode)) {
      alert(`Kode aktivasi "${cleanCode}" sudah terdaftar sebelumnya. Gunakan kode lain.`);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newKeyItem: ActivationKey = {
      code: cleanCode,
      assignedTo: assignedName.trim() || 'Guru RA / Madrasah',
      role: 'user',
      createdAt: today,
      isUsed: false,
      note: note.trim() || 'Kode Aktivasi Kustom Admin',
    };

    onAddKey(newKeyItem);
    setCustomCode('');
    setAssignedName('');
    setNote('');
    showNotification(`✨ Berhasil menambahkan kode kustom: ${cleanCode}`);
  };

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3500);
  };

  // Copy Single WhatsApp Message
  const handleCopyWA = (key: ActivationKey) => {
    const message = `Assalamu'alaikum Wr. Wb. Ibu/Bapak ${key.assignedTo || 'Guru RA'},

Berikut adalah KODE AKTIVASI RESMI Aplikasi Modul Ajar & RPP RA Kurikulum Merdeka KBC:

🔑 KODE AKTIVASI: ${key.code}

Langkah Aktivasi & Pendaftaran Akun:
1. Buka tautan aplikasi RPP RA KBC
2. Klik tombol "Aktivasi Akun Baru"
3. Masukkan Nama Lengkap, buat Username & Password, dan Nama RA
4. Masukkan Kode Aktivasi di atas: ${key.code}
5. Klik "Aktivasi Akun & Masuk"

*PENTING: Aktivasi cukup dilakukan 1 KALI. Untuk masuk selanjutnya di HP/Laptop Anda, cukup ketikkan Username & Password yang telah Anda buat.*

Selamat menyusun Modul Ajar RA KBC KMA 1503 Tahun 2025 dengan mudah & otomatis!`;

    navigator.clipboard.writeText(message);
    setCopiedCode(key.code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Copy Raw Code Only
  const handleCopyRawCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedRawCode(code);
    setTimeout(() => setCopiedRawCode(null), 2000);
  };

  // Copy All Codes Recap (Formatted for WhatsApp / Document)
  const handleCopyAllCodes = () => {
    if (activationKeys.length === 0) return;

    let text = `📋 REKAP DAFTAR KODE AKTIVASI RESMI RPP RA KBC KMA 1503\n`;
    text += `Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}\n`;
    text += `Total Kode: ${activationKeys.length} Kode\n\n`;
    text += `-------------------------------------------\n`;

    activationKeys.forEach((k, idx) => {
      text += `${idx + 1}. KODE: ${k.code}\n   Penerima: ${k.assignedTo || '-'}\n   Catatan: ${k.note || '-'}\n   Status: ${k.isUsed ? 'Sudah Digunakan' : 'Aktif (Siap Pakai)'}\n\n`;
    });

    text += `-------------------------------------------\n`;
    text += `Petunjuk Aktivasi: Buka aplikasi, pilih 'Aktivasi Akun Baru', lalu masukkan salah satu kode di atas.`;

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  // Filtered keys
  const filteredKeys = activationKeys.filter((k) => {
    const matchSearch =
      k.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (k.assignedTo && k.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (k.note && k.note.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === 'unused') return matchSearch && !k.isUsed;
    if (statusFilter === 'used') return matchSearch && k.isUsed;
    return matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-emerald-800/50">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-emerald-800/80 rounded-2xl border border-emerald-600/50 shadow-md">
              <KeyRound className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Kelola Kode Aktivasi Pengguna
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Terbitkan kode aktivasi satuan maupun massal (5/10 kode) dan pantau dalam tabel resmi.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Toast */}
        {notificationMessage && (
          <div className="bg-emerald-600 text-white px-5 py-2.5 text-xs font-bold flex items-center justify-between shadow-inner animate-in slide-in-from-top duration-150">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{notificationMessage}</span>
            </div>
            <button
              onClick={() => setNotificationMessage(null)}
              className="text-white/80 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Section 1: Panel Penerbitan Kode Baru */}
          <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/70 p-5 rounded-3xl border border-emerald-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-950 flex items-center space-x-2">
                <Plus className="w-4 h-4 text-emerald-700" />
                <span>Terbitkan Kode Aktivasi Baru</span>
              </h3>
              <span className="text-[11px] text-emerald-800 font-medium">
                Pilih terbitkan satuan, 5 kode, atau 10 kode massal
              </span>
            </div>

            <form onSubmit={handleAddCustomKey} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nama Penerima / Target RA <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={assignedName}
                    onChange={(e) => setAssignedName(e.target.value)}
                    placeholder="misal: Bu Fatimah (RA Al-Azhar)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 bg-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Catatan / Keterangan <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="misal: Batch Pelatihan RA Mei 2025"
                    className="w-full px-3 py-2 text-xs border border-slate-300 bg-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Kode Kustom Khusus <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                    placeholder="misal: RA-ALAZHAR-2025"
                    className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 bg-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {/* Custom Key Button */}
                <button
                  type="submit"
                  disabled={!customCode.trim()}
                  className="bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Kode Kustom</span>
                </button>

                {/* Single Random Key */}
                <button
                  type="button"
                  onClick={handleGenerateSingleKey}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Terbitkan 1 Kode</span>
                </button>

                {/* Bulk 5 Keys */}
                <button
                  type="button"
                  onClick={() => handleGenerateBulkKeys(5)}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  <span>Terbitkan 5 Kode Aktivasi</span>
                </button>

                {/* Bulk 10 Keys */}
                <button
                  type="button"
                  onClick={() => handleGenerateBulkKeys(10)}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-yellow-200" />
                  <span>Terbitkan 10 Kode Aktivasi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Master Key Bawaan Info Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>Master Key Bawaan Sistem (Selalu Aktif):</span>
              </p>
              <span className="text-[10px] text-slate-400">Siap digunakan langsung untuk login</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-amber-50 text-amber-900 border border-amber-300/80 font-mono font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-2xs">
                ADMIN-RA-2025 <span className="text-[10px] font-normal text-amber-700 font-sans">(Admin)</span>
              </span>
              <span className="bg-emerald-50 text-emerald-900 border border-emerald-300/80 font-mono font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-2xs">
                RA-KBC-2025 <span className="text-[10px] font-normal text-emerald-700 font-sans">(User)</span>
              </span>
              <span className="bg-emerald-50 text-emerald-900 border border-emerald-300/80 font-mono font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-2xs">
                GURU-RA-BERKAH <span className="text-[10px] font-normal text-emerald-700 font-sans">(User)</span>
              </span>
            </div>
          </div>

          {/* Section 2: Hasil Kode dalam Bentuk Tabel */}
          <div className="space-y-3">
            {/* Table Control Bar: Search, Filter, and Export */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kode, nama, catatan..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="unused">Belum Terpakai</option>
                  <option value="used">Sudah Terpakai</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-slate-500 font-medium">
                  Total: <strong className="text-slate-900">{filteredKeys.length}</strong> Kode
                </span>

                {activationKeys.length > 0 && (
                  <button
                    onClick={handleCopyAllCodes}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                      copiedAll
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                    title="Salin rekap seluruh kode aktivasi untuk dibagikan"
                  >
                    {copiedAll ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>Rekap Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-slate-600" />
                        <span>Salin Rekap Semua Kode</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* The Table Component */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
              <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-100/90 sticky top-0 z-10 text-slate-700 font-bold border-b border-slate-200 backdrop-blur-xs">
                    <tr>
                      <th className="py-3 px-3.5 w-12 text-center">No</th>
                      <th className="py-3 px-4 font-extrabold text-slate-900">Kode Aktivasi</th>
                      <th className="py-3 px-4">Nama Penerima / Target</th>
                      <th className="py-3 px-4">Keterangan / Catatan</th>
                      <th className="py-3 px-3.5 text-center">Tgl Terbit</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Aksi & Bagikan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredKeys.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-slate-400 bg-slate-50/50">
                          <UserCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="font-semibold text-slate-600">
                            {searchQuery ? 'Tidak ada kode aktivasi yang cocok dengan pencarian' : 'Belum ada kode aktivasi tambahan yang diterbitkan'}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Gunakan tombol "Terbitkan 1 Kode", "Terbitkan 5 Kode", atau "Terbitkan 10 Kode" di atas.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredKeys.map((item, idx) => (
                        <tr
                          key={item.code}
                          className="hover:bg-emerald-50/40 transition-colors group"
                        >
                          {/* No */}
                          <td className="py-3 px-3.5 text-center font-medium text-slate-400">
                            {idx + 1}
                          </td>

                          {/* Kode Aktivasi */}
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-black text-xs text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/90 shadow-2xs tracking-wide">
                                {item.code}
                              </span>
                              <button
                                onClick={() => handleCopyRawCode(item.code)}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                  copiedRawCode === item.code
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 border-slate-200'
                                }`}
                                title="Salin kode ini saja"
                              >
                                {copiedRawCode === item.code ? (
                                  <Check className="w-3 h-3 text-white" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Penerima / Target */}
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800 block">
                              {item.assignedTo || 'Guru RA / Umum'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              Role: {item.role === 'admin' ? 'Administrator' : 'Pengguna Guru'}
                            </span>
                          </td>

                          {/* Keterangan / Catatan */}
                          <td className="py-3 px-4 text-slate-600 max-w-[200px] truncate" title={item.note}>
                            {item.note || '-'}
                          </td>

                          {/* Tanggal Terbit */}
                          <td className="py-3 px-3.5 text-center text-slate-500 whitespace-nowrap">
                            {item.createdAt}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-3.5 text-center whitespace-nowrap">
                            {item.isUsed ? (
                              <span className="bg-slate-100 text-slate-600 border border-slate-200 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                                Sudah Digunakan
                              </span>
                            ) : (
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                                Aktif (Siap Pakai)
                              </span>
                            )}
                          </td>

                          {/* Aksi */}
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center space-x-1.5">
                              {/* Kirim / Salin WA Format */}
                              <button
                                onClick={() => handleCopyWA(item)}
                                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                                  copiedCode === item.code
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/90'
                                }`}
                                title="Salin template petunjuk dan kode ke WhatsApp"
                              >
                                {copiedCode === item.code ? (
                                  <>
                                    <Check className="w-3 h-3 text-white" />
                                    <span>Tersalin!</span>
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-3 h-3 text-emerald-600" />
                                    <span>Kirim ke WA</span>
                                  </>
                                )}
                              </button>

                              {/* Hapus */}
                              <button
                                onClick={() => onDeleteKey(item.code)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                title="Hapus Kode Aktivasi"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Semua kode yang diterbitkan tersimpan otomatis di basis data lokal aplikasi Anda.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer ml-auto"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
