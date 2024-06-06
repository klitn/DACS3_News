import React from "react";
import { ScaledSize, StatusBar, useWindowDimensions } from "react-native";

const useApplicationDimensions = (): ScaledSize => {
  const {width, height, scale, fontScale} = useWindowDimensions();
  return {
    width,
    height: height + (StatusBar?.currentHeight || 0),
    scale,
    fontScale
  };
}

export default useApplicationDimensions;