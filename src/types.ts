export type KelompokUsia = 'KB (3-4 Tahun)' | 'RA A (4-5 Tahun)' | 'RA B (5-6 Tahun)';

export interface KedalamanBerbasisKonteks {
  konteksLokal: string; // Lingkungan nyata / bahan alam yang dieksplorasi anak
  petaKedalaman: {
    mengamati: string; // Level 1: Mengamati & Merasakan (Feel/Observe)
    memahami: string; // Level 2: Memahami & Menghubungkan (Understand/Connect)
    mengaitkan: string; // Level 3: Menganalisis & Mengaplikasikan (Apply/Explore)
    menciptaBeraksi: string; // Level 4: Mencipta, Beraksi & Berbagi (Create, Act & Share)
  };
  keterkaitanKehidupanNyata: string; // Relevansi kontekstual dengan kehidupan harian anak
}

export interface TujuanPembelajaranItem {
  elemenCP: string;
  tujuan: string;
  konteksAnak?: string; // Konteks spesifik anak/lingkungan
  indikatorKedalaman?: string; // Indikator pencapaian kedalaman pemahaman
  integrasiKBC: string; // Panca Cinta
  profilLulusanDPL?: string[]; // 8 Dimensi Profil Lulusan (KMA 1503)
}

export interface BahasaArabKata {
  kata: string;
  artinya: string;
}

export interface RagamMainItem {
  namaSentraArea: string;
  deskripsiKegiatan: string;
  bahanLooseParts: string[];
}

export interface KegiatanHarian {
  hari: string;
  subTopikHarian: string;
  pembukaanMindful: {
    durasi: string;
    kegiatan: string[];
  };
  intiJoyful: {
    durasi: string;
    pilihanRagamMain: RagamMainItem[];
  };
  penutupMeaningful: {
    durasi: string;
    kegiatan: string[];
  };
}

export interface RubrikChecklistItem {
  indikatorCP: string;
  kriteriaBB: string;
  kriteriaMB: string;
  kriteriaBSH: string;
  kriteriaBSB: string;
}

export interface UserSession {
  username: string;
  namaLengkap: string;
  namaRA: string;
  activationCode: string;
  activatedAt: string;
  role: 'admin' | 'user';
  expiresAt?: string;
}

export interface RegisteredUser {
  username: string;
  password: string;
  namaLengkap: string;
  namaRA: string;
  activationCode: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface ActivationKey {
  code: string;
  assignedTo?: string;
  role: 'admin' | 'user';
  createdAt: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: string;
  note?: string;
}

export interface ProfilMadrasah {
  namaYayasan: string;
  namaRA: string;
  nsmNpsn: string;
  alamat: string;
  kotaKabupaten: string;
  namaKepalaRA: string;
  namaGuruDefault: string;
  logoUrl?: string; // Base64 data URL atau URL Logo Madrasah/Yayasan
}

export interface RPPModulAjar {
  id: string;
  createdDate: string;
  identitas: {
    namaYayasan?: string;
    namaRA: string;
    namaGuru: string;
    logoUrl?: string;
    nsmNpsn?: string;
    alamat?: string;
    kotaKabupaten?: string;
    kelompokUsia: KelompokUsia | string;
    semester: string;
    mingguKe: string;
    topikUtama: string;
    subTopik: string;
    alokasiWaktu: string;
    petaKonsepGagasan: string[];
    dimensiProfilLulusan?: string[]; // 8 DPL (KMA 1503)
    topikPancaCinta?: string[]; // KBC Panca Cinta
    materiIntegrasiKBC?: string[]; // Materi insersi/integrasi KBC (syukur, thaharah, adab)
    metodeIntrakurikulerKBC?: string; // FIDS (Feel Imagine Do Share), ARKA (Experiential), LOK-R, Deep Learning
    konteksLokalUtama?: string; // Konteks lingkungan lokal anak
  };
  kedalamanBerbasisKonteks?: KedalamanBerbasisKonteks; // Pendekatan KBC & Deep Learning
  alurIntrakurikulerSteps?: {
    tahapan: string;
    deskripsi: string;
  }[];
  tujuanPembelajaran: TujuanPembelajaranItem[];
  kataKunciDanKosakata: string[];
  kataBahasaArabSederhana: BahasaArabKata[];
  saranaPrasaranaMedia: string[];
  pertanyaanPemantik: {
    mindful: string[];
    meaningful: string[];
    joyful: string[];
  };
  kegiatanMingguan: KegiatanHarian[];
  asesmenPerkembangan: {
    teknikAsesmen: string[];
    rubrikChecklist: RubrikChecklistItem[];
    catatanAnekdotPanduan: string;
  };
  refleksiGuru: string[];
  kegiatanDiRumahKBC: string[];
}

export interface MuridRA {
  id: string;
  namaLengkap: string;
  namaPanggilan: string;
  kelompok: 'RA A' | 'RA B' | 'KB';
  jenisKelamin: 'L' | 'P';
  nis: string;
  namaOrangTua: string;
  avatar: string;
}

export interface PresensiAnak {
  id: string;
  tanggal: string;
  muridId: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
  emosiPagi: 'Senang' | 'Semangat' | 'Sedih' | 'Mengantuk' | 'Malu';
  catatanKarakterKBC?: string;
}

export type SkalaPerkembangan = 'BB' | 'MB' | 'BSH' | 'BSB';

export interface AsesmenHarian {
  id: string;
  tanggal: string;
  muridId: string;
  elemenCP: string;
  skalaPerkembangan: SkalaPerkembangan;
  catatanAnekdot: string;
  dimensiProfilLulusan: string; // Delapan Profil Lulusan / KBC
  konteksKegiatan?: string; // Latar/konteks kegiatan kontekstual
  buktiPerkembangan?: string; // Bukti teramati
}

export interface BankTopikItem {
  id: string;
  topik: string;
  kelompokRekomendasi: string;
  kategori: string;
  fokusKBC: string;
  dimensiProfilLulusan: string[]; // 8 DPL
  subTopikRekomendasi: string[];
  contohRagamMain: string[];
  konteksLokalRekomendasi?: string; // Lingkungan/konteks lokal
}
