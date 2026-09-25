'use client';

// Shower/bathroom glyph uses the official Iconoir "Bathroom" asset (MIT):
// https://github.com/iconoir-icons/iconoir/blob/main/icons/regular/bathroom.svg
type Kind =
  | 'door'
  | 'window'
  | 'frame'
  | 'partition'
  | 'shower'
  | 'measure'
  | 'install'
  | 'consult'
  | 'price'
  | 'material'
  | 'warranty'
  | 'heart'
  | 'navLeft'
  | 'navRight'
  | 'navUp'
  | 'navDown';

const strokes: Record<Kind, string[]> = {
  door: [
    'M5 21V3H19V21',
    'M8 21V6H16V21',
    'M13.5 13H14',
  ],
  window: [
    'M4 5H20V19H4Z',
    'M12 5V19',
    'M4 12H20',
  ],
  frame: [
    'M4 4H20V20H4Z',
    'M8 8H16V16H8Z',
  ],
  partition: [
    'M3 5H21V19H3Z',
    'M9 5V19',
    'M15 5V19',
  ],
  shower: [
    'M21 13V16C21 18.2091 19.2091 20 17 20H7C4.79086 20 3 18.2091 3 16V13.6C3 13.2686 3.26863 13 3.6 13H21Z',
    'M16 20L17 22',
    'M8 20L7 22',
    'M21 13V7C21 4.79086 19.2091 3 17 3H12',
    'M15.4 8H8.60003C8.26865 8 8.00393 7.7317 8.04019 7.4023C8.18624 6.07539 8.86312 3 12 3C15.1369 3 15.8138 6.07539 15.9598 7.4023C15.9961 7.73169 15.7314 8 15.4 8Z',
  ],
  measure: [
    'M5 18L18 5L21 8L8 21L5 18Z',
    'M15 8L18 11',
    'M11 12L14 15',
    'M7.5 15.5L10.5 18.5',
  ],
  install: [
    'M14 4C11.2386 4 9 6.23858 9 9C9 9.86166 9.21801 10.6724 9.60178 11.3802L4 17L7 20L12.6198 14.3982C13.3276 14.782 14.1383 15 15 15C17.7614 15 20 12.7614 20 10C20 9.52602 19.934 9.06746 19.8106 8.63289L17 11.4435L12.5565 7L15.3671 4.18935C14.9325 4.06602 14.474 4 14 4Z',
  ],
  consult: [
    'M5 5.5H15.5C17.433 5.5 19 7.067 19 9V12.5C19 14.433 17.433 16 15.5 16H10L6 19V16H5C3.89543 16 3 15.1046 3 14V7.5C3 6.39543 3.89543 5.5 5 5.5Z',
    'M8 9H14',
    'M8 12H12',
    'M17 4L18.5 2.5L20 4',
  ],
  price: [
    'M4 7H14L20 13L14 19H4V7Z',
    'M8 11H13',
    'M8 15H11',
    'M17 7V5',
    'M14 4H20',
  ],
  material: [
    'M12 3L20 7L12 11L4 7L12 3Z',
    'M4 11L12 15L20 11',
    'M4 15L12 19L20 15',
  ],
  warranty: [
    'M12 3L19 6V11C19 15.2 16.4 18.4 12 21C7.6 18.4 5 15.2 5 11V6L12 3Z',
    'M9 12L11 14L15 10',
  ],
  heart: [
    'M12 20S4 15.2 4 9.2C4 6.9 5.8 5 8.2 5C9.8 5 11.1 5.8 12 7C12.9 5.8 14.2 5 15.8 5C18.2 5 20 6.9 20 9.2C20 15.2 12 20 12 20Z',
  ],
  navLeft: ['M15 6L9 12L15 18'],
  navRight: ['M9 6L15 12L9 18'],
  navUp: ['M6 15L12 9L18 15'],
  navDown: ['M6 9L12 15L18 9'],
};

export function LineGlyph({ kind, className = '' }: { kind: Kind; className?: string }) {
  return (
    <svg
      className={`line-glyph ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {strokes[kind].map((d, index) => (
        <path
          key={`${kind}-${index}`}
          d={d}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
