import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Layers,
  Sparkles,
  Printer,
  Plus,
  Edit3,
  Trash2,
  Heart,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  X,
  Clock,
  ChevronRight,
  Filter,
  Download,
  FileSpreadsheet,
  Copy,
  Check,
  Eye,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { AlurTujuanPembelajaranItem, ProfilMadrasah } from '../types';
import { INITIAL_ATP_DATA } from '../data/cpAtpData';
import { printHtmlViaIframe, openHtmlInNewTab, downloadHtmlFile } from '../utils/printDocument';

interface ATPViewProps {
  atpList?: AlurTujuanPembelajaranItem[];
  onSaveATPList?: (_list: AlurTujuanPembelajaranItem[]) => void;
  profilMadrasah?: ProfilMadrasah;
  onSelectTopicToGenerateRPP?: (_atpItem: AlurTujuanPembelajaranItem) => void;
  onNavigateToAnalisis?: () => void;
}

export const ATPView: React.FC<ATPViewProps> = ({
  atpList = INITIAL_ATP_DATA,
  onSaveATPList = (_list: AlurTujuanPembelajaranItem[]) => {},
  profilMadrasah,
  onSelectTopicToGenerateRPP = (_atpItem: AlurTujuanPembelajaranItem) => {},
  onNavigateToAnalisis = () => {},
}) => {
  const currentList = Array.isArray(atpList) && atpList.length > 0 ? atpList : INITIAL_ATP_DATA;
  const [selectedSemester, setSelectedSemester] = useState<'Semester I (Ganjil)' | 'Semester II (Genap)'>('Semester I (Ganjil)');
  const [selectedUsia, setSelectedUsia] = useState<'RA B (5-6 Tahun)' | 'RA A (4-5 Tahun)'>('RA B (5-6 Tahun)');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingItem, setEditingItem] = useState<AlurTujuanPembelajaranItem | null>(null);

  // Form State
  const [formKodeTP, setFormKodeTP] = useState('ATP-1.01');
  const [formKelompokUsia, setFormKelompokUsia] = useState<'RA A (4-5 Tahun)' | 'RA B (5-6 Tahun)'>('RA B (5-6 Tahun)');
  const [formSemester, setFormSemester] = useState<'Semester I (Ganjil)' | 'Semester II (Genap)'>('Semester I (Ganjil)');
  const [formMingguKe, setFormMingguKe] = useState<number>(1);
  const [formTopikUtama, setFormTopikUtama] = useState('');
  const [formSubTopik, setFormSubTopik] = useState('');
  const [formElemenCP, setFormElemenCP] = useState('Nilai Agama dan Budi Pekerti');
  const [formTP, setFormTP] = useState('');
  const [formMateri, setFormMateri] = useState('');
  const [formAlokasiWaktu, setFormAlokasiWaktu] = useState('1 Minggu (900 Menit / 5 Hari)');
  const [formLooseParts, setFormLooseParts] = useState('');
  const [formIntegrasiKBC, setFormIntegrasiKBC] = useState('Cinta Allah dan Rasul-Nya');
  const [formIndikator, setFormIndikator] = useState('');

  const handleOpenModal = (item?: AlurTujuanPembelajaranItem) => {
    if (item) {
      setEditingItem(item);
      setFormKodeTP(item.kodeTP);
      setFormKelompokUsia(item.kelompokUsia);
      setFormSemester(item.semester);
      setFormMingguKe(item.mingguKe);
      setFormTopikUtama(item.topikUtama);
      setFormSubTopik(item.subTopik);
      setFormElemenCP(item.elemenCP);
      setFormTP(item.tujuanPembelajaran);
      setFormMateri(item.materiEsensial);
      setFormAlokasiWaktu(item.alokasiWaktu);
      setFormLooseParts(item.ragamMainLooseParts.join(', '));
      setFormIntegrasiKBC(item.integrasiKBC);
      setFormIndikator(item.indikatorKetercapaian.join('\n'));
    } else {
      setEditingItem(null);
      const currentCount = currentList.filter((a) => a.semester === selectedSemester).length;
      setFormKodeTP(selectedSemester.includes('I') ? `ATP-1.0${currentCount + 1}` : `ATP-2.0${currentCount + 1}`);
      setFormKelompokUsia(selectedUsia);
      setFormSemester(selectedSemester);
      setFormMingguKe(currentCount + 1);
      setFormTopikUtama('');
      setFormSubTopik('');
      setFormElemenCP('Nilai Agama dan Budi Pekerti & STEAM');
      setFormTP('');
      setFormMateri('');
      setFormAlokasiWaktu('1 Minggu (900 Menit / 5 Hari)');
      setFormLooseParts('Balok Kayu, Ranting, Biji-bijian, Batu Warna');
      setFormIntegrasiKBC('Cinta Allah dan Rasul-Nya');
      setFormIndikator('Mengenal ciptaan Allah dengan gembira\nTerbiasa bersyukur dan berdoa sebelum main\nMampu bekerjasama merapikan alat');
    }
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTopikUtama.trim() || !formTP.trim()) {
      alert('Mohon lengkapi Topik Utama dan Tujuan Pembelajaran (TP).');
      return;
    }

    const loosePartsArr = formLooseParts.split(',').map((s) => s.trim()).filter(Boolean);
    const indikatorArr = formIndikator.split('\n').map((s) => s.trim()).filter(Boolean);

    if (editingItem) {
      const updated = currentList.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              kodeTP: formKodeTP,
              kelompokUsia: formKelompokUsia,
              semester: formSemester,
              mingguKe: Number(formMingguKe),
              topikUtama: formTopikUtama,
              subTopik: formSubTopik,
              elemenCP: formElemenCP,
              tujuanPembelajaran: formTP,
              materiEsensial: formMateri,
              alokasiWaktu: formAlokasiWaktu,
              ragamMainLooseParts: loosePartsArr,
              integrasiKBC: formIntegrasiKBC,
              indikatorKetercapaian: indikatorArr,
            }
          : item
      );
      onSaveATPList(updated);
    } else {
      const newItem: AlurTujuanPembelajaranItem = {
        id: `atp-${Date.now()}`,
        kodeTP: formKodeTP,
        kelompokUsia: formKelompokUsia,
        semester: formSemester,
        mingguKe: Number(formMingguKe),
        topikUtama: formTopikUtama,
        subTopik: formSubTopik,
        elemenCP: formElemenCP,
        tujuanPembelajaran: formTP,
        materiEsensial: formMateri,
        alokasiWaktu: formAlokasiWaktu,
        ragamMainLooseParts: loosePartsArr,
        integrasiKBC: formIntegrasiKBC,
        profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis', 'Kreativitas'],
        indikatorKetercapaian: indikatorArr,
      };
      onSaveATPList([...currentList, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Hapus butir Alur Tujuan Pembelajaran (ATP) ini?')) {
      onSaveATPList(currentList.filter((item) => item.id !== id));
    }
  };

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrintModalOpen(true);
  };

  // Filtered List sorted by mingguKe
  const filteredATP = currentList
    .filter((item) => {
      const matchSem = item.semester === selectedSemester;
      const matchUsia = item.kelompokUsia === selectedUsia;
      const matchSearch =
        item.topikUtama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subTopik.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tujuanPembelajaran.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materiEsensial.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSem && matchUsia && matchSearch;
    })
    .sort((a, b) => a.mingguKe - b.mingguKe);

  // Generate self-contained HTML for A4 landscape printing
  const generateATPHtml = () => {
    const namaRA = profilMadrasah?.namaRA || 'RAUDHATUL ATHFAL';
    const namaYayasan = profilMadrasah?.namaYayasan || 'YAYASAN PENDIDIKAN ISLAM';
    const alamat = profilMadrasah?.alamat || 'Jl. Pendidikan No. 1';
    const kota = profilMadrasah?.kotaKabupaten || 'Indonesia';
    const nsm = profilMadrasah?.nsmNpsn || '101234567890';
    const kepalaRA = profilMadrasah?.kepalaMadrasah || 'Kepala Raudhatul Athfal';
    const nipKepala = profilMadrasah?.nipKepala || '-';
    const guruKelas = profilMadrasah?.guruKelas || 'Guru Kelas RA';
    const nipGuru = profilMadrasah?.nipGuru || '-';
    const tanggalCetak = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const rowsHtml = filteredATP
      .map(
        (item) => `
      <tr>
        <td style="text-align: center; vertical-align: top; font-weight: bold; padding: 6px; border: 1px solid #000;">
          M-${item.mingguKe}
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000; font-family: monospace; font-size: 10px; font-weight: bold;">
          ${item.kodeTP}
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-weight: bold; font-size: 11px; color: #064e3b;">${item.topikUtama}</div>
          <div style="font-size: 10px; color: #334155; margin-top: 2px;">Sub-Topik: <b>${item.subTopik}</b></div>
          <div style="font-size: 9px; color: #64748b; margin-top: 2px;">Waktu: ${item.alokasiWaktu}</div>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-weight: bold; font-size: 10px; color: #0f766e;">${item.elemenCP}</div>
          <div style="font-size: 10.5px; line-height: 1.4; margin-top: 2px;">"${item.tujuanPembelajaran}"</div>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-size: 10.5px; font-weight: 500;">${item.materiEsensial}</div>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-size: 10px; color: #1e293b;">${item.ragamMainLooseParts.join(', ')}</div>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-weight: bold; color: #be123c; font-size: 10px;">♥ ${item.integrasiKBC}</div>
          <ul style="margin: 3px 0 0 0; padding-left: 12px; font-size: 9px; color: #334155;">
            ${item.indikatorKetercapaian.slice(0, 2).map((ind) => `<li>${ind}</li>`).join('')}
          </ul>
        </td>
      </tr>`
      )
      .join('');

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Alur Tujuan Pembelajaran (ATP) - ${selectedSemester} - ${namaRA}</title>
  <style>
    @page { size: A4 landscape; margin: 10mm 12mm 12mm 12mm; }
    body { font-family: 'Times New Roman', Times, serif, system-ui; color: #000; background: #fff; margin: 0; padding: 15px; font-size: 11px; }
    .kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 12px; }
    .kop h2 { margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .kop h1 { margin: 2px 0; font-size: 18px; text-transform: uppercase; font-weight: bold; }
    .kop p { margin: 1px 0; font-size: 10px; color: #333; }
    .title-doc { text-align: center; margin: 12px 0 16px 0; }
    .title-doc h3 { margin: 0; font-size: 13px; text-transform: uppercase; font-weight: bold; text-decoration: underline; }
    .title-doc p { margin: 2px 0; font-size: 10.5px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10.5px; }
    th { background-color: #f1f5f9; font-weight: bold; border: 1px solid #000; padding: 6px; text-align: center; font-size: 11px; }
    td { border: 1px solid #000; }
    .signature-container { margin-top: 24px; display: flex; justify-content: space-between; page-break-inside: avoid; }
    .sig-box { width: 40%; text-align: center; font-size: 11px; }
    @media print {
      .no-print { display: none !important; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background: #0f172a; color: white; padding: 12px 20px; border-radius: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <strong style="font-size: 14px;">Pratinjau Cetak Standar A4 Lanskap - Alur Tujuan Pembelajaran (ATP)</strong>
      <div style="font-size: 11px; opacity: 0.8;">Dokumen resmi ${selectedSemester} (${selectedUsia}) siap cetak atau simpan PDF.</div>
    </div>
    <div>
      <button onclick="window.print()" style="background: #10b981; color: #000; font-weight: bold; border: none; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 12px; margin-right: 8px;">
        🖨️ Cetak / Simpan PDF
      </button>
      <button onclick="window.close()" style="background: #334155; color: white; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 12px;">
        Tutup
      </button>
    </div>
  </div>

  <div class="kop">
    <h2>${namaYayasan}</h2>
    <h1>${namaRA}</h1>
    <p>${alamat} - ${kota} | NSM/NPSN: ${nsm}</p>
  </div>

  <div class="title-doc">
    <h3>DOKUMEN ALUR TUJUAN PEMBELAJARAN (ATP) RAUDHATUL ATHFAL</h3>
    <p>${selectedSemester.toUpperCase()} | KELOMPOK USIA: ${selectedUsia.toUpperCase()}</p>
    <p style="font-weight: normal; font-size: 9.5px; font-style: italic; margin-top: 1px;">Standar BSKAP No. 046/H/KR/2025, KMA 1503 Tahun 2025 & Kurikulum Berbasis Cinta (KBC)</p>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 35px;">Mgg</th>
        <th style="width: 65px;">Kode TP</th>
        <th style="width: 170px;">Topik & Sub-Topik</th>
        <th>Elemen CP & Tujuan Pembelajaran (TP)</th>
        <th style="width: 150px;">Materi Esensial</th>
        <th style="width: 140px;">Media Loose Parts</th>
        <th style="width: 150px;">Integrasi KBC & Indikator</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="signature-container">
    <div class="sig-box">
      <p style="margin: 0;">Mengetahui,</p>
      <p style="margin: 2px 0 60px 0; font-weight: bold;">Kepala ${namaRA}</p>
      <p style="margin: 0; font-weight: bold; text-decoration: underline;">${kepalaRA}</p>
      <p style="margin: 2px 0 0 0;">NIP: ${nipKepala}</p>
    </div>

    <div class="sig-box">
      <p style="margin: 0;">${kota}, ${tanggalCetak}</p>
      <p style="margin: 2px 0 60px 0; font-weight: bold;">Guru Kelas / Penyusun</p>
      <p style="margin: 0; font-weight: bold; text-decoration: underline;">${guruKelas}</p>
      <p style="margin: 2px 0 0 0;">NIP: ${nipGuru}</p>
    </div>
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

  const triggerDirectPrint = async () => {
    setIsPrinting(true);
    try {
      const html = generateATPHtml();
      await printHtmlViaIframe(html);
    } catch (err) {
      console.warn('Iframe print error, trying fallback', err);
      try {
        window.focus();
        window.print();
      } catch (e) {
        console.error('Print failed', e);
      }
    } finally {
      setIsPrinting(false);
    }
  };

  const handleOpenNewTab = () => {
    const html = generateATPHtml();
    openHtmlInNewTab(html);
  };

  const handleDownloadHTML = () => {
    const html = generateATPHtml();
    const fileName = `Dokumen_ATP_${selectedSemester.replace(/\s+/g, '_')}_${(profilMadrasah?.namaRA || 'RA').replace(/\s+/g, '_')}.html`;
    downloadHtmlFile(html, fileName);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Minggu Ke',
      'Kode TP',
      'Kelompok Usia',
      'Semester',
      'Topik Utama',
      'Sub Topik',
      'Elemen CP Terkait',
      'Tujuan Pembelajaran (TP)',
      'Materi Esensial',
      'Alokasi Waktu',
      'Media Loose Parts',
      'Integrasi KBC',
      'Indikator Ketercapaian'
    ];

    const rows = filteredATP.map((item) => [
      item.mingguKe,
      `"${item.kodeTP}"`,
      `"${item.kelompokUsia}"`,
      `"${item.semester}"`,
      `"${item.topikUtama.replace(/"/g, '""')}"`,
      `"${item.subTopik.replace(/"/g, '""')}"`,
      `"${item.elemenCP.replace(/"/g, '""')}"`,
      `"${item.tujuanPembelajaran.replace(/"/g, '""')}"`,
      `"${item.materiEsensial.replace(/"/g, '""')}"`,
      `"${item.alokasiWaktu}"`,
      `"${item.ragamMainLooseParts.join('; ').replace(/"/g, '""')}"`,
      `"${item.integrasiKBC.replace(/"/g, '""')}"`,
      `"${item.indikatorKetercapaian.join('; ').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Data_ATP_${selectedSemester.replace(/\s+/g, '_')}_${(profilMadrasah?.namaRA || 'RA').replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const textContent = `DOKUMEN ALUR TUJUAN PEMBELAJARAN (ATP) - ${selectedSemester.toUpperCase()}
${profilMadrasah?.namaRA || 'RAUDHATUL ATHFAL'} | Kelompok: ${selectedUsia}
========================================================================
${filteredATP
  .map(
    (item) => `
Minggu ${item.mingguKe} [${item.kodeTP}]: ${item.topikUtama}
- Sub-Topik         : ${item.subTopik} (${item.alokasiWaktu})
- Elemen CP         : ${item.elemenCP}
- Tujuan Pembelajaran: "${item.tujuanPembelajaran}"
- Materi Esensial   : ${item.materiEsensial}
- Media Loose Parts : ${item.ragamMainLooseParts.join(', ')}
- Integrasi KBC     : ${item.integrasiKBC}
- Indikator         : ${item.indikatorKetercapaian.join('; ')}
`
  )
  .join('\n')}`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-amber-400/30">
                Langkah 3: Perencanaan Tahunan
              </span>
              <span className="bg-emerald-500/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                Alur Tujuan Pembelajaran (ATP)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Peta Alur Tujuan Pembelajaran (ATP) RA
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Pengurutan Tujuan Pembelajaran secara kronologis per semester dan minggu efektif, dipadukan dengan topik tematik, media loose parts, serta integrasi KBC. Siap digenerate menjadi Modul Ajar (RPP).
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => handleOpenModal()}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Minggu ATP</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Cetak Dokumen ATP A4</span>
            </button>
            <button
              onClick={onNavigateToAnalisis}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Lihat Analisis CP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Semester & Usia Selector + Search + Export */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 print:hidden">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Semester Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSelectedSemester('Semester I (Ganjil)')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedSemester === 'Semester I (Ganjil)'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester I (Ganjil)
            </button>
            <button
              onClick={() => setSelectedSemester('Semester II (Genap)')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                selectedSemester === 'Semester II (Genap)'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester II (Genap)
            </button>
          </div>

          {/* Usia Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <span>Kelompok:</span>
            <select
              value={selectedUsia}
              onChange={(e) => setSelectedUsia(e.target.value as any)}
              className="bg-transparent font-bold text-emerald-800 focus:outline-none cursor-pointer"
            >
              <option value="RA B (5-6 Tahun)">RA B (5-6 Tahun)</option>
              <option value="RA A (4-5 Tahun)">RA A (4-5 Tahun)</option>
            </select>
          </div>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            title="Download file CSV/Excel"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Excel (.CSV)</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik atau materi..."
            className="w-full pl-3 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* Main ATP Container formatted for Screen and Print */}
      <div id="printable-atp-document" className="printable-area space-y-4">
        {/* Print-Only Official Document Header */}
        <div className="hidden print:block text-center border-b-2 border-black pb-3 mb-4 pt-2">
          <h2 className="text-sm font-bold uppercase tracking-wider">{profilMadrasah?.namaYayasan || 'YAYASAN PENDIDIKAN ISLAM'}</h2>
          <h1 className="text-xl font-black uppercase text-emerald-950">{profilMadrasah?.namaRA || 'RAUDHATUL ATHFAL (RA)'}</h1>
          <p className="text-[11px] text-slate-700">{profilMadrasah?.alamat} - {profilMadrasah?.kotaKabupaten} | NSM/NPSN: {profilMadrasah?.nsmNpsn}</p>
          <div className="mt-3 pt-2 border-t border-slate-300">
            <h3 className="font-extrabold text-xs uppercase">DOKUMEN ALUR TUJUAN PEMBELAJARAN (ATP) - {selectedSemester.toUpperCase()}</h3>
            <p className="text-[10px] font-bold text-slate-700">Kelompok Usia: {selectedUsia} | Standar BSKAP No. 046/H/KR/2025 & KMA 1503 (KBC)</p>
          </div>
        </div>

        {/* Print-Only Table View */}
        <div className="hidden print:block border border-black overflow-hidden mt-4">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <th className="p-2 w-8 text-center border-r border-black">Mgg</th>
                <th className="p-2 w-14 text-center border-r border-black">Kode</th>
                <th className="p-2 w-40 border-r border-black">Topik & Sub-Topik</th>
                <th className="p-2 border-r border-black">Tujuan Pembelajaran (TP) & Elemen CP</th>
                <th className="p-2 w-32 border-r border-black">Materi Esensial</th>
                <th className="p-2 w-28 border-r border-black">Loose Parts</th>
                <th className="p-2 w-32">Integrasi KBC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {filteredATP.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 text-center font-bold border-r border-black align-top">M-{item.mingguKe}</td>
                  <td className="p-2 text-center font-mono font-bold border-r border-black align-top">{item.kodeTP}</td>
                  <td className="p-2 border-r border-black align-top">
                    <div className="font-bold text-emerald-950">{item.topikUtama}</div>
                    <div className="text-[9px] text-slate-600 mt-0.5">Sub: {item.subTopik}</div>
                    <div className="text-[8px] text-slate-500 mt-0.5">({item.alokasiWaktu})</div>
                  </td>
                  <td className="p-2 border-r border-black align-top">
                    <div className="font-bold text-[9px] text-teal-800">{item.elemenCP}</div>
                    <div className="font-semibold mt-0.5">"{item.tujuanPembelajaran}"</div>
                  </td>
                  <td className="p-2 border-r border-black align-top">{item.materiEsensial}</td>
                  <td className="p-2 border-r border-black align-top text-[9px]">{item.ragamMainLooseParts.join(', ')}</td>
                  <td className="p-2 align-top">
                    <div className="font-bold text-rose-800">♥ {item.integrasiKBC}</div>
                    <ul className="list-disc pl-3 mt-1 text-[8.5px] text-slate-700">
                      {item.indikatorKetercapaian.slice(0, 2).map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Screen Interactive Cards Grid */}
        <div className="space-y-4 print:hidden">
          {filteredATP.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-500">
              Belum ada data ATP untuk {selectedSemester} ({selectedUsia}). Klik <b>"Tambah Minggu ATP"</b> untuk menyusun alur baru.
            </div>
          ) : (
            filteredATP.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-300 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header Minggu & Topik */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-sm shrink-0">
                      M-{item.mingguKe}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {item.kodeTP}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {item.alokasiWaktu}
                        </span>
                      </div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg">
                        {item.topikUtama}
                      </h3>
                    </div>
                  </div>

                  {/* Right Action: Susun RPP dari Topik ini */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onSelectTopicToGenerateRPP(item)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                      title="Buat Modul Ajar / RPP otomatis berdasarkan Topik & TP minggu ini"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Susun RPP / Modul Ajar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenModal(item)}
                      className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer"
                      title="Edit Data ATP"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                      title="Hapus Minggu Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body: Sub-topik & Tujuan Pembelajaran */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                  {/* Kolom 1: Subtopik & Elemen */}
                  <div className="space-y-2 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/60">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Sub-Topik Spesifik:
                      </span>
                      <p className="font-extrabold text-slate-800 text-xs mt-0.5">
                        {item.subTopik}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Elemen CP Terkait:
                      </span>
                      <span className="inline-block bg-teal-100 text-teal-900 text-[10px] font-black px-2 py-0.5 rounded mt-1">
                        {item.elemenCP}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Integrasi KBC:
                      </span>
                      <p className="text-rose-700 font-bold text-[11px] mt-0.5 flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-rose-500 shrink-0" />
                        <span>{item.integrasiKBC}</span>
                      </p>
                    </div>
                  </div>

                  {/* Kolom 2: Tujuan Pembelajaran & Materi */}
                  <div className="space-y-2 bg-emerald-50/40 p-3.5 rounded-2xl border border-emerald-100/70 lg:col-span-2">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Tujuan Pembelajaran (TP):
                      </span>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        "{item.tujuanPembelajaran}"
                      </p>
                    </div>
                    <div className="pt-1 border-t border-emerald-100/60">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Materi Esensial:
                      </span>
                      <p className="text-slate-700 font-medium text-xs mt-0.5">
                        {item.materiEsensial}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer: Ragam Main Loose Parts & Indikator Ketercapaian */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">
                      Media Eksplorasi & Loose Parts:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.ragamMainLooseParts.map((lp, lIdx) => (
                        <span key={lIdx} className="bg-slate-100 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                          {lp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">
                      Indikator Ketercapaian Anak:
                    </span>
                    <ul className="space-y-1">
                      {item.indikatorKetercapaian.slice(0, 2).map((ind, iIdx) => (
                        <li key={iIdx} className="flex items-start space-x-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Print-Only Signature Section */}
        <div className="hidden print:flex justify-between items-center px-8 pt-8 pb-4 text-xs">
          <div className="text-center w-48">
            <p>Mengetahui,</p>
            <p className="font-bold">Kepala {profilMadrasah?.namaRA || 'RA'}</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{profilMadrasah?.kepalaMadrasah || '.........................'}</p>
            <p className="text-[10px]">NIP: {profilMadrasah?.nipKepala || '-'}</p>
          </div>
          <div className="text-center w-48">
            <p>{profilMadrasah?.kotaKabupaten || 'Madrasah'}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold">Guru Kelas / Penyusun</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{profilMadrasah?.guruKelas || '.........................'}</p>
            <p className="text-[10px]">NIP: {profilMadrasah?.nipGuru || '-'}</p>
          </div>
        </div>
      </div>

      {/* Modal Dialog: Pratinjau & Cetak Resmi Dokumen ATP A4 */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-white">
                    Pratinjau & Cetak Alur Tujuan Pembelajaran (ATP) A4
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedSemester} - {selectedUsia} (Format Landscape Siap Cetak & Simpan PDF)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Bar */}
            <div className="p-3.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={triggerDirectPrint}
                  disabled={isPrinting}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                >
                  {isPrinting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
                  <span>{isPrinting ? 'Mempersiapkan Cetak...' : 'Cetak Langsung (Print / PDF)'}</span>
                </button>

                <button
                  onClick={handleOpenNewTab}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                  title="Buka dokumen di tab baru peramban untuk pratinjau penuh dan cetak PDF"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka di Tab Baru</span>
                </button>

                <button
                  onClick={handleDownloadHTML}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer"
                  title="Download file HTML mandiri yang siap dibuka dan dicetak di tab/browser terpisah"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download HTML</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-teal-600" />
                  <span>Export Excel (CSV)</span>
                </button>
              </div>

              <button
                onClick={handleCopyText}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs px-3 py-2 rounded-xl transition-all flex items-center space-x-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>
            </div>

            {/* Document Preview Sheet */}
            <div className="p-6 overflow-y-auto bg-slate-200/60 flex justify-center">
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl max-w-4xl w-full border border-slate-300 font-serif text-slate-900 text-xs">
                {/* Kop */}
                <div className="text-center border-b-2 border-black pb-3 mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider">{profilMadrasah?.namaYayasan || 'YAYASAN PENDIDIKAN ISLAM'}</h2>
                  <h1 className="text-lg font-black uppercase text-emerald-950">{profilMadrasah?.namaRA || 'RAUDHATUL ATHFAL (RA)'}</h1>
                  <p className="text-[10px] text-slate-700">{profilMadrasah?.alamat} - {profilMadrasah?.kotaKabupaten} | NSM/NPSN: {profilMadrasah?.nsmNpsn}</p>
                </div>

                {/* Title */}
                <div className="text-center mb-5">
                  <h3 className="font-extrabold text-xs sm:text-sm uppercase underline">DOKUMEN ALUR TUJUAN PEMBELAJARAN (ATP) RAUDHATUL ATHFAL</h3>
                  <p className="text-[10px] font-bold mt-1">{selectedSemester.toUpperCase()} | KELOMPOK USIA: {selectedUsia.toUpperCase()}</p>
                  <p className="text-[9px] italic text-slate-600 mt-0.5">Berdasarkan BSKAP No. 046/H/KR/2025, KMA 1503 Tahun 2025 & Kurikulum Berbasis Cinta (KBC)</p>
                </div>

                {/* Table */}
                <div className="border border-black overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-black">
                        <th className="p-2 w-8 text-center border-r border-black">Mgg</th>
                        <th className="p-2 w-14 text-center border-r border-black">Kode</th>
                        <th className="p-2 w-40 border-r border-black">Topik & Sub-Topik</th>
                        <th className="p-2 border-r border-black">Tujuan Pembelajaran (TP) & Elemen CP</th>
                        <th className="p-2 w-32 border-r border-black">Materi Esensial</th>
                        <th className="p-2 w-28 border-r border-black">Loose Parts</th>
                        <th className="p-2 w-32">Integrasi KBC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      {filteredATP.map((item) => (
                        <tr key={item.id}>
                          <td className="p-2 text-center font-bold border-r border-black align-top">M-{item.mingguKe}</td>
                          <td className="p-2 text-center font-mono font-bold border-r border-black align-top">{item.kodeTP}</td>
                          <td className="p-2 border-r border-black align-top">
                            <div className="font-bold text-emerald-950">{item.topikUtama}</div>
                            <div className="text-[9px] text-slate-600 mt-0.5">Sub: {item.subTopik}</div>
                            <div className="text-[8px] text-slate-500 mt-0.5">({item.alokasiWaktu})</div>
                          </td>
                          <td className="p-2 border-r border-black align-top">
                            <div className="font-bold text-[9px] text-teal-800">{item.elemenCP}</div>
                            <div className="font-semibold mt-0.5">"{item.tujuanPembelajaran}"</div>
                          </td>
                          <td className="p-2 border-r border-black align-top">{item.materiEsensial}</td>
                          <td className="p-2 border-r border-black align-top text-[9px]">{item.ragamMainLooseParts.join(', ')}</td>
                          <td className="p-2 align-top">
                            <div className="font-bold text-rose-800">♥ {item.integrasiKBC}</div>
                            <ul className="list-disc pl-3 mt-1 text-[8.5px] text-slate-700">
                              {item.indikatorKetercapaian.slice(0, 2).map((ind, i) => (
                                <li key={i}>{ind}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Signature */}
                <div className="flex justify-between items-center pt-8 text-[11px]">
                  <div className="text-center w-48">
                    <p>Mengetahui,</p>
                    <p className="font-bold">Kepala {profilMadrasah?.namaRA || 'RA'}</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{profilMadrasah?.kepalaMadrasah || '.........................'}</p>
                    <p className="text-[10px]">NIP: {profilMadrasah?.nipKepala || '-'}</p>
                  </div>
                  <div className="text-center w-48">
                    <p>{profilMadrasah?.kotaKabupaten || 'Madrasah'}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="font-bold">Guru Kelas / Penyusun</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">{profilMadrasah?.guruKelas || '.........................'}</p>
                    <p className="text-[10px]">NIP: {profilMadrasah?.nipGuru || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form Tambah/Edit ATP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {editingItem ? 'Edit Alur Tujuan Pembelajaran' : 'Tambah Minggu Alur Tujuan Pembelajaran (ATP)'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kode TP:</label>
                  <input
                    type="text"
                    value={formKodeTP}
                    onChange={(e) => setFormKodeTP(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Semester:</label>
                  <select
                    value={formSemester}
                    onChange={(e) => setFormSemester(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Semester I (Ganjil)">Semester I (Ganjil)</option>
                    <option value="Semester II (Genap)">Semester II (Genap)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Minggu Ke-:</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={formMingguKe}
                    onChange={(e) => setFormMingguKe(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Topik Utama: <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    value={formTopikUtama}
                    onChange={(e) => setFormTopikUtama(e.target.value)}
                    placeholder="Contoh: Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sub-Topik Mingguan:</label>
                  <input
                    type="text"
                    value={formSubTopik}
                    onChange={(e) => setFormSubTopik(e.target.value)}
                    placeholder="Contoh: Keajaiban Jahe, Kunyit, dan Serai Obat Alami"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tujuan Pembelajaran (TP): <span className="text-rose-500">*</span></label>
                <textarea
                  rows={2}
                  value={formTP}
                  onChange={(e) => setFormTP(e.target.value)}
                  placeholder="Rumusan Tujuan Pembelajaran dari Analisis CP..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Materi Esensial:</label>
                  <input
                    type="text"
                    value={formMateri}
                    onChange={(e) => setFormMateri(e.target.value)}
                    placeholder="Materi utama madrasah..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Integrasi KBC:</label>
                  <input
                    type="text"
                    value={formIntegrasiKBC}
                    onChange={(e) => setFormIntegrasiKBC(e.target.value)}
                    placeholder="Panca Cinta / Nilai Karakter"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Media Loose Parts & Ragam Main (Pisahkan koma):</label>
                <input
                  type="text"
                  value={formLooseParts}
                  onChange={(e) => setFormLooseParts(e.target.value)}
                  placeholder="Jahe, Kunyit, Kaca Pembesar, Balok Kayu"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Indikator Ketercapaian (1 Baris = 1 Indikator):</label>
                <textarea
                  rows={3}
                  value={formIndikator}
                  onChange={(e) => setFormIndikator(e.target.value)}
                  placeholder="Tulis indikator ketercapaian per baris..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Simpan Data ATP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

