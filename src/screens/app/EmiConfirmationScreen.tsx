import React, {useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';
import {IconifyIcon} from '@huymobile/react-native-iconify';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import {FIText} from '../../components/FIText';
import {FIButton} from '../../components/FIButton';
import {colors} from '../../theme/colors';

const formatIndianNumber = (value: string | number) => {
  const stringValue = String(value || '');

  if (!stringValue) {
    return '';
  }

  const numberValue = Number(stringValue.replace(/,/g, ''));

  if (Number.isNaN(numberValue)) {
    return '';
  }

  return numberValue.toLocaleString('en-IN');
};

const calculateTotalPayable = (
  emi: number,
  months: number,
) => {
  return emi * months;
};

const EmiConfirmationScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const product = route?.params?.product || {};
  const amount = route?.params?.amount || 0;
  const emiPlan = route?.params?.emiPlan || null;

  const backButtonScale = useRef(new Animated.Value(1)).current;

  const productName =
    product?.title || product?.name || 'Air India';

  const productImage = product?.images?.[0];

  const totalPayable = useMemo(() => {
    if (!emiPlan?.emi || !emiPlan?.months) {
      return 0;
    }

    return calculateTotalPayable(
      emiPlan.emi,
      emiPlan.months,
    );
  }, [emiPlan]);

  const totalInterest = useMemo(() => {
    if (!totalPayable || !amount) {
      return 0;
    }

    return Math.max(totalPayable - amount, 0);
  }, [totalPayable, amount]);

  const handleBackPress = () => {
    Animated.sequence([
      Animated.timing(backButtonScale, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),

      Animated.timing(backButtonScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleConfirm = () => {
    if (!emiPlan) {
      return;
    }

    // Continue to your payment / checkout flow.
    navigation.navigate('PaymentScreen', {
      product,
      amount,
      emiPlan,
    });
  };

  if (!emiPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <IconifyIcon
            name="feather:alert-circle"
            size={40}
            color={colors.primary}
          />

          <FIText
            variant="lg"
            weight="bold"
            color={colors.foreground}
            align="center"
            style={styles.errorTitle}>
            EMI plan not found
          </FIText>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            align="center"
            style={styles.errorText}>
            Please go back and select an EMI plan to continue.
          </FIText>

          <FIButton
            variant="primary"
            size="lg"
            onPress={() => navigation.goBack()}
            style={styles.errorButton}>
            Go Back
          </FIButton>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={1}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            onPress={handleBackPress}>

            <Animated.View
              style={{
                transform: [{scale: backButtonScale}],
              }}>

              <IconifyIcon
                name="feather:chevron-left"
                size={24}
                color={colors.foreground}
              />
            </Animated.View>
          </TouchableOpacity>

          <FIText
            variant="lg"
            weight="bold"
            color={colors.foreground}>
            Confirm EMI
          </FIText>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <View style={styles.successIcon}>
            <IconifyIcon
              name="feather:check"
              size={22}
              color={colors.primary}
            />
          </View>

          <FIText
            variant="heading"
            weight="bold"
            color={colors.foreground}
            align="center"
            style={styles.title}>
            Your EMI plan is ready
          </FIText>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            align="center"
            style={styles.subtitle}>
            Review your selected plan before continuing.
          </FIText>
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <View style={styles.productRow}>
            {productImage ? (
              <Image
                source={{uri: productImage}}
                style={styles.productImage}
              />
            ) : (
              <View style={styles.productPlaceholder}>
                <FIText
                  variant="xs"
                  weight="bold"
                  color={colors.white}>
                  {productName.substring(0, 3).toUpperCase()}
                </FIText>
              </View>
            )}

            <View style={styles.productInfo}>
              <FIText
                variant="lg"
                weight="bold"
                color={colors.foreground}
                numberOfLines={1}>
                {productName}
              </FIText>

              <FIText
                variant="sm"
                color={colors.mutedForeground}
                style={styles.productType}>
                Gift voucher
              </FIText>
            </View>
          </View>
        </View>

        {/* Main EMI Card */}
        <View style={styles.emiCard}>
          <View style={styles.emiCardHeader}>
            <View>
              <FIText
                variant="sm"
                color={colors.mutedForeground}>
                Monthly EMI
              </FIText>

              <FIText
                variant="heading"
                weight="bold"
                color={colors.foreground}
                style={styles.monthlyAmount}>
                ₹{formatIndianNumber(emiPlan.emi)}
                <FIText
                  variant="sm"
                  weight="regular"
                  color={colors.mutedForeground}>
                  {' '}
                  / month
                </FIText>
              </FIText>
            </View>

            <View style={styles.selectedBadge}>
              <IconifyIcon
                name="feather:check"
                size={13}
                color={colors.primary}
              />

              <FIText
                variant="xs"
                weight="semibold"
                color={colors.primary}>
                Selected
              </FIText>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* EMI Details */}
          <View style={styles.detailRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              Purchase amount
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              ₹{formatIndianNumber(amount)}
            </FIText>
          </View>

          <View style={styles.detailRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              EMI tenure
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              {emiPlan.months} months
            </FIText>
          </View>

          <View style={styles.detailRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              Interest rate
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              {emiPlan.interestRate}% p.a.
            </FIText>
          </View>

          <View style={styles.detailRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              Total interest
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              ₹{formatIndianNumber(totalInterest)}
            </FIText>
          </View>

          <View style={styles.cardDivider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              Total payable
            </FIText>

            <FIText
              variant="lg"
              weight="bold"
              color={colors.foreground}>
              ₹{formatIndianNumber(totalPayable)}
            </FIText>
          </View>
        </View>

        {/* Payment Timeline */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <View style={styles.timelineIcon}>
              <IconifyIcon
                name="feather:calendar"
                size={18}
                color={colors.primary}
              />
            </View>

            <View style={styles.timelineTitleContainer}>
              <FIText
                variant="sm"
                weight="bold"
                color={colors.foreground}>
                EMI schedule
              </FIText>

              <FIText
                variant="xs"
                color={colors.mutedForeground}>
                {emiPlan.months} monthly payments
              </FIText>
            </View>
          </View>

          <View style={styles.scheduleRow}>
            <View style={styles.scheduleDot} />

            <View style={styles.scheduleInfo}>
              <FIText
                variant="sm"
                weight="semibold"
                color={colors.foreground}>
                First EMI
              </FIText>

              <FIText
                variant="xs"
                color={colors.mutedForeground}>
                ₹{formatIndianNumber(emiPlan.emi)}
              </FIText>
            </View>

            <IconifyIcon
              name="feather:arrow-right"
              size={16}
              color={colors.mutedForeground}
            />

            <View style={styles.scheduleInfo}>
              <FIText
                variant="sm"
                weight="semibold"
                color={colors.foreground}>
                Final EMI
              </FIText>

              <FIText
                variant="xs"
                color={colors.mutedForeground}>
                After {emiPlan.months} months
              </FIText>
            </View>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <IconifyIcon
            name="feather:info"
            size={18}
            color={colors.primary}
          />

          <FIText
            variant="xs"
            color={colors.mutedForeground}
            style={styles.infoText}>
            Your selected EMI plan will be used for this purchase.
            You can review the final payment details before completing
            the transaction.
          </FIText>
        </View>

        {/* CTA */}
        <View style={styles.bottomAction}>
          <FIButton
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={
              <IconifyIcon
                name="feather:arrow-right"
                size={18}
                color={colors.white}
              />
            }
            onPress={handleConfirm}
            style={styles.confirmButton}>
            Proceed with EMI
          </FIButton>

          <FIText
            variant="xs"
            color={colors.mutedForeground}
            align="center"
            style={styles.secureText}>
            Secure checkout powered by 1Fi
          </FIText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(40),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
  },

  backButton: {
    marginRight: scaleWidth(16),
  },

  titleSection: {
    alignItems: 'center',
    marginTop: scaleHeight(18),
    marginBottom: scaleHeight(22),
  },

  successIcon: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleWidth(24),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(12),
  },

  title: {
    marginBottom: scaleHeight(5),
  },

  subtitle: {
    paddingHorizontal: scaleWidth(20),
    lineHeight: scaleHeight(20),
  },

  productCard: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scaleWidth(16),
    marginBottom: scaleHeight(14),
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productImage: {
    width: scaleWidth(52),
    height: scaleWidth(52),
    borderRadius: scaleWidth(12),
    backgroundColor: '#f5f5f5',
  },

  productPlaceholder: {
    width: scaleWidth(52),
    height: scaleWidth(52),
    borderRadius: scaleWidth(12),
    backgroundColor: '#E30613',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productInfo: {
    flex: 1,
    marginLeft: scaleWidth(14),
  },

  productType: {
    marginTop: scaleHeight(3),
  },

  emiCard: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(24),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scaleWidth(20),
  },

  emiCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  monthlyAmount: {
    marginTop: scaleHeight(3),
  },

  selectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(5),
    backgroundColor: colors.primaryLight,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleWidth(20),
  },

  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: scaleHeight(18),
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(14),
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timelineCard: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(20),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scaleWidth(18),
    marginTop: scaleHeight(14),
  },

  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timelineIcon: {
    width: scaleWidth(38),
    height: scaleWidth(38),
    borderRadius: scaleWidth(19),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(10),
  },

  timelineTitleContainer: {
    flex: 1,
  },

  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(18),
    paddingTop: scaleHeight(16),
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  scheduleDot: {
    width: scaleWidth(10),
    height: scaleWidth(10),
    borderRadius: scaleWidth(5),
    backgroundColor: colors.primary,
    marginRight: scaleWidth(8),
  },

  scheduleInfo: {
    flex: 1,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: scaleWidth(16),
    padding: scaleWidth(14),
    marginTop: scaleHeight(14),
  },

  infoText: {
    flex: 1,
    marginLeft: scaleWidth(10),
    lineHeight: scaleHeight(18),
  },

  bottomAction: {
    marginTop: scaleHeight(22),
  },

  confirmButton: {
    borderRadius: scaleWidth(24),
  },

  secureText: {
    marginTop: scaleHeight(10),
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(30),
  },

  errorTitle: {
    marginTop: scaleHeight(14),
  },

  errorText: {
    marginTop: scaleHeight(8),
    lineHeight: scaleHeight(20),
  },

  errorButton: {
    marginTop: scaleHeight(24),
    minWidth: scaleWidth(150),
  },
});

export default EmiConfirmationScreen;