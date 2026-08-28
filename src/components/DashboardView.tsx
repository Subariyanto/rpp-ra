import React from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  Heart,
  Plus,
  ArrowRight,
  Printer,
  Calendar,
  Smile,
  CheckCircle2,
  Clock,
  Building2,
  PhoneCall,
  Flame,
  FileText,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { RPPModulAjar, MuridRA, PresensiAnak, AsesmenHarian, ProfilMadrasah, UserSession } from '../types';

interface DashboardViewProps {
  userSession: UserSession | null;
  profilMadrasah: ProfilMadrasah;
  modules: RPPModulAjar[];
  murids: MuridRA[];
  presensis: PresensiAnak[];
  asesmens: AsesmenHarian[];
  onOpenGenerator: () => void;
  onNavigateTab: (tab: 'generator' | 'my-modules' | 'classroom' | 'assessment' | 'bank-topics' | 'guide' | 'madrasah' | 'infografis') => void;
  onSelectModule: (m: RPPModulAjar) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userSession,
  profilMadrasah,
  modules,
  murids,
  presensis,
  asesmens,
  onOpenGenerator,
  onNavigateTab,
  onSelectModule,
}) => {
  // Statistics calculations
  const totalModules = modules.length;
  const totalMurids = murids.length;
  const totalMuridA = murids.filter((m) => m.kelompok === 'RA A').length;
  const totalMuridB = murids.filter((m) => m.kelompok === 'RA B').length;

  const totalHadir = presensis.filter((p) => p.status === 'Hadir').length;
  const totalIzinSakit = presensis.filter((p) => p.status === 'Izin' || p.status === 'Sakit').length;
  const senangCount = presensis.filter((p) => p.emosiPagi === 'Senang' || p.emosiPagi === 'Semangat').length;

  const totalAsesmen = asesmens.length;
  const bshBsbCount = asesmens.filter((a) => a.skalaPerkembangan === 'BSH' || a.skalaPerkembangan === 'BSB').length;

  // Current Date string formatted in Indonesian
  const todayDateStr = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const recentModules = modules.slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Welcome Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white shadow-xl border border-emerald-700/50 p-6 sm:p-8">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-emerald-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KMA 1503 / 2025</span>
              </span>
              <span className="bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>{todayDateStr}</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-200 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-400/30">
                Kurikulum Berbasis Cinta (KBC)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ahlan wa Sahlan,{' '}
              <span className="text-amber-300">
                {userSession?.namaLengkap || 'Ustadzah RA'}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Dashboard Administrasi Pembelajaran Terpadu{' '}
              <strong className="text-white font-bold">{profilMadrasah.namaRA || 'RA Percontohan'}</strong>. 
              Rancang modul ajar mendalam *(Mindful, Meaningful, Joyful)*, kelola presensi emosi, dan asesmen capaian perkembangan dengan mudah.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-emerald-200/80">
              <span className="flex items-center space-x-1">
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{profilMadrasah.namaYayasan || 'Yayasan Pengelola RA'}</span>
              </span>
              <span>•</span>
              <span className="font-mono">NSM/NPSN: {profilMadrasah.nsmNpsn || '10123456789'}</span>
            </div>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onOpenGenerator}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>+ Susun RPP AI Cerdas</span>
            </button>

            <button
              onClick={() => onNavigateTab('classroom')}
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-5 py-3 rounded-2xl border border-white/20 transition-all flex items-center justify-center space-x-2 backdrop-blur-md active:scale-95 cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-300" />
              <span>Presensi & Mood Pagi Ini</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Modul Ajar */}
        <div
          onClick={() => onNavigateTab('my-modules')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Modul Ajar Saya</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">{totalModules}</div>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Siap Cetak Standar A4</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-emerald-700 font-medium">
            <span>Buka daftar modul</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 2: Murid RA */}
        <div
          onClick={() => onNavigateTab('classroom')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Peserta Didik</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">{totalMurids} <span className="text-xs font-normal text-slate-500">Anak</span></div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              RA A ({totalMuridA}) • RA B ({totalMuridB})
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-teal-700 font-medium">
            <span>Kelola data kelas & rombel</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 3: Presensi & Mood */}
        <div
          onClick={() => onNavigateTab('classroom')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Presensi Hari Ini</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Smile className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {totalHadir} <span className="text-xs font-normal text-slate-500">Hadir</span>
            </div>
            <p className="text-xs text-amber-800 font-semibold mt-0.5 flex items-center space-x-1">
              <span>😊 {senangCount} Ceria / Semangat</span>
              {totalIzinSakit > 0 && <span className="text-slate-400">• {totalIzinSakit} Sakit/Izin</span>}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-amber-700 font-medium">
            <span>Lihat catatan absensi</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 4: Asesmen Perkembangan */}
        <div
          onClick={() => onNavigateTab('assessment')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Asesmen Capaian</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">{totalAsesmen} <span className="text-xs font-normal text-slate-500">Catatan</span></div>
            <p className="text-xs text-rose-700 font-semibold mt-0.5">
              {bshBsbCount} Berkembang Sesuai Harapan (BSH/BSB)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-rose-700 font-medium">
            <span>Rekapitulasi rapor anak</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* 3. Main Action Hub & Recent Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Modul Ajar Terkini */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Modul Ajar RA Terkini</span>
              </h2>
              <p className="text-xs text-slate-500">Daftar RPP aktif yang siap digunakan mengajar dan dicetak.</p>
            </div>

            <button
              onClick={() => onNavigateTab('my-modules')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Lihat Semua ({modules.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentModules.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  onSelectModule(m);
                  onNavigateTab('my-modules');
                }}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {m.identitas.kelompokUsia}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {m.identitas.semester} • {m.identitas.mingguKe}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Alokasi: {m.identitas.alokasiWaktu}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {m.identitas.topikUtama}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-1">
                    Subtopik: <span className="font-semibold text-slate-800">{m.identitas.subTopik}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectModule(m);
                      onNavigateTab('my-modules');
                    }}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <span>Buka RPP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {modules.length === 0 && (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 text-sm">Belum Ada Modul Ajar</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Mulai buat modul ajar pertama Anda dengan generator AI yang otomatis mengintegrasikan KMA 1503 dan KBC.
                </p>
                <button
                  onClick={onOpenGenerator}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat RPP Baru</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Shortcut Center & Promo Card */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>Akses Cepat Fitur</span>
            </h2>
            <p className="text-xs text-slate-500">Pintasan navigasi menu terpenting aplikasi.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigateTab('bank-topics')}
              className="p-3.5 bg-white hover:bg-rose-50/70 rounded-2xl border border-slate-200/90 hover:border-rose-300 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Heart className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-rose-700">Bank Topik KBC</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Inspirasi ragam main</p>
            </button>

            <button
              onClick={() => onNavigateTab('guide')}
              className="p-3.5 bg-white hover:bg-teal-50/70 rounded-2xl border border-slate-200/90 hover:border-teal-300 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">Panduan KMA 1503</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Regulasi & kurikulum</p>
            </button>

            <button
              onClick={() => onNavigateTab('madrasah')}
              className="p-3.5 bg-white hover:bg-emerald-50/70 rounded-2xl border border-slate-200/90 hover:border-emerald-300 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">Kop & Profil RA</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Atur logo & tanda tangan</p>
            </button>

            <button
              onClick={() => onNavigateTab('infografis')}
              className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-2xl border border-amber-300 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-amber-900">Brosur & Lisensi</p>
              <p className="text-[10px] text-amber-800 font-semibold mt-0.5">Promo Rp. 100.000,-</p>
            </button>
          </div>

          {/* Promotion & WA Support Mini Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-emerald-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Promo Rp. 100.000,-
              </span>
              <span className="text-[11px] text-emerald-300 font-mono">Bantuan Resmi</span>
            </div>

            <div>
              <p className="text-xs font-bold text-white">Butuh Lisensi Tambahan / Bantuan?</p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Konsultasikan aktivasi guru & yayasan langsung ke admin WhatsApp resmi.
              </p>
            </div>

            <a
              href="https://wa.me/6282330647698?text=Assalamu'alaikum%20Admin,%20saya%20tertarik%20dengan%20Aplikasi%20RPP%20RA%20KBC%20KMA%201503%20dengan%20harga%20promo%20Rp.%20100.000,-."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>WhatsApp: 082330647698</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Nilai Inti KBC & 8 Dimensi Profil Lulusan KMA 1503 */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span>8 Dimensi Profil Lulusan & Kurikulum Berbasis Cinta (KMA 1503/2025)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Prinsip pembelajaran holistik integratif RA untuk membangun fitrah iman, adab, dan kecerdasan anak.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('guide')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1 shrink-0"
          >
            <span>Pelajari Panduan Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/70">
            <p className="text-[11px] font-bold text-emerald-900">1. Keimanan & Ketaqwaan</p>
            <p className="text-[10px] text-emerald-700 mt-0.5">Fitrah tauhid, mencintai Allah & Rasulullah</p>
          </div>
          <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200/70">
            <p className="text-[11px] font-bold text-teal-900">2. Kematangan Emosi</p>
            <p className="text-[10px] text-teal-700 mt-0.5">Empati, regulasi diri & kasih sayang sesama</p>
          </div>
          <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200/70">
            <p className="text-[11px] font-bold text-blue-900">3. Cinta Tanah Air</p>
            <p className="text-[10px] text-blue-700 mt-0.5">Kebangsaan, moderasi beragama & toleransi</p>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/70">
            <p className="text-[11px] font-bold text-amber-900">4. Nalar Kritis & Inkuiri</p>
            <p className="text-[10px] text-amber-700 mt-0.5">Eksplorasi bahan alam & problem solving</p>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200/70">
            <p className="text-[11px] font-bold text-purple-900">5. Kreativitas & Karya</p>
            <p className="text-[10px] text-purple-700 mt-0.5">Ragam main loose parts & ekspresi seni</p>
          </div>
          <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200/70">
            <p className="text-[11px] font-bold text-rose-900">6. Kolaborasi & Gotong Royong</p>
            <p className="text-[10px] text-rose-700 mt-0.5">Bekerja sama, berbagi & peduli kawan</p>
          </div>
          <div className="p-3 bg-lime-50/70 rounded-2xl border border-lime-200/70">
            <p className="text-[11px] font-bold text-lime-900">7. Kemandirian & Tanggung Jawab</p>
            <p className="text-[10px] text-lime-700 mt-0.5">Toilet training, merapikan alat main</p>
          </div>
          <div className="p-3 bg-cyan-50/70 rounded-2xl border border-cyan-200/70">
            <p className="text-[11px] font-bold text-cyan-900">8. Komunikasi Bermakna</p>
            <p className="text-[10px] text-cyan-700 mt-0.5">Literasi dasar, kosakata santun & bahasa Arab</p>
          </div>
        </div>
      </div>
    </div>
  );
};
