import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getFirestore, getDocs, collection, addDoc, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase"
import LastestItemList from '../components/LastestItemList';
import { orderBy } from 'lodash';
import { useRoute } from '@react-navigation/native';

const ListNews = () => {

    const db = getFirestore(app);
    const [lastestItemList, setLastestItemList] = useState([]);
    useEffect(() => {
        getLatestItemList();
    }, []);

   

    const getLatestItemList=async()=>{
        setLastestItemList([]);
        const querySnapshot = await getDocs(collection(db, "PostNews"), orderBy("createdAt","description"));
        querySnapshot.forEach((doc) => {
          console.log("Docs:", doc.data());
          setLastestItemList(lastestItemList => [...lastestItemList, doc.data()]);
        });
      
    }
  return (
    <View className="py-8 px-6 bg-white flex-1">
      <LastestItemList lastestItemList={lastestItemList}/>
    </View>
  )
}

export default ListNews

const styles = StyleSheet.create({})