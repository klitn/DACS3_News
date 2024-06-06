import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Circle, Line, LinearGradient, Shadow, vec } from '@shopify/react-native-skia';

interface CircleButonProps {
  radius: number;
  pressed?: boolean;
};

const CircleButon = ({radius, pressed}: CircleButonProps) => {
  const diameter = radius * 2;
  const notPressed = ['#f5f5f9', '#dadfe7'];
  const pressedColors = ['#bbbfc7', '#ffffff'];
  return (
    <View></View>
  )
}

export default CircleButon

const styles = StyleSheet.create({})