import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {AntDesign, Entypo} from '@expo/vector-icons';
import Widget from './base/Widget';
import { WidgetDimensionsProps } from './interface';
import { Canvas, Circle, Line, LinearGradient, Paint, vec } from '@shopify/react-native-skia';

const AirQualityWidget = ({width, height}: WidgetDimensionsProps) => {
  return (
    <>
        <Widget width={width} height={height}>
            <Widget.Header
                Icon={Entypo}
                iconProps={{name: "air"}}
                contentText="Air Quality"
            />
            <Widget.Body contentText="3-Low Health Risk">
                <Canvas style={styles.canvasContainer}>
                    <Line 
                        p1={vec(0,0)}
                        p2={vec(width, 0)}
                        style={'stroke'}
                        strokeWidth={10}
                    >
                        <LinearGradient
                        start={vec(0, 0)}
                        end={vec(width, 0)}
                        colors={["#2a59b7", "#f92e9b"]}
                        />
                    </Line>
                    <Circle
                        cx={3}
                        cy={3}
                        r={3}
                        color={"white"}
                        transform={[{ translateX: 20 }]}
                        >
                        <Paint color="white" />
                        <Paint color="black" style="stroke" strokeWidth={1} />
                    </Circle>
                </Canvas>
            </Widget.Body>
        </Widget>
    </>
  )
}

export default AirQualityWidget

const styles = StyleSheet.create({
    canvasContainer: {
        height: 10,
        marginTop: 10,
        flex: 1,
    },
})