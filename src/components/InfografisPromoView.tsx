import React, { useState } from 'react';
import {
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Share2,
  Printer,
  Copy,
  Check,
  Heart,
  BookOpen,
  Award,
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Building2,
  Smile,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Flame,
  Star,
  Quote,
} from 'lucide-react';
import promoHeroImage from '../assets/images/infografis_rpp_ra_promo_1787887798131.jpg';
import promoFeatureImage from '../assets/images/fitur_keunggulan_ra_1787887817540.jpg';

interface InfografisPromoViewProps {
  onBackToApp?: () => void;
  isInsideModal?: boolean;
}

export const InfografisPromoView: React.FC<InfografisPromoViewProps> = ({
  onBackToApp,
  isInsideModal = false,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedPromoText, setCopiedPromoText] = useState(false);
  const [activePackage, setActivePackage] = useState<'guru' | 'sekolah' | 'yayasan'>('sekolah');

  const contactPhone = '082330647698';
  const promoPrice = 'Rp. 100.000,-';
  const whatsappUrl = (customText?: string) => {
    const defaultText =
      customText ||
      `Assalamu'alaikum Admin, saya tertarik untuk membeli Aplikasi Generator RPP / Modul Ajar RA KBC KMA 1503 dengan harga promo Rp. 100.000,-. Mohon info pembayaran & cara aktivasi. Terima kasih.`;
    return `https://wa.me/6282330647698?text=${encodeURIComponent(defaultText)}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contactPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyPromoText = () => {
    const promoText = `🌟 *APLIKASI GENERATOR RPP & MODUL AJAR RA KURIKULUM BERBASIS CINTA (KBC) KMA 1503/2025* 🌟

Bunda & Yanda Guru RA sering lembur bikin RPP & Modul Ajar?
Kini hadir solusi cerdas super praktis: *Aplikasi Generator RPP RA KBC Cerdas Otomatis!*

✅ *100% Sesuai KMA 1503 Tahun 2025 & Kurikulum Merdeka Kemenag*
✅ *Terintegrasi Kurikulum Berbasis Cinta (KBC)* & 8 Nilai Kasih Sayang
✅ *Pendekatan Deep Learning*: Mindful, Meaningful, & Joyful Learning
✅ *Generator AI Cerdas*: Bikin RPP 1 Minggu otomatis lengkap rincian 5 hari, pemantik, ragam main, & asesmen
✅ *Presensi Mood Pagi Anak*: Pantau emosi dan kehadiran siswa secara interaktif
✅ *Asesmen Capaian Perkembangan*: Otomatis menyusun narasi rapor murid RA
✅ *Siap Cetak Format A4 Resmi*: Dilengkapi Kop Surat RA, NPSN, & Tanda Tangan

💰 *HARGA PROMO SPESIAL: HANYA Rp. 100.000,-* (Sekali Beli / Akses Penuh)
🔥 *Dapatkan Promo Spesial & Kode Aktivasi Sekarang:*
📞 *WhatsApp:* 082330647698
👉 *Chat Langsung:* https://wa.me/6282330647698?text=Info%20Promo%20100rb%20Aplikasi%20RPP%20RA%20KBC

Yuk modernisasi administrasi RA Anda tanpa ribet, bebas stres, dan disukai murid! 🌸`;

    navigator.clipboard.writeText(promoText);
    setCopiedPromoText(true);
    setTimeout(() => setCopiedPromoText(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-4 print:p-0">
      {/* Top Action Bar (Web Only, Hidden on Print) */}
      <div className="print:hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5 text-center md:text-left">
          <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl shrink-0 backdrop-blur-md">
            <Flame className="w-6 h-6 text-amber-300 animate-bounce" />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Infografis & Brosur Resmi
              </span>
              <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
                Harga Promo: Rp. 100.000,-
              </span>
              <span className="text-xs text-emerald-200/90 font-medium">
                Pemesanan & Lisensi Resmi KMA 1503
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1 text-white tracking-tight">
              Brosur & Infografis Keunggulan Aplikasi RPP RA KBC
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Direct WA Order */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-emerald-500/30 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-950" />
            <span>Order WhatsApp: {contactPhone}</span>
          </a>

          {/* Copy Promo Text */}
          <button
            onClick={handleCopyPromoText}
            className={`text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer border ${
              copiedPromoText
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title="Salin pesan promosi untuk disebar ke WhatsApp / Grup Guru"
          >
            {copiedPromoText ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-300" />
                <span>Teks Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-emerald-200" />
                <span>Salin Teks Promosi</span>
              </>
            )}
          </button>

          {/* Print / Save PDF */}
          <button
            onClick={handlePrint}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-white/20 transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Cetak Brosur atau Simpan Sebagai PDF"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-200" />
            <span>Cetak / PDF Brosur</span>
          </button>

          {onBackToApp && !isInsideModal && (
            <button
              onClick={onBackToApp}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              Kembali ke Modul
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO INFOGRAFIS & VALUE PROPOSITION */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden print:border-none print:shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Text & Highlight (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Kemenag RI • KMA 1503 Tahun 2025
                </span>
                <span className="bg-rose-100 text-rose-900 border border-rose-200 font-bold text-xs px-3 py-1 rounded-full flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                  <span>Kurikulum Berbasis Cinta (KBC)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Solusi Administrasi Guru RA:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900">
                  RPP & Modul Ajar Cerdas
                </span>{' '}
                Selesai dalam Hitungan Menit!
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tinggalkan cara manual yang melelahkan. Aplikasi khusus Raudhatul Athfal (RA) ini
                mengintegrasikan <strong>KMA 1503 Tahun 2025</strong>, <strong>8 Dimensi Profil Lulusan KBC</strong>, dan
                pendekatan <strong>Deep Learning</strong> (Mindful, Meaningful, Joyful) secara otomatis & siap cetak!
              </p>

              {/* Quick Feature Ticker */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-rose-50/90 p-3 rounded-2xl border border-rose-300 shadow-xs">
                  <p className="text-[11px] text-rose-800 font-bold">Harga Promo</p>
                  <p className="text-base sm:text-lg font-black text-rose-950">Rp. 100.000,-</p>
                  <p className="text-[10px] text-rose-700 font-medium">Sekali Beli / Selamanya</p>
                </div>

                <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80">
                  <p className="text-[11px] text-emerald-800 font-medium">Hemat Waktu</p>
                  <p className="text-base sm:text-lg font-black text-emerald-950">Hingga 90%</p>
                  <p className="text-[10px] text-emerald-700">Otomatisasi AI Cerdas</p>
                </div>

                <div className="bg-teal-50/80 p-3 rounded-2xl border border-teal-200/80">
                  <p className="text-[11px] text-teal-800 font-medium">Standar Kemenag</p>
                  <p className="text-base sm:text-lg font-black text-teal-950">100% KMA 1503</p>
                  <p className="text-[10px] text-teal-700">Kurikulum Merdeka RA</p>
                </div>

                <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200/80">
                  <p className="text-[11px] text-amber-800 font-medium">Kualitas RPP</p>
                  <p className="text-base sm:text-lg font-black text-amber-950">Siap Cetak A4</p>
                  <p className="text-[10px] text-amber-700">Lengkap Kop & TTD</p>
                </div>
              </div>
            </div>

            {/* Direct Contact Callout Box */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-emerald-500 rounded-2xl text-emerald-950 font-black shrink-0 shadow-sm animate-pulse">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
                      Layanan Pemesanan & Aktivasi:
                    </p>
                    <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                      Rp. 100.000,-
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-wider">
                      {contactPhone}
                    </span>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-emerald-200 rounded-lg transition-all cursor-pointer"
                      title="Salin nomor HP"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">Aktif WhatsApp & Telepon (Admin Resmi)</p>
                </div>
              </div>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 shrink-0 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-950" />
                <span>Beli Sekarang (Rp. 100.000,-)</span>
              </a>
            </div>
          </div>

          {/* Right Visual Image (5 Cols) */}
          <div className="lg:col-span-5 relative bg-emerald-900 overflow-hidden flex items-center justify-center p-4 sm:p-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 w-full">
              <img
                src={promoHeroImage}
                alt="Infografis RPP RA Kurikulum Berbasis Cinta"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white p-3 bg-emerald-950/80 backdrop-blur-md rounded-xl border border-white/10">
                <p className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Teknologi Modern untuk Madrasah Hebat</span>
                </p>
                <p className="text-[11px] text-emerald-100 mt-0.5">
                  Menghadirkan pembelajaran RA yang penuh cinta, bermakna, dan menyenangkan bagi tunas bangsa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: PROBLEM VS SOLUTION (KENAPA BUTUH INI?) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sisi Masalah / Realita Guru */}
        <div className="bg-rose-50/70 border border-rose-200/90 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-rose-200 text-rose-800 rounded-xl font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-rose-800 uppercase tracking-wider">
                Tantangan Guru RA Saat Ini
              </span>
              <h3 className="text-lg font-black text-rose-950">Kendala Menyusun Perangkat Ajar Manual:</h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950 font-medium">
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-black mt-0.5">❌</span>
              <span><strong>Memakan Waktu Berjam-jam:</strong> Guru kelelahan mengetik dokumen RPP setiap pekan di luar jam mengajar.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-black mt-0.5">❌</span>
              <span><strong>Bingung Regulasi Baru:</strong> Belum paham format KMA 1503/2025 dan turunan Kurikulum Berbasis Cinta (KBC).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-black mt-0.5">❌</span>
              <span><strong>Administrasi Tercecer:</strong> Presensi, mood anak, dan catatan anekdot harian tidak terpusat rapi.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-black mt-0.5">❌</span>
              <span><strong>Format Cetak Berantakan:</strong> Sulit menyusun layout A4 resmi dengan kop yayasan yang seragam.</span>
            </li>
          </ul>
        </div>

        {/* Sisi Solusi / Keuntungan Aplikasi */}
        <div className="bg-emerald-50/80 border border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-emerald-200 text-emerald-800 rounded-xl font-bold">
              <Zap className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">
                Solusi Nyata & Praktis
              </span>
              <h3 className="text-lg font-black text-emerald-950">Setelah Memiliki Aplikasi RPP RA KBC:</h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950 font-medium">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>RPP Otomatis & Cepat:</strong> Masukkan tema/topik, AI menyusun modul ajar 5 hari lengkap dalam hitungan detik.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>100% Sesuai KMA 1503:</strong> Terintegrasi CP Kemenag, P5-PPRA, dan 8 Nilai Kurikulum Berbasis Cinta.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Manajemen Kelas Terpadu:</strong> Catat presensi, pantau mood emosi anak tiap pagi, dan buat narasi rapor otomatis.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Cetak 1-Klik Siap Akreditasi:</strong> Layout rapi standar A4 portrait lengkap dengan logo RA dan ttd kepala madrasah.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: 7 FITUR UNGGULAN APLIKASI (INFOGRAPHIC BENTO GRID) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Fitur Terlengkap & Terdepan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            7 Keunggulan Utama Aplikasi RPP RA KBC
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Dirancang khusus memahami kebutuhan nyata guru dan kepala Raudhatul Athfal di seluruh Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1: Generator AI */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">1. AI Modul Ajar Generator</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Membuat rancangan pembelajaran mingguan lengkap Senin - Jumat, tujuan terukur, pemantik bermakna, ragam main bahan alam/loose parts, dan refleksi guru.
            </p>
          </div>

          {/* Card 2: KMA 1503 & CP Kemenag */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 bg-teal-100 text-teal-800 rounded-2xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">2. Regulasi KMA 1503/2025</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memuat 3 Elemen Capaian Pembelajaran (Nilai Agama & Budi Pekerti, Jati Diri, Dasar Literasi, Matematika, Sains & Seni) serta P5-PPRA Kemenag.
            </p>
          </div>

          {/* Card 3: Kurikulum Berbasis Cinta (KBC) */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 bg-rose-100 text-rose-800 rounded-2xl flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">3. Integrasi 8 Nilai KBC</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menyisipkan nilai Cinta Allah, Cinta Diri, Cinta Lingkungan, dan Cinta Ilmu dengan pendekatan Deep Learning (Mindful, Meaningful, & Joyful).
            </p>
          </div>

          {/* Card 4: Presensi & Mood Emosi Pagi */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center font-bold">
              <Smile className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">4. Presensi & Mood Check-In</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Absensi digital harian dengan fitur pantau suasana hati anak di pagi hari (Senang, Semangat, Sedih, Malu) untuk membangun kedekatan emosional guru-murid.
            </p>
          </div>

          {/* Card 5: Asesmen & Narasi Rapor */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-800 rounded-2xl flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-indigo-700" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">5. Asesmen & Narasi Rapor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pencatatan skala perkembangan (BB, MB, BSH, BSB), catatan anekdot harian, dan generator narasi capaian rapor semester otomatis siap salin.
            </p>
          </div>

          {/* Card 6: Bank Topik & Kop Otomatis */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-emerald-700" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">6. Bank Topik & Kop RA</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Koleksi puluhan ide topik inspiratif kontekstual dan pengaturan otomatis nama lembaga, NPSN, nomor izin, serta tanda tangan kepala sekolah.
            </p>
          </div>

          {/* Card 7: Cetak & Ekspor Praktis (Col span 3) */}
          <div className="md:col-span-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-3xl border border-emerald-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-emerald-500/30 border border-emerald-400/40 rounded-2xl shrink-0">
                <Printer className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h4 className="font-black text-lg text-white">7. Format Cetak Standar A4 Resmi & Ekspor PDF</h4>
                <p className="text-xs text-emerald-100/90 mt-0.5">
                  Tampilan cetak presisi dokumen portofolio pembelajaran A4 tanpa terpotong. Siap digunakan untuk supervisi pengawas & akreditasi BAN-PDM!
                </p>
              </div>
            </div>
            <a
              href={whatsappUrl('Halo Admin, saya mau pesan Aplikasi RPP RA KBC untuk lembaga kami.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0 active:scale-95 cursor-pointer"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: VISUAL MATRIKS KBC & DEEP LEARNING */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-3xl p-6 sm:p-8 border border-emerald-200/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Landasan Filosofis & Pedagogis
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Integrasi Kurikulum Berbasis Cinta (KBC) & Deep Learning
            </h3>
          </div>
          <div className="flex items-center space-x-1.5 bg-emerald-100 px-3 py-1 rounded-full text-xs font-bold text-emerald-900 border border-emerald-300">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Mendidik dengan Hati & Keteladanan</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-2">
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Prinsip 1
            </span>
            <h5 className="font-extrabold text-slate-900 text-sm">Mindful Learning</h5>
            <p className="text-xs text-slate-600">
              Anak hadir utuh secara fisik, mental, dan emosional saat berkegiatan. Mengajak anak fokus, sadar lingkungan, dan menyadari kehadiran Allah SWT.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-2xs space-y-2">
            <span className="bg-teal-100 text-teal-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Prinsip 2
            </span>
            <h5 className="font-extrabold text-slate-900 text-sm">Meaningful Learning</h5>
            <p className="text-xs text-slate-600">
              Pembelajaran kontekstual dan sarat makna. Setiap ragam main terhubung dengan kehidupan nyata anak di rumah, madrasah, dan alam sekitar.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Prinsip 3
            </span>
            <h5 className="font-extrabold text-slate-900 text-sm">Joyful Learning</h5>
            <p className="text-xs text-slate-600">
              Belajar melalui bermain yang menggembirakan. Tidak ada paksaan atau stres akademis berlebih, sehingga menumbuhkan rasa cinta belajar sepanjang hayat.
            </p>
          </div>
        </div>

        {/* Feature Infographic Poster Banner */}
        <div className="pt-2">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-300/80 group">
            <img
              src={promoFeatureImage}
              alt="Fitur Keunggulan RPP RA KBC KMA 1503"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover transform group-hover:scale-101 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-amber-300">Pusat Informasi & Penjualan Resmi</p>
                <p className="text-sm font-black text-white">Hubungi WhatsApp: {contactPhone}</p>
              </div>
              <a
                href={whatsappUrl('Assalamu’alaikum Admin, mohon info pemesanan aplikasi RPP RA KBC.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: PAKET LISENSI & CARA PEMESANAN (CONVERSION SECTION) */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="bg-amber-100 text-amber-950 border border-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Pilihan Paket Hemat
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pilih Paket Lisensi Sesuai Kebutuhan Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Investasi terbaik untuk kemudahan administrasi guru & keunggulan mutu Raudhatul Athfal Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paket 1: Guru Mandiri */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-500 transition-all space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Untuk Guru RA</span>
                <h4 className="text-xl font-black text-slate-900">Paket Guru Mandiri</h4>
                <p className="text-xs text-slate-600">Solusi tepat untuk guru yang ingin perangkat ajar rapi tanpa stres.</p>
              </div>

              <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200 text-center">
                <p className="text-[11px] text-slate-500 line-through">Rp. 250.000,-</p>
                <div className="flex items-center justify-center space-x-1.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-rose-700">Rp. 100.000,-</span>
                </div>
                <span className="inline-block mt-1 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  Diskon Promo 60% • 1 Lisensi Guru
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Akses Penuh AI Generator RPP RA</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Akses Bank Topik & Panduan KMA 1503</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Presensi Mood & Asesmen Raport</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cetak A4 & Ekspor Lengkap</span>
                </li>
              </ul>
            </div>

            <a
              href={whatsappUrl('Halo Admin, saya ingin order Paket Guru Mandiri (Promo Rp. 100.000,-) Aplikasi RPP RA KBC.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3 rounded-2xl text-xs text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md active:scale-95"
            >
              <span>Beli Sekarang (Rp. 100.000,-)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Paket 2: Lembaga RA (Best Seller) */}
          <div className="bg-gradient-to-b from-emerald-900 to-teal-950 text-white rounded-3xl border-2 border-amber-400 p-6 flex flex-col justify-between shadow-xl relative space-y-6 transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-amber-400 text-emerald-950 font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              ⭐ Paling Populer (Best Value)
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1 text-center">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">1 Sekolah / Lembaga</span>
                <h4 className="text-2xl font-black text-white">Paket Lembaga RA</h4>
                <p className="text-xs text-emerald-200">Untuk 1 Raudhatul Athfal (Kepala RA & Seluruh Dewan Guru).</p>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-center backdrop-blur-xs">
                <p className="text-xs text-emerald-200 font-medium">Paket Hemat Lembaga</p>
                <p className="text-3xl font-black text-amber-300 mt-0.5">Mulai Rp. 100rb<span className="text-xs text-emerald-100 font-normal">/guru</span></p>
                <p className="text-[11px] text-emerald-100 font-semibold">Termasuk 5 - 10 Kode Aktivasi Guru</p>
              </div>

              <ul className="space-y-2.5 text-xs text-emerald-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span><strong>Semua Fitur Paket Guru Mandiri</strong></span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Kustomisasi Kop Madrasah, NPSN, & Logo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Paket Massal Guru 1 Lembaga</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Prioritas Konsultasi & Bantuan CS WhatsApp</span>
                </li>
              </ul>
            </div>

            <a
              href={whatsappUrl('Assalamu’alaikum Admin, kami tertarik memesan Paket Lembaga RA untuk sekolah kami. Mohon info harga paket promo Rp. 100.000,-.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-3.5 rounded-2xl text-xs text-center transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-950" />
              <span>Pesan Paket Lembaga</span>
            </a>
          </div>

          {/* Paket 3: Yayasan / KKG RA */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-500 transition-all space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Multi Lembaga / Wilayah</span>
                <h4 className="text-xl font-black text-slate-900">Paket Yayasan & KKG</h4>
                <p className="text-xs text-slate-600">Untuk Pengurus Yayasan, IGRA, KKG RA Kecamatan / Kabupaten.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 text-center">
                <p className="text-xs text-slate-500 font-medium">Paket Kolektif Besar</p>
                <p className="text-2xl font-black text-emerald-800 mt-0.5">Tarif Khusus Gugus</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Lisensi Massal 10 - 50+ Guru</p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Penerbitan Kode Massal Instan (Admin Panel)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pendampingan Teknis & Penggunaan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cocok untuk Pelatihan & Bimtek KMA 1503</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Invoice & Bukti Pembayaran Resmi</span>
                </li>
              </ul>
            </div>

            <a
              href={whatsappUrl('Halo Admin, kami dari Yayasan / KKG RA ingin konsultasi lisensi kolektif aplikasi RPP RA KBC.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-2xl text-xs text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Konsultasi Paket Yayasan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 6: 3 LANGKAH MUDAH PEMESANAN & TESTIMONI */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Sangat Cepat & Praktis
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            3 Langkah Mudah Memulai Aplikasi:
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-emerald-950 font-black flex items-center justify-center text-sm">
              1
            </div>
            <h5 className="font-bold text-white text-sm">Hubungi WhatsApp Admin</h5>
            <p className="text-xs text-slate-300">
              Kirim pesan ke nomor resmi <strong>082330647698</strong> untuk klaim harga promo <strong>Rp. 100.000,-</strong>.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm">
              2
            </div>
            <h5 className="font-bold text-white text-sm">Terima Kode Aktivasi Resmi</h5>
            <p className="text-xs text-slate-300">
              Admin akan mengirimkan Kode Aktivasi unik instan dan petunjuk aktivasi dalam 1 menit.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-400 text-slate-950 font-black flex items-center justify-center text-sm">
              3
            </div>
            <h5 className="font-bold text-white text-sm">Aktivasi & Langsung Pakai!</h5>
            <p className="text-xs text-slate-300">
              Buka aplikasi, masukkan kode aktivasi, dan langsung nikmati kemudahan membuat RPP RA otomatis.
            </p>
          </div>
        </div>

        {/* Contact Banner Inside Step */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-6 rounded-2xl border border-emerald-600 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Promo Spesial: Rp. 100.000,-
              </span>
              <span className="text-xs text-emerald-200 font-medium">Hemat Waktu & Tenaga</span>
            </div>
            <h4 className="text-lg font-black text-white">Siap Meningkatkan Mutu Pembelajaran RA Anda?</h4>
            <p className="text-xs text-emerald-100 mt-1">
              Konsultasikan kebutuhan madrasah Anda sekarang juga. Admin siap membantu dengan ramah & profesional.
            </p>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-xl transition-all flex items-center space-x-2 shrink-0 active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <span>Hubungi WA: 082330647698</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRINT-ONLY FOOTER STAMP */}
      {/* ========================================================================= */}
      <div className="hidden print:block text-center border-t border-slate-300 pt-4 text-xs text-slate-600">
        <p className="font-bold text-slate-900">
          Aplikasi RPP & Modul Ajar RA Kurikulum Berbasis Cinta (KBC) KMA 1503 Tahun 2025
        </p>
        <p>Harga Promo Spesial: <strong>Rp. 100.000,-</strong> • Pemesanan & Lisensi Resmi WhatsApp / Telp: <strong>082330647698</strong></p>
      </div>
    </div>
  );
};
