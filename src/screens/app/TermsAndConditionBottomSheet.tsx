import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';
import {IconifyIcon} from '@huymobile/react-native-iconify';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import {FIText} from '../../components/FIText';
import {colors} from '../../theme/colors';

type Props = {
  onClose?: () => void;
};

const TermsAndConditionsBottomSheet = ({onClose}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['35%', '50%'];

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose?.();
  }, [onClose]);

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.bottomSheetContentContainer}>
        <View style={styles.sheetHeader}>
          <FIText variant="lg" weight="bold" color={colors.foreground}>
            All Terms and Conditions
          </FIText>

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{
              top: 12,
              bottom: 12,
              left: 12,
              right: 12,
            }}
            onPress={handleClose}>
            <IconifyIcon
              name="feather:x"
              size={20}
              color={colors.foreground}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <IconifyIcon
              name="feather:check"
              size={14}
              color={colors.primary}
            />
          </View>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            style={styles.stepText}>
            Comes with 1-year validity and is valid only on the website or
            mobile app.
          </FIText>
        </View>

        <View style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <IconifyIcon
              name="feather:check"
              size={14}
              color={colors.primary}
            />
          </View>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            style={styles.stepText}>
            Multiple Gift Cards (up to a maximum of three (3)) can be combined
            and used in a single transaction.
          </FIText>
        </View>

        <View style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <IconifyIcon
              name="feather:check"
              size={14}
              color={colors.primary}
            />
          </View>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            style={styles.stepText}>
            A Gift Card can be combined with any offer, such as a discount,
            cash back, or promotion, offered on website.
          </FIText>
        </View>

        <View style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <IconifyIcon
              name="feather:check"
              size={14}
              color={colors.primary}
            />
          </View>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            style={styles.stepText}>
            Gift cards cannot be refunded, exchanged for cash, or transferred
            to another account once purchased.
          </FIText>
        </View>

        <View style={styles.stepRow}>
          <View style={styles.stepBadge}>
            <IconifyIcon
              name="feather:check"
              size={14}
              color={colors.primary}
            />
          </View>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            style={styles.stepText}>
            1Fi is not responsible if a gift card is lost, stolen, destroyed,
            or used without permission.
          </FIText>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(24),
  },

  bottomSheetIndicator: {
    backgroundColor: colors.border,
    width: scaleWidth(40),
  },

  bottomSheetContentContainer: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(40),
  },

  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(20),
    paddingBottom: scaleHeight(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(16),
  },

  stepBadge: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(12),
    marginTop: scaleHeight(2),
  },

  stepText: {
    flex: 1,
    lineHeight: scaleHeight(20),
  },
});

export default TermsAndConditionsBottomSheet;