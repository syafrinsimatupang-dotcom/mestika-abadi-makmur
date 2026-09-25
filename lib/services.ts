export type Service = {
  slug: string;
  keyword: string;
  shortTitle: string;
  title: string;
  description: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  highlight: string;
  benefits: string[];
  suitableFor: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'pintu-aluminium',
    keyword: 'pintu aluminium',
    shortTitle: 'Pintu Aluminium',
    title: 'Pintu Aluminium Jabodetabek',
    description:
      'Pintu aluminium untuk rumah, toko, kantor, dan area komersial dengan pilihan swing maupun sliding, dikombinasikan dengan kaca sesuai kebutuhan ruang.',
    metaDescription:
      'Jasa pintu aluminium area Jabodetabek untuk rumah, toko, kantor dan area komersial. Konsultasi model swing/sliding, ukuran dan kombinasi kaca via WhatsApp.',
    image:
      'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&w=1800',
    imageAlt: 'Referensi pintu kaca dengan frame aluminium hitam untuk hunian modern',
    imagePosition: '58% 50%',
    highlight: 'Swing · Sliding · Kaca',
    benefits: [
      'Rangka aluminium ringan dan rapi untuk penggunaan harian',
      'Pilihan bukaan disesuaikan dengan luas dan sirkulasi ruang',
      'Dapat dipadukan dengan kaca bening, buram, atau opsi sesuai kebutuhan proyek',
    ],
    suitableFor: ['Rumah tinggal', 'Ruko & toko', 'Kantor', 'Area servis dan komersial'],
    faq: [
      {
        q: 'Apakah pintu aluminium bisa dibuat sliding?',
        a: 'Bisa. Konfigurasi swing atau sliding ditentukan berdasarkan bukaan, fungsi ruang, dan kebutuhan akses di lokasi.',
      },
      {
        q: 'Apakah ukuran pintu bisa custom?',
        a: 'Ya. Pengerjaan fabrikasi idealnya mengikuti ukuran aktual di lokasi agar proporsi dan pemasangan lebih presisi.',
      },
    ],
  },
  {
    slug: 'jendela-aluminium',
    keyword: 'jendela aluminium',
    shortTitle: 'Jendela Aluminium',
    title: 'Jendela Aluminium Jabodetabek',
    description:
      'Jendela aluminium untuk hunian dan bangunan komersial dengan pendekatan yang bersih, proporsional, serta mudah dipadukan dengan gaya fasad modern.',
    metaDescription:
      'Jasa jendela aluminium area Jabodetabek untuk rumah dan bangunan komersial. Konsultasi ukuran, tipe bukaan, warna rangka dan pilihan kaca.',
    image:
      'https://images.pexels.com/photos/19963718/pexels-photo-19963718/free-photo-of-modern-house-windows.jpeg?auto=compress&cs=tinysrgb&w=1800',
    imageAlt: 'Referensi jendela modern pada rumah dengan frame ramping',
    imagePosition: '52% 43%',
    highlight: 'Ventilasi · Cahaya · Proporsi',
    benefits: [
      'Profil ramping membantu tampilan fasad terasa lebih bersih',
      'Konfigurasi bukaan dapat disesuaikan dengan kebutuhan ventilasi',
      'Pilihan kaca dapat diarahkan untuk privasi, cahaya, atau tampilan',
    ],
    suitableFor: ['Kamar & ruang keluarga', 'Fasad rumah', 'Ruko', 'Kantor'],
    faq: [
      {
        q: 'Tipe bukaan apa yang tersedia?',
        a: 'Pilihan umum meliputi sliding dan casement/swing. Rekomendasi akhirnya mengikuti kondisi bukaan dan penggunaan ruang.',
      },
      {
        q: 'Bisa dibuat dengan warna frame gelap?',
        a: 'Bisa, tergantung pilihan finishing/profil yang tersedia untuk proyek. Warna sebaiknya diselaraskan dengan fasad dan elemen interior.',
      },
    ],
  },
  {
    slug: 'kusen-aluminium',
    keyword: 'kusen aluminium',
    shortTitle: 'Kusen Aluminium',
    title: 'Kusen Aluminium Jabodetabek',
    description:
      'Kusen aluminium sebagai basis bukaan pintu dan jendela yang rapi, stabil, dan mudah dipadukan dengan berbagai gaya arsitektur.',
    metaDescription:
      'Jasa kusen aluminium area Jabodetabek untuk pintu dan jendela. Fabrikasi berdasarkan ukuran lokasi, kebutuhan bukaan dan tampilan bangunan.',
    image:
      'https://images.pexels.com/photos/5768188/pexels-photo-5768188.jpeg?auto=compress&cs=tinysrgb&w=1800',
    imageAlt: 'Proses pemasangan kusen jendela pada hunian menggunakan alat kerja',
    imagePosition: '50% 52%',
    highlight: 'Presisi · Rapi · Adaptif',
    benefits: [
      'Dibuat mengikuti kebutuhan ukuran aktual',
      'Visual frame yang bersih untuk hunian maupun komersial',
      'Mendukung berbagai konfigurasi pintu dan jendela',
    ],
    suitableFor: ['Renovasi', 'Bangunan baru', 'Ruko', 'Kantor & retail'],
    faq: [
      {
        q: 'Apakah kusen dibuat setelah survei?',
        a: 'Idealnya ukuran final dikonfirmasi dari kondisi aktual agar fabrikasi dan pemasangan tidak mengandalkan asumsi ukuran.',
      },
      {
        q: 'Apakah bisa untuk renovasi kusen lama?',
        a: 'Bisa dievaluasi. Kondisi bukaan, dinding, dan elemen lama perlu dilihat untuk menentukan pendekatan pemasangan yang tepat.',
      },
    ],
  },
  {
    slug: 'partisi-kaca',
    keyword: 'partisi kaca',
    shortTitle: 'Partisi Kaca',
    title: 'Partisi Kaca Jabodetabek',
    description:
      'Partisi kaca untuk ruang kantor, toko, klinik, studio, atau hunian yang membutuhkan pembagian area tanpa membuat ruang terasa sempit dan gelap.',
    metaDescription:
      'Jasa partisi kaca area Jabodetabek untuk kantor, toko dan hunian. Pilihan frameless atau kombinasi aluminium untuk ruang yang terasa terang dan modern.',
    image:
      'https://images.pexels.com/photos/5511093/pexels-photo-5511093.jpeg?auto=compress&cs=tinysrgb&w=1800',
    imageAlt: 'Referensi partisi kaca pada koridor kantor modern yang terang',
    imagePosition: '67% 50%',
    highlight: 'Frameless · Office · Light',
    benefits: [
      'Membagi ruang sambil menjaga aliran cahaya',
      'Tampilan minimal dan cocok untuk interior modern',
      'Dapat dikombinasikan dengan frame aluminium atau pendekatan frameless',
    ],
    suitableFor: ['Kantor', 'Retail', 'Klinik & studio', 'Hunian modern'],
    faq: [
      {
        q: 'Partisi kaca cocok untuk kantor kecil?',
        a: 'Cocok karena pembagian ruang tetap terasa terbuka secara visual. Layout perlu disesuaikan dengan sirkulasi dan privasi yang dibutuhkan.',
      },
      {
        q: 'Apakah tersedia opsi frameless?',
        a: 'Ya, pendekatan frameless dapat dipertimbangkan sesuai dimensi, kebutuhan pintu, sistem hardware, dan kondisi lokasi.',
      },
    ],
  },
  {
    slug: 'shower-box',
    keyword: 'shower box',
    shortTitle: 'Shower Box',
    title: 'Shower Box Jabodetabek',
    description:
      'Shower box kaca untuk memisahkan area basah dan kering dengan tampilan minimal, cocok untuk kamar mandi rumah, apartemen, maupun properti komersial.',
    metaDescription:
      'Jasa shower box area Jabodetabek dengan kaca untuk kamar mandi rumah, apartemen dan properti komersial. Konsultasi ukuran, bukaan dan hardware.',
    image:
      'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&w=1800',
    imageAlt: 'Referensi shower box dengan panel kaca bening pada kamar mandi modern',
    imagePosition: '58% 50%',
    highlight: 'Clean · Dry Zone · Glass',
    benefits: [
      'Membantu memisahkan area basah dan kering',
      'Tampilan transparan membuat kamar mandi terasa lebih ringan',
      'Konfigurasi pintu dan panel mengikuti layout ruang',
    ],
    suitableFor: ['Rumah tinggal', 'Apartemen', 'Guest house', 'Properti komersial'],
    faq: [
      {
        q: 'Apakah shower box harus full frameless?',
        a: 'Tidak. Sistem dapat disesuaikan dengan kebutuhan desain, struktur, hardware, ukuran, dan kondisi area kamar mandi.',
      },
      {
        q: 'Bagaimana menentukan ukuran shower box?',
        a: 'Ukuran sebaiknya mengacu pada area aktual, posisi sanitary, arah bukaan, dan ruang gerak pengguna.',
      },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, Service>;

export const portfolioReferences = [
  {
    title: 'Ruang dengan sliding kaca',
    category: 'Pintu & Sliding',
    image:
      'https://images.pexels.com/photos/18559636/pexels-photo-18559636/free-photo-of-a-large-empty-room-with-sliding-glass-doors.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Referensi ruang luas dengan sliding glass door',
    imagePosition: '62% 50%',
  },
  {
    title: 'Partisi kaca kantor',
    category: 'Partisi',
    image:
      'https://images.pexels.com/photos/5511093/pexels-photo-5511093.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Referensi partisi kaca pada koridor kantor modern',
    imagePosition: '67% 50%',
  },
  {
    title: 'Sliding kaca modern',
    category: 'Jendela',
    image:
      'https://images.pexels.com/photos/34574609/pexels-photo-34574609/free-photo-of-bright-modern-room-with-sliding-glass-door.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Referensi ruang terang dengan sliding glass door',
    imagePosition: '68% 50%',
  },
  {
    title: 'Shower box kaca',
    category: 'Shower Box',
    image:
      'https://images.pexels.com/photos/7214728/pexels-photo-7214728.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Referensi shower box dengan dinding kaca bening',
    imagePosition: '58% 50%',
  },
  {
    title: 'Sliding door hunian',
    category: 'Kusen',
    image:
      'https://images.pexels.com/photos/13600834/pexels-photo-13600834.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Referensi sliding door dengan tirai putih pada hunian',
    imagePosition: '52% 50%',
  },
];
