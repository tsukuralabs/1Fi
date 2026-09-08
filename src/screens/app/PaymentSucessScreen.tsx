// import React, {useEffect, useMemo, useState, useCallback} from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   BackHandler,
// } from 'react-native';
// import {
//   scaleHeight,
//   scaleWidth,
// } from '@raahimkhan23/react-native-responsive-utils';
// import {IconifyIcon} from '@huymobile/react-native-iconify';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';

// import Animated, {
//   Easing,
//   cancelAnimation,
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withRepeat,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';

// import {FIText} from '../../components/FIText';
// import {FIButton} from '../../components/FIButton';
// import {colors} from '../../theme/colors';

// const {height: SCREEN_HEIGHT} = Dimensions.get('window');

// const formatIndianNumber = (value: string | number) => {
//   const stringValue = String(value || '');
//   if (!stringValue) return '';

//   const numberValue = Number(stringValue.replace(/,/g, ''));
//   if (Number.isNaN(numberValue)) return '';

//   return numberValue.toLocaleString('en-IN');
// };

// const PaymentSuccessScreen = () => {
//   const route = useRoute<any>();
//   const navigation = useNavigation<any>();

//   const product = route?.params?.product || {};
//   const amount = route?.params?.amount || 0;
//   const emiPlan = route?.params?.emiPlan || null;
//   const paymentMethod = route?.params?.paymentMethod || 'upi';

//   const [isProcessing, setIsProcessing] = useState(true);

//   // Layout measurements
//   const iconSize = scaleWidth(92);
//   const targetTopOffset = scaleHeight(35);
//   const initialCenterOffset = (SCREEN_HEIGHT - iconSize) / 2;
//   const deltaY = targetTopOffset - initialCenterOffset;

//   // Loader animations
//   const loaderRotation = useSharedValue(0);
//   const loaderOpacity = useSharedValue(1);
//   const loaderScale = useSharedValue(1);

//   // Tick animations
//   const checkScale = useSharedValue(0);
//   const checkTranslateY = useSharedValue(0);

//   // Content animations
//   const contentOpacity = useSharedValue(0);
//   const contentTranslateY = useSharedValue(25);

//   // Button animations
//   const buttonOpacity = useSharedValue(0);
//   const buttonTranslateY = useSharedValue(20);

//   const productName = product?.title || product?.name || 'Air India';
//   const totalPayable =
//     emiPlan?.emi && emiPlan?.months
//       ? emiPlan.emi * emiPlan.months
//       : amount;

//   const paymentMethodLabel =
//     paymentMethod === 'upi'
//       ? 'UPI'
//       : paymentMethod === 'card'
//       ? 'Credit / Debit Card'
//       : 'Net Banking';

//   const transactionId = useMemo(
//     () => `PAY${Date.now().toString().slice(-8)}`,
//     [],
//   );

//   /**
//    * =========================================================
//    * NAVIGATION RESET LOGIC
//    * =========================================================
//    * Wipes the payment/checkout stack and resets directly to Shop.
//    */
//   const navigateToShop = useCallback(() => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [
//           {
//             name: 'Main',
//             params: {screen: 'Shop'},
//           },
//         ],
//       }),
//     );
//   }, [navigation]);

//   // Intercept physical and swipe-back gestures
//   useEffect(() => {
//     const onBackPress = () => {
//       if (isProcessing) {
//         // Disallow back during payment processing
//         return true;
//       }
//       navigateToShop();
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       onBackPress,
//     );

//     return () => backHandler.remove();
//   }, [isProcessing, navigateToShop]);

//   useEffect(() => {
//     // 1. Start continuous loader spin
//     loaderRotation.value = withRepeat(
//       withTiming(360, {
//         duration: 900,
//         easing: Easing.linear,
//       }),
//       -1,
//       false,
//     );

//     // 2. Simulate processing duration (~1.8 seconds)
//     const timer = setTimeout(() => {
//       loaderOpacity.value = withTiming(0, {duration: 250});
//       loaderScale.value = withTiming(0.8, {duration: 250});

//       setTimeout(() => {
//         setIsProcessing(false);
//         cancelAnimation(loaderRotation);

//         // 3. Pop tick in the center
//         checkScale.value = withSpring(1, {
//           damping: 12,
//           stiffness: 170,
//           mass: 0.8,
//         });

//         // 4. Slide tick to top after brief pause
//         checkTranslateY.value = withDelay(
//           500,
//           withTiming(deltaY, {
//             duration: 550,
//             easing: Easing.bezier(0.25, 1, 0.5, 1),
//           }),
//         );

//         // 5. Reveal receipt details
//         contentOpacity.value = withDelay(
//           950,
//           withTiming(1, {
//             duration: 380,
//             easing: Easing.out(Easing.ease),
//           }),
//         );

//         contentTranslateY.value = withDelay(
//           950,
//           withTiming(0, {
//             duration: 380,
//             easing: Easing.out(Easing.cubic),
//           }),
//         );

//         // 6. Reveal action buttons
//         buttonOpacity.value = withDelay(
//           1100,
//           withTiming(1, {
//             duration: 320,
//             easing: Easing.out(Easing.ease),
//           }),
//         );

//         buttonTranslateY.value = withDelay(
//           1100,
//           withTiming(0, {
//             duration: 320,
//             easing: Easing.out(Easing.cubic),
//           }),
//         );
//       }, 250);
//     }, 1800);

//     return () => clearTimeout(timer);
//   }, [deltaY]);

//   // Animated Styles
//   const loaderAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: loaderOpacity.value,
//     transform: [{scale: loaderScale.value}],
//   }));

//   const spinnerAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{rotate: `${loaderRotation.value}deg`}],
//   }));

//   const checkAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {translateY: checkTranslateY.value},
//       {scale: checkScale.value},
//     ],
//   }));

//   const contentAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: contentOpacity.value,
//     transform: [{translateY: contentTranslateY.value}],
//   }));

//   const buttonAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: buttonOpacity.value,
//     transform: [{translateY: buttonTranslateY.value}],
//   }));

//   const handleDone = () => {
//     navigateToShop();
//   };

//   const handleViewOrder = () => {
//     navigation.navigate('Orders');
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       {/* ================= PROCESSING LOADER (TRUE FULL-SCREEN CENTER) ================= */}
//       {isProcessing && (
//         <Animated.View
//           pointerEvents="none"
//           style={[styles.loaderOverlay, loaderAnimatedStyle]}>
//           <View style={styles.loaderCircle}>
//             <Animated.View style={[styles.spinnerIcon, spinnerAnimatedStyle]}>
//               <IconifyIcon
//                 name="feather:loader"
//                 size={40}
//                 color={colors.primary}
//               />
//             </Animated.View>
//           </View>

//           <FIText
//             variant="heading"
//             weight="bold"
//             color={colors.foreground}
//             align="center"
//             style={styles.loaderTitle}>
//             Processing Payment...
//           </FIText>

//           <FIText
//             variant="sm"
//             color={colors.mutedForeground}
//             align="center"
//             style={styles.loaderSubtitle}>
//             Please do not close the app or press back.
//           </FIText>
//         </Animated.View>
//       )}

//       <View style={styles.content}>
//         {/* ================= SUCCESS TICK (Centered) ================= */}
//         {!isProcessing && (
//           <View
//             pointerEvents="none"
//             style={[styles.iconLayer, {top: initialCenterOffset}]}>
//             <Animated.View
//               style={[styles.successIconOuter, checkAnimatedStyle]}>
//               <View style={styles.successIconInner}>
//                 <IconifyIcon
//                   name="feather:check"
//                   size={42}
//                   color={colors.white}
//                 />
//               </View>
//             </Animated.View>
//           </View>
//         )}

//         {/* ================= SUCCESS RECEIPT CONTENT ================= */}
//         {!isProcessing && (
//           <Animated.View
//             style={[styles.successContent, contentAnimatedStyle]}>
//             <FIText
//               variant="heading"
//               weight="bold"
//               color={colors.foreground}
//               align="center">
//               Payment successful!
//             </FIText>

//             <FIText
//               variant="sm"
//               color={colors.mutedForeground}
//               align="center"
//               style={styles.subtitle}>
//               Your payment has been processed successfully.
//             </FIText>

//             {/* PAYMENT CARD */}
//             <View style={styles.paymentCard}>
//               <View style={styles.cardHeader}>
//                 <View>
//                   <FIText variant="xs" color={colors.mutedForeground}>
//                     Payment amount
//                   </FIText>
//                   <FIText
//                     variant="heading"
//                     weight="bold"
//                     color={colors.foreground}
//                     style={styles.amount}>
//                     ₹{formatIndianNumber(totalPayable)}
//                   </FIText>
//                 </View>

//                 <View style={styles.paidBadge}>
//                   <IconifyIcon
//                     name="feather:check-circle"
//                     size={14}
//                     color={colors.primary}
//                   />
//                   <FIText
//                     variant="xs"
//                     weight="bold"
//                     color={colors.primary}>
//                     Paid
//                   </FIText>
//                 </View>
//               </View>

//               <View style={styles.divider} />

//               {/* PRODUCT */}
//               <View style={styles.detailRow}>
//                 <View style={styles.detailIcon}>
//                   <IconifyIcon
//                     name="feather:shopping-bag"
//                     size={17}
//                     color={colors.primary}
//                   />
//                 </View>
//                 <View style={styles.detailContent}>
//                   <FIText variant="xs" color={colors.mutedForeground}>
//                     Product
//                   </FIText>
//                   <FIText
//                     variant="sm"
//                     weight="semibold"
//                     color={colors.foreground}
//                     numberOfLines={1}>
//                     {productName}
//                   </FIText>
//                 </View>
//               </View>

//               {/* PAYMENT METHOD */}
//               <View style={styles.detailRow}>
//                 <View style={styles.detailIcon}>
//                   <IconifyIcon
//                     name="feather:credit-card"
//                     size={17}
//                     color={colors.primary}
//                   />
//                 </View>
//                 <View style={styles.detailContent}>
//                   <FIText variant="xs" color={colors.mutedForeground}>
//                     Payment method
//                   </FIText>
//                   <FIText
//                     variant="sm"
//                     weight="semibold"
//                     color={colors.foreground}>
//                     {paymentMethodLabel}
//                   </FIText>
//                 </View>
//               </View>

//               {/* EMI */}
//               {emiPlan && (
//                 <View style={styles.detailRow}>
//                   <View style={styles.detailIcon}>
//                     <IconifyIcon
//                       name="feather:calendar"
//                       size={17}
//                       color={colors.primary}
//                     />
//                   </View>
//                   <View style={styles.detailContent}>
//                     <FIText variant="xs" color={colors.mutedForeground}>
//                       EMI plan
//                     </FIText>
//                     <FIText
//                       variant="sm"
//                       weight="semibold"
//                       color={colors.foreground}>
//                       ₹{formatIndianNumber(emiPlan.emi)} × {emiPlan.months} months
//                     </FIText>
//                   </View>
//                 </View>
//               )}

//               {/* TRANSACTION ID */}
//               <View style={styles.detailRow}>
//                 <View style={styles.detailIcon}>
//                   <IconifyIcon
//                     name="feather:hash"
//                     size={17}
//                     color={colors.primary}
//                   />
//                 </View>
//                 <View style={styles.detailContent}>
//                   <FIText variant="xs" color={colors.mutedForeground}>
//                     Transaction ID
//                   </FIText>
//                   <FIText
//                     variant="sm"
//                     weight="semibold"
//                     color={colors.foreground}>
//                     {transactionId}
//                   </FIText>
//                 </View>
//               </View>
//             </View>

//             {/* CONFIRMATION */}
//             <View style={styles.confirmationBox}>
//               <View style={styles.confirmationIcon}>
//                 <IconifyIcon
//                   name="feather:mail"
//                   size={17}
//                   color={colors.primary}
//                 />
//               </View>
//               <View style={styles.confirmationContent}>
//                 <FIText
//                   variant="sm"
//                   weight="semibold"
//                   color={colors.foreground}>
//                   Payment confirmation sent
//                 </FIText>
//                 <FIText
//                   variant="xs"
//                   color={colors.mutedForeground}
//                   style={styles.confirmationText}>
//                   A confirmation of your payment details has been
//                   generated successfully.
//                 </FIText>
//               </View>
//             </View>
//           </Animated.View>
//         )}

//         {/* ================= BOTTOM ACTIONS ================= */}
//         {/* {!isProcessing && (
//           <Animated.View
//             style={[styles.bottomAction, buttonAnimatedStyle]}>
//             <FIButton
//               variant="primary"
//               size="lg"
//               fullWidth
//               onPress={handleDone}
//               style={styles.doneButton}
//               rightIcon={
//                 <IconifyIcon
//                   name="feather:arrow-right"
//                   size={18}
//                   color={colors.white}
//                 />
//               }>
//               Done
//             </FIButton>

//             <TouchableOpacity
//               activeOpacity={0.7}
//               onPress={handleViewOrder}
//               style={styles.viewOrderButton}>
//               <FIText
//                 variant="sm"
//                 weight="semibold"
//                 color={colors.primary}
//                 align="center">
//                 View order details
//               </FIText>
//             </TouchableOpacity>
//           </Animated.View>
//         )} */}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   content: {
//     flex: 1,
//     paddingHorizontal: scaleWidth(20),
//     paddingBottom: scaleHeight(20),
//   },

//   /* True Screen Center Loader Overlay */
//   loaderOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: scaleWidth(24),
//     zIndex: 20,
//   },

//   loaderCircle: {
//     width: scaleWidth(92),
//     height: scaleWidth(92),
//     borderRadius: scaleWidth(46),
//     backgroundColor: colors.primaryLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: scaleHeight(24),
//   },

//   spinnerIcon: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   loaderTitle: {
//     marginBottom: scaleHeight(8),
//   },

//   loaderSubtitle: {
//     lineHeight: scaleHeight(20),
//   },

//   /* Success Icon Layer */
//   iconLayer: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 10,
//   },

//   successIconOuter: {
//     width: scaleWidth(92),
//     height: scaleWidth(92),
//     borderRadius: scaleWidth(46),
//     backgroundColor: colors.primaryLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   successIconInner: {
//     width: scaleWidth(68),
//     height: scaleWidth(68),
//     borderRadius: scaleWidth(34),
//     backgroundColor: colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   /* Card & Details */
//   successContent: {
//     marginTop: scaleHeight(145),
//     flex: 1,
//   },

//   subtitle: {
//     marginTop: scaleHeight(7),
//     lineHeight: scaleHeight(20),
//   },

//   paymentCard: {
//     backgroundColor: colors.white,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: scaleWidth(22),
//     padding: scaleWidth(18),
//     marginTop: scaleHeight(24),
//   },

//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   amount: {
//     marginTop: scaleHeight(3),
//   },

//   paidBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scaleWidth(5),
//     backgroundColor: colors.primaryLight,
//     paddingHorizontal: scaleWidth(10),
//     paddingVertical: scaleHeight(6),
//     borderRadius: scaleWidth(20),
//   },

//   divider: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginVertical: scaleHeight(16),
//   },

//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: scaleHeight(14),
//   },

//   detailIcon: {
//     width: scaleWidth(38),
//     height: scaleWidth(38),
//     borderRadius: scaleWidth(11),
//     backgroundColor: colors.primaryLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   detailContent: {
//     flex: 1,
//     marginLeft: scaleWidth(11),
//   },

//   confirmationBox: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     backgroundColor: colors.primaryLight,
//     borderRadius: scaleWidth(17),
//     padding: scaleWidth(14),
//     marginTop: scaleHeight(14),
//   },

//   confirmationIcon: {
//     width: scaleWidth(36),
//     height: scaleWidth(36),
//     borderRadius: scaleWidth(18),
//     backgroundColor: colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   confirmationContent: {
//     flex: 1,
//     marginLeft: scaleWidth(10),
//   },

//   confirmationText: {
//     marginTop: scaleHeight(3),
//     lineHeight: scaleHeight(18),
//   },

//   /* Buttons */
//   bottomAction: {
//     marginTop: scaleHeight(18),
//   },

//   doneButton: {
//     borderRadius: scaleWidth(24),
//   },

//   viewOrderButton: {
//     paddingVertical: scaleHeight(13),
//     marginTop: scaleHeight(5),
//   },
// });

// export default PaymentSuccessScreen;




import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';
import {IconifyIcon} from '@huymobile/react-native-iconify';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';

import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {FIText} from '../../components/FIText';
import {FIButton} from '../../components/FIButton';
import {colors} from '../../theme/colors';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const formatIndianNumber = (value: string | number) => {
  const stringValue = String(value || '');
  if (!stringValue) return '';

  const numberValue = Number(stringValue.replace(/,/g, ''));
  if (Number.isNaN(numberValue)) return '';

  return numberValue.toLocaleString('en-IN');
};

const PaymentSuccessScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const product = route?.params?.product || {};
  const amount = route?.params?.amount || 0;
  const emiPlan = route?.params?.emiPlan || null;
  const paymentMethod = route?.params?.paymentMethod || 'upi';

  const [isProcessing, setIsProcessing] = useState(true);

  // Layout measurements
  const iconSize = scaleWidth(92);
  const targetTopOffset = scaleHeight(35);
  const initialCenterOffset = (SCREEN_HEIGHT - iconSize) / 2;
  const deltaY = targetTopOffset - initialCenterOffset;

  // Loader animations
  const loaderRotation = useSharedValue(0);
  const loaderOpacity = useSharedValue(1);
  const loaderScale = useSharedValue(1);

  // Tick animations
  const checkScale = useSharedValue(0);
  const checkTranslateY = useSharedValue(0);

  // Content animations
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(25);

  // Button animations
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);

  const productName = product?.title || product?.name || 'Air India';
  const totalPayable =
    emiPlan?.emi && emiPlan?.months
      ? emiPlan.emi * emiPlan.months
      : amount;

  const paymentMethodLabel =
    paymentMethod === 'upi'
      ? 'UPI'
      : paymentMethod === 'card'
      ? 'Credit / Debit Card'
      : 'Net Banking';

  const transactionId = useMemo(
    () => `PAY${Date.now().toString().slice(-8)}`,
    [],
  );

  /**
   * Complete stack reset to Main -> Shop screen.
   * Wipes checkout, order summary, and payment screens from history.
   */
  const navigateToShop = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            params: {screen: 'Shop'},
          },
        ],
      }),
    );
  }, [navigation]);

  // Disable gesture pop & intercept all navigation removal attempts (iOS swipe, back press, etc.)
  useEffect(() => {
    navigation.setOptions?.({
      gestureEnabled: false,
    });

    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      // If the action is already a RESET, allow it to execute
      if (e.data.action.type === 'RESET') {
        return;
      }

      // Prevent the default back navigation
      e.preventDefault();

      // Block back actions during the loading animation
      if (isProcessing) {
        return;
      }

      // Route directly to Shop instead of going back
      navigateToShop();
    });

    return unsubscribe;
  }, [navigation, isProcessing, navigateToShop]);

  // Android hardware back button fallback
  useEffect(() => {
    const onBackPress = () => {
      if (isProcessing) {
        return true;
      }
      navigateToShop();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, [isProcessing, navigateToShop]);

  useEffect(() => {
    // 1. Start continuous loader spin
    loaderRotation.value = withRepeat(
      withTiming(360, {
        duration: 900,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    // 2. Simulate processing duration (~1.8 seconds)
    const timer = setTimeout(() => {
      loaderOpacity.value = withTiming(0, {duration: 250});
      loaderScale.value = withTiming(0.8, {duration: 250});

      setTimeout(() => {
        setIsProcessing(false);
        cancelAnimation(loaderRotation);

        // 3. Pop tick in the center
        checkScale.value = withSpring(1, {
          damping: 12,
          stiffness: 170,
          mass: 0.8,
        });

        // 4. Slide tick to top after brief pause
        checkTranslateY.value = withDelay(
          500,
          withTiming(deltaY, {
            duration: 550,
            easing: Easing.bezier(0.25, 1, 0.5, 1),
          }),
        );

        // 5. Reveal receipt details
        contentOpacity.value = withDelay(
          950,
          withTiming(1, {
            duration: 380,
            easing: Easing.out(Easing.ease),
          }),
        );

        contentTranslateY.value = withDelay(
          950,
          withTiming(0, {
            duration: 380,
            easing: Easing.out(Easing.cubic),
          }),
        );

        // 6. Reveal action buttons
        buttonOpacity.value = withDelay(
          1100,
          withTiming(1, {
            duration: 320,
            easing: Easing.out(Easing.ease),
          }),
        );

        buttonTranslateY.value = withDelay(
          1100,
          withTiming(0, {
            duration: 320,
            easing: Easing.out(Easing.cubic),
          }),
        );
      }, 250);
    }, 1800);

    return () => clearTimeout(timer);
  }, [deltaY]);

  // Animated Styles
  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
    transform: [{scale: loaderScale.value}],
  }));

  const spinnerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${loaderRotation.value}deg`}],
  }));

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: checkTranslateY.value},
      {scale: checkScale.value},
    ],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{translateY: contentTranslateY.value}],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{translateY: buttonTranslateY.value}],
  }));

  const handleDone = () => {
    navigateToShop();
  };

  const handleViewOrder = () => {
    navigation.navigate('Orders');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* ================= PROCESSING LOADER (TRUE FULL-SCREEN CENTER) ================= */}
      {isProcessing && (
        <Animated.View
          pointerEvents="none"
          style={[styles.loaderOverlay, loaderAnimatedStyle]}>
          <View style={styles.loaderCircle}>
            <Animated.View style={[styles.spinnerIcon, spinnerAnimatedStyle]}>
              <IconifyIcon
                name="feather:loader"
                size={40}
                color={colors.primary}
              />
            </Animated.View>
          </View>

          <FIText
            variant="heading"
            weight="bold"
            color={colors.foreground}
            align="center"
            style={styles.loaderTitle}>
            Processing Payment...
          </FIText>

          <FIText
            variant="sm"
            color={colors.mutedForeground}
            align="center"
            style={styles.loaderSubtitle}>
            Please do not close the app or press back.
          </FIText>
        </Animated.View>
      )}

      <View style={styles.content}>
        {/* ================= SUCCESS TICK (Centered) ================= */}
        {!isProcessing && (
          <View
            pointerEvents="none"
            style={[styles.iconLayer, {top: initialCenterOffset}]}>
            <Animated.View
              style={[styles.successIconOuter, checkAnimatedStyle]}>
              <View style={styles.successIconInner}>
                <IconifyIcon
                  name="feather:check"
                  size={42}
                  color={colors.white}
                />
              </View>
            </Animated.View>
          </View>
        )}

        {/* ================= SUCCESS RECEIPT CONTENT ================= */}
        {!isProcessing && (
          <Animated.View
            style={[styles.successContent, contentAnimatedStyle]}>
            <FIText
              variant="heading"
              weight="bold"
              color={colors.foreground}
              align="center">
              Payment successful!
            </FIText>

            <FIText
              variant="sm"
              color={colors.mutedForeground}
              align="center"
              style={styles.subtitle}>
              Your payment has been processed successfully.
            </FIText>

            {/* PAYMENT CARD */}
            <View style={styles.paymentCard}>
              <View style={styles.cardHeader}>
                <View>
                  <FIText variant="xs" color={colors.mutedForeground}>
                    Payment amount
                  </FIText>
                  <FIText
                    variant="heading"
                    weight="bold"
                    color={colors.foreground}
                    style={styles.amount}>
                    ₹{formatIndianNumber(totalPayable)}
                  </FIText>
                </View>

                <View style={styles.paidBadge}>
                  <IconifyIcon
                    name="feather:check-circle"
                    size={14}
                    color={colors.primary}
                  />
                  <FIText
                    variant="xs"
                    weight="bold"
                    color={colors.primary}>
                    Paid
                  </FIText>
                </View>
              </View>

              <View style={styles.divider} />

              {/* PRODUCT */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <IconifyIcon
                    name="feather:shopping-bag"
                    size={17}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.detailContent}>
                  <FIText variant="xs" color={colors.mutedForeground}>
                    Product
                  </FIText>
                  <FIText
                    variant="sm"
                    weight="semibold"
                    color={colors.foreground}
                    numberOfLines={1}>
                    {productName}
                  </FIText>
                </View>
              </View>

              {/* PAYMENT METHOD */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <IconifyIcon
                    name="feather:credit-card"
                    size={17}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.detailContent}>
                  <FIText variant="xs" color={colors.mutedForeground}>
                    Payment method
                  </FIText>
                  <FIText
                    variant="sm"
                    weight="semibold"
                    color={colors.foreground}>
                    {paymentMethodLabel}
                  </FIText>
                </View>
              </View>

              {/* EMI */}
              {emiPlan && (
                <View style={styles.detailRow}>
                  <View style={styles.detailIcon}>
                    <IconifyIcon
                      name="feather:calendar"
                      size={17}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.detailContent}>
                    <FIText variant="xs" color={colors.mutedForeground}>
                      EMI plan
                    </FIText>
                    <FIText
                      variant="sm"
                      weight="semibold"
                      color={colors.foreground}>
                      ₹{formatIndianNumber(emiPlan.emi)} × {emiPlan.months} months
                    </FIText>
                  </View>
                </View>
              )}

              {/* TRANSACTION ID */}
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <IconifyIcon
                    name="feather:hash"
                    size={17}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.detailContent}>
                  <FIText variant="xs" color={colors.mutedForeground}>
                    Transaction ID
                  </FIText>
                  <FIText
                    variant="sm"
                    weight="semibold"
                    color={colors.foreground}>
                    {transactionId}
                  </FIText>
                </View>
              </View>
            </View>

            {/* CONFIRMATION */}
            <View style={styles.confirmationBox}>
              <View style={styles.confirmationIcon}>
                <IconifyIcon
                  name="feather:mail"
                  size={17}
                  color={colors.primary}
                />
              </View>
              <View style={styles.confirmationContent}>
                <FIText
                  variant="sm"
                  weight="semibold"
                  color={colors.foreground}>
                  Payment confirmation sent
                </FIText>
                <FIText
                  variant="xs"
                  color={colors.mutedForeground}
                  style={styles.confirmationText}>
                  A confirmation of your payment details has been
                  generated successfully.
                </FIText>
              </View>
            </View>
          </Animated.View>
        )}

        {/* ================= BOTTOM ACTIONS ================= */}
        {/* {!isProcessing && (
          <Animated.View
            style={[styles.bottomAction, buttonAnimatedStyle]}>
            <FIButton
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleDone}
              style={styles.doneButton}
              rightIcon={
                <IconifyIcon
                  name="feather:arrow-right"
                  size={18}
                  color={colors.white}
                />
              }>
              Done
            </FIButton>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleViewOrder}
              style={styles.viewOrderButton}>
              <FIText
                variant="sm"
                weight="semibold"
                color={colors.primary}
                align="center">
                View order details
              </FIText>
            </TouchableOpacity>
          </Animated.View>
        )} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(20),
  },

  /* True Screen Center Loader Overlay */
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(24),
    zIndex: 20,
  },

  loaderCircle: {
    width: scaleWidth(92),
    height: scaleWidth(92),
    borderRadius: scaleWidth(46),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(24),
  },

  spinnerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderTitle: {
    marginBottom: scaleHeight(8),
  },

  loaderSubtitle: {
    lineHeight: scaleHeight(20),
  },

  /* Success Icon Layer */
  iconLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },

  successIconOuter: {
    width: scaleWidth(92),
    height: scaleWidth(92),
    borderRadius: scaleWidth(46),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successIconInner: {
    width: scaleWidth(68),
    height: scaleWidth(68),
    borderRadius: scaleWidth(34),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Card & Details */
  successContent: {
    marginTop: scaleHeight(145),
    flex: 1,
  },

  subtitle: {
    marginTop: scaleHeight(7),
    lineHeight: scaleHeight(20),
  },

  paymentCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scaleWidth(22),
    padding: scaleWidth(18),
    marginTop: scaleHeight(24),
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  amount: {
    marginTop: scaleHeight(3),
  },

  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(5),
    backgroundColor: colors.primaryLight,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleWidth(20),
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: scaleHeight(16),
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(14),
  },

  detailIcon: {
    width: scaleWidth(38),
    height: scaleWidth(38),
    borderRadius: scaleWidth(11),
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailContent: {
    flex: 1,
    marginLeft: scaleWidth(11),
  },

  confirmationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: scaleWidth(17),
    padding: scaleWidth(14),
    marginTop: scaleHeight(14),
  },

  confirmationIcon: {
    width: scaleWidth(36),
    height: scaleWidth(36),
    borderRadius: scaleWidth(18),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmationContent: {
    flex: 1,
    marginLeft: scaleWidth(10),
  },

  confirmationText: {
    marginTop: scaleHeight(3),
    lineHeight: scaleHeight(18),
  },

  /* Buttons */
  bottomAction: {
    marginTop: scaleHeight(18),
  },

  doneButton: {
    borderRadius: scaleWidth(24),
  },

  viewOrderButton: {
    paddingVertical: scaleHeight(13),
    marginTop: scaleHeight(5),
  },
});

export default PaymentSuccessScreen;