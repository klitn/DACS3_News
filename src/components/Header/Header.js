import React, { useEffect, useState } from "react";
import { Image, Switch, TouchableOpacity, View, Text } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from "../../../firebase";



export default function Header(props) {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const turnLogin = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
    navigation.navigate("Login");
  };
  const logout = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfileImage(user.uid);
      } else {
        setUser(null);
        setImage(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserProfileImage = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.image) {
          setImage(userData.image);
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user profile image: ", error);
    }
  };

  return (
    <View className="flex-row justify-between items-center mx-4">
      <View>
        <Image
          source={require("../../assets/logo3.png")}
          style={{ height: 35, width: 110 }}
        />
      </View>

      <View className="flex-row space-x-2 rounded-full justify-center items-center">
        <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />

        <TouchableOpacity onPress={turnLogin}  className="p-2" style={{ borderRadius: 50}}>
          <Image
            source={image ? { uri: image } : require("../../assets/profile.png")}
            style={{ height: 30, width: 30, borderRadius: 50 }}
          />
        </TouchableOpacity>
      </View>
      
      
    </View>
  );
}
