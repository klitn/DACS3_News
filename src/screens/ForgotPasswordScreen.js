import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword} from 'firebase/auth';
import {sendPasswordResetEmail} from 'firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';




const ForgotPasswordScreen = () => {

  const [email, setEmail] = useState('')
 

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate("Welcome")
  //     }
  //   })

  //   return unsubscribe
  // }, [])



  const resetPassword = () => {
    if (email !=null){
      sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Password reset email has been sent successfully!");
    navigation.navigate("Login");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
    }
    else
    {
      alert("Please enter valid email")
    }
  }

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
      <Text style={styles.signInText}>Forget Password?</Text>
    </View>
    <View style={styles.inputContainer}>
    <AntDesign name={"mail"} 
    size={20} color={"#9A9A9A"} 
    style={styles.inputIcon}/>
    <TextInput style={styles.textInput} value={email} onChangeText={text => setEmail(text)} placeholder='Email'/>
    </View>

    <View style={styles.signInButtonContainer}>
      <Text style={styles.signIn}>Send email</Text>
      <LinearGradient
      colors={["#1877F2","#1877F2", "#1877F2"]}
      style={styles.linearGradient}>

        <TouchableOpacity onPress={() => resetPassword()}>
        <AntDesign
        name={"arrowright"}
        size={24}
        color={"white"}/>
        </TouchableOpacity>

      </LinearGradient>
      
    </View>
  </View>

    
  );
};

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topImageContainer: {},
  topImage: {
    width: "50%",
    height: 60,
    alignSelf: "center",
  },
  helloContainer: {
    marginTop:120,
    
  },
  helloText: {
    textAlign: "center",
    paddingBottom: 15,
    
  },
  signInText: {
    textAlign: "center",
    fontSize: 25,
    color:"#262626",
    marginBottom: 30,
    fontWeight:"bold",
  },
  inputContainer:{
    backgroundColor: "#FFFFFF",
    flexDirection:"row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation:10,
    marginVertical: 20,
    alignItems:"center",
    height:50,
  },
  inputIcon:{
    marginLeft: 15,
  },
  textInput:{
    flex:1,
    backgroundColor:"#FFFFFF",
    height:30,
    margin: 5,
    underlineColorAndroid: 'transparent',
    borderBottomColor: '#000000',
  },
  forgotPasswordText:{
    color:"#8E8E8E",
    textAlign:"right",
    width:"90%",
    fontSize: 15,
  },
  signInButtonContainer:{
    flexDirection:"row",
    marginTop:60,
    width:"90%",
    justifyContent:"flex-end",
  },
  signIn:{
    color:"#262626",
    fontSize: 25,
    fontWeight:"bold",
  },
  linearGradient:{
    height:34,
    width: 56,
    borderRadius:17,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal:10,
  },
  footerText:{
    color:"#262626",
    textAlign:"center",
    fontSize: 15,
    marginTop:50 ,
  },
});