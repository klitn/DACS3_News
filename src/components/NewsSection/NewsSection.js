import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import app from "../../../firebase";
import { getDocs,doc,getDoc,deleteDoc,setDoc, query, where,collection, getFirestore } from "firebase/firestore";
import {useAuth} from "../../store/authContext";
export default function NewsSection({ newsProps }) {
  const navigation = useNavigation();
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const db = getFirestore(app);
  const {currentUser}=useAuth();
  // Hook to set the URL list
  useEffect(() => {
    console.log((currentUser)?"User is logged in":"User is not logged in")
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to toggle bookmark and save article
  // const toggleBookmarkAndSave = async (item, index) => {
  //   if(!currentUser){
  //     alert("Please Login First");
  //     navigation.navigate("Login");
  //     return;
  //   }
  //   try {
  //     const savedArticles = await AsyncStorage.getItem("savedArticles");
  //     // console.log("savedArticles", savedArticles);

  //     let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

  //     const foundIndex = savedArticlesArray.findIndex(
  //       (savedArticle) => savedArticle.url === item.url
  //     );

  //     if (foundIndex === -1) {
  //       // If the article is not bookmarked, add it to the bookmarked list
  //       savedArticlesArray.push(item);
  //       const updatedStatus = [...bookmarkStatus];
  //       updatedStatus[index] = true;
  //       setBookmarkStatus(updatedStatus);
  //     } else {
  //       // If the article is already bookmarked, remove it from the list
  //       savedArticlesArray.splice(foundIndex, 1);
  //       const updatedStatus = [...bookmarkStatus];
  //       updatedStatus[index] = false;
  //       setBookmarkStatus(updatedStatus);
  //     }

  //     // Update the saved articles in AsyncStorage
  //     await AsyncStorage.setItem(
  //       "savedArticles",
  //       JSON.stringify(savedArticlesArray)
  //     );
  //   } catch (error) {
  //     console.error("Error updating document: ", error);
  //   }
  // };
  const toggleBookmarkAndSave = async (item, index) => {
    if(!currentUser){
      alert("Please Login First");
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
  // Effect to load saved articles from AsyncStorage when the component mounts
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

  // Component to render each item in the list
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className=" mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm p-1">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: hp(13), height: hp(12) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-12 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.source ?.length > 20
                ? item.source .slice(0, 20) + "..."
                : item.source }
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
      {/* Header */}

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

// useEffect(() => {

//   const loadSavedArticles = async () => {
//     try {
//       const savedArticles = await AsyncStorage.getItem("savedArticles");
//       const savedArticlesArray = savedArticles
//         ? JSON.parse(savedArticles)
//         : [];

//       // Check if each URL in 'urlList' exists in the bookmarked list
//       const isArticleBookmarkedList = urlList.map((url) =>
//         savedArticlesArray.some((savedArticle) => savedArticle.url === url)
//       );

//       // Set the bookmark status for all items based on the loaded data
//       setBookmarkStatus(isArticleBookmarkedList);
//       console.log("Check if the current article is in bookmarks");
//     } catch (error) {
//       console.log("Error Loading Saved Articles", error);
//     }
//   };

//   loadSavedArticles();
// }, [urlList]);

// contentContainerStyle={{
//         paddingBottom: hp(110),
//       }}
