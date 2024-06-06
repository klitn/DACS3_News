

import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { currentWeather } from '../data/CurrentWeather'
import HomeBackground from '../components/HomeBackground'
import WeatherInfo from '../components/section/WeatherInfo'
import ForecastSheet from '../components/sheets/ForecastSheet'
import WeatherTabBar from '../components/tabBar/WeatherTabBar'

SplashScreen.preventAutoHideAsync();

export default function WeatherScreen() {
    const [fontIsLoaded] = useFonts({
        'SF-Thin': require('../../assets/fonts/SF-Pro-Display-Thin.otf'),
        'SF-Regular': require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
        'SF-Semibold': require('../../assets/fonts/SF-Pro-Display-Semibold.otf'),
      });
    
  const onLayoutRootView = useCallback(async () => {
    if (fontIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontIsLoaded]);

  if (!fontIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{flex: 1}}>
      <>
        <HomeBackground />
        <WeatherInfo weather={currentWeather} />
        <ForecastSheet />
        <WeatherTabBar />
    </>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}