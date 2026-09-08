export const fonts = {
  geist: {
    light: 'Geist-Light',
    regular: 'Geist-Regular',
    semibold: 'Geist-SemiBold',
    bold: 'Geist-Bold',
    extrabold: 'Geist-ExtraBold',
  },
} as const;

export type GeistWeight = keyof typeof fonts.geist;