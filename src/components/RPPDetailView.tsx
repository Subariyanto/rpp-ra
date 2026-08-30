import React, { useState } from 'react';
import { RPPModulAjar } from '../types';
import { Printer, Copy, Sparkles, Check, Heart, BookOpen, Layers, Clock, Users, ArrowLeft, Brain, Award, ShieldCheck, Share2, Download, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { printHtmlViaIframe, openHtmlInNewTab, downloadHtmlFile } from '../utils/printDocument';

interface RPPDetailViewProps {
  rpp: RPPModulAjar;
  onBack: () => void;
  onSave?: (rpp: RPPModulAjar) => void;
}

export const RPPDetailView: React.FC<RPPDetailViewProps> = ({ rpp, onBack, onSave }) => {
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeTab, setActiveTab] = useState<'rpph' | 'peta' | 'asesmen' | 'rumah'>('rpph');

  const [showPrintOptions, setShowPrintModal] = useState(false);

  const getFullRppHtml = () => {
    const documentElement = document.getElementById('printable-rpp-document');
    const content = documentElement ? documentElement.innerHTML : '';

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Modul Ajar RA - ${rpp.identitas.topikUtama}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4 portrait; margin: 10mm 12mm; }
    body { background-color: #ffffff; color: #000000; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; padding: 20px; }
    .print\\:hidden { display: none !important; }
    .no-print { display: none !important; }
  </style>
</head>
<body>
  <div style="max-width: 850px; margin: 0 auto;">
    ${content}
  </div>
  <script>
    window.onload = function() {
      if (window.location.search.includes('autoprint=true')) {
        setTimeout(function() { window.print(); }, 400);
      }
    };
  </script>
</body>
</html>`;
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const fullHtml = getFullRppHtml();
      await printHtmlViaIframe(fullHtml);
    } catch (err) {
      console.warn('Iframe print failed, opening print options modal', err);
      try {
        window.focus();
        window.print();
      } catch (e) {
        setShowPrintModal(true);
      }
    } finally {
      setIsPrinting(false);
    }
  };

  const handleOpenNewTab = () => {
    const fullHtml = getFullRppHtml();
    openHtmlInNewTab(fullHtml);
  };

  const handleDownloadHTML = () => {
    const fullHtml = getFullRppHtml();
    const fileName = `Modul_Ajar_RA_${rpp.identitas.topikUtama.replace(/\s+/g, '_')}.html`;
    downloadHtmlFile(fullHtml, fileName);
  };

  const handleCopyText = () => {
    const textContent = `MODUL AJAR / RPP RA KURIKULUM MERDEKA KBC
===========================================
Nama RA      : ${rpp.identitas.namaRA}
Nama Guru    : ${rpp.identitas.namaGuru}
Kelompok Usia: ${rpp.identitas.kelompokUsia}
Topik Utama  : ${rpp.identitas.topikUtama}
Sub Topik    : ${rpp.identitas.subTopik}
Alokasi Waktu: ${rpp.identitas.alokasiWaktu}

TUJUAN PEMBELAJARAN (CP & KBC):
${rpp.tujuanPembelajaran.map((tp, i) => `${i + 1}. [${tp.elemenCP}] ${tp.tujuan} (Integrasi KBC: ${tp.integrasiKBC})`).join('\n')}

PERTANYAAN PEMANTIK DEEP LEARNING:
- Mindful   : ${rpp.pertanyaanPemantik.mindful.join(', ')}
- Meaningful : ${rpp.pertanyaanPemantik.meaningful.join(', ')}
- Joyful     : ${rpp.pertanyaanPemantik.joyful.join(', ')}

RAGAM KEGIATAN MINGGUAN (RPPH):
${rpp.kegiatanMingguan.map((k) => `
[${k.hari} - ${k.subTopikHarian}]
• Pembukaan Mindful (${k.pembukaanMindful.durasi}): ${k.pembukaanMindful.kegiatan.join('; ')}
• Inti Joyful (${k.intiJoyful.durasi}):
${k.intiJoyful.pilihanRagamMain.map((m) => `  - ${m.namaSentraArea}: ${m.deskripsiKegiatan} (Bahan: ${m.bahanLooseParts.join(', ')})`).join('\n')}
• Penutup Meaningful (${k.penutupMeaningful.durasi}): ${k.penutupMeaningful.kegiatan.join('; ')}
`).join('\n')}
`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Bar (Hide in Print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar</span>
        </button>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center space-x-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
            title="Salin ringkasan teks modul ajar"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={handleOpenNewTab}
            className="flex items-center space-x-1.5 text-xs font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
            title="Buka modul ajar di tab baru peramban untuk cetak PDF layar penuh"
          >
            <ExternalLink className="w-4 h-4 text-blue-700" />
            <span>Buka Tab Baru</span>
          </button>

          <button
            onClick={handleDownloadHTML}
            className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            title="Unduh file HTML siap cetak A4 / simpan ke PDF"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Unduh HTML Cetak</span>
          </button>

          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex items-center space-x-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 px-4 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Buka dialog cetak browser (Ctrl+P)"
          >
            {isPrinting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
            <span>{isPrinting ? 'Mempersiapkan Cetak...' : 'Cetak Modul Ajar'}</span>
          </button>
        </div>
      </div>

      {/* Printable RPP Document Canvas */}
      <div id="printable-rpp-document" className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:p-0 print:border-none print:rounded-none max-w-4xl mx-auto space-y-8 font-sans text-slate-800">
        {/* Official Kop RA Header */}
        <div className="border-b-4 border-double border-emerald-800 pb-3">
          <div className="flex items-center justify-between gap-2">
            {/* Logo Mepet Margin Kiri */}
            <div className="shrink-0 w-16 sm:w-20 flex items-center justify-start">
              {rpp.identitas.logoUrl && (
                <img
                  src={rpp.identitas.logoUrl}
                  alt="Logo Madrasah"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              )}
            </div>

            {/* Identitas Madrasah (Tengah) */}
            <div className="flex-1 text-center px-2 space-y-0.5">
              {rpp.identitas.namaYayasan && (
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-950">
                  {rpp.identitas.namaYayasan.toUpperCase()}
                </p>
              )}
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight my-0.5">
                {rpp.identitas.namaRA.toUpperCase()}
              </h1>

              {/* Dibawah Nama RA: Alamat & NSM/NPSN */}
              <div className="text-[11px] sm:text-xs text-slate-700 font-medium leading-tight space-y-0.5">
                {(rpp.identitas.alamat || rpp.identitas.kotaKabupaten) && (
                  <p className="italic text-slate-600">
                    {rpp.identitas.alamat} {rpp.identitas.kotaKabupaten && `• ${rpp.identitas.kotaKabupaten}`}
                  </p>
                )}
                {rpp.identitas.nsmNpsn && (
                  <p className="font-semibold text-slate-800">
                    NSM / NPSN: {rpp.identitas.nsmNpsn}
                  </p>
                )}
              </div>
            </div>

            {/* Spacer Kanan agar Teks Tetap Presisi di Tengah */}
            <div className="shrink-0 w-16 sm:w-20 hidden sm:block" />
          </div>
        </div>

        {/* Judul Dokumen (Dibawah Garis KOP) */}
        <div className="text-center my-3 space-y-1">
          <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase">
            MODUL AJAR / RPP RA KURIKULUM MERDEKA
          </h2>
          <p className="text-xs text-emerald-800 font-bold tracking-wider uppercase">
            PEMBELAJARAN MENDALAM INTEGRASI KBC
          </p>
        </div>

        {/* Tabel Identitas Modul */}
        <div className="bg-emerald-50/70 rounded-xl p-3.5 sm:p-4 border border-emerald-200 shadow-2xs">
          <h2 className="text-sm font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center space-x-2 border-b-2 border-emerald-200 pb-1.5">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>I. Identitas Modul Ajar</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 text-xs">
            {/* Kolom Kiri */}
            <div className="space-y-0">
              {rpp.identitas.namaYayasan && (
                <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                  <span className="text-slate-700 font-semibold text-left">Nama Yayasan</span>
                  <span className="text-slate-600 font-bold text-left">:</span>
                  <span className="font-semibold text-slate-900 text-left">{rpp.identitas.namaYayasan}</span>
                </div>
              )}
              <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                <span className="text-slate-700 font-semibold text-left">Nama RA</span>
                <span className="text-slate-600 font-bold text-left">:</span>
                <span className="font-semibold text-slate-900 text-left">{rpp.identitas.namaRA}</span>
              </div>
              <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                <span className="text-slate-700 font-semibold text-left">Kelompok Usia</span>
                <span className="text-slate-600 font-bold text-left">:</span>
                <span className="font-semibold text-slate-900 text-left">{rpp.identitas.kelompokUsia}</span>
              </div>
              <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                <span className="text-slate-700 font-semibold text-left">Topik Utama</span>
                <span className="text-slate-600 font-bold text-left">:</span>
                <span className="font-bold text-emerald-800 text-left">{rpp.identitas.topikUtama}</span>
              </div>
              {rpp.identitas.subTopik && (
                <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                  <span className="text-slate-700 font-semibold text-left">Sub Topik</span>
                  <span className="text-slate-600 font-bold text-left">:</span>
                  <span className="font-medium text-slate-800 text-left italic">"{rpp.identitas.subTopik}"</span>
                </div>
              )}
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-0">
              <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                <span className="text-slate-700 font-semibold text-left">Guru Pengampu</span>
                <span className="text-slate-600 font-bold text-left">:</span>
                <span className="font-semibold text-slate-900 text-left">{rpp.identitas.namaGuru}</span>
              </div>
              <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                <span className="text-slate-700 font-semibold text-left">Semester / Minggu</span>
                <span className="text-slate-600 font-bold text-left">:</span>
                <span className="font-semibold text-slate-900 text-left">
                  {rpp.identitas.semester} / {/^minggu/i.test(rpp.identitas.mingguKe.trim()) ? rpp.identitas.mingguKe : `Minggu ke-${rpp.identitas.mingguKe}`}
                </span>
              </div>
              <div className="grid grid-cols-[110px_16px_1fr] items-start border-b border-emerald-200/60 py-1 leading-snug">
                <span className="text-slate-700 font-semibold text-left">Alokasi Waktu</span>
                <span className="text-slate-600 font-bold text-left">:</span>
                <span className="font-semibold text-slate-900 text-left">
                  {rpp.identitas.alokasiWaktu ? rpp.identitas.alokasiWaktu.replace(/\s*\([^)]*menit[^)]*\)/gi, '').trim() : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Delapan Profil Lulusan & Panca Cinta KBC */}
          {((rpp.identitas.dimensiProfilLulusan && rpp.identitas.dimensiProfilLulusan.length > 0) ||
            (rpp.identitas.topikPancaCinta && rpp.identitas.topikPancaCinta.length > 0)) && (
            <div className="mt-3 pt-3 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {rpp.identitas.dimensiProfilLulusan && rpp.identitas.dimensiProfilLulusan.length > 0 && (
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">Delapan Profil Lulusan (8 DPL):</span>
                  <div className="flex flex-wrap gap-1">
                    {rpp.identitas.dimensiProfilLulusan.map((dpl, i) => (
                      <span key={i} className="bg-emerald-100/80 text-emerald-900 font-semibold text-[11px] px-2 py-0.5 rounded-md border border-emerald-200">
                        ✨ {dpl}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {rpp.identitas.topikPancaCinta && rpp.identitas.topikPancaCinta.length > 0 && (
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">Panca Cinta KBC:</span>
                  <div className="flex flex-wrap gap-1">
                    {rpp.identitas.topikPancaCinta.map((kbc, i) => (
                      <span key={i} className="bg-rose-100/80 text-rose-900 font-semibold text-[11px] px-2 py-0.5 rounded-md border border-rose-200">
                        💖 {kbc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section II: Capaian Pembelajaran & KBC */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-200 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>II. Tujuan Pembelajaran & Integrasi KBC</span>
          </h2>

          <div className="space-y-2">
            {rpp.tujuanPembelajaran.map((tp, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {tp.elemenCP}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    💖 {tp.integrasiKBC}
                  </span>
                </div>
                <p className="text-slate-800 font-bold leading-relaxed">{tp.tujuan}</p>
                {tp.konteksAnak && (
                  <p className="text-[11px] text-slate-600 italic">
                    📍 Konteks Anak: {tp.konteksAnak}
                  </p>
                )}
                {tp.indikatorKedalaman && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    🎯 Indikator Kedalaman: {tp.indikatorKedalaman}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section Kedalaman Berbasis Konteks (KBC) */}
        {rpp.kedalamanBerbasisKonteks && (
          <div className="p-5 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-amber-50/50 rounded-2xl border border-emerald-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
              <div>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Kedalaman Berbasis Konteks (KBC)
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-emerald-700" />
                  <span>Pengembangan Kedalaman Pemahaman Berbasis Konteks Nyata</span>
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-200">
                🌱 Konteks: {rpp.kedalamanBerbasisKonteks.konteksLokal}
              </span>
            </div>

            {/* 4 Level Kedalaman Pemahaman */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-1">
                <span className="font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[10px] block w-fit">
                  Level 1: Mengamati & Merasakan (Feel/Observe)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {rpp.kedalamanBerbasisKonteks.petaKedalaman.mengamati}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-teal-200 shadow-2xs space-y-1">
                <span className="font-extrabold text-teal-900 bg-teal-100 px-2 py-0.5 rounded text-[10px] block w-fit">
                  Level 2: Memahami & Menghubungkan (Understand/Connect)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {rpp.kedalamanBerbasisKonteks.petaKedalaman.memahami}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-indigo-200 shadow-2xs space-y-1">
                <span className="font-extrabold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded text-[10px] block w-fit">
                  Level 3: Menganalisis & Mengaplikasikan (Apply/Explore)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {rpp.kedalamanBerbasisKonteks.petaKedalaman.mengaitkan}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded text-[10px] block w-fit">
                  Level 4: Mencipta, Beraksi & Berbagi (Create/Share)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {rpp.kedalamanBerbasisKonteks.petaKedalaman.menciptaBeraksi}
                </p>
              </div>
            </div>

            {rpp.kedalamanBerbasisKonteks.keterkaitanKehidupanNyata && (
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-200 text-xs text-slate-700">
                <span className="font-bold text-emerald-900 block mb-0.5">💡 Keterkaitan Kehidupan Nyata:</span>
                <p className="leading-relaxed italic">{rpp.kedalamanBerbasisKonteks.keterkaitanKehidupanNyata}</p>
              </div>
            )}
          </div>
        )}

        {/* Section Implementasi Intrakurikuler KBC (Kepdirjen Pendis 6077 Tahun 2025) */}
        <div className="p-5 bg-gradient-to-br from-rose-50/60 via-amber-50/30 to-emerald-50/40 rounded-2xl border border-rose-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-200/60 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Regulasi KMA 1503 & Kepdirjen 6077 / 2025
                </span>
                <span className="text-xs text-rose-700 font-medium">• Intrakurikuler</span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />
                <span>Implementasi Kurikulum Berbasis Cinta (Intrakurikuler)</span>
              </h2>
            </div>
            {rpp.identitas.metodeIntrakurikulerKBC && (
              <span className="bg-white text-rose-900 font-bold text-xs px-3 py-1.5 rounded-xl border border-rose-200 shadow-2xs">
                📐 Metode: {rpp.identitas.metodeIntrakurikulerKBC}
              </span>
            )}
          </div>

          {/* Materi Integrasi KBC */}
          {rpp.identitas.materiIntegrasiKBC && rpp.identitas.materiIntegrasiKBC.length > 0 && (
            <div className="bg-white p-3.5 rounded-xl border border-rose-100 space-y-2 text-xs">
              <span className="font-bold text-rose-900 block text-xs uppercase tracking-wider">
                📌 Materi Integrasi / Insersi KBC di Pembelajaran:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {rpp.identitas.materiIntegrasiKBC.map((mat, i) => (
                  <div key={i} className="p-2 bg-rose-50/50 rounded-lg border border-rose-100/80 font-medium">
                    {mat}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sintaks / Alur Langkah Intrakurikuler (e.g. FIDS: Feel, Imagine, Do, Share / ARKA / LOK-R) */}
          {rpp.alurIntrakurikulerSteps && rpp.alurIntrakurikulerSteps.length > 0 && (
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                🔄 Alur Sintaks Pembelajaran Intrakurikuler (FIDS / ARKA / LOK-R):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {rpp.alurIntrakurikulerSteps.map((step, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200/60 space-y-1 shadow-2xs">
                    <span className="font-extrabold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-[11px] block w-fit">
                      {step.tahapan}
                    </span>
                    <p className="text-slate-600 font-medium leading-relaxed pt-1">
                      {step.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section III: Kosakata & Bahasa Arab Sederhana */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 space-y-2">
            <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🔤 Kosakata Baru & Kata Kunci</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {rpp.kataKunciDanKosakata.map((kata, i) => (
                <span key={i} className="bg-white text-teal-800 font-medium text-xs px-2.5 py-1 rounded-lg border border-teal-200">
                  {kata}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🕌 Kosakata Bahasa Arab Sederhana</span>
            </h3>
            <div className="space-y-1">
              {rpp.kataBahasaArabSederhana.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-white p-1.5 px-2.5 rounded-lg border border-amber-200/60">
                  <span className="font-bold text-amber-900 font-serif text-sm">{item.kata}</span>
                  <span className="text-slate-600 italic">"{item.artinya}"</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section IV: Pertanyaan Pemantik Deep Learning (Mindful, Meaningful, Joyful) */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 rounded-2xl border border-indigo-100 space-y-3">
          <h2 className="text-sm font-bold text-indigo-950 uppercase tracking-wider flex items-center space-x-2">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span>III. Pertanyaan Pemantik Deep Learning</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Mindful */}
            <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs space-y-1.5">
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider block w-fit">
                🧘‍♂️ Mindful (Kesadaran)
              </span>
              <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5 leading-relaxed">
                {rpp.pertanyaanPemantik.mindful.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Meaningful */}
            <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs space-y-1.5">
              <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider block w-fit">
                💡 Meaningful (Bermakna)
              </span>
              <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5 leading-relaxed">
                {rpp.pertanyaanPemantik.meaningful.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Joyful */}
            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1.5">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider block w-fit">
                🎉 Joyful (Menyenangkan)
              </span>
              <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5 leading-relaxed">
                {rpp.pertanyaanPemantik.joyful.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section V: Kegiatan Pembelajaran Harian (RPPH 5 Hari) */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>IV. Rancangan Kegiatan Pembelajaran Harian (RPPH)</span>
          </h2>

          <div className="space-y-4">
            {rpp.kegiatanMingguan.map((hariItem, index) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                {/* Header Hari */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-4 py-2.5 flex items-center justify-between">
                  <span className="font-bold text-sm tracking-wide">
                    {hariItem.hari}: {hariItem.subTopikHarian}
                  </span>
                </div>

                {/* Body 3 Fase Pembelajaran */}
                <div className="p-4 space-y-3 bg-white text-xs">
                  {/* Pembukaan Mindful */}
                  <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="font-bold text-amber-900 text-[11px] uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                        1. Pembukaan Mindful ({hariItem.pembukaanMindful.durasi})
                      </span>
                    </div>
                    <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5">
                      {hariItem.pembukaanMindful.kegiatan.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Inti Joyful Loose Parts */}
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/70">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-emerald-900 text-[11px] uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                        2. Inti Joyful & Invintasi Loose Parts ({hariItem.intiJoyful.durasi})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {hariItem.intiJoyful.pilihanRagamMain.map((main, mIdx) => (
                        <div key={mIdx} className="bg-white p-2.5 rounded-lg border border-emerald-200/80 space-y-1">
                          <p className="font-bold text-emerald-800 text-xs">{main.namaSentraArea}</p>
                          <p className="text-slate-700 text-[11px]">{main.deskripsiKegiatan}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-[10px] text-slate-500 font-semibold">Bahan:</span>
                            {main.bahanLooseParts.map((b, bIdx) => (
                              <span key={bIdx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Penutup Meaningful */}
                  <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-200/70">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="font-bold text-teal-900 text-[11px] uppercase tracking-wider bg-teal-100 px-2 py-0.5 rounded">
                        3. Penutup Meaningful & Refleksi ({hariItem.penutupMeaningful.durasi})
                      </span>
                    </div>
                    <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5">
                      {hariItem.penutupMeaningful.kegiatan.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section VI: Asesmen Perkembangan Anak */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>V. Asesmen Perkembangan Anak & Rubrik CP</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200">
              <thead>
                <tr className="bg-emerald-800 text-white font-semibold">
                  <th className="p-2.5 border border-emerald-700 w-1/4">Indikator CP</th>
                  <th className="p-2.5 border border-emerald-700">BB (Belum Berkembang)</th>
                  <th className="p-2.5 border border-emerald-700">MB (Mulai Berkembang)</th>
                  <th className="p-2.5 border border-emerald-700">BSH (Sesuai Harapan)</th>
                  <th className="p-2.5 border border-emerald-700">BSB (Sangat Baik)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rpp.asesmenPerkembangan.rubrikChecklist.map((rubrik, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-2.5 font-bold text-slate-800 border border-slate-200">{rubrik.indikatorCP}</td>
                    <td className="p-2.5 text-slate-600 border border-slate-200">{rubrik.kriteriaBB}</td>
                    <td className="p-2.5 text-slate-600 border border-slate-200">{rubrik.kriteriaMB}</td>
                    <td className="p-2.5 text-slate-700 font-medium border border-slate-200">{rubrik.kriteriaBSH}</td>
                    <td className="p-2.5 text-emerald-800 font-bold border border-slate-200">{rubrik.kriteriaBSB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section VII: Refleksi Guru & Kegiatan Bersama Orang Tua */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <span>📝 Refleksi Guru Kelas</span>
            </h3>
            <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5">
              {rpp.refleksiGuru.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200/70 space-y-2 text-xs">
            <h3 className="font-bold text-rose-900 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🏡 Aktivitas KBC di Rumah Bersama Orang Tua</span>
            </h3>
            <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1.5">
              {rpp.kegiatanDiRumahKBC.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tanda Tangan Resmi */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-800">
          <div>
            <p>Mengetahui,</p>
            <p className="font-bold mt-0.5">Kepala Raudhatul Athfal</p>
            <div className="h-16"></div>
            <p className="font-bold underline">Hj. Nurjanah, M.Pd.I</p>
            <p className="text-slate-500 text-[11px]">NIP. 19780512 200501 2 003</p>
          </div>

          <div>
            <p>Dibuat Oleh,</p>
            <p className="font-bold mt-0.5">Guru Kelas RA</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{rpp.identitas.namaGuru}</p>
            <p className="text-slate-500 text-[11px]">NIP. - / NUPTK</p>
          </div>
        </div>
      </div>

      {/* Modal Opsi Cetak & Unduh */}
      {showPrintOptions && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Opsi Cetak & Unduh Modul</h3>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih metode pencetakan yang sesuai dengan perangkat dan browser Anda:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowPrintModal(false);
                  handlePrint();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-emerald-950 text-xs block">Cetak Langsung (Print / PDF)</span>
                    <span className="text-[11px] text-emerald-700">Membuka dialog cetak bersih standar A4</span>
                  </div>
                </div>
                <span className="text-emerald-800 text-xs font-extrabold">→</span>
              </button>

              <button
                onClick={() => {
                  setShowPrintModal(false);
                  handleOpenNewTab();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-blue-950 text-xs block">Buka di Tab Baru Peramban</span>
                    <span className="text-[11px] text-blue-700">Tampilan layar penuh bebas hambatan iframe</span>
                  </div>
                </div>
                <span className="text-blue-800 text-xs font-extrabold">→</span>
              </button>

              <button
                onClick={() => {
                  setShowPrintModal(false);
                  handleDownloadHTML();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-sky-600 text-white rounded-xl group-hover:scale-105 transition-transform">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sky-950 text-xs block">Unduh Dokumen HTML Siap Cetak</span>
                    <span className="text-[11px] text-sky-700">File HTML lengkap dengan Kop RA & format A4</span>
                  </div>
                </div>
                <span className="text-sky-800 text-xs font-extrabold">→</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 py-1.5 px-4 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
