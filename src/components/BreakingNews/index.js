import { View, Text, Dimensions } from "react-native";
import React, { useCallback, useEffect, useState }  from "react";
import { useNavigation } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";
import app from "../../../firebase"
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";

var { width } = Dimensions.get("window");

export default function BreakingNews({ data, label }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  const db = getFirestore(app);
  const [newsData, setNewsData] = useState([]);

  // Function to format the date
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "PostNews"), (snapshot) => {
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsData(newData);
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {/* Carousal */}
      <Carousal
        data={newsData}
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
