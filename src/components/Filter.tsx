// // components/ProductFilterBottomSheet.tsx
// import React, { useMemo, useCallback } from 'react';
// import { StyleSheet, TouchableOpacity } from 'react-native';
// import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
// import { FIText } from '../components/FIText';
// import { colors } from '../theme/colors';
// import {
//   scaleWidth,
//   scaleHeight,
// } from '@raahimkhan23/react-native-responsive-utils';

// export type SortOption = 'default' | 'price_low_high' | 'price_high_low' | 'alphabetical';

// interface ProductFilterBottomSheetProps {
//   bottomSheetRef: React.RefObject<BottomSheet>;
//   sortBy: SortOption;
//   onSelectSort: (option: SortOption) => void;
// }

// export const ProductFilterBottomSheet: React.FC<ProductFilterBottomSheetProps> = ({
//   bottomSheetRef,
//   sortBy,
//   onSelectSort,
// }) => {
//   const snapPoints = useMemo(() => ['35%'], []);

//   const handleClosePress = () => {
//     bottomSheetRef.current?.close();
//   };

//   const renderBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         {...props}
//         disappearsOnIndex={-1}
//         appearsOnIndex={0}
//         opacity={0.4}
//       />
//     ),
//     []
//   );

//   const options: { label: string; value: SortOption }[] = [
//     { label: 'Default', value: 'default' },
//     { label: 'Price: Low to High', value: 'price_low_high' },
//     { label: 'Price: High to Low', value: 'price_high_low' },
//     { label: 'Alphabetical (A-Z)', value: 'alphabetical' },
//   ];

//   return (
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={-1}
//       snapPoints={snapPoints}
//       enablePanDownToClose={true}
//       backdropComponent={renderBackdrop}
//       backgroundStyle={styles.bottomSheetBackground}
//       handleIndicatorStyle={styles.bottomSheetIndicator}
//     >
//       <BottomSheetView style={styles.bottomSheetContentContainer}>
//         <FIText variant="body" weight="extrabold" style={styles.sheetTitle}>
//           Sort Products By
//         </FIText>

//         {options.map((option) => (
//           <TouchableOpacity
//             key={option.value}
//             style={[
//               styles.sheetOption,
//               sortBy === option.value && styles.sheetOptionSelected,
//             ]}
//             onPress={() => {
//               onSelectSort(option.value);
//               handleClosePress();
//             }}
//           >
//             <FIText
//               variant="sm"
//               color={
//                 sortBy === option.value
//                   ? colors.primary ?? '#4F46E5'
//                   : colors.foreground ?? '#111111'
//               }
//               weight={sortBy === option.value ? 'bold' : 'normal'}
//             >
//               {option.label}
//             </FIText>
//           </TouchableOpacity>
//         ))}
//       </BottomSheetView>
//     </BottomSheet>
//   );
// };

// const styles = StyleSheet.create({
//   bottomSheetBackground: {
//     backgroundColor: colors.white ?? '#FFFFFF',
//     borderRadius: scaleWidth(24),
//     borderWidth: 1,
//     borderColor: colors.border ?? '#E8E8E8',
//   },
//   bottomSheetIndicator: {
//     backgroundColor: colors.mutedForeground ?? '#CCCCCC',
//     width: scaleWidth(40),
//   },
//   bottomSheetContentContainer: {
//     paddingHorizontal: scaleWidth(20),
//     paddingVertical: scaleHeight(10),
//   },
//   sheetTitle: {
//     marginBottom: scaleHeight(16),
//   },
//   sheetOption: {
//     paddingVertical: scaleHeight(12),
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border ?? '#E8E8E8',
//   },
//   sheetOptionSelected: {
//     backgroundColor: colors.primaryLight ?? '#EDE8FF',
//     paddingHorizontal: scaleWidth(8),
//     borderRadius: scaleWidth(8),
//     borderBottomWidth: 0,
//   },
// });