import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconifyIcon} from '@huymobile/react-native-iconify';
import {
  scaleHeight,
  scaleImageWidth,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';

import useProducts from '../../customHooks/useProducts';
import {FIText} from '../../components/FIText';
import {colors} from '../../theme/colors';

const ProductList = () => {
  const navigation = useNavigation();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();

    return products.filter(item => {
      const title = item?.title || item?.name || '';

      return title.toLowerCase().includes(query);
    });
  }, [products, searchQuery]);

  if (productsLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary ?? '#111111'}
          />

          <FIText
            variant="body"
            color={colors.foreground ?? '#111111'}
            style={styles.mt}>
            Loading products...
          </FIText>
        </View>
      </View>
    );
  }

  if (productsError) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <FIText
            variant="body"
            color={colors.primaryDark ?? '#ff0000'}>
            Error: {productsError}
          </FIText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <IconifyIcon
            name="feather:search"
            size={scaleWidth(20)}
            color={colors.mutedForeground ?? '#777777'}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={colors.mutedForeground ?? '#777777'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.headerRow}>
        <FIText
          variant="body"
          weight="semibold"
          color={colors.foreground ?? '#111111'}
          style={styles.headerTitle}>
          Top Products
        </FIText>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) =>
          item?.id?.toString() ?? index.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FIText
              variant="body"
              color={colors.mutedForeground ?? '#555555'}>
              No products found
            </FIText>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => {
              navigation.navigate('ProductDetail', {
                product: item,
              });
            }}>
            {item?.images?.[0] ? (
              <Image
                source={{
                  uri: item.images[0],
                }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <FIText
                  variant="xs"
                  weight="bold"
                  color={colors.mutedForeground ?? '#777777'}>
                  IMG
                </FIText>
              </View>
            )}

            <View style={styles.textContainer}>
              <FIText
                variant="body"
                weight="semibold"
                color={colors.foreground ?? '#111111'}
                numberOfLines={1}
                style={styles.title}>
                {item?.title || item?.name || 'Product'}
              </FIText>

              <FIText
                variant="sm"
                weight="semibold"
                color={colors.foreground ?? '#111111'}
                style={styles.price}>
                ₹{item?.price ?? 'N/A'}
              </FIText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(12),
    paddingBottom: scaleHeight(4),
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleHeight(48),
    borderWidth: 1,
    borderColor: colors.border ?? '#E8E8E8',
    borderRadius: scaleWidth(28),
    paddingHorizontal: scaleWidth(16),
    backgroundColor: colors.white ?? '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: scaleWidth(10),
    paddingVertical: 0,
    color: colors.foreground ?? '#070707',
    fontSize: 14,
  },
  headerRow: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
  },
  headerTitle: {
    fontSize: scaleHeight(20),
  },
  listContainer: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(4),
    paddingBottom: scaleHeight(30),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white ?? '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border ?? '#E8E8E8',
    borderRadius: scaleWidth(16),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(12),
  },
  image: {
    width: scaleImageWidth(64),
    height: scaleHeight(64),
    borderRadius: scaleWidth(12),
    backgroundColor: colors.primaryLight ?? '#EDE8FF',
  },
  imagePlaceholder: {
    width: scaleImageWidth(64),
    height: scaleHeight(64),
    borderRadius: scaleWidth(12),
    backgroundColor: colors.primaryLight ?? '#EDE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: scaleWidth(16),
  },
  title: {
    marginBottom: scaleHeight(4),
    fontSize: scaleHeight(16),
  },
  price: {
    marginBottom: scaleHeight(8),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleWidth(16),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(32),
  },
  mt: {
    marginTop: scaleHeight(8),
  },
});

export default ProductList;




