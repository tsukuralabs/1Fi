import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomNavigation';
import ProductDetailScreen from '../screens/app/ProductDetailScreen';
import EmiConfirmationScreen from '../screens/app/EmiConfirmationScreen';
import PaymentScreen from '../screens/app/PaymentScreen';
import PaymentSuccessScreen from '../screens/app/PaymentSucessScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Main application */}
      <Stack.Screen name="Main" component={BottomTabNavigation} />

      {/* Stack screens */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

      <Stack.Screen name="EmiConfirmation" component={EmiConfirmationScreen} />

      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />

      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
