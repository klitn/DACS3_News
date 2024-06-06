import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { initial, values } from 'lodash';
import { doc, getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase"



const AddNewsScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const storage = getStorage();
  const db = getFirestore(app);
  const [image, setImage] = useState(null);

  const [categoryList, setCategoryList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  useEffect(() => {
    getCategoryList();
    getSourceList();
  }, [])

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

  function getFormattedDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  

  //Used to Pick Image from Gallery

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 6],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (values) => {
    navigation.navigate('HomeUser');
    setLoading(true);
    const resp = await fetch(image);
    const blob = await resp.blob();

    const storageRef = ref(storage, 'NewsImages/' + Date.now() + ".jpg");
    values.createdAt= getFormattedDate();


    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded an image file!');
    }).then((resp) => {
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        values.image = downloadUrl;      
                
        const docRef = await addDoc(collection(db, "PostNews"), values);
        if (docRef.id) {
          console.log("[PostNew} => Document written with ID: ", docRef.id);
          setLoading(false); 
        }
      });

    });
  }

  return (
    <View className="p-10 bg-white flex-1">
      
        <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="text-[27px] font-bold">Add News</Text>
      <Text className="tex-[16px] text-gray-500 mb-7">Create New News</Text>

      <Formik
        initialValues={{ title: '', description: '', url:'',category:'', source: '', image: '', createdAt:Date.now() }}
        onSubmit={values => onSubmitMethod(values)}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            console.log("Title not Present");
            errors.name = "Title Must be there";
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue,errors }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image ?
                <Image source={{ uri: image }} style={{ height: 100, width: 100, borderRadius: 15 }} />
                :
                <Image
                  source={require("../assets/placeholder.jpg")}
                  style={{ height: 100, width: 100, borderRadius: 15 }}
                />}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder='Title'
              value={values?.title}
              onChangeText={handleChange('title')}
            />

            <TextInput
              style={styles.input}
              placeholder='Description'
              value={values?.description}
              onChangeText={handleChange('description')}
              multiline={true}
            />

            <TextInput
              style={styles.input}
              placeholder='Content URL'
              value={values?.url}
              onChangeText={handleChange('url')}
              multiline={true}
            />

            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.category}
                className="border-2"
                onValueChange={itemValue => setFieldValue('category', itemValue)}
                >
                  {categoryList.length>0&&categoryList?.map((item, index) => (
                    <Picker.Item key={index} label={item?.name} value={item?.name} />

                  ))}

                </Picker>
            </View>

            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
              <Picker
                selectedValue={values?.source}
                className="border-2"
                onValueChange={itemValue => setFieldValue('source', itemValue)}
                >
                  {sourceList.length>0&&sourceList?.map((item, index) => (
                    <Picker.Item key={index} label={item?.name} value={item?.name} />

                  ))}

                </Picker>
            </View>

           
            <TouchableOpacity className="p-4 bg-blue-500 rounded-full mt-10"
              onPress={handleSubmit}>
              <Text className="text-white text-center text-[16px]">Submit</Text>
            </TouchableOpacity>

          </View>
          
          
        )}

      </Formik> 

      </ScrollView>
       

    </View>


  );
};

export default AddNewsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20
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
    marginTop: 10, marginBottom: 5,
    textAlignVertical: "top"
  }
});