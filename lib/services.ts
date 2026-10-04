import productMedia from './product-media.json';

export type Service = {
  slug: string;
  keyword: string;
  shortTitle: string;
  title: string;
  description: string;
  metaDescription: string;
  image: string;
  images: string[];
  imageAlt: string;
  imagePosition: string;
  highlight: string;
  benefits: string[];
  suitableFor: string[];
  faq: { q: string; a: string }[];
};

const catalog = [
  ['pintu-panel-acp', 'Pintu Panel ACP', 'Pintu panel ACP untuk bidang tertutup dengan tampilan yang rapi.', 'Pintu · Panel · ACP', 'Rumah, kamar, dan ruang komersial'],
  ['pintu-kaca-aluminium', 'Pintu Kaca Aluminium', 'Pintu kaca dengan rangka aluminium untuk akses yang terang dan tampilan ringan.', 'Pintu · Kaca · Aluminium', 'Rumah, kantor, dan toko'],
  ['pintu-kaca-swing-multi', 'Pintu Kaca Swing Multi', 'Pintu kaca dengan beberapa daun ayun untuk bukaan yang lebih lebar.', 'Pintu · Kaca · Multi daun', 'Rumah, toko, dan ruang komersial'],
  ['pintu-kaca-swing-single', 'Pintu Kaca Swing Single', 'Pintu kaca satu daun ayun dengan rangka aluminium untuk akses yang praktis.', 'Pintu · Kaca · Satu daun', 'Rumah, kantor, dan toko'],
  ['pintu-kawat-nyamuk', 'Pintu Kawat Nyamuk', 'Pintu berpanel kawat nyamuk untuk membantu menjaga ventilasi dan membatasi serangga.', 'Pintu · Ventilasi · Kawat nyamuk', 'Rumah dan area servis'],
  ['pintu-lipat', 'Pintu Lipat', 'Pintu lipat kaca berbingkai aluminium untuk bukaan yang dapat dilipat ke samping.', 'Pintu · Lipat · Aluminium', 'Rumah, ruko, dan ruang komersial'],
  ['pintu-sliding-door', 'Pintu Sliding Door', 'Pintu kaca geser berbingkai aluminium untuk akses yang hemat ruang.', 'Pintu · Geser · Kaca', 'Rumah, dapur, dan ruang komersial'],
  ['pintu-sliding-gantung', 'Pintu Sliding Gantung', 'Pintu geser gantung dengan rel atas untuk akses yang ringkas.', 'Pintu · Geser gantung · Aluminium', 'Rumah, kantor, dan area servis'],
  ['pintu-spandrel-full-aluminium', 'Pintu Spandrel Full Aluminium', 'Pintu panel aluminium penuh untuk bukaan yang membutuhkan bidang tertutup.', 'Pintu · Spandrel · Aluminium', 'Rumah, kamar, dan area servis'],
  ['jendela-sliding-door', 'Jendela Sliding Door', 'Bukaan kaca geser yang membantu menghemat ruang dan menjaga pencahayaan.', 'Geser · Cahaya · Ruang', 'Hunian dan ruang komersial'],
  ['jendela-casement-single', 'Jendela Casement Single', 'Jendela casement satu daun untuk bukaan praktis dan ventilasi ruang.', 'Satu daun · Ventilasi', 'Kamar dan area kerja'],
  ['jendela-casement-double', 'Jendela Casement Double', 'Jendela casement dua daun untuk bukaan lebih lebar dan aliran udara.', 'Dua daun · Ventilasi', 'Ruang keluarga dan fasad'],
  ['partisi-kaca', 'Partisi Kaca', 'Pembatas kaca yang membagi area tanpa menutup pandangan dan cahaya.', 'Partisi · Kaca', 'Kantor, toko, dan hunian'],
  ['partisi-kaca-aluminium', 'Partisi Kaca Aluminium', 'Partisi kaca dengan rangka aluminium untuk pembagian ruang yang tegas dan rapi.', 'Partisi · Rangka aluminium', 'Kantor dan ruang komersial'],
  ['partisi-kaca-tempered-tebal-10mm', 'Partisi Kaca Tempered Tebal 10mm', 'Partisi kaca tempered tebal 10 mm untuk ruang yang membutuhkan spesifikasi tersebut.', 'Partisi · Tempered 10 mm', 'Kantor dan area komersial'],
  ['kaca-shower-kamar-mandi', 'Kaca Shower Kamar Mandi', 'Panel kaca shower untuk membantu memisahkan area basah dan kering di kamar mandi.', 'Shower · Kaca · Kamar mandi', 'Rumah, apartemen, dan penginapan'],
] as const;

export const services: Service[] = catalog.map(([slug, name, description, highlight, suitable]) => ({
  slug,
  keyword: name.toLowerCase(),
  shortTitle: name,
  title: `${name} Jabodetabek`,
  description,
  metaDescription: `${name} untuk kebutuhan rumah dan komersial di Jabodetabek. Konsultasikan ukuran, model, dan pemasangan dengan Mestika Abadi Makmur.`,
  image: productMedia[name][0],
  images: productMedia[name],
  imageAlt: `Foto produk ${name.toLowerCase()} Mestika Abadi Makmur`,
  imagePosition: '50% 50%',
  highlight,
  benefits: [
    'Ukuran disesuaikan dengan kondisi bukaan di lokasi',
    'Pilihan konfigurasi dibahas sesuai fungsi dan tampilan ruang',
    'Pemasangan direncanakan agar hasil akhir rapi dan dapat digunakan dengan baik',
  ],
  suitableFor: suitable.split(', ').map((use) =>
    use.replace(/^dan /, '').replace(/^./, (letter) => letter.toUpperCase()),
  ),
  faq: [
    { q: `Apakah ${name.toLowerCase()} bisa dibuat sesuai ukuran?`, a: 'Bisa. Ukuran akhir dan konfigurasi ditentukan setelah kebutuhan serta kondisi lokasi dikonfirmasi.' },
    { q: 'Bagaimana memulai konsultasi?', a: 'Kirim lokasi, perkiraan ukuran, dan foto area pemasangan melalui WhatsApp agar kebutuhan awal dapat dibahas.' },
  ],
}));

export const serviceBySlug = Object.fromEntries(
  [
    ...services.map((service) => [service.slug, service]),
    // Previously published URLs resolve to the final category and canonical name.
    ['partisi-kaca-tebal-10mm', services.find((service) => service.slug === 'partisi-kaca-aluminium')],
    ['pintu-acp', services.find((service) => service.slug === 'pintu-panel-acp')],
  ],
) as Record<string, Service>;

export const legacyServiceSlugs = ['pintu-acp', 'partisi-kaca-tebal-10mm'] as const;

const featuredPortfolioSlugs = [
  'pintu-panel-acp',
  'pintu-kaca-aluminium',
  'jendela-sliding-door',
  'partisi-kaca',
  'kaca-shower-kamar-mandi',
];

export const portfolioReferences = featuredPortfolioSlugs.map((slug) => serviceBySlug[slug]).map((service) => ({
  title: service.shortTitle,
  category: service.shortTitle,
  image: service.image,
  alt: service.imageAlt,
  imagePosition: service.imagePosition,
}));
