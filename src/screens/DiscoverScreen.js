import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../constants";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { doc, getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase"
import Carousel from "react-native-snap-carousel";
import { Dimensions, Image } from "react-native";
import { get } from "lodash";
import ListNews from "./ListNews";


export default function DiscoverScreen() {

  // Noi dung cu
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const navigation = useNavigation();
  const [withoutRemoved, setWithoutRemoved] = useState([]);

  useEffect(() => { }, [activeCategory]);

  const { data: discoverNew, isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category) => {
    setActiveCategory(category);

    const filteredArticles = discoverNew?.articles.filter(
      (article) => article.title !== "[Removed]"
    );

    setWithoutRemoved(filteredArticles || []);
  };



  // Phan update lai



  const [categoryList, setCategoryList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  useEffect(() => {
    getCategoryList();
    getSourceList();
  }, [])

  const [category, setCategory] = useState(null);

  const storage = getStorage();
  const db = getFirestore(app);


  const windowWidth = Dimensions.get('window').width;
  const SLIDE_WIDTH = windowWidth / 2;

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList(categoryList => [...categoryList, doc.data()]);
    });
  }

  const getSourceList = async () => {
    setSourceList([]);
    const querySnapshot = await getDocs(collection(db, "Sources"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setSourceList(sourceList => [...sourceList, doc.data()]);
    });
  }




  return (
    <SafeAreaView className="pt-2 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <ScrollView showsVerticalScrollIndicator={false} >
        <View>
          {/* Header */}
          <View className="px-4 mb-6 justify-between">
            <Text
              className="text-3xl text-blue-600 dark:text-white"
              style={{
                fontFamily: "SpaceGroteskBold",
              }}
            >
              Discover
            </Text>

            <Text
              className="text-base text-gray-600 dark:text-neutral-300 "
              style={{
                fontFamily: "SpaceGroteskMedium",
              }}
            >
              News from all over the world
            </Text>
          </View>

          {/* Search */}
          <View className="mx-2 mb-2 flex-row p-1 py-3 justify-between items-center bg-neutral-100 rounded-full">
            <TouchableOpacity className="pl-2">
              <MagnifyingGlassIcon size="25" color="gray" />
            </TouchableOpacity>
            <TextInput
              onPressIn={() => navigation.navigate("Search")}
              placeholder="Search for news"
              placeholderTextColor={"gray"}
              className="pl-4 flex-1 font-medium text-black tracking-wider"
            />
          </View>

          {/* Categories */}
          <Text style={styles.subtitle}>Categories</Text>

          <FlatList
            numColumns={2}
            data={categoryList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.category}
                onPress={() =>
                  navigation.navigate("ItemList", { category: item.name })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.pic }}
                    style={styles.categoryImage}
                  />
                  <View style={styles.overlay} />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            sliderWidth={windowWidth}
            itemWidth={SLIDE_WIDTH}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            activeSlideAlignment={"start"}
          />

          <Text style={styles.subtitle}>Source</Text>

          <FlatList
            numColumns={4} // hiển thị 4 cột trong mỗi hàng
            data={sourceList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SourceList", { source: item.name })
                }
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                  borderColor: 'gray',
                  margin: 1,
                  height: 80,
                  borderRadius: 40, // để biến mỗi mục thành hình tròn
                  overflow: 'hidden', // để ẩn bất kỳ nội dung nào vượt ra ngoài hình tròn
                }}
              >
                <Image
                  source={{ uri: item.pic }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20, // để hình ảnh trở thành hình tròn
                    borderColor: '#007FFF', // màu viền xanh
                    borderWidth: 0.5, // độ dày của viền
                  }}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 3,
    marginHorizontal: 5,
    borderBottomColor: '#007FFF',
    borderBottomWidth: 5,
    alignSelf: 'flex-start',
    borderRadius: 10,

  },

  category: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 100, // Điều chỉnh tùy ý
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Để sử dụng position: absolute

  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fill toàn bộ không gian của container
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu đen mờ
  },
  categoryText: {
    position: 'absolute',
    bottom: 40, // Khoảng cách từ dưới lên
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

  sourceImage: {
    height: 100,
    width: 100,
  },
  source: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  sourceContainer: {
    height: 150,
    width: "40%",
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#cc313d",
  }
});
