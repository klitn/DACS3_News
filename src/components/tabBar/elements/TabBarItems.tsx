import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapIcon from '../icons/MapIcon'
import ListIcon from '../icons/ListIcon'
import TrapezoidBackground from './TrapezoidBackground'
import useApplicationDimensions from '../../../hooks/useApplicationDimensions'
import CircleButon from './CircleButon'

const TabBarItems = () => {
  const {width, height} = useApplicationDimensions();
  const trapezoidWidth = width * 0.68;
  const trapezoidHeight = height * 0.12;
  const circleRadius = (trapezoidHeight * 0.51) / 2;
  const buttonCenterX = width / 2 - circleRadius;

  return (
    <View >
     
    </View>
  )
}

export default TabBarItems

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  }
})