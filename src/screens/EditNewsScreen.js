import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";


import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase";

const EditNewsScreen = () => {
  const storage = getStorage();
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const route = useRoute();
  const { itemId } = route.params;
  const [retrievedValue, setRetrievedValue] = useState(null);

  useEffect(() => {
    getDocByItemId(itemId);
  }, []);


  useEffect(() => {
    
    if (retrievedValue && retrievedValue.image) {
      setImage(retrievedValue.image);
    }
  }, [retrievedValue]);

  // get doc from itemID

  const getDocByItemId = async (itemId) => {
    console.log(itemId);
    const docRef = doc(db, "PostNews", itemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const retrievedValue = docSnap.data();
      setRetrievedValue(retrievedValue);
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const [categoryList, setCategoryList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  useEffect(() => {
    getCategoryList();
    getSourceList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getSourceList = async () => {
    setSourceList([]);
    const querySnapshot = await getDocs(collection(db, "Sources"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setSourceList(sourceList => [...sourceList, doc.data()]);
    });
  };

  //Used to Pick Image from Gallery

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  // Get document from itemID
  const initialValues = retrievedValue
    ? {
        title: retrievedValue.title,
        description: retrievedValue.description,
        url: retrievedValue.url,
        category: retrievedValue.category,
        source: retrievedValue.source,
        image: retrievedValue.image,
      }
    : {
        title: "",
        description: "",
        url: "",
        category: "",
        source: "",
        image: "",
      };

  console.log(initialValues);

  const onSubmitMethod = async (values) => {
    navigation.navigate("HomeUser");
    console.log("Pressed Submit");

    const resp = await fetch(image);
    const blob = await resp.blob();

    const storageRef = ref(storage, "NewsImages/" + Date.now() + ".jpg");
    console.log("Create Storageref");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded an image file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          values.image = downloadUrl;
          console.log("Download url ==> !");
          const docRef = await setDoc(doc(db, "PostNews", itemId), values);
          // if (docRef.id) {
          //   console.log("[PostNew} => Document written with ID: ", docRef.id);

          // }
          
        });
      });
  };

  return (
    <View className="p-10 bg-white flex-1">
     
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-[27px] font-bold mb-5">Edit News</Text>
          {/* <Text className="tex-[16px] text-gray-500 mb-5">Create New News</Text> */}
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values) => onSubmitMethod(values)}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                console.log("Title not Present");
                errors.name = "Title Must be there";
              }
              return errors;
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <View>
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ height: 100, width: 100, borderRadius: 15 }}
                    />
                  ) : (
                    <Image
                     value={values?.image}
                      style={{ height: 100, width: 100, borderRadius: 15 }}
                    />
                  )}
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={values?.title}
                  onChangeText={handleChange("title")}
                  multiline={true}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={values?.description}
                  onChangeText={handleChange("description")}
                  multiline={true}
                />

                <TextInput
                  style={styles.input}
                  placeholder="URL LINK"
                  value={values?.url}
                  onChangeText={handleChange("url")}
                  multiline={true}
                />

                <View
                  style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}
                >
                  <Picker
                    selectedValue={values?.category}
                    className="border-2"
                    onValueChange={(itemValue) =>
                      setFieldValue("category", itemValue)
                    }
                  >
                    {categoryList.length > 0 &&
                      categoryList?.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item?.name}
                          value={item?.name}
                        />
                      ))}
                  </Picker>
                </View>

                <View
                  style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}
                >
                  <Picker
                    selectedValue={values?.source}
                    className="border-2"
                    onValueChange={(itemValue) =>
                      setFieldValue("source", itemValue)
                    }
                  >
                    {sourceList.length > 0 &&
                      sourceList?.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item?.name}
                          value={item?.name}
                        />
                      ))}
                  </Picker>
                </View>

              
                <TouchableOpacity
                  className="p-4 bg-blue-500 rounded-full mt-10"
                  onPress={handleSubmit}
                >
                  <Text className="text-white text-center text-[16px]">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>

    </View>
  );
};

export default EditNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 0,
  },
  textTitle: {
    fontSize: 25,
    color: "#262626",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 5,
    paddingTop: 15,
    borderRadius: 10,
    paddingHorizontal: 17,
    backgroundColor: "#FFFFFF",
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    textAlignVertical: "top",
  },
});