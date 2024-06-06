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
    <Canvas style={{width: diameter, height: diameter}}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(diameter, diameter)}
            colors={pressed ? pressedColors : notPressed}
          />
          <Shadow
            dx={1}
            dy={1}
            blur={0.5}
            color={'white'}
            inner
          />
      </Circle>
      <Line
        p1={vec(radius - radius / 3, radius)}
        p2={vec(radius + radius / 3, radius)}
        style={'stroke'}
        strokeCap={'round'}
        strokeWidth={4}
        color={'#1877F2'}
      />
      <Line
        p1={vec(radius, radius - radius / 3)}
        p2={vec(radius, radius + radius / 3)}
        style={'stroke'}
        strokeCap={'round'}
        strokeWidth={4}
        color={'#1877F2'}
      />
    </Canvas>
  )
}

export default CircleButon

const styles = StyleSheet.create({})