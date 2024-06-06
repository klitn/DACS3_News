import { View, Text } from "react-native";
import React from "react";

export default function MiniHeader({ label }) {
  return (
    <View className="px-4 my-2 justify-between flex-row items-center">
      <Text
        className="text-xl text-blue-500 dark:text-white "
        style={{
          fontFamily: "SpaceGroteskBold",
        }}
      >
        {label}
      </Text>

      <Text
        className="text-base text-gray-600 dark:text-neutral-300 "
        style={{
          fontFamily: "SpaceGroteskMedium",
        }}
      >
        View all
      </Text>
    </View>
  );
}
