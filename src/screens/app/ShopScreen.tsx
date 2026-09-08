import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { scaleWidth, hp, wp } from '@raahimkhan23/react-native-responsive-utils';
import { FIText } from '../../components/FIText';
import { colors } from '../../theme/colors';
import ProductList from './ProductList';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'] as const;

const ShopScreen = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderTabItem = (tab: string, index: number) => {
    const isActive = activeTab === index;

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        activeOpacity={0.8}
        onPress={() => setActiveTab(index)}
      >
        <FIText
          variant="xs"
          weight={isActive ? 'semibold' : 'bold'}
          color={isActive ? colors.primary : colors.mutedForeground}
          align="center"
          style={styles.tabTextOverride}
        >
          {tab}
        </FIText>

        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <View style={styles.placeholderContainer}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}
              style={styles.tabContentPlaceholder}
            >
              Top Brands Content Goes Here
            </FIText>
          </View>
        );

      case 1:
        return (
          <View style={styles.placeholderContainer}>
            <FIText
              variant="sm"
              color={colors.mutedForeground}
              style={styles.tabContentPlaceholder}
            >
              Nearby Stores Content Goes Here
            </FIText>
          </View>
        );

      case 2:
        return (
          <View style={styles.marketplaceContainer}>
            <ProductList />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Full-width Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/image.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsWrapper}>
          <View style={styles.tabsContainer}>
            {TABS.map((tab, index) => renderTabItem(tab, index))}
          </View>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: hp(5),
  },
  imageContainer: {
    width: '100%',
    height: hp(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tabsWrapper: {
    paddingHorizontal: wp(4),
    marginTop: hp(-3.5),
    zIndex: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: scaleWidth(28),
    padding: scaleWidth(4),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleWidth(22),
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: colors.white,
  },
  tabTextOverride: {
    fontSize: scaleWidth(12),
  },
  activeIndicator: {
    position: 'absolute',
    bottom: hp(0.8),
    width: scaleWidth(16),
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  tabContentContainer: {
    // marginTop: hp(2),
    width: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  tabContentPlaceholder: {
    fontStyle: 'italic',
  },
  marketplaceContainer: {
    width: '100%',
    flex: 1,
  },
});

export default ShopScreen;