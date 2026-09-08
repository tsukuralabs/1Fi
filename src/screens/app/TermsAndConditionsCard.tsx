import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';

import {IconifyIcon} from '@huymobile/react-native-iconify';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import {FIText} from '../../components/FIText';
import {colors} from '../../theme/colors';

const TermsAndConditionsCard = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = ['60%', '70%'];

  const handleOpenPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleClosePress = () => {
    bottomSheetRef.current?.dismiss();
  };

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
    <>
      <View style={styles.instructionCard}>
        <FIText
          variant="lg"
          weight="bold"
          color={colors.foreground}
          style={styles.instructionTitle}>
          Terms and Conditions
        </FIText>

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

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleOpenPress}
          style={styles.viewAllRow}>
          <FIText weight="bold" color={colors.primary}>
            View All
          </FIText>

          <IconifyIcon
            name="feather:chevron-right"
            size={18}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}>
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bottomSheetContent}>
          <View style={styles.sheetHeader}>
            <FIText
              variant="lg"
              weight="bold"
              color={colors.foreground}>
              Terms and Conditions
            </FIText>
          </View>

          <View style={styles.sheetStepRow}>
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
              style={styles.sheetStepText}>
              Comes with 1-year validity and is valid only on the website or
              mobile app.
            </FIText>
          </View>

          <View style={styles.sheetStepRow}>
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
              style={styles.sheetStepText}>
              Multiple Gift Cards (up to a maximum of three (3)) can be
              combined and used in a single transaction.
            </FIText>
          </View>

          <View style={styles.sheetStepRow}>
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
              style={styles.sheetStepText}>
              A Gift Card can be combined with any offer, such as a discount,
              cash back, or promotion, offered on website.
            </FIText>
          </View>

          <View style={styles.sheetStepRow}>
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
              style={styles.sheetStepText}>
              Gift cards cannot be refunded, exchanged for cash, or transferred
              to another account once purchased.
            </FIText>
          </View>

          <View style={styles.sheetStepRow}>
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
              style={styles.sheetStepText}>
              1Fi is not responsible if a gift card is lost, stolen, destroyed,
              or used without permission.
            </FIText>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClosePress}
            style={styles.gotItButton}>
            <FIText weight="bold" color={colors.white}>
              Got it
            </FIText>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  instructionCard: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(20),
    padding: scaleWidth(20),
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: scaleHeight(10),
  },

  instructionTitle: {
    marginBottom: scaleHeight(16),
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

  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: scaleHeight(14),
    marginTop: scaleHeight(4),
  },

  bottomSheetBackground: {
    backgroundColor: colors.white,
    borderTopLeftRadius: scaleWidth(24),
    borderTopRightRadius: scaleWidth(24),
  },

  bottomSheetIndicator: {
    backgroundColor: colors.border,
    width: scaleWidth(40),
  },

  bottomSheetContent: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(8),
    paddingBottom: scaleHeight(40),
  },

  sheetHeader: {
    paddingBottom: scaleHeight(16),
    marginBottom: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  sheetStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(18),
  },

  sheetStepText: {
    flex: 1,
    lineHeight: scaleHeight(21),
  },

  gotItButton: {
    backgroundColor: colors.primary,
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(12),
  },
});

export default TermsAndConditionsCard;




