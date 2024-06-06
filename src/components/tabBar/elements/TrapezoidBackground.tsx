import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, FitBox, Line, LinearGradient, Path, rect, vec } from '@shopify/react-native-skia';

interface TrapezoidBackgroundProps {
  width: number;
  height: number;
}

const TrapezoidBackground = ({width, height}: TrapezoidBackgroundProps) => {
  return (
    <View></View>
  )
}

export default TrapezoidBackground

const styles = StyleSheet.create({})

// <svg width="266" height="100" viewBox="0 0 266 100" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g filter="url(#filter0_d_3_633)">
// <path d="" fill="url(#paint0_linear_3_633)"/>
// <path d="" stroke="#7582F4" stroke-opacity="0.5" stroke-width="0.5"/>
// </g>
// <defs>
// <linearGradient id="paint0_linear_3_633" x1="183.615" y1="100" x2="183.615" y2="0" gradientUnits="userSpaceOnUse">
// <stop stop-color="#262C51"/>
// <stop offset="1" stop-color="#3E3F74"/>
// </linearGradient>
// </defs>
// </svg>
