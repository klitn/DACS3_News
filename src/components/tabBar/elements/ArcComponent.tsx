import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, LinearGradient, Path, vec } from '@shopify/react-native-skia';

interface ArcComponentProps {
  height: number;
  width: number;
}

const ArcComponent = ({height, width}: ArcComponentProps) => {
  const arcPath = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0 L ${width} ${height} L 0 ${height} Z`;
  // const arcPath = '';
  const arcBorder = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0`;
  return (
    <View />
  )
}

export default ArcComponent;

const styles = StyleSheet.create({})