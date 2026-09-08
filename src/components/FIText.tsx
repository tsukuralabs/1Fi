// src/components/Text/Text.tsx

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

import { scaleFont } from '@raahimkhan23/react-native-responsive-utils';

import { fonts } from '../theme/fonts';

export type TextVariant =
  | 'xs'
  | 'sm'
  | 'body'
  | 'lg'
  | 'xl'
  | 'heading'
  | 'title'
  | 'display';

export type TextWeight =
  | 'light'
  | 'regular'
  | 'semibold'
  | 'bold'
  | 'extrabold';

export interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

const fontSizes: Record<TextVariant, number> = {
  xs: 12,
  sm: 14,
  body: 16,
  lg: 18,
  xl: 20,
  heading: 24,
  title: 30,
  display: 36,
};

export function FIText({
  children,
  variant = 'body',
  weight = 'regular',
  color = '#111111',
  align,
  style,
  ...props
}: TextProps) {
  const fontSize = fontSizes[variant];

  return (
    <RNText
      {...props}
      style={[
        styles.base,
        {
          fontFamily: fonts.geist[weight],
          fontSize: scaleFont(fontSize),
          color,
          textAlign: align,
        },
        styles[variant],
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },

  xs: {
    lineHeight: scaleFont(16),
  },

  sm: {
    lineHeight: scaleFont(20),
  },

  body: {
    lineHeight: scaleFont(24),
  },

  lg: {
    lineHeight: scaleFont(26),
  },

  xl: {
    lineHeight: scaleFont(28),
  },

  heading: {
    lineHeight: scaleFont(32),
    letterSpacing: -0.3,
  },

  title: {
    lineHeight: scaleFont(38),
    letterSpacing: -0.5,
  },

  display: {
    lineHeight: scaleFont(44),
    letterSpacing: -0.8,
  },
});
