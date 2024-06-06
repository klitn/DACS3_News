import React from "react";
import { Image, ImageBackground, ScaledSize, StyleSheet, Text, View } from "react-native";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";

const HomeBackground = () => {
  const dimensions = useApplicationDimensions();
  const {width, height} = dimensions;
  const myStyles = styles(dimensions);
  const smokeHeight = height * 0.6;
  const smokeOffsetY = height * 0.4;
  return (
    <View style={myStyles.container}>
      <Canvas style={{flex: 1}}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={['#429ef5', '#429ef5']} />
        </Rect>
      </Canvas>
      <ImageBackground
        source={require('../../assets/home/Background.png')}
        resizeMode="cover"
        style={{height: '100%'}}>
          <Canvas style={{height: smokeHeight, ...StyleSheet.absoluteFillObject, top: smokeOffsetY}}>
            <Rect x={0} y={0} width={width} height={smokeHeight}>
              <LinearGradient
                start={vec(width/2, 0)}
                end={vec(width/2, smokeHeight)}
                colors={['rgba(58, 63, 84,0)', 'rgba(58, 63, 84, 1)']}
                positions={[-0.02, 0.54]} />
            </Rect>
          </Canvas>
          <Image
            source={require('../../assets/home/House.png')}
            resizeMode="cover"
            style={myStyles.houseImg} />
      </ImageBackground>
    </View>
  );
};

export default HomeBackground;

const styles = ({width}: ScaledSize) => StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  houseImg: {
    width: width,
    height: width,
    ...StyleSheet.absoluteFillObject, top: '25%'
  },
  container: {...StyleSheet.absoluteFillObject}
});