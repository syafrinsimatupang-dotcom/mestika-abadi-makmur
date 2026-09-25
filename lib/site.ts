export const siteConfig = {
  name: 'Mestika Abadi Makmur',
  description:
    'Jasa fabrikasi dan pemasangan aluminium & kaca untuk area Jabodetabek dan sekitarnya: pintu, jendela, kusen, sliding system, partisi kaca, frameless glass, spandrel door, dan shower box.',
  area: 'Jabodetabek dan sekitarnya',
  address: 'Jl. H. Buang, RT/RW 03/03, Kelurahan Cipete, Kecamatan Pinang, Kota Tangerang',
  addressShort: 'Jl. H. Buang, RT/RW 03/03, Kelurahan Cipete, Kecamatan Pinang, Kota Tangerang',
  whatsappDisplay: '0823-1894-8989',
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') ||
    'https://mestikaabadimakmur.com',
  whatsapp: '6282318948989',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Jl.%20H.%20Buang%2C%20RT%2FRW%2003%2F03%2C%20Kelurahan%20Cipete%2C%20Kecamatan%20Pinang%2C%20Kota%20Tangerang',
  colors: {
    primary: '#002E6E',
    secondary: '#16181D',
    accent: '#F4B701',
  },
};

export type WhatsAppInquiry = {
  sourcePath?: string;
  service?: string;
  details?: string[];
};

export function websiteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;

  const cleaned = path.replace(/^\/+|\/+$/g, '');
  const normalized = cleaned ? `/${cleaned}/` : '/';
  return `${siteConfig.url}${normalized}`;
}

export function whatsappHref({
  sourcePath = '/',
  service,
  details = [],
}: WhatsAppInquiry = {}) {
  const subject = service || 'kebutuhan aluminium dan kaca';
  const source = websiteUrl(sourcePath);
  const message = [
    `Halo ${siteConfig.name}, saya datang dari ${source} dan ingin konsultasi terkait ${subject}.`,
    ...details.filter(Boolean),
  ].join('\n');

  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
