import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini AI initialization helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY tidak ditemukan pada environment. Pastikan API Key diatur pada panel Secrets.');
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'Aplikasi RPP/Modul Ajar RA KBC Kurikulum Merdeka',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// API Endpoint: Generate RPP / Modul Ajar RA dengan Deep Learning & KBC
app.post('/api/generate-rpp', async (req, res) => {
  try {
    const {
      namaYayasan = 'Yayasan Mutiara Cinta Al-Azhar',
      namaRA = 'RA Perdana',
      namaGuru = 'Guru RA',
      kelompokUsia = 'RA B (5-6 Tahun)',
      semester = 'Semester I (Ganjil)',
      mingguKe = 'Minggu Ke-4',
      topikUtama = 'Aku Sayang Ciptaan Allah: Tanaman di Sekitarku',
      subTopik = 'Bunga Segar dan Sayur Sehat',
      alokasiWaktu = '5 Hari (900 Menit)',
      fokusCP = ['Nilai Agama dan Budi Pekerti', 'Jati Diri', 'Literasi & STEAM'],
      fokusKBC = ['Cinta Allah dan Rasul-Nya', 'Cinta Lingkungan'],
      modelPembelajaran = 'Kelompok dengan Ragam Main (Loose Parts)',
      konteksLokal = 'Lingkungan Kebun & Dapur RA, Bahan Alam Sekitar',
    } = req.body;

    const ai = getGeminiClient();

    const prompt = `
Anda adalah Pakar Kurikulum Raudhatul Athfal (RA) dari Kementerian Agama Republik Indonesia, spesialis dalam Kurikulum Merdeka RA berdasarkan KMA Nomor 1503 Tahun 2025 dan Kepdirjen Pendis No. 6077 Tahun 2025.
Kurikulum ini menekankan integrasi:
1. PENDEKATAN KEDALAMAN BERBASIS KONTEKS (KBC - CONTEXT-BASED DEPTH):
   - Konteks Nyata & Lokal: Pembelajaran berakar langsung pada lingkungan hidup nyata anak (kebun RA, dapur rumah, pasar tradisional, taman sekitar, bahan alam asli/loose parts).
   - 4 Level Kedalaman Pemahaman PAUD:
     1) Level 1 (Mengamati & Merasakan): Eksplorasi panca indra, mengenal objek secara riil di lingkungan anak.
     2) Level 2 (Memahami & Menghubungkan): Menghubungkan fenomena dengan keagungan Allah SWT (Al-Khaliq) & manfaat hidup harian.
     3) Level 3 (Menganalisis & Mengaplikasikan): Eksplorasi sains kontekstual, klasifikasi loose parts, dan pemecahan masalah sederhana.
     4) Level 4 (Mencipta, Beraksi & Berbagi): Menghasilkan karya unik, mempraktikkan kebiasaan baik (karakter cinta), dan berbagi kebahagiaan.

2. DELAPAN PROFIL LULUSAN (8 DPL - KMA 1503):
   (1) Keimanan dan Ketakwaan kepada Tuhan YME
   (2) Kewargaan
   (3) Penalaran Kritis
   (4) Kreativitas
   (5) Kolaborasi
   (6) Kemandirian
   (7) Kesehatan
   (8) Komunikasi

3. KURIKULUM BERBASIS CINTA (PANCA CINTA):
   (1) Cinta Allah dan Rasul-Nya
   (2) Cinta Ilmu
   (3) Cinta Lingkungan
   (4) Cinta Diri dan Sesama Manusia
   (5) Cinta Tanah Air

4. TIGA PILAR PEMBELAJARAN MENDALAM (DEEP LEARNING):
   - Mindful Learning (Berkesadaran): Penataan niat, doa khusyuk, kesadaran emosi & kehadiran batin.
   - Meaningful Learning (Bermakna): Mengaitkan materi dengan pengalaman nyata & kekuasaan Ilahi.
   - Joyful Learning (Menggembirakan): Bermain peran, eksplorasi loose parts, eksperimen gembira, dan lagu tematik.

Buatkan Modul Ajar / RPP RA Lengkap dan Terstruktur untuk data berikut:
- Nama Yayasan: ${namaYayasan}
- Nama RA: ${namaRA}
- Nama Guru: ${namaGuru}
- Kelompok Usia: ${kelompokUsia}
- Semester / Minggu: ${semester} / ${mingguKe}
- Topik Utama: ${topikUtama}
- Sub Topik / Kalimat Pemantik: ${subTopik}
- Alokasi Waktu: ${alokasiWaktu}
- Konteks Lokal Anak: ${konteksLokal}
- Fokus CP RA: ${fokusCP.join(', ')}
- Topik Panca Cinta (KBC): ${fokusKBC.join(', ')}
- Model Pembelajaran: ${modelPembelajaran}

Buat output JSON dengan struktur presisi berikut:
{
  "identitas": {
    "namaYayasan": string,
    "namaRA": string,
    "namaGuru": string,
    "kelompokUsia": string,
    "semester": string,
    "mingguKe": string,
    "topikUtama": string,
    "subTopik": string,
    "alokasiWaktu": string,
    "konteksLokalUtama": string,
    "petaKonsepGagasan": [string],
    "dimensiProfilLulusan": [string], // Pilih yang relevan dari 8 DPL KMA 1503
    "topikPancaCinta": [string], // Pilih dari Panca Cinta KBC
    "materiIntegrasiKBC": [string], // Materi insersi/integrasi KBC (syukur, thaharah, adab pada alam/sesama, sifat Rasulullah)
    "metodeIntrakurikulerKBC": string // contoh: "Project Based Learning (FIDS: Feel, Imagine, Do, Share)" atau "Experiential Learning (ARKA)" atau "LOK-R"
  },
  "kedalamanBerbasisKonteks": {
    "konteksLokal": string, // Lingkungan nyata & bahan alam lokal yang dieksplorasi
    "petaKedalaman": {
      "mengamati": string, // L1: Pengalaman mengamati & eksplorasi sensorik
      "memahami": string, // L2: Pemahaman makna & keterkaitan dengan Allah SWT
      "mengaitkan": string, // L3: Eksplorasi sains, matematika, & loose parts kontekstual
      "menciptaBeraksi": string // L4: Karya nyata, aksi kepedulian, & berbagi dengan kawan
    },
    "keterkaitanKehidupanNyata": string
  },
  "alurIntrakurikulerSteps": [
    {
      "tahapan": string, // contoh: "1. Feel (Merasakan & Mengamati)", "2. Imagine (Membayangkan & Merencana)", "3. Do (Mempraktikkan & Berkarya)", "4. Share (Berbagi & Edukasi)"
      "deskripsi": string
    }
  ],
  "tujuanPembelajaran": [
    {
      "elemenCP": string,
      "tujuan": string,
      "konteksAnak": string,
      "indikatorKedalaman": string,
      "integrasiKBC": string,
      "profilLulusanDPL": [string]
    }
  ],
  "kataKunciDanKosakata": [string],
  "kataBahasaArabSederhana": [
    { "kata": string, "artinya": string }
  ],
  "saranaPrasaranaMedia": [string],
  "pertanyaanPemantik": {
    "mindful": [string],
    "meaningful": [string],
    "joyful": [string]
  },
  "kegiatanMingguan": [
    {
      "hari": string, // e.g. "Senin"
      "subTopikHarian": string,
      "pembukaanMindful": {
        "durasi": "30 Menit",
        "kegiatan": [string] // Doa, sapaan KBC, lagu, apersepsi kontekstual
      },
      "intiJoyful": {
        "durasi": "90 Menit",
        "pilihanRagamMain": [
          {
            "namaSentraArea": string,
            "deskripsiKegiatan": string,
            "bahanLooseParts": [string]
          }
        ]
      },
      "penutupMeaningful": {
        "durasi": "30 Menit",
        "kegiatan": [string] // Refleksi emosi, apresiasi KBC, doa penutup
      }
    }
  ],
  "asesmenPerkembangan": {
    "teknikAsesmen": [string],
    "rubrikChecklist": [
      {
        "indikatorCP": string,
        "kriteriaBB": string,
        "kriteriaMB": string,
        "kriteriaBSH": string,
        "kriteriaBSB": string
      }
    ],
    "catatanAnekdotPanduan": string
  },
  "refleksiGuru": [string],
  "kegiatanDiRumahKBC": [string]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating RPP:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Gagal menghasilkan RPP otomatis dengan AI.',
    });
  }
});

// API Endpoint: Generate Peta Konsep & Ide Topik RA KBC
app.post('/api/generate-peta-konsep', async (req, res) => {
  try {
    const { topik } = req.body;
    if (!topik) {
      return res.status(400).json({ success: false, message: 'Topik harus diisi' });
    }

    const ai = getGeminiClient();
    const prompt = `
Sebagai pakar PAUD/RA Kurikulum Merdeka KBC (Kurikulum Berbasis Cinta), buatkan Peta Konsep dan Cabang Topik Pembelajaran Anak Usia Dini untuk topik: "${topik}".
Keluaran harus JSON terstruktur:
{
  "topikUtama": string,
  "kalimatPemantik": string,
  "cabangKonsep": [
    {
      "kategori": string, // e.g. "Mengenal Ciptaan Allah", "Sifat/Bentuk/Warna", "Cara Merawat/Memanfaatkan", "Karakter Cinta & Akhlak"
      "subKonsep": [string],
      "ideKegiatanRagamMain": [string]
    }
  ],
  "kosakataBahasaArab": [
    { "lafadz": string, "artinya": string }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    res.json({
      success: true,
      data: JSON.parse(response.text || '{}'),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API Endpoint: Generate LKPD & Panduan Bermain Anak di Rumah (Home Activity KBC)
app.post('/api/generate-lkpd', async (req, res) => {
  try {
    const { topik, kelompokUsia } = req.body;
    const ai = getGeminiClient();
    const prompt = `
Buatkan 3 Ide Lembar Aktivitas / Panduan Bermain Seru di Rumah bersama Orang Tua (KBC Home Activity) untuk anak ${kelompokUsia || 'RA B'} dengan topik "${topik || 'Lingkungan Hijau'}".
Format JSON:
{
  "topik": string,
  "aktivitasRumah": [
    {
      "judul": string,
      "tujuanKBC": string,
      "alatBahanDiRumah": [string],
      "langkahKegiatan": [string],
      "pesanKasihSayangOrangTua": string
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    res.json({
      success: true,
      data: JSON.parse(response.text || '{}'),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Vite Middleware for Dev, Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server RPP RA KBC running on http://localhost:${PORT}`);
  });
}

startServer();
