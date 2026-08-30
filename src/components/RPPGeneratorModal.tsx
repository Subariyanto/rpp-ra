import React, { useState, useEffect } from 'react';
import { Sparkles, X, BookOpen, Heart, Layers, Clock, AlertCircle, CheckCircle2, Check, Square, Building2, Compass } from 'lucide-react';
import { RPPModulAjar, ProfilMadrasah, AlurTujuanPembelajaranItem } from '../types';

interface RPPGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (rpp: RPPModulAjar) => void;
  defaultProfil?: ProfilMadrasah;
  initialATPItem?: AlurTujuanPembelajaranItem | null;
}

const PRESET_TOPIK_DATA = [
  {
    topik: 'Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup',
    subTopics: [
      'Keajaiban Jahe, Kunyit, dan Serai Obat Alami',
      'Mengapa jahe terasa hangat dan kunyit berwarna kuning indah?',
      'Bagaimana cara tanaman obat membantu menyembuhkan tubuh kita?',
      'Menanam bibit jahe di pot cinta & meracik minuman herbal hangat'
    ]
  },
  {
    topik: 'Makanan Halalan Thayyiban: Sehat, Halal & Thayyib',
    subTopics: [
      'Buah-Buahan Kurma, Pisang & Air Putih Sehat',
      'Mengapa kita harus membaca Basmalah sebelum makan dan minum?',
      'Bagaimana membedakan makanan yang bersih, halal, dan sehat?',
      'Membantu meracik bekal sehat buah dan adab makan bersama'
    ]
  },
  {
    topik: 'Masjidku Bersih dan Indah: Adab & Ibadah',
    subTopics: [
      'Adab Masuk Masjid & Perlengkapan Shalat',
      'Apa yang kita rasakan saat mendengar suara azan yang merdu?',
      'Mengapa tempat ibadah harus selalu wangi dan bersih?',
      'Praktik wudhu tertib, memakai mukena/peci, dan merapikan tempat shalat'
    ]
  },
  {
    topik: 'Indahnya Kebersamaan & Toleransi (Panca Cinta)',
    subTopics: [
      'Saling Berbagi & Budaya Sopan Santun',
      'Bagaimana perasaan temanmu jika kita mau berbagi mainan loose parts?',
      'Mengapa mengucapkan senyum, salam, sapa, dan maaf itu indah?',
      'Membuat kartu kasih sayang dan projek infak subuh bersama'
    ]
  },
  {
    topik: 'Aku Sayang Bumi: Kebersihan Lingkungan & Menanam Pohon',
    subTopics: [
      'Mengolah Sampah Organik & Menanam Pohon',
      'Apa yang terjadi pada bumi jika sampah plastik dibuang sembarangan?',
      'Bagaimana rasa terima kasih kita kepada Allah yang memberi udara segar?',
      'Membuat tempat sampah sesuai warna dan menanam bunga di halaman RA'
    ]
  },
  {
    topik: 'Aku Cinta Indonesia: Budaya, Pahlawan & Karunia Bangsa',
    subTopics: [
      'Baju Adat, Makanan Khas & Bendera Merah Putih',
      'Mengapa tanah air Indonesia begitu indah dan kaya hasil alamnya?',
      'Bagaimana cara kita menghormati pahlawan dan menyayangi sesama bangsa?',
      'Lomba permainan tradisional egrang batok dan menyanyikan lagu nasional'
    ]
  },
  {
    topik: 'Tubuhku Karunia Allah: Panca Indera & Kesehatan Diri',
    subTopics: [
      'Mata untuk Melihat, Telinga Mendengar, Tangan Berbuat Baik',
      'Bagaimana jika kita bersyukur atas mata dan telinga sehat karunia Allah?',
      'Mengapa cuci tangan dengan sabun sebelum makan sangat penting?',
      'Praktik sikat gigi teratur dan eksperimen rasa manis, asin, asam'
    ]
  },
  {
    topik: 'Alam Semesta Ciptaan Allah: Hujan, Tata Surya & Pelangi',
    subTopics: [
      'Keajaiban Hujan, Awan, Pelangi dan Bintang di Malam Hari',
      'Darimana asal air hujan yang menyegarkan bumi ini?',
      'Mengapa ada siang yang terang dan malam yang tenang untuk beristirahat?',
      'Eksperimen membuat pelangi buatan dan teropong luar angkasa dari loose parts'
    ]
  },
  {
    topik: 'Air, Udara, dan Api Karunia Allah SWT',
    subTopics: [
      'Manfaat Air Bersih, Angin Segar & Api untuk Memasak',
      'Mengapa kita tidak boleh membuang-buang air dan bermain api tanpa pengawasan?',
      'Bagaimana udara membantu balon terbang dan kincir angin berputar?',
      'Membuat kincir angin kertas & perahu air mengapung'
    ]
  },
  {
    topik: 'Binatang Kesayangan Nabi Muhammad SAW',
    subTopics: [
      'Kucing, Burung, Kuda & Binatang Ternak Ciptaan Allah',
      'Mengapa Nabi Muhammad SAW sangat menyayangi kucing dan memberi makan hewan?',
      'Bagaimana suara dan cara berjalan hewan kesayangan di sekitar kita?',
      'Membuat miniatur kandang hewan bersih dan memberi makan kucing RA'
    ]
  },
];

export const RPPGeneratorModal: React.FC<RPPGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerated,
  defaultProfil,
  initialATPItem,
}) => {
  const [namaYayasan, setNamaYayasan] = useState(defaultProfil?.namaYayasan || 'Yayasan Mutiara Cinta Al-Azhar');
  const [namaRA, setNamaRA] = useState(defaultProfil?.namaRA || 'RA Mutiara Cinta Al-Azhar');
  const [namaGuru, setNamaGuru] = useState(defaultProfil?.namaGuruDefault || 'Ustadzah Fatimah, S.Pd.I');

  useEffect(() => {
    if (defaultProfil) {
      if (defaultProfil.namaYayasan) setNamaYayasan(defaultProfil.namaYayasan);
      if (defaultProfil.namaRA) setNamaRA(defaultProfil.namaRA);
      if (defaultProfil.namaGuruDefault) setNamaGuru(defaultProfil.namaGuruDefault);
    }
  }, [defaultProfil]);

  const [kelompokUsia, setKelompokUsia] = useState('RA B (5-6 Tahun)');
  const [semester, setSemester] = useState('Semester I (Ganjil)');
  const [mingguKe, setMingguKe] = useState('Minggu Ke-5');
  
  // Dropdown Topik Utama State
  const [selectedTopikPreset, setSelectedTopikPreset] = useState<string>(PRESET_TOPIK_DATA[0].topik);
  const [topikUtama, setTopikUtama] = useState('Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup');
  const [isCustomTopik, setIsCustomTopik] = useState(false);

  // Sub Topik & Selection Checklist State
  const [subTopik, setSubTopik] = useState('Keajaiban Jahe, Kunyit, dan Serai Obat Alami');
  const [selectedSubTopicItems, setSelectedSubTopicItems] = useState<string[]>([
    'Keajaiban Jahe, Kunyit, dan Serai Obat Alami'
  ]);

  useEffect(() => {
    if (initialATPItem) {
      setKelompokUsia(initialATPItem.kelompokUsia);
      setSemester(initialATPItem.semester);
      setMingguKe(`Minggu Ke-${initialATPItem.mingguKe}`);
      setTopikUtama(initialATPItem.topikUtama);
      setSubTopik(initialATPItem.subTopik);
      setSelectedSubTopicItems([initialATPItem.subTopik]);
      setIsCustomTopik(true);
      setSelectedTopikPreset('CUSTOM');
      if (initialATPItem.ragamMainLooseParts && initialATPItem.ragamMainLooseParts.length > 0) {
        setKonteksLokal(`Ragam Main: ${initialATPItem.ragamMainLooseParts.join(', ')}`);
      }
    }
  }, [initialATPItem]);

  const [alokasiWaktu, setAlokasiWaktu] = useState('5 Hari');
  const [modelPembelajaran, setModelPembelajaran] = useState('Kelompok dengan Ragam Main (Loose Parts)');
  const [konteksLokal, setKonteksLokal] = useState('Eksplorasi Kebun & Dapur Madrasah, Bahan Alam Sekitar');

  const [fokusCP, setFokusCP] = useState<string[]>([
    'Nilai Agama dan Budi Pekerti',
    'Jati Diri',
    'Literasi & STEAM'
  ]);

  const [fokusDPL, setFokusDPL] = useState<string[]>([
    'Keimanan dan Ketakwaan kepada Tuhan YME',
    'Penalaran Kritis',
    'Kreativitas',
    'Kemandirian',
    'Kesehatan'
  ]);

  const [fokusKBC, setFokusKBC] = useState<string[]>([
    'Cinta Allah dan Rasul-Nya',
    'Cinta Lingkungan',
    'Cinta Diri dan Sesama Manusia'
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCP = (cp: string) => {
    if (fokusCP.includes(cp)) {
      setFokusCP(fokusCP.filter((item) => item !== cp));
    } else {
      setFokusCP([...fokusCP, cp]);
    }
  };

  const toggleDPL = (dpl: string) => {
    if (fokusDPL.includes(dpl)) {
      setFokusDPL(fokusDPL.filter((item) => item !== dpl));
    } else {
      setFokusDPL([...fokusDPL, dpl]);
    }
  };

  const toggleKBC = (kbc: string) => {
    if (fokusKBC.includes(kbc)) {
      setFokusKBC(fokusKBC.filter((item) => item !== kbc));
    } else {
      setFokusKBC([...fokusKBC, kbc]);
    }
  };

  // Handler saat memilih Topik Utama dari Dropdown Model
  const handleTopikSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedTopikPreset(val);
    if (val === 'CUSTOM') {
      setIsCustomTopik(true);
      setTopikUtama('');
      setSelectedSubTopicItems([]);
    } else {
      setIsCustomTopik(false);
      setTopikUtama(val);
      // Auto update contoh sub topik sesuai topik pilihan
      const found = PRESET_TOPIK_DATA.find((p) => p.topik === val);
      if (found && found.subTopics.length > 0) {
        const firstSub = found.subTopics[0];
        setSelectedSubTopicItems([firstSub]);
        setSubTopik(firstSub);
      }
    }
  };

  // Handler toggle checklist item sub-topik / kalimat pemantik
  const toggleSubTopicItem = (item: string) => {
    let updated: string[];
    if (selectedSubTopicItems.includes(item)) {
      updated = selectedSubTopicItems.filter((i) => i !== item);
    } else {
      updated = [...selectedSubTopicItems, item];
    }
    setSelectedSubTopicItems(updated);
    if (updated.length > 0) {
      setSubTopik(updated.join(' • '));
    } else {
      setSubTopik('');
    }
  };

  const handleQuickPreset = (topik: string, sub: string) => {
    setSelectedTopikPreset(topik);
    setIsCustomTopik(false);
    setTopikUtama(topik);
    setSubTopik(sub);
    setSelectedSubTopicItems([sub]);
  };

  // Ambil daftar contoh sub topik berdasarkan topik utama aktif
  const currentPresetData = PRESET_TOPIK_DATA.find((p) => p.topik === (isCustomTopik ? '' : selectedTopikPreset)) || PRESET_TOPIK_DATA[0];
  const availableSubTopics = currentPresetData ? currentPresetData.subTopics : PRESET_TOPIK_DATA[0].subTopics;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-rpp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaYayasan,
          namaRA,
          namaGuru,
          kelompokUsia,
          semester,
          mingguKe,
          topikUtama,
          subTopik,
          alokasiWaktu,
          fokusCP,
          fokusKBC,
          modelPembelajaran,
          konteksLokal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Terjadi kesalahan saat memproses generator AI.');
      }

      const generatedRPP: RPPModulAjar = {
        id: `rpp-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0],
        ...data.data,
        identitas: {
          ...data.data.identitas,
          namaYayasan,
          namaRA,
          namaGuru,
          nsmNpsn: defaultProfil?.nsmNpsn,
          alamat: defaultProfil?.alamat,
          kotaKabupaten: defaultProfil?.kotaKabupaten,
          logoUrl: defaultProfil?.logoUrl,
        },
      };

      onGenerated(generatedRPP);
      onClose();
    } catch (err: any) {
      console.error('Error generating RPP:', err);
      setErrorMessage(err.message || 'Gagal terhubung ke AI Generator. Pastikan koneksi dan sertifikat valid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Generator RPP / Modul Ajar RA AI</h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                Kurikulum Merdeka • Integrasi KBC & Deep Learning (Mindful, Meaningful, Joyful)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Proses Generasi Gagal</p>
                <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Rekomendasi Topik Populer KBC RA
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickPreset('Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup', 'Keajaiban Jahe, Kunyit, dan Serai Obat Alami')}
                className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium px-3 py-1.5 rounded-lg border border-emerald-200 transition-all text-left"
              >
                🌱 Apotek Hidup & Rimpang Jahe
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('Makanan Halalan Thayyiban', 'Buah-Buahan Kurma, Pisang & Air Putih Sehat')}
                className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium px-3 py-1.5 rounded-lg border border-amber-200 transition-all text-left"
              >
                🍎 Makanan Halal & Thayyib
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('Masjidku Bersih dan Indah', 'Adab Masuk Masjid & Perlengkapan Shalat')}
                className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-800 font-medium px-3 py-1.5 rounded-lg border border-teal-200 transition-all text-left"
              >
                🕌 Masjid Bersih & Adab Shalat
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('Indahnya Kebersamaan & Toleransi', 'Saling Berbagi & Budaya Sopan Santun')}
                className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium px-3 py-1.5 rounded-lg border border-purple-200 transition-all text-left"
              >
                🤝 Toleransi & Berbagi (Panca Cinta)
              </button>
            </div>
          </div>

          {/* Row 1: Identitas Yayasan, RA & Guru */}
          <div className="space-y-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
            <div>
              <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Nama Yayasan (Ditampilkan di KOP RPP)</span>
              </label>
              <input
                type="text"
                value={namaYayasan}
                onChange={(e) => setNamaYayasan(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm font-semibold border border-amber-300 bg-white rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 shadow-2xs"
                placeholder="misal: Yayasan Mutiara Cinta Al-Azhar"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Raudhatul Athfal (RA)
                </label>
                <input
                  type="text"
                  value={namaRA}
                  onChange={(e) => setNamaRA(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                  placeholder="misal: RA Mutiara Cinta Al-Azhar"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Guru Kelas / Pengampu
                </label>
                <input
                  type="text"
                  value={namaGuru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 bg-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
                  placeholder="misal: Ustadzah Fatimah, S.Pd.I"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Kelompok Usia, Semester, Minggu */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kelompok Usia / Kelas
              </label>
              <select
                value={kelompokUsia}
                onChange={(e) => setKelompokUsia(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="KB (3-4 Tahun)">Kelompok Bermain / KB (3-4 Th)</option>
                <option value="RA A (4-5 Tahun)">RA Kelompok A (4-5 Th)</option>
                <option value="RA B (5-6 Tahun)">RA Kelompok B (5-6 Th)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Semester I (Ganjil)">Semester I (Ganjil)</option>
                <option value="Semester II (Genap)">Semester II (Genap)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minggu Ke-
              </label>
              <input
                type="text"
                value={mingguKe}
                onChange={(e) => setMingguKe(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="misal: Minggu Ke-5"
              />
            </div>
          </div>

          {/* Row 3: Topik Utama (Model Dropdown) & Sub Topik (Daftar Contoh dengan Centang Kotak) */}
          <div className="space-y-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
            {/* Topik Utama Model Dropdown */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Topik Utama Pembelajaran
                </label>
                <span className="text-[11px] text-emerald-700 font-medium">Model Dropdown Pilihan</span>
              </div>
              <select
                value={isCustomTopik ? 'CUSTOM' : selectedTopikPreset}
                onChange={handleTopikSelectChange}
                className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 shadow-2xs"
              >
                {PRESET_TOPIK_DATA.map((item, idx) => (
                  <option key={idx} value={item.topik}>
                    {item.topik}
                  </option>
                ))}
                <option value="CUSTOM">✏️ + Ketik Topik Sendiri (Custom)...</option>
              </select>

              {/* Input manual jika memilih custom */}
              {isCustomTopik && (
                <div className="mt-2.5 animate-in fade-in duration-150">
                  <input
                    type="text"
                    value={topikUtama}
                    onChange={(e) => setTopikUtama(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-sm border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
                    placeholder="Tuliskan Topik Utama Pembelajaran..."
                  />
                </div>
              )}
            </div>

            {/* Sub Topik & Checklist Contoh */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Sub Topik / Kalimat Pemantik Anak
              </label>
              <input
                type="text"
                value={subTopik}
                onChange={(e) => setSubTopik(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-800"
                placeholder="misal: Keajaiban Jahe, Kunyit, dan Serai Obat Alami"
              />

              {/* Daftar Contoh Sub Topik dengan Kotak Kecil Centang */}
              <div className="mt-3 bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                <p className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
                  <span>Daftar Contoh Sub Topik & Kalimat Pemantik:</span>
                  <span className="text-[10px] font-normal text-emerald-600 italic">Klik pada kotak untuk centang</span>
                </p>
                <div className="space-y-1.5">
                  {availableSubTopics.map((item, idx) => {
                    const isChecked = selectedSubTopicItems.includes(item);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleSubTopicItem(item)}
                        className={`group flex items-start space-x-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold'
                            : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                        }`}
                      >
                        {/* Kotak Kecil Centang */}
                        <div
                          className={`w-4 h-4 mt-0.5 shrink-0 rounded flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-emerald-600 border border-emerald-600 text-white shadow-2xs'
                              : 'bg-white border border-slate-300 group-hover:border-emerald-500'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-relaxed select-none">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Kedalaman Berbasis Konteks (KBC) Settings */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center space-x-1.5">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />
                <span>Konteks Lingkungan Nyata Anak (Kedalaman Berbasis Konteks - KBC)</span>
              </label>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                Pendekatan KBC
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Tentukan lingkungan hidup nyata / bahan alam asli di sekitar anak yang akan dieksplorasi (e.g. Kebun Madrasah, Dapur Rumah, Pasar Tradisional, Taman Sekitar):
            </p>
            <select
              value={
                [
                  'Eksplorasi Kebun & Dapur Madrasah, Bahan Alam Sekitar',
                  'Eksplorasi Kebun Sekolah / Taman RA & Lingkungan Asri',
                  'Eksplorasi Dapur Rumah, Alat Masak & Bahan Makanan Asli',
                  'Eksplorasi Pasar Tradisional, Toko Kelontong & Wirausaha Lokal',
                  'Eksplorasi Halaman RA, Tanaman Hias & Loose Parts Alam',
                  'Eksplorasi Masjid / Musholla Madrasah & Lingkungan Keagamaan',
                  'Eksplorasi Lingkungan Rumah & Budaya Lokal Sekitar'
                ].includes(konteksLokal)
                  ? konteksLokal
                  : 'custom'
              }
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setKonteksLokal('');
                } else {
                  setKonteksLokal(e.target.value);
                }
              }}
              className="w-full px-3.5 py-2.5 text-sm font-semibold border border-emerald-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            >
              <option value="Eksplorasi Kebun & Dapur Madrasah, Bahan Alam Sekitar">
                🌿 Eksplorasi Kebun & Dapur Madrasah, Bahan Alam Sekitar
              </option>
              <option value="Eksplorasi Kebun Sekolah / Taman RA & Lingkungan Asri">
                🌻 Eksplorasi Kebun Sekolah / Taman RA & Lingkungan Asri
              </option>
              <option value="Eksplorasi Dapur Rumah, Alat Masak & Bahan Makanan Asli">
                🍳 Eksplorasi Dapur Rumah, Alat Masak & Bahan Makanan Asli
              </option>
              <option value="Eksplorasi Pasar Tradisional, Toko Kelontong & Wirausaha Lokal">
                🏪 Eksplorasi Pasar Tradisional, Toko Kelontong & Wirausaha Lokal
              </option>
              <option value="Eksplorasi Halaman RA, Tanaman Hias & Loose Parts Alam">
                🪵 Eksplorasi Halaman RA, Tanaman Hias & Loose Parts Alam
              </option>
              <option value="Eksplorasi Masjid / Musholla Madrasah & Lingkungan Keagamaan">
                🕌 Eksplorasi Masjid / Musholla Madrasah & Lingkungan Keagamaan
              </option>
              <option value="Eksplorasi Lingkungan Rumah & Budaya Lokal Sekitar">
                🏡 Eksplorasi Lingkungan Rumah & Budaya Lokal Sekitar
              </option>
              <option value="custom">✍️ Tulis Konteks Sendiri (Kustom)...</option>
            </select>

            {(![
              'Eksplorasi Kebun & Dapur Madrasah, Bahan Alam Sekitar',
              'Eksplorasi Kebun Sekolah / Taman RA & Lingkungan Asri',
              'Eksplorasi Dapur Rumah, Alat Masak & Bahan Makanan Asli',
              'Eksplorasi Pasar Tradisional, Toko Kelontong & Wirausaha Lokal',
              'Eksplorasi Halaman RA, Tanaman Hias & Loose Parts Alam',
              'Eksplorasi Masjid / Musholla Madrasah & Lingkungan Keagamaan',
              'Eksplorasi Lingkungan Rumah & Budaya Lokal Sekitar'
            ].includes(konteksLokal) || konteksLokal === '') && (
              <input
                type="text"
                value={konteksLokal}
                onChange={(e) => setKonteksLokal(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm font-semibold border border-emerald-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-2xs mt-2"
                placeholder="Ketik konteks lingkungan lokal secara kustom..."
              />
            )}
          </div>

          {/* Fokus Elemen CP Kurikulum Merdeka */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Fokus Elemen Capaian Pembelajaran (CP) RA:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'Nilai Agama dan Budi Pekerti',
                'Jati Diri',
                'Literasi & STEAM'
              ].map((cp) => (
                <button
                  type="button"
                  key={cp}
                  onClick={() => toggleCP(cp)}
                  className={`p-3 rounded-xl border text-xs text-left font-medium flex items-center justify-between transition-all ${
                    fokusCP.includes(cp)
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span>{cp}</span>
                  {fokusCP.includes(cp) && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Delapan Profil Lulusan (8 DPL - KMA 1503 Tahun 2025) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Delapan Profil Lulusan (8 DPL - KMA 1503 Tahun 2025):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                'Keimanan dan Ketakwaan kepada Tuhan YME',
                'Kewargaan',
                'Penalaran Kritis',
                'Kreativitas',
                'Kolaborasi',
                'Kemandirian',
                'Kesehatan',
                'Komunikasi'
              ].map((dpl) => (
                <button
                  type="button"
                  key={dpl}
                  onClick={() => toggleDPL(dpl)}
                  className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all flex items-center justify-between ${
                    fokusDPL.includes(dpl)
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="truncate">{dpl}</span>
                  {fokusDPL.includes(dpl) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* Kurikulum Berbasis Cinta (Panca Cinta) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Kurikulum Berbasis Cinta (Panca Cinta KBC):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Cinta Allah dan Rasul-Nya',
                'Cinta Ilmu',
                'Cinta Lingkungan',
                'Cinta Diri dan Sesama Manusia',
                'Cinta Tanah Air'
              ].map((kbc) => (
                <button
                  type="button"
                  key={kbc}
                  onClick={() => toggleKBC(kbc)}
                  className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all ${
                    fokusKBC.includes(kbc)
                      ? 'bg-rose-50 border-rose-400 text-rose-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  💖 {kbc}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Model & Alokasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Model Pembelajaran RA
              </label>
              <select
                value={modelPembelajaran}
                onChange={(e) => setModelPembelajaran(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Kelompok dengan Ragam Main (Loose Parts)">Kelompok dengan Ragam Main Loose Parts</option>
                <option value="Sentra & Area (Bahan Alam, Balok, Seni, Persiapan)">Sentra & Area Pembelajaran</option>
                <option value="Projek Profil Lulusan & KBC Integratif">Projek Profil Lulusan & KBC Integratif</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={alokasiWaktu}
                onChange={(e) => setAlokasiWaktu(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                placeholder="misal: 5 Hari"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Merancang Modul Ajar AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generasikan Modul Ajar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
