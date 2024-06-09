import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from "../../../firebase";

const date = new Date();

export default function Message(props) {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("Guest");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUser(user.uid);
      } else {
        setUser(null);
        setUsername("Guest");
        setImage(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUser = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.name) {
          setUsername(userData.name);
        }
        if (userData.image) {
          setImage(userData.image);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  return (
    <View style={styles.message}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image
            source={image ? { uri: image } : require("../../assets/profile.png")}
            style={styles.icon}
          />
          <Text style={{ fontWeight: '500' }}>{username}</Text>
        </View>
        <Text style={{ fontSize: 10, fontWeight: '600' }}>
          {date.getHours()}:{date.getMinutes()}
        </Text>
      </View>
      <Text style={{ fontSize: 14, width: "100%", flex: 1, paddingLeft: 0 }}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fafafa",
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14, // Add borderRadius to make the image circular
  },
});
