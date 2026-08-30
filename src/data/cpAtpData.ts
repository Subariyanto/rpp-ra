import { CPElemenBSKAP, AnalisisCPTPItem, AlurTujuanPembelajaranItem } from '../types';

export const DAFTAR_CP_BSKAP_046: CPElemenBSKAP[] = [
  {
    id: 'cp-elem-1',
    kodeElemen: 'ELEMEN-1',
    namaElemen: 'Nilai Agama dan Budi Pekerti',
    deskripsiElemen:
      'Anak mengenal dan percaya kepada Tuhan Yang Maha Esa (Allah SWT), mengenal ajaran pokok agama, membiasakan praktik ibadah harian, menunjukkan akhlak mulia dan kasih sayang sesama manusia, serta menghargai dan merawat alam ciptaan-Nya.',
    subElemen: [
      {
        kode: '1.1',
        namaSubElemen: 'Mengenal Allah SWT, Rukun Iman & Rukun Islam',
        capaianFaseFondasi:
          'Anak percaya kepada Tuhan Yang Maha Esa (Allah SWT), mulai mengenal sifat-sifat Allah melalui Asmaul Husna, rukun iman, rukun Islam, serta membiasakan mengucap kalimat thoyyibah dalam kehidupan sehari-hari.',
        indikatorKunci: [
          'Menyebutkan Allah SWT sebagai Maha Pencipta (Al-Khaliq)',
          'Mengenal dan melafalkan Asmaul Husna pilihan dengan tartil',
          'Mengenal 6 Rukun Iman dan 5 Rukun Islam secara menyenangkan',
          'Membiasakan mengucap Basmalah, Hamdalah, dan kalimat thoyyibah'
        ],
        integrasiKBC: 'Cinta Allah dan Rasul-Nya (Mahabbatullah)',
        dimensiDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis']
      },
      {
        kode: '1.2',
        namaSubElemen: 'Praktik Ibadah Harian & Adab Islami',
        capaianFaseFondasi:
          'Anak berpartisipasi aktif dalam kegiatan ibadah sehari-hari (shalat berjamaah, thaharah/wudhu, hafalan surah-surah pendek dan doa harian) serta meneladani akhlak Rasulullah SAW.',
        indikatorKunci: [
          'Mempraktikkan gerakan wudhu dan shalat fardhu/dhuha dengan tertib',
          'Melafalkan hafalan surah pendek (An-Nas s.d. Al-Fil) dan doa harian',
          'Mempraktikkan adab makan, minum, masuk masjid, dan bertamu sesuai sunnah',
          'Membiasakan berbagi infak dan sedekah shubuh di RA'
        ],
        integrasiKBC: 'Cinta Ibadah & Cinta Diri (Thaharah & Kebugaran)',
        dimensiDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kemandirian']
      },
      {
        kode: '1.3',
        namaSubElemen: 'Menghargai Sesama & Berakhlakul Karimah',
        capaianFaseFondasi:
          'Anak menghargai sesama manusia dengan berbagai perbedaannya dan mempraktikkan perilaku baik, santun, pemaaf, toleran, serta saling tolong menolong.',
        indikatorKunci: [
          'Membiasakan 5S (Senyum, Salam, Sapa, Sopan, Santun)',
          'Mengucapkan kata tolong, maaf, terima kasih, dan permisi',
          'Mampu bermain bergantian dan menghargai teman yang berbeda latar belakang',
          'Menunjukkan empati dan menolong teman yang sedang membutuhkan'
        ],
        integrasiKBC: 'Cinta Sesama Manusia & Cinta Perdamaian',
        dimensiDPL: ['Kewargaan', 'Kolaborasi', 'Komunikasi']
      },
      {
        kode: '1.4',
        namaSubElemen: 'Menyayangi & Merawat Alam Ciptaan Allah',
        capaianFaseFondasi:
          'Anak menghargai alam dengan cara merawatnya dan menunjukkan rasa sayang terhadap makhluk hidup (hewan dan tumbuhan) sebagai wujud syukur kepada Allah SWT.',
        indikatorKunci: [
          'Merawat tanaman RA (menyiram dan tidak merusak daun/bunga)',
          'Menyayangi binatang kesayangan dan tidak menyakiti hewan di sekitarnya',
          'Membuang sampah pada tempatnya dan menjaga kebersihan lingkungan madrasah',
          'Mengenal konsep hemat air dan hemat energi sebagai adab menjaga bumi'
        ],
        integrasiKBC: 'Cinta Lingkungan & Cinta Kelestarian Alam',
        dimensiDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kewargaan']
      }
    ]
  },
  {
    id: 'cp-elem-2',
    kodeElemen: 'ELEMEN-2',
    namaElemen: 'Jati Diri',
    deskripsiElemen:
      'Anak mengenali, mengelola, dan mengekspresikan emosi diri, membangun hubungan sosial yang sehat, bangga terhadap identitas diri dan budaya bangsa, serta memiliki kematangan fisik-motorik, kesehatan, dan kemandirian.',
    subElemen: [
      {
        kode: '2.1',
        namaSubElemen: 'Mengenali, Mengelola & Mengekspresikan Emosi',
        capaianFaseFondasi:
          'Anak mengenali, mengelola, dan mengekspresikan emosi diri serta membangun hubungan sosial secara sehat dengan teman sebaya dan orang dewasa.',
        indikatorKunci: [
          'Mampu menyebutkan perasaan diri (senang, sedih, marah, takut, tenang)',
          'Mampu menenangkan diri dengan teknik nafas mindful / dzikir sederhana',
          'Mengekspresikan emosi secara wajar tanpa menyakiti diri sendiri atau teman',
          'Menunjukkan sikap percaya diri saat tampil di depan kelas'
        ],
        integrasiKBC: 'Cinta Diri (Regulasi Emosi & Jiwa Tenang)',
        dimensiDPL: ['Kematangan Emosi', 'Komunikasi']
      },
      {
        kode: '2.2',
        namaSubElemen: 'Identitas Diri, Keluarga & Cinta Budaya Indonesia',
        capaianFaseFondasi:
          'Anak menunjukkan perasaan bangga terhadap identitas dirinya, keluarganya, serta latar belakang budaya dan bangsanya sebagai anak muslim Indonesia yang beriman.',
        indikatorKunci: [
          'Menyebutkan nama diri, anggota keluarga, alamat, dan identitas madrasah',
          'Mengenal bendera Merah Putih, lagu Indonesia Raya, dan simbol Garuda Pancasila',
          'Mengenal pakaian adat, makanan tradisional, dan permainan rakyat',
          'Merasa bangga menjadi anak Indonesia yang taat beragama'
        ],
        integrasiKBC: 'Cinta Tanah Air & Cinta Budaya Nusantara',
        dimensiDPL: ['Kewargaan', 'Keimanan dan Ketakwaan kepada Tuhan YME']
      },
      {
        kode: '2.3',
        namaSubElemen: 'Kesehatan, Kebersihan Diri (PHBS) & Motorik Terampil',
        capaianFaseFondasi:
          'Anak memiliki fungsi gerak motorik kasar, halus, dan taktil yang seimbang, serta mempraktikkan perilaku hidup bersih dan sehat (PHBS), kebersihan diri, keamanan diri, dan kemandirian.',
        indikatorKunci: [
          'Melakukan gerakan motorik kasar terkoordinasi (melompat, memanjat, melempar, meniti)',
          'Melakukan keterampilan motorik halus (meronce, menggunting, melipat, menjumput, meremas)',
          'Mempraktikkan cuci tangan 6 langkah, sikat gigi teratur, dan toilet training mandiri',
          'Mengenal bagian tubuh pribadi yang tidak boleh disentuh orang lain (safety self)'
        ],
        integrasiKBC: 'Cinta Kesehatan & Kehormatan Diri',
        dimensiDPL: ['Kesehatan', 'Kemandirian']
      }
    ]
  },
  {
    id: 'cp-elem-3',
    kodeElemen: 'ELEMEN-3',
    namaElemen: 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)',
    deskripsiElemen:
      'Anak menunjukkan minat dan kemampuan dalam pra-literasi, pra-matematika, eksplorasi sains inkuiri, pemecahan masalah dengan loose parts dan rekayasa sederhana, serta mengekspresikan karya seni secara kreatif.',
    subElemen: [
      {
        kode: '3.1',
        namaSubElemen: 'Praliterasi, Komunikasi & Bahasa Arab Sederhana',
        capaianFaseFondasi:
          'Anak mengenali dan memahami berbagai informasi, mengomunikasikan perasaan dan pikiran secara lisan, tulisan awal, atau simbol media, serta menunjukkan minat pada kegiatan membaca buku dan mengenal kosakata Arab dasar.',
        indikatorKunci: [
          'Menyimak cerita guru dengan penuh perhatian dan menceritakan kembali intinya',
          'Mengenal simbol huruf alfabet dan huruf hijaiyah dengan asosiasi bunyi fonik',
          'Mengekspresikan ide melalui coretan, tulisan rintisan, atau susunan huruf loose parts',
          'Mengenal dan melafalkan 1-3 kosakata bahasa Arab sederhana terkait topik harian'
        ],
        integrasiKBC: 'Cinta Ilmu & Bahasa Al-Qur\'an',
        dimensiDPL: ['Komunikasi', 'Penalaran Kritis']
      },
      {
        kode: '3.2',
        namaSubElemen: 'Pramatematika & Pemecahan Masalah Keseharian',
        capaianFaseFondasi:
          'Anak mengenali dan menggunakan konsep pramatematika untuk memecahkan masalah dalam kehidupan sehari-hari (membilang, pola, bentuk geometri, ukuran, perbandingan, dan klasifikasi).',
        indikatorKunci: [
          'Membilang benda secara nyata 1–10 (RA A) dan 1–20 (RA B) dengan loose parts',
          'Mengenal konsep lebih banyak, lebih sedikit, sama dengan, berat-ringan, panjang-pendek',
          'Mengelompokkan benda berdasarkan warna, bentuk, ukuran, dan tekstur',
          'Menyusun pola berulang (AB-AB, ABC-ABC) menggunakan bahan alam'
        ],
        integrasiKBC: 'Cinta Logika & Keteraturan Berpikir',
        dimensiDPL: ['Penalaran Kritis', 'Kreativitas']
      },
      {
        kode: '3.3',
        namaSubElemen: 'Eksplorasi Sains Inkuiri & Nalar Kritis Bahan Alam',
        capaianFaseFondasi:
          'Anak menunjukkan kemampuan eksplorasi, inkuiri, mengamati fenomena alam, dan nalar kritis dengan memanfaatkan bahan-bahan di sekitar.',
        indikatorKunci: [
          'Mengamati benda menggunakan panca indera dan alat bantu (kaca pembesar, timbangan)',
          'Mengajukan pertanyaan pemantik "Mengapa" dan "Bagaimana" terhadap fenomena sekitar',
          'Melakukan eksperimen sains sederhana (larut-tidak larut, terapung-tenggelam, percampuran warna)',
          'Menyimpulkan hasil pengamatan sederhana dengan bahasa sendiri'
        ],
        integrasiKBC: 'Cinta Inovasi & Nalar Kritis Islami',
        dimensiDPL: ['Penalaran Kritis', 'Kreativitas']
      },
      {
        kode: '3.4',
        namaSubElemen: 'Rekayasa Teknologi Sederhana, Loose Parts & Seni Kreatif',
        capaianFaseFondasi:
          'Anak menunjukkan kemampuan rekayasa sederhana, berkarya dengan media lepas (loose parts), serta mengekspresikan ide, perasaan, dan imajinasi melalui berbagai media seni (visual, musik, gerak, tari, peran).',
        indikatorKunci: [
          'Merancang dan membangun konstruksi 3 dimensi dari balok kayu dan loose parts',
          'Menciptakan karya seni dua/tiga dimensi (kolase, lukis pelepah, cetak alam, plastisin)',
          'Bernyanyi dan bergerak mengikuti irama musik/lagu anak islami dengan riang gembira',
          'Bermain peran makro/mikro menggambarkan profesi dan adab keseharian'
        ],
        integrasiKBC: 'Cinta Seni Islami & Kreativitas Tanpa Batas',
        dimensiDPL: ['Kreativitas', 'Kolaborasi']
      }
    ]
  }
];

export const INITIAL_ANALISIS_CP_TP: AnalisisCPTPItem[] = [
  // ELEMEN 1: Nilai Agama dan Budi Pekerti
  {
    id: 'ana-tp-1',
    elemenCP: 'Nilai Agama dan Budi Pekerti',
    subElemen: '1.1 Mengenal Allah SWT, Rukun Iman & Rukun Islam',
    kalimatCPAkhirFase:
      'Anak percaya kepada Tuhan Yang Maha Esa (Allah SWT), mulai mengenal sifat-sifat Allah melalui Asmaul Husna, rukun iman, rukun Islam, serta membiasakan mengucap kalimat thoyyibah dalam kehidupan sehari-hari.',
    kompetensi: ['Mengenal (Kognitif)', 'Meyakini & Meniru (Afektif)', 'Melafalkan (Psikomotorik)'],
    kontenMateriEsensial: ['Allah Maha Pencipta (Al-Khaliq)', 'Asmaul Husna Pilihan', 'Kalimat Thoyyibah (Bismillah, Alhamdulillah, Subhanallah)'],
    kelompokUsia: 'Semua Kelompok',
    rumusanTP: 'Anak mampu mengenal Allah SWT sebagai Maha Pencipta segala alam semesta dan membiasakan mengucap kalimat thoyyibah dalam setiap aktivitas.',
    integrasiKBC: 'Cinta Allah dan Rasul-Nya (Syukur atas nikmat penciptaan)',
    dimensiDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis'],
    keterangan: 'Fondasi utama akidah tauhid dan pembiasaan adab lisan.'
  },
  {
    id: 'ana-tp-2',
    elemenCP: 'Nilai Agama dan Budi Pekerti',
    subElemen: '1.2 Praktik Ibadah Harian & Adab Islami',
    kalimatCPAkhirFase:
      'Anak berpartisipasi aktif dalam kegiatan ibadah sehari-hari (shalat berjamaah, thaharah/wudhu, hafalan surah-surah pendek dan doa harian) serta meneladani akhlak Rasulullah SAW.',
    kompetensi: ['Mempraktikkan (Psikomotorik)', 'Membiasakan (Afektif)', 'Menghafal (Kognitif)'],
    kontenMateriEsensial: ['Gerakan Wudhu Tertib', 'Shalat Berjamaah', 'Surah Pendek (Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas)', 'Doa Harian'],
    kelompokUsia: 'RA B (5-6 Tahun)',
    rumusanTP: 'Anak mampu meniru dan mempraktikkan tata cara wudhu dan shalat dengan tertib serta melafalkan surah pendek dan doa harian secara mandiri.',
    integrasiKBC: 'Cinta Ibadah & Cinta Diri (Thaharah/Kesucian)',
    dimensiDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kemandirian'],
    keterangan: 'Penguatan rutinitas pembiasaan ibadah mindful.'
  },
  {
    id: 'ana-tp-3',
    elemenCP: 'Nilai Agama dan Budi Pekerti',
    subElemen: '1.3 Menghargai Sesama & Berakhlakul Karimah',
    kalimatCPAkhirFase:
      'Anak menghargai sesama manusia dengan berbagai perbedaannya dan mempraktikkan perilaku baik, santun, pemaaf, toleran, serta saling tolong menolong.',
    kompetensi: ['Menghargai (Afektif)', 'Berperilaku Santun (Psikomotorik)', 'Memahami Konsekuensi (Kognitif)'],
    kontenMateriEsensial: ['Budaya 5S', 'Kata Ajaib (Tolong, Maaf, Terima Kasih)', 'Berbagi Mainan & Infak'],
    kelompokUsia: 'RA A (4-5 Tahun)',
    rumusanTP: 'Anak terbiasa mengucapkan salam, terima kasih, maaf, dan tolong serta mau berbagi alat main bersama teman tanpa berebut.',
    integrasiKBC: 'Cinta Sesama Manusia & Budaya Berbagi',
    dimensiDPL: ['Kewargaan', 'Kolaborasi', 'Komunikasi'],
    keterangan: 'Pilar akhlak sosial sejak usia dini.'
  },
  {
    id: 'ana-tp-4',
    elemenCP: 'Nilai Agama dan Budi Pekerti',
    subElemen: '1.4 Menyayangi & Merawat Alam Ciptaan Allah',
    kalimatCPAkhirFase:
      'Anak menghargai alam dengan cara merawatnya dan menunjukkan rasa sayang terhadap makhluk hidup (hewan dan tumbuhan) sebagai wujud syukur kepada Allah SWT.',
    kompetensi: ['Merawat (Psikomotorik)', 'Menyayangi (Afektif)', 'Mengenal Manfaat Alam (Kognitif)'],
    kontenMateriEsensial: ['Menyiram Tanaman', 'Memberi Makan Binatang', 'Membuang Sampah pada Tempatnya', 'Hemat Air'],
    kelompokUsia: 'Semua Kelompok',
    rumusanTP: 'Anak menunjukkan kepedulian terhadap lingkungan madrasah dengan merawat tanaman apotek hidup dan membuang sampah pada tempatnya.',
    integrasiKBC: 'Cinta Lingkungan & Menjaga Bumi',
    dimensiDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kewargaan'],
    keterangan: 'Projek pembiasaan rawat bumi ramah anak.'
  },

  // ELEMEN 2: Jati Diri
  {
    id: 'ana-tp-5',
    elemenCP: 'Jati Diri',
    subElemen: '2.1 Mengenali, Mengelola & Mengekspresikan Emosi',
    kalimatCPAkhirFase:
      'Anak mengenali, mengelola, dan mengekspresikan emosi diri serta membangun hubungan sosial secara sehat dengan teman sebaya dan orang dewasa.',
    kompetensi: ['Mengenali Emosi (Kognitif)', 'Meregulasi Diri (Afektif)', 'Mengekspresikan Positif (Psikomotorik)'],
    kontenMateriEsensial: ['Roda Emosi (Senang, Sedih, Marah, Takut)', 'Mindful Breathing / Tarik Nafas Tenang', 'Mengekspresikan Kebutuhan Diri'],
    kelompokUsia: 'Semua Kelompok',
    rumusanTP: 'Anak mampu mengenali emosi yang dirasakannya dan menggunakan teknik bernafas tenang/dzikir saat mengalami emosi yang kurang nyaman.',
    integrasiKBC: 'Cinta Diri & Regulasi Emosi Bahagia',
    dimensiDPL: ['Kematangan Emosi', 'Komunikasi'],
    keterangan: 'Kecerdasan emosional dan ketenangan batin.'
  },
  {
    id: 'ana-tp-6',
    elemenCP: 'Jati Diri',
    subElemen: '2.2 Identitas Diri, Keluarga & Cinta Budaya Indonesia',
    kalimatCPAkhirFase:
      'Anak menunjukkan perasaan bangga terhadap identitas dirinya, keluarganya, serta latar belakang budaya dan bangsanya sebagai anak muslim Indonesia yang beriman.',
    kompetensi: ['Menyebutkan Identitas (Kognitif)', 'Merasa Bangga (Afektif)', 'Mempraktikkan Permainan Tradisional (Psikomotorik)'],
    kontenMateriEsensial: ['Biodata Diri & Anggota Keluarga', 'Bendera Merah Putih & Simbol Garuda', 'Permainan dan Lagu Daerah'],
    kelompokUsia: 'RA B (5-6 Tahun)',
    rumusanTP: 'Anak merasa bangga dengan identitas dirinya sebagai anak muslim Indonesia serta mampu menyebutkan nama orang tua dan asal daerahnya.',
    integrasiKBC: 'Cinta Tanah Air & Cinta Budaya Indonesia',
    dimensiDPL: ['Kewargaan', 'Keimanan dan Ketakwaan kepada Tuhan YME'],
    keterangan: 'Penanaman wawasan kebangsaan dan cinta tanah air.'
  },
  {
    id: 'ana-tp-7',
    elemenCP: 'Jati Diri',
    subElemen: '2.3 Kesehatan, Kebersihan Diri (PHBS) & Motorik Terampil',
    kalimatCPAkhirFase:
      'Anak memiliki fungsi gerak motorik kasar, halus, dan taktil yang seimbang, serta mempraktikkan perilaku hidup bersih dan sehat (PHBS), kebersihan diri, keamanan diri, dan kemandirian.',
    kompetensi: ['Melakukan Gerak Koordinasi (Psikomotorik)', 'Membiasakan Hidup Bersih (Afektif)', 'Mengetahui Makanan Sehat (Kognitif)'],
    kontenMateriEsensial: ['Gerak Lokomotor & Nonlokomotor', 'Keterampilan Motorik Halus Taktil', 'Cuci Tangan 6 Langkah', 'Toilet Training Mandiri'],
    kelompokUsia: 'Semua Kelompok',
    rumusanTP: 'Anak mampu melakukan gerakan motorik terkoordinasi secara lincah serta terbiasa menjaga kebersihan diri (cuci tangan & toilet mandiri).',
    integrasiKBC: 'Cinta Kesehatan & Kehormatan Tubuh',
    dimensiDPL: ['Kesehatan', 'Kemandirian'],
    keterangan: 'Fondasi kebugaran jasmani dan kemandirian hidup.'
  },

  // ELEMEN 3: Dasar-dasar STEAM
  {
    id: 'ana-tp-8',
    elemenCP: 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)',
    subElemen: '3.1 Praliterasi, Komunikasi & Bahasa Arab Sederhana',
    kalimatCPAkhirFase:
      'Anak mengenali dan memahami berbagai informasi, mengomunikasikan perasaan dan pikiran secara lisan, tulisan awal, atau simbol media, serta menunjukkan minat pada kegiatan membaca buku dan mengenal kosakata Arab dasar.',
    kompetensi: ['Menyimak & Menceritakan (Kognitif)', 'Mengenal Simbol Fonik (Kognitif)', 'Menyusun Huruf (Psikomotorik)'],
    kontenMateriEsensial: ['Mendengarkan Cerita Buku Bergambar', 'Simbol Huruf Alfabet & Hijaiyah', 'Kosakata Bahasa Arab Tema Harian', 'Menulis Rintisan'],
    kelompokUsia: 'RA B (5-6 Tahun)',
    rumusanTP: 'Anak antusias menyimak buku cerita, mampu menceritakan kembali ide cerita secara runtut, dan mengenali bunyi fonik huruf alfabet serta hijaiyah.',
    integrasiKBC: 'Cinta Ilmu & Bahasa Al-Qur\'an',
    dimensiDPL: ['Komunikasi', 'Penalaran Kritis'],
    keterangan: 'Pondasi literasi bermakna dan cinta buku sejak dini.'
  },
  {
    id: 'ana-tp-9',
    elemenCP: 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)',
    subElemen: '3.2 Pramatematika & Pemecahan Masalah Keseharian',
    kalimatCPAkhirFase:
      'Anak mengenali dan menggunakan konsep pramatematika untuk memecahkan masalah dalam kehidupan sehari-hari (membilang, pola, bentuk geometri, ukuran, perbandingan, dan klasifikasi).',
    kompetensi: ['Membilang Benda Nyata (Kognitif)', 'Mengklasifikasi (Kognitif)', 'Menata Pola (Psikomotorik)'],
    kontenMateriEsensial: ['Membilang Benda 1-20 dengan Loose Parts', 'Bentuk Geometri Lingkaran/Segitiga/Kotak', 'Pola Berulang AB-AB & ABC-ABC', 'Konsep Pengukuran Alami'],
    kelompokUsia: 'Semua Kelompok',
    rumusanTP: 'Anak mampu membilang benda konkret dengan loose parts, mengelompokkan benda sesuai bentuk/warna, dan menyusun pola berulang secara tepat.',
    integrasiKBC: 'Cinta Logika & Keteraturan Berpikir',
    dimensiDPL: ['Penalaran Kritis', 'Kreativitas'],
    keterangan: 'Pramatematika kontekstual melalui ragam main loose parts.'
  },
  {
    id: 'ana-tp-10',
    elemenCP: 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)',
    subElemen: '3.3 Eksplorasi Sains Inkuiri & Nalar Kritis Bahan Alam',
    kalimatCPAkhirFase:
      'Anak menunjukkan kemampuan eksplorasi, inkuiri, mengamati fenomena alam, dan nalar kritis dengan memanfaatkan bahan-bahan di sekitar.',
    kompetensi: ['Mengamati & Menyelidiki (Kognitif)', 'Bereksperimen (Psikomotorik)', 'Menyimpulkan Sederhana (Kognitif)'],
    kontenMateriEsensial: ['Sifat-sifat Benda Alam (Jahe, Air, Udara, Tanah)', 'Eksperimen Terapung Tenggelam & Percampuran Warna', 'Alat Detektif Sains (Kaca Pembesar)'],
    kelompokUsia: 'RA B (5-6 Tahun)',
    rumusanTP: 'Anak mampu melakukan penyelidikan sains sederhana terhadap bahan alam di sekitar, mengajukan pertanyaan inkuiri, dan menyampaikan hasil temuannya.',
    integrasiKBC: 'Cinta Inovasi & Nalar Kritis Islami',
    dimensiDPL: ['Penalaran Kritis', 'Kreativitas'],
    keterangan: 'Menumbuhkan rasa ingin tahu dan nalar saintifik anak.'
  },
  {
    id: 'ana-tp-11',
    elemenCP: 'Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)',
    subElemen: '3.4 Rekayasa Teknologi Sederhana, Loose Parts & Seni Kreatif',
    kalimatCPAkhirFase:
      'Anak menunjukkan kemampuan rekayasa sederhana, berkarya dengan media lepas (loose parts), serta mengekspresikan ide, perasaan, dan imajinasi melalui berbagai media seni (visual, musik, gerak, tari, peran).',
    kompetensi: ['Mencipta / Merekayasa (Psikomotorik)', 'Mengekspresikan Seni (Afektif)', 'Bermain Peran Makro/Mikro (Sosial)'],
    kontenMateriEsensial: ['Konstruksi Balok & Loose Parts 3D', 'Melukis dengan Bahan Alami / Ecoprint', 'Lagu Anak Islami & Tari Kreasi', 'Bermain Peran Profesi'],
    kelompokUsia: 'Semua Kelompok',
    rumusanTP: 'Anak mampu merancang dan membuat karya konstruksi 3D dari berbagai media lepas (loose parts) serta mengekspresikan rasa senang melalui karya seni dan gerak berirama.',
    integrasiKBC: 'Cinta Seni Islami & Kreativitas Tanpa Batas',
    dimensiDPL: ['Kreativitas', 'Kolaborasi'],
    keterangan: 'Eksplorasi loose parts multi-sensori yang kaya ragam main.'
  }
];

export const INITIAL_ATP_DATA: AlurTujuanPembelajaranItem[] = [
  // SEMESTER 1 (Ganjil)
  {
    id: 'atp-sem1-m1',
    kodeTP: 'ATP-1.01',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 1,
    topikUtama: 'Aku Hamba Allah yang Istimewa: Mengenal Diriku',
    subTopik: 'Nama Lengkap, Anggota Tubuh & Karunia Panca Indera',
    elemenCP: 'Jati Diri & Nilai Agama',
    tujuanPembelajaran: 'Anak mengenal identitas diri sebagai ciptaan Allah yang unik, menyebutkan nama dan ciri fisik, serta bersyukur atas nikmat panca indera sehat.',
    materiEsensial: 'Identitas Diri, Fungsi Mata/Telinga/Hidung, Doa Sebelum Belajar, Asmaul Husna Al-Khaliq',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Cermin Ajaib Diri', 'Menyusun Wajah dari Biji & Kancing', 'Jejak Telapak Tangan Warna', 'Bermain Peran Dokter Cilik'],
    integrasiKBC: 'Cinta Diri & Cinta Allah SWT (Syukur nikmat tubuh)',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kesehatan', 'Kemandirian'],
    indikatorKetercapaian: [
      'Menyebutkan nama diri dan jenis kelamin dengan percaya diri',
      'Mengenal dan menjaga panca indera karunia Allah',
      'Mengucap kalimat Alhamdulillah atas nikmat sehat'
    ]
  },
  {
    id: 'atp-sem1-m2',
    kodeTP: 'ATP-1.02',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 2,
    topikUtama: 'Keluargaku Surgaku (Baiti Jannati)',
    subTopik: 'Ayah, Ibu, Kakek, Nenek & Kasih Sayang di Rumah',
    elemenCP: 'Nilai Agama dan Budi Pekerti & Jati Diri',
    tujuanPembelajaran: 'Anak mengenal anggota keluarga inti, menunjukkan rasa hormat dan kasih sayang kepada orang tua, serta melafalkan doa untuk kedua orang tua.',
    materiEsensial: 'Silsilah Keluarga, Doa Kedua Orang Tua (Rabbighfirli), Adab Berbicara Lembut kepada Orang Tua',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Membangun Rumah Idaman dari Balok Kayu', 'Membuat Bingkai Foto Keluarga dari Stik Es Krim & Kerang', 'Bermain Peran Keluarga Harmonis'],
    integrasiKBC: 'Cinta Keluarga & Berbakti (Birrul Walidain)',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kewargaan', 'Komunikasi'],
    indikatorKetercapaian: [
      'Melafalkan doa untuk kedua orang tua dengan suara santun',
      'Menceritakan tugas anggota keluarga di rumah',
      'Menunjukkan perilaku sayang dan membantu orang tua'
    ]
  },
  {
    id: 'atp-sem1-m3',
    kodeTP: 'ATP-1.03',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 3,
    topikUtama: 'Madrasahku Tempat Belajarku yang Ramah & Bersih',
    subTopik: 'Ruang Kelas, Guru, Teman Baru & Tata Tertib RA',
    elemenCP: 'Jati Diri & STEAM',
    tujuanPembelajaran: 'Anak mengenal lingkungan madrasah, membiasakan adab 5S, mampu bermain bersama teman tanpa berebut, serta menjaga kebersihan kelas.',
    materiEsensial: 'Pengenalan Area Madrasah, Budaya Antri, 5S (Senyum, Salam, Sapa, Sopan, Santun), Membuang Sampah Sesuai Wadah',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Peta Jalur RA dari Tali & Batu', 'Membuat Miniatur Madrasah dari Kardus Bekas & Tutup Botol', 'Pohon Sahabat RA dari Ranting'],
    integrasiKBC: 'Cinta Sesama & Cinta Lingkungan Belajar',
    profilLulusanDPL: ['Kolaborasi', 'Kewargaan', 'Kemandirian'],
    indikatorKetercapaian: [
      'Mengenal nama ustadzah dan kawan sekelas',
      'Menaati kesepakatan kelas dan merapikan mainan sendiri',
      'Mengucapkan salam saat masuk kelas'
    ]
  },
  {
    id: 'atp-sem1-m4',
    kodeTP: 'ATP-1.04',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 4,
    topikUtama: 'Makanan Halalan Thayyiban: Sehat, Halal & Bergizi',
    subTopik: 'Buah-Buahan Kurma, Pisang, Air Putih & Adab Makan',
    elemenCP: 'Nilai Agama, Jati Diri & STEAM',
    tujuanPembelajaran: 'Anak mengenal makanan dan minuman yang halal dan bergizi, mempraktikkan adab makan minum sunnah Rasulullah, serta mengklasifikasi jenis rasa.',
    materiEsensial: 'Konsep Halal & Thayyib, Adab Makan (Duduk, Tangan Kanan, Doa), Eksplorasi Rasa (Manis, Asam, Asin, Pahit)',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Restoran Halal Cilik', 'Tusuk Sate Buah Pola Geometri', 'Menimbang Buah dengan Timbangan Sederhana', 'Mewarnai Kaligrafi Bismillah dengan Biji'],
    integrasiKBC: 'Cinta Diri & Cinta Sunnah Nabi SAW',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kesehatan', 'Penalaran Kritis'],
    indikatorKetercapaian: [
      'Membaca doa sebelum dan sesudah makan secara khusyuk',
      'Makan dan minum sambil duduk menggunakan tangan kanan',
      'Menyebutkan contoh makanan sehat dan bergizi'
    ]
  },
  {
    id: 'atp-sem1-m5',
    kodeTP: 'ATP-1.05',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 5,
    topikUtama: 'Aku Sayang Ciptaan Allah: Tanaman Apotek Hidup',
    subTopik: 'Keajaiban Jahe, Kunyit, dan Serai Obat Alami',
    elemenCP: 'STEAM & Nilai Agama',
    tujuanPembelajaran: 'Anak mengenal aneka tanaman obat herbal karunia Allah, mengeksplorasi aroma dan warna alami, serta merawat tanaman obat dengan penuh cinta.',
    materiEsensial: 'Jenis Rimpang (Jahe, Kunyit, Serai, Kencur), Manfaat Herbal untuk Kesehatan, Melukis Kunyit, Menanam Jahe di Polibag',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Detektif Rimpang dengan Kaca Pembesar', 'Melukis Pelepah Pisang & Kunyit', 'Menakar Wedang Jahe Hangat', 'Menanam Tunas di Pot Cinta'],
    integrasiKBC: 'Cinta Lingkungan & Cinta Nikmat Kesehatan Allah',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis', 'Kreativitas'],
    indikatorKetercapaian: [
      'Menyebutkan tanaman jahe dan kunyit sebagai ciptaan Allah',
      'Mengeksplorasi tekstur, aroma, dan warna kunyit alami',
      'Praktik menyiram tanaman obat di madrasah secara teratur'
    ]
  },
  {
    id: 'atp-sem1-m6',
    kodeTP: 'ATP-1.06',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 6,
    topikUtama: 'Masjidku Bersih & Indah: Rumah Ibadah Mulia',
    subTopik: 'Arsitektur Masjid, Perlengkapan Shalat & Adab Beribadah',
    elemenCP: 'Nilai Agama dan Budi Pekerti & STEAM',
    tujuanPembelajaran: 'Anak mengenal masjid sebagai tempat ibadah umat Islam, meniru adab masuk masjid, serta merancang miniatur masjid menggunakan balok dan media lepas.',
    materiEsensial: 'Fungsi Masjid, Adab Masuk (Kaki Kanan & Doa), Muadzin & Imam, Konstruksi Kubah & Menara',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Arsitek Cilik Balok Masjid', 'Praktek Wudhu Khusyuk', 'Merangkai Sajadah Motif Geometri', 'Menghias Kaligrafi Kubah'],
    integrasiKBC: 'Cinta Ibadah & Cinta Rumah Allah SWT',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kreativitas', 'Kewargaan'],
    indikatorKetercapaian: [
      'Melafalkan doa masuk dan keluar masjid',
      'Mengenal bagian-bagian masjid (kubah, menara, mihrab)',
      'Merancang bangunan masjid 3D dari balok secara berkelompok'
    ]
  },
  {
    id: 'atp-sem1-m7',
    kodeTP: 'ATP-1.07',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 7,
    topikUtama: 'Binatang Kesayangan Nabi Muhammad SAW',
    subTopik: 'Kucing yang Menggemaskan, Burung Berkicau & Kasih Sayang Hewan',
    elemenCP: 'Nilai Agama, Jati Diri & STEAM',
    tujuanPembelajaran: 'Anak mengenal hewan kesayangan Rasulullah SAW, menumbuhkan rasa empati dan kasih sayang pada binatang, serta mengamati suara dan gerak hewan.',
    materiEsensial: 'Kisah Nabi Sayang Kucing (Muezza), Makanan Hewan, Menjaga Kebersihan Kandang, Ciptaan Allah Maha Pengasih',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Membuat Kandang Hewan dari Stik Kayu', 'Meniru Gerak & Suara Kucing/Burung', 'Kolase Kucing dari Kapas & Benang', 'Memberi Makan Kucing'],
    integrasiKBC: 'Cinta Makhluk Hidup & Kasih Sayang Rasulullah',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Kematangan Emosi', 'Komunikasi'],
    indikatorKetercapaian: [
      'Menunjukkan sikap lembut dan tidak menyakiti hewan',
      'Menceritakan ciri-ciri fisik hewan kesayangan',
      'Mengelompokkan hewan berkaki dua dan empat'
    ]
  },
  {
    id: 'atp-sem1-m8',
    kodeTP: 'ATP-1.08',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester I (Ganjil)',
    mingguKe: 8,
    topikUtama: 'Aku Cinta Tanah Airku Indonesia: Merah Putih di Dadaku',
    subTopik: 'Bendera, Lagu Kebangsaan, Garuda Pancasila & Kebhinekaan',
    elemenCP: 'Jati Diri & STEAM',
    tujuanPembelajaran: 'Anak mengenal lambang negara Indonesia, menyanyikan lagu Indonesia Raya dengan sikap hormat, serta mengenal keragaman budaya nusantara.',
    materiEsensial: 'Bendera Merah Putih, Lambang Garuda, Lagu Nasional Anak, Pakaian Adat & Gotong Royong',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Meronce Bendera Merah Putih dari Manik-manik', 'Membangun Tugu Monas dari Balok', 'Karnaval Baju Nusantara Cilik', 'Permainan Tradisional Engklek'],
    integrasiKBC: 'Cinta Tanah Air & Persatuan Indonesia',
    profilLulusanDPL: ['Kewargaan', 'Kolaborasi', 'Kreativitas'],
    indikatorKetercapaian: [
      'Menyebutkan warna bendera Indonesia dan artinya',
      'Mampu berdiri tegak saat mendengar lagu kebangsaan',
      'Mengenal ragam busana dan permainan tradisional nusantara'
    ]
  },

  // SEMESTER 2 (Genap)
  {
    id: 'atp-sem2-m1',
    kodeTP: 'ATP-2.01',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester II (Genap)',
    mingguKe: 1,
    topikUtama: 'Air Karunia Allah SWT: Sumber Kehidupan & Bersuci',
    subTopik: 'Air Hujan, Air Sumur, Manfaat Air Bersih & Wudhu',
    elemenCP: 'STEAM & Nilai Agama',
    tujuanPembelajaran: 'Anak mengenal air sebagai karunia Allah yang sangat penting, melakukan penyelidikan sifat air, mempraktikkan thaharah, dan membiasakan hemat air.',
    materiEsensial: 'Sumber Air Alami, Sifat Air Mengalir & Mengikuti Wadah, Thaharah (Bersuci), Adab Hemat Air Tidak Mubazir',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Eksperimen Terapung Tenggelam dengan Batu & Daun', 'Jalur Aliran Air dari Bambu/Pipa', 'Praktik Hemat Air Wudhu', 'Mencampur Warna Dasar pada Air'],
    integrasiKBC: 'Cinta Lingkungan & Cinta Thaharah (Bersuci)',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis', 'Kesehatan'],
    indikatorKetercapaian: [
      'Menjelaskan manfaat air untuk minum, mandi, dan wudhu',
      'Mampu mematikan kran air setelah selesai digunakan',
      'Menyimpulkan benda yang terapung dan tenggelam di air'
    ]
  },
  {
    id: 'atp-sem2-m2',
    kodeTP: 'ATP-2.02',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester II (Genap)',
    mingguKe: 2,
    topikUtama: 'Udara dan Angin Segar Ciptaan Allah',
    subTopik: 'Nafas Kehidupan, Kincir Angin & Balon Udara',
    elemenCP: 'STEAM & Jati Diri',
    tujuanPembelajaran: 'Anak menyadari pentingnya udara bersih ciptaan Allah untuk bernafas, mengeksplorasi sifat udara melalui media kincir angin dan balon.',
    materiEsensial: 'Udara Mengisi Ruang, Angin Menggerakkan Benda, Mindful Breathing (Nafas Syukur), Menjaga Udara Bersih Bebas Asap',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Membuat Kincir Angin Kertas & Daun Kering', 'Lomba Meniup Kapas dengan Sedotan', 'Eksperimen Menggelembungkan Balon', 'Mindful Breathing di Bawah Pohon'],
    integrasiKBC: 'Cinta Diri & Cinta Alam Sehat',
    profilLulusanDPL: ['Penalaran Kritis', 'Kreativitas', 'Kesehatan'],
    indikatorKetercapaian: [
      'Menghirup dan menghembuskan nafas dengan tenang sambil bersyukur',
      'Membuat karya kincir angin sederhana dari bahan kertas/daun',
      'Mengetahui bahwa udara tidak terlihat tetapi dapat dirasakan'
    ]
  },
  {
    id: 'atp-sem2-m3',
    kodeTP: 'ATP-2.03',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester II (Genap)',
    mingguKe: 3,
    topikUtama: 'Kendaraan & Transportasi: Menjelajah Bumi Allah',
    subTopik: 'Mobil, Kereta Api, Kapal Laut, Pesawat & Doa Naik Kendaraan',
    elemenCP: 'STEAM & Nilai Agama',
    tujuanPembelajaran: 'Anak mengenal ragam moda transportasi darat, laut, dan udara, mempraktikkan doa naik kendaraan (Subhanalladzi sakhara lana), serta memahami rambu lalu lintas.',
    materiEsensial: 'Kendaraan Darat/Laut/Udara, Doa Naik Kendaraan, Aturan Keselamatan di Jalan, Profesi Pengemudi (Masinis, Pilot, Nahkoda)',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Merakit Mobil dari Kardus & Tutup Botol', 'Rel Kereta Api dari Ranting & Balok', 'Bermain Peran Stasiun Kereta Api', 'Mengenal Rambu Lampu Lalu Lintas'],
    integrasiKBC: 'Cinta Ilmu & Doa Keselamatan Safar',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis', 'Komunikasi'],
    indikatorKetercapaian: [
      'Melafalkan doa naik kendaraan darat dan laut',
      'Mengelompokkan kendaraan berdasarkan lintasannya (darat, laut, udara)',
      'Mematuhi aturan keselamatan saat berkendara (memakai helm/sabuk)'
    ]
  },
  {
    id: 'atp-sem2-m4',
    kodeTP: 'ATP-2.04',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester II (Genap)',
    mingguKe: 4,
    topikUtama: 'Profesi Mulia: Cita-Citaku Mengabdi & Menolong Sesama',
    subTopik: 'Guru, Dokter, Petani, Polisi, Arsitek & Penjual yang Jujur',
    elemenCP: 'Jati Diri & Nilai Agama',
    tujuanPembelajaran: 'Anak mengenal aneka profesi pekerjaan yang halal dan bermanfaat, menumbuhkan cita-cita mulia, serta menghargai setiap profesi yang halal.',
    materiEsensial: 'Jenis Profesi, Kejujuran dalam Bekerja (Shiddiq & Amanah), Peralatan Kerja Setiap Profesi, Cita-cita Menjadi Anak Bermanfaat',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Bermain Peran Dokter dan Apoteker Cilik', 'Pasar Tradisional Jual Beli Halal', 'Panggung Cita-Cita Berseragam', 'Membuat Alat Profesi dari Bahan Daur Ulang'],
    integrasiKBC: 'Cinta Ilmu & Cinta Pengabdian (Khairunnas Anfa\'uhum Linnas)',
    profilLulusanDPL: ['Kewargaan', 'Kolaborasi', 'Kemandirian'],
    indikatorKetercapaian: [
      'Menceritakan cita-cita diri dengan penuh semangat',
      'Mengenal tugas dan peralatan profesi dokter, petani, guru, dll.',
      'Mempraktikkan sikap jujur saat bermain peran jual beli'
    ]
  },
  {
    id: 'atp-sem2-m5',
    kodeTP: 'ATP-2.05',
    kelompokUsia: 'RA B (5-6 Tahun)',
    semester: 'Semester II (Genap)',
    mingguKe: 5,
    topikUtama: 'Bumi dan Alam Semesta Ciptaan Allah yang Mengagumkan',
    subTopik: 'Matahari, Bulan, Bintang, Siang dan Malam',
    elemenCP: 'STEAM & Nilai Agama',
    tujuanPembelajaran: 'Anak mengagumi kebesaran Allah menciptakan tata surya, mengenal pergantian siang dan malam, serta menghitung bintang dengan loose parts.',
    materiEsensial: 'Matahari Sumber Cahaya, Bulan dan Bintang di Malam Hari, Shalat 5 Waktu Penanda Waktu, Asmaul Husna An-Nuur',
    alokasiWaktu: '1 Minggu (900 Menit / 5 Hari)',
    ragamMainLooseParts: ['Teropong Bintang dari Tabung Kertas', 'Membuat Pola Rasi Bintang dengan Kancing & Manik', 'Lukisan Malam Hari dengan Cat Fluorescent & Garam', 'Eksperimen Bayangan Matahari'],
    integrasiKBC: 'Cinta Allah SWT (Tadabbur Alam Semesta)',
    profilLulusanDPL: ['Keimanan dan Ketakwaan kepada Tuhan YME', 'Penalaran Kritis', 'Kreativitas'],
    indikatorKetercapaian: [
      'Menjelaskan perbedaan suasana siang dan malam hari',
      'Menyebutkan Allah yang menciptakan matahari dan bulan',
      'Membilang benda bentuk bintang hingga angka 20'
    ]
  }
];
