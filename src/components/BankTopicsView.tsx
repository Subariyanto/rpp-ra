import React, { useState } from 'react';
import { BankTopikItem } from '../types';
import { Heart, Sparkles, BookOpen, Search, ArrowRight, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface BankTopicsViewProps {
  topics: BankTopikItem[];
  onSelectTopicForGenerator: (topik: string, subTopik: string) => void;
}

export const BankTopicsView: React.FC<BankTopicsViewProps> = ({
  topics,
  onSelectTopicForGenerator,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<BankTopikItem | null>(topics[0] || null);

  const [aiPetaKonsep, setAiPetaKonsep] = useState<any | null>(null);
  const [isLoadingPeta, setIsLoadingPeta] = useState(false);

  const [aiLkpd, setAiLkpd] = useState<any | null>(null);
  const [isLoadingLkpd, setIsLoadingLkpd] = useState(false);

  const filteredTopics = topics.filter(
    (t) =>
      t.topik.toLowerCase().includes(search.toLowerCase()) ||
      t.fokusKBC.toLowerCase().includes(search.toLowerCase()) ||
      t.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const handleGeneratePetaKonsep = async (topikText: string) => {
    setIsLoadingPeta(true);
    setAiPetaKonsep(null);

    try {
      const res = await fetch('/api/generate-peta-konsep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topik: topikText }),
      });
      const data = await res.json();
      if (data.success) {
        setAiPetaKonsep(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingPeta(false);
    }
  };

  const handleGenerateLkpd = async (topikText: string) => {
    setIsLoadingLkpd(true);
    setAiLkpd(null);

    try {
      const res = await fetch('/api/generate-lkpd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topik: topikText, kelompokUsia: 'RA B (5-6 Th)' }),
      });
      const data = await res.json();
      if (data.success) {
        setAiLkpd(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLkpd(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-emerald-800 to-rose-900 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-rose-100 text-xs px-2.5 py-0.5 rounded-full font-semibold">
            Inspirasi Topik Pembelajaran KBC RA
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">
            Bank Ide Topik & Peta Konsep Kurikulum Berbasis Cinta
          </h1>
          <p className="text-xs text-rose-100 mt-1 max-w-xl">
            Pilih topik menarik, dapatkan cabang konsep AI instan, dan gunakan sebagai bahan pembuatan Modul Ajar otomatis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List Topik (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ide topik, KBC, atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTopics.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedTopic(item);
                  setAiPetaKonsep(null);
                  setAiLkpd(null);
                }}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all space-y-2 ${
                  selectedTopic?.id === item.id
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                    {item.kategori}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{item.kelompokRekomendasi}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{item.topik}</h3>

                <p className="text-slate-600 text-[11px] font-medium flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-rose-500 inline" />
                  <span>Fokus KBC: {item.fokusKBC}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Topik & AI Concept Mindmap (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedTopic && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    {selectedTopic.kategori}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedTopic.topik}</h2>
                  <p className="text-xs text-rose-700 font-semibold mt-0.5">💖 KBC: {selectedTopic.fokusKBC}</p>
                </div>

                <button
                  onClick={() =>
                    onSelectTopicForGenerator(
                      selectedTopic.topik,
                      selectedTopic.subTopikRekomendasi[0] || selectedTopic.topik
                    )
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Jadikan RPP AI</span>
                </button>
              </div>

              {/* Sub Topik & Contoh Ragam Main */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Sub-Topik Rekomendasi
                  </h4>
                  <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1">
                    {selectedTopic.subTopikRekomendasi.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-1.5">
                  <h4 className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
                    Contoh Invitasi Ragam Main Loose Parts
                  </h4>
                  <ul className="list-disc list-outside pl-4 text-slate-700 space-y-1">
                    {selectedTopic.contohRagamMain.map((main, i) => (
                      <li key={i}>{main}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Peta Konsep Generator Section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Peta Konsep & Cabang Gagasan AI</span>
                  </h3>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleGeneratePetaKonsep(selectedTopic.topik)}
                      disabled={isLoadingPeta}
                      className="bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isLoadingPeta ? 'Merancang...' : 'Generate Peta Konsep'}</span>
                    </button>

                    <button
                      onClick={() => handleGenerateLkpd(selectedTopic.topik)}
                      disabled={isLoadingLkpd}
                      className="bg-slate-100 hover:bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>{isLoadingLkpd ? 'Merancang...' : 'Generate Aktivitas Rumah KBC'}</span>
                    </button>
                  </div>
                </div>

                {/* Render AI Peta Konsep Output */}
                {aiPetaKonsep && (
                  <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-3 text-xs">
                    <p className="font-bold text-emerald-900">
                      Kalimat Pemantik: "{aiPetaKonsep.kalimatPemantik}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiPetaKonsep.cabangKonsep?.map((cabang: any, cIdx: number) => (
                        <div key={cIdx} className="bg-white p-3 rounded-lg border border-emerald-200/80 space-y-1">
                          <p className="font-bold text-emerald-800">{cabang.kategori}</p>
                          <ul className="list-disc list-outside pl-4 text-slate-700 text-[11px] space-y-0.5">
                            {cabang.subKonsep?.map((sub: string, sIdx: number) => (
                              <li key={sIdx}>{sub}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Render AI LKPD Output */}
                {aiLkpd && (
                  <div className="p-4 bg-rose-50/80 rounded-xl border border-rose-200 space-y-3 text-xs">
                    <h4 className="font-bold text-rose-900">
                      Panduan Aktivitas Bermain di Rumah Bersama Orang Tua (KBC)
                    </h4>

                    <div className="space-y-2">
                      {aiLkpd.aktivitasRumah?.map((act: any, aIdx: number) => (
                        <div key={aIdx} className="bg-white p-3 rounded-lg border border-rose-200 space-y-1">
                          <p className="font-bold text-rose-800">{aIdx + 1}. {act.judul}</p>
                          <p className="text-slate-600 italic text-[11px]">{act.tujuanKBC}</p>
                          <p className="text-slate-700 font-medium">Bahan: {act.alatBahanDiRumah?.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
