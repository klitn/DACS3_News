import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getFirestore, getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase"
import LastestItemList from '../components/LastestItemList';
import { orderBy } from 'lodash';
import { useRoute } from '@react-navigation/native';


const ItemList = () => {

    const {params}=useRoute();
    const db = getFirestore(app);
    const [itemList,setItemList]=useState([]);
    useEffect(() => {
        params&&getItemListByCategory();
    }, [params]);

    const getItemListByCategory=async()=>{
        setItemList([]);
        const q=query(collection(db,"PostNews"),where("category","==",params.category));
        // console.log("Q",q);
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log("Docs:",doc.data());
            setItemList(itemList=>[...itemList,doc.data()]);
        });
    }
  return (
    <View>
      <LastestItemList lastestItemList={itemList}/>
    </View>
  )
}

export default ItemList

const styles = StyleSheet.create({})