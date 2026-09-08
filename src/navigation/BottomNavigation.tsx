import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Svg, {Path, Circle} from 'react-native-svg';

import HomeScreen from '../screens/app/HomeScreen';
import ShopScreen from '../screens/app/ShopScreen';
import EMIDuesScreen from '../screens/app/EMIDuesScreen';
import LimitScreen from '../screens/app/LimitScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

import {
  scaleHeight,
  scaleWidth,
} from '@raahimkhan23/react-native-responsive-utils';
import { colors } from '../theme/colors';

export type BottomTabParamList = {
  Home: undefined;
  Shop: undefined;
  EMIDues: undefined;
  Limit: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeIcon = ({
  size = 24,
  color = '#000000',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <Path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Svg>
  );
};

const StoreIcon = ({
  size = 24,
  color = '#000000',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
      <Path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
      <Path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
    </Svg>
  );
};

const EMIDuesIcon = ({
  size = 24,
  color = '#000000',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
      <Path d="M8 11h8" />
      <Path d="M8 7h8" />
      <Path d="M9 7a4 4 0 0 1 0 8H8l3 2" />
    </Svg>
  );
};

const LimitIcon = ({
  size = 24,
  color = '#000000',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M12 16v5" />
      <Path d="M16 14v7" />
      <Path d="M20 10v11" />
      <Path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
      <Path d="M4 18v3" />
      <Path d="M8 14v7" />
    </Svg>
  );
};

const ProfileIcon = ({
  size = 24,
  color = '#000000',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <Circle
        cx="12"
        cy="7"
        r="4"
      />
    </Svg>
  );
};

const TabIcon = ({
  focused,
  color,
  children,
}: {
  focused: boolean;
  color: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.iconWrapper}>
      <View
        style={[
          styles.activeBar,
          {
            opacity: focused ? 1 : 0,
          },
        ]}
      />

      {children}
    </View>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        sceneStyle: {
          backgroundColor: '#F7F7F8',
        },
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.tabItem,
        tabBarBackground: () => (
          <View
            pointerEvents="none"
            style={styles.tabBackground}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              focused={focused}
              color={color}>
              <HomeIcon
                size={22}
                color={color}
              />
            </TabIcon>
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: 'Shop',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              focused={focused}
              color={color}>
              <StoreIcon
                size={22}
                color={color}
              />
            </TabIcon>
          ),
        }}
      />

      <Tab.Screen
        name="EMIDues"
        component={EMIDuesScreen}
        options={{
          title: 'EMI Dues',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              focused={focused}
              color={color}>
              <EMIDuesIcon
                size={22}
                color={color}
              />
            </TabIcon>
          ),
        }}
      />

      <Tab.Screen
        name="Limit"
        component={LimitScreen}
        options={{
          title: 'Limit',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              focused={focused}
              color={color}>
              <LimitIcon
                size={22}
                color={color}
              />
            </TabIcon>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              focused={focused}
              color={color}>
              <ProfileIcon
                size={22}
                color={color}
              />
            </TabIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: scaleHeight(60),
    backgroundColor: colors.background,
    borderRadius: scaleWidth(24),
    paddingTop: 6,
    paddingBottom: 6,
    marginHorizontal: scaleWidth(14),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  tabBackground: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 32,
  },

  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width: 50,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  activeBar: {
    position: 'absolute',
    top: -7,
    width: 50,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
});

export default BottomTabNavigation;