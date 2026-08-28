import { RPPModulAjar, MuridRA, BankTopikItem, PresensiAnak, AsesmenHarian, ProfilMadrasah } from '../types';

export const INITIAL_PROFIL_MADRASAH: ProfilMadrasah = {
  namaYayasan: 'Yayasan Mutiara Cinta Al-Azhar',
  namaRA: 'RA Mutiara Cinta Al-Azhar',
  nsmNpsn: '10123456789 / 60712345',
  alamat: 'Jl. Pendidikan Karakter No. 12, Kel. Kebayoran',
  kotaKabupaten: 'Jakarta Selatan',
  namaKepalaRA: 'Hj. Siti Aminah, M.Pd.',
  namaGuruDefault: 'Ustadzah Fatimah, S.Pd.I',
};

export const INITIAL_MURID: MuridRA[] = [
  {
    id: 'm-1',
    namaLengkap: 'Ahmad Raihan Pratama',
    namaPanggilan: 'Raihan',
    kelompok: 'RA B',
    jenisKelamin: 'L',
    nis: '2026001',
    namaOrangTua: 'Bpk. Herman & Ibu Siti',
    avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-2',
    namaLengkap: 'Aisyah Humaira Az-Zahra',
    namaPanggilan: 'Aisyah',
    kelompok: 'RA B',
    jenisKelamin: 'P',
    nis: '2026002',
    namaOrangTua: 'Bpk. Faisal & Ibu Nur',
    avatar: 'https://images.unsplash.com/photo-1595454810237-7f99990b7904?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-3',
    namaLengkap: 'Muhammad Bilal Ramadhan',
    namaPanggilan: 'Bilal',
    kelompok: 'RA B',
    jenisKelamin: 'L',
    nis: '2026003',
    namaOrangTua: 'Bpk. Rizky & Ibu Maya',
    avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-4',
    namaLengkap: 'Khadijah Maryam Almahyra',
    namaPanggilan: 'Maryam',
    kelompok: 'RA B',
    jenisKelamin: 'P',
    nis: '2026004',
    namaOrangTua: 'Bpk. Salman & Ibu Dewi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-5',
    namaLengkap: 'Fathan Al-Ghazali',
    namaPanggilan: 'Fathan',
    kelompok: 'RA B',
    jenisKelamin: 'L',
    nis: '2026005',
    namaOrangTua: 'Bpk. Rahmat & Ibu Laila',
    avatar: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-6',
    namaLengkap: 'Siti Safiyyah Husna',
    namaPanggilan: 'Fiyya',
    kelompok: 'RA B',
    jenisKelamin: 'P',
    nis: '2026006',
    namaOrangTua: 'Bpk. Arif & Ibu Zahra',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_PRESENSI: PresensiAnak[] = [
  {
    id: 'p-1',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-1',
    status: 'Hadir',
    emosiPagi: 'Semangat',
    catatanKarakterKBC: 'Mengucapkan salam dengan tersenyum dan merapikan sepatu sendiri.',
  },
  {
    id: 'p-2',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-2',
    status: 'Hadir',
    emosiPagi: 'Senang',
    catatanKarakterKBC: 'Berbagi mainan loose parts dengan Maryam tanpa diminta.',
  },
  {
    id: 'p-3',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-3',
    status: 'Hadir',
    emosiPagi: 'Senang',
    catatanKarakterKBC: 'Antusias saat hafalan surah Al-Kafirun.',
  },
  {
    id: 'p-4',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-4',
    status: 'Hadir',
    emosiPagi: 'Semangat',
    catatanKarakterKBC: 'Membantu membereskan area bermain setelah selesai.',
  },
  {
    id: 'p-5',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-5',
    status: 'Izin',
    emosiPagi: 'Sedih',
    catatanKarakterKBC: 'Izin menemani nenek ke luar kota.',
  },
  {
    id: 'p-6',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-6',
    status: 'Hadir',
    emosiPagi: 'Senang',
    catatanKarakterKBC: 'Toleran saat mengantri cuci tangan sebelum makan siang.',
  },
];

export const INITIAL_ASESMEN: AsesmenHarian[] = [
  {
    id: 'a-1',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-1',
    elemenCP: 'Nilai Agama dan Budi Pekerti',
    skalaPerkembangan: 'BSB',
    catatanAnekdot: 'Raihan mampu memimpin doa sebelum makan dengan suara jelas dan khusyuk.',
    dimensiProfilLulusan: 'Keimanan & Ketakwaan kepada Tuhan YME',
  },
  {
    id: 'a-2',
    tanggal: new Date().toISOString().split('T')[0],
    muridId: 'm-2',
    elemenCP: 'Literasi & STEAM',
    skalaPerkembangan: 'BSH',
    catatanAnekdot: 'Aisyah mampu menyusun balok kayu membentuk miniatur masjid dan menceritakannya.',
    dimensiProfilLulusan: 'Kreativitas & Penalaran Kritis',
  },
];

export const SAMPLE_RPP_PRESET: RPPModulAjar = {
  id: 'rpp-preset-1',
  createdDate: new Date().toISOString().split('T')[0],
  identitas: {
    namaYayasan: 'Yayasan Mutiara Cinta Al-Azhar',
    namaRA: 'RA Mutiara Cinta Al-Azhar',
    namaGuru: 'Ustadzah Fatimah, S.Pd.I',
    nsmNpsn: '10123456789 / 60712345',
    alamat: 'Jl. Pendidikan Karakter No. 12, Kel. Kebayoran',
    kotaKabupaten: 'Jakarta Selatan',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 'Minggu Ke-5',
    topikUtama: 'Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup',
    subTopik: 'Keajaiban Jahe, Kunyit, dan Serai Obat Alami',
    alokasiWaktu: '5 Hari',
    petaKonsepGagasan: [
      'Jenis Tanaman Obat (Jahe, Kunyit, Serai, Kencur)',
      'Manfaat Kesehatan & Syukur pada Allah SWT',
      'Olahan Minuman Alami (Wedang Jahe Warm KBC)',
      'Bagian-Bagian Tanaman (Akar, Batang, Daun, Bunga)'
    ],
    dimensiProfilLulusan: [
      'Keimanan dan Ketakwaan kepada Tuhan YME',
      'Penalaran Kritis',
      'Kreativitas',
      'Kemandirian',
      'Kesehatan'
    ],
    topikPancaCinta: [
      'Cinta Allah dan Rasul-Nya',
      'Cinta Lingkungan',
      'Cinta Diri dan Sesama Manusia',
      'Cinta Ilmu'
    ],
    materiIntegrasiKBC: [
      '1. Mensyukuri nikmat kesehatan dan anugerah tanaman obat ciptaan Allah Swt. melalui rasa syukur harian.',
      '2. Mempraktikkan sifat-sifat Rasulullah Saw. (hemat air, kasih sayang pada alam, tidak merusak).',
      '3. Praktik Thaharah (kebersihan diri dan lingkungan) serta hemat energi dan bahan.',
      '4. Adab kepada alam (menjaga tanaman apotek hidup) dan sesama teman (saling berbagi hasil olahan).'
    ],
    metodeIntrakurikulerKBC: 'Project Based Learning (FIDS: Feel, Imagine, Do, Share) & Deep Learning',
    konteksLokalUtama: 'Eksplorasi Langsung Tanaman Herbal & Kebun Madrasah RA'
  },
  kedalamanBerbasisKonteks: {
    konteksLokal: 'Kebun Tanaman RA, Dapur Rumah Anak, & Bahan Alam Rimpang Asli (Jahe, Kunyit, Serai)',
    petaKedalaman: {
      mengamati: 'Level 1 (Feel): Anak mengeksplorasi bentuk, tekstur kulit, dan aroma rimpang jahe/kunyit asli dengan kaca pembesar.',
      memahami: 'Level 2 (Connect): Anak menghubungkan kehangatan jahe & warna kuning kunyit sebagai bukti keagungan Allah SWT (Al-Khaliq) untuk kesehatan manusia.',
      mengaitkan: 'Level 3 (Apply): Anak membandingkan berat rimpang, meracik jamu herbal manis hangat, dan melukis dengan pigmen kunyit.',
      menciptaBeraksi: 'Level 4 (Share): Anak menanam bibit jahe di polibag cinta, menyajikan minuman herbal untuk teman/guru, dan berkomitmen merawat tanaman.'
    },
    keterkaitanKehidupanNyata: 'Menghubungkan kebiasaan minum herbal hangat dari orang tua di rumah saat kurang sehat dengan rasa bersyukur kepada Allah atas tanaman obat di sekitar kita.'
  },
  alurIntrakurikulerSteps: [
    {
      tahapan: '1. Feel (Merasakan & Mengamati)',
      deskripsi: 'Anak diajak mengamati dan meraba rimpang jahe, kunyit, dan serai asli. Melalui eksplorasi panca indra, anak menyadari betapa kaya nikmat Allah yang menciptakan wewangian dan manfaat obat alami.'
    },
    {
      tahapan: '2. Imagine (Membayangkan & Merencanakan)',
      deskripsi: 'Anak berdiskusi dan membayangkan bagaimana olahan herbal buatan Rasulullah Saw. dan para ulama, serta merencanakan ide meracik jamu herbal manis/wedang jahe dan membuat lukisan warna alami.'
    },
    {
      tahapan: '3. Do (Mempraktikkan & Berkarya)',
      deskripsi: 'Anak mempraktikkan langsung kegiatan meracik minuman herbal hangat secara aman, melukis dengan ekstrak kunyit, dan menanam bibit jahe di pot cinta dengan kasih sayang.'
    },
    {
      tahapan: '4. Share (Berbagi & Edukasi)',
      deskripsi: 'Anak mengomunikasikan hasil olahan minuman herbal dan karya seni pelepah pisang kepada teman-teman dan Bunda Guru, serta menyajikan cangkir jamu sehat sebagai wujud cinta sesama.'
    }
  ],
  tujuanPembelajaran: [
    {
      elemenCP: 'Nilai Agama dan Budi Pekerti',
      tujuan: 'Anak mengenal Allah SWT sebagai Maha Pencipta (Al-Khaliq) melalui keanekaragaman tanaman obat dan membaca doa bersyukur.',
      integrasiKBC: 'Cinta Allah & Rasul-Nya (Rasa syukur atas nikmat kesehatan)',
      profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME']
    },
    {
      elemenCP: 'Jati Diri',
      tujuan: 'Anak menunjukkan sikap kemandirian dan rasa peduli dalam merawat tanaman di lingkungan RA.',
      integrasiKBC: 'Cinta Lingkungan & Cinta Diri (Menjaga Kesehatan)',
      profilLulusanDPL: ['Kemandirian', 'Kesehatan']
    },
    {
      elemenCP: 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni',
      tujuan: 'Anak eksplorasi tekstur, aroma, dan warna alami kunyit/jahe, membandingkan ukuran, serta mengkreasikan lukisan dengan bahan alam.',
      integrasiKBC: 'Cinta Ilmu & Inovasi Kreatif',
      profilLulusanDPL: ['Penalaran Kritis', 'Kreativitas']
    }
  ],
  kataKunciDanKosakata: ['Tanaman Obat', 'Apotek Hidup', 'Aroma', 'Tekstur', 'Wedang Jahe', 'Akar Rhizoma'],
  kataBahasaArabSederhana: [
    { kata: 'شَجَرَةٌ (Shajaratun)', artinya: 'Pohon / Tanaman' },
    { kata: 'زَنْجَبِيلٌ (Zanjabiil)', artinya: 'Jahe' },
    { kata: 'شُكْرًا (Syukran)', artinya: 'Terima Kasih / Bersyukur' }
  ],
  saranaPrasaranaMedia: [
    'Rimpang Jahe, Kunyit, Serai asli',
    'Timbangan sederhana & Kaca Pembesar',
    'Loose parts (Batu, Ranting, Biji-bijian, Kerang)',
    'Air hangat, Gelas plastik, Sendok',
    'Kertas lukis & Kuas dari pelepah daun'
  ],
  pertanyaanPemantik: {
    mindful: [
      'Bagaimana rasa hati anak-anak ketika mencium aroma jahe dan kunyit hangat ini?',
      'Siapa yang menciptakan jahe dan kunyit dengan aroma menenangkan ini?'
    ],
    meaningful: [
      'Mengapa Bunda/Ibu di rumah suka membuatkan minuman kunyit asam atau wedang jahe saat kita kurang sehat?',
      'Apa yang terjadi jika tanaman di taman tidak kita siram dengan penuh kasih sayang?'
    ],
    joyful: [
      'Dapatkah anak-anak menebak jenis rimpang obat ini hanya dengan mata tertutup?',
      'Ayo kita buat warna kuning dari kunyit untuk melukis istana obat!'
    ]
  },
  kegiatanMingguan: [
    {
      hari: 'Senin',
      subTopikHarian: 'Mengenal Jahe & Kunyit Ciptaan Allah',
      pembukaanMindful: {
        durasi: '30 Menit',
        kegiatan: [
          'Berbaris di halaman RA, mengamati tanaman jahe di pot.',
          'Doa pembuka belajar khusyuk (Asmaul Husna: Ya Khaliq, Ya Razzaq).',
          'Sapaan KBC: Mengungkapkan perasaan pagi dan saling mendoakan kesehatan teman.'
        ]
      },
      intiJoyful: {
        durasi: '90 Menit',
        pilihanRagamMain: [
          {
            namaSentraArea: 'Sentra Bahan Alam & Sains',
            deskripsiKegiatan: 'Detektif Rimpang: Mengamati Jahe & Kunyit menggunakan kaca pembesar, membandingkan warna dan kulit.',
            bahanLooseParts: ['Jahe', 'Kunyit', 'Kaca Pembesar', 'Baki Kayu', 'Pisau Plastik Tumpul']
          },
          {
            namaSentraArea: 'Sentra Seni & Loose Parts',
            deskripsiKegiatan: 'Melukis Bebas dengan Ekstrak Kunyit dan Pelepah Pisang.',
            bahanLooseParts: ['Ekstrak Kunyit', 'Kertas A3', 'Pelepah Pisang', 'Ranting']
          },
          {
            namaSentraArea: 'Sentra Persiapan & Literasi',
            deskripsiKegiatan: 'Menyusun huruf J-A-H-E & K-U-N-Y-I-T dari biji-bijian dan batu warna.',
            bahanLooseParts: ['Kartu Huruf', 'Biji Jagung', 'Batu Warna', 'Ranting Kecil']
          }
        ]
      },
      penutupMeaningful: {
        durasi: '30 Menit',
        kegiatan: [
          'Refleksi Rasa: Anak menceritakan ragam main favorit hari ini.',
          'Pesan KBC: Menjaga kesehatan tubuh sebagai bentuk cinta kepada Allah.',
          'Doa penutup majelis dan salam perpisahan hangat.'
        ]
      }
    },
    {
      hari: 'Selasa',
      subTopikHarian: 'Wangi Serai dan Kebun Herbal RA',
      pembukaanMindful: {
        durasi: '30 Menit',
        kegiatan: [
          'Dzikir pagi dan Asmaul Husna.',
          'Lagu KBC "Aku Anak Sehat Sayang Tanaman".',
          'Apersepsi menceritakan daun serai yang harum.'
        ]
      },
      intiJoyful: {
        durasi: '90 Menit',
        pilihanRagamMain: [
          {
            namaSentraArea: 'Sentra Balok & Konstruksi',
            deskripsiKegiatan: 'Membangun "Apotek Sehat RA" dari balok kayu dan wadah herbal.',
            bahanLooseParts: ['Balok Kayu', 'Wadah Bumbu', 'Serai', 'Label Tulisan']
          },
          {
            namaSentraArea: 'Sentra Agamais & Kebiasaan Baik',
            deskripsiKegiatan: 'Meniru bacaan doa menjenguk teman sakit & adab minum duduk manis.',
            bahanLooseParts: ['Cangkir Plastik', 'Buku Doa Kemeag', 'Karpet Sejadah']
          }
        ]
      },
      penutupMeaningful: {
        durasi: '30 Menit',
        kegiatan: [
          'Mematikan lampu sejenak, hening mindful 2 menit bersyukur atas indera penciuman.',
          'Doa penutup hari.'
        ]
      }
    },
    {
      hari: 'Rabu',
      subTopikHarian: 'Sains Sederhana: Membuat Minuman Jahe Warm KBC',
      pembukaanMindful: {
        durasi: '30 Menit',
        kegiatan: [
          'Doa sebelum belajar.',
          'Review keselamatan saat menyeduh air hangat bersama Ustadzah.'
        ]
      },
      intiJoyful: {
        durasi: '90 Menit',
        pilihanRagamMain: [
          {
            namaSentraArea: 'Sentra Olah Kuliner & Peran',
            deskripsiKegiatan: 'Meracik Wedang Jahe Madu: Menumbuk jahe keprek pelan-pelan, menuangkan air hangat, meneteskan madu.',
            bahanLooseParts: ['Jahe bakar', 'Cobek kayu', 'Sendok', 'Madu', 'Cangkir']
          }
        ]
      },
      penutupMeaningful: {
        durasi: '30 Menit',
        kegiatan: [
          'Menikmati siraman wedang jahe bersama teman dengan adab minum tangan kanan.',
          'Refleksi KBC rasa manis madu & hangat jahe.'
        ]
      }
    },
    {
      hari: 'Kamis',
      subTopikHarian: 'Menanam Bibit Jahe di Polibag Cinta',
      pembukaanMindful: {
        durasi: '30 Menit',
        kegiatan: [
          'Tadarus hafalan surah An-Nas & Al-Falaq.',
          'Eksplorasi tanah subur & kompos.'
        ]
      },
      intiJoyful: {
        durasi: '90 Menit',
        pilihanRagamMain: [
          {
            namaSentraArea: 'Sentra Kebun & Bahan Alam',
            deskripsiKegiatan: 'Praktek Menanam Tunas Jahe di Pot/Polibag, menyiram dengan gembor kecil.',
            bahanLooseParts: ['Polibag', 'Tanah Kompos', 'Tunas Jahe', 'Gembor Air']
          }
        ]
      },
      penutupMeaningful: {
        durasi: '30 Menit',
        kegiatan: [
          'Menamai pot jahe masing-masing dengan label nama anak.',
          'Doa agar tanaman tumbuh subur.'
        ]
      }
    },
    {
      hari: 'Jumat',
      subTopikHarian: 'Pameran Mini "Apotek Cilik KBC"',
      pembukaanMindful: {
        durasi: '30 Menit',
        kegiatan: [
          'Senam Otak Joyful & Jumat Sehat.',
          'Membaca Sayyidul Istighfar.'
        ]
      },
      intiJoyful: {
        durasi: '90 Menit',
        pilihanRagamMain: [
          {
            namaSentraArea: 'Sentra Panggung & Presentasi',
            deskripsiKegiatan: 'Menceritakan hasil karya melukis kunyit dan hasil racikan minuman ke teman-teman kelas sebelah.',
            bahanLooseParts: ['Karya Anak', 'Meja Display', 'Sertifikat Anak Cerdas KBC']
          }
        ]
      },
      penutupMeaningful: {
        durasi: '30 Menit',
        kegiatan: [
          'Pemberian Bintang KBC (Kasih Sayang, Kerjasama, Bersyukur).',
          'Doa Jumat Berkah & Salam Perpisahan.'
        ]
      }
    }
  ],
  asesmenPerkembangan: {
    teknikAsesmen: [
      'Observasi & Catatan Anekdot',
      'Ceklis CP Kurikulum Merdeka (BB, MB, BSH, BSB)',
      'Dokumentasi Hasil Karya (Lukisan Kunyit & Foto Berseri)'
    ],
    rubrikChecklist: [
      {
        indikatorCP: 'Mengenal ciptaan Allah dan mengagumi ciptaan-Nya (Nilai Agama)',
        kriteriaBB: 'Belum mau menyebutkan Allah sebagai pencipta jahe.',
        kriteriaMB: 'Menyebutkan tanaman ciptaan Allah setelah diingatkan guru.',
        kriteriaBSH: 'Mampu menyebutkan jahe ciptaan Allah dan mengucap Alhamdulillah secara mandiri.',
        kriteriaBSB: 'Mampu menjelaskan manfaat jahe ciptaan Allah dan mengajak teman bersyukur.'
      },
      {
        indikatorCP: 'Kemampuan eksplorasi loose parts & STEAM (Literasi & STEAM)',
        kriteriaBB: 'Belum mau menyentuh atau mencoba bahan loose parts.',
        kriteriaMB: 'Mencoba merangkai bahan loose parts dengan bimbingan penuh.',
        kriteriaBSH: 'Kreatif membuat bentuk huruf atau karya dari loose parts secara mandiri.',
        kriteriaBSB: 'Sangat kreatif mengombinasikan pelbagai loose parts dan menceritakan idenya dengan lancar.'
      }
    ],
    catatanAnekdotPanduan: 'Catat momen khusus saat anak menunjukkan empati (KBC), inisiatif membantu teman, atau keberhasilan mengatasi tantangan saat bermain.'
  },
  refleksiGuru: [
    'Apakah anak antusias dengan media nyata jahe, kunyit, dan serai?',
    'Apakah ragam main yang disediakan sudah memfasilitasi kebutuhan semua gaya belajar anak?',
    'Bagaimana penguatan nilai KBC (Cinta Lingkungan & Syukur) berdampak pada sikap harian anak?'
  ],
  kegiatanDiRumahKBC: [
    'Ajak anak mencari 2 jenis bumbu dapur di dapur rumah dan mencium aromanya bersama orang tua.',
    'Menyiram tanaman obat/bunga di halaman rumah pada sore hari sambil mengucapkan kalimat thoyyibah.',
    'Membuat cangkir teh/minuman hangat bersama Ibu dan bercerita tentang aktivitas di RA hari ini.'
  ]
};

export const BANK_TOPIK_RA: BankTopikItem[] = [
  {
    id: 'topik-1',
    topik: 'Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup',
    kelompokRekomendasi: 'RA A & RA B',
    kategori: 'Kurikulum Berbasis Cinta (KBC)',
    fokusKBC: 'Cinta Allah dan Rasul-Nya & Cinta Lingkungan',
    dimensiProfilLulusan: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis', 'Kesehatan'],
    subTopikRekomendasi: ['Jahe & Kunyit Warm', 'Bunga Mawar & Melati Wangi', 'Sayur Bayam & Wortel Sehat'],
    contohRagamMain: ['Meracik Kunyit Melukis', 'Detektif Aroma Herbal', 'Menanam Tunas di Pot Cinta']
  },
  {
    id: 'topik-2',
    topik: 'Makanan Halalan Thayyiban',
    kelompokRekomendasi: 'RA B (5-6 Tahun)',
    kategori: 'Karakter & Nilai Agama',
    fokusKBC: 'Cinta Diri dan Sesama Manusia & Cinta Allah',
    dimensiProfilLulusan: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kesehatan', 'Kemandirian'],
    subTopikRekomendasi: ['Buah-Buahan Surga (Kurma, Zaitun, Pisang)', 'Air Putih Bersih Rahmat Allah', 'Roti & Sereal Bergizi'],
    contohRagamMain: ['Restoran Halal Cilik', 'Eksperimen Rasa Manis Asam Salty', 'Mewarnai Kaligrafi Bismillah']
  },
  {
    id: 'topik-3',
    topik: 'Masjidku Bersih dan Indah',
    kelompokRekomendasi: 'KB, RA A, RA B',
    kategori: 'Sosial & Kebudayaan Islam',
    fokusKBC: 'Cinta Allah dan Rasul-Nya & Cinta Lingkungan',
    dimensiProfilLulusan: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kewargaan', 'Kolaborasi'],
    subTopikRekomendasi: ['Perlengkapan Shalatku', 'Adab Masuk Masjid Tangan Kanan', 'Bedug & Menara Masjid'],
    contohRagamMain: ['Arsitek Balok Masjid', 'Praktek Wudhu Khusyuk', 'Koleksi Sajadah Kain Warna']
  },
  {
    id: 'topik-4',
    topik: 'Hebatnya Tubuhku Karunia Allah',
    kelompokRekomendasi: 'RA A & RA B',
    kategori: 'Diri Sendiri & Kesehatan',
    fokusKBC: 'Cinta Diri dan Sesama Manusia',
    dimensiProfilLulusan: ['Kesehatan', 'Kemandirian', 'Komunikasi'],
    subTopikRekomendasi: ['Mata untuk Melihat yang Baik', 'Tangan Suka Menolong', 'Jantung Berdetak Sehat'],
    contohRagamMain: ['Jejak Tapak Kaki Warna', 'Cermin Ekspresi Wajah Senang', 'Rangka Tubuh dari Sedotan']
  },
  {
    id: 'topik-5',
    topik: 'Indahnya Kebersamaan & Toleransi (Panca Cinta)',
    kelompokRekomendasi: 'RA B (5-6 Tahun)',
    kategori: 'Delapan Profil Lulusan & KBC',
    fokusKBC: 'Cinta Diri dan Sesama Manusia & Cinta Tanah Air',
    dimensiProfilLulusan: ['Kewargaan', 'Kolaborasi', 'Komunikasi'],
    subTopikRekomendasi: ['Saling Berbagi Mainan', 'Maaf dan Terima Kasih', 'Pakaian Adat Nusantara'],
    contohRagamMain: ['Pohon Kebaikan KBC', 'Pentas Seni Sahabat', 'Rantai Persahabatan Warna']
  }
];
