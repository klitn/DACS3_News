import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArcComponent from './elements/ArcComponent'
import useApplicationDimensions from '../../hooks/useApplicationDimensions';
import TabBarItems from './elements/TabBarItems';
import { BlurView } from 'expo-blur';

const WeatherTabBar = () => {
  const tabBarHeight = 88;
  const {width, height} = useApplicationDimensions();
  return (
    <View></View>
  )
}

export default WeatherTabBar;

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: 'red',
  }
})