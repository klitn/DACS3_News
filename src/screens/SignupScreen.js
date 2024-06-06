import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import COLORS from "../constants/color";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const SignUpScreen = () => {
  const turnLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const db = getFirestore();
      const userDoc = doc(db, `users/${user.uid}`);
      await setDoc(userDoc, {
        email: user.email,
        phoneNumber: phoneNumber,
        uid: user.uid,
        role: "user",
      });
      navigation.navigate("Login");
      console.log("User signed up and email stored in Firestore");
    } catch (error) {
      console.error("Error signing up the user:", error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo3.png")} style={styles.topImage} />
      <View>
        <Text style={styles.createAccountText}>Create account</Text>
      </View>
      <View style={styles.inputContainer}>
        <AntDesign
          name={"mail"}
          size={20}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather
          name={"lock"}
          size={20}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <AntDesign
          name={"mobile1"}
          size={20}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
        />
      </View>

      <TouchableOpacity onPress={turnLogin}>
        <Text style={styles.signInText}>
          Already have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Login</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Sign up</Text>
        <LinearGradient
          colors={["#1877F2", "#1877F2", "#1877F2"]}
          style={styles.linearGradient}
        >
          <TouchableOpacity onPress={handleSignup}>
            <AntDesign name={"arrowright"} size={24} color={"white"} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Or create account using social media
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/fb.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/gg.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    paddingTop: 30,
  },
  topImageContainer: {},
  topImage: {
    width: "50%",
    height: 60,
    alignSelf: "center",
    marginTop: 50,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  createAccountText: {
    textAlign: "center",
    fontSize: 25,
    color: "#262626",
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 30,
    margin: 5,
    underlineColorAndroid: "transparent",
    borderBottomColor: "#000000",
  },
  signInText: {
    color: "#8E8E8E",
    textAlign: "right",
    width: "90%",
    fontSize: 15,
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 30,
    width: "90%",
    justifyContent: "flex-end",
  },
  signIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },
  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  footerText: {
    color: "#262626",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
  },
  footerContainer: {
    marginTop: 35,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    backgroundColor: "white",
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 50,
  },
});
