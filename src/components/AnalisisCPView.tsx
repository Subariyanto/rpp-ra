import React, { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  Printer,
  Sparkles,
  Heart,
  Award,
  Layers,
  ArrowRight,
  BookOpen,
  Filter,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Loader2
} from 'lucide-react';
import { AnalisisCPTPItem, ProfilMadrasah } from '../types';
import { DAFTAR_CP_BSKAP_046, INITIAL_ANALISIS_CP_TP } from '../data/cpAtpData';
import { printHtmlViaIframe, openHtmlInNewTab, downloadHtmlFile } from '../utils/printDocument';

interface AnalisisCPViewProps {
  analisisList?: AnalisisCPTPItem[];
  onSaveAnalisisList?: (_list: AnalisisCPTPItem[]) => void;
  profilMadrasah?: ProfilMadrasah;
  onNavigateToATP?: () => void;
}

export const AnalisisCPView: React.FC<AnalisisCPViewProps> = ({
  analisisList = INITIAL_ANALISIS_CP_TP,
  onSaveAnalisisList = (_list: AnalisisCPTPItem[]) => {},
  profilMadrasah,
  onNavigateToATP = () => {},
}) => {
  const currentList = Array.isArray(analisisList) && analisisList.length > 0 ? analisisList : INITIAL_ANALISIS_CP_TP;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElemenFilter, setSelectedElemenFilter] = useState<string>('Semua');
  const [selectedUsiaFilter, setSelectedUsiaFilter] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingItem, setEditingItem] = useState<AnalisisCPTPItem | null>(null);

  // Form State
  const [formElemenCP, setFormElemenCP] = useState('Nilai Agama dan Budi Pekerti');
  const [formSubElemen, setFormSubElemen] = useState('');
  const [formKalimatCP, setFormKalimatCP] = useState('');
  const [formKompetensi, setFormKompetensi] = useState('');
  const [formMateriEsensial, setFormMateriEsensial] = useState('');
  const [formKelompokUsia, setFormKelompokUsia] = useState<'RA A (4-5 Tahun)' | 'RA B (5-6 Tahun)' | 'Semua Kelompok'>('RA B (5-6 Tahun)');
  const [formRumusanTP, setFormRumusanTP] = useState('');
  const [formIntegrasiKBC, setFormIntegrasiKBC] = useState('Cinta Allah dan Rasul-Nya');
  const [formDimensiDPL, setFormDimensiDPL] = useState<string[]>(['Keimanan dan Ketakwaan kepada Tuhan YME']);
  const [formKeterangan, setFormKeterangan] = useState('');

  // Handle open modal for create or edit
  const handleOpenModal = (item?: AnalisisCPTPItem) => {
    if (item) {
      setEditingItem(item);
      setFormElemenCP(item.elemenCP);
      setFormSubElemen(item.subElemen);
      setFormKalimatCP(item.kalimatCPAkhirFase);
      setFormKompetensi(item.kompetensi.join(', '));
      setFormMateriEsensial(item.kontenMateriEsensial.join(', '));
      setFormKelompokUsia(item.kelompokUsia);
      setFormRumusanTP(item.rumusanTP);
      setFormIntegrasiKBC(item.integrasiKBC);
      setFormDimensiDPL(item.dimensiDPL || []);
      setFormKeterangan(item.keterangan || '');
    } else {
      setEditingItem(null);
      setFormElemenCP('Nilai Agama dan Budi Pekerti');
      setFormSubElemen('1.1 Mengenal Allah SWT & Rukun Iman');
      setFormKalimatCP('Anak percaya kepada Tuhan Yang Maha Esa (Allah SWT), mulai mengenal sifat-sifat Allah melalui Asmaul Husna, rukun iman, rukun Islam...');
      setFormKompetensi('Mengenal, Melafalkan, Membiasakan');
      setFormMateriEsensial('Tauhid, Asmaul Husna, Kalimat Thoyyibah');
      setFormKelompokUsia('RA B (5-6 Tahun)');
      setFormRumusanTP('Anak mampu mengenal Allah SWT sebagai Sang Pencipta dan membiasakan mengucap doa serta kalimat thoyyibah.');
      setFormIntegrasiKBC('Cinta Allah dan Rasul-Nya');
      setFormDimensiDPL(['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis']);
      setFormKeterangan('');
    }
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRumusanTP.trim()) {
      alert('Mohon isi Rumusan Tujuan Pembelajaran (TP).');
      return;
    }

    const kompetensiArr = formKompetensi.split(',').map((s) => s.trim()).filter(Boolean);
    const materiArr = formMateriEsensial.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingItem) {
      const updated = currentList.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              elemenCP: formElemenCP,
              subElemen: formSubElemen,
              kalimatCPAkhirFase: formKalimatCP,
              kompetensi: kompetensiArr,
              kontenMateriEsensial: materiArr,
              kelompokUsia: formKelompokUsia,
              rumusanTP: formRumusanTP,
              integrasiKBC: formIntegrasiKBC,
              dimensiDPL: formDimensiDPL,
              keterangan: formKeterangan,
            }
          : item
      );
      onSaveAnalisisList(updated);
    } else {
      const newItem: AnalisisCPTPItem = {
        id: `ana-tp-${Date.now()}`,
        elemenCP: formElemenCP,
        subElemen: formSubElemen || 'Sub-Elemen Tambahan',
        kalimatCPAkhirFase: formKalimatCP || 'Capaian Akhir Fase Fondasi BSKAP 046',
        kompetensi: kompetensiArr.length > 0 ? kompetensiArr : ['Mengenal', 'Mempraktikkan'],
        kontenMateriEsensial: materiArr.length > 0 ? materiArr : ['Materi Esensial Terpilih'],
        kelompokUsia: formKelompokUsia,
        rumusanTP: formRumusanTP,
        integrasiKBC: formIntegrasiKBC,
        dimensiDPL: formDimensiDPL.length > 0 ? formDimensiDPL : ['Keimanan dan Ketakwaan kepada Tuhan YME'],
        keterangan: formKeterangan,
      };
      onSaveAnalisisList([newItem, ...currentList]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus butir Analisis TP ini?')) {
      const filtered = currentList.filter((item) => item.id !== id);
      onSaveAnalisisList(filtered);
    }
  };

  const handlePrint = () => {
    setIsPrintModalOpen(true);
  };

  // Filtered List
  const filteredList = currentList.filter((item) => {
    const matchSearch =
      item.rumusanTP.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subElemen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kontenMateriEsensial.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.integrasiKBC.toLowerCase().includes(searchQuery.toLowerCase());

    const matchElemen =
      selectedElemenFilter === 'Semua' || item.elemenCP.toLowerCase().includes(selectedElemenFilter.toLowerCase());

    const matchUsia =
      selectedUsiaFilter === 'Semua' || item.kelompokUsia === selectedUsiaFilter || item.kelompokUsia === 'Semua Kelompok';

    return matchSearch && matchElemen && matchUsia;
  });

  const [isPrinting, setIsPrinting] = useState(false);

  // Generate self-contained A4 HTML ready for print / PDF
  const generateAnalisisHtml = () => {
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

    const rowsHtml = filteredList
      .map(
        (item, idx) => `
      <tr>
        <td style="text-align: center; vertical-align: top; font-weight: bold; padding: 6px; border: 1px solid #000;">${idx + 1}</td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-weight: bold; color: #064e3b; font-size: 11px;">${item.elemenCP}</div>
          <div style="font-weight: bold; margin-top: 2px;">${item.subElemen}</div>
          <div style="font-size: 10px; color: #475569; margin-top: 2px;">Kelompok: ${item.kelompokUsia}</div>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <ul style="margin: 0; padding-left: 14px; font-size: 11px;">
            ${item.kompetensi.map((k) => `<li>${k}</li>`).join('')}
          </ul>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-size: 11px;">${item.kontenMateriEsensial.join(', ')}</div>
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-weight: 600; font-size: 11px; line-height: 1.4;">"${item.rumusanTP}"</div>
          ${item.keterangan ? `<div style="font-size: 9px; color: #64748b; margin-top: 3px; font-style: italic;">Ket: ${item.keterangan}</div>` : ''}
        </td>
        <td style="vertical-align: top; padding: 6px; border: 1px solid #000;">
          <div style="font-weight: bold; color: #9f1239; font-size: 10px;">♥ ${item.integrasiKBC}</div>
          <div style="font-size: 9px; color: #334155; margin-top: 3px;">${(item.dimensiDPL || []).join(', ')}</div>
        </td>
      </tr>`
      )
      .join('');

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Analisis CP ke TP - ${namaRA}</title>
  <style>
    @page { size: A4 landscape; margin: 10mm 12mm 12mm 12mm; }
    body { font-family: 'Times New Roman', Times, serif, system-ui; color: #000; background: #fff; margin: 0; padding: 15px; font-size: 11px; }
    .kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 12px; }
    .kop h2 { margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .kop h1 { margin: 2px 0; font-size: 18px; text-transform: uppercase; font-weight: bold; }
    .kop p { margin: 1px 0; font-size: 10px; color: #333; }
    .title-doc { text-align: center; margin: 12px 0 16px 0; }
    .title-doc h3 { margin: 0; font-size: 13px; text-transform: uppercase; font-weight: bold; text-decoration: underline; }
    .title-doc p { margin: 2px 0; font-size: 10px; font-style: italic; }
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
      <strong style="font-size: 14px;">Pratinjau Cetak Standar A4 Lanskap - Analisis CP ke TP</strong>
      <div style="font-size: 11px; opacity: 0.8;">Klik tombol cetak untuk menyimpan sebagai PDF atau langsung mencetak ke printer fisik.</div>
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
    <h3>MATRIKS ANALISIS CAPAIAN PEMBELAJARAN (CP) MENJADI TUJUAN PEMBELAJARAN (TP)</h3>
    <p>Berdasarkan BSKAP No. 046/H/KR/2025, KMA No. 1503 Tahun 2025 & Kurikulum Berbasis Cinta (KBC)</p>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 25px;">No</th>
        <th style="width: 170px;">Elemen & Sub-Elemen CP</th>
        <th style="width: 130px;">Kompetensi</th>
        <th style="width: 150px;">Konten / Materi Esensial</th>
        <th>Rumusan Tujuan Pembelajaran (TP)</th>
        <th style="width: 140px;">Integrasi KBC & 8 Dimensi (DPL)</th>
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
      // Auto prompt print if requested
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
      const html = generateAnalisisHtml();
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
    const html = generateAnalisisHtml();
    openHtmlInNewTab(html);
  };

  const handleDownloadHTML = () => {
    const html = generateAnalisisHtml();
    const namaRA = profilMadrasah?.namaRA || 'RA';
    downloadHtmlFile(html, `Matriks_Analisis_CP_TP_${namaRA.replace(/\s+/g, '_')}.html`);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'No',
      'Elemen CP',
      'Sub-Elemen',
      'Kelompok Usia',
      'Kompetensi',
      'Konten Materi Esensial',
      'Rumusan Tujuan Pembelajaran (TP)',
      'Integrasi KBC',
      'Dimensi DPL KMA 1503',
      'Keterangan'
    ];

    const rows = filteredList.map((item, idx) => [
      idx + 1,
      `"${item.elemenCP.replace(/"/g, '""')}"`,
      `"${item.subElemen.replace(/"/g, '""')}"`,
      `"${item.kelompokUsia}"`,
      `"${item.kompetensi.join('; ').replace(/"/g, '""')}"`,
      `"${item.kontenMateriEsensial.join('; ').replace(/"/g, '""')}"`,
      `"${item.rumusanTP.replace(/"/g, '""')}"`,
      `"${item.integrasiKBC.replace(/"/g, '""')}"`,
      `"${(item.dimensiDPL || []).join('; ').replace(/"/g, '""')}"`,
      `"${(item.keterangan || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Data_Analisis_CP_TP_${(profilMadrasah?.namaRA || 'RA').replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const textContent = `MATRIKS ANALISIS CAPAIAN PEMBELAJARAN (CP) KE TUJUAN PEMBELAJARAN (TP)
${profilMadrasah?.namaRA || 'RAUDHATUL ATHFAL'}
===========================================================
${filteredList
  .map(
    (item, idx) => `
${idx + 1}. [${item.elemenCP}] - ${item.subElemen} (${item.kelompokUsia})
   - Kompetensi       : ${item.kompetensi.join(', ')}
   - Materi Esensial  : ${item.kontenMateriEsensial.join(', ')}
   - Rumusan TP       : "${item.rumusanTP}"
   - Integrasi KBC    : ${item.integrasiKBC}
   - Dimensi DPL      : ${(item.dimensiDPL || []).join(', ')}
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
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full border border-emerald-400/30">
                Langkah 2: Pedagogis RA
              </span>
              <span className="bg-teal-500/20 text-teal-200 text-xs font-bold px-3 py-1 rounded-full border border-teal-400/30">
                Analisis CP ➔ Rumusan TP
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Analisis Capaian Pembelajaran & Perumusan TP
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Membedah Elemen CP BSKAP 046 menjadi Kompetensi, Konten Materi Esensial Madrasah, Nilai Panca Cinta (KBC), dan Rumusan Tujuan Pembelajaran (TP) siap alur.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => handleOpenModal()}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Butir TP</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Cetak Tabel A4</span>
            </button>
            <button
              onClick={onNavigateToATP}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Lanjut ke Susun ATP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 print:hidden">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Elemen Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Elemen:</span>
            <select
              value={selectedElemenFilter}
              onChange={(e) => setSelectedElemenFilter(e.target.value)}
              className="bg-transparent font-bold text-emerald-800 focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Elemen</option>
              <option value="Agama">Nilai Agama & Budi Pekerti</option>
              <option value="Jati Diri">Jati Diri</option>
              <option value="STEAM">Dasar STEAM</option>
            </select>
          </div>

          {/* Usia Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <span>Usia:</span>
            <select
              value={selectedUsiaFilter}
              onChange={(e) => setSelectedUsiaFilter(e.target.value)}
              className="bg-transparent font-bold text-teal-800 focus:outline-none cursor-pointer"
            >
              <option value="Semua">Semua Kelompok</option>
              <option value="RA A (4-5 Tahun)">RA A (4-5 Tahun)</option>
              <option value="RA B (5-6 Tahun)">RA B (5-6 Tahun)</option>
            </select>
          </div>

          {/* Export Buttons */}
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
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata kunci TP, materi, atau KBC..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Main Table Container (Also formatted for Print) */}
      <div id="printable-analisis-document" className="printable-area bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Print-Only Header (Format Dokumen Resmi Madrasah) */}
        <div className="hidden print:block text-center border-b-2 border-black pb-3 mb-4 pt-2">
          <h2 className="text-sm font-bold uppercase tracking-wider">{profilMadrasah?.namaYayasan || 'YAYASAN PENDIDIKAN ISLAM'}</h2>
          <h1 className="text-xl font-black uppercase text-emerald-950">{profilMadrasah?.namaRA || 'RAUDHATUL ATHFAL (RA)'}</h1>
          <p className="text-[11px] text-slate-700">{profilMadrasah?.alamat} - {profilMadrasah?.kotaKabupaten} | NSM/NPSN: {profilMadrasah?.nsmNpsn}</p>
          <div className="mt-3 pt-2 border-t border-slate-300">
            <h3 className="font-extrabold text-xs uppercase">MATRIKS ANALISIS CAPAIAN PEMBELAJARAN (CP) MENJADI TUJUAN PEMBELAJARAN (TP)</h3>
            <p className="text-[10px] italic text-slate-600">Berdasarkan BSKAP No. 046/H/KR/2025, KMA 1503 Tahun 2025 & Kurikulum Berbasis Cinta (KBC)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold print:bg-slate-200 print:text-black">
                <th className="p-3.5 w-12 text-center border-r border-slate-800 print:border-black">No</th>
                <th className="p-3.5 w-48 border-r border-slate-800 print:border-black">Elemen & Sub-Elemen CP</th>
                <th className="p-3.5 w-40 border-r border-slate-800 print:border-black">Kompetensi</th>
                <th className="p-3.5 w-48 border-r border-slate-800 print:border-black">Konten / Materi Esensial</th>
                <th className="p-3.5 border-r border-slate-800 print:border-black">Rumusan Tujuan Pembelajaran (TP)</th>
                <th className="p-3.5 w-44 border-r border-slate-800 print:border-black">Integrasi KBC & 8 DPL</th>
                <th className="p-3.5 w-24 text-center print:hidden">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    Tidak ditemukan data analisis TP yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors print:hover:bg-transparent">
                    <td className="p-3.5 text-center font-bold text-slate-500 print:text-black border-r border-slate-200 print:border-black align-top">
                      {idx + 1}
                    </td>

                    {/* Elemen */}
                    <td className="p-3.5 border-r border-slate-200 print:border-black align-top space-y-1">
                      <span className="inline-block bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-md print:border print:border-slate-400">
                        {item.elemenCP}
                      </span>
                      <p className="font-extrabold text-slate-900 text-xs">
                        {item.subElemen}
                      </p>
                      <span className="inline-block bg-teal-50 text-teal-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-teal-200/80 print:border-slate-300">
                        {item.kelompokUsia}
                      </span>
                    </td>

                    {/* Kompetensi */}
                    <td className="p-3.5 border-r border-slate-200 print:border-black align-top">
                      <ul className="space-y-1 text-[11px] text-slate-700 print:text-black">
                        {item.kompetensi.map((k, kIdx) => (
                          <li key={kIdx} className="flex items-start space-x-1">
                            <span className="text-emerald-600 font-bold print:text-black">•</span>
                            <span>{k}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Materi Esensial */}
                    <td className="p-3.5 border-r border-slate-200 print:border-black align-top">
                      <div className="flex flex-wrap gap-1">
                        {item.kontenMateriEsensial.map((m, mIdx) => (
                          <span key={mIdx} className="bg-slate-100 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-200 print:border-slate-300">
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Rumusan TP */}
                    <td className="p-3.5 border-r border-slate-200 print:border-black align-top">
                      <p className="text-xs font-bold text-slate-900 leading-relaxed bg-emerald-50/40 print:bg-transparent p-2 rounded-xl border border-emerald-100 print:border-none">
                        "{item.rumusanTP}"
                      </p>
                      {item.keterangan && (
                        <p className="text-[10px] text-slate-500 mt-1 italic">
                          Catatan: {item.keterangan}
                        </p>
                      )}
                    </td>

                    {/* KBC & DPL */}
                    <td className="p-3.5 border-r border-slate-200 print:border-black align-top space-y-1.5">
                      <div className="flex items-center space-x-1 text-rose-700 font-bold text-[11px]">
                        <Heart className="w-3 h-3 text-rose-500 shrink-0" />
                        <span>{item.integrasiKBC}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.dimensiDPL?.map((dpl, dIdx) => (
                          <span key={dIdx} className="bg-amber-50 text-amber-900 text-[9px] font-semibold px-1.5 py-0.5 rounded border border-amber-200 print:border-slate-300">
                            {dpl}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-center align-top print:hidden">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
                          title="Edit TP"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Hapus TP"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Print-Only Signature Footer */}
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

      {/* Modal Dialog: Pratinjau & Cetak Resmi A4 */}
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
                    Pratinjau & Cetak Matriks Analisis CP ke TP Standar A4
                  </h3>
                  <p className="text-xs text-slate-400">
                    Format resmi siap cetak landscape atau simpan PDF dengan Kop Madrasah
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
                  title="Download file HTML mandiri yang siap dibuka dan dicetak di semua browser/tab baru"
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
                  <h3 className="font-extrabold text-xs sm:text-sm uppercase underline">MATRIKS ANALISIS CAPAIAN PEMBELAJARAN (CP) MENJADI TUJUAN PEMBELAJARAN (TP)</h3>
                  <p className="text-[10px] italic text-slate-600 mt-0.5">Berdasarkan BSKAP No. 046/H/KR/2025, KMA 1503 Tahun 2025 & Kurikulum Berbasis Cinta (KBC)</p>
                </div>

                {/* Table */}
                <div className="border border-black overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-100 font-bold border-b border-black">
                        <th className="p-2 w-8 text-center border-r border-black">No</th>
                        <th className="p-2 w-44 border-r border-black">Elemen & Sub-Elemen CP</th>
                        <th className="p-2 w-32 border-r border-black">Kompetensi</th>
                        <th className="p-2 w-40 border-r border-black">Materi Esensial</th>
                        <th className="p-2 border-r border-black">Rumusan Tujuan Pembelajaran (TP)</th>
                        <th className="p-2 w-36">Integrasi KBC & DPL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      {filteredList.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="p-2 text-center font-bold border-r border-black align-top">{idx + 1}</td>
                          <td className="p-2 border-r border-black align-top">
                            <div className="font-bold text-emerald-900">{item.elemenCP}</div>
                            <div className="font-semibold">{item.subElemen}</div>
                            <div className="text-[9px] text-slate-500 font-sans">({item.kelompokUsia})</div>
                          </td>
                          <td className="p-2 border-r border-black align-top">
                            <ul className="list-disc pl-3 m-0 space-y-0.5">
                              {item.kompetensi.map((k, i) => (
                                <li key={i}>{k}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-2 border-r border-black align-top">
                            {item.kontenMateriEsensial.join(', ')}
                          </td>
                          <td className="p-2 border-r border-black align-top font-semibold">
                            "{item.rumusanTP}"
                          </td>
                          <td className="p-2 align-top">
                            <div className="font-bold text-rose-800">♥ {item.integrasiKBC}</div>
                            <div className="text-[9px] text-slate-600 mt-1">{(item.dimensiDPL || []).join(', ')}</div>
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

      {/* Modal Form Tambah/Edit TP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {editingItem ? 'Edit Analisis Tujuan Pembelajaran' : 'Tambah Analisis Tujuan Pembelajaran (TP)'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Elemen CP:</label>
                  <select
                    value={formElemenCP}
                    onChange={(e) => setFormElemenCP(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Nilai Agama dan Budi Pekerti">Nilai Agama dan Budi Pekerti</option>
                    <option value="Jati Diri">Jati Diri</option>
                    <option value="Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)">
                      Dasar STEAM (Literasi, Sains & Seni)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kelompok Usia Sasaran:</label>
                  <select
                    value={formKelompokUsia}
                    onChange={(e) => setFormKelompokUsia(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="RA A (4-5 Tahun)">RA A (4-5 Tahun)</option>
                    <option value="RA B (5-6 Tahun)">RA B (5-6 Tahun)</option>
                    <option value="Semua Kelompok">Semua Kelompok (Fase Fondasi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Sub-Elemen CP:</label>
                <input
                  type="text"
                  value={formSubElemen}
                  onChange={(e) => setFormSubElemen(e.target.value)}
                  placeholder="Contoh: 1.1 Mengenal Allah SWT & Rukun Iman"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kompetensi (Pisahkan dengan koma):</label>
                  <input
                    type="text"
                    value={formKompetensi}
                    onChange={(e) => setFormKompetensi(e.target.value)}
                    placeholder="Mengenal, Melafalkan, Mempraktikkan"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Materi Esensial (Pisahkan dengan koma):</label>
                  <input
                    type="text"
                    value={formMateriEsensial}
                    onChange={(e) => setFormMateriEsensial(e.target.value)}
                    placeholder="Asmaul Husna, Doa Harian, Wudhu"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Rumusan Tujuan Pembelajaran (TP): <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formRumusanTP}
                  onChange={(e) => setFormRumusanTP(e.target.value)}
                  placeholder="Contoh: Anak mampu mengenal Allah SWT sebagai Sang Pencipta dan membiasakan mengucap doa serta kalimat thoyyibah."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Integrasi KBC (Panca Cinta):</label>
                  <input
                    type="text"
                    value={formIntegrasiKBC}
                    onChange={(e) => setFormIntegrasiKBC(e.target.value)}
                    placeholder="Contoh: Cinta Allah dan Rasul-Nya"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Catatan Tambahan:</label>
                  <input
                    type="text"
                    value={formKeterangan}
                    onChange={(e) => setFormKeterangan(e.target.value)}
                    placeholder="Contoh: Terintegrasi dengan projek loose parts"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Simpan Tujuan Pembelajaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

