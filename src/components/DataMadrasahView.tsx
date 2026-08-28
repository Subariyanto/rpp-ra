import React, { useState } from 'react';
import { ProfilMadrasah } from '../types';
import { Building2, Save, CheckCircle2, ShieldCheck, MapPin, User, FileText, Sparkles, School, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface DataMadrasahViewProps {
  profil: ProfilMadrasah;
  onSave: (updated: ProfilMadrasah) => void;
}

export const DataMadrasahView: React.FC<DataMadrasahViewProps> = ({ profil, onSave }) => {
  const [formData, setFormData] = useState<ProfilMadrasah>(profil);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file logo terlalu besar. Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFormData((prev) => ({
          ...prev,
          logoUrl: result,
        }));
        setIsSaved(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logoUrl: '',
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-emerald-500/30">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Pengaturan Lembaga & KOP Resmi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Data Madrasah & Yayasan
            </h1>
            <p className="text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Kelola data Raudhatul Athfal dan Nama Yayasan. Data di sini akan otomatis terisi saat membuat Modul Ajar / RPP baru dan dicetak di KOP RPP.
            </p>
          </div>
          <div className="shrink-0">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xs text-center">
              <School className="w-8 h-8 text-amber-300 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-white block">KOP RPP Terintegrasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center space-x-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs sm:text-sm font-semibold">
            Data Madrasah dan Nama Yayasan berhasil disimpan! Modul RPP baru akan menggunakan identitas ini.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Input Section */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Formulir Identitas Madrasah</h2>
              <p className="text-xs text-slate-500">Lengkapi data yayasan dan RA secara cermat</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Logo Madrasah / Yayasan Field */}
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center space-x-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Logo Madrasah / Yayasan</span>
                </label>
                <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
                  Tampil di KOP Cetak
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Box Preview Logo */}
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-emerald-300 bg-white flex items-center justify-center p-2 shrink-0 relative shadow-2xs">
                  {formData.logoUrl ? (
                    <img
                      src={formData.logoUrl}
                      alt="Logo Madrasah"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-slate-400 p-2">
                      <School className="w-7 h-7 mx-auto text-emerald-500/70 mb-1" />
                      <span className="text-[10px] font-medium block text-slate-500">Belum Ada Logo</span>
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center space-x-1.5 active:scale-98">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{formData.logoUrl ? 'Ganti Logo' : 'Unggah Logo Baru'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>

                    {formData.logoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>Hapus Logo</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Format gambar yang disarankan: PNG (latar transparan), JPG, atau WebP (Maks. 2MB). Logo ini akan tercetak otomatis pada KOP Modul Ajar RPP.
                  </p>
                </div>
              </div>
            </div>

            {/* Nama Yayasan - Prominent Field */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Nama Yayasan / Penyelenggara</span>
                </label>
                <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                  Tampil di KOP RPP
                </span>
              </div>
              <input
                type="text"
                name="namaYayasan"
                value={formData.namaYayasan}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 text-sm font-bold border border-amber-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 shadow-2xs"
                placeholder="misal: Yayasan Mutiara Cinta Al-Azhar"
              />
              <p className="text-[11px] text-amber-800 italic">
                *Nama yayasan ini akan dicetak tebal di baris paling atas KOP Modul Ajar / RPP.
              </p>
            </div>

            {/* Nama RA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Raudhatul Athfal (RA)
              </label>
              <input
                type="text"
                name="namaRA"
                value={formData.namaRA}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                placeholder="misal: RA Mutiara Cinta Al-Azhar"
              />
            </div>

            {/* Grid NSM & Kepala RA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  NSM / NPSN
                </label>
                <input
                  type="text"
                  name="nsmNpsn"
                  value={formData.nsmNpsn}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                  placeholder="10123456789 / 60712345"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Kepala RA
                </label>
                <input
                  type="text"
                  name="namaKepalaRA"
                  value={formData.namaKepalaRA}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                  placeholder="Hj. Siti Aminah, M.Pd."
                />
              </div>
            </div>

            {/* Nama Guru Default */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Guru Pengampu (Default)
              </label>
              <input
                type="text"
                name="namaGuruDefault"
                value={formData.namaGuruDefault}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                placeholder="Ustadzah Fatimah, S.Pd.I"
              />
            </div>

            {/* Grid Alamat & Kota */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Alamat Lengkap RA
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                  placeholder="Jl. Pendidikan No. 12"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kabupaten / Kota
                </label>
                <input
                  type="text"
                  name="kotaKabupaten"
                  value={formData.kotaKabupaten}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
                  placeholder="Jakarta Selatan"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Data Madrasah & Yayasan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live KOP RPP Preview Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Pratinjau KOP RPP (Real-Time)
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                Format Cetak A4
              </span>
            </div>

            {/* Mini KOP Paper Canvas */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
              <div className="bg-white p-4 rounded-xl shadow-2xs border border-slate-100">
                <div className="border-b-4 border-double border-emerald-800 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    {/* Logo Mepet Margin Kiri */}
                    <div className="shrink-0 w-12 sm:w-16 flex items-center justify-start">
                      {formData.logoUrl ? (
                        <img
                          src={formData.logoUrl}
                          alt="Logo Madrasah"
                          className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/50 flex items-center justify-center text-[9px] text-emerald-600 font-medium text-center">
                          Logo
                        </div>
                      )}
                    </div>

                    {/* Text Identitas (Tengah) */}
                    <div className="flex-1 text-center px-1">
                      {/* NAMA YAYASAN */}
                      <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-emerald-900 border-b border-emerald-200 pb-0.5 mb-1">
                        {formData.namaYayasan ? formData.namaYayasan.toUpperCase() : 'NAMA YAYASAN BELUM DIISI'}
                      </p>

                      {/* NAMA RA */}
                      <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight my-0.5">
                        {formData.namaRA ? formData.namaRA.toUpperCase() : 'NAMA RAUDHATUL ATHFAL'}
                      </h4>

                      {/* Alamat & NSM/NPSN dibawah Nama RA */}
                      <div className="text-[10px] sm:text-[11px] text-slate-700 leading-tight space-y-0.5 mt-1">
                        {(formData.alamat || formData.kotaKabupaten) && (
                          <p className="italic text-slate-600">
                            {formData.alamat} {formData.kotaKabupaten && `• ${formData.kotaKabupaten}`}
                          </p>
                        )}
                        {formData.nsmNpsn && (
                          <p className="font-semibold text-slate-800">
                            NSM / NPSN: {formData.nsmNpsn}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Spacer Kanan agar Teks Presisi di Tengah */}
                    <div className="shrink-0 w-12 sm:w-16 hidden sm:block" />
                  </div>
                </div>

                {/* Judul Dokumen (Dibawah Garis KOP) */}
                <div className="text-center pt-3 pb-1">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-wide">
                    MODUL AJAR / RPP RA KURIKULUM MERDEKA
                  </p>
                  <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider mt-0.5">
                    PEMBELAJARAN MENDALAM INTEGRASI KBC
                  </p>
                </div>
              </div>

              {/* Sample Identitas Modul Mini Box */}
              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-[11px] space-y-1">
                <p className="font-bold text-emerald-950 uppercase text-[10px] tracking-wider mb-1 border-b border-emerald-200 pb-0.5">
                  I. Identitas Modul Ajar
                </p>
                <div className="grid grid-cols-[85px_10px_1fr] text-slate-800">
                  <span className="font-semibold text-slate-600">Yayasan</span>
                  <span>:</span>
                  <span className="font-semibold">{formData.namaYayasan || '-'}</span>
                </div>
                <div className="grid grid-cols-[85px_10px_1fr] text-slate-800">
                  <span className="font-semibold text-slate-600">Nama RA</span>
                  <span>:</span>
                  <span className="font-semibold">{formData.namaRA || '-'}</span>
                </div>
                <div className="grid grid-cols-[85px_10px_1fr] text-slate-800">
                  <span className="font-semibold text-slate-600">Guru Pengampu</span>
                  <span>:</span>
                  <span>{formData.namaGuruDefault || '-'}</span>
                </div>
                <div className="grid grid-cols-[85px_10px_1fr] text-slate-800">
                  <span className="font-semibold text-slate-600">Kepala RA</span>
                  <span>:</span>
                  <span>{formData.namaKepalaRA || '-'}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-950 leading-relaxed">
                KOP di atas akan otomatis tercetak resmi pada seluruh Modul Ajar yang Anda buat dan dapat langsung diunduh / dicetak ke kertas A4.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
