import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import app from "../../../firebase";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../store/authContext";

export default function NewsSection({ newsProps }) {
  const navigation = useNavigation();
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const db = getFirestore(app);
  const { currentUser } = useAuth();

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to toggle bookmark and save article
  const toggleBookmarkAndSave = async (item, index) => {
    if (!currentUser) {
      alert("Please Login First");
      navigation.navigate("Login");
      return;
    }

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
          createdAt: item.createdAt,
        });
      }

      // No need to manually update bookmarkStatus, as the listener will handle it.
    } catch (error) {
      console.error("Error updating bookmark: ", error);
    }
  };

  // Effect to set up Firestore listener for real-time updates
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, `users/${currentUser.uid}/bookmarked`),
      (snapshot) => {
        const bookmarkedDocs = snapshot.docs.map((doc) => doc.data());
        const bookmarkedUrls = new Set(bookmarkedDocs.map((doc) => doc.url));

        const isArticleBookmarkedList = newsProps.map((item) =>
          bookmarkedUrls.has(item.url)
        );

        setBookmarkStatus(isArticleBookmarkedList);
      },
      (error) => {
        console.error("Error loading bookmarked articles: ", error);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [currentUser, newsProps]);

  // Component to render each item in the list
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm p-1">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{ uri: item.image }}
              style={{ width: hp(13), height: hp(12) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}
          <View className="w-[70%] pl-12 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.source?.length > 20
                ? item.source.slice(0, 20) + "..."
                : item.source}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white"
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
          <View>
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon
                color={bookmarkStatus[index] ? "#1877F2" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={true}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
