import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, CheckCircle2, Heart, Award, Compass, Layers, ArrowRight, Printer, Info } from 'lucide-react';
import { DAFTAR_CP_BSKAP_046 } from '../data/cpAtpData';
import { ProfilMadrasah } from '../types';

interface DaftarCPViewProps {
  profilMadrasah?: ProfilMadrasah;
  onNavigateToAnalisis?: () => void;
  onNavigateToATP?: () => void;
}

export const DaftarCPView: React.FC<DaftarCPViewProps> = ({
  profilMadrasah,
  onNavigateToAnalisis = () => {},
  onNavigateToATP = () => {},
}) => {
  const [selectedElemenId, setSelectedElemenId] = useState<string>('cp-elem-1');
  const [searchQuery, setSearchQuery] = useState('');

  const currentElemen = DAFTAR_CP_BSKAP_046.find((e) => e.id === selectedElemenId) || DAFTAR_CP_BSKAP_046[0];

  const filteredSubElemen = currentElemen.subElemen.filter((sub) =>
    sub.namaSubElemen.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.capaianFaseFondasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.integrasiKBC.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full border border-emerald-400/30">
                Regulasi Resmi
              </span>
              <span className="bg-teal-500/20 text-teal-200 text-xs font-bold px-3 py-1 rounded-full border border-teal-400/30">
                BSKAP No. 046/H/KR/2025
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                KMA 1503 & KBC
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Capaian Pembelajaran (CP) PAUD / RA
            </h1>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Standar kompetensi fase fondasi untuk anak usia dini (4–6 tahun) pada Raudhatul Athfal (RA), mencakup 3 Elemen Utama yang terintegrasi dengan Kurikulum Berbasis Cinta (KBC) dan 8 Dimensi Profil Lulusan Kemenag.
            </p>
          </div>

          {/* Quick Flow Shortcuts */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={onNavigateToAnalisis}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>Lanjut ke Analisis CP & TP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToATP}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Lihat Alur Tujuan (ATP)</span>
              <Compass className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Elemen Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DAFTAR_CP_BSKAP_046.map((elem, idx) => {
          const isSelected = elem.id === selectedElemenId;
          const colors = [
            {
              border: isSelected ? 'border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white hover:border-emerald-300',
              badge: 'bg-emerald-600 text-white',
              title: 'text-emerald-950',
            },
            {
              border: isSelected ? 'border-sky-500 bg-sky-50/80 shadow-md ring-2 ring-sky-500/20' : 'border-slate-200 bg-white hover:border-sky-300',
              badge: 'bg-sky-600 text-white',
              title: 'text-sky-950',
            },
            {
              border: isSelected ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-500/20' : 'border-slate-200 bg-white hover:border-amber-300',
              badge: 'bg-amber-600 text-white',
              title: 'text-amber-950',
            }
          ][idx % 3];

          return (
            <button
              key={elem.id}
              onClick={() => setSelectedElemenId(elem.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${colors.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${colors.badge}`}>
                  {elem.kodeElemen}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {elem.subElemen.length} Sub-Elemen
                </span>
              </div>
              <h3 className={`font-black text-sm mb-1 line-clamp-2 ${colors.title}`}>
                {elem.namaElemen}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {elem.deskripsiElemen}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Elemen Detail & Sub-Elemen Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Elemen Summary */}
        <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-md">
                {currentElemen.kodeElemen}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {currentElemen.namaElemen}
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-3xl">
              {currentElemen.deskripsiElemen}
            </p>
          </div>

          {/* Search bar inside view */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari indikator CP..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Sub-Elemen List */}
        <div className="grid grid-cols-1 gap-5">
          {filteredSubElemen.map((sub, sIdx) => (
            <div
              key={sub.kode}
              className="rounded-2xl border border-slate-200/80 hover:border-emerald-200 bg-slate-50/50 hover:bg-white p-5 transition-all shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-600 text-white font-mono text-xs font-black px-2 py-0.5 rounded-md">
                    Sub-Elemen {sub.kode}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {sub.namaSubElemen}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center space-x-1 bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-rose-200/60">
                    <Heart className="w-3 h-3 text-rose-500" />
                    <span>{sub.integrasiKBC}</span>
                  </span>
                </div>
              </div>

              {/* Capaian Akhir Fase Fondasi */}
              <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-100/80">
                <div className="flex items-center space-x-1.5 text-emerald-900 text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Capaian Akhir Fase Fondasi (BSKAP 046):</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  "{sub.capaianFaseFondasi}"
                </p>
              </div>

              {/* Indikator Kunci & 8 DPL */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Indikator Perilaku / Ketercapaian Anak:
                  </span>
                  <ul className="space-y-1.5">
                    {sub.indikatorKunci.map((ind, indIdx) => (
                      <li key={indIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Dimensi Profil Lulusan RA (KMA 1503):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sub.dimensiDPL.map((dpl, dIdx) => (
                      <span
                        key={dIdx}
                        className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 flex items-center space-x-1"
                      >
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>{dpl}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
