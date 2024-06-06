import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { auth, provider } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../constants/color";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  const forgotpass = () => {
    navigation.navigate("ForgotPassword");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate("Welcome")
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  const handleLogin = async () => {
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDocRef = doc(db, `users/${user.uid}`);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userRole = userData.role;
  
        if (userRole === 'admin') {
          // Navigate to admin page
          navigation.navigate('HomeUser')
        } else if (userRole === 'user') {
          // Navigate to user page
          navigation.navigate('Home') 
        } else {
          // Handle unknown role
          console.error('Unknown role:', userRole);
        }
      } else {
        // Handle case where user document does not exist
        console.error('User document does not exist');
      }
    } catch (error) {
      // Handle sign-in errors
      console.error('Sign-in error:', error);
    }
  };

  const resetPassword = () => {
    if (email != null) {
    } else {
      alert("Please enter valid email");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.helloContainer}>
        <View style={styles.helloText}>
          <Image
            source={require("../assets/logo3.png")}
            style={styles.topImage}
          />
        </View>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
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
      <TouchableOpacity onPress={forgotpass}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Sign in</Text>
        <LinearGradient
          colors={["#1877F2", "#1877F2", "#1877F2"]}
          style={styles.linearGradient}
        >
          <TouchableOpacity onPress={handleLogin}>
            <AntDesign name={"arrowright"} size={24} color={"white"} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Create</Text>
        </Text>
      </TouchableOpacity>

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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topImageContainer: {},
  topImage: {
    width: "50%",
    height: 60,
    paddingBottom: 20,
    alignSelf: "center",
  },
  helloContainer: {
    marginTop: 120,
  },
  helloText: {
    textAlign: "center",
    paddingBottom: 15,
  },
  signInText: {
    textAlign: "center",
    fontSize: 25,
    color: "#262626",
    marginBottom: 30,
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
  forgotPasswordText: {
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
    paddingTop: 20,
  },
  footerContainer: {
    marginTop: 0,
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
