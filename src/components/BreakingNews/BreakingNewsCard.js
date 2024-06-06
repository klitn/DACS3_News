import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import app from "../../../firebase"
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";

var { width, height } = Dimensions.get("window");

export default function BreakingNewsCard({ item, handleClick }) {
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
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="relative">
        <Image
         source={{
          uri: item.image
        }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title and Author */}
        <View className="absolute bottom-4 left-4 justify-end h-[80%]">
          <View className=" space-y-1">
            <View className=" max-w-[98%]">
              <Text className="text-white text-base font-semibold capitalize">
                {item.title.length > 60
                  ? item.title.slice(0, 58) + "..."
                  : item.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            <View className="">
              <Text className="text-neutral-300 text-sm font-medium">
                {item?.source?.length > 20
                  ? item.source.slice(0, 20) + "..."
                  : item.source}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
