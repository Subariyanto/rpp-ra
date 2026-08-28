import React from 'react';
import { BookOpen, Heart, Brain, Award, ShieldCheck, Sparkles, Smile, Layers, CheckCircle2 } from 'lucide-react';

export const GuideKBCView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              KMA 1503 Tahun 2025
            </span>
            <span className="text-xs text-emerald-200">• Kementerian Agama RI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Integrasi Kurikulum Merdeka RA, Delapan Profil Lulusan & Kurikulum Berbasis Cinta
          </h1>
          <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Panduan resmi bagi Guru Raudhatul Athfal (RA) dalam menyusun Modul Ajar dan Pembelajaran Mendalam (Deep Learning) sesuai regulasi terbaru KMA 1503 Tahun 2025.
          </p>
        </div>
      </div>

      {/* Card Delapan Profil Lulusan (8 DPL - KMA 1503) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Delapan Profil Lulusan (8 DPL - Reg. KMA 1503 Tahun 2025)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 font-medium text-emerald-900">
            1. Keimanan dan Ketakwaan kepada Tuhan YME
          </div>
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 font-medium text-teal-900">
            2. Kewargaan
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 font-medium text-indigo-900">
            3. Penalaran Kritis
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 font-medium text-purple-900">
            4. Kreativitas
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 font-medium text-rose-900">
            5. Kolaborasi
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 font-medium text-amber-900">
            6. Kemandirian
          </div>
          <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 font-medium text-sky-900">
            7. Kesehatan
          </div>
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 font-medium text-slate-900">
            8. Komunikasi
          </div>
        </div>
      </div>

      {/* Section Khusus: Panduan Implementasi KBC Melalui Intrakurikuler (Kepdirjen Pendis 6077 / 2025) */}
      <div className="bg-gradient-to-br from-rose-50/80 via-amber-50/40 to-emerald-50/50 p-6 rounded-2xl border border-rose-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-rose-200/80 pb-3">
          <div>
            <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Kepdirjen Pendis No. 6077 Tahun 2025
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-100" />
              <span>Implementasi Kurikulum Berbasis Cinta (Intrakurikuler)</span>
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs bg-white text-rose-900 font-bold px-3 py-1.5 rounded-xl border border-rose-200 shadow-2xs">
            📖 Panduan Resmi Kemenag
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          Dalam kegiatan <strong>Intrakurikuler</strong>, Kurikulum Berbasis Cinta (KBC) diintegrasikan langsung ke dalam mata pelajaran dan kegiatan bermain terstruktur di Raudhatul Athfal. KBC bukan materi tambahan terpisah, melainkan <em>ruh/jiwa</em> yang diinsersikan dalam rumusan tujuan pembelajaran, materi integrasi, dan metode pembelajaran.
        </p>

        {/* 4 Framework Metode Intrakurikuler KBC */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Framework & Metode Pembelajaran Intrakurikuler KBC:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* FIDS */}
            <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-md text-[11px]">
                  1. Project Based Learning (FIDS)
                </span>
                <span className="text-[10px] font-bold text-slate-500">Feel • Imagine • Do • Share</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-slate-600 space-y-1 leading-relaxed text-[11px]">
                <li><strong>Feel:</strong> Mengamati realitas & krisis (misal: boros air wudhu / sampah).</li>
                <li><strong>Imagine:</strong> Membayangkan teladan Rasulullah Saw. & merencanakan solusi.</li>
                <li><strong>Do:</strong> Mempraktikkan aksi nyata (wudhu hemat 1 botol, kreasi loose parts).</li>
                <li><strong>Share:</strong> Mengedukasi teman / orang tua dan pameran karya KBC.</li>
              </ul>
            </div>

            {/* ARKA */}
            <div className="bg-white p-4 rounded-xl border border-teal-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-md text-[11px]">
                  2. Experiential Learning (ARKA)
                </span>
                <span className="text-[10px] font-bold text-slate-500">Activity • Reflection • Concept • Apply</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-slate-600 space-y-1 leading-relaxed text-[11px]">
                <li><strong>Activity:</strong> Eksplorasi panca indra (metode 54321 di alam/taman).</li>
                <li><strong>Reflection:</strong> Merefleksikan sensasi rasa & emosi kehadiran Allah Swt.</li>
                <li><strong>Conceptualization:</strong> Memahami bahwa alam adalah <em>tajalli</em> (pancaran cinta Allah).</li>
                <li><strong>Application:</strong> Menjawab tantangan menjaga kebersihan & merawat alam.</li>
              </ul>
            </div>

            {/* LOK-R */}
            <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md text-[11px]">
                  3. Model LOK-R
                </span>
                <span className="text-[10px] font-bold text-slate-500">Literasi • Orientasi • Kolaborasi • Refleksi</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-slate-600 space-y-1 leading-relaxed text-[11px]">
                <li><strong>Literasi:</strong> Membaca buku cerita islami / menyimak video fenomena alam.</li>
                <li><strong>Orientasi:</strong> Diskusi pemantik tentang keagungan Allah & kasih sayang-Nya.</li>
                <li><strong>Kolaborasi:</strong> Bermain kelompok heterogen, saling menolong (<em>ta'awun</em>).</li>
                <li><strong>Refleksi:</strong> Menarik kesimpulan hikmah & komitmen perilaku positif.</li>
              </ul>
            </div>

            {/* Deep Learning */}
            <div className="bg-white p-4 rounded-xl border border-indigo-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-md text-[11px]">
                  4. Pembelajaran Mendalam
                </span>
                <span className="text-[10px] font-bold text-slate-500">Mindful • Meaningful • Joyful</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-slate-600 space-y-1 leading-relaxed text-[11px]">
                <li><strong>Mindful:</strong> Penataan niat, doa khusyuk, serta kesadaran batin anak.</li>
                <li><strong>Meaningful:</strong> Mengaitkan sains & aktivitas bermain dengan kehendak Ilahi.</li>
                <li><strong>Joyful:</strong> Kegembiraan bermain peran, seni warna alami, & lagu tematik KBC.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabel Ringkas Pokok Materi Insersi KBC Panca Cinta */}
        <div className="bg-white p-4 rounded-xl border border-rose-200/80 space-y-2 text-xs">
          <span className="font-bold text-slate-800 block uppercase tracking-wider text-xs">
            📋 Ringkasan Pokok Materi Integrasi Intrakurikuler Panca Cinta KBC:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-100">
              <span className="font-bold text-rose-900 block">1. Cinta Allah & Rasul-Nya</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Sifat Jamaliyah (keindahan/welas asih), Asmaul Husna, shalat khusyuk, rasa syukur, Sirah Nabawiyah.</p>
            </div>
            <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-100">
              <span className="font-bold text-purple-900 block">2. Cinta Ilmu</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Pilar sukses mencari ilmu (niat, tekun, tawakal, syukur), adab pada guru, literasi, penalaran kritis.</p>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
              <span className="font-bold text-emerald-900 block">3. Cinta Lingkungan</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Rahmatan lil 'alamin, adab alam, larangan fasad (merusak), thaharah, hemat air & energi (larangan ishraf).</p>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100">
              <span className="font-bold text-amber-900 block">4. Cinta Diri & Sesama</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Self-compassion, menjaga kesehatan/kebersihan tubuh, ukhuwah Islamiyah & insaniyah, ta'awun, tasamuh.</p>
            </div>
            <div className="p-2.5 bg-sky-50 rounded-lg border border-sky-100">
              <span className="font-bold text-sky-900 block">5. Cinta Tanah Air</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Ukhuwah wathaniyah, Hubbul Wathan minal Iman, menghormati keragaman budaya/suku (QS. Al-Hujurat: 13).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section khusus: Kedalaman Berbasis Konteks (KBC - Context-Based Depth) */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
          <div>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Pendekatan Utama KBC & Kurikulum Merdeka
            </span>
            <h2 className="text-lg font-extrabold text-white mt-1 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-amber-300" />
              <span>Pendekatan Kedalaman Berbasis Konteks (KBC)</span>
            </h2>
          </div>
          <span className="text-xs bg-amber-400 text-slate-900 font-extrabold px-3 py-1 rounded-xl">
            Context-Based Depth
          </span>
        </div>

        <p className="text-xs text-emerald-100 leading-relaxed">
          Pendekatan <strong>Kedalaman Berbasis Konteks (KBC)</strong> memastikan bahwa pembelajaran di Raudhatul Athfal tidak hanya bersifat permukaan (hafalan kata), melainkan <strong>berakar kuat pada konteks kehidupan nyata anak</strong> (kebun madrasah, dapur rumah, pasar tradisional, bahan alam sekitar) dan berkembang melalui <strong>4 Level Kedalaman Pemahaman PAUD</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/10 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-amber-300 font-bold block text-[11px]">Level 1: Mengamati & Merasakan</span>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Eksplorasi sensorik panca indra (meraba, mencium, mengamati) benda nyata & lingkungan sekitar.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-teal-300 font-bold block text-[11px]">Level 2: Memahami & Menghubungkan</span>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Menghubungkan fenomena alam dengan keagungan Allah SWT (Al-Khaliq) & manfaat hidup harian.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-sky-300 font-bold block text-[11px]">Level 3: Menganalisis & Mengaplikasi</span>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Eksplorasi sains kontekstual, klasifikasi bahan alam/loose parts, dan pemecahan masalah sederhana.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
            <span className="text-rose-300 font-bold block text-[11px]">Level 4: Mencipta, Beraksi & Berbagi</span>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Menghasilkan karya nyata kontekstual, mempraktikkan karakter cinta, dan berbagi hasil olahan dengan teman/keluarga.
            </p>
          </div>
        </div>
      </div>

      {/* Grid 3 Pilar Pembelajaran Mendalam */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <span>Tiga Pilar Pembelajaran Mendalam (Deep Learning) di RA</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg">
              🧘‍♂️
            </div>
            <h3 className="font-bold text-slate-900 text-sm">1. Mindful Learning (Pembelajaran Kesadaran)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Membangun kesadaran penuh anak saat belajar. Anak diajak menyadari kehadiran emosinya, niat baik sebelum beraktivitas, doa dengan khusyuk, dan fokus perhatian pada permainan tanpa terburu-buru.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-lg">
              💡
            </div>
            <h3 className="font-bold text-slate-900 text-sm">2. Meaningful Learning (Pembelajaran Bermakna)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menghubungkan materi dengan kehidupan nyata anak dan kekuasaan Allah SWT (Al-Khaliq). Anak paham *mengapa* ia menjaga kebersihan, merawat tanaman, atau berbagi dengan teman secara kontekstual.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
              🎉
            </div>
            <h3 className="font-bold text-slate-900 text-sm">3. Joyful Learning (Pembelajaran Menyenangkan)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proses bermain yang kaya stimulasi melalui invitasi bahan alam/loose parts, bernyanyi lagu KBC, eksplorasi sains, dan kebebasan bereksperimen tanpa rasa takut salah.
            </p>
          </div>
        </div>
      </div>

      {/* Grid 5 Pilar Kurikulum Berbasis Cinta (KBC) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span>Lima Pilar Kurikulum Berbasis Cinta (KBC) Raudhatul Athfal</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
            <h4 className="font-bold text-rose-900">1. Cinta Allah SWT & Rasulullah SAW</h4>
            <p className="text-slate-600 leading-relaxed">
              Mengenal sifat Allah Ar-Rahman Ar-Rahim melalui mengagumi keindahan ciptaan-Nya dan meneladani akhlak mulia Nabi Muhammad SAW.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1">
            <h4 className="font-bold text-amber-900">2. Cinta Diri & Keluarga</h4>
            <p className="text-slate-600 leading-relaxed">
              Menjaga kesehatan tubuh sebagai amanah Allah, mandiri merapikan barang, serta berbakti kepada orang tua dengan tutur kata santun.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
            <h4 className="font-bold text-emerald-900">3. Cinta Sesama Teman (Tasamuh)</h4>
            <p className="text-slate-600 leading-relaxed">
              Saling berbagi, mengantri dengan sabar, memaafkan kesalahan, dan tidak membeda-bedakan kawan (Toleransi & Kebangsaan).
            </p>
          </div>

          <div className="p-3.5 bg-teal-50/60 rounded-xl border border-teal-100 space-y-1">
            <h4 className="font-bold text-teal-900">4. Cinta Lingkungan & Alam</h4>
            <p className="text-slate-600 leading-relaxed">
              Menyiram tanaman, tidak membuang sampah sembarangan, serta hemat menggunakan air wudhu sebagai wujud kasih sayang pada bumi.
            </p>
          </div>

          <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1">
            <h4 className="font-bold text-purple-900">5. Cinta Ilmu & Inovasi (Tatwwur)</h4>
            <p className="text-slate-600 leading-relaxed">
              Antusias bertanya hal baru, suka membaca buku cerita islami, dan berani mengkreasikan karya dari bahan loose parts.
            </p>
          </div>
        </div>
      </div>

      {/* Elemen Capaian Pembelajaran RA Kurikulum Merdeka */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Capaian Pembelajaran (CP) Elemen RA (BSAP 032/H/KR)</span>
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-emerald-800 text-sm">1. Nilai Agama dan Budi Pekerti</h3>
            <p className="text-slate-700 mt-1 leading-relaxed">
              Anak mengenal dan percaya kepada Allah SWT, mempraktikkan ibadah harian (shalat, wudhu, doa), serta menunjukkan akhlakul karimah kepada diri sendiri, sesama, dan alam sekitar.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-emerald-800 text-sm">2. Jati Diri</h3>
            <p className="text-slate-700 mt-1 leading-relaxed">
              Anak mengenali, mengelola, dan mengekspresikan emosi diri, membangun hubungan sosial yang sehat, serta menunjukkan kemandirian, ketangkasan fisik motorik kasar dan halus.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-emerald-800 text-sm">3. Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)</h3>
            <p className="text-slate-700 mt-1 leading-relaxed">
              Anak memahami pesan bahasa lisan/tulis, menyukai buku, mengenali pola dan bilangan matematika sederhana, mengeksplorasi fenomena sains alam, serta menuangkan imajinasi melalui karya seni.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
