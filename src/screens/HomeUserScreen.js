import React from "react";
import { Platform, Image, Text, TouchableOpacity, View, TextInput, FlatList, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState, useEffect } from "react";
import Foundation from 'react-native-vector-icons/Foundation';
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import app from "../../firebase"




export default function HomeUserScreen() {
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      background: "#fff"
    }
  }


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "PostNews"), (snapshot) => {
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsData(newData);
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const handleEdit = (itemId) => {
    navigation.navigate("EditNews", { itemId: itemId });
  };

  const handleDelete = async(itemId) => {
    await deleteDoc(doc(db, "PostNews", itemId));
    console.log("Deleted Item " + itemId + " successfully")
  };

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };


  const renderItem1 = ({ item, index }) => {
    return (
      <TouchableOpacity
        className=" mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm" style={styles.itemContainer}>
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri: item.image
              }}
              style={{ width: hp(12), height: hp(12) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-10 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + "..."
                : item.author}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
              style={{
                fontSize: hp(1.7),
                fontFamily: "SpaceGroteskBold",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {item.createdAt}
            </Text>
          </View>

          {/* Bookmark */}
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEdit(item.id)}>
          <AntDesign name="edit" size={22} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Foundation name="page-delete" size={22} color="gray" />
        </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const TabNavigator = () => {
  //   return (
  //     <Tab.Navigator
  //       screenOptions={({ route }) => ({
  //         headerShown: false,
  //         tabBarIcon: ({ focused }) => {
  //           let iconName;

  //           if (route.name === "MyPost") {
  //             iconName = "home";
  //           } else if (route.name === "HomeUser") {
  //             iconName = "compass-outline";
  //           }else if (route.name === "AddNews") {
  //             iconName = "compass-outline";
  //           } else if (route.name === "Profile") {
  //             iconName = "bookmark-outline";
  //           } 

  //           const customizeSize = 25;

  //           return (
  //             <Ionicons
  //               name={iconName}
  //               size={customizeSize}
  //               color={focused ? "#1877F2" : "gray"}
  //             />
  //           );
  //         },

  //         tabBarActiveTintColor: "#1877F2",
  //         tabBarInactiveTintColor: "gray",
  //         tabBarLabelStyle: {
  //           fontSize: 12,
  //           fontFamily: "SpaceGroteskMedium",
  //           // paddingBottom: 10,
  //         },
  //         tabBarStyle: {
  //           backgroundColor: colorScheme == "dark" ? "black" : "white",
  //           // borderTopWidth: 0,
  //           // padding: 10,
  //           // height: 60,
  //         },
  //       })}
  //     >
  //       <Tab.Screen name="MyPost" component={HomeUserScreen} />
  //       <Tab.Screen name="Home" component={HomeScreen} />
  //       <Tab.Screen name="AddNews" component={AddNewsScreen} />
  //       <Tab.Screen name="Profile" component={ProfileNewsScreen}/>
  //     </Tab.Navigator>
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ paddingTop: 30, paddingLeft:10, paddingRight:10, paddingBottom:10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
        <Image
          source={require("../assets/logo3.png")}
          style={{ height: 40, width: 120 }}
        />
        {/* Switch and Add Icon */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <TouchableOpacity onPress={() => navigation.navigate("AddNews")}>
            <MaterialIcons name="post-add" size={40} color="#1877F2" />
          </TouchableOpacity>
        </View>
      </View>
  
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#1877F2', fontFamily: 'SpaceGroteskBold' }}>My Posts</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: '#000', fontFamily: 'SpaceGroteskMedium' }}>View All</Text>
          </TouchableOpacity>
        </View>
        {/* Search bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 5, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 }}>
          <AntDesign name="search1" size={24} color="gray" />
          <TextInput placeholder='Search' style={{ marginLeft: 8 }} />
        </View>
      </View>
  
      {/* Items News */}
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={true}
        data={newsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem1}
      />
  
  
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 0,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 3,
    borderRadius: 10,
    borderColor: 'rgba(158, 150, 150, .5)'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    marginBottom: 2,
  },
  author: {
    color: 'gray',
    marginBottom: 5,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'collum',
  },
  button: {
   
  },
  editButton: {
    
  },
  deleteButton: {
    paddingTop:30,
  },
  
});


