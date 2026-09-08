import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Keyboard,
} from 'react-native';
import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';
import { IconifyIcon } from '@huymobile/react-native-iconify';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FIText } from '../../components/FIText';
import { FIButton } from '../../components/FIButton';
import { colors } from '../../theme/colors';
import TermsAndConditionsCard from './TermsAndConditionsCard';

const EMI_PLANS = [
  {
    months: 3,
    interestRate: 0,
  },
  {
    months: 6,
    interestRate: 0,
  },
  {
    months: 9,
    interestRate: 0,
  },
  {
    months: 12,
    interestRate: 0,
  },
  {
    months: 18,
    interestRate: 0,
  },
  {
    months: 24,
    interestRate: 4.49,
  },
  {
    months: 36,
    interestRate: 6.49,
  },
  {
    months: 48,
    interestRate: 7.49,
  },
  {
    months: 60,
    interestRate: 7.99,
  },
];

const calculateEMI = (
  principal: number,
  months: number,
  annualInterestRate: number,
) => {
  if (!principal || principal <= 0) {
    return 0;
  }

  if (annualInterestRate === 0) {
    return Math.ceil(principal / months);
  }

  const monthlyRate = annualInterestRate / 12 / 100;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.ceil(emi);
};

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

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const product = route?.params?.product || {};

  const [amount, setAmount] = useState('');
  const [showPlans, setShowPlans] = useState(true);
  const [selectedPlanMonths, setSelectedPlanMonths] = useState<number | null>(
    null,
  );

  const backButtonScale = useRef(new Animated.Value(1)).current;

  const productName = product?.title || product?.name || 'Air India';
  const productImage = product?.images?.[0];

  const numericAmount = useMemo(() => {
    const value = Number(amount.replace(/,/g, ''));

    if (Number.isNaN(value)) {
      return 0;
    }

    return value;
  }, [amount]);

  const calculatedPlans = useMemo(() => {
    return EMI_PLANS.map(plan => ({
      ...plan,
      emi: numericAmount
        ? calculateEMI(numericAmount, plan.months, plan.interestRate)
        : 0,
    }));
  }, [numericAmount]);

  const startingEMI = useMemo(() => {
    if (!numericAmount) {
      return 0;
    }

    const validEMIs = calculatedPlans
      .map(plan => plan.emi)
      .filter(value => value > 0);

    if (!validEMIs.length) {
      return 0;
    }

    return Math.min(...validEMIs);
  }, [calculatedPlans, numericAmount]);

  const selectedPlan = useMemo(() => {
    if (!selectedPlanMonths) {
      return null;
    }

    return calculatedPlans.find(plan => plan.months === selectedPlanMonths);
  }, [calculatedPlans, selectedPlanMonths]);

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

  const handleAmountChange = (text: string) => {
    let numericText = text.replace(/\D/g, '');

    if (!numericText) {
      setAmount('');
      setSelectedPlanMonths(null);
      return;
    }

    numericText = numericText.replace(/^0+(?=\d)/, '');

    let numericValue = Number(numericText);

    if (numericValue > 200000) {
      numericValue = 200000;
      numericText = '200000';
    }

    setAmount(formatIndianNumber(numericText));
    setSelectedPlanMonths(null);
  };

  const handlePlanSelect = (months: number) => {
    Keyboard.dismiss();
    setSelectedPlanMonths(months);
  };

  const handleTogglePlans = () => {
    Keyboard.dismiss();
    setShowPlans(previousValue => !previousValue);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      return;
    }

    Keyboard.dismiss();

    navigation.navigate('EmiConfirmation', {
      product,
      amount: numericAmount,
      emiPlan: {
        months: selectedPlan.months,
        interestRate: selectedPlan.interestRate,
        emi: selectedPlan.emi,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress}
            activeOpacity={0.7}
            hitSlop={{
              top: 15,
              bottom: 15,
              left: 15,
              right: 15,
            }}
            style={styles.backButton}
          >
            <Animated.View
              pointerEvents="none"
              style={{
                transform: [
                  {
                    scale: backButtonScale,
                  },
                ],
              }}
            >
              <IconifyIcon
                name="feather:chevron-left"
                size={24}
                color={colors.foreground}
              />
            </Animated.View>
          </TouchableOpacity>

          <FIText variant="lg" weight="bold" color={colors.foreground}>
            Pay using 1Fi
          </FIText>
        </View>

        <View style={styles.brandContainer}>
          <View style={styles.brandRow}>
            {productImage ? (
              <Image source={{ uri: productImage }} style={styles.logoImage} />
            ) : (
              <View style={styles.logoBox}>
                <FIText
                  variant="xs"
                  weight="bold"
                  color={colors.white}
                  align="center"
                >
                  {productName.substring(0, 3).toUpperCase()}
                </FIText>
              </View>
            )}

            <View style={styles.brandDetails}>
              <FIText
                variant="xl"
                weight="bold"
                color={colors.foreground}
                numberOfLines={1}
              >
                {productName}
              </FIText>

              <View style={styles.badgeRow}>
                <View style={styles.tagWrapper}>
                  <IconifyIcon
                    name="feather:tag"
                    size={12}
                    color={colors.mutedForeground}
                  />

                  <FIText
                    variant="xs"
                    color={colors.mutedForeground}
                    style={styles.tagText}
                  >
                    Gift voucher
                  </FIText>
                </View>

                <View style={styles.onlineBadge}>
                  <FIText
                    variant="xs"
                    weight="semibold"
                    color={colors.primaryDark}
                  >
                    Online
                  </FIText>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            style={styles.shareIconButton}
          >
            <IconifyIcon
              name="feather:share-2"
              size={18}
              color={colors.primaryDark}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.centerSection}>
          <FIText
            variant="heading"
            weight="bold"
            color={colors.foreground}
            align="center"
          >
            Gift voucher
          </FIText>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            align="center"
            style={styles.subTitle}
          >
            Up to 60 months OEMs
          </FIText>

          <FIText
            variant="xs"
            color={colors.mutedForeground}
            align="center"
            style={styles.limitText}
          >
            Enter the purchase amount · ₹2,000 – ₹2,00,000
          </FIText>

          <View style={styles.amountDisplayContainer}>
            <FIText
              variant="heading"
              weight="bold"
              color={colors.mutedForeground}
              style={styles.currencyPrefix}
            >
              ₹
            </FIText>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={colors.transparent}
              keyboardType="number-pad"
              value={amount}
              onChangeText={handleAmountChange}
              selectionColor={colors.foreground}
              cursorColor={colors.foreground}
              maxLength={7}
              textAlign="left"
              multiline={false}
              numberOfLines={1}
            />
          </View>
        </View>

        {numericAmount > 0 && (
          <View style={styles.plansCard}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleTogglePlans}
              style={styles.plansHeader}
            >
              <View style={styles.startsAtContainer}>
                <FIText
                  variant="lg"
                  weight="semibold"
                  color={colors.mutedForeground}
                >
                  Starts at{' '}
                </FIText>

                <FIText variant="lg" weight="bold" color={colors.foreground}>
                  ₹{formatIndianNumber(startingEMI)}/mo
                </FIText>
              </View>

              <View style={styles.planToggle}>
                <FIText variant="lg" weight="bold" color={colors.primary}>
                  {showPlans ? 'Hide plans' : 'Show plans'}
                </FIText>

                <IconifyIcon
                  name={
                    showPlans ? 'feather:chevron-up' : 'feather:chevron-down'
                  }
                  size={22}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>

            {showPlans && (
              <View style={styles.planList}>
                {calculatedPlans.map(plan => {
                  const isSelected = selectedPlanMonths === plan.months;

                  return (
                    <TouchableOpacity
                      key={`${plan.months}-${plan.interestRate}`}
                      activeOpacity={0.65}
                      onPress={() => handlePlanSelect(plan.months)}
                      style={[
                        styles.planRow,
                        isSelected && styles.selectedPlanRow,
                      ]}
                    >
                      <View
                        pointerEvents="none"
                        style={[
                          styles.radioOuter,
                          isSelected && styles.radioOuterSelected,
                        ]}
                      >
                        {isSelected && <View style={styles.radioInner} />}
                      </View>

                      <View pointerEvents="none" style={styles.planDetails}>
                        <FIText
                          color={
                            isSelected
                              ? colors.foreground
                              : colors.mutedForeground
                          }
                          weight={isSelected ? 'semibold' : 'regular'}
                        >
                          {plan.months} months
                        </FIText>

                        <FIText
                          variant="xs"
                          color={colors.mutedForeground}
                          style={styles.interestText}
                        >
                          {plan.interestRate}% p.a.
                        </FIText>
                      </View>

                      <View pointerEvents="none" style={styles.planAmount}>
                        <FIText weight="bold" color={colors.foreground}>
                          ₹{formatIndianNumber(plan.emi)}
                        </FIText>

                        <FIText variant="sm" color={colors.mutedForeground}>
                          {' '}
                          /mo
                        </FIText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}

        {selectedPlan && (
          <View style={styles.selectedPlanSummary}>
            <View style={styles.selectedPlanIcon}>
              <IconifyIcon
                name="feather:check"
                size={16}
                color={colors.primary}
              />
            </View>

            <View style={styles.selectedPlanInfo}>
              <FIText variant="xs" color={colors.mutedForeground}>
                Selected EMI plan
              </FIText>

              <FIText variant="sm" weight="bold" color={colors.foreground}>
                {selectedPlan.months} months · ₹
                {formatIndianNumber(selectedPlan.emi)}/mo
              </FIText>
            </View>
          </View>
        )}

        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            style={styles.outlineIconBtn}
          >
            <IconifyIcon
              name="feather:share-2"
              size={20}
              color={colors.primaryDark}
            />
          </TouchableOpacity>

          <View style={styles.continueBtnWrapper}>
            <FIButton
              variant="primary"
              size="lg"
              fullWidth
              disabled={!selectedPlan}
              rightIcon={
                <IconifyIcon
                  name="feather:arrow-right"
                  size={18}
                  color={colors.white}
                />
              }
              onPress={handleContinue}
              style={[
                styles.continueBtn,
                !selectedPlan && styles.continueBtnDisabled,
              ]}
            >
              {selectedPlan ? 'Continue with EMI' : 'Select an EMI plan'}
            </FIButton>
          </View>
        </View>

        <View style={styles.instructionCard}>
          <FIText
            variant="lg"
            weight="bold"
            color={colors.foreground}
            style={styles.instructionTitle}
          >
            How to use
          </FIText>

          <View style={styles.stepRow}>
            <View style={styles.stepBadgeNum}>
              <FIText variant="xs" weight="bold" color={colors.primary}>
                1
              </FIText>
            </View>

            <FIText
              variant="sm"
              color={colors.mutedForeground}
              style={styles.stepText}
            >
              Select the products or services you are interested in on the
              merchant website or mobile app.
            </FIText>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepBadgeNum}>
              <FIText variant="xs" weight="bold" color={colors.primary}>
                2
              </FIText>
            </View>

            <FIText
              variant="sm"
              color={colors.mutedForeground}
              style={styles.stepText}
            >
              Enter the Gift Card number and pin that you have received.
            </FIText>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepBadgeNum}>
              <FIText variant="xs" weight="bold" color={colors.primary}>
                3
              </FIText>
            </View>

            <FIText
              variant="sm"
              color={colors.mutedForeground}
              style={styles.stepText}
            >
              If the booking amount equals or exceeds the available credit on
              the Gift Card, the Gift Card will be fully used.
            </FIText>
          </View>
        </View>

        <TermsAndConditionsCard />
      </ScrollView>

      {/* <TermsAndConditionsBottomSheet /> */}
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
    width: scaleWidth(40),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(8),
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleHeight(12),
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scaleWidth(12),
  },

  logoBox: {
    width: scaleWidth(56),
    height: scaleWidth(56),
    backgroundColor: '#E30613',
    borderRadius: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleWidth(4),
  },

  logoImage: {
    width: scaleWidth(56),
    height: scaleWidth(56),
    borderRadius: scaleWidth(12),
    backgroundColor: '#f5f5f5',
  },

  brandDetails: {
    marginLeft: scaleWidth(14),
    flex: 1,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(4),
  },

  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scaleWidth(8),
  },

  tagText: {
    marginLeft: scaleWidth(4),
  },

  onlineBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(12),
  },

  shareIconButton: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: scaleHeight(20),
  },

  centerSection: {
    alignItems: 'center',
    marginVertical: scaleHeight(10),
  },

  subTitle: {
    marginTop: scaleHeight(4),
  },

  limitText: {
    marginTop: scaleHeight(16),
  },

  amountDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(12),
  },

  currencyPrefix: {
    fontSize: scaleWidth(42),
    lineHeight: scaleWidth(50),
    marginRight: scaleWidth(6),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  amountInput: {
    fontSize: scaleWidth(42),
    lineHeight: scaleWidth(50),
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'left',
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    height: scaleWidth(50),
    backgroundColor: 'transparent',
  },

  plansCard: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(24),
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginTop: scaleHeight(18),
  },

  plansHeader: {
    minHeight: scaleHeight(64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(18),
    backgroundColor: colors.background,
  },

  startsAtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scaleWidth(8),
  },

  planToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: scaleHeight(44),
    paddingLeft: scaleWidth(8),
  },

  planList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  planRow: {
    minHeight: scaleHeight(64),
    paddingHorizontal: scaleWidth(18),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  selectedPlanRow: {
    backgroundColor: colors.primaryLight,
  },

  radioOuter: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(12),
  },

  radioOuterSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  radioInner: {
    width: scaleWidth(11),
    height: scaleWidth(11),
    borderRadius: scaleWidth(6),
    backgroundColor: colors.primary,
  },

  planDetails: {
    flex: 1,
  },

  interestText: {
    marginTop: scaleHeight(2),
  },

  planAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  selectedPlanSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: scaleWidth(16),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(10),
    marginTop: scaleHeight(12),
  },

  selectedPlanIcon: {
    width: scaleWidth(28),
    height: scaleWidth(28),
    borderRadius: scaleWidth(14),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(10),
  },

  selectedPlanInfo: {
    flex: 1,
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaleHeight(20),
  },

  outlineIconBtn: {
    width: scaleWidth(52),
    height: scaleWidth(52),
    borderRadius: scaleWidth(26),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(12),
    backgroundColor: colors.white,
    borderColor: colors.primaryDark,
    borderWidth: 1.5,
  },

  continueBtnWrapper: {
    flex: 1,
  },

  continueBtn: {
    borderRadius: scaleWidth(24),
  },

  continueBtnDisabled: {
    opacity: 0.5,
  },

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

  stepBadgeNum: {
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

export default ProductDetailScreen;