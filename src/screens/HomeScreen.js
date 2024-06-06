import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";
import app from "../../firebase";
import { useAuth } from "../store/authContext";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [newsData, setNewsData] = useState([]);
  const { currentUser, userLoggined } = useAuth();
  const navigation = useNavigation();
  const db = getFirestore(app);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "PostNews"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("news DATA   >>", newData);
      setNewsData(newData);

      // console.log("news DATA   >>",newData);
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
  });

  // Recommended News
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommededNewss"],
    queryFn: fetchRecommendedNews,
  });
  // const signOutHandle = () => {
  //   // Add your sign out logic here
  //   console.log("sign out");
  //   auth.signOut();
  //   navigation("/login");
  // };
  useEffect(() => {
    console.log("current user>>", currentUser);
    console.log("userLoggedIn>>", userLoggined);
  });
  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />
        {/* <Button onClick={signOutHandle}>Sign Out</Button> */}
        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View className="">
            <MiniHeader label="Breaking News" />
            <BreakingNews label="Breaking News" data={data.articles} />
          </View>
        )}

        {/* Recommended News */}
        <View>
          <MiniHeader label="Recommended" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80),
            }}
          >
            {isRecommendedLoading ? (
              <Loading />
            ) : (
              <NewsSection label="Recommendation" newsProps={newsData} />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
