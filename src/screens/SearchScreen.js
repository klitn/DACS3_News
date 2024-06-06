import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import app from "../../firebase";
import { debounce } from "lodash";
import NewsSection from "../components/NewsSection/NewsSection";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const storage = getStorage();
  const db = getFirestore(app);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(search);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Reset search and fetch all items when navigating to this screen
    setSearch(search);
    setSearchTerm("All News");
    fetchAllItems();
  }, [route]);

  const fetchAllItems = async () => {
    try {
      const q = query(collection(db, "PostNews"));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const searchData = async (search) => {
    try {
      const q = query(collection(db, "PostNews"), 
                      where("title", ">=", search), 
                      where("title", "<=", search + "\uf8ff"));
      const querySnapshot = await getDocs(q);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      setSearchTerm(search ? search : "All News"); // Set search term to "All News" if search is empty
      try {
        await searchData(search);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchTerm("All News"); // Set search term to "All News" if search query is less than 3 characters
      fetchAllItems();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("All News");
    fetchAllItems();
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleClick(item)}
        style={{ marginHorizontal: 4,  marginBottom: 8, padding: 0, justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderRadius: 8 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Image */}
          <View style={{ marginRight: 10 }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: hp(13), height: hp(12), borderRadius: 8 }}
              resizeMode="cover"
            />
          </View>

          {/* Content */}
          <View style={{ flex: 1,  }}>
            {/* Source */}
            <Text numberOfLines={1} style={{ fontSize: 12, color: "gray", fontFamily: "SpaceGroteskBold" }}>
              {item.source.length > 20 ? item.source.slice(0, 20) + "..." : item.source}
            </Text>

            {/* Title */}
            <Text numberOfLines={2} style={{ fontSize: 15, color: "black", fontFamily: "SpaceGroteskBold" }}>
              {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
            </Text>

            {/* Date */}
            <Text style={{ fontSize: 12, color: "gray", fontFamily: "SpaceGroteskBold" }}>
              {item.createdAt}
            </Text>
          </View>

          {/* Bookmark */}
          <TouchableOpacity onPress={() => toggleBookmarkAndSave(item, index)}>
            <BookmarkSquareIcon color="gray" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white",paddingTop:25, paddingLeft:10,paddingRight:10 }}>
      <View style={{ marginHorizontal: 4, marginBottom: 3, marginTop: 10, flexDirection: "row", padding: 2, justifyContent: "space-between", alignItems: "center", backgroundColor: "#F4F4F4", borderRadius: 30 }}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for your news"
          placeholderTextColor={"gray"}
          style={{ fontFamily: "SpaceGroteskBold", paddingHorizontal: 12, paddingVertical: 8, width: "90%", fontSize: 16, color: "black" }}
          value={search}
        />
        <TouchableOpacity onPress={handleClearSearch}>
          <XMarkIcon name="x" size={25} color="#1877F2" />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 4, marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontFamily: "SpaceGroteskBold", color: "black" }}>
          {data.length} News for {searchTerm}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </ScrollView>
    </View>
  );
}
