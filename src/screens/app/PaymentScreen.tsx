import React, {useMemo, useRef, useState} from 'react';
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

type PaymentMethod = 'upi' | 'card' | 'netbanking';

const PAYMENT_METHODS = [
  {
    id: 'upi' as PaymentMethod,
    title: 'UPI',
    subtitle: 'Pay using any UPI app',
    icon: 'feather:smartphone',
  },
  {
    id: 'card' as PaymentMethod,
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, RuPay',
    icon: 'feather:credit-card',
  },
  {
    id: 'netbanking' as PaymentMethod,
    title: 'Net Banking',
    subtitle: 'Pay directly from your bank',
    icon: 'feather:globe',
  },
];

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

const PaymentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const product = route?.params?.product || {};
  const amount = route?.params?.amount || 0;
  const emiPlan = route?.params?.emiPlan || null;

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>('upi');

  const backButtonScale = useRef(new Animated.Value(1)).current;

  /**
   * Product name
   */
  const productName =
    product?.title ||
    product?.name ||
    product?.productName ||
    'Product';

  /**
   * Product image
   */
  const productImage = useMemo(() => {
    if (typeof product?.image === 'string' && product.image.trim()) {
      return product.image;
    }

    if (
      typeof product?.imageUrl === 'string' &&
      product.imageUrl.trim()
    ) {
      return product.imageUrl;
    }

    if (
      typeof product?.thumbnail === 'string' &&
      product.thumbnail.trim()
    ) {
      return product.thumbnail;
    }

    if (Array.isArray(product?.images)) {
      const firstImage = product.images[0];

      if (typeof firstImage === 'string' && firstImage.trim()) {
        return firstImage;
      }

      if (
        firstImage &&
        typeof firstImage === 'object' &&
        typeof firstImage.url === 'string'
      ) {
        return firstImage.url;
      }
    }

    return null;
  }, [product]);

  /**
   * Calculate total payable amount
   */
  const totalPayable = useMemo(() => {
    if (!emiPlan?.emi || !emiPlan?.months) {
      return amount;
    }

    return Number(emiPlan.emi) * Number(emiPlan.months);
  }, [emiPlan, amount]);

  /**
   * Calculate total interest
   */
  const totalInterest = useMemo(() => {
    return Math.max(Number(totalPayable) - Number(amount), 0);
  }, [totalPayable, amount]);

  /**
   * Back button animation
   */
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

  /**
   * Payment method selection
   */
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handlePayNow = () => {
    if (!selectedMethod) {
      return;
    }

    navigation.navigate('PaymentSuccess', {
      product,
      amount,
      emiPlan,
      paymentMethod: selectedMethod,
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
            Payment details not found
          </FIText>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            align="center"
            style={styles.errorText}>
            Please go back and select an EMI plan before
            continuing.
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
        bounces={false}
        keyboardShouldPersistTaps="handled">
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
            Payment
          </FIText>
        </View>

        {/* Page Heading */}
        <View style={styles.headingSection}>
          <FIText
            variant="heading"
            weight="bold"
            color={colors.foreground}>
            Complete your payment
          </FIText>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            style={styles.headingSubtitle}>
            Choose your preferred payment method.
          </FIText>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          {/* Summary Header */}
          <View style={styles.summaryHeader}>
            <FIText
              variant="sm"
              weight="bold"
              color={colors.foreground}>
              Order summary
            </FIText>

            <View style={styles.secureBadge}>
              <IconifyIcon
                name="feather:lock"
                size={12}
                color={colors.primary}
              />

              <FIText
                variant="xs"
                weight="semibold"
                color={colors.primary}>
                Secure
              </FIText>
            </View>
          </View>

          {/* Product */}
          <View style={styles.productSummaryRow}>
            <View style={styles.productIcon}>
              {productImage ? (
                <Image
                  source={{
                    uri: productImage,
                  }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              ) : (
                <FIText
                  variant="xs"
                  weight="bold"
                  color={colors.white}
                  align="center">
                  {productName
                    .substring(0, 3)
                    .toUpperCase()}
                </FIText>
              )}
            </View>

            <View style={styles.productSummaryInfo}>
              <FIText
                variant="sm"
                weight="semibold"
                color={colors.foreground}
                numberOfLines={1}>
                {productName}
              </FIText>

              <FIText
                variant="xs"
                color={colors.mutedForeground}>
                Gift voucher
              </FIText>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.summaryDivider} />

          {/* Purchase Amount */}
          <View style={styles.summaryRow}>
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

          {/* EMI Plan */}
          <View style={styles.summaryRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              EMI plan
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              {emiPlan.months} months
            </FIText>
          </View>

          {/* Monthly EMI */}
          <View style={styles.summaryRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              Monthly EMI
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              ₹{formatIndianNumber(emiPlan.emi)}
            </FIText>
          </View>

          {/* Interest */}
          <View style={styles.summaryRow}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}>
              Interest
            </FIText>

            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              ₹{formatIndianNumber(totalInterest)}
            </FIText>
          </View>

          {/* Divider */}
          <View style={styles.summaryDivider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <FIText
              variant="sm"
              weight="bold"
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

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <FIText
            variant="lg"
            weight="bold"
            color={colors.foreground}
            style={styles.sectionTitle}>
            Choose payment method
          </FIText>

          <View style={styles.paymentMethods}>
            {PAYMENT_METHODS.map(method => {
              const isSelected = selectedMethod === method.id;

              return (
                <TouchableOpacity
                  key={method.id}
                  activeOpacity={0.75}
                  onPress={() => handlePaymentMethodSelect(method.id)}
                  style={[
                    styles.paymentMethod,
                    isSelected && styles.paymentMethodSelected,
                  ]}>
                  {/* Icon */}
                  <View
                    style={[
                      styles.methodIcon,
                      isSelected && styles.methodIconSelected,
                    ]}>
                    <IconifyIcon
                      name={method.icon}
                      size={20}
                      color={
                        isSelected
                          ? colors.primary
                          : colors.mutedForeground
                      }
                    />
                  </View>

                  {/* Content */}
                  <View style={styles.methodContent}>
                    <FIText
                      variant="sm"
                      weight={isSelected ? 'bold' : 'semibold'}
                      color={colors.foreground}>
                      {method.title}
                    </FIText>

                    <FIText
                      variant="xs"
                      color={colors.mutedForeground}
                      style={styles.methodSubtitle}>
                      {method.subtitle}
                    </FIText>
                  </View>

                  {/* Radio */}
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelected,
                    ]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* EMI Reminder */}
        <View style={styles.emiReminder}>
          <View style={styles.reminderIcon}>
            <IconifyIcon
              name="feather:calendar"
              size={17}
              color={colors.primary}
            />
          </View>

          <View style={styles.reminderContent}>
            <FIText
              variant="sm"
              weight="semibold"
              color={colors.foreground}>
              Your EMI
            </FIText>

            <FIText
              variant="xs"
              color={colors.mutedForeground}
              style={styles.reminderText}>
              ₹{formatIndianNumber(emiPlan.emi)} every
              month for {emiPlan.months} months.
            </FIText>
          </View>
        </View>

        {/* Security Information */}
        <View style={styles.securityBox}>
          <IconifyIcon
            name="feather:shield"
            size={18}
            color={colors.primary}
          />

          <FIText
            variant="xs"
            color={colors.mutedForeground}
            style={styles.securityText}>
            Your payment information is encrypted and
            securely processed. We never store your
            complete card or banking credentials.
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
                name="feather:lock"
                size={17}
                color={colors.white}
              />
            }
            onPress={handlePayNow}
            style={styles.payButton}>
            {`Pay ₹${formatIndianNumber(totalPayable)}`}
          </FIButton>

          <FIText
            variant="xs"
            color={colors.mutedForeground}
            align="center"
            style={styles.footerText}>
            By continuing, you agree to the applicable
            payment terms and conditions.
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

  headingSection: {
    marginTop: scaleHeight(18),
    marginBottom: scaleHeight(20),
  },

  headingSubtitle: {
    marginTop: scaleHeight(5),
  },

  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(22),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scaleWidth(18),
  },

  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(5),
    backgroundColor: colors.primaryLight,
    paddingHorizontal: scaleWidth(9),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(20),
  },

  productSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(16),
  },

  productIcon: {
    width: scaleWidth(56),
    height: scaleWidth(56),
    borderRadius: scaleWidth(14),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  productSummaryInfo: {
    flex: 1,
    marginLeft: scaleWidth(12),
  },

  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: scaleHeight(16),
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(12),
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentSection: {
    marginTop: scaleHeight(24),
  },

  sectionTitle: {
    marginBottom: scaleHeight(12),
  },

  paymentMethods: {
    gap: scaleHeight(10),
  },

  paymentMethod: {
    minHeight: scaleHeight(72),
    backgroundColor: colors.white,
    borderRadius: scaleWidth(18),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: scaleWidth(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentMethodSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },

  methodIcon: {
    width: scaleWidth(42),
    height: scaleWidth(42),
    borderRadius: scaleWidth(12),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  methodIconSelected: {
    backgroundColor: colors.white,
  },

  methodContent: {
    flex: 1,
    marginLeft: scaleWidth(12),
  },

  methodSubtitle: {
    marginTop: scaleHeight(3),
  },

  radioOuter: {
    width: scaleWidth(22),
    height: scaleWidth(22),
    borderRadius: scaleWidth(11),
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: colors.primary,
  },

  radioInner: {
    width: scaleWidth(10),
    height: scaleWidth(10),
    borderRadius: scaleWidth(5),
    backgroundColor: colors.primary,
  },

  emiReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scaleWidth(18),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scaleWidth(14),
    marginTop: scaleHeight(14),
  },

  reminderIcon: {
    width: scaleWidth(38),
    height: scaleWidth(38),
    borderRadius: scaleWidth(19),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reminderContent: {
    flex: 1,
    marginLeft: scaleWidth(10),
  },

  reminderText: {
    marginTop: scaleHeight(3),
  },

  securityBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: scaleWidth(16),
    padding: scaleWidth(14),
    marginTop: scaleHeight(14),
  },

  securityText: {
    flex: 1,
    marginLeft: scaleWidth(10),
    lineHeight: scaleHeight(18),
  },

  bottomAction: {
    marginTop: scaleHeight(24),
  },

  payButton: {
    borderRadius: scaleWidth(24),
  },

  footerText: {
    lineHeight: scaleHeight(18),
    marginTop: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
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

export default PaymentScreen;