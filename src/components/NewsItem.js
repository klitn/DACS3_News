import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList,
  ActivityIndicator,
  Alert, } from 'react-native'
import React, { useCallback, useEffect, useState } from "react";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const NewsItem = ({ item, index }) => {
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  return (
      // <TouchableOpacity onPress={() => handleArticlePress(item)}>
      //     <View style={styles.itemContainer}>
      //       <Image source={{uri:item.image}} style={styles.image} />
      //       <View style={styles.textContainer}>
      //         <Text style={styles.title}>{item.title}</Text>
      //         <Text style={styles.description}>{item.description}</Text>
      //         <Text style={styles.author}>{item.source}</Text>
      //         <Text style={styles.publishedAt}>{item.createdAt}</Text>
      //         <View >
      //     <TouchableOpacity
      //         onPress={() => toggleBookmarkAndSave(item, index)}
      //       >
      //        <BookmarkSquareIcon
      //           color={bookmarkStatus[index] ? "#1877F2" : "gray"}
      //         />
      //       </TouchableOpacity>
      //     </View>
      //       </View>
      //     </View>
      //   </TouchableOpacity>
      <TouchableOpacity
  style={{ margin: 0, flexDirection: "column" }}
  key={index}
  onPress={() => handleClick(item)}
>
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
    <View style={{ margin: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 5, padding: 10 }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 340, height: 200, resizeMode: "cover" }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10, fontWeight: "600", textAlign: "auto" }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 14, marginTop: 5 }}>
        {item.description.length > 85
          ? item.description.slice(0, 85) + "..."
          : item.description}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 13, marginTop: 5 }}>
          {item.source}
        </Text>
        <TouchableOpacity
          onPress={() => toggleBookmarkAndSave(item, index)}
          style={{ marginLeft: 260 }}
        >
          <BookmarkSquareIcon
            color={bookmarkStatus[index] ? "#1877F2" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
</TouchableOpacity>

    
  )
}

export default NewsItem

const styles = StyleSheet.create({
  
  });