import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';

import { FIText } from './FIText';
import { colors } from '../theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const variantStyles = {
  primary: { background: colors.primary, text: colors.white },
  secondary: { background: colors.primaryLight, text: colors.primary },
  outline: { background: 'transparent', text: colors.foreground, border: colors.border },
  ghost: { background: 'transparent', text: colors.foreground },
};

const buttonMetrics: Record<ButtonSize, { height: number; padding: number; textSize: 'xs' | 'sm' | 'md' }> = {
  sm: { height: 36, padding: 14, textSize: 'xs' },
  md: { height: 44, padding: 18, textSize: 'sm' },
  lg: { height: 52, padding: 22, textSize: 'md' },
};

export function FIButton({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const currentVariant = variantStyles[variant];
  const metrics = buttonMetrics[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: scaleHeight(metrics.height),
          paddingHorizontal: scaleWidth(metrics.padding),
          backgroundColor: currentVariant.background,
          ...(variant === 'outline' && {
            borderWidth: 1,
            borderColor: currentVariant.border,
          }),
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={currentVariant.text} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <FIText
            variant={metrics.textSize}
            weight="semibold"
            color={currentVariant.text}
          >
            {children}
          </FIText>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleWidth(10),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scaleWidth(4),
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});