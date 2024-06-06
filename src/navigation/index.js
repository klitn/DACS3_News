import { Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import WelcomeScreen from "../screens/WelcomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import SplashScreens from "../screens/SplashScreens";
import { Ionicons } from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import { useColorScheme } from "nativewind";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPassword from "../screens/ForgotPasswordScreen";
import HomeUserScreen from "../screens/HomeUserScreen";
import AddNewsScreen from "../screens/AddNewsScreen";
import EditNewsScreen from "../screens/EditNewsScreen";
import ListNews from "../screens/ListNews";
import ItemList from "../screens/ItemList";
import SourceList from "../screens/SourceList";
import WeatherScreen from "../screens/WeatherScreen";



const android = Platform.OS === "android";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Discover") {
              iconName = "compass-outline";
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            }else if (route.name === "Weather") {
              iconName = "grid-outline";
            }

            const customizeSize = 25;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "#1877F2" : "gray"}
              />
            );
          },

          tabBarActiveTintColor: "#1877F2",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium",
            // paddingBottom: 10,
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
            // borderTopWidth: 0,
            // padding: 10,
            // height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={{ tabBarStyle: { display: "none" } }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashS"
        
      >
        <Stack.Screen name="SplashS" component={SplashScreens} options={{headerShown: false}} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
        <Stack.Screen name="HomeUser" component={HomeUserScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddNews" component={AddNewsScreen} options={{headerShown: false}} />
        <Stack.Screen name="EditNews" component={EditNewsScreen} options={{headerShown: false}} />
        <Stack.Screen name="ItemList" component={ItemList}
        options={({route})=> ({ title: route.params.category,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#1877F2",
        })}/>
         <Stack.Screen name="SourceList" component={SourceList}
        options={({route})=> ({ title: route.params.source,
          headerStyle: {
            backgroundColor: "#fff",
            fontFamily: "SpaceGroteskBold",
          },
          headerTintColor: "#1877F2",
        })}/>

        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{ animation: "slide_from_bottom", headerShown: false}}
        />
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
