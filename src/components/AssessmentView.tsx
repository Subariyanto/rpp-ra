import React, { useState } from 'react';
import { MuridRA, AsesmenHarian, SkalaPerkembangan } from '../types';
import { Award, Plus, Calendar, FileText, CheckCircle2, Search, Filter, ShieldCheck, Heart } from 'lucide-react';

interface AssessmentViewProps {
  muridList: MuridRA[];
  asesmenList: AsesmenHarian[];
  onAddAsesmen: (asesmen: AsesmenHarian) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  muridList,
  asesmenList,
  onAddAsesmen,
}) => {
  const [selectedMuridId, setSelectedMuridId] = useState<string>(muridList[0]?.id || '');
  const [selectedCP, setSelectedCP] = useState<string>('Nilai Agama dan Budi Pekerti');
  const [skala, setSkala] = useState<SkalaPerkembangan>('BSH');
  const [catatanAnekdot, setCatatanAnekdot] = useState('');
  const [dimensiProfilLulusan, setDimensiProfilLulusan] = useState('Keimanan & Ketakwaan kepada Tuhan YME');
  const [konteksKegiatan, setKonteksKegiatan] = useState('');

  const selectedMurid = muridList.find((m) => m.id === selectedMuridId);
  const studentAsesmen = asesmenList.filter((a) => a.muridId === selectedMuridId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMuridId || !catatanAnekdot) return;

    const newAsesmen: AsesmenHarian = {
      id: `a-${Date.now()}`,
      tanggal: new Date().toISOString().split('T')[0],
      muridId: selectedMuridId,
      elemenCP: selectedCP,
      skalaPerkembangan: skala,
      catatanAnekdot,
      dimensiProfilLulusan,
      konteksKegiatan: konteksKegiatan || 'Eksplorasi Kontekstual di Madrasah/Rumah',
    };

    onAddAsesmen(newAsesmen);
    setCatatanAnekdot('');
    setKonteksKegiatan('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-emerald-100 text-xs px-2.5 py-0.5 rounded-full font-semibold">
            Asesmen Kurikulum Merdeka RA
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">
            Asesmen Perkembangan Anak & Catatan Anekdot
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            Input penilaian harian berbasis Capaian Pembelajaran (CP) untuk portofolio anak.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Input Asesmen Harian (Left 5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Input Asesmen & Catatan Anekdot</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Pilih Murid */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Peserta Didik</label>
              <select
                value={selectedMuridId}
                onChange={(e) => setSelectedMuridId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {muridList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.namaLengkap} ({m.kelompok})
                  </option>
                ))}
              </select>
            </div>

            {/* Elemen CP */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Elemen Capaian Pembelajaran (CP)</label>
              <select
                value={selectedCP}
                onChange={(e) => setSelectedCP(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Nilai Agama dan Budi Pekerti">Nilai Agama dan Budi Pekerti</option>
                <option value="Jati Diri">Jati Diri</option>
                <option value="Literasi & STEAM">Literasi, Matematika, Sains & Seni (STEAM)</option>
                <option value="Kurikulum Berbasis Cinta">Kurikulum Berbasis Cinta (Panca Cinta)</option>
              </select>
            </div>

            {/* Skala Perkembangan (BB, MB, BSH, BSB) */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Skala Capaian Perkembangan:</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: 'BB', label: 'BB', desc: 'Belum Berkembang' },
                  { key: 'MB', label: 'MB', desc: 'Mulai Berkembang' },
                  { key: 'BSH', label: 'BSH', desc: 'Sesuai Harapan' },
                  { key: 'BSB', label: 'BSB', desc: 'Sangat Baik' },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSkala(s.key as SkalaPerkembangan)}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      skala === s.key
                        ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-sm">{s.label}</span>
                    <span className="text-[9px] opacity-80 block">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensi Profil Lulusan (8 DPL - KMA 1503) */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Dimensi Profil Lulusan (8 DPL - KMA 1503)</label>
              <select
                value={dimensiProfilLulusan}
                onChange={(e) => setDimensiProfilLulusan(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="Keimanan & Ketakwaan kepada Tuhan YME">1. Keimanan & Ketakwaan kepada Tuhan YME</option>
                <option value="Kewargaan">2. Kewargaan</option>
                <option value="Penalaran Kritis">3. Penalaran Kritis</option>
                <option value="Kreativitas">4. Kreativitas</option>
                <option value="Kolaborasi">5. Kolaborasi</option>
                <option value="Kemandirian">6. Kemandirian</option>
                <option value="Kesehatan">7. Kesehatan</option>
                <option value="Komunikasi">8. Komunikasi</option>
              </select>
            </div>

            {/* Konteks Latar Kegiatan */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Konteks Latar Kegiatan (Kedalaman Berbasis Konteks)
              </label>
              <input
                type="text"
                value={konteksKegiatan}
                onChange={(e) => setKonteksKegiatan(e.target.value)}
                placeholder="misal: Eksplorasi kebun rimpang jahe di halaman madrasah"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            {/* Catatan Anekdot */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Catatan Anekdot & Perilaku Teramati</label>
              <textarea
                rows={3}
                value={catatanAnekdot}
                onChange={(e) => setCatatanAnekdot(e.target.value)}
                required
                placeholder="Ceritakan kejadian nyata, kalimat yang diucapkan anak, atau hasil karya unik yang dibuat anak..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Catatan Asesmen</span>
            </button>
          </form>
        </div>

        {/* Right 7 cols: Student Progress History */}
        <div className="lg:col-span-7 space-y-4">
          {selectedMurid && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
                <img
                  src={selectedMurid.avatar}
                  alt={selectedMurid.namaLengkap}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-200"
                />
                <div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {selectedMurid.kelompok}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{selectedMurid.namaLengkap}</h3>
                  <p className="text-xs text-slate-500">
                    NIS: {selectedMurid.nis} • Orang Tua: {selectedMurid.namaOrangTua}
                  </p>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Riwayat Asesmen Perkembangan ({studentAsesmen.length} Record)
              </h4>

              {studentAsesmen.length === 0 ? (
                <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs">
                  Belum ada catatan asesmen harian untuk anak ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {studentAsesmen.map((item) => (
                    <div key={item.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {item.elemenCP}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.dimensiProfilLulusan}
                          </span>
                          <span
                            className={`font-extrabold px-2.5 py-0.5 rounded text-[11px] ${
                              item.skalaPerkembangan === 'BSB'
                                ? 'bg-emerald-600 text-white'
                                : item.skalaPerkembangan === 'BSH'
                                ? 'bg-teal-600 text-white'
                                : item.skalaPerkembangan === 'MB'
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-400 text-white'
                            }`}
                          >
                            {item.skalaPerkembangan}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-700 leading-relaxed font-medium mt-1">"{item.catatanAnekdot}"</p>

                      <div className="flex justify-end text-[10px] text-slate-400 pt-1">
                        <span>Dicatat pada {item.tanggal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
