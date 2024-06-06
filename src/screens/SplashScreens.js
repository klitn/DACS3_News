import { View, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreens() {
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    setTimeout(() => {
      navigation.navigate("HomeTabs"); // Navigate to HomeTab
    }, 3000); // 3 seconds delay
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      // source={require("../../assets/images/welcome/reporter.jpg")}
      className="flex-1 justify-center items-center"
    >
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        onLayout={onLayoutRootView}
        className=" "
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
        <Text style={{ color: '#1877F2', fontSize: 50, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', textAlignVertical: 'center' }}>
  Kabar
</Text>

      </View>
    </View>
  );
}
