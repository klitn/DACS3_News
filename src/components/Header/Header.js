import {Image, Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4">
      <View className="">
      <Image
        source={require("../../assets/logo3.png")}
        style={{ height: 35, width: 110 }}
      />
      </View>

      {/* Switch and Search Icon */}
      <View className="flex-row space-x-2 rounded-full justify-center items-center"
      >
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-white-200 dark:bg-blue-500 p-2"
          style={{
            borderRadius: 10,
            backgroundColor: "#1877F2"
          
          }}
        >
          <Text style={{color:"#fff",fontWeight:"bold"}} >Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
