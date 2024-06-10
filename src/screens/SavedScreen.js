import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useAuth } from "../store/authContext";
import app from "../../firebase";

import {
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  collection,
  getFirestore,
} from "firebase/firestore";
export default function SavedScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [articles, setArticles] = useState([]);
  const db = getFirestore(app);
  const { currentUser } = useAuth();

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, `users/${currentUser.uid}/bookmarked`));
      setArticles(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, [articles]);
  // Function to format the date
 

  const toggleBookmarkAndSave = async (item, index) => {
    const bookmarkRef = doc(db, `users/${currentUser.uid}/bookmarked`, item.id);

    try {
      const docSnap = await getDoc(bookmarkRef);

      if (docSnap.exists()) {
        await deleteDoc(bookmarkRef);
      } else {
        await setDoc(bookmarkRef, {
          url: item.url,
          title: item.title,
          image: item.image,
          description: item.description,
          category: item.category,
          source: item.source,
          createdAt: item.createdAt
        });
      }

      // Update the UI
      setBookmarkStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = !newStatus[index];
        return newStatus;
      });
    } catch (error) {
      console.error("Error updating bookmark: ", error);
    }
  };

  // Load saved articles from AsyncStorage when the screen gains focus
  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const bookmarkedCollection = collection(db, `users/${currentUser.uid}/bookmarked`);
        const bookmarkedSnapshot = await getDocs(bookmarkedCollection);
        const bookmarkedDocs = bookmarkedSnapshot.docs.map(doc => doc.data());

        // Check if each URL in 'urlList' exists in the bookmarked list
        const isArticleBookmarkedList = urlList.map((url) =>
          bookmarkedDocs.some((bookmarkedDoc) => bookmarkedDoc.url === url)
        );

        // Set the bookmark status for all items based on the loaded data
        setBookmarkStatus(isArticleBookmarkedList);
      } catch (error) {
        console.log("Error Loading Saved Articles", error);
      }
    };

    loadSavedArticles();
  }, [navigation, urlList]);

  const clearSavedArticles = async () => {
    try {
      const bookmarkedCollectionRef = collection(db, `users/${currentUser.uid}/bookmarked`);
      const bookmarkedSnapshot = await getDocs(bookmarkedCollectionRef);
      const deletePromises = bookmarkedSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      setArticles([]);
      setBookmarkStatus([]);
      console.log("Cleared all saved articles");
    } catch (error) {
      console.error("Error clearing saved articles", error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1 "
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  item.image ||
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-4 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item.source}
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

          {/* Save */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon color="#1877F2" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      {/* Header  */}
      <View className="flex-row justify-between items-center">
        <Text
          className="font-bold text-xl text-blue-600 dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          className="bg-blue-500 py-1 px-4 rounded-lg"
        >
          <Text
            className="font-bold text-lg text-white dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: hp(2) }} className="space-y-2 ">
        <FlatList
          data={articles}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: hp(2),
          }}
        />
      </View>
    </SafeAreaView>
  );
}
